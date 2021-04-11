export default (arr: any) => {
  arr = new Uint8Array(arr);
  return btoa(
    arr.reduce((data: any, byte: any) => data + String.fromCharCode(byte), "")
  );
};
