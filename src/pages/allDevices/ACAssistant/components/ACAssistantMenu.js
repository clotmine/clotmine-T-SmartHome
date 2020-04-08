import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import px2dp from '../../../../rule/px2dp';
import TextFix from '../../../../rule/TextFix';
import {connect} from 'react-redux';
import {actionCreators}  from '../../store';

class ACAssistantMenu extends Component{
  render(){
    const index=this.props.index;
    return (
      <View style={styles.wrapper}>
        <View style={styles.rowWrapper}>
          <TouchableOpacity style={styles.itemWrapper} onPress={()=>{this.props.switchPowerACA(index)}}>
            <Image style={styles.itemIcon} source={require('../../../../statics/icons/btn_power.png')}/>
            <TextFix style={styles.itemTitle}>{this.props.languageMode==='chinese'?'开/关':'On/0ff'}</TextFix>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemWrapper} onPress={()=>{this.props.switchWindACA(index)}} disabled={this.props.device[index].deviceStatus==='open'?false:true}>
            <Image style={styles.itemIcon} source={require('../../../../statics/icons/btn_windLevel.png')}/>
            <TextFix style={styles.itemTitle}>{this.props.languageMode==='chinese'?'风力':'Fan'}</TextFix>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemWrapper} onPress={()=>{this.props.switchAirVertical(index)}} disabled={this.props.device[index].deviceStatus==='open'?false:true}>
            <Image style={styles.itemIcon} source={require('../../../../statics/icons/btn_verticalWind.png')}/>
            <TextFix style={styles.itemTitle}>{this.props.languageMode==='chinese'?'垂直摆动':'Vertical'}</TextFix>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemWrapper} onPress={()=>{this.props.switchAirHorizontal(index)}} disabled={this.props.device[index].deviceStatus==='open'?false:true}>
            <Image style={styles.itemIcon} source={require('../../../../statics/icons/btn_horizontalWind.png')}/>
            <TextFix style={styles.itemTitle}>{this.props.languageMode==='chinese'?'左右摆动':'Horizontal'}</TextFix>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemWrapper} onPress={()=>{this.props.switchLight(index)}} disabled={this.props.device[index].deviceStatus==='open'?false:true}>
            <Image style={styles.itemIcon} source={require('../../../../statics/icons/btn_light.png')}/>
            <TextFix style={styles.itemTitle}>{this.props.languageMode==='chinese'?'灯光':'Light'}</TextFix>
          </TouchableOpacity>
          
        </View>
        <View style={styles.rowWrapper}>
          <TouchableOpacity style={styles.itemWrapper} onPress={()=>{this.props.switchAirFilter(index)}} disabled={this.props.device[index].deviceStatus==='open'?false:true}>
            <Image style={styles.itemIcon} source={require('../../../../statics/icons/btn_airFilter.png')}/>
            <TextFix style={styles.itemTitle}>{this.props.languageMode==='chinese'?'空清':'Fresh'}</TextFix>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemWrapper} onPress={()=>{this.props.switchSuperPower(index)}} disabled={this.props.device[index].deviceStatus==='open'?false:true}>
            <Image style={styles.itemIcon} source={require('../../../../statics/icons/btn_superPower.png')}/>
            <TextFix style={styles.itemTitle}>{this.props.languageMode==='chinese'?'超强':'Powerful'}</TextFix>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemWrapper} onPress={()=>{this.props.switchSleep(index)}} disabled={this.props.device[index].deviceStatus==='open'?false:true}>
            <Image style={styles.itemIcon} source={require('../../../../statics/icons/btn_sleep.png')}/>
            <TextFix style={styles.itemTitle}>{this.props.languageMode==='chinese'?'睡眠':'Sleep'}</TextFix>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemWrapper} onPress={()=>{this.props.switchAuxiliaryHeat(index)}} disabled={this.props.device[index].deviceStatus==='open'?false:true}>
            <Image style={styles.itemIcon} source={require('../../../../statics/icons/btn_auxiliaryHeat.png')}/>
            <TextFix style={styles.itemTitle}>{this.props.languageMode==='chinese'?'电辅热':'PTC'}</TextFix>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemWrapper} disabled={true}>
            <Image style={styles.itemIcon} source={require('../../../../statics/icons/btn_nothing.png')}/>
            <TextFix style={styles.itemTitle}></TextFix>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemWrapper} disabled={true}>
            <Image style={styles.itemIcon} source={require('../../../../statics/icons/btn_nothing.png')}/>
            <TextFix style={styles.itemTitle}></TextFix>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
};

const styles=StyleSheet.create({
  wrapper:{paddingHorizontal:px2dp(30),marginTop:px2dp(50)},
  rowWrapper:{flexDirection:'row',justifyContent:'space-between',marginBottom:px2dp(30)},
  itemWrapper:{alignItems:'center',width:'20%'},
  itemIcon:{width:px2dp(90),height:px2dp(90),marginBottom:px2dp(12)},
  itemTitle:{color:'#fff',fontSize:px2dp(26),opacity:.8,textAlign:'center'},
});

const mapStateToProps=(state)=>{
  return{
    device:state.devices.deviceList,
    languageMode:state.system.languageMode,
  }
};

const mapDispatchToProps=(dispatch)=>{
  return{
    switchPowerACA(index){
      dispatch(actionCreators.switchPowerACA(index));
    },
    switchWindACA(index){
      dispatch(actionCreators.switchWindACA(index));
    },
    switchAirVertical(index){
      dispatch(actionCreators.switchAirVertical(index));
    },
    switchAirHorizontal(index){
      dispatch(actionCreators.switchAirHorizontal(index));
    },
    switchLight(index){
      dispatch(actionCreators.switchLight(index));
    },
    switchAirFilter(index){
      dispatch(actionCreators.switchAirFilter(index));
    },
    switchSuperPower(index){
      dispatch(actionCreators.switchSuperPower(index));
    },
    switchSleep(index){
      dispatch(actionCreators.switchSleep(index));
    },
    switchAuxiliaryHeat(index){
      dispatch(actionCreators.switchAuxiliaryHeat(index));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ACAssistantMenu);