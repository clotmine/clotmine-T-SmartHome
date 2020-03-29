import React,{Component} from 'react';
import {View,ScrollView,TouchableOpacity,StyleSheet,Image,TextInput,Text} from 'react-native';
import NavigationBarPlus from '../../publicComponents/NavigationBarPlus'; //自定义顶部操作栏
import Feather from 'react-native-vector-icons/Feather'; //顶部菜单右侧button-icon
import px2dp from '../../rule/px2dp'; //元素尺寸规则
import TextFix from '../../rule/TextFix'; //字号规则
import ACAssistantItem from '../allDevices/ACAssistant/components/ACAssistantItem';
import {connect} from 'react-redux';
import {actionCreators}  from '../allDevices/store';
import PopUp from '../../publicComponents/PopUp';
import Pop from 'rn-global-modal';

class DeviceList extends Component{

  UNSAFE_componentWillMount(){
    this.props.getDeviceData('deviceData');
  };

  _showDeletePop(){
    Pop.show(
        <View style={{width:px2dp(610),backgroundColor:'#fff',borderRadius:px2dp(4),alignItems:'center'}}>
            <View style={{width:'100%',height:px2dp(196),backgroundColor:'#F8F8F8',borderTopLeftRadius:px2dp(4),borderTopRightRadius:px2dp(4),borderBottomColor:'#E2E2E2',borderBottomWidth:px2dp(1),alignItems:'center'}}>
              <Image style={{width:px2dp(46),height:px2dp(46),marginTop:px2dp(50),marginBottom:px2dp(20)}} source={require('../../statics/icons/ic_deleteDeviceMix.png')}/>
              <TextFix style={{fontSize:px2dp(30),color:'#FFA87C'}}>{this.props.languageMode==='chinese'?'删除设备':'Delete Device'}</TextFix>
            </View>
            <View style={{alignItems:'center'}}>
              <TextFix style={{marginTop:px2dp(50),width:px2dp(500),textAlign:'center',fontSize:px2dp(26),color:'#19243D'}}>{this.props.languageMode==='chinese'?'是否确认删除设备':'Confirm to delete device'} {this.props.device[this.popUp.state.index].deviceName} ?</TextFix>
              <TouchableOpacity onPress={()=>{this._hidePop();this.props.deleteDevice(this.popUp.state.index)}} style={{marginTop:px2dp(50),marginBottom:px2dp(50),width:px2dp(200),height:px2dp(70),backgroundColor:'#FFA87C',borderRadius:px2dp(4),justifyContent:'center',alignItems:'center'}}>
                <TextFix style={{color:'#fff',fontSize:px2dp(26)}}>{this.props.languageMode==='chinese'?'确定':'Confirm'}</TextFix>
              </TouchableOpacity>
            </View>
        </View>
        ,{animationType: 'slide-up', maskClosable: true, onMaskClose: ()=>{}})
  };
  _showRenamePop(){
    Pop.show(
        <View style={{width:px2dp(610),backgroundColor:'#fff',borderRadius:px2dp(4),alignItems:'center'}}>
            <View style={{width:'100%',height:px2dp(196),backgroundColor:'#F8F8F8',borderTopLeftRadius:px2dp(4),borderTopRightRadius:px2dp(4),borderBottomColor:'#E2E2E2',borderBottomWidth:px2dp(1),alignItems:'center'}}>
              <Image style={{width:px2dp(46),height:px2dp(46),marginTop:px2dp(50),marginBottom:px2dp(20)}} source={require('../../statics/icons/ic_renameMix.png')}/>
              <TextFix style={{fontSize:px2dp(30),color:'#60B3FF'}}>{this.props.languageMode==='chinese'?'重命名设备':'Rename Device'}</TextFix>
            </View>
            <View style={{alignItems:'center'}}>
              <TextFix style={{marginTop:px2dp(50),width:px2dp(500),textAlign:'center',fontSize:px2dp(26),color:'#19243D'}}>{this.props.languageMode==='chinese'?'是否重命名设备':'Confirm to rename device'} {this.props.device[this.popUp.state.index].deviceName} ?</TextFix>
              <TextInput onChangeText={(UpContactText)=>{this.props.cDeviceName(UpContactText)}} placeholder={this.props.languageMode==='chinese'?'请输入设备名称':'Please enter a name'} style={{height:px2dp(74),width:px2dp(390),borderColor:'#E2E2E2',borderWidth:px2dp(1),borderRadius:px2dp(37),paddingHorizontal:px2dp(25),marginTop:px2dp(30)}}/>
              <TouchableOpacity onPress={()=>{this._hidePop();this.props.renameDevice(this.popUp.state.index)}} style={{marginTop:px2dp(50),marginBottom:px2dp(50),width:px2dp(200),height:px2dp(70),backgroundColor:'#60B3FF',borderRadius:px2dp(4),justifyContent:'center',alignItems:'center'}}>
                <TextFix style={{color:'#fff',fontSize:px2dp(26)}}>{this.props.languageMode==='chinese'?'确定':'Confirm'}</TextFix>
              </TouchableOpacity>
            </View>
        </View>
        ,{animationType: 'slide-up', maskClosable: true, onMaskClose: ()=>{}})
  };
  _hidePop(){
    Pop.hide();
    this.popUp.hide();
  }

