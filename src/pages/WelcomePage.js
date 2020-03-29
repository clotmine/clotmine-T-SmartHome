import React,{Component} from 'react';
import {
    StyleSheet,
    ImageBackground,
    Image
} from 'react-native';
import {connect} from 'react-redux';
import px2dp from '../rule/px2dp';

import { Auth } from 'aws-amplify'

class WelcomePage extends Component {
  async componentDidMount(){ //欢迎页存在2s，之后跳转至首页
    try{
      const user = await Auth.currentAuthenticatedUser();
      console.log('user',user);
      if(user){
        this.timer=setTimeout(()=>{
          this.props.navigation.navigate('DeviceNav');
        },2000);
      }else{
        this.timer=setTimeout(()=>{
          this.props.navigation.navigate('LoginPage')
        },2000);
      }
    }catch(err){
      console.log('error:',err)
      this.props.navigation.navigate('LoginPage')
    }
  };
  componentWillUnmount(){ //页面销毁时clear定时器
    this.timer && clearTimeout(this.timer);
  };

  render(){
    return (
      <ImageBackground style={styles.windowBg} source={require('../statics/images/weicomePageBg.png')}>
        {
          this.props.languageMode==='chinese'?
          <Image style={styles.logo} resizeMode ='contain' source={require('../statics/images/logo&slogan(c).png')}/>:
          <Image style={styles.logo} resizeMode ='contain' source={require('../statics/images/logo&slogan(e).png')}/>
        }
      </ImageBackground>
    );
  };
};

const styles=StyleSheet.create({
  windowBg:{flex:1,justifyContent:'center',alignItems:'center'},
  logo:{height:px2dp(298),marginBottom:px2dp(100)}
});

const mapStateToProps=(state)=>{
  return {
    deviceData:state.devices,
    languageMode:state.system.languageMode,
  }
};


export default connect(mapStateToProps)(WelcomePage);