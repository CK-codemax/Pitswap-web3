// import { NextResponse, NextRequest } from 'next/server'

// export async function GET(request) {
//     //const url = new URL(request.url);

//     try{
       
//         return NextResponse.json({
//            'message' : 'success',
//            status : 200
//         })

//     }catch(err){
//         console.log(err)
//     }

    // const url = req.url.replace('/api/proxy', 'https://api.1inch.io');
    // const options = {
    //   method: req.method,
    //   headers: req.headers,
    //   body: req.body,
    // };
  
    // try {
    //   const response = await fetch(url, options);
    //   const data = await response.json();
    //   res.status(response.status).json(data);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ error: 'An error occurred while fetching the data.' });
    // }
//   }

import { NextResponse } from 'next/server'

const API_KEY = 'cxrQLtw5f564X02g7QpmGVjQarR1EFcR';

export async function GET(request){

    const url = new URL(request.url);

    
// Extracting the search parameters
const realUrl = url.searchParams.get('realUrl');

const newUrl = `https://api.1inch.io${realUrl}`;

const options = {
      method: request.method,
      headers: req.headers,
      body: req.body,
    };


  try{
    console.log(newUrl)
    return NextResponse.json({
        message : 'Yes, the api is working',
        status : "success",
    })
  }catch(err){
   console.error(err);
  }
}
  