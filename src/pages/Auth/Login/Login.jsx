import { useState } from "react";
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth-slice";
import { useTranslation } from "react-i18next";
import sweetAlert from "../../../helpers/sweetAlert";
import authServices from "../../../services/authServices";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import MainInput from "../../../components/MainInput/MainInput";
import logo from "../../../assets/images/logo.png";
import "./Login.scss";

function Login() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const loginForm = [
    { label: t("username"), type: "text", name: "username", placeholder: t("username"), register: register("username", { required: true }) },
    { label: t("password"), type: "password", name: "password", placeholder: t("password"), register: register("password", { required: true, minLength: 6, checkPassword: true, }) },
  ]

  const handleLogin = (data) => {
    setLoading(true);
    authServices.login(data).then((response) => {
      dispatch(authActions.login(
        {
          access: true,
          username: response.data.username,
        }
      ));
      console.log(response.data);
    }).catch((error) => {
      console.log(error)
      sweetAlert.error(t("error"));
    })
    setLoading(false);
  }

  return (
    <div className="login-page">
      {loading ? <LoadingSpinner /> : null}
      <div className="login-form-container">
        <div className="login-image"></div>
        <div className="login-form">
          <div className="login-info">
            <p className="login-title">{t("login")}</p>
            <p className="login-text">{t("loginText")}</p>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="login-inputs">
                {loginForm.map((item, index) => (
                  <MainInput
                    key={index}
                    label={item.label}
                    type={item.type}
                    name={item.name}
                    placeholder={item.placeholder}
                    register={item.register}
                    errors={errors}
                  />
                ))}
              </div>
              <p className="forgot-password">{t("forgotPassword")}</p>
              <div className="login-buttons">
                <input type="submit" className="main-button" value={t("login")} />
              </div>
            </form>
            <img src={logo} alt="logo" className="login-logo" />
          </div>
        </div>
      </div >
    </div >
  );
}

export default Login;
