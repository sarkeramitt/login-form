document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const toggleOptions = document.querySelectorAll(".toggle-option")
    const toggleSlider = document.querySelector(".toggle-slider")
    const loginForm = document.getElementById("login-form")
    const signupForm = document.getElementById("signup-form")
    const formTitle = document.getElementById("form-title")
    const formDescription = document.getElementById("form-description")
    const passwordToggles = document.querySelectorAll(".toggle-password")
    const forms = document.querySelectorAll("form")
  
    // Toggle between login and signup forms
    toggleOptions.forEach((option) => {
      option.addEventListener("click", () => {
        // Update toggle state
        toggleOptions.forEach((opt) => opt.classList.remove("active"))
        option.classList.add("active")
  
        // Move slider
        if (option.dataset.form === "signup") {
          toggleSlider.style.left = "50%"
          loginForm.style.display = "none"
          signupForm.style.display = "block"
          formTitle.textContent = "Sign Up"
          formDescription.textContent = "Create an account to get started!"
  
          // Animate form
          setTimeout(() => {
            signupForm.classList.add("active-form")
            loginForm.classList.remove("active-form")
          }, 50)
        } else {
          toggleSlider.style.left = "3px"
          signupForm.style.display = "none"
          loginForm.style.display = "block"
          formTitle.textContent = "Login"
          formDescription.textContent = "Welcome back! Please login to your account."
  
          // Animate form
          setTimeout(() => {
            loginForm.classList.add("active-form")
            signupForm.classList.remove("active-form")
          }, 50)
        }
      })
    })
  
    // Toggle password visibility
    passwordToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const passwordField = toggle.previousElementSibling
  
        if (passwordField.type === "password") {
          passwordField.type = "text"
          toggle.classList.remove("fa-eye-slash")
          toggle.classList.add("fa-eye")
        } else {
          passwordField.type = "password"
          toggle.classList.remove("fa-eye")
          toggle.classList.add("fa-eye-slash")
        }
  
        // Add pulse animation
        toggle.style.animation = "none"
        setTimeout(() => {
          toggle.style.animation = "pulse 0.5s"
        }, 10)
      })
    })
  
    // Form validation
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault()
  
        let isValid = true
        const inputs = form.querySelectorAll("input[required]")
  
        // Reset validation
        form.querySelectorAll(".input-field").forEach((field) => {
          field.classList.remove("error", "success")
          const errorMessage = field.querySelector(".error-message")
          if (errorMessage) errorMessage.remove()
        })
  
        // Validate each input
        inputs.forEach((input) => {
          const field = input.parentElement
  
          // Check if empty
          if (!input.value.trim()) {
            showError(field, input, "This field is required")
            isValid = false
            return
          }
  
          // Email validation
          if (input.type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(input.value)) {
              showError(field, input, "Please enter a valid email address")
              isValid = false
              return
            }
          }
  
          // Password validation
          if (input.type === "password" && !input.placeholder.includes("Confirm")) {
            if (input.value.length < 6) {
              showError(field, input, "Password must be at least 6 characters")
              isValid = false
              return
            }
          }
  
          // Confirm password validation
          if (input.placeholder.includes("Confirm")) {
            const passwordInput = form.querySelector('input[type="password"]:not([placeholder*="Confirm"])')
            if (input.value !== passwordInput.value) {
              showError(field, input, "Passwords do not match")
              isValid = false
              return
            }
          }
  
          // If all validations pass
          field.classList.add("success")
        })
  
        // If form is valid, show success message
        if (isValid) {
          // Simulate form submission
          const submitBtn = form.querySelector(".submit-btn")
          const originalText = submitBtn.textContent
  
          submitBtn.disabled = true
          submitBtn.textContent = "Processing..."
  
          setTimeout(() => {
            submitBtn.textContent = "Success!"
            submitBtn.style.background = "linear-gradient(135deg, #2ecc71, #27ae60)"
  
            // Reset form after 2 seconds
            setTimeout(() => {
              form.reset()
              submitBtn.disabled = false
              submitBtn.textContent = originalText
              submitBtn.style.background = "linear-gradient(135deg, var(--primary-color), var(--secondary-color))"
              form.querySelectorAll(".input-field").forEach((field) => {
                field.classList.remove("success")
              })
            }, 2000)
          }, 1500)
        }
      })
    })
  
    // Show error message
    function showError(field, input, message) {
      field.classList.add("error")
  
      // Create error message if it doesn't exist
      if (!field.querySelector(".error-message")) {
        const errorDiv = document.createElement("div")
        errorDiv.className = "error-message"
        errorDiv.textContent = message
        field.appendChild(errorDiv)
      } else {
        field.querySelector(".error-message").textContent = message
      }
  
      // Shake animation
      input.style.animation = "none"
      setTimeout(() => {
        input.style.animation = "shake 0.5s"
      }, 10)
    }
  
    // Add shake animation
    const style = document.createElement("style")
    style.textContent = `
          @keyframes shake {
              0%, 100% { transform: translateX(0); }
              10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
              20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          
          @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.2); }
              100% { transform: scale(1); }
          }
      `
    document.head.appendChild(style)
  
    // Input focus effects
    const inputs = document.querySelectorAll("input")
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.querySelector("i:not(.toggle-password)").style.color = "var(--primary-color)"
      })
  
      input.addEventListener("blur", () => {
        if (!input.value) {
          input.parentElement.querySelector("i:not(.toggle-password)").style.color = "#aaa"
        }
      })
    })
  
    // Add floating animation to shapes
    const shapes = document.querySelectorAll(".shape")
    shapes.forEach((shape) => {
      shape.addEventListener("mouseover", () => {
        shape.style.animationPlayState = "paused"
      })
  
      shape.addEventListener("mouseout", () => {
        shape.style.animationPlayState = "running"
      })
    })
  })
  
  