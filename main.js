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

  const loginFunc = () => {
    let loginBtn = document.getElementById("login-btn-submit");

    loginBtn.addEventListener("click", () => {
      let username = document.getElementById("username-input-login").value;
      let password = document.getElementById("password-input-login").value;
      if (username.length <= 4) {
        alert("يجب ان يكون اسم المستخدم اكثر من اربع احرف !");
        return;
      }
      if (password.length <= 3) {
        alert("يجب ان تكون كلمة المرور اكثر من ثلاثة احرف !");
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

  //   const createEventFunc = () => {
  //     let createEventSubmit = document.getElementById("create-event-submit");

  //     createEventSubmit.addEventListener("click", () => {
  //       let eventInput = document.getElementById("event-input").value;
  //       let descriptionInput = document.getElementById("description-input").value;
  //       let eventImage = document.getElementById("event-image").files[0];
  //       let dateInput = document.getElementById("date-input").value;
  //       let categoryInput = document.getElementById("category-input").value;
  //       let yearInput = document.getElementById("year-input").value;

  //       let formData = new FormData();
  //       formData.append(eventInput);
  //       formData.append(descriptionInput);
  //       formData.append(eventImage);
  //       formData.append(dateInput);
  //       formData.append(categoryInput);
  //       formData.append(yearInput);
  //     });
  //   };

  const displayEvent = (event) => {
    const container = document.querySelector(".card-container-ai");

    const card = document.createElement("div");
    card.className = "card-ai";
    card.dataset.category = event.category;
    card.dataset.year = event.year;

    card.innerHTML = `
    
      ${event.image ? `<img src="${event.image}" alt="event image" />` : ""}
      <div class="card-details">
      <h4 class="card-title"> ${event.title}</h4>
        <h4 class="card-title"> ${event.date}</h4>
        <p class="card-desc">${event.description}</p>
        <div>
          <hr />
          <span class="card-category">${event.category}</span>
        </div>
        <button class="btn btn-primary rounded-4">الذهاب الى التفاصيل</button>
      </div>
    `;

    container.appendChild(card);
  };

  const loadEvents = () => {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.forEach(displayEvent);
  };

  const createEventFunc = () => {
    let createEventSubmit = document.getElementById("create-event-submit");

    if (!createEventSubmit) return;

    createEventSubmit.addEventListener("click", () => {
      let title = document.getElementById("event-input").value;
      let description = document.getElementById("description-input").value;
      let date = document.getElementById("date-input").value;
      let category = document.getElementById("category-input").value;
      let year = document.getElementById("year-input").value;
      let imageFile = document.getElementById("event-image").files[0];

      if (!title) {
        alert("يرجى تعبئة جميع الحقول المطلوبة.");
        return;
      }

      const event = {
        title,
        description,
        date,
        category,
        year,
        image: "",
      };

      if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
          event.image = e.target.result;
          saveEvent(event);
        };
        reader.readAsDataURL(imageFile);
      } else {
        saveEvent(event);
      }
    });
  };

  const saveEvent = (event) => {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
    displayEvent(event);

    document.getElementById("event-input").value = "";
    document.getElementById("description-input").value = "";
    document.getElementById("date-input").value = "";
    document.getElementById("category-input").value = "";
    document.getElementById("year-input").value = "";
    document.getElementById("event-image").value = "";

    const modalEl = document.getElementById("CreateEventBtn");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal?.hide();
  };

  createEventFunc();
  callCategory();
  callYear();
  registerFunc();
  loginFunc();
  updateUI();
  loadEvents();
});
