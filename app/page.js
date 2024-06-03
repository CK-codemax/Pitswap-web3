'use client'

import Header from "./components/Header";
import Main from "./components/Main";

export default function Page(){


  return (
    <div className="w-full min-h-screen overflow-scroll scrollbar-hide parent bg-zinc-900">
      <Header  />
     <div className="max-h-[450px] w-full overflow-y-scroll scrollbar-hide fixed flex justify-center top-[170px] sm:top-[150px] xl:top-[100px]">
     <Main />
     </div>
    </div>
  )
}
