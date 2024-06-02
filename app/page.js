'use client'

import Header from "./components/Header";
import Main from "./components/Main";

export default function Page(){


  return (
    <div className="w-full min-h-screen overflow-hidden parent">
      <Header  />
     <div className="max-h-[450px] overflow-y-scroll scrollbar-hide fixed left-1/2 -translate-x-[50%] top-[100px]">
     <Main />
     </div>
    </div>
  )
}
