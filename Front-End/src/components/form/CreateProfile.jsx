import React from 'react';
import {connect} from 'react-redux';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";

import {doCreateProfile} from '../../store/actions/authActions';


function ProFrm({errors, touched}) {
    return(
        <>
        <Form className = "ui form">
            <div className = "field">
                {touched.fname && errors.fname &&(<p className = "error">{errors.fname}</p>)}
                <Field type = "text" name = "fname" placeholder = "First Name" />
            </div>
            <div className = "field">
                {touched.lname && errors.lname &&(<p className = "error">{errors.lname}</p>)}
                <Field type = "text" name = "lname" placeholder = "Last Name" />
            </div>
            <div className = "field">
                {touched.email && errors.email &&(<p className = "error">{errors.email}</p>)}
                <Field type = "email" name = "email" placeholder = "Email" />
            </div>
            <button className = "ui button" type="submit">Create Profile</button>
        </Form>
        </>
    );
};

const Profile = withFormik({
    mapPropsToValues({fname, lname, email}) {
        return{
            fname: fname || "",
            lname: lname || "",
            email: email || ""
        };
    },
    validationSchema: Yup.object().shape({
        fname: Yup.string().required("First Name is Required"),
        lname: Yup.string().required("Last Name is Required"),
        email: Yup.string().required("Email is Required")
    }),

    handleSubmit: (values, formikBag) => {
    formikBag.props.doCreateProfile(values).then(()=> {
        console.log("formikbag", formikBag)
        if (localStorage.getItem("token"))
        formikBag.props.props.history.push("/")
    })
      },
    
      displayName: 'BasicForm',
    
      })(ProFrm);
      
      export default connect(null, { doCreateProfile })(Profile);