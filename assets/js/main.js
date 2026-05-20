const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", nav.classList.contains("open"));
  });
}
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  },
  { threshold: 0.12 },
);
reveals.forEach((el) => io.observe(el));
const form = document.querySelector("[data-contact-form]");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const message = data.get("message") || "";
    const subject = encodeURIComponent("Запит з сайту ТОВ АДВІЗАРД");
    const body = encodeURIComponent(
      `Імʼя: ${name}\nEmail: ${email}\n\nПовідомлення:\n${message}`,
    );
    window.location.href = `mailto:adwizardllc24@gmail.com?subject=${subject}&body=${body}`;
    const status = form.querySelector(".form-status");
    if (status)
      status.textContent =
        "Поштовий клієнт відкрито. Якщо ні — напишіть нам напряму на adwizardllc24@gmail.com";
  });
}
const adminForm = document.querySelector("[data-admin-form]");
if (adminForm) {
  adminForm.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector(".form-status").textContent =
      "Демо-адмінка: авторизація вимкнена для статичного сайту.";
  });
}

function setCookie(name, value, days) {
  const date = new Date();

  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();

    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}

const cookiePopup = document.getElementById("cookiePopup");

const acceptCookies = document.getElementById("acceptCookies");

const declineCookies = document.getElementById("declineCookies");

const cookieConsent = getCookie("cookieConsent");

if (cookiePopup && !cookieConsent) {
  setTimeout(() => {
    cookiePopup.classList.add("show");
  }, 1200);
}

acceptCookies?.addEventListener("click", () => {
  setCookie("cookieConsent", "accepted", 15 / 1440);

  cookiePopup?.classList.remove("show");
});

declineCookies?.addEventListener("click", () => {
  setCookie("cookieConsent", "declined", 15 / 1440);

  cookiePopup?.classList.remove("show");
});

const registerForm = document.querySelector("[data-admin-register]");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const password = document.getElementById("registerPassword");
    const confirmPassword = document.getElementById("registerConfirmPassword");

    const status = registerForm.querySelector(".form-status");

    if (password.value !== confirmPassword.value) {
      status.textContent = "Паролі не співпадають.";

      status.style.color = "#dc2626";

      return;
    }

    status.textContent =
      "Лист для підтвердження відправлено на email. Перевірте папку Спам.";

    status.style.color = "#16a34a";

    registerForm.reset();
  });
}

const loginForm = document.querySelector("[data-admin-login]");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const status = loginForm.querySelector(".form-status");

    status.textContent =
      "Демо-адмінка: авторизація недоступна у статичній версії сайту.";

    status.style.color = "#ea580c";
  });
}

const forgotPasswordBtn = document.querySelector(".forgot-password");

const forgotModal = document.getElementById("forgotModal");

const closeForgotModal = document.getElementById("closeForgotModal");

const forgotPasswordForm = document.getElementById("forgotPasswordForm");

if (forgotPasswordBtn && forgotModal) {
  forgotPasswordBtn.addEventListener("click", (e) => {
    e.preventDefault();

    forgotModal.classList.add("show");
  });
}

closeForgotModal?.addEventListener("click", () => {
  forgotModal.classList.remove("show");
});

forgotModal?.addEventListener("click", (e) => {
  if (e.target === forgotModal) {
    forgotModal.classList.remove("show");
  }
});

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const status = forgotPasswordForm.querySelector(".form-status");

    status.textContent =
      "Лист для відновлення паролю відправлено на email. Перевірте папку Спам.";

    status.style.color = "#16a34a";

    forgotPasswordForm.reset();

    setTimeout(() => {
      forgotModal.classList.remove("show");
    }, 2500);
  });
}
