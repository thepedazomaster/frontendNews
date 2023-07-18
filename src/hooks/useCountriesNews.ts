import { useCallback, useEffect, useState } from "react";
import request, { CancelTokenSource } from "axios";
import { myAPI } from "../lib/axios.config";
import { CountriesNews } from "../interfaces/searchNews.interface";

function useCountriesNews() {
  const [countriesNews, setCountriesNews] = useState<CountriesNews[]>([]);
  const [loading, setloading] = useState(false);

  const getCountriesNews = useCallback(
    async (source: CancelTokenSource | null = null) => {
      try {
        setloading(true);

        const resp = await myAPI.get<CountriesNews[]>(
          "masters/countriesSearch",
          {
            cancelToken: source ? source.token : undefined,
          }
        );
        setCountriesNews(resp.data);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    },
    []
  );

  useEffect(() => {
    const cancelToken = request.CancelToken;
    const source = cancelToken.source();
    void getCountriesNews(source);
    return () => {
      source.cancel("Canceled");
    };
  }, [getCountriesNews]);
  return { countriesNews, loading };
}

export default useCountriesNews;
