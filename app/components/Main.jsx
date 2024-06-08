'use client'

import tokenList from "../../new-tokens.json"
import { FaRegCircleQuestion } from "react-icons/fa6";

import { FaLongArrowAltDown } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";

import { FaChevronDown } from "react-icons/fa6";
import SelectModal from "./SelectModal";
import { useEffect, useState } from "react";
import LiquidityModal from "./LiquidityModal";
import axios from "axios";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import toast from "react-hot-toast";
import SettingsModal from "./SettingsModal";

export default function Main() {
    const { address, isConnected } = useAccount();
    const [fromCur, setFromCur] = useState(tokenList[0]);
    const [toCur, setToCur] = useState(tokenList[1]);
    const [active, setActive] = useState('swap');
    const [prices, setPrices] = useState(null);
    const [tokenOneAmount, setTokenOneAmount] = useState('');
    const [tokenTwoAmount, setTokenTwoAmount] = useState('');
    const [invert, setInvert] = useState(false);
    const [slippage, setSlippage] = useState(6);
    const [txDetails, setTxDetails] = useState({
        to:null,
        data: null,
        value: null,
      }); 
    
      const {data, sendTransaction} = useSendTransaction({
        request: {
          from: address,
          to: String(txDetails.to),
          data: String(txDetails.data),
          value: String(txDetails.value),
        }
      })
    
      const { isLoading, isSuccess } = useWaitForTransactionReceipt({
        hash: data?.hash,
      })
    

    console.log(`Address : ${address} \n Connected : ${isConnected}`)

    async function fetchPrices(one, two){
        const res = await axios.get('/api/getPrice', {
            params : {
                addressOne : one,
                addressTwo : two,
            }
        });
    
        console.log(res.data);
        setPrices(res.data);
    }

    async function fetchDexSwap(){

      //   const allowance = await axios.get('/api/proxy', {
      //   params : {
      //     realUrl : `/approve/allowance?tokenAddress=${fromCur.address}&walletAddress=${address}`,
      //   }
      // })

      const allowance = await axios.get(
        '/api/swap', {
          params : {
            realUrl : `/v5.2/1/approve/allowance?tokenAddress=${fromCur.address}&walletAddress=${address}`,
          }
        }
      );
      
      console.log(allowance)
        if(allowance.data.allowance === "0"){
    
          // const approve = await axios.get(`/api/proxy/approve/transaction?tokenAddress=${fromCur.address}`)
          const approve = await axios.get('/api/swap', {
            params : {
              realUrl : `/approve/transaction?tokenAddress=${fromCur.address}`,
            }
          })
    
          setTxDetails(approve.data);
          console.log("not approved")
          return
    
        }
    
        const tx = await axios.get(
          '/api/swap', {
            params : {
              realUrl : `/swap?fromTokenAddress=${fromCur.address}&toTokenAddress=${toCur.address}&amount=${tokenOneAmount.padEnd(fromCur.decimals+tokenOneAmount.length, '0')}&fromAddress=${address}&slippage=${slippage}`,
            }
          }
        )
        // const tx = await axios.get(
        //   `/api/proxy/swap?fromTokenAddress=${fromCur.address}&toTokenAddress=${toCur.address}&amount=${tokenOneAmount.padEnd(fromCur.decimals+tokenOneAmount.length, '0')}&fromAddress=${address}&slippage=${slippage}`
        // )
    
        let decimals = Number(`1E${toCur.decimals}`)
        setTokenTwoAmount((Number(tx.data.toTokenAmount)/decimals).toFixed(2));
    
        setTxDetails(tx.data.tx);
      
      }

    function switchCurrencies(){
        setPrices(null);
        setTokenOneAmount('');
        setTokenTwoAmount('');

        const one = fromCur;
        const two = toCur;

        setFromCur(two);
        setToCur(one);

        fetchPrices(two.address, one.address);
    }

    function changeAmount(e) {
        setTokenOneAmount(e.target.value);
        if(e.target.value && prices){
          setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2))
        }else{
          setTokenTwoAmount(null);
        }
      }

      function changeCurOne(type){
        if(type.ticker === fromCur.ticker || type.ticker === toCur.ticker)return;
        setPrices(null);
        setTokenOneAmount('');
        setTokenTwoAmount('');
        
        setFromCur(type);
        fetchPrices(type.address, toCur.address)
    }
    
    function changeCurTwo(type){
          if(type.ticker === fromCur.ticker || type.ticker === toCur.ticker)return;
        setPrices(null);
        setTokenOneAmount('');
        setTokenTwoAmount('');
    
        setToCur(type);
        fetchPrices(fromCur.address, type.address)
      }
    

  

    useEffect(() => {
        fetchPrices(tokenList[0].address, tokenList[1].address)
    }, [])

    useEffect(()=>{

        if(txDetails.to && isConnected){
          sendTransaction();
        }
    }, [txDetails])

    useEffect(()=>{

        if(isLoading){
          toast.loading('Processing...', {
            position: 'top-left',
            duration: 1500,
            style: {
              minWidth: '200px',
              backgroundColor: '#333',
              color: '#fff',
            },
        })
        }    
    
      },[isLoading])
    
      useEffect(()=>{

        if(isSuccess){
          toast.success('Transaction successful', {
            position: 'top-left',
            duration: 1500,
            style: {
              minWidth: '200px',
              backgroundColor: '#333',
              color: '#fff',
            }
        })
        }else if(txDetails.to){
      
          toast.error('Transaction failed', {
            duration: 1500,
            style: {
              minWidth: '200px',
              backgroundColor: '#333',
              color: '#fff',
            }
        })
        }
    
    
      },[isSuccess])

  return (
   
    <form onSubmit={(e) => e.preventDefault()}  className="w-[90%] sm:w-[400px] min-h-[full] py-3 border-black border p-4 shadow-[0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)] flex flex-col space-y-2 justify-center rounded-2xl bg-[#2b233fb3]">
        <div className="w-full flex text-gray-400 justify-between items-center pb-2">
            {/* <FaArrowLeft className="text-[16px]" /> */}
            <p onClick={() => setActive('swap')} className={`cursor-pointer hover:text-white text-center ${active === 'swap' && 'text-white font-bold'} capitalize w-full mx-auto  py-2 sm:text-xl`}>Swap</p>
            <p onClick={() => setActive('fiat')} className={`cursor-pointer hover:text-white text-center ${active === 'fiat' && 'text-white font-bold'} capitalize w-full mx-auto  py-2 sm:text-xl`}>Fiat</p>
            <p onClick={() => setActive('pool')} className={`cursor-pointer hover:text-white text-center ${active === 'pool' && 'text-white font-bold'} capitalize w-full mx-auto  py-2 sm:text-xl`}>Pool</p>
           
        </div>

        {active === 'swap' && (
            <>
             <div className="rounded-2xl bg-[#191326] flex flex-col items-start px-4 space-y-3 py-2 text-white h-[80px]">
             <p className="text-xs font-semibold text-gray-200">Input</p>
              <div className="w-full flex justify-between pr-2">
                  <input type="text" placeholder="0.0" className="outline-none bg-transparent border-none font-semibold max-w-[50%] text-2xl" value={tokenOneAmount} onChange={changeAmount}
            disabled={!prices}/>
                  <SelectModal from={fromCur} to={toCur} changeCur={changeCurOne}>
                      <SelectModal.Open>
                      <div className="flex space-x-2 items-center cursor-pointer">
                      <img className="w-[35px] h-auto object-cover" src={fromCur.img} alt="logo" />
                        <p className={`font-bold text-base uppercase text-white`}>{fromCur.ticker}</p>
                      <FaChevronDown />
                  </div>
                      </SelectModal.Open>
                      <SelectModal.Window />
                  </SelectModal>
      
              </div>
         </div>
      <div className="w-full flex justify-center">
      <FaLongArrowAltDown className="text-purple-500 cursor-pointer text-[16px]" onClick={switchCurrencies}/>
      </div>
         <div className="rounded-2xl bg-[#191326] flex flex-col items-start px-4 space-y-3 py-2 text-white h-[80px]">
             <p className="text-xs font-semibold text-gray-200">Input</p>
              <div className="w-full flex justify-between pr-2">
                  <input type="text" placeholder="0.0" className="outline-none bg-transparent border-none font-semibold max-w-[50%] text-2xl" value={tokenTwoAmount} disabled={true}/>
                 <SelectModal from={toCur} to={fromCur}  changeCur={changeCurTwo}>
                      <SelectModal.Open>
                            <div className="flex space-x-2 items-center cursor-pointer">
                      <img className="w-[35px] h-auto object-cover" src={toCur.img} alt="logo" />
                        <p className={`font-bold text-base uppercase text-white`}>{toCur.ticker}</p>
                      <FaChevronDown />
                  </div>
                      </SelectModal.Open>
                      <SelectModal.Window />
                 </SelectModal>
      
              </div>
         </div>

         {prices && <div className="flex justify-between space-x-5 items-center text-gray-400 text-xs font-semibold">
            <p>Price</p>
            <div className="flex flex-grow justify-end space-x-3 items-center">
                 <p className="flex-grow text-right">{!invert ? `${prices.ratio} ${fromCur.ticker} per ${toCur.ticker}` : `${1 / prices.ratio} ${toCur.ticker} per ${fromCur.ticker}`}</p>
                 <div onClick={() => setInvert((init) => !init)} className="p-2 rounded-full cursor-pointer bg-gray-600">
                    <AiOutlineRetweet className="text-[16px] text-white" />
                 </div>
            </div>
         </div>}

         <div className="flex justify-between items-center text-gray-400 text-xs font-semibold">
            <p>Slippage tolerance</p>
            <SettingsModal slippage={slippage} setSlippage={setSlippage}>
                <SettingsModal.Open>
                    <p className="cursor-pointer">{Number(slippage)}%</p>
                </SettingsModal.Open>
                <SettingsModal.Window />
            </SettingsModal>
           
         </div>
      
      
            {!isConnected ? (
            <div className="w-full flex items-center justify-center">
                <w3m-connect-button className="w-full block mt-6 py-4 rounded-xl text-xl bg-purple-600 font-semibold  text-white mx-auto transition-colors duration-300 ease-in-out hover:bg-purple-700" size="md" label="Connect to a wallet" />
            </div>) :

            (<button disabled={!tokenOneAmount || slippage <= 0 || slippage > 5} className={`text-white px-4 py-2 w-[50%] ${!tokenOneAmount ? 'cursor-not-allowed' : 'cursor-pointer'} mx-auto rounded-full bg-gray-700 cursor-pointer`} onClick={fetchDexSwap}>Swap</button>
    )}
            {/* <button  className={`text-white px-4 py-2 w-[50%] mx-auto rounded-full bg-gray-700 cursor-pointer`} onClick={fetchDexSwap}>Swap</button> */}
         </>
        )}

        {
            active === 'fiat' && <p className="font-semibold text-white fixed top-12">Click Buy BNB to buy with Fiat and swap to PIT</p>
        }

        {
            active === 'pool' && (
                <>
                   <LiquidityModal from={fromCur} to={toCur} setFromCur={setFromCur} setToCur={setToCur} prices={prices} setPrices={setPrices} fetchPrices={fetchPrices}>
                        <LiquidityModal.Open>
                            <button  className="w-full flex items-center justify-center text-center mt-6 py-4 rounded-xl text-xl bg-purple-600 font-semibold text-white mx-auto transition-colors duration-300 ease-in-out hover:bg-purple-700 ">
                                Add Liquidity
                            </button>
                        </LiquidityModal.Open>
                        <LiquidityModal.Window/>
                   </LiquidityModal>
                    <div className="flex justify-between items-center text-white font-semibold">
                         <p>Your Liquidity</p>
                         <FaRegCircleQuestion className="text-[16px] text-gray-400" />
                    </div>

                    <div className="w-full rounded-xl h-[100px] text-gray-400 flex items-center justify-center text-center bg-gray-900">
                        Connect to wallet to view your liquidity
                    </div>

                    <p className="text-xs font-semibold text-white">{"Don't"} see a pool you joined? <span className="underline cursor-pointer text-purple-600">Import it.</span></p>
                </>
            )
        }


  

       
    </form>
  )
}
