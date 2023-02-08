import React from "react";
import { AdminNav, AdminFoot, nacitajZakaznikov, Hore, Dole } from ".";
import moment from "moment";
import 'moment/locale/sk';

let zakaznici = [];
const DefaultOnSSR = () => <span></span>;

class ZoznamZakaznikov extends React.Component {
    constructor(props) {
        super(props)
        this.state = { zakaznici: [], canRender: false, hladaneMeno: "", hladaneSpz: "" };
        
    }

    componentDidMount() {
        zakaznici = nacitajZakaznikov();
        localStorage.setItem("zoznamZakaznikov", JSON.stringify(zakaznici));
        this.setState({ zakaznici: JSON.parse(localStorage.getItem("zoznamZakaznikov")), canRender: true });
        
    }

    render() {

        const { children, onSSR = <DefaultOnSSR /> } = this.props;
        const { canRender } = this.state;

        return canRender ? <>
        <Hore />
            <AdminNav />
           
                <div style={{color: "grey", textAlign: "center"}}>celkový počet klientov <strong>{zakaznici.length}</strong></div>
                <br/>
            
            <table className="home">
                <thead> 
                <tr>
                        <th></th><th colSpan={2}><input type="search" placeholder="meno / priezvisko" onChange={(event=>this.setState({hladaneMeno: event.target.value}))}/></th><th></th><th><input type="search" placeholder="špz" style={{width: "50px"}} onChange={(event=>this.setState({hladaneSpz: event.target.value}))}/></th><th></th><th></th></tr>
                    <tr>
                        <th></th><th>Meno</th><th>Priezvisko</th><th>Auto</th><th>ŠPZ</th><th className="schovaj">Vyzdvihnutie</th><th className="schovaj">Vrátenie</th></tr></thead><tbody>
                    {this.state.zakaznici.filter((zakaznik)=>zakaznik.meno.toUpperCase().includes(this.state.hladaneMeno.toUpperCase()) && zakaznik.spzAuta.toString().includes(this.state.hladaneSpz.toString()) || zakaznik.priezvisko.toUpperCase().includes(this.state.hladaneMeno.toUpperCase()) &&
                    zakaznik.spzAuta.toString().includes(this.state.hladaneSpz.toString())).
                    map((zakaznik, poradie) => <tr key={poradie} style={{ color: moment().valueOf() > moment(zakaznik.carIn).valueOf()? 'grey' :
                    moment().valueOf() < moment(zakaznik.carOut).valueOf()? 'black' : "green",
                    backgroundColor: moment().valueOf() > moment(zakaznik.carOut).valueOf() && moment().valueOf() < moment(zakaznik.carIn).valueOf() && "#E0FFFF"
                    }}>
                        <td><DetailZakaznika poradie={poradie} meno={zakaznik.meno} priezvisko={zakaznik.priezvisko}  telefon={zakaznik.telefon} email={zakaznik.email} auto={zakaznik.auto} spz={zakaznik.spzAuta} cena={zakaznik.cena} dni={Math.round((moment(zakaznik.carIn).valueOf() - moment(zakaznik.carOut).valueOf()) / (1000 * 60 * 60 * 24))} carOut={moment(zakaznik.carOut).format('L')} carIn={moment(zakaznik.carIn).format('L')} /></td>  
                        <td>{zakaznik.meno}</td>
                        <td>{zakaznik.priezvisko}</td>
                        <td>{zakaznik.auto}</td>
                        <td>{zakaznik.spzAuta}</td>
                        <td className="schovaj">{moment(zakaznik.carOut).format('L')}</td>
                        <td className="schovaj">{moment(zakaznik.carIn).format('L')}</td>
                        
                        
                    </tr>)}
                </tbody>
            </table>
            <AdminFoot />
            <Dole />
        </> : onSSR;
    }
}

export class DetailZakaznika extends React.Component {

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
                                <h5 className="modal-title" id="exampleModalLabel" style={{color: "black"}}>
                                    Osobné údaje zákazníka
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <table className="modalTable" style={{border: "0px"}}>
                                    <tbody>
                                        <tr><th className="modalTh">Meno: </th><td>{this.props.meno}</td></tr>
                                        <tr><th className="modalTh">Priezvisko: </th><td>{this.props.priezvisko}</td></tr>
                                        <tr><th className="modalTh">Telefón: </th><td>{this.props.telefon}</td></tr>
                                        <tr><th className="modalTh">Email: </th><td>{this.props.email}</td></tr>
                                        <tr><th className="modalTh">Auto: </th><td>{this.props.auto}</td></tr>
                                        <tr><th className="modalTh">ŠPZ: </th><td>{this.props.spz}</td></tr>
                                        <tr><th className="modalTh">Počet dní prenájmu: </th><td>{this.props.dni}</td></tr>
                                        <tr><th className="modalTh">Vyzdvihnutie auta: </th><td>{this.props.carOut}</td></tr>
                                        <tr><th className="modalTh">Vrátenie auta: </th><td>{this.props.carIn}</td></tr>
                                        <tr><th className="modalTh">Cena prenájmu: </th><td>{this.props.cena} €</td></tr>
                                    </tbody>
                                </table></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

}


export default ZoznamZakaznikov;