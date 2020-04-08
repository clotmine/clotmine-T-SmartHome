import React,{Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import NavigationBar from '../../publicComponents/NavigationBar'; /**自定义topBar */
import px2dp from '../../rule/px2dp'; /**元素尺寸适配 */
import TextFix from '../../rule/TextFix'; /**字体适配 */
import {actionCreators}  from './store';
import {connect} from 'react-redux';
import { Auth } from 'aws-amplify'

import {WModal} from 'react-native-smart-tip';

const modalOpts = {
  data: '正在登陆',
  textColor: '#fff',
  backgroundColor: '#444444',
  position: WModal.position.CENTER,
  icon: <ActivityIndicator color='#fff' size={'large'}/>
};

class LoginPage extends Component{

  wModalShow = (modalOpts) => {
    WModal.show(modalOpts)
  };
  wModalHide=()=>{
    WModal.hide()
  };
  /** 自定义顶部操作栏左右键 */
  getRightButton(){return null };
  getLeftButton(){return null};
  signIn = async () => {
    this.wModalShow(modalOpts);
    const username = this.props.logUserName;
    const password = this.props.logUserPassWord;
    try {
      if(!username){
        this.props.languageMode==='chinese'?Alert.alert('提示','用户名不能为空'):Alert.alert('Tips','User name cannot be empty')
      }else if(!password){
        this.props.languageMode==='chinese'?Alert.alert('提示','密码不能为空'):Alert.alert('Tips','Password cannot be empty')
      }else{
        const user = await Auth.signIn(username, password);
        console.log('user successfully signed in!', user);
        this.wModalHide();
        this.props.navigation.navigate('DeviceNav');
        this.props.blurAllInput();
      }
    } catch (err) {
      console.log('error:', err);
      this.wModalHide();
      Alert.alert('Tips', err.message);
    }
  };
  render(){
    let statusBar={
      backgroundColor:'transparent',
      barStyle:'dark-content',
    };
    let navigationBar=<NavigationBar
      statusBar={statusBar}
      style={{backgroundColor:'transparent'}}
      rightButton={this.getRightButton()}
      leftButton={this.getLeftButton()}
    />;
    return (
      <ImageBackground style={styles.windowBg} source={require('../../statics/images/img_loginPageBg.png')}>
        {navigationBar}
        <View style={styles.loginWrapper}>
          {
            this.props.languageMode==='chinese'?
            <Image style={styles.loginLogo} resizeMode ='contain' source={require('../../statics/images/logo_loginPage(C).png')}/>:
            <Image style={styles.loginLogo} resizeMode ='contain' source={require('../../statics/images/logo_loginPage(E).png')}/>
          }
          <View style={styles.formWrapper}>
            <TextFix style={styles.sayHi}>{this.props.languageMode==='chinese'?'欢迎！':'Welcome!'}</TextFix>
            <View style={this.props.userNameFocus?styles.inputWrapperOn:styles.inputWrapper}>
              <TextFix style={styles.inputTitle}>{this.props.languageMode==='chinese'?'用户名':'Username'}</TextFix>
              <TextInput style={styles.input} 
                onFocus={()=>{this.props.userInputFocus()}}
                onChangeText={(UpContactText)=>{this.props.cLogUserName(UpContactText)}}
                onBlur={()=>{this.props.userInputBlur()}}
              />
            </View>
            <View style={this.props.userPassWordFocus?styles.inputWrapperOn:styles.inputWrapper}>
              <TextFix style={styles.inputTitle}>{this.props.languageMode==='chinese'?'密码':'Password'}</TextFix>
              <TextInput style={styles.input} secureTextEntry={true}
                onFocus={()=>{this.props.passWordInputFocus()}}
                onChangeText={(UpContactText)=>{this.props.cLogPassWord(UpContactText)}}
                onBlur={()=>{this.props.passWordInputBlur()}}
              />
            </View>
            <View style={styles.pswAndResWrapper}>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ResetPassword');this.props.resetShowConfirmationForm()}}>
                <TextFix style={styles.pswText}>{this.props.languageMode==='chinese'?'忘记密码？':'Forget the password?'}</TextFix>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.props.navigation.navigate('RegisterPage');this.props.resetShowConfirmationForm()}}>
                <TextFix style={styles.resText}>{this.props.languageMode==='chinese'?'注册账户':'Sign up'}</TextFix>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bigBtnWrapper}>
              <TouchableOpacity style={styles.bigBtnBg} onPress={this.signIn}>
                <TextFix style={styles.btnTitle}>{this.props.languageMode==='chinese'?'登陆':'Sign In'}</TextFix>
              </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      )
  };
};

/** 样式表 */
const styles=StyleSheet.create({
  windowBg:{flex:1},
  loginWrapper:{flex:1,justifyContent:'space-between',paddingHorizontal:px2dp(60)},
  loginLogo:{width:px2dp(250),height:px2dp(54),marginTop:px2dp(50),marginLeft:px2dp(-12)},
  formWrapper:{marginBottom:px2dp(140)},
  sayHi:{fontSize:px2dp(60),color:'#08142E',fontWeight:'bold',marginBottom:px2dp(50)},
  inputWrapper:{borderBottomColor:'#EAEAEA',borderBottomWidth:1,height:px2dp(110),marginTop:px2dp(76)},
  inputWrapperOn:{borderBottomColor:'#348AFF',borderBottomWidth:1,height:px2dp(110),marginTop:px2dp(76)},
  inputTitle:{color:'rgba(27,30,36,.5)',fontSize:px2dp(28)},
  input:{height:px2dp(80),color:'#1B1E24',fontSize:px2dp(32),padding:0},
  pswAndResWrapper:{flexDirection:'row',justifyContent:'space-between',marginTop:px2dp(100)},
  pswText:{color:'rgba(27,30,36,.5)',fontSize:px2dp(28)},
  resText:{color:'#348AFF',fontSize:px2dp(28)},
  bigBtnWrapper:{flexDirection:'row',marginBottom:px2dp(80)},
  bigBtnBg:{flexDirection:'row',flex:1,height:px2dp(92),backgroundColor:'#348AFF',borderRadius:px2dp(8),justifyContent:'center',alignItems:'center'},
  btnTitle:{color:'#fff',fontSize:px2dp(30),fontWeight:'500'}
});

const mapStateToProps=(state)=>{
  return{
    userNameFocus:state.system.userNameFocus,
    userPassWordFocus:state.system.userPassWordFocus,
    logUserName:state.system.logUserName,
    logUserPassWord:state.system.logUserPassWord,
    languageMode:state.system.languageMode,
  };
};
const mapDispatchToProps=(dispatch)=>{
  return{
    userInputFocus(){
      dispatch(actionCreators.userInputFocus());
    },
    userInputBlur(){
      dispatch(actionCreators.userInputBlur());
    },
    passWordInputFocus(){
      dispatch(actionCreators.passWordInputFocus());
    },
    passWordInputBlur(){
      dispatch(actionCreators.passWordInputBlur());
    },
    cLogUserName(UpContactText){
      dispatch(actionCreators.cLogUserName(UpContactText));
    },
    cLogPassWord(UpContactText){
      dispatch(actionCreators.cLogPassWord(UpContactText));
    },
    resetShowConfirmationForm(){
      dispatch(actionCreators.resetShowConfirmationForm());
    },
    blurAllInput(){
      dispatch(actionCreators.blurAllInput());
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);