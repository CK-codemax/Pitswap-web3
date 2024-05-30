'use client'
import Image from "next/image";
import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoShieldOutline } from "react-icons/io5";

import { HiXMark } from "react-icons/hi2";
import { SiBinance } from "react-icons/si";
import { SiWalletconnect } from "react-icons/si";

const ModalContext = createContext();

function ConnectModal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <ModalContext.Provider value={{closeModal, openModal, isOpen }}>
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

  const { closeModal, isOpen } = useContext(ModalContext);
  const windowRef = useRef()
 

  useEffect(
    function(){
    function handleClick(e){
      if(windowRef.current && !windowRef.current.contains(e.target)){
        closeModal()
      }
    }

    document.addEventListener('click', handleClick, true)

   return () => document.removeEventListener('click', handleClick, true)
    },
    [closeModal]
  )


    if(!mounted)return
    if(!isOpen)return null
    return createPortal(
    
        <div ref={windowRef}  className="fixed w-[90%] sm:w-[70%] lg:w-[400px] min-h-[450px] top-[50%] py-6 bg-gray-800 border-black border px-4 shadow-[0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)] flex flex-col space-y-4 justify-center rounded-2xl left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <div className=" w-full flex text-white justify-between items-center px-2">
                <p className="font-semibold text-left  py-2 text-md cursor-pointer">Connect a wallet</p>
                <div onClick={closeModal} className="w-[50px] h-[50px] bg-transparent hover:bg-gray-700 active:bg-gray-700  cursor-pointer transition-colors duration-300 ease-in-out rounded-full flex items-center justify-center">
                   <HiXMark className="text-[24px] text-white " />
                </div>
            </div>

            <div className="flex flex-col space-y-3 px-6">
                <div className="flex items-center justify-between border cursor-pointer transition-all duration-200 ease-in-out hover:border-purple-600 border-gray-100 rounded-xl p-3">
                    <p className="text-white font-semibold flex-grow">WalletConnect</p>
                    <SiWalletconnect className="text-blue-400 text-[28px]" />
                </div>
                <div className="flex items-center justify-between border cursor-pointer transition-all duration-200 ease-in-out hover:border-purple-600 border-gray-100 rounded-xl p-3">
                    <p className="text-white font-semibold flex-grow">Binance Chain Wallet</p>
                    <div className="bg-black p-2">
                        <SiBinance className="text-yellow-600" />
                    </div>
                </div>
                <div className="flex items-center justify-between border cursor-pointer transition-all duration-200 ease-in-out hover:border-purple-600 border-gray-100 rounded-xl p-3">
                    <p className="text-white font-semibold flex-grow">Install MetaMask</p>
                    <SiWalletconnect className="text-blue-400 text-[28px]" />
                </div>
                <div className="flex items-center justify-between bg-gray-700 rounded-xl p-3">
                    <div className="bg-green-400 rounded-full w-2 h-2"/>
                    <p className="text-white font-semibold flex-grow">Trust Wallet</p>
                    <IoShieldOutline className="text-blue-400 text-[28px]" />
                </div>

                <p className="font-semibold text-white text-center">
                    New to BSC?  
                    <span className="text-purple-600">{'   '} Learn more about wallets</span>
                </p>

            </div>
        
        </div>,
      document.body
    )
  

  
}

ConnectModal.Open = Open;
ConnectModal.Window = Window;


export default ConnectModal

