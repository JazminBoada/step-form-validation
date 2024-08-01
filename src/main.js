const prevBtn = document.querySelectorAll(".btn-prev");
const nextBtn = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formStep = document.querySelectorAll(".form-step");
const progressStep = document.querySelectorAll(".progress-step");

let currentActive = 0;

nextBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (checkInputs(currentActive)) {
      currentActive++;
      updateFormSteps();
      updateProgressbar();
    }
  });
});

prevBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentActive--;
    updateFormSteps();
    updateProgressbar();
  });
});

function updateFormSteps() {
  formStep.forEach((formStep) => {
    formStep.classList.remove("active");
  });
  formStep[currentActive].classList.add("active");
}

function updateProgressbar() {
  progressStep.forEach((progressStep, index) => {
    if (index < currentActive + 1) {
      progressStep.classList.add("active");
    } else {
      progressStep.classList.remove("active");
    }
  });

  const progressBar = (currentActive / (progressStep.length - 1)) * 100;
  progress.style.width = progressBar + "%";
}

// Validación del form

const form = document.getElementById("form");
const fields = {
  name: document.getElementById("name"),
  lastname: document.getElementById("lastname"),
  birthday: document.getElementById("birthday"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  linkedin: document.getElementById("linkedin"),
  username: document.getElementById("username"),
  password: document.getElementById("password"),
  password2: document.getElementById("password2"),
};

Object.values(fields).forEach((field) => {
  field.addEventListener("input", () => checkSingleInput(field));
});

function checkInputs(step) {
  let valid = true;
  const stepInputs = formStep[step].querySelectorAll("input");

  stepInputs.forEach((input) => {
    const isValid = checkSingleInput(input);
    if (!isValid) {
      valid = false;
    }
  });

  return valid;
}

function checkSingleInput(input) {
  const value = input.value.trim();
  const id = input.id;

  if (value === "") {
    setErrorFor(input, "This field cannot be blank");
    return false;
  } else if (id === "email" && !isEmail(value)) {
    setErrorFor(input, "Not a valid email");
    return false;
  } else if (id === "phone" && !isPhoneNumber(value)) {
    setErrorFor(input, "Not a valid phone number");
    return false;
  } else if (id === "linkedin" && !isLinkedIn(value)) {
    setErrorFor(input, "Not a valid LinkedIn Profile URL");
    return false;
  } else if (id === "password2" && fields.password.value !== value) {
    setErrorFor(input, "Passwords do not match");
    return false;
  } else {
    setSuccessFor(input);
    return true;
  }
}

function setErrorFor(input, message) {
  const inputGroup = input.parentElement;
  const small = inputGroup.querySelector("small");
  inputGroup.className = "input-group error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const inputGroup = input.parentElement;
  inputGroup.className = "input-group success";
}

function resetInputStyles() {
  Object.values(fields).forEach((input) => {
    const inputGroup = input.parentElement;
    inputGroup.className = "input-group"; // Reset to default style
  });
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function isPhoneNumber(phone) {
  return /^(\d{2}-?\d{4}-?\d{4})$/.test(phone);
}

function isLinkedIn(url) {
  return /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/.test(url);
}

// General

window.addEventListener("load", () => {
  const element = document.querySelector(".expand-from-center");
  if (element) {
    element.classList.add("visible");
  }
});

// Notification

const submitBtn = document.querySelector(".btn-send");
const toast = document.querySelector(".toast");
const closeIcon = document.querySelector(".close");
const progressToast = document.querySelector(".progress-toast");

submitBtn.addEventListener("click", () => {
  if (checkInputs(currentActive)) {
    toast.classList.add("active-toast");
    progressToast.classList.add("active-toast");

    // Reset form and input styles after showing the toast
    form.reset(); // Clear the form fields
    resetInputStyles(); // Reset input styles
    currentActive = 0; // Reset to the first step
    updateFormSteps();
    updateProgressbar();

    // Ensure the toast remains visible for its full duration
    setTimeout(() => {
      toast.classList.remove("active-toast");
    }, 5000); // Duration of the toast (5 seconds)
  }
});

closeIcon.addEventListener("click", () => {
  toast.classList.remove("active-toast");
});
