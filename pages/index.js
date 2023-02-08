import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import React from 'react'
import { FaCarSide, FaArrowRight, FaWarehouse } from "react-icons/fa";
import Link from 'next/link'




const inter = Inter({ subsets: ['latin'] })

var auta = [];
var zakaznici = [];
var recenzie = [];

export function nacitajAuta() {

    auta = JSON.parse(localStorage.getItem("zoznamAut"));

    if (auta == null) {
        auta = [
            {
                "nazov": "Škoda Octavia",
                "spz": 1,
                "typ": "kombi",
                "kapacita": 5,
                "objem": 1.9,
                "palivo": "nafta",
                "spotreba": 6.5,
                "koeficient": 1.2,
                "rok": 2018,
                "sks": "áno",
                "dostupnost": "",
                "imgUrl": "images/octavia.png"

            },
            {
                "nazov": "Toyota Corolla",
                "spz": 2,
                "typ": "hatchback",
                "kapacita": 5,
                "objem": 1.8,
                "palivo": "benzín",
                "spotreba": 5.4,
                "sks": "nie",
                "koeficient": 1.8,
                "rok": 2020,
                "dostupnost": "",
                "imgUrl": "images/corolla.png"
            },
            {
                "nazov": "VW Polo",
                "spz": 3,
                "typ": "sedan",
                "kapacita": 5,
                "objem": 1.2,
                "palivo": "benzín",
                "spotreba": 5.9,
                "koeficient": 1.1,
                "rok": 2019,
                "sks": "nie",
                "imgUrl": "images/polo.png"
            },
            {
                "nazov": "Suzuki Vitara",
                "spz": 4,
                "typ": "SUV",
                "kapacita": 5,
                "objem": 1.8,
                "palivo": "benzín",
                "spotreba": 6.2,
                "koeficient": 2.0,
                "rok": 2022,
                "sks": "nie",
                "dostupnost": "",
                "imgUrl": "images/vitara.png"
            },
            {
                "nazov": "Audi A6",
                "spz": 5,
                "typ": "hatchback",
                "kapacita": 5,
                "objem": 2.5,
                "palivo": "hybrid",
                "spotreba": 7.3,
                "koeficient": 1.7,
                "rok": 2021,
                "sks": "áno",
                "dostupnost": "",
                "imgUrl": "images/a6.png"
            },
            {
                "nazov": "Seat Alhambra",
                "spz": 6,
                "typ": "hatchback",
                "kapacita": 8,
                "objem": 1.8,
                "palivo": "nafta",
                "spotreba": 5.2,
                "sks": "nie",
                "koeficient": 1.5,
                "rok": 2017,
                "dostupnost": "",
                "imgUrl": "images/alhambra.png"
            },
            {
                "nazov": "Citroen C5",
                "spz": 7,
                "typ": "hatchback",
                "kapacita": 5,
                "objem": 1.8,
                "palivo": "benzín",
                "spotreba": 5.4,
                "sks": "nie",
                "koeficient": 1.3,
                "rok": 2018,
                "dostupnost": "",
                "imgUrl": "images/c5.png"
            },
            {
                "nazov": "Mercedes Benz",
                "spz": 8,
                "typ": "hatchback",
                "kapacita": 8,
                "objem": 2.5,
                "palivo": "nafta",
                "spotreba": 7.4,
                "sks": "nie",
                "koeficient": 2.3,
                "rok": 2022,
                "dostupnost": "",
                "imgUrl": "images/benz.png"
            },
            {
                "nazov": "Volvo v40",
                "spz": 9,
                "typ": "hatchback",
                "kapacita": 5,
                "objem": 1.8,
                "palivo": "hybrid",
                "spotreba": 3.6,
                "sks": "nie",
                "koeficient": 1.9,
                "rok": 2020,
                "dostupnost": "",
                "imgUrl": "images/v40.png"
            },
            {
                "nazov": "Hyundai SantaFe",
                "spz": 10,
                "typ": "SUV",
                "kapacita": 5,
                "objem": 1.9,
                "palivo": "hybrid",
                "spotreba": 5.4,
                "sks": "áno",
                "koeficient": 1.6,
                "rok": 2020,
                "dostupnost": "",
                "imgUrl": "images/santafe.png"
            },
            {
                "nazov": "Nissan Murano",
                "spz": 11,
                "typ": "sedan",
                "kapacita": 5,
                "objem": 1.2,
                "palivo": "benzín",
                "spotreba": 4.4,
                "sks": "nie",
                "koeficient": 1.4,
                "rok": 2019,
                "dostupnost": "",
                "imgUrl": "images/murano.png"
            },
            {
                "nazov": "Peugeot 3008",
                "spz": 12,
                "typ": "SUV",
                "kapacita": 8,
                "objem": 1.8,
                "palivo": "hybrid",
                "spotreba": 6.4,
                "sks": "áno",
                "koeficient": 1.7,
                "rok": 2021,
                "dostupnost": "",
                "imgUrl": "images/3008.png"
            }
        ]
    }
    return auta;
}

