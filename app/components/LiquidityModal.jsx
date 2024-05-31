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

const ModalContext = createContext();

function LiquidityModal({ children, from, to, changeCur }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <ModalContext.Provider value={{closeModal, openModal, isOpen, from, changeCur, to }}>
      {children}
    </ModalContext.Provider>
  );
  }

  function Open({children}) {
  const { openModal } = useContext(ModalContext);

  return cloneElement(children, {onClick : () => openModal()})
}

function Window(){
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
     setMounted(true)

     return () => setMounted(false)
  }, [])

  const { closeModal, isOpen, from, changeCur, to } = useContext(ModalContext);
    if(!isOpen)return null
    return createPortal(
    
       
    <form  className="fixed w-[90%] sm:w-[70%] lg:w-[400px] top-[50%] min-h-[450px] py-6 border-black border p-4 shadow-[0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)] flex flex-col space-y-4 justify-center rounded-2xl left-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#2b233f]">
       <div className="fixed top-4 w-full flex text-gray-400 jusify-evenly items-center pb-2">
            <FaArrowLeft onClick={closeModal} className="text-[16px] cursor-pointer" />
            <p  className="font-bold cursor-pointer text-center capitalize w-full mx-auto  py-2 sm:text-xl">Add Liquidity</p>
            <FaRegCircleQuestion className="text-[16px] text-gray-400 fixed right-9" />
        </div>
         <div className="rounded-2xl bg-[#191326] flex flex-col items-start px-4 space-y-3 py-2 text-white h-[80px]">
         <p className="text-xs font-semibold text-gray-200">Input</p>
          <div className="w-full flex justify-between pr-2">
              <input type="text" placeholder="0.0" className="outline-none bg-transparent border-none font-semibold max-w-[50%] text-2xl" />
              <SelectModal from={from} to={to} changeCur={changeCur}>
                  <SelectModal.Open>
                  <div className="flex space-x-2 items-center cursor-pointer">
                  <img className="w-[35px] h-auto object-cover" src={from.logo} alt="logo" />
                    <p className={`font-bold text-base uppercase text-white`}>{from.name}</p>
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
          <div className="w-full flex justify-between pr-2">
              <input type="text" placeholder="0.0" className="outline-none bg-transparent border-none font-semibold max-w-[50%] text-2xl" />
             <SelectModal from={to} to={from} changeCur={changeCur}>
                  <SelectModal.Open>
                  <div className="flex space-x-2 items-center cursor-pointer bg-purple-800 rounded-xl p-1 px-3">
                  <p className="text-nowrap text-white font-semibold text-md">
                     Select a currency
                  </p>
                  <FaChevronDown className="text-white" />
              </div>
                  </SelectModal.Open>
                  <SelectModal.Window />
             </SelectModal>
  
          </div>
     </div>
  
  
     <button className="w-full block mt-6 py-4 rounded-xl text-xl bg-purple-600 font-semibold text-white mx-auto transition-colors duration-300 ease-in-out hover:bg-purple-700 ">
       Connect wallet
     </button>
</form> ,
      document.body
    )
  

  
}

LiquidityModal.Open = Open;
LiquidityModal.Window = Window;


export default LiquidityModal

