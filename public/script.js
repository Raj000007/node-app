document.getElementById("signup-form").addEventListener("submit", async function(event) {
    event.preventDefault();  // Prevent default form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const messageElement = document.getElementById("message");
    
    // Form Validation (check if fields are not empty)
    if (!name || !email || !password) {
        messageElement.textContent = "All fields are required.";
        return;
    }

    const userData = { name, email, password };

    try {
        const response = await fetch("http://4.200.33.84:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            messageElement.style.color = "green";
            messageElement.textContent = data.message;
        } else {
            messageElement.style.color = "red";
            messageElement.textContent = data.message;
        }
    } catch (error) {
        messageElement.style.color = "red";
        messageElement.textContent = "Error: " + error.message;
    }
});
