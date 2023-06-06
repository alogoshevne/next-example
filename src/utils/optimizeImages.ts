import formidable from 'formidable';
import sharp from 'sharp';

type ImageFieldOptions = {
  width?: number;
  height?: number;
  quality?: number;
};

export type ImageFields = {
  [key: string]: ImageFieldOptions;
};

export async function optimizeImages(
  obj: any,
  files: formidable.Files,
  imageFields: ImageFields,
) {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value === 'object') {
      // Recursively optimize nested objects
      await optimizeImages(value, files, imageFields);
    } else if (imageFields[key] && files[key]) {
      // Optimize image if it exists in files and its key is in imageFields
      const file = files[key] as formidable.File;

      if ('path' in file && typeof file.path === 'string') {
        const options = imageFields[key];

        const sharpInstance = sharp(file.path);
        const metadata = await sharpInstance.metadata();

        if (options.width || options.height) {
          sharpInstance.resize(options.width, options.height);
        }

        switch (metadata.format) {
          case 'jpeg':
            sharpInstance.jpeg({ quality: options.quality });
            break;
          case 'png':
            sharpInstance.png({ quality: options.quality });
            break;
          case 'webp':
            sharpInstance.webp({ quality: options.quality });
            break;
          default:
            sharpInstance.jpeg({ quality: options.quality });
        }

        const optimizedImage = await sharpInstance.toBuffer();
        obj[key] = optimizedImage;
      } else {
        console.warn(
          `Expected a single file for key "${key}", but received an array or an invalid object.`,
        );
      }
    }
  }
}
