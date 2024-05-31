'use client'

import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { CiFaceSmile, CiLocationOn, CiUser } from "react-icons/ci";
import { GoChevronDown, GoPlus } from "react-icons/go";
import { HiXMark } from "react-icons/hi2";
import { AiOutlinePicture } from "react-icons/ai";
import { FaEllipsis, FaRegCircleQuestion } from "react-icons/fa6";

import { FaLongArrowAltDown } from "react-icons/fa";

import { FaArrowLeft } from "react-icons/fa";
import { SiBinance } from "react-icons/si";
import { FaChevronDown } from "react-icons/fa6";
import QuestionModal from "./QuestionModal";
import SelectModal from "./SelectModal";
import { useState } from "react";
import LiquidityModal from "./LiquidityModal";

export default function Main() {
    const [fromCur, setFromCur] = useState({name : 'bnb', logo : '/binance.png'});
    const [toCur, setToCur] = useState({name : 'pit', logo : '/binance.png'});
    const [active, setActive] = useState('swap');

  return (
   
    <form onSubmit={(e) => e.preventDefault()}  className="fixed w-[90%] sm:w-[400px] top-[350px] min-h-[450px] py-6 border-black border p-4 shadow-[0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)] flex flex-col space-y-4 justify-center rounded-2xl left-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#2b233fb3]">
        <div className="fixed top-4 w-full flex text-gray-400 justify-between items-center pb-2">
            {/* <FaArrowLeft className="text-[16px]" /> */}
            <p onClick={() => setActive('swap')} className={`cursor-pointer hover:text-white text-center ${active === 'swap' && 'text-white font-bold'} capitalize w-full mx-auto  py-2 sm:text-xl`}>Swap</p>
            <p onClick={() => setActive('fiat')} className={`cursor-pointer hover:text-white text-center ${active === 'fiat' && 'text-white font-bold'} capitalize w-full mx-auto  py-2 sm:text-xl`}>Fiat</p>
            <p onClick={() => setActive('pool')} className={`cursor-pointer hover:text-white text-center ${active === 'pool' && 'text-white font-bold'} capitalize w-full mx-auto  py-2 sm:text-xl`}>Pool</p>
            {/* <QuestionModal>
                <QuestionModal.Open>
                    <FaRegCircleQuestion className="text-[16px]" />
                </QuestionModal.Open>
                <QuestionModal.Window>
                <div className="fixed top-10 left-10 p-4 rounded-xl w-[250px] bg-gray-700">
                        <p className="w-full text-white">
                            When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.
                        </p>
                    </div>
                </QuestionModal.Window>
                   
            </QuestionModal> */}
        </div>

        {active === 'swap' && (
            <>
             <div className="rounded-2xl bg-[#191326] flex flex-col items-start px-4 space-y-3 py-2 text-white h-[80px]">
             <p className="text-xs font-semibold text-gray-200">Input</p>
              <div className="w-full flex justify-between pr-2">
                  <input type="text" placeholder="0.0" className="outline-none bg-transparent border-none font-semibold max-w-[50%] text-2xl" />
                  <SelectModal from={fromCur} to={toCur} changeCur={setFromCur}>
                      <SelectModal.Open>
                      <div className="flex space-x-2 items-center cursor-pointer">
                      <img className="w-[35px] h-auto object-cover" src={fromCur.logo} alt="logo" />
                        <p className={`font-bold text-base uppercase text-white`}>{fromCur.name}</p>
                      <FaChevronDown />
                  </div>
                      </SelectModal.Open>
                      <SelectModal.Window />
                  </SelectModal>
      
              </div>
         </div>
      <div className="w-full flex justify-center">
      <FaLongArrowAltDown className="text-purple-500 cursor-pointer text-[16px]" />
      </div>
         <div className="rounded-2xl bg-[#191326] flex flex-col items-start px-4 space-y-3 py-2 text-white h-[80px]">
             <p className="text-xs font-semibold text-gray-200">Input</p>
              <div className="w-full flex justify-between pr-2">
                  <input type="text" placeholder="0.0" className="outline-none bg-transparent border-none font-semibold max-w-[50%] text-2xl" />
                 <SelectModal from={toCur} to={fromCur} changeCur={setToCur}>
                      <SelectModal.Open>
                      {/* <div className="flex space-x-2 items-center cursor-pointer bg-purple-800 rounded-xl p-1 px-3">
                      <p className="text-nowrap text-white font-semibold text-md">
                         Select a currency
                      </p>
                      <FaChevronDown className="text-white" />
      
      
                  </div> */}
                            <div className="flex space-x-2 items-center cursor-pointer">
                      <img className="w-[35px] h-auto object-cover" src={toCur.logo} alt="logo" />
                        <p className={`font-bold text-base uppercase text-white`}>{toCur.name}</p>
                      <FaChevronDown />
                  </div>
                      </SelectModal.Open>
                      <SelectModal.Window />
                 </SelectModal>
      
              </div>
         </div>

         <div className="flex justify-between items-center text-gray-400 text-xs font-semibold">
            <p>Slippage tolerance</p>
            <p>6%</p>
         </div>
      
      
         <button className="w-full block mt-6 py-4 rounded-xl text-xl bg-purple-600 font-semibold text-white mx-auto transition-colors duration-300 ease-in-out hover:bg-purple-700 ">
           Connect wallet
         </button>
         </>
        )}

        {
            active === 'fiat' && <p className="font-semibold text-white fixed top-12">Click Buy BNB to buy with Fiat and swap to PIT</p>
        }

        {
            active === 'pool' && (
                <>
                   <LiquidityModal from={fromCur} to={toCur} changeCur={setFromCur} >
                        <LiquidityModal.Open>
                            <button className="w-full flex items-center justify-center text-center mt-6 py-4 rounded-xl text-xl bg-purple-600 font-semibold text-white mx-auto transition-colors duration-300 ease-in-out hover:bg-purple-700 ">
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
