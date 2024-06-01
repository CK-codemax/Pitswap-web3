'use client'

import Header from "./components/Header";
import Main from "./components/Main";

export default function Page(){


  return (
    <div className="w-full min-h-screen overflow-y-scroll parent">
      <Header  />
      <Main />
    </div>
  )
}
