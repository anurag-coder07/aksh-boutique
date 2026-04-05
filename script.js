// Boutique product data used by the product detail modal.
document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js-enabled");

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
const revealElements = document.querySelectorAll(".reveal");
const productCards = document.querySelectorAll(".product-card");
const heroVisual = document.getElementById("hero-visual");
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
const compactScreen = window.matchMedia("(max-width: 768px)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const premiumMotionAllowed = finePointer.matches && !compactScreen.matches && !reducedMotion.matches;

function showAllRevealElements() {
    revealElements.forEach((element) => element.classList.add("is-visible"));
}

revealElements.forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${Math.min(index * 70, 320)}ms`);
});

// Reveal content safely so mobile browsers never get stuck with hidden sections.
if (!("IntersectionObserver" in window) || compactScreen.matches || reducedMotion.matches) {
    showAllRevealElements();
} else {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18 }
    );

    revealElements.forEach((element) => observer.observe(element));
    window.setTimeout(showAllRevealElements, 1600);
}

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

// Only enable the 3D hover effect on devices that can handle it comfortably.
if (heroVisual && premiumMotionAllowed) {
    heroVisual.addEventListener("mousemove", (event) => {
        const bounds = heroVisual.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        heroVisual.style.setProperty("--hero-rotate-y", `${x * 14}deg`);
        heroVisual.style.setProperty("--hero-rotate-x", `${y * -12}deg`);
    });

    heroVisual.addEventListener("mouseleave", () => {
        heroVisual.style.setProperty("--hero-rotate-y", "0deg");
        heroVisual.style.setProperty("--hero-rotate-x", "0deg");
    });
} else if (heroVisual) {
    heroVisual.style.setProperty("--hero-rotate-y", "0deg");
    heroVisual.style.setProperty("--hero-rotate-x", "0deg");
}

if (premiumMotionAllowed) {
    productCards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const bounds = card.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;

            card.style.transform = `translateY(-8px) rotateX(${y * -4}deg) rotateY(${x * 5}deg)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}

function syncHeaderState() {
    if (!siteHeader) {
        return;
    }

    siteHeader.classList.toggle("is-scrolled", window.scrollY > 18);
}

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

// Lightweight contact form feedback for local demos.
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
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("is-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}
