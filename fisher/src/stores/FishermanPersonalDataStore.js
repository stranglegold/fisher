import EventEmitter from 'events';
import dispatcher from '../dispatchers/FishermanSearcherDispatcher'

class FishermanPersonalDataStore extends EventEmitter{

    _fisherman_data = []

    _catches = []

    _equipments = []

    emitChange(){
        this.emit('Change');
    }

    addChangeListener(callback){
        this.on('Change', callback);
    }

    removeChangeListener(callback){
        this.removeListener('Change', callback);
    }
}

const store = new FishermanPersonalDataStore();

dispatcher.register((action) => {
    if(action.payload.command === 'GET_FISHERMAN_BY_ID'){
        fetch("http://localhost:3001/fishermans?id="+action.payload.id, {method: "GET"})
            .then(response => response.json())
            .then(response => store._fisherman_data = response[0])
            .then(() => {
                if(store._fisherman_data !== undefined) {
                    fetch("http://localhost:3001/catches", {method: "GET"})
                        .then(response => response.json())
                        .then(response => store._catches = response[store._fisherman_data.id])
                        .then(() => store.emitChange())
                        .catch(error => {
                            alert("Error occurred while the application queried the catches database.")
                            console.error(error)
                        })

                    fetch("http://localhost:3001/equipments", {method: "GET"})
                        .then(response => response.json())
                        .then(response => store._equipments = response[store._fisherman_data.id])
                        .then(() => store.emitChange())
                        .catch(error => {
                            alert("Error occurred while the application queried the equipment database.")
                            console.error(error)
                        })
                }else{
                    throw new Error("No such ID")
                }
            })
            .then(() => console.log(store))
            .then(() => store.emitChange())
            .catch(error => {
                if(store._fisherman_data === undefined){
                    alert("No such ID")
                }else {
                    alert("Error occurred while the application queried the fishermans database.")
                    console.error(error)
                }
            })
    }else if(action.payload.command === 'ADD_NEW_EQUIPMENT'){
        if(action.payload.equipmentType === "Bait"){
            if(!store._equipments.bait.reduce((contains,bait) => {
                if(bait.name.toLowerCase() === action.payload.equipment.name.toLowerCase() && bait.type.toLowerCase() === action.payload.equipment.type.toLowerCase() && bait.melting === action.payload.equipment.melting && bait.flavour.toLowerCase() === action.payload.equipment.flavour.toLowerCase()){
                    return contains && false
                }
                return contains && true
            },true)){
                alert("You already have this equipment")
            }else {
                store._equipments.bait = [...store._equipments.bait,action.payload.equipment]
                let requestBody = {}
                requestBody[store._fisherman_data.id] = store._equipments
                fetch("http://localhost:3001/equipments", {
                    method: "PATCH", body: JSON.stringify(requestBody)
                    , headers: {'Content-Type': "application/json"}
                })
                    .then(() => store.emitChange())
            }
        }else if(action.payload.equipmentType === "Other"){
            if(!store._equipments.other.reduce((contains,other) => {
                if(other.name.toLowerCase() === action.payload.equipment.name.toLowerCase() && other.size.toLowerCase() === action.payload.equipment.size.toLowerCase()){
                    return contains && false
                }
                return contains && true
            },true)){
                alert("You already have this equipment")
            }else {
                store._equipments.other = [...store._equipments.other,action.payload.equipment]
                let requestBody = {}
                requestBody[store._fisherman_data.id] = store._equipments
                fetch("http://localhost:3001/equipments", {
                    method: "PATCH", body: JSON.stringify(requestBody)
                    , headers: {'Content-Type': "application/json"}
                })
                    .then(() => store.emitChange())
            }
        }else if(action.payload.equipmentType === "Rod"){
            if(!store._equipments.rods.reduce((contains,rod) => {
                if(rod.name.toLowerCase() === action.payload.equipment.name.toLowerCase() && rod.type.toLowerCase() === action.payload.equipment.type.toLowerCase() && rod.length === action.payload.equipment.length){
                    return contains && false
                }
                return contains && true
            },true)){
                alert("You already have this equipment")
            }else {
                store._equipments.rods = [...store._equipments.rods,action.payload.equipment]
                let requestBody = {}
                requestBody[store._fisherman_data.id] = store._equipments
                fetch("http://localhost:3001/equipments", {
                    method: "PATCH", body: JSON.stringify(requestBody)
                    , headers: {'Content-Type': "application/json"}
                })
                    .then(() => store.emitChange())
            }
        }
    }else if(action.payload.command === 'ADD_NEW_CATCH'){
        store._catches = [...store._catches,action.payload.newCatch]
        let requestBody = {}
        requestBody[store._fisherman_data.id] = store._catches
        fetch("http://localhost:3001/catches", {
            method: "PATCH", body: JSON.stringify(requestBody)
            , headers: {'Content-Type': "application/json"}
        })
            .then(() => store.emitChange())
    }
})

export default store;