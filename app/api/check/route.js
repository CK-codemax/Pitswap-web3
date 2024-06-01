import { NextResponse } from 'next/server'

export async function GET(response){
  try{
    return NextResponse.json({
        message : 'Yes, the api is working',
        status : "success",
    })
  }catch(err){
   console.error(err);
  }
}