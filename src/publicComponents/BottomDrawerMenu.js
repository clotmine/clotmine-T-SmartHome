import React,{Component} from 'react';
import Animated from 'react-native-reanimated';
import { Modal, View, StyleSheet } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import {PropTypes} from 'prop-types';

class BottomDrawerMenu extends Component{
  constructor(props){
    super(props);
    this.translateY=150;
    this.state={
      visible:false,
      sheetAnim:new Animated.Value(this.translateY)
    }
    this.cancel=cancel.bind(this);
  };

  static propTypes={
    title:PropTypes.string, //标题
    content:PropTypes.object, //内容
    show:PropTypes.func, //显示
    hide:PropTypes.func //隐藏
  };

  _renderTitle(){
    const {title,titleStyle}=this.props;
    if(!title){
      return null;
    };
    if(React.isValidElement){
      return(
        <View style={styles.title}>{title}</View>
      );
    };
    return(
      <Text style={[styles.titleText,titleStyle]}>{title}</Text>
    );
  };
  _renderContainer(){
    const {connect}=this.props;
    return(
      <View style={styles.container}>
        {content}
      </View>
    );
  };
  cancel(){
    this.hide();
  };
  show(){
    this.setState({visible:true});
    Animated.timing(this.state.sheetAnim,{
      toValue:0,
      duration:250
    }).start();
  };

  render(){
    const {visible,sheetAnim}=this.state;
    return(
      <Modal
        visible={visible}
        transparent={true}
        animationType='none'
        onRequestClose={this.cancel}
      >
        <View style={styles.wrapper}>
          <TouchableOpacity style={styles.overlay} onPress={this.cancel}></TouchableOpacity>
          <Animated.View
            style={[styles.bd, {height: this.translateY, transform: [{translateY: sheetAnim}]}]}
          >
            {this._renderTitle()}
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {this._renderContainer()}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    );
  }
};

const styles=StyleSheet.create({
  title:{fontSize:30}
})

export default BottomDrawerMenu;