import React,{Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextFix from '../../rule/TextFix';
import px2dp from '../../rule/px2dp'; 
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import NavigationBar from '../../publicComponents/NavigationBar';
import {connect} from 'react-redux';
import {actionCreators}  from './store';

class ConnectDeviceWifi extends Component{
  getRightButton(){return null};
  getLeftButton(){
    return (
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('DeviceList')}>
          <View style={{padding:px2dp(5),marginLeft:px2dp(10)}}>
            <AntDesign
              name={'left'}
              size={px2dp(36)}
              color={'#252631'}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  };
  render(){
    let statusBar={
      backgroundColor:'#fff',
      barStyle:'dark-content',
    };
    let navigationBar=<NavigationBar
      title={this.props.languageMode==='chinese'?'设备联网向导':'Device Networking Wizard'}
      statusBar={statusBar}
      style={{backgroundColor:'#fff',borderBottomColor:'#E8ECEF',borderBottomWidth: 1,}}
      rightButton={this.getRightButton()}
      leftButton={this.getLeftButton()}
    />;
    return(
      <View style={styles.windowBg}>
        {navigationBar}
        <View style={styles.contentWrapper}>
          <View style={styles.wifiNameWrapper}>
            <TextFix style={styles.wifiName}>{this.props.languageMode==='chinese'?'请输入WiFi密码:':'Please enter WiFi password:'}</TextFix>
            <View style={styles.wifiWrapper}>
              <Image style={styles.icWifi} source={require('../../statics/icons/ic_wifi.png')}/>
              <TextFix style={styles.wifi}>{this.props.wifi}</TextFix>
            </View>
          </View>
          <View style={this.props.wifiPassFocus?styles.inputWrapperOn:styles.inputWrapper}>
            <TextInput style={styles.input}
              onFocus={()=>{this.props.wifiInputFocus()}}
              onChangeText={(UpContactText)=>{this.props.cWifiPassWord(UpContactText)}}
              onBlur={()=>{this.props.wifiInputBlur()}}
            />
          </View>
        </View>
        <View style={styles.bigBtnWrapper}>
          <TouchableOpacity style={styles.bigBtnBg} onPress={()=>{this.props.navigation.navigate('ConnectDeviceInfo')}}>
            <TextFix style={styles.btnTitle}>{this.props.languageMode==='chinese'?'下一步':'Next'}</TextFix>
          </TouchableOpacity>
          </View>
      </View>
    );
  };
};

const styles=StyleSheet.create({
  windowBg:{flex:1,backgroundColor:'#fff'},
  contentWrapper:{paddingHorizontal:px2dp(30),paddingTop:px2dp(60)},
  wifiNameWrapper:{flexDirection:'row'},
  wifiName:{fontSize:px2dp(28),color:'#8D8E91',marginRight:px2dp(20)},
  icWifi:{height:px2dp(28),width:px2dp(28),marginRight:px2dp(10)},
  wifi:{fontSize:px2dp(28),color:'#08142E'},
  wifiWrapper:{flexDirection:'row',alignItems:'center'},
  inputWrapper:{borderBottomColor:'#eaeaea',borderBottomWidth:px2dp(1)},
  inputWrapperOn:{borderBottomColor:'#348AFF',borderBottomWidth:px2dp(1)},
  input:{height:px2dp(75),color:'#1B1E24',fontSize:px2dp(28),padding:0},
  bigBtnWrapper:{flexDirection:'row',marginTop:px2dp(80),marginHorizontal:px2dp(30)},
  bigBtnBg:{flexDirection:'row',flex:1,height:px2dp(92),backgroundColor:'#348AFF',borderRadius:px2dp(8),justifyContent:'center',alignItems:'center'},
  btnTitle:{color:'#fff',fontSize:px2dp(30),fontWeight:'500'}
});

const mapStateToProps=(state)=>{
  return {
    wifi:state.system.wifi,
    wifiPassFocus:state.system.wifiPassFocus,
    languageMode:state.system.languageMode,
  };
};
const mapDispatchToProps=(dispatch)=>{
  return {
    wifiInputFocus(){
      dispatch(actionCreators.wifiInputFocus());
    },
    wifiInputBlur(){
      dispatch(actionCreators.wifiInputBlur());
    },
    cWifiPassWord(UpContactText){
      dispatch(actionCreators.cWifiPassWord(UpContactText));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ConnectDeviceWifi);