import { useCallback, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Article, NewsResponse } from "../interfaces/newsResponse.interface";
import { myAPI } from "../lib/axios.config";
import request from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/authProvider";

function useNewsEverything() {
  const [newsEverything, setNewsEverything] = useState<Article[]>([]);
  const [cookies, _setCookies, removeCookies] = useCookies(["x-access-token"]);
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    myAPI
      .get<NewsResponse>("news/everything", {
        headers: { "x-access-token": cookies["x-access-token"] as string },
      })
      .catch((error) => {
        console.log(error);

        if (request.isAxiosError(error)) {
          console.log("entre a error");

          if (error.status === 401 || error.status === 403) {
            logOut();
            removeCookies("x-access-token");
            navigate("/login");
          }
        }
      });
  }, []);

  const getNewsEverything = useCallback(
    async ({
      q,
      lenguage,
      from,
      to,
    }: {
      q: string | null;
      lenguage: string | null;
      from: string | null;
      to: string | null;
    }) => {
      try {
        setLoading(true);
        const resp = await myAPI.get<NewsResponse>("news/everything", {
          params: { lenguage, from, to, q },
          headers: { "x-access-token": cookies["x-access-token"] as string },
        });
        console.log(resp.data);

        setNewsEverything(resp.data.articles);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        if (request.isAxiosError(error)) {
          if (error.status === 401 || error.status === 403) {
            logOut();
            removeCookies("x-access-token");
            navigate("/login");
          }
        }
      }
    },
    [cookies, logOut, navigate, removeCookies]
  );

  /*  useEffect(() => {
    
  }, []); */
  return { newsEverything, getNewsEverything, loading };
}

export default useNewsEverything;
