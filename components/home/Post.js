import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { color } from 'react-native-elements/dist/helpers'

const PostFooterIcons = [
    {
        name : 'Like',
        imageUrl : 'https://raw.githubusercontent.com/1hbb/react-native-instagram-clone/master/src/res/images/like.png',
        linkedImageUrl : '',
    },
    {
        name : 'Comment',
        imageUrl : 'https://raw.githubusercontent.com/1hbb/react-native-instagram-clone/master/src/res/images/comment.png',
    },
    {
        name : 'Share',
        imageUrl : 'https://raw.githubusercontent.com/1hbb/react-native-instagram-clone/master/src/res/images/direct_message.png',
    },
    {
        name : 'Save',
        imageUrl : 'https://raw.githubusercontent.com/1hbb/react-native-instagram-clone/master/src/res/images/bookmark.png',
    }
]
const Post = ({post}) => {
  return (
    <View style={{marginBottom: 30}}>
      <Divider width={1} orientation= 'vertical'/>
      <PostHeader post={post}/>
      <PostImage post={post}/>
      <View style={{marginHorizontal :15 , marginTop : 10}}>
        <PostFooter/>
        <Likes post={post}/>
        <Caption post={post}/>
        <CommentsSection post={post}/>
        <Comments post={post}/>
      </View>
    </View>
  )
}
const PostHeader = ({post}) =>(
    <View style={{flexDirection : 'row', justifyContent: 'space-between', margin : 5, alignItems : 'center'}}>
        <View style={{flexDirection : 'row', alignItems : 'center'}}>
            <Image source={{uri :post.profile_picture}} style={styles.story}/>
            <Text style={{color : 'white', fontWeight: '700', marginLeft : 5}}>{post.user}</Text>
        </View>
        <Text style={{color : 'white', fontWeight : '900'}}>
            ...
        </Text>
    </View>
)

const PostImage =({post}) => (
    <View style ={{width : '100%',height : 450}}>
        <Image source={{uri: post.imageUrl}} style={{height : '100%', resizeMode : 'cover'}}/>
    </View>
)



const PostFooter = () => (
    <View style ={{flexDirection : 'row',justifyContent : 'space-between'}}>
        <View style ={styles.leftFooterIconsContainer}>
            <Icon imgStyle={styles.footerIcons} imgUrl = {PostFooterIcons[0].imageUrl} />
            <Icon imgStyle={styles.footerIcons} imgUrl = {PostFooterIcons[1].imageUrl} />
            <Icon imgStyle={styles.footerIcons} imgUrl = {PostFooterIcons[2].imageUrl} />
        </View>
        <View>
            <Icon imgStyle={styles.footerIcons} imgUrl = {PostFooterIcons[3].imageUrl} />
        </View>
    </View>
)

const Icon = ({imgStyle, imgUrl}) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={{uri : imgUrl}} />
    </TouchableOpacity>
)
// how can import an image not from web

const Likes = ({post}) => (
    <View style={{flexDirection : 'row' , marginTop: 4}}>
        <Text style= {{color : 'white', fontWeight: '600'}}>{post.likes.toLocaleString('en')} Likes</Text>
    </View>
)
const Caption = ({post}) => (
    <Text style={{color : 'white'}}>
        <Text style={{fontWeight : '600'}}>{post.user}</Text>
        <Text> {post.caption}</Text>
    </Text>
)
const CommentsSection = ({post}) => (
    <View style ={{marginTop : 5}}>
        {!!post.comments.length && (
        <Text style={{color : 'gray'}}>
            View {post.comments.length > 1 ? 'all' : ''} {post.comments.length} {post.comments.length > 1 ? 'comments' : 'comment'}
        </Text>
        )}
    </View>
)
const Comments = ({post}) => (
    <View>
        {post.comments.map((comment, index) => (
            <View key={index} style={{flexDirection : 'row', marginTop : 5}}>
                <Text style = {{color : 'white'}}>
                    <Text style={{fontWeight : '600'}}>{comment.user}</Text>{' '}
                    {comment.comment}
                </Text>
            </View>
        ))}
    </View>
)

const styles = StyleSheet.create({
    story : {
      width : 35,
      height : 35,
      borderRadius : 50,
      marginLeft : 6,
      borderWidth : 1.6,
      borderColor : '#FF8501'
    },

    footerIcons : {
        width : 33,
        height : 33,
    },
    leftFooterIconsContainer : {
        flexDirection: 'row',
        width: '32%',
        justifyContent : 'space-between'
    },
  })

export default Post 