import React,{Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import px2dp from '../../../../rule/px2dp';
import TextFix from '../../../../rule/TextFix';
import {connect} from 'react-redux';
import  {actionCreators}  from '../../store';

class ACAssistantInfo extends Component{
  render(){
    const index=this.props.index;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{this.props.reduceTemp(index)}} disabled={this.props.device[index].deviceStatus==='open'?false:true}>
          <Image style={styles.btn} source={require('../../../../statics/icons/btn_reduce.png')}/>
        </TouchableOpacity>
        <ImageBackground style={styles.bg} source={require('../../../../statics/images/img_turnTableBg.png')}>
          <View style={styles.top}>
            {/* <TouchableOpacity onPress={()=>{this.props.reduceTemp(index)}} disabled={this.props.device[index].deviceStatus==='open'?false:true}>
              <Image style={styles.btn} source={require('../../../../statics/icons/btn_reduce.png')}/>
            </TouchableOpacity> */}
            <View style={styles.titleWrapper}>
              <TextFix style={this.props.device[index].deviceStatus==='open'?(this.props.device[index].devicesMode==='cooling'?styles.titleCooling:(this.props.device[index].devicesMode==='heating'?styles.titleHeating:(this.props.device[index].devicesMode==='arefaction'?styles.titleArefaction:styles.titleAuto))):styles.titleClosed}>{this.props.device[index].temData}</TextFix>
              <TextFix style={styles.text}>℃</TextFix>
            </View>
            {/* <TouchableOpacity onPress={()=>{this.props.addTemp(index)}} disabled={this.props.device[index].deviceStatus==='open'?false:true}>
              <Image style={styles.btn} source={require('../../../../statics/icons/btn_add.png')}/>
            </TouchableOpacity> */}
          </View>
          <TextFix style={styles.temInfo}>{this.props.languageMode==='chinese'?'当前室内温度:':'Room TEMP:'}{this.props.device[index].currentTEMData}℃</TextFix>
        </ImageBackground>
        <TouchableOpacity onPress={()=>{this.props.addTemp(index)}} disabled={this.props.device[index].deviceStatus==='open'?false:true}>
          <Image style={styles.btn} source={require('../../../../statics/icons/btn_add.png')}/>
        </TouchableOpacity>
      </View>
    );
  };
};

const styles=StyleSheet.create({
  container:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',paddingHorizontal:px2dp(50)},
  bg:{width:px2dp(410),height:px2dp(410),justifyContent:'center'},
  top:{flexDirection:'row',justifyContent:'center',marginTop:px2dp(20),alignItems:'center',marginBottom:px2dp(30)},
  btn:{width:px2dp(90),height:px2dp(90)},
  titleWrapper:{flexDirection:'row',alignItems:'flex-start',marginLeft:px2dp(30)},
  titleClosed:{fontSize:px2dp(70),fontWeight:'bold',color:'#424D71'},
  titleCooling:{fontSize:px2dp(70),fontWeight:'bold',color:'#60B3FF'},
  titleHeating:{fontSize:px2dp(70),fontWeight:'bold',color:'#FFA87C'},
  titleArefaction:{fontSize:px2dp(70),fontWeight:'bold',color:'#839AF7'},
  titleAuto:{fontSize:px2dp(70),fontWeight:'bold',color:'#25B5C9'},
  text:{fontSize:px2dp(28),color:'#424D71',marginTop:px2dp(12)},
  temInfo:{alignSelf:'center',color:'#838993'}
});

const mapStateToProps=(state)=>{
  return{
    device:state.devices.deviceList,
    languageMode:state.system.languageMode,
  }
};

const mapDispatchToProps=(dispatch)=>{
  return{
    reduceTemp(index){
      dispatch(actionCreators.reduceTemp(index));
    },
    addTemp(index){
      dispatch(actionCreators.addTemp(index));
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(ACAssistantInfo);