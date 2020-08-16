import firebaseApp from "../firebase/index";
const { storage } = firebaseApp;

export const uploadNewsImage = async (images) => {
  const currentDate = new Date().toISOString();
  return images.map(
    async (image) =>
      await storage.ref(`news-images/${currentDate}:${image.name}`).put(image)
  );
};

export const deleteImageUploaded = (imagePaths) => {
  imagePaths.forEach((path) => {
    storage.ref(path).delete();
  });
};
