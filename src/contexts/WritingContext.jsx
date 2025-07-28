import React, { createContext, useState } from 'react';

export const WritingContext = createContext();

const WritingProvider = ({ children }) => {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('');
  const [format, setFormat] = useState('');
  const [outputLength, setOutputLength] = useState('');
  const [output, setOutput] = useState('');
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <WritingContext.Provider
      value={{
        prompt,
        setPrompt,
        tone,
        setTone,
        format,
        setFormat,
        outputLength,
        setOutputLength,
        output,
        setOutput,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </WritingContext.Provider>
  );
};

export default WritingProvider;