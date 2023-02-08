import React from "react";
import moment from "moment";
import 'moment/locale/sk';
import { ZakaznikNav, ZakaznikFoot, nacitajZakaznikov, Hore, Dole, Baner } from ".";
import { toast } from "react-toastify";


let zakaznici = [];

class FormularZakaznik extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nazov: "", spz: "", carOut: "", carIn: "", cena: "", imgUrl: "" }
    }

    componentDidMount() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        zakaznici = nacitajZakaznikov();
        this.setState({ nazov: urlParams.get('nazov'), spz: urlParams.get('spz'), carOut: urlParams.get('carOut'), carIn: urlParams.get('carIn'), cena: urlParams.get('cena'), imgUrl: urlParams.get('imgUrl') })
    }

    zmena(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    pridajZakaznika(event) {

        event.preventDefault();

        if (this.state.meno == null || this.state.priezvisko == null || this.state.email == null || this.state.cislo == null
            || this.state.meno == "" || this.state.priezvisko == "" || this.state.email == "" || this.state.cislo == "") {
            alert("Vyplňte prosím všetky údaje!")
        } else {

            const novyZakaznik = {};
            novyZakaznik.meno = this.state.meno;
            novyZakaznik.priezvisko = this.state.priezvisko;
            novyZakaznik.email = this.state.email;
            novyZakaznik.telefon = this.state.cislo;
            novyZakaznik.auto = this.state.nazov;
            novyZakaznik.spzAuta = this.state.spz;
            novyZakaznik.carOut = this.state.carOut;
            novyZakaznik.carIn = this.state.carIn;
            novyZakaznik.cena = this.state.cena;


            zakaznici.push(novyZakaznik);

            localStorage.setItem("zoznamZakaznikov", JSON.stringify(zakaznici));
            toast('Rezervácia bola úspešne dokončená. Ďakujeme za vašu dôveru :)', { hideProgressBar: true, autoClose: 4000, type: 'success', position: 'top-right' })

        }
    }

    render() {

        return <>
            <Hore />
            <ZakaznikNav />
            <Baner />
            <div><form>
                <table className="vstupnyFormular">

                    <tbody>
                        <tr>
                            <th className="modalTh"><label htmlFor="meno">Meno:</label></th>
                            <td><input type="text" id="meno" name="meno" required onChange={(event) => this.zmena(event)} /></td></tr>
                        <tr>
                            <th className="modalTh"><label htmlFor="priezvisko" required>Priezvisko:</label></th>
                            <td><input type="text" id="priezvisko" name="priezvisko" onChange={(event) => this.zmena(event)} /></td></tr>
                        <tr>
                            <th className="modalTh"><label htmlFor="email">E-Mail: </label></th>
                            <td><input type="email" id="email" name="email" required onChange={(event) => this.zmena(event)} /></td></tr>
                        <tr>
                            <th className="modalTh"><label htmlFor="cislo">Telefónne číslo: </label></th>
                            <td><input type="text" id="cislo" name="cislo" minLength={10} required onChange={(event) => this.zmena(event)} /></td>
                        </tr>

                        <tr><td colSpan="2" style={{ textAlign: "center" }}><img src={this.state.imgUrl} alt={this.state.nazov} height="80" /></td></tr>
                        <tr><th className="modalTh"><label>Názov auta:</label></th><td>{this.state.nazov}</td></tr>
                        <tr><th className="modalTh"><label>ŠPZ auta:</label></th><td>{this.state.spz}</td></tr>
                        <tr><th className="modalTh"><label>Dátum vyzdvihnutia:</label></th><td>{moment(this.state.carOut).format('LL')}</td></tr>
                        <tr><th className="modalTh"><label>Dátum vrátenia:</label></th><td>{moment(this.state.carIn).format('LL')}</td></tr>
                        <tr><th className="modalTh"><label>Výsledná cena:</label></th><td>{Math.round(this.state.cena)} €</td></tr>
                        <tr></tr>
                        <tr><td colSpan="2" style={{ textAlign: "center" }}><button className="btn btn-success btn-sm mt-4" onClick={(event) => { this.pridajZakaznika(event) }}>Prenajať auto</button></td></tr>
                    </tbody></table></form></div>
            <ZakaznikFoot />
            <Dole />
        </>
    }
}

export default FormularZakaznik;