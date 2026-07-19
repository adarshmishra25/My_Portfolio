// ===============================
// Portfolio - script.js
// Adarsh Mishra Portfolio
// ===============================

"use strict";

/* =====================================
   Helpers
===================================== */

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [
  ...scope.querySelectorAll(selector),
];

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/* =====================================
   Loader
===================================== */

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";

    setTimeout(() => {
      preloader.remove();
    }, 500);
  }
});

/* =====================================
   Mobile Navigation
===================================== */

const navToggle = $(".nav-toggle");
const navMenu = $(".nav-links");
const navLinks = $$(".nav-links a");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });
}

/* =====================================
   Sticky Navbar
===================================== */

const navbar = $("header");

function updateNavbar() {
  if (!navbar) return;

  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

updateNavbar();

window.addEventListener("scroll", updateNavbar);

/* =====================================
   Active Navigation Link
===================================== */

const sections = $$("section[id]");

const activateNavLink = () => {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (!link) return;

    if (scrollY >= top && scrollY < top + height) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

window.addEventListener("scroll", activateNavLink);
activateNavLink();

/* =====================================
   Smooth Scroll
===================================== */

$$('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  });
});

/* =====================================
   Scroll Reveal
===================================== */

const revealItems = $$(
  ".reveal, .section-title, .hero-content, .hero-image, .project-card, .skill-card, .education-card, .contact-card",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("show");

      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.15,
  },
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

/* =====================================
   Animated Counters
===================================== */

const counters = $$(".counter");

const animateCounter = (counter) => {
  const target = Number(counter.dataset.target);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);

    const value = Math.floor(progress * target);

    counter.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = target;
    }
  }

  requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      animateCounter(entry.target);

      counterObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.5,
  },
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

/* =====================================
   Skill Progress Animation
===================================== */

const progressBars = $$(".progress-fill");

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const bar = entry.target;

      const value = bar.dataset.progress || "0";

      bar.style.width = value + "%";

      progressObserver.unobserve(bar);
    });
  },
  {
    threshold: 0.4,
  },
);

progressBars.forEach((bar) => {
  bar.style.width = "0%";
  progressObserver.observe(bar);
});

/* =====================================
   Typing Effect
===================================== */

const typingElement = $(".typing");

if (typingElement) {
  const roles = [
    "Full Stack Developer",
    "MERN Stack Developer",
    "Problem Solver",
    "DSA Enthusiast",
    "Web Developer",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = roles[roleIndex];

    if (!deleting) {
      typingElement.textContent = current.substring(0, charIndex + 1);

      charIndex++;

      if (charIndex === current.length) {
        deleting = true;

        setTimeout(type, 1800);

        return;
      }
    } else {
      typingElement.textContent = current.substring(0, charIndex - 1);

      charIndex--;

      if (charIndex === 0) {
        deleting = false;

        roleIndex++;

        if (roleIndex >= roles.length) {
          roleIndex = 0;
        }
      }
    }

    const speed = deleting ? 50 : 110;

    setTimeout(type, speed);
  }

  type();
}

/* =====================================
   Scroll Progress Indicator
===================================== */

const progressLine = $(".scroll-progress");

function updateProgress() {
  if (!progressLine) return;

  const height = document.documentElement.scrollHeight - window.innerHeight;

  const progress = (window.scrollY / height) * 100;

  progressLine.style.width = progress + "%";
}

window.addEventListener("scroll", updateProgress);
updateProgress();

/* =====================================
   Back To Top Button
===================================== */

const backToTop = $(".back-to-top");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
}

/* =====================================
   Tilt Effect
===================================== */

const tiltCards = document.querySelectorAll(".project-card, .skill-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    if (window.innerWidth < 992) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-8px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* =====================================
   Hero Floating Shapes
===================================== */

const floatingShapes = document.querySelectorAll(".shape");

window.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  floatingShapes.forEach((shape, index) => {
    const speed = (index + 1) * 12;

    shape.style.transform = `
      translate(
        ${x * speed}px,
        ${y * speed}px
      )
    `;
  });
});

/* =====================================
   Magnetic Buttons
===================================== */

const magneticButtons = document.querySelectorAll(
  ".btn-primary, .btn-secondary",
);

magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    if (window.innerWidth < 768) return;

    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `
      translate(${x * 0.2}px, ${y * 0.2}px)
    `;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

/* =====================================
   Project Filter
===================================== */

const filterButtons = document.querySelectorAll(".filter-btn");

const projectCards = document.querySelectorAll(".project-card");

