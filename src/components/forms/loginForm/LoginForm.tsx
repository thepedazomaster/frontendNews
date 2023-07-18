/* eslint-disable @typescript-eslint/no-misused-promises */
import { UserOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../../context/auth/authProvider";
import { useNavigate } from "react-router-dom";
import styles from "./loginForm.module.css";

interface loginForm {
  email: string;
  password: string;
}

function LoginForm() {
  const { control, handleSubmit } = useForm<loginForm>();
  const [messageApi, contextHolder] = message.useMessage();
  const { singIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data: loginForm) => {
    try {
      await singIn({
        email: data.email.toLowerCase(),
        password: data.password,
      });
      navigate("/topNews");
    } catch (error) {
      void messageApi.open({
        type: "error",
        content: "Credenciales invalidas",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <img
        src="equipzilla.png"
        alt="equizilla logo"
        className={styles.logoEquipzilla}
      />
      {contextHolder}
      <label htmlFor="email">Correo:</label>
      <Controller
        control={control}
        name="email"
        rules={{
          required: "campo requerido",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "no es un correo valido",
          },
        }}
        render={({ field, fieldState }) => (
          <>
            <Input
              placeholder="Escribe tu email"
              id="email"
              status={fieldState.error ? "error" : undefined}
              prefix={<UserOutlined />}
              {...field}
            />
            <p className={styles.errorText}>{fieldState.error?.message}</p>
          </>
        )}
      />
      <label htmlFor="password">Contraseña:</label>
      <Controller
        control={control}
        name="password"
        rules={{ required: "Escribe tu contraseña" }}
        render={({ field, fieldState }) => (
          <>
            <Input.Password
              placeholder="Escribe tu contraseña"
              {...field}
              status={fieldState.error ? "error" : undefined}
              id="password"
            />
            <p className={styles.errorText}>{fieldState.error?.message}</p>
          </>
        )}
      />
      <button className={styles.sendButton} type="submit">
        Enviar
      </button>
    </form>
  );
}

export default LoginForm;
