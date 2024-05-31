'use client'

import Image from "next/image";
import { CiSettings } from "react-icons/ci";
import { FaEllipsis } from "react-icons/fa6";
import ConnectModal from "./ConnectModal";
import SettingsModal from "./SettingsModal";
import MenuModal from "./MenuModal";
import Link from "next/link";


export default function Header() {
  return (
    <header className="flex justify-between items-start sm:items-center pt-6 sm:pt-2 py-2 px-4">
        <Link href={'/'}>
            <img className="hover:-rotate-[15deg] w-[130px] object-cover sm:w-[200px] h-auto transition-all duration-300 ease-in-out" src={'/seyi-logo.png'} alt="logo"  />
        </Link>

        <div className="hidden sm:flex items-center space-x-3">
            <ConnectModal>
                <ConnectModal.Open>
                <p className="p-[6px] font-semibold text-blue-400 bg-gray-600 rounded-md cursor-pointer transition-all duration-150 ease-in-out hover:bg-gray-500">Connect to a wallet</p>
                </ConnectModal.Open>
                <ConnectModal.Window/>
            </ConnectModal>
            <SettingsModal>
                <SettingsModal.Open>
                    <div className="p-1 rounded-md bg-gray-700 cursor-pointer transition-all hover:bg-gray-600 duration-150 ease-in-out">
                        <CiSettings className="text-white text-[28px]" />
                    </div>
                </SettingsModal.Open>
                <SettingsModal.Window />
            </SettingsModal>

            <MenuModal>
                <MenuModal.Open>
                    <div className="p-1 rounded-md bg-gray-700 cursor-pointer transition-all hover:bg-gray-600 duration-150 ease-in-out">
                        <FaEllipsis className="text-white text-[28px]" />
                    </div>

                </MenuModal.Open>
                <MenuModal.Window />
            </MenuModal>
        </div>

        <div className="flex sm:hidden flex-col items-end space-y-3">
            <ConnectModal>
                <ConnectModal.Open>
                <p className="p-[6px] font-semibold text-blue-400 text-nowrap bg-gray-600 rounded-md cursor-pointer transition-all duration-150 ease-in-out hover:bg-gray-500">Connect to a wallet</p>
                </ConnectModal.Open>
                <ConnectModal.Window/>
            </ConnectModal>
           <div className="flex items-center space-x-3 justify-end">
           <SettingsModal>
                <SettingsModal.Open>
                    <div className="p-1 rounded-md bg-gray-700 cursor-pointer transition-all hover:bg-gray-600 duration-150 ease-in-out">
                        <CiSettings className="text-white text-[28px]" />
                    </div>
                </SettingsModal.Open>
                <SettingsModal.Window />
            </SettingsModal>

            <MenuModal>
                <MenuModal.Open>
                    <div className="p-1 rounded-md bg-gray-700 cursor-pointer transition-all hover:bg-gray-600 duration-150 ease-in-out">
                        <FaEllipsis className="text-white text-[28px]" />
                    </div>

                </MenuModal.Open>
                <MenuModal.Window />
            </MenuModal>
           </div>
        </div>
    </header>
  )
}