if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      button.classList.add("active");

      const filter = button.dataset.filter;

      projectCards.forEach((card) => {
        const category = card.dataset.category;

        if (filter === "all" || category === filter) {
          card.style.display = "block";

          requestAnimationFrame(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          });
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(.9)";

          setTimeout(() => {
            card.style.display = "none";
          }, 250);
        }
      });
    });
  });
}

/* =====================================
   Contact Form - EmailJS
===================================== */

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const button = this.querySelector("button");

        const originalText = button.innerHTML;

        button.disabled = true;
        button.innerHTML = "Sending...";

        emailjs.sendForm(
            "service_cqsifki",
            "template_rnsbt6j",
            this
        )

        .then(() => {

            button.innerHTML = "✅ Message Sent";

            contactForm.reset();

            setTimeout(() => {

                button.disabled = false;
                button.innerHTML = originalText;

            }, 2500);

        })

        .catch((error) => {

            console.error(error);

            button.disabled = false;
            button.innerHTML = originalText;

            alert("❌ Failed to send message. Please try again.");

        });

    });

}
/* =====================================
   Theme Toggle
===================================== */

const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    localStorage.setItem(
      "portfolio-theme",
      document.body.classList.contains("light-theme") ? "light" : "dark",
    );
  });
}

/* =====================================
   Copy Email
===================================== */

const copyButton = document.querySelector(".copy-email");

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const email = "adarshmishra.dev@gmail.com";

    try {
      await navigator.clipboard.writeText(email);

      const original = copyButton.innerHTML;

      copyButton.innerHTML = "Copied!";

      setTimeout(() => {
        copyButton.innerHTML = original;
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  });
}

/* =====================================
   Current Year
===================================== */

const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}
/* =====================================
   Parallax Background
===================================== */

const parallaxElements = document.querySelectorAll(".parallax");

function parallaxEffect() {
  const scrollY = window.pageYOffset;

  parallaxElements.forEach((element) => {
    const speed = parseFloat(element.dataset.speed) || 0.3;

    element.style.transform = `translateY(${scrollY * speed}px)`;
  });
}

window.addEventListener("scroll", parallaxEffect);

/* =====================================
   Hero Blob Animation
===================================== */

const heroBlob = document.querySelector(".hero-blob");

if (heroBlob) {
  let angle = 0;

  function animateBlob() {
    angle += 0.004;

    const x = Math.sin(angle) * 18;
    const y = Math.cos(angle) * 14;
    const rotate = Math.sin(angle) * 8;

    heroBlob.style.transform = `
      translate(${x}px, ${y}px)
      rotate(${rotate}deg)
    `;

    requestAnimationFrame(animateBlob);
  }

  animateBlob();
}

/* =====================================
   Image Glow Follow
===================================== */

const profileCard = document.querySelector(".hero-image");

if (profileCard) {
  profileCard.addEventListener("mousemove", (e) => {
    const rect = profileCard.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;

    const y = ((e.clientY - rect.top) / rect.height) * 100;

    profileCard.style.setProperty("--x", `${x}%`);
    profileCard.style.setProperty("--y", `${y}%`);
  });
}

/* =====================================
   Animate Statistics
===================================== */

function formatValue(value, suffix) {
  if (suffix === "+") return value + "+";
  if (suffix === "%") return value + "%";
  return value;
}

document.querySelectorAll(".stat-number").forEach((stat) => {
  const target = Number(stat.dataset.value);
  const suffix = stat.dataset.suffix || "";

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 80));

        const timer = setInterval(() => {
          current += increment;

          if (current >= target) {
            current = target;
            clearInterval(timer);
          }

          stat.textContent = formatValue(current, suffix);
        }, 20);

        observer.disconnect();
      });
    },
    {
      threshold: 0.5,
    },
  );

  observer.observe(stat);
});

/* =====================================
   Project Hover Preview
===================================== */

const projectImages = document.querySelectorAll(".project-image img");

projectImages.forEach((image) => {
  image.addEventListener("mouseenter", () => {
    image.style.transform = "scale(1.08) rotate(1deg)";
  });

  image.addEventListener("mouseleave", () => {
    image.style.transform = "";
  });
});

/* =====================================
   Fade Navigation On Scroll Down
===================================== */

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (!navbar) return;

  if (currentScroll > lastScroll && currentScroll > 150) {
    navbar.classList.add("hide-nav");
  } else {
    navbar.classList.remove("hide-nav");
  }

  lastScroll = currentScroll;
});

