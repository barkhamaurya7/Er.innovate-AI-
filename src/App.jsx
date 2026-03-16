import React, { useState, useEffect } from 'react';
import {
  Brain, Zap, BookOpen, Youtube, Copy, Download, Share2,
  Menu, X, ChevronRight, Sparkles, Code, PenTool, LayoutList, MessageSquare, AlertCircle
} from 'lucide-react';

const toolsList = [
  { icon: Brain, title: "Mnemonic Generator", desc: "Generate memory tricks instantly.", color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/10", active: true },
  { icon: MessageSquare, title: "AI Concept Simplifier", desc: "Explain difficult topics in simple Hinglish.", color: "text-purple-400", border: "border-purple-400/30", bg: "bg-purple-400/10" },
  { icon: PenTool, title: "AI Answer Writer", desc: "Generate UPSC mains style answers.", color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/10" },
  { icon: LayoutList, title: "Revision Notes Generator", desc: "Turn long text into quick notes.", color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/10" },
  { icon: Code, title: "Quiz Generator", desc: "Auto-generate practice questions.", color: "text-pink-400", border: "border-pink-400/30", bg: "bg-pink-400/10" },
  { icon: Youtube, title: "YouTube Script Writer", desc: "Turn concepts into viral educational reels.", color: "text-[#FF004F]", border: "border-[#FF004F]/30", bg: "bg-[#FF004F]/10" },
];

const examTypes = ['UPSC', 'State PCS', 'SSC CGL', 'Banking'];

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  // API Key is now a state variable so the user can input it 
  const [apiKey, setApiKey] = useState('AIzaSyDvkM4AbOs3UoG5DsfRVd8VG3wdWosjcdI');

  // Form State
  const [formData, setFormData] = useState({
    topic: '',
    keywords: '',
    exam: 'UPSC',
    language: 'Hinglish',
    style: 'Funny'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateTrick = async () => {
    if (!apiKey.trim()) {
      setError("AIzaSyDvkM4AbOs3UoG5DsfRVd8VG3wdWosjcdI");
      return;
    }

    if (!formData.topic.trim()) {
      setError("Please enter a topic.");
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const prompt = `
      Act as an expert tutor for ${formData.exam} and competitive exams.
      Create memory tricks and mnemonics for the following topic.
      
      Topic: ${formData.topic}
      Keywords (optional): ${formData.keywords}
      Target Exam: ${formData.exam}
      Preferred Language: ${formData.language}
      Style: ${formData.style}

      Provide a detailed response that includes an English mnemonic, a Hinglish mnemonic (if applicable, else a simpler English one), a short story trick, a brief explanation of how the mnemonic maps to the concepts, and a short script suitable for a YouTube Short or Instagram Reel.
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: {
              parts: [{ text: "You are a creative AI tutor. Always output your response in valid JSON format matching the requested schema." }]
            },
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: {
                type: "OBJECT",
                properties: {
                  englishMnemonic: { type: "STRING" },
                  hinglishMnemonic: { type: "STRING" },
                  storyTrick: { type: "STRING" },
                  explanation: { type: "STRING" },
                  youtubeScript: { type: "STRING" },
                  reelCaption: { type: "STRING" }
                },
                required: ["englishMnemonic", "hinglishMnemonic", "storyTrick", "explanation", "youtubeScript", "reelCaption"]
              }
            }
          })
        }
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error?.message || `API Request Failed: ${response.status}`);
      }

      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!generatedText) {
        throw new Error("Received an empty response from the AI model.");
      }

      // Clean up markdown JSON wrapper if present (common issue with LLM JSON outputs)
      const cleanedText = generatedText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      try {
        const parsedResult = JSON.parse(cleanedText);
        setResult(parsedResult);
      } catch (parseError) {
        throw new Error("Failed to parse the AI response. Original text was clearly not JSON.");
      }

    } catch (err) {
      setError(err.message || "Failed to generate trick. Please try again or check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, label) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopyFeedback(`Copied ${label}!`);
        setTimeout(() => setCopyFeedback(''), 2000);
      });
    } else {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopyFeedback(`Copied ${label}!`);
      setTimeout(() => setCopyFeedback(''), 2000);
    }
  };

  const downloadNotes = () => {
    if (!result) return;
    const content = `
Topic: ${formData.topic}
Exam: ${formData.exam}

English Mnemonic:
${result.englishMnemonic}

Hinglish Mnemonic:
${result.hinglishMnemonic}

Story Trick:
${result.storyTrick}

Explanation:
${result.explanation}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.topic.replace(/\s+/g, '_')}_Tricks.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans selection:bg-purple-500/30 selection:text-white pb-20">

      {/* ==================== NAVBAR ==================== */}
      <nav className="sticky top-0 z-50 bg-[#0F172A]/90 backdrop-blur-md border-b border-purple-500/30 shadow-[0_4px_20px_rgba(157,78,221,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setCurrentView('home')}
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 mr-3 shadow-[0_0_15px_rgba(157,78,221,0.6)] animate-pulse">
                <Sparkles className="text-yellow-400 w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-500 drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                Er.innovate AI
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => setCurrentView('home')} className={`text-sm font-semibold transition-colors ${currentView === 'home' ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]' : 'text-slate-300 hover:text-white'}`}>Home</button>
              <button onClick={() => setCurrentView('generator')} className={`text-sm font-semibold transition-colors ${currentView === 'generator' ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]' : 'text-slate-300 hover:text-white'}`}>AI Tricks</button>
              <button onClick={() => setCurrentView('tools')} className={`text-sm font-semibold transition-colors ${currentView === 'tools' ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]' : 'text-slate-300 hover:text-white'}`}>UPSC Tools</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="transition-opacity duration-300">

        {/* ==================== HOME VIEW ==================== */}
        {currentView === 'home' && (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4">
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative inline-block mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-purple-600 rounded-full blur opacity-40 animate-pulse"></div>
              <div className="relative bg-[#0F172A] border border-purple-500/50 rounded-full px-6 py-2 text-sm font-medium text-purple-300 flex items-center">
                <Zap className="w-4 h-4 text-yellow-400 mr-2" />
                AI Study Tools for Smart Learning
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
              Learn Faster with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-purple-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                AI-Generated Tricks
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 px-4">
              Generate mnemonics, memory tricks, and short stories for UPSC, State PCS, and competitive exams instantly. Never forget a concept again.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
              <button
                onClick={() => setCurrentView('generator')}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(157,78,221,0.5)] transition-all hover:scale-105 flex items-center justify-center transform active:scale-95"
              >
                <Brain className="mr-2 w-5 h-5" />
                Generate Tricks
              </button>
              <button
                onClick={() => setCurrentView('tools')}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-slate-700 hover:border-yellow-400 text-slate-300 hover:text-yellow-400 font-bold rounded-xl transition-all flex items-center justify-center transform active:scale-95"
              >
                Explore UPSC Tools
                <ChevronRight className="ml-2 w-4 h-4" />
              </button>
            </div>

            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full opacity-60 px-4">
              {examTypes.map(exam => (
                <div key={exam} className="bg-slate-800/50 border border-slate-700 rounded-lg py-3 text-sm font-semibold text-slate-400 cursor-default hover:text-white transition-colors">
                  {exam}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== GENERATOR VIEW ==================== */}
        {currentView === 'generator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold text-white mb-4">🧠 AI Tricks Generator</h2>
              <p className="text-slate-400">Turn complex topics into easy-to-remember stories and mnemonics.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Input Section */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-[#1E293B] border border-purple-500/30 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(157,78,221,0.15)]">
                  <div className="space-y-4">

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Topic</label>
                      <input
                        type="text"
                        name="topic"
                        value={formData.topic}
                        onChange={handleInputChange}
                        placeholder="e.g., Indian National Movement"
                        className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Keywords (Optional)</label>
                      <input
                        type="text"
                        name="keywords"
                        value={formData.keywords}
                        onChange={handleInputChange}
                        placeholder="e.g., 1885, INC, Moderates"
                        className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Exam Type</label>
                        <select name="exam" value={formData.exam} onChange={handleInputChange} className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 cursor-pointer">
                          <option>UPSC</option>
                          <option>State PCS</option>
                          <option>SSC</option>
                          <option>Railway</option>
                          <option>School</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Language</label>
                        <select name="language" value={formData.language} onChange={handleInputChange} className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 cursor-pointer">
                          <option>English</option>
                          <option>Hinglish</option>
                          <option>Hindi</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Style</label>
                      <select name="style" value={formData.style} onChange={handleInputChange} className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 cursor-pointer">
                        <option>Funny</option>
                        <option>Story Based</option>
                        <option>Short Trick</option>
                        <option>Acronym</option>
                      </select>
                    </div>

                    <div className="pt-4 border-t border-slate-700/50">
                      <label className="block text-sm font-medium text-slate-300 mb-1 text-purple-400 flex items-center">
                        API Key required
                      </label>
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter Gemini API Key..."
                        className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                      />
                      <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                        Don't have one? Get a free key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 underline underline-offset-2">Google AI Studio</a>.
                      </p>
                    </div>

                    <button
                      onClick={generateTrick}
                      disabled={loading}
                      className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-[#0F172A] font-black py-4 rounded-xl shadow-[0_0_15px_rgba(255,215,0,0.4)] transition-all flex justify-center items-center disabled:opacity-70 transform active:scale-95"
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <Zap className="animate-pulse mr-2 w-5 h-5" /> Generating...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Sparkles className="mr-2 w-5 h-5" /> Generate AI Trick
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Output Section */}
              <div className="lg:col-span-8">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6 flex items-start animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 mr-3 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-400 mb-1">Error Generating Trick</h4>
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {!result && !loading && (
                  <div className={`h-full min-h-[400px] border-2 border-dashed ${error ? 'border-red-500/20' : 'border-slate-700'} rounded-2xl flex flex-col items-center justify-center text-slate-500 p-8 transition-colors duration-500`}>
                    <Brain className={`w-16 h-16 mb-4 opacity-50 ${error ? 'text-red-500/50' : 'text-purple-500'}`} />
                    <p className="text-lg">Your AI-generated tricks will appear here.</p>
                    <p className="text-sm mt-2 text-slate-600">Enter a topic, provide your API key, and hit generate!</p>
                  </div>
                )}

                {loading && (
                  <div className="h-full min-h-[400px] bg-[#1E293B] border border-purple-500/30 rounded-2xl flex flex-col items-center justify-center p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-[shimmer_2s_infinite] w-[200%] -ml-[50%]"></div>
                    <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(255,215,0,0.5)]"></div>
                    <p className="text-yellow-400 font-medium animate-pulse tracking-wide">Consulting AI Brain...</p>
                  </div>
                )}

                {result && !loading && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    {/* Top actions */}
                    <div className="flex justify-between items-center bg-[#1E293B] p-4 rounded-xl border border-slate-700 shadow-sm">
                      <span className="text-green-400 font-medium flex items-center">
                        <Zap className="w-4 h-4 mr-2" /> Generated Successfully
                      </span>
                      <div className="flex space-x-2">
                        <button onClick={downloadNotes} className="p-2 text-slate-300 hover:text-yellow-400 hover:bg-slate-800 rounded-lg transition-colors" title="Download Notes">
                          <Download className="w-5 h-5" />
                        </button>
                        <button onClick={() => copyToClipboard(JSON.stringify(result, null, 2), 'Everything')} className="p-2 text-slate-300 hover:text-yellow-400 hover:bg-slate-800 rounded-lg transition-colors" title="Copy All">
                          <Copy className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {copyFeedback && (
                      <div className="fixed bottom-20 md:bottom-8 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-[0_4px_20px_rgba(34,197,94,0.4)] z-50 animate-in fade-in slide-in-from-bottom-2 font-medium">
                        {copyFeedback}
                      </div>
                    )}

                    {/* Mnemonics Cards */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-6 rounded-2xl border border-purple-500/40 relative group hover:border-yellow-400/50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(157,78,221,0.2)]">
                        <button onClick={() => copyToClipboard(result.englishMnemonic, 'English Mnemonic')} className="absolute top-4 right-4 text-slate-500 hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Copy className="w-4 h-4" />
                        </button>
                        <h3 className="text-sm text-purple-400 font-bold tracking-wider uppercase mb-3 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" /> English Mnemonic
                        </h3>
                        <p className="text-xl text-white font-medium leading-relaxed">"{result.englishMnemonic}"</p>
                      </div>

                      <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-6 rounded-2xl border border-blue-500/40 relative group hover:border-yellow-400/50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                        <button onClick={() => copyToClipboard(result.hinglishMnemonic, 'Hinglish Mnemonic')} className="absolute top-4 right-4 text-slate-500 hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Copy className="w-4 h-4" />
                        </button>
                        <h3 className="text-sm text-blue-400 font-bold tracking-wider uppercase mb-3 flex items-center">
                          <Zap className="w-4 h-4 mr-2" /> Hinglish Trick
                        </h3>
                        <p className="text-xl text-white font-medium leading-relaxed">"{result.hinglishMnemonic}"</p>
                      </div>
                    </div>

                    {/* Explanation Card */}
                    <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-700 relative group hover:border-slate-500 transition-colors shadow-sm">
                      <button onClick={() => copyToClipboard(result.explanation, 'Explanation')} className="absolute top-4 right-4 text-slate-500 hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Copy className="w-4 h-4" />
                      </button>
                      <h3 className="text-sm text-yellow-400 font-bold tracking-wider uppercase mb-4 flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2" /> Explanation
                      </h3>
                      <div className="text-slate-300 space-y-2 whitespace-pre-wrap font-mono text-sm bg-[#0F172A] p-4 rounded-xl border border-slate-800/80 leading-relaxed shadow-inner">
                        {result.explanation}
                      </div>
                    </div>

                    {/* Story Trick Card */}
                    <div className="bg-[#1E293B] p-6 rounded-2xl border border-slate-700 relative group hover:border-green-500/50 transition-colors shadow-sm">
                      <button onClick={() => copyToClipboard(result.storyTrick, 'Story')} className="absolute top-4 right-4 text-slate-500 hover:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Copy className="w-4 h-4" />
                      </button>
                      <h3 className="text-sm text-green-400 font-bold tracking-wider uppercase mb-4 flex items-center">
                        <Brain className="w-4 h-4 mr-2" /> Story Trick
                      </h3>
                      <p className="text-slate-200 leading-relaxed italic border-l-4 border-green-500 pl-4 py-1 text-lg">
                        {result.storyTrick}
                      </p>
                    </div>

                    {/* Viral YouTube Shorts Feature */}
                    <div className="bg-gradient-to-r from-red-900/30 to-purple-900/30 p-6 rounded-2xl border border-red-500/40 shadow-[0_0_20px_rgba(255,0,79,0.1)] relative group hover:border-red-500/60 transition-colors">
                      <button onClick={() => copyToClipboard(result.youtubeScript, 'Script')} className="absolute top-4 right-4 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Copy className="w-4 h-4" />
                      </button>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm text-[#FF004F] font-bold tracking-wider uppercase flex items-center">
                          <Youtube className="w-5 h-5 mr-2" /> AI Trick → YouTube Shorts Script
                        </h3>
                        <span className="text-xs bg-red-500/20 text-red-300 px-2.5 py-1 rounded-md border border-red-500/30 font-semibold shadow-sm">Viral Feature</span>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <p className="text-sm text-slate-400 mb-2 font-medium">Voiceover Script:</p>
                          <div className="bg-black/40 p-5 rounded-xl text-slate-200 font-medium whitespace-pre-wrap border border-slate-700/80 leading-relaxed shadow-inner">
                            {result.youtubeScript}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-slate-400 mb-2 font-medium">Reel Caption:</p>
                          <div className="bg-black/40 p-5 rounded-xl text-sm text-slate-300 border border-slate-700/80 h-full shadow-inner flex flex-col justify-between">
                            <div className="mb-4">{result.reelCaption}</div>
                            <span className="text-blue-400 font-medium select-all">#UPSC #ErInnovateAI #StudyTricks</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TOOLS VIEW ==================== */}
        {currentView === 'tools' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12 sm:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">UPSC Smart Study Tools</h2>
              <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto px-4">An entire suite of AI-powered tools designed to cut down your revision time by 80%.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
              {toolsList.map((tool, idx) => (
                <div key={idx} className={`bg-[#1E293B] p-6 rounded-2xl border ${tool.active ? 'border-purple-500/50 shadow-[0_0_15px_rgba(157,78,221,0.15)] hover:shadow-[0_8px_30px_rgba(157,78,221,0.2)]' : 'border-slate-700'} hover:border-slate-500 transition-all cursor-pointer group`} onClick={() => tool.active && setCurrentView('generator')}>
                  <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className={`w-6 h-6 ${tool.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-between">
                    <span className="truncate pr-2">{tool.title}</span>
                    {tool.active && <span className="text-[10px] sm:text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full border border-purple-500/20 whitespace-nowrap">Active</span>}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm lg:text-base">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation (Visible on mobile only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0F172A]/95 backdrop-blur-md border-t border-slate-800 flex justify-around p-2 z-50">
        <button onClick={() => setCurrentView('home')} className={`flex flex-col items-center p-2 transition-colors ${currentView === 'home' ? 'text-yellow-400' : 'text-slate-500 hover:text-slate-300'}`}>
          <BookOpen className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => setCurrentView('generator')} className={`flex flex-col items-center p-2 transition-colors ${currentView === 'generator' ? 'text-yellow-400' : 'text-slate-500 hover:text-slate-300'}`}>
          <Zap className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">Generate</span>
        </button>
        <button onClick={() => setCurrentView('tools')} className={`flex flex-col items-center p-2 transition-colors ${currentView === 'tools' ? 'text-yellow-400' : 'text-slate-500 hover:text-slate-300'}`}>
          <LayoutList className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">Tools</span>
        </button>
      </div>
    </div>
  );
}
