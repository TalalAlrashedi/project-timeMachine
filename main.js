document.addEventListener("DOMContentLoaded", () => {
  let categoryBtns = document.querySelectorAll(".category-btn");
  let yearBtns = document.querySelectorAll(".year-btn");
  let cards = document.querySelectorAll(".card-ai");

  let activeCategory = "all";
  let activeYear = "all";

  const filterCards = () => {
    cards.forEach((card) => {
      let categoryMatch =
        activeCategory === "all" || card.dataset.category === activeCategory;
      let yearMatch = activeYear === "all" || card.dataset.year === activeYear;
      card.style.display = categoryMatch && yearMatch ? "flex" : "none";
    });
  };

  const callCategory = () => {
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        categoryBtns.forEach((cate) => cate.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.dataset.category;
        filterCards();
      });
    });
  };

  const callYear = () => {
    yearBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        yearBtns.forEach((year) => year.classList.remove("active"));
        btn.classList.add("active");
        activeYear = btn.dataset.year;
        filterCards();
      });
    });
  };

  const registerFunc = () => {
    let registerBtn = document.getElementById("register-btn");
    registerBtn.addEventListener("click", () => {
      let username = document.getElementById("username-input").value;
      let password = document.getElementById("password-input").value;
      let confirmPassword = document.getElementById(
        "confirm-password-input"
      ).value;

      if (username.length <= 4) {
        alert("يجب ان يكون اسم المستخدم اكثر من اربع احرف !");
        return;
      }
      if (password.length <= 3) {
        alert("يجب ان تكون كلمة المرور اكثر من ثلاثة احرف !");
        return;
      }
      if (password !== confirmPassword) {
        alert("يجب ان تكون كلمة المرور متطابقة !");
        return;
      }

      localStorage.setItem("username", username);
      updateUI();
    });
  };

  const updateUI = () => {
    let savedName = localStorage.getItem("username");
    let logoutBtn = document.getElementById("LogOutBtn");
    let registerBtn = document.getElementById("register");
    let loginBtn = document.getElementById("login-btn");
    let addEvent = document.getElementById("add-event-btn");

    if (savedName !== null) {
      addEvent.classList.remove("d-none");
    } else {
      addEvent.classList.add("d-none");
    }
    greeting.textContent = savedName || "Time Machine";

    if (savedName) {
      logoutBtn.style.display = "flex";
      registerBtn.style.display = "none";
      loginBtn.style.display = "none";
    } else {
      logoutBtn.style.display = "none";
      registerBtn.style.display = "inline-block";
      loginBtn.style.display = "inline-block";
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("username");
        updateUI();
      });
    }
  };

  callCategory();
  callYear();
  registerFunc();
  updateUI();

  createEventFunc();
});
