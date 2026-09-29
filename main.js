const tanulok = [
    { nev: "Kovács Anna",    osztaly: "9.A",  atlag: 4.8 },
    { nev: "Nagy Péter",     osztaly: "10.B", atlag: 4.2 },
    { nev: "Szabó Eszter",   osztaly: "11.C", atlag: 3.9 },
    { nev: "Tóth Bence",     osztaly: "12.A", atlag: 4.5 },
    { nev: "Horváth Réka",   osztaly: "9.B",  atlag: 5.0 }
];

const tbody = document.getElementById("tanuloTabla");
const sablon = document.getElementById("sorSablon");

function megjelenitSor(tanulo) {
    const sor = document.importNode(sablon.content, true).firstElementChild;

    const osztalySzamMezo = sor.querySelector(".osztaly-szam");
    const osztalyBetuMezo = sor.querySelector(".osztaly-betu");
    const atlagMezo = sor.querySelector(".atlag-mezo");
    const nevMezo = sor.querySelector(".nev-mezo");

    sor.querySelector(".nev-szoveg").textContent = tanulo.nev;
    sor.querySelector(".osztaly-szoveg").textContent = tanulo.osztaly;
    sor.querySelector(".atlag-szoveg").textContent = tanulo.atlag;

    osztalyBetuMezo.oninput = function () {
        this.value = this.value.toUpperCase();
        if (this.value < "A" || this.value > "Z") {
            this.value = "";
        }
    };

    // Módosítás gomb
    sor.querySelector(".modositas").onclick = function () {
        const osztalyReszek = tanulo.osztaly.split(".");
        nevMezo.value = tanulo.nev;
        osztalySzamMezo.value = osztalyReszek[0];
        osztalyBetuMezo.value = osztalyReszek[1];
        atlagMezo.value = tanulo.atlag;

        sor.classList.add("szerkesztes");
        nevMezo.focus();
    };

    // Mentés gomb
    sor.querySelector(".mentes").onclick = function () {
        const osztalySzam = Number(osztalySzamMezo.value);
        const osztalyBetu = osztalyBetuMezo.value;
        const atlag = Number(atlagMezo.value);
        const nev = nevMezo.value.trim();

        if (nev === "" || osztalySzamMezo.value === "" || osztalySzam < 1 || osztalySzam > 12 ||
            osztalyBetu.length !== 1 || osztalyBetu < "A" || osztalyBetu > "Z" ||
            atlagMezo.value === "" || atlag < 1 || atlag > 5) {
            alert("Adj meg érvényes osztályt és átlagot!");
            return;
        }

    tanulo.nev = nev;
        tanulo.osztaly = `${osztalySzam}.${osztalyBetu}`;
        tanulo.atlag = atlag;
        updateTabla();
    };

    return sor;
}

function adatRogzitese() {
    const nev = document.getElementById("nev").value;
    const osztaly = document.getElementById("OsztalySzam").value;
    const osztalyBetu = document.getElementById("OsztalyBetu").value;
    const atlag = parseFloat(document.getElementById("atlag").value);

    if (nev === "" || osztaly === "" || osztalyBetu === "" || isNaN(atlag)) {
        alert("Tölts ki minden mezőt!");
        return;
    }

    tanulok.push({ nev, osztaly: `${osztaly}.${osztalyBetu}`, atlag });

    updateTabla();
}

function updateTabla() {
    tbody.innerHTML = "";
    tanulok.forEach((tanulo) => {
        tbody.appendChild(megjelenitSor(tanulo));
    });
}

updateTabla();