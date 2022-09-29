import { EmojiEmotions, Label, PermMedia, Room } from '@mui/icons-material';
import React, { createRef, useContext, useState } from 'react';
import { authContext } from '../../context/AuthContext';
import "./share.css"
import { Link } from "react-router-dom";
import axios from 'axios';

const Share = () => {
    const { user } = useContext(authContext);
    const { profilePicture, username } = user;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = createRef();
    const [file, setFile] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }
        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (err) { }
    };

    return (
        <div className='share'>
            <div className="shareContainer">
                <div className='shareTop'>
                    <Link to={"/profile/" + username}>
                        <img className="shareImg" src={profilePicture ? PF + profilePicture : PF + "person/noAvatar.png"} alt="" />
                    </Link>
                    <input type="text" ref={desc} placeholder={"What's in your mind " + username + " ?"} className="shareInput" />
                </div>
                <div className="shareBottom">
                    <hr />
                    <form className="shareDetails" onSubmit={submitHandler}>
                        <label htmlFor='file' className="shareItem">
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className="shareItemText" >Photo or video</span>
                        </label>
                        <input type="file" id="file" accept='.png,.jpeg,.jpg' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                        <label className="shareItem">
                            <Label htmlColor='blue' className='shareIcon' />
                            <span className="shareItemText">Tag</span>
                        </label>
                        <label className="shareItem">
                            <Room htmlColor='green' className='shareIcon' />
                            <span className="shareItemText">Localisation</span>
                        </label>
                        <label className="shareItem">
                            <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                            <span className="shareItemText">Feelings</span>
                        </label>
                        <button className="shareBtn" type="submit">Share</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Share;