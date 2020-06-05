import React from 'react'
import FishermanDatabase from '../stores/AllFishermanDataStore'
import DatabaseActions from "../actions/DatabaseActions";

export default class Database extends React.Component{

    constructor() {
        super()
        this.state={
            fisherman_data: [],
            specieFilter: "All",
            stateFilter: "All",
            dateFilter: "All"
        }

        this.onChangeOffDatabase = this.onChangeOffDatabase.bind(this)
        this.onSpecieSelect = this.onSpecieSelect.bind(this)
        this.onStateSelect = this.onStateSelect.bind(this)
        this.onDateSelect = this.onDateSelect.bind(this)
        this.generateTableRowFromFisherman = this.generateTableRowFromFisherman.bind(this)
        this.filterByDate = this.filterByDate.bind(this)
        this.filterBySpecie = this.filterBySpecie.bind(this)
    }

    onChangeOffDatabase() {
        this.setState({
            fisherman_data: FishermanDatabase._full_fishermans,
        })
    }

    componentDidMount() {
        FishermanDatabase.addChangeListener(this.onChangeOffDatabase)
        DatabaseActions.queryAllFishermanData()
        this.setState({fisherman_data:FishermanDatabase._full_fishermans})
    }

    componentWillUnmount() {
        FishermanDatabase.removeChangeListener(this.onChangeOffDatabase)
    }

    onSpecieSelect(event){
        this.setState({specieFilter: event.target.value})
    }

    onStateSelect(event){
        this.setState({stateFilter: event.target.value})
    }

    onDateSelect(event){
        this.setState({dateFilter: event.target.value})
    }

    getStatesFromFishermans(fishermans){
        let fisherman_states = new Set()

        fishermans.map(fisherman => fisherman_states.add(fisherman.state))

        return Array.from(fisherman_states).sort()
    }

    generateTableRowFromFisherman(fisherman){
        return <tr key={fisherman.id}>
            <td className="p-2">{fisherman.firstName} {fisherman.lastName}</td>
            <td>{fisherman.state}</td>
            <td>{fisherman.address}</td>
            {FishermanDatabase._all_fishermans_catches[fisherman.id] !== undefined ?
                <td>{parseFloat(this.filterByDate(this.filterBySpecie(FishermanDatabase._all_fishermans_catches[fisherman.id])).reduce((result, currentCatch) => {
                    return result + currentCatch.weight
                },0)).toPrecision(5)} kg</td> : ""}
        </tr>
    }

    filterBySpecie(catches){
        return catches.filter(currentCatch => {
            if (this.state.specieFilter === "All") {
                return currentCatch
            } else if (this.state.specieFilter === currentCatch.specie) {
                return currentCatch
            }
        })
    }

    filterByDate(catches){
        return catches.filter(currentCatch => {
            if (this.state.dateFilter === "All") {
                return currentCatch
            } else if (currentCatch.date.includes(this.state.dateFilter)) {
                return currentCatch
            }
        })
    }

    render() {
        return(
            <div className=" vh-50 vw-100 d-flex justify-content-center bg-dark">
                <form className="m-3">
                    <label className="text-white h3 font-weight-bold">By specie:</label>
                    <select onChange={this.onSpecieSelect}>
                        <option value="All">All</option>
                        {["Alien","Megalodon","Bloop","Moby dick"].map((specie) => {
                            return <option value={specie}>{specie}</option>})
                        }
                    </select><br></br>
                    <label className="text-white h3 font-weight-bold">By state:</label>
                    <select onChange={this.onStateSelect}>
                        <option value="All">All</option>
                        {this.getStatesFromFishermans(this.state.fisherman_data).map(state => <option value={state}>{state}</option>)}
                    </select><br></br>
                    <label className="text-white h3 font-weight-bold">By date:</label><br></br>
                    <select onChange={this.onDateSelect}>
                        <option value="All">All</option>
                        {[...Array(11).keys()].map(date => <option value={new Date().getFullYear() - date}>{new Date().getFullYear() - date}</option>)}
                    </select>
                </form>
                <table className="table-bordered w-100 text-center text-white">
                    <thead>
                        <tr>
                            <th className="pb-3 pt-3">Name</th>
                            <th className="pb-3 pt-3">State</th>
                            <th className="pb-3 pt-3">Address</th>
                            <th className="pb-3 pt-3">Catches weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.fisherman_data.map(fisherman => {
                            if(this.state.stateFilter === "All"){
                                return this.generateTableRowFromFisherman(fisherman)
                            }else if(this.state.stateFilter === fisherman.state){
                                return this.generateTableRowFromFisherman(fisherman)
                            }
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}