import React from "react";
import { AdminNav, AdminFoot, nacitajRecenzie, Hore, Dole, Baner } from ".";
import ReactStars from "react-stars";
import moment from "moment";
import 'moment/locale/sk';
import { toast } from "react-toastify";


let recenzie = [];
const DefaultOnSSR = () => <div></div>;

class Recenzie extends React.Component {
    constructor(props) {
        super(props)
        this.state = { recenzie: [], canRender: false, priemer: "" };
    }

    componentDidMount() {
        recenzie = nacitajRecenzie();
        this.setState({ recenzie: JSON.parse(localStorage.getItem("recenzie")), canRender: true });
        this.vypocitajPriemer();
    }

    vypocitajPriemer() {
        let sucet = 0;

        for (let i = 0; i < recenzie.length; i++) {
            sucet += recenzie[i].hodnotenie;
        }
        this.setState({ priemer: (sucet / recenzie.length).toFixed(1) })
    }

    render() {

        const { children, onSSR = <DefaultOnSSR /> } = this.props;
        const { canRender } = this.state;



        return canRender ?
            <div>
                <Hore />
                <AdminNav />
                <Baner />
                <div className="home">
                    <div style={{ color: "grey", textAlign: "center" }}>počet recenzií <strong>{recenzie.length}</strong></div>
                    <hr />
                    <h2>Recenzie našich zákazníkov</h2>
                    <div className="priemerneHodnotenie">
                        priemerné hodnotenie <strong>{this.state.priemer} / 5</strong><br /><ReactStars className="hodnotenie" value={parseFloat(this.state.priemer)} edit={false} size={30} half={true} />
                    </div>
                    {recenzie.map((recenzia, poradie) =>
                        <div className="recenzia" key={poradie}><strong>{recenzia.meno} </strong><strong style={{ margin: "10px", padding: "5px", color: "grey" }}> {moment(recenzia.datum).format('LL')}</strong>
                            <button className="tlacitkoVymaz btn btn-danger btn-sm" onClick={() => {
                                let zaciatok = recenzie.slice(0, poradie);
                                let koniec = recenzie.slice(poradie + 1, recenzie.length);
                                recenzie = zaciatok.concat(koniec);
                                this.vypocitajPriemer();

                                localStorage.setItem("recenzie", JSON.stringify(recenzie));
                                this.setState({ recenzie: nacitajRecenzie() });

                                toast('Recenzia bola vymazaná zo zoznamu', { hideProgressBar: true, autoClose: 3000, type: 'error', position: 'top-right' })

                            }}>Vymazať</button><br />
                            <ReactStars className="hodnotenie" value={parseInt(recenzia.hodnotenie)} edit={false} half={true} /><br />{recenzia.obsah}
                        </div>
                    )}

                </div>
                <AdminFoot />
                <Dole />
            </div> : onSSR;
    }
}

export default Recenzie;