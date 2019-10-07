import React from 'react'
import { connect } from "react-redux";
import {doUploadPhoto} from '../../store/actions/authActions'
import axios from 'axios'

import {withFormik, Form, Field, Formik} from 'formik';
import Yup from 'yup'
class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
}
onFormSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('myImage',this.state.file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    axios.post("http://localhost:8000/api/upload",formData,config)
        .then((response) => {
console.log(response)        }).catch((error) => {
    });
}
onChange(e) {
    this.setState({file:e.target.files[0]});
}

render() {
    return (
        <form onSubmit={this.onFormSubmit}>
            <h1>File Upload</h1>
            <input type="file" name="myImage" onChange= {this.onChange} />
            <button type="submit">Upload</button>
        </form>
    )
}
}

// const Contact = (props) => {
  // console.log("TCL: Contact -> props", props)

  //   return(
  //     <>
  //     <form>
  //       <input name="file" value={props.photo} type="file"/>
  //       <button onClick={e=>{ props.doUploadPhoto(props.photo)}}></button>
  //     </form>
  //     </>
    
  // );
  //   };
  //   const mapStateToProps = state => ({
  //     photo: state.authReducer.photo
  //   });
export default connect(null, {doUploadPhoto})(Contact);