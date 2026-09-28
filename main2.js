const tanulok = [
    { nev: "Kovács Anna",    osztaly: "9.A",  atlag: 4.8 },
    { nev: "Nagy Péter",     osztaly: "10.B", atlag: 4.2 },
    { nev: "Szabó Eszter",   osztaly: "11.C", atlag: 3.9 },
    { nev: "Tóth Bence",     osztaly: "12.A", atlag: 4.5 },
    { nev: "Horváth Réka",   osztaly: "9.B",  atlag: 5.0 }
];

const tbody = document.getElementById("tanuloTabla");

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