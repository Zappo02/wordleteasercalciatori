import { useState, useEffect, useMemo, useRef } from "react";

// ── POOL GIOCATORI (Serie A, cognomi 4-7 lettere) ──────────────────────────
const POOL=[
  {s:"Sommer",club:"Inter",role:"Portiere",nation:"Svizzera"},
  {s:"Bastoni",club:"Inter",role:"Difensore",nation:"Italia"},
  {s:"Bisseck",club:"Inter",role:"Difensore",nation:"Germania"},
  {s:"Akanji",club:"Inter",role:"Difensore",nation:"Svizzera"},
  {s:"Acerbi",club:"Inter",role:"Difensore",nation:"Italia"},
  {s:"Dimarco",club:"Inter",role:"Terzino",nation:"Italia"},
  {s:"Augusto",club:"Inter",role:"Terzino",nation:"Brasile"},
  {s:"Darmian",club:"Inter",role:"Terzino",nation:"Italia"},
  {s:"Barella",club:"Inter",role:"Centrocampista",nation:"Italia"},
  {s:"Sucic",club:"Inter",role:"Centrocampista",nation:"Croazia"},
  {s:"Diouf",club:"Inter",role:"Centrocampista",nation:"Francia"},
  {s:"Lautaro",club:"Inter",role:"Attaccante",nation:"Argentina"},
  {s:"Thuram",club:"Inter",role:"Attaccante",nation:"Francia"},
  {s:"Bonny",club:"Inter",role:"Attaccante",nation:"Francia"},
  {s:"Maignan",club:"Milan",role:"Portiere",nation:"Francia"},
  {s:"Tomori",club:"Milan",role:"Difensore",nation:"Inghilterra"},
  {s:"Gabbia",club:"Milan",role:"Difensore",nation:"Italia"},
  {s:"Odogù",club:"Milan",role:"Difensore",nation:"Germania"},
  {s:"Jashari",club:"Milan",role:"Centrocampista",nation:"Svizzera"},
  {s:"Fofana",club:"Milan",role:"Centrocampista",nation:"Francia"},
  {s:"Ricci",club:"Milan",role:"Centrocampista",nation:"Italia"},
  {s:"Rabiot",club:"Milan",role:"Centrocampista",nation:"Francia"},
  {s:"Modric",club:"Milan",role:"Centrocampista",nation:"Croazia"},
  {s:"Leao",club:"Milan",role:"Ala",nation:"Portogallo"},
  {s:"Pulisic",club:"Milan",role:"Ala",nation:"USA"},
  {s:"Nkunku",club:"Milan",role:"Attaccante",nation:"Francia"},
  {s:"Gimenez",club:"Milan",role:"Attaccante",nation:"Messico"},
  {s:"Meret",club:"Napoli",role:"Portiere",nation:"Italia"},
  {s:"Contini",club:"Napoli",role:"Portiere",nation:"Italia"},
  {s:"Beukema",club:"Napoli",role:"Difensore",nation:"Olanda"},
  {s:"Olivera",club:"Napoli",role:"Terzino",nation:"Uruguay"},
  {s:"Gilmour",club:"Napoli",role:"Centrocampista",nation:"Scozia"},
  {s:"Lobotka",club:"Napoli",role:"Centrocampista",nation:"Slovacchia"},
  {s:"Elmas",club:"Napoli",role:"Trequartista",nation:"Macedonia"},
  {s:"Vergara",club:"Napoli",role:"Trequartista",nation:"Italia"},
  {s:"Neres",club:"Napoli",role:"Ala",nation:"Brasile"},
  {s:"Hojlund",club:"Napoli",role:"Attaccante",nation:"Danimarca"},
  {s:"Lukaku",club:"Napoli",role:"Attaccante",nation:"Belgio"},
  {s:"Giovane",club:"Napoli",role:"Attaccante",nation:"Brasile"},
  {s:"Perin",club:"Juventus",role:"Portiere",nation:"Italia"},
  {s:"Gatti",club:"Juventus",role:"Difensore",nation:"Italia"},
  {s:"Kalulu",club:"Juventus",role:"Difensore",nation:"Francia"},
  {s:"Cabal",club:"Juventus",role:"Terzino",nation:"Colombia"},
  {s:"Holm",club:"Juventus",role:"Terzino",nation:"Svezia"},
  {s:"Kelly",club:"Juventus",role:"Difensore",nation:"Inghilterra"},
  {s:"Bremer",club:"Juventus",role:"Difensore",nation:"Brasile"},
  {s:"Miretti",club:"Juventus",role:"Centrocampista",nation:"Italia"},
  {s:"Adzic",club:"Juventus",role:"Trequartista",nation:"Montenegro"},
  {s:"David",club:"Juventus",role:"Attaccante",nation:"Canada"},
  {s:"Openda",club:"Juventus",role:"Attaccante",nation:"Belgio"},
  {s:"Yildiz",club:"Juventus",role:"Ala",nation:"Turchia"},
  {s:"Milik",club:"Juventus",role:"Attaccante",nation:"Polonia"},
  {s:"Kostic",club:"Juventus",role:"Ala",nation:"Serbia"},
  {s:"Boga",club:"Juventus",role:"Ala",nation:"Costa d'Avorio"},
  {s:"Svilar",club:"Roma",role:"Portiere",nation:"Serbia"},
  {s:"Gollini",club:"Roma",role:"Portiere",nation:"Italia"},
  {s:"Zelezny",club:"Roma",role:"Portiere",nation:"Polonia"},
  {s:"Ndicka",club:"Roma",role:"Difensore",nation:"Costa d'Avorio"},
  {s:"Mancini",club:"Roma",role:"Difensore",nation:"Italia"},
  {s:"Hermoso",club:"Roma",role:"Difensore",nation:"Spagna"},
  {s:"Wesley",club:"Roma",role:"Terzino",nation:"Brasile"},
  {s:"Celik",club:"Roma",role:"Terzino",nation:"Turchia"},
  {s:"Rensch",club:"Roma",role:"Terzino",nation:"Olanda"},
  {s:"Kone",club:"Roma",role:"Centrocampista",nation:"Francia"},
  {s:"Pisilli",club:"Roma",role:"Centrocampista",nation:"Italia"},
  {s:"Soule",club:"Roma",role:"Ala",nation:"Argentina"},
  {s:"Dybala",club:"Roma",role:"Seconda punta",nation:"Argentina"},
  {s:"Malen",club:"Roma",role:"Attaccante",nation:"Olanda"},
  {s:"Dovbyk",club:"Roma",role:"Attaccante",nation:"Ucraina"},
  {s:"Rossi",club:"Atalanta",role:"Portiere",nation:"Italia"},
  {s:"Hien",club:"Atalanta",role:"Difensore",nation:"Svezia"},
  {s:"Ahanor",club:"Atalanta",role:"Difensore",nation:"Nigeria"},
  {s:"Ederson",club:"Atalanta",role:"Centrocampista",nation:"Brasile"},
  {s:"Musah",club:"Atalanta",role:"Centrocampista",nation:"USA"},
  {s:"Pasalic",club:"Atalanta",role:"Centrocampista",nation:"Croazia"},
  {s:"Bakker",club:"Atalanta",role:"Terzino",nation:"Olanda"},
  {s:"Butez",club:"Como",role:"Portiere",nation:"Francia"},
  {s:"Cavlina",club:"Como",role:"Portiere",nation:"Croazia"},
  {s:"Ramon",club:"Como",role:"Difensore",nation:"Spagna"},
  {s:"Kempf",club:"Como",role:"Difensore",nation:"Germania"},
  {s:"Valle",club:"Como",role:"Terzino",nation:"Spagna"},
  {s:"Moreno",club:"Como",role:"Terzino",nation:"Spagna"},
  {s:"Vojvoda",club:"Como",role:"Terzino",nation:"Kosovo"},
  {s:"Smolcic",club:"Como",role:"Terzino",nation:"Croazia"},
  {s:"Perrone",club:"Como",role:"Centrocampista",nation:"Argentina"},
  {s:"Roberto",club:"Como",role:"Centrocampista",nation:"Spagna"},
  {s:"Lahdo",club:"Como",role:"Centrocampista",nation:"Svezia"},
  {s:"Diao",club:"Como",role:"Ala",nation:"Senegal"},
  {s:"Addai",club:"Como",role:"Ala",nation:"Olanda"},
  {s:"Kuhn",club:"Como",role:"Ala",nation:"Germania"},
  {s:"Morata",club:"Como",role:"Attaccante",nation:"Spagna"},
  {s:"Lucumi",club:"Bologna",role:"Difensore",nation:"Colombia"},
  {s:"Heggem",club:"Bologna",role:"Difensore",nation:"Norvegia"},
  {s:"Vitik",club:"Bologna",role:"Difensore",nation:"Repubblica Ceca"},
  {s:"Helland",club:"Bologna",role:"Difensore",nation:"Norvegia"},
  {s:"Casale",club:"Bologna",role:"Difensore",nation:"Italia"},
  {s:"Miranda",club:"Bologna",role:"Terzino",nation:"Spagna"},
  {s:"Zortea",club:"Bologna",role:"Terzino",nation:"Italia"},
  {s:"Moro",club:"Bologna",role:"Centrocampista",nation:"Croazia"},
  {s:"Pobega",club:"Bologna",role:"Centrocampista",nation:"Italia"},
  {s:"Sohm",club:"Bologna",role:"Centrocampista",nation:"Svizzera"},
  {s:"Freuler",club:"Bologna",role:"Centrocampista",nation:"Svizzera"},
  {s:"Odgaard",club:"Bologna",role:"Trequartista",nation:"Danimarca"},
  {s:"Rowe",club:"Bologna",role:"Ala",nation:"Inghilterra"},
  {s:"Castro",club:"Bologna",role:"Attaccante",nation:"Argentina"},
  {s:"Comuzzo",club:"Fiorentina",role:"Difensore",nation:"Italia"},
  {s:"Kouadio",club:"Fiorentina",role:"Difensore",nation:"Italia"},
  {s:"Rugani",club:"Fiorentina",role:"Difensore",nation:"Italia"},
  {s:"Kospo",club:"Fiorentina",role:"Difensore",nation:"Bosnia"},
  {s:"Fortini",club:"Fiorentina",role:"Terzino",nation:"Italia"},
  {s:"Gosens",club:"Fiorentina",role:"Terzino",nation:"Germania"},
  {s:"Parisi",club:"Fiorentina",role:"Terzino",nation:"Italia"},
  {s:"Balbo",club:"Fiorentina",role:"Terzino",nation:"Venezuela"},
  {s:"Dodo",club:"Fiorentina",role:"Terzino",nation:"Brasile"},
  {s:"Lamptey",club:"Fiorentina",role:"Terzino",nation:"Ghana"},
  {s:"Fagioli",club:"Fiorentina",role:"Centrocampista",nation:"Italia"},
  {s:"Fazzini",club:"Fiorentina",role:"Centrocampista",nation:"Italia"},
  {s:"Ndour",club:"Fiorentina",role:"Centrocampista",nation:"Italia"},
  {s:"Fabbian",club:"Fiorentina",role:"Trequartista",nation:"Italia"},
  {s:"Sabiri",club:"Fiorentina",role:"Trequartista",nation:"Marocco"},
  {s:"Solomon",club:"Fiorentina",role:"Ala",nation:"Israele"},
  {s:"Kean",club:"Fiorentina",role:"Attaccante",nation:"Italia"},
  {s:"Piccoli",club:"Fiorentina",role:"Attaccante",nation:"Italia"},
  {s:"Gila",club:"Lazio",role:"Difensore",nation:"Spagna"},
  {s:"Gigot",club:"Lazio",role:"Difensore",nation:"Francia"},
  {s:"Patric",club:"Lazio",role:"Difensore",nation:"Spagna"},
  {s:"Tavares",club:"Lazio",role:"Terzino",nation:"Portogallo"},
  {s:"Marusic",club:"Lazio",role:"Terzino",nation:"Montenegro"},
  {s:"Lazzari",club:"Lazio",role:"Terzino",nation:"Italia"},
  {s:"Hysaj",club:"Lazio",role:"Terzino",nation:"Albania"},
  {s:"Rovella",club:"Lazio",role:"Centrocampista",nation:"Italia"},
  {s:"Cataldi",club:"Lazio",role:"Centrocampista",nation:"Italia"},
  {s:"Basic",club:"Lazio",role:"Centrocampista",nation:"Croazia"},
  {s:"Maldini",club:"Lazio",role:"Trequartista",nation:"Italia"},
  {s:"Isaksen",club:"Lazio",role:"Ala",nation:"Danimarca"},
  {s:"Noslin",club:"Lazio",role:"Ala",nation:"Olanda"},
  {s:"Pedro",club:"Lazio",role:"Ala",nation:"Spagna"},
  {s:"Ratkov",club:"Lazio",role:"Attaccante",nation:"Serbia"},
  {s:"Muric",club:"Sassuolo",role:"Portiere",nation:"Kosovo"},
  {s:"Turati",club:"Sassuolo",role:"Portiere",nation:"Italia"},
  {s:"Zacchi",club:"Sassuolo",role:"Portiere",nation:"Italia"},
  {s:"Idzes",club:"Sassuolo",role:"Difensore",nation:"Indonesia"},
  {s:"Cande",club:"Sassuolo",role:"Difensore",nation:"Guinea-Bissau"},
  {s:"Romagna",club:"Sassuolo",role:"Difensore",nation:"Italia"},
  {s:"Doig",club:"Sassuolo",role:"Terzino",nation:"Scozia"},
  {s:"Garcia",club:"Sassuolo",role:"Terzino",nation:"Svizzera"},
  {s:"Boloca",club:"Sassuolo",role:"Centrocampista",nation:"Italia"},
  {s:"Lipani",club:"Sassuolo",role:"Centrocampista",nation:"Italia"},
  {s:"Matic",club:"Sassuolo",role:"Centrocampista",nation:"Serbia"},
  {s:"Vranckx",club:"Sassuolo",role:"Centrocampista",nation:"Belgio"},
  {s:"Iannoni",club:"Sassuolo",role:"Centrocampista",nation:"Italia"},
  {s:"Volpato",club:"Sassuolo",role:"Trequartista",nation:"Italia"},
  {s:"Bakola",club:"Sassuolo",role:"Trequartista",nation:"Francia"},
  {s:"Fadera",club:"Sassuolo",role:"Ala",nation:"Gambia"},
  {s:"Berardi",club:"Sassuolo",role:"Ala",nation:"Italia"},
  {s:"Nzola",club:"Sassuolo",role:"Attaccante",nation:"Angola"},
  {s:"Suzuki",club:"Parma",role:"Portiere",nation:"Giappone"},
  {s:"Corvi",club:"Parma",role:"Portiere",nation:"Italia"},
  {s:"Rinaldi",club:"Parma",role:"Portiere",nation:"Italia"},
  {s:"Circati",club:"Parma",role:"Difensore",nation:"Austria"},
  {s:"Troilo",club:"Parma",role:"Difensore",nation:"Argentina"},
  {s:"Valenti",club:"Parma",role:"Difensore",nation:"Argentina"},
  {s:"Valeri",club:"Parma",role:"Terzino",nation:"Italia"},
  {s:"Carboni",club:"Parma",role:"Terzino",nation:"Argentina"},
  {s:"Keita",club:"Parma",role:"Centrocampista",nation:"Belgio"},
  {s:"Estevez",club:"Parma",role:"Centrocampista",nation:"Argentina"},
  {s:"Bernabe",club:"Parma",role:"Centrocampista",nation:"Spagna"},
  {s:"Ordonez",club:"Parma",role:"Centrocampista",nation:"Argentina"},
  {s:"Frigan",club:"Parma",role:"Attaccante",nation:"Croazia"},
  {s:"Elphege",club:"Parma",role:"Attaccante",nation:"Francia"},
  {s:"Okoye",club:"Udinese",role:"Portiere",nation:"Nigeria"},
  {s:"Sava",club:"Udinese",role:"Portiere",nation:"Romania"},
  {s:"Padelli",club:"Udinese",role:"Portiere",nation:"Italia"},
  {s:"Solet",club:"Udinese",role:"Difensore",nation:"Francia"},
  {s:"Bertola",club:"Udinese",role:"Difensore",nation:"Italia"},
  {s:"Mlacic",club:"Udinese",role:"Difensore",nation:"Croazia"},
  {s:"Zemura",club:"Udinese",role:"Terzino",nation:"Zimbabwe"},
  {s:"Kamara",club:"Udinese",role:"Terzino",nation:"Costa d'Avorio"},
  {s:"Zanoli",club:"Udinese",role:"Terzino",nation:"Italia"},
  {s:"Atta",club:"Udinese",role:"Centrocampista",nation:"Francia"},
  {s:"Miller",club:"Udinese",role:"Centrocampista",nation:"Scozia"},
  {s:"Zarraga",club:"Udinese",role:"Centrocampista",nation:"Spagna"},
  {s:"Arizala",club:"Udinese",role:"Ala",nation:"Colombia"},
  {s:"Zaniolo",club:"Udinese",role:"Trequartista",nation:"Italia"},
  {s:"Gueye",club:"Udinese",role:"Attaccante",nation:"Senegal"},
  {s:"Davis",club:"Udinese",role:"Attaccante",nation:"Inghilterra"},
  {s:"Buksa",club:"Udinese",role:"Attaccante",nation:"Polonia"},
  {s:"Bayo",club:"Udinese",role:"Attaccante",nation:"Costa d'Avorio"},
  {s:"Israel",club:"Torino",role:"Portiere",nation:"Uruguay"},
  {s:"Paleari",club:"Torino",role:"Portiere",nation:"Italia"},
  {s:"Siviero",club:"Torino",role:"Portiere",nation:"Italia"},
  {s:"Coco",club:"Torino",role:"Difensore",nation:"Guinea Equatoriale"},
  {s:"Ismajli",club:"Torino",role:"Difensore",nation:"Albania"},
  {s:"Maripan",club:"Torino",role:"Difensore",nation:"Cile"},
  {s:"Ebbose",club:"Torino",role:"Difensore",nation:"Camerun"},
  {s:"Sazonov",club:"Torino",role:"Difensore",nation:"Georgia"},
  {s:"Obrador",club:"Torino",role:"Terzino",nation:"Spagna"},
  {s:"Biraghi",club:"Torino",role:"Terzino",nation:"Italia"},
  {s:"Prati",club:"Torino",role:"Centrocampista",nation:"Italia"},
  {s:"Tameze",club:"Torino",role:"Centrocampista",nation:"Francia"},
  {s:"Casadei",club:"Torino",role:"Centrocampista",nation:"Italia"},
  {s:"Ilic",club:"Torino",role:"Centrocampista",nation:"Serbia"},
  {s:"Ilkhan",club:"Torino",role:"Centrocampista",nation:"Turchia"},
  {s:"Lazaro",club:"Torino",role:"Ala",nation:"Austria"},
  {s:"Vlasic",club:"Torino",role:"Trequartista",nation:"Croazia"},
  {s:"Anjorin",club:"Torino",role:"Trequartista",nation:"Inghilterra"},
  {s:"Perciun",club:"Torino",role:"Trequartista",nation:"Moldavia"},
  {s:"Njie",club:"Torino",role:"Ala",nation:"Svezia"},
  {s:"Savva",club:"Torino",role:"Ala",nation:"Cipro"},
  {s:"Adams",club:"Torino",role:"Attaccante",nation:"Scozia"},
  {s:"Simeone",club:"Torino",role:"Attaccante",nation:"Argentina"},
  {s:"Zapata",club:"Torino",role:"Attaccante",nation:"Colombia"},
  {s:"Bijlow",club:"Genoa",role:"Portiere",nation:"Olanda"},
  {s:"Leali",club:"Genoa",role:"Portiere",nation:"Italia"},
  {s:"Vasquez",club:"Genoa",role:"Difensore",nation:"Messico"},
  {s:"Otoa",club:"Genoa",role:"Difensore",nation:"Danimarca"},
  {s:"Martin",club:"Genoa",role:"Terzino",nation:"Spagna"},
  {s:"Sabelli",club:"Genoa",role:"Terzino",nation:"Italia"},
  {s:"Onana",club:"Genoa",role:"Centrocampista",nation:"Camerun"},
  {s:"Masini",club:"Genoa",role:"Centrocampista",nation:"Italia"},
  {s:"Amorim",club:"Genoa",role:"Centrocampista",nation:"Brasile"},
  {s:"Cornet",club:"Genoa",role:"Ala",nation:"Costa d'Avorio"},
  {s:"Messias",club:"Genoa",role:"Ala",nation:"Brasile"},
  {s:"Ekhator",club:"Genoa",role:"Attaccante",nation:"Italia"},
  {s:"Colombo",club:"Genoa",role:"Attaccante",nation:"Italia"},
  {s:"Ekuban",club:"Genoa",role:"Attaccante",nation:"Ghana"},
  {s:"Caprile",club:"Cagliari",role:"Portiere",nation:"Italia"},
  {s:"Sherri",club:"Cagliari",role:"Portiere",nation:"Albania"},
  {s:"Ciocci",club:"Cagliari",role:"Portiere",nation:"Italia"},
  {s:"Dossena",club:"Cagliari",role:"Difensore",nation:"Italia"},
  {s:"Obert",club:"Cagliari",role:"Difensore",nation:"Slovacchia"},
  {s:"Mina",club:"Cagliari",role:"Difensore",nation:"Colombia"},
  {s:"Idrissi",club:"Cagliari",role:"Terzino",nation:"Italia"},
  {s:"Zappa",club:"Cagliari",role:"Terzino",nation:"Italia"},
  {s:"Adopo",club:"Cagliari",role:"Centrocampista",nation:"Francia"},
  {s:"Liteta",club:"Cagliari",role:"Centrocampista",nation:"Zambia"},
  {s:"Deiola",club:"Cagliari",role:"Centrocampista",nation:"Italia"},
  {s:"Gaetano",club:"Cagliari",role:"Trequartista",nation:"Italia"},
  {s:"Felici",club:"Cagliari",role:"Ala",nation:"Italia"},
  {s:"Belotti",club:"Cagliari",role:"Attaccante",nation:"Italia"},
  {s:"Trepy",club:"Cagliari",role:"Attaccante",nation:"Francia"},
  {s:"Semper",club:"Pisa",role:"Portiere",nation:"Croazia"},
  {s:"Scuffet",club:"Pisa",role:"Portiere",nation:"Italia"},
  {s:"Nicolas",club:"Pisa",role:"Portiere",nation:"Brasile"},
  {s:"Coppola",club:"Pisa",role:"Difensore",nation:"Italia"},
  {s:"Albiol",club:"Pisa",role:"Difensore",nation:"Spagna"},
  {s:"Denoon",club:"Pisa",role:"Difensore",nation:"Svizzera"},
  {s:"Marin",club:"Pisa",role:"Centrocampista",nation:"Romania"},
  {s:"Hojholt",club:"Pisa",role:"Centrocampista",nation:"Danimarca"},
  {s:"Loyola",club:"Pisa",role:"Centrocampista",nation:"Cile"},
  {s:"Vural",club:"Pisa",role:"Centrocampista",nation:"Turchia"},
  {s:"Toure",club:"Pisa",role:"Ala",nation:"Germania"},
  {s:"Angori",club:"Pisa",role:"Ala",nation:"Italia"},
  {s:"Lorran",club:"Pisa",role:"Trequartista",nation:"Brasile"},
  {s:"Tramoni",club:"Pisa",role:"Trequartista",nation:"Francia"},
  {s:"Stengs",club:"Pisa",role:"Trequartista",nation:"Olanda"},
  {s:"Leris",club:"Pisa",role:"Ala",nation:"Algeria"},
  {s:"Meister",club:"Pisa",role:"Attaccante",nation:"Danimarca"},
  {s:"Moreo",club:"Pisa",role:"Attaccante",nation:"Italia"},
  {s:"Falcone",club:"Lecce",role:"Portiere",nation:"Italia"},
  {s:"Fruchtl",club:"Lecce",role:"Portiere",nation:"Germania"},
  {s:"Samooja",club:"Lecce",role:"Portiere",nation:"Finlandia"},
  {s:"Siebert",club:"Lecce",role:"Difensore",nation:"Germania"},
  {s:"Gaspar",club:"Lecce",role:"Difensore",nation:"Angola"},
  {s:"Jean",club:"Lecce",role:"Difensore",nation:"Francia"},
  {s:"Perez",club:"Lecce",role:"Difensore",nation:"Cile"},
  {s:"Gallo",club:"Lecce",role:"Terzino",nation:"Italia"},
  {s:"Ndaba",club:"Lecce",role:"Terzino",nation:"Irlanda"},
  {s:"Veiga",club:"Lecce",role:"Terzino",nation:"Portogallo"},
  {s:"Ngom",club:"Lecce",role:"Centrocampista",nation:"Mauritania"},
  {s:"Berisha",club:"Lecce",role:"Centrocampista",nation:"Albania"},
  {s:"Sala",club:"Lecce",role:"Centrocampista",nation:"Spagna"},
  {s:"Sottil",club:"Lecce",role:"Ala",nation:"Italia"},
  {s:"Banda",club:"Lecce",role:"Ala",nation:"Zambia"},
  {s:"NDri",club:"Lecce",role:"Ala",nation:"Costa d'Avorio"},
  {s:"Camarda",club:"Lecce",role:"Attaccante",nation:"Italia"},
  {s:"Stulic",club:"Lecce",role:"Attaccante",nation:"Serbia"},
  {s:"Montipo",club:"Verona",role:"Portiere",nation:"Italia"},
  {s:"Perilli",club:"Verona",role:"Portiere",nation:"Italia"},
  {s:"Toniolo",club:"Verona",role:"Portiere",nation:"Italia"},
  {s:"Borghi",club:"Verona",role:"Portiere",nation:"Brasile"},
  {s:"Nelsson",club:"Verona",role:"Difensore",nation:"Danimarca"},
  {s:"Frese",club:"Verona",role:"Terzino",nation:"Danimarca"},
  {s:"Lirola",club:"Verona",role:"Terzino",nation:"Spagna"},
  {s:"Cham",club:"Verona",role:"Terzino",nation:"Gambia"},
  {s:"Oyegoke",club:"Verona",role:"Terzino",nation:"Inghilterra"},
  {s:"Niasse",club:"Verona",role:"Centrocampista",nation:"Senegal"},
  {s:"Lovric",club:"Verona",role:"Centrocampista",nation:"Slovenia"},
  {s:"Serdar",club:"Verona",role:"Centrocampista",nation:"Germania"},
  {s:"Bernede",club:"Verona",role:"Centrocampista",nation:"Francia"},
  {s:"Harroui",club:"Verona",role:"Centrocampista",nation:"Marocco"},
  {s:"Suslov",club:"Verona",role:"Trequartista",nation:"Slovenia"},
  {s:"Orban",club:"Verona",role:"Attaccante",nation:"Nigeria"},
  {s:"Sarr",club:"Verona",role:"Attaccante",nation:"Svezia"},
  {s:"Bowie",club:"Verona",role:"Attaccante",nation:"Scozia"},
  {s:"Isaac",club:"Verona",role:"Attaccante",nation:"Brasile"},
  {s:"Ajayi",club:"Verona",role:"Attaccante",nation:"Costa d'Avorio"},
  {s:"Audero",club:"Cremonese",role:"Portiere",nation:"Indonesia"},
  {s:"Nava",club:"Cremonese",role:"Portiere",nation:"Italia"},
  {s:"Faye",club:"Cremonese",role:"Difensore",nation:"Senegal"},
  {s:"Luperto",club:"Cremonese",role:"Difensore",nation:"Italia"},
  {s:"Folino",club:"Cremonese",role:"Difensore",nation:"Italia"},
  {s:"Grassi",club:"Cremonese",role:"Centrocampista",nation:"Italia"},
  {s:"Bondo",club:"Cremonese",role:"Centrocampista",nation:"Francia"},
  {s:"Payero",club:"Cremonese",role:"Centrocampista",nation:"Argentina"},
  {s:"Thorsby",club:"Cremonese",role:"Centrocampista",nation:"Norvegia"},
  {s:"Maleh",club:"Cremonese",role:"Centrocampista",nation:"Marocco"},
  {s:"Zerbin",club:"Cremonese",role:"Ala",nation:"Italia"},
  {s:"Okereke",club:"Cremonese",role:"Attaccante",nation:"Nigeria"},
  {s:"Djuric",club:"Cremonese",role:"Attaccante",nation:"Bosnia"},
  {s:"Vardy",club:"Cremonese",role:"Attaccante",nation:"Inghilterra"}
];