export function nacitajZakaznikov() {

    zakaznici = JSON.parse(localStorage.getItem("zoznamZakaznikov"));

    if (zakaznici == null) {
        zakaznici = [
            {
                "meno": "Ján",
                "priezvisko": "Novák",
                "email": "jn@gmail.com",
                "telefon": "0901234567",
                "auto": "Škoda Octavia",
                "spzAuta": 1,
                "carOut": "2023-01-18",
                "carIn": "2023-02-05",
                "cena": 1053
            },
            {
                "meno": "Peter",
                "priezvisko": "Boss",
                "email": "pbd@gmail.com",
                "telefon": "090123489",
                "auto": "Suzuki Vitara",
                "spzAuta": 4,
                "carOut": "2023-01-11",
                "carIn": "2023-02-12",
                "cena": 1344
            },
            {
                "meno": "Harry",
                "priezvisko": "Potter",
                "email": "hp@gmail.com",
                "telefon": "090123488",
                "auto": "Mercedes Benz",
                "spzAuta": 8,
                "carOut": "2023-01-20",
                "carIn": "2023-02-11",
                "cena": 890
            },
            {
                "meno": "John",
                "priezvisko": "Snow",
                "email": "gsa@gmail.com",
                "telefon": "090123489",
                "auto": "Volvo V40",
                "spzAuta": 9,
                "carOut": "2023-02-6",
                "carIn": "2023-02-12",
                "cena": 540
            },
            {
                "meno": "Jozef",
                "priezvisko": "Mrkvicka",
                "email": "dadg@gmail.com",
                "telefon": "090123489",
                "auto": "Nissan Murano",
                "spzAuta": 11,
                "carOut": "2023-02-11",
                "carIn": "2023-03-25",
                "cena": 1848
            },
            {
                "meno": "John",
                "priezvisko": "Rambo",
                "email": "adffg@gmail.com",
                "telefon": "090123489",
                "auto": "Peugeout 3008",
                "spzAuta": 12,
                "carOut": "2023-02-18",
                "carIn": "2023-03-12",
                "cena": 965
            },
            {
                "meno": "Oliver",
                "priezvisko": "Twist",
                "email": "sdfv@gmail.com",
                "telefon": "090123489",
                "auto": "Audi A6",
                "spzAuta": 5,
                "carOut": "2023-02-11",
                "carIn": "2023-03-12",
                "cena": 1654
            },
            {
                "meno": "Lara",
                "priezvisko": "Craft",
                "email": "pet.hosa@gmail.com",
                "telefon": "090123489",
                "auto": "VW Polo",
                "spzAuta": 3,
                "carOut": "2023-02-20",
                "carIn": "2023-04-12",
                "cena": 1985
            },
            {
                "meno": "Forest",
                "priezvisko": "Gump",
                "email": "sdfbb@gmail.com",
                "telefon": "090123489",
                "auto": "Škoda Octavia",
                "spzAuta": 1,
                "carOut": "2023-02-6",
                "carIn": "2023-04-12",
                "cena": 2325
            },
            {
                "meno": "Janko",
                "priezvisko": "Hraško",
                "email": "asfd@aabb.com",
                "telefon": "090123489",
                "auto": "Seat Alhambra",
                "spzAuta": 6,
                "carOut": "2023-02-20",
                "carIn": "2023-03-29",
                "cena": 1680
            }
        ]
    }

    return zakaznici;
}

export function nacitajRecenzie() {

    recenzie = JSON.parse(localStorage.getItem("recenzie"));

    if (recenzie == null) {
        recenzie = [
            {
                "meno": "Janci",
                "hodnotenie": 5,
                "obsah": "RentACar je nás dlhoročný partner, spolupracujeme už dlhý čas. Vzhľadom na náročné prostredie, v ktorom        pracujeme, oceňujeme hlavne ich flexibilitu a ústretovosť.",
                "datum": "2022-03-18"
            },
            {
                "meno": "Peto",
                "hodnotenie": 4,
                "obsah": "Ďakujeme za spoľahlivé služby a kvalitný servis Vašej spoločnosti. Určite sa na Vás obrátime aj v budúcnosti.",
                "datum": "2022-05-20"
            },
            {
                "meno": "Juro",
                "hodnotenie": 5,
                "obsah": "So službami spoločnosti Rentacar sme nadmieru spokojní. Vždy nám vedia rýchlo, včas a za dobrú cenu dodať autá podľa požiadavky. Služby využívame už dlhodobo a plánujeme spoluprácu aj do budúcnosti.",
                "datum": "2022-06-28"
            },
            {
                "meno": "Lenka",
                "hodnotenie": 4,
                "obsah": "Super služby, ochota personálu.",
                "datum": "2022-08-03"
            },
            {
                "meno": "Magda",
                "hodnotenie": 3,
                "obsah": "Ochotu personálu hodnotím pozitívne. Auto mohlo byť aj čistejšie...",
                "datum": "2022-10-13"
            }
        ]
    }

    return recenzie;
}

