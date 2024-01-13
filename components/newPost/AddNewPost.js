import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import FormikPostUploader from './FormikPostUploader'

const AddNewPost = ({navigation}) => (
    <View style={styles.container}>
        <Header navigation={navigation}/>
        <FormikPostUploader navigation={navigation}/>
    </View>
  )

const Header = ({navigation}) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/backButton.png')} style={{width : 20, height : 30}}/>            
        </TouchableOpacity>
        <Text style={styles.headerText}>New Post</Text>
        <Text></Text>
    </View>
)
const styles = StyleSheet.create({
    container : {
        marginHorizontal : 10,
    },
    headerContainer :{
        marginTop : 30,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    headerText : {
        color : 'white',
        fontWeight : '700',
        fontSize : 20,
        marginRight : 25
    }
})

export default AddNewPost