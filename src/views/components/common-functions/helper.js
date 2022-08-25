export const convertToKeyValuePair = (data, key) => {
  if (!data) return [];
  const newArray = data.map((item) => { return { label: item[key], value: item._id } })
  return newArray
}

export const convertToBrowserTimezone = (date, split = false) => {
  if (!date) return;
  const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  date = new Date(date).toLocaleString('en-US', { timeZone: currentTimezone });
  if (split) date = String(date).split(',')[0];
  return date;
}