import { Cloudinary } from '@cloudinary/url-gen';
import { upload } from 'cloudinary-react-native';

// Initialize Cloudinary instance
const cloudinary = new Cloudinary({
  cloud: {
    cloudName: 'dnc1q8tlu',
  },
  url: {
    secure: true
  }
});

// Function to handle unsigned uploads
export const uploadToCloudinary = (fileUri, uploadPreset, tag) => {
  const options = {
    upload_preset: uploadPreset,
    unsigned: true,
    tags: tag ? [tag] : undefined,
  };

  return new Promise((resolve, reject) => {
    upload(cloudinary, {
      file: fileUri,
      options: options,
      callback: (error, response) => {
        if (error) {
          console.error('Upload Error:', error);
          reject(error); // Reject the promise with the error
        } else {
          // console.log('Upload Response:', response);
          resolve(response); // Resolve the promise with the response
        }
      },
    });
  });
};
