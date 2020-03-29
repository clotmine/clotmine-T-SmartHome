import * as constants from './constants';
const defaultState = {
    languageMode:'english',
    restoreFactory:false,
    userNameFocus:false,
    userEmailFocus:false,
    verCodeFocus:false,
    userPassWordFocus:false,
    logUserName:'',
    logUserPassWord:'',
    regUserName:'',
    regUserEmail:'',
    regUserPassWord:'',
    regVerCode:'',
    username:'',
    showConfirmationForm:false,
    wifi:'9.1_5G',
    wifiPassFocus:false,
    wifiPassWord:'',
};

export default (state=defaultState,action)=>{
    if(action.type===constants.LAN_TO_CHINESE){
        const newState=JSON.parse(JSON.stringify(state));
        newState.languageMode='chinese';
        return newState;
    };
    if(action.type===constants.LAN_TO_ENGLISH){
        const newState=JSON.parse(JSON.stringify(state));
        newState.languageMode='english';
        return newState;
    };
    if(action.type===constants.FACTORY_SET){
        const newState=JSON.parse(JSON.stringify(state));
        newState.restoreFactory=true;
        return newState;
    };
    if(action.type===constants.USER_NAME_FOCUS){
        const newState=JSON.parse(JSON.stringify(state));
        newState.userNameFocus=true;
        return newState;
    };
    if(action.type===constants.USER_NAME_BLUR){
        const newState=JSON.parse(JSON.stringify(state));
        newState.userNameFocus=false;
        return newState;
    };
    if(action.type===constants.EMAIL_INPUT_FOCUS){
        const newState=JSON.parse(JSON.stringify(state));
        newState.userEmailFocus=true;
        return newState;
    };
    if(action.type===constants.EMAIL_INPUT_BLUR){
        const newState=JSON.parse(JSON.stringify(state));
        newState.userEmailFocus=false;
        return newState;
    };
    if(action.type===constants.PASSWORD_NAME_FOCUS){
        const newState=JSON.parse(JSON.stringify(state));
        newState.userPassWordFocus=true;
        return newState;
    };
    if(action.type===constants.PASSWORD_NAME_BLUR){
        const newState=JSON.parse(JSON.stringify(state));
        newState.userPassWordFocus=false;
        return newState;
    };
    if(action.type===constants.VER_CODE_FOCUS){
        const newState=JSON.parse(JSON.stringify(state));
        newState.verCodeFocus=true;
        return newState;
    };
    if(action.type===constants.VER_CODE_BLUR){
        const newState=JSON.parse(JSON.stringify(state));
        newState.verCodeFocus=false;
        return newState;
    };
    if(action.type===constants.LOG_USER_NAME){
        const newState=JSON.parse(JSON.stringify(state));
        newState.logUserName=action.UpContactText;
        return newState;
    };
    if(action.type===constants.LOG_PASS_WORD){
        const newState=JSON.parse(JSON.stringify(state));
        newState.logUserPassWord=action.UpContactText;
        return newState;
    };
    if(action.type===constants.SAVE_USERNAME){
        const newState=JSON.parse(JSON.stringify(state));
        newState.username=action.val;
        return newState;
    };
    if(action.type===constants.REG_USER_NAME){
        const newState=JSON.parse(JSON.stringify(state));
        newState.regUserName=action.UpContactText;
        return newState;
    };
    if(action.type===constants.REG_USER_EMAIL){
        const newState=JSON.parse(JSON.stringify(state));
        newState.regUserEmail=action.UpContactText;
        return newState;
    };
    if(action.type===constants.REG_PASS_WORD){
        const newState=JSON.parse(JSON.stringify(state));
        newState.regUserPassWord=action.UpContactText;
        return newState;
    };
    if(action.type===constants.REG_VER_CODE){
        const newState=JSON.parse(JSON.stringify(state));
        newState.regVerCode=action.UpContactText;
        return newState;
    };
    if(action.type===constants.SET_CON_FORM){
        const newState=JSON.parse(JSON.stringify(state));
        newState.showConfirmationForm=true;
        return newState;
    };
    if(action.type===constants.WIFI_INPUT_FOCUS){
        const newState=JSON.parse(JSON.stringify(state));
        newState.wifiPassFocus=true;
        return newState;
    };
    if(action.type===constants.WIFI_INPUT_BLUR){
        const newState=JSON.parse(JSON.stringify(state));
        newState.wifiPassFocus=false;
        return newState;
    };
    if(action.type===constants.WIFI_PASS_WORD){
        const newState=JSON.parse(JSON.stringify(state));
        newState.wifiPassWord=action.UpContactText;
        return newState;
    };
    return state;
};