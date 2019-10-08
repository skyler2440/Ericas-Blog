import React, {useState} from 'react'
import { connect } from "react-redux";
import {doUpdateUser} from '../../store/actions/authActions'
import axios from 'axios';
import './scss/UserProfile.scss'
const UserProfilePage = ({userprops, uuid, doUpdateUser}) => {
    console.log("TCL: UserProfilePage -> props", userprops, uuid)
    const [fname, setFname] = useState(userprops.fname);
    const [lname, setLname] = useState(userprops.lname);
    const [email, setEmail] = useState(userprops.email);
    const [avatar, setAvatar] = useState();
    const [avatarurl, setAvatarurl] = useState(userprops.avatarurl);
    const[uploadedFile, setUploadedFile] = useState({});
    const handleSubmit = e =>{
        e.preventDefault();
        doUpdateUser(userprops.profileid, e.target.value)
    }

    const [selFile, setSelFile] = useState();
    const fileSelHandle = e => {
      setSelFile(e.target.files[0]);
      console.log(e.target.files[0])
    }
    const fileUploadHandle = () => {
      const fd = new FormData();
      fd.append('avatar', selFile)
      axios.post("http://localhost:8000/api/upload", fd,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }}).then(res => {
        console.log(res)
        setAvatarurl(res.data.filePath)
        doUpdateUser(userprops.profileid, `{"avatarurl":"${res.data.filePath}"}`)
      }).catch(err=>{
        console.log(err)
      })
    }
    console.log("TCL: UserProfilePage -> fname", fname)
    return(
        <>
        <p>First Name </p>
        <form className="proform">
            <input className="proinput" type="text" name="fname" value={fname} placeholder="First Name" onChange={e => setFname(e.target.value)}/>
            <button onClick={handleSubmit}>Update First Name</button>
        </form>
        <p>Last Name</p>
        <form className="proform">
            <input className="proinput" type="text" name="lname" value={lname} placeholder="Last Name" onChange={e => setLname(e.target.value)}/>
            <button onClick={handleSubmit}>Update Last Name</button>
        </form>
        <p>Email</p>
        <form className="proform">
            <input className="proinput" type="email" name="email" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)}/>
            <button onClick={handleSubmit}>Update Email</button>
        </form>
        <p>Photo</p>
        <img src={avatarurl} alt='avatar'/>
        <form className="proform">
            <input className="proinput" type="text" name="avatarurl" value={avatar} placeholder="Avatar Url" onChange={e => setAvatarurl(e.target.value)}/>
            <button onClick={handleSubmit}>Update Avatar</button>
        </form>
        {/* <form className="proform"> */}
            <input type="file" name="avatar" onChange={fileSelHandle}/>
            <button onClick={fileUploadHandle}>Submit</button>
        {/* </form> */}
        </>
    )
}

export default connect (null, {doUpdateUser})( UserProfilePage)