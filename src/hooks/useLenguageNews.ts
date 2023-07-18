import { useCallback, useEffect, useState } from "react";
import request, { CancelTokenSource } from "axios";
import { myAPI } from "../lib/axios.config";
import { LenguagesNews } from "../interfaces/searchNews.interface";

function useLenguageNews() {
  const [lenguagesNews, setLenguagesNews] = useState<LenguagesNews[]>([]);
  const [loading, setLoading] = useState(false);
  const getLenguagesNews = useCallback(
    async (source: CancelTokenSource | null = null) => {
      try {
        setLoading(true);
        const resp = await myAPI.get<LenguagesNews[]>(
          "masters/lenguageSearch",
          {
            cancelToken: source ? source.token : undefined,
          }
        );
        setLenguagesNews(resp.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const cancelToken = request.CancelToken;
    const source = cancelToken.source();
    void getLenguagesNews(source);
    return () => {
      source.cancel("Canceled");
    };
  }, [getLenguagesNews]);
  return { lenguagesNews, loading };
}

export default useLenguageNews;
