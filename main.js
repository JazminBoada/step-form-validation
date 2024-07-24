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

const form = document.getElementById("form");
const fullname = document.getElementById("name");
const birthday = document.getElementById("birthday");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const username = document.getElementById("username");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Form Validation

fullname.addEventListener("input", checkInputs);
birthday.addEventListener("input", checkInputs);
email.addEventListener("input", checkInputs);
phone.addEventListener("input", checkInputs);
username.addEventListener("input", checkInputs);
password.addEventListener("input", checkInputs);
password2.addEventListener("input", checkInputs);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const fullnameValue = fullname.value.trim();
  const birthdayValue = birthday.value.trim();
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (document.activeElement === fullname) {
    if (fullnameValue === "") {
      setErrorFor(fullname, "Full Name cannot be blank");
    } else {
      setSuccessFor(fullname);
    }
  }

  if (document.activeElement === birthday) {
    if (birthdayValue === "") {
      setErrorFor(birthday, "Day of Birth cannot be blank");
    } else {
      setSuccessFor(birthday);
    }
  }

  if (document.activeElement === email) {
    if (emailValue === "") {
      setErrorFor(email, "Email cannot be blank");
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "Not a valid email");
    } else {
      setSuccessFor(email);
    }
  }

  if (document.activeElement === phone) {
    if (phoneValue === "") {
      setErrorFor(phone, "Movile Phone cannot be blank");
    } else {
      setSuccessFor(phone);
    }
  }

  if (document.activeElement === username) {
    if (usernameValue === "") {
      setErrorFor(username, "Username cannot be blank");
    } else {
      setSuccessFor(username);
    }
  }

  if (document.activeElement === password) {
    if (passwordValue === "") {
      setErrorFor(password, "Password cannot be blank");
    } else {
      setSuccessFor(password);
    }
  }

  if (document.activeElement === password2) {
    if (password2Value === "") {
      setErrorFor(password2, "Confirm Password cannot be blank");
    } else if (passwordValue !== password2Value) {
      setErrorFor(password2, "Passwords does not match");
    } else {
      setSuccessFor(password2);
    }
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

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
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
