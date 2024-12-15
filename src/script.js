// Fungsi debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Intersection Observer untuk lazy loading dan animasi
const observerOptions = {
  root: null,
  rootMargin: "50px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible", "show");
      if (entry.target.tagName === "IMG" && entry.target.dataset.src) {
        entry.target.src = entry.target.dataset.src;
      }
      observer.unobserve(entry.target);
    } else {
      entry.target.classList.remove("show");
    }
  });
}, observerOptions);

const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  const menuItems = mobileMenu.querySelectorAll("a");
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

function openGallery(id) {
  console.log("Opening gallery:", id); // Debugging
  const modal = document.getElementById(`galleryModal${id}`);
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  } else {
    console.error("Gallery modal not found:", id);
  }
}

function closeGallery(id) {
  const modal = document.getElementById(`galleryModal${id}`);
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Shooting star animation
function createShootingStar() {
  const nightSky = document.querySelector(".night-sky");
  if (nightSky) {
    const shootingStar = document.createElement("div");
    shootingStar.classList.add("shooting-star");
    shootingStar.style.top = `${Math.random() * 50}%`;
    shootingStar.style.left = `${Math.random() * 80}%`;
    nightSky.appendChild(shootingStar);
    shootingStar.addEventListener("animationend", () => {
      shootingStar.remove();
    });
  }
}

// Blog post rotation
function setupBlogPostRotation() {
  const posts = document.querySelectorAll(".blog-post");
  if (posts.length > 0) {
    let currentIndex = 0;
    function showNextPost() {
      posts[currentIndex].classList.remove("opacity-100");
      posts[currentIndex].classList.add("opacity-0");
      currentIndex = (currentIndex + 1) % posts.length;
      posts[currentIndex].classList.remove("opacity-0");
      posts[currentIndex].classList.add("opacity-100");
    }
    posts[currentIndex].classList.add("opacity-100");
    setInterval(showNextPost, 3000);
  }
}

// Main initialization function
function initializeWebsite() {
  // Observe elements for animations and lazy loading
  document
    .querySelectorAll(".hidden, .skill-card, img[data-src]")
    .forEach((el) => observer.observe(el));

  // Setup gallery modals
  document.querySelectorAll('[id^="galleryModal"]').forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        closeGallery(this.id.replace("galleryModal", ""));
      }
    });
  });

  // Start shooting star animation
  setInterval(createShootingStar, 3000);

  // Setup blog post rotation
  setupBlogPostRotation();

  // Efficient scroll and resize handling
  const scrollHandler = debounce(() => {
    // Your scroll logic here
  }, 16);

  const resizeHandler = debounce(() => {
    // Your resize logic here
  }, 250);

  window.addEventListener("scroll", scrollHandler);
  window.addEventListener("resize", resizeHandler);

  // Service Worker registration
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => console.log("ServiceWorker registered"))
      .catch((error) =>
        console.log("ServiceWorker registration failed:", error)
      );
  }
}

// Run initialization when DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeWebsite);

// Fungsi untuk menghandle animasi scroll
function handleScrollAnimations() {
  const animatedElements = document.querySelectorAll(".fade-in, section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Hentikan observasi setelah animasi
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px",
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// Panggil fungsi ini di dalam initializeWebsite()
function initializeWebsite() {
  // ... kode lainnya ...

  handleScrollAnimations();
}

function typeText() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex);
    charIndex--;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 30 : 50;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 1500; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500; // Pause before starting new text
  }

  setTimeout(typeText, typeSpeed);
}

document.addEventListener("DOMContentLoaded", function () {
  const projectLinks = document.querySelectorAll("#projects a");
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImages = document.getElementById("modalImages");
  const closeModal = document.getElementById("closeModal");

  // Data proyek (dalam praktiknya, ini bisa berasal dari database atau API)
  const projectData = {
    "Website Sekolah": [
      "/img/web sekolah.png",
      "/img/web sekolah1.png",
      "/img/web sekolah2.png",
      "/img/web sekolah3.png",
      "/img/web sekolah4.png",
      "/img/web sekolah5.png",
    ],
    "Personal Portfolio": [
      "/img//per1.png",
      "/img//per2.png",
      "/img//per3.png",
      "/img//per4.png",
    ],
    "Klinik Design": [
      "/img/fig1.png",
      "/img/fig3.png",
      "/img/fig4.png",
      "/img/fig2.png",
    ],
  };

  projectLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const projectName = this.closest("div").querySelector("h3").textContent;
      showProjectDetails(projectName);
    });
  });

  function showProjectDetails(projectName) {
    modalTitle.textContent = projectName;
    modalImages.innerHTML = ""; // Clear previous images

    const images = projectData[projectName];
    images.forEach((imageSrc) => {
      const img = document.createElement("img");
      img.src = imageSrc;
      img.alt = projectName;
      img.className = "w-full h-48 object-cover rounded";
      modalImages.appendChild(img);
    });

    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }

  closeModal.addEventListener("click", function () {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  });
});
