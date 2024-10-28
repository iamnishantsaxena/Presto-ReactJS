import React, { useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const CSSPanel = ({ selectedObject, onUpdateCSS, isVisible }) => {
  const [cssProperties, setCssProperties] = React.useState({});

  useEffect(() => {
    // Initialize cssProperties with the selected object's styles
    if (selectedObject) {
      setCssProperties({
        color: selectedObject.color || '',
        fontSize: selectedObject.fontSize || '',
        margin: selectedObject.margin || '',
        padding: selectedObject.padding || '',
        // Add more properties as needed
      });
    }
  }, [selectedObject]);

  const handleChange = (property) => (event) => {
    const newValue = event.target.value;
    setCssProperties((prev) => ({ ...prev, [property]: newValue }));
    onUpdateCSS(property, newValue); // Call the parent's update function
  };

  if (!isVisible || !selectedObject) return null;

  return (
    <Box sx={{ padding: '10px', border: '1px solid #ccc' }}>
      <Typography variant="h6">CSS Properties</Typography>
      <TextField
        label="Color"
        value={cssProperties.color}
        onChange={handleChange('color')}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Font Size"
        value={cssProperties.fontSize}
        onChange={handleChange('fontSize')}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Margin"
        value={cssProperties.margin}
        onChange={handleChange('margin')}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Padding"
        value={cssProperties.padding}
        onChange={handleChange('padding')}
        style={{ marginBottom: '10px' }}
      />
      <Button onClick={() => onUpdateCSS('reset', cssProperties)}>Reset</Button>
    </Box>
  );
};

export default CSSPanel;
