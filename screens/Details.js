import { withFirebaseHOC } from '../config/Firebase'
import * as React from 'react';
import { Text, View, StyleSheet, Button,TextInput } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase'
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebaseConfig from '../config/Firebase/firebaseConfig'


export default class Detail extends React.Component {


    
  render() {

    return(


        <View>
            Assalam O Alikum
        </View>
    )
  }
 }