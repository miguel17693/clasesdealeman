// German Classes Website JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Banner loading and error handling
  const bannerDesktop = document.querySelector(".banner-desktop");
  const bannerMobile = document.querySelector(".banner-mobile");
  const textFallback = document.querySelector(".text-logo-fallback");

  function handleBannerError() {
    // Show text fallback if banners fail to load
    if (textFallback) {
      textFallback.style.display = "block";
      // Re-enable text logo styles
      const style = document.createElement("style");
      style.textContent = `
        .nav-logo h2,
        .nav-logo span {
          display: block !important;
        }
        .nav-logo h2 {
          color: var(--primary-color);
          font-size: 2.8rem;
          font-weight: 900;
          margin-bottom: 0.25rem;
          letter-spacing: -0.06em;
          font-family: "Orbitron", "Exo 2", "Rajdhani", "Inter", system-ui, sans-serif;
          text-shadow: 2px 2px 4px rgba(43, 115, 157, 0.1);
          text-transform: uppercase;
        }
        .nav-logo span {
          color: var(--text-muted);
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.025em;
          text-transform: uppercase;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Create placeholder banner if images don't exist
  function createBannerPlaceholder() {
    const placeholder = document.createElement("div");
    placeholder.className = "banner-placeholder";
    placeholder.innerHTML = `
      <div style="
        background: var(--primary-color);
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 700;
        font-size: 1.2rem;
        text-align: center;
        max-width: 250px;
      ">
        TU BANNER AQUÍ
      </div>
    `;
    return placeholder;
  }

  // Handle banner loading
  if (bannerDesktop) {
    console.log("Desktop banner found:", bannerDesktop.src);
    bannerDesktop.onload = function () {
      console.log("Desktop banner loaded successfully");
      this.style.opacity = "1";
      this.style.visibility = "visible";
    };
    bannerDesktop.onerror = function () {
      console.log("Desktop banner failed to load:", this.src);
      this.style.display = "none";
      if (!document.querySelector(".banner-placeholder")) {
        const placeholder = createBannerPlaceholder();
        this.parentNode.appendChild(placeholder);
      }
    };
  }

  if (bannerMobile) {
    console.log("Mobile banner found:", bannerMobile.src);
    bannerMobile.onload = function () {
      console.log("Mobile banner loaded successfully");
      this.style.opacity = "1";
      this.style.visibility = "visible";
    };
    bannerMobile.onerror = function () {
      console.log("Mobile banner failed to load:", this.src);
      this.style.display = "none";
      if (!document.querySelector(".banner-placeholder")) {
        const placeholder = createBannerPlaceholder();
        this.parentNode.appendChild(placeholder);
      }
    };
  }
  // Navigation functionality
  const navbar = document.querySelector(".navbar");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  // Sticky navigation on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    }
  });

  if (hamburger && navMenu) {
    console.log("Mobile menu elements found successfully");

    // Force show elements for debugging
    hamburger.style.display = "flex";

    hamburger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      console.log("Hamburger clicked!");
      console.log("Menu classes before:", navMenu.className);

      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");

      console.log("Menu classes after:", navMenu.className);
      console.log(
        "Menu computed styles:",
        window.getComputedStyle(navMenu).left,
      );
    });

    // Close menu when clicking on links
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        console.log("Menu link clicked - closing menu");
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !hamburger.contains(e.target) &&
        !navMenu.contains(e.target) &&
        navMenu.classList.contains("active")
      ) {
        console.log("Clicked outside - closing menu");
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });
  } else {
    console.error("Mobile menu elements NOT found!");
    console.log("Hamburger:", hamburger);
    console.log("NavMenu:", navMenu);
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Contact form functionality removed - now using direct email contact

  // Message display function
  function showMessage(message, type = "info") {
    // Remove any existing messages
    const existingMessage = document.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement("div");
    messageDiv.className = `form-message ${type}`;
    const iconClass =
      type === "success"
        ? "fa-check-circle"
        : type === "error"
          ? "fa-exclamation-circle"
          : "fa-info-circle";
    messageDiv.innerHTML = `
            <i class="fas ${iconClass}"></i>
            <span>${message}</span>
        `;

    // Add styles
    const bgColor =
      type === "success" ? "#4caf50" : type === "error" ? "#f44336" : "#2196f3";
    messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 5px 25px rgba(0,0,0,0.15);
            z-index: 2000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;

    // Add animation keyframes if not already present
    if (!document.querySelector("#messageAnimations")) {
      const style = document.createElement("style");
      style.id = "messageAnimations";
      style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOutRight {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
      document.head.appendChild(style);
    }

    document.body.appendChild(messageDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      messageDiv.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => {
        if (messageDiv.parentNode) {
          messageDiv.remove();
        }
      }, 300);
    }, 5000);

    // Allow manual close
    messageDiv.addEventListener("click", () => {
      messageDiv.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => {
        if (messageDiv.parentNode) {
          messageDiv.remove();
        }
      }, 300);
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(".method-card, .service-card, .credential, .stat")
    .forEach((el) => {
      observer.observe(el);
    });

  // Add scroll-triggered animations
  const style = document.createElement("style");
  style.textContent = `
        .method-card,
        .service-card,
        .credential,
        .stat {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .method-card.animate-in,
        .service-card.animate-in,
        .credential.animate-in,
        .stat.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .nav-menu {
            transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background-color: rgba(255, 255, 255, 0.98);
                width: 100%;
                text-align: center;
                transition: 0.3s;
                box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
                backdrop-filter: blur(10px);
                padding: 2rem 0;
                gap: 1rem;
            }

            .nav-menu.active {
                left: 0;
            }

            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }

            .hamburger.active span:nth-child(1) {
                transform: translateY(7px) rotate(45deg);
            }

            .hamburger.active span:nth-child(3) {
                transform: translateY(-7px) rotate(-45deg);
            }
        }
    `;
  document.head.appendChild(style);

  // Counter animation for stats
  function animateCounters() {
    const counters = document.querySelectorAll(".stat h4");

    counters.forEach((counter) => {
      const target = parseInt(counter.textContent.replace(/\D/g, ""));
      const suffix = counter.textContent.replace(/\d/g, "");
      let current = 0;
      const increment = target / 50;
      const duration = 2000;
      const stepTime = duration / 50;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current) + suffix;
      }, stepTime);
    });
  }

  // Trigger counter animation when stats section is visible
  const statsSection = document.querySelector(".experience-stats");
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    statsObserver.observe(statsSection);
  }

  // Add loading animation for images (excluding banners and profile photos)
  document
    .querySelectorAll("img:not(.nav-banner):not(.profile-photo)")
    .forEach((img) => {
      img.addEventListener("load", function () {
        this.style.opacity = "1";
      });

      img.style.opacity = "0";
      img.style.transition = "opacity 0.3s ease";
    });

  // Keyboard navigation support
  document.addEventListener("keydown", function (e) {
    // Close mobile menu with Escape key
    if (e.key === "Escape" && navMenu && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });

  // Add focus styles for better accessibility
  const focusStyle = document.createElement("style");
  focusStyle.textContent = `
        .nav-menu a:focus,
        .btn-primary:focus,
        .btn-secondary:focus,
        .submit-btn:focus {
            outline: 2px solid var(--secondary-color);
            outline-offset: 2px;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1);
        }
    `;
  document.head.appendChild(focusStyle);

  // Lazy loading for better performance (if images are added, excluding banners)
  if ("IntersectionObserver" in window) {
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    document
      .querySelectorAll("img[data-src]:not(.nav-banner)")
      .forEach((lazyImage) => {
        lazyImageObserver.observe(lazyImage);
      });
  }

  // Error handling for form validation
  // Form validation function removed - no longer needed without contact form

  console.log("🇩🇪 German Classes Website loaded successfully!");
});

// Service Worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("ServiceWorker registration successful");
      })
      .catch(function (error) {
        console.log("ServiceWorker registration failed");
      });
  });
}

// Add to home screen prompt (PWA)
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  deferredPrompt = e;
});

// Utility functions for future enhancements
const utils = {
  // Format phone numbers
  formatPhoneNumber: function (phone) {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
    if (match) {
      return match[1] + " " + match[2] + " " + match[3];
    }
    return phone;
  },

  // Debounce function for performance
  debounce: function (func, wait, immediate) {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  // Get user's preferred language
  getUserLanguage: function () {
    return navigator.language || navigator.userLanguage || "es";
  },
};

// Export utils for potential module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = utils;
}
