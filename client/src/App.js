import React from 'react';
import { GlobalStyle } from './GlobalStyle';
import AspectRatioSelector from './components/AspectRatioSelector';
import GenerateButton from './components/GenerateButton';
import ImageDisplay from './components/ImageDisplay';
import ObjectInput from './components/ObjectInput';
import PromptInput from './components/PromptInput';
import SetupPanel from './components/SetupPanel';
import StyleSelector from './components/StyleSelector';
import StyledCheckbox from './components/StyledCheckbox';
import stylesConfig from './config/stylesConfig';

import { useImageGenerator } from './hooks/useImageGenerator';
import { useStyleSelection } from './hooks/useStyleSelection';

function App() {
  const {
    selectedStyles, onSelectStyle, shouldCombineStyles, toggleCombineStyles
  } = useStyleSelection();

  const {
    images, onGenerate, objects, setObjects, editablePrompt, setEditablePrompt,
    isHD, toggleIsHD, imageAspect, setImageAspect
  } = useImageGenerator(selectedStyles, shouldCombineStyles);

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <SetupPanel>
          <AspectRatioSelector
            currentAspect={imageAspect}
            onAspectChange={setImageAspect}
          />
          <StyledCheckbox name="HD" checked={isHD} onChange={toggleIsHD}>
            HD
          </StyledCheckbox>
          <StyledCheckbox name="Combine Styles" checked={shouldCombineStyles} onChange={toggleCombineStyles}>
            Combine Styles
          </StyledCheckbox>
        </SetupPanel>
        <StyleSelector styles={stylesConfig} onSelectStyle={onSelectStyle} selectedStyles={selectedStyles} />
        <ObjectInput objects={objects} setObjects={setObjects} />
        <PromptInput prompt={editablePrompt} setPrompt={setEditablePrompt} />
        <GenerateButton onGenerate={onGenerate} />
        <ImageDisplay images={images} />
      </div>
    </>
  );
}

export default App;
