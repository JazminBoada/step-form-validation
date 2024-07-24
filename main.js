const prevBtn = document.querySelectorAll(".btn-prev");
const nextBtn = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formStep = document.querySelectorAll(".form-step");
const progressStep = document.querySelectorAll(".progress-step");

let currentActive = 0;

nextBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    checkInputs();
    currentActive++;
    updateFormSteps();
    updateProgressbar();
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

// Form Validation

const form = document.getElementById("form");
const fields = {
  fullname: document.getElementById("name"),
  birthday: document.getElementById("birthday"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  username: document.getElementById("username"),
  password: document.getElementById("password"),
  password2: document.getElementById("password2"),
};

Object.values(fields).forEach((field) => {
  field.addEventListener("input", checkInputs);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const values = Object.keys(fields).reduce((acc, key) => {
    acc[key] = fields[key].value.trim();
    return acc;
  }, {});

  Object.keys(fields).forEach((key) => {
    const field = fields[key];
    if (document.activeElement === field) {
      if (values[key] === "") {
        setErrorFor(field, `${getFieldName(key)} cannot be blank`);
      } else if (key === "email" && !isEmail(values.email)) {
        setErrorFor(field, "Not a valid email");
      } else if (key === "password2" && values.password !== values.password2) {
        setErrorFor(field, "Passwords do not match");
      } else {
        setSuccessFor(field);
      }
    }
  });
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

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function getFieldName(field) {
  const fieldNames = {
    fullname: "Full Name",
    birthday: "Day of Birth",
    email: "Email",
    phone: "Mobile Phone",
    username: "Username",
    password: "Password",
    password2: "Confirm Password",
  };
  return fieldNames[field];
}

//Notificacion

const submitBtn = document.querySelector(".btn-send");
const toast = document.querySelector(".toast");
const closeIcon = document.querySelector(".close");
const progressToast = document.querySelector(".progress-toast");

submitBtn.addEventListener("click", () => {
  toast.classList.add("active-toast");
  progressToast.classList.add("active-toast");

  setTimeout(() => {
    toast.classList.remove("active-toast");
  }, 5000);
});

closeIcon.addEventListener("click", () => {
  toast.classList.remove("active-toast");
});
