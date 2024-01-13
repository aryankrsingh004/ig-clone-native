
import { USERS } from "./users"
export const POSTS=[
    {
        imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/McLaren_P1.jpg/1200px-McLaren_P1.jpg',
        user : USERS[0].user,
        likes : 7869,
        caption : 'My new car',
        profile_picture: USERS[0].image,
        comments : [
            {
                user: 'Thor',
                comment : 'It looks like, from another planet'
            },
            {
                user: 'black widow',
                comment : 'I also have one, but mine is little smaller in size'
            },
            
        ]
    },
    {
        imageUrl : 'https://i.ytimg.com/vi/BwMm2LVgGJE/maxresdefault.jpg',
        user : USERS[1].user,
        likes : 2002,
        caption : 'My red Beauty',
        profile_picture: USERS[1].image,
        comments: [
            {
                user: 'hela',
                comment : 'Love the color'
            },
            {
                user: 'hulk',
                comment : 'Why its is not green ?'
            },
            
        ]
    },
    {
        imageUrl : 'https://i0.wp.com/ramenswag.com/wp-content/uploads/2019/11/4k-tesla-cybertruck-wallpaper.jpg',
        user : USERS[2].user,
        likes : 2002,
        caption : 'Your achievements inspire us all to strive for excellence. Keep that passion for learning alive, and you ll continue to shine in everything you do! Stay tuned for more exciting contests and opportunities. Your next triumph is just around the corner. 🏆Thank you for being part of this incredible journey. We cant wait to see you in future contests!',
        profile_picture: USERS[2].image,
        comments: [
        ]
    },
    
    
]