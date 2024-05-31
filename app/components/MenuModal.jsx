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
        <div ref={windowRef}  className="fixed w-[200px] top-36 sm:top-24 right-3 sm:right-8 bg-gray-700 border-black border py-4 px-4 shadow-[0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)] flex flex-col space-y-4 justify-center rounded-2xl">
                <a className="cursor-pointer text-gray-300 hover:text-white transition-all duration-150 ease-in-out flex space-x-3 items-center font-semibold" href='https://www.pitbull.community/' target="_blank" rel="noopener noreferrer">
                <CiHome className="text-[24px]" />
                  <span>Website</span>
                  </a>
           
                <a className="cursor-pointer text-gray-300 hover:text-white transition-all duration-150 ease-in-out flex space-x-3 items-center font-semibold" href='https://t.me/Pitbull_BSC' target="_blank" rel="noopener noreferrer">
                <BiMessageRounded  className="text-[24px]" />
                  <span>Telegram</span>
                  </a>
           
                <a className="cursor-pointer text-gray-300 hover:text-white transition-all duration-150 ease-in-out flex space-x-3 items-center font-semibold" href='https://twitter.com/BscPitbull' target="_blank" rel="noopener noreferrer">
                <CiTwitter className="text-[24px]" />
                  <span>Twitter</span>
                  </a>
           
                <a className="cursor-pointer text-gray-300 hover:text-white transition-all duration-150 ease-in-out flex space-x-3 items-center font-semibold" href='https://github.com/pitbullBSC/pitbull.sol' target="_blank" rel="noopener noreferrer">
                <FaCode className="text-[24px]" />
                  <span>Code</span>
                  </a>
           
        </div>,
      document.body
    )
  

  
}

MenuModal.Open = Open;
MenuModal.Window = Window;


export default MenuModal

