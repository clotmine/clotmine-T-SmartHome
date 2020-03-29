import AsyncStorage from '@react-native-community/async-storage';

// const DEVICE_KEY='device_key';

// export default class DeviceStorage {
//     getDevice(){
//         return new Promise((resolve,reject)=>{
//             AsyncStorage.getItem(DEVICE_KEY,(error,result)=>{
//                 if(error){

//                 }
//             })
//         })
//     }
// }

class DeviceStorage {

  /**
   * 保存
   * @param key
   * @param value
   */
  static save(key,value){
      return AsyncStorage.setItem(key,JSON.stringify(value));
  };

  /**
   * 获取
   * @param key
   */
  static getItem(key){
      return AsyncStorage.getItem(key).then((value)=>{
          const jsonValue = JSON.parse(value);
          return jsonValue;
      });
  };

  /**
   * 更新
   * @param key
   * @param value
   */
  static update(key,value){
      return DeviceStorage.get(key)
        .then((item)=>{
          value=typeof value ==='string' ? value:Object.assign({},item,value);
          return AsyncStorage.setItem(key,JSON.stringify(value));
        })
  };

  /**
   * 删除
   * @param key
   */
  static delete(key){
      return AsyncStorage.removeItem(key);
  }
}

export default DeviceStorage;