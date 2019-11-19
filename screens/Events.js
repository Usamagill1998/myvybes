import React, { Component } from 'react'
import { StyleSheet, Text, View,ScrollView,AsyncStorage,ActivityIndicator,Image} from 'react-native'
import firebase from 'firebase'
import { withFirebaseHOC } from '../config/Firebase'
import {Card,Button} from 'react-native-elements'
class Events extends Component {
    state={

        data:'',
        nodata:true,
    }
  handleSignout = async () => {
    try {
      await this.props.firebase.signOut()
      this.props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }
  
  async componentDidMount(){
    let token = await AsyncStorage.getItem('eventid');
    console.log(token);
    var docRef =firebase.firestore().collection("events").doc(`${token}`);

docRef.get()

.then((doc)=>
{ 

    

    if (doc.exists)
    
 {
  this.setState({data:doc.data(),nodata:false})  
        console.log("Document data:", doc.data().total_scanned);
    
    } 
    
    else {
      this.setState({nodata:true})
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}
).catch(function(error) {
    console.log("Error getting document:", error);
});}

render() {
   // async componentDidMount(){
       console.log(this.state.data)
    
    return (
    this.state.nodata===true?

    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

<ActivityIndicator />
{/* <Text>Scan the ticket to see the details </Text> */}

          </View>

:

<View style={{flex:1,marginTop:30}}> 

           
          <Text style={{marginLeft:15,fontSize:20}}> Event Name</Text>
         
       
               <Text style={{marginLeft:15,fontSize:30}}>{this.state.data.name}</Text> 
         
 


      <View style={{flex:0.2}}>
        <View style={{flex:1,flexDirection:'row'}}>

        <View style={{flex:0.6}}>


      <Card containerStyle={{backgroundColor:'orange'}} style={styles.cardStyle}>
          <Text style={styles.cardTitle}>Availible Ticket</Text>
         
      </Card>
      </View>
      <View style={{flex:0.4}}>
       
       
      <Card containerStyle={{backgroundColor:'orange'}} style={styles.cardStyle}>
          <Text style={styles.cardTitle}>{this.state.data.totalTickets}</Text>
         
      </Card>


</View>

      </View>
      </View>
   
      <View style={{flex:0.2}}>
        <View style={{flex:1,flexDirection:'row'}}>

        <View style={{flex:0.6}}>


      <Card 
      containerStyle={{backgroundColor:'purple'}}
      style={styles.cardStyle}>
          <Text style={styles.cardTitle}>Total Scanned</Text>
         
      </Card>
      </View>
      <View style={{flex:0.4}}>
       
       
      <Card
      containerStyle={{backgroundColor:'purple'}}
      style={styles.cardStyle}>
          <Text style={styles.cardTitle}>{this.state.data.total_scanned}</Text>
         
      </Card>


</View>

      </View>
      </View>
      
</View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: 50,
        },
        cardStyle: {
        //  flex: 0.1,
       // backgroundColor:'grey'
        },
        cardTitle:{
        //padding:10,
        fontSize:22,
        color:'white',
        alignItems: "center",
        justifyContent: "center",
        paddingTop:14

        }
})

export default withFirebaseHOC(Events)
