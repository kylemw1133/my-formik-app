import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import './formStyles.css';  // Import the CSS file

const CustomSelect = ({ field, form, options, ...props }) => {
  return (
    <select {...field} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  role: Yup.string().required('Role is required'),
  skills: Yup.array().of(Yup.string().required('Skill is required')).min(1, 'At least one skill is required')
});

function AdvancedFormikForm() {
  const initialValues = {
    name: '',
    email: '',
    role: '',
    skills: ['']
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      // Convert the values object to a formatted string
      const formattedValues = Object.entries(values)
        .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
        .join('\n');

      // Show an alert with the form values
      alert('Form submitted with the following values:\n\n' + formattedValues);

      setSubmitting(false);
      resetForm();
    }, 400);
  };

  const roleOptions = [
    { value: '', label: 'Select a role' },
    { value: 'developer', label: 'Developer' },
    { value: 'designer', label: 'Designer' },
    { value: 'manager', label: 'Manager' }
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting }) => (
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
            <label htmlFor="role">Role:</label>
            <Field
              name="role"
              component={CustomSelect}
              options={roleOptions}
            />
            <ErrorMessage name="role" component="div" className="error" />
          </div>
          <div>
            <label>Skills:</label>
            <FieldArray name="skills">
              {({ push, remove }) => (
                <div>
                  {values.skills.map((skill, index) => (
                    <div key={index} className="skill-input">
                      <Field name={`skills.${index}`} />
                      <ErrorMessage name={`skills.${index}`} component="div" className="error" />
                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="button-container">
                    <button type="button" onClick={() => push('')} className="form-button">
                      Add Skill
                    </button>
                    <button type="submit" disabled={isSubmitting} className="form-button">
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </FieldArray>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AdvancedFormikForm;