function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json()).then(data => {
      if (data.token) {
        showAlert("Login successful", "success");

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);

        setTimeout(() => {
          window.location.href = "/JesourChat.html";
        }, 1500);

      } else {
        showAlert(data.msg || "Login failed", "danger");
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
