// Generate a random OTP of 4 digits
function generateOTP() {
    const otp = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP
    console.log("Generated OTP: " + otp); // For testing purposes
    return otp;
}

// Set OTP on page load
let otp = generateOTP();

// Store OTP in local storage (for simplicity)
localStorage.setItem('otp', otp);

// Get all input fields and verify button
const otpFields = document.querySelectorAll('.otp-field');
const verifyButton = document.getElementById('verify-btn');
const resendButton = document.getElementById('resend-otp');

// Function to check if all OTP fields are filled
function checkOtpCompletion() {
    const allFilled = Array.from(otpFields).every(field => field.value.length === 1);
    verifyButton.disabled = !allFilled;
}

// Automatically focus on the next input when a user types
otpFields.forEach((field, index) => {
    field.addEventListener('input', () => {
        if (field.value.length === 1 && index < otpFields.length - 1) {
            otpFields[index + 1].focus();
        }
        checkOtpCompletion();
    });

    // Allow focusing on the previous input if backspace is pressed
    field.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && index > 0 && field.value === '') {
            otpFields[index - 1].focus();
        }
    });
});

// Function to verify the OTP entered by the user
function verifyOtp() {
    const enteredOtp = Array.from(otpFields).map(field => field.value).join('');
    if (enteredOtp === localStorage.getItem('otp')) {
        alert("OTP verified successfully!");
    } else {
        alert("Invalid OTP. Please try again.");
    }
}

// Add event listener to verify button
verifyButton.addEventListener('click', verifyOtp);

// Function to handle OTP resend
resendButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    otp = generateOTP(); // Generate new OTP
    localStorage.setItem('otp', otp); // Store the new OTP
    alert("A new OTP has been sent to your phone.");
    resetOtpFields(); // Reset OTP fields
});

// Function to reset OTP input fields
function resetOtpFields() {
    otpFields.forEach(field => field.value = '');
    otpFields[0].focus();
    verifyButton.disabled = true;
}


