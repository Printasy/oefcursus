import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
document.addEventListener('DOMContentLoaded', () => {

    const btn = document.getElementById('btnTest')
    const out = document.getElementById('out')

    const btnNaam = document.getElementById('btnNaam')
    const inpNaam = document.getElementById('inpNaam')
    const outpNaam = document.getElementById('outpNaam')

    btn.addEventListener('click', () => {
        out.className = 'alert alert-success mt-3 mb-0'
        out.textContent = ' Alles werkt. Klaar voor de oefeningen!'
    })

    btnNaam.addEventListener('click', () => {
        outpNaam.className = 'alert alert-success mt-3 mb-0'
        outpNaam.textContent = `Welkom ${inpNaam.value}`
    })
})
// ----------------------
// Hoofdstuk 2: Functions
// ----------------------
// Pure function (berekening)
function maakGroet(naam) {
    return `Hallo ${naam}!`;
}
// Impure function (UI)
function handleGroetClick() {
    const naamInput = document.getElementById('fn_nameInput');
    const output = document.getElementById('fn_output');
    const naam = naamInput.value.trim();
    if (!naam) {
        output.className = "alert alert-warning mt-3 mb-0";
        output.textContent = "⚠️ Geef een naam in!";
        return;
    }
    const boodschap = maakGroet(naam);
    output.className = "alert alert-success mt-3 mb-0";
    output.textContent = boodschap;
}
// Event koppelen
document.addEventListener("DOMContentLoaded", () => {
    // document.getElementById('fn_btnGreet')
    //     ?.addEventListener("click", handleGroetClick);
    document.querySelector('#fn_btnGreet') ?.addEventListener("click", handleGroetClick);
});


// kwadraat berekenen



function handleKwadraat(){
    const inputGetal = document.getElementById('inputGetal');
    const toonKwadraat = document.getElementById('toonKwadraat');
    let kwadraat = 0;

    if (!Number(inputGetal)){
        kwadraat = inputGetal.value * inputGetal.value;
        toonKwadraat.textContent = kwadraat.toFixed(2);
        toonKwadraat.className = "alert alert-success";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#btnBereken') ?.addEventListener("click", handleKwadraat);
})

// ------------------------------
// Hoofdstuk 3: Function Scoping
// ------------------------------
function toonBericht() {
    const binnen = "Ik leef binnen de functie 👀";
    function inner() {
        return `Inner ziet: ${binnen}`;
    }
    return inner();
}
function handleScope() {
    const output = document.getElementById("sc_output");
// inner sees outer
    const bericht = toonBericht();
    output.className = "alert alert-success mb-0";
    output.textContent = bericht;
    try {
// ❌ buiten de functie proberen de variabele te gebruiken
        console.log(binnen);
    } catch (err) {
        console.warn("binnen is niet zichtbaar buiten de functie");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sc_btn")
        ?.addEventListener("click", handleScope);
});


// Mini opdracht "geheim bericht"
function leesBericht(){
    let secret = "Code unlocked";
    function leesSecret() {
        return secret;
    }
    return leesSecret();
}

function toonBericht2(){
    const secret_output = document.getElementById("secret_output")
    secret_output.textContent = leesBericht();
    secret_output.className = "alert alert-success mb-0";
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#secret_btn') ?.addEventListener("click", toonBericht2);
})
// ----------------------------------
// Hoofdstuk 4: Named Functions
// ----------------------------------
// Pure function
function bepaalKleurInfo(kleur) {
    const input = kleur.toLowerCase();
    if (input === "rood") return { text: "Je koos rood", color: "red" };
    if (input === "blauw") return { text: "Je koos blauw", color: "blue" };
    return { text: "Onbekende kleur", color: null };
}
// Impure function (DOM)
function toonKleur() {
    const inp = document.getElementById("nf_input");
    const out = document.getElementById("nf_text");
    const box = document.getElementById("nf_box");
    const waarde = inp.value.trim();
    if (!waarde) {
        out.className = "alert alert-warning mb-2";
        out.textContent = "⚠️ Geef een kleur in";
        box.style.background = "#f8f9fa";
        box.textContent = "Geen kleur";
        return;
    }
    const resultaat = bepaalKleurInfo(waarde);
    if (!resultaat.color) {
        out.className = "alert alert-danger mb-2";
        out.textContent = resultaat.text;
        box.style.background = "#f8f9fa";
        box.textContent = "Onbekend";
        return;
    }
    out.className = "alert alert-success mb-2";
    out.textContent = resultaat.text;
    box.style.background = resultaat.color;
    box.textContent = resultaat.color.toUpperCase();
}
// Event koppeling
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("nf_btn")
        ?.addEventListener("click", toonKleur);
});

