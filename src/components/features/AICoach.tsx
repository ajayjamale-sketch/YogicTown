import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Leaf, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
}

const suggestions = [
  "Suggest a yoga routine for beginners",
  "How to meditate when stressed?",
  "Best asanas for back pain",
  "What is Pranayama?",
  "How to build a daily wellness habit",
];

const aiResponses: Record<string, string> = {
  default: "I'm your personal AI Wellness Coach! I'm here to guide you on your yoga, meditation, and holistic health journey. Ask me anything about asanas, breathwork, nutrition, or spiritual practice.",
  yoga: "For beginners, I recommend starting with a simple 20-minute morning routine:\n\n1. **Cat-Cow (Marjaryasana-Bitilasana)** – 10 rounds to warm the spine\n2. **Downward Dog (Adho Mukha Svanasana)** – Hold 5 breaths\n3. **Warrior I & II** – 3 breaths each side\n4. **Child's Pose (Balasana)** – Rest for 10 breaths\n5. **Savasana** – 5 minutes\n\nPractice 4–5 days per week for the best results.",
  meditation: "When you're stressed, try this 5-minute emergency meditation:\n\n1. Find a quiet spot and close your eyes\n2. Take 3 deep belly breaths\n3. Use the **4-7-8 technique**: Inhale 4 counts, hold 7, exhale 8\n4. Focus all attention on the sensation of breath\n5. If thoughts arise, gently label them 'thinking' and return to breath\n\nEven 5 minutes of this can shift your entire nervous system state.",
  back: "For back pain relief, these asanas are highly recommended:\n\n• **Child's Pose** – Gentle decompression\n• **Cat-Cow** – Spinal mobility and pain relief\n• **Sphinx Pose** – Gentle backbend strengthening\n• **Legs Up the Wall** – Relieves lower back tension\n• **Supine Twist** – Releases the lumbar region\n\nAlways practice within pain-free range. If pain is severe, please consult a physiotherapist before practice.",
  pranayama: "**Pranayama** is the ancient yogic practice of breath control — one of the 8 limbs of yoga.\n\nKey practices to start with:\n\n🌬️ **Nadi Shodhana** (Alternate Nostril) – Balances left/right brain hemispheres\n🔥 **Kapalabhati** (Skull Shining Breath) – Energises and cleanses\n🌊 **Ujjayi** (Ocean Breath) – Calms and focuses the mind during asana\n☀️ **Bhramari** (Bee Breath) – Immediately soothes anxiety\n\nStart with 5 minutes daily and gradually increase.",
  habit: "Building a sustainable daily wellness habit:\n\n**Week 1–2: Start tiny**\nJust 5–10 minutes of yoga or meditation. Remove ALL friction.\n\n**Week 3–4: Anchor it**\nTie it to an existing habit (e.g., after morning coffee, before sleep)\n\n**Week 5–8: Grow gradually**\nAdd 5 minutes each week. Track your streak.\n\n**Key principle:** Consistency beats intensity. 10 minutes every day outperforms 90 minutes once a week. 🌱",
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("yoga") || lower.includes("routine") || lower.includes("beginner") || lower.includes("asana")) return aiResponses.yoga;
  if (lower.includes("meditat") || lower.includes("stress") || lower.includes("anxiety") || lower.includes("breathe")) return aiResponses.meditation;
  if (lower.includes("back") || lower.includes("pain") || lower.includes("spine")) return aiResponses.back;
  if (lower.includes("pranayama") || lower.includes("breath")) return aiResponses.pranayama;
  if (lower.includes("habit") || lower.includes("daily") || lower.includes("routine") || lower.includes("consistent")) return aiResponses.habit;
  return `Great question! Based on your wellness journey, here's my guidance:\n\nFor "${message}", I recommend approaching this holistically — combining physical practice (asana), breath awareness (pranayama), and mindfulness. \n\nWould you like me to create a personalised plan specifically for this? Just ask and I'll tailor recommendations based on your level and goals.`;
}

export default function AICoach() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", content: aiResponses.default, time: "now" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 800));
    const aiMsg: Message = { id: Date.now() + 1, role: "assistant", content: getAIResponse(text), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleSend = () => sendMessage(input);
  const handleSuggestion = (s: string) => sendMessage(s);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-20 right-6 z-40 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-sage-dark text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl group",
          open ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        aria-label="Open AI Coach"
      >
        <div className="relative">
          <Bot className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-warm border-2 border-white animate-pulse" />
        </div>
        <div className="absolute right-full mr-3 bg-foreground text-background text-xs px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          AI Wellness Coach ✨
        </div>
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[400px] max-h-[600px] bg-card border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-primary/10 to-sage-light dark:from-primary/20 dark:to-sage-light/20 border-b border-border">
            <div className="w-9 h-9 rounded-xl bg-sage-gradient flex items-center justify-center shadow-sage flex-shrink-0">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                AI Wellness Coach <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Online · Powered by YogicTown AI
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px]">
            {messages.map(msg => (
              <div key={msg.id} className={cn("flex gap-2.5", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-sage-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div className={cn("max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line",
                  msg.role === "user"
                    ? "bg-primary text-white rounded-tr-sm"
                    : "bg-muted text-foreground rounded-tl-sm")}>
                  {msg.content}
                  <div className={cn("text-[10px] mt-1 opacity-60", msg.role === "user" ? "text-right" : "")}>{msg.time}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-sage-gradient flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                  {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />)}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <div className="text-xs text-muted-foreground mb-2 font-medium">Quick questions:</div>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.slice(0, 3).map(s => (
                  <button key={s} onClick={() => handleSuggestion(s)}
                    className="text-xs px-2.5 py-1.5 rounded-xl bg-sage-light dark:bg-sage-light/30 text-primary hover:bg-primary hover:text-white transition-all font-medium">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your wellness coach..."
                rows={1}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground max-h-24"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-sage-gradient text-white flex items-center justify-center shadow-sage hover:opacity-90 transition-all disabled:opacity-40 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
