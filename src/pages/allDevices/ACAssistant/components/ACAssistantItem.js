import React,{Component} from 'react';
import {View,StyleSheet,Image,TouchableOpacity, Text} from 'react-native';
import TextFix from '../../../../rule/TextFix';
import px2dp from '../../../../rule/px2dp';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import  {actionCreators}  from '../../store';

class ACAssistantItem extends Component{
  render(){
    const index=this.props.index;
    return (
      <TouchableOpacity onLongPress={()=>{this.props.popUpshow(index)}} disabled={this.props.device[index].deviceStatus==='offLine'?true:false} onPress={()=>{this.props.navigation.navigate('ACACtrlPage',{index})}}>
        <LinearGradient colors={this.props.device[index].deviceStatus==='open'?['#42A0FF','#2675FE']:['#fff', '#fff']} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.linearGradient}>
          <View style={styles.topWrapper}> 
            <Image style={styles.image} source={this.props.device[index].deviceStatus==='open'?require('../../../../statics/images/listImg_ACA_on.png'):require('../../../../statics/images/listImg_ACA_off.png')}/>
            <TouchableOpacity disabled={this.props.device[index].deviceStatus==='offLine'?true:false} onPress={()=>{this.props.switchPowerACA(index)}}>
              <Image style={styles.switch} source={this.props.device[index].deviceStatus==='offLine'?require('../../../../statics/icons/listIc_OffLine.png'):(this.props.device[index].deviceStatus==='open'?require('../../../../statics/icons/listIc_switch_on.png'):require('../../../../statics/icons/listIc_switch_off.png'))}/>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomWrapper}>
            <TextFix style={this.props.device[index].deviceStatus==='open'?styles.titleLight:styles.titleDark}>{this.props.device[index].deviceName}</TextFix>
            <TextFix style={this.props.device[index].deviceStatus==='open'?styles.textLight:styles.textDark}>{this.props.device[index].deviceStatus==='offLine'?(this.props.languageMode==='chinese'?'设备离线':'Offline'):(this.props.device[index].deviceStatus==='open'?(this.props.languageMode==='chinese'?'运行中':'Running'):(this.props.languageMode==='chinese'?'已关闭':'Closed'))}</TextFix>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
};

const styles=StyleSheet.create({
  linearGradient:{marginBottom:px2dp(30),height:px2dp(370),width:px2dp(330),borderRadius:px2dp(30),borderColor:'rgba(255,255,255,.2)',borderWidth:2,justifyContent:'space-between'},
  topWrapper:{flexDirection:'row',justifyContent:'space-between',marginHorizontal:px2dp(30),marginTop:px2dp(30),alignItems:'center'},
  image:{width:px2dp(76),height:px2dp(76)},
  switch:{width:px2dp(80),height:px2dp(42)},
  bottomWrapper:{marginHorizontal:px2dp(30),marginBottom:px2dp(50)},
  titleLight:{color:'#fff',fontSize:px2dp(32),fontWeight:'bold'},
  titleDark:{color:'#303B4B',fontSize:px2dp(32),fontWeight:'bold'},
  textDark:{color:'rgba(48,59,75,.6)',fontSize:px2dp(26),marginTop:px2dp(14)},
  textLight:{color:'rgba(255,255,255,.6)',fontSize:px2dp(26),marginTop:px2dp(14)},
});

const mapStateToProps=(state)=>{
  return{
    device:state.devices.deviceList,
    languageMode:state.system.languageMode,
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    switchPowerACA(index){
      dispatch(actionCreators.switchPowerACA(index));
    },
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(ACAssistantItem);