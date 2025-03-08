import React, { useContext } from "react";
import { LuFilter } from "react-icons/lu";
import { BsFilterLeft } from "react-icons/bs";
import { TbShare } from "react-icons/tb";
import { TrademarkContext } from "../context/TrademarkContext";
import { GiArtificialHive } from "react-icons/gi";

function FilterSec() {
  const { searchQuery, setMenuOpen, trademarks } = useContext(TrademarkContext);
  return (
    <section className="bg-[#FEFEFE] ">
      <section
        className=" px-14 mt-4 max-[1250px]:px-10  min-[2000px]:ml-[50%] min-[2000px]:translate-x-[-50%] min-[2000px]:w-[2000px]
       max-[850px]:px-14 max-[650px]:px-5 max-[650px]:gap-4 max-[650px]:flex-col max-[650px]:items-start"
      >
        <p className=" text-[#4B5563] text-[16px] font-semibold tracking-wide leading-[30px] py-4 max-[650px]:text-[14px]">
          About {trademarks?.total?.value ?? 0} Trademarks found for "
          {searchQuery}"
        </p>
        <hr color="#E7E6E6" className=" h-[1.5px]" />
        <section
          className=" flex items-center justify-between py-6 
        max-[650px]:py-2 max-[650px]:gap-4 max-[650px]:flex-col max-[650px]:items-start max-[650px]:pb-4"
        >
          <div className=" flex items-center gap-4">
            <h1 className=" text-[#4B5563] text-[16px] leading-[30px] font-semibold tracking-wide max-[650px]:text-[14px]">
              Also try searching for :
            </h1>
            <h2
              className=" bg-[#FEF7F0] border border-[#E7760E] text-[#E7760E] px-3.5 py-2 font-semibold tracking-wide rounded-lg
            max-[650px]:py-1 max-[650px]:px-2 max-[650px]:text-[14px]"
            >
              nike*
            </h2>
            <h2
              className=" bg-[#FEF7F0] border border-[#E7760E] text-[#E7760E] px-3.5 py-2 font-semibold tracking-wide rounded-lg
            max-[650px]:py-1 max-[650px]:px-2 max-[650px]:text-[14px]"
            >
              like*
            </h2>
          </div>
          <div className=" flex items-center gap-6 pr-24 max-[1250px]:pr-12 max-[650px]:pr-0 max-[650px]:w-full max-[650px]:justify-between">
            <span
              className=" flex items-center gap-2 border-[#C8C8C8] border px-4 text-[14px] max-[650px]:text-[12px] py-2 rounded-lg cursor-pointer"
              onClick={() => setMenuOpen(true)}
            >
              <LuFilter className="text-[#575757] text-[20px] max-[650px]:text-[16px]" />
              <span className=" text-[#575757] tracking-wide font-medium">
                Filter
              </span>
            </span>
            <span className="hidden max-[650px]:flex  items-center gap-2 border-[#C8C8C8] border px-4 text-[14px] max-[650px]:text-[12px] py-2 rounded-lg cursor-pointer">
              <GiArtificialHive className="text-[#D545ED] text-[20px] max-[650px]:text-[16px]" />
              <span className=" text-[#575757] tracking-wide font-medium">
                AI
              </span>
            </span>
            <span className=" border border-[#C8C8C8] p-2 rounded-full cursor-pointer">
              <TbShare color="#575757" size={18} className=" font-semibold" />
            </span>
            <span className=" border border-[#C8C8C8] p-2 rounded-full cursor-pointer">
              <BsFilterLeft
                color="#575757"
                size={18}
                className=" font-semibold"
              />
            </span>
          </div>
        </section>
      </section>
    </section>
  );
}

export default FilterSec;
