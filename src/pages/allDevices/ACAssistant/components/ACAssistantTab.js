import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
}from 'react-native';
import px2dp from '../../../../rule/px2dp';
import TextFix from '../../../../rule/TextFix';
import {connect} from 'react-redux';
import  {actionCreators}  from '../../store';

class ACAssistantTab extends Component{
  render(){
    const index=this.props.index;
    return (
      <View style={styles.modeTabWrapper}>
        <TouchableOpacity style={styles.choiceWrapper} onPress={()=>{this.props.ModeToCooling(index)}}>
          <View style={this.props.device[index].devicesMode==='cooling'?styles.tabItemWrapper:styles.tabItemWrapperOff}>
            <Image style={styles.btnIc} source={require('../../../../statics/icons/ic_tabCooling.png')}/>
            <TextFix style={styles.btnTitle}>{this.props.languageMode==='chinese'?'制冷':'Cool'}</TextFix>
          </View>
          <Image style={this.props.device[index].devicesMode==='cooling'?styles.selTip:styles.selTipOff} source={require('../../../../statics/icons/ic_selTip.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choiceWrapper} onPress={()=>{this.props.ModeToHeating(index)}}>
          <View style={this.props.device[index].devicesMode==='heating'?styles.tabItemWrapper:styles.tabItemWrapperOff}>
            <Image style={styles.btnIc} source={require('../../../../statics/icons/ic_tabHeating.png')}/>
            <TextFix style={styles.btnTitle}>{this.props.languageMode==='chinese'?'制热':'Heat'}</TextFix>
          </View>
          <Image style={this.props.device[index].devicesMode==='heating'?styles.selTip:styles.selTipOff} source={require('../../../../statics/icons/ic_selTip.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choiceWrapper} onPress={()=>{this.props.ModeToArefaction(index)}}>
          <View style={this.props.device[index].devicesMode==='arefaction'?styles.tabItemWrapper:styles.tabItemWrapperOff}>
            <Image style={styles.btnIc} source={require('../../../../statics/icons/ic_tabArefaction.png')}/>
            <TextFix style={styles.btnTitle}>{this.props.languageMode==='chinese'?'除湿':'Dry'}</TextFix>
          </View>
          <Image style={this.props.device[index].devicesMode==='arefaction'?styles.selTip:styles.selTipOff} source={require('../../../../statics/icons/ic_selTip.png')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choiceWrapper} onPress={()=>{this.props.ModeToAuto(index)}}>
          <View style={this.props.device[index].devicesMode==='auto'?styles.tabItemWrapper:styles.tabItemWrapperOff}>
            <Image style={styles.btnIc} source={require('../../../../statics/icons/ic_tabAuto.png')}/>
            <TextFix style={styles.btnTitle}>{this.props.languageMode==='chinese'?'自动':'Auto'}</TextFix>
          </View>
          <Image style={this.props.device[index].devicesMode==='auto'?styles.selTip:styles.selTipOff} source={require('../../../../statics/icons/ic_selTip.png')}/>
        </TouchableOpacity>
      </View>
    );
  };
};

const styles=StyleSheet.create({
  modeTabWrapper:{flexDirection:'row',marginHorizontal:px2dp(25),justifyContent:'space-between'},
  tabItemWrapper:{flexDirection:'row',justifyContent:'center',alignItems:'center'},
  tabItemWrapperOff:{flexDirection:'row',opacity:.6,justifyContent:'center',alignItems:'center'},
  btnIc:{width:px2dp(42),height:px2dp(42)},
  btnTitle:{fontSize:px2dp(30),color:'#fff',marginLeft:px2dp(12)},
  selTip:{width:px2dp(112),height:px2dp(4),marginTop:px2dp(14)},
  selTipOff:{width:px2dp(112),height:px2dp(4),marginTop:px2dp(14),opacity:0},
  choiceWrapper:{justifyContent:'center',alignItems:'center',width:'25%'}
});

const mapStateToProps=(state)=>{
  return{
    device:state.devices.deviceList,
    languageMode:state.system.languageMode,
  }
};

const mapDispatchToProps=(dispatch)=>{
  return{
    ModeToCooling(index){
      dispatch(actionCreators.ModeToCooling(index));
    },
    ModeToHeating(index){
      dispatch(actionCreators.ModeToHeating(index));
    },
    ModeToArefaction(index){
      dispatch(actionCreators.ModeToArefaction(index));
    },
    ModeToAuto(index){
      dispatch(actionCreators.ModeToAuto(index));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ACAssistantTab);