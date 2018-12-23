const jsonpersons = `[{"fname":"Anthony", "lname":"Duncan","born":799624800000, "gender": "m"},
{"fname":"Joshua", "lname":"Harrison","born":504226800000, "gender": "m"},
{"fname":"Natasha", "lname":"Warner","born":926892000000, "gender": "f"},
{"fname":"Aaron", "lname":"Hayward","born":-571453200000, "gender": "m"},
{"fname":"Ryan", "lname":"Holt","born":573606000000, "gender": "m"},
{"fname":"Mia", "lname":"Vincent","born":-689216400000, "gender": "f"},
{"fname":"Ruby", "lname":"Field","born":615765600000, "gender": "f"}]`;
let persons = JSON.parse(jsonpersons);
let infos = [true, true, true, true];
const bigger = field => (a, b) => {
    if (a[field] > b[field])
        return 1;
    return -1;
}
const smaller = field => (a, b) => {
    if (a[field] > b[field])
        return -1;
    return 1;
}
const field = {
    0: 'fname',
    1: 'lname',
    2: 'born',
    3: 'gender',
}
rendertable();

function rendertable() {
    let table = document.getElementById("tbody");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    for (let i = 0; i < persons.length; i++) {
        let tablerow = document.createElement("TR");
        tablerow = renderrow(i, tablerow);
        table.appendChild(tablerow);
    }
}

function renderrow(index, tablerow) {
    const per = persons[index];

    const fnametd = document.createElement("TD");
    fnametd.appendChild(document.createTextNode(per.fname));
    tablerow.appendChild(fnametd);

    const lnametd = document.createElement("TD");
    lnametd.appendChild(document.createTextNode(per.lname));
    tablerow.appendChild(lnametd);

    const borntd = document.createElement("TD");
    borntd.appendChild(document.createTextNode(new Date(per.born).toUTCString()));
    tablerow.appendChild(borntd);

    const gendertd = document.createElement("TD");
    gendertd.appendChild(document.createTextNode((per.gender === "m") ? `Male` : `${(per.gender === "f") ? `Female` : `Unknown`}`));
    tablerow.appendChild(gendertd);
    return tablerow;

}

document.getElementById("mainhead").addEventListener("click", (e) => {
    const index = e.target.cellIndex;
    const func = infos[index] ? bigger(field[index]) : smaller(field[index]);
    infos[index] = !infos[index];
    persons.sort(func);
    rendertable();
})