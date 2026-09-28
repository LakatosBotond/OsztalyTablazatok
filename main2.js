const tanulok = [
    { nev: "Kovács Anna",    osztaly: "9.A",  atlag: 4.8 },
    { nev: "Nagy Péter",     osztaly: "10.B", atlag: 4.2 },
    { nev: "Szabó Eszter",   osztaly: "11.C", atlag: 3.9 },
    { nev: "Tóth Bence",     osztaly: "12.A", atlag: 4.5 },
    { nev: "Horváth Réka",   osztaly: "9.B",  atlag: 5.0 }
];

const tbody = document.getElementById("tanuloTabla");

function megjelenit() {
    tbody.innerHTML = "";

    if (tanulok.length === 0) {
        const sor = document.createElement("tr");
        sor.innerHTML = '<td class="ures" colspan="4">Nincs megjeleníthető tanuló.</td>';
        tbody.appendChild(sor);
        return;
    }

    tanulok.forEach((tanulo, index) => {
        const sor = document.createElement("tr");

        sor.innerHTML = `
            <td>${tanulo.nev}</td>
            <td>${tanulo.osztaly}</td>
            <td class="atlag">${tanulo.atlag.toFixed(1)}</td>
            <td><button type="button" data-index="${index}">Törlés</button></td>
        `;

        tbody.appendChild(sor);
    });
}
