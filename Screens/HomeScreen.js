import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Header from '../components/home/Header.js'
import Stories from '../components/home/Stories.js'
import Post from '../components/home/Post.js'
import { POSTS } from '../data/posts.js'
import BottomTabs, { bottomTabsIcons } from '../components/home/BottomTabs.js'
import {db} from '../firebase.js'
import { useEffect } from 'react'
import { collectionGroup, onSnapshot, query, getDocs} from 'firebase/firestore'

const HomeScreen = ({navigation}) => {
  useEffect(() =>{

//     const querySnapshot = await db.collectionGroup('posts').get();
//     querySnapshot.forEach((doc) => {
//       console.log(doc.id, ' => ', doc.data());
// });

    // collectionGroup(db,'posts').onSnapshot(snapshot => {
    //   console.log(snapshot.docs.map(doc => doc.data()))
    // })
    (async () => {
      const museums = query(collectionGroup(db, 'posts'));
      const querySnapshot = await getDocs(museums);
      querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
      })}
    )();
  },[]);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories/>
      <ScrollView>
        {POSTS.map((post,index) => (
          <Post post={post} key={index} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabsIcons}/>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container :{
        backgroundColor :'black',
        flex : 1
    },
})

export default HomeScreen