export function objectsEqual<T>(obj1: T, obj2: T): boolean {
  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // If the objects have different number of keys, they are not equal
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check each key-value pair of the objects
  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    // If the property values are objects, recursively check their properties
    if (typeof val1 === 'object' && typeof val2 === 'object') {
      if (!objectsEqual(val1, val2)) {
        return false;
      }
    } else {
      // Otherwise, compare the property values
      if (val1 !== val2) {
        return false;
      }
    }
  }

  // If we made it this far, the objects are equal
  return true;
}

export function clearEmptyProperties(obj: { [key: string]: any }): { [key: string]: any } {
  const result = {};
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== '') {
      result[key] = obj[key];
    }
  }
  return result;
}
