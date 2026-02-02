import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Check,
  X,
  ArrowRight,
  RefreshCw,
  Trophy,
  Brain,
  ChevronRight,
  ChevronLeft,
  List,
  ExternalLink,
} from "lucide-react";

/**
 * ⚙️ НАЛАШТУВАННЯ ДЛЯ КОРИСТУВАЧА
 */
const GOOGLE_DOC_URL = "#";
const NEXT_APP_URL = "#"; // Посилання на ТЕМУ 13 (Liczebnik)
const PREV_APP_URL = "#"; // Посилання на ТЕМУ 11
const MENU_APP_URL = "#";

// --- БАЗА ПИТАНЬ (50 шт) - ZAIMEK ---
const QUESTIONS_DB = [
  // --- MÓJ / TWÓJ (Змінюються за родами) ---

  // Męski (Чоловічий)
  {
    text: "To jest ______ (ja) dom.",
    options: ["mój", "moja", "moje"],
    correct: 0,
    explanation: "Dom (Він) &rarr; Mój.",
  },
  {
    text: "Gdzie jest ______ (ty) telefon?",
    options: ["twój", "twoja", "twoje"],
    correct: 0,
    explanation: "Telefon (Він) &rarr; Twój.",
  },
  {
    text: "To jest ______ (my) samochód.",
    options: ["nasz", "nasza", "nasze"],
    correct: 0,
    explanation: "Samochód (Він) &rarr; Nasz.",
  },
  {
    text: "Czy to ______ (wy) bagaż?",
    options: ["wasz", "wasza", "wasze"],
    correct: 0,
    explanation: "Bagaż (Він) &rarr; Wasz.",
  },
  {
    text: "To jest ______ (ja) brat.",
    options: ["mój", "moja", "moje"],
    correct: 0,
    explanation: "Brat (Він) &rarr; Mój.",
  },

  // Żeński (Жіночий)
  {
    text: "To jest ______ (ja) mama.",
    options: ["moja", "mój", "moje"],
    correct: 0,
    explanation: "Mama (Вона) &rarr; Moja.",
  },
  {
    text: "Gdzie jest ______ (ty) siostra?",
    options: ["twoja", "twój", "twoje"],
    correct: 0,
    explanation: "Siostra (Вона) &rarr; Twoja.",
  },
  {
    text: "To jest ______ (my) szkoła.",
    options: ["nasza", "nasz", "nasze"],
    correct: 0,
    explanation: "Szkoła (Вона) &rarr; Nasza.",
  },
  {
    text: "To jest ______ (wy) praca.",
    options: ["wasza", "wasz", "wasze"],
    correct: 0,
    explanation: "Praca (Вона) &rarr; Wasza.",
  },
  {
    text: "Lubię ______ (ja) kawę.",
    options: ["moją", "mój", "moje"],
    correct: 0,
    explanation: "Kawa (Вона) -> Biernik (Kogo? Co?) -> Moją.",
  },

  // Nijaki (Середній)
  {
    text: "To jest ______ (ja) dziecko.",
    options: ["moje", "mój", "moja"],
    correct: 0,
    explanation: "Dziecko (Воно) &rarr; Moje.",
  },
  {
    text: "Gdzie jest ______ (ty) okno?",
    options: ["twoje", "twój", "twoja"],
    correct: 0,
    explanation: "Okno (Воно) &rarr; Twoje.",
  },
  {
    text: "To jest ______ (my) mieszkanie.",
    options: ["nasze", "nasz", "nasza"],
    correct: 0,
    explanation: "Mieszkanie (Воно) &rarr; Nasze.",
  },
  {
    text: "Czy to ______ (wy) zadanie?",
    options: ["wasze", "wasz", "wasza"],
    correct: 0,
    explanation: "Zadanie (Воно) &rarr; Wasze.",
  },
  {
    text: "To jest ______ (ja) imię.",
    options: ["moje", "mój", "moja"],
    correct: 0,
    explanation: "Imię (Воно) &rarr; Moje.",
  },

  // --- JEGO / JEJ / ICH (НЕ змінюються!) ---
  {
    text: "To jest (On) ______ dom.",
    options: ["jego", "jega", "jeg"],
    correct: 0,
    explanation: "Jego ніколи не змінюється.",
  },
  {
    text: "To jest (On) ______ mama.",
    options: ["jego", "jega", "jeja"],
    correct: 0,
    explanation: "Jego ніколи не змінюється (навіть якщо мама - вона).",
  },
  {
    text: "To jest (On) ______ dziecko.",
    options: ["jego", "jega", "jegie"],
    correct: 0,
    explanation: "Jego ніколи не змінюється.",
  },

  {
    text: "To jest (Ona) ______ mąż.",
    options: ["jej", "jeja", "jejo"],
    correct: 0,
    explanation: "Jej ніколи не змінюється.",
  },
  {
    text: "To jest (Ona) ______ siostra.",
    options: ["jej", "jeja", "jeje"],
    correct: 0,
    explanation: "Jej ніколи не змінюється.",
  },
  {
    text: "To jest (Ona) ______ okno.",
    options: ["jej", "jeje", "jeja"],
    correct: 0,
    explanation: "Jej ніколи не змінюється.",
  },

  {
    text: "To jest (Oni) ______ problem.",
    options: ["ich", "iche", "icha"],
    correct: 0,
    explanation: "Ich ніколи не змінюється.",
  },
  {
    text: "To jest (Oni) ______ sprawa.",
    options: ["ich", "icha", "iche"],
    correct: 0,
    explanation: "Ich ніколи не змінюється.",
  },
  {
    text: "To są (Oni) ______ dzieci.",
    options: ["ich", "iche", "icha"],
    correct: 0,
    explanation: "Ich ніколи не змінюється.",
  },
  {
    text: "Lubię ______ (Oni) psa.",
    options: ["ich", "ichego", "icha"],
    correct: 0,
    explanation: "Ich ніколи не змінюється.",
  },

  // --- Вказівні: TEN / TA / TO / TAMTEN ---
  {
    text: "______ dom jest duży.",
    options: ["Ten", "Ta", "To"],
    correct: 0,
    explanation: "Dom (Він) &rarr; Ten.",
  },
  {
    text: "______ kobieta jest ładna.",
    options: ["Ta", "Ten", "To"],
    correct: 0,
    explanation: "Kobieta (Вона) &rarr; Ta.",
  },
  {
    text: "______ okno jest otwarte.",
    options: ["To", "Ten", "Ta"],
    correct: 2,
    explanation: "Okno (Воно) &rarr; To.",
  },
  {
    text: "Lubię ______ (ten) film (Biernik).",
    options: ["ten", "tę", "tego"],
    correct: 0,
    explanation: "Film (неістота) &rarr; Ten (не змінюється).",
  },
  {
    text: "Widzę ______ (ten) panią (Biernik).",
    options: ["tę", "tą", "ten"],
    correct: 0,
    explanation:
      "Pani (Жін) &rarr; Tę (літературна норма) або Tą (розмовна). В тестах краще Tę.",
  },
  {
    text: "Tamten ______ (stół) jest stary.",
    options: ["stół", "stoła", "stołu"],
    correct: 0,
    explanation: "Тамтой стіл.",
  },
  {
    text: "Podaj mi ______ (ta) książkę.",
    options: ["tę", "ten", "to"],
    correct: 0,
    explanation: "Жін. рід Biernik &rarr; Tę.",
  },
  {
    text: "______ (Tamta) dziewczyna.",
    options: ["Tamta", "Tamten", "Tamto"],
    correct: 0,
    explanation: "Dziewczyna &rarr; Tamta.",
  },
  {
    text: "______ są moi koledzy.",
    options: ["To", "Ten", "Ta"],
    correct: 0,
    explanation: "'To są...' (Це є...) - універсальна вказівка на множину.",
  },
  {
    text: "______ ludzie są mili.",
    options: ["Ci", "Te", "To"],
    correct: 0,
    explanation: "Люди (чоловіки) &rarr; Ci (множина від Ten).",
  },

  // --- SWÓJ (Свій) vs MÓJ/JEGO ---
  {
    text: "(Ja) Kocham ______ żonę.",
    options: ["swoją", "moją", "jego"],
    correct: 0,
    explanation: "Свою (бо Я люблю). 'Moją' теж вірно, але 'Swoją' краще.",
  },
  {
    text: "(On) Kocha ______ (własną) żonę.",
    options: ["swoją", "jego", "ją"],
    correct: 0,
    explanation:
      "Свою власну &rarr; Swoją. Якщо скажемо 'Jego', це буде дружина іншого.",
  },
  {
    text: "(Ona) Lubię ______ pracę.",
    options: ["swoją", "jej", "ją"],
    correct: 0,
    explanation: "Свою &rarr; Swoją.",
  },
  {
    text: "(My) Robimy ______ zadania.",
    options: ["swoje", "nasze", "ich"],
    correct: 0,
    explanation: "Свої &rarr; Swoje.",
  },
  {
    text: "(Ty) Masz ______ problem.",
    options: ["swój", "twój", "twoje"],
    correct: 0,
    explanation: "Свій &rarr; Swój.",
  },

  // --- Питальні: KTO / CO / JAKI / CZYJ ---
  {
    text: "______ to jest? - To jest Adam.",
    options: ["Kto", "Co", "Jaki"],
    correct: 0,
    explanation: "Про людину &rarr; Kto.",
  },
  {
    text: "______ to jest? - To jest stół.",
    options: ["Co", "Kto", "Jaki"],
    correct: 0,
    explanation: "Про річ &rarr; Co.",
  },
  {
    text: "______ jest ten dom? - Stary.",
    options: ["Jaki", "Kto", "Co"],
    correct: 0,
    explanation: "Про якість &rarr; Jaki.",
  },
  {
    text: "______ jest ta książka? - Ciekawa.",
    options: ["Jaka", "Jaki", "Jakie"],
    correct: 0,
    explanation: "Książka (Вона) &rarr; Jaka.",
  },
  {
    text: "______ jest to dziecko? - Małe.",
    options: ["Jakie", "Jaka", "Jaki"],
    correct: 0,
    explanation: "Dziecko (Воно) &rarr; Jakie.",
  },
  {
    text: "______ to telefon? - Mój.",
    options: ["Czyj", "Kto", "Co"],
    correct: 0,
    explanation: "Чий &rarr; Czyj.",
  },
  {
    text: "______ to torba? - Moja.",
    options: ["Czyja", "Czyj", "Czyje"],
    correct: 0,
    explanation: "Torba (Вона) &rarr; Czyja.",
  },
  {
    text: "______ autobusem jedziesz? - Piątym.",
    options: ["Którym", "Jaki", "Co"],
    correct: 0,
    explanation: "Котрим/Яким (номер) &rarr; Którym.",
  },
  {
    text: "______ robisz? - Czytam.",
    options: ["Co", "Kto", "Jaki"],
    correct: 0,
    explanation: "Що &rarr; Co.",
  },
  {
    text: "______ pan mieszka? - W Krakowie.",
    options: ["Gdzie", "Co", "Kiedy"],
    correct: 0,
    explanation: "Де &rarr; Gdzie.",
  },
];

