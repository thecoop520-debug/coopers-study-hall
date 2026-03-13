import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, ArrowLeft, ArrowRight, RotateCw, ShieldCheck, Maximize2, Plus, X, Eye, EyeOff, Minimize2 } from 'lucide-react';

interface Tab {
  id: string;
  url: string;
  inputUrl: string;
  isLoading: boolean;
  title: string;
  error?: string;
}

export default function LibraryProxy() {
  const [tabs, setTabs] = useState<Tab[]>([
    { 
      id: '1', 
      url: 'https://www.google.com', 
      inputUrl: 'https://www.google.com', 
      isLoading: false,
      title: 'Google'
    }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      if (!document.fullscreenElement) {
        setShowControls(true); // Reset controls when exiting fullscreen
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const updateActiveTab = (updates: Partial<Tab>) => {
    setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, ...updates } : t));
  };

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    let target = activeTab.inputUrl;
    if (!target.startsWith('http')) {
      target = 'https://' + target;
    }
    
    let title = 'New Tab';
    try {
      title = new URL(target).hostname;
    } catch (e) {}

    updateActiveTab({ url: target, inputUrl: target, title, isLoading: true, error: undefined });
  };

  const addTab = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newTab: Tab = {
      id: newId,
      url: 'https://en.wikipedia.org/wiki/Special:Random',
      inputUrl: 'https://en.wikipedia.org/wiki/Special:Random',
      isLoading: false,
      title: 'New Tab'
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
  };

  const closeTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const proxyUrl = `/api/proxy?url=${encodeURIComponent(activeTab.url)}`;

  return (
    <div 
      ref={containerRef} 
      className={`w-full flex flex-col bg-white overflow-hidden transition-all ${isFullscreen ? 'h-screen rounded-none' : 'h-[700px] rounded-[2.5rem] border-2 border-slate-100 shadow-xl'}`}
    >
      {/* Floating Control Toggle (Only in Fullscreen) */}
      {isFullscreen && (
        <button 
          onClick={() => setShowControls(!showControls)}
          className={`fixed top-4 right-4 z-50 p-3 rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/10 shadow-2xl transition-all hover:scale-110 active:scale-95 ${!showControls ? 'opacity-40 hover:opacity-100' : ''}`}
          title={showControls ? "Hide Controls" : "Show Controls"}
        >
          {showControls ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}

      {/* Tab Bar */}
      {showControls && (
        <div className="bg-slate-950 px-4 pt-3 flex items-end gap-1 overflow-x-auto no-scrollbar shrink-0">
          {tabs.map(tab => (
            <div 
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`
                group relative flex items-center gap-2 px-4 py-2 rounded-t-xl cursor-pointer transition-all min-w-[120px] max-w-[200px]
                ${activeTabId === tab.id 
                  ? 'bg-slate-900 text-white shadow-[0_-4px_10px_rgba(0,0,0,0.3)]' 
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
              `}
            >
              <Globe size={12} className={activeTabId === tab.id ? 'text-amber-500' : 'text-slate-500'} />
              <span className="text-[10px] font-bold truncate uppercase tracking-wider flex-grow">
                {tab.title}
              </span>
              {tabs.length > 1 && (
                <button 
                  onClick={(e) => closeTab(e, tab.id)}
                  className="opacity-0 group-hover:opacity-100 hover:bg-slate-700 p-0.5 rounded-md transition-all"
                >
                  <X size={10} />
                </button>
              )}
            </div>
          ))}
          <button 
            onClick={addTab}
            className="p-2 mb-1 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            <Plus size={16} />
          </button>
        </div>
      )}

      {/* Browser Chrome */}
      {showControls && (
        <div className="bg-slate-900 p-4 flex flex-col gap-3 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-slate-400">
              <ArrowLeft size={18} className="cursor-pointer hover:text-white transition-colors" />
              <ArrowRight size={18} className="cursor-pointer hover:text-white transition-colors" />
              <RotateCw size={18} className="cursor-pointer hover:text-white transition-colors" />
              <button 
                onClick={toggleFullscreen}
                className="hover:text-white transition-colors p-1"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Library"}
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
            </div>
            <form onSubmit={handleGo} className="flex-grow relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-amber-500 transition-colors">
                <Globe size={16} />
              </div>
              <input 
                type="text" 
                value={activeTab.inputUrl}
                onChange={(e) => updateActiveTab({ inputUrl: e.target.value })}
                className="w-full bg-slate-800 text-slate-200 text-sm py-2.5 pl-11 pr-4 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500/50 focus:bg-slate-800/80 transition-all"
                placeholder="Enter research URL..."
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md uppercase tracking-tighter">
                  <ShieldCheck size={10} />
                  Secure Proxy
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Browser Content */}
      <div className="flex-grow relative bg-slate-50">
        {activeTab.isLoading && (
          <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Loading Library Resource...</p>
          </div>
        )}
        <iframe 
          key={activeTab.id}
          ref={iframeRef}
          src={proxyUrl}
          className="w-full h-full border-none"
          onLoad={() => {
            updateActiveTab({ isLoading: false });
            try {
              const currentIframeUrl = iframeRef.current?.contentWindow?.location.href;
              if (currentIframeUrl && currentIframeUrl.includes('/api/proxy?url=')) {
                const actualUrl = decodeURIComponent(currentIframeUrl.split('/api/proxy?url=')[1]);
                if (actualUrl !== activeTab.url) {
                  updateActiveTab({ url: actualUrl, inputUrl: actualUrl });
                }
              }
            } catch (e) {
              // Fallback if cross-origin or other error
            }
          }}
          title="Library Research Proxy"
        />
      </div>

      {/* Footer / Status */}
      {showControls && (
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Proxy Active: {new URL(activeTab.url).hostname}
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Tab {tabs.findIndex(t => t.id === activeTabId) + 1} of {tabs.length} • Academic Research Mode
          </div>
        </div>
      )}
    </div>
  );
}