export class Hore extends React.Component {
    render() {
        return <div className="okraj">Táto stránka je len skúšobná. Všetky údaje sú vymyslené.</div>
    }
}

export class Dole extends React.Component {
    render() {
        return <div className="okraj">2023 All Rights Reserved</div>
    }
}


export class ZakaznikHome extends React.Component {
    render() {
        return <>
            <div className='home'>
                <h2>Spoločnosť RentACar - spoľahlivý partner</h2>
                <p>Na trhu pôsobíme od roku 2017. Orientujeme sa na všetkých zákazníkov, ktorí si potrebujú požičať motorové vozidlo, alebo využiť možnosť rýchlej a pohodlnej prepravy na letisko či akékoľvek iné miesto podľa ich potreby. V rámci pôsobnosti našej spoločnosti na celom území Slovenska vám vieme zabezpečiť regionálne zastúpenie čo najbližšie k vám a garantovať rýchle, flexibilné a spoľahlivé služby.</p><br /><br />
                <div style={{ width: "100%", display: "block" }}>

                    <table style={{ width: "80%", margin: "auto" }}><tbody>

                        <tr><td rowSpan="8" style={{ width: "40%" }}><img src="images/adress.jpg" alt="adress" width={300} style={{ width: "100%" }} /></td><th>Naša adresa:</th><td>Nová 34, 05907 Poprad</td></tr>
                        <tr><th>Telefónne číslo:</th><td>00421/901654321</td></tr>
                        <tr><th>Email:</th><td>rentacar@info.sk</td></tr>
                        <tr><th>Otváracie hodiny:</th><td>Každý deň od 8:00 do 19:00</td></tr>
                    </tbody></table>
                </div><br /><br /><br />


                <p>Zabezpečujeme regionálne zastúpenie v nasledovných lokalitách: Poprad, Košice, Prešov. Rýchle, profesionálne a flexibilné služby tak vieme zabezpečiť čo najbližšie k vám.
                    Spolupracujeme s významnými spoločnosťami v rámci celej Európy akými sú výrobné spoločnosti, poisťovne, leasingové a asistenčné spoločnosti, hotely a mnoho ďalších.</p>

                <p>Nechajte starosti s vašimi firemnými vozidlami na nás. Postaráme sa komplexne o vaše vozidlá, o ich správu, údržbu a servis, poistenie a likvidáciu poistných udalostí. Zabezpečíme vám kompletnú mobilitu, asistenciu na cestách či náhradné vozidlá, aby ste sa odviezli vždy tam, kam máte namierené.</p>

            </div>
        </>
    }
}

export class AdminHome extends React.Component {
    render() {
        return <h2>Nachádzate sa v sekcii Administrátor</h2>;
    }
}

export class ZakaznikNav extends React.Component {
    render() {
        return <nav>
            <Link href="/" className="navLink btn btn-primary">O nás</Link>
            <Link href="/ZoznamAutZakaznik" className="navLink btn btn-primary">Zoznam áut</Link>
            <Link href="/PrenajmiAuto" className="navLink btn btn-primary">Prenajmi si auto</Link>
            <Link href="/Recenzie" className="navLink btn btn-primary">Recenzie</Link>
        </nav>
    }
}


export class ZakaznikFoot extends React.Component {
    render() {
        return <footer>Aktívny mód <strong>Zákazník | </strong>
            Prepni na mód <Link href="/ZoznamAutAdmin" className="btn btn-primary btn-sm">Administrátor</Link>

        </footer>
    }
}

export class AdminNav extends React.Component {
    render() {
        return <nav>
            <Link href="/ZoznamAutAdmin" className="navLink btn btn-warning">Zoznam áut</Link>
            <Link href="/FormularAuto" className="navLink btn btn-warning">Pridaj auto</Link>
            <Link href="/ZoznamZakaznikov" className="navLink btn btn-warning">Zoznam zákazníkov</Link>
            <Link href="/RecenzieAdmin" className="navLink btn btn-warning">Recenzie</Link>
        </nav>
    }
}

export class AdminFoot extends React.Component {
    render() {
        return <footer>Aktívny mód <strong>Administrátor | </strong>
            Prepni na mód <Link href="/" className="btn btn-warning btn-sm">Zákazník</Link>

        </footer>
    }
}

export class Baner extends React.Component {
    render() {
        return <div className='baner'>
            <div className="logo">
                <h1>RentACar</h1>
                <FaCarSide style={{ fontSize: "40", color: "red" }} /><FaArrowRight style={{ fontSize: "30" }} />
                <FaWarehouse style={{ fontSize: "60" }} /><FaArrowRight style={{ fontSize: "30" }} /><FaCarSide style={{ fontSize: "40", color: "blue" }} />
            </div>
        </div>
    }
}


class Zakaznik extends React.Component {
    render() {
        return <>
            <Hore />
            <ZakaznikNav />
            <Baner />
            <ZakaznikHome />
            <ZakaznikFoot />
            <Dole />
        </>
    }
}

export default Zakaznik;

