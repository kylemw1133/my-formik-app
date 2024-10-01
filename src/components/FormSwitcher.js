import React, { useState } from 'react';
import BasicForm from './BasicForm';
import FormikForm from './FormikForm';
import AdvancedFormikForm from './AdvancedFormikForm';
import './formStyles.css';

const FormSwitcher = () => {
  const [activeForm, setActiveForm] = useState('basic');

  const renderForm = () => {
    switch (activeForm) {
      case 'basic':
        return <BasicForm />;
      case 'formik':
        return <FormikForm />;
      case 'advanced':
        return <AdvancedFormikForm />;
      default:
        return null;
    }
  };

  return (
    <div className="form-demo-container">
      <div className="form-switcher">
        <button onClick={() => setActiveForm('basic')} className={activeForm === 'basic' ? 'active' : ''}>
          Basic React Form
        </button>
        <button onClick={() => setActiveForm('formik')} className={activeForm === 'formik' ? 'active' : ''}>
          Basic Formik Form
        </button>
        <button onClick={() => setActiveForm('advanced')} className={activeForm === 'advanced' ? 'active' : ''}>
          Advanced Formik Form
        </button>
      </div>
      <div className="form-container">
        <h2>{activeForm === 'basic' ? 'Basic React Form' : activeForm === 'formik' ? 'Basic Formik Form' : 'Advanced Formik Form'}</h2>
        {renderForm()}
      </div>
    </div>
  );
};

export default FormSwitcher;