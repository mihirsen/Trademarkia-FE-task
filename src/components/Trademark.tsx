import React, { useContext, useEffect, useState } from "react";
import OptionList from "./OptionList";
import listImg from "../images/listImg.png";
import { GoDotFill } from "react-icons/go";
import { TrademarkContext } from "../context/TrademarkContext";
import { formatDate } from "../function/getOrdinalSuffix";
import circle from "../images/circle.png";
import { RxCross2 } from "react-icons/rx";
import giphy from "../images/giphy.gif";
import NotFound from "./NotFound";
import Vector from "../images/Vector.png";

const TrademarkDataDisplay: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [currentFilter, setCurrentFilter] = useState<string>("Owners");

  const {
    trademarks,
    status,
    setStatus,
    setAttorneys,
    setOwners,
    setLaw_firms,
    setMenuOpen,
    menuOpen,
    loading,
    setCurrentPage,
    setCurrent_owners,
    setAllLaw_firms,
    setAllAttorneys,
  } = useContext(TrademarkContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setViewMode("grid");
      } else {
        setViewMode("list");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const upDateSta = (val: string) => {
    setStatus([val]);
    setMenuOpen(false);
    setCurrentPage(1);
    setOwners([]);
    setLaw_firms([]);
    setAttorneys([]);
    setCurrent_owners({ buckets: [] });
    setAllAttorneys({ buckets: [] });
    setAllLaw_firms({ buckets: [] });
  };

  return (
    <section className="bg-[#FEFEFE] ">
      <section
        className={` flex items-start gap-8 pb-10 max-[1250px]:gap-6  max-[850px]:px-14 
 min-[2000px]:ml-[50%] min-[2000px]:translate-x-[-50%] min-[2000px]:w-[2000px]
     ${
       viewMode === "list"
         ? "px-14 max-[1250px]:px-10 "
         : "px-8 max-[650px]:px-4"
     }`}
      >
        {/* Data Display */}
        {loading ? (
          <section className={`w-full flex`}>
            <img src={giphy} alt="lodingGif" className=" m-auto mt-20" />
          </section>
        ) : trademarks?.hits === undefined ? (
          <NotFound />
        ) : (
          <section
            className={` ${
              menuOpen ? "max-[650px]:h-screen overflow-hidden" : ""
            }`}
          >
            {/* Heading */}
            <ul
              className={`grid-cols-4 py-4 
              ${viewMode === "list" ? "grid" : "hidden"}`}
            >
              <li className=" text-[#313131] text-[16px] font-medium leading-[20px]">
                Mark
              </li>
              <li className=" text-[#313131] text-[16px] font-medium leading-[20px]">
                Details
              </li>
              <li className=" text-[#313131] text-[16px] font-medium leading-[20px]">
                Status
              </li>
              <li className=" text-[#313131] text-[16px] font-medium leading-[20px]">
                Class / Description
              </li>
            </ul>
            <hr color="#E7E6E6" className=" h-[.1px]" />

            {/* Trademark Listings */}
            <div
              className={`pr-3  gap-6 mt-4 max-[850px]:grid-cols-1 max-[1250px]:grid-cols-2
              ${viewMode === "list" ? "flex flex-col" : " grid grid-cols-3"}`}
            >
              {trademarks?.hits?.map((trademark, index) => (
                <div
                  key={index}
                  className={` gap-4 
               ${
                 viewMode === "list"
                   ? "grid grid-cols-4 items-center "
                   : " flex flex-col border-[#E5E7EB] border rounded-lg p-6"
               }`}
                >
                  {/* Image */}
                  <div
                    className={`w-[75%] h-[120px] 
                    ${
                      viewMode === "list"
                        ? "bg-[#FFFFFF] drop-shadow-md shadow-md flex items-center justify-center   rounded-lg py-4"
                        : "flex justify-between w-full"
                    }`}
                  >
                    <img
                      src={listImg}
                      alt={trademark?._source?.mark_identification}
                      className={`${
                        viewMode === "list" ? "h-[80%]" : "h-auto"
                      }`}
                    />
                    {/* grid view */}
                    <div
                      className={`flex flex-col justify-between h-[95%]
                      ${viewMode === "list" ? "hidden" : ""}`}
                    >
                      <div className="flex items-center flex-col">
                        <span
                          className={`text-[14px] font-semibold flex items-center  capitalize ${
                            trademark?._source?.status_type === "registered"
                              ? "text-[#41B65C]"
                              : trademark?._source?.status_type === "pending"
                              ? "text-yellow-500"
                              : trademark?._source?.status_type === "abandoned"
                              ? "text-red-500"
                              : "text-[#1A1A1A]" // Default color
                          }`}
                        >
                          <GoDotFill
                            className={`${
                              trademark?._source?.status_type === "registered"
                                ? "text-[#128807]"
                                : trademark?._source?.status_type === "pending"
                                ? "text-yellow-500"
                                : trademark?._source?.status_type ===
                                  "abandoned"
                                ? "text-red-500"
                                : "text-[#1A1A1A]" // Default color
                            }`}
                            size={16}
                          />
                          {trademark?._source?.status_type === "abandoned"
                            ? "Dead / Cancelled"
                            : `Live / ${trademark?._source?.status_type}`}
                        </span>
                        <p className=" text-[12px] text-[#1A1A1A]">
                          on{" "}
                          <span className=" font-bold text-[12px]">
                            {" "}
                            {formatDate(trademark?._source?.status_date || 0)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div
                    className={` flex flex-col 
                    ${
                      viewMode === "list"
                        ? "justify-between h-[95%]"
                        : "w-full gap-2"
                    }`}
                  >
                    <div className=" flex flex-col gap-1.5">
                      <h3 className=" text-[#1A1A1A] font-semibold leading-[19.81px] truncate">
                        {trademark?._source?.mark_identification}
                      </h3>
                      <p className=" text-[#1A1A1A] text-[14px] leading-[16.8px] tracking-wide">
                        {trademark?._source?.current_owner}
                      </p>
                    </div>
                    <div
                      className={`flex 
                      ${
                        viewMode === "list"
                          ? " flex-col gap-0.5"
                          : " gap-2 items-center"
                      }`}
                    >
                      <span
                        className={`${
                          viewMode === "list"
                            ? "text-[#1A1A1A] text-[14px]"
                            : "text-[11px]"
                        }`}
                      >
                        {trademark?._source?.registration_number}
                      </span>
                      <span
                        className={` ${
                          viewMode === "list"
                            ? "text-[#1A1A1A] text-[14px]"
                            : "text-[11px]"
                        }`}
                      >
                        {formatDate(trademark?._source?.registration_date || 0)}
                      </span>

                      {/* grid view */}
                      <p
                        className={`${
                          viewMode === "list"
                            ? "hidden"
                            : " text-[11px] text-[#1A1A1A] clear-start flex items-center gap-2"
                        }`}
                      >
                        <img src={circle} alt="circle" />
                        <span className=" font-semibold ">
                          {formatDate(trademark?._source?.status_date || 0)}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div
                    className={`${
                      viewMode === "list"
                        ? "flex flex-col justify-between h-[95%]"
                        : "hidden"
                    }`}
                  >
                    <div className="flex items-start flex-col gap-1">
                      <span
                        className={`text-[16px] leading-[24px] font-semibold flex items-center gap-1.5 capitalize tracking-wide
                      ${
                        viewMode === "list" ? "max-[1250px]:text-[15px]" : ""
                      } ${
                          trademark?._source?.status_type === "registered"
                            ? "text-[#41B65C]"
                            : trademark?._source?.status_type === "pending"
                            ? "text-yellow-500"
                            : trademark?._source?.status_type === "abandoned"
                            ? "text-red-500"
                            : "text-[#3C82F6]" // Default color
                        }`}
                      >
                        <GoDotFill
                          className={`${
                            trademark?._source?.status_type === "registered"
                              ? "text-[#128807]"
                              : trademark?._source?.status_type === "pending"
                              ? "text-yellow-500"
                              : trademark?._source?.status_type === "abandoned"
                              ? "text-red-500"
                              : "text-[#3C82F6]" // Default color
                          }`}
                          size={16}
                        />
                        {trademark?._source?.status_type === "abandoned"
                          ? "Dead / Cancelled"
                          : `Live / ${trademark?._source?.status_type}`}
                      </span>
                      <p className=" text-[12px] text-[#1A1A1A]">
                        on{" "}
                        <span className=" font-bold text-[14px]">
                          {" "}
                          {formatDate(trademark?._source?.status_date || 0)}
                        </span>
                      </p>
                    </div>
                    <p className=" text-[12px] text-[#1A1A1A] clear-start flex items-center gap-2">
                      <img src={circle} alt="circle" />
                      <span className=" font-semibold text-[14px]">
                        {formatDate(trademark?._source?.status_date || 0)}
                      </span>
                    </p>
                  </div>
                  {/* discription */}
                  <div className={` ${viewMode === "list" ? "" : "w-full"}`}>
                    <p
                      className={`text-[14px] text-[#1D1C1D] leading-[21px] tracking-wide overflow-hidden overflow-ellipsis capitalize line-clamp-2`}
                    >
                      {trademark?._source?.mark_description_description?.join(
                        ","
                      )}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2.5">
                      {trademark?._source?.class_codes
                        ?.slice(0, 3)
                        .map((cls, i) => (
                          <div key={i} className="flex items-center  gap-px">
                            <img
                              src={Vector}
                              alt="class"
                              className=" h-[18px]"
                            />
                            <span className="font-medium text-[12px] text-[#3A3A3A]">
                              Class {parseInt(cls, 10)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                  {/* grid view button */}
                  <button
                    className={`${
                      viewMode === "list"
                        ? "hidden"
                        : " border px-6 py-2 rounded-lg text-blue-600 border-blue-600 w-max cursor-pointer hover:bg-blue-600 hover:text-white tracking-wide"
                    }`}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Filter Display */}

        <section
          className={`max-w-[340px] flex-shrink-0 flex flex-col gap-4 max-[1250px]:max-w-[270px] 
        max-[650px]:absolute max-[650px]:bg-[#fff] max-[650px]:max-w-full max-[650px]:h-full max-[650px]:right-0
        max-[650px]:top-0 max-[650px]:w-full ease-in-out duration-700
         ${
           menuOpen
             ? "max-[650px]:translate-x-0"
             : "max-[650px]:translate-x-[-100%]"
         }`}
        >
          {/* back drop */}
          <RxCross2
            className=" text-[35px] font-semibold mt-6  w-full max-[650px]:flex hidden"
            onClick={() => setMenuOpen(false)}
          />

          <div className=" bg-black w-full h-full absolute -z-10 opacity-10 max-[650px]:block hidden"></div>
          {/* Status Filter */}

          <div className=" bg-[#fff] drop-shadow-lg w-full px-6 py-4 rounded-lg flex flex-col gap-2.5 pb-8 max-[1250px]:pb-4 shadow-md max-[650px]:w-[85%] max-[650px]:mx-auto ">
            <h3 className="text-[#000000] text-[16px] leading-[19.81px] font-semibold tracking-wide max-[1250px]:text-[15px] ">
              Status
            </h3>
            <div className=" flex items-center gap-2 flex-wrap">
              <button
                className={` border px-3.5 py-1.5 rounded-xl text-[14px] max-[1250px]:text-[12px]  font-medium
                ${
                  status.includes("all")
                    ? "border-[#4380EC] bg-[#EEF4FF] text-[#4380EC]"
                    : "border-[#D1D1D1] text-[#1A1A1A]  "
                }`}
                onClick={() => upDateSta("all")}
              >
                All
              </button>
              <button
                className={`flex items-center gap-2 border px-3.5 py-1.5 rounded-xl text-[14px] max-[1250px]:text-[12px] font-medium 
                ${
                  status.includes("registered")
                    ? "border-[#4380EC] bg-[#EEF4FF] text-[#4380EC]"
                    : "border-[#D1D1D1] text-[#1A1A1A]  "
                }`}
                onClick={() => upDateSta("registered")}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                <span>Registered</span>
              </button>
              <button
                className={`flex items-center gap-2 border px-3.5 py-1.5 rounded-xl text-[14px] max-[1250px]:text-[12px] font-medium 
                ${
                  status.includes("pending")
                    ? "border-[#4380EC] bg-[#EEF4FF] text-[#4380EC]"
                    : "border-[#D1D1D1] text-[#1A1A1A]  "
                }`}
                onClick={() => upDateSta("pending")}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                <span>Pending</span>
              </button>
              <button
                className={`flex items-center gap-2 border px-3.5 py-1.5 rounded-xl text-[14px] max-[1250px]:text-[12px] font-medium 
                ${
                  status.includes("abandoned")
                    ? "border-[#4380EC] bg-[#EEF4FF] text-[#4380EC]"
                    : "border-[#D1D1D1] text-[#1A1A1A]  "
                }`}
                onClick={() => upDateSta("abandoned")}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                <span>Abandoned</span>
              </button>
              <button
                className={`flex items-center gap-2 border px-3.5 py-1.5 rounded-xl text-[14px] font-medium tracking-wide
                ${
                  status.includes("other")
                    ? "border-[#4380EC] bg-[#EEF4FF] text-[#4380EC]"
                    : "border-[#D1D1D1] text-[#1A1A1A]  "
                }`}
                onClick={() => upDateSta("other")}
              >
                <span className="flex items-center space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                  <span>Others</span>
                </span>
              </button>
            </div>
          </div>

          {/* Owners Filter */}
          <div className=" bg-[#fff] drop-shadow-lg w-full px-6 py-4 rounded-lg flex flex-col gap-2.5 pb-4 shadow-md max-[650px]:w-[85%] max-[650px]:mx-auto ">
            <div className=" flex items-center gap-[20px] max-[1250px]:gap-[16px]">
              <h3
                className={` text-[#3F3F3F] leading-[16.98px] tracking-normal cursor-pointer text-[16px] max-[1250px]:text-[14px] pb-2.5
                ${
                  currentFilter === "Owners"
                    ? "text-[#000000] border-b-2 border-[#000000] font-bold"
                    : "font-normal"
                }`}
                onClick={() => {
                  setCurrentFilter("Owners");
                  setAttorneys([]);
                  setLaw_firms([]);
                }}
              >
                Owners
              </h3>
              <h3
                className={` text-[#3F3F3F] leading-[16.98px] tracking-normal cursor-pointer text-[16px] max-[1250px]:text-[14px] pb-2.5
    ${
      currentFilter === "Law Firms"
        ? "text-[#000000] border-b-2 border-[#000000] font-bold"
        : "font-normal"
    }`}
                onClick={() => {
                  setCurrentFilter("Law Firms");
                  setOwners([]);
                  setAttorneys([]);
                }}
              >
                Law Firms
              </h3>
              <h3
                className={` text-[#3F3F3F] leading-[16.98px] tracking-normal cursor-pointer text-[16px] max-[1250px]:text-[14px] pb-2.5
      ${
        currentFilter === "Attorneys"
          ? "text-[#000000] border-b-2 border-[#000000] font-bold"
          : "font-normal"
      }`}
                onClick={() => {
                  setCurrentFilter("Attorneys");
                  setOwners([]);
                  setLaw_firms([]);
                }}
              >
                Attorneys
              </h3>
            </div>
            <OptionList listOption={currentFilter} />
          </div>

          {/* Display Mode */}

          <div className=" bg-[#fff] drop-shadow-lg w-full px-6 py-4 rounded-lg flex flex-col gap-2.5 pb-8 mt-6 max-[1250px]:pb-6 shadow-md max-[1000px]:hidden">
            <h3 className="text-[#000000] text-[16px] leading-[19.81px] max-[1250px]:text-[14px] font-semibold tracking-wide">
              Display
            </h3>
            <div className=" bg-[#F1F1F1] py-2.5 px-3  rounded-xl flex items-center gap-2 mt-2 max-[1250px]:py-2">
              <button
                className={` w-[50%] rounded-xl py-2 text-[#000000] text-[14px] max-[1250px]:text-[12px] max-[1250px]:rounded-lg font-medium  ${
                  viewMode === "list" ? "bg-[#FFFFFF] font-semibold" : ""
                }`}
                onClick={() => setViewMode("list")}
              >
                List View
              </button>
              <button
                className={` w-[50%] rounded-xl py-2 text-[#000000] text-[14px] max-[1250px]:text-[12px] max-[1250px]:rounded-lg font-medium ${
                  viewMode === "grid" ? "bg-[#FFFFFF] font-semibold" : ""
                }`}
                onClick={() => setViewMode("grid")}
              >
                Grid View
              </button>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default TrademarkDataDisplay;
