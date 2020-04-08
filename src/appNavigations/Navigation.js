import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


import DeviceList from '../pages/deviceList';
import ACACtrlPage from '../pages/allDevices/ACAssistant';
import SetListPage from '../pages/system/SetListPage';
import LanguageSetPage from '../pages/system/LanguageSetPage';
import AboutUsPage from '../pages/system/AboutUsPage';
import WelcomePage from '../pages/WelcomePage';

import LoginPage from '../pages/system/LoginPage';
import RegisterPage from '../pages/system/RegisterPage';
import ResetPassword from '../pages/system/ResetPassword';

import ConnectDeviceWifi from '../pages/system/ConnectDeviceWifi';
import ConnectDeviceInfo from '../pages/system/ConnectDeviceInfo';

const LoginNav = createStackNavigator(
  {
    LoginPage:{
      screen:LoginPage,
      navigationOptions:{
        header:null
      }
    },
    RegisterPage:{
      screen:RegisterPage,
      navigationOptions:{
        header:null
      }
    },
    ResetPassword:{
      screen:ResetPassword,
      navigationOptions:{
        header:null
      }
    },
  }
);

const DeviceNav = createStackNavigator(
  {
    DeviceList:{
      screen:DeviceList,
      navigationOptions:{
        header:null
      }
    },
    ConnectDeviceWifi:{
      screen:ConnectDeviceWifi,
      navigationOptions:{
        header:null
      }
    },
    ConnectDeviceInfo:{
      screen:ConnectDeviceInfo,
      navigationOptions:{
        header:null
      }
    },
    ACACtrlPage:{
      screen:ACACtrlPage,
      navigationOptions:{
        header:null
      }
    },
    SetListPage:{
      screen:SetListPage,
      navigationOptions:{
        header:null
      }
    },
    LanguageSetPage:{
      screen:LanguageSetPage,
      navigationOptions:{
        header:null
      }
    },
    AboutUsPage:{
      screen:AboutUsPage,
      navigationOptions:{
        header:null
      }
    },
  }
);

const AppNav = createSwitchNavigator(
  {
    LoginNav:{
      screen:LoginNav,
      navigationOptions:{
        header:null
      }
    },
    DeviceNav:{
      screen:DeviceNav,
      navigationOptions:{
        header:null
      }
    },
  }
);

const InitNavigator = createStackNavigator({
  WelcomePage:{
    screen:WelcomePage,
    navigationOptions:{
      headerShown: false,
    }
  },
});

export default createAppContainer(createSwitchNavigator({
  Init:InitNavigator,
  Main:AppNav
},{
  navigationOptions:{
    headerShown: false,
  }
}));
