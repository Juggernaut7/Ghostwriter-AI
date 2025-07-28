import React, { useContext } from 'react';
import { WritingContext } from '../contexts/WritingContext';

const OutputDisplay = () => {
  const { output } = useContext(WritingContext);

  return output ? (
    <div className="mt-4 p-4 bg-[#0F0A14] border border-[#5D3FD3]/20 rounded-lg text-[#C7F9CC] font-[Inter] text-sm sm:text-base">
      {output}
    </div>
  ) : null;
};

export default OutputDisplay;