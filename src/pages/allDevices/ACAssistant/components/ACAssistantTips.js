import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';
import px2dp from '../../../../rule/px2dp';

class ACAssistantTips extends Component{
  render(){
    const deviceState=this.props.deviceState;
    return (
      <View style={styles.tipsWrapper}>
        {
          deviceState.modeTips.map((item)=>{
            switch(item.id){
              case 'light' :
                return <Image style={styles.tipIcon} key={item.id} source={require('../../../../statics/icons/tipic_light.png')}/>;
              case 'windLevelAuto' :
                return <Image style={styles.tipIcon} key={item.id} source={require('../../../../statics/icons/tipic_windLevelAuto.png')}/>;
              case 'windLevel1' :
                return <Image style={styles.tipIcon} key={item.id} source={require('../../../../statics/icons/tipic_windLevel1.png')}/>;
              case 'windLevel2' :
                return <Image style={styles.tipIcon} key={item.id} source={require('../../../../statics/icons/tipic_windLevel2.png')}/>;
              case 'windLevel3' :
                return <Image style={styles.tipIcon} key={item.id} source={require('../../../../statics/icons/tipic_windLevel3.png')}/>;
              case 'horizontalWind' :
                return <Image style={styles.tipIcon} key={item.id} source={require('../../../../statics/icons/tipic_horizontalWind.png')}/>;
              case 'verticalWind' :
                return <Image style={styles.tipIcon} key={item.id} source={require('../../../../statics/icons/tipic_verticalWind.png')}/>;
              case 'airFilter' :
                return <Image style={styles.tipIcon} key={item.id} source={require('../../../../statics/icons/tipic_airFilter.png')}/>;
              case 'superPower' :
                return <Image style={styles.tipIcon} key={item.id} source={require('../../../../statics/icons/tipic_superPower.png')}/>;
              case 'sleep' :
                return <Image style={styles.tipIcon} key={item.id} source={require('../../../../statics/icons/tipic_sleep.png')}/>;
              case 'auxiliaryHeat' :
                return <Image style={styles.tipIcon} key={item.id} source={require('../../../../statics/icons/tipic_auxiliaryHeat.png')}/>;
              case 'auxiliaryHeat' :
                return <Image style={styles.tipIcon} key={item.id} source={require('../../../../statics/icons/tipic_auxiliaryHeat.png')}/>;
            };
          })
        }
      </View>
    );
  };
};

const styles=StyleSheet.create({
  tipsWrapper:{marginTop:px2dp(20),width:'auto',height:px2dp(60),paddingHorizontal:px2dp(20),backgroundColor:'rgba(0,0,0,.03)',borderRadius:px2dp(30),flexDirection:'row',alignItems:'center',justifyContent:'center'},
  tipIcon:{height:px2dp(50),width:px2dp(50),marginHorizontal:px2dp(5)}
});



export default ACAssistantTips;