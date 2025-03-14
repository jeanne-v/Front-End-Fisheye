function showContactModal() {
  const mainWrapper = document.getElementById("main-wrapper");
  const contactModal = document.getElementById("contact_modal");
  contactModal.ariaHidden = false;
  contactModal.style.display = "flex";
  document.querySelector(".modal_close-button").focus();
  mainWrapper.ariaHidden = true;
  mainWrapper.inert = true;
  mainWrapper.classList.add("no-scroll");
}

function hideContactModal() {
  const mainWrapper = document.getElementById("main-wrapper");
  const contactModal = document.getElementById("contact_modal");
  mainWrapper.ariaHidden = false;
  mainWrapper.inert = false;
  mainWrapper.classList.remove("no-scroll");
  document.querySelector(".contact_button").focus();
  contactModal.style.display = "none";
  contactModal.ariaHidden = true;
}

function logFormData() {
  const modalForm = document.getElementById("modal-form");
  const formData = new FormData(modalForm);
  console.log(formData.get("first-name"));
  console.log(formData.get("last-name"));
  console.log(formData.get("email"));
  console.log(formData.get("message"));
}
