import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  DeviceInfo
  } from 'react-native';
import NavigationBarPlus from '../../../publicComponents/NavigationBarPlus';
import px2dp from '../../../rule/px2dp';
import TextFix from '../../../rule/TextFix';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import ACAssistantInfo from './components/ACAssistantInfo';
import ACAssistantTips from './components/ACAssistantTips';
import ACAssistantData from './components/ACAssistantData';
import ACAssistantMenu from './components/ACAssistantMenu';
import ACAssistantTab from './components/ACAssistantTab';
import {connect} from 'react-redux';
import {actionCreators}  from '../store';

class ACACtrlPage extends Component{
  getLeftButton(pageTitle){ //生成顶部菜单左侧按钮
    return (
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('DeviceList')}>
          <View style={{padding:px2dp(5),marginLeft:px2dp(10),flexDirection:'row',alignItems:'center'}}>
            <AntDesign
              name={'left'}
              size={px2dp(36)}
              color={'#fff'}
            />
            <TextFix style={{color:'#fff',fontSize:px2dp(34),marginBottom:px2dp(0),marginLeft:px2dp(6),lineHeight:px2dp(36),fontWeight:'400'}}>{pageTitle}</TextFix>
          </View>
        </TouchableOpacity>
      </View>
    )
  };
  render(){
    this.props.saveDeviceData('deviceData',this.props.device);
    const {index} = this.props.navigation.state.params;
    const pageTitle=this.props.device[index].deviceName;
    const IS_IOS = Platform.OS === 'ios';
    let statusBar={
      backgroundColor:'transparent',
      barStyle:IS_IOS?'light-content':'dark-content',
    };
    let navigationBar=<NavigationBarPlus
      statusBar={statusBar}
      style={{backgroundColor:'transparent'}}
      leftButton={this.getLeftButton(pageTitle)}
    />;
    const closedBg=['#567FA8','#395288']
    const coolingBg=['#569CFF', '#5ACAFF'];
    const heatingBg=['#FC8192', '#FCA189'];
    const arefactionBg=['#8886F6', '#7DB8F9'];
    const autoBg=['#319DCB', '#45C7DC'];
    
    return (
      <LinearGradient style={styles.windowBg} colors={this.props.device[index].deviceStatus==='open'?(this.props.device[index].devicesMode==='cooling'?coolingBg:(this.props.device[index].devicesMode==='heating'?heatingBg:(this.props.device[index].devicesMode==='arefaction'?arefactionBg:autoBg))):closedBg} start={{x:0,y:0}} end={{x:0,y:1}}>
        {navigationBar}
        <View style={styles.contentWrapper}>
          <ACAssistantTab index={index}/>
          <View style={styles.infoWrapper}>
            <ACAssistantInfo index={index}/>
            <ACAssistantTips deviceState={this.props.device[index]}/>
          </View>
          <View>
            <ACAssistantData index={index}/>
          </View>
          <View>
            <ACAssistantMenu index={index}/>
          </View>
        </View>
      </LinearGradient>
    );
  };
};

const styles=StyleSheet.create({
  windowBg:{flex:1,paddingBottom:Platform.OS==='android'?0:DeviceInfo.isIPhoneX_deprecated?px2dp(40):10},
  contentWrapper:{flex:1,justifyContent:'space-between'},
  infoWrapper:{alignItems:'center'},
});

const mapStateToProps=(state)=>{
  return{
    device:state.devices.deviceList,
  }
};
const mapDispatchToProps=(dispatch)=>{
  return {
    saveDeviceData(key,data){
      dispatch(actionCreators.saveDeviceData(key,data))
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ACACtrlPage);