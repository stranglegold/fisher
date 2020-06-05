import dispatcher from "../dispatchers/FishermanSearcherDispatcher";

class PersonalActions {

    getFishermanByID(id){
        dispatcher.handleViewAction({
            command : 'GET_FISHERMAN_BY_ID',
            id:id
        });
    }

    addNewEquipment(equipment,equipmentType){
        dispatcher.handleViewAction({
            command : 'ADD_NEW_EQUIPMENT',
            equipmentType: equipmentType,
            equipment: equipment
        });
    }

    addNewCatch(newCatch){
        dispatcher.handleViewAction({
            command : 'ADD_NEW_CATCH',
            newCatch: newCatch
        });
    }
}

export default new PersonalActions()
