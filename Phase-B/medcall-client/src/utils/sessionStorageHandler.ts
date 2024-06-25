export const setSessionStorageWithExpiry = (key: string, value: string, expiryInMinutes: number) => {
  const now = new Date();
  const expiryTime = now.getTime() + expiryInMinutes * 60 * 1000;
  const item = {
    value,
    expiry: expiryTime,
  };
  sessionStorage.setItem(key, JSON.stringify(item));
};


export const getSessionStorageWithExpiry = (key: string) => {
  const itemStr = sessionStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  
  const item = JSON.parse(itemStr);
  const now = new Date();
  
  // Compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, remove it from storage and return null
    sessionStorage.removeItem(key);
    return null;
  }
  return item.value;
};
