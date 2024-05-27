'use client'
import Image from "next/image";
import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoShieldOutline } from "react-icons/io5";

import { HiXMark } from "react-icons/hi2";
import { SiBinance } from "react-icons/si";
import { SiWalletconnect } from "react-icons/si";


import { CiHome, CiTwitter } from "react-icons/ci";
import { BiMessageRounded } from "react-icons/bi";
import { FaCode } from "react-icons/fa6";

const ModalContext = createContext();

function MenuModal({ children }) {
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
        <div ref={windowRef}  className="fixed w-[90%] sm:w-[70%] lg:w-[200px] top-24 right-3 bg-gray-700 border-black border py-4 px-4 shadow-[0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)] flex flex-col space-y-4 justify-center rounded-2xl">
            <div className="cursor-pointer text-gray-300 hover:text-white transition-all duration-150 ease-in-out flex space-x-3 items-center">
                <CiHome className="text-[24px]" />
                <p className="font-semibold">Website</p>
            </div>
            <div className="cursor-pointer text-gray-300 hover:text-white transition-all duration-150 ease-in-out flex space-x-3 items-center">
                <BiMessageRounded className="text-[24px]" />
                <p className="font-semibold">Telegram</p>
            </div>
            <div className="cursor-pointer text-gray-300 hover:text-white transition-all duration-150 ease-in-out flex space-x-3 items-center">
                <CiTwitter className="text-[24px]" />
                <p className="font-semibold">Twitter</p>
            </div>
            <div className="cursor-pointer text-gray-300 hover:text-white transition-all duration-150 ease-in-out flex space-x-3 items-center">
                <FaCode className="text-[24px]" />
                <p className="font-semibold">Code</p>
            </div>
            
        </div>,
      document.body
    )
  

  
}

MenuModal.Open = Open;
MenuModal.Window = Window;


export default MenuModal

