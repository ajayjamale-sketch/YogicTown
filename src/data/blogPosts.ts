export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  img: string;
  featured: boolean;
  tags: string[];
  content?: string;
}

export const posts: BlogPost[] = [
  { 
    id: 1, 
    title: "10 Morning Yoga Poses to Start Your Day With Clarity", 
    excerpt: "Transform your mornings with this energising sequence that wakes the body, calms the mind, and sets a positive tone for the entire day ahead.", 
    category: "Yoga", 
    readTime: "6 min", 
    author: "Priya Kapoor", 
    date: "May 18, 2025", 
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop", 
    featured: true, 
    tags: ["morning", "beginners"],
    content: "Starting your day with a mindful yoga practice can profoundly shift your physical and mental state. When we wake up, our bodies are naturally stiff, and our minds are often already racing with the day's to-do list.\n\nIn this guide, we'll walk through 10 essential poses that you can do in just 15 minutes to awaken your spine, stretch your hamstrings, and center your thoughts.\n\n1. Balasana (Child's Pose)\n2. Marjaryasana-Bitilasana (Cat-Cow)\n3. Adho Mukha Svanasana (Downward-Facing Dog)\n4. Uttanasana (Forward Fold)\n5. Tadasana (Mountain Pose)\n6. Urdhva Hastasana (Upward Salute)\n7. Virabhadrasana II (Warrior II)\n8. Trikonasana (Triangle Pose)\n9. Vrksasana (Tree Pose)\n10. Savasana (Corpse Pose)\n\nRemember to breathe deeply through your nose as you move through each posture. Let the breath guide the movement, rather than the movement dictating the breath."
  },
  { 
    id: 2, 
    title: "The Science Behind Mindful Breathing and Stress Reduction", 
    excerpt: "Discover how pranayama and conscious breathwork activate the parasympathetic nervous system, reducing cortisol and promoting deep calm.", 
    category: "Breathwork", 
    readTime: "8 min", 
    author: "Dr. Arjun Mehta", 
    date: "May 12, 2025", 
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop", 
    featured: true, 
    tags: ["science", "stress"],
    content: "The autonomic nervous system is divided into two main branches: the sympathetic (fight-or-flight) and the parasympathetic (rest-and-digest). In our modern, fast-paced world, many of us spend too much time in a sympathetic state.\n\nConscious breathing, or pranayama, is one of the most effective tools we have to manually override this stress response. By slowing down our breath, particularly the exhalation, we signal to the brain via the vagus nerve that we are safe.\n\n### The Role of the Vagus Nerve\nThe vagus nerve wanders from the brainstem down through the chest and into the abdomen. It's the primary channel of communication between the brain and the body's internal organs.\n\n### Try This: 4-7-8 Breathing\n1. Inhale quietly through your nose for 4 seconds.\n2. Hold your breath for 7 seconds.\n3. Exhale completely through your mouth, making a whoosh sound, for 8 seconds.\n4. Repeat this cycle four times."
  },
  { 
    id: 3, 
    title: "Ayurvedic Nutrition: Eating for Your Dosha Type", 
    excerpt: "Learn how to identify your Ayurvedic constitution and choose foods that bring balance, energy, and vitality to your unique body type.", 
    category: "Nutrition", 
    readTime: "10 min", 
    author: "Mei Lin", 
    date: "May 8, 2025", 
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop", 
    featured: false, 
    tags: ["ayurveda", "diet"],
    content: "Ayurveda, the sister science to yoga, teaches that each of us has a unique constitution made up of three doshas: Vata, Pitta, and Kapha. While we all have some of each, most people have one or two dominant doshas.\n\nUnderstanding your dosha can help you make nutritional choices that support your natural balance.\n\n### Vata (Air & Space)\nVata types tend to be thin, energetic, and prone to anxiety or dry skin when out of balance. They benefit from warm, grounding, and nourishing foods like root vegetables, hearty soups, and healthy fats (ghee, avocado).\n\n### Pitta (Fire & Water)\nPitta types are usually medium build, intense, and prone to inflammation or acidity. They thrive on cooling foods like cucumber, coconut, mint, and sweet fruits. Spicy and highly acidic foods should be minimized.\n\n### Kapha (Earth & Water)\nKapha types typically have a solid build, a calm demeanor, and can be prone to sluggishness or weight gain. They do best with light, warm, and stimulating foods. Spices like ginger, black pepper, and turmeric are excellent for Kaphas."
  },
  { 
    id: 4, 
    title: "How to Build a Sustainable 20-Minute Daily Yoga Practice", 
    excerpt: "Consistency over perfection. Here's how to build a realistic daily yoga habit that fits your life and delivers real transformation.", 
    category: "Yoga", 
    readTime: "5 min", 
    author: "Sofia Alvarez", 
    date: "May 3, 2025", 
    img: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=400&fit=crop", 
    featured: false, 
    tags: ["habit", "practice"],
    content: "The biggest mistake beginners make is trying to commit to a 60 or 90-minute practice right away. While long classes are wonderful, they are often unsustainable for daily life.\n\nConsistency is far more important than duration. Twenty minutes a day, six days a week, will yield better results than one 90-minute class a week.\n\n### Steps to Build Your Habit\n\n1. **Anchor it to an existing habit**: Do it immediately after brushing your teeth, or right before your morning coffee.\n2. **Prepare the night before**: Roll out your mat and set out your clothes. Remove the friction.\n3. **Follow a routine**: Don't waste time deciding what to do. Have a set 20-minute sequence, or follow a specific video.\n4. **Allow for imperfect days**: Some days you might just lie in Savasana for 10 minutes. That still counts as showing up."
  },
  { 
    id: 5, 
    title: "The Best Wellness Retreats in Bali for 2025", 
    excerpt: "Our curated guide to the most transformative wellness retreats across Bali — from silent meditation immersions to dynamic yoga intensives.", 
    category: "Retreats", 
    readTime: "12 min", 
    author: "James Okonkwo", 
    date: "Apr 28, 2025", 
    img: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop", 
    featured: false, 
    tags: ["travel", "bali"],
    content: "Bali has long been a global epicenter for wellness, attracting seekers from all corners of the earth. But with thousands of retreats on offer, how do you choose the right one for your needs?\n\nWe've personally vetted dozens of centers to bring you this curated list of the absolute best for 2025.\n\n### 1. The Silent Immersion (Ubud)\nFor those seeking deep introspection. This 7-day silent Vipassana-style retreat is held in a stunning eco-resort surrounded by rice paddies. Meals are strictly Ayurvedic and highly nourishing.\n\n### 2. The Dynamic Flow Intensive (Canggu)\nIf you want to advance your physical asana practice, this is the place. Led by world-renowned Vinyasa instructors, expect 4 hours of physical practice daily, complemented by ice baths and surf lessons.\n\n### 3. The Holistic Detox (Uluwatu)\nA medically supervised juice fast and colon hydrotherapy program, combined with gentle yin yoga and breathwork, designed to reset your digestive system and clear mental fog."
  },
  { 
    id: 6, 
    title: "Sleep Better with These 5 Evening Meditation Techniques", 
    excerpt: "Struggling with sleep? These five gentle evening meditation practices will calm your nervous system and guide you into deep, restorative rest.", 
    category: "Meditation", 
    readTime: "7 min", 
    author: "Anika Sharma", 
    date: "Apr 22, 2025", 
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop", 
    featured: false, 
    tags: ["sleep", "evening"],
    content: "Quality sleep is the foundation of wellness. Yet, for many, the moment the head hits the pillow is the moment the mind starts racing.\n\nMeditation is a proven way to transition the brain from the active beta waves of the day into the slower alpha and theta waves that precede sleep.\n\nHere are five techniques to try tonight:\n\n1. **Yoga Nidra**: Often called 'yogic sleep', this is a guided systematic relaxation of the body.\n2. **Body Scan**: Bring your awareness to your toes, and slowly move up your body, consciously relaxing each muscle group.\n3. **Box Breathing**: Inhale for 4, hold for 4, exhale for 4, hold for 4. Repeat.\n4. **Gratitude Reflection**: Think of three specific things you are grateful for from the day. Feel the appreciation in your heart space.\n5. **Mantra Repetition**: Silently repeat a soothing word or phrase, such as 'let go' or 'peace', syncing it with your breath."
  }
];
