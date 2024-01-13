import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
// import { view } from 'react-native'
import React, {useState} from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator' 
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth, db} from '../../firebase'
import { setDoc, set, addDoc, collection,doc} from 'firebase/firestore'


const SignupForm = ({navigation}) => {
  const SignupFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    username : Yup.string().required().min(2,'A username is required atleast 2 charactors'),
    password : Yup.string()
    .required()
    .min(6,'Your password must contain at least 6 charactors')
  })

  const getRandomProfilePic = async () => {
    const response = await fetch('https://randomuser.me/api')
    const data = await response.json()
    return data.results[0].picture.large
  }

  const onSignup = async(email,password,username) => {
    try{
      const authUser = await createUserWithEmailAndPassword(auth, email, password)
      console.log('Signup successful ', email,password)

      await setDoc(doc(db,'users',authUser.user.email),{
        owner_uid : authUser.user.uid,
          username : username,
          email : authUser.user.email,
          profile_picture : await getRandomProfilePic(),
      })

      // const res = await db.collection('users').doc('LA').set({
      //     owner_uid : authUser.user.uid,
      //     username : username,
      //     email : authUser.user.email,
      //     profile_picture : await getRandomProfilePic(),
      //   });

      // await setDoc((db, 'users'), {
      //   owner_uid : authUser.user.uid,
      //   username : username,
      //   email : authUser.user.email,
      //   profile_picture : await getRandomProfilePic(),
      // })

      // db.collection('users').add({
      //   owner_uid : authUser.user.uid,
      //   username : username,
      //   email : authUser.user.email,
      //   profile_picture : await getRandomProfilePic(),
      // })

    }catch(error){
    Alert.alert('My lord',
    error.message
    )
    }
  }

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => {
          onSignup(values.email, values.password, values.username)
        }}
        validationSchema={SignupFormSchema}
        validateOnMount={true}
      >
        {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
        <>
            <View style={[styles.inputField,
                    {borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#CCC' : 'red'}
                    ]}>
                <TextInput
                    placeholderTextColor='#444'
                    placeholder='Email'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    autoFocus = {true}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                />
            </View>

            <View style={[styles.inputField,{borderColor : '#CCC'}]}>
                <TextInput
                    placeholderTextColor='#444'
                    placeholder='Username'
                    autoCapitalize='none'
                    textContentType='username'
                    autoFocus = {true}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                />
            </View>

            <View style={[styles.inputField,
                    {borderColor: 
                        1 > values.password.length || values.password.length >= 6
                        ? '#CCC'
                        : 'red',
                    }]}>
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
            <Pressable titleSize={20} style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid}>
                <Text style={{fontWeight : '600', color :'white', fontSize: 20}}>Sign Up</Text>
            </Pressable>
            <View style={styles.loginContainer}> 
                <Text>Already have an Account? </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{color : '#6BB0F5'}}>Log In</Text>
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
      marginTop : 50,
      justifyContent : 'center',
      minHeight : 42,
      borderRadius : 4
    }),
    loginContainer : {
      flexDirection : 'row',
      width : '100%',
      justifyContent : 'center',
      marginTop : 50
    }
})

  export default SignupForm