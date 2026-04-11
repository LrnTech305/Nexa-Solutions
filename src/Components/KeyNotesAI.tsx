import { useState } from 'react';
import { Sparkles, BookOpen, CheckCircle2, Brain, Zap, FileText, Mail, Phone, MapPin, X, Menu } from 'lucide-react';
import OpenAI from 'openai';
import HamburgerMenu from './HamburgerMenu';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export default function KeyNotesAI() {
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [exercises, setExercises] = useState<Array<{question: string, answer: string}>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'exercises'>('summary');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSummarize = async () => {
    if (!notes.trim()) return;
    setIsProcessing(true);
    try {
      const summaryResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: "You are an expert educational assistant. Create comprehensive, well-structured summaries." }, { role: "user", content: `Summarize these notes:\n\n${notes}` }],
        temperature: 0.7, max_tokens: 1000
      });
      const summaryText = summaryResponse.choices[0].message.content || "Unable to generate summary.";
      setSummary(summaryText);
      const exercisesResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: "Create practice exercises based on notes. Return JSON array of {question, answer}." }, { role: "user", content: `Notes:\n${notes}\nReturn JSON array.` }],
        temperature: 0.8, max_tokens: 1500, response_format: { type: "json_object" }
      });
      const exercisesContent = exercisesResponse.choices[0].message.content || '{"exercises": []}';
      const parsed = JSON.parse(exercisesContent);
      const exercisesList = parsed.exercises || parsed.questions || Object.values(parsed)[0] || [];
      setExercises(exercisesList);
      setActiveTab('summary');
    } catch (error) {
      console.error(error);
      setSummary('Error: Unable to generate summary. Check API key.');
      setExercises([]);
    } finally {
      setIsProcessing(false);
    }
  };

  const scrollToContact = () => document.getElementById('contact-footer')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-black text-white">
      <HamburgerMenu />
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl tracking-tight">KeyNotes<span className="text-indigo-400">AI</span></div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="hover:text-indigo-400 transition">Features</a>
            <a href="#" className="hover:text-indigo-400 transition">Pricing</a>
            <button onClick={scrollToContact} className="hover:text-indigo-400 transition">Contact</button>
            <button className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">Sign In</button>
          </nav>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 border-b border-white/10 py-4 px-6 flex flex-col gap-4">
            <a href="#" className="hover:text-indigo-400">Features</a>
            <a href="#" className="hover:text-indigo-400">Pricing</a>
            <button onClick={scrollToContact} className="text-left hover:text-indigo-400">Contact</button>
            <button className="px-5 py-2 rounded-lg bg-indigo-600 text-white">Sign In</button>
          </div>
        )}
      </header>

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/50 text-indigo-300 mb-6"><Sparkles className="size-4" /><span>AI-Powered Learning</span></div>
          <h2 className="text-6xl mb-6 text-white">Transform Notes Into Knowledge</h2>
          <p className="text-xl text-gray-400">Paste your notes and get comprehensive summaries with practice exercises.</p>
        </div>
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-8 border-b border-gray-800">
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Paste your notes here..." className="w-full h-64 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 text-white" />
            <div className="flex justify-end mt-4">
              <button onClick={handleSummarize} disabled={!notes.trim() || isProcessing} className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2">
                {isProcessing ? <><div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</> : <><Zap className="size-4" /> Generate</>}
              </button>
            </div>
          </div>
          {summary && (
            <div className="p-8">
              <div className="flex gap-4 border-b border-gray-800 mb-6">
                <button onClick={() => setActiveTab('summary')} className={`pb-3 px-2 border-b-2 ${activeTab === 'summary' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-500'}`}>Summary</button>
                <button onClick={() => setActiveTab('exercises')} className={`pb-3 px-2 border-b-2 ${activeTab === 'exercises' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-500'}`}>Exercises ({exercises.length})</button>
              </div>
              {activeTab === 'summary' && <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 whitespace-pre-line text-gray-300">{summary}</div>}
              {activeTab === 'exercises' && (
                <div className="space-y-6">
                  {exercises.map((ex, i) => <ExerciseCard key={i} number={i+1} question={ex.question} answer={ex.answer} />)}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <footer id="contact-footer" className="border-t border-gray-800 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div><div className="text-2xl font-bold mb-4">KeyNotes<span className="text-indigo-400">AI</span></div><p className="text-gray-400 mb-6">AI-powered note summarization and practice exercises.</p><div className="space-y-3 text-gray-400"><div className="flex gap-3"><Mail /> hello@keynotesai.com</div><div className="flex gap-3"><Phone /> +1 (555) 123-4567</div><div className="flex gap-3"><MapPin /> San Francisco, CA</div></div></div>
            <div><h3 className="text-xl mb-4">Send us a message</h3><form className="space-y-4" onSubmit={(e) => e.preventDefault()}><input type="text" placeholder="Your name" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" /><input type="email" placeholder="Your email" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white" /><textarea rows={3} placeholder="Message" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white resize-none"></textarea><button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Send Message</button></form></div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm"><div className="mb-2">Nexa<span className="text-indigo-400">Solutions</span> — All rights reserved © 2026</div><button onClick={() => window.dispatchEvent(new CustomEvent('reset-portfolio'))} className="text-indigo-400 hover:text-indigo-300">← Back to all projects</button></div>
        </div>
      </footer>
    </div>
  );
}

function ExerciseCard({ number, question, answer }: { number: number; question: string; answer: string }) {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="border border-gray-700 rounded-xl p-6 hover:border-indigo-500 transition">
      <div className="flex items-start gap-4">
        <div className="size-8 rounded-full bg-indigo-900/50 text-indigo-300 flex items-center justify-center">{number}</div>
        <div className="flex-1">
          <p className="text-white mb-3">{question}</p>
          <button onClick={() => setShowAnswer(!showAnswer)} className="text-sm text-indigo-400">{showAnswer ? 'Hide' : 'Show'} Answer</button>
          {showAnswer && <div className="mt-3 pt-3 border-t border-gray-700 text-gray-300">{answer}</div>}
        </div>
      </div>
    </div>
  );
}