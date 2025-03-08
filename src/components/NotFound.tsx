import React, { useContext } from "react";
import { TrademarkContext } from "../context/TrademarkContext";

function NotFound() {
  const { menuOpen, searchQuery } = useContext(TrademarkContext);
  return (
    <section
      className={`w-full flex flex-col items-center justify-center h-[80vh] rounded-xl bg-gray-100 max-[1250px]:h-[40vh] max-[1250px]:px-10 text-center
        ${
          menuOpen ? "max-[650px]:h-screen" : ""
        } max-[650px]:bg-transparent max-[650px]:items-start max-[650px]:justify-normal max-[650px]:mt-20
        `}
    >
      <h1 className="text-3xl font-bold max-[850px]:text-xl">
        The "{searchQuery}" Trademark may be available
      </h1>
      <p className="mt-4 tracking-wide text-[20px] max-[850px]:text-[14px]">
        Select the countries you want to protect this "{searchQuery}" trademark
        in
      </p>
    </section>
  );
}

export default NotFound;
