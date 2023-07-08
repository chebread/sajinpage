const isEmptyObject = (obj: Object) => {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return false;
  }

  return true;
};

export default isEmptyObject;
