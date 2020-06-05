import React from 'react'
import FishermanPersonalDataStore from '../stores/FishermanPersonalDataStore'
import PersonalActions from "../actions/PersonalActions";

export default class FishermanSearcher extends React.Component{

    constructor() {
        super();
        this.state = {
            fisherman_data: [],
            catches: [],
            equipment: []
        }

        this.onChangeOffDatabase = this.onChangeOffDatabase.bind(this)
        this.getLargestFish = this.getLargestFish.bind(this)
    }

    onChangeOffDatabase() {
        this.setState({
            fisherman_data: FishermanPersonalDataStore._fisherman_data,
            catches: FishermanPersonalDataStore._catches,
            equipment: FishermanPersonalDataStore._equipments,
        })
    }

    componentDidMount() {
        FishermanPersonalDataStore.addChangeListener(this.onChangeOffDatabase)
    }

    componentWillUnmount() {
        FishermanPersonalDataStore.removeChangeListener(this.onChangeOffDatabase)
    }

    getFishermanByID(event){
        event.preventDefault()
        PersonalActions.getFishermanByID(document.getElementById("id").value)
        document.getElementById("idForm").reset()
    }

    getLargestFish(){
        let largestFishWeight = 0
        let largestFish = {}

        this.state.catches.map(currentCatch => {
            if(currentCatch.weight > largestFishWeight){
                largestFish = currentCatch
                largestFishWeight = currentCatch.weight
            }
        })

        return largestFish
    }

    submitNewBait(event){
        event.preventDefault()
        let form = document.getElementById("newBaitForm")

        let equipmentType = form["equipmentType"].value
        let type = form["type"].value
        let name = form["name"].value
        let flavour = form["flavour"].value
        let meltingSelector = document.getElementById("meltingSelector")
        let melting = meltingSelector.options[meltingSelector.selectedIndex].value
        let weight = form["weight"].value

        let newBait = {
            type: type,
            name: name,
            flavour: flavour,
            melting: melting,
            weight: weight
        }

        PersonalActions.addNewEquipment(newBait,equipmentType)
    }

    submitNewOther(event){
        event.preventDefault()
        let form = document.getElementById("newOtherForm")

        let equipmentType = form["equipmentType"].value
        let type = form["type"].value
        let name = form["name"].value
        let weight = form["weight"].value
        let size = form["size"].value
        let other = form["other"].value


        let newOther = {
            type: type,
            name: name,
            weight: weight,
            size: size,
            other_info: other
        }

        PersonalActions.addNewEquipment(newOther,equipmentType)
    }

    submitNewRod(event){
        event.preventDefault()
        let form = document.getElementById("newRodForm")

        let equipmentType = form["equipmentType"].value
        let type = form["type"].value
        let name = form["name"].value
        let length = form["length"].value
        let material = form["material"].value
        let weight = form["weight"].value

        let newRod = {
            type: type,
            name: name,
            weight: weight,
            material: material,
            length: length
        }

        PersonalActions.addNewEquipment(newRod,equipmentType)
    }

    submitNewCatch(event){
        event.preventDefault()
        let form = document.getElementById("newCatchForm")

        let dateOfCatch = form["date"].valueAsDate
        let specie = form["specie"].value
        let weight = form["weight"].value
        let lake = form["lake"].value
        let coordinates = form["coordinates"].value


        let newCatch = {
            date: dateOfCatch.getFullYear() + "-" + (dateOfCatch.getMonth() + 1) + "-" + dateOfCatch.getDate(),
            specie: specie,
            weight: weight,
            lake: lake,
            coordinates: coordinates
        }

        PersonalActions.addNewCatch(newCatch)
    }

