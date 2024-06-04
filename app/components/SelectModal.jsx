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
import tokenList from "../../new-tokens.json"

const options = [
    {logo : '/bnb-real.png', name : 'bnb',},
    {logo : '/btc-real.png', name : 'btc',},
    {logo : '/busd-real.png', name : 'busd',},
    {logo : '/cake-real.png', name : 'cake',},
    {logo : '/dai-real.png', name : 'dai',},
    {logo : '/eth-real.png', name : 'eth',},
    {logo : '/hyper-real.png', name : 'hyper',},
    {logo : '/pig-real.png', name : 'pig',},
    {logo : '/pit-real.png', name : 'pit',},
    {logo : '/saferune-real.png', name : 'saferune',},
    {logo : '/usdc-real.png', name : 'usdc',},
    {logo : '/usdt-real.png', name : 'usdt',},
    {logo : '/wbnb-real.png', name : 'wbnb',},
];

const ModalContext = createContext();

function SelectModal({ children, from, changeCur, to}) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <ModalContext.Provider value={{closeModal, openModal, isOpen, from, changeCur, to}}>
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

  function handleChangeCur(type){
    changeCur(type);
    closeModal();
  }


    if(!mounted)return
    if(!isOpen)return null
    return createPortal(
    
        <div ref={windowRef}  className="fixed  w-[90%] z-50 sm:w-[70%] lg:w-[400px] overflow-hidden top-[50%] pt-6 bg-gray-800 border-black border shadow-[0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)] flex flex-col space-y-4 justify-center rounded-2xl left-[50%] -translate-x-[50%] -translate-y-[50%]">
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
                <FaLongArrowAltDown className="text-[12px] cursor-pointer" />
            </div>

            <div className="overflow-hidden pl-4">
                <div className="flex flex-col space-y-6 h-[300px] overflow-y-scroll pb-8">
                    {tokenList.map((type => <div onClick={() => handleChangeCur(type)} className={`flex items-center ${from.ticker === type.ticker || to.ticker === type.ticker ? 'opacity-[50%]' : 'opacity-100'} space-x-3 cursor-pointer`} key={type.name}>
                        <img className="w-[35px] h-auto object-cover" src={type.img} alt="logo" />
                        <p className={`font-bold text-base uppercase text-white`}>{type.ticker}</p>
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

