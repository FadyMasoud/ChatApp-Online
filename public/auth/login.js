function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.innerText = "";

  fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {


        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        
      messegesuccess.innerText = "Login successful";
      setTimeout(() => {
      window.location.href = "/JesourChat.html";

        messegesuccess.innerText = "";
          
        }, 3000);
        
      } else {
        error.innerText = data.msg || "Login failed";
      }
    })
    .catch(() => {
      error.innerText = "Server error";
    });
}
