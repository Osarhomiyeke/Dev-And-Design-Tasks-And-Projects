const form = document.getElementById('signup-form');
const fullnameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

// Helper function to show error
function showError(input, message) {
    const inputGroup = input.parentElement;
    let errorDisplay = inputGroup.querySelector('.error-message');
    
    // If error display doesn't exist, create it (safety check, though HTML has it)
    if (!errorDisplay) {
        errorDisplay = document.createElement('span');
        errorDisplay.className = 'error-message';
        inputGroup.appendChild(errorDisplay);
    }
    
    input.classList.add('error');
    input.classList.remove('success');
    errorDisplay.innerText = message;
    errorDisplay.style.opacity = '1';
}

// Helper function to show success
function showSuccess(input) {
    const inputGroup = input.parentElement;
    const errorDisplay = inputGroup.querySelector('.error-message');
    
    input.classList.remove('error');
    input.classList.add('success');
    if (errorDisplay) {
        errorDisplay.innerText = '';
        errorDisplay.style.opacity = '0';
    }
}

// Check required fields
function checkRequired(inputArr) {
    let isValid = true;
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isValid = false;
        } else {
            showSuccess(input);
        }
    });
    return isValid;
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
        return true;
    } else {
        showError(input, 'Email is not valid');
        return false;
    }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value === '' || input2.value === '') {
        // Handled by checkRequired
        return false; 
    }
    
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
        return false;
    } else {
        showSuccess(input2);
        return true;
    }
}

// Get field name
function getFieldName(input) {
    const label = input.previousElementSibling;
    return label ? label.innerText : input.id;
}

// Event listener
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const isRequiredValid = checkRequired([fullnameInput, emailInput, passwordInput, confirmPasswordInput]);
    const isEmailValid = checkEmail(emailInput);
    const isPasswordMatch = checkPasswordsMatch(passwordInput, confirmPasswordInput);
    
    let isPasswordLengthValid = true;
    if (passwordInput.value.length < 8 && passwordInput.value.trim() !== '') {
        showError(passwordInput, 'Password must be at least 8 characters');
        isPasswordLengthValid = false;
    }

    if (isRequiredValid && isEmailValid && isPasswordMatch && isPasswordLengthValid) {
        // Success
        console.log('Form Submitted Successfully');
        // Simple visual feedback
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.innerText;
        btn.innerText = 'Success!';
        btn.style.backgroundColor = '#388e3c';
        
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = '';
            form.reset();
            [fullnameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
                input.classList.remove('success');
            });
        }, 3000);
    }
});
