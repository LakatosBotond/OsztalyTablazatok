const tanulok = [
    { nev: "Kovács Anna",  szam: 9,  betu: "A", atlag: 4.8 },
    { nev: "Nagy Péter",   szam: 10, betu: "B", atlag: 4.2 },
    { nev: "Szabó Eszter", szam: 11, betu: "C", atlag: 3.9 },
    { nev: "Tóth Bence",   szam: 12, betu: "A", atlag: 4.5 },
    { nev: "Horváth Réka", szam: 9,  betu: "B", atlag: 5.0 }
];

const tbody = document.getElementById("tanuloTabla");
const kereses = document.getElementById("tanuloKereses");
const keresesiEredmenyTabla = document.getElementById("keresesiEredmenyTabla");
const keresesiTalalatok = document.getElementById("keresesiTalalatok");
let szerkesztett = -1; // melyik sor van szerkesztés alatt (-1 = egyik sem)

function keresesiForma(szoveg) {
    return szoveg.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("hu");
}

function ervenyes(nev, szam, betu, atlag) {
    return nev !== ""
        && szam >= 1 && szam <= 12
        && /^[A-Z]$/.test(betu)
        && atlag >= 1 && atlag <= 5;
}

function hozzaad() {
    const nev = document.getElementById("nev").value.trim();
    const szam = Number(document.getElementById("OsztalySzam").value);
    const betu = document.getElementById("OsztalyBetu").value.toUpperCase();
    const atlag = Number(document.getElementById("atlag").value);

    if (!ervenyes(nev, szam, betu, atlag)) {
        alert("Tölts ki minden mezőt helyesen!");
        return;
    }

    tanulok.push({ nev, szam, betu, atlag });
    frissit();
}

function szerkeszt(i) {
    szerkesztett = i;
    frissit();
}

function ment(i) {
    const nev = document.getElementById("ujNev").value.trim();
    const szam = Number(document.getElementById("ujSzam").value);
    const betu = document.getElementById("ujBetu").value.toUpperCase();
    const atlag = Number(document.getElementById("ujAtlag").value);

    if (!ervenyes(nev, szam, betu, atlag)) {
        alert("Adj meg érvényes adatokat!");
        return;
    }

    tanulok[i] = { nev, szam, betu, atlag };
    szerkesztett = -1;
    frissit();
}

function torol(i) {
    if (confirm("Biztosan törlöd ezt a tanulót: " + tanulok[i].nev + "?")) {
        tanulok.splice(i, 1);
        frissit();
    }
}

function statisztika() {
    const darab = tanulok.length;

    document.getElementById("tanulokSzama").textContent =
        "Tanulók száma: " + darab;

    if (darab === 0) {
        document.getElementById("OsszAtlag").textContent = "Összátlag: -";
        document.getElementById("legjobbTanulo").textContent = "Legjobb tanuló: -";
        return;
    }

    let osszeg = 0;

    for (let i = 0; i < tanulok.length; i++) {
        osszeg += tanulok[i].atlag;
    }
    
    const atlag = osszeg / darab;

    let legjobb = tanulok[0];

    for (let i = 1; i < tanulok.length; i++) {
        if (tanulok[i].atlag > legjobb.atlag) {
            legjobb = tanulok[i];
        }
    }

    document.getElementById("OsszAtlag").textContent =
        "Összátlag: " + atlag.toFixed(2);

    document.getElementById("legjobbTanulo").textContent =
        "Legjobb tanuló: " + legjobb.nev + " (" + legjobb.atlag + ")";
}

function frissit() {
    let html = "";

    for (let i = 0; i < tanulok.length; i++) {
        const t = tanulok[i];

        if (i === szerkesztett) {
            html += `
                <tr>
                    <td><input id="ujNev" value="${t.nev}"></td>
                    <td>
                        <input id="ujSzam" type="number" value="${t.szam}">
                        <input id="ujBetu" maxlength="1" value="${t.betu}">
                    </td>
                    <td><input id="ujAtlag" type="number" step="0.1" value="${t.atlag}"></td>
                    <td><button onclick="ment(${i})">Mentés</button></td>
                </tr>`;
        } else {
            html += `
                <tr>
                    <td>${t.nev}</td>
                    <td>${t.szam}.${t.betu}</td>
                    <td>${t.atlag}</td>
                    <td>
                        <button onclick="szerkeszt(${i})">Módosítás</button>
                        <button class="torles" onclick="torol(${i})">X</button>
                    </td>
                </tr>`;
        }
    }

    tbody.innerHTML = html;

    statisztika();
    frissitKeresest();
}

function frissitKeresest() {
    const keresettNev = keresesiForma(kereses.value.trim());
    keresesiEredmenyTabla.hidden = keresettNev === "";

    if (keresettNev === "") {
        keresesiTalalatok.innerHTML = "";
        return;
    }

    const talalatok = tanulok.filter(t => keresesiForma(t.nev).includes(keresettNev));
    keresesiTalalatok.innerHTML = talalatok.length
        ? talalatok.map(t => `
            <tr>
                <td>${t.nev}</td>
                <td>${t.szam}.${t.betu}</td>
                <td>${t.atlag}</td>
            </tr>`).join("")
        : '<tr><td colspan="3">Nincs találat.</td></tr>';
}

kereses.addEventListener("input", frissitKeresest);
frissit();