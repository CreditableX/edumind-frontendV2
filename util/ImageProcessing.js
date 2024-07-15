import { manipulateAsync } from 'expo-image-manipulator';

export const compressImage = async (uri) => {
  try {
    const manipulatedImage = await manipulateAsync(
      uri,
      [],
      // [{ resize: { height: 60} }],
      { compress: 0.03 }
      // { compress: 0.5, format: 'jpeg' } // Adjust compress and format as needed
    );
    // console.log("Resized Image:", manipulatedImage);
    return manipulatedImage.uri; // Return the compressed image URI
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};