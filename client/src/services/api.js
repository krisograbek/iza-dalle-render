// Replace this with the actual API URL
const API_URL = 'http://localhost:5000';

export const generateImages = async (prompt) => {
  try {
    const response = await fetch(`${API_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const images = await response.json()
    return images;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};
