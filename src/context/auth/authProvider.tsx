import { createContext, useReducer } from "react";
import { myAPI } from "../../lib/axios.config";
import { useCookies } from "react-cookie";

interface UserLogin {
  id: number;
  email: string;
  name: string;
  lastname: string;
}
interface LoginResponse extends UserLogin {
  token: string;
}
interface LoginData {
  email: string;
  password: string;
}
interface AuthContextProps {
  authState: AuthState;
  singIn: (data: LoginData) => Promise<void>;
  logOut: () => void;
}

interface AuthState {
  user: UserLogin | null;
  isLogged: boolean;
  isload: boolean;
}

const userLocal = localStorage.getItem("user")
  ? (JSON.parse(localStorage.getItem("user") ?? "") as UserLogin)
  : null;

const authInitialState: AuthState = {
  user: userLocal,
  isLogged: false,
  isload: false,
};
type AuthAction =
  | { type: "logIn"; payload: { user: UserLogin } }
  | { type: "logOut" };
export const AuthContext = createContext({} as AuthContextProps);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "logIn":
      return {
        ...state,
        user: action.payload.user,
        isLogged: true,
      };
    case "logOut":
      return { ...state, user: null, isLogged: false };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authstate, dispatch] = useReducer(authReducer, authInitialState);
  const [_cookies, setCookie, removeCookie] = useCookies(["x-access-token"]);

  const singIn = async (data: LoginData) => {
    const resp = await myAPI.post<LoginResponse>("user/auth", { ...data });
    const user = resp.data;
    localStorage.setItem("user", JSON.stringify(resp.data));

    setCookie("x-access-token", resp.data.token);
    myAPI.defaults.headers.common["x-access-token"] = user.token;
    dispatch({ type: "logIn", payload: { user } });
  };
  const logOut = () => {
    dispatch({ type: "logOut" });
    removeCookie("x-access-token");
  };
  return (
    <AuthContext.Provider value={{ authState: authstate, singIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
