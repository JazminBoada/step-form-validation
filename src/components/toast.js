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
