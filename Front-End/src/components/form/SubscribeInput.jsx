import React from 'react';
import {connect} from 'react-redux';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import './scss/Subscribe.scss'
import {doSignIn} from '../../store/actions/authActions';


function LogFrm({errors, touched}) {
    return(
        <>
        <Form className = "ui form subscribe">
            <div className = "field">
                {touched.email && errors.email &&(<p className = "error">{errors.email}</p>)}
                <Field type = "email" name = "email" placeholder = "Enter Email to Subscribe" />
            
            </div>
            <button className = "ui button" type="submit">Subscribe</button>

        </Form>
        </>
    );
};

const Login = withFormik({
    mapPropsToValues({email}) {
        return{
            email: email || ""
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().required("Email is Required")
    }),

    handleSubmit: (values, formikBag) => {
    formikBag.props.doSignIn(values).then(()=> {
        if (localStorage.getItem("token"))
        {
            formikBag.props.history.push("/blog")
            // window.location.reload()
        }
    })
      },
    
      displayName: 'BasicForm',
    
      })(LogFrm);
      


export default connect(null, { doSignIn })(Login);