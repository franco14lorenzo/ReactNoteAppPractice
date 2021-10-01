import React from "react";

const Footer = () => {
  const footerStyle = {
    color: 'black',
    fontStyle: 'italic',
    fontSize: 16,
    textAlign: 'center'
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, by Franco Lorenzo 2021</em>
    </div>
  )
}

export default Footer