  getRightButton(){ //生成顶部菜单栏右侧button
    return(
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SetListPage')}>
          <View style={{padding:px2dp(5),marginRight:px2dp(20)}}>
            <Feather
              name={'more-horizontal'}
              size={px2dp(50)}
              color={'#252631'}
            />
          </View>
        </TouchableOpacity>
      </View>
    ) 
  };
  getLeftButton(){ //生成顶部菜单左侧button
    return (
      <View style={{flexDirection:'row'}}>
        <View style={{padding:px2dp(5),marginLeft:px2dp(20)}}>
          <TextFix style={{fontSize:px2dp(40),fontWeight:'500',color:'#252631'}}>{this.props.languageMode==='chinese'?'T-智慧家庭':'T-SmartHome'}</TextFix>
        </View>
      </View>
    )
  };
  render(){
    let statusBar={ //定义statusBar
      backgroundColor:'#fff',
      barStyle:'dark-content',
    };
    let navigationBar=<NavigationBarPlus //定义顶部菜单
      statusBar={statusBar}
      style={{backgroundColor:'#fff'}}
      rightButton={this.getRightButton()}
      leftButton={this.getLeftButton()}
    />;
    this.props.saveDeviceData('deviceData',this.props.device);
    this.props.saveDeviceData('systemData',this.props.system);
    return ( 
      <View style={styles.screenBg}>
        {navigationBar}
        <ScrollView style={styles.listWrapper}>
          {/* <Text style={{ marginTop: 200 }} onPress={() => { this.popUp.show() }}>打开弹框</Text> */}
          <View style={styles.listTitleWrapper}>
            <TextFix style={styles.listTitleText}>{this.props.languageMode==='chinese'?'设备列表':'Device List'}</TextFix>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ConnectDeviceWifi')}>
              <Image style={styles.listAddIcon} source={require('../../statics/icons/ic_addDevice.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.deviceListWrapper}>
            {
              this.props.device.map((item,index)=>{
                if(item.deviceType==='airConditioningAssistant'){
                  return <ACAssistantItem popUpshow={(index)=>{this.popUp.show(index)}} key={index} index={index} deviceState={item} navigation={this.props.navigation}/>
                }
              })
            }
          </View>
        </ScrollView>
        <PopUp ref={ref => this.popUp = ref}>
          <View style={styles.popContainer}>
            <TouchableOpacity style={styles.icContainer} onPress={this._showDeletePop.bind(this)}>
              <Image source={require('../../statics/icons/ic_deleteDevice.png')} resizeMode ='contain' style={styles.popIcon}/>
              <TextFix style={styles.popTitle}>{this.props.languageMode==='chinese'?'删除':'Delete'}</TextFix>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icContainer} onPress={this._showRenamePop.bind(this)}>
              <Image source={require('../../statics/icons/ic_rename.png')} resizeMode ='contain' style={styles.popIcon}/>
              <TextFix style={styles.popTitle}>{this.props.languageMode==='chinese'?'重命名':'Rename'}</TextFix>
            </TouchableOpacity>
          </View>
        </PopUp>
      </View>
    );
  };
};

const styles=StyleSheet.create({
  screenBg:{flex:1,backgroundColor:'#F6F8FA'},
  listWrapper:{marginHorizontal:px2dp(30)},
  listTitleWrapper:{flexDirection:'row',justifyContent:'space-between',marginTop:px2dp(30),alignItems:'center'},
  listTitleText:{color:'#08142E',fontSize:px2dp(32)},
  listAddIcon:{height:px2dp(60),width:px2dp(60)},
  deviceListWrapper:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',marginTop:px2dp(40)},
  popContainer:{marginTop:px2dp(50),flexDirection:'row',justifyContent:'center'},
  popIcon:{width:px2dp(110),height:px2dp(110),marginBottom:px2dp(20)},
  icContainer:{marginHorizontal:px2dp(60),alignItems:'center'},
  popTitle:{fontSize:px2dp(26),color:'#8D8E91'}
});

const mapStateToProps=(state)=>{
  return {
    device:state.devices.deviceList,
    languageMode:state.system.languageMode,
    system:state.system
  }
};
const mapDispatchToProps=(dispatch)=>{
  return {
    saveDeviceData(key,data){
      dispatch(actionCreators.saveDeviceData(key,data))
    },
    getDeviceData(key){
      dispatch(actionCreators.getDeviceData(key))
    },
    deleteDevice(index){
      dispatch(actionCreators.deleteDevice(index))
    },
    cDeviceName(UpContactText){
      dispatch(actionCreators.cDeviceName(UpContactText));
    },
    renameDevice(index){
      dispatch(actionCreators.renameDevice(index));
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(DeviceList);