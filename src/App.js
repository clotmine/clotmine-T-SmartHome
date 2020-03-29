import React,{Component} from 'react';
import store from './store';
import { Provider } from 'react-redux';

/**页面引入 */
import DeviceNav from './appNavigations/Navigation';
import LoginPage from './pages/system/LoginPage';
import RegisterPage from './pages/system/RegisterPage';


class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <DeviceNav/>
            </Provider>
        )
    }
};

export default App;