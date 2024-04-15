// Replace this with the actual API URL
const API_URL = 'http://localhost:5001';

export const generateImages = async (prompt, object, isHD, imageAspect) => {
  const fullPrompt = `${prompt} \n\n[Objects]: ${object}`
  try {
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: fullPrompt, hd: isHD, ar: imageAspect }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json()
    console.log('response', data)
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};
