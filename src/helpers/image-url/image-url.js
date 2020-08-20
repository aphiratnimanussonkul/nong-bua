export const getImageUrl = (image) => {
  try {
    return URL.createObjectURL(image);
  } catch {
    return image;
  }
};
