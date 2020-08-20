import firebaseApp from "../firebase/index";
const { storage } = firebaseApp;

export const uploadImages = async (images, folderName) => {
  let imageRefPath = [];
  let imageUrlUploaded = [];
  const currentDate = new Date().toISOString();
  const uploadTasks = await images.map(
    async (image) =>
      await storage.ref(`${folderName}/${currentDate}:${image.name}`).put(image)
  );
  const uploadTaskPromise = uploadTasks.map(async (task) => {
    await task.then(async (taskResult) => {
      imageRefPath.push(taskResult.metadata.fullPath);
      await taskResult.ref.getDownloadURL().then((downloadUrl) => {
        imageUrlUploaded.push(downloadUrl);
      });
    });
  });
  await Promise.all(uploadTaskPromise);
  return { imageRefPath, imageUrlUploaded };
};

export const deleteImageUploaded = (imagePaths) => {
  imagePaths.forEach((path) => {
    try {
      storage.ref(path).delete();
    } catch {}
  });
};
