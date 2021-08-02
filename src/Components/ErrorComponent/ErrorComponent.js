import React from 'react';
import './ErrorComponent.css';
import PropTypes from 'prop-types';


const ErrorComponent = () => {


  return (
    <div className="error-container">
      <h2 className="error-message">Error: 500 Internal Server Error</h2>
    </div>
  )
}


export default ErrorComponent;
