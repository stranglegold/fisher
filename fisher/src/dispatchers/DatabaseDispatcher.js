import {Dispatcher} from 'flux'

class DatabaseDispatcher extends Dispatcher{

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            payload : action
        })
    }

}

const dispatcher = new DatabaseDispatcher();

export default dispatcher