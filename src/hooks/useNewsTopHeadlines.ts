import { useCallback, useState, useContext } from "react";
import { myAPI } from "../lib/axios.config";
import { Article, NewsResponse } from "../interfaces/newsResponse.interface";
import { useCookies } from "react-cookie";
import request from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/authProvider";

function useNewsTopHeadlines() {
  const [news, setNews] = useState<Article[]>([]);
  const [cookies, _setCookies, removeCookies] = useCookies(["x-access-token"]);
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  const getNews = useCallback(
    async ({
      q,
      country,
      category,
    }: {
      q: string | null;
      country: string | null;
      category: string | null;
    }) => {
      try {
        const resp = await myAPI.get<NewsResponse>("news/topHeadlines", {
          params: { country, q, category },
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          headers: { "x-access-token": cookies["x-access-token"] },
        });
        console.log(resp.data);

        setNews(resp.data.articles);
      } catch (error) {
        if (request.isAxiosError(error)) {
          if (error.status === 401) {
            logOut();
            removeCookies("x-access-token");
            navigate("/login");
          }
        }
      }
    },
    [cookies, logOut, navigate, removeCookies]
  );

  /*   useEffect(() => {
    void getNews();
  }, [getNews]); */
  return { news, getNews };
}

export default useNewsTopHeadlines;
