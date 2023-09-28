import React from 'react'

const NoLocation = () => {
  return (
    <div className="error" style={{background:"no-repeat", textAlign:"center", height:"80vh"}} >
      
     <h1>Weather reports not found for this city, Please try something else...</h1>
    <img src="/error.svg" alt="" width="100%" height="90%" />
  </div>
  )
}

export default NoLocation