const https = require('https');

const CLOUD_NAME = 'ih2kwaro';
const API_KEY = '974899944787361';
const API_SECRET = 'LPMs-29y0_Tr1TuPd0x-Hx8c-YM';

exports.handler = async function(event, context) {
  const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');
  const headers = {
    'Authorization': `Basic ${auth}`,
    'User-Agent': 'Netlify-Function'
  };

  const fetchCloudinary = (type) => {
    return new Promise((resolve) => {
      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/${type}?max_results=500`;
      https.get(url, { headers }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            const items = (parsed.resources || []).map(r => ({ ...r, media_type: type }));
            resolve(items);
          } catch(e) {
            resolve([]);
          }
        });
      }).on('error', () => resolve([]));
    });
  };

  try {
    const [images, videos] = await Promise.all([
      fetchCloudinary('image'),
      fetchCloudinary('video')
    ]);

    const allResources = [...images, ...videos];

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        cloud_name: CLOUD_NAME,
        count: allResources.length,
        resources: allResources
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
