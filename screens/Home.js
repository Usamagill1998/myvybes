 import { withFirebaseHOC } from '../config/Firebase'
 import * as React from 'react';
 import { Text, View, StyleSheet,TextInput,ActivityIndicator,Alert,AsyncStorage} from 'react-native';
 import Constants from 'expo-constants';
 import * as Permissions from 'expo-permissions';
 import * as firebase from 'firebase'
 import { BarCodeScanner } from 'expo-barcode-scanner';
import firebaseConfig from '../config/Firebase/firebaseConfig'
import { NavigationActions } from 'react-navigation';
import {Modal} from 'react-native-modalbox'
import AwesomeAlert from 'react-native-awesome-alerts';
import {Card,Button} from 'react-native-elements'

  class Home extends React.Component {
    
    state = {
    hasCameraPermission: null,
    scanned: false,
    data:'',
    isLoading:true,  
    showAlert:false,
    uid:'',
    onscanning:false
    //isBarcodeScannerEnabled: true

  }
  
  constructor(props) {
    super(props)
    
    this.handleBarCodeScanned = this.handleBarCodeScanned.bind(this)
    
}

 async  componentDidMount() {
      let uid = await AsyncStorage.getItem('uid');
   this.setState({uid:uid})
    this.getPermissionsAsync();
  console.log(uid)
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  handleSignout = async () => {
    try {
      await this.props.firebase.signOut()
      this.props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error) 
    }
  }


  handleBarCodeScanned = ({ type, data }) => {
    console.log(data)
  //  var uid=AsyncStorage.getItem('uid');
var uid=this.state.uid;
var dataaa=String(data).trim().replace("//","")

var scandata=dataaa.replace(/("|')/g, "")
//var scandata=dataaa.slice(1,-1)
//var newdata=JSON.parse(dataaa)
//var dataaaa=parseInt(dataaa)
 //var aaa =dataaa.replace("''",)  
 //console.log(aaa)
//console.log(newdata)
console.log(scandata)
//console.log(dataaaa)  

console.log(dataaa)    
console.log(uid);
const {navigation}=this.props
    this.setState({ scanned: true ,onscanning:true});
        

    var docRef = firebase.firestore().collection('tickets')
    .doc(`${scandata}`);
    //.doc('s5DkmrQbOWW4RTSof9xL');

    docRef.get().then((doc)=> {
      
      if(doc.exists &&doc.data().scanned===true&&doc.data().organizerUid===uid) {
         
        //   console.log("Document data:", doc.data());
         Alert.alert(
          'Failed',
          'Ticket has already Scanned',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      
      //console.log('ok')
      
             
          
      
                    
           // NavigationActions.back({})
           // this.props.navigation.navigate('Detail')
           
            //alert('ok')
            
this.setState({onscanning:false})
          //  return docRef
        }
      
       


         

        else if(doc.exists&&doc.data().organizerUid===uid)
{
        Alert.alert(
          'Congrats',
          'Ticket Scanned Successfully',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
        
      

        // var dataa =doc.data().eventId
     //console.log(dataa)
     { 
      // alert('scanned')

      firebase.firestore().collection('tickets').doc(`${scandata}`).update({
          scanned:true,
        //  total_scan:firebase.firestore.FieldValue.increment(1)
        
      })
      .then(()=> {
 
        var dataa =doc.data().eventId
    console.log(dataa)
    AsyncStorage.setItem('eventid', dataa)
    console.log(dataa)
         firebase.firestore().collection('events').doc(`${dataa}`).update({
           total_scanned:firebase.firestore.FieldValue.increment(1)
        
     }).then(function() {
        //if(docc.exists) {

       // AsyncStorage.setItem('eventid', dataa)

//console.log(dataa)
  //   navigation.navigate('')      
    


      

          })
        
    
        //  console.log("Ticket Successfully Scaned");
              
     })
    

    }
    this.setState({onscanning:false})
    }   
    else if(doc.exists&&doc.data().organizerUid!==uid)
    {
      alert('you are not authorized user to scan the ticket')
this.setState({onscanning:false})
    }


        else {
          this.setState({onscanning:false})
            // doc.data() will be undefined in this case
        alert('Invalid Ticket')
            console.log('matched');
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    })}

//   firebase.initializeApp(firebaseConfig)
//.doc(`users/${uid}`)
   // firebase.firestore().
    //doc(`event/${name}`);
   // collection('tickets')
  //   doc('tickets/ticketId')
  //   .get()
  //   .then(snapshot => {
  //     if (snapshot.data()===data) {
  //      // let userData = snapshot.val();
  //      // console.log(userData);
  //       alert('username is taken');
  //       return userData;
  //     } else {
  //       console.log('not found');
  //      alert('not found')
  //     }
  // });

    


   // this.setState({ scanned: true,data:data });



    //
    //alert(`${this.state.data}`)
//    alert(`${data}`);
    
  
  
  render() {
    const { hasCameraPermission, scanned,showAlert,onscanning} = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (

               

   
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
      
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

{onscanning&&(
<ActivityIndicator color='orange' 
size='large'
/>

)}

        {scanned && (
         
<Button
          title={'Tap to Scan Again'}
          onPress={() => this.setState({ scanned: false })}


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
  buttonStyle={{borderRadius:30,backgroundColor:'blue',
  height:60
}} 

 // onPress={() => {

   //         this.props.navigation.navigate('Login');
     //  }
    //}
/>
         
         
          
        )}
      </View>
    );
  }

}






export default withFirebaseHOC(Home)
