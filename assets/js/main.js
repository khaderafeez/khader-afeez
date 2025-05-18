/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close")

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
    document.body.style.overflow = "hidden" // Prevent scrolling when menu is open
  })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
    document.body.style.overflow = "" // Re-enable scrolling
  })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link")

function linkAction() {
  const navMenu = document.getElementById("nav-menu")
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu")
  document.body.style.overflow = "" // Re-enable scrolling
}
navLink.forEach((n) => n.addEventListener("click", linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50
    const sectionId = current.getAttribute("id")
    const navLink = document.querySelector(`.nav__link[href*=${sectionId}]`)

    if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink.classList.add("active-link")
    } else if (navLink) {
      navLink.classList.remove("active-link")
    }
  })
}
window.addEventListener("scroll", scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header")
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) {
    nav.classList.add("scroll-header")
  } else {
    nav.classList.remove("scroll-header")
  }
}
window.addEventListener("scroll", scrollHeader)

/*==================== SHOW SCROLL UP ====================*/
const scrollUp = document.getElementById("scroll-up");

// Add click handler for smooth scrolling
scrollUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Existing scroll visibility logic
window.addEventListener("scroll", () => {
    if (window.scrollY >= 560) {
        scrollUp.classList.add("show-scroll");
    } else {
        scrollUp.classList.remove("show-scroll");
    }
});

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button")
const darkTheme = "dark-theme"
const iconTheme = "uil-sun"

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme")
const selectedIcon = localStorage.getItem("selected-icon")

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => (document.body.classList.contains(darkTheme) ? "dark" : "light")
const getCurrentIcon = () => (themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun")

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme)
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme with animation
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)

  // Add transition effect to the body
  document.body.style.transition = "background-color 0.5s ease, color 0.5s ease"

  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme())
  localStorage.setItem("selected-icon", getCurrentIcon())
})

// Add code to hide navbar on scroll down and show on scroll up
let lastScrollTop = 0

window.addEventListener(
  "scroll",
  () => {
    const header = document.getElementById("header")
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop

    // Only apply this behavior on mobile
    if (window.innerWidth <= 767) {
      if (currentScroll > lastScrollTop && currentScroll > 100) {
        // Scrolling down
        header.classList.add("hide-header")
      } else {
        // Scrolling up
        header.classList.remove("hide-header")
      }
    } else {
      header.classList.remove("hide-header")
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll
  },
  false,
)

/*==================== PORTFOLIO SWIPER  ====================*/
document.addEventListener("DOMContentLoaded", () => {
  // Import Swiper
  const Swiper = window.Swiper

  // Initialize all Swiper instances
  const swiperPortfolio = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    keyboard: {
      enabled: true,
    },
    a11y: {
      prevSlideMessage: "Previous slide",
      nextSlideMessage: "Next slide",
    },
    breakpoints: {
      568: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
    },
  })

  // Import Typed.js
  const Typed = window.Typed

  // Initialize Typed.js
  const typed = new Typed(".auto-input", {
    strings: ["Embedded Engineer", "PCB Designer", "Electronics Student", "UI Designer"],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true,
    backDelay: 1500,
    cursorChar: "|",
  })

  // Import AOS (Animate on Scroll)
  const AOS = window.AOS

  // Initialize AOS (Animate on Scroll)
  AOS.init({
    offset: 100,
    duration: 800,
    easing: "ease-in-out",
    once: false,
    mirror: false,
    disable: "mobile",
  })

  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerOffset = 80
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Add focus trap for accessibility in mobile menu
  const focusableElements = navMenu.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  )
  const firstFocusableElement = focusableElements[0]
  const lastFocusableElement = focusableElements[focusableElements.length - 1]

  navMenu.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus()
          e.preventDefault()
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus()
          e.preventDefault()
        }
      }
    }

    if (e.key === "Escape") {
      linkAction()
    }
  })

  // Add intersection observer for lazy loading and animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  document.querySelectorAll(".skills__card, .education__content, .experience__content").forEach((item) => {
    observer.observe(item)
  })

  // Form validation
  const contactForm = document.querySelector(".contact__form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      let isValid = true
      const inputs = this.querySelectorAll("input, textarea")

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          input.classList.add("error")

          // Add error message if it doesn't exist
          let errorMsg = input.parentElement.querySelector(".error-message")
          if (!errorMsg) {
            errorMsg = document.createElement("span")
            errorMsg.className = "error-message"
            errorMsg.style.color = "var(--error-color)"
            errorMsg.style.fontSize = "var(--smaller-font-size)"
            errorMsg.textContent = "This field is required"
            input.parentElement.appendChild(errorMsg)
          }
        } else {
          input.classList.remove("error")
          const errorMsg = input.parentElement.querySelector(".error-message")
          if (errorMsg) {
            errorMsg.remove()
          }
        }
      })

      if (!isValid) {
        e.preventDefault()
      }
    })

    // Remove error styling on input
    contactForm.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", function () {
        this.classList.remove("error")
        const errorMsg = this.parentElement.querySelector(".error-message")
        if (errorMsg) {
          errorMsg.remove()
        }
      })
    })
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    const navMenu = document.getElementById("nav-menu")
    const navToggle = document.getElementById("nav-toggle")

    if (navMenu.classList.contains("show-menu") && !navMenu.contains(e.target) && e.target !== navToggle) {
      navMenu.classList.remove("show-menu")
      document.body.style.overflow = ""
    }
  })

  // Improve touch events for mobile
  const touchElements = document.querySelectorAll(".skills__card, .button, .nav__link")

  touchElements.forEach((element) => {
    element.addEventListener(
      "touchstart",
      function () {
        this.classList.add("touch-active")
      },
      { passive: true },
    )

    element.addEventListener(
      "touchend",
      function () {
        this.classList.remove("touch-active")
      },
      { passive: true },
    )
  })

  // Add better responsive handling
  function handleResponsiveLayout() {
    const isMobile = window.innerWidth <= 767
    const isTablet = window.innerWidth > 767 && window.innerWidth <= 1023

    // Adjust AOS animations based on device
    if (typeof window.AOS !== "undefined") {
      if (isMobile) {
        // Simpler animations for mobile
        document.querySelectorAll("[data-aos]").forEach((el) => {
          el.setAttribute("data-aos-duration", "600")
          if (el.getAttribute("data-aos-delay")) {
            el.setAttribute("data-aos-delay", "50")
          }
        })
      }

      window.AOS.refresh()
    }

    // Adjust Swiper for different screen sizes
    if (typeof window.Swiper !== "undefined") {
      // The Swiper instances will use the breakpoints we defined
    }
  }

  // Run on load and resize
  handleResponsiveLayout()
  window.addEventListener("resize", handleResponsiveLayout)
})

// Add resize event listener to handle responsive behavior
window.addEventListener("resize", () => {
  // Adjust any elements that need responsive handling
  if (window.innerWidth >= 768) {
    // Reset mobile menu state when resizing to desktop
    const navMenu = document.getElementById("nav-menu")
    if (navMenu.classList.contains("show-menu")) {
      navMenu.classList.remove("show-menu")
      document.body.style.overflow = ""
    }
  }
})

// Add page load complete event
window.addEventListener("load", () => {
  // Hide page loader if exists
  const loader = document.querySelector(".page-loader")
  if (loader) {
    loader.style.opacity = "0"
    setTimeout(() => {
      loader.style.display = "none"
    }, 500)
  }

  // Trigger AOS refresh for better animation timing
  if (typeof window.AOS !== "undefined") {
    window.AOS.refresh()
  }
})
