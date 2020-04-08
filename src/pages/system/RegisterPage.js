import React,{Component} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import NavigationBar from '../../publicComponents/NavigationBar'; /**自定义topBar */
import px2dp from '../../rule/px2dp'; /**元素尺寸适配 */
import TextFix from '../../rule/TextFix'; /**字体适配 */
import AntDesign from 'react-native-vector-icons/AntDesign';
import {actionCreators}  from './store';
import {connect} from 'react-redux';

import { Auth } from 'aws-amplify';

import {WModal} from 'react-native-smart-tip';

const modalOpts_1 = {
  data: '正在注册',
  textColor: '#fff',
  backgroundColor: '#444444',
  position: WModal.position.CENTER,
  icon: <ActivityIndicator color='#fff' size={'large'}/>
};
const modalOpts_2 = {
  data: '正在验证',
  textColor: '#fff',
  backgroundColor: '#444444',
  position: WModal.position.CENTER,
  icon: <ActivityIndicator color='#fff' size={'large'}/>
};

class RegisterPage extends Component{

  wModalShow = (modalOpts) => {
    WModal.show(modalOpts)
  };
  wModalHide=()=>{
    WModal.hide()
  }
  /** 自定义顶部操作栏左右键 */
  getRightButton(){return null };
  getLeftButton(){
    return (
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('LoginPage');this.props.blurAllInput();this.props.resetShowConfirmationForm()}}>
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
  signUp = async () => {
    this.wModalShow(modalOpts_1);
    const username = this.props.regUserName;
    const password = this.props.regUserPassWord;
    const email = this.props.regUserEmail;
    try {
      if(!username){
        this.props.languageMode==='chinese'?Alert.alert('提示','用户名不能为空'):Alert.alert('Tips','User name cannot be empty')
      }else if(!email){
        this.props.languageMode==='chinese'?Alert.alert('提示','邮箱不能为空'):Alert.alert('Tips','Email cannot be empty')
      }else if(!password){
        this.props.languageMode==='chinese'?Alert.alert('提示','密码不能为空'):Alert.alert('Tips','Password cannot be empty')
      }else{
        const success = await Auth.signUp({ username, password, attributes: { email }})
        this.props.setConfirmationForm();
        this.props.blurAllInput();
        this.wModalHide();
      }
    } catch (err) {
      console.log('error signing up: ', err);
      this.wModalHide();
      const message = err.message;
      Alert.alert('Tips', message);
    }
  };
  confirmSignUp = async () => {
    this.wModalShow(modalOpts_2);
    const username = this.props.regUserName;
    const authenticationCode = this.props.regVerCode;
    try {
      if(!authenticationCode){
        this.props.languageMode==='chinese'?Alert.alert('提示','验证码不能为空'):Alert.alert('Tips','Verification code cannot be empty')
      }else{
        await Auth.confirmSignUp(username, authenticationCode)
        console.log('successully signed up!');
        this.props.blurAllInput();
        //this.props.resetShowConfirmationForm();
        this.wModalHide();
        this.props.languageMode==='chinese'?Alert.alert('提示','验证成功'):Alert.alert('Tips','successully signed up!');
        this.timer=setTimeout(()=>{
          this.props.navigation.navigate('LoginPage');
        },1000);
      }
    } catch (err) {
      this.wModalHide();
      const message = err.message;
      Alert.alert('Tips', message);
    }
  };
  render(){
    let statusBar={
      backgroundColor:'transparent',
      barStyle:'dark-content',
    };
    let navigationBar=<NavigationBar
      title={this.props.languageMode==='chinese'?'注册':'Sign Up'}
      statusBar={statusBar}
      style={{backgroundColor:'transparent'}}
      rightButton={this.getRightButton()}
      leftButton={this.getLeftButton()}
    />;
    return (
      <ImageBackground style={styles.windowBg} source={require('../../statics/images/img_loginPageBg.png')}>
        {navigationBar}
        {
          !this.props.showConfirmationForm && (
            <View style={styles.loginWrapper}>
              <View style={styles.formWrapper}>
                <View style={this.props.userNameFocus?styles.inputWrapperOn:styles.inputWrapper}>
                  <TextFix style={styles.inputTitle}>{this.props.languageMode==='chinese'?'用户名':'Username'}</TextFix>
                  <TextInput style={styles.input}
                    onFocus={()=>{this.props.userInputFocus()}}
                    onChangeText={(UpContactText)=>{this.props.cRegUserName(UpContactText)}}
                    onBlur={()=>{this.props.userInputBlur()}}
                  />
                </View>
                <View style={this.props.userEmailFocus?styles.inputWrapperOn:styles.inputWrapper}>
                  <TextFix style={styles.inputTitle}>{this.props.languageMode==='chinese'?'邮箱地址':'Email'}</TextFix>
                  <TextInput style={styles.input}
                    onFocus={()=>{this.props.emailInputFocus()}}
                    onChangeText={(UpContactText)=>{this.props.cRegEmail(UpContactText)}}
                    onBlur={()=>{this.props.emailInputBlur()}}
                  />
                </View>
                <View style={this.props.userPassWordFocus?styles.inputWrapperOn:styles.inputWrapper}>
                  <TextFix style={styles.inputTitle}>{this.props.languageMode==='chinese'?'密码':'Password'}</TextFix>
                  <TextInput style={styles.input} secureTextEntry={true}
                    onFocus={()=>{this.props.passWordInputFocus()}}
                    onChangeText={(UpContactText)=>{this.props.cRegPassWord(UpContactText)}}
                    onBlur={()=>{this.props.passWordInputBlur()}}
                  />
                </View>
              </View>
              <View style={styles.bigBtnWrapper}>
                <TouchableOpacity style={styles.bigBtnBg} onPress={this.signUp}>
                  <TextFix style={styles.btnTitle}>{this.props.languageMode==='chinese'?'注册':'Sign Up'}</TextFix>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
        {
          this.props.showConfirmationForm && (
            <View style={styles.loginWrapper}>
              <View style={styles.formWrapper}>
                <View style={this.props.verCodeFocus?styles.inputWrapperOn:styles.inputWrapper}>
                  <TextFix style={styles.inputTitle}>{this.props.languageMode==='chinese'?'验证码':'Verification Code'}</TextFix>
                  <TextInput style={styles.input}
                    onFocus={()=>{this.props.verCodeInputFocus()}}
                    onChangeText={(UpContactText)=>{this.props.cRegVerCode(UpContactText)}}
                    onBlur={()=>{this.props.verCodeInputBlur()}}
                  />
                </View>
              </View>
              <View style={styles.bigBtnWrapper}>
                <TouchableOpacity style={styles.bigBtnBg} onPress={this.confirmSignUp}>
                  <TextFix style={styles.btnTitle}>{this.props.languageMode==='chinese'?'确认注册':'Confirm Sign Up'}</TextFix>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
      </ImageBackground>
    )
  };
};

/** 样式表 */
const styles=StyleSheet.create({
  windowBg:{flex:1},
  loginWrapper:{flex:1,justifyContent:'space-between',paddingHorizontal:px2dp(60)},
  formWrapper:{marginBottom:px2dp(140)},
  inputWrapper:{borderBottomColor:'#EAEAEA',borderBottomWidth:1,height:px2dp(110),marginTop:px2dp(76)},
  inputWrapperOn:{borderBottomColor:'#348AFF',borderBottomWidth:1,height:px2dp(110),marginTop:px2dp(76)},
  inputTitle:{color:'rgba(27,30,36,.5)',fontSize:px2dp(28)},
  input:{height:px2dp(80),color:'#1B1E24',fontSize:px2dp(32),padding:0},
  bigBtnWrapper:{flexDirection:'row',marginBottom:px2dp(80)},
  bigBtnBg:{flexDirection:'row',flex:1,height:px2dp(92),backgroundColor:'#348AFF',borderRadius:px2dp(8),justifyContent:'center',alignItems:'center'},
  btnTitle:{color:'#fff',fontSize:px2dp(30),fontWeight:'500'}
});

const mapStateToProps=(state)=>{
  return{
    userNameFocus:state.system.userNameFocus,
    userEmailFocus:state.system.userEmailFocus,
    userPassWordFocus:state.system.userPassWordFocus,
    verCodeFocus:state.system.verCodeFocus,
    regUserName:state.system.regUserName,
    regUserEmail:state.system.regUserEmail,
    regUserPassWord:state.system.regUserPassWord,
    regVerCode:state.system.regVerCode,
    showConfirmationForm:state.system.showConfirmationForm,
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
    emailInputFocus(){
      dispatch(actionCreators.emailInputFocus());
    },
    emailInputBlur(){
      dispatch(actionCreators.emailInputBlur());
    },
    passWordInputFocus(){
      dispatch(actionCreators.passWordInputFocus());
    },
    passWordInputBlur(){
      dispatch(actionCreators.passWordInputBlur());
    },
    verCodeInputFocus(){
      dispatch(actionCreators.verCodeInputFocus());
    },
    verCodeInputBlur(){
      dispatch(actionCreators.verCodeInputBlur());
    },
    blurAllInput(){
      dispatch(actionCreators.blurAllInput());
    },
    cRegUserName(UpContactText){
      dispatch(actionCreators.cRegUserName(UpContactText));
    },
    cRegEmail(UpContactText){
      dispatch(actionCreators.cRegEmail(UpContactText));
    },
    cRegPassWord(UpContactText){
      dispatch(actionCreators.cRegPassWord(UpContactText));
    },
    cRegVerCode(UpContactText){
      dispatch(actionCreators.cRegVerCode(UpContactText));
    },
    setConfirmationForm(){
      dispatch(actionCreators.setConfirmationForm());
    },
    resetShowConfirmationForm(){
      dispatch(actionCreators.resetShowConfirmationForm());
    },
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(RegisterPage);