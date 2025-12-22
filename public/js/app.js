
//sent a token via a socket connection (socket.handshake.auth) to the server
const socket = io({
  auth: {
    token: localStorage.getItem("token")
  }
});

const username = localStorage.getItem("username");
if (!username) location.href = "/auth/login.html";

currentUser.innerText = username;


let selectedUser = null;

socket.on("users", (users) => {
  usersList.innerHTML = "";


  console.log("users",users);
  

  for (const id in users) {
    if (users[id] === username) continue;

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="user-avatar">
        <i class="bi bi-person"></i>
        <span class="online-dot"></span>
      </div>
      <span>${users[id]}</span>
    `;

    li.onclick = () => {
      selectedUser = id;
      chatBox.innerHTML = "";
      chatHeader.innerText = users[id];

      document.querySelectorAll(".users-list li")
        .forEach(el => el.classList.remove("active"));

      li.classList.add("active");
    };

    usersList.appendChild(li);
  }
});




socket.on("message", (data) => {
  const div = document.createElement("div");
  div.className = "message";
  div.innerText = `${data.from}: ${data.message}`;
  chatBox.appendChild(div);
});

function sendMessage() {
  if (!selectedUser) return alert("Select a user");

  socket.emit("privateMessage", {
    to: selectedUser,
    message: messageInput.value
  });

  const div = document.createElement("div");
  div.className = "message me";
  div.innerText = messageInput.value;
  chatBox.appendChild(div);

  messageInput.value = "";
}


function filterUsers(){

  const term = searchUser.value.toLowerCase();

  usersList.querySelectorAll("li").forEach((user) => {
    const username = user.innerText.toLowerCase();
    if (username.indexOf(term) !== -1) {
      user.style.display = "flex";
    } else {
      user.style.display = "none";
    }
  });



}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  location.href = "/auth/login.html";
}