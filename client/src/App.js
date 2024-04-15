import React, { useEffect, useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import AspectRadioGroup from './components/AspectRatioGroup';
import GenerateButton from './components/GenerateButton';
import ImageDisplay from './components/ImageDisplay';
import ObjectInput from './components/ObjectInput';
import PromptInput from './components/PromptInput';
import SetupPanel from './components/SetupPanel';
import StyleSelector from './components/StyleSelector';
import StyledCheckbox from './components/StyledCheckbox';
import stylesData from './data/styles.json';
import { generateImages } from './services/api';
import AspectRatioSelector from './components/AspectRatioSelector';

function App() {
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [objects, setObjects] = useState('');
  const [images, setImages] = useState([]);
  const [promptTemplate, setPromptTemplate] = useState("Create an image of [Objects] ");
  const [editablePrompt, setEditablePrompt] = useState("");
  const [shouldCombineStyles, setShouldCombineStyles] = useState(false);
  const [isHD, setIsHD] = useState(false);

  const [imageAspect, setImageAspect] = useState('square');
  const [aspectRatio, setAspectRatio] = useState('square'); // duplicate

  const handleAspectChange = (aspect) => {
    setImageAspect(aspect);
  };

  useEffect(() => {
    let stylesText = "";
    if (shouldCombineStyles) {
      stylesText = `combining the styles of ${selectedStyles.join(', ')}`;
    }
    setEditablePrompt(`${promptTemplate} ${stylesText}`);
  }, [promptTemplate, selectedStyles, shouldCombineStyles]);

  useEffect(() => { }, [images])


  const onSelectStyle = (event) => {
    const styleName = event.target.value;
    setSelectedStyles(prevSelectedStyles => {
      return prevSelectedStyles.includes(styleName)
        ? prevSelectedStyles.filter(style => style !== styleName)
        : [...prevSelectedStyles, styleName];
    });
  };

  const handleHDChange = () => {
    setIsHD(!isHD);
  };

  const handleCombineStylesChange = () => {
    setShouldCombineStyles(!shouldCombineStyles);
  };


  const onGenerate = async () => {
    // Construct the prompt using the selected styles and objects
    const generatedImages = []
    const listOfObjects = objects.split("; ")
    if (shouldCombineStyles) {
      for (const object of listOfObjects) {
        try {
          const generatedImage = await generateImages(editablePrompt, object, isHD, imageAspect);
          generatedImages.push(generatedImage);
        } catch (error) {
          console.error('Failed to generate images:', error);
        }
      }
    }
    else {
      for (const object of listOfObjects) {
        for (const style of selectedStyles) {
          try {
            const prompt = `${editablePrompt} in the style of ${style}`
            const generatedImage = await generateImages(prompt, object, isHD, imageAspect);
            generatedImages.push(generatedImage);
          } catch (error) {
            console.error('Failed to generate images:', error);
          }
        }
      }
    }
    setImages(generatedImages);
    console.log(generatedImages)
  };


  return (
    <>
      <GlobalStyle />
      <div className="App">
        <SetupPanel>
          {/* <AspectRadioGroup onAspectChange={handleAspectChange} /> */}
          <AspectRatioSelector
            currentAspect={aspectRatio}
            onAspectChange={setAspectRatio}
          />
          <StyledCheckbox name="HD" checked={isHD} onChange={handleHDChange}>
            HD
          </StyledCheckbox>
          <StyledCheckbox name="Combine Styles" checked={shouldCombineStyles} onChange={handleCombineStylesChange}>
            Combine Styles
          </StyledCheckbox>
          {/* Here you can include <StyledRadio> and <StyledCheckbox> components */}
        </SetupPanel>
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
