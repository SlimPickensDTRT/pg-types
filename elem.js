$(document).ready(function() {
  console.log(1);
  for (let c = 0; c < allTypes.length; c++) {
    let slot = "#" + allTypes[c];
    color(allTypes[c], slot);
  }
  $(".help").css("display", "none");
});

const allTypes = [
  "bug",
  "dar",
  "dra",
  "ele",
  "fai",
  "fig",
  "fir",
  "fly",
  "gho",
  "gra",
  "gro",
  "ice",
  "nor",
  "poi",
  "psy",
  "roc",
  "ste",
  "wat"
];
const fullTypeName = [
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fairy",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water"
];
let vulnerAll = [];
const resistAll = [
  ["fig", "gro", "gra"],
  ["gho", "psy", "dar"],
  ["fir", "wat", "gra", "ele"],
  ["fly", "ste", "ele"],
  ["fig", "bug", "dra", "dar"],
  ["roc", "bug", "dar"],
  ["bug", "ste", "fir", "gra", "ice"],
  ["fig", "bug", "gra", "gro"],
  ["nor", "fig", "poi", "bug"],
  ["gro", "wat", "gra", "ele"],
  ["poi", "roc", "ele"],
  ["ice"],
  ["gho"],
  ["gra", "fai", "poi", "fig"],
  ["fig", "psy"],
  ["nor", "fly", "poi", "fir"],
  ["nor", "fly", "poi", "roc", "bug", "ste", "gra", "psy", "ice", "dra", "fai"],
  ["ste", "fir", "wat", "ice"]
];
const strongAll = [
  ["gra", "psy", "dar"],
  ["gho", "psy"],
  ["dra"],
  ["fly", "wat"],
  ["fig", "dra", "dar"],
  ["nor", "roc", "ste", "dar", "ice"],
  ["bug", "ste", "gra", "ice"],
  ["fig", "bug", "gra"],
  ["gho", "psy"],
  ["gro", "roc", "wat"],
  ["poi", "roc", "ste", "fir", "ele"],
  ["fly", "gro", "gra", "dra"],
  [],
  ["gra", "fai"],
  ["fig", "poi"],
  ["fly", "bug", "fir", "ice"],
  ["roc", "fai", "ice"],
  ["gro", "roc", "fir"]
];
const weakAll = [
  ["fig", "fly", "poi", "gho", "ste", "fir", "fai"],
  ["fig", "dar", "fai"],
  ["ste", "fai"],
  ["gro", "gra", "ele", "dra"],
  ["poi", "ste", "fir"],
  ["fly", "poi", "psy", "bug", "gho", "fai"],
  ["roc", "fir", "wat", "dra"],
  ["roc", "ste", "ele"],
  ["nor", "dar"],
  ["fly", "poi", "bug", "ste", "fir", "gra", "dra"],
  ["fly", "bug", "gra"],
  ["ste", "fir", "wat", "ice"],
  ["roc", "gho", "ste"],
  ["poi", "gro", "roc", "ste", "gho"],
  ["ste", "psy", "dar"],
  ["fig", "gro", "ste"],
  ["ste", "fir", "wat", "ele"],
  ["wat", "gra", "dra"]
];

let sup = [],
  per = [],
  ris = [],
  dnu = [];
let type1, type2;

$(document).on("click", ".elem", function() {
  let clickedType = this.id;
  console.log(clickedType);
  if (clickedType === "help") {
    $(".field").slideUp(500);
    $("#help").slideUp(100);
    $(".help").slideDown(500);
  } else if (clickedType === "helpBack") {
    $(".field").slideDown(500);
    $(".help").slideUp(500);
    setTimeout(function() {
      $("#help").slideDown(100);
    }, 400);
  } else {
    typeSel(clickedType);
  }
});

function typeSel(elem) {
  $(".resElem").css("border", "1px solid black");
  vulnerAll = [
    ["fly", "roc", "fir"],
    ["fig", "bug", "fai"],
    ["ice", "dra", "fai"],
    ["gro"],
    ["poi", "ste"],
    ["fly", "psy", "fai"],
    ["gro", "roc", "wat"],
    ["roc", "ele", "ice"],
    ["gho", "dar"],
    ["fly", "poi", "bug", "fir", "ice"],
    ["wat", "gra", "ice"],
    ["fig", "roc", "ste", "fir"],
    ["fig"],
    ["gro", "psy"],
    ["bug", "gho", "dar"],
    ["fig", "gro", "ste", "wat", "gra"],
    ["fig", "gro", "fir"],
    ["gra", "ele"]
  ];
  if (type1 === undefined) {
    $(".resElem").css("display", "none");
    type1 = elem;
    $("#type1").text(fullTypeName[allTypes.indexOf(type1)]);
    color(type1, "#type1");
    $("#type1").slideDown(200);
    singleType(elem);
  } else if (type2 === undefined) {
    if (elem === type1) {
      return;
    } else {
      $(".resElem").css("display", "none");
      type2 = elem;
      $("#type2").text(fullTypeName[allTypes.indexOf(type2)]);
      color(type2, "#type2");
      $("#type2").slideDown(200);
      setTimeout(dualType(type1, type2), 200);
    }
  } else {
    $("#type1").slideUp(200);
    $("#type2").slideUp(200);
    type1 = undefined;
    type2 = undefined;
    setTimeout(typeSel, 200, elem);
  }
}

