function validateUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorElement = document.getElementById("error_msg");

  if (username == "admin" && password == "password") {
    console.log("logged in");
    // localStorage.setItem('username', username);
    errorElement.innerHTML = "User is valid";
    errorElement.setAttribute("style", "display:block;");
  } else {
    errorElement.innerHTML = "Username or Password invalid";
    errorElement.setAttribute("style", "display:block;");
  }
}

function loadUser() {
  // look for the username from the querystring
  const urlParams = new URLSearchParams(window.location.search);
  username = urlParams.get("u");
  if (username) {
    //loop through the user's array
    const users = getFromLocalStorage("users");
    let matcheduser = "";
    users.forEach((user) => {
      //find the user that matches the username
      if (user.username === username) {
        matcheduser = user;
        return;
      }
    });

    //fill the edit form with the user values
    document.getElementById("username").value = matcheduser.username;
    document.getElementById("firstname").value = matcheduser.firstname;
    document.getElementById("password").value = matcheduser.password;
  }
}

function updateUser() {
  // look for the username from the querystring
  const urlParams = new URLSearchParams(window.location.search);
  username = urlParams.get("u");
  if (username) {
    //loop through the user's array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let matcheduser = "";
	let indexUser;
    users.forEach((user, index) => {
      //find the user that matches the username
      if (user.username === username) {
        matcheduser = user;
		indexUser = index;
        return;
      }
    });
	if (indexUser !== -1) {
		users.splice(indexUser, 1)
	}

	localStorage.setItem('users', JSON.stringify(users));
	saveUser();
  }
}

function loadUsers() {
  // loop the users in localstorage
  const users = getFromLocalStorage("users");
  users.forEach((user, index) => {
    // add each user to the the existing table
    const table = document.getElementById("user-table-rows");
    table.innerHTML += `<tr><th scope="row">${index}</th><td>${user.firstname}</td><td>${user.username}</td><td>${user.type}</td><td> <a href="./edit_user.html?u=${user.username}">Edit</a> | <a href="">Delete</a></td></tr>`;
  });
}

function saveUser() {
  const username = document.getElementById("username").value;
  const firstname = document.getElementById("firstname").value;
  const password = document.getElementById("password").value;

  const user = {
    username,
    firstname,
    password,
    type: "user",
  };

  if (saveToLocalStorage("users", user)) {
    alert("User saved");
    document.location.href = "./dashboard.html";
  } else {
    alert("There was an error registering the user");
  }
}

/**
 * Binds the different events to the different elements of the page
 */
function bindEvents() {
  // document.getElementById('login-button').addEventListener('click', loginButtonHandler);
  if (document.getElementById("register-button")) {
    document
      .getElementById("register-button")
      .addEventListener("click", registerButtonHandler);
  }
  if (document.getElementById("update-button")) {
    document
      .getElementById("update-button")
      .addEventListener("click", updateUser);
  }
  // jQuery('#login-button').bind('click', loginButtonHandler);
  // jQuery('#register-button').bind('click', registerButtonHandler);
}

function loginButtonHandler(element) {
  validateUser();
}

function registerButtonHandler(element) {
  saveUser();
}
