import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { TextInput } from 'react-native'
import { Button, Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import {db,auth} from '../../firebase'
import { setDoc, set, addDoc, collection,doc, collectionGroup, where, limit, serverTimestamp, FieldValue} from 'firebase/firestore'

const PLACEHOLDER_IMG = 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'

const uploadPostSchema = Yup.object().shape({
    imageUrl : Yup.string().url().required('A Url is required'),
    caption : Yup.string().max(2200, 'Caption has reached caption limit')
})

const FormikPostUploader = ({navigation}) => {
    const [thumbnailUrl, setthumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLoggedUser, setCurrentLoggedUser] = useState(null)

const getUsername = async() => { 
    const user = auth.currentUser
    const unsubscribe =
        collection(db,'users')
        .where('owner_uid', '==', user.uid)
        .limit(1)
    const museums = query(collectionGroup(db, 'posts').where('owner_uid', '==', user.uid).limit(1));
    const querySnapshot = await getDocs(museums);
    querySnapshot.forEach((doc) => {
        setCurrentLoggedUser({
            username : doc.data().username,
            profile_picture : doc.data().profile_picture
        })
    })
    return unsubscribe
}

useEffect(() => {
    getUsername()
},[]);

const uploadPostToFirebase = async ({imageUrl, caption}) => {
    const unsubscribe = collection(db,'users') 
        await setDoc(doc(db,'users','posts'),({
            imageUrl : imageUrl,
            user : currentLoggedUser.email,
            profile_picture : currentLoggedUser.profile_picture,
            owner_uid : auth.currentUser.uid,
            caption : caption,
            createdAt : firestore.FieldValue.serverTimestamp(),
            likes : 0,
            liked_by_users : [],
            comments : [],
        }))
        
        .then(() => navigation.goBack())
        return unsubscribe
}

  return (
    <Formik
    initialValues={{caption : '', imageUrl: ''}}
    onSubmit={(values) => {
        uploadPostToFirebase(values.imageUrl, values.caption)
    }}
    validationSchema={uploadPostSchema}
    validateOnMount={true}
    >
        {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => 
            <>
                <View style={{margin: 20, flexDirection: 'row', alignItems:'flex-start'}}>
                    <Image 
                        source={{uri : validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG}}
                        style={{width : 100, height: 100}}
                    />
                    <TextInput 
                        style={{color: 'white', fontSize: 20, marginLeft : 12}}
                        placeholder='Write a caption...'
                        placeholderTextColor='gray' 
                        multiline={true}
                        onChangeText={handleChange('caption')}
                        onBlur={handleBlur('caption')}
                        value={values.caption}
                    />
                </View>
                <Divider width={0.2} orientation='vertical' />
                <TextInput 
                        onChange={e => setthumbnailUrl(e.nativeEvent.text)}
                        style={{color: 'white', fontSize: 18}}
                        placeholder='Enter Image URL '
                        placeholderTextColor='gray'
                        onChangeText={handleChange('imageUrl')}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl}
                />
                {errors.imageUrl && (
                    <Text style={{fontSize: 10, color : 'red' }}>
                        {errors.imageUrl}
                    </Text>
                )}
                <Button onPress={handleSubmit} title={'Share'} disabled={!isValid}/>
            </>
        }
    </Formik>
  )
}

export default FormikPostUploader