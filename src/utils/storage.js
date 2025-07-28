export const saveToLocalStorage = (key, value) => {
  const history = JSON.parse(localStorage.getItem(key) || '[]');
  history.push(value);
  localStorage.setItem(key, JSON.stringify(history));
};

export const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key) || '[]');
};

export const exportAsFile = (content, type, filename) => {
  const blob = new Blob([content], { type: `text/${type}` });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.${type}`;
  a.click();
  window.URL.revokeObjectURL(url);
};