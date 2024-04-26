import React from 'react';

const Footer = ({ transparent }) => {
  const backgroundColor = transparent ? 'transparent' : '#333';

  return (
    <footer style={{ textAlign: 'center', padding: '20px', position: 'fixed', left: '0', bottom: '0', width: '100%', backgroundColor, color: '#fff' }}>
      @Pestro 2024 || All rights reserved
    </footer>
  );
};

export default Footer;
