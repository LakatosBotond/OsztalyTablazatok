const tanulok = [
    { nev: "Kovács Anna",  osztaly: "9.A",  atlag: 4.8 },
    { nev: "Nagy Péter",   osztaly: "10.B", atlag: 4.2 },
    { nev: "Szabó Eszter", osztaly: "11.C", atlag: 3.9 },
    { nev: "Tóth Bence",   osztaly: "12.A", atlag: 4.5 },
    { nev: "Horváth Réka", osztaly: "9.B",  atlag: 5.0 }
];

const tbody = document.getElementById("tanuloTabla");
const kereses = document.getElementById("tanuloKereses");
const keresesiEredmenyTabla = document.getElementById("keresesiEredmenyTabla");
const keresesiTalalatok = document.getElementById("keresesiTalalatok");
let szerkesztett = -1; 
let csakJeles = false;
let kiemeles = false;

function keresesiForma(szoveg) {
    return szoveg.toLocaleLowerCase("hu");
}

function ellenoriz(nev, osztaly, atlag) {
    nev = nev.trim();
    osztaly = osztaly.trim().toUpperCase();

    if (!/^[\p{L} -]+$/u.test(nev)) {
        throw new Error("Érvényes nevet adj meg: csak betűket és opcionálisan szóközt használj!");
    } else if (!/^([1-9]|1[0-2])\.[A-Z]$/.test(osztaly)) {
        throw new Error("Az osztály formátuma: szám (1-12), pont, betű (A-Z), pl. 12.D!");
    } else if (atlag < 1 || atlag > 5) {
        throw new Error("Az átlagnak 1 és 5 között kell lennie!");
    }

    return { nev, osztaly, atlag };
}

function hozzaad() {
    try {
        const tanulo = ellenoriz(
            document.getElementById("nev").value,
            document.getElementById("Osztaly").value,
            Number(document.getElementById("atlag").value)
        );

        tanulok.push(tanulo);
        if (csakJeles && tanulo.atlag < 4.5) {
            csakJeles = false;
            gombokFrissit();
        }
        frissit();
    } catch (hiba) {
        alert(hiba.message);
    }
}

function szerkeszt(i) {
    szerkesztett = i;
    frissit();
}

function ment(i) {
    try {
        const tanulo = ellenoriz(
            document.getElementById("ujNev").value,
            document.getElementById("ujOsztaly").value,
            Number(document.getElementById("ujAtlag").value)
        );

        tanulok[i] = tanulo;
        szerkesztett = -1;
        if (csakJeles && tanulo.atlag < 4.5) {
            csakJeles = false;
            gombokFrissit();
        }
        frissit();
    } catch (hiba) {
        alert(hiba.message);
    }
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

function jegyStatisztika() {
    let jeles = 0;
    let jo = 0;
    let kozepes = 0;
    let elegseges = 0;
    let elegtelen = 0;

    for (const t of tanulok) {
        if (t.atlag >= 4.5) {
            jeles++;
        } else if (t.atlag >= 3.5) {
            jo++;
        } else if (t.atlag >= 2.5) {
            kozepes++;
        } else if (t.atlag >= 2) {
            elegseges++;
        } else {
            elegtelen++;
        }
    }

    document.getElementById("jeles").textContent = "Jeles: " + jeles + " fő";
    document.getElementById("jo").textContent = "Jó: " + jo + " fő";
    document.getElementById("kozepes").textContent = "Közepes: " + kozepes + " fő";
    document.getElementById("elegseges").textContent = "Elégséges: " + elegseges + " fő";
    document.getElementById("elegtelen").textContent = "Elégtelen: " + elegtelen + " fő";
}

function rendezAtlag() {
    tanulok.sort((a, b) => b.atlag - a.atlag);
    szerkesztett = -1;
    frissit();
}

function rendezNev() {
    tanulok.sort((a, b) => a.nev.localeCompare(b.nev, "hu"));
    szerkesztett = -1;
    frissit();
}

function gombokFrissit() {
    const szuroGomb = document.getElementById("szuroGomb");
    const kiemelesGomb = document.getElementById("kiemelesGomb");

    szuroGomb.classList.toggle("aktiv", csakJeles);
    kiemelesGomb.classList.toggle("aktiv", kiemeles);

    if (csakJeles) {
        szuroGomb.textContent = "Mindenki megjelenítése";
    } else {
        szuroGomb.textContent = "Csak a jeles tanulók";
    }
}

function szuroValt() {
    csakJeles = !csakJeles;
    szerkesztett = -1;
    gombokFrissit();
    frissit();
}

function kiemelesValt() {
    kiemeles = !kiemeles;
    gombokFrissit();
    frissit();
}

function frissit() {
    let html = "";

    for (let i = 0; i < tanulok.length; i++) {
        const t = tanulok[i];

        if (csakJeles && t.atlag < 4.5) {
            continue;
        }

        let osztaly = "";
        if (kiemeles) {
            if (t.atlag >= 4.5) {
                osztaly = "jeles";
            } else if (t.atlag < 2) {
                osztaly = "elegtelen";
            }
        }

        if (i === szerkesztett) {
            html += `
                <tr class="${osztaly}">
                    <td><input id="ujNev" value="${t.nev}"></td>
                    <td><input id="ujOsztaly" maxlength="4" value="${t.osztaly}"></td>
                    <td><input id="ujAtlag" type="number" step="0.1" value="${t.atlag}"></td>
                    <td><button onclick="ment(${i})">Mentés</button></td>
                </tr>`;
        } else {
            html += `
                <tr class="${osztaly}">
                    <td>${t.nev}</td>
                    <td>${t.osztaly}</td>
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
    jegyStatisztika();
    osztalyStatisztika();
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
                <td>${t.osztaly}</td>
                <td>${t.atlag}</td>
            </tr>`).join("")
        : '<tr><td colspan="3">Nincs találat.</td></tr>';
}

function osztalyStatisztika() {
    let html = "";

    const betuk = [...new Set(tanulok.map(t => t.osztaly.split(".")[1]))].sort();

    for (const betu of betuk) {
        const osztalyTanulok = tanulok.filter(t => t.osztaly.split(".")[1] === betu);

        let osszeg = 0;
        for (const t of osztalyTanulok) {
            osszeg += t.atlag;
        }
        const atlagSzoveg = (osszeg / osztalyTanulok.length).toFixed(2);

        html += `<p class="stats">${betu} osztály: ${atlagSzoveg}</p>`;
    }

    document.getElementById("osztalyAtlagok").innerHTML = html;
}

kereses.addEventListener("input", frissitKeresest);
frissit();