// ── LINK ALLA PAGINA QUIZ COMPLETA ─────────────────────────────────────────
const QUIZ_URL = "https://universosportivo.com/quiz-calcio/";

// ── HELPER ──────────────────────────────────────────────────────────────────
function norm(s){
  return s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Z]/g,"");
}
function dayIndex(){
  return Math.floor((new Date() - new Date("2020-01-01")) / 86400000);
}
function seedRandom(seed){
  let s = seed;
  s = ((s>>16^s)*0x45d9f3b)&0xFFFFFFFF;
  s = ((s>>16^s)*0x45d9f3b)&0xFFFFFFFF;
  return ((s>>16^s)&0xFFFFFFFF)/0xFFFFFFFF;
}

// Parola del giorno — uguale per tutti gli embed
function getWordOfDay(){
  const idx = Math.floor(seedRandom(dayIndex()+424242) * POOL.length);
  return POOL[idx];
}

// Valutazione lettere (verde/giallo/grigio)
function evaluate(guess, target){
  const g = norm(guess).split("");
  const t = norm(target).split("");
  const res = g.map(c => ({c, s:"gray"}));
  const used = Array(t.length).fill(false);
  for(let i=0;i<g.length;i++){
    if(g[i]===t[i]){res[i].s="green"; used[i]=true;}
  }
  for(let i=0;i<g.length;i++){
    if(res[i].s==="green") continue;
    for(let j=0;j<t.length;j++){
      if(!used[j] && g[i]===t[j]){res[i].s="yellow"; used[j]=true; break;}
    }
  }
  return res;
}

