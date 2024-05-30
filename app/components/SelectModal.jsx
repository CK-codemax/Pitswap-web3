'use client'
import Image from "next/image";
import { cloneElement, createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoShieldOutline } from "react-icons/io5";

import { HiXMark } from "react-icons/hi2";
import { SiBinance } from "react-icons/si";
import { SiWalletconnect } from "react-icons/si";
import { FaRegCircleQuestion } from "react-icons/fa6";

import { FaLongArrowAltDown } from "react-icons/fa";

const options = [
    {logo : '/bnb.png', name : 'bnb',},
    {logo : '/bnb.png', name : 'btc',},
    {logo : '/bnb.png', name : 'busd',},
    {logo : '/bnb.png', name : 'cake',},
    {logo : '/bnb.png', name : 'dai',},
    {logo : '/bnb.png', name : 'eth',},
    {logo : '/bnb.png', name : 'hyper',},
    {logo : '/bnb.png', name : 'pig',},
    {logo : '/bnb.png', name : 'pit',},
    {logo : '/bnb.png', name : 'saferune',},
    {logo : '/bnb.png', name : 'usdc',},
    {logo : '/bnb.png', name : 'usdt',},
    {logo : '/bnb.png', name : 'wbnb',},
];

const ModalContext = createContext();

function SelectModal({ children }) {
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
    
        <div ref={windowRef}  className="fixed w-[90%] sm:w-[70%] lg:w-[400px] overflow-hidden top-[50%] pt-6 bg-gray-800 border-black border shadow-[0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)] flex flex-col space-y-4 justify-center rounded-2xl left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <div className=" w-full flex text-white justify-between items-center px-4">
               <div className="flex items-center space-x-2">
               <p className="font-semibold text-left  py-2 text-md cursor-pointer">Select a token</p>
                <FaRegCircleQuestion className="text-[16px]" />
               </div>
                <div onClick={closeModal} className="w-[50px] h-[50px] bg-transparent hover:bg-gray-700 active:bg-gray-700  cursor-pointer transition-colors duration-300 ease-in-out rounded-full flex items-center justify-center">
                   <HiXMark className="text-[24px] text-white " />
                </div>
            </div>

            <input type="text" placeholder="Search name or paste address" className="py-3 mx-4 px-4 border border-gray-300 rounded-2xl bg-transparent outline-none text-white focus:border-purple-600" />

            <div className="flex items-center justify-between px-4 text-white">
                <p className="font-semibold text-xs">Token name</p>
                <FaLongArrowAltDown className="text-[12px]" />
            </div>

            <div className="overflow-hidden pl-4">
                <div className="flex flex-col space-y-6 h-[300px] overflow-y-scroll">
                    {options.map((type => <div className="flex items-center space-x-3 cursor-pointer" key={type.name}>
                        <img className="w-[35px] h-auto object-cover" src={type.logo} alt="logo" />
                        <p className="font-bold text-base uppercase text-white">{type.name}</p>
                    </div>))}
                </div>

            </div>

          
        
        </div>,
      document.body
    )
  

  
}

SelectModal.Open = Open;
SelectModal.Window = Window;


export default SelectModal
