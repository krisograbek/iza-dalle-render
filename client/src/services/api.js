import axios from 'axios';

const api = axios.create();

export const generateImages = async (prompt, object, isHD, imageAspect) => {
  const fullPrompt = `${prompt} \n\n[Objects]: ${object}`;
  console.log(fullPrompt); // You can remove this after debugging

  try {
    const response = await api.post('/generate', {
      prompt: fullPrompt,
      hd: isHD,
      ar: imageAspect
    });

    console.log('response', response.data); // Debugging response
    return response.data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};