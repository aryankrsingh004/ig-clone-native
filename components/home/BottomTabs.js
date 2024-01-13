import { View, Text, StyleSheet, Image, } from 'react-native'
import React, {useState} from 'react'
import { Divider } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'

export const bottomTabsIcons = [
    {
        name : 'Home',
        active : require('../../assets/home.png'),
        inactive : require('../../assets/home_selected.png'),
    },
        {
        name : 'Search',
        active : require('../../assets/search.png'),
        inactive : require('../../assets/search_selected.png'),
    },
        {
        name : 'Reels',
        active : require('../../assets/photo_camera.png'),
        inactive : require('../../assets/video_camera.png'),
    },
        {
        name : 'Shop',
        active : require('../../assets/gridIcon.png'),
        inactive : require('../../assets/list3.png'),
    },
        {
        name : 'Profile',
        active : require('../../assets/users.jpg'),
        inactive : require('../../assets/users.jpg'),
    }
]

const BottomTabs = ({icons}) => {
    const [activeTab, setactiveTab] = useState('Home')

    const Icon = ({icon})  => (
        <TouchableOpacity onPress={() => setactiveTab(icon.name)}>
            <Image source={activeTab == icon.name ? icon.inactive : icon.active} 
                   style={[styles.icon,
                           icon.name == 'Profile' ? styles.profilePic() : null,
                           activeTab == 'Profile' && icon.name == activeTab ? styles.profilePic(activeTab) : null]} />
        </TouchableOpacity>
    )
  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation='vertical' />
      <View style={styles.container}>
        {icons.map((icon, index) =>(
          <Icon key={index} icon={icon}/>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    wrapper : {
      position : 'absolute',
      width : '100%',
      bottom : '0%',
      zIndex : 999,
      backgroundColor : '#000'
    },
    icon : {
        width : 30,
        height : 30
    },
    container : {
        flexDirection : 'row',
        justifyContent : 'space-around',
        height : 50,
        paddingTop : 10
    },
    profilePic :(activeTab = '') => ({
      borderRadius : 50,
      borderWidth : activeTab == 'Profile' ? 2 : 0,
      borderColor : 'white'
    })
})

export default BottomTabs