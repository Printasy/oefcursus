import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'

// ---------------------------------------------
// Hoofdstuk 20: ES6 Classes + extends + super
// ---------------------------------------------
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    info() {
        return `${this.name} (${this.age} jaar)`;
    }
}

class Admin extends User {
    constructor(name, age) {
        super(name, age);
        this.role = "Admin";
    }

    info() {
        return `[ADMIN] ${super.info()}`;
    }
}

const clsUsers = [];

function addClassUser() {
    const name = document.getElementById("cls_name").value.trim();
    const age = Number(document.getElementById("cls_age").value);
    const role = document.getElementById("cls_role").value;
    const list = document.getElementById("cls_list");
    if (!name || !age) return;
    const user = role === "admin"
        ? new Admin(name, age)
        : new User(name, age);
    clsUsers.push(user);
    list.innerHTML = clsUsers
        .map(u => `<li class="list-group-item">${u.info()}</li>`)
        .join("");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cls_btn")
        ?.addEventListener("click", addClassUser);
});

// ---------------------------------------------
// Mini-opdracht: Animal base + Dog child (bonus: Cat)
// ---------------------------------------------
class Animal {
    constructor(name, soort) {
        this.name = name;
        this.soort = soort;
    }

    speak() {
        return `🐾 ${this.name} is een ${this.soort}`;
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name, "hond");
    }

    speak() {
        return `🐶 ${this.name} blaft!`;
    }
}

// Bonus (emoji per dier)
class Cat extends Animal {
    constructor(name) {
        super(name, "kat");
    }

    speak() {
        return `🐱 ${this.name} miauwt!`;
    }
}

const pets = [];

function addPet() {
    const name = document.getElementById("pet_name").value.trim();
    const type = document.getElementById("pet_type").value;
    const list = document.getElementById("pet_list");
    if (!name) return;

    let pet;
    if (type === "hond") pet = new Dog(name);
    else if (type === "kat") pet = new Cat(name);
    else pet = new Animal(name, type);

    pets.push(pet);

    list.innerHTML = pets
        .map(p => `<li class="list-group-item">${p.speak()}</li>`)
        .join("");

    document.getElementById("pet_name").value = "";
    document.getElementById("pet_name").focus();
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pet_btn")?.addEventListener("click", addPet);
    document.getElementById("pet_name")?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addPet();
    });
});

// --------------------------------------
// Hoofdstuk 21: Mini Webshop Project
// --------------------------------------
class Product {
    constructor(name, price, emoji) {
        this.name = name;
        this.price = price;
        this.emoji = emoji;
    }

    label() {
        return `${this.emoji} ${this.name} — €${this.price.toFixed(2)}`;
    }
}

const products3 = [
    new Product("Pizza", 12.5, "🍕"),
    new Product("Hamburger", 9.9, "🍔"),
    new Product("Sushi", 15.0, "🍣"),
    new Product("Frietjes", 4.5, "🍟")
];
let cartCount = 0;

function renderProducts() {
    const cont = document.getElementById("prod_container");
    cont.innerHTML = products3
        .map((p, i) => `
<div class="card mb-2">
<div class="card-body d-flex justify-content-between align-itemscenter">
<strong>${p.label()}</strong>
<button class="btn btn-sm btn-success prod_buy" data-idx="${i}">
Koop
</button>
</div>
</div>
`)
        .join("");
}

function addToCart(idx) {
    cartCount++;
    const badge = document.getElementById("cart_count");
    const msg = document.getElementById("cart_msg");
    badge.textContent = cartCount;
    badge.classList.add("cart-added");
    setTimeout(() => badge.classList.remove("cart-added"), 300);
    msg.className = "alert alert-success mt-2 mb-0";
    msg.textContent = ` ${products3[idx].name} toegevoegd aan winkelmandje`;
}

document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    document.getElementById("prod_container")
        ?.addEventListener("click", (e) => {
            if (e.target.classList.contains("prod_buy")) {
                addToCart(e.target.dataset.idx);
            }
        });
});

