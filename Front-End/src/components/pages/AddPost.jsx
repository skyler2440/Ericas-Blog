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
var hour = d.getHours();
var min = d.getMinutes();
var second = d.getSeconds(); 
var dateset = month + "-" + day + "-" + year + " " + hour +":"+ min +":"+ second
    return(
        <Form className = "ui form">
            <div className = "field">
                {/* {touched.date && errors.date &&(<p className = "error">{errors.date}</p>)} */}
                <Field type = "text" value={dateset} className="date"name = "date" placeholder = "Date" />
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
        var hour = d.getHours();
        var min = d.getMinutes();
        var second = d.getSeconds(); 
        if (month <= 9 ){
            month = 0+month.toString();
        }
        if (day <= 9 ){
            day = 0+day.toString();
        }
        if (hour <= 9 ){
            hour = 0+hour.toString();
        }
        if (second <= 9 ){
            second = 0+second.toString();
        }
        if (min <= 9 ){
                min = 0+min.toString();
            }
        var dateset = month + "-" + day + "-" + year + " " + hour +":"+ min +":"+ second

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
        formikBag.props.postBlogPost(values).then(()=> {formikBag.props.history.push("/blog")})
    }
    
      })(PostFrm);
      


export default connect(null, { postBlogPost })(Post);