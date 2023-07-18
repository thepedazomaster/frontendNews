import { useCallback, useEffect, useState } from "react";
import request, { CancelTokenSource } from "axios";
import { myAPI } from "../lib/axios.config";
import { CategoriesNews } from "../interfaces/searchNews.interface";

function useCategoriesNews() {
  const [categoriesNews, setCategoriesNews] = useState<CategoriesNews[]>([]);
  const [loading, setLoading] = useState(false);

  const getCategoriesNews = useCallback(
    async (source: CancelTokenSource | null = null) => {
      try {
        setLoading(true);
        const resp = await myAPI.get<CategoriesNews[]>(
          "masters/categoriesSearch",
          { cancelToken: source ? source.token : undefined }
        );
        setCategoriesNews(resp.data);
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
    void getCategoriesNews(source);
    return () => {
      source.cancel("Canceled");
    };
  }, [getCategoriesNews]);
  return { categoriesNews, loading };
}

export default useCategoriesNews;
