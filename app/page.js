import Header from "./components/Header";
import Main from "./components/Main";

export default function page() {
  return (
    <div className="bg-gray-800 w-full h-screen parent">
      <Header />
      <Main />
    </div>
  )
}
