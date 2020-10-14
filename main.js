// SUPERKVÍZ - cílem je naprogramovat klasický kvíz.
// Tj. uživatelce se postupně ukazují otázky a u každé má na výběr
// z několika možných odpovědí. Když na jednu odpověď klikne, posune
// se na další otázku. Když odpoví na všechny otázky, ukáže se jí
// hodnocení úspěšnosti v procentech a pod tím seznam s výsledkem.
// V seznamu bude vždy otázka, její odpověď a správná odpověď.

// Při vytváření HTML pro odpovědi dodrž následující strukturu:

// <ul id="odpovedi">
//     <li data-odpoved="0">Ledová královna</li>
//     <li data-odpoved="1">Sněhurka</li>
//     <li data-odpoved="2">Já, já jsem nejkrásnější!</li>
// </ul>

// Takto připravené HTML pak pokaždé vlož na stránce do <div id="moznosti">
// Musíš nejprve smazat ten starý seznam, který už tam je.

// Data pro kvíz jsou uložena v poli otazky. Každa otázka je objekt,
// který obsahuje otázku, obrázek k otázce, pole možných odpovědí
// a index správné odpovědi.

// const = JS tě nenechá tudle proměnnou změnit
const otazky = [
  {
    problem: "Co je ikonická hračka z 80. let?",
    obrazek: "moncicak.jpg",
    odpovedi: ["Kočičák", "Mončičák", "Opičák"],
    spravna: 1,
  },
  {
    problem: "Jaké je nejoblíbenější ovoce Janči Filipové?",
    obrazek: "ovoce.jpg",
    odpovedi: ["Kokos", "Švestička", "Jahůdka", "Ani jedna z možností"],
    spravna: 3,
  },
  {
    problem: "Pro úspěšné absolvování kurzu je potřeba...",
    obrazek: "vino.jpg",
    odpovedi: ["Umět JavaScript", "Dát si při lekci víno"],
    spravna: 0,
  },
];

// // vybereme všechny elementy li pomocí querySelectorAll
// let vybrano = document.querySelectorAll("#odpovedi li");
// console.log(vybrano);

// // každé položce nastavíme textContent Ahoj
// vybrano.forEach((e) => (e.textContent = "Ahoj"));

// vytvořit odkazy na HTML elementy

let poradi = document.querySelector("#poradi");
let problem = document.querySelector("#problem");
let obrazek = document.querySelector("#obrazek");
let odpovedi = document.querySelector("#odpovedi");

let aktualniOtazka = 0;
let mojeOdpovedi = [];

zobrazOtazku(aktualniOtazka);

function zobrazOtazku(index) {
  poradi.textContent = `Otázka ${index + 1} / ${otazky.length}`;
  problem.textContent = otazky[index].problem;
  obrazek.src = "obrazky/" + otazky[index].obrazek;

  // doplnime odpovedi do stranky
  let obsahOdpovedi = "";
  for (i = 0; i < otazky[index].odpovedi.length; i++) {
    obsahOdpovedi += ` <li data-odpoved="${i}">${otazky[index].odpovedi[i]}</li>`;
  }
  odpovedi.innerHTML = obsahOdpovedi;

  let seznamOdpovedi = document.querySelectorAll("#odpovedi li");
  seznamOdpovedi.forEach((e) => (e.onclick = klikNaOdpoved));
}

function klikNaOdpoved() {
  mojeOdpovedi.push(this.textContent);
  console.log(mojeOdpovedi);
  aktualniOtazka++;
  if (aktualniOtazka < otazky.length) {
    zobrazOtazku(aktualniOtazka);
  } else {
    zobrazVyhodnoceni();
  }
}

function zobrazVyhodnoceni() {
  // skrýt otázky
  document.querySelector(".kviz").style.display = "none";

  // zobrazit stránku s vyhodnocením
  document.querySelector(".vysledek").style.display = "block";

  // najdeme si div do ktereho budem vypisovat výsledky
  let hodnoceni = document.querySelector("#hodnoceni");

  // načíst na jaké odpovědi jsem klikla
  console.log(mojeOdpovedi);

  // vyhodnotit, jestli jsou odpovědi správné
  let mojeBody = 0;
  for (i = 0; i < otazky.length; i++) {
    if (mojeOdpovedi[i] === otazky[i].odpovedi[otazky[i].spravna]) {
      mojeBody++;
    }
  }

  // vypsat otázky H3 a odpovědi P a jestli jsou správné
  let hodnoceniTemp = "";
  for (i = 0; i < otazky.length; i++) {
    hodnoceniTemp += `<h3>${i + 1}. ${otazky[i].problem}</h3>
    <p>Tvoje odpověď: ${mojeOdpovedi[i]}</p>`;
    if (mojeOdpovedi[i] === otazky[i].odpovedi[otazky[i].spravna]) {
      hodnoceniTemp += "<p>To je SPRÁVNĚ.</p>";
    } else {
      hodnoceniTemp += `<p>Správná odpověd: ${
        otazky[i].odpovedi[otazky[i].spravna]
      }</p>`;
    }
  }
  hodnoceni.innerHTML += hodnoceniTemp;

  // vypsat H2, kolik je správných + procentuální hodnocení
  hodnoceni.innerHTML += `<h2>Správně ${mojeBody} ze ${
    otazky.length
  } otázek. Úspěšnost ${Math.floor((mojeBody / otazky.length) * 100)}%.</h2>`;
}
