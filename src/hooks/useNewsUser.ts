/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useCallback, useContext, useEffect, useState } from "react";
import { myAPI, validateUser } from "../lib/axios.config";
import { useCookies } from "react-cookie";
import { AuthContext } from "../context/auth/authProvider";
import { useNavigate } from "react-router-dom";

export interface CreateFormNewsUser {
  title: string;
  author: string | null;
  description: string | null;
  content: string | null;
  url: string;
  url_image: string | null;
  publishedAt: string | null;
}

function useNewsUser() {
  const [newsUser, setNewsUser] = useState<any[]>([]);
  const [cookies, _setCookies, removeCookies] = useCookies(["x-access-token"]);
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const getNewsUser = useCallback(async () => {
    try {
      validateUser(() => {
        logOut();
        removeCookies("x-access-token");
        navigate("/login");
      });
      const resp = await myAPI.get("userNews", {
        headers: { "x-access-token": cookies["x-access-token"] as string },
      });

      setNewsUser(resp.data.news);
    } catch (error) {
      console.log(error);
    }
  }, [cookies, logOut, navigate, removeCookies]);
  const createNewsUser = useCallback(
    async (data: CreateFormNewsUser) => {
      try {
        validateUser(() => {
          logOut();
          removeCookies("x-access-token");
          navigate("/login");
        });
        const resp = await myAPI.post("userNews", data, {
          headers: { "x-access-token": cookies["x-access-token"] as string },
        });
        console.log(resp.data);
      } catch (error) {
        console.log(error);
      }
    },
    [cookies, logOut, navigate, removeCookies]
  );

  useEffect(() => {
    void getNewsUser();
  }, [getNewsUser]);

  return { newsUser, createNewsUser };
}

export default useNewsUser;
