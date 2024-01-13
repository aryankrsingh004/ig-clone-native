import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import SignupForm from '../components/signupScreen/SignupForm'

const INSTAGRAM_LOGO = 'https://img.freepik.com/premium-vector/modern-badge-logo-instagram-icon_578229-124.jpg'

const SignupScreen = ({navigation}) => (
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={{uri : INSTAGRAM_LOGO}} style={{width : 100, height : 100}}/>
          </View>
          <SignupForm navigation={navigation}/>
        </View>
    )

    const styles = StyleSheet.create({
        container : {
            flex : 1,
            backgroundColor : 'white',
            paddingHorizontal : '12'
        },  
        logoContainer : {
            alignItems : 'center',
            marginTop : 80,
        }
    })

export default SignupScreen