import React from "react";
import { nacitajAuta, nacitajZakaznikov, ZakaznikFoot, ZakaznikNav, Hore, Dole } from ".";
import moment from "moment";
import 'moment/locale/sk';

let auta = [];
let zakaznici = [];
const DefaultOnSSR = () => <span></span>;

export function overDostupnostTeraz() {

    auta.map((auto) => {
        auto.dostupnost = "áno";
        for (let i = 0; i < zakaznici.length; i++) {
            if (auto.spz == zakaznici[i].spzAuta) {
                if (moment().valueOf() > moment(zakaznici[i].carOut).valueOf() && moment().valueOf() < moment(zakaznici[i].carIn).valueOf()) {
                    auto.dostupnost = "nie";
                    break;
                }
            }
        }
    })

}

class ZoznamAutZakaznik extends React.Component {
    constructor(props) {
        super(props);
        this.state = { auta: [], canRender: false };
    }

    componentDidMount() {

        auta = nacitajAuta();
        zakaznici = nacitajZakaznikov();

        this.setState({ canRender: true });
    }

    render() {

        const { onSSR = <DefaultOnSSR /> } = this.props;
        const { canRender } = this.state;
        overDostupnostTeraz();

        return <div>
            <Hore />
            <ZakaznikNav />
            <div style={{ color: "grey", textAlign: "center" }}>počet áut <strong>{auta.length}</strong></div><br />
            <table className="home">
                <thead><tr>
                    <th></th><th>Auto</th><th>Objem</th><th>Palivo</th><th>Aktuálna dostupnosť</th></tr></thead>
                <tbody>
                    {auta.map((auto, poradie) => <tr key={poradie}>
                        <td><img src={auto.imgUrl} height="40" /></td>
                        <td>{auto.nazov}</td>
                        <td>{auto.objem}</td>
                        <td>{auto.palivo}</td>
                        <td>{auto.dostupnost}</td>
                        <td><DetailAuta poradie={poradie} meno={auto.nazov} img={auto.imgUrl} typ={auto.typ} sks={auto.sks} objem={auto.objem} palivo={auto.palivo} spotreba={auto.spotreba} dostupnost={auto.dostupnost} rok={auto.rok} kapacita={auto.kapacita} /></td>
                    </tr>)}</tbody>
            </table>
            <ZakaznikFoot />
            <Dole />
        </div>;
    }
}


export class DetailAuta extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div className="container">
                <button
                    type="button"
                    className="btn btn-success btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target={"#Modal" + this.props.poradie}

                >
                    detail
                </button>

                <div
                    className="modal fade"
                    id={"Modal" + this.props.poradie}
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Špecifikácia a parametre auta
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <table className="modalTable" style={{ border: "0px" }}>
                                    <tbody>
                                        <tr><td colSpan="2"><img src={this.props.img} height="200" /></td></tr>
                                        <tr><th className="modalTh">Názov: </th><td>{this.props.meno}</td></tr>
                                        <tr><th className="modalTh">Typ: </th><td>{this.props.typ}</td></tr>
                                        <tr><th className="modalTh">Objem: </th><td>{this.props.objem}</td></tr>
                                        <tr><th className="modalTh">Rok výroby: </th><td>{this.props.rok}</td></tr>
                                        <tr><th className="modalTh">Palivo: </th><td>{this.props.palivo}</td></tr>
                                        <tr><th className="modalTh">Spotreba: </th><td>{this.props.spotreba}</td></tr>
                                        <tr><th className="modalTh">4 X 4: </th><td>{this.props.sks}</td></tr>
                                        <tr><th className="modalTh">Kapacita: </th><td>{this.props.kapacita}</td></tr>
                                        <tr><th className="modalTh">Aktuálna dostupnosť: </th><td>{this.props.dostupnost}</td></tr>
                                    </tbody>
                                </table></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

}


export default ZoznamAutZakaznik;