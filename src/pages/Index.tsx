import { useState, useEffect } from "react";

interface Habit {
  id: number;
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
  shadowColor: string;
  done: boolean;
  streak: number;
}

interface Achievement {
  id: number;
  name: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  color: string;
}

const INITIAL_HABITS: Habit[] = [
  { id: 1, name: "Почистить зубки", emoji: "🦷", color: "#7EC8E3", bgColor: "#E0F4FF", shadowColor: "#B5D8FF", done: false, streak: 5 },
  { id: 2, name: "Зарядка", emoji: "🤸", color: "#F7A072", bgColor: "#FFE8DC", shadowColor: "#FFCAB5", done: false, streak: 3 },
  { id: 3, name: "Прочитать книгу", emoji: "📚", color: "#A882DD", bgColor: "#EDE0FF", shadowColor: "#C8B5FF", done: false, streak: 7 },
  { id: 4, name: "Убрать игрушки", emoji: "🧸", color: "#6CC88A", bgColor: "#DCFFE8", shadowColor: "#B5F0C8", done: false, streak: 2 },
  { id: 5, name: "Покушать овощи", emoji: "🥦", color: "#F7C948", bgColor: "#FFF8DC", shadowColor: "#FFE4B5", done: false, streak: 4 },
  { id: 6, name: "Выпить воду", emoji: "💧", color: "#5BC0EB", bgColor: "#DDF4FF", shadowColor: "#B5D8FF", done: false, streak: 10 },
];

const ACHIEVEMENTS: Achievement[] = [
  { id: 1, name: "Первый шаг", emoji: "👟", description: "Выполни 1 привычку", unlocked: true, color: "#FFE4B5" },
  { id: 2, name: "Суперзвезда", emoji: "⭐", description: "Выполни все привычки за день", unlocked: false, color: "#FFD700" },
  { id: 3, name: "Недельный герой", emoji: "🦸", description: "7 дней подряд", unlocked: false, color: "#C8B5FF" },
  { id: 4, name: "Чистюля", emoji: "✨", description: "10 дней чистить зубы", unlocked: true, color: "#B5D8FF" },
  { id: 5, name: "Книжный червь", emoji: "🐛", description: "Читай 5 дней подряд", unlocked: false, color: "#B5F0C8" },
  { id: 6, name: "Водяной", emoji: "🌊", description: "10 дней пить воду", unlocked: true, color: "#B5F5EC" },
];

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const todayDayIndex = (new Date().getDay() + 6) % 7;

type Tab = "today" | "achievements";

