import { NextResponse } from "next/server";
import fetch from 'node-fetch'; // Make sure to install node-fetch if you haven't already


const { createProxyMiddleware } = require("http-proxy-middleware");

function createDynamicProxyMiddleware(targetUrl) {
return proxyMiddleware = createProxyMiddleware({
    target: "https://api.1inch.dev",
    changeOrigin: true,
    onProxyReq: (proxyReq) => {
      // add API key in Header
      proxyReq.setHeader("Authorization", `Bearer ${process.env.ONE_INCH_KEY}`);
    },
  });
}


export async function GET(request){

const url = new URL(request.url);

    
// Extracting the search parameters
const realUrl = url.searchParams.get('realUrl');

const newUrl = `https://api.1inch.io${realUrl}`;


try{
    //console.log(process.env.ONE_INCH_KEY);
    const response = await fetch(newUrl, {
        headers: {
          Authorization: `Bearer ${process.env.ONE_INCH_KEY}`,
        },
      });
  
      let data;

      if (response.headers.get('content-type')?.includes('application/json')) {
        data = await response.json();
      } else {
        // Handle non-JSON responses, e.g., redirect or error pages
        console.error('Received non-JSON response:', await response.text());
        throw new Error('Expected JSON response, got something else.');
      }
  
      return NextResponse.json(data);
    } catch (err) {
      console.error(err);
      return NextResponse.json({
        message: 'An error occurred while fetching the data.',
        status: 'error',
      });
    }
  }