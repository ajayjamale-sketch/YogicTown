import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Heart, Leaf, Sparkles, Target } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useScrollTop } from "@/hooks/useScrollTop";

const goalOptions = ["Flexibility", "Stress Relief", "Mindfulness", "Strength", "Better Sleep", "Weight Balance"];
const levelOptions = ["Beginner", "Intermediate", "Advanced"];
const focusOptions = ["Back Pain", "Anxiety", "Digestion", "Energy", "Posture", "Emotional Balance"];

export default function WellnessAssessment() {
  useScrollTop();
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState<string[]>(user?.goals || []);
  const [yogaLevel, setYogaLevel] = useState(user?.yogaLevel || "Beginner");
  const [healthFocus, setHealthFocus] = useState<string[]>(user?.healthFocus || []);

  const steps = useMemo(() => [
    { title: "Welcome", icon: Leaf },
    { title: "Goals", icon: Target },
    { title: "Yoga Level", icon: Sparkles },
    { title: "Health Focus", icon: Heart },
    { title: "Confirm", icon: Check },
  ], []);

  const toggleValue = (value: string, values: string[], setter: (next: string[]) => void) => {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  };

  const nextStep = () => setStep((current) => Math.min(current + 1, steps.length - 1));
  const previousStep = () => setStep((current) => Math.max(current - 1, 0));

  const completeAssessment = () => {
    updateProfile({
      goals,
      yogaLevel,
      healthFocus,
      onboardingCompleted: true,
      bio: user?.bio || "Starting a personalized wellness journey with YogicTown.",
    });
    toast.success("Wellness assessment saved. Your dashboard is ready.");
    navigate("/dashboard");
  };

  const canContinue = step === 1 ? goals.length > 0 : step === 3 ? healthFocus.length > 0 : true;

  return (
    <div className="min-h-screen bg-background">
      <main className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-sage-gradient flex items-center justify-center shadow-sage">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-foreground">Wellness Assessment</div>
                <div className="text-sm text-muted-foreground">Personalize your YogicTown experience</div>
              </div>
            </div>
            <span className="text-xs font-semibold text-primary bg-sage-light px-3 py-1.5 rounded-full">
              Step {step + 1} of {steps.length}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-8">
            {steps.map(({ title, icon: Icon }, index) => (
              <div key={title} className="flex flex-col gap-2">
                <div className={`h-1.5 rounded-full ${index <= step ? "bg-primary" : "bg-muted"}`} />
                <div className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold ${index <= step ? "text-foreground" : "text-muted-foreground"}`}>
                  <Icon className="w-3.5 h-3.5" /> {title}
                </div>
              </div>
            ))}
          </div>

          <section className="bg-card border border-border rounded-3xl shadow-sm p-6 sm:p-8 min-h-[440px] flex flex-col">
            {step === 0 && (
              <div className="flex-1 flex flex-col justify-center max-w-2xl">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : ""}. Let's tune the journey.
                </h1>
                <p className="text-muted-foreground leading-relaxed">
                  A few quick choices will shape your dashboard recommendations, profile details, and daily wellness prompts.
                </p>
              </div>
            )}

            {step === 1 && (
              <ChoiceGrid title="What are your main goals?" options={goalOptions} values={goals} onToggle={(value) => toggleValue(value, goals, setGoals)} />
            )}

            {step === 2 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Choose your yoga level</h2>
                <p className="text-sm text-muted-foreground mb-6">This helps us match program intensity and class pacing.</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {levelOptions.map((level) => (
                    <button
                      key={level}
                      onClick={() => setYogaLevel(level)}
                      className={`p-5 rounded-2xl border text-left transition-all ${yogaLevel === level ? "border-primary bg-sage-light text-primary shadow-sm" : "border-border hover:bg-muted text-foreground"}`}
                    >
                      <div className="font-semibold">{level}</div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {level === "Beginner" ? "New or returning to practice" : level === "Intermediate" ? "Comfortable with regular flows" : "Ready for advanced sequences"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <ChoiceGrid title="Which health areas should we support?" options={focusOptions} values={healthFocus} onToggle={(value) => toggleValue(value, healthFocus, setHealthFocus)} />
            )}

            {step === 4 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Confirm your wellness profile</h2>
                <p className="text-sm text-muted-foreground mb-6">These details will pre-populate your dashboard profile.</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <SummaryCard label="Goals" values={goals} />
                  <SummaryCard label="Yoga Level" values={[yogaLevel]} />
                  <SummaryCard label="Health Focus" values={healthFocus} />
                </div>
              </div>
            )}

            <div className="mt-auto pt-8 flex items-center justify-between gap-3">
              <button
                onClick={previousStep}
                disabled={step === 0}
                className="px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              {step < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  disabled={!canContinue}
                  className="px-5 py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={completeAssessment} className="px-5 py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 flex items-center gap-2">
                  Finish Assessment <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function ChoiceGrid({ title, options, values, onToggle }: { title: string; options: string[]; values: string[]; onToggle: (value: string) => void }) {
  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground mb-6">Select all that apply.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map((option) => {
          const selected = values.includes(option);
          return (
            <button
              key={option}
              onClick={() => onToggle(option)}
              className={`p-4 min-h-[88px] rounded-2xl border text-left transition-all ${selected ? "border-primary bg-sage-light text-primary shadow-sm" : "border-border hover:bg-muted text-foreground"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold">{option}</span>
                {selected && <Check className="w-4 h-4 flex-shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SummaryCard({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="p-5 rounded-2xl border border-border bg-muted/30">
      <div className="text-xs uppercase font-bold text-muted-foreground mb-3">{label}</div>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <span key={value} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-background border border-border text-foreground">
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}
