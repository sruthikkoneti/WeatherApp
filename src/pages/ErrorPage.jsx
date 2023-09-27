import React from 'react'
import "../App.css"
import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <div className="error" style={{background:"no-repeat", textAlign:"center", height:"100vh"}} >
      
      <Link to="/"> <h1>Redirect to main page....</h1></Link>
      <img src="/error.svg" alt="" width="100%" height="90%" />
    </div>
  )
}

export default ErrorPage