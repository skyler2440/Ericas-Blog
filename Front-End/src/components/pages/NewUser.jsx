import React from 'react';
import {connect} from 'react-redux';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';

import {doCreateUser} from '../../store/actions/authActions';


function CreateAccountFrm({errors, touched}) {
    return(
        <Form className = "ui form">
            <div className = "field">
                {touched.username && errors.username &&(<p className = "error">{errors.username}</p>)}
                <Field type = "text" name = "username" placeholder = "UserName" />
            </div>
            <div className = "field">
                {touched.password && errors.password &&(<p className = "error">{errors.password}</p>)}
                <Field type = "password" name = "password" placeholder = "Password" />
            </div>
            <div className = "field">
                {touched.email && errors.email &&(<p className = "error">{errors.email}</p>)}
                <Field type = "email" name = "email" placeholder = "Email" />
            </div>
            <div className = "field">
                {touched.fname && errors.fname &&(<p className = "error">{errors.fname}</p>)}
                <Field type = "text" name = "fname" placeholder = "First Name" />
            </div>
            <div className = "field">
                {touched.lname && errors.lname &&(<p className = "error">{errors.lname}</p>)}
                <Field type = "text" name = "lname" placeholder = "Last Name" />
            </div>
            <button className = "ui button" type="submit">Create Account</button>
        </Form>
    );
};

const CreateAccount = withFormik({
    mapPropsToValues({username, password}) {
        return{
            username: username || "",
            password: password || "",
            email: email || "",
            fname: fname || "",
            lname: lname || ""
        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required("Username is Required"),
        password: Yup.string().required("Password is Required"),
        email: Yup.email().required("Email is Required"),
        fname: Yup.string().required("First Name is Required"),
        lname: Yup.string().required("Last Name is Required")
    }),

    handleSubmit(values, formikBag) {
        // console.log(formikBag);
        formikBag.props.doCreateAccount(values)
        formikBag.props.history.push("/blog")

    }
    
      })(CreateAccountFrm);
      


export default connect(null, { doCreateAccount })(CreateAccount);