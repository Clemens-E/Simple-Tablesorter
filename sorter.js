var jsonpersons = `[{"fname":"Anthony", "lname":"Duncan","born":799624800000, "gender": "m"},
{"fname":"Joshua", "lname":"Harrison","born":504226800000, "gender": "m"},
{"fname":"Natasha", "lname":"Warner","born":926892000000, "gender": "f"},
{"fname":"Aaron", "lname":"Hayward","born":-571453200000, "gender": "m"},
{"fname":"Ryan", "lname":"Holt","born":573606000000, "gender": "m"},
{"fname":"Mia", "lname":"Vincent","born":-689216400000, "gender": "f"},
{"fname":"Ruby", "lname":"Field","born":615765600000, "gender": "f"}]`;
var persons = JSON.parse(jsonpersons);
var body = '';
var infos = [true, true, true, true];
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
  let index = e.target.cellIndex;
  let func;
  switch (index) {
    case 0:
      if (infos[0]) func = (a, b) => a.fname > b.fname;
      else func = (a, b) => a.fname < b.fname;
      infos[0] = !infos[0];
      break;
    case 1:
      if (infos[1]) func = (a, b) => a.lname > b.lname;
      else func = (a, b) => a.lname < b.lname;
      infos[1] = !infos[1];
      break;
    case 2:
      if (infos[2]) func = (a, b) => a.born > b.born;
      else func = (a, b) => a.born < b.born;
      infos[2] = !infos[2];
      break;
    case 3:
      if (infos[3]) func = (a, b) => a.gender > b.gender;
      else func = (a, b) => a.gender < b.gender;
      infos[3] = !infos[3];
      break;
  }
  persons = persons.sort(func);
  rendertable();
})