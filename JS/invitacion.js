    // Format of the telephone number
    document.addEventListener('DOMContentLoaded', function() {
        // Get both input elements by their IDs
        const phoneInputs = document.querySelectorAll('#invTel, #plusTel');

        // Iterate through each phone input element and add an event listener
        phoneInputs.forEach(function(phoneInput) {
            phoneInput.addEventListener('input', function(event) {
                let input = phoneInput.value.replace(/\D/g, ''); // Remove non-numeric characters
                if (input.length > 6) {
                    phoneInput.value = `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 9)}`;
                } else if (input.length > 3) {
                    phoneInput.value = `${input.slice(0, 3)}-${input.slice(3, 6)}`;
                } else {
                    phoneInput.value = input;
                }
            });
        });
    });



// DNI
document.addEventListener('DOMContentLoaded', function() {
    const dniInput = document.getElementById('invDNI');

    // Function to format the DNI/NIE input
    function formatDNI(value) {
        // Remove all non-numeric and non-letter characters
        value = value.replace(/[^0-9A-Z]/g, '');

        // Split the input into numbers and letter
        const numbers = value.slice(0, 8);
        const letter = value.slice(8, 9).toUpperCase(); // Ensure the letter is uppercase

        // Construct the formatted value
        let formattedValue = numbers;
        if (numbers.length === 8) {
            formattedValue += '-' + letter;
        }

        return formattedValue;
    }

    // Handle input event
    dniInput.addEventListener('input', function(event) {
        let inputValue = dniInput.value;
        
        // Format the value according to the rules
        dniInput.value = formatDNI(inputValue);
    });

    // Handle paste event to ensure correct formatting
    dniInput.addEventListener('paste', function(event) {
        setTimeout(function() {
            let inputValue = dniInput.value;
            dniInput.value = formatDNI(inputValue);
        }, 0);
    });

    // Handle keydown event to restrict input to digits and letters
    dniInput.addEventListener('keydown', function(event) {
        // Allow navigation keys and basic editing keys
        const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'];
        if (allowedKeys.indexOf(event.key) > -1 ||
            (event.key >= '0' && event.key <= '9') ||
            (event.key >= 'A' && event.key <= 'Z')) {
            return;
        } else {
            event.preventDefault();
        }
    });

    // Handle keyup event to ensure the correct character limit
    dniInput.addEventListener('keyup', function(event) {
        const value = dniInput.value;
        if (value.length > 10) {
            dniInput.value = value.slice(0, 10); // Limit input to 10 characters (8 digits + 1 hyphen + 1 letter)
        }
    });
});







// food text field greyed out - INVITADO
    document.addEventListener('DOMContentLoaded', function() {
        // Get the checkbox and text input elements
        const otrosCheckbox1 = document.getElementById('otrosInv');
        const allergiesInput1 = document.getElementById('allergiesInv');

        // Check if the elements exist before adding the event listener
        if (otrosCheckbox1 && allergiesInput1) {
            // Add an event listener to toggle the text input's disabled state
            otrosCheckbox1.addEventListener('change', function() {
                if (otrosCheckbox1.checked) {
                    allergiesInput1.disabled = false;
                } else {
                    allergiesInput1.disabled = true;
                }
            });
        }
    });


// food text field greyed out - PLUS
    document.addEventListener('DOMContentLoaded', function() {
        // Get the checkbox and text input elements
        const otrosCheckbox2 = document.getElementById('otrosPlus');
        const allergiesInput2 = document.getElementById('allergiesPlus');

        // Check if the elements exist before adding the event listener
        if (otrosCheckbox2 && allergiesInput2) {
            // Add an event listener to toggle the text input's disabled state
            otrosCheckbox2.addEventListener('change', function() {
                if (otrosCheckbox2.checked) {
                    allergiesInput2.disabled = false;
                } else {
                    allergiesInput2.disabled = true;
                }
            });
        }
    });