export default function Index() {
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [tab, setTab] = useState<Tab>("today");
  const [coins, setCoins] = useState(42);
  const [poppingId, setPoppingId] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; emoji: string }[]>([]);

  const doneCount = habits.filter((h) => h.done).length;
  const total = habits.length;
  const progress = Math.round((doneCount / total) * 100);
  const allDone = doneCount === total;

  useEffect(() => {
    if (allDone && total > 0) {
      setShowCelebration(true);
      spawnConfetti();
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [allDone]);

  const spawnConfetti = () => {
    const emojis = ["🌟", "✨", "🎉", "🎊", "⭐", "💫", "🦋", "🌈"];
    const items = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setConfetti(items);
    setTimeout(() => setConfetti([]), 1500);
  };

  const toggleHabit = (id: number) => {
    setPoppingId(id);
    setTimeout(() => setPoppingId(null), 400);

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const nowDone = !h.done;
        if (nowDone) setCoins((c) => c + 5);
        else setCoins((c) => c - 5);
        return { ...h, done: nowDone };
      })
    );
  };

  return (
    <div className="min-h-screen font-nunito" style={{ background: "linear-gradient(150deg, #FFF0F8 0%, #F3EEFF 50%, #E8F8FF 100%)" }}>
      {/* Confetti layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute text-2xl confetti-fall"
            style={{ left: `${c.x}%`, top: "-30px", animationDelay: `${Math.random() * 0.5}s` }}
          >
            {c.emoji}
          </div>
        ))}
      </div>

      <div className="max-w-sm mx-auto min-h-screen flex flex-col relative">

        {/* Header */}
        <div className="px-5 pt-8 pb-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-sm font-semibold" style={{ color: "#B09CC8" }}>Привет,</p>
              <h1 className="text-3xl font-black" style={{ color: "#6A4C9C" }}>Маша! 👋</h1>
            </div>
            {/* Coins badge */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-2xl shadow-md"
              style={{
                background: "linear-gradient(135deg, #FFE066, #FFC300)",
                boxShadow: "0 4px 12px rgba(255,195,0,0.35)",
                animation: "bounce-gentle 2s ease-in-out infinite",
              }}
            >
              <span className="text-xl">🪙</span>
              <span className="text-lg font-black text-white">{coins}</span>
            </div>
          </div>

          {/* Day pills */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {DAYS.map((d, i) => {
              const isToday = i === todayDayIndex;
              return (
                <div
                  key={d}
                  className="flex flex-col items-center flex-shrink-0 w-10 py-2 rounded-xl transition-all"
                  style={
                    isToday
                      ? {
                          background: "linear-gradient(135deg, #FF8DC7, #C47FFF)",
                          boxShadow: "0 4px 12px rgba(196,127,255,0.4)",
                        }
                      : { background: "rgba(255,255,255,0.6)" }
                  }
                >
                  <span className="text-xs font-bold" style={{ color: isToday ? "white" : "#C8A8E8" }}>{d}</span>
                  {isToday && <div className="w-1.5 h-1.5 rounded-full bg-white mt-1 opacity-80" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress card */}
        <div
          className="mx-5 mb-4 rounded-3xl p-5 shadow-lg relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #FF8DC7 0%, #C47FFF 50%, #7EB8FF 100%)" }}
        >
          <div className="absolute -right-4 -top-4 text-7xl opacity-20 select-none rotate-12">🌈</div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-white/80 text-sm font-semibold">Сегодня выполнено</p>
                <p className="text-white text-4xl font-black">
                  {doneCount}
                  <span className="text-xl font-bold opacity-70">/{total}</span>
                </p>
              </div>
              <div className="text-5xl">{allDone ? "🏆" : doneCount >= total / 2 ? "🌟" : "💪"}</div>
            </div>
            <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.3)" }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #FFE066, #FFFDE0)",
                  boxShadow: "0 0 8px rgba(255,220,50,0.6)",
                }}
              />
            </div>
            <p className="text-white/80 text-xs font-semibold mt-2">
              {allDone ? "🎉 Всё выполнено! Ты молодец!" : `Осталось ещё ${total - doneCount} привычки`}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="mx-5 mb-4 flex rounded-2xl p-1"
          style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(10px)" }}
        >
          {(
            [
              ["today", "🌸", "Привычки"],
              ["achievements", "🏅", "Достижения"],
            ] as const
          ).map(([key, emoji, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
              style={
                tab === key
                  ? {
                      background: "linear-gradient(135deg, #FF8DC7, #C47FFF)",
                      color: "white",
                      boxShadow: "0 4px 12px rgba(196,127,255,0.35)",
                    }
                  : { color: "#B09CC8" }
              }
            >
              <span>{emoji}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 px-5 pb-10 overflow-y-auto">

          {/* Today tab */}
          {tab === "today" && (
            <div className="space-y-3 animate-fade-in">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#C8A8E8" }}>
                Задания на сегодня ✨
              </p>
              {habits.map((habit, idx) => (
                <button
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id)}
                  className="w-full text-left rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden"
                  style={{
                    background: habit.done
                      ? `linear-gradient(135deg, ${habit.bgColor}, ${habit.shadowColor}55)`
                      : "rgba(255,255,255,0.85)",
                    boxShadow: habit.done
                      ? `0 4px 16px ${habit.shadowColor}88`
                      : "0 2px 12px rgba(180,150,220,0.12)",
                    border: habit.done
                      ? `2px solid ${habit.shadowColor}`
                      : "2px solid rgba(255,255,255,0.8)",
                    transform: poppingId === habit.id ? "scale(1.04)" : "scale(1)",
                    transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                    backdropFilter: "blur(8px)",
                    animationDelay: `${idx * 0.06}s`,
                  }}
                >
                  {/* Emoji */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{
                      background: habit.bgColor,
                      boxShadow: `0 4px 12px ${habit.shadowColor}66`,
                    }}
                  >
                    {habit.emoji}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-extrabold text-base truncate"
                      style={{
                        color: habit.done ? habit.color : "#5A4070",
                        textDecoration: habit.done ? "line-through" : "none",
                      }}
                    >
                      {habit.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-sm">🔥</span>
                      <span className="text-xs font-bold" style={{ color: "#E8A0C0" }}>
                        {habit.streak} дней подряд
                      </span>
                    </div>
                  </div>

                  {/* Check */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={
                      habit.done
                        ? {
                            background: `linear-gradient(135deg, ${habit.color}, ${habit.shadowColor})`,
                            boxShadow: `0 4px 8px ${habit.shadowColor}88`,
                          }
                        : {
                            background: "rgba(200,170,240,0.15)",
                            border: "2px dashed rgba(200,170,240,0.4)",
                          }
                    }
                  >
                    {habit.done ? (
                      <span className="text-white font-black text-base">✓</span>
                    ) : (
                      <span className="text-xs font-bold" style={{ color: "#C8A8E8" }}>+5</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Achievements tab */}
          {tab === "achievements" && (
            <div className="animate-fade-in">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#C8A8E8" }}>
                Твои награды 🏆
              </p>

              {/* Coins banner */}
              <div
                className="rounded-3xl p-5 mb-5 flex items-center gap-4"
                style={{
                  background: "linear-gradient(135deg, #FFE066, #FFC300, #FF9500)",
                  boxShadow: "0 6px 20px rgba(255,160,0,0.35)",
                }}
              >
                <div className="text-5xl">🪙</div>
                <div>
                  <p className="text-white/80 text-sm font-semibold">Всего монеток</p>
                  <p className="text-white text-4xl font-black">{coins}</p>
                  <p className="text-white/70 text-xs font-semibold mt-0.5">+5 за каждую привычку</p>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 gap-3">
                {ACHIEVEMENTS.map((ach, idx) => (
                  <div
                    key={ach.id}
                    className="rounded-2xl p-4 flex flex-col items-center text-center"
                    style={{
                      background: ach.unlocked
                        ? `linear-gradient(135deg, ${ach.color}88, ${ach.color}44)`
                        : "rgba(255,255,255,0.5)",
                      border: ach.unlocked
                        ? `2px solid ${ach.color}`
                        : "2px solid rgba(200,180,230,0.3)",
                      boxShadow: ach.unlocked ? `0 4px 16px ${ach.color}55` : "none",
                      opacity: ach.unlocked ? 1 : 0.55,
                      animation: `fade-in 0.4s ease-out ${idx * 0.07}s both`,
                    }}
                  >
                    <div className="text-4xl mb-2" style={{ filter: ach.unlocked ? "none" : "grayscale(100%)" }}>
                      {ach.emoji}
                    </div>
                    <p className="font-extrabold text-sm leading-tight" style={{ color: ach.unlocked ? "#5A4070" : "#C0B0D0" }}>
                      {ach.name}
                    </p>
                    <p className="text-xs mt-1 font-semibold" style={{ color: ach.unlocked ? "#9070B0" : "#C8B8D8" }}>
                      {ach.description}
                    </p>
                    {ach.unlocked && (
                      <div
                        className="mt-2 px-3 py-0.5 rounded-full text-xs font-bold text-white"
                        style={{ background: "linear-gradient(135deg, #FF8DC7, #C47FFF)" }}
                      >
                        Получено! ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Celebration popup */}
        {showCelebration && (
          <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
            <div
              className="rounded-3xl p-8 text-center bounce-in mx-8"
              style={{
                background: "linear-gradient(135deg, #FF8DC7, #C47FFF, #7EB8FF)",
                boxShadow: "0 20px 60px rgba(196,127,255,0.5)",
              }}
            >
              <div className="text-7xl mb-3">🏆</div>
              <p className="text-white text-2xl font-black">Все привычки!</p>
              <p className="text-white/80 font-bold mt-1">Ты настоящий герой!</p>
            </div>
          </div>
        )}

        {/* Bottom gradient line */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm pointer-events-none">
          <div
            className="h-1 mx-8 mb-3 rounded-full"
            style={{ background: "linear-gradient(90deg, #FF8DC7, #C47FFF, #7EB8FF)" }}
          />
        </div>
      </div>
    </div>
  );
}
