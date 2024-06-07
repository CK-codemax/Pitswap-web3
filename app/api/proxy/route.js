
import { NextResponse } from 'next/server'


const authHeader = `Bearer ${process.env.ONE_INCH_KEY}`;


export async function GET(request){

    const url = new URL(request.url);

    
// Extracting the search parameters
const realUrl = url.searchParams.get('realUrl');

const newUrl = `https://api.1inch.io${realUrl}`;

  try{
    console.log(newUrl)
    
    const response = await fetch(newUrl, {
        method: request.method,
        headers: {
         ...request.headers,
          Authorization: authHeader,
        },
        // body: JSON.stringify(queryParams),
      });
      console.log(response);
    return NextResponse.json({
        message : 'Yes, the api is working',
        status : "success",
    })
  }catch(err){
   console.error(err);
  }
}
  