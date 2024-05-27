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

function QuestionModal({ children }) {
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
  const { openModal, closeModal } = useContext(ModalContext);

  return cloneElement(children, {onMouseEnter : () => openModal(), onMouseLeave : () => closeModal()})
}

function Window({children}){
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
     setMounted(true)

     return () => setMounted(false)
  }, [])

  const { isOpen } = useContext(ModalContext);
 
    if(!mounted)return
    if(!isOpen)return null
    return createPortal(
       <>
            {children}
       </>
      ,
      document.body
    )
  

  
}

QuestionModal.Open = Open;
QuestionModal.Window = Window;


export default QuestionModal

