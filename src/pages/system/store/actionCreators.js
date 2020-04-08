import * as constants from './constants';

export const lanToChinese=()=>({
    type:constants.LAN_TO_CHINESE
});

export const resetShowConfirmationForm=()=>({
    type:constants.RESET_SHOWCONFIRMATIONFORM
});

export const lanToEnglish=()=>({
    type:constants.LAN_TO_ENGLISH
});

export const factorySet=()=>({
    type:constants.FACTORY_SET
});

export const userInputFocus=()=>({
    type:constants.USER_NAME_FOCUS
});

export const userInputBlur=()=>({
    type:constants.USER_NAME_BLUR
});

export const emailInputFocus=()=>({
    type:constants.EMAIL_INPUT_FOCUS
});

export const emailInputBlur=()=>({
    type:constants.EMAIL_INPUT_BLUR
});

export const passWordInputFocus=()=>({
    type:constants.PASSWORD_NAME_FOCUS
});

export const passWordInputBlur=()=>({
    type:constants.PASSWORD_NAME_BLUR
});

export const verCodeInputFocus=()=>({
    type:constants.VER_CODE_FOCUS
});

export const verCodeInputBlur=()=>({
    type:constants.VER_CODE_BLUR
});

export const blurAllInput=()=>({
    type:constants.BLUR_ALL_INPUT
});

export const cLogUserName=(UpContactText)=>({
    type:constants.LOG_USER_NAME,
    UpContactText
});

export const saveUsername=(val)=>({
    type:constants.SAVE_USERNAME,
    val
});

export const cLogPassWord=(UpContactText)=>({
    type:constants.LOG_PASS_WORD,
    UpContactText
});

export const cRegUserName=(UpContactText)=>({
    type:constants.REG_USER_NAME,
    UpContactText
});

export const cRegEmail=(UpContactText)=>({
    type:constants.REG_USER_EMAIL,
    UpContactText
});

export const cRegPassWord=(UpContactText)=>({
    type:constants.REG_PASS_WORD,
    UpContactText
});

export const cRegVerCode=(UpContactText)=>({
    type:constants.REG_VER_CODE,
    UpContactText
});

export const setConfirmationForm=()=>({
    type:constants.SET_CON_FORM
})

export const wifiInputFocus=()=>({
    type:constants.WIFI_INPUT_FOCUS
});

export const wifiInputBlur=()=>({
    type:constants.WIFI_INPUT_BLUR
});

export const cWifiPassWord=(UpContactText)=>({
    type:constants.WIFI_PASS_WORD,
    UpContactText
});