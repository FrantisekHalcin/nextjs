import React from "react"
import { AdminNav, AdminFoot, nacitajAuta, Baner, Hore, Dole } from ".";
import { toast } from "react-toastify";

let auta = [];

class FormularAuto extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nazov: "" }
    }

    componentDidMount() {
        auta = nacitajAuta();
    }

    zmena(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    pridajAuto(event) {

        event.preventDefault();

        if (this.state.nazov == null || this.state.spz == null || this.state.koeficient == null || this.state.objem == null
            || this.state.palivo == "" || this.state.spotreba == "" || this.state.rok == "" || this.state.kapacita == "") {
            alert("Vyplňte prosím povinné údaje!")
        } else {
            const noveAuto = {};
            noveAuto.nazov = this.state.nazov;
            noveAuto.spz = this.state.spz;
            noveAuto.typ = this.state.typ;
            noveAuto.kapacita = this.state.kapacita;
            noveAuto.objem = this.state.objem;
            noveAuto.palivo = this.state.palivo;
            noveAuto.spotreba = this.state.spotreba;
            noveAuto.koeficient = this.state.koeficient;
            noveAuto.rok = this.state.rok;
            noveAuto.sks = this.state.sks;
            noveAuto.dostupnost = "";

            auta.push(noveAuto);

            localStorage.setItem("zoznamAut", JSON.stringify(auta));
            toast('Auto bolo pridané do zoznamu', { hideProgressBar: true, autoClose: 2000, type: 'success', position: 'top-right' })
        }
    }

    render() {
        return <>
            <Hore />
            <AdminNav>
            </AdminNav>
            <Baner />
            <table className="vstupnyFormular"><tbody>
                <tr>
                    <th className="modalTh"><label htmlFor="nazov">Názov auta:</label></th>
                    <td><input type="text" id="nazov" name="nazov" onChange={(event) => this.zmena(event)} required /></td>
                </tr><tr>
                    <th className="modalTh"><label htmlFor="spz">ŠPZ auta:</label></th>
                    <td><input type="text" id="spz" name="spz" onChange={(event) => this.zmena(event)} required /></td>
                </tr><tr>
                    <th className="modalTh"><label htmlFor="objem">Objem valca motora:</label></th>
                    <td> <input type="number" id="objem" name="objem" min="1" max="4.5" step="0.1" onChange={(event) => this.zmena(event)} required /></td>
                </tr><tr>
                    <th className="modalTh"><label htmlFor="rok">Rok výroby auta:</label></th>
                    <td><input type="number" id="rok" name="rok" min="2000" max="2023" step="1" onChange={(event) => this.zmena(event)} required /></td>
                </tr><tr>
                    <th className="modalTh"><label htmlFor="typ">Typ auta:</label></th>
                    <td><select id="typ" name="typ" onChange={(event) => this.zmena(event)}>
                        <option value="undefined"></option>
                        <option value="coupe">Coupe</option>
                        <option value="sedan">Sedan</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="kombi">Kombi</option>
                        <option value="suv">SUV</option>
                        <option value="limuzína">Mini-Bus</option>
                        <option value="limuzína">Limuzína</option></select></td>
                </tr><tr>
                    <th className="modalTh"><label htmlFor="palivo">Pohon auta:</label></th>
                    <td><select id="palivo" name="palivo" onChange={(event) => this.zmena(event)} required>
                        <option value="undefined"></option>
                        <option value="nafta">Nafta</option>
                        <option value="benzín">Benzín</option>
                        <option value="plyn">Plyn</option>
                        <option value="elektrina">Elektrina</option>
                        <option value="hybrid">Hybrid</option>
                    </select></td>
                </tr><tr>
                    <th className="modalTh"><label htmlFor="spotreba">Spotreba auta:</label></th>
                    <td><input type="number" id="spotreba" name="spotreba" min="1" max="15" step="0.1" onChange={(event) => this.zmena(event)} required /></td>
                </tr><tr>
                    <th className="modalTh"><label>4 X 4: </label></th>
                    <td>
                        <input style={{ width: "20px", marginLeft: "5px" }} type="radio" id="sks" name="sks" value="áno" onChange={(event) => this.zmena(event)}></input><label htmlFor="ano">ÁNO</label>
                        <input style={{ width: "20px", marginLeft: "5px" }} type="radio" id="sks" name="sks" value="nie" onChange={(event) => this.zmena(event)}></input><label htmlFor="nie">NIE</label>
                    </td>
                </tr><tr>
                    <th className="modalTh"><label htmlFor="kapacita">Kapacita osôb auta:</label></th>
                    <td><input type="number" id="kapacita" name="kapacita" min="1" max="20" onChange={(event) => this.zmena(event)} required /></td>
                </tr><tr>
                    <th className="modalTh"><label htmlFor="koeficient">Koeficient:</label></th>
                    <td><input type="number" id="koeficient" name="koeficient" min="1" max="3" step="0.1" onChange={(event) => this.zmena(event)} /></td>
                </tr><tr>
                    <td colSpan="2" style={{ textAlign: "center", paddingTop: "30px" }}>
                        <button className="btn btn-success btn-sm" onClick={(event) => { this.pridajAuto(event) }}>Pridaj auto do zoznamu</button>
                    </td></tr>
            </tbody>
            </table>
            <AdminFoot />
            <Dole />
        </>
    }
}

export default FormularAuto;