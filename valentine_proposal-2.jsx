import React, { useState, useEffect } from 'react';

export default function ValentineProposal() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isHoveringNo, setIsHoveringNo] = useState(false);

  // Generate random floating roses
  const roses = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    size: 20 + Math.random() * 20,
  }));

  const handleNoClick = () => {
    setNoClickCount(prev => prev + 1);
  };

  const handleNoHover = () => {
    if (noClickCount > 0) {
      setIsHoveringNo(true);
      const randomX = (Math.random() - 0.5) * 200;
      const randomY = (Math.random() - 0.5) * 200;
      setNoButtonPosition({ x: randomX, y: randomY });
    }
  };

  const handleYesClick = () => {
    setShowSuccess(true);
  };

  const yesButtonScale = 1 + (noClickCount * 0.3);

  if (showSuccess) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-200 via-red-200 to-pink-300">
        {/* Floating Roses Background */}
        {roses.map((rose) => (
          <div
            key={rose.id}
            className="absolute text-4xl opacity-70 animate-float"
            style={{
              left: `${rose.left}%`,
              animationDelay: `${rose.delay}s`,
              animationDuration: `${rose.duration}s`,
              fontSize: `${rose.size}px`,
            }}
          >
            🌹
          </div>
        ))}

        {/* Success Message */}
        <div className="z-10 text-center animate-fadeIn">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl max-w-2xl mx-4">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent animate-pulse">
              Now you made me smile 💖🌹
            </h1>
            <div className="text-8xl mb-4 animate-bounce">
              😊
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(100vh) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.7;
            }
            90% {
              opacity: 0.7;
            }
            100% {
              transform: translateY(-20vh) rotate(360deg);
              opacity: 0;
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-float {
            animation: float linear infinite;
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease-out;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-200 via-red-200 to-pink-300">
      {/* Floating Roses Background */}
      {roses.map((rose) => (
        <div
          key={rose.id}
          className="absolute text-4xl opacity-70 animate-float pointer-events-none"
          style={{
            left: `${rose.left}%`,
            animationDelay: `${rose.delay}s`,
            animationDuration: `${rose.duration}s`,
            fontSize: `${rose.size}px`,
          }}
        >
          🌹
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          {/* Proposal Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 mb-8 animate-slideIn">
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 bg-clip-text text-transparent">
                Dear Oyindamola 💕
              </h1>
              
              <div className="space-y-4 text-lg md:text-xl text-gray-700 leading-relaxed">
                <p className="font-light">
                  I was going to keep this low-key… but you deserve something intentional.
                </p>
                <p className="font-light">
                  So here it is, straight from my heart:
                </p>
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mt-6">
                  Will you be my Valentine? 🌹
                </p>
              </div>
            </div>

            {/* Video Section */}
            <div className="my-8 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <video 
                  src="/mnt/user-data/uploads/VID-20260206-WA0005.mp4" 
                  controls 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center gap-6 mt-12">
              <div className="flex items-center justify-center gap-6 w-full">
                {/* Yes Button */}
                <button
                  onClick={handleYesClick}
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  style={{
                    transform: `scale(${yesButtonScale})`,
                    transition: 'transform 0.3s ease-out',
                  }}
                >
                  Yes 💖
                </button>

                {/* No Button */}
                <button
                  onClick={handleNoClick}
                  onMouseEnter={handleNoHover}
                  className="bg-gray-300 text-gray-700 px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  style={{
                    transform: isHoveringNo && noClickCount > 0 
                      ? `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)` 
                      : 'translate(0, 0)',
                    transition: isHoveringNo ? 'transform 0.2s ease-out' : 'transform 0.3s ease-in-out',
                  }}
                  onMouseLeave={() => {
                    setIsHoveringNo(false);
                    setNoButtonPosition({ x: 0, y: 0 });
                  }}
                >
                  {noClickCount === 0 ? 'No' : 'Are you sure?'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Outfit:wght@300;400;700&display=swap');
        
        * {
          font-family: 'Outfit', sans-serif;
        }
        
        h1 {
          font-family: 'Playfair Display', serif;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-20vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-slideIn {
          animation: slideIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
