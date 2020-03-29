import {Dimensions,Platform} from 'react-native';

export default module={
    screenWidth:Dimensions.get('window').width,
    screenHeight:Dimensions.get('window').height,
    barContentPad:(Platform.OS==='android'?0:(isIphoneX()?42:20)),
    bottomPadding:isIphoneX()?18:0,
};

let screenWidth=Dimensions.get('window').width;
let screenHeight=Dimensions.get('window').height;

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((screenHeight === X_HEIGHT && screenWidth === X_WIDTH) ||
            (screenHeight === X_WIDTH && screenWidth === X_HEIGHT))
    )
};