function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.msg) {
        showAlert("Registration successful 🎉 Redirecting...", "success");

        setTimeout(() => {
          window.location.href = "./login.html";
        }, 1500);

      } else {
        showAlert(data.msg || "Registration failed", "danger");
      }
    })
    .catch(() => {
      showAlert("Server error", "danger");
    });
}



function showAlert(message, type = "success") {
  const alertBox = document.getElementById("alertBox");

  alertBox.innerHTML = `
    <div class="custom-alert alert-${type}">
      ${message}
    </div>
  `;

  setTimeout(() => {
    alertBox.innerHTML = "";
  }, 3000);
}
