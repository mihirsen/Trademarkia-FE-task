import React, { useContext } from "react";
import Header from "./components/Header";
import FilterSec from "./components/FilterSec";
import TrademarkDataDisplay from "./components/Trademark";
import { TrademarkContext } from "./context/TrademarkContext";
import RenderPagination from "./components/RenderPagination";
import { Toaster } from "react-hot-toast";

function App() {
  const { menuOpen } = useContext(TrademarkContext);
  return (
    <div
      className={`bg-[#EBF1FF] flex flex-col ${
        menuOpen ? "max-[650px]:h-screen overflow-scroll" : ""
      }`}
    >
      <Header />
      <div className=" flex flex-col relative">
        <FilterSec />
        <TrademarkDataDisplay />
        <RenderPagination />
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
