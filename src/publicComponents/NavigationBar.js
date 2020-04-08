import React,{Component} from 'react';

import {Dimensions,ViewPropTypes,Text,View,StatusBar,StyleSheet, Platform,DeviceInfo} from 'react-native';
import {PropTypes} from 'prop-types';

import px2dp from '../rule/px2dp';

const NAV_BAR_HEIGHT_IOS=44;
const NAV_BAR_HEIGHT_ANDROID=50;
const STATUS_BAR_HEIGHT=20;
const STATUS_BAR_HEIGHT_IPX=42;

const StatusBarShape={
    barStyle:PropTypes.oneOf(['light-content','dark-content']),
    hidden:PropTypes.bool,
    backgroundColor:PropTypes.string,
}

class NavigationBar extends Component{
    static propTypes={
        style:ViewPropTypes.style,
        title:PropTypes.string,
        titleView:PropTypes.element,
        titleLayoutStyle:ViewPropTypes.style,
        hide:PropTypes.bool,
        statusBar:PropTypes.shape(StatusBarShape),
        rightButton:PropTypes.element,
        leftButton:PropTypes.element,
    };
    static defaultProps={
        statusBar:{
            barStyle:'light-content',
            hidden:false,
        }
    };
    getButtonElement(data){
        return (
            <View style={styles.navBarButton}>
                {data?data:null}
            </View>
        )
    }
    render(){
        let statusBar=!this.props.statusBar.hidden?
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar}/>
            </View>:null;
        let titleView=this.props.titleView?this.props.titleView:
            <Text ellipsizeMode='head' numberOfLines={1} style={styles.title}>{this.props.title}</Text>;
        let content=this.props.hide?null:
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>
        return (
            <View style={[styles.container,this.props.style]}>
                {statusBar}
                {content}
            </View>
        )
    };
};

/**
 * 判断是否为iPhone X
 */

function isIphoneX(){
    const screenWidth=Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    const X_WIDTH = 414;
    const X_HEIGHT = 896;
    if(screenHeight === X_HEIGHT && screenWidth === X_WIDTH){
        return true
    }else{
        return false
    }
};

const styles=StyleSheet.create({
    container:{
        backgroundColor:'transparent',
    },
    navBarButton:{
        alignItems:'center'
    },
    navBar:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:Platform.OS==='ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID,
    },
    navBarTitleContainer:{
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        left:70,
        right:70,
        top:0,
        bottom:0,
    },
    title:{
        fontSize:px2dp(36),
        color:'#252631',
        fontWeight:'bold'
    },
    statusBar:{
        height:(Platform.OS==='android'?0:DeviceInfo.isIPhoneX_deprecated?STATUS_BAR_HEIGHT_IPX:STATUS_BAR_HEIGHT),
    }
});

export default NavigationBar;