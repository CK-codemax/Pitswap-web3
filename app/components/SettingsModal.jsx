'use client'
import Image from "next/image";
import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoShieldOutline } from "react-icons/io5";

import { HiXMark } from "react-icons/hi2";
import { SiBinance } from "react-icons/si";
import { SiWalletconnect } from "react-icons/si";
import { FaRegCircleQuestion } from "react-icons/fa6";

const ModalContext = createContext();

function SettingsModal({ children }) {
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
      
        <div ref={windowRef}  className="fixed w-[90%] sm:w-[70%] lg:w-[350px] top-24 right-12 pb-6 bg-gray-800 border-black border py-2 px-4 shadow-[0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)] flex flex-col space-y-4 justify-center rounded-2xl ">
            <div className=" w-full flex flex-col text-white px-2">
                <div className="flex space-x-1 items-center">

                <p className="font-semibold text-left  py-2 text-md cursor-pointer">Transaction settings
                </p>
                <FaRegCircleQuestion className="text-[12px]" />
                </div>
               <p className="text-xs">Slippage tolerance</p>
            </div>
            <div className="flex space-x-3 items-center">
                <p className="flex items-center justify-center text-white text-xs font-semibold cursor-pointer min-w-[50px] h-[35px] transition-all duration-150 ease-in-out hover:border-gray-100 rounded-full bg-transparent border border-gray-300">0.1%</p>
                <p className="flex items-center justify-center text-white text-xs font-semibold cursor-pointer min-w-[50px] h-[35px] transition-all duration-150 ease-in-out hover:border-gray-100 rounded-full bg-transparent border border-gray-300">0.5%</p>
                <p className="flex items-center justify-center text-white text-xs font-semibold cursor-pointer min-w-[50px] h-[35px] transition-all duration-150 ease-in-out hover:border-gray-100 rounded-full bg-transparent border border-gray-300">1%</p>
                <div className="flex flex-grow pl-20 border w-[100px] h-[35px] rounded-full border-purple-600 hover:border-gray-300 transition ease-in-out duration-150">
                    <input type="text" className="outline-none border-none bg-transparent text-white placeholder:text-gray-400" placeholder="0.10%" />
                </div>
            </div>

            <p className="text-sm text-amber-600">Your transaction may be frontrun</p>
                <div className="flex space-x-1 items-center text-gray-400">

                <p className="font-semibold text-left  py-2 text-sm cursor-pointer">Transaction deadline
                </p>
                <FaRegCircleQuestion className="text-[12px]" />
                </div>
                <div className="flex items-center space-x-3">

                <div className="pl-20 flex items-center border w-[130px] h-[35px] rounded-full border-purple-600 hover:border-gray-300 transition ease-in-out duration-150">
                    <input type="text" className="outline-none border-none bg-transparent text-white placeholder:text-gray-400" placeholder="20" />
                </div>
                <p className="text-white">minutes</p>
                </div>
                <div className="flex flex-col">

                    <p className="font-semibold text-left text-white  py-2 text-sm cursor-pointer">Interface settings</p>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-400 text-xs font-semibold">

                        Toggle Audio Mode
                        </p>
                        <div className="flex items-center space-x-3">

                            <p className="cursor-pointer px-3 py-1 text-white justify-center border border-gray-100 rounded-full">On</p>
                            <p className="cursor-pointer px-3 py-1 text-white justify-center border border-gray-100 rounded-full">Off</p>
                        </div>

                    </div>
                </div>
        </div>,
      document.body
    )
  

  
}

SettingsModal.Open = Open;
SettingsModal.Window = Window;


export default SettingsModal

