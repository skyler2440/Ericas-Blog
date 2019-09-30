import React from 'react'
import {withFormik, Form, Field, Formik} from 'formik';
import Yup from 'yup'
const Contact = () => (
    <div>
      <h1>Contact Erica's Vanity</h1>
      <Formik
        initialValues={{ email: '', inquiry: '' }}
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder='Email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <textarea
              name="inquiry"
              placeholder='Inquiry'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.inqury}
            />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
            <button type='reset' disabled={isSubmitting}>
                Reset
            </button>
          </form>
        )}
      </Formik>
    </div>
  );

export default Contact;