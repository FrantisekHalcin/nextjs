import React from 'react'
import { ZakaznikNav, Baner, nacitajAuta, nacitajZakaznikov, Hore, ZakaznikFoot, Dole } from '.'
import { DetailAuta } from "./ZoznamAutZakaznik"
import { FaCarSide, FaArrowRight, FaWarehouse } from "react-icons/fa";
import moment from 'moment';
import 'moment/locale/sk';
import Link from 'next/link';


let auta = [];
let zakaznici = [];

function overDostupnost(datumVyzdvihnutia, datumVratenia) {
    auta.map((auto) => {
        for (let i = 0; i < zakaznici.length; i++) {
            if (auto.spz == zakaznici[i].spzAuta) {

                if (datumVyzdvihnutia >= moment(zakaznici[i].carOut).valueOf() && datumVyzdvihnutia <= moment(zakaznici[i].carIn).valueOf()) {
                    auto.dostupnost = "nie";
                    break;
                } else if (datumVratenia >= moment(zakaznici[i].carOut).valueOf() && datumVratenia <= moment(zakaznici[i].carIn).valueOf()) {
                    auto.dostupnost = "nie";
                    break;
                } else if (datumVyzdvihnutia <= moment(zakaznici[i].carOut).valueOf() && datumVratenia >= moment(zakaznici[i].carIn).valueOf()) {
                    auto.dostupnost = "nie";
                    break;
                }
                else { auto.dostupnost = "áno" }

            } else { auto.dostupnost = "áno" }
        }
    })
}


class PrenajmiAuto extends React.Component {

    constructor(props) {
        super(props);
        this.state = { datum1: "", datum2: "" }
    }

    zmena(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {

        return <>
            <Hore />
            <ZakaznikNav />
            <Baner />
            <div className='home'>


                <h5>Zadajte prosím vstupné údaje a systém vám vygeneruje všetky dostupné autá na požadované obdobie.</h5>
                <br />
                <table className='home'>
                    <thead>
                        <tr>
                            <th>Dátum vyzdvihnutia auta</th>
                            <th>Dátum vrátenia auta</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='pt-4 pb-4'>
                                <input type="date" id="datum1" name="datum1" onChange={(event) => this.zmena(event)}></input>
                            </td>
                            <td className='pt-4 pb-4'>
                                <input type="date" id="datum2" name="datum2" onChange={(event) => this.zmena(event)}></input>
                            </td>
                        </tr>
                        <tr>
                            <td className='ikona'>
                                <FaWarehouse className='garaz' /><FaArrowRight className='sipka' /><FaCarSide className='auto' />
                            </td>
                            <td>
                                <FaCarSide className='auto' /><FaArrowRight className='sipka' />
                                <FaWarehouse className="garaz" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <PonukaDostupnychAut datum1={this.state.datum1} datum2={this.state.datum2} />
            </div>
            <ZakaznikFoot />
            <Dole />
        </>;
    }
}

export class PonukaDostupnychAut extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        auta = nacitajAuta();
        zakaznici = nacitajZakaznikov();
    }

    render() {
        if (moment(this.props.datum1).valueOf() > moment(this.props.datum2).valueOf()) {
            alert("Auto nemôžeš vrátiť skôr ako si ho požičiaš :)");
            return <></>;
        }



        if (this.props.datum1 == "" || this.props.datum2 == "") {
            return <></>;
        }

        let datumVyzdvihnutia = moment(this.props.datum1).valueOf();
        let datumVratenia = moment(this.props.datum2).valueOf();


        let pocetDniPrenajmu = (datumVratenia - datumVyzdvihnutia) / (1000 * 60 * 60 * 24);
        if (pocetDniPrenajmu == 0) {
            pocetDniPrenajmu = 1;
        }

        let cenaZaDenPrenajmu = 30;

        if (pocetDniPrenajmu <= 14) {
            cenaZaDenPrenajmu = 40;
        }
        if (pocetDniPrenajmu <= 7) {
            cenaZaDenPrenajmu = 50;
        }
        if (pocetDniPrenajmu <= 3) {
            cenaZaDenPrenajmu = 60;
        }

        let cenaPrenajmu = pocetDniPrenajmu * cenaZaDenPrenajmu;

        overDostupnost(datumVyzdvihnutia, datumVratenia);

        return <div><hr /><table className='home'><thead><tr><th></th><th>Názov</th><th style={{ width: 100 }}>Cena</th><th></th><th></th></tr></thead><tbody>
            {auta.map((auto, poradie) => {
                if (auto.dostupnost == "áno") {
                    return <tr key={poradie}>
                        <td><img src={auto.imgUrl} alt={auto.nazov} style={{minWidth: "50px"}} height="40"/></td>
                        <td>{auto.nazov}</td>
                        <td>{Math.round(auto.koeficient * cenaPrenajmu)} €</td>
                        <td className='p-0'><DetailAuta poradie={poradie} meno={auto.nazov} img={auto.imgUrl} typ={auto.typ} sks={auto.sks} objem={auto.objem} palivo={auto.palivo} spotreba={auto.spotreba} dostupnost={auto.dostupnost} rok={auto.rok} kapacita={auto.kapacita} /></td>
                        <td className='p-0'><Link href={`/FormularZakaznik?nazov=${auto.nazov}&spz=${auto.spz}&carOut=${this.props.datum1}&carIn=${this.props.datum2}&cena=${auto.koeficient * cenaPrenajmu}&imgUrl=${auto.imgUrl}`}><button className="btn btn-success btn-sm">prenajať</button></Link></td>
                    </tr>
                }
            }
            )}</tbody>
        </table></div>
    }
}
export default PrenajmiAuto;