import { View, Text, StyleSheet, Image} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import {auth} from '../../firebase'

const handleSignout = async() => {
  try{
    auth.signOut().then(() => console.log('Signed Out'))
  }catch(error) {
    console.log(error)
  }
}
  

const Header = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignout}>
        <Image style={styles.logo} source={require('../../assets/logo.png')}/>  
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.push('NewPostScreen')}>
          <Image 
            source={require('../../assets/add.png')} 
            style={styles.icon}
          />
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Image 
            source={require('../../assets/like.png')} 
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style ={styles.unreadBadgeText}>11</Text>
          </View>
          <Image 
            source={require('../../assets/direct_message.png')} 
            style={styles.icon}
          />
        </TouchableOpacity>

      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems : 'center',
    marginTop : 20,
    marginHorizontal: 20
  },
  logo : {
    width : 100,
    height : 50,
    resizeMode : 'contain'
  },
  iconsContainer : {
    flexDirection : 'row' 
  },
  icon : {
    width : 25,
    height : 25,
    marginLeft: 10,
    resizeMode : 'contain'
  },
  unreadBadge : {
    backgroundColor : '#FF3250',
    position : 'absolute',
    left : 20,
    bottom : 10,
    width : 20,
    height : 18,
    borderRadius : 25,
    alignItems : 'center',
    justifyContent : 'center',
    zIndex : 100
  },
  unreadBadgeText : {
    color : 'white',
    fontWeight : '600'
  }
})

export default Header