// --------------------------------------
// Hoofdstuk 22: BOM Demo
// --------------------------------------
function showBOM() {
    const data = [
        `🪟 Window breedte: ${window.innerWidth}`,
        `🖥️ Screen resolutie: ${screen.width} x ${screen.height}`,
        `🌐 User Agent: ${navigator.userAgent}`,
        `💬 Browser taal: ${navigator.language}`,
        `📡 Online: ${navigator.onLine ? "Ja" : "Nee"}`,
        `🔗 URL: ${location.href}`
    ];
    document.getElementById("bom_list").innerHTML =
        data.map(item => `<li class="list-group-item">${item}</li>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("bom_btn")
        ?.addEventListener("click", showBOM);
    document.getElementById("bom_go")
        ?.addEventListener("click", () => {
            location.href = "https://google.com";
        });
});


// mini oefening

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dc_btn")?.addEventListener("click", () => {
        const ua = navigator.userAgent;
        const width = window.innerWidth;
        const isTouch = navigator.maxTouchPoints > 0;
        const os =
            ua.includes("Windows") ? "Windows" :
                ua.includes("Mac") ? "MacOS" :
                    ua.includes("Linux") ? "Linux" :
                        "Onbekend";
        const device =
            width < 768 ? "📱 Mobiel" :
                width < 1024 ? "📲 Tablet" :
                    "💻 Desktop";
        const info = [
            `Online: ${navigator.onLine ? " Ja" : "❌ Nee"}`,
            `Touch: ${isTouch ? "" : "❌"}`,
            `Device: ${device}`,
            `Taal: ${navigator.language}`,
            `Besturingssysteem: ${os}`
        ];
        document.getElementById("dc_list").innerHTML =
            info.map(i => `<li class="list-group-item">${i}</li>`).join("");
    });
});


// --------------------------------------
// Hoofdstuk 23: LocalStorage Demo
// --------------------------------------
function loadName() {
    const saved = localStorage.getItem("username");
    const out = document.getElementById("ls_output");
    if (saved) {
        out.className = "alert alert-success mb-0";
        out.textContent = `Welkom terug, ${saved}!`;
    }
}

function saveName() {
    const inp = document.getElementById("ls_name").value.trim();
    const out = document.getElementById("ls_output");
    if (!inp) return;
    localStorage.setItem("username", inp);
    out.className = "alert alert-success mb-0";
    out.textContent = ` Naam opgeslagen: ${inp}`;
}

document.addEventListener("DOMContentLoaded", () => {
    loadName();
    document.getElementById("ls_save")
        ?.addEventListener("click", saveName);
});


//------------------------------------------------
//  demo 2 cookies / localStorage
// -----------------------------------------------
let favs = [];

function saveFavs() {
    localStorage.setItem("favs", JSON.stringify(favs));
}

function loadFavs() {
    const saved = JSON.parse(localStorage.getItem("favs"));
    if (saved) favs = saved;
    renderFavs();
}

function renderFavs() {
    document.getElementById("fav_list").innerHTML =
        favs.map(f => `<li class="list-group-item">${f}</li>`).join("");
}

function addFav() {
    const val = document.getElementById("fav_input").value.trim()
    if (!val) return;
    favs.push(val);
    saveFavs();
    renderFavs();
    document.getElementById("fav_input").value = "";
}

function clearFavs() {
    favs = [];
    localStorage.removeItem("favs");
    renderFavs();
}

document.addEventListener("DOMContentLoaded", () => {
    loadFavs();
    document.getElementById("fav_btn")?.addEventListener("click", addFav);
    document.getElementById("fav_clear")?.addEventListener("click", clearFavs);
});


// -----------------------------------------------
//   mini opdracht localstorage / cookeis
// -----------------------------------------------

function applyTheme(mode) {
    const body = document.body;
    const btn = document.getElementById("theme_btn");
    const status = document.getElementById("theme_status");
    if (mode === "dark") {
        body.classList.add("dark-mode");
        btn.textContent = "Switch to Light";
        status.textContent = "🌙 Donkere modus actief";
    } else {
        body.classList.remove("dark-mode");
        btn.textContent = "Switch to Dark";
        status.textContent = "☀️ Licht modus actief";
    }
    localStorage.setItem("theme", mode);
}

document.addEventListener("DOMContentLoaded", () => {
    applyTheme(localStorage.getItem("theme") || "light");
    document.getElementById("theme_btn")
        ?.addEventListener("click", () => {
            const current = localStorage.getItem("theme");
            applyTheme(current === "dark" ? "light" : "dark");
        });
});
// --------------------------------------
// Hoofdstuk 24: Fetch API Demo
// --------------------------------------
async function loadUsers() {
    const status = document.getElementById("api_status");
    const list = document.getElementById("api_list");
    try {
        status.className = "alert alert-warning mb-0";
        status.textContent = "⏳ Data laden...";
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Netwerk fout");
        const users = await res.json();
        list.innerHTML = users
            .map(u => `<li class="list-groupitem"><strong>${u.name}</strong><br>${u.email}</li>`)
            .join("");
        status.className = "alert alert-success mb-0";
        status.textContent = ` ${users.length} gebruikers geladen`;
    } catch (err) {
        status.className = "alert alert-danger mb-0";
        status.textContent = "❌ Fout bij laden van data";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("api_btn")
        ?.addEventListener("click", loadUsers);
});
// ---------------------------------------------------
// Hoofdstuk 25: JSON File Load (Local API Simulator)
// ---------------------------------------------------
async function loadLocalUsers() {
    const status = document.getElementById("json_status");
    const list = document.getElementById("json_list");
    try {
        status.className = "alert alert-warning mb-0";
        status.textContent = "⏳ JSON laden...";
        const res = await fetch("./data/users.json");
        if (!res.ok) throw new Error("Fout bij laden JSON");
        const users = await res.json();
        list.innerHTML = users
            .map(u => `<li class="list-groupitem"><strong>${u.name}</strong><br>${u.email}</li>`)
            .join("");
        status.className = "alert alert-success mb-0";
        status.textContent = ` ${users.length} gebruikers geladen`;
    } catch (err) {
        status.className = "alert alert-danger mb-0";
        status.textContent = "❌ Kon JSON niet laden";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("json_btn")
        ?.addEventListener("click", loadLocalUsers);
});
// --------------------------------------------
//         products laden en lijst tonen
// --------------------------------------------
async function loadLocalProducts() {
    const list = document.getElementById("prod_list_local");
    const status = document.getElementById("prod_status_local");
    try {
        status.className = "alert alert-warning mb-0";
        status.textContent = "⏳ Laden...";
        const res = await fetch("./data/products.json");
        if (!res.ok) throw new Error("Load error");
        const items = await res.json();
        list.innerHTML = items
            .map(p => `<li class="list-group-item">💰 ${p.name} —
€${p.price}</li>`)
            .join("");
        status.className = "alert alert-success mb-0";
        status.textContent = ` ${items.length} producten geladen`;
    } catch {
        status.className = "alert alert-danger mb-0";
        status.textContent = "❌ Fout bij laden";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("prod_load_btn")
        ?.addEventListener("click", loadLocalProducts);
});

function skeletonUI() {
    return `
<div class="mb-2 skeleton" style="height: 25px; width: 60%;"></div>
<div class="mb-2 skeleton" style="height: 18px; width: 90%;"></div>
<div class="mb-2 skeleton" style="height: 18px; width: 80%;"></div>
<div class="mb-2 skeleton" style="height: 18px; width: 70%;"></div>
`;
}



// -------------------------------------------------------
// Hoofdstuk 31: Promise.all + Skeleton Loading
// -------------------------------------------------------
async function loadUserAndPosts() {
    const out = document.getElementById("multi_output");
// skeleton
    out.innerHTML = skeletonUI();
    try {
        const [userRes, postsRes] = await Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users/1"),
            fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
        ]);
        if (!userRes.ok || !postsRes.ok) throw new Error("API fout");
        const user = await userRes.json();
        const posts = await postsRes.json();
        out.innerHTML = `
<div class="alert alert-success">
👤 <strong>${user.name}</strong> (${user.email})
</div>
<h6>📬 Laatste posts:</h6>
<ul class="list-group">
${posts.slice(0, 5).map(p => `<li class="list-groupitem">${p.title}</li>`).join("")}
</ul>
`;
    }
    catch {
        out.innerHTML = `
<div class="alert alert-danger">
❌ Kon data niet laden, probeer opnieuw
</div>
`;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("multi_btn")
        ?.addEventListener("click", loadUserAndPosts);
});

// ---------------------------------------------
// H34 Demo 1: Console tools
// ---------------------------------------------
function generateLogs() {
    const users = [
        { id: 1, name: "Tom", role: "admin" },
        { id: 2, name: "Sara", role: "user" },
        { id: 3, name: "Liam", role: "user" },
    ];
    console.group("Users snapshot");
    console.table(users);
    console.log("Aantal users:", users.length);
    console.groupEnd();
// Simuleer waarschuwing + error
    console.warn("Demo warning: lege waarde mogelijk");
    try {
        JSON.parse("{ invalid json }");
    } catch (err) {
        console.error("JSON parse error:", err);
    }
    document.getElementById("dbg_console_out").textContent =
        "Logs gegenereerd → bekijk de Console.";
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dbg_console_btn")
        ?.addEventListener("click", generateLogs);
});

// // ---------------------------------------------
// // H34 Demo 2: Breakpoints, Watch, Call Stack
// // ---------------------------------------------
// function sumRange(n) {
// // Plaats hier een breakpoint op de volgende regel
//     let total = 0;
//     for (let i = 1; i <= n; i++) total += i;
//     return total;
// }
// function handleSum() {
//     const n = Number(document.getElementById("dbg_sum_inp").value);
//     if (!Number.isFinite(n) || n <= 0) {
//         document.getElementById("dbg_sum_out").className = "alert alert-danger
//         mb-0";
//         document.getElementById("dbg_sum_out").textContent = "❌ Geef een
//         positief getal";
//         return;
//     }
//     const res = sumRange(n); // Step into hier
//     document.getElementById("dbg_sum_out").className = "alert alert-success mb0";
//     document.getElementById("dbg_sum_out").textContent = ` Som = ${res}`;
// }
// document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById("dbg_sum_btn")?.addEventListener("click",
//         handleSum);
// });
