import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import axios from "axios";
import sweetAlert from "../../helpers/sweetAlert";
import Modal from "../Modal/Modal";
import NavLinkContainer from "./NavLinkContainer/NavLinkContainer";
import authServices from "../../services/authServices";
import MainButton from "../MainButton/MainButton";
import MainInput from "../MainInput/MainInput";
import "./Sidebar.scss";

// sidebar component to show a sidebar with a list of routes and a logout button also a modal to change password and IIIS support system connection
function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { access, userType, userUserName, userName, userEmail, userId } = useSelector((state) => state.auth);
  const [isSideOppend, setIsSideOppened] = useState(false);
  const [addRequestModal, setAddRequestModal] = useState(false);
  const [chagePasswordModal, setChagePasswordModal] = useState(false);
  const [requestTypeModal, setRequestTypeModal] = useState(false);
  const [type, setType] = useState({ type: "" })
  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [changePasswordInfo, setChangePasswordInfo] = useState({ old_password: "", new_password_1: "", new_password_2: "" });

  const formInputs = [
    { name: "type", value: "owner", label: t("owner"), type: "radio", required: false },
    { name: "type", value: "interested", label: t("interested"), type: "radio", required: false, },
  ];
  
  const changePasswordFormInputs = [
    { name: "old_password", label: t("oldPassword"), type: "password", required: true },
    { name: "new_password_1", label: t("newPassword"), type: "password", required: true },
    { name: "new_password_2", label: t("confirmNewPassword"), type: "password", required: true },
  ];

  async function changePassword(e) {
    e.preventDefault();
    try {
      if (changePasswordInfo.new_password_1.length < 8) {
        sweetAlert.error(t("passwordLengthError"));
        return;
      }

      if (changePasswordInfo.new_password_1 !== changePasswordInfo.new_password_2) {
        sweetAlert.error(t("passwordsNotMatch"));
        return;
      }

      if (changePasswordInfo.new_password_1 === changePasswordInfo.old_password) {
        sweetAlert.error(t("passwordsMatch"));
        return;
      }

      setLoading(true);
      await authServices.changePassword(changePasswordInfo);
      setChagePasswordModal(false);
      sweetAlert.success(t("passwordChanged"));
      dispatch(authActions.logout());
      setLoading(false);
    }
    catch (err) {
      setLoading(false);
      for (const key in err?.response?.data) {
        sweetAlert.error(err?.response?.data[key]?.detail || t("passwordChangedError"));
      }
    }
  }

  function userTypeRoutes() {
    if (userType == 1) {
      return [
        {
          title: t("statistics"),
          path: "/statistics",
          icon: <i className="fa-solid fa-chart-column"></i>,
        },
        {
          title: t("addRequest"),
          path: "/add-request",
          icon: <i className="fa-solid fa-circle-plus"></i>,
        },
        {
          title: t("requests"),
          path: "/requests",
          icon: <i className="fa-solid fa-arrow-right-arrow-left"></i>,
        },
        {
          title: t("profile"),
          path: "/profile",
          icon: <i className="fa-solid fa-user"></i>,
        },
        {
          title: t("securitySettings"),
          path: "/change-password",
          icon: <i className="fa-solid fa-lock"></i>,
        },
      ];
    } else if (userType == 8) {
      return [
        {
          title: t("statistics"),
          path: "/statistics",
          icon: <i className="fa-solid fa-chart-column"></i>,
        },
        {
          title: t("addRequest"),
          path: "/add-request",
          icon: <i className="fa-solid fa-circle-plus"></i>,
        },
        {
          title: t("requests"),
          path: "/requests",
          icon: <i className="fa-solid fa-arrow-right-arrow-left"></i>,
        },
        {
          title: t("clients"),
          path: "/clients",
          icon: <i className="fa-solid fa-sitemap"></i>,
        },
        {
          title: t("profile"),
          path: "/profile",
          icon: <i className="fa-solid fa-user"></i>,
        },
        {
          title: t("securitySettings"),
          path: "/change-password",
          icon: <i className="fa-solid fa-lock"></i>,
        },
      ];
    } else {
      return [
        {
          title: t("statistics"),
          path: "/statistics",
          icon: <i className="fa-solid fa-chart-column"></i>,
        },
        {
          title: t("requests"),
          path: "/requests",
          icon: <i className="fa-solid fa-arrow-right-arrow-left"></i>,
        },
        {
          title: t("profile"),
          path: "/profile",
          icon: <i className="fa-solid fa-user"></i>,
        },
        {
          title: t("securitySettings"),
          path: "/change-password",
          icon: <i className="fa-solid fa-lock"></i>,
        },
      ];
    }
  }

  async function goToSindionSupportSystem() {
    const data = await authServices.verifyToken({ token: access });
    if (data?.status === 200) {

      try {
        const { data } = await axios.post("https://triple-s-ziadsindion.pythonanywhere.com/api/sso", {
          name_en: userName,
          name_ar: userName,
          email: userEmail,
          username: userUserName,
          serial_number: userId,
        });
        window.open(`https://tms-new-version.vercel.app/login/${data.access}/${data.refresh}`, "_blank");
      } catch (err) {
        console.log(err);
        sweetAlert.error(t("supportError"));
      }

    }
  }

  return (
    <div className={`sidebar ${isSideOppend ? "side-open" : "side-close"}`}>
      <button
        className={`side-menu-button`}
        onClick={() => {
          setIsSideOppened((prev) => !prev);
        }}
      >
        {isSideOppend ? (
          <i className="fa-solid fa-arrow-right"></i>
        ) : (
          <i className="fa-solid fa-arrow-left"></i>
        )}
      </button>
      <div className="logo-container"></div>
      <div className="side-nav-container">
        {userTypeRoutes()?.map((route, i) => {
          return (
            route.path === "/add-request" ? (
              <NavLinkContainer
                key={i}
                path={route.path}
                icon={route.icon}
                title={route.title}
                onClick={(e) => {
                  e.preventDefault();
                  setAddRequestModal(true);
                }}
              />
            ) : route.path === "/change-password" ? (
              <NavLinkContainer
                key={i}
                path={route.path}
                icon={route.icon}
                title={route.title}
                onClick={(e) => {
                  e.preventDefault();
                  setChagePasswordModal(true);
                }}
              />
            ) : (
              <NavLinkContainer
                key={i}
                path={route.path}
                icon={route.icon}
                title={route.title}
                onClick={() => {
                  setIsSideOppened(false);
                }}
              />
            )
          );
        })}

        <NavLinkContainer
          title={t("support")}
          path="/support"
          icon={<i className="fa-solid fa-triangle-exclamation"></i>}
          onClick={(e) => {
            e.preventDefault();
            goToSindionSupportSystem();
          }}
        />
      </div>
      <NavLinkContainer
        className="logout-container"
        title={t("logout")}
        icon={<i className="fa-solid fa-right-from-bracket"></i>}
        path="/logout"
        onClick={(e) => {
          e.preventDefault();
          dispatch(authActions.logout());
        }}
      />

      <Modal isOpen={addRequestModal} setIsOpen={setAddRequestModal}>
        <div className="modal-info add-request">
          <div className="modal-info-header">
            <i className="fa-regular fa-file-lines"></i> <h3>{t("addRequestTitle")}</h3>
          </div>
          <div className="modal-info-body">
            <p>
              {t("addRequestDescription")}
              <br />
              <br />
              {t("addRequestDescription2")}
            </p>
            <div className="flex justify-start items-center gap-3 mt-2 p-4">
              <input type="checkbox" id="agreed" name="agreed" checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} />
              <label htmlFor="agreed">{t("addRequestAgree")}</label>
            </div>
          </div>
          <div className="modal-info-footer">
            <MainButton text={t("save")} onClick={() => {
              if (isAgreed) { setAddRequestModal(false); userType != 8 ? setRequestTypeModal(true) : navigate("/add-request/partner"); setIsAgreed(false); console.log(userType) }
              else { sweetAlert.error(t("addRequestAgreeError")) }
            }} />
            <button className="cancel-btn" onClick={() => { setAddRequestModal(false); setIsAgreed(false); }}>{t("cancel")}</button>
          </div>
        </div>
      </Modal>

      <Modal className="w-400" isOpen={requestTypeModal} setIsOpen={setRequestTypeModal}>
        <div className="modal-info request-type">
          <div className="modal-info-header">
            <h3>{t("requestTypeTitle")}</h3>
          </div>
          <div className="modal-info-body">
            <p>{t("requestTypeDesc")}</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-2">
              {formInputs.map((formInput, index) => {
                return (
                  <MainInput
                    key={index}
                    name={formInput.name}
                    label={formInput.label}
                    type={formInput.type}
                    required={formInput.required}
                    value={formInput.value}
                    state={type}
                    setState={setType}
                  />
                );
              })}
            </div>
          </div>
          <div className="modal-info-footer">
            <MainButton className="w-50" text={t("submit")} onClick={() => {
              if (type.type !== "") { navigate(`/add-request/${type.type}`); setRequestTypeModal(false); setType({ type: "" }); }
              else { sweetAlert.error(t("requestTypeError")) }
            }} />
            <button className="cancel-btn w-50" onClick={() => { setRequestTypeModal(false); setType({ type: "" }) }}>{t("cancel")}</button>
          </div>
        </div>
      </Modal>

      <Modal className="w-600" isOpen={chagePasswordModal} setIsOpen={setChagePasswordModal}>
        <div className="modal-info request-type">
          <div className="modal-info-header">
            <h3>{t("changePassword")}</h3>
          </div>
          <div className="modal-info-body">
            <p>{t("changePasswordDesc")}</p>
            <div className="grid grid-cols-1 mt-2">
              {changePasswordFormInputs.map((formInput, index) => {
                return (
                  <MainInput
                    key={index}
                    name={formInput.name}
                    label={formInput.label}
                    type={formInput.type}
                    required={formInput.required}
                    value={formInput.value}
                    state={changePasswordInfo}
                    setState={setChangePasswordInfo}
                  />
                );
              })}
            </div>
          </div>
          <div className="modal-info-footer p-0">
            <MainButton className="w-50" text={t("submit")} onClick={(e) => { changePassword(e); }} loading={loading} />
            <button className="cancel-btn w-50" onClick={() => { setChagePasswordModal(false); setChangePasswordInfo({ old_password: "", new_password_1: "", new_password_2: "" }) }}>{t("cancel")}</button>
          </div>
        </div>
      </Modal>
    </div >
  );
}

export default Sidebar;
