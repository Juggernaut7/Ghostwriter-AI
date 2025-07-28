import React, { useContext } from 'react';
import { WritingContext } from '../contexts/WritingContext';
import Textarea from './ui/Textarea';
import OutputDisplay from './OutputDisplay';

const Editor = () => {
  const { output, setOutput } = useContext(WritingContext);

  return (
    <div className="bg-[#1A1324] border border-[#5D3FD3]/20 rounded-lg p-4 sm:p-6 min-h-[50vh]">
      <Textarea
        value={output}
        onChange={(e) => setOutput(e.target.value)}
        placeholder="Your generated text will appear here..."
        className="w-full min-h-[40vh] bg-transparent text-[#C7F9CC] border-none focus:ring-0 resize-none font-[Inter] text-sm sm:text-base"
      />
      <OutputDisplay />
    </div>
  );
};

export default Editor;