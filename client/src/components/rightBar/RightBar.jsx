import React, { useEffect, useState } from 'react';
import "./rightbar.css"
import { Users } from "../../dummyData";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Add, Remove } from '@mui/icons-material';
import { useContext } from 'react';
import { authContext } from '../../context/AuthContext';

const RightBar = ({ profile, username, user }) => {
    const PK = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(authContext)
    const HomeRightBar = () => {

        return (
            <>
                <div className="birthday">
                    <img src={PK + "gift.png"} alt="" className="birthDayImg" />
                    <span className="birthdayText"><b>Pola Foster</b> and <b>3 other freinds</b> have a birthday today</span>
                </div>
                <img src={PK + "ad.png"} alt="" className="rightbarAd" />
                <div className="onlineFrendWrapper">
                    <h3>Online freinds</h3>
                    <ul className="userOnlineList">
                        {Users.map(user => {
                            return <li className="userOnlineItem" key={user.id}>
                                <p className="RghtbarimgWrapper">
                                    <img src={PK + user.profilePicture} alt="" className="rightImg" />
                                    <span className="onlineSign"></span>
                                </p>
                                <p className="onlineUsername">{user.username}</p>
                            </li>
                        })}
                    </ul>
                </div>
            </>
        )
    }
    const ProfileRightBar = () => {
        const [freinds, setFreinds] = useState([])
        const PF = process.env.REACT_APP_PUBLIC_FOLDER;
        const [followed, setFollowed] = useState(false)
        useEffect(() => {
            const getFreinds = async () => {
                const freind = await axios.get("/user/friends/" + user._id)
                setFreinds(freind.data)
            }
            getFreinds()
        }, [user._id])
        useEffect(() => {
            setFollowed(currentUser.followings.includes(user._id))
        },[user._id])
        const handleClick = async () => {
            if (followed) {
                await axios.put("/user/" + user._id + "/unfollow", { userId: currentUser._id })
            }
            else {
                await axios.put("/user/" + user._id + "/follow", { userId: currentUser._id })
            }
            setFollowed(!followed)
        }
        return (
            <>
                {currentUser.username !== username && <button className='followBtn' onClick={handleClick}>
                    {followed ? "Unfollow" : "Follow"}
                    {followed ? <Remove /> : <Add />}
                </button>}
                <h3 className="rightbarTitle">User information</h3>
                <div className="rightbarUserInfo">
                    <div className="rightInfoItem">
                        <span className="infoName">City:</span>
                        <span className='infoData'>{user.city}</span>
                    </div>
                    <div className="rightInfoItem">
                        <span className="infoName">From:</span>
                        <span className='infoData'>{user.from}</span>
                    </div>
                    <div className="rightInfoItem">
                        <span className='infoName'>RelationShip: </span>
                        <span className="infoData">{user.relationShip === 1 ? "Single" : user.relationShip === 2 ? "Maried" : "-"}</span>
                    </div>
                </div>
                <h3 className="rightbarTitle followingTitle">User freinds</h3>
                <div className="rightbarFollowings">
                    {
                        freinds.map(freind => {
                            return (
                                <Link key={freind._id} to={"/profile/" + freind.username}>
                                    <p className="rightbarFollowing" >
                                        <img src={freind.profilePicture ? PF + freind.profilePicture : PF + "person/noAvatar.png"} alt="" className="followingImg" />
                                        <span className="followingName">{freind.username}</span>
                                    </p>
                                </Link>
                            )
                        })
                    }

                </div>
            </>
        )
    }
    return (
        <div className='rightBar'>
            <div className="rightBarContainer">
                {profile ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
        </div>
    );
};

export default RightBar;