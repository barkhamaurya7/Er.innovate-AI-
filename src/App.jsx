import React, { useState, useEffect, useRef } from 'react';
import {
  Brain, Zap, BookOpen, Youtube, Copy, Download, Share2,
  Menu, X, ChevronRight, Sparkles, Code, PenTool, LayoutList, MessageSquare, AlertCircle,
  HelpCircle, CheckCircle2, ChevronLeft, Printer, FileText, UploadCloud
} from 'lucide-react';

const toolsList = [
  { icon: Brain, title: "Mnemonic Generator", desc: "Generate memory tricks instantly.", color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/10", active: true },
  { icon: MessageSquare, title: "AI Concept Simplifier", desc: "Explain difficult topics in simple Hinglish.", color: "text-purple-400", border: "border-purple-400/30", bg: "bg-purple-400/10", active: true },
  { icon: PenTool, title: "AI Answer Writer", desc: "Generate UPSC mains style answers.", color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/10", active: true },
  { icon: LayoutList, title: "Revision Notes Generator", desc: "Turn long text into quick notes.", color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/10", active: true },
  { icon: Zap, title: "AI Exam Trend Predictor", desc: "Predict high-probability topics based on 2026 trends.", color: "text-red-400", border: "border-red-400/30", bg: "bg-red-400/10", active: true },
  { icon: Youtube, title: "YouTube Script Writer", desc: "Turn concepts into viral educational reels.", color: "text-[#FF004F]", border: "border-[#FF004F]/30", bg: "bg-[#FF004F]/10", active: true },
  { icon: HelpCircle, title: "AI Quiz Generator", desc: "Practice with high-quality MCQs for your exam.", color: "text-orange-400", border: "border-orange-400/30", bg: "bg-orange-400/10", active: true },
  { icon: FileText, title: "PDF Genius", desc: "Analyze PDFs to generate notes, quizzes, or tricks.", color: "text-cyan-400", border: "border-cyan-400/30", bg: "bg-cyan-400/10", active: true },
];

const examTypes = ['UPSC', 'State PCS', 'SSC CGL', 'Banking'];

const Typewriter = ({ text, speed = 50, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, text, speed, started]);

  return (
    <>
      <span className="print:hidden">{displayedText}</span>
      <span className="hidden print:inline">{text}</span>
    </>
  );
};

const PracticeSetTool = ({ result, formData, pdfFile }) => {
  const questions = result.questions || [];
  
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-10">
      <div className="text-center mb-8 border-b border-slate-700/50 pb-8">
        <h3 className="text-3xl font-black text-white mb-2">Interactive Practice Set</h3>
        <p className="text-slate-400 text-sm font-medium">Test your knowledge with {formData.exam} level questions on <span className="text-orange-400">"{formData.topic || (pdfFile ? pdfFile.name : 'this topic')}"</span></p>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={idx} className="bg-[#1E293B] border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-50 group-hover:bg-yellow-400 transition-colors"></div>
            
            <div className="flex items-start mb-6">
              <div className="flex flex-col space-y-2 mr-4">
                <span className="bg-blue-500/20 text-blue-400 text-[10px] font-black px-3 py-1 rounded-md flex-shrink-0 uppercase tracking-widest border border-blue-500/20 text-center">Q{idx + 1}</span>
                {q.subTopic && (
                  <span className="bg-purple-500/10 text-purple-400 text-[8px] font-black px-2 py-0.5 rounded border border-purple-500/20 uppercase tracking-tighter text-center max-w-[80px] truncate" title={q.subTopic}>
                    {q.subTopic}
                  </span>
                )}
              </div>
              <p className="text-white text-lg font-bold leading-relaxed">{q.questionText}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8 pl-0 md:pl-12">
              {q.options.map((opt, i) => (
                <div key={i} className="flex items-center bg-[#0F172A] border border-slate-800 p-4 rounded-2xl text-sm text-slate-300 transition-all group/opt hover:border-slate-600">
                  <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center mr-3 text-[10px] font-black group-hover/opt:bg-slate-700 transition-colors">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-semibold">{opt}</span>
                </div>
              ))}
            </div>

            {/* Collapsible Answer Key */}
            <div className="pl-0 md:pl-12">
              <details className="group/ans bg-[#0F172A] rounded-2xl border border-slate-800 overflow-hidden transition-all duration-300 open:border-orange-500/30">
                <summary className="list-none p-5 cursor-pointer flex justify-between items-center hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center">
                    <HelpCircle className="w-4 h-4 text-orange-400 mr-2" />
                    <span className="text-orange-400 font-bold text-xs uppercase tracking-widest">Show Logic & Answer</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 transition-transform duration-300 group-open/ans:rotate-90" />
                </summary>
                <div className="p-6 pt-2 border-t border-slate-800 bg-[#0F172A] animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center mb-4 p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                    <div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-tighter">Correct Answer</p>
                        <p className="text-white font-black text-lg">{q.correctAnswer}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                        <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center">
                            <BookOpen className="w-3 h-3 mr-2" /> Examiner's Logic
                        </p>
                        <p className="text-slate-300 text-sm leading-relaxed font-medium pl-5 border-l-2 border-slate-800">
                            <Typewriter text={q.explanation} speed={10} />
                        </p>
                    </div>

                    <div className="bg-yellow-400/5 border border-yellow-400/20 p-4 rounded-xl flex items-start">
                      <Zap className="w-4 h-4 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-1">Solving Hack</p>
                        <p className="text-yellow-100 text-xs font-bold italic leading-relaxed">
                          "{q.trickToSolve}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-8 rounded-3xl text-center shadow-xl border border-green-400/20">
          <Sparkles className="w-12 h-12 text-white/50 mx-auto mb-4" />
          <h4 className="text-2xl font-black text-white mb-2">{result.scoreMessage}</h4>
          <p className="text-green-100/80 font-medium">Keep practicing consistent for {formData.exam}. Success is inevitable!</p>
      </div>
    </div>
  );
};

const SimplifierTool = ({ result }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
    <div className="bg-[#1E293B] p-8 md:p-12 rounded-3xl border border-purple-500/30 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <MessageSquare className="w-32 h-32" />
      </div>
      
      <div className="mb-10 text-center md:text-left">
        <h3 className="text-[10px] font-black text-purple-400 mb-6 uppercase tracking-[0.4em] flex items-center justify-center md:justify-start">
          <Sparkles className="w-4 h-4 mr-2" /> The Simplified Concept
        </h3>
        
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8">
          <Typewriter text={result.theConcept} speed={20} />
        </h2>
      </div>

      <div className="bg-purple-500/10 border border-purple-500/20 p-8 rounded-3xl mb-12 relative group hover:bg-purple-500/15 transition-all duration-500">
        <div className="absolute -top-3 left-8 px-4 py-1 bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">The Analogy</div>
        <p className="text-slate-200 text-xl md:text-2xl italic leading-relaxed font-serif">
          "<Typewriter text={result.theAnalogy} speed={25} delay={1000} />"
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-blue-500/5 border border-blue-500/10 p-8 rounded-3xl group hover:border-blue-500/30 transition-colors">
          <h4 className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 flex items-center">
            <LayoutList className="w-4 h-4 mr-3" /> 3-Point Logic Pack
          </h4>
          <ul className="space-y-6">
            {result.keyTakeaways.map((item, i) => (
              <li key={i} className="flex items-start text-base text-slate-300 font-bold group/item">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-4 flex-shrink-0 group-hover/item:scale-125 transition-transform"></div>
                <span><Typewriter text={item} speed={15} delay={2000 + (i * 400)} /></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <div className="bg-green-500/5 border border-green-500/10 p-8 rounded-3xl hover:border-green-500/30 transition-colors">
            <h4 className="text-green-400 text-[10px] font-black uppercase tracking-widest mb-3 flex items-center">
              <Code className="w-4 h-4 mr-3" /> Real World Context
            </h4>
            <div className="text-slate-300 text-base leading-relaxed font-semibold">
               <Typewriter text={result.realWorldExample} speed={20} delay={3500} />
            </div>
          </div>
          
          <div className="bg-red-500/5 border border-red-500/10 p-8 rounded-3xl hover:border-red-500/30 transition-colors shadow-inner">
            <h4 className="text-red-400 text-[10px] font-black uppercase tracking-widest mb-3 flex items-center">
              <AlertCircle className="w-4 h-4 mr-3" /> Confusion Buster
            </h4>
            <div className="text-red-100/90 text-sm leading-relaxed font-black">
               <Typewriter text={result.confusionBuster} speed={20} delay={4500} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AnswerWriterTool = ({ result, formData, pdfFile }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
    <div className="bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-8 text-white relative">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <PenTool className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Mains Model Answer</span>
          <h2 className="text-3xl font-black leading-tight mb-2">{formData.topic || (pdfFile ? pdfFile.name : 'Analysis Results')}</h2>
          <p className="text-blue-100/80 text-sm font-medium">Standard: {formData.exam} | 250 Words Style</p>
        </div>
      </div>

      <div className="p-8 md:p-12 space-y-10">
        <section>
          <h4 className="text-xs font-black text-blue-600 mb-4 uppercase tracking-[0.2em] flex items-center">
            <Sparkles className="w-4 h-4 mr-2" /> Introduction
          </h4>
          <div className="text-slate-700 text-lg leading-relaxed font-medium bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
            <Typewriter text={result.introduction} speed={15} />
          </div>
        </section>

        <section>
          <h4 className="text-xs font-black text-indigo-600 mb-4 uppercase tracking-[0.2em] flex items-center">
            <LayoutList className="w-4 h-4 mr-2" /> Body Paragraphs
          </h4>
          <div className="space-y-6">
            {result.bodyPoints.map((point, i) => (
              <div key={i} className="group">
                 <h5 className="text-slate-900 font-black text-lg mb-2 flex items-center">
                   <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center mr-3 flex-shrink-0">{i+1}</span>
                   {point.heading}
                 </h5>
                 <p className="text-slate-600 leading-relaxed pl-9 border-l-2 border-indigo-100 group-last:border-transparent">
                   <Typewriter text={point.content} speed={10} delay={1000 + (i * 800)} />
                 </p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8 pt-6">
           <section className="bg-green-50 p-6 rounded-3xl border border-green-100">
              <h4 className="text-[10px] font-black text-green-700 mb-4 uppercase tracking-widest flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2" /> Conclusion
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed font-semibold italic">
                <Typewriter text={result.conclusion} speed={20} delay={4000} />
              </p>
           </section>

           <section className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
              <h4 className="text-[10px] font-black text-orange-700 mb-4 uppercase tracking-widest flex items-center">
                <Zap className="w-4 h-4 mr-2" /> Value Addition (Brownie Points)
              </h4>
              <ul className="space-y-3">
                {result.valueAddition.map((v, i) => (
                  <li key={i} className="text-slate-700 text-xs flex items-start">
                    <span className="text-orange-500 mr-2">✦</span>
                    <span><Typewriter text={v} speed={15} delay={5000 + (i * 500)} /></span>
                  </li>
                ))}
              </ul>
           </section>
        </div>
      </div>
    </div>
  </div>
);

const MnemonicTool = ({ result }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-[#1E293B] p-8 rounded-3xl border border-yellow-500/30 shadow-xl relative overflow-hidden group">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-colors"></div>
        <h4 className="text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-6 flex items-center">
          <Brain className="w-4 h-4 mr-2" /> English Mnemonic
        </h4>
        <div className="bg-[#0F172A] p-6 rounded-2xl border border-slate-700/50 shadow-inner min-h-[120px] flex items-center">
          <p className="text-white text-2xl font-black italic text-center w-full tracking-tight">
            <Typewriter text={result.englishMnemonic} speed={30} />
          </p>
        </div>
      </div>

      <div className="bg-[#1E293B] p-8 rounded-3xl border border-blue-500/30 shadow-xl relative overflow-hidden group">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/5 rounded-full blur-2xl group-hover:bg-blue-400/10 transition-colors"></div>
        <h4 className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" /> Hinglish Version
        </h4>
        <div className="bg-[#0F172A] p-6 rounded-2xl border border-slate-700/50 shadow-inner min-h-[120px] flex items-center">
          <p className="text-white text-2xl font-black italic text-center w-full tracking-tight">
            <Typewriter text={result.hinglishMnemonic} speed={30} delay={800} />
          </p>
        </div>
      </div>
    </div>

    <div className="bg-[#1E293B] border border-slate-700 rounded-3xl p-8 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 opacity-50"></div>
        <h3 className="text-purple-400 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center">
            <Sparkles className="w-4 h-4 mr-2" /> The Logic & Story
        </h3>
        <p className="text-slate-300 text-lg leading-relaxed font-medium mb-8">
            <Typewriter text={result.explanation} speed={15} delay={1500} />
        </p>

        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-2xl border border-white/5 italic">
            <p className="text-slate-200">
                <Typewriter text={result.storyTrick} speed={20} delay={2500} />
            </p>
        </div>
    </div>

    {result.youtubeScript && (
      <div className="bg-gradient-to-r from-[#FF004F]/20 to-purple-900/20 p-8 rounded-3xl border border-[#FF004F]/30 shadow-2xl">
        <h3 className="text-[#FF004F] text-[10px] font-black uppercase tracking-widest mb-4 flex items-center">
          <Youtube className="w-5 h-5 mr-2" /> Quick Reel Script
        </h3>
        <div className="bg-black/40 p-6 rounded-2xl text-slate-200 font-medium whitespace-pre-wrap leading-relaxed shadow-inner font-mono text-sm">
          <Typewriter text={result.youtubeScript} speed={15} delay={3500} />
        </div>
      </div>
    )}
  </div>
);

const YouTubeScriptTool = ({ result }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
    <div className="bg-[#1E293B] rounded-3xl overflow-hidden border border-[#FF004F]/30 shadow-2xl">
      <div className="bg-gradient-to-r from-[#FF004F] to-red-600 p-8 text-white flex justify-between items-center">
        <div>
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block">Viral Reel/Short Script</span>
          <h2 className="text-3xl font-black">Video Production Blueprint</h2>
        </div>
        <Youtube className="w-12 h-12 opacity-50" />
      </div>

      <div className="p-8 space-y-8">
        <div className="bg-black/40 p-6 rounded-2xl relative border border-white/5">
          <div className="absolute -top-3 left-6 px-3 py-1 bg-[#FF004F] text-white text-[10px] font-black uppercase tracking-widest rounded-full">The Hook (First 3 Seconds)</div>
          <p className="text-[#FF004F] text-xl font-black italic">
            <Typewriter text={result.hook} speed={25} />
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-6">
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
            <h4 className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-widest flex items-center">
              <Sparkles className="w-4 h-4 mr-2" /> Content Body
            </h4>
            <div className="text-slate-200 text-lg leading-relaxed whitespace-pre-wrap font-medium">
              <Typewriter text={result.body} speed={15} delay={1000} />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20">
            <h4 className="text-[10px] font-black text-blue-400 mb-2 uppercase tracking-widest">Visual Cues</h4>
            <p className="text-blue-100/80 text-sm italic">
               <Typewriter text={result.visualCues} speed={20} delay={2500} />
            </p>
          </div>
          <div className="bg-green-500/10 p-6 rounded-2xl border border-green-500/20">
            <h4 className="text-[10px] font-black text-green-400 mb-2 uppercase tracking-widest">Call to Action</h4>
            <p className="text-green-100/80 text-sm font-bold">
               <Typewriter text={result.callToAction} speed={20} delay={3500} />
            </p>
          </div>
        </div>

        <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
          <h4 className="text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest">SEO Tags & Keywords</h4>
          <p className="text-slate-400 text-xs font-mono">
             <Typewriter text={result.seoTags} speed={30} delay={4500} />
          </p>
        </div>
      </div>
    </div>
  </div>
);

const RevisionNotesTool = ({ result, formData, pdfFile }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
    <div className="bg-white text-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
      <div className="bg-gradient-to-r from-green-700 to-teal-800 p-8 text-white relative">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <BookOpen className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Revision Notes • {formData.exam}</span>
          <h2 className="text-3xl font-black leading-tight mb-2">{formData.topic || (pdfFile ? pdfFile.name : 'Revision Summary')}</h2>
          <p className="text-green-100/80 text-sm font-medium">Topper's Style Quick Summary</p>
        </div>
      </div>

      <div className="p-8 md:p-12 space-y-10">
        <section>
          <h4 className="text-xs font-black text-green-600 mb-4 uppercase tracking-[0.2em] flex items-center">
            <Zap className="w-4 h-4 mr-2" /> Synopsis
          </h4>
          <div className="text-slate-700 text-lg leading-relaxed font-semibold italic bg-green-50/50 p-6 rounded-2xl border border-green-100/50">
            <Typewriter text={result.synopsis} speed={20} />
          </div>
        </section>

        <section>
          <h4 className="text-xs font-black text-blue-600 mb-4 uppercase tracking-[0.2em] flex items-center">
            <LayoutList className="w-4 h-4 mr-2" /> Core Concepts
          </h4>
          <ul className="space-y-4">
            {result.bulletPoints.map((point, i) => (
              <li key={i} className="flex items-start text-slate-700 font-medium text-lg leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-blue-500 mt-3 mr-4 flex-shrink-0"></span>
                <Typewriter text={point} speed={15} delay={500 + (i * 300)} />
              </li>
            ))}
          </ul>
        </section>

        <div className="grid md:grid-cols-2 gap-8 pt-6">
           <section className="bg-yellow-50 p-6 rounded-3xl border border-yellow-100">
              <h4 className="text-[10px] font-black text-yellow-700 mb-4 uppercase tracking-widest flex items-center">
                <Brain className="w-4 h-4 mr-2" /> Memory Tricks
              </h4>
              <ul className="space-y-3">
                {result.mnemonics.map((m, i) => (
                  <li key={i} className="text-slate-700 text-sm font-bold italic">
                    <span className="text-yellow-600 mr-2">✦</span>
                    <Typewriter text={m} speed={20} delay={3000 + (i * 500)} />
                  </li>
                ))}
              </ul>
           </section>

           <section className="bg-purple-50 p-6 rounded-3xl border border-purple-100">
              <h4 className="text-[10px] font-black text-purple-700 mb-4 uppercase tracking-widest flex items-center">
                <Sparkles className="w-4 h-4 mr-2" /> Topper's Tip
              </h4>
              <p className="text-slate-700 text-sm leading-relaxed font-semibold">
                <Typewriter text={result.examTip} speed={20} delay={4500} />
              </p>
           </section>
        </div>
      </div>
    </div>
  </div>
);

const PredictionCard = ({ result }) => (
  <div className="bg-[#1E293B] border-l-4 border-orange-500 p-6 rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-orange-400 font-bold uppercase tracking-widest text-xs flex items-center">
          <Zap className="w-3 h-3 mr-1 fill-current" /> 2026 Trend Analysis
        </h3>
        <p className="text-2xl text-white font-black mt-1">High Probability Topic</p>
      </div>
      <div className="bg-orange-500/20 border border-orange-500/50 rounded-full px-4 py-1">
        <span className="text-orange-400 font-bold">{result.predictionScore} Match</span>
      </div>
    </div>

    <div className="space-y-4">
      <div className="bg-[#0F172A] p-4 rounded-xl border border-slate-700">
        <p className="text-sm text-slate-400 mb-1">Context / Why now?</p>
        <p className="text-slate-200 text-sm leading-relaxed">
          <Typewriter text={result.currentContext} speed={25} />
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-400 mb-2">Likely Questions:</p>
        <ul className="space-y-2">
          {result.expectedQuestions.map((q, i) => (
            <li key={i} className="flex items-start text-sm text-slate-300">
              <ChevronRight className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
              <span>
                <Typewriter text={q} speed={20} delay={500 + (i * 400)} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [activeTool, setActiveTool] = useState('Mnemonic Generator');
  const resultRef = useRef(null);
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

  // Quiz Interaction States
  const [quizData, setQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizAnalytics, setQuizAnalytics] = useState(null);

  // PDF Analysis States
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfBase64, setPdfBase64] = useState('');
  const [pdfMode, setPdfMode] = useState('summary'); // 'summary', 'quiz', or 'tricks'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Helper function to convert file to Base64
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      if (file.size > 200 * 1024 * 1024) {
        setError("File is too large. Maximum limit is 200MB.");
        return;
      }
      setPdfFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Extract the raw base64 string without the data URL prefix
        const base64String = reader.result.split(',')[1];
        setPdfBase64(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const generateTrick = async () => {
    if (!apiKey.trim()) {
      setError("Please enter an API key.");
      return;
    }

    if (!formData.topic.trim() && activeTool !== 'PDF Genius') {
      setError("Please enter a topic.");
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setQuizData(null);
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizAnalytics(null);

    let promptText = "";
    let systemInstructionText = "";
    let responseSchemaJSON = {};
    if (activeTool === 'Revision Notes Generator') {
      promptText = `
        Act as a UPSC High-Ranker (Topper) who specializes in creating crisp, logical revision notes.
        Summarize the topic: "${formData.topic}" for the ${formData.exam}.
        ${formData.keywords ? `Use this additional context/text: "${formData.keywords}"` : ""}
        
        Language: ${formData.language}

        Provide the notes in the following JSON structure:
        1. "synopsis": A 2-line high-level overview of the topic.
        2. "bulletPoints": An array of 5-8 bullet points covering core facts, data, and logic.
        3. "mnemonics": An array of 1-2 small memory tricks specific to these facts.
        4. "examTip": A "Topper's Tip" on how to specifically use this info in an exam.
      `;
      systemInstructionText = "You are a UPSC Topper. Create high-yield revision notes. Output strictly in JSON.";
      responseSchemaJSON = {
        type: "OBJECT",
        properties: {
          synopsis: { type: "STRING" },
          bulletPoints: { type: "ARRAY", items: { type: "STRING" } },
          mnemonics: { type: "ARRAY", items: { type: "STRING" } },
          examTip: { type: "STRING" }
        },
        required: ["synopsis", "bulletPoints", "mnemonics", "examTip"]
      };
    } else if (activeTool === 'AI Exam Trend Predictor') {
      promptText = `
        Act as a UPSC/PSC Exam Analyst with 20 years of experience.
        Based on current global and national events (2025-2026), predict the most expected sub-topics for the following area.

        Main Topic: ${formData.topic}
        Target Exam: ${formData.exam}
        
        Provide a detailed analysis in JSON format:
        1. "predictionScore": A percentage (e.g., 85%) of how likely this is to appear.
        2. "currentContext": Why is this in the news right now? (e.g., New legislation, G20 summit, Supreme Court judgment).
        3. "expectedQuestions": 3 potential questions (Prelims & Mains style).
        4. "keyDimensions": What specific angles should the student prepare? (e.g., Constitutional, Economic, Environmental).
        5. "staticLinkage": Which static part of the syllabus does this connect to?
      `;
      systemInstructionText = "You are an elite exam analyst. Forecast exam trends with high precision. Output strictly in JSON.";
      responseSchemaJSON = {
        type: "OBJECT",
        properties: {
          predictionScore: { type: "STRING" },
          currentContext: { type: "STRING" },
          expectedQuestions: { type: "ARRAY", items: { type: "STRING" } },
          keyDimensions: { type: "ARRAY", items: { type: "STRING" } },
          staticLinkage: { type: "STRING" }
        },
        required: ["predictionScore", "currentContext", "expectedQuestions", "keyDimensions", "staticLinkage"]
      };
    } else if (activeTool === 'AI Quiz Generator') {
      promptText = `
        Act as the Chief Examiner for ${formData.exam}. Create a 5-question mock test on "${formData.topic}".
        Focus strictly on the ${formData.exam} pattern (e.g., Multiple Statement questions, Assertion-Reasoning, Match the following).

        Return ONLY a valid JSON object matching this schema:
        {
          "questions": [
            {
              "id": 1,
              "questionText": "Consider the following statements regarding [Topic]:\\n1. [Statement 1]\\n2. [Statement 2]\\nWhich of the statements given above is/are correct?",
              "options": ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"],
              "correctAnswer": "Both 1 and 2",
              "explanation": "Detailed explanation of why...",
              "trickToSolve": "Elimination trick...",
              "subTopic": "E.g., Constitutional Articles, Economic Data, Historical Dates" 
            }
          ],
          "scoreMessage": "A motivational message based on the student's performance."
        }
      `;
      systemInstructionText = "You are a Chief Examiner. Create advanced, exam-pattern specific MCQs. Output strictly in JSON.";
      responseSchemaJSON = {
        type: "OBJECT",
        properties: {
          questions: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                id: { type: "NUMBER" },
                questionText: { type: "STRING" },
                options: { type: "ARRAY", items: { type: "STRING" } },
                correctAnswer: { type: "STRING" },
                explanation: { type: "STRING" },
                trickToSolve: { type: "STRING" },
                subTopic: { type: "STRING" }
              },
              required: ["id", "questionText", "options", "correctAnswer", "explanation", "trickToSolve", "subTopic"]
            }
          },
          scoreMessage: { type: "STRING" }
        },
        required: ["questions", "scoreMessage"]
      };
    } else if (activeTool === 'AI Concept Simplifier') {
      promptText = `
        Act as a world-class teacher who specializes in making complex subjects simple.
        Explain the topic: "${formData.topic}" to a student preparing for ${formData.exam}.
        
        Language: ${formData.language}
        Style: Use relatable analogies and simple language (ELI5). If language is Hinglish, use a mix of Hindi and English.

        Provide the explanation in the following JSON structure:
        1. "theConcept": A clear, simple definition.
        2. "theAnalogy": A relatable real-life analogy to understand the concept.
        3. "keyTakeaways": An array of 3-4 simple bullet points that summarize the concept.
        4. "realWorldExample": A practical application or example of this concept.
        5. "confusionBuster": A common misconception about this topic and why it's wrong.
      `;
      systemInstructionText = "You are a master of simplification. Explain complex topics using simple language and relatable analogies. Output strictly in JSON.";
      responseSchemaJSON = {
        type: "OBJECT",
        properties: {
          theConcept: { type: "STRING" },
          theAnalogy: { type: "STRING" },
          keyTakeaways: { type: "ARRAY", items: { type: "STRING" } },
          realWorldExample: { type: "STRING" },
          confusionBuster: { type: "STRING" }
        },
        required: ["theConcept", "theAnalogy", "keyTakeaways", "realWorldExample", "confusionBuster"]
      };
    } else if (activeTool === 'AI Answer Writer') {
      promptText = `
        Act as a UPSC Mains coach.
        Write a model answer for the topic/question: "${formData.topic}" for the ${formData.exam} Mains.
        ${formData.keywords ? `Incorporate this context: "${formData.keywords}"` : ""}
        
        Language: ${formData.language}
        Constraint: Use standard 250-word structure (Introduction, Structured Body, Conclusion).
        
        Provide the answer in the following JSON structure:
        1. "introduction": A concise, impactful opening (data or definition based).
        2. "bodyPoints": An array of objects each with "heading" (e.g., Economic Impact) and "content" (detailed points). Provide 3-4 such objects.
        3. "conclusion": A forward-looking, optimistic conclusion.
        4. "valueAddition": An array of 2-3 extra points like "Keywords", "Diagram ideas", or "Case Studies" to score higher.
      `;
      systemInstructionText = "You are a UPSC Mains coach. Write professional, high-scoring model answers. Output strictly in JSON.";
      responseSchemaJSON = {
        type: "OBJECT",
        properties: {
          introduction: { type: "STRING" },
          bodyPoints: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                heading: { type: "STRING" },
                content: { type: "STRING" }
              },
              required: ["heading", "content"]
            }
          },
          conclusion: { type: "STRING" },
          valueAddition: { type: "ARRAY", items: { type: "STRING" } }
        },
        required: ["introduction", "bodyPoints", "conclusion", "valueAddition"]
      };
    } else if (activeTool === 'YouTube Script Writer') {
      promptText = `
        Act as a viral YouTube Shorts scriptwriter and expert retention strategist.
        Create a highly engaging, fast-paced 60-second script based on the following topic: "${formData.topic}".

        Target Audience: Aspirants preparing for ${formData.exam} (Focus on high-stakes competitive energy).
        Language: ${formData.language} (If Hinglish, ensure it sounds natural for a fast-paced Reel/Short).

        Structure the JSON response as follows:
        1. "hook": A 3-second high-energy, pattern-interrupting opening sentence (e.g., "99% of aspirants get this wrong...").
        2. "body": A concise, punchy explanation using a memory trick or the most critical data point.
        3. "callToAction": A compelling sign-off urging viewers to test their knowledge or get more tricks using the Er.innovate AI platform.
        4. "visualCues": Practical suggestions for on-screen text, stock footage, or sound effects (e.g., [SFX: Cash register ding], [Visual: Zoom in on text]).
        5. "seoTags": A comma-separated list of 10 high-ranking hashtags and keywords.
      `;
      systemInstructionText = "You are a viral YouTube Shorts scriptwriter and expert retention strategist. Output strictly in JSON.";
      responseSchemaJSON = {
        type: "OBJECT",
        properties: {
          hook: { type: "STRING" },
          body: { type: "STRING" },
          callToAction: { type: "STRING" },
          visualCues: { type: "STRING" },
          seoTags: { type: "STRING" }
        },
        required: ["hook", "body", "callToAction", "visualCues", "seoTags"]
      };
    } else {
      promptText = `
        Act as a Memory Grandmaster and UPSC Mentor. 
        Create an unforgettable memory trick/mnemonic for the topic: "${formData.topic}".
        
        Target Exam: ${formData.exam}
        Language: ${formData.language}
        Style: ${formData.style} (e.g., if Funny, use relatable analogies; if Acronym, use sticky letters).

        Provide the trick in the following JSON structure:
        1. "englishMnemonic": A sticky English acronym or phrase.
        2. "hinglishMnemonic": A relatable Hindi-English mix trick or rhyme.
        3. "explanation": A 2-line breakdown of how the trick connects to the facts.
        4. "storyTrick": A short, vivid 3-line story that anchors the memory.
        5. "youtubeScript": A 30-second viral reel script (Hook, Trick, CTA) to explain this.
      `;
      systemInstructionText = "You are a memory grandmaster. Create catchy, sticky mnemonics. Output strictly in JSON.";
      responseSchemaJSON = {
        type: "OBJECT",
        properties: {
          englishMnemonic: { type: "STRING" },
          hinglishMnemonic: { type: "STRING" },
          explanation: { type: "STRING" },
          storyTrick: { type: "STRING" },
          youtubeScript: { type: "STRING" }
        },
        required: ["englishMnemonic", "hinglishMnemonic", "explanation", "storyTrick", "youtubeScript"]
      };
    }

    try {
      const parts = [{ text: promptText }];
      if (activeTool === 'PDF Genius' && pdfBase64) {
        parts.unshift({
          inline_data: {
            mime_type: "application/pdf",
            data: pdfBase64
          }
        });
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: parts }],
            system_instruction: {
              parts: [{ text: systemInstructionText }]
            },
            generation_config: {
              response_mime_type: "application/json",
              response_schema: responseSchemaJSON
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
      if (activeTool === 'AI Quiz Generator') {
        setQuizData(parsedResult);
      }
    } catch (parseError) {
      throw new Error("Failed to parse the AI response. Original text was clearly not JSON.");
    }

  } catch (err) {
    setError(err.message || "Failed to generate trick. Please try again or check your API key.");
  } finally {
    setLoading(false);
    // Auto-scroll to result
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
  }
};

const analyzePDF = async () => {
  if (!pdfBase64) {
    setError("Please upload a PDF first.");
    return;
  }

  setLoading(true);
  setError('');
  setResult(null); 
  setQuizData(null);
  setUserAnswers({});
  setQuizSubmitted(false);
  setQuizAnalytics(null);

  let taskInstruction = "";
  let systemInstructionText = "";
  let responseSchemaJSON = {};

  if (pdfMode === 'summary') {
    taskInstruction = "Extract the top 15 most important high-yield points, landmark judgments, and key dates. Format as bullet points.";
    systemInstructionText = "You are an elite academic analyzer. Summarize PDF content into crisp revision notes. Output strictly in JSON.";
    responseSchemaJSON = {
      type: "OBJECT",
      properties: {
        synopsis: { type: "STRING" },
        bulletPoints: { type: "ARRAY", items: { type: "STRING" } },
        mnemonics: { type: "ARRAY", items: { type: "STRING" } },
        examTip: { type: "STRING" }
      },
      required: ["synopsis", "bulletPoints", "mnemonics", "examTip"]
    };
  } else if (pdfMode === 'quiz') {
    taskInstruction = "Generate a 5-question multiple-choice quiz based strictly on the contents of this document. Include detailed explanations.";
    systemInstructionText = "You are a Chief Examiner. Create advanced MCQs from the provided PDF. Output strictly in JSON.";
    responseSchemaJSON = {
      type: "OBJECT",
      properties: {
        questions: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              id: { type: "NUMBER" },
              questionText: { type: "STRING" },
              options: { type: "ARRAY", items: { type: "STRING" } },
              correctAnswer: { type: "STRING" },
              explanation: { type: "STRING" },
              trickToSolve: { type: "STRING" },
              subTopic: { type: "STRING" }
            },
            required: ["id", "questionText", "options", "correctAnswer", "explanation", "trickToSolve", "subTopic"]
          }
        },
        scoreMessage: { type: "STRING" }
      },
      required: ["questions", "scoreMessage"]
    };
  } else if (pdfMode === 'tricks') {
    taskInstruction = "Create 3 clever memory tricks or mnemonics to remember the hardest concepts in this document.";
    systemInstructionText = "You are a memory grandmaster. Create sticky mnemonics from the PDF content. Output strictly in JSON.";
    responseSchemaJSON = {
      type: "OBJECT",
      properties: {
        englishMnemonic: { type: "STRING" },
        hinglishMnemonic: { type: "STRING" },
        explanation: { type: "STRING" },
        storyTrick: { type: "STRING" },
        youtubeScript: { type: "STRING" }
      },
      required: ["englishMnemonic", "hinglishMnemonic", "explanation", "storyTrick", "youtubeScript"]
    };
  }

  const prompt = `
    Act as a Master Tutor for ${formData.exam}. 
    Analyze the attached PDF document and perform the following task:
    ${taskInstruction}
    
    Format the output in clean JSON.
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { data: pdfBase64, mime_type: "application/pdf" } }
            ]
          }],
          system_instruction: {
            parts: [{ text: systemInstructionText }]
          },
          generation_config: {
            response_mime_type: "application/json",
            response_schema: responseSchemaJSON
          }
        })
      }
    );

    const data = await response.json();
    if (!response.ok || data.error) throw new Error(data.error?.message || "Failed to analyze PDF.");
    
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedText) throw new Error("Empty response from AI.");

    const parsedResult = JSON.parse(generatedText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
    setResult(parsedResult);
    if (pdfMode === 'quiz') {
      setQuizData(parsedResult);
    }
    
  } catch (err) {
    setError(err.message || "Failed to analyze PDF.");
  } finally {
    setLoading(false);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
  }
};

const handleQuizSubmit = () => {
  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;
  const strengths = new Set();
  const weaknesses = new Set();

  quizData.questions.forEach((q, index) => {
    const userAnswer = userAnswers[index];
    if (!userAnswer) {
      unattemptedCount++;
    } else if (userAnswer === q.correctAnswer) {
      correctCount++;
      strengths.add(q.subTopic);
    } else {
      wrongCount++;
      weaknesses.add(q.subTopic);
    }
  });

  // Remove overlapping subtopics (if they got one right and one wrong in the same subtopic, mark as a warning/weakness)
  strengths.forEach(s => {
    if (weaknesses.has(s)) strengths.delete(s);
  });

  // UPSC Standard: +2 for correct, -0.66 for incorrect
  const rawScore = (correctCount * 2) - (wrongCount * 0.66);
  const totalPossible = quizData.questions.length * 2;

  setQuizAnalytics({
    score: rawScore.toFixed(2),
    total: totalPossible,
    correct: correctCount,
    wrong: wrongCount,
    unattempted: unattemptedCount,
    strongPoints: Array.from(strengths),
    weakPoints: Array.from(weaknesses),
    accuracy: ((correctCount / (correctCount + wrongCount || 1)) * 100).toFixed(0)
  });
  
  setQuizSubmitted(true);
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
  
  let content = `Topic: ${formData.topic}\nExam: ${formData.exam}\n\n`;
  if (result.hook && result.body && result.callToAction) {
    content += `Viral Video Script\n\n`;
    content += `Hook: ${result.hook}\n\n`;
    content += `Body:\n${result.body}\n\n`;
    content += `Visual Cues: ${result.visualCues}\n\n`;
    content += `Call to Action: ${result.callToAction}\n\n`;
    content += `SEO Tags: ${result.seoTags}`;
  } else if (result.introduction && result.bodyPoints) {
    content += `Mains Model Answer\n\n`;
    content += `Introduction:\n${result.introduction}\n\n`;
    result.bodyPoints.forEach(p => {
      content += `${p.heading}\n${p.content}\n\n`;
    });
    content += `Conclusion:\n${result.conclusion}\n\n`;
    content += `Value Addition:\n- ${result.valueAddition.join('\n- ')}`;
  } else if (result.theConcept) {
    content += `Concept Simplification\n\n`;
    content += `The Concept:\n${result.theConcept}\n\n`;
    content += `The Analogy:\n${result.theAnalogy}\n\n`;
    content += `Key Takeaways:\n- ${result.keyTakeaways.join('\n- ')}\n\n`;
    content += `Real World Example:\n${result.realWorldExample}\n\n`;
    content += `Confusion Buster:\n${result.confusionBuster}`;
  } else if (result.predictionScore) {
    content += `Probability Score: ${result.predictionScore}\n\n`;
    content += `Current Context:\n${result.currentContext}\n\n`;
    content += `Expected Questions:\n- ${result.expectedQuestions.join('\n- ')}\n\n`;
    content += `Key Dimensions:\n- ${result.keyDimensions.join('\n- ')}\n\n`;
    content += `Static Linkage:\n${result.staticLinkage}`;
  } else if (result.questions) {
    content += `AI Generated Quiz\n\n`;
    result.questions.forEach((q, i) => {
      content += `Q${i+1}: ${q.questionText}\n`;
      q.options.forEach((opt, j) => {
        content += `${String.fromCharCode(65 + j)}) ${opt}\n`;
      });
      content += `Correct Answer: ${q.correctAnswer}\n`;
      content += `Explanation: ${q.explanation}\n`;
      content += `Sub-Topic: ${q.subTopic || 'General'}\n`;
      content += `Trick: ${q.trickToSolve}\n\n`;
    });
    content += `Score Message: ${result.scoreMessage}`;
  } else if (result.synopsis) {
    content += `Revision Notes Generator\n\n`;
    content += `Synopsis:\n${result.synopsis}\n\n`;
    content += `Core Concepts:\n- ${result.bulletPoints.join('\n- ')}\n\n`;
    content += `Memory Tricks:\n- ${result.mnemonics.join('\n- ')}\n\n`;
    content += `Topper's Tip:\n${result.examTip}`;
  } else {
    // ... (existing trick download)
  }

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

const handlePrint = () => {
  window.print();
};

return (
  <div className="min-h-screen bg-[#0F172A] font-sans selection:bg-purple-500/30 selection:text-white pb-20 overflow-x-hidden">
    {/* Floating Background Glows */}
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/15 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(157,78,221,0.03)_0%,transparent_70%)]"></div>
    </div>

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
              onClick={() => { setActiveTool('Mnemonic Generator'); setCurrentView('generator'); }}
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
            <h2 className="text-3xl font-bold text-white mb-4">
              {activeTool === 'Revision Notes Generator' ? '📝 Revision Notes Generator' : '🧠 AI Tricks Generator'}
            </h2>
            <p className="text-slate-400">
              {activeTool === 'Revision Notes Generator' ? 'Turn dense text into structured high-yield revision notes.' : 'Turn complex topics into easy-to-remember stories and mnemonics.'}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Input Section (Hidden during print) */}
            <div className="lg:col-span-4 no-print">
              <div className="bg-[#1E293B] border border-purple-500/30 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(157,78,221,0.15)]">
                <div className="space-y-4">
                  {activeTool !== 'PDF Genius' && (
                    <>
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
                      
                      {activeTool === 'Revision Notes Generator' ? (
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-1">Paste Text Here (Optional)</label>
                          <textarea
                            name="keywords"
                            value={formData.keywords}
                            onChange={handleInputChange}
                            placeholder="Paste long text, paragraphs, or PDF contents here..."
                            rows={4}
                            className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                          />
                        </div>
                      ) : (
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
                      )}
                    </>
                  )}

                  {activeTool === 'PDF Genius' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="text-center mb-8">
                        <h3 className="text-xl font-black text-white flex justify-center items-center">
                          <FileText className="w-6 h-6 mr-3 text-pink-500" /> AI Document Scanner
                        </h3>
                        <p className="text-slate-400 mt-2 text-xs">Upload dense notes, Bare Acts, or current affairs magazines to instantly extract what matters.</p>
                      </div>

                      <div className="bg-[#1E293B] p-6 rounded-3xl border border-slate-700 shadow-2xl relative">
                        {/* File Upload Zone */}
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-500 rounded-2xl cursor-pointer hover:border-pink-500 hover:bg-pink-500/5 transition-all mb-6 group">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                            <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-pink-400 mb-2 transition-colors" />
                            <p className="mb-1 text-sm text-slate-300">
                              <span className="font-semibold text-pink-400">Click to upload</span> or drag and drop
                            </p>
                             <p className="text-[10px] text-slate-500 font-mono">PDF (MAX 200MB)</p>
                          </div>
                          <input type="file" accept="application/pdf" className="hidden" onChange={handleFileUpload} />
                        </label>

                        {/* Selected File Indicator */}
                        {pdfFile && (
                          <div className="bg-[#0F172A] p-4 rounded-xl border border-green-500/30 flex items-center justify-between mb-6">
                            <div className="flex items-center">
                              <FileText className="w-6 h-6 text-green-400 mr-3" />
                              <div className="overflow-hidden">
                                <p className="text-xs font-bold text-white truncate max-w-[150px]">{pdfFile.name}</p>
                                <p className="text-[10px] text-slate-500">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                            </div>
                            <button onClick={() => { setPdfFile(null); setPdfBase64(''); }} className="text-slate-500 hover:text-red-400">
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        )}

                        {/* Action Selectors */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                          {[
                            { id: 'summary', icon: LayoutList, label: 'Summarize' },
                            { id: 'quiz', icon: Brain, label: 'Make Quiz' },
                            { id: 'tricks', icon: Sparkles, label: 'Get Tricks' }
                          ].map((mode) => (
                            <button
                              key={mode.id}
                              type="button"
                              onClick={() => setPdfMode(mode.id)}
                              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                                pdfMode === mode.id 
                                  ? 'bg-pink-500/20 border-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]' 
                                  : 'bg-[#0F172A] border-slate-700 text-slate-400 hover:border-slate-500'
                              }`}
                            >
                              <mode.icon className={`w-5 h-5 mb-1 ${pdfMode === mode.id ? 'text-pink-400' : ''}`} />
                              <span className="text-[9px] font-black uppercase tracking-wider">{mode.label}</span>
                            </button>
                          ))}
                        </div>

                        <button 
                          onClick={analyzePDF}
                          disabled={!pdfFile || loading}
                          className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-black rounded-xl shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center transform active:scale-95"
                        >
                          {loading ? (
                            <><Zap className="w-5 h-5 mr-2 animate-pulse" /> Processing Document...</>
                          ) : (
                            <><Brain className="w-5 h-5 mr-2" /> Analyze PDF Now</>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTool !== 'PDF Genius' && (
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
                  )}

                  {activeTool === 'Mnemonic Generator' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Style</label>
                      <select name="style" value={formData.style} onChange={handleInputChange} className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 cursor-pointer">
                        <option>Funny</option>
                        <option>Story Based</option>
                        <option>Short Trick</option>
                        <option>Acronym</option>
                      </select>
                    </div>
                  )}

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

                  {activeTool !== 'PDF Genius' && (
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
                          <Sparkles className="mr-2 w-5 h-5" /> {activeTool === 'Revision Notes Generator' ? 'Generate Notes' : 'Generate AI Output'}
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="lg:col-span-8 print-area scroll-mt-24" ref={resultRef}>
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
                <div className="h-full min-h-[400px] bg-[#1E293B] border border-purple-500/30 rounded-3xl flex flex-col items-center justify-center p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-shimmer w-[200%] -ml-[50%]"></div>
                  <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(255,215,0,0.5)]"></div>
                  <p className="text-yellow-400 font-black animate-pulse tracking-widest text-xs uppercase">Consulting AI Brain...</p>
                </div>
              )}

              {result && !loading && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                  {/* Top actions */}
                  <div className="flex justify-between items-center bg-[#1E293B] p-4 rounded-xl border border-slate-700 shadow-sm no-print">
                    <span className="text-green-400 font-medium flex items-center">
                      <Zap className="w-4 h-4 mr-2" /> Generated Successfully
                    </span>
                    <div className="flex space-x-2">
                       <button onClick={() => {
                        let md = `# ${formData.topic}\n\n`;
                        if (result.hook && result.body && result.callToAction) {
                          md += `## Viral Video Script\n\n### Hook\n> ${result.hook}\n\n### Body\n${result.body}\n\n### Visual Cues\n_${result.visualCues}_\n\n### CTA\n**${result.callToAction}**\n\n### SEO Tags\n\`${result.seoTags}\``;
                        } else if (result.introduction && result.bodyPoints) {
                          md += `## Model Answer\n\n### Introduction\n${result.introduction}\n\n`;
                          result.bodyPoints.forEach(p => md += `### ${p.heading}\n${p.content}\n\n`);
                          md += `### Conclusion\n${result.conclusion}\n\n### Value Addition\n- ${result.valueAddition.join('\n- ')}`;
                        } else if (result.theConcept) {
                          md += `## Concept Simplification\n\n### The Concept\n${result.theConcept}\n\n### The Analogy\n${result.theAnalogy}\n\n### Key Takeaways\n- ${result.keyTakeaways.join('\n- ')}\n\n### Real World Example\n${result.realWorldExample}\n\n### Confusion Buster\n${result.confusionBuster}`;
                        } else if (result.questions) {
                          md += `## AI Practice Quiz\n\n`;
                          result.questions.forEach((q, i) => {
                            md += `### Q${i+1}: ${q.questionText}\n`;
                            if (q.subTopic) md += `**Sub-Topic:** ${q.subTopic}\n\n`;
                            q.options.forEach((opt, j) => md += `- ${String.fromCharCode(65 + j)}) ${opt}\n`);
                            md += `\n**Correct Answer:** ${q.correctAnswer}\n`;
                            md += `**Explanation:** ${q.explanation}\n`;
                            md += `**Trick:** ${q.trickToSolve}\n\n---\n\n`;
                          });
                        } else if (result.predictionScore) {
                          md += `## Exam Trend Analysis\n**Probability:** ${result.predictionScore}\n\n### Context\n${result.currentContext}\n\n### Likely Questions\n- ${result.expectedQuestions.join('\n- ')}\n\n### Preparation Dimensions\n- ${result.keyDimensions.join('\n- ')}\n\n### Static Linkage\n${result.staticLinkage}`;
                        } else if (result.synopsis) {
                          md += `## Revision Notes\n\n### Synopsis\n${result.synopsis}\n\n### Core Concepts\n- ${result.bulletPoints.join('\n- ')}\n\n### Memory Tricks\n- ${result.mnemonics.join('\n- ')}\n\n### Topper's Tip\n> ${result.examTip}`;
                        } else {
                          md += `## Memory Trick\n\n**English:** ${result.englishMnemonic}\n**Hinglish:** ${result.hinglishMnemonic}\n\n### Explanation\n${result.explanation}\n\n### Story\n${result.storyTrick}`;
                        }
                        copyToClipboard(md, 'Notion/Markdown');
                      }} className="px-3 py-1 text-slate-300 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-all flex items-center space-x-2 border border-slate-700/50 hover:border-blue-500/30" title="Copy for Notion">
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Notion</span>
                      </button>
                      <button onClick={handlePrint} className="p-2 text-slate-300 hover:text-yellow-400 hover:bg-slate-800 rounded-lg transition-colors border border-transparent" title="Print to PDF">
                        <Printer className="w-5 h-5" />
                      </button>
                      <button onClick={downloadNotes} className="p-2 text-slate-300 hover:text-yellow-400 hover:bg-slate-800 rounded-lg transition-colors border border-transparent" title="Download Notes">
                        <Download className="w-5 h-5" />
                      </button>
                      <button onClick={() => copyToClipboard(JSON.stringify(result, null, 2), 'Everything')} className="p-2 text-slate-300 hover:text-yellow-400 hover:bg-slate-800 rounded-lg transition-colors border border-transparent" title="Copy All">
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {copyFeedback && (
                    <div className="fixed bottom-20 md:bottom-8 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-[0_4px_20px_rgba(34,197,94,0.4)] z-50 animate-in fade-in slide-in-from-bottom-2 font-medium">
                      {copyFeedback}
                    </div>
                  )}

                  {activeTool === 'YouTube Script Writer' ? (
                    <YouTubeScriptTool result={result} />
                  ) : activeTool === 'AI Answer Writer' ? (
                    <AnswerWriterTool result={result} formData={formData} pdfFile={pdfFile} />
                  ) : activeTool === 'AI Concept Simplifier' ? (
                    <SimplifierTool result={result} />
                  ) : (activeTool === 'AI Quiz Generator' || (activeTool === 'PDF Genius' && pdfMode === 'quiz')) && quizData ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      
                      {/* --- SOLVING PHASE --- */}
                      {!quizSubmitted ? (
                        <div className="space-y-6">
                          <div className="bg-[#1E293B] p-4 rounded-xl border border-blue-500/30 flex justify-between items-center shadow-lg sticky top-24 z-10">
                            <div>
                              <h3 className="text-white font-bold">{formData.exam} Level Mock Test</h3>
                              <p className="text-slate-400 text-xs mt-1">Marking: +2.00 | -0.66</p>
                            </div>
                            <button 
                              onClick={handleQuizSubmit}
                              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold transition-colors shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                            >
                              Submit Test
                            </button>
                          </div>

                          {quizData.questions.map((q, idx) => (
                            <div key={idx} className="bg-[#0F172A] p-6 rounded-2xl border border-slate-700 shadow-md">
                              <div className="flex items-start mb-4">
                                <span className="bg-slate-800 text-slate-300 font-bold px-3 py-1 rounded-md mr-4 text-sm mt-0.5">Q{idx + 1}</span>
                                <p className="text-white text-lg font-medium leading-relaxed whitespace-pre-wrap">{q.questionText}</p>
                              </div>
                              
                              <div className="grid gap-3 ml-12">
                                {q.options.map((opt, i) => {
                                  const isSelected = userAnswers[idx] === opt;
                                  return (
                                    <button 
                                      key={i}
                                      onClick={() => setUserAnswers(prev => ({ ...prev, [idx]: opt }))}
                                      className={`text-left p-4 rounded-xl border-2 transition-all ${
                                        isSelected 
                                          ? 'border-blue-500 bg-blue-500/10 text-white' 
                                          : 'border-slate-700 bg-[#1E293B] hover:border-slate-500 text-slate-300'
                                      }`}
                                    >
                                      <span className="inline-block w-6 font-bold text-slate-500 mr-2">{String.fromCharCode(65 + i)}.</span>
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        
                        /* --- ANALYTICS & REVIEW PHASE --- */
                        quizAnalytics && (
                          <div className="space-y-8">
                            
                            {/* Score Card */}
                            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-3xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Brain className="w-40 h-40 text-blue-500" />
                              </div>
                              
                              <h2 className="text-3xl font-black text-white mb-6">Performance Report</h2>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
                                <div className="bg-[#0F172A] p-4 rounded-2xl border border-slate-800 text-center">
                                  <p className="text-slate-400 text-sm mb-1">Total Score</p>
                                  <p className={`text-3xl font-black ${quizAnalytics.score > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    {quizAnalytics.score} <span className="text-lg text-slate-500">/ {quizAnalytics.total}</span>
                                  </p>
                                </div>
                                <div className="bg-[#0F172A] p-4 rounded-2xl border border-slate-800 text-center">
                                  <p className="text-slate-400 text-sm mb-1">Accuracy</p>
                                  <p className="text-3xl font-black text-blue-400">{quizAnalytics.accuracy}%</p>
                                </div>
                                <div className="bg-[#0F172A] p-4 rounded-2xl border border-slate-800 text-center">
                                  <p className="text-slate-400 text-sm mb-1">Correct</p>
                                  <p className="text-3xl font-black text-green-400">{quizAnalytics.correct}</p>
                                </div>
                                <div className="bg-[#0F172A] p-4 rounded-2xl border border-slate-800 text-center">
                                  <p className="text-slate-400 text-sm mb-1">Incorrect</p>
                                  <p className="text-3xl font-black text-red-400">{quizAnalytics.wrong}</p>
                                </div>
                              </div>

                              {/* AI SWOT Analysis */}
                              <div className="grid md:grid-cols-2 gap-6 relative z-10">
                                <div className="bg-green-500/10 border border-green-500/30 p-5 rounded-2xl">
                                  <h4 className="text-green-400 font-bold mb-3 flex items-center"><Zap className="w-4 h-4 mr-2" /> Strong Points</h4>
                                  {quizAnalytics.strongPoints.length > 0 ? (
                                    <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                                      {quizAnalytics.strongPoints.map((point, i) => <li key={i}>{point}</li>)}
                                    </ul>
                                  ) : (
                                    <p className="text-sm text-slate-500">Needs more data to analyze.</p>
                                  )}
                                </div>
                                <div className="bg-red-500/10 border border-red-500/30 p-5 rounded-2xl">
                                  <h4 className="text-red-400 font-bold mb-3 flex items-center"><Brain className="w-4 h-4 mr-2" /> Weak Areas (Revise)</h4>
                                  {quizAnalytics.weakPoints.length > 0 ? (
                                    <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                                      {quizAnalytics.weakPoints.map((point, i) => <li key={i}>{point}</li>)}
                                    </ul>
                                  ) : (
                                    <p className="text-sm text-slate-500">Excellent! No major weaknesses detected.</p>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Answer Key Review */}
                            <div>
                              <h3 className="text-xl font-bold text-white mb-6">Detailed Solution & Tricks</h3>
                              <div className="space-y-6">
                                {quizData.questions.map((q, idx) => {
                                  const userAnswer = userAnswers[idx];
                                  const isCorrect = userAnswer === q.correctAnswer;
                                  const isAttempted = !!userAnswer;

                                  return (
                                    <div key={idx} className={`bg-[#1E293B] p-6 rounded-2xl border-l-4 ${!isAttempted ? 'border-l-slate-500' : isCorrect ? 'border-l-green-500' : 'border-l-red-500'} shadow-md`}>
                                      <p className="text-white font-medium mb-4 whitespace-pre-wrap">{idx + 1}. {q.questionText}</p>
                                      
                                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <div className="bg-[#0F172A] p-3 rounded-lg border border-slate-700">
                                          <p className="text-xs text-slate-500 mb-1">Your Answer:</p>
                                          <p className={`font-semibold text-sm ${!isAttempted ? 'text-slate-400' : isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                            {userAnswer || "Not Attempted"}
                                          </p>
                                        </div>
                                        <div className="bg-[#0F172A] p-3 rounded-lg border border-green-500/30">
                                          <p className="text-xs text-slate-500 mb-1">Correct Answer:</p>
                                          <p className="font-semibold text-sm text-green-400">{q.correctAnswer}</p>
                                        </div>
                                      </div>

                                      <div className="space-y-3">
                                        <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                                          <p className="text-blue-300 text-sm leading-relaxed"><span className="font-bold">Explanation:</span> {q.explanation}</p>
                                        </div>
                                        <div className="bg-yellow-400/10 p-4 rounded-xl border border-yellow-400/20 flex items-start">
                                          <Sparkles className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                                          <p className="text-yellow-200 text-sm"><span className="font-bold">Pro Trick:</span> {q.trickToSolve}</p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            
                            <button 
                              onClick={() => { setQuizSubmitted(false); setUserAnswers({}); }}
                              className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors"
                            >
                              Retake Quiz
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  ) : activeTool === 'AI Exam Trend Predictor' ? (
                    <div className="grid lg:grid-cols-5 gap-6">
                      <div className="lg:col-span-3">
                        <PredictionCard result={result} />
                      </div>
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-6 rounded-2xl border border-blue-500/30 shadow-lg">
                          <h4 className="text-[10px] font-black text-blue-400 mb-3 uppercase tracking-[0.2em] flex items-center">
                            <BookOpen className="w-4 h-4 mr-2" /> Static Linkage
                          </h4>
                          <p className="text-blue-100 font-bold text-sm leading-relaxed mb-4">
                            <Typewriter text={result.staticLinkage} speed={20} delay={1800} />
                          </p>
                          <div className="flex flex-wrap gap-2 pt-4 border-t border-blue-500/20">
                            {result.keyDimensions.map((dim, i) => (
                              <span key={i} className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20 text-[10px] font-black uppercase tracking-wider">
                                {dim}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-red-900/20 to-transparent p-6 rounded-2xl border border-red-500/20">
                          <div className="flex items-center text-red-400 font-bold text-xs uppercase tracking-tighter mb-2">
                            <AlertCircle className="w-3.5 h-3.5 mr-2" /> Exam Warning
                          </div>
                          <p className="text-red-200/80 text-[11px] leading-relaxed font-medium">
                            This prediction is based on AI analysis of 2026 patterns. Students are advised to cover static portions thoroughly alongside these topics.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (activeTool === 'Revision Notes Generator' || (activeTool === 'PDF Genius' && pdfMode === 'summary')) ? (
                    <RevisionNotesTool result={result} formData={formData} pdfFile={pdfFile} />
                  ) : (
                    <MnemonicTool result={result} />
                  )}

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
              <div 
                key={idx} 
                className={`bg-[#1E293B]/80 backdrop-blur-sm p-6 rounded-3xl border ${tool.active ? 'border-purple-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-yellow-400/50 hover:shadow-[0_8px_30px_rgba(157,78,221,0.2)]' : 'border-slate-700/50'} transition-all cursor-pointer group transform hover:-translate-y-2 duration-500 animate-in fade-in slide-in-from-bottom-8`} 
                style={{ animationDelay: `${idx * 100}ms` }}
                onClick={() => { if(tool.active) { setActiveTool(tool.title); setCurrentView('generator'); }}}
              >

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
