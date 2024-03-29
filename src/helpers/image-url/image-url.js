export const getImageUrl = (image) => {
  try {
    return URL.createObjectURL(image);
  } catch {
    return image;
  }
};

export const getImageFullPathFromUrl = (imageUrl, folderName) => {
  try {
    const indexSubStr = imageUrl.indexOf(folderName);
    const iamgePathLenght = imageUrl.indexOf("?alt") - indexSubStr;
    const imagePath = imageUrl.substr(indexSubStr, iamgePathLenght);
    return decodeURIComponent(imagePath);
  } catch {
    return null
  }
};

export const isImageOnServer = (image) => {
  try {
    URL.createObjectURL(image);
    return false;
  } catch {
    return true;
  }
};
