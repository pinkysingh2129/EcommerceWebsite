// src/components/common/ui/textarea.jsx
import React from 'react';

export const Textarea = ({ value, onChange, placeholder, ...props }) => {
  return (
    <textarea 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
      {...props} 
      style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
    />
  );
};
