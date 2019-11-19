import React, { Component, Fragment } from 'react'
import { StyleSheet, SafeAreaView, View, TouchableOpacity,ActivityIndicator ,Image,AsyncStorage} from 'react-native'
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { HideWithKeyboard } from 'react-native-hide-with-keyboard'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import ErrorMessage from '../components/ErrorMessage'
import AppLogo from '../components/AppLogo'
import { withFirebaseHOC } from '../config/Firebase'
import * as firebase from 'firebase'


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters ')
})

class Login extends Component {
  state = {
    passwordVisibility: true,
    rightIcon: 'ios-eye'
  }

  handlePasswordVisibility = () => {
    const {navigate} = this.props.navigation
    this.setState(prevState => ({
      rightIcon: prevState.rightIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }))
  }
  handleSignout = async () => {
    try {
      
      await this.props.firebase.signOut()
      this.props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error) 
    }
  }
  handleOnLogin = async (values, actions) => {
    
    const { email, password } = values
    const {navigate} = this.props.navigation
    
    
    try {
      const response = await this.props.firebase.loginWithEmail(email, password)
    var uid=response.user.uid
          console.log(uid)
          
          AsyncStorage.setItem('uid',uid)
     if (response) {
        <ActivityIndicator />
         var query =firebase.firestore().collection('users')
         .doc(`${response.user.email}`)
 
query.get().then(function(doc) {

           if (doc.exists && doc.data().account_type==='organizer'||doc.data().account_type==='admin')
           
          
           {
             
            
               console.log("Document data:", doc.data().account_type);
               //alert('matched');
             //  return  
             ;    
               }
               else{

                  firebase.auth().signOut()
            
                 navigate('Auth')
                 alert('Only Organizer Have Access to scan the ticket')

               }
               return;
               
              }


              )
              
              this.props.navigation.navigate('Main')
    
          }
        }   
  catch (error) {
      actions.setFieldError('general', error.message)
    } finally {
      actions.setSubmitting(false)
    } 
  }

  render() {
    const { passwordVisibility, rightIcon } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <HideWithKeyboard style={styles.logoContainer}>
          <AppLogo />
        </HideWithKeyboard>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => {
            this.handleOnLogin(values, actions)
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting
          }) => (
            <Fragment>
              <FormInput
                name='email'
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder='Enter email'
                autoCapitalize='none'
                iconName='ios-mail'
                iconColor='#2C384A'
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name='password'
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder='Enter password'
                secureTextEntry={passwordVisibility}
                iconName='ios-lock'
                iconColor='#2C384A'
                onBlur={handleBlur('password')}
                rightIcon={
                  <TouchableOpacity onPress={this.handlePasswordVisibility}>
                    <Ionicons name={rightIcon} size={28} color='grey' />
                  </TouchableOpacity>
                }
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType='outline'
                  onPress={handleSubmit}
                  title='LOGIN'
                  buttonColor='#039BE5'
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>
     <View style={{marginTop:160,marginLeft:8,justifyContent:'flex-end'}}>
        <Image
  resizeMode={'contain'}
  
    source={require('../assets/parent_company_logo.png')}

    style={{ width: 120, height: 50}}
  />
  </View>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: 'center'
  },
  buttonContainer: {
    margin: 25
  }
})

export default withFirebaseHOC(Login)
