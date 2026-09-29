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
        <td>${tanulo.atlag}</td>
        <td><button type="button" class="modositas-gomb">Módosítás</button></td>
    `;

    sor.querySelector(".modositas-gomb").addEventListener("click", () => {
        sor.cells[1].innerHTML = `<input type="text" aria-label="Osztály" value="${tanulo.osztaly}" required>`;
        sor.cells[2].innerHTML = `<input type="number" aria-label="Átlag" min="1" max="5" step="0.1" value="${tanulo.atlag.toFixed(1)}">`;
        const osztalyInput = sor.cells[1].querySelector("input");
        const atlagInput = sor.cells[2].querySelector("input");
        const mentesGomb = sor.cells[3].querySelector("button");

        mentesGomb.textContent = "Mentés";
        mentesGomb.addEventListener("click", () => {
            if (!osztalyInput.reportValidity() || !atlagInput.reportValidity()) {
                return;
            }

            tanulo.osztaly = osztalyInput.value.trim();
            tanulo.atlag = Number(atlagInput.value);
            const frissSor = megjelenitSor(tanulo);
            sor.replaceWith(frissSor);
        });

        mentesGomb.classList.add("mentes-gomb");
        osztalyInput.focus();
    }, { once: true });

    return sor;
}

tanulok.forEach((tanulo) => {
    const sor = megjelenitSor(tanulo);
    tbody.appendChild(sor);
});


function updateTabla() {
    tbody.innerHTML = "";
    tanulok.forEach((tanulo) => {
        const sor = document.createElement("tr");
        sor.innerHTML = `
            <td>${tanulo.nev}</td>
            <td>${tanulo.osztaly}</td>
            <td class="atlag">${tanulo.atlag}</td>
            <td></td>
        `;
        tbody.appendChild(sor);
    });
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


    
    console.log(tanulok);
    updateTabla();
}


