export const getLocalTimeForTimezone = (timezoneOffsetSeconds: number) => {
  // 1. Get current UTC time in milliseconds
  const utcNow = Date.now();
  
  // 2. Get local timezone offset in milliseconds
  const localOffsetMs = new Date().getTimezoneOffset() * 60 * 1000;
  
  // 3. Convert API timezone offset to milliseconds
  const targetOffsetMs = timezoneOffsetSeconds * 1000;
  
  // 4. Calculate the correct timestamp
  const targetTime = utcNow + localOffsetMs + targetOffsetMs;
  
  return new Date(targetTime);
};