const PolishTrainerT12 = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showTheory, setShowTheory] = useState(true);

  // Ініціалізація
  useEffect(() => {
    restartGame();
  }, []);

  const restartGame = () => {
    const shuffled = [...QUESTIONS_DB].sort(() => 0.5 - Math.random());
    setShuffledQuestions(shuffled);
    setCurrentQIndex(0);
    setScore(0);
    setCompleted(false);
    setShowFeedback(false);
    setSelectedOption(null);
  };

  const handleOptionClick = (index) => {
    if (showFeedback) return;

    const question = shuffledQuestions[currentQIndex];
    const correct = index === question.correct;

    setSelectedOption(index);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < shuffledQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setShowFeedback(false);
      setSelectedOption(null);
    } else {
      setCompleted(true);
    }
  };

  // --- RENDERERS ---

  if (shuffledQuestions.length === 0)
    return <div className="p-10 text-center">Завантаження...</div>;

  const question = shuffledQuestions[currentQIndex];
  const progressPercentage = Math.round(
    (currentQIndex / shuffledQuestions.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* 1. HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              A1
            </span>
            <h1 className="font-bold text-slate-800 truncate">
              Тема 12: Zaimek
            </h1>
          </div>

          <div className="flex items-center gap-1">
            {/* Назад */}
            <a
              href={PREV_APP_URL}
              className={`p-2 rounded-full transition-colors ${
                PREV_APP_URL === "#"
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              title="Попередня тема"
            >
              <ChevronLeft size={24} />
            </a>

            {/* МЕНЮ */}
            <a
              href={MENU_APP_URL}
              className={`p-2 rounded-full transition-colors ${
                MENU_APP_URL === "#"
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              title="Усі теми"
            >
              <List size={24} />
            </a>

            {/* Вперед */}
            <a
              href={NEXT_APP_URL}
              className={`p-2 rounded-full transition-colors ${
                NEXT_APP_URL === "#"
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
              title="Наступна тема"
            >
              <ChevronRight size={24} />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-xl mx-auto w-full p-4 md:p-6 flex flex-col">
        {/* 2. THEORY BLOCK (Collapsible) */}
        <div className="mb-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div
            onClick={() => setShowTheory(!showTheory)}
            className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2 font-semibold text-blue-700">
              <BookOpen size={20} />
              <span>Експрес-правила</span>
            </div>
            <span className="text-xs text-slate-400">
              {showTheory ? "Згорнути" : "Показати"}
            </span>
          </div>

          {showTheory && (
            <div className="p-5 text-sm leading-relaxed text-slate-700 space-y-4">
              <p>
                <b>Zaimek (Займенник)</b> — слова, що замінюють імена (Я, Твій,
                Цей).
              </p>

              <div className="grid grid-cols-1 gap-2">
                <div className="p-2 bg-blue-50 rounded border border-blue-100">
                  <strong className="block text-blue-800">
                    1. Присвійні (ЗМІНЮЮТЬСЯ):
                  </strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      <b>Mój, Twój, Nasz, Wasz</b> &rarr; поводяться як
                      прикметники!
                    </li>
                    <li>
                      <i>Mój dom, Moja mama, Moje okno.</i>
                    </li>
                  </ul>
                </div>

                <div className="p-2 bg-red-50 rounded border border-red-100">
                  <strong className="block text-red-800">
                    2. Присвійні (НЕ ЗМІНЮЮТЬСЯ):
                  </strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      <b>Jego</b> (його), <b>Jej</b> (її), <b>Ich</b> (їх).
                    </li>
                    <li>
                      <i>Jej dom, Jej mama, Jej okno</i> (форма незмінна!).
                    </li>
                  </ul>
                </div>

                <div className="p-2 bg-green-50 rounded border border-green-100">
                  <strong className="block text-green-800">3. Вказівні:</strong>
                  <span className="text-xs">
                    Ten (він), Ta (вона), To (воно), Ci/Te (вони).
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 mt-2">
                <a
                  href={GOOGLE_DOC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${
                    GOOGLE_DOC_URL === "#"
                      ? "text-slate-400 cursor-not-allowed"
                      : "text-blue-600 hover:underline"
                  }`}
                >
                  <ExternalLink size={14} />
                  {GOOGLE_DOC_URL === "#"
                    ? "Детальні правила (Скоро)"
                    : "Відкрити повні правила"}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 3. GAME ZONE */}
        {!completed ? (
          <div className="flex-1 flex flex-col justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center mb-6 min-h-[160px] flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Питання {currentQIndex + 1} з {shuffledQuestions.length}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
                {question.text}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-6">
              {question.options.map((opt, idx) => {
                let btnClass =
                  "p-4 rounded-xl font-semibold text-lg transition-all border-2 text-left relative ";

                if (showFeedback) {
                  if (idx === question.correct) {
                    btnClass += "bg-green-100 border-green-500 text-green-800";
                  } else if (selectedOption === idx) {
                    btnClass += "bg-red-100 border-red-500 text-red-800";
                  } else {
                    btnClass += "bg-white border-slate-100 text-slate-300";
                  }
                } else {
                  btnClass +=
                    "bg-white border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-700 shadow-sm active:scale-[0.98]";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={showFeedback}
                    className={btnClass}
                  >
                    {opt}
                    {showFeedback && idx === question.correct && (
                      <Check
                        size={20}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      />
                    )}
                    {showFeedback &&
                      idx !== question.correct &&
                      selectedOption === idx && (
                        <X
                          size={20}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        />
                      )}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                {!isCorrect && (
                  <div className="bg-red-50 text-red-800 p-4 rounded-xl mb-4 text-sm border border-red-100 flex gap-3 items-start">
                    <Brain size={20} className="shrink-0 mt-0.5" />
                    <div>
                      <strong>Підказка:</strong> {question.explanation}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleNext}
                  className={`w-full p-4 rounded-xl font-bold text-lg text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
                    isCorrect
                      ? "bg-green-600 hover:bg-green-700 shadow-green-200"
                      : "bg-slate-800 hover:bg-slate-900 shadow-slate-300"
                  }`}
                >
                  {currentQIndex < shuffledQuestions.length - 1
                    ? "Далі"
                    : "Завершити"}{" "}
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
            <div className="mb-6">
              {score === shuffledQuestions.length ? (
                <Trophy size={80} className="text-yellow-500 mx-auto" />
              ) : score >= shuffledQuestions.length * 0.8 ? (
                <Trophy size={80} className="text-blue-500 mx-auto" />
              ) : (
                <RefreshCw size={80} className="text-slate-300 mx-auto" />
              )}
            </div>

            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              {score === shuffledQuestions.length
                ? "Ідеально!"
                : "Тренування завершено!"}
            </h2>
            <p className="text-slate-500 mb-8 text-lg">
              Ваш результат: <strong className="text-slate-800">{score}</strong>{" "}
              з {shuffledQuestions.length}
            </p>

            <button
              onClick={restartGame}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
            >
              <RefreshCw size={20} />
              Почати знову
            </button>
          </div>
        )}
      </main>

      {!completed && (
        <footer className="bg-white border-t border-slate-100 p-4">
          <div className="max-w-xl mx-auto">
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
              <span>Прогрес</span>
              <span>
                {Math.round((score / (currentQIndex + 1)) * 100) || 0}% Успіху
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default PolishTrainerT12;
