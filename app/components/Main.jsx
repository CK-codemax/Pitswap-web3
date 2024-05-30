'use client'

import { BsGlobeEuropeAfrica } from "react-icons/bs";
import { CiFaceSmile, CiLocationOn, CiUser } from "react-icons/ci";
import { GoChevronDown, GoPlus } from "react-icons/go";
import { HiXMark } from "react-icons/hi2";
import { AiOutlinePicture } from "react-icons/ai";
import { FaEllipsis, FaRegCircleQuestion } from "react-icons/fa6";


import { FaArrowLeft } from "react-icons/fa";
import { SiBinance } from "react-icons/si";
import { FaChevronDown } from "react-icons/fa6";
import QuestionModal from "./QuestionModal";
import SelectModal from "./SelectModal";

export default function Main() {
  return (
   
    <form  className="fixed w-[90%] sm:w-[70%] lg:w-[400px] top-[50%] py-6 bg-gray-700/60 border-black border p-4 shadow-[0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)] flex flex-col space-y-4 justify-center rounded-2xl left-[50%] -translate-x-[50%] -translate-y-[50%]">
        <div className=" w-full flex text-white justify-between items-center px-2 pb-2">
            <FaArrowLeft className="text-[16px]" />
            <p className="font-bold text-center capitalize w-full mx-auto  py-2 sm:text-xl">Add Liquidity</p>
            <QuestionModal>
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
                   
            </QuestionModal>
        </div>


   <div className="rounded-2xl bg-gray-900 flex flex-col items-start px-4 space-y-3 py-2 text-white h-[80px]">
       <p className="text-xs font-semibold text-gray-200">Input</p>
        <div className="w-full flex justify-between pr-2">
            <input type="text" placeholder="0.0" className="outline-none bg-transparent border-none font-semibold max-w-[50%] text-2xl" />
            <SelectModal>
                <SelectModal.Open>
                <div className="flex space-x-2 items-center cursor-pointer">
                <div className="bg-yellow-500 rounded-full p-2">
                    <SiBinance className="text-black" />
                </div>
                <p className="font-bold text-xl uppercase">bnb</p>
                <FaChevronDown />


            </div>
                </SelectModal.Open>
                <SelectModal.Window />
            </SelectModal>

        </div>
   </div>
   <p className="text-center text-xl text-white">+</p>
   <div className="rounded-2xl bg-gray-900 flex flex-col items-start px-4 space-y-3 py-2 text-white h-[80px]">
       <p className="text-xs font-semibold text-gray-200">Input</p>
        <div className="w-full flex justify-between pr-2">
            <input type="text" placeholder="0.0" className="outline-none bg-transparent border-none font-semibold max-w-[50%] text-2xl" />
            <div className="flex space-x-2 items-center cursor-pointer bg-purple-800 rounded-xl p-1 px-3">
                <p className="text-nowrap text-white font-semibold text-md">
                   Select a currency
                </p>
                <FaChevronDown className="text-white" />


            </div>

        </div>
   </div>


   <button className="w-full block mt-6 py-4 rounded-xl text-xl bg-purple-600 font-semibold text-white mx-auto transition-colors duration-300 ease-in-out hover:bg-purple-700 ">
     Connect wallet
   </button>


    </form>
  )
}
