import axios from 'axios';

// Base URL for the Express API server
const API_BASE_URL = 'http://localhost:5000/api/verify';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 180000, // 3 minutes timeout (PDF parsing and web searches take some time!)
});

/**
 * Uploads a PDF file and starts the real-time AI fact-checking pipeline.
 * 
 * @param {File} file - The raw PDF File object from user input
 * @param {Function} onUploadProgress - Callback for Axios upload progress
 * @returns {Promise<Object>} The final compiled fact-checking report JSON
 */
export const uploadAndVerifyPDF = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append('pdf', file);

  try {
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onUploadProgress(percentCompleted);
        }
      },
    });
    return response.data;
  } catch (error) {
    console.error('API verification upload failed:', error);
    
    // Extract a user-friendly error message
    const errorMsg = error.response?.data?.message || 
                     error.message || 
                     'Unable to connect to verification server. Please ensure the backend is running.';
                     
    throw new Error(errorMsg);
  }
};

/**
 * Simple health check query to backend
 */
export const checkServerHealth = async () => {
  try {
    const response = await axios.get('http://localhost:5000/');
    return {
      online: true,
      mode: response.data.mode,
      success: response.data.success
    };
  } catch (error) {
    return {
      online: false,
      mode: 'OFFLINE'
    };
  }
};
