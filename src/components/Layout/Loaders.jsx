import React from 'react';
import { PulseLoader } from 'react-spinners';

const TypingLoader = () => {
  return (
    <div className="flex items-baseline gap-2 px-4 py-2">
      <span className="text-gray-500">Typing</span>
      <div className="relative top-[2px]">
        <PulseLoader size={6} color="#888" />
      </div>
    </div>
  );
};


export {TypingLoader};



