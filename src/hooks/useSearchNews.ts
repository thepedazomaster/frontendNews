/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCallback, useState } from "react";
import { myAPI } from "../lib/axios.config";

function useSearchNews() {
  const [searches, setSearches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getSearches = useCallback(async () => {
    try {
      setLoading(true);
      const resp = await myAPI.get("search/searchHistory");
      setSearches(resp.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  const createSearch = useCallback(async () => {
    try {
      setLoading(true);
      const resp = await myAPI.post("search");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  return [searches, loading, createSearch];
}

export default useSearchNews;