function singleType(elem) {
  sup = [];
  per = [];
  ris = [];
  dnu = [];
  let tp = allTypes.indexOf(elem);
  dnu = resistAll[tp];
  sup = vulnerAll[tp];
  let weak = weakAll[tp];
  let strong = strongAll[tp];

  per = sup.filter(function(value, index, arr) {
    return weak.indexOf(value) >= 0;
  });
  ris = sup.filter(function(value, index, arr) {
    return strong.indexOf(value) >= 0;
  });
  for (let p = 0; p < per.length; p++) {
    let i = sup.indexOf(per[p]);
    sup.splice(i, 1);
  }
  for (let p = 0; p < ris.length; p++) {
    let i = sup.indexOf(per[p]);
    sup.splice(i, 1);
  }

  postResults();
}

let arr = ["a", "b", "c", "d"];

function dualType(elem1, elem2) {
  sup = [];
  per = [];
  ris = [];
  dnu = [];
  let tp1 = allTypes.indexOf(elem1);
  let tp2 = allTypes.indexOf(elem2);

  let res = resistAll[tp1] + "," + resistAll[tp2];
  res = res.split(",");

  let vul = vulnerAll[tp1] + "," + vulnerAll[tp2];
  vul = vul.split(",");

  let str = strongAll[tp1] + "," + strongAll[tp2];
  str = str.split(",");

  let wk = weakAll[tp1] + "," + weakAll[tp2];
  wk = wk.split(",");

  sup = vul.filter(function(value, index, arr) {
    return res.indexOf(value) < 0;
  });

  dnu = res.filter(function(value, index, arr) {
    return vul.indexOf(value) < 0;
  });

  for (let i = 0; i < sup.length; i++) {
    if (str.indexOf(sup[i]) >= 0) {
      ris.push(sup[i]);
    }
  }

  for (let r = 0; r < ris.length; r++) {
    let k = sup.indexOf(ris[r]);
    sup.splice(k, 1);
  }

  for (let i = 0; i < sup.length; i++) {
    if (wk.indexOf(sup[i]) >= 0) {
      per.push(sup[i]);
    }
  }
  for (let r = 0; r < per.length; r++) {
    let k = sup.indexOf(per[r]);
    sup.splice(k, 1);
  }
  for (let i = 0; i < ris.length; i++) {
    if (wk.indexOf(ris[i]) >= 0) {
      sup.push(ris[i]);
    }
  }
  for (let r = 0; r < sup.length; r++) {
    let k = sup.indexOf(sup[r]);
    ris.splice(k, 1);
  }

  for (let di = 0; di < per.length; di++) {
    let cd = per[di];
    let cc = per.filter(function(value, index, arr) {
      return value === cd;
    }).length;
    if (cc > 1) {
      per.splice(per.indexOf(cd), 1);
      let slot = per.indexOf(cd);
      $("#per" + slot).css("border", "10px solid green");
    }
  }
  for (let di = 0; di < sup.length; di++) {
    let cd = sup[di];
    let cc = sup.filter(function(value, index, arr) {
      return value === cd;
    }).length;
    if (cc > 1) {
      sup.splice(sup.indexOf(cd), 1);
      let slot = sup.indexOf(cd);
      $("#sup" + slot).css("border", "10px solid green");
    }
  }
  for (let di = 0; di < ris.length; di++) {
    let cd = ris[di];
    let cc = ris.filter(function(value, index, arr) {
      return value === cd;
    }).length;
    if (cc > 1) {
      ris.splice(ris.indexOf(cd), 1);
      let slot = ris.indexOf(cd);
      $("#ris" + slot).css("border", "10px solid green");
    }
  }
  for (let di = 0; di < dnu.length; di++) {
    let cd = dnu[di];
    let cc = dnu.filter(function(value, index, arr) {
      return value === cd;
    }).length;
    if (cc > 1) {
      dnu.splice(dnu.indexOf(cd), 1);
      let slot = dnu.indexOf(cd);
      $("#dnu" + slot).css("border", "10px solid red");
      di = 0;
    }
  }
  postResults();
}

function postResults() {
  let p = 0;
  while (p < per.length) {
    $("#per" + p).text(fullTypeName[allTypes.indexOf(per[p])]);
    color(per[p], "#per" + p);
    $("#per" + p).css("display", "block");
    p++;
  }
  p = 0;
  while (p < sup.length) {
    $("#sup" + p).text(fullTypeName[allTypes.indexOf(sup[p])]);
    color(sup[p], "#sup" + p);
    $("#sup" + p).css("display", "block");
    p++;
  }
  p = 0;
  while (p < ris.length) {
    $("#ris" + p).text(fullTypeName[allTypes.indexOf(ris[p])]);
    color(ris[p], "#ris" + p);
    $("#ris" + p).css("display", "block");
    p++;
  }
  p = 0;
  while (p < dnu.length) {
    $("#dnu" + p).text(fullTypeName[allTypes.indexOf(dnu[p])]);
    color(dnu[p], "#dnu" + p);
    $("#dnu" + p).css("display", "block");
    p++;
  }
}

function color(cType, slot) {
  const colors = [
    "#A8B820",
    "#705848",
    "#7038F8",
    "#F8D030",
    "#EE99AC",
    "#C03028",
    "#F08030",
    "#A890F0",
    "#705898",
    "#78C850",
    "#E0C068",
    "#98D8D8",
    "#A8A878",
    "#A040A0",
    "#F85888",
    "#B8A038",
    "#B8B8D0",
    "#6890F0"
  ];
  let hex = colors[allTypes.indexOf(cType)];
  $(slot).css("background-color", hex);
}
