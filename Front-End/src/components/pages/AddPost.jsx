import React from 'react';
import {connect} from 'react-redux';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import './scss/Form.scss'
import {postBlogPost} from '../../store/actions/postActions';
  


function PostFrm({errors, touched}) {

var d = new Date(); 
var month = d.getMonth() + 1;
var day = d.getDate();
var year = d.getFullYear();
var dateset = month + "-" + day + "-" + year
    return(
        <Form className = "ui form">
            <div className = "field">
                {/* {touched.date && errors.date &&(<p className = "error">{errors.date}</p>)} */}
                <Field type = "text" value={dateset} name = "date" placeholder = "Date" />
            </div>
            <div className = "field">
                {touched.posttitle && errors.posttitle &&(<p className = "error">{errors.posttitle}</p>)}
                <Field type = "text" name = "posttitle" placeholder = "Post Title" />
            </div>
            <div className = "field">
                {touched.postbody && errors.postbody &&(<p className = "error">{errors.postbody}</p>)}
                <Field component="textarea" name="postbody" placeholder='Post Body'/>
            </div>
            <button className = "ui button" type="submit">Submit</button>
        </Form>
    );
};

const Post = withFormik({
    
    mapPropsToValues({date, posttitle, postbody}) {
        var d = new Date(); 
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var year = d.getFullYear();
        var dateset = month + "-" + day + "-" + year
        return{
            date: date || dateset,
            posttitle: posttitle || "",
            postbody: postbody || ""
        };
    },
    validationSchema: Yup.object().shape({
        // date: Yup.string().required("Date is Required"),
        posttitle: Yup.string().required("Post Title is Required"),
        postbody: Yup.string().required("Post Body is Required"),

    }),

    handleSubmit(values, formikBag) {
        console.log(formikBag);
        formikBag.props.postBlogPost(values)
    }
    
      })(PostFrm);
      


export default connect(null, { postBlogPost })(Post);