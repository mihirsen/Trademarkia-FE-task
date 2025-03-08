import React, { useContext, useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { TrademarkContext } from "../context/TrademarkContext";

interface OptionListProps {
  listOption: string;
}

const OptionList: React.FC<OptionListProps> = ({ listOption }) => {
  const {
    current_owners,
    setOwners,
    owners,
    allAttorneys,
    attorneys,
    allLaw_firms,
    setLaw_firms,
    setAttorneys,
    law_firms,
    setMenuOpen,
    setCurrentPage,
  } = useContext(TrademarkContext);

  const [commanData, setCommanData] = useState(current_owners?.buckets);
  const [commanCheck, setCommanCheck] = useState<string[]>([""]);

  const [searchOwner, setSearchOwner] = useState<string>("");

  const handleSearch = (e: string) => {
    if (listOption === "Owners") {
      const newOwner = current_owners?.buckets.filter((val) =>
        val.key.includes(e.toLocaleLowerCase())
      );
      setCommanData(newOwner);
    } else if (listOption === "Law Firms") {
      const newOwner = allLaw_firms?.buckets.filter((val) =>
        val.key.includes(e.toLocaleLowerCase())
      );
      setCommanData(newOwner);
    } else {
      const newOwner = allAttorneys?.buckets.filter((val) =>
        val.key.includes(e.toLocaleLowerCase())
      );
      setCommanData(newOwner);
    }
    setSearchOwner(e);
  };

  useEffect(() => {
    if (listOption === "Owners") {
      setCommanData(current_owners?.buckets);
      setCommanCheck(owners);
    } else if (listOption === "Law Firms") {
      setCommanData(allLaw_firms?.buckets);
      setCommanCheck(law_firms);
    } else {
      setCommanCheck(attorneys);
      setCommanData(allAttorneys?.buckets);
    }
  }, [
    current_owners?.buckets,
    allAttorneys?.buckets,
    allLaw_firms?.buckets,
    listOption,
    owners,
    attorneys,
    law_firms,
  ]);

  const toggleOwnerSelection = (key: string) => {
    if (listOption === "Owners") {
      setOwners((prev) =>
        prev.includes(key) ? prev.filter((id) => id !== key) : [...prev, key]
      );
    } else if (listOption === "Law Firms") {
      setLaw_firms((prev) =>
        prev.includes(key) ? prev.filter((id) => id !== key) : [...prev, key]
      );
    } else {
      setAttorneys((prev) =>
        prev.includes(key) ? prev.filter((id) => id !== key) : [...prev, key]
      );
    }
  };

  return (
    <div className="mt-3 flex flex-col gap-3 max-[1250px]:mt-2">
      <div className="border border-[#E3E3E5] flex items-center gap-2 px-4 rounded-xl ">
        <LuSearch className="" color="#636363" size={18} />
        <input
          type="text"
          placeholder="Search Owners"
          className="py-2 outline-none w-full text-[#313131] tracking-wide"
          value={searchOwner}
          onChange={(e) => handleSearch(e.currentTarget.value)}
        />
      </div>
      <div className="flex flex-col max-h-[200px] overflow-y-scroll">
        {commanData?.map((owner, index) => {
          return (
            <div
              key={index}
              id={`owner-${owner.doc_count}`}
              className="flex items-center w-full hover:bg-[#F4F4F4] gap-2 cursor-pointer py-2.5 px-3 rounded-lg"
              onClick={() => {
                toggleOwnerSelection(owner.key);
                setMenuOpen(false);
                setCurrentPage(1);
              }}
            >
              <input
                type="checkbox"
                id={`owner-${owner.doc_count}`}
                checked={commanCheck.includes(owner.key) ? true : false}
                className=" border-[#3A3A3A] w-[20px] h-[20px] rounded-xl"
              />
              <label
                htmlFor={`owner-${owner.doc_count}`}
                className="text-[#313131] text-[14px] leading-[16.98px] tracking-wide  cursor-pointer truncate "
              >
                {owner.key}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OptionList;
