/**
 * Handles the form submission for the newsletter.
 * Validates inputs and redirects on success.
 */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletter-form");
  const emailInput = document.getElementById("email");
  const privacyCheckbox = document.getElementById("privacy");
  const emailError = document.getElementById("email-error");
  const privacyError = document.getElementById("privacy-error");

  /**
   * Clears all validation error messages and styles.
   */
  function clearErrors() {
    emailInput.classList.remove("invalid-input");
    privacyCheckbox.classList.remove("invalid-input");
    emailError.textContent = "";
    privacyError.textContent = "";
  }

  /**
   * Displays a validation error message for a given input.
   */
  function displayError(inputElement, errorElement, message) {
    inputElement.classList.add("invalid-input");
    errorElement.textContent = message;
    
    inputElement.setAttribute("aria-invalid", "true");
    inputElement.setAttribute("aria-describedby", errorElement.id);
  }

  /**
   * Validates the email input field.
   */
  function validateEmail() {
    if (!emailInput.checkValidity()) {
      if (emailInput.value.length === 0) {
        displayError(emailInput, emailError, "Email address is required.");
      } else {
        displayError(
          emailInput,
          emailError,
          "Please enter a valid email address (e.g., name@example.com).",
        );
      }
      return false;
    }
    return true;
  }

  /**
   * Validates the privacy policy checkbox.
   */
  function validatePrivacy() {
    if (!privacyCheckbox.checked) {
      displayError(
        privacyCheckbox,
        privacyError,
        "You must agree to the privacy policy.",
      );
      return false;
    }
    return true;
  }

  /**
   * Performs all form validations.
   */
  function validateForm() {
    clearErrors();

    const isEmailValid = validateEmail();
    const isPrivacyValid = validatePrivacy();

    return isEmailValid && isPrivacyValid;
  }

  // Add real-time validation feedback on input blur for a better UX
  emailInput.addEventListener("blur", () => {
    validateEmail();
  });

  privacyCheckbox.addEventListener("change", () => {
    validatePrivacy();
  });

  // Form submission handler
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    if (validateForm()) {
      console.log("Form submitted successfully!");
      window.location.href = "thankyou.html";
    } else {
      console.log("Form has validation errors.");
      const firstInvalid = document.querySelector(".invalid-input");
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });
});