/* =====================================
   Ripple Effect
===================================== */

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");

    ripple.className = "ripple";

    const rect = this.getBoundingClientRect();

    ripple.style.left = e.clientX - rect.left + "px";

    ripple.style.top = e.clientY - rect.top + "px";

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

/* =====================================
   Keyboard Accessibility
===================================== */

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (navMenu) {
      navMenu.classList.remove("active");
    }

    if (navToggle) {
      navToggle.classList.remove("active");
    }

    document.body.classList.remove("menu-open");
  }
});

/* =====================================
   Lazy Load Images
===================================== */

const lazyImages = document.querySelectorAll("img[data-src]");

const imageObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const img = entry.target;

      img.src = img.dataset.src;

      img.onload = () => {
        img.classList.add("loaded");
      };

      observer.unobserve(img);
    });
  },
  {
    threshold: 0.2,
  },
);

lazyImages.forEach((img) => {
  imageObserver.observe(img);
});

/* =====================================
   Intersection Animation Delay
===================================== */

document.querySelectorAll(".stagger").forEach((parent) => {
  [...parent.children].forEach((child, index) => {
    child.style.transitionDelay = `${index * 100}ms`;
  });
});

/* =====================================
   Spotlight Effect
===================================== */

const spotlight = document.querySelector(".spotlight");

if (spotlight) {
  window.addEventListener("mousemove", (e) => {
    spotlight.style.left = e.clientX + "px";
    spotlight.style.top = e.clientY + "px";
  });
}

/* =====================================
   Console Message
===================================== */

console.log(
  "%cWelcome to Adarsh Mishra's Portfolio 🚀",
  `
  color:#4f8cff;
  font-size:18px;
  font-weight:bold;
  `,
);

console.log(
  "%cBuilt using HTML, CSS & JavaScript.",
  "color:#8b949e;font-size:14px;",
);

/* =====================================
   Initialize
===================================== */

document.documentElement.classList.add("js-enabled");

window.addEventListener("DOMContentLoaded", () => {
  updateNavbar();
  activateNavLink();
  updateProgress();
  parallaxEffect();
});

window.addEventListener("focus", () => {
  updateNavbar();
  updateProgress();
});

window.addEventListener("resize", () => {
  updateProgress();
  activateNavLink();
});
/* =====================================
   Animated Background Particles
===================================== */

const particleCanvas = document.querySelector("#particle-canvas");

if (particleCanvas) {
  const ctx = particleCanvas.getContext("2d");

  let particles = [];
  const PARTICLE_COUNT = 60;

  function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * particleCanvas.width;
      this.y = Math.random() * particleCanvas.height;
      this.radius = Math.random() * 2 + 1;
      this.dx = (Math.random() - 0.5) * 0.4;
      this.dy = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.6 + 0.2;
    }

    update() {
      this.x += this.dx;
      this.y += this.dy;

      if (
        this.x < 0 ||
        this.x > particleCanvas.width ||
        this.y < 0 ||
        this.y > particleCanvas.height
      ) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.globalAlpha = this.opacity;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#4f8cff";
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(79,140,255,${1 - distance / 120})`;
          ctx.lineWidth = 0.4;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    connectParticles();

    requestAnimationFrame(animateParticles);
  }

  resizeCanvas();

  particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

  animateParticles();

  window.addEventListener("resize", resizeCanvas);
}

/* =====================================
   Project Card Shine
===================================== */

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;

    const y = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  });
});

/* =====================================
   Scroll Percentage
===================================== */

const scrollPercent = document.querySelector(".scroll-percent");

if (scrollPercent) {
  window.addEventListener("scroll", () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;

    const percent = Math.round((window.scrollY / total) * 100);

    scrollPercent.textContent = `${percent}%`;
  });
}

/* =====================================
   Double Click Logo Easter Egg
===================================== */

const logo = document.querySelector(".logo");

if (logo) {
  logo.addEventListener("dblclick", () => {
    logo.classList.add("spin");

    setTimeout(() => {
      logo.classList.remove("spin");
    }, 1000);

    console.log("🚀 Keep building. Keep learning.");
  });
}

/* =====================================
   Preload Important Images
===================================== */

[
  "assets/profile.png",
  "assets/markvault.png",
  "assets/ai-learning.png",
].forEach((src) => {
  const img = new Image();
  img.src = src;
});

/* =====================================
   Performance Log
===================================== */

window.addEventListener("load", () => {
  const navigation = performance.getEntriesByType("navigation")[0];

  if (navigation) {
    console.log(`Page loaded in ${Math.round(navigation.loadEventEnd)} ms`);
  }
});

/* =====================================
   End of script.js
===================================== */
