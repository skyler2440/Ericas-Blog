import React , {useState} from 'react'
import { connect } from "react-redux";
import {doUpdateUser} from '../../store/actions/authActions'

const UserProfile = (props, state) => {
const [fname, setFname] = useState(props.user.fname);  
    console.log("TCL: UserProfile -> user", props)
    console.log("TCL: UserProfile -> user", state)

    const user = props.user;

    return(
        <>
        <h1>Hello{" "+fname+" "+user.lname}</h1>
        <div className="firstName">
            <p className="firstNameP">First Name</p>
            <p className="firstNameP">{user.fname}</p>
            <button className="editFirstName"></button>
            <form className="fnameForm hidden">
                <input type="text" name='fname' onChange={e => setFname(e.target.value)} value={fname}/>
                <button onClick={e=>  props.doUpdateUser()} >Update</button>
            </form>

        </div>
        </>
    )
}
// }


const mapStateToProps = state => ({
    user: state.authReducer.user
  });
  export default connect(
    mapStateToProps,{doUpdateUser}
  )(UserProfile);