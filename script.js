"use strict";

document.addEventListener("DOMContentLoaded", () => {

    console.log("🌿 Hasta Jothi JavaScript loaded successfully!");


    /* =====================================================
       01. ELEMENTS
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");

    const header =
        document.querySelector("header");

    const bookingForm =
        document.querySelector(".booking-form");

    const themeToggle =
        document.querySelector(".theme-toggle");


    /* =====================================================
       02. MOBILE MENU
    ===================================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       03. SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetID =
                    link.getAttribute("href");

                if (!targetID || targetID === "#") {
                    return;
                }

                const target =
                    document.querySelector(targetID);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });


    /* =====================================================
       04. HEADER SCROLL
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 80) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       05. DARK / LIGHT MODE
    ===================================================== */

    if (themeToggle) {

        const savedTheme =
            localStorage.getItem("hastaJothiTheme");


        /* Load saved theme */

        if (savedTheme === "dark") {

            document.body.classList.add("dark-mode");

            themeToggle.textContent = "☀️";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            themeToggle.setAttribute(
                "aria-pressed",
                "true"
            );

        } else {

            document.body.classList.remove("dark-mode");

            themeToggle.textContent = "🌙";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "aria-pressed",
                "false"
            );

        }


        /* Toggle theme */

        themeToggle.addEventListener("click", () => {

            const isDark =
                document.body.classList.toggle("dark-mode");


            localStorage.setItem(
                "hastaJothiTheme",
                isDark ? "dark" : "light"
            );


            themeToggle.textContent =
                isDark ? "☀️" : "🌙";


            themeToggle.setAttribute(
                "aria-label",
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );


            themeToggle.setAttribute(
                "aria-pressed",
                String(isDark)
            );

        });

    }


    /* =====================================================
       06. PROGRAM SEARCH + CATEGORY FILTER
    ===================================================== */

    const programSearch =
        document.querySelector("#programSearch");

    const programCategory =
        document.querySelector("#programCategory");

    const programCards =
        document.querySelectorAll("#programs .card");

    const programResult =
        document.querySelector("#programResult");


    function filterPrograms() {

        if (!programSearch || !programCategory) {
            return;
        }


        const searchText =
            programSearch.value
                .trim()
                .toLowerCase();


        const selectedCategory =
            programCategory.value
                .toLowerCase();


        let visibleCount = 0;


        programCards.forEach(card => {

            const cardText =
                card.textContent.toLowerCase();


            const cardCategory =
                (
                    card.dataset.category || ""
                ).toLowerCase();


            const matchesSearch =
                cardText.includes(searchText);


            const matchesCategory =
                selectedCategory === "all" ||
                cardCategory === selectedCategory;


            if (
                matchesSearch &&
                matchesCategory
            ) {

                card.classList.remove(
                    "filter-hidden"
                );

                visibleCount++;

            } else {

                card.classList.add(
                    "filter-hidden"
                );

            }

        });


        if (programResult) {

            if (visibleCount === 0) {

                programResult.textContent =
                    "No programs found. Try another search.";

            } else {

                programResult.textContent =
                    `${visibleCount} program${
                        visibleCount !== 1
                            ? "s"
                            : ""
                    } found`;

            }

        }

    }


    if (programSearch) {

        programSearch.addEventListener(
            "input",
            filterPrograms
        );

    }


    if (programCategory) {

        programCategory.addEventListener(
            "change",
            filterPrograms
        );

    }


    filterPrograms();


    /* =====================================================
       07. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-title, " +
            ".about-image, " +
            ".about-content, " +
            ".card, " +
            ".benefit, " +
            ".testimonial, " +
            ".contact-box, " +
            ".gallery-grid figure"
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       08. FAQ ACCORDION
    ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-list details"
        );


    faqItems.forEach(item => {

        item.addEventListener("toggle", () => {

            if (!item.open) {
                return;
            }


            faqItems.forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.removeAttribute(
                        "open"
                    );

                }

            });

        });

    });


    /* =====================================================
       09. BACK TO TOP
    ===================================================== */

    const backToTop =
        document.createElement("button");


    backToTop.type = "button";

    backToTop.className =
        "back-to-top";

    backToTop.textContent = "↑";

    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );


    document.body.appendChild(
        backToTop
    );


    function updateBackToTop() {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );
/* =====================================================
   10. PROGRAM DETAILS MODAL
===================================================== */

const programModal =
    document.querySelector("#programModal");

const modalClose =
    document.querySelector("#modalClose");

const modalTitle =
    document.querySelector("#modalTitle");

const modalDescription =
    document.querySelector("#modalDescription");

const modalNumber =
    document.querySelector("#modalNumber");

const modalDuration =
    document.querySelector("#modalDuration");

const modalLevel =
    document.querySelector("#modalLevel");

const modalBook =
    document.querySelector(".modal-book");


