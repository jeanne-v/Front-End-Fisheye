const mediaSelect = document.querySelector(".media-sort");
const selectTrigger = document.getElementById("media-sort-trigger");
const options = Array.from(document.querySelectorAll(".media-sort__option"));

let currentOptionIndex = 0;

function openDropDown() {
  mediaSelect.classList.add("media-sort--open");
  selectTrigger.ariaExpanded = true;
  focusCurrentOption();
}

function closeDropDown() {
  mediaSelect.classList.remove("media-sort--open");
  selectTrigger.ariaExpanded = false;
  selectTrigger.focus();
  selectTrigger.setAttribute("aria-activedescendant", "");
}

function focusCurrentOption() {
  options.forEach((option) => option.classList.remove("media-sort__option--current"));
  options[currentOptionIndex].classList.add("media-sort__option--current");
  selectTrigger.setAttribute("aria-activedescendant", options[currentOptionIndex].id);
}

function moveDropDownFocusToPreviousOption() {
  if (currentOptionIndex > 0) {
    currentOptionIndex = currentOptionIndex - 1;
    focusCurrentOption();
  }
}

function moveDropDownFocusToNextOption() {
  if (currentOptionIndex < options.length - 1) {
    currentOptionIndex = currentOptionIndex + 1;
    focusCurrentOption();
  }
}

function moveFocusToOption(optionHTMLEl) {
  currentOptionIndex = options.findIndex((option) => option === optionHTMLEl);
  focusCurrentOption();
}

function updateSelectedValue() {
  options.forEach((option) => (option.ariaSelected = false));
  options[currentOptionIndex].ariaSelected = true;
  selectTrigger.querySelector("span").textContent =
    options[currentOptionIndex].textContent;
  selectTrigger.dataset.selectedSortValue = options[currentOptionIndex].dataset.sortValue;
}
