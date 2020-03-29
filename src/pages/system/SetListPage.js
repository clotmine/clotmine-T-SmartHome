import React,{Component} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
import {connect} from 'react-redux';
import {actionCreators}  from './store';

import { Auth } from 'aws-amplify'

class SetListPage extends Component{

  async componentDidMount(){ //欢迎页存在2s，之后跳转至首页
    try{
      const user = await Auth.currentAuthenticatedUser();
      console.log('user',user);
      this.props.saveUsername(user.username)
    }catch(err){
      console.log('error:',err)
    }
  };
  /** 自定义顶部操作栏左右键 */
  getRightButton(){
    return(
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={this.logout}>
          <View style={{padding:px2dp(5),marginRight:px2dp(20)}}>
            <TextFix style={{color:'#348AFF',fontSize:px2dp(30)}}>{this.props.languageMode==='chinese'?'退出登录':'Login Out'}</TextFix>
          </View>
        </TouchableOpacity>
      </View>
    ) 
  };
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

  logout = async () => {
    try {
      await Auth.signOut();
      this.props.navigation.navigate('LoginPage')
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }
  render(){
    let statusBar={
      backgroundColor:'#fff',
      barStyle:'dark-content',
    };
    let navigationBar=<NavigationBar
      title={this.props.languageMode==='chinese'?'设置中心':'Set Center'}
      statusBar={statusBar}
      style={{backgroundColor:'#fff',borderBottomColor:'#E8ECEF',borderBottomWidth: 1,}}
      rightButton={this.getRightButton()}
      leftButton={this.getLeftButton()}
    />;
    return (
      <View style={styles.windowBg}>
        {navigationBar}
        <View style={styles.contentWrapper}>
          <ImageBackground style={styles.topImageBg} source={require('../../statics/images/img_setListPageBg.png')}>
            <Image style={styles.userHeader} source={require('../../statics/images/img_userHeader.png')}/>
            <TextFix style={styles.userName}>{this.props.username}</TextFix>
          </ImageBackground>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('LanguageSetPage')}>
            <View style={styles.setItem}>
              <Image style={styles.itemIcon} source={require('../../statics/icons/ic_set.png')}/>
              <TextFix style={styles.itemTitle}>{this.props.languageMode==='chinese'?'设置':'Set'}</TextFix>
              <AntDesign
                name={'right'}
                size={px2dp(26)}
                color={'rgba(8,20,46,.27)'}
                style={styles.goItem}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('AboutUsPage')}>
            <View style={styles.setItem}>
              <Image style={styles.itemIcon} source={require('../../statics/icons/ic_about.png')}/>
              <TextFix style={styles.itemTitle}>{this.props.languageMode==='chinese'?'关于':'About'}</TextFix>
              <AntDesign
                name={'right'}
                size={px2dp(26)}
                color={'rgba(8,20,46,.27)'}
                style={styles.goItem}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
};


/** 样式表 */
const styles=StyleSheet.create({
  windowBg:{flex:1,backgroundColor:'#F6F8FA'},
  contentWrapper:{paddingHorizontal:px2dp(30),paddingTop:px2dp(30)},
  topImageBg:{height:px2dp(500),alignItems:'center'},
  userHeader:{width:px2dp(160),height:px2dp(160),marginTop:px2dp(220)},
  userName:{fontSize:px2dp(36),color:'#252631',marginTop:px2dp(20)},
  setItem:{height:px2dp(110),borderRadius:px2dp(10),backgroundColor:'#fff',marginTop:px2dp(30),flexDirection:'row',justifyContent:'flex-start',alignItems:'center'},
  itemIcon:{height:px2dp(40),width:px2dp(40),marginLeft:px2dp(30)},
  itemTitle:{fontSize:px2dp(30),color:'rgba(37,38,49,.8)',marginLeft:px2dp(20),flex:1},
  goItem:{marginRight:px2dp(30)}
});

const mapStateToProps=(state)=>{
  return {
    languageMode:state.system.languageMode,
    logUserName:state.system.logUserName,
    username:state.system.username
  };
};
const mapDispatchToProps=(dispatch)=>{
  return {
    saveUsername(val){
      dispatch(actionCreators.saveUsername(val))
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(SetListPage);