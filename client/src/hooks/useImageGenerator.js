// hooks/useImageGenerator.js
import { useState, useEffect } from 'react';
import { generateImages } from '../services/api';

export function useImageGenerator(selectedStyles, shouldCombineStyles) {
  const [objects, setObjects] = useState('');
  const [images, setImages] = useState([]);
  const [editablePrompt, setEditablePrompt] = useState("Create an image of [Objects] ");
  const [isHD, setIsHD] = useState(false);
  const [imageAspect, setImageAspect] = useState('square');
  const [isLoading, setIsLoading] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0 });

  const toggleIsHD = () => setIsHD(!isHD);


  useEffect(() => {
    const listOfObjects = objects.split("; ").filter(Boolean);
    const totalImages = shouldCombineStyles ? listOfObjects.length : listOfObjects.length * selectedStyles.length;
    setGenerationProgress(prev => ({ ...prev, total: totalImages }));
  }, [objects, selectedStyles, shouldCombineStyles]);

  const onGenerate = async () => {
    const listOfObjects = objects.split("; ").filter(Boolean);
    setIsLoading(true);
    setGenerationProgress(prev => ({ ...prev, current: 0 }));
    const generatedImages = [];
    for (const object of listOfObjects) {
      if (shouldCombineStyles) {
        try {
          const prompt = `${editablePrompt} combining the styles of ${selectedStyles.join(', ')}`;
          const generatedImage = await generateImages(prompt, object, isHD, imageAspect);
          generatedImages.push(generatedImage);
          setImages([...generatedImages]);
          setGenerationProgress(prev => ({ ...prev, current: prev.current + 1 }));
        } catch (error) {
          console.error('Failed to generate images:', error);
        }
      } else {
        for (const style of selectedStyles) {
          try {
            const prompt = `${editablePrompt} in the style of ${style}`;
            const generatedImage = await generateImages(prompt, object, isHD, imageAspect);
            generatedImages.push(generatedImage);
            setImages([...generatedImages]);
            setGenerationProgress(prev => ({ ...prev, current: prev.current + 1 }));
          } catch (error) {
            console.error('Failed to generate images:', error);
          }
        }
      }
    }
    setIsLoading(false);
  };

  return {
    images, onGenerate, objects, setObjects, editablePrompt, setEditablePrompt,
    isHD, toggleIsHD, imageAspect, setImageAspect, isLoading, generationProgress
  };
}

