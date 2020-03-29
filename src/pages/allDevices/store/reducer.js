import * as constants from './constants';

const defaultState={
  deviceList:[],
  deviceNameFocus:false, 
  setDeviceName:'', //空调助手名称
}

/**空调助手------------------------------------------------------------------------------------------ */

export default (state=defaultState,action)=>{
  if(action.type===constants.SWITCH_POWER){
    const newState=JSON.parse(JSON.stringify(state));
    if(state.deviceList[action.index].deviceStatus==='open'){
      newState.deviceList[action.index].deviceStatus='closed'
    }else if(state.deviceList[action.index].deviceStatus==='closed'){
      newState.deviceList[action.index].deviceStatus='open'
    }
    return newState
  };
  if(action.type===constants.REFRESH_DEVICE_DATA){
    const newState=JSON.parse(JSON.stringify(state));
    newState.deviceList=action.data;
    return newState;
  };
  if(action.type===constants.MODE_TO_COOLING){
    const newState=JSON.parse(JSON.stringify(state));
    newState.deviceList[action.index].devicesMode='cooling';
    return newState;
  };
  if(action.type===constants.MODE_TO_HEATING){
    const newState=JSON.parse(JSON.stringify(state));
    newState.deviceList[action.index].devicesMode='heating';
    return newState;
  };
  if(action.type===constants.MODE_TO_AREFACTION){
    const newState=JSON.parse(JSON.stringify(state));
    newState.deviceList[action.index].devicesMode='arefaction';
    return newState;
  };
  if(action.type===constants.MODE_TO_AUTO){
    const newState=JSON.parse(JSON.stringify(state));
    newState.deviceList[action.index].devicesMode='auto';
    return newState;
  };
  if(action.type===constants.REDUCE_TEMP){
    const newState=JSON.parse(JSON.stringify(state));
    if(newState.deviceList[action.index].temData>16){
      newState.deviceList[action.index].temData--
    };
    return newState;
  };
  if(action.type===constants.ADD_TEMP){
    const newState=JSON.parse(JSON.stringify(state));
    if(newState.deviceList[action.index].temData<32){
      newState.deviceList[action.index].temData++
    };
    return newState;
  };
  if(action.type===constants.SWITCH_WIND){
    const newState=JSON.parse(JSON.stringify(state));
    const windLevelAuto={id:'windLevelAuto'};
    const windLevel1={id:'windLevel1'};
    const windLevel2={id:'windLevel2'};
    const windLevel3={id:'windLevel3'};
    const checkItemAuto=(item)=>{return item.id==='windLevelAuto'};
    const checkItem1=(item)=>{return item.id==='windLevel1'};
    const checkItem2=(item)=>{return item.id==='windLevel2'};
    const checkItem3=(item)=>{return item.id==='windLevel3'};
    if(newState.deviceList[action.index].windLevel==='auto'){
      newState.deviceList[action.index].windLevel=1;
      newState.deviceList[action.index].modeTips.splice(newState.deviceList[action.index].modeTips.findIndex(checkItemAuto),1,windLevel1)
    }else if(newState.deviceList[action.index].windLevel===1){
      newState.deviceList[action.index].windLevel=2;
      newState.deviceList[action.index].modeTips.splice(newState.deviceList[action.index].modeTips.findIndex(checkItem1),1,windLevel2)
    }else if(newState.deviceList[action.index].windLevel===2){
      newState.deviceList[action.index].windLevel=3;
      newState.deviceList[action.index].modeTips.splice(newState.deviceList[action.index].modeTips.findIndex(checkItem2),1,windLevel3)
    }else{
      newState.deviceList[action.index].windLevel='auto';
      newState.deviceList[action.index].modeTips.splice(newState.deviceList[action.index].modeTips.findIndex(checkItem3),1,windLevelAuto)
    }
    return newState;
  };
  if(action.type===constants.SWITCH_AIR_HORIAONTA){
    const newState=JSON.parse(JSON.stringify(state));
    const horizontalWind={id:'horizontalWind'};
    const checkItemHorizontal=(item)=>{return item.id==='horizontalWind'};
    const checkItemVertical=(item)=>{return item.id==='verticalWind'};
    if(newState.deviceList[action.index].horizontalWind===false){
      newState.deviceList[action.index].horizontalWind=true;
      newState.deviceList[action.index].modeTips.push(horizontalWind);
      if(newState.deviceList[action.index].verticalWind===true){
        newState.deviceList[action.index].verticalWind=false;
        newState.deviceList[action.index].modeTips.splice(newState.deviceList[action.index].modeTips.findIndex(checkItemVertical),1)
      }
    }else{
      newState.deviceList[action.index].horizontalWind=false;
      newState.deviceList[action.index].modeTips.splice(newState.deviceList[action.index].modeTips.findIndex(checkItemHorizontal),1)
    }
    return newState;
  };
  if(action.type===constants.SWITCH_AIR_VERTICAL){
    const newState=JSON.parse(JSON.stringify(state));
    const verticalWind={id:'verticalWind'};
    const checkItemVertical=(item)=>{return item.id==='verticalWind'};
    const checkItemHorizontal=(item)=>{return item.id==='horizontalWind'};
    if(newState.deviceList[action.index].verticalWind===false){
      newState.deviceList[action.index].verticalWind=true;
      newState.deviceList[action.index].modeTips.push(verticalWind);
      if(newState.deviceList[action.index].horizontalWind===true){
        newState.deviceList[action.index].horizontalWind=false;
        newState.deviceList[action.index].modeTips.splice(newState.deviceList[action.index].modeTips.findIndex(checkItemHorizontal),1)
      }
    }else{
      newState.deviceList[action.index].verticalWind=false;
      newState.deviceList[action.index].modeTips.splice(newState.deviceList[action.index].modeTips.findIndex(checkItemVertical),1)
    }
    // if(newState.deviceList[action.index].verticalWind===false){
    //   newState.deviceList[action.index].verticalWind=true;
    //   newState.deviceList[action.index].modeTips.push(verticalWind);
    // }else{
    //   newState.deviceList[action.index].verticalWind=false;
    //   newState.deviceList[action.index].modeTips.splice(newState.deviceList[action.index].modeTips.findIndex(checkItemVertical),1)
    // }
    return newState;
  };
  if(action.type===constants.SWITCH_LIGHT){
    const newState=JSON.parse(JSON.stringify(state));
    const light={id:'light'};
    const checkItem=(item)=>{return item.id==='light'};
    if(newState.deviceList[action.index].light===false){
      newState.deviceList[action.index].light=true;
      newState.deviceList[action.index].modeTips.push(light);
    }else{
      newState.deviceList[action.index].light=false;
      newState.deviceList[action.index].modeTips.splice(newState.deviceList[action.index].modeTips.findIndex(checkItem),1);
    }
    return newState;
  };
  if(action.type===constants.SWITCH_AIRFILTER){
    const newState=JSON.parse(JSON.stringify(state));
    const airFilter={id:'airFilter'};
    const checkItem=(item)=>{return item.id==='airFilter'};
    if(newState.deviceList[action.index].airFilter===false){
      newState.deviceList[action.index].airFilter=true;
      newState.deviceList[action.index].modeTips.push(airFilter);
    }else{
      newState.deviceList[action.index].airFilter=false;
      newState.deviceList[action.index].modeTips.splice(newState.deviceList[action.index].modeTips.findIndex(checkItem),1);
    }
    return newState;
  };
  if(action.type===constants.SWITCH_SUPERPOWER){
    const newState=JSON.parse(JSON.stringify(state));
    const superPower={id:'superPower'};
    const checkItem=(item)=>{return item.id==='superPower'};
    if(newState.deviceList[action.index].superPower===false){
      newState.deviceList[action.index].superPower=true;
      newState.deviceList[action.index].modeTips.push(superPower);
    }else{
      newState.deviceList[action.index].superPower=false;
      newState.deviceList[action.index].modeTips.splice(newState.deviceList[action.index].modeTips.findIndex(checkItem),1);
    }
    return newState;
  };
  if(action.type===constants.SWITCH_SLEEP){
    const newState=JSON.parse(JSON.stringify(state));
    const sleep={id:'sleep'};
    const checkItem=(item)=>{return item.id==='sleep'};
    if(newState.deviceList[action.index].sleep===false){
      newState.deviceList[action.index].sleep=true;
      newState.deviceList[action.index].modeTips.push(sleep);
    }else{
      newState.deviceList[action.index].sleep=false;
      newState.deviceList[action.index].modeTips.splice(newState.deviceList[action.index].modeTips.findIndex(checkItem),1);
    }
    return newState;
  };
  if(action.type===constants.SWITCH_AUXILIARYHEAT){
    const newState=JSON.parse(JSON.stringify(state));
    const auxiliaryHeat={id:'auxiliaryHeat'};
    const checkItem=(item)=>{return item.id==='auxiliaryHeat'};
    if(newState.deviceList[action.index].auxiliaryHeat===false){
      newState.deviceList[action.index].auxiliaryHeat=true;
      newState.deviceList[action.index].modeTips.push(auxiliaryHeat);
    }else{
      newState.deviceList[action.index].auxiliaryHeat=false;
      newState.deviceList[action.index].modeTips.splice(newState.deviceList[action.index].modeTips.findIndex(checkItem),1);
    }
    return newState;
  };
  if(action.type===constants.DEVICE_NAME_INPUT_FOCUS){
    const newState=JSON.parse(JSON.stringify(state));
    newState.deviceNameFocus=true;
    return newState;
  };
  if(action.type===constants.DEVICE_NAME_INPUT_BLUR){
    const newState=JSON.parse(JSON.stringify(state));
    newState.deviceNameFocus=false;
    return newState;
  };
  if(action.type===constants.SET_DEVICE_NAME){
    const newState=JSON.parse(JSON.stringify(state));
    newState.setDeviceName=action.UpContactText;
    return newState;
  };
  if(action.type===constants.DELETE_DEVICE){
    const newState=JSON.parse(JSON.stringify(state));
    newState.deviceList.splice(action.index,1);
    return newState;
  };
  if(action.type===constants.RENAME_DEVICE){
    const newState=JSON.parse(JSON.stringify(state));
    newState.deviceList[action.index].deviceName=newState.setDeviceName;
    return newState;
  };
  if(action.type===constants.ADD_DEVICE_TO_LIST){
    const newState=JSON.parse(JSON.stringify(state));
    const deviceState={
      deviceId:'devices_1',
      deviceType:'airConditioningAssistant',
      deviceName:newState.setDeviceName,
      deviceStatus:'closed',
      devicesMode:'auto',
      temData:25,
      currentTEMData:28,
      monthEl:13.6,
      dayEl:2.3,
      devicePower:1.2,
      windLevel:'auto',
      //horizontalWind:false,
      verticalWind:false,
      light:true,
      airFilter:false,
      superPower:false,
      sleep:false,
      auxiliaryHeat:false,
      modeTips:[
          {id:'light'},
          {id:'windLevelAuto'}
      ]
    }
    newState.deviceList.push(deviceState);
    return newState;
  };
  return state;
};