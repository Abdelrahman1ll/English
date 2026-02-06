import { useState } from "react";
import { Briefcase, Building2, MessageCircle, Volume2 } from "lucide-react";

type JobItem = {
  text: string;
  translation?: string;
};

const JOBS: JobItem[] = [
  { text: "Teacher", translation: "مدرس" },
  { text: "Doctor", translation: "طبيب" },
  { text: "Nurse", translation: "ممرضة" },
  { text: "Salesperson", translation: "بائع" },
  { text: "Waiter", translation: "نادل" },
  { text: "Waitress", translation: "نادلة" },
  { text: "Assistant", translation: "مساعد" },
  { text: "Lawyer", translation: "محامي" },
  { text: "Policeman", translation: "شرطي" },
  { text: "Policewoman", translation: "شرطية" },
  { text: "Factory Worker", translation: "عامل مصنع" },
  { text: "Student", translation: "طالب" },
];

const PLACES: JobItem[] = [
  { text: "In a hospital", translation: "في مستشفى" },
  { text: "In a store", translation: "في متجر" },
  { text: "In a restaurant", translation: "في مطعم" },
  { text: "In an office", translation: "في مكتب" },
  { text: "In a school", translation: "في مدرسة" },
  { text: "In a factory", translation: "في مصنع" },
  { text: "At home", translation: "في المنزل" },
  { text: "On the street", translation: "في الشارع" },
];

const PHRASES: JobItem[] = [
  { text: "What does she do?", translation: "ماذا تعمل؟" },
  { text: "She's a teacher.", translation: "هي مدرسة." },
  { text: "What does he do?", translation: "ماذا يعمل؟" },
  { text: "He works for Google.", translation: "هو يعمل في جوجل." },
  { text: "He's in school.", translation: "هو في المدرسة." },
  { text: "She's in college.", translation: "هي في الكلية." },
  { text: "She's at university.", translation: "هي في الجامعة." },
  { text: "She studies economics.", translation: "هي تدرس الاقتصاد." },
  { text: "He doesn't have a job.", translation: "هو ليس لديه وظيفة." },
  { text: "She's retired.", translation: "هي متقاعدة." },
  { text: "Where does a doctor work?", translation: "أين يعمل الطبيب؟" },
  { text: "Where do you work?", translation: "أين تعمل أنت؟" },
];

export function JobsPage() {
  const [playingItem, setPlayingItem] = useState<string | null>(null);

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      setPlayingItem(text);
      utterance.onend = () => setPlayingItem(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const SectionTitle = ({
    icon: Icon,
    title,
  }: {
    icon: any;
    title: string;
  }) => (
    <div className="flex items-center gap-3 text-white mb-6 border-b border-white/10 pb-2">
      <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
        <Icon size={20} />
      </div>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  );

  const ItemCard = ({ item }: { item: JobItem }) => (
    <button
      onClick={() => speak(item.text)}
      className={`group flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
        playingItem === item.text
          ? "bg-blue-600/20 border-blue-500/50"
          : "bg-[#1e1e1e] border-white/5 hover:bg-[#2a2a2a]"
      }`}
    >
      <div>
        <div
          className={`font-medium ${playingItem === item.text ? "text-blue-400" : "text-neutral-200"}`}
        >
          {item.text}
        </div>
        {item.translation && (
          <div className="text-sm text-neutral-500 font-arabic mt-1">
            {item.translation}
          </div>
        )}
      </div>
      <Volume2
        size={16}
        className={`transition-opacity ${playingItem === item.text ? "text-blue-400 opacity-100" : "text-neutral-500 opacity-0 group-hover:opacity-100"}`}
      />
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Jobs & Workplaces
        </h1>
        <p className="text-neutral-400 mt-2">
          Talk about what people do and where they work.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Jobs Section */}
        <div>
          <SectionTitle icon={Briefcase} title="Professions" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {JOBS.map((job) => (
              <ItemCard key={job.text} item={job} />
            ))}
          </div>
        </div>

        {/* Places Section */}
        <div>
          <SectionTitle icon={Building2} title="Workplaces" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PLACES.map((place) => (
              <ItemCard key={place.text} item={place} />
            ))}
          </div>
        </div>
      </div>

      {/* Phrases Section */}
      <div>
        <SectionTitle icon={MessageCircle} title="Useful Phrases" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PHRASES.map((phrase) => (
            <button
              key={phrase.text}
              onClick={() => speak(phrase.text)}
              className={`p-5 rounded-2xl border text-left transition-all ${
                playingItem === phrase.text
                  ? "bg-amber-500/10 border-amber-500/30"
                  : "bg-[#1e1e1e] border-white/5 hover:bg-[#252525]"
              }`}
            >
              <div
                className={`font-medium text-lg mb-2 ${playingItem === phrase.text ? "text-amber-400" : "text-white"}`}
              >
                "{phrase.text}"
              </div>
              {phrase.translation && (
                <div className="text-neutral-500 font-arabic mb-3">
                  {phrase.translation}
                </div>
              )}
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                <Volume2 size={12} />
                Click to listen
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
