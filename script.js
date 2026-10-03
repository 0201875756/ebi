const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", navLinks.classList.contains("open"));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// فرم فعلاً پیام را آماده می‌کند؛ برای ارسال واقعی باید بک‌اند یا سرویس فرم وصل شود.
document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = encodeURIComponent(data.get("subject"));
  const body = encodeURIComponent(
    `نام: ${data.get("name")}\nایمیل: ${data.get("email")}\n\n${data.get("message")}`
  );
  const note = document.getElementById("formNote");
  note.textContent = "برنامه ایمیل دستگاه شما باز می‌شود. برای استفاده، ایمیل نمونه را در فایل index.html با ایمیل خودت عوض کن.";
  window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
});

// مشخص کردن لینک منو با توجه به بخشی که در صفحه دیده می‌شود
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.querySelectorAll("a").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach((section) => observer.observe(section));


/* تغییر تم شب و روز؛ انتخاب کاربر در مرورگر حفظ می‌شود */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("mh-theme");
if (savedTheme === "light") document.documentElement.dataset.theme = "light";
function updateThemeButton() {
  const isLight = document.documentElement.dataset.theme === "light";
  themeToggle.textContent = isLight ? "🌙" : "☀️";
  themeToggle.setAttribute("aria-label", isLight ? "فعال‌کردن تم شب" : "فعال‌کردن تم روشن");
  themeToggle.title = isLight ? "تم شب" : "تم روشن";
}
updateThemeButton();
themeToggle.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  if (next === "light") document.documentElement.dataset.theme = "light";
  else delete document.documentElement.dataset.theme;
  localStorage.setItem("mh-theme", next);
  updateThemeButton();
});

/* اسلایدشو عکس‌های بخش اصلی؛ هر ۴ ثانیه با محوشدن عوض می‌شود */
const heroSlides = document.querySelectorAll(".hero-slideshow .hero-photo");
const photoCounter = document.getElementById("photoCounter");
if (heroSlides.length > 1) {
  let currentSlide = 0;
  setInterval(() => {
    heroSlides[currentSlide].classList.remove("is-active");
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add("is-active");
    photoCounter.textContent = `0${currentSlide + 1} / 0${heroSlides.length}`;
  }, 4000);
}
