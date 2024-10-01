import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './formStyles.css';  // Import the CSS file

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  message: Yup.string().required('Message is required')
});

function FormikForm() {
  const initialValues = {
    name: '',
    email: '',
    message: ''
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      // Convert the values object to a formatted string
      const formattedValues = Object.entries(values)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

      // Show an alert with the form values
      alert('Form submitted with the following values:\n\n' + formattedValues);

      setSubmitting(false);
      resetForm();
    }, 400);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Name:</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <Field as="textarea" name="message" />
            <ErrorMessage name="message" component="div" className="error" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikForm;