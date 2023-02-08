import React from "react";
import { ZakaznikNav, ZakaznikFoot, nacitajRecenzie, Hore, Dole } from ".";
import ReactStars from "react-stars";
import moment from "moment";
import 'moment/locale/sk';
import { toast } from "react-toastify";




let recenzie = [];
const DefaultOnSSR = () => <div></div>;

class Recenzie extends React.Component {
    constructor(props) {
        super(props)
        this.state = { recenzie: [], canRender: false, priemer: "", rating: 0};

    }


    componentDidMount() {
        recenzie = nacitajRecenzie();
        this.setState({ recenzie: JSON.parse(localStorage.getItem("recenzie")), canRender: true });
        this.vypocitajPriemer();
    }

    

    pridajRecenziu() {  
        
        if (this.state.rating == 0){
            alert("Na krivke spokojnosti ste nenastavili žiadnu hodnotu");
        }else if(recenzia.value == ""){
            alert("Do textového poľa ste nenapísali žiadnu recenziu");
        }else{
        
       
        if (meno.value == "") {
            meno.value = "Anonym";
        }
       
        const novaRecenzia = {};
        novaRecenzia.meno = meno.value;
        novaRecenzia.hodnotenie = this.state.rating;
        novaRecenzia.obsah = recenzia.value;
        novaRecenzia.datum = moment();

        recenzie.unshift(novaRecenzia);

        this.vypocitajPriemer();


        localStorage.setItem("recenzie", JSON.stringify(recenzie));
        this.setState({ recenzie: localStorage.getItem("recenzie") })

        toast('Recenzia bola úspešne pridaná na stránku. Ďakujeme', { hideProgressBar: true, autoClose: 3000, type: 'success', position: 'top-right' })
    }}


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
                <ZakaznikNav /><div className="home">


                    <div id="pridajRecenziu">
                        <h5>Na vašom názore nám záleží</h5>
                        <div style={{ float: "left" }}><label>Meno:
                        </label>
                            <input type="text" name="meno" id="meno" style={{ width: "100px" }} onChange={() => this.pridajRecenziu.bind(this)}></input>
                        </div>
                        <div style={{ float: "right" }}>
                            <label>Hodnotenie: </label>
                            <ReactStars className="hodnotenie" name="rating" id="rating" size={20} half={false} edit={true} value={this.state.rating} onChange={(newRating) => this.setState({rating: parseInt(newRating)})} />
                        </div>
                        <input name="recenzia" id="recenzia" placeholder="Akú ste mali skúsenosť s našou firmou?" style={{ width: "90%" }} onChange={() => this.pridajRecenziu.bind(this)}>
                        </input>
                        <button className="btn btn-success btn-sm mt-3" onClick={() => { this.pridajRecenziu()}}>Pridaj recenziu</button>
                    </div>
                    <div style={{ color: "grey", textAlign: "center" }}>počet recenzií <strong>{recenzie.length}</strong></div>
                    <hr />
                    <h2>Recenzie našich zákazníkov</h2>
                    <div className="priemerneHodnotenie">
                        priemerné hodnotenie <strong>{this.state.priemer} / 5</strong><br /><ReactStars className="hodnotenie" value={parseFloat(this.state.priemer)} edit={false} size={30} half={true} />
                    </div>
                    {recenzie.map((recenzia, poradie) =>
                        <div className="recenzia" key={poradie}><strong>{recenzia.meno}</strong><strong style={{ margin: "10px", padding: "5px", color: "grey" }}> {moment(recenzia.datum).format('LL')}</strong><br /><ReactStars className="hodnotenie" value={parseInt(recenzia.hodnotenie)} edit={false} half={true} /><br />{recenzia.obsah}</div>
                    )}

                </div>
                <ZakaznikFoot />
                <Dole />
            </div> : onSSR;
    }
}

export default Recenzie;