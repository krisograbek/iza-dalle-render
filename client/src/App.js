// src/App.js
import React, { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import StyleSelector from './components/StyleSelector';
import ObjectInput from './components/ObjectInput';
import ImageDisplay from './components/ImageDisplay';
import GenerateButton from './components/GenerateButton';
import { generateImages } from './services/api';

import stylesData from './data/styles.json'; // Assuming you have a styles.json file in the assets directory

function App() {
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [objects, setObjects] = useState('');
  const [images, setImages] = useState([]);

  const onSelectStyle = (event) => {
    const styleName = event.target.value;
    setSelectedStyles(prevSelectedStyles => {
      // Check if the style is already selected
      if (prevSelectedStyles.includes(styleName)) {
        // If it is, remove it from the array
        return prevSelectedStyles.filter(style => style !== styleName);
      } else {
        // If it's not, add it to the array
        return [...prevSelectedStyles, styleName];
      }
    });
  };


  const onGenerate = async () => {
    // Construct the prompt using the selected styles and objects
    const prompt = `Create an image in the combination of styles: ${selectedStyles.join(', ')} with objects: ${objects}`;
    console.log('selectedStyles.join', selectedStyles.join(', '))
    console.log('objects', objects)
    try {
      const generatedImages = await generateImages(prompt);
      setImages(generatedImages);
      console.log(images)
    } catch (error) {
      // Handle errors here
      console.error('Failed to generate images:', error);
    }
  };

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <StyleSelector styles={stylesData} onSelectStyle={onSelectStyle} selectedStyles={selectedStyles} />
        <ObjectInput objects={objects} setObjects={setObjects} />
        <GenerateButton onGenerate={onGenerate} />
        {/* <ImageDisplay images={images} /> */}
      </div>
    </>
  );
}

export default App;
