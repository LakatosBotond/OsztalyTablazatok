const tanulok = [
    { nev: "Kovács Anna",  szam: 9,  betu: "A", atlag: 4.8 },
    { nev: "Nagy Péter",   szam: 10, betu: "B", atlag: 4.2 },
    { nev: "Szabó Eszter", szam: 11, betu: "C", atlag: 3.9 },
    { nev: "Tóth Bence",   szam: 12, betu: "A", atlag: 4.5 },
    { nev: "Horváth Réka", szam: 9,  betu: "B", atlag: 5.0 }
];
const OSZTALYOK = ["A", "B", "C", "D", "E"];

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

function hozzaad() {
    const nev = document.getElementById("nev").value.trim();
    const szam = Number(document.getElementById("OsztalySzam").value);
    const betu = document.getElementById("OsztalyBetu").value.toUpperCase();
    const atlag = Number(document.getElementById("atlag").value);
    try {

        if (nev === "" || !Number.isNaN(Number(nev))) {
            throw new Error("Érvényes nevet adj meg!");
        } else if (szam < 1 || szam > 12) {
            throw new Error("Az osztály számának 1 és 12 között kell lennie!");
        } else if (!OSZTALYOK.includes(betu)) {
            throw new Error("Az osztály betűje csak A, B, C, D vagy E lehet!");
        } else if (atlag < 1 || atlag > 5) {
            throw new Error("Az átlagnak 1 és 5 között kell lennie!");
        }

        tanulok.push({ nev, szam, betu, atlag });
        if (csakJeles && atlag < 4.5) {
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
    const nev = document.getElementById("ujNev").value.trim();
    const szam = Number(document.getElementById("ujSzam").value);
    const betu = document.getElementById("ujBetu").value.toUpperCase();
    const atlag = Number(document.getElementById("ujAtlag").value);
    try{
    
        if (nev === "" || !Number.isNaN(Number(nev))) {
            throw new Error("Érvényes nevet adj meg!");
        } else if (szam < 1 || szam > 12) {
            throw new Error("Az osztály számának 1 és 12 között kell lennie!");
        } else if (!OSZTALYOK.includes(betu)) {
            throw new Error("Az osztály betűje csak A, B, C, D vagy E lehet!");
        } else if (atlag < 1 || atlag > 5) {
            throw new Error("Az átlagnak 1 és 5 között kell lennie!");
        }
    
        tanulok[i] = { nev, szam, betu, atlag };
        szerkesztett = -1;
        if (csakJeles && atlag < 4.5) {
           csakJeles = false;
           gombokFrissit();
       }
        frissit();
    }
    catch (e) {
        alert(e.message);
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
                    <td>
                        <input id="ujSzam" type="number" value="${t.szam}">
                        <input id="ujBetu" maxlength="1" value="${t.betu}">
                    </td>
                    <td><input id="ujAtlag" type="number" step="0.1" value="${t.atlag}"></td>
                    <td><button onclick="ment(${i})">Mentés</button></td>
                </tr>`;
        } else {
            html += `
                <tr class="${osztaly}">
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
                <td>${t.szam}.${t.betu}</td>
                <td>${t.atlag}</td>
            </tr>`).join("")
        : '<tr><td colspan="3">Nincs találat.</td></tr>';
}


function osztalyStatisztika() {
    let html = "";

    for (const betu of OSZTALYOK) {
        const osztalyTanulok = tanulok.filter(t => t.betu === betu);
        let atlagSzoveg = "-";

        if (osztalyTanulok.length > 0) {
            let osszeg = 0;
            for (const t of osztalyTanulok) {
                osszeg += t.atlag;
            }
            atlagSzoveg = (osszeg / osztalyTanulok.length).toFixed(2);
        }

        html += `<p class="stats">${betu} osztály: ${atlagSzoveg}</p>`;
    }

    document.getElementById("osztalyAtlagok").innerHTML = html;
}

kereses.addEventListener("input", frissitKeresest);
frissit();