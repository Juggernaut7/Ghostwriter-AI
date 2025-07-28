export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('user', JSON.stringify({ email }));
    return { success: true };
  }
  return { success: false, message: 'Invalid email or password' };
};

export const signupUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find((u) => u.email === email)) {
    return { success: false, message: 'Email already exists' };
  }
  users.push({ email, password });
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('user', JSON.stringify({ email }));
  return { success: true };
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};