document.getElementById("togglePwd").addEventListener("click", function () {
    const pwd = document.getElementById("password");
    if (pwd.type === "password") {
        pwd.type = "text";
        this.innerHTML = "&#128068;"; // Closed eye unicode
    } else {
        pwd.type = "password";
        this.innerHTML = "&#128065;"; // Open eye unicode
    }
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Логин выполнен (пример)");
});
