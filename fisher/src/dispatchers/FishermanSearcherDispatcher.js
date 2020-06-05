import {Dispatcher} from 'flux'

class FishermanSearcherDispatcher extends Dispatcher{

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            payload : action
        })
    }

}

const dispatcher = new FishermanSearcherDispatcher();

export default dispatcher