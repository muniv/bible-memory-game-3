import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { RefreshCcw, Star, ChevronRight } from 'lucide-react';
import { VERSE_REFERENCE, VERSE_TEXT, DECORATIONS } from './constants';
import { WordItem, GameState } from './types';
import { WordChip } from './components/WordChip';
import { ProgressBar } from './components/ProgressBar';

const App: React.FC = () => {
  const [words, setWords] = useState<WordItem[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.PLAYING);
  
  // Initialize verse text into interactive word objects
  const initializeWords = useCallback(() => {
    const wordArray = VERSE_TEXT.split(' ').map((text, index) => ({
      id: index,
      text,
      isHidden: false,
    }));
    setWords(wordArray);
    setGameState(GameState.PLAYING);
  }, []);

  useEffect(() => {
    initializeWords();
  }, [initializeWords]);

  // Check for completion
  useEffect(() => {
    if (words.length > 0 && words.every((w) => w.isHidden)) {
      setGameState(GameState.COMPLETED);
      launchConfetti();
    }
  }, [words]);

  const launchConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#38bdf8', '#fbbf24', '#f472b6']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#38bdf8', '#fbbf24', '#f472b6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleLevelUp = () => {
    if (gameState === GameState.COMPLETED) return;

    // Find all currently visible words
    const visibleWords = words.filter(w => !w.isHidden);
    
    if (visibleWords.length === 0) return;

    // Pick a random word from the visible ones to hide
    const randomIndex = Math.floor(Math.random() * visibleWords.length);
    const wordToHideId = visibleWords[randomIndex].id;

    setWords(prevWords => 
      prevWords.map(word => 
        word.id === wordToHideId ? { ...word, isHidden: true } : word
      )
    );
  };

  const hiddenCount = words.filter(w => w.isHidden).length;
  const isAllHidden = words.length > 0 && hiddenCount === words.length;

  return (
    <div className="min-h-screen bg-sky-100 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 text-4xl opacity-50 animate-bounce delay-100">☁️</div>
      <div className="absolute top-20 right-20 text-5xl opacity-50 animate-bounce delay-700">🕊️</div>
      <div className="absolute bottom-10 left-20 text-4xl opacity-40 animate-pulse">✨</div>

      {/* Main Card */}
      <main className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 w-full max-w-4xl flex flex-col items-center border-4 border-sky-200 z-10 relative">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="bg-yellow-100 text-yellow-600 px-4 py-1 rounded-full text-lg font-bold mb-3 shadow-sm inline-flex items-center gap-2">
            <Star className="w-5 h-5 fill-yellow-500" />
            이번 주 암송 구절
            <Star className="w-5 h-5 fill-yellow-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sky-600 drop-shadow-sm mb-2">
            {VERSE_REFERENCE}
          </h1>
        </div>

        {/* Progress Bar */}
        <ProgressBar total={words.length} hiddenCount={hiddenCount} />

        {/* Verse Display */}
        <div className="flex flex-wrap justify-center content-center gap-y-2 mb-10 min-h-[200px] w-full bg-sky-50/50 rounded-2xl p-6 border-2 border-dashed border-sky-200">
          {words.map((word) => (
            <WordChip key={word.id} word={word} />
          ))}
        </div>

        {/* Success Message overlay */}
        {gameState === GameState.COMPLETED && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-3xl animate-in fade-in duration-500">
             <div className="bg-white border-4 border-yellow-300 p-8 rounded-3xl shadow-xl text-center transform scale-110">
                <h2 className="text-4xl font-bold text-sky-600 mb-2">참 잘했어요! 🎉</h2>
                <p className="text-xl text-gray-600">말씀을 모두 암송했네요.</p>
             </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-4 w-full justify-center mt-2 z-30">
          <button
            onClick={initializeWords}
            className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xl transition-all active:scale-95 shadow-md border-b-4 border-gray-300"
            aria-label="Reset"
          >
            <RefreshCcw className="w-6 h-6" />
            <span className="hidden sm:inline">다시하기</span>
          </button>

          <button
            onClick={handleLevelUp}
            disabled={isAllHidden}
            className={`
              flex-1 max-w-xs flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-2xl transition-all shadow-lg border-b-4
              ${isAllHidden 
                ? 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-400 border-green-700 text-white active:scale-95 active:border-b-0 active:translate-y-1'
              }
            `}
          >
            <span>{isAllHidden ? '완료!' : '암송 단계 올리기'}</span>
            {!isAllHidden && <ChevronRight className="w-8 h-8" />}
          </button>
        </div>
        
      </main>

      {/* Footer */}
      <footer className="mt-8 text-sky-700 font-medium text-lg flex items-center gap-2 opacity-80">
        <span className="text-2xl">{DECORATIONS[0]}</span>
        매일매일 말씀과 함께 자라나요
        <span className="text-2xl">{DECORATIONS[2]}</span>
      </footer>
    </div>
  );
};

export default App;
