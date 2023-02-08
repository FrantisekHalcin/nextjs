import React from "react";
import { nacitajAuta, nacitajZakaznikov, AdminNav, AdminFoot, Dole, Hore } from ".";
import { DetailAuta } from "./ZoznamAutZakaznik"
import moment from "moment";
import 'moment/locale/sk';
import { toast } from "react-toastify";


let auta = [];
let zakaznici = [];

const DefaultOnSSR = () => <span></span>;

function overDostupnostTeraz() {

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


class ZoznamAutAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.state = { canRender: false, koeficient: "" };

    }

    componentDidMount() {
        auta = nacitajAuta();
        zakaznici = nacitajZakaznikov();
        this.setState({ auta: JSON.parse(localStorage.getItem("zoznamAut")), canRender: true });
    }

    render() {

        const { children, onSSR = <DefaultOnSSR /> } = this.props;
        const { canRender } = this.state;
        overDostupnostTeraz();


        return canRender ? <>
            <Hore />
            <AdminNav />
            <div style={{ color: "grey", textAlign: "center" }}>počet áut <strong>{auta.length}</strong></div>
            <br />
            <table className="home"><thead><tr>
                <th></th><th>Auto</th><th>ŠPZ</th><th>Koeficient</th><th></th><th></th></tr></thead><tbody>
                    {auta.map((auto, poradie) => <tr key={poradie}>
                        <td><DetailAuta poradie={poradie} meno={auto.nazov} img={auto.imgUrl} typ={auto.typ} sks={auto.sks} objem={auto.objem} palivo={auto.palivo} spotreba={auto.spotreba} dostupnost={auto.dostupnost} rok={auto.rok} kapacita={auto.kapacita} /></td>
                        <td>{auto.nazov}</td>
                        <td>{auto.spz}</td>
                        <td><input type="number" min="1" max="3" step="0.1" placeholder={auto.koeficient} style={{ width: "49px" }}
                            onChange={(event) => { auto.koeficient = event.target.value; }}></input>
                        </td>

                        <td><img src={auto.imgUrl} alt={auto.nazov} height="40" /></td>
                        <td><button className="btn btn-danger btn-sm" onClick={() => {
                            let zaciatok = auta.slice(0, poradie);
                            let koniec = auta.slice(poradie + 1, auta.length);
                            auta = zaciatok.concat(koniec);

                            localStorage.setItem("zoznamAut", JSON.stringify(auta));
                            this.setState({ auta: nacitajAuta() });

                            toast('Auto bolo vymazané zo zoznamu', { hideProgressBar: true, autoClose: 3000, type: 'error', position: 'top-right' })

                        }}>Vymaž auto</button></td>

                    </tr>)}
                    <tr><td colSpan={3}></td>
                        <td><button className="btn btn-secondary btn-sm p-1" onClick={() => {
                            localStorage.setItem("zoznamAut", JSON.stringify(auta));
                            this.setState({ auta: nacitajAuta() });

                            toast('Zmeny koeficientu boli uložené', { hideProgressBar: true, autoClose: 3000, type: 'warning', position: 'top-right' })
                        }}>ulož zmeny</button></td>
                        <td colSpan={2}></td></tr></tbody>
            </table>
            <AdminFoot />
            <Dole />
        </> : onSSR;

    }
}


export default ZoznamAutAdmin;