const programDetails = {

    "Mindfulness Meditation": {
        number: "01",
        description:
            "A gentle mindfulness practice that helps you focus on the present moment through awareness of thoughts, breathing and surroundings.",
        duration: "45 Minutes",
        level: "Beginner"
    },

    "Breathing Meditation": {
        number: "02",
        description:
            "A calming practice based on conscious breathing to encourage relaxation, awareness and a peaceful state of mind.",
        duration: "30 Minutes",
        level: "Beginner"
    },

    "Morning Meditation": {
        number: "03",
        description:
            "Start your day with quiet breathing, awareness and mindful practice to create a calm and positive mindset.",
        duration: "30 Minutes",
        level: "Beginner"
    },

    "Stress Relief Meditation": {
        number: "04",
        description:
            "A guided relaxation practice using gentle breathing and mindful awareness to create a peaceful break from daily routines.",
        duration: "45 Minutes",
        level: "Beginner"
    },

    "Healing Sessions": {
        number: "05",
        description:
            "A guided wellness session designed to encourage relaxation, self-awareness and a deeper connection with yourself.",
        duration: "60 Minutes",
        level: "All Levels"
    },

    "Personal Wellness": {
        number: "06",
        description:
            "A personal wellness practice focusing on mindful living, breathing, relaxation and connection between mind and body.",
        duration: "60 Minutes",
        level: "All Levels"
    }

};


function openProgramModal(card) {

    if (!programModal) {
        return;
    }

    const titleElement =
        card.querySelector("h3");

    if (!titleElement) {
        return;
    }

    const title =
        titleElement.textContent.trim();

    const details =
        programDetails[title];

    if (!details) {
        return;
    }

    modalTitle.textContent = title;

    modalNumber.textContent =
        details.number;

    modalDescription.textContent =
        details.description;

    modalDuration.textContent =
        details.duration;

    modalLevel.textContent =
        details.level;

    programModal.classList.add("active");

    programModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

    if (modalClose) {
        modalClose.focus();
    }

}


function closeProgramModal() {

    if (!programModal) {
        return;
    }

    programModal.classList.remove("active");

    programModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


document
    .querySelectorAll("#programs .card-content a")
    .forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const card =
                    button.closest(".card");

                if (card) {
                    openProgramModal(card);
                }

            }
        );

    });


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProgramModal
    );

}


if (programModal) {

    programModal.addEventListener(
        "click",
        event => {

            if (
                event.target === programModal
            ) {

                closeProgramModal();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeProgramModal();

        }

    }
);


if (modalBook) {

    modalBook.addEventListener(
        "click",
        () => {

            closeProgramModal();

        }
    );

}

    /* =====================================================
       10. GALLERY LIGHTBOX
    ===================================================== */

    const galleryImages =
        document.querySelectorAll(
            ".gallery-grid img"
        );


    if (galleryImages.length > 0) {

        const lightbox =
            document.createElement("div");

        lightbox.className =
            "lightbox";


        lightbox.innerHTML = `
            <button
                type="button"
                class="lightbox-close"
                aria-label="Close image">
                &times;
            </button>

            <img
                class="lightbox-image"
                alt="">
        `;


        document.body.appendChild(
            lightbox
        );


        const lightboxImage =
            lightbox.querySelector(
                ".lightbox-image"
            );


        const closeButton =
            lightbox.querySelector(
                ".lightbox-close"
            );


        galleryImages.forEach(image => {

            image.style.cursor = "zoom-in";


            image.addEventListener(
                "click",
                () => {

                    lightboxImage.src =
                        image.src;

                    lightboxImage.alt =
                        image.alt;

                    lightbox.classList.add(
                        "active"
                    );

                    document.body.style.overflow =
                        "hidden";

                }
            );

        });


        function closeLightbox() {

            lightbox.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";

        }


        closeButton.addEventListener(
            "click",
            closeLightbox
        );


        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       11. BOOKING FORM
    ===================================================== */

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.querySelector("#name");

                const email =
                    document.querySelector("#email");

                const phone =
                    document.querySelector("#phone");

                const program =
                    document.querySelector("#program");


                let errors = [];


                if (
                    !name ||
                    name.value.trim().length < 2
                ) {

                    errors.push(
                        "Please enter your full name."
                    );

                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !email ||
                    !emailPattern.test(
                        email.value.trim()
                    )
                ) {

                    errors.push(
                        "Please enter a valid email address."
                    );

                }


                if (
                    phone &&
                    phone.value.trim()
                ) {

                    const phoneNumber =
                        phone.value.replace(
                            /\D/g,
                            ""
                        );


                    if (
                        phoneNumber.length < 10
                    ) {

                        errors.push(
                            "Please enter a valid phone number."
                        );

                    }

                }


                if (
                    !program ||
                    !program.value
                ) {

                    errors.push(
                        "Please select a program."
                    );

                }


                if (errors.length > 0) {

                    alert(
                        errors.join("\n")
                    );

                    return;

                }


                alert(
                    "Thank you! Your booking request has been received."
                );


                bookingForm.reset();

            }
        );

    }


    /* =====================================================
       12. ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navLinks &&
                menuToggle
            ) {

                navLinks.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


});