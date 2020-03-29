import React,{Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import NavigationBar from '../../publicComponents/NavigationBar'; /**自定义topBar */
import px2dp from '../../rule/px2dp'; /**元素尺寸适配 */
import TextFix from '../../rule/TextFix'; /**字体适配 */
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';

class AboutUsPage extends Component{
  /** 自定义顶部操作栏左右键 */
  getRightButton(){
    return(
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>{}}>
          <View style={{padding:px2dp(5),marginRight:px2dp(20)}}>
            <TextFix style={{color:'#348AFF',fontSize:px2dp(30)}}>{this.props.languageMode==='chinese'?'检查更新':'Updates'}</TextFix>
          </View>
        </TouchableOpacity>
      </View>
    ) 
  };
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
      backgroundColor:'transparent',
      barStyle:'dark-content',
    };
    let navigationBar=<NavigationBar
      title={this.props.languageMode==='chinese'?'关于':'About'}
      statusBar={statusBar}
      style={{backgroundColor:'transparent'}}
      rightButton={this.getRightButton()}
      leftButton={this.getLeftButton()}
    />;
    return (
      <ImageBackground style={styles.windowBg} source={require('../../statics/images/img_loginPageBg.png')}>
        {navigationBar}
        <View style={styles.contentWrapper}>
          <View style={styles.infoWrapper}>
            <Image style={styles.xcode} source={require('../../statics/images/img_xcode.png')}/>
            {
              this.props.languageMode==='chinese'?
              <Image style={styles.logo} resizeMode ='contain' source={require('../../statics/images/logo_loginPage(C).png')}/>:
              <Image style={styles.logo} resizeMode ='contain' source={require('../../statics/images/logo_loginPage(E).png')}/>
              
            }
            <TextFix style={styles.version}>V1.0.0</TextFix>
          </View>
        </View>
      </ImageBackground>
    )
  }
};

/** 样式表 */
const styles=StyleSheet.create({
  windowBg:{flex:1},
  contentWrapper:{flex:1,justifyContent:'center',paddingHorizontal:px2dp(30),alignItems:'center'},
  infoWrapper:{alignItems:'center',marginBottom:px2dp(200)},
  xcode:{width:px2dp(400),height:px2dp(400),marginBottom:px2dp(40)},
  logo:{width:px2dp(250),height:px2dp(54)},
  version:{color:'rgba(27,30,36,.3)',fontSize:px2dp(28),marginTop:px2dp(30),marginLeft:px2dp(30)}
});

const mapStateToProps=(state)=>{
  return {
    languageMode:state.system.languageMode,
  }  
}

export default connect(mapStateToProps)(AboutUsPage);