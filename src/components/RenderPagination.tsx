import React, { useContext } from "react";
import { TrademarkContext } from "../context/TrademarkContext";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

function RenderPagination() {
  const { trademarks, setCurrentPage, currentPage } =
    useContext(TrademarkContext);
  if (!trademarks || trademarks?.total?.value <= 1) return null;

  const pageButtons = [];
  const maxVisiblePages = window.innerWidth <= 650 ? 3 : 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(
    Math.ceil(trademarks?.total?.value / 10),
    startPage + maxVisiblePages - 1
  );

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Previous Button
  pageButtons.push(
    <button
      key="prev"
      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
      disabled={currentPage === 1}
      className={`flex items-center text-[#101010] tracking-wide border  px-3 py-1.5 rounded-lg text-sm mr-2.5 max-[650px]:mr-0 max-[650px]:px-2
        ${
          currentPage === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:bg-gray-50 cursor-pointer"
        }`}
    >
      <FaAngleLeft size={14} className="mr-1" />
      <span className=" max-[650px]:hidden ">Previous</span>
    </button>
  );

  // First page if not visible
  if (startPage > 1) {
    pageButtons.push(
      <button
        key="1"
        onClick={() => setCurrentPage(1)}
        className="px-2.5 py-0.5 border rounded text-sm text-gray-500 hover:bg-gray-50"
      >
        1
      </button>
    );
    if (startPage > 2) {
      pageButtons.push(
        <span key="ellipsis1" className="px-1">
          ...
        </span>
      );
    }
  }

  // Visible page buttons
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={`px-2.5 py-0.5 border rounded text-sm text-gray-500 max-[650px]:px-2 
             ${
               i === currentPage
                 ? "bg-blue-600 text-white border-blue-600"
                 : "hover:bg-gray-50 "
             }`}
      >
        {i}
      </button>
    );
  }

  // Last page if not visible
  if (endPage < trademarks?.total?.value / 10) {
    if (endPage < trademarks?.total?.value - 1) {
      pageButtons.push(
        <span key="ellipsis2" className="px-1">
          ...
        </span>
      );
    }
    pageButtons.push(
      <button
        key={trademarks?.total?.value}
        onClick={() => setCurrentPage(Math.ceil(trademarks?.total?.value / 10))}
        className="px-2.5 py-0.5 border rounded text-sm text-gray-500 hover:bg-gray-50"
      >
        {Math.ceil(trademarks?.total?.value / 10)}
      </button>
    );
  }
  // Next Button
  pageButtons.push(
    <button
      key="next"
      onClick={() =>
        setCurrentPage((prev) =>
          Math.min(trademarks?.total?.value / 10, prev + 1)
        )
      }
      disabled={currentPage * 10 <= trademarks?.total?.value ? false : true}
      className={`flex items-center text-[#101010]  tracking-wide border  px-3 py-1.5 rounded-lg text-sm ml-2.5 max-[650px]:ml-0 max-[650px]:px-2
        ${
          currentPage * 10 === trademarks?.total?.value
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:bg-gray-50 cursor-pointer"
        }`}
    >
      <span className=" max-[650px]:hidden ">Next</span>
      <FaAngleRight size={14} className="ml-1" />
    </button>
  );

  return (
    <div className=" bg-white w-full flex items-center justify-center gap-2 pb-6 max-[650px]:pb-10">
      <div className=" flex gap-2">{pageButtons}</div>
    </div>
  );
}

export default RenderPagination;
