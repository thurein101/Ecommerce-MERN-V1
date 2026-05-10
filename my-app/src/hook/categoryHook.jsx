import { useEffect, useState } from "react";
import axios from "../api/apiBase";



const categoryHook = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get("category/get-categories");
      setCategories(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return categories;
};

export default categoryHook;
