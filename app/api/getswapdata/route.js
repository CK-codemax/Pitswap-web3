import { NextResponse, NextRequest } from 'next/server'
const Moralis = require('moralis').default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const addresses = [
    // "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    // "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    // "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    // "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    // "0x7B4B0B9b024109D182dCF3831222fbdA81369423",
    // "0x7c8161545717a334f3196e765d9713f8042EF338",
    // "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    // "0xb2114E5420927932666A5C5Bd1ac4e14d9EDe32B",
    // "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    // "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    // "0x418D75f65a02b3D53B2418FB8E1fe493759c7605",
  ];

const chain = EvmChain.ETHEREUM;
const symbols = ["UNI", "AAVE", "LINK"];


export async function GET(request){
    try{
        const response = await Moralis.EvmApi.token.getTokenMetadataBySymbol({
            symbols,
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