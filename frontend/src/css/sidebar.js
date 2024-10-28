// styles.js
export const sidebarStyle = (isPhone, isTinyPhone) => ({
  width: isTinyPhone ? '20%' : isPhone ? '20%' : '15%',
  height: '100%',
  padding: isPhone ? '4px' : '20px 0',
  margin: isTinyPhone ? '2px 0' : isPhone ? '10px' : '0 70px 0px 0', 
  borderRight: '1px solid #000',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

export const sideButtonStyle = (isPhone) => ({
  width: isPhone ? '100%' : '80%',
  padding: isPhone ? '5px 0' : '10px',
  margin: isPhone ? '10px 0' : '0 0 20px 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: isPhone ? '0px' : '1px solid #fff',
  borderBottom: isPhone ? '3px solid #000' : '0',
  borderRadius: isPhone ? '0px' : '10px',
  color: isPhone ? '#000' : 'white',
  backgroundColor: isPhone ? '#fff' : '#000'
});

export const modalStyle = (isPhone) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: isPhone ? '80%' : '70%',
  height: isPhone ? '50%' : '60%',
  backgroundColor: '#fff',
  backdropFilter: 'blur(5px)',
  border: '2px solid #000',
  borderRadius: '20px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

export const inputStyle = {
  fontSize: '1.5em',
  width: '60%',
  height: 'auto',
  margin: '0 10px 10px 0',
  padding: '5px'
};

export const buttonStyle = {
  fontSize: '0.8em',
  padding: '10px',
  border: '1px solid lightblue',
};
