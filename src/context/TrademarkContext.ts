// TrademarkContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useRef,
} from "react";
import { Aggregations, Trademark } from "../interface/interface";

interface TrademarkContextType {
  trademarks: Trademark;
  owners: string[];
  fetchTrademarks: () => Promise<void>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  status: string[];
  setStatus: React.Dispatch<React.SetStateAction<string[]>>;
  setOwners: React.Dispatch<React.SetStateAction<string[]>>;
  setAttorneys: React.Dispatch<React.SetStateAction<string[]>>;
  current_owners: Aggregations;
  allAttorneys: Aggregations;
  allLaw_firms: Aggregations;
  attorneys: string[];
  setLaw_firms: React.Dispatch<React.SetStateAction<string[]>>;
  law_firms: string[];
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuOpen: boolean;
  loading: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrent_owners: React.Dispatch<React.SetStateAction<Aggregations>>;
  setAllAttorneys: React.Dispatch<React.SetStateAction<Aggregations>>;
  setAllLaw_firms: React.Dispatch<React.SetStateAction<Aggregations>>;
}

// Create context with default values
const defaultTrademarkState: Trademark = {
  hits: [],
  total: {
    relation: "eq",
    value: 0,
  },
};
// Create context with default values
const defaultFilter: Aggregations = {
  buckets: [],
};

const TrademarkContext = createContext<TrademarkContextType>({
  trademarks: defaultTrademarkState,
  fetchTrademarks: async () => {},
  owners: [],
  searchQuery: "",
  setSearchQuery: () => {},
  status: [""],
  setStatus: () => {},
  setOwners: () => {},
  setAttorneys: () => {},
  current_owners: defaultFilter,
  allAttorneys: defaultFilter,
  allLaw_firms: defaultFilter,
  attorneys: [],
  setLaw_firms: () => {},
  law_firms: [""],
  menuOpen: false,
  setMenuOpen: () => {},
  loading: false,
  setCurrentPage: () => {},
  currentPage: 1,
  setCurrent_owners: () => {},
  setAllAttorneys: () => {},
  setAllLaw_firms: () => {},
});

// Provider component
const TrademarkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // List Data
  const [trademarks, setTrademarks] = useState<Trademark>(
    defaultTrademarkState
  );
  // Ower Data
  const [current_owners, setCurrent_owners] =
    useState<Aggregations>(defaultFilter);
  const [allAttorneys, setAllAttorneys] = useState<Aggregations>(defaultFilter);
  const [allLaw_firms, setAllLaw_firms] = useState<Aggregations>(defaultFilter);

  const [loading, setLoading] = useState<boolean>(false);

  // menu open
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // body state
  const [searchQuery, setSearchQuery] = useState<string>("nike");
  const searchQueryRef = useRef(searchQuery);
  const [owners, setOwners] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>(["all"]);
  const [attorneys, setAttorneys] = useState<string[]>([]);
  const [law_firms, setLaw_firms] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // check if user search with click

  useEffect(() => {
    searchQueryRef.current = searchQuery;
  }, [searchQuery]);

  const fetchTrademarks = useCallback(async () => {
    try {
      setLoading(true);
      const body = {
        input_query: searchQueryRef.current,
        input_query_type: "",
        sort_by: "default",
        status: status,
        exact_match: false,
        date_query: false,
        owners: owners,
        attorneys: attorneys,
        law_firms: law_firms,
        mark_description_description: [],
        classes: [],
        page: currentPage,
        rows: 10,
        sort_order: "desc",
        states: [],
        counties: [],
      };
      const response = await fetch(
        "https://vit-tm-task.api.trademarkia.app/api/v3/us",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:3001",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      setTrademarks(data?.body?.hits);
      if (current_owners?.buckets?.length === 0)
        setCurrent_owners(data?.body?.aggregations?.current_owners);

      if (allAttorneys?.buckets?.length === 0)
        setAllAttorneys(data?.body?.aggregations?.attorneys);
      if (allLaw_firms?.buckets?.length === 0)
        setAllLaw_firms(data?.body?.aggregations?.law_firms);

      setLoading(false);
    } catch (err) {
      console.log("while fetching data", err);
      setLoading(false);
    }
  }, [
    status,
    owners,
    attorneys,
    law_firms,
    currentPage,
    current_owners?.buckets?.length,
    allAttorneys?.buckets?.length,
    allLaw_firms?.buckets?.length,
  ]);

  // Fetch initial data on component mount
  useEffect(() => {
    fetchTrademarks();
  }, [fetchTrademarks]);

  return React.createElement(
    TrademarkContext.Provider,
    {
      value: {
        trademarks,
        owners,
        searchQuery,
        setSearchQuery,
        fetchTrademarks,
        status,
        setStatus,
        setOwners,
        current_owners,
        allAttorneys,
        attorneys,
        allLaw_firms,
        setAttorneys,
        setLaw_firms,
        law_firms,
        setMenuOpen,
        menuOpen,
        loading,
        setCurrentPage,
        currentPage,
        setCurrent_owners,
        setAllAttorneys,
        setAllLaw_firms,
      },
    },
    children
  );
};

export { TrademarkContext, TrademarkProvider };
