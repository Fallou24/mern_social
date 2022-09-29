import React, { useEffect, useState } from 'react';
import TopBar from '../../components/topBar/TopBar';
import "./profile.css"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import RightBar from "../../components/rightBar/RightBar"
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    useEffect(() => {
        const getUser = async () => {
            const current = await axios.get('/user?username=' + username);
            setUser(current.data)
        }
        getUser();
    }, [username])
    
    return (
        <>
            <TopBar />
            <div className='profileContainer'>
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <p className="profileImgContainer">
                            <img src={user.coverPicture || PF + "person/noCover.png"} alt="" className="profileCoverImg" />
                            <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="profileUserImg" />
                        </p>
                        <div className="profileUserInfo">
                            <h2 className="profileUsername">
                                {user.username}
                            </h2>
                            <span>
                                {user.desc}
                            </span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <RightBar profile user={user} username={username} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;