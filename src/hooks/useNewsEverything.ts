/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useCallback, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Article, NewsResponse } from "../interfaces/newsResponse.interface";
import { myAPI, validateUser } from "../lib/axios.config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth/authProvider";

function useNewsEverything() {
  const [newsEverything, setNewsEverything] = useState<Article[]>([]);
  const [cookies, _setCookies, removeCookies] = useCookies(["x-access-token"]);
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    validateUser(() => {
      logOut();
      removeCookies("x-access-token");
      navigate("/login");
    });
    void myAPI.get<NewsResponse>("news/everything", {
      headers: { "x-access-token": cookies["x-access-token"] as string },
    });
  }, [cookies, logOut, navigate, removeCookies]);

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
      }
    },
    [cookies]
  );

  /*  useEffect(() => {
    
  }, []); */
  return { newsEverything, getNewsEverything, loading };
}

export default useNewsEverything;
