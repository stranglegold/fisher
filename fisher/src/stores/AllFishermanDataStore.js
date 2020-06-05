import EventEmitter from 'events';
import dispatcher from '../dispatchers/DatabaseDispatcher'

class AllFishermanDataStore extends EventEmitter{

    _full_fishermans = []

    _all_fishermans_catches = {}

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

const store = new AllFishermanDataStore()

dispatcher.register((action) => {
    if(action.payload.command === 'GET_ALL_DATA_FROM_FISHERMANS'){

        fetch("http://localhost:3001/fishermans",{method: "GET"})
            .then(response => response.json())
            .then(response => store._full_fishermans = response)
            .then(() => store.emitChange())
                .catch(error => {
                alert("An error occurred while queried database(fishermans)")
                console.error(error)
            })

        fetch("http://localhost:3001/catches",{method: "GET"})
            .then(response => response.json())
            .then(response => store._all_fishermans_catches = response)
            .then(() => store.emitChange())
            .catch(error => {
                alert("An error occurred while queried database(catches)")
                console.error(error)
            })
    }
})

export default store
