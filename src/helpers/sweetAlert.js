import i18n from "../locales/i18n";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

// handle sweet alert messages and modals
const sweetAlert = {
  error: (text) => {
    const lang = i18n.language;
    Toast.fire({
      icon: "error",
      title: text,
      position: lang === "ar" ? "top-start" : "top-end",
    });
  },

  success: (text) => {
    const lang = i18n.language;
    Toast.fire({
      icon: "success",
      title: text,
      position: lang === "ar" ? "top-start" : "top-end",
    });
  },


  modal: (text, buttons) => {
    Swal.fire({
      title: text,
      showCancelButton: true,
      confirmButtonText: buttons.confirm,
      cancelButtonText: buttons.cancel,
      icon: "warning",
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#2d62ed",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        buttons.confirmAction();
      } else {
        buttons.cancelAction();
      }
    });
  },

  modalWithComponent: (buttons, component) => {
    Swal.fire({
      confirmButtonText: buttons.confirm,
      cancelButtonText: buttons.cancel,
      showCancelButton: true,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#2d62ed",
      cancelButtonColor: "#d33",
      html: component,
    }).then((result) => {
      if (result.isConfirmed) {
        buttons.confirmAction();
      } else {
        buttons.cancelAction();
      }
    });
  }
};

export default sweetAlert;