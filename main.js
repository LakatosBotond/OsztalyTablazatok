const tanulok = [
    { nev: "Kovács Anna",    osztaly: "9.A",  atlag: 4.8 },
    { nev: "Nagy Péter",     osztaly: "10.B", atlag: 4.2 },
    { nev: "Szabó Eszter",   osztaly: "11.C", atlag: 3.9 },
    { nev: "Tóth Bence",     osztaly: "12.A", atlag: 4.5 },
    { nev: "Horváth Réka",   osztaly: "9.B",  atlag: 5.0 }
];


const tbody = document.getElementById("tanuloTabla");

function megjelenitSor(tanulo) {
    const sor = document.createElement("tr");

    sor.innerHTML = `
        <td>${tanulo.nev}</td>
        <td>${tanulo.osztaly}</td>
        <td class="atlag">${tanulo.atlag}</td>
        <td><button type="button" class="modositas-gomb">Módosítás</button></td>
    `;

    const modositasGomb = sor.cells[3].getElementsByTagName("button")[0];

    modositasGomb.onclick = function () {
        const osztalyReszek = tanulo.osztaly.split(".");
        sor.cells[1].innerHTML = `
            <div class="osztaly-szerkeszto">
                <input type="number" aria-label="Osztály száma" min="1" max="12" value="${osztalyReszek[0]}" required>
                <input type="text" aria-label="Osztály betűjele" maxlength="1" value="${osztalyReszek[1]}" required>
            </div>
        `;
        sor.cells[2].innerHTML = `<input type="number" aria-label="Átlag" min="1" max="5" step="0.1" value="${tanulo.atlag}" required>`;

        const osztalyMezok = sor.cells[1].getElementsByTagName("input");
        const atlagMezo = sor.cells[2].getElementsByTagName("input")[0];

        osztalyMezok[1].oninput = function () {
            this.value = this.value.toUpperCase();
            if (this.value < "A" || this.value > "Z") {
                this.value = "";
            }
        };

        modositasGomb.textContent = "Mentés";
        modositasGomb.onclick = function () {
            const osztalySzam = Number(osztalyMezok[0].value);
            const osztalyBetu = osztalyMezok[1].value;
            const atlag = Number(atlagMezo.value);

            if (osztalyMezok[0].value === "" || osztalySzam < 1 || osztalySzam > 12 ||
                osztalyBetu.length !== 1 || osztalyBetu < "A" || osztalyBetu > "Z" ||
                atlagMezo.value === "" || atlag < 1 || atlag > 5) {
                alert("Adj meg érvényes osztályt és átlagot!");
                return;
            }

            tanulo.osztaly = `${osztalySzam}.${osztalyBetu}`;
            tanulo.atlag = atlag;
            updateTabla();
        };

        osztalyMezok[0].focus();
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
