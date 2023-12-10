import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { status } from "../../helpers/constants";
import DateRange from "../../components/DateRangePicker/DateRangePicker"
import sweetAlert from "../../helpers/sweetAlert";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import PageTitle from "../../components/PageTitle/PageTitle";
import SearchInput from "../../components/SearchInput/SearchInput";
import requestsServices from "../../services/requestsServices";
import NoData from "../../components/NoData/NoData";
import MainButton from "../../components/MainButton/MainButton";
import MainInput from "../../components/MainInput/MainInput";
import DataTable from "../../components/DataTable/DataTable";
import MenuOptions from "../../components/MenuOptions/MenuOptions";
import MenuTabOptions from "../../components/MenuTabOptions/MenuTabOptions";
import HeaderInfo from "../../components/HeaderInfo/HeaderInfo";
import Modal from "../../components/Modal/Modal";
import "react-datepicker/dist/react-datepicker.css";
import "./Requests.scss";

export default function Requests() {
  const navigate = useNavigate();
  const { userId, userType, partnerId } = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [laoading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [statusId, setStatusId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [itemsCount, setItemsCount] = useState(1);
  const [dateRange, setDateRange] = useState("");
  const [addRequestModal, setAddRequestModal] = useState(false);
  const [requestTypeModal, setRequestTypeModal] = useState(false);
  const [type, setType] = useState({ type: "" })
  const [isAgreed, setIsAgreed] = useState(false);
  const [isPaid, setIsPaid] = useState("");
  const formInputs = [
    { name: "type", value: "owner", label: t("owner"), type: "radio", required: false },
    { name: "type", value: "interested", label: t("interested"), type: "radio", required: false, },
  ];

  async function getRequests() {
    setLoading(true);
    try {
      const { data } = await requestsServices.getRequests(userType == 9 ? "" : userId, userType == 9 ? statusId?.toString() || "0,1,2,3" : statusId?.toString(), searchTerm, dateRange[0] || "", dateRange[1] || "", activePage, isPaid, userType == 9 ? partnerId : "");
      setRequests(data.results.map((request) => {
        return {
          id: request.id,
          image: request.user.photo && !request.partnerClientName ? (<img loading="lazy" className="h-8 w-8 object-cover rounded" src={request.user.photo} alt="" />) : (<i className="fa-solid fa-user"></i>),
          name: !request.partnerClientName ? request.user.name : request.partnerClientName || "-",
          instrumentNumber: request.instrumentNumber || "-",
          neighborhood: (lang === "en" ? request.neighborhood.nameEn : request.neighborhood.nameAr) || "-",
          date: request?.created?.split("T")[0] || "-",
          type: (userType != 8 ? request?.type == 0 ? t("owner") : t("interested") : t('partner')) || "-",
          status: (
            <>
              <i className={`fa-solid fa-square ${request.status.toLowerCase()}`}></i>
              <span> {t(request.status) || "-"}</span>
            </>
          ),
          options: (
            <MenuOptions className="menu-table" buttons={
              [
                request.status === "DRAFT" && { text: t("edit"), icon: <i className="fa-solid fa-circle fa-xs draft"></i>, onClick: () => navigate(`/requests/${request.id}/edit`) },
                (request.status === "SUBMITTED" && userType != 8) && { text: t("checkout"), icon: <i className="fa-solid fa-circle fa-xs submitted"></i>, onClick: () => navigate(`/requests/${request.id}/checkout`) },
                (request.status === "SUBMITTED" && userType == 8) && { text: t("view"), icon: <i className="fa-solid fa-circle fa-xs all"></i>, onClick: () => navigate(`/requests/${request.id}`) },
                (request.status === "DONE") && { text: t("download"), icon: <i className="fa-solid fa-circle fa-xs done"></i>, onClick: () => window.open(request.report, "_blank") },
                (request.status !== "SUBMITTED" && request.status !== "DRAFT" && request.status !== "DONE") && { text: t("view"), icon: <i className="fa-solid fa-circle fa-xs all"></i>, onClick: () => navigate(`/requests/${request.id}`) },
              ]
            }
            />
          ),
          rowClick: () => navigate(`/requests/${request.id}`)
        };
      })
      );
      setItemsCount(data.count);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  function handlePageChange(pageNumber) {
    setActivePage(pageNumber);
  }

  useEffect(() => {
    getRequests();
  }, [activePage, dateRange, statusId, lang, isPaid, partnerId, userId]);

  useEffect(() => {
    if (searchTerm.length >= 0) {
      setActivePage(1)

      const delayDebounceFn = setTimeout(() => {
        getRequests();
      }, 750);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  return (
    <div className="page-container">
      {laoading && <LoadingSpinner />}
      <div className="header">
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchPlaceHolder={t("search")} />
        <HeaderInfo />
      </div>
      <PageTitle
        icon={<i className="fa-solid fa-arrow-right-arrow-left"></i>}
        text={t("requests")}
        back={false}
        component={(
          <div className="title-component flex justify-center items-center flex-wrap gap-3">
            {userType != 9 && <MainButton className="w-auto add" text={t("addRequest")} icon={<i className="fa-solid fa-circle-plus"></i>} onClick={() => setAddRequestModal(true)} />}
            <DateRange
              dateRange={dateRange}
              setDateRange={setDateRange}
              setActivePage={setActivePage}
            />
            <MenuTabOptions
              icon={<i className="fa-solid fa-filter"></i>}
              tabs={[
                {
                  text: t("status"),
                  buttons: status.map((item) =>
                  (userType == 9 && item?.id == 4
                    ? {}
                    : { text: t(item.name), icon: <i className={`fa-solid fa-circle fa-xs ${item.name.toLowerCase()}`}></i>, onClick: () => { setStatusId(item.id) } }
                  ))
                },
                {
                  text: t("payment"),
                  buttons: [
                    { text: t("all"), icon: <i className="fa-solid fa-circle fa-xs all"></i>, onClick: () => { setIsPaid("") } },
                    { text: t("paid"), icon: <i className="fa-solid fa-circle fa-xs done"></i>, onClick: () => { setIsPaid(true) } },
                    { text: t("unPaid"), icon: <i className="fa-solid fa-circle fa-xs submitted"></i>, onClick: () => { setIsPaid(false) } }
                  ]
                }
              ]}
            />
          </div>
        )}
      />
      {requests.length > 0 ? (
        <DataTable
          mapKey="id"
          tableRows={requests}
          tableColumns={["image", "name", "type", "date", "instrumentNumber", "neighborhood", "status", "options"]}
          showPagination={true}
          activePage={activePage}
          handlePageChange={handlePageChange}
          itemsCount={itemsCount}
        />
      ) : (<NoData text={searchTerm.length > 0 ? t("noDataSearch") : t("noData")} />)}

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
              if (isAgreed) { setAddRequestModal(false); userType != 8 ? setRequestTypeModal(true) : navigate("/add-request/partner"); setIsAgreed(false); }
              else { sweetAlert.error(t("addRequestAgreeError")) }
            }} />
            <button type="cancel" className="cancel-btn" onClick={() => { setAddRequestModal(false); setIsAgreed(false); }}>{t("cancel")}</button>
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
            <div className="grid grid-cols-2 gap-3 mt-2">
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
            <button type="cancel" className="cancel-btn w-50" onClick={() => { setRequestTypeModal(false); setType({ type: "" }) }}>{t("cancel")}</button>
          </div>
        </div>
      </Modal>
    </div >
  );
}
