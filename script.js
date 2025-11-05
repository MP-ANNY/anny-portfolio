document.addEventListener("DOMContentLoaded", function () {
  /* ----------------- MENU TOGGLE ----------------- */
  const menuToggle = document.getElementById("menu-toggle");
  const navbarList = document.querySelector(".navbar ul");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navbarList.classList.toggle("active");
    });

    document.querySelectorAll(".navbar a").forEach((a) =>
      a.addEventListener("click", () => navbarList.classList.remove("active"))
    );
  }

  function showToast(message, type = "default", duration = 3000) {
    const container =
      document.getElementById("toast-container") ||
      (() => {
        const c = document.createElement("div");
        c.id = "toast-container";
        document.body.appendChild(c);
        return c;
      })();

    const t = document.createElement("div");
    t.className =
      "toast " +
      (type === "success" ? "success" : type === "error" ? "error" : "");
    t.textContent = message;
    container.appendChild(t);

    requestAnimationFrame(() => t.classList.add("show"));

    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 300);
    }, duration);
  }

  /* ----------------- CONTACT FORM ----------------- */
  const contactForm = document.getElementById("contactForm");
  const sendBtn = document.getElementById("sendBtn");
  const formStatus = document.getElementById("formStatus");

  const EMAILJS_SERVICE_ID = "service_zqhep3d";
  const EMAILJS_TEMPLATE_ID = "template_nsocint";

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const title = document.getElementById("title").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !title || !message) {
        showToast("⚠️ Please fill in all fields.", "error");
        formStatus.style.color = "red";
        formStatus.textContent = "Please fill in all fields.";
        return;
      }

      const templateParams = {
        name,
        email,
        title,
        message,
        time: new Date().toLocaleString(),
      };

      sendBtn.disabled = true;
      sendBtn.textContent = "Sending...";
      formStatus.textContent = "";

      emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(() => {
          showToast("✅ Message sent successfully!", "success");
          formStatus.style.color = "green";
          formStatus.textContent = "Message sent successfully!";
          contactForm.reset();
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          showToast("❌ Something went wrong. Please try again.", "error");
          formStatus.style.color = "red";
          formStatus.textContent = "Something went wrong. Please try again.";
        })
        .finally(() => {
          sendBtn.disabled = false;
          sendBtn.textContent = "Send Message";
        });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: "smooth",
        });
      }
    });
  });

  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 400 ? "block" : "none";
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
