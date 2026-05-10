import { createContext, useContext, useState, useEffect } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    keyword: "",
    result: [],
  });

  // 1. ✅ Reload: Component စတက်ချင်း localStorage ကနေ data ပြန်ယူမယ်
  useEffect(() => {
    const existingSearch = localStorage.getItem("search");
    if (existingSearch) {
      setSearch(JSON.parse(existingSearch));
    }
  }, []);

  // 2. ✅ Sync: 'search' state ပြောင်းတိုင်း localStorage မှာ auto-save လုပ်မယ်
  useEffect(() => {
    // keyword (သို့) result ရှိမှ သိမ်းဖို့ logic လေး ထည့်ထားတာ ပိုစိတ်ချရတယ်
    if (search.keyword || search.result.length > 0) {
      localStorage.setItem("search", JSON.stringify(search));
    }
  }, [search]);

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };