import React, { useState } from 'react';
import StyledRadio from './StyledRadio';

const AspectRadioGroup = ({ onAspectChange }) => {
  const [aspectRatio, setAspectRatio] = useState('square');

  const handleChange = (event) => {
    setAspectRatio(event.target.value);
    onAspectChange(event.target.value);
  };

  return (
    <div>
      <StyledRadio
        name="aspectRatio"
        value="square"
        checked={aspectRatio === 'square'}
        onChange={handleChange}
      >
        Square
      </StyledRadio>
      <StyledRadio
        name="aspectRatio"
        value="vertical"
        checked={aspectRatio === 'vertical'}
        onChange={handleChange}
      >
        Vertical
      </StyledRadio>
      <StyledRadio
        name="aspectRatio"
        value="horizontal"
        checked={aspectRatio === 'horizontal'}
        onChange={handleChange}
      >
        Horizontal
      </StyledRadio>
    </div>
  );
};

export default AspectRadioGroup;
