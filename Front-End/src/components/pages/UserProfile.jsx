import React , {useState} from 'react'
import { connect } from "react-redux";

const UserProfile = ({user}) => {
    const [values, setValues] = useState({});
    const handleChange = (e) => {
        
        setValues(values=>({...values, [e.target.name]: e.target.value}))
    }
    console.log("TCL: UserProfile -> user", user)
    return(
        <>
        <h1>Hello{" "+user.fname+" "+user.lname}</h1>
        <div className="firstName">
            <p className="firstNameP">First Name</p>
            <p className="firstNameP">{user.fname}</p>
            <button className="editFirstName"></button>
            <form className="fnameForm hidden">
                <input type="text" name='fname' onChange={handleChange} />
            </form>

        </div>
        </>
    )
}


const mapStateToProps = state => ({
    user: state.authReducer.user
  });
  export default connect(
    mapStateToProps
  )(UserProfile);