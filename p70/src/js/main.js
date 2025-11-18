import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

// -----------------------------------------
// Hoofdstuk 16: Events + preventDefault()
// -----------------------------------------
// oefening eventlisteners hover effect -


document.addEventListener("DOMContentLoaded", () => {
// 1) Link blokkeren
    document.getElementById("ev_link")
        ?.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("ev_msg2").textContent =
                "🚫 Navigatie geblokkeerd door JS";
        });
// 2) Hover effects
    const box = document.getElementById("ev_box");
    box.addEventListener("mouseover", () => {
        box.classList.add("bg-warning");
        box.textContent = "Hover actief!";
    });
    box.addEventListener("mouseleave", () => {
        box.classList.remove("bg-warning");
        box.textContent = "Hover over mij 🖱️";
    });
// 3) Form prevent + feedback
    document.getElementById("ev_form2")
        ?.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("ev_input2").value.trim();
            const msg = document.getElementById("ev_msg2");
            if (!name) {
                msg.className = "alert alert-danger mt-3 mb-0";
                msg.textContent = "❌ Vul je naam in";
                return;
            }
            msg.className = "alert alert-success mt-3 mb-0";
            msg.textContent = ` Form verzonden voor ${name} (zonder reload!)`;
        });
});

// mini-opdracht

const bericht = document.getElementById("rb_msg");

function mouseOverFunctie() {
    bericht.textContent = "Hallo! ";
    bericht.className = "alert alert-success";
    // box.style.background = "lightgreen";
    return;
}

function mouseLeaveFunctie() {
    bericht.textContent = "Kom terug ! ";
    bericht.className = "alert alert-success-bg-subtle";
    // box.style.background = "#f8f9fa";
    return;
}

function clickFunctie() {
    bericht.textContent = "Je klikt ! ";
    bericht.className = "alert alert-success border border-5";
    // box.style.border = "3px solid black";
    return;
}

function dubbelClickFunctie() {
    bericht.textContent = "Je klikt dubbel, Wow ! ";
    bericht.className = "alert alert-success border border-danger border-5 ";
    // box.style.border = "3px solid red";
    return;
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("rb_box")?.addEventListener("mouseover", mouseOverFunctie);
    document.getElementById("rb_box")?.addEventListener("mouseleave", mouseLeaveFunctie);
    document.getElementById("rb_box")?.addEventListener("click", clickFunctie);
    document.getElementById("rb_box")?.addEventListener("dblclick", dubbelClickFunctie);

});

// -------------------------------------
// Hoofdstuk 17: Todo app mini-project
// -------------------------------------

// code cursus (zonder filters & teller) :

// const taken2 = [];
// function renderTodos(filter) {
//     const list = document.getElementById("todo_list2");
//     list.innerHTML = taken2
//         .map((task, index) => `
// <li class="list-group-item d-flex justify-content-between align-itemscenter ${task.done ? "todo-done" : ""}">
// <span class="todo-text" data-idx="${index}">
// ${task.text}
// </span>
// <button class="btn btn-sm btn-danger todo-del" data-idx="${index}">X</button>
// </li>
// `)
//         .join("");
// }
// function addTodo(e) {
//     e.preventDefault();
//     const inp = document.getElementById("todo_input2");
//     const msg = document.getElementById("todo_msg2");
//     const text = inp.value.trim();
//     if (!text) {
//         msg.className = "alert alert-danger mb-3";
//         msg.textContent = "❌ Vul een taak in";
//         return;
//     }
//     taken2.push({ text, done: false });
//     msg.className = "alert alert-success mb-3";
//     msg.textContent = ` Taak toegevoegd: ${text}`;
//     inp.value = "";
//     renderTodos();
// }
// function handleTodoClick(e) {
//     const idx = e.target.dataset.idx;
// // Toggle done
//     if (e.target.classList.contains("todo-text")) {
//         taken2[idx].done = !taken2[idx].done;
//         renderTodos();
//         return;
//     }
// // Delete
//     if (e.target.classList.contains("todo-del")) {
//         taken2.splice(idx, 1);
//         renderTodos();
//     }
// }
//
//
// document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById("todo_form2")?.addEventListener("submit", addTodo);
//     document.getElementById("todo_list2")?.addEventListener("click",
//         handleTodoClick);
// });

