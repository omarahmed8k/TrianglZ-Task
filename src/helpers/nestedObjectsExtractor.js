// isObject function is used to check if the value is an object or not
function isObject(value) {
  return typeof value === "object" && !Array.isArray(value) && value !== null;
}

// This function is used to extract nested objects from an object and return them as a single object
// used mostly in error handling
export default function nestedObjectsExtractor(mainObject) {
  let returnedObject = {};

  Object.keys(mainObject)?.forEach((mainObjectKey) => {
    if (isObject(mainObject[mainObjectKey])) {
      returnedObject = {
        ...returnedObject,
        ...nestedObjectsExtractor(mainObject[mainObjectKey]),
      };
    } else if (isObject(mainObject[mainObjectKey][0])) {
      returnedObject = {
        ...returnedObject,
        ...nestedObjectsExtractor(mainObject[mainObjectKey][0]),
      };
    } else {
      returnedObject = {
        ...returnedObject,
        [mainObjectKey]: mainObject[mainObjectKey][0],
      };
    }
  });

  return returnedObject;
}
