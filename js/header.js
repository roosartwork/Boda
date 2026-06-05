console.log("JavaScript loaded");

document.addEventListener("DOMContentLoaded", function () {

    fetch("/header.html")
        .then(response => response.text())
        .then(data => {

            document.getElementById("menu").innerHTML = data;

            // Elements loaded from header.html
            const header = document.getElementById("header");
            const logo = document.getElementById("logo");
            const banner = document.getElementById("banner");
            const overlay = document.getElementById("overlay");
            const hamburger = document.getElementById("hamburger");
            const navLinks = document.getElementById("nav-links");

            if (!header || !logo || !banner) return;

            const originalSrc = "/logo/logoTight.png";
            const stickySrc = "/logo/logoSimplified.png";

            // Sticky header + logo swap
            function updateHeader() {

                if (window.scrollY > banner.offsetHeight) {
                    header.classList.add("sticky");
                    logo.src = stickySrc;
                } else {
                    header.classList.remove("sticky");
                    logo.src = originalSrc;
                }

                if (window.innerWidth <= 1090) {
                    logo.src = stickySrc;
                } else {
                    logo.src = originalSrc;
                }
            }

            // Initial setup
            updateHeader();

            // Events
            window.addEventListener("scroll", updateHeader);
            window.addEventListener("resize", updateHeader);
            

            // Hamburger menu
            if (hamburger && navLinks) {

                hamburger.addEventListener("click", () => {
                navLinks.classList.toggle("active");
                hamburger.classList.toggle("active");

                if (overlay) {
                    overlay.classList.toggle("active");
                    }
                });
            }

        })

        .catch(error => console.error("Error loading header:", error));

});