// code chatgpt uitgebreid met teller & filters :

// -------------------------------------
// Hoofdstuk 17: Todo app mini-project
// -------------------------------------

const taken2 = [];
let currentFilter = "all"; // all | open | done

function updateOpenCount() {
    const openCount = taken2.filter(t => !t.done).length;
    document.querySelector(".btn.btn-secondary.fs-mini").textContent =
        `Open tasks: ${openCount}`;
}

function renderTodos() {
    const list = document.getElementById("todo_list2");

    let filtered = taken2;

    if (currentFilter === "open") {
        filtered = taken2.filter(t => !t.done);
    } else if (currentFilter === "done") {
        filtered = taken2.filter(t => t.done);
    }

    list.innerHTML = filtered
        .map((task, index) => `
<li class="list-group-item d-flex justify-content-between align-items-center ${task.done ? "todo-done" : ""}">
    <span class="todo-text" data-idx="${taken2.indexOf(task)}">
        ${task.text}
    </span>
    <button class="btn btn-sm btn-danger todo-del"  data-idx="${taken2.indexOf(task)}">X</button>
</li>
`)
        .join("");

    updateOpenCount();
}

function addTodo(e) {
    e.preventDefault();
    const inp = document.getElementById("todo_input2");
    const msg = document.getElementById("todo_msg2");
    const text = inp.value.trim();

    if (!text) {
        msg.className = "alert alert-danger mb-3";
        msg.textContent = "❌ Vul een taak in";
        return;
    }

    taken2.push({text, done: false});

    msg.className = "alert alert-success mb-3";
    msg.textContent = ` Taak toegevoegd: ${text}`;

    inp.value = "";

    renderTodos();
}

function handleTodoClick(e) {
    const idx = e.target.dataset.idx;

    // Toggle done
    if (e.target.classList.contains("todo-text")) {
        taken2[idx].done = !taken2[idx].done;
        renderTodos();
        return;
    }

    // Delete
    if (e.target.classList.contains("todo-del")) {
        taken2.splice(idx, 1);
        renderTodos();
    }
}

// --------------------------------
// FILTER FUNCTIONS
// --------------------------------

function filterAll(e) {
    e.preventDefault();
    currentFilter = "all";
    renderTodos();
}

function filterOpen(e) {
    e.preventDefault();
    currentFilter = "open";
    renderTodos();
}

function filterDone(e) {
    e.preventDefault();
    currentFilter = "done";
    renderTodos();
}

// --------------------------------
// INIT
// --------------------------------

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("todo_form2")?.addEventListener("submit", addTodo);
    document.getElementById("todo_list2")?.addEventListener("click", handleTodoClick);
    document.getElementById("all")?.addEventListener("click", filterAll);
    document.getElementById("done")?.addEventListener("click", filterDone);
    document.getElementById("open")?.addEventListener("click", filterOpen);

    renderTodos(); // initial display
});


// -------------------------------------
// Hoofdstuk 18: Objects + Date()
// -------------------------------------
function berekenLeeftijd(jaar) {
    const huidigJaar = new Date().getFullYear();
    return huidigJaar - jaar;
}

function toonLeeftijd(e) {
    e.preventDefault();
    const input = document.getElementById("age_input").value.trim();
    const out = document.getElementById("age_output");
    if (!input || isNaN(input)) {
        out.className = "alert alert-danger mb-0";
        out.textContent = "❌ Geef een geldig jaar in";
        return;
    }
    const leeftijd = berekenLeeftijd(Number(input));
    const gebruiker = {
        geboorteJaar: Number(input),
        leeftijd: leeftijd
    };
    out.className = "alert alert-success mb-0";
    out.textContent = ` Je bent ongeveer ${gebruiker.leeftijd} jaar oud
(geboren in ${gebruiker.geboorteJaar})`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("age_form")?.addEventListener("submit",
        toonLeeftijd);
});

// Mini-opdracht hoofdstuk 18

