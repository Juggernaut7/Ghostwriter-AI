import React, { useContext, useState } from 'react';
import { WritingContext } from '../contexts/WritingContext';
import { AuthContext } from '../contexts/AuthContext';
import { generateText } from '../utils/generateText';
import { saveToLocalStorage } from '../utils/storage';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Loader from './ui/Loader';
import { Copy, Download } from 'lucide-react';
import { toast } from 'react-toastify';

const SidebarControls = ({ isOpen, toggleSidebar }) => {
  const { prompt, setPrompt, tone, setTone, format, setFormat, outputLength, setOutputLength, output, setOutput } = useContext(WritingContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const tones = ['Professional', 'Casual', 'Witty', 'Poetic'];
  const formats = ['Blog', 'Tweet', 'Caption', 'Essay'];
  const lengths = ['Short', 'Medium', 'Long'];

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const generatedText = await generateText(prompt, tone, format, outputLength);
      setOutput(generatedText);
      if (isAuthenticated) {
        saveToLocalStorage('promptHistory', { prompt, tone, format, outputLength, output: generatedText });
        toast.success('Text generated and saved to history!');
      } else {
        toast.success('Text generated! Sign up to save your history.');
      }
    } catch (error) {
      toast.error(error.message || 'Error generating text. Please try again.');
      setOutput('Error generating text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success('Text copied to clipboard!');
  };

  const handleExport = () => {
    const filename = `GhostWriter_${Date.now()}`;
    const extension = format === 'Tweet' ? 'txt' : 'md';
    saveToLocalStorage('exports', { content: output, filename, extension });
    toast.success(`Exported as ${filename}.${extension}`);
    const blob = new Blob([output], { type: `text/${extension}` });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${extension}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        />
      )}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#0F0A14] border-r border-[#5D3FD3]/20 flex flex-col p-4 gap-4 z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <Input
          placeholder="Enter your prompt or topic..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full text-[#C7F9CC] bg-[#1A1324] border-[#5D3FD3]"
        />
        <Select
          options={tones}
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          placeholder="Select tone"
          className="w-full text-[#C7F9CC] bg-[#1A1324] border-[#5D3FD3]"
        />
        <Select
          options={formats}
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          placeholder="Select format"
          className="w-full text-[#C7F9CC] bg-[#1A1324] border-[#5D3FD3]"
        />
        <Select
          options={lengths}
          value={outputLength}
          onChange={(e) => setOutputLength(e.target.value)}
          placeholder="Select length"
          className="w-full text-[#C7F9CC] bg-[#1A1324] border-[#5D3FD3]"
        />
        <Button
          onClick={handleGenerate}
          disabled={isLoading || !prompt}
          className="bg-[#5D3FD3] hover:bg-[#4B32A8] text-[#C7F9CC] font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          {isLoading ? <Loader /> : 'Generate'}
        </Button>
        {output && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCopy}
              className="flex-1 text-[#C7F9CC] border-[#5D3FD3] hover:bg-[#5D3FD3]/20"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button
              variant="outline"
              onClick={handleExport}
              className="flex-1 text-[#C7F9CC] border-[#5D3FD3] hover:bg-[#5D3FD3]/20"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        )}
      </aside>
    </>
  );
};

export default SidebarControls;