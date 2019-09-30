import React from 'react';
import {connect} from 'react-redux';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';

import {postComment} from '../../store/actions/commentActions';


function CommentFrm({errors, touched}) {
    var d = new Date(); 
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();
    var dateset = month + "-" + day + "-" + year
    return(
        <Form className = "ui form">
            <div className = "field">
                {touched.date && errors.date &&(<p className = "error">{errors.date}</p>)}
                <Field type = "text" value ={dateset}name = "date" placeholder = "Date" />
            </div>
            <div className = "field">
                {touched.comment && errors.comment &&(<p className = "error">{errors.comment}</p>)}
                <Field component="textarea" type = "text" name = "comment" placeholder = "Comment" />
            </div>
            <button className = "ui button" type="submit">Submit</button>
        </Form>
    );
};

const Comment = withFormik({
    mapPropsToValues({date, comment}) {
        var d = new Date(); 
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var year = d.getFullYear();
        var dateset = month + "-" + day + "-" + year
        return{
            date: date || dateset,
            comment: comment || ""
        };
    },
    validationSchema: Yup.object().shape({
        date: Yup.string().required("Date is Required"),
        comment: Yup.string().required("Comment is Required"),

    }),

    handleSubmit(values, formikBag) {
        console.log("formikbag",formikBag);
        formikBag.props.postComment(values, formikBag.props.props.postid)
        .then(()=> window.location.reload())
    }
    
      })(CommentFrm);
      


export default connect(null, { postComment })(Comment);