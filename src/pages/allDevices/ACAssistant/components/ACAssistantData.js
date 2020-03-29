import React,{Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import TextFix from '../../../../rule/TextFix';
import px2dp from '../../../../rule/px2dp';
import {connect} from 'react-redux';

class ACAssistantData extends Component {
  render(){
    const index=this.props.index;
    return (
      <View style={styles.wrapper}>
        <View>
    <TextFix style={styles.info}>{this.props.device[index].monthEl}</TextFix>
          <TextFix style={styles.title}>{this.props.languageMode==='chinese'?'本月用电(度)':'Monthly electricity'}</TextFix>
        </View>
        <View>
          <TextFix style={styles.info}>{this.props.device[index].dayEl}</TextFix>
          <TextFix style={styles.title}>{this.props.languageMode==='chinese'?'今日用电(度)':'Daily electricity'}</TextFix>
        </View>
        <View>
          <TextFix style={styles.info}>{this.props.device[index].devicePower}Kw</TextFix>
          <TextFix style={styles.title}>{this.props.languageMode==='chinese'?'设备功率':'Power'}</TextFix>
        </View>
      </View>
    );
  };
};

const styles=StyleSheet.create({
  wrapper:{flexDirection:'row',marginHorizontal:px2dp(60),justifyContent:'space-between'},
  info:{fontSize:px2dp(38),color:'#fff'},
  title:{fontSize:px2dp(26),color:'rgba(255,255,255,.5)'}
});

const mapStateToProps=(state)=>{
  return{
    device:state.devices.deviceList,
    languageMode:state.system.languageMode,
  }
};

export default connect(mapStateToProps)(ACAssistantData);