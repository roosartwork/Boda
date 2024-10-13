document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("menu").innerHTML = data;

            const header = document.getElementById('header');
            const logo = document.getElementById('logo');
            const banner = document.querySelector('#banner');

            if (!header || !logo) return;

            const originalSrc = '../logo/logoTight.png';
            const stickySrc = '../logo/logoSimplified.png';

            // Add sticky class when scrolled past header
            function updateHeader() {
                if (window.scrollY > header.offsetHeight) {
                    header.classList.add('sticky');
                    logo.src = stickySrc;
                } else {
                    header.classList.remove('sticky');
                    logo.src = originalSrc;
                }
            }

            window.addEventListener('scroll', updateHeader);
            window.addEventListener('resize', updateHeader); // Recalculate on resize

            // Initial setup
            updateHeader();
        })
        .catch(error => console.error('Error loading header:', error));
});
