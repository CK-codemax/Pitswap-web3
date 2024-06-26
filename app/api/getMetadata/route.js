import { NextResponse, NextRequest } from 'next/server'

const Moralis = require('moralis').default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const addresses = [
        "0xa57ac35ce91ee92caefaa8dc04140c8e232c2e50",
        "0xb8c77482e45f1f44de1745f52c74426c631bdd52",
        "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "0x418d75f65a02b3d53b2418fb8e1fe493759c7605",
        "0x862827e70221c3a0ba27ab608ddfe4d5d3fe27c2",
        "0x8850d2c68c632e3b258e612abaa8fada7e6958e5",
        "0xee5b03b769ca6c690d140cafb52fc8de3f38fc28",
        "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
        "0x6b175474e89094c44da98b954eedeac495271d0f",
        "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82",
        "0xe9e7cea3dedca5984780bafc599bd69add087d56",
        "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c"
  ];


const chain = EvmChain.BSC;


export async function GET(request){
    try{
        const response = await Moralis.EvmApi.token.getTokenMetadata({
            addresses,
            chain,
          });        
    return NextResponse.json(response)
  }catch(err){
   console.error(err);
  }
}

Moralis.start({
    apiKey: process.env.MORALIS_KEY,
  }).then(() => {
      console.log(`Listening for API Calls`);
  });