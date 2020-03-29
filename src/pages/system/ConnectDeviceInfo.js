import React,{Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextFix from '../../rule/TextFix';
import px2dp from '../../rule/px2dp'; 
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import NavigationBar from '../../publicComponents/NavigationBar';
import {connect} from 'react-redux';
import {actionCreators}  from '../allDevices/store';

class ConnectDeviceInfo extends Component{
  getRightButton(){return null};
  getLeftButton(){
    return (
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ConnectDeviceWifi')}>
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
  addSuccess(){
    this.props.addDeviceToList();
    this.props.navigation.navigate('DeviceList');
  }
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
          <View style={styles.itemWrapper}>
            <TextFix style={styles.itemTitle}>{this.props.languageMode==='chinese'?'设备地址:':'Device Address:'}</TextFix>
            <TextFix style={styles.content}>192.168.9.162</TextFix>
          </View>
          <View style={styles.itemWrapper}>
            <TextFix style={styles.itemTitle}>{this.props.languageMode==='chinese'?'设备类型:':'Equipment Type:'}</TextFix>
            <TextFix style={styles.content}>{this.props.languageMode==='chinese'?'空调助手':'Air Conditioning Companion'}</TextFix>
          </View>
          <TextFix style={styles.itemTitle}>{this.props.languageMode==='chinese'?'设备名称:':'Device Name:'}</TextFix>
          <View style={this.props.deviceNameFocus?styles.inputWrapperOn:styles.inputWrapper}>
            <TextInput style={styles.input}
              onFocus={()=>{this.props.deviceNameInputFocus()}}
              onChangeText={(UpContactText)=>{this.props.cDeviceName(UpContactText)}}
              onBlur={()=>{this.props.deviceNameInputBlur()}}
            />
          </View>
        </View>
        <View style={styles.bigBtnWrapper}>
          <TouchableOpacity style={styles.bigBtnBg} onPress={()=>{this.props.setDeviceName===''?alert('请输入设备名称'):this.addSuccess()}}>
            <TextFix style={styles.btnTitle}>{this.props.languageMode==='chinese'?'确认添加':'Confirm'}</TextFix>
          </TouchableOpacity>
          </View>
      </View>
    );
  };
};

const styles=StyleSheet.create({
  windowBg:{flex:1,backgroundColor:'#fff'},
  contentWrapper:{paddingHorizontal:px2dp(30),paddingTop:px2dp(60)},
  itemWrapper:{flexDirection:'row',marginBottom:px2dp(30),alignItems:'center'},
  itemTitle:{fontSize:px2dp(28),color:'#8D8E91',marginRight:px2dp(20)},
  icWifi:{height:px2dp(28),width:px2dp(28),marginRight:px2dp(10)},
  content:{fontSize:px2dp(28),color:'#08142E'},
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
    deviceNameFocus:state.devices.deviceNameFocus,
    setDeviceName:state.devices.setDeviceName,
    device:state.devices,
    languageMode:state.system.languageMode,
  };
};
const mapDispatchToProps=(dispatch)=>{
  return {
    deviceNameInputFocus(){
      dispatch(actionCreators.deviceNameInputFocus());
    },
    deviceNameInputBlur(){
      dispatch(actionCreators.deviceNameInputBlur());
    },
    cDeviceName(UpContactText){
      dispatch(actionCreators.cDeviceName(UpContactText));
    },
    deleteDeviceName(){
      dispatch(actionCreators.deleteDeviceName());
    },
    addDeviceToList(){
      dispatch(actionCreators.addDeviceToList());
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ConnectDeviceInfo);