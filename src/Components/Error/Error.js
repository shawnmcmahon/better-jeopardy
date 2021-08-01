import React from 'react';
import './Error.css';
import PropTypes from 'prop-types';


const Error = ({ error }) => {


  return (
    <> 
      <h2 className="error">Error: Something went wrong... </h2>
    </>
  )
}


export default Error;

Errors.propTypes = {
  error: PropTypes.string.isRequired
};