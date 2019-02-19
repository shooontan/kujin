interface Obj {
  [key: string]: string | number | boolean | undefined;
}

export const includeSamePropertyValue = (
  targetObj: Obj,
  checkObj: Obj | Obj[]
) => {
  if (Array.isArray(checkObj)) {
    return checkObj.some(_cObj => {
      return Object.keys(_cObj).every(_key => targetObj[_key] === _cObj[_key]);
    });
  }

  return Object.keys(checkObj).every(
    _key => targetObj[_key] === checkObj[_key]
  );
};
