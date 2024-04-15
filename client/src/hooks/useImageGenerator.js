// hooks/useImageGenerator.js
import { useState, useEffect } from 'react';
import { generateImages } from '../services/api';

export function useImageGenerator(selectedStyles, shouldCombineStyles) {
  const [objects, setObjects] = useState('');
  const [images, setImages] = useState([]);
  const [editablePrompt, setEditablePrompt] = useState("Create an image of [Objects] ");
  const [isHD, setIsHD] = useState(false);
  const [imageAspect, setImageAspect] = useState('square');

  const toggleIsHD = () => setIsHD(!isHD);

  const onGenerate = async (e) => {
    e.preventDefault();
    console.log('Generating images with', selectedStyles, objects, isHD, imageAspect);
    const generatedImages = [];
    const listOfObjects = objects.split("; ");
    const stylesText = shouldCombineStyles ? `combining the styles of ${selectedStyles.join(', ')}` : "";
    const basePrompt = `${editablePrompt} ${stylesText}`;

    for (const object of listOfObjects) {
      if (shouldCombineStyles) {
        try {
          const generatedImage = await generateImages(basePrompt, object, isHD, imageAspect);
          generatedImages.push(generatedImage);
        } catch (error) {
          console.error('Failed to generate images:', error);
        }
      } else {
        for (const style of selectedStyles) {
          try {
            const prompt = `${basePrompt} in the style of ${style}`;
            const generatedImage = await generateImages(prompt, object, isHD, imageAspect);
            generatedImages.push(generatedImage);
          } catch (error) {
            console.error('Failed to generate images:', error);
          }
        }
      }
    }
    setImages(generatedImages);
  };

  // Effect to update the editable prompt based on style selection changes
  useEffect(() => {
    const stylesText = shouldCombineStyles ? `combining the styles of ${selectedStyles.join(', ')}` : "";
    setEditablePrompt(`Create an image of [Objects] ${stylesText}`);
  }, [selectedStyles, shouldCombineStyles]);

  return {
    images, onGenerate, objects, setObjects, editablePrompt, setEditablePrompt,
    isHD, toggleIsHD, imageAspect, setImageAspect
  };
}
