// Boutique product data used by the product detail modal.
document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js-enabled");

const userAgent = window.navigator.userAgent;
const isIOSDevice = /iP(ad|hone|od)/.test(userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isSafariBrowser = /Safari/.test(userAgent) && !/Chrome|CriOS|EdgiOS|FxiOS/.test(userAgent);
const shouldUseIOSHeroFallback = isIOSDevice && isSafariBrowser;

if (shouldUseIOSHeroFallback) {
    document.documentElement.classList.add("ios-safari");
}

const productDetails = [
    {
        tag: "Featured Set",
        title: "Rose Drape Set",
        price: "From INR 4,800",
        description:
            "A romantic layered set with a soft blush tone, fluid drape, and occasion-ready polish for intimate celebrations.",
        points: [
            "Lightweight fabric with graceful movement",
            "Ideal for festive dinners and curated day events",
            "Pairs well with minimal gold accessories"
        ]
    },
    {
        tag: "Boutique Dress",
        title: "Ivory Muse Dress",
        price: "From INR 5,200",
        description:
            "An understated dress with clean lines and a calm palette designed for elegant daytime dressing.",
        points: [
            "Minimal silhouette with soft tailoring",
            "Comfort-focused fit with elevated detailing",
            "Designed for warm, refined styling"
        ]
    },
    {
        tag: "Modern Co-ord",
        title: "Sand Tailored Co-ord",
        price: "From INR 4,400",
        description:
            "A structured yet relaxed co-ord that brings boutique polish into everyday wear.",
        points: [
            "Sharp shape with easy comfort",
            "Works for styling up or down",
            "Designed in a soft neutral tone"
        ]
    },
    {
        tag: "Evening Edit",
        title: "Noir Evening Layer",
        price: "From INR 5,750",
        description:
            "A darker statement piece with elegant flow, suited to evening styling and elevated occasion wear.",
        points: [
            "Dramatic drape with controlled structure",
            "Premium feel without heavy ornamentation",
            "Made for modern event styling"
        ]
    },
    {
        tag: "Festive Highlight",
        title: "Pearl Festive Kurta",
        price: "From INR 4,100",
        description:
            "A festive boutique piece in pearl tones, designed for light celebrations and graceful dressing.",
        points: [
            "Subtle shine with a soft neutral finish",
            "Easy silhouette for long wear",
            "Styled for family gatherings and festive lunches"
        ]
    },
    {
        tag: "Weekend Capsule",
        title: "Sage Weekend Edit",
        price: "From INR 3,900",
        description:
            "A calm, modern set designed for brunch plans, relaxed evenings, and easy boutique styling.",
        points: [
            "Fresh color story with a clean finish",
            "Relaxed fit with a polished look",
            "Simple to style with flats or heels"
        ]
    }
];

const siteHeader = document.querySelector(".site-header");
const productCards = document.querySelectorAll(".product-card");
const modal = document.getElementById("product-modal");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalClose = document.getElementById("modal-close");
const modalTag = document.getElementById("modal-tag");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const modalDescription = document.getElementById("modal-description");
const modalPoints = document.getElementById("modal-points");
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const heroVisual = document.getElementById("hero-visual");
const heroShell = document.querySelector(".sculpture-shell");

function openProductModal(index) {
    const product = productDetails[index];
    if (!product || !modal || !modalTag || !modalTitle || !modalPrice || !modalDescription || !modalPoints) {
        return;
    }

    modalTag.textContent = product.tag;
    modalTitle.textContent = product.title;
    modalPrice.textContent = product.price;
    modalDescription.textContent = product.description;
    modalPoints.innerHTML = "";

    product.points.forEach((point) => {
        const listItem = document.createElement("li");
        listItem.textContent = point;
        modalPoints.appendChild(listItem);
    });

    modal.hidden = false;
    document.body.style.overflow = "hidden";
}

function closeProductModal() {
    if (!modal) {
        return;
    }

    modal.hidden = true;
    document.body.style.overflow = "";
}

productCards.forEach((card) => {
    card.addEventListener("click", () => {
        openProductModal(Number(card.dataset.productIndex));
    });
});

if (modalClose && modalBackdrop) {
    modalClose.addEventListener("click", closeProductModal);
    modalBackdrop.addEventListener("click", closeProductModal);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.hidden) {
        closeProductModal();
    }
});

function syncHeaderState() {
    if (!siteHeader) {
        return;
    }

    siteHeader.classList.toggle("is-scrolled", window.scrollY > 18);
}

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

if (contactForm && formMessage) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = String(formData.get("name") || "there").trim();
        formMessage.textContent = `Thanks ${name}. Your enquiry is ready to be connected to a real email or backend service.`;
        contactForm.reset();
    });
}

if (menuToggle && navLinks) {
    function closeMenu() {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Node)) {
            return;
        }

        if (!navLinks.classList.contains("is-open")) {
            return;
        }

        if (navLinks.contains(target) || menuToggle.contains(target)) {
            return;
        }

        closeMenu();
    });

    window.addEventListener("scroll", () => {
        if (navLinks.classList.contains("is-open")) {
            closeMenu();
        }
    }, { passive: true });
}

function setHeroRotation(rotateX, rotateY, shiftY = 0) {
    if (!heroShell) {
        return;
    }

    heroShell.style.setProperty("--hero-rotate-x", `${rotateX}deg`);
    heroShell.style.setProperty("--hero-rotate-y", `${rotateY}deg`);
    heroShell.style.setProperty("--hero-shift-y", `${shiftY}px`);
}

function attachDesktopHeroMotion() {
    if (!heroVisual || !heroShell || window.matchMedia("(max-width: 768px)").matches) {
        return;
    }

    heroVisual.addEventListener("pointermove", (event) => {
        const bounds = heroVisual.getBoundingClientRect();
        const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
        const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
        const rotateY = offsetX * 10;
        const rotateX = offsetY * -8;
        setHeroRotation(rotateX, rotateY);
    });

    heroVisual.addEventListener("pointerleave", () => {
        setHeroRotation(0, 0, 0);
    });
}

function attachIOSHeroMotion() {
    if (!shouldUseIOSHeroFallback || !heroShell) {
        return;
    }

    setHeroRotation(-3, 4, 0);

    let currentStep = 0;
    const motionFrames = [
        { x: -4, y: 5, shift: 0 },
        { x: -2, y: 2, shift: -4 },
        { x: -5, y: -3, shift: -2 },
        { x: -3, y: 4, shift: 0 }
    ];

    window.setInterval(() => {
        const frame = motionFrames[currentStep];
        setHeroRotation(frame.x, frame.y, frame.shift);
        currentStep = (currentStep + 1) % motionFrames.length;
    }, 2400);
}

attachDesktopHeroMotion();
attachIOSHeroMotion();
