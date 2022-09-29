import React, { useState } from 'react';
import "./post.css"
import { MoreVert } from '@mui/icons-material';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from "react-router-dom"
import { useEffect } from 'react';

const Post = ({ post }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({})
    const { desc, img, likes, comment, _id, userId } = post;
    const [like, setLike] = useState(likes.length);
    const [userLike, setUserLike] = useState(false)
    useEffect(() => {
        setUserLike(likes.includes(user._id))
    }, [user._id, likes])
    const handleLike = async () => {
        try {
            await axios.put("/posts/" + _id + "/like", { userId: user._id })
        } catch (err) {
            console.log(err);
        }
        setLike(userLike ? like - 1 : like + 1)
        setUserLike(!userLike)
    }
    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get("/user?userId=" + userId)
            setUser(res.data)
        }
        getUser()
    }, [userId])
    const { username, profilePicture } = user;
    return (
        <div className='post'>
            <div className="postContainer">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={'/profile/' + username}>
                            <img src={profilePicture ? PF + profilePicture : PF + "person/noAvatar.png"} alt="" className="posterImg" />
                        </Link>
                        <span className="postUsername">{username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert className='postOptonIcon' />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postDesc">{desc}</span>
                    <img src={PF + img} alt="" className="postImg" />
                </div>
                <div className="postBotton">
                    <div className="postBottomLeft">
                        <img src={PF + "/like.png"} alt="" className="like" onClick={handleLike} />
                        <img src={PF + "/heart.png"} alt="" className="heart" onClick={handleLike} />
                        <span className="likeCount">{like} poeple like it </span>
                    </div>
                    <div className="postBottomRight">
                        <span className="commentCount">{comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;