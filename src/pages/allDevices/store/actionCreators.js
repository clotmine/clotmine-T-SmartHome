import * as constants from './constants';
import DeviceStorage from '../../../expand/dao/DeviceStorage';

/**空调助手------------------------------------------------------------------------------------------ */

export const saveDeviceData = (key,data)=>{
    return (dispatch)=>{
        DeviceStorage.save(key,data)
            .then(console.log(JSON.stringify(data)))
    }
};

export const getDeviceData=(key)=>{
    return (dispatch)=>{
        DeviceStorage.getItem(key)
            .then((data)=>{
                const DATA=(data===null?[]:data);
                dispatch(refreshDeviceData(DATA))
            })
    }
};
const refreshDeviceData=(data)=>({
    type:constants.REFRESH_DEVICE_DATA,
    data
});

export const deleteDevice=(index)=>({
    type:constants.DELETE_DEVICE,
    index
})

export const renameDevice=(index)=>({
    type:constants.RENAME_DEVICE,
    index
});

export const switchPowerACA = (index) => ({
    type:constants.SWITCH_POWER,
    index
});
export const ModeToCooling=(index)=>({
    type:constants.MODE_TO_COOLING,
    index
});
export const ModeToHeating=(index)=>({
    type:constants.MODE_TO_HEATING,
    index
});
export const ModeToArefaction=(index)=>({
    type:constants.MODE_TO_AREFACTION,
    index
});
export const ModeToAuto=(index)=>({
    type:constants.MODE_TO_AUTO,
    index
});
export const reduceTemp=(index)=>({
    type:constants.REDUCE_TEMP,
    index
});
export const addTemp=(index)=>({
    type:constants.ADD_TEMP,
    index
});
export const switchWindACA=(index)=>({
    type:constants.SWITCH_WIND,
    index
});
export const switchAirHorizontal=(index)=>({
    type:constants.SWITCH_AIR_HORIAONTA,
    index
});
export const switchAirVertical=(index)=>({
    type:constants.SWITCH_AIR_VERTICAL,
    index
});
export const switchLight=(index)=>({
    type:constants.SWITCH_LIGHT,
    index
});
export const switchAirFilter=(index)=>({
    type:constants.SWITCH_AIRFILTER,
    index
});
export const switchSuperPower=(index)=>({
    type:constants.SWITCH_SUPERPOWER,
    index
});
export const switchSleep=(index)=>({
    type:constants.SWITCH_SLEEP,
    index
});
export const switchAuxiliaryHeat=(index)=>({
    type:constants.SWITCH_AUXILIARYHEAT,
    index
});
export const deviceNameInputFocus=()=>({
    type:constants.DEVICE_NAME_INPUT_FOCUS  ,
});
export const deviceNameInputBlur=()=>({
    type:constants.DEVICE_NAME_INPUT_BLUR  ,
});
export const cDeviceName=(UpContactText)=>({
    type:constants.SET_DEVICE_NAME,
    UpContactText
});
export const addDeviceToList=()=>({
    type:constants.ADD_DEVICE_TO_LIST
});