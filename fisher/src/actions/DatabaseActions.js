import dispatcher from "../dispatchers/DatabaseDispatcher";

class DatabaseActions {

    queryAllFishermanData(){
        dispatcher.handleViewAction({
            command : 'GET_ALL_DATA_FROM_FISHERMANS',
        });
    }
}

export default new DatabaseActions()
