import { useState } from 'react';

export function useStyleSelection() {
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [shouldCombineStyles, setShouldCombineStyles] = useState(false);

  const onSelectStyle = (event) => {
    const styleName = event.target.value;
    setSelectedStyles(prevSelectedStyles => prevSelectedStyles.includes(styleName)
      ? prevSelectedStyles.filter(style => style !== styleName)
      : [...prevSelectedStyles, styleName]
    );
  };

  const toggleCombineStyles = () => {
    setShouldCombineStyles(!shouldCombineStyles);
  };

  return { selectedStyles, onSelectStyle, shouldCombineStyles, toggleCombineStyles };
}

// export default useStyleSelection;
