const form = document.querySelector("form");
const dataStep = document.querySelector("[data-form]");
const progressSteps = [...document.querySelectorAll("#progressbar li")];
const password1El = document.getElementById("password1");
const password2El = document.getElementById("password2");
const formSteps = [...dataStep.querySelectorAll("[data-step]")];
const stepCounts = formSteps.length;

let currentStep = formSteps.findIndex((step) => {
  return step.classList.contains("active");
});

if (currentStep < 0) {
  currentStep = 0;
  formSteps[currentStep].classList.add("active");
}

dataStep.addEventListener("click", (e) => {
  let incrementor;
  if (e.target.matches("[data-next]")) {
    incrementor = 1;
  } else if (e.target.matches("[data-previous]")) {
    incrementor = -1;
  } else {
    return;
  }

  if (incrementor == null) return;

  const inputs = [...formSteps[currentStep].querySelectorAll("input")];
  const allValid = inputs.every((input) => input.reportValidity());

  if (allValid) {
    currentStep += incrementor;
    showCurrentStep();
    showprogressBar();
  }
});

formSteps.forEach((step) => {
  step.addEventListener("animationend", (e) => {
    formSteps[currentStep].classList.remove("hide");
    e.target.classList.toggle("hide", !e.target.classList.contains("active"));
  });
});

function showprogressBar() {
  progressSteps.forEach((step, index) => {
    if (index <= currentStep) {
      step.classList.remove("hide");
      step.classList.add("active");
    } else {
      step.classList.remove("active");
      step.classList.add("hide");
    }
  });
}

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
}

function storeFormData() {
  const user = {
    email: form.email.value,
    password: form.password.value,
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    phone: form.phone.value,
    address: form.address.value,
  };
  // Do something with user data
  console.log(user);
}

function processFormData(e) {
  e.preventDefault();
  storeFormData();
}

form.removeEventListener("submit", processFormData);

// Event Listener
function controlSubmit() {
  if (currentStep === stepCounts - 1) {
    form.addEventListener("submit", processFormData);
  } else {
    form.removeEventListener("submit", processFormData);
  }
}

document.addEventListener("keydown", controlSubmit);
