'use client'
import Image from "next/image";
import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoShieldOutline } from "react-icons/io5";

import { HiXMark } from "react-icons/hi2";
import { SiBinance } from "react-icons/si";
import { SiWalletconnect } from "react-icons/si";
import { FaArrowLeft, FaChevronDown, FaRegCircleQuestion } from "react-icons/fa6";
import SelectModal from "./SelectModal";
import { AiOutlineRetweet } from "react-icons/ai";

import tokenList from "../../tokenList.json"


const ModalContext = createContext();

function LiquidityModal({ children, from, to, setFromCur, setToCur, prices, setPrices, fetchPrices }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <ModalContext.Provider value={{closeModal, openModal, isOpen, from, setFromCur, setToCur, prices, setPrices, fetchPrices, to }}>
      {children}
    </ModalContext.Provider>
  );
  }

  function Open({children}) {
  const { openModal, setFromCur, setToCur } = useContext(ModalContext);

  function handleChangeLiquidity(){
    setFromCur(tokenList[0])
    setToCur(tokenList[1])
    openModal()
}

  return cloneElement(children, {onClick : () => handleChangeLiquidity()})
}

function Window(){

  const [tokenOneAmount, setTokenOneAmount] = useState('');
  const [tokenTwoAmount, setTokenTwoAmount] = useState('');
  const [invert, setInvert] = useState(false);
  const [mounted, setMounted] = useState(false)
  
  const { closeModal, isOpen, from, prices, setPrices, fetchPrices, to, setFromCur, setToCur } = useContext(ModalContext);
  
  function changeAmount(e) {
    setTokenOneAmount(e.target.value);
    if(e.target.value && prices){
      setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2))
    }else{
      setTokenTwoAmount(null);
    }
  }

  function changeCurOne(type){
    if(type.ticker === from.ticker || type.ticker === to.ticker)return;
    setPrices(null);
    setTokenOneAmount('');
    setTokenTwoAmount('');
    
    setFromCur(type);
    fetchPrices(type.address, to.address)
}

function changeCurTwo(type){
      if(type.ticker === from.ticker || type.ticker === to.ticker)return;
    setPrices(null);
    setTokenOneAmount('');
    setTokenTwoAmount('');

    setToCur(type);
    fetchPrices(from.address, type.address)
  }

  useEffect(() => {
     setMounted(true)

     return () => setMounted(false)
  }, [])

    if(!isOpen)return null
    return createPortal(
    
       
    <form  className="fixed w-[90%] sm:w-[400px] top-[350px] min-h-[450px] py-3 border-black border p-4 shadow-[0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)] flex flex-col space-y-4 justify-center rounded-2xl left-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#2b233f]">
       <div className="w-full flex text-gray-400 jusify-evenly items-center">
            <FaArrowLeft onClick={closeModal} className="text-[16px] cursor-pointer" />
            <p  className="font-bold cursor-pointer text-center capitalize flex-grow  py-2 sm:text-xl">Add Liquidity</p>
            <FaRegCircleQuestion className="text-[16px] text-gray-400" />
        </div>
         <div className="rounded-2xl bg-[#191326] flex flex-col items-start px-4 space-y-3 py-2 text-white h-[80px]">
         <p className="text-xs font-semibold text-gray-200">Input</p>
          <div className="w-full flex justify-between pr-2">
              <input type="text" value={tokenOneAmount} onChange={changeAmount}
            disabled={!prices} placeholder="0.0" className="outline-none bg-transparent border-none font-semibold max-w-[50%] text-2xl" />
              <SelectModal from={from} to={to} changeCur={changeCurOne}>
                  <SelectModal.Open>
                  <div className="flex space-x-2 items-center cursor-pointer">
                  <img className="w-[35px] h-auto object-cover" src={from.img} alt="logo" />
                    <p className={`font-bold text-base uppercase text-white`}>{from.ticker}</p>
                  <FaChevronDown />
              </div>
                  </SelectModal.Open>
                  <SelectModal.Window />
              </SelectModal>
  
          </div>
     </div>
     <p className="text-center text-xl text-white">+</p>
     <div className="rounded-2xl bg-[#191326] flex flex-col items-start px-4 space-y-3 py-2 text-white h-[80px]">
         <p className="text-xs font-semibold text-gray-200">Input</p>
          <div className="w-full flex justify-between">
              <input type="text" value={tokenTwoAmount} disabled={true} placeholder="0.0" className="outline-none bg-transparent border-none font-semibold max-w-[20%] text-2xl" />
             <SelectModal from={to} to={from} changeCur={changeCurTwo}>
                  <SelectModal.Open>
                  <div className="flex space-x-1 items-center cursor-pointer bg-purple-800 rounded-xl p-2 px-3">
                  <p className="text-nowrap text-white font-semibold text-sm sm:text-md">
                     Select a currency
                  </p>
                  <FaChevronDown className="text-white" />
              </div>
                  </SelectModal.Open>
                  <SelectModal.Window />
             </SelectModal>
  
          </div>
     </div>

     {prices && <div className="flex justify-between space-x-5 items-center text-gray-400 text-xs font-semibold">
            <p>Price</p>
            <div className="flex flex-grow justify-end space-x-3 items-center">
                 <p className="flex-grow text-right">{!invert ? `${prices.ratio} ${from.ticker} per ${to.ticker}` : `${1 / prices.ratio} ${to.ticker} per ${from.ticker}`}</p>
                 <div onClick={() => setInvert((init) => !init)} className="p-2 rounded-full cursor-pointer bg-gray-600">
                    <AiOutlineRetweet className="text-[16px] text-white" />
                 </div>
            </div>
         </div>}
  
  
          <div className="w-full flex items-center justify-center">
                <w3m-connect-button className="w-full block mt-6 py-4 rounded-xl text-xl bg-purple-600 font-semibold  text-white mx-auto transition-colors duration-300 ease-in-out hover:bg-purple-700" size="md" label="Connect to a wallet" />
            </div>
</form> ,
      document.body
    )
  

  
}

LiquidityModal.Open = Open;
LiquidityModal.Window = Window;


export default LiquidityModal

