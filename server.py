import http.server
import socketserver
import urllib.request
import urllib.parse
import base64
import json
import os

PORT = 3000
CLOUD_NAME = "ih2kwaro"
API_KEY = "974899944787361"
API_SECRET = "LPMs-29y0_Tr1TuPd0x-Hx8c-YM"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
VAULT_FILE = os.path.join(BASE_DIR, "vault_config.json")
MEDIA_FILE = os.path.join(BASE_DIR, "media_data.json")

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # 1. Cloudinary media endpoint
        if parsed.path in ('/api/cloudinary-media', '/.netlify/functions/cloudinary-media'):
            query = urllib.parse.parse_qs(parsed.query)
            c_name = query.get('cloud_name', [CLOUD_NAME])[0].strip() or CLOUD_NAME
            
            # First check if local media_data.json exists for instant speed
            if os.path.exists(MEDIA_FILE):
                try:
                    with open(MEDIA_FILE, 'r', encoding='utf-8') as f:
                        cached_data = json.load(f)
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(json.dumps(cached_data).encode('utf-8'))
                    return
                except Exception:
                    pass

            # Otherwise fetch live from Cloudinary Admin API
            auth_str = f"{API_KEY}:{API_SECRET}"
            b64_auth = base64.b64encode(auth_str.encode('utf-8')).decode('utf-8')
            headers = {
                'Authorization': f'Basic {b64_auth}',
                'User-Agent': 'Mozilla/5.0'
            }

            results = []
            for res_type in ['image', 'video']:
                try:
                    url = f"https://api.cloudinary.com/v1_1/{c_name}/resources/{res_type}?max_results=500"
                    req = urllib.request.Request(url, headers=headers)
                    with urllib.request.urlopen(req, timeout=12) as resp:
                        data = json.loads(resp.read().decode('utf-8'))
                        for item in data.get('resources', []):
                            item['media_type'] = res_type
                            results.append(item)
                except Exception as e:
                    print(f"Error fetching {res_type}: {e}")

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'cloud_name': c_name, 'count': len(results), 'resources': results}).encode('utf-8'))
            return

        # 2. Vault config GET
        if parsed.path == '/api/vault-config':
            data = {"passcode": "", "hidden_ids": []}
            if os.path.exists(VAULT_FILE):
                try:
                    with open(VAULT_FILE, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                except Exception:
                    pass
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(data).encode('utf-8'))
            return

        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/api/vault-config':
            content_len = int(self.headers.get('Content-Length', 0))
            post_body = self.rfile.read(content_len)
            try:
                data = json.loads(post_body.decode('utf-8'))
                with open(VAULT_FILE, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2)
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'success': True, 'data': data}).encode('utf-8'))
                return
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
                return

        return super().do_POST()

if __name__ == '__main__':
    os.chdir(BASE_DIR)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        print(f"Serving with Cloudinary ih2kwaro at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
