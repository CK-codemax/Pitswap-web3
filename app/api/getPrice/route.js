import { NextResponse, NextRequest } from 'next/server'
import tokenList from "../../../tokenList.json"

const Moralis = require('moralis').default;


export async function GET(request){
    const url = new URL(request.url);

// Extracting the search parameters
const addressOne = url.searchParams.get('addressOne');
const addressTwo = url.searchParams.get('addressTwo');

  try{
    const responseOne = await Moralis.EvmApi.token.getTokenPrice({
        address : addressOne,
    })

    const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
        address : addressTwo,
    })

    console.log(responseOne.raw, responseTwo.raw);
    return NextResponse.json({
        tokenOne : responseOne.raw.usdPrice,
        tokenTwo : responseTwo.raw.usdPrice,
        ratio : responseOne.raw.usdPrice / responseTwo.raw.usdPrice
    })
  }catch(err){
   console.error(err);
  }
}

Moralis.start({
    apiKey: process.env.MORALIS_KEY,
  }).then(() => {
      console.log(`Listening for API Calls`);
  });