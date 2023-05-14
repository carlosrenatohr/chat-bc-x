// const BigCommerce = require('node-bigcommerce');
// import fetch from 'node-fetch';
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

const clientId = process.env.BIGCOMMERCE_CLIENT_ID;
const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN;
const storeHash = process.env.BIGCOMMERCE_STORE_HASH;

const base_url = `https://api.bigcommerce.com/stores/${storeHash}/`;
// const bigcommerce = new BigCommerce({
//     logLevel: 'info',
//     clientId: process.env.BIGCOMMERCE_CLIENT_ID,
//     accessToken: process.env.BIGCOMMERCE_ACCESS_TOKEN,
//     storeHash: process.env.BIGCOMMERCE_STORE_HASH,
//     // storeUrl: process.env.BIGCOMMERCE_STORE_URL,
//     responseType: 'json',
//     headers: { 'Accept-Encoding': '*' },
//     // apiVersion: 'v3',
// })

const options = {
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': '*',
      'Content-Type': 'application/json',
      'X-Auth-Token': accessToken,
    }
  };

  const bigcommerceReq = async (path, method = 'get') => {
    const url = base_url + path;
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
        console.warn(err.status, err.statusText);
        console.error(err);
    }
  }
  

module.exports = { bigcommerceReq };