import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import {USERS} from '../../data/users.js'

const Stories = () => {
  return (
    <View style={{marginBottom : 13}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story, index) => (
          <View key={index} style = {{alignItems : 'center'}}>
              <Image source={{uri : story.image}}
               style={Styles.story} />
               <Text style= {{color : 'white'}}>{
               story.user.length > 11 ? story.user.slice(0,10).toLowerCase() + '...' : story.user.toLowerCase()}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const Styles = StyleSheet.create({
  story : {
    width : 80,
    height : 80,
    borderRadius : 50,
    marginLeft : 6,
    borderWidth : 3,
    borderColor : '#FF8501',
  },
})
export default Stories