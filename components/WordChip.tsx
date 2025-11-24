import React from 'react';
import { WordItem } from '../types';

interface WordChipProps {
  word: WordItem;
}

export const WordChip: React.FC<WordChipProps> = ({ word }) => {
  return (
    <div
      className={`
        relative px-3 py-2 m-1 rounded-2xl text-2xl md:text-3xl transition-all duration-500 ease-in-out select-none
        ${word.isHidden 
          ? 'bg-sky-200 text-sky-400 transform scale-95 shadow-inner' 
          : 'bg-white text-gray-800 shadow-md transform hover:-translate-y-1 hover:shadow-lg'
        }
      `}
    >
      {word.isHidden ? (
        <span className="tracking-widest font-bold opacity-70">
          {'O'.repeat(word.text.length)}
        </span>
      ) : (
        <span>{word.text}</span>
      )}
    </div>
  );
};
