import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import sweetAlert from "../../helpers/sweetAlert";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import SearchInput from "../../components/SearchInput/SearchInput";
import NoData from "../../components/NoData/NoData";
import MainButton from "../../components/MainButton/MainButton";
import MainInput from "../../components/MainInput/MainInput";
import DataTable from "../../components/DataTable/DataTable";
import HeaderInfo from "../../components/HeaderInfo/HeaderInfo";
import Modal from "../../components/Modal/Modal";
import bookServices from "../../services/bookServices";
import "./Books.scss";

export default function Books() {
  const navigate = useNavigate();
  const { userId, userType, partnerId } = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [laoading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [itemsCount, setItemsCount] = useState(1);
  const [requestTypeModal, setRequestTypeModal] = useState(false);
  const [type, setType] = useState({ type: "" })
  const formInputs = [
    { name: "type", value: "owner", label: t("owner"), type: "radio", required: false },
    { name: "type", value: "interested", label: t("interested"), type: "radio", required: false, },
  ];

  async function getBooks() {
    setLoading(true);
    try {
      const { data } = await bookServices.getBooks(userType == 9 ? "" : userId, userType == 9 ? statusId?.toString() || "0,1,2,3" : statusId?.toString(), searchTerm, dateRange[0] || "", dateRange[1] || "", activePage, isPaid, userType == 9 ? partnerId : "");
      setBooks(data.results.map((request) => {
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
                request.status === "DRAFT" && { text: t("edit"), icon: <i className="fa-solid fa-circle fa-xs draft"></i>, onClick: () => navigate(`/books/${request.id}/edit`) },
                (request.status === "SUBMITTED" && userType != 8) && { text: t("checkout"), icon: <i className="fa-solid fa-circle fa-xs submitted"></i>, onClick: () => navigate(`/books/${request.id}/checkout`) },
                (request.status === "SUBMITTED" && userType == 8) && { text: t("view"), icon: <i className="fa-solid fa-circle fa-xs all"></i>, onClick: () => navigate(`/books/${request.id}`) },
                (request.status === "DONE") && { text: t("download"), icon: <i className="fa-solid fa-circle fa-xs done"></i>, onClick: () => window.open(request.report, "_blank") },
                (request.status !== "SUBMITTED" && request.status !== "DRAFT" && request.status !== "DONE") && { text: t("view"), icon: <i className="fa-solid fa-circle fa-xs all"></i>, onClick: () => navigate(`/books/${request.id}`) },
              ]
            }
            />
          ),
          rowClick: () => navigate(`/books/${request.id}`)
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
    getBooks();
  }, [activePage, dateRange, statusId, lang, isPaid, partnerId, userId]);

  useEffect(() => {
    if (searchTerm.length >= 0) {
      setActivePage(1)

      const delayDebounceFn = setTimeout(() => {
        getBooks();
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
      {books.length > 0 ? (
        <DataTable
          mapKey="id"
          tableRows={books}
          tableColumns={["image", "name", "type", "date", "instrumentNumber", "neighborhood", "status", "options"]}
          showPagination={true}
          activePage={activePage}
          handlePageChange={handlePageChange}
          itemsCount={itemsCount}
        />
      ) : (<NoData text={searchTerm.length > 0 ? t("noDataSearch") : t("noData")} />)}

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
