import {combineReducers} from 'redux';
import {reducer as deviceListReaducer} from '../pages/allDevices/store';
import {reducer as systemReaducer} from '../pages/system/store';

const reducer = combineReducers({
    devices:deviceListReaducer,
    system:systemReaducer,
});

export default reducer;