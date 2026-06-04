document.addEventListener('DOMContentLoaded', () => {

    emailjs.init('vVVghaHe4N74sUCBO');

    const form = document.getElementById('weddingForm');
    const modal = document.getElementById('successModal');
    const closeBtn = document.getElementById('closeModal');
    const plusForm = document.getElementById('plus');
    const plusButton = document.getElementById('plusButton');

    const phoneInputs = document.querySelectorAll('#invTel, #plusTel');

    phoneInputs.forEach(input => {
        input.addEventListener('input', () => {
            let value = input.value.replace(/\D/g, '');

            if (value.length > 6) {
                input.value = `${value.slice(0,3)}-${value.slice(3,6)}-${value.slice(6,9)}`;
            } else if (value.length > 3) {
                input.value = `${value.slice(0,3)}-${value.slice(3,6)}`;
            } else {
                input.value = value;
            }
        });
    });

    const dniInputs = document.querySelectorAll('#invDNI, #plusDNI');

dniInputs.forEach(input => {

    const format = (value) => {

        value = value.toUpperCase().replace(/[^0-9A-Z]/g, '');

        const numbers = value.slice(0, 8).replace(/\D/g, '');
        const letter = value.slice(8, 9).replace(/[^A-Z]/g, '');

        return letter ? `${numbers}-${letter}` : numbers;
    };

    input.addEventListener('input', () => {
        input.value = format(input.value);
    });

    input.addEventListener('paste', () => {
        setTimeout(() => {
            input.value = format(input.value);
        }, 0);
    });

});

    const toggleInput = (checkboxId, inputId) => {
        const checkbox = document.getElementById(checkboxId);
        const input = document.getElementById(inputId);

        if (!checkbox || !input) return;

        input.disabled = true;

        checkbox.addEventListener('change', () => {
            input.disabled = !checkbox.checked;

            if (!checkbox.checked) {
                input.value = '';
            }
        });
    };

    toggleInput('otrosInv', 'allergiesInv');
    toggleInput('otrosPlus', 'allergiesPlus');

    if (plusButton && plusForm) {

        plusForm.hidden = true;

        plusButton.addEventListener('change', () => {
            plusForm.hidden = !plusButton.checked;

            if (!plusButton.checked) {

                plusForm.querySelectorAll('input').forEach(input => {

                    if (input.type === 'text' || input.type === 'email' || input.type === 'tel') {
                        input.value = '';
                    }

                    if (input.type === 'checkbox' || input.type === 'radio') {
                        input.checked = false;
                    }

                });

                const allergiesPlus = document.getElementById('allergiesPlus');
                if (allergiesPlus) allergiesPlus.disabled = true;
            }
        });

    }

    const redirect = () => {
        window.location.href = "main.html";
    };

    if (modal && closeBtn) {

        closeBtn.addEventListener('click', redirect);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) redirect();
        });

    }

    if (form) {

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            emailjs.sendForm('service_wobzoth', 'template_w1chqd3', form)
                .then(() => {

                    form.reset();

                    if (plusForm) plusForm.hidden = true;

                    if (modal) {
                        modal.classList.remove('hidden');
                    }

                })
                .catch(err => {
                    console.log(err);
                });

        });

    }

});