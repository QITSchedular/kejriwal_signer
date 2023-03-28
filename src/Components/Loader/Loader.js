import React from 'react'
import LoaderImg from './loader.gif';
import './Loader.css';
const Loader = () => {
  return (
    <div className="loader-container">
      <img src={LoaderImg} alt="Loading..." className="loader-gif" />
    </div>
  )
}

export default Loader