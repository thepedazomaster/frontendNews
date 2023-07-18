import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/forms/loginForm/LoginForm";
import styles from "./loginScreen.module.css";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/authProvider";

function LoginScreen() {
  const navigate = useNavigate();
  const {
    authState: { isLogged },
  } = useContext(AuthContext);
  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  return (
    <section className={styles.container}>
      <LoginForm />
    </section>
  );
}

export default LoginScreen;
