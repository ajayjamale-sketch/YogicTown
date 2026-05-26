import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { toast } from "sonner";

export default function Contact() {
  useIntersectionObserver();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill in all required fields"); return; }
    setSending(true);
    await new Promise(r => setTimeout(r, 1500));
    setSent(true);
    setSending(false);
    toast.success("Message sent! We'll get back to you within 24 hours.");
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-sage-light dark:bg-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6 text-center section-fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-primary/20 text-primary text-sm font-medium mb-5">
            <MessageSquare className="w-3.5 h-3.5" /> We're here to help
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Questions, feedback, or partnership enquiries — our wellness team responds within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6 section-fade">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Let's Connect</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you're a practitioner with questions, an instructor wanting to join our marketplace, or a business looking for partnership — we'd love to hear from you.
                </p>
              </div>
              {[
                { icon: Mail, label: "Email Us", value: "hello@yogictown.com", sub: "We respond within 24 hours" },
                { icon: Phone, label: "Call Us", value: "+1 (888) 965-YOGA", sub: "Mon–Fri, 9am–6pm IST" },
                { icon: MapPin, label: "Visit Us", value: "Bali, Indonesia", sub: "By appointment only" },
                { icon: Clock, label: "Support Hours", value: "24/7 for Pro & Elite", sub: "Starter: weekdays 9–6 IST" },
              ].map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
                    <div className="font-medium text-foreground text-sm">{value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-3 section-fade">
              <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-5">
                      <Send className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                    <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      className="px-6 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-6">Send us a message</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Name <span className="text-destructive">*</span></label>
                          <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your name"
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">Email <span className="text-destructive">*</span></label>
                          <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                        <select value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                          <option value="">Select a topic</option>
                          <option>General Enquiry</option>
                          <option>Technical Support</option>
                          <option>Instructor Application</option>
                          <option>Partnership & Business</option>
                          <option>Billing & Subscriptions</option>
                          <option>Retreat Listing</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Message <span className="text-destructive">*</span></label>
                        <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={5} placeholder="Tell us how we can help..."
                          className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" />
                      </div>
                      <button type="submit" disabled={sending}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-sage-gradient text-white font-semibold shadow-sage hover:opacity-90 transition-all disabled:opacity-60">
                        {sending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
