document.getElementById("same-as-contact").addEventListener("change", function () {
    const whatsappNumberInput = document.getElementById("whatsapp-number");

    // If the checkbox is checked, hide the WhatsApp number field
    if (this.checked) {
        whatsappNumberInput.style.display = "none";
        // Optionally, clear the WhatsApp number field value
        whatsappNumberInput.value = '';
    } else {
        whatsappNumberInput.style.display = "block";
    }
});

// Form submission handler
document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Collect form data
    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        contactNumber: document.getElementById("contact-number").value,
        whatsappNumber: document.getElementById("whatsapp-number").value,
        sameAsContact: document.getElementById("same-as-contact").checked,
        gender: document.getElementById("gender").value,
        address: document.getElementById("address").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirm-password").value,
    };

    // Basic validation for password match
    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Send data to backend (your Node.js server)
    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === "User registered successfully") {
                // Redirect to the login page upon successful registration
                window.location.href = "login.html";
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Error during registration.");
        });
});
