import { useContext } from "react";
import logo from "../images/logo.png";
import { LuSearch } from "react-icons/lu";
import { TrademarkContext } from "../context/TrademarkContext";
import toast from "react-hot-toast";

function Header() {
  const {
    searchQuery,
    setSearchQuery,
    fetchTrademarks,
    setCurrent_owners,
    setAllLaw_firms,
    setAllAttorneys,
    setOwners,
    setLaw_firms,
    setAttorneys,
  } = useContext(TrademarkContext);

  const handleClick = () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a value to search for.");
    } else {
      setOwners([]);
      setLaw_firms([]);
      setAttorneys([]);
      setCurrent_owners({ buckets: [] });
      setAllAttorneys({ buckets: [] });
      setAllLaw_firms({ buckets: [] });
      fetchTrademarks();
    }
  };

  return (
    <section className="bg-[#F8FAFE]">
      <header
        className="clear-start flex items-center py-8 px-14 gap-16 justify-between 
                   max-[1250px]:gap-10 max-[1250px]:px-10 
                   min-[2000px]:ml-[50%] min-[2000px]:translate-x-[-50%] min-[2000px]:w-[2000px] 
                   max-[850px]:px-14 max-[650px]:px-5 max-[650px]:gap-4 max-[650px]:flex-col 
                   max-[650px]:items-center max-[650px]:py-6"
      >
        <div>
          <img
            src={logo}
            alt="logo"
            className="h-[29.93px] max-[1250px]:h-[24px]"
          />
        </div>
        <div className="flex items-center gap-[18px]  w-full">
          <div
            className="bg-[#FFFFFF] border-[#D4D4D4] border px-5 rounded-[12px] py-0.5 w-[500.79px] 
                       max-[1250px]:w-[320px] flex items-center gap-4 max-[650px]:w-auto max-[650px]:gap-2"
          >
            <LuSearch className="cursor-pointer text-[#636363]" size={20} />
            <input
              type="text"
              placeholder="Search Trademark Here eg. Mickey Mouse "
              className="bg-transparent h-full w-full text-[#636363] py-3 outline-none 
                         text-[16px] tracking-wide font-medium max-[650px]:py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
          </div>
          <button
            className="bg-[#4380EC] hover:bg-[#1C5BD2] text-[#FFFFFF] text-[16px] font-semibold py-3 px-6 
                       rounded-[12px] tracking-wider max-[650px]:py-2"
            onClick={handleClick}
          >
            Search
          </button>
        </div>
      </header>
    </section>
  );
}

export default Header;
