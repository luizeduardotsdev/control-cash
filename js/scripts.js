document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("main-navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault();
        let targetId = this.getAttribute("href");
        let targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  const fadeInElements = document.querySelectorAll(".fade-in");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  fadeInElements.forEach((el) => observer.observe(el));

  const stars = document.querySelectorAll(".stars-container .star");
  const feedbackMessage = document.getElementById("rating-feedback");
  let currentRating = 0;

  function setStars(rating) {
    stars.forEach((star) => {
      if (star.getAttribute("data-value") <= rating) {
        star.classList.add("selected");
      } else {
        star.classList.remove("selected");
      }
    });
  }

  stars.forEach((star) => {
    star.addEventListener("mouseover", function () {
      stars.forEach((s) => s.classList.remove("selected", "hover"));
      const rating = this.getAttribute("data-value");
      for (let i = 0; i < rating; i++) {
        stars[i].classList.add("hover");
      }
    });

    star.addEventListener("mouseout", function () {
      stars.forEach((s) => s.classList.remove("hover"));
      setStars(currentRating);
    });

    star.addEventListener("click", function () {
      currentRating = this.getAttribute("data-value");
      feedbackMessage.style.display = "block";
      setStars(currentRating);
    });
  });
});