// ── COLORI ────────────────────────────────────────────────────────────────
const C = {
  green:  "#22c55e",
  yellow: "#eab308",
  gray:   "#6b7280",
  empty:  "#f3f3f3",
  border: "#d4d4d4",
  black:  "#111111",
  orange: "#f5e000",
  ink:    "#1a1a1a",
};

const MAX = 6;

// ── CELLA FLIP ──────────────────────────────────────────────────────────────
function FlipCell({letter, color, colIdx, size, font}){
  const [revealed, setRevealed] = useState(false);
  const delay = colIdx * 180;
  useEffect(()=>{
    const t = setTimeout(()=>setRevealed(true), delay);
    return ()=>clearTimeout(t);
  }, []);
  const bg = {green:C.green, yellow:C.yellow, gray:C.gray}[color] || "#e0e0e0";
  return (
    <div style={{
      width:size, height:size, borderRadius:"4px",
      background: revealed ? bg : "#e0e0e0",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:font, fontWeight:800, color:"#fff",
      transition:`background 0.15s ${delay}ms, transform 0.45s ${delay}ms`,
      transform: revealed ? "scaleY(1)" : "scaleY(0.05)",
      letterSpacing:"1px"
    }}>
      {revealed ? letter : ""}
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────
export default function App(){
  const target = useMemo(()=>getWordOfDay(), []);
  const word = norm(target.s);
  const [attempts, setAttempts] = useState([]);
  const [current, setCurrent] = useState("");
  const [status, setStatus] = useState("playing"); // playing | won | lost
  const [shake, setShake] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [vw, setVw] = useState(typeof window!=="undefined"?window.innerWidth:640);

  // Rileva larghezza per layout responsive
  useEffect(()=>{
    function onResize(){ setVw(window.innerWidth); }
    window.addEventListener("resize", onResize);
    return ()=>window.removeEventListener("resize", onResize);
  }, []);
  const isMobile = vw < 560;

  // Dimensione celle adattiva
  const cellSize = word.length <= 6 ? 44 : 38;
  const cellFont = word.length <= 6 ? 19 : 16;

  // Inietta animazioni CSS una volta
  useEffect(()=>{
    const s = document.createElement("style");
    s.innerHTML = `
      @keyframes uwShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
      @keyframes uwPop{0%{transform:scale(0.9);opacity:0}100%{transform:scale(1);opacity:1}}
      .uw-shake{animation:uwShake 0.4s ease}
      .uw-pop{animation:uwPop 0.35s ease forwards}
      .uw-key:active{transform:scale(0.94)}
      .uw-cta:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,0.18)}
    `;
    document.head.appendChild(s);
    return ()=>{ if(s.parentNode) s.parentNode.removeChild(s); };
  }, []);

  function submit(){
    if(status!=="playing") return;
    if(norm(current).length !== word.length){
      setShake(true);
      setTimeout(()=>setShake(false), 400);
      return;
    }
    const evald = evaluate(current, word);
    const newAttempts = [...attempts, evald];
    setAttempts(newAttempts);
    setCurrent("");
    if(norm(current) === word){
      setStatus("won");
    } else if(newAttempts.length >= MAX){
      setStatus("lost");
    }
  }

  function pressKey(k){
    if(status!=="playing") return;
    if(k === "ENTER"){ submit(); return; }
    if(k === "DEL"){ setCurrent(c => c.slice(0,-1)); return; }
    if(norm(current).length < word.length){
      setCurrent(c => c + k);
    }
  }

  // Tastiera fisica — listener montato UNA sola volta, legge stato da ref
  const pressKeyRef = useRef(pressKey);
  pressKeyRef.current = pressKey;
  useEffect(()=>{
    function onKey(e){
      if(e.repeat) return;
      if(e.key === "Enter"){ e.preventDefault(); pressKeyRef.current("ENTER"); }
      else if(e.key === "Backspace"){ e.preventDefault(); pressKeyRef.current("DEL"); }
      else if(/^[a-zA-Z]$/.test(e.key)){ pressKeyRef.current(e.key.toUpperCase()); }
    }
    window.addEventListener("keydown", onKey);
    return ()=>window.removeEventListener("keydown", onKey);
  }, []);

  // Stato lettere per la tastiera colorata
  const keyState = {};
  attempts.flat().forEach(({c,s})=>{
    if(!keyState[c] || keyState[c]==="gray" || (keyState[c]==="yellow" && s==="green")){
      keyState[c] = s;
    }
  });

  const ROWS = ["QWERTYUIOP","ASDFGHJKL","ZXCVBNM"];
  const done = status !== "playing";

  return (
    <div style={{
      fontFamily:"'Helvetica Neue',Arial,sans-serif",
      maxWidth:"640px", margin:"0 auto", padding:"14px",
      background:"#fff", borderRadius:"14px",
      border:`1px solid ${C.border}`,
      boxShadow:"0 2px 12px rgba(0,0,0,0.06)"
    }}>
      {/* Header compatto */}
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"10px"}}>
        <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
          <span style={{fontSize:"20px"}}>🔤</span>
          <div>
            <div style={{fontSize:"8px", letterSpacing:"2px", textTransform:"uppercase", color:C.orange==="#f5e000"?"#c9a800":C.orange, fontWeight:700}}>Universo Sportivo</div>
            <div style={{fontSize:"14px", fontWeight:800, color:C.ink, lineHeight:1}}>Wordle Calcio</div>
          </div>
        </div>
        <div style={{fontSize:"10px", color:"#999", fontWeight:600}}>
          {word.length} lettere · {attempts.length}/{MAX}
        </div>
      </div>

      {!done && (
        <div style={{
          display:"flex", gap: isMobile?"10px":"14px",
          flexDirection: isMobile?"column":"row",
          alignItems:"center", justifyContent:"center"
        }}>
          {/* Griglia */}
          <div className={shake?"uw-shake":""} style={{display:"flex", flexDirection:"column", gap:"4px", flexShrink:0}}>
            {Array.from({length:MAX}).map((_, ri)=>{
              const att = attempts[ri];
              const isActive = ri === attempts.length && status==="playing";
              const disp = isActive
                ? norm(current).padEnd(word.length," ").slice(0,word.length).split("")
                : Array(word.length).fill(" ");
              return (
                <div key={ri} style={{display:"flex", gap:"4px"}}>
                  {Array.from({length:word.length}).map((_, ci)=>{
                    const filled = att ? att[ci] : null;
                    if(filled){
                      return <FlipCell key={ci} letter={filled.c} color={filled.s} colIdx={ci} size={cellSize} font={cellFont}/>;
                    }
                    const has = isActive && disp[ci].trim();
                    return (
                      <div key={ci} style={{
                        width:cellSize, height:cellSize, borderRadius:"4px",
                        background: has ? "#fff" : C.empty,
                        border: has ? "2.5px solid #999" : `2px solid ${C.border}`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:cellFont, fontWeight:800, color:C.ink,
                        transform: has ? "scale(1.04)" : "scale(1)",
                        transition:"transform 0.1s"
                      }}>
                        {isActive ? disp[ci].trim() : ""}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Indizio */}
            <button onClick={()=>setShowHint(h=>!h)} style={{
              marginTop:"4px", background:"none", border:`1px solid ${showHint?C.yellow:C.border}`,
              borderRadius:"5px", padding:"4px 8px", fontSize:"10px",
              color:showHint?"#a16207":"#999", cursor:"pointer", fontFamily:"inherit", fontWeight:600
            }}>
              💡 {showHint ? `${target.role} · ${target.club}` : "Indizio"}
            </button>
          </div>

          {/* Tastiera */}
          <div style={{flex:1, width:"100%", minWidth:isMobile?"auto":"240px", maxWidth:isMobile?"none":"340px"}}>
            {ROWS.map((row, ri)=>(
              <div key={ri} style={{display:"flex", gap:"5px", marginBottom:"5px", justifyContent:"center"}}>
                {ri===2 && (
                  <button className="uw-key" onClick={()=>pressKey("ENTER")} style={keyStyle("#1e293b","#fff",true)}>INVIO</button>
                )}
                {row.split("").map(k=>{
                  const st = keyState[k];
                  const bg = st==="green"?C.green : st==="yellow"?C.yellow : st==="gray"?C.gray : "#e8e8e8";
                  const col = st ? "#fff" : C.ink;
                  return (
                    <button key={k} className="uw-key" onClick={()=>pressKey(k)} style={keyStyle(bg, col)}>
                      {k}
                    </button>
                  );
                })}
                {ri===2 && (
                  <button className="uw-key" onClick={()=>pressKey("DEL")} style={keyStyle("#1e293b","#fff",true)}>⌫</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schermata finale con CTA */}
      {done && (
        <div className="uw-pop" style={{textAlign:"center", padding:"6px 4px"}}>
          <div style={{fontSize:"34px", marginBottom:"2px"}}>{status==="won"?"🎉":"😔"}</div>
          <div style={{fontSize:"15px", fontWeight:800, color:C.ink, marginBottom:"2px"}}>
            {status==="won" ? `Indovinato in ${attempts.length}/${MAX}!` : "Peccato!"}
          </div>
          <div style={{fontSize:"13px", color:"#666", marginBottom:"4px"}}>
            Il cognome era <strong style={{color:C.ink}}>{target.s}</strong>
          </div>
          <div style={{fontSize:"11px", color:"#999", marginBottom:"14px"}}>
            {target.role} · {target.club} · {target.nation}
          </div>

          {/* Griglia emoji riepilogo orizzontale */}
          <div style={{display:"flex", gap:"3px", justifyContent:"center", marginBottom:"16px", flexWrap:"wrap"}}>
            {attempts.map((row, i)=>(
              <div key={i} style={{display:"flex", gap:"2px"}}>
                {row.map((cell, j)=>(
                  <div key={j} style={{
                    width:"14px", height:"14px", borderRadius:"2px",
                    background: cell.s==="green"?C.green : cell.s==="yellow"?C.yellow : C.gray
                  }}/>
                ))}
              </div>
            ))}
          </div>

          {/* CALL TO ACTION */}
          <a href={QUIZ_URL} target="_blank" rel="noopener noreferrer" className="uw-cta" style={{
            display:"block", textDecoration:"none",
            background:C.ink, color:"#fff", borderRadius:"10px",
            padding:"14px 16px", transition:"all 0.2s",
            boxShadow:"0 3px 10px rgba(0,0,0,0.12)"
          }}>
            <div style={{fontSize:"13px", fontWeight:700, marginBottom:"3px", lineHeight:1.4}}>
              Vuoi giocare ancora?
            </div>
            <div style={{fontSize:"11px", color:"#bbb", marginBottom:"8px", lineHeight:1.4}}>
              Prova altri wordle o giochi simili come Calciodle, l'Impiccato e molti altri!
            </div>
            <div style={{
              display:"inline-block", background:C.orange, color:C.ink,
              borderRadius:"6px", padding:"7px 16px", fontSize:"12px", fontWeight:800
            }}>
              🎮 Gioca ai quiz di Universo Sportivo →
            </div>
          </a>
        </div>
      )}
    </div>
  );
}

function keyStyle(bg, col, big){
  return {
    flex: big?1.6:1, minWidth:0, height:"46px", padding:"0 1px",
    background:bg, color:col, border:"1px solid rgba(0,0,0,0.08)",
    borderRadius:"6px", fontSize:big?"11px":"15px", fontWeight:700,
    cursor:"pointer", fontFamily:"inherit", transition:"transform 0.08s",
    touchAction:"manipulation", display:"flex", alignItems:"center", justifyContent:"center"
  };
}
