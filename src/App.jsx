import React, { useState } from 'react';
import { BookOpen, Gamepad2, GraduationCap, Trophy, Clock, Calendar, Star, ArrowRight, Book, Brain, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import RocketLeagueGame from './components/RocketLeagueGame';
import RetroRacingGame from './components/RetroRacingGame';
import ArcadeGame169 from './components/ArcadeGame169';
import LibraryProxy from './components/LibraryProxy';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
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
    <div className="min-h-screen bg-[#fdfaf1] font-sans text-slate-800 selection:bg-amber-200">
      {/* Notebook Header */}
      <header className="border-b-2 border-slate-200 bg-white px-6 py-6 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-2 rounded-xl text-white shadow-lg shadow-amber-200">
              <GraduationCap size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Cooper's Study Time</h1>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Academic Excellence Dashboard</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            {['dashboard', 'arcade', 'library', 'stats'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`transition-all hover:text-slate-900 relative py-2 ${
                  activeTab === tab ? 'text-amber-600' : ''
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-slate-900">Cooper Martin</span>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-tighter">Honor Roll Student</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
              <img src="https://picsum.photos/seed/student/100/100" alt="Avatar" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Welcome Section */}
              <section className="bg-white rounded-[2.5rem] p-8 border-2 border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
                <div className="relative z-10">
                  <h2 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Welcome back, Cooper! 👋</h2>
                  <p className="text-slate-500 max-w-lg text-lg leading-relaxed">
                    You've completed <span className="text-emerald-600 font-bold">85%</span> of your weekly goals. 
                    Keep it up and you'll unlock the <span className="text-amber-500 font-bold italic">Friday Arcade Pass</span>!
                  </p>
                  <button className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all group">
                    Continue Algebra II
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="relative w-full md:w-1/3 aspect-square max-w-[240px]">
                  <div className="absolute inset-0 bg-amber-100 rounded-full animate-pulse" />
                  <div className="absolute inset-4 bg-amber-200 rounded-full opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain size={120} className="text-amber-500" />
                  </div>
                </div>
              </section>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                      <stat.icon size={24} />
                    </div>
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Main Content Split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Courses */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">Current Courses</h3>
                    <button className="text-xs font-bold text-amber-600 uppercase tracking-widest hover:underline">View All</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: 'Advanced Algebra', progress: 75, color: 'bg-blue-500', icon: Book },
                      { title: 'World History', progress: 40, color: 'bg-rose-500', icon: BookOpen },
                      { title: 'Physics I', progress: 90, color: 'bg-emerald-500', icon: Brain },
                      { title: 'English Lit', progress: 25, color: 'bg-amber-500', icon: GraduationCap },
                    ].map((course) => (
                      <div key={course.title} className="bg-white p-5 rounded-3xl border-2 border-slate-100 group cursor-pointer hover:border-amber-200 transition-colors">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-10 h-10 rounded-xl ${course.color} text-white flex items-center justify-center`}>
                            <course.icon size={20} />
                          </div>
                          <h4 className="font-bold text-slate-800">{course.title}</h4>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            className={`${course.color} h-full`}
                          />
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Progress</span>
                          <span className="text-[10px] font-bold text-slate-900">{course.progress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Planner */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">Study Planner</h3>
                    <Calendar size={20} className="text-slate-400" />
                  </div>
                  <div className="bg-white rounded-3xl border-2 border-slate-100 p-6 space-y-6">
                    {upcomingTasks.map((task, i) => (
                      <div key={task.title} className="flex gap-4 group">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-amber-500 mt-2" />
                          {i !== upcomingTasks.length - 1 && <div className="w-0.5 flex-grow bg-slate-100 my-1" />}
                        </div>
                        <div className="pb-4">
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{task.title}</h4>
                          <p className="text-xs text-slate-400 mt-1">{task.time}</p>
                          <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 bg-slate-50 text-slate-500 rounded-md uppercase tracking-tighter">
                            {task.category}
                          </span>
                        </div>
                      </div>
                    ))}
                    <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-xs font-bold text-slate-400 hover:border-amber-300 hover:text-amber-600 transition-all">
                      + Add Study Session
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

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
                  <h2 className="text-3xl font-bold text-slate-900">Study Break Arcade</h2>
                  <p className="text-slate-500 text-sm mt-1">Earn high scores to unlock academic rewards!</p>
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
                    className="bg-white rounded-[2rem] border-2 border-slate-100 overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl hover:border-amber-200 transition-all"
                  >
                    <div className="aspect-video bg-slate-900 relative overflow-hidden">
                      <img 
                        src="https://picsum.photos/seed/car/400/225" 
                        alt="Rocket League" 
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Gamepad2 size={32} />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-slate-900 text-lg">Rocket League</h3>
                        <span className="text-[10px] font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-md uppercase">Sports</span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        High-octane vehicular soccer! Drive, jump, and score in this unblocked classic.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedGame('retroracing')}
                    className="bg-white rounded-[2rem] border-2 border-slate-100 overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all"
                  >
                    <div className="aspect-video bg-slate-900 relative overflow-hidden">
                      <img 
                        src="https://picsum.photos/seed/racing/400/225" 
                        alt="Retro Racing" 
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Gamepad2 size={32} />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-slate-900 text-lg">Retro Racing</h3>
                        <span className="text-[10px] font-bold px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md uppercase">Racing</span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        Classic top-down racing action. Dodge traffic and set new speed records!
                      </p>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedGame('neon-slope')}
                    className="bg-white rounded-[2rem] border-2 border-slate-100 overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl hover:border-rose-200 transition-all"
                  >
                    <div className="aspect-video bg-slate-900 relative overflow-hidden">
                      <img 
                        src="https://picsum.photos/seed/neon/400/225" 
                        alt="Neon Slope" 
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Gamepad2 size={32} />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-slate-900 text-lg">Neon Slope</h3>
                        <span className="text-[10px] font-bold px-2 py-1 bg-rose-100 text-rose-700 rounded-md uppercase">Arcade</span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        Fast-paced 3D runner. Navigate the neon platforms and avoid falling off!
                      </p>
                    </div>
                  </motion.div>

                  {/* Placeholder for more games */}
                  <div className="bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center opacity-60">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
                      <Star size={24} />
                    </div>
                    <h4 className="font-bold text-slate-400 text-sm">More Games Coming Soon</h4>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Unlock with Study Hours</p>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {selectedGame === 'rocketleague' && <RocketLeagueGame />}
                  {selectedGame === 'retroracing' && <RetroRacingGame />}
                  {selectedGame === 'neon-slope' && <ArcadeGame169 />}
                </motion.div>
              )}

              <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Trophy size={18} className="text-amber-500" />
                  Arcade Rewards
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Top Score</div>
                    <div className="text-lg font-bold text-slate-900">15m Break</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Win 3 Matches</div>
                    <div className="text-lg font-bold text-slate-900">Avatar Badge</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">Daily Play</div>
                    <div className="text-lg font-bold text-slate-900">+50 XP</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'library' && (
            <motion.div
              key="library"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Research Library</h2>
                  <p className="text-slate-500 text-sm mt-1">Access global knowledge through our secure academic proxy.</p>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-4 py-2 rounded-2xl">
                  <ShieldCheck size={18} />
                  <span>Research Mode Active</span>
                </div>
              </div>
              <LibraryProxy />
            </motion.div>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'arcade' && activeTab !== 'library' && (
            <div className="flex items-center justify-center min-h-[400px] text-slate-400 italic">
              Section coming soon...
            </div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-200 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2024 Cooper's Study Time - Academic Excellence Platform</p>
          <div className="flex gap-8">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer">Contact Principal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
