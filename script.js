document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const revealEls = document.querySelectorAll(".reveal");
const fills = document.querySelectorAll(".progress-fill");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  const fillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.target + "%";
          fillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  fills.forEach((el) => fillObserver.observe(el));

  // Safety net: content must never stay invisible. If an element somehow
  // never intersects (unusual layouts, scroll edge cases, tab loaded in
  // background), force it visible after a short delay regardless.
  setTimeout(() => {
    revealEls.forEach((el) => el.classList.add("visible"));
    fills.forEach((el) => {
      if (!el.style.width) el.style.width = el.dataset.target + "%";
    });
  }, 2000);
} else {
  // No IntersectionObserver support at all: skip the animations, show everything.
  revealEls.forEach((el) => el.classList.add("visible"));
  fills.forEach((el) => (el.style.width = el.dataset.target + "%"));
}

const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }
  formSuccess.classList.add("visible");
  contactForm.reset();
});