// function berekenLeeftijdJaar(datum) {
//     const nu = new Date();
//     let leeftijd = nu.getFullYear() - datum.getFullYear();
//     const isVoorVerjaardag =
//         nu.getMonth() < datum.getMonth() ||
//         (nu.getMonth() === datum.getMonth() && nu.getDate() < datum.getDate());
//     if (isVoorVerjaardag) leeftijd--;
//     return leeftijd;
// }
// document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById("dob_btn")?.addEventListener("click", () => {
//         const d = Number(document.getElementById("dob_day").value);
//         const m = Number(document.getElementById("dob_month").value);
//         const y = Number(document.getElementById("dob_year").value);
//         const out = document.getElementById("dob_out");
//         if (!d || !m || !y) {
//             out.className = "alert alert-danger mb-0";
//             out.textContent = "❌ Vul dag, maand en jaar in";
//             return;
//         }
//         const datum = new Date(y, m - 1, d);
//         const dagen =
//             ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"];
//         const weekday = dagen[datum.getDay()];
//         const age = berekenLeeftijdJaar(datum);
//         out.className = "alert alert-success mb-0";
//         out.textContent = `🎂 Je bent ongeveer ${age} jaar oud en geboren op een
// ${weekday}`;
//     });
// });

// eigen oplossing :

function isValidDate(day, month, year) {
    if (!Number.isInteger(day) || day < 1 || day > 31) return false;
    if (!Number.isInteger(month) || month < 1 || month > 12) return false;
    if (!Number.isInteger(year) || year < 1900 || year > new Date().getFullYear()) return false;
    return true;
}

function showLeeftijd() {
    const geboorteDatum = parseInt(document.getElementById("dob_day").value.trim(), 10);
    const geboorteMaand = parseInt(document.getElementById("dob_month").value.trim(), 10) - 1;
    const geboorteJaar = parseInt(document.getElementById("dob_year").value.trim(), 10);
    const dobStatus = document.getElementById("dob_out");
    const birthDay = new Date(geboorteJaar, geboorteMaand, geboorteDatum);
    const geboorteDag = birthDay.getDay();

    const huidigJaar = new Date().getFullYear();
    const huidigeMaand = new Date().getMonth() + 1;
    const huidigeDatum = new Date().getDate();
    const dagen = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]

    let leeftijd = 0;

    if (!isValidDate(geboorteDatum, geboorteMaand, geboorteJaar)) {
        dobStatus.textContent = "Geef een geldige datum in !";
        dobStatus.className = "alert alert-warning"
    } else {
        if (geboorteMaand < huidigeMaand || ((geboorteMaand == huidigeMaand) && (geboorteDatum <= huidigeDatum))) {
            leeftijd = huidigJaar - geboorteJaar;
        } else {
            leeftijd = huidigJaar - geboorteJaar - 1;
        }
        dobStatus.textContent = `Uw leeftijd is ${leeftijd}. Je bent geboren op een ${dagen[geboorteDag]}`;
        dobStatus.className = "alert alert-success";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dob_btn")?.addEventListener("click", showLeeftijd);
});

// ----------------------------------------------------------
// Hoofdstuk 19: Constructor functions + object instances
// ----------------------------------------------------------
const users = [];
function User(name, age) {
    this.name = name;
    this.age = age;
    this.info = function() {
        return `${this.name} (${this.age} jaar)`;
    };
}
function addUser() {
    const name = document.getElementById("uc_name").value.trim();
    const age = document.getElementById("uc_age").value.trim();
    const list = document.getElementById("uc_list");
    if (!name || !age) return;
    const user = new User(name, Number(age));
    users.push(user);
    list.innerHTML = users
        .map(u => `<li class="list-group-item">${u.info()}</li>`)
        .join("");
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("uc_btn")
        ?.addEventListener("click", addUser);
});

// Mini opdracht producten met prijzen in class stoppen en tonen


const products = [];

function Product(productName,price) {
    this.productName = productName;
    this.price = price;
    this.info = `${this.productName} => ${this.price}`;
}

function addProduct() {
    const productName = document.getElementById("prod_name").value.trim();
    const price = document.getElementById("prod_price").value.trim();
    const prodList = document.getElementById("prod_list");

    if (!productName || !price) return;

    const product = new Product(productName, Number(price));
    products.push(product);

    prodList.innerHTML = products.map(p => `<li class="list-group-item"> ${p.info}</li>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("prod_btn")?.addEventListener("click", addProduct);
});


