document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("menu").innerHTML = data;

            const header = document.getElementById('header');
            const logo = document.getElementById('logo');

            if (!header || !logo) return;

            const originalSrc = '/logo/logoTight.png';
            const stickySrc = '/logo/logoSimplified.png';

            let originalTopOffset = header.getBoundingClientRect().top + window.scrollY; // Calculate original offset from the top

            // Function to update the header and logo on scroll
            function updateHeader() {
                const currentScrollPosition = window.scrollY;
                if (currentScrollPosition > originalTopOffset) {
                    header.classList.add('sticky');
                    logo.src = stickySrc;
                } else {
                    header.classList.remove('sticky');
                    logo.src = originalSrc;
                }
            }

            // Listen for scroll and resize events
            window.addEventListener('scroll', updateHeader);
            window.addEventListener('resize', () => {
                // Recalculate original top offset on resize
                originalTopOffset = header.getBoundingClientRect().top + window.scrollY;
                updateHeader(); // Update header position and logo based on new offset
            });

            // Initial setup
            updateHeader();
        })
        .catch(error => console.error('Error loading header:', error));

    // Make .yt-container sticky with JavaScript
    function makeYtContainersSticky() {
        const ytContainers = document.querySelectorAll('.yt-container');

        ytContainers.forEach(container => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        container.classList.add('sticky');
                    } else {
                        container.classList.remove('sticky');
                    }
                });
            }, { threshold: [1] });

            observer.observe(container);
        });
    }

    makeYtContainersSticky();
});