    render(){
        return(
            <div className="vw-100 bg-dark text-white p-0 m-0">
                <div className="text-center pt-3 pb-2">
                    <form id="idForm" onSubmit={this.getFishermanByID}>
                        <label className="font-weight-bold mr-4">ID:</label>
                        <input type="number" id="id" placeholder="FishermanID"/>
                        <input className="ml-4 btn-light" type="submit" value="Submit"/>
                    </form>
                </div>

                <div className="vw-100 text-center mt-3 pb-2">
                    <h3>{this.state.fisherman_data.id}</h3>
                    <h4>{this.state.fisherman_data.firstName} {this.state.fisherman_data.lastName}</h4>
                    <h5>{this.state.fisherman_data.state}</h5>
                    <h6>{this.state.fisherman_data.address}</h6>
                    {this.getLargestFish().specie !== undefined ? <p>Largest catch: {this.getLargestFish().specie}, <em>{parseFloat(this.getLargestFish().weight).toPrecision(5)} kg</em></p> : <></>}
                </div>

                <div className="vw-100 d-flex justify-content-center">
                    {this.state.equipment.rods !== undefined ? (
                        <div className="vw-100 w-100 d-flex justify-content-center flex-column text-center align-items-center">
                            <h1 className="d-block h1 text-white font-weight-bold p-2">Rods</h1>
                            <table className="table-bordered w-75 text-center text-white">
                                <thead>
                                    <tr>
                                        <th className="pb-3 pt-3">Type</th>
                                        <th className="pb-3 pt-3">Name</th>
                                        <th className="pb-3 pt-3">Material</th>
                                        <th className="pb-3 pt-3">Length</th>
                                        <th className="pb-3 pt-3">Weight</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.equipment.rods.map(rod =>{
                                       return(
                                           <tr>
                                                <td className="p-2">{rod.type}</td>
                                                <td>{rod.name}</td>
                                                <td>{rod.material}</td>
                                                <td>{rod.length}</td>
                                                <td>{rod.weight}</td>
                                           </tr>
                                       )
                                    })}
                                </tbody>
                            </table>
                            <form id="newRodForm" onSubmit={this.submitNewRod}>
                                <input type="hidden" value="Rod" name="equipmentType"/>
                                <label className="text-white h5 font-weight-bold m-4">Type:</label>
                                <input type="text" placeholder="Type" name="type" required/>
                                <label className="text-white h5 font-weight-bold m-4">Name:</label>
                                <input type="text" placeholder="Name" name="name" required/>
                                <label className="text-white h5 font-weight-bold m-4">Material</label>
                                <input type="text" placeholder="Material" name="material" required/>
                                <label className="text-white h5 font-weight-bold m-4">Length:</label>
                                <input type="number" placeholder="Length" name="length" required/>
                                <label className="text-white h5 font-weight-bold m-4">Weight:</label>
                                <input type="number" placeholder="Weight" name="weight" required/>
                                <input className="btn-light m-4" type="submit" value="Submit"/>
                            </form>
                        </div>)
                        : <></>}
                </div>
                <div className="vw-100 d-flex justify-content-center mt-5">
                    {this.state.equipment.other !== undefined ? (
                            <div className="vw-100 w-100 d-flex justify-content-center flex-column text-center align-items-center">
                                <div className="p-1 bg-white vw-100 mt-5 mb-5"></div>
                                <h1 className="d-block h1 text-white font-weight-bold p-2">Other Stuff</h1>
                                <table className="table-bordered w-75 text-center text-white">
                                    <thead>
                                    <tr>
                                        <th className="pb-3 pt-3">Type</th>
                                        <th className="pb-3 pt-3">Name</th>
                                        <th className="pb-3 pt-3">Weight</th>
                                        <th className="pb-3 pt-3">Size</th>
                                        <th className="pb-3 pt-3">Other Information</th></tr>
                                    </thead>
                                    <tbody>
                                    {this.state.equipment.other.map(other =>{
                                        return(
                                            <tr>
                                                <td className="p-2">{other.type}</td>
                                                <td>{other.name}</td>
                                                <td>{other.weight}</td>
                                                <td>{other.size}</td>
                                                <td>{other.other_info}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                                <form id="newOtherForm" onSubmit={this.submitNewOther}>
                                    <input type="hidden" value="Other" name="equipmentType"/>
                                    <label className="text-white h5 font-weight-bold m-4">Type:</label>
                                    <input type="text" placeholder="Type" name="type" required/>
                                    <label className="text-white h5 font-weight-bold m-4">Name:</label>
                                    <input type="text" placeholder="Name" name="name" required/>
                                    <label className="text-white h5 font-weight-bold m-4">Weight:</label>
                                    <input type="number" placeholder="Weight" name="weight" required/>
                                    <label className="text-white h5 font-weight-bold m-4">Size:</label>
                                    <input type="text" placeholder="Size" name="size" required/>
                                    <label className="text-white h5 font-weight-bold m-4">Other information:</label>
                                    <input type="text" placeholder="Other information" name="other"/>
                                    <input className="btn-light m-4" type="submit" value="Submit"/>
                                </form>
                            </div>)
                        : <></>}
                </div>
                <div className="vw-100 d-flex justify-content-center mt-5 pb-5">
                    {this.state.equipment.bait !== undefined ? (
                        <div className="vw-100 w-100 d-flex justify-content-center flex-column text-center align-items-center">
                            <div className="p-1 bg-white vw-100 mt-5 mb-5"></div>
                            <h1 className="d-block h1 text-white font-weight-bold p-2">Baits</h1>
                            <table className="table-bordered w-75 text-center text-white">
                                <thead>
                                <tr>
                                    <th className="pb-3 pt-3">Type</th>
                                    <th className="pb-3 pt-3">Name</th>
                                    <th className="pb-3 pt-3">Flavour</th>
                                    <th className="pb-3 pt-3">Weight</th>
                                    <th className="pb-3 pt-3">Melting</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.equipment.bait.map(bait =>{
                                    return(
                                        <tr>
                                            <td className="p-2">{bait.type}</td>
                                            <td>{bait.name}</td>
                                            <td>{bait.flavour}</td>
                                            <td>{bait.weight}</td>
                                            <td>{bait.melting.toUpperCase()}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            <form id="newBaitForm" onSubmit={this.submitNewBait}>
                                <input type="hidden" value="Bait" name="equipmentType"/>
                                <label className="text-white h5 font-weight-bold m-4">Type:</label>
                                <input type="text" placeholder="Type" name="type" required/>
                                <label className="text-white h5 font-weight-bold m-4">Name:</label>
                                <input type="text" placeholder="Name" name="name" required/>
                                <label className="text-white h5 font-weight-bold m-4">Flavour:</label>
                                <input type="text" placeholder="Flavour" name="flavour" required/>
                                <label className="text-white h5 font-weight-bold m-4">Melting?:</label>
                                <select  id="meltingSelector">
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                <label className="text-white h5 font-weight-bold m-4">Weight:</label>
                                <input type="number" placeholder="Weight" name="weight" required/>
                                <input className="btn-light m-4" type="submit" value="Submit"/>
                            </form>
                        </div>)
                        : <></>}
                </div>
                <div className="vw-100 d-flex justify-content-center mt-5 pb-5">
                    {this.state.catches.length !== 0 ? (
                            <div className="vw-100 w-100 d-flex justify-content-center flex-column text-center align-items-center">
                                <div className="p-1 bg-white vw-100 mt-5 mb-5"></div>
                                <h1 className="d-block h1 text-white font-weight-bold p-2">Catches</h1>
                                <table className="table-bordered w-75 text-center text-white">
                                    <thead>
                                    <tr>
                                        <th className="pb-3 pt-3">Date</th>
                                        <th className="pb-3 pt-3">Specie</th>
                                        <th className="pb-3 pt-3">Weight</th>
                                        <th className="pb-3 pt-3">Lake</th>
                                        <th className="pb-3 pt-3">Coordinates</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.catches.map(currentCatch =>{
                                        return(
                                            <tr>
                                                <td className="p-2">{currentCatch.date}</td>
                                                <td>{currentCatch.specie}</td>
                                                <td>{currentCatch.weight}</td>
                                                <td>{currentCatch.lake}</td>
                                                <td>{currentCatch.coordinates}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                                <form id="newCatchForm" onSubmit={this.submitNewCatch}>
                                    <label className="text-white h5 font-weight-bold m-4">Date:</label>
                                    <input type="date" name="date" required/>
                                    <label className="text-white h5 font-weight-bold m-4">Specie:</label>
                                    <input type="text" placeholder="Specie" name="specie" required/>
                                    <label className="text-white h5 font-weight-bold m-4">Weight:</label>
                                    <input type="number" placeholder="Weight" name="weight" required/>
                                    <label className="text-white h5 font-weight-bold m-4">Lake:</label>
                                    <input type="text" placeholder="Lake" name="lake" required/>
                                    <label className="text-white h5 font-weight-bold m-4">Coordinates:</label>
                                    <input type="text" placeholder="Coordinates" name="coordinates" required/>
                                    <input className="btn-light m-4" type="submit" value="Submit"/>
                                </form>
                            </div>)
                        : <></>}
                </div>
            </div>
        )
    }
}