import React, { useState } from 'react';
import { BookOpen, Gamepad2, GraduationCap, Trophy, Clock, Calendar, Star, ArrowRight, Book, Brain, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import RocketLeagueGame from './components/RocketLeagueGame';
import RetroRacingGame from './components/RetroRacingGame';
import ArcadeGame169 from './components/ArcadeGame169';
import VengeIO from './components/VengeIO';
import NewGame from './components/NewGame';
import FNAEGame from './components/FNAEGame';
import IframeGame27 from './components/IframeGame27';

export default function App() {
  const [activeTab, setActiveTab] = useState('arcade');
  const [selectedGame, setSelectedGame] = useState(null);

  const stats = [
    { label: 'Study Hours', value: '12.5', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Lessons Done', value: '8', icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Arcade Score', value: '2,450', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Current Streak', value: '5 Days', icon: Star, color: 'text-rose-500', bg: 'bg-rose-50' },
  ];

  const upcomingTasks = [
    { title: 'Algebra Quiz', time: 'Tomorrow, 10:00 AM', category: 'Math' },
    { title: 'History Essay', time: 'Friday, 11:59 PM', category: 'History' },
    { title: 'Science Lab', time: 'Next Monday', category: 'Science' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-indigo-500">
      {/* Space Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>

      {/* Notebook Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-6 py-6 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500 p-2 rounded-xl text-white shadow-lg shadow-indigo-900/50">
              <GraduationCap size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Cooper's Study Time</h1>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Academic Excellence Dashboard</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            {['arcade'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`transition-all hover:text-white relative py-2 ${
                  activeTab === tab ? 'text-indigo-400' : ''
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-white">Cooper Martin</span>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">Honor Roll Student</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 shadow-sm overflow-hidden">
              <img src="https://picsum.photos/seed/student/100/100" alt="Avatar" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {activeTab === 'arcade' && (
            <motion.div
              key="arcade"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">Study Break Arcade</h2>
                  <p className="text-slate-400 text-sm mt-1">Earn high scores to unlock academic rewards!</p>
                </div>
                {selectedGame && (
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="text-xs font-bold text-amber-600 uppercase tracking-widest hover:underline flex items-center gap-2"
                  >
                    <ArrowRight size={14} className="rotate-180" />
                    Back to Library
                  </button>
                )}
              </div>

              {!selectedGame ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedGame('rocketleague')}
                    className="bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl hover:border-indigo-800 transition-all"
                  >
                    <div className="aspect-video bg-slate-950 relative overflow-hidden">
                      <img 
                        src="https://picsum.photos/seed/car/400/225" 
                        alt="Rocket League" 
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Gamepad2 size={32} />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white text-lg">Rocket League</h3>
                        <span className="text-[10px] font-bold px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded-md uppercase">Sports</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        High-octane vehicular soccer! Drive, jump, and score in this unblocked classic.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedGame('retroracing')}
                    className="bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl hover:border-indigo-800 transition-all"
                  >
                    <div className="aspect-video bg-slate-950 relative overflow-hidden">
                      <img 
                        src="https://picsum.photos/seed/racing/400/225" 
                        alt="Retro Racing" 
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Gamepad2 size={32} />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white text-lg">Retro Racing</h3>
                        <span className="text-[10px] font-bold px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded-md uppercase">Racing</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        Classic top-down racing action. Dodge traffic and set new speed records!
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedGame('neon-slope')}
                    className="bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl hover:border-indigo-800 transition-all"
                  >
                    <div className="aspect-video bg-slate-950 relative overflow-hidden">
                      <img 
                        src="https://picsum.photos/seed/neon/400/225" 
                        alt="Neon Slope" 
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Gamepad2 size={32} />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white text-lg">Neon Slope</h3>
                        <span className="text-[10px] font-bold px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded-md uppercase">Arcade</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        Fast-paced 3D runner. Navigate the neon platforms and avoid falling off!
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedGame('vengeio')}
                    className="bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl hover:border-indigo-800 transition-all"
                  >
                    <div className="aspect-video bg-slate-950 relative overflow-hidden">
                      <img 
                        src="https://picsum.photos/seed/venge/400/225" 
                        alt="Venge.io" 
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Gamepad2 size={32} />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white text-lg">Venge.io</h3>
                        <span className="text-[10px] font-bold px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded-md uppercase">FPS</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        Fast-paced 3D first-person shooter. Battle players worldwide!
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedGame('fnae')}
                    className="bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl hover:border-indigo-800 transition-all"
                  >
                    <div className="aspect-video bg-slate-950 relative overflow-hidden">
                      <img 
                        src="https://picsum.photos/seed/fnae/400/225" 
                        alt="FNAE Game" 
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Gamepad2 size={32} />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white text-lg">FNAE</h3>
                        <span className="text-[10px] font-bold px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded-md uppercase">Arcade</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        A new challenge awaits!
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedGame('game27')}
                    className="bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl hover:border-indigo-800 transition-all"
                  >
                    <div className="aspect-video bg-slate-950 relative overflow-hidden">
                      <img 
                        src="https://picsum.photos/seed/game27/400/225" 
                        alt="Geometry Dash Lite" 
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Gamepad2 size={32} />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white text-lg">Geometry Dash Lite</h3>
                        <span className="text-[10px] font-bold px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded-md uppercase">Arcade</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        A new challenge awaits!
                      </p>
                    </div>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {selectedGame === 'rocketleague' && <RocketLeagueGame />}
                  {selectedGame === 'retroracing' && <RetroRacingGame />}
                  {selectedGame === 'neon-slope' && <ArcadeGame169 />}
                  {selectedGame === 'vengeio' && <VengeIO />}
                  {selectedGame === 'newgame' && <NewGame />}
                  {selectedGame === 'fnae' && <FNAEGame />}
                  {selectedGame === 'game27' && <IframeGame27 />}
                </motion.div>
              )}

              </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white">Research Stats</h2>
                  <p className="text-slate-400 text-sm mt-1">Monitor your academic journey across the galaxy.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${stat.bg.replace('50', '950/30')}`}>
                        <stat.icon size={20} className={stat.color.replace('500', '400')} />
                      </div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab !== 'arcade' && (
            <div className="flex items-center justify-center min-h-[400px] text-slate-400 italic">
              Section coming soon...
            </div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-800 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2024 Cooper's Study Time - Academic Excellence Platform</p>
          <div className="flex gap-8">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Contact Principal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
