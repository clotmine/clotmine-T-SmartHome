import React,{Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import NavigationBar from '../../publicComponents/NavigationBar'; /**自定义topBar */
import px2dp from '../../rule/px2dp'; /**元素尺寸适配 */
import TextFix from '../../rule/TextFix'; /**字体适配 */
import {connect} from 'react-redux';
import  {actionCreators}  from './store';
import PopUp from '../../publicComponents/PopUp';


class LanguageSetPage extends Component{
  /** 自定义顶部操作栏左右键 */
  getRightButton(){return null};
  getLeftButton(){
    return (
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SetListPage')}>
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
      title={this.props.languageMode==='chinese'?'设置':'Set'}
      statusBar={statusBar}
      style={{backgroundColor:'#fff',borderBottomColor:'#E8ECEF',borderBottomWidth: 1,}}
      rightButton={this.getRightButton()}
      leftButton={this.getLeftButton()}
    />;
    return (
      <View style={styles.windowBg}>
        {navigationBar}
        <View style={styles.contentWrapper}>
          <TextFix style={styles.title}>{this.props.languageMode==='chinese'?'界面语言:':'Language:'}</TextFix>
          <TouchableOpacity style={styles.titleItemWrapper} onPress={()=>{this.props.lanToChinese()}}>
            <Image style={styles.radio} source={this.props.languageMode==='chinese'?require('../../statics/icons/radio_on.png'):require('../../statics/icons/radio_off.png')}/>
            <TextFix style={styles.text}>中文</TextFix>
          </TouchableOpacity>
          <TouchableOpacity style={styles.titleItemWrapper} onPress={()=>{this.props.lanToEnglish()}}>
            <Image style={styles.radio} source={this.props.languageMode==='english'?require('../../statics/icons/radio_on.png'):require('../../statics/icons/radio_off.png')}/>
            <TextFix style={styles.text}>English</TextFix>
          </TouchableOpacity>
          <TextFix style={styles.title}>{this.props.languageMode==='chinese'?'恢复出厂设置:':'Reset:'}</TextFix>
          <View style={styles.bigBtnWrapper}>
            <TouchableOpacity style={styles.bigBtnBg} onPress={()=>{this.props.factorySet()}}>
              <TextFix style={styles.btnTitle}>{this.props.languageMode==='chinese'?'恢复出厂设置':'Reset'}</TextFix>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
};

/** 样式表 */
const styles=StyleSheet.create({
  windowBg:{flex:1,backgroundColor:'#fff'},
  contentWrapper:{paddingHorizontal:px2dp(30),paddingTop:px2dp(30)},
  title:{color:'rgba(27,30,36,.5)',fontSize:px2dp(28),marginTop:px2dp(20),marginBottom:px2dp(30)},
  titleItemWrapper:{flexDirection:'row',marginHorizontal:px2dp(25),alignItems:'center',marginBottom:px2dp(30)},
  radio:{height:px2dp(40),width:px2dp(40),marginRight:px2dp(22)},
  text:{color:'#1B1E24',fontSize:px2dp(32)},
  bigBtnWrapper:{flexDirection:'row',marginBottom:px2dp(80)},
  bigBtnBg:{marginHorizontal:px2dp(25),flexDirection:'row',flex:1,height:px2dp(92),backgroundColor:'#E6E7EB',borderRadius:px2dp(8),justifyContent:'center',alignItems:'center'},
  btnTitle:{color:'#8D8E91',fontSize:px2dp(30)}
});

const mapStateToProps=(state)=>{
  return {
    languageMode:state.system.languageMode,
    restoreFactory:state.system.restoreFactory,
  }
};
const mapDispatchToProps=(dispatch)=>{
  return {
    lanToChinese(){
      dispatch(actionCreators.lanToChinese());
    },
    lanToEnglish(){
      dispatch(actionCreators.lanToEnglish());
    },
    factorySet(){
      dispatch(actionCreators.factorySet())
    },
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(LanguageSetPage);