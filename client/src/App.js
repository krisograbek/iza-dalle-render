// src/App.js
import React, { useEffect, useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import StyleSelector from './components/StyleSelector';
import ObjectInput from './components/ObjectInput';
import ImageDisplay from './components/ImageDisplay';
import GenerateButton from './components/GenerateButton';
import { generateImages } from './services/api';

import stylesData from './data/styles.json'; // Assuming you have a styles.json file in the assets directory
import PromptInput from './components/PromptInput';

function App() {
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [objects, setObjects] = useState('');
  const [images, setImages] = useState([]);
  const [promptTemplate, setPromptTemplate] = useState("Create an image of [Objects] in the styles of: ");
  const [editablePrompt, setEditablePrompt] = useState("");
  const [shouldCombineStyles, setShouldCombineStyles] = useState(false);

  // const [info, setInfo] = useState("");

  useEffect(() => {
    // Update the editable prompt when selected styles or objects change
    const stylesText = selectedStyles.join(', ');
    // const objectsText = objects.join('; ');
    // setInfo(`You will generate the total of ${objects.split(";").length} images: `)
    setEditablePrompt(`${promptTemplate} ${stylesText}`);
  }, [promptTemplate, selectedStyles, objects]);

  useEffect(() => { }, [images])


  const onSelectStyle = (event) => {
    const styleName = event.target.value;
    setSelectedStyles(prevSelectedStyles => {
      return prevSelectedStyles.includes(styleName)
        ? prevSelectedStyles.filter(style => style !== styleName)
        : [...prevSelectedStyles, styleName];
    });
  };


  const onGenerate = async () => {
    // Construct the prompt using the selected styles and objects
    const listOfObjects = objects.split("; ")
    const generatedImages = []
    console.log(listOfObjects)
    for (const object of listOfObjects) {
      // const prompt = `Create an image of ${object} in the styles of ${selectedStyles.join(', ')}`;
      try {
        const generatedImage = await generateImages(editablePrompt, object);
        generatedImages.push(generatedImage);
      } catch (error) {
        // Handle errors here
        console.error('Failed to generate images:', error);
      }
    }
    setImages(generatedImages);
    console.log(generatedImages)
    console.log(images)
  };


  return (
    <>
      <GlobalStyle />
      <div className="App">
        <StyleSelector styles={stylesData} onSelectStyle={onSelectStyle} selectedStyles={selectedStyles} />
        <ObjectInput objects={objects} setObjects={setObjects} />
        <PromptInput prompt={editablePrompt} setPrompt={setEditablePrompt} />
        <GenerateButton onGenerate={onGenerate} />
        <ImageDisplay images={images} />
      </div>
    </>
  );
}

export default App;
