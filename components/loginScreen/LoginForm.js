import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
// import { view } from 'react-native'
import React, {useState} from 'react'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator' 

import {auth} from '../../firebase.js'
// console.log(auth);
// import firebase from '../../firebase'
import { confirmPasswordReset, signInWithEmailAndPassword } from 'firebase/auth'

const LoginForm = ({navigation}) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password : Yup.string()
    .required()
    .min(6,'Your password must contain at least 6 charactors')
  })

  const onLogin = async(email, password) => {
    try {
      await signInWithEmailAndPassword(auth,email,password);
      console.log('Firebase Login Successful', email ,password);
      Alert.alert('logined')
    }
    catch(error){
      Alert.alert(
        'My lord..\n,',
        error.message + '\n\nWhat would you like to do next',
        [
          {
            text : 'Ok',
            onPress : () => console.log('Ok'),
            style : 'cancel',
          },
          {
            text: 'Sign Up',
            onPress : () => navigation.push('SignupScreen')
          }
        ]
         
      )
    }
  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
        <>
          <View style={[styles.inputField,
                          {borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#CCC' : 'red'}
                ]}
          >
              <TextInput
                  placeholderTextColor='#444'
                  placeholder='Phone Number User or Email'
                  autoCapitalize='none'
                  keyboardType='email-address'
                  textContentType='emailAddress'
                  autoFocus = {true}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
              />
          </View>

        <View style={[styles.inputField,
                    {borderColor: 
                        1 > values.password.length || values.password.length >= 6
                        ? '#CCC'
                        : 'red',
              }]}
        >
              <TextInput
                  placeholderTextColor='#444'
                  placeholder='Password'
                  autoCapitalize='none'
                  secureTextEntry= {true}
                  autoCorrect={false}
                  textContentType='password'
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
              />
        </View>
        <View style={{alignItems : 'flex-end', marginBottom : 30 }}>
          <Text style={{color : '#6BB0F5'}}>Forgot Password</Text>
        </View>
        <Pressable titleSize={20} style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid}>
          <Text style={{fontWeight : '600', color :'white', fontSize: 20}}>Log in</Text>
        </Pressable>
        <View style={styles.signupContainer}> 
          <Text>Don't Have an Account? </Text>
          <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
            <Text style={{color : '#6BB0F5'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </>
      )}
      </Formik>
    </View>
  )
}

const styles=StyleSheet.create({
    inputField : {
        borderRadius: 4,
        padding : 6,
        backgroundColor : '#FAFAFA',
        marginBottom : 10,
        borderWidth : 1,
    },
    wrapper :{
        marginTop : 80,
        marginHorizontal : 10
    },
    button : (isValid) => ({
      backgroundColor : isValid ? '#0096F6' : '#9ACAF7',
      alignItems : 'center',
      justifyContent : 'center',
      minHeight : 42,
      borderRadius : 4
    }),
    signupContainer : {
      flexDirection : 'row',
      width : '100%',
      justifyContent : 'center',
      marginTop : 50
    }
})

export default LoginForm