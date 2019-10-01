import React from 'react';
import {connect} from 'react-redux';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';

import {doSignIn} from '../../store/actions/authActions';


function LogFrm({errors, touched}) {
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
            <button className = "ui button" type="submit">Login</button>
        </Form>
    );
};

const Login = withFormik({
    mapPropsToValues({username, password}) {
        return{
            username: username || "",
            password: password || ""
        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string().required("Username is Required"),
        password: Yup.string().required("Password is Required")
    }),

    handleSubmit(values, formikBag) {
        // console.log(formikBag);
        formikBag.props.doSignIn(values)
        formikBag.props.history.push("/blog")

    }
    
      })(LogFrm);
      


export default connect(null, { doSignIn })(Login);