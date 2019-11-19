import React, { Component } from 'react'
import { StyleSheet, Text, View,ScrollView,Image} from 'react-native'
import { withFirebaseHOC } from '../config/Firebase'
import {Card,Button} from 'react-native-elements'
class Main extends Component {
  handleSignout = async () => {
    try {
      await this.props.firebase.signOut()
      this.props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }
  componentDidMount(){
      
  }
  render() {
    
    return (
        <ScrollView>
         
         <View style={{marginTop:0,marginLeft:50}}>
          <Image
  resizeMode={'contain'}
    source={require('../assets/mv_logo.png')}

    style={{ width:270, height: 170}}
  />
  </View>
 
 <Button
onPress={()=>this.props.navigation.navigate('Home')}
title="Scan Qr Code"
containerStyle={{marginLeft:50,marginRight:50,
  marginTop:20
 // height:60,
  //flexDirection: 'row',
  //flex:1,
  //justifyContent: 'center',
  //alignItems: 'center',
  //marginBottom:40,
  //width:250,
  //borderWidth:8,
  //borderBottomLeftRadius:21,
  //borderBottomWidth:4,
  //borderRightColor:'white',
  //borderRadius:30,
  //borderBottomStartRadius:21,
  
  //borderColor:'white',
 // borderTopRightRadius:5,
//  marginTop:40
}}
  buttonStyle={{borderRadius:30,backgroundColor:'#23e6a5',
  height:60
}} 

 // onPress={() => {

   //         this.props.navigation.navigate('Login');
     //  }
    //}
/>

<Button
onPress={()=>this.props.navigation.navigate('Event')}
title="Event Details"
containerStyle={{marginLeft:50,marginRight:50,
  marginTop:50
 // height:60,
  //flexDirection: 'row',
  //flex:1,
  //justifyContent: 'center',
  //alignItems: 'center',
  //marginBottom:40,
  //width:250,
  //borderWidth:8,
  //borderBottomLeftRadius:21,
  //borderBottomWidth:4,
  //borderRightColor:'white',
  //borderRadius:30,
  //borderBottomStartRadius:21,
  
  //borderColor:'white',
 // borderTopRightRadius:5,
//  marginTop:40
}}
  buttonStyle={{borderRadius:30,backgroundColor:'orange',
  height:60
}} 

 // onPress={() => {

   //         this.props.navigation.navigate('Login');
     //  }
    //}
/>
<Button
onPress={this.handleSignout}
title="Log Out"
containerStyle={{marginLeft:50,marginRight:50,
  marginTop:40 
 // height:60,
  //flexDirection: 'row',
  //flex:1,
  //justifyContent: 'center',
  //alignItems: 'center',
  //marginBottom:40,
  //width:250,
  //borderWidth:8,
  //borderBottomLeftRadius:21,
  //borderBottomWidth:4,
  //borderRightColor:'white',
  //borderRadius:30,
  //borderBottomStartRadius:21,
  
  //borderColor:'white',
 // borderTopRightRadius:5,
//  marginTop:40
}}
  buttonStyle={{borderRadius:30,backgroundColor:'red',
  height:60
}} 

 // onPress={() => {

   //         this.props.navigation.navigate('Login');
     //  }
    //}
/>

</ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardStyle: {
    //  flex: 0.1,
    flex:1,
    justifyContent:'center',
    alignItems:'center', 
    
    backgroundColor:'#00ff80'
    },
    cardTitle:{
    //padding:10,
    fontSize:20,
    alignItems: "center",
    justifyContent: "center",
     color:'white'
    }

})

export default withFirebaseHOC(Main)