// mini-oefening bij hoofdstuk 4 named functions :

function toonKeuze(){
    const fr_input = document.getElementById("fr_input");
    const fr_text = document.getElementById("fr_text");
    const fr_box = document.getElementById("fr_box");
    const fruit = fr_input.value.trim();

    if (!fruit){
        fr_text.textContent = "Geef een fruitsoort in";
        fr_text.className = "alert alert-danger";
        fr_box.textContent = "Onbekend fruitsoort"
    }
    switch (fruit) {
        case "appel":
            fr_text.textContent = "U koos een appel ";
            fr_text.className = "alert alert-success";
            fr_box.innerHTML = "&#127823"
            break;
        case "peer":
            fr_text.textContent = "U koos een peer ";
            fr_text.className = "alert alert-success";
            fr_box.innerHTML = "&#127824"
            break;
        case "appelsien":
            fr_text.textContent = "U koos een appelsien ";
            fr_text.className = "alert alert-success";
            fr_box.innerHTML = "&#127818"
            break;
    }
}


// Event koppeling
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("fr_btn")
        ?.addEventListener("click", toonKeuze);
});

// ----------------------------------
// Hoofdstuk 5: Template Literals
// ----------------------------------
// Pure function
function maakWelkomstZin(naam, leeftijd) {
    return `Welkom ${naam}! Jij bent ${leeftijd} jaar oud.`;
}
// UI handler
function toonWelkomstZin() {
    const naam = document.getElementById("tl_name").value.trim();
    const leeftijd = document.getElementById("tl_age").value.trim();
    const out = document.getElementById("tl_output");
    if (!naam || !leeftijd) {
        out.className = "alert alert-warning mb-0";
        out.textContent = `⚠️ Vul naam en leeftijd in`;
        return;
    }
    const tekst = maakWelkomstZin(naam, leeftijd);
    out.className = "alert alert-success mb-0";
    out.textContent = tekst;
}
// Event
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("tl_btn")
        ?.addEventListener("click", toonWelkomstZin);
});

// Hoofdstuk 5 : mini oefening

function toonProfielZin() {
    const pf_name = document.getElementById("pf_name");
    const pf_city = document.getElementById("pf_city");
    const pf_hobby = document.getElementById("pf_hobby");
    const profielZin = document.getElementById("pf_out");

    if (checkValid(pf_name.value) && checkValid(pf_city.value) && checkValid(pf_hobby.value)) {

        profielZin.innerHTML = `Hey, ik ben ${pf_name.value} uit ${pf_city.value}.<br>Mijn hobby is ${pf_hobby.value}.<br>Leuk je te ontmoeten!`;
        profielZin.className = "alert alert-success";

    } else {
        profielZin.innerHTML = "Vul alle velden in !";
        profielZin.className = "alert alert-warning";
    }
}
function checkValid(waarde){
    const invalid = false
    if (waarde !== "") {
        return true
    } else {
        return false
    }
}

// Event
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("pf_btn")
        ?.addEventListener("click", toonProfielZin);
});

// Hoofdstuk 6 arrowfuncties

const toonResultaat = () => {

    const af_nummer1 = document.getElementById("af_nummer1");
    const af_nummer2 = document.getElementById("af_nummer2");
    const af_out = document.getElementById("af_out");

    if (checkValid(af_nummer1.value) && checkValid(af_nummer2.value)) {
        af_out.textContent = Number(af_nummer1.value) + Number(af_nummer2.value);
        af_out.className = "alert alert-success";
    } else {
        af_out.textContent = "Vul beide velden in";
        af_out.className = "alert alert-warning";    };
}
// Event
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("af_btn")
        ?.addEventListener("click", toonResultaat);
});

// mini-opdracht arrow functies hoofdstuk 6
const isEven = () => {
    const ev_input = document.getElementById("ev_input")
    const ev_out = document.getElementById("ev_out")

    if (checkValid(ev_input.value)) {
        if (Number(ev_input.value) % 2 === 0){
            ev_out.textContent = `${ev_input.value} is een even getal`
            ev_out.className = "alert alert-success"
        } else {
            ev_out.textContent = `${ev_input.value} is een oneven getal`
            ev_out.className = "alert alert-primary"
        }
    } else {
        ev_out.textContent = "Geef een getal in"
        ev_out.className = "alert alert-warning"
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ev_btn")
        ?.addEventListener("click", isEven);
});

// Hoofdstuk 7 arrays
let list = [""];
let count = 0;
const voegNaamToe = () => {
    const arr_name = document.getElementById("arr_name");
    const arr_count = document.getElementById("arr_count");
    const arr_list = document.getElementById("arr_list");
    if (checkValid(arr_name.value)) {
        list = list + `<li class = "list-group-item"> ${arr_name.value} </li>`;
        count = count + 1;
        arr_list.innerHTML = list;
        arr_count.textContent = count;
        return;
    } else {
        alert ("Geef geldige naam in")
        return;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("arr_btn")
        ?.addEventListener("click", voegNaamToe);
});
// oefening bij hoofdstuk  7 arrays mini takenlijst

let taskList = [];
function makeTaskList(todo_list) {
    return todo_list.map(todo => `<li class="list-group-item"><div class="d-flex justify-content-between me-3"><div>${todo}</div><button type="button" class="btn btn-danger ">X</button></div></li>
`).join("");
}

function makeBadge(waarde){
    return `<span class="badge text-bg-secondary fs-6 "> Aantal taken : ${waarde}</span>`
}

function voegTaakToe() {

    const todo_input = document.getElementById("todo_input");
    const todo_count = document.getElementById("todo_count");
    const todo_list = document.getElementById("todo_list");
    let task = todo_input.value.trim();

    let taskCounter = 0;
        if (!task){
        alert("Voer een taak in")
        return;
    } else {
        taskList.push(task);
        taskCounter = taskList.length;
        todo_list.innerHTML = makeTaskList(taskList);
        todo_count.innerHTML = makeBadge(taskCounter);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("todo_btn")
        ?.addEventListener("click", voegTaakToe);
});

// ----------------------------------
// Hoofdstuk 8: Root Nodes
// ----------------------------------

function plaatsBerichtInBody() {
// selecteer de body
    const bodyNode = document.body;
// maak een nieuw element
    const p = document.createElement("p");
    p.textContent = "Bericht toegevoegd via root node! ";
    p.className = "text-center mt-2 text-success fw-bold";
// voeg toe aan body
    bodyNode.appendChild(p);
}
function veranderAchtergrond() {
    const bodyNode = document.documentElement; // <html>
// lichte highlight
    bodyNode.style.background = "#f0f0f0";
}
function toonFeedback(tekst) {
    const out = document.getElementById("rn_output");
    out.className = "alert alert-success mb-0";
    out.textContent = tekst;
}
// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("rn_btnMessage")
        ?.addEventListener("click", () => {
            plaatsBerichtInBody();
            toonFeedback("Bericht toegevoegd aan body ");
        });
    document.getElementById("rn_btnColor")
        ?.addEventListener("click", () => {
            veranderAchtergrond();
            toonFeedback("Achtergrond aangepast via <html> node 🎨");
        });
});

// Oefening light mode - dark mode

function toDarkMode(){
    console.warn("to dark mode");
    const dm_on = document.getElementById("dm_on");
    const dm_status = document.getElementById("dm_status");
    document.body.style.background = "#222";
    document.body.style.color = "#fff";
    dm_status.textContent = "Dark mode geactiveerd"
    return;
}
function toLightMode(){
    console.error("to light mode");
    const dm_on = document.getElementById("dm_off");
    const dm_status = document.getElementById("dm_status");
    document.body.style.background = "#fff";
    document.body.style.color = "#222";
    dm_status.textContent = "Light mode geactiveerd"
    return;
}
// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dm_on")
        ?.addEventListener("click", () => {
            toDarkMode();
        });
    document.getElementById("dm_off")
        ?.addEventListener("click", () => {
            toLightMode();
        });
});

// ----------------------------------
// Hoofdstuk 9: Output Methodes
// ----------------------------------
// Pure tekstfunctie
function maakBericht() {
    return "Hello output wereld! 🌍";
}
// Impure UI output
function toonInUI(msg) {
    const out = document.getElementById("om_output");
    out.className = "alert alert-success mb-0";
    out.textContent = msg;
}
// Event handlers
function logNaarConsole() {
    console.log(maakBericht());
}
function toonAlert() {
    alert(maakBericht());
}
function toonOutputUI() {
    toonInUI(maakBericht());
}
// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("om_console")?.addEventListener("click",
        logNaarConsole);
    document.getElementById("om_alert")?.addEventListener("click", toonAlert);
    document.getElementById("om_ui")?.addEventListener("click", toonOutputUI);
});

// miniopdracht output naar console, alert & bootstrap alert

function toonResultaten2() {
    const first = document.getElementById("on_first");
    const last = document.getElementById("on_last");
    const out = document.getElementById("on_out");

    const firstname = first.value.trim();
    const lastname = last.value.trim();

    if (firstname && !lastname) {
        out.textContent = "Vul de velden beide in";
        out.className = "alert alert-warning"
    } else {
        console.log (`voornaam: ${firstname}, achternaam: ${lastname}`);
        alert (`Hallo ${firstname} ${lastname}`);
        out.textContent = `Bootstrap alert voor ${firstname} ${lastname}`
        out.className = "alert alert-info"
    }
}


// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("on_btn")?.addEventListener("click",
        toonResultaten2);

});

// ----------------------------------
// Hoofdstuk 10: document.write()
// ----------------------------------
function demonstreerWrite() {
// Waarschuwing tonen
    alert("Let op: de pagina zal overschreven worden!");
// Dit overschrijft alle HTML
    document.write("<h1>De hele pagina is vervangen 😵</h1>");
    document.write("<p>Daarom gebruiken we dit niet meer.</p>");
    document.writeln("<p>Gebruik DOM methods en Bootstrap.</p>");
}
// Event
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dw_btn")
        ?.addEventListener("click", demonstreerWrite);
});

// Oefening bij hoofdstuk 10

function oudOutput() {
    alert("Nu breekt de pagina 😵");
    document.write("😵 Oeps, document.write overschreef alles!");
}
function nieuwOutput() {const box = document.getElementById("ow_out");
    box.className = "alert alert-success mb-0";
    box.textContent = " Moderne DOM output is beter!";
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ow_old")?.addEventListener("click", oudOutput);
    document.getElementById("ow_new")?.addEventListener("click", nieuwOutput);
});

// -------------------------------------------------
// Hoofdstuk 11: innerHTML vs textContent vs innerText
// -------------------------------------------------
function toonOutputTypes() {
    const input = document.getElementById("ht_input").value;
    document.getElementById("ht_textContent").textContent = input;
    document.getElementById("ht_innerText").innerText = input;
    document.getElementById("ht_innerHTML").innerHTML = input;
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ht_btn_show")
        ?.addEventListener("click", toonOutputTypes);
});
function toonVeilig() {
    const val = document.getElementById("safe_input").value;
    const out = document.getElementById("safe_output");
    out.className = "alert alert-success mb-0";
    out.textContent = val;
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("safe_btn")
        ?.addEventListener("click", toonVeilig);
});


// --------------------------------------
// Hoofdstuk 12: DOM Selectors, oefening filteren namen
//


// hieronder functie met for.each

// function filterNamen() {
//     const value = document.getElementById("sel_input").value.toLowerCase();
//     const items = document.querySelectorAll("li"); // NodeList
//     items.forEach(item => {
//         const text = item.textContent.toLowerCase();
//         item.style.display = text.includes(value) ? "block" : "none";
//     });
// }

// hieronder functie met map; daarbij dienen we eerst zorgen dat items een array bevat ipv een nodelist.

function filterNamen() {
    const value = document.getElementById("sel_input").value.toLowerCase();

    // NodeList → array bij declaratie
    const items = Array.from(document.querySelectorAll("li"));

    items.map(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(value) ? "block" : "none";
        return item; // map verwacht een return
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sel_input")
        ?.addEventListener("keyup", filterNamen);
});


// Mini opdracht : maak een kleurenswitcher

function changeColor(kleur){

    const boxes = document.querySelectorAll(".kleur-box");
    boxes.forEach(box => {
            switch(kleur){
                case "rood":
                    box.style.background = "rgb(256,0,0)";
                    box.style.color = "#fff"
                    break;
                case "blauw":
                    box.style.background = "rgb(0,0,256)";
                    box.style.color = "#fff"
                    break;
                case "groen":
                    box.style.background = "rgb(0,256,0)"
                    box.style.color = "#000"
                    break
            }
        }
    )
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ks_red")
        ?.addEventListener("click", () => changeColor("rood"));
    document.getElementById("ks_blue")
        ?.addEventListener("click", () => changeColor("blauw"));
    document.getElementById("ks_green")
        ?.addEventListener("click", () => changeColor("groen"));
});

// --------------------------------------
// Hoofdstuk 13: focus(), blur(), children
// --------------------------------------
function updateChildCount() {
    const container = document.querySelector(".card-body");
    const count = container.children.length;
    document.getElementById("d13_count").textContent = count;
}
// Event binding
document.addEventListener("DOMContentLoaded", () => {
    updateChildCount();
    document.getElementById("d13_focusName")
        ?.addEventListener("click", () => {
            document.getElementById("d13_name").focus();
        });
    document.getElementById("d13_focusEmail")
        ?.addEventListener("click", () => {
            document.getElementById("d13_email").focus();
        });
});

// mini opdracht focus game

function updateFTCount() {
    const body = document.getElementById("ft_body");
    document.getElementById("ft_count").textContent = body.children.length;
}
// Event binding
document.addEventListener("DOMContentLoaded", () => {
    const inp = document.getElementById("ft_input");
    updateFTCount();
    inp.addEventListener("focus", () => {
        inp.style.border = "2px solid blue";
    });
    inp.addEventListener("blur", () => {
        inp.style.border = "1px solid #ccc";
    });
    document.getElementById("ft_btn")?.addEventListener("click", () => {
        inp.focus();
    });
});

// --------------------------------------
// Hoofdstuk 14: classList
// --------------------------------------

function toggleHighLight(){
    const toggleboxes = document.querySelectorAll (".cl-box");
    toggleboxes.forEach(togglebox => {
        togglebox.classList.toggle("bg-dark");
        togglebox.classList.toggle("text-white")
    })
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cl_toggle")
        ?.addEventListener("click", toggleHighLight);
});

// Mini opdracht dark-mode via toggle functie

function toggleMode(){
    const tm_body = document.body;
    const btn = document.getElementById("dm2_btn");
    const status = document.getElementById("dm2_status");

    const isDark = tm_body.classList.toggle ("dark-mode");

    if (isDark) {
        btn.textContent = "Light mode ☀️";
        status.className = "alert alert-success mb-0";
        status.textContent = "Dark mode actief 🌙";
    } else {
        btn.textContent = "Dark mode 🌙";
        status.className = "alert alert-secondary mb-0";
        status.textContent = "Light mode actief ☀️";
    }
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dm2_btn")
        ?.addEventListener("click", toggleMode);
});
// --------------------------------------
// Hoofdstuk 15: Events & Formulieren
// --------------------------------------
function formSubmit(event){
    event.preventDefault()
    const ev_status = document.getElementById("ev_status");
    const ev_name = document.getElementById("ev_name");

    name = ev_name.value.trim();

    if (name===""){
        ev_status.textContent = "Vul het naamveld in ! Het formulier werd niet verstuurd !"
        ev_status.className = "alert alert-warning  mt-3 mb-0"
    } else {
        ev_status.textContent = "Formulier verzonden !"
        ev_status.className = "alert alert-success  mt-3 mb-0"
    }

}

function formPreview() {
    const ev_preview = document.getElementById("ev_preview");
    const ev_name = document.getElementById("ev_name");
    if (ev_name.value!==""){
        ev_preview.textContent = ev_name.value;
    } else {
        ev_preview.textContent = "Wacht op input..."
    }

}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ev_form")?.addEventListener("submit", formSubmit);
    document.getElementById("ev_name")?.addEventListener("keyup", formPreview);
});


// versie email checker cursus

function isValidEmail(email) {
    return email.includes("@") && email.includes(".") && !email.includes(" ");
}
function updateEmailPreview() {
    const value = document.getElementById("em_input").value;
    const preview = document.getElementById("em_preview");
    if (isValidEmail(value)) {
        preview.className = "alert alert-success mb-2";
        preview.textContent = " Geldig emailadres";
    } else {
        preview.className = "alert alert-warning mb-2";
        preview.textContent = "⚠️ Ongeldig emailadres";
    }
}
function handleEmailSubmit(e) {
    e.preventDefault();
    const val = document.getElementById("em_input").value;
    const status = document.getElementById("em_status");
    if (!isValidEmail(val)) {
        status.className = "alert alert-danger mb-0 mt-3";
        status.textContent = "❌ Emailadres ongeldig";
        return;
    }
    status.className = "alert alert-success mb-0 mt-3";
    status.textContent = ` Email geaccepteerd: ${val}`;
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("em_input")?.addEventListener("input",
        updateEmailPreview);
    document.getElementById("em_form")?.addEventListener("submit",
        handleEmailSubmit);
});

