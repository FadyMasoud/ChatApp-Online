function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.innerText = "";

  fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.msg) {
        // window.location.href = "./login.html";
      } else {
        error.innerText = data.msg || "Registration failed";
      }
    })
    .catch(() => {
      error.innerText = "Server error";
    });
}
