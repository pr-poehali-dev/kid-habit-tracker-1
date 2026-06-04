import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Habit {
  id: number;
  name: string;
  emoji: string;
  color: string;
  bg: string;
  shadow: string;
  done: boolean;
  streak: number;
  active: boolean;
}

interface ShopItem {
  id: number;
  name: string;
  emoji: string;
  description: string;
  price: number;
  color: string;
  owned: boolean;
  category: "pets" | "decor" | "power";
}

interface CollectionItem {
  id: number;
  name: string;
  emoji: string;
  rarity: "обычный" | "редкий" | "эпический" | "легендарный";
  color: string;
  equipped: boolean;
}

interface Achievement {
  id: number;
  name: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  color: string;
  progress: number;
  total: number;
}

type Tab = "home" | "shop" | "collection" | "achievements" | "parents";

// ─── Initial data ─────────────────────────────────────────────────────────────

const initHabits: Habit[] = [
  { id: 1, name: "Почистить зубки", emoji: "🦷", color: "#7EC8E3", bg: "#E0F4FF", shadow: "#B5D8FF", done: false, streak: 5, active: true },
  { id: 2, name: "Зарядка", emoji: "🤸", color: "#F7A072", bg: "#FFE8DC", shadow: "#FFCAB5", done: false, streak: 3, active: true },
  { id: 3, name: "Прочитать книгу", emoji: "📚", color: "#A882DD", bg: "#EDE0FF", shadow: "#C8B5FF", done: false, streak: 7, active: true },
  { id: 4, name: "Убрать игрушки", emoji: "🧸", color: "#6CC88A", bg: "#DCFFE8", shadow: "#B5F0C8", done: false, streak: 2, active: true },
  { id: 5, name: "Съесть овощи", emoji: "🥦", color: "#F7C948", bg: "#FFF8DC", shadow: "#FFE4B5", done: false, streak: 4, active: true },
  { id: 6, name: "Выпить воду", emoji: "💧", color: "#5BC0EB", bg: "#DDF4FF", shadow: "#B5D8FF", done: false, streak: 10, active: true },
];

const initShop: ShopItem[] = [
  { id: 1, name: "Котик Пушок", emoji: "🐱", description: "Милый питомец на главном экране", price: 50, color: "#FFB5C8", owned: false, category: "pets" },
  { id: 2, name: "Дракончик", emoji: "🐲", description: "Огнедышащий дружок!", price: 120, color: "#C8B5FF", owned: false, category: "pets" },
  { id: 3, name: "Единорог", emoji: "🦄", description: "Волшебный питомец мечты", price: 200, color: "#FFE4B5", owned: false, category: "pets" },
  { id: 4, name: "Радуга", emoji: "🌈", description: "Украшение фона", price: 30, color: "#B5F0C8", owned: true, category: "decor" },
  { id: 5, name: "Звёздное небо", emoji: "🌟", description: "Ночной фон", price: 60, color: "#B5D8FF", owned: false, category: "decor" },
  { id: 6, name: "Х2 монетки", emoji: "🪙", description: "Двойные монетки 24 часа", price: 80, color: "#FFE4B5", owned: false, category: "power" },
  { id: 7, name: "Щит", emoji: "🛡️", description: "Защита серии на 1 день", price: 40, color: "#B5F5EC", owned: false, category: "power" },
  { id: 8, name: "Робот", emoji: "🤖", description: "Крутой питомец-помощник", price: 150, color: "#E8B5FF", owned: false, category: "pets" },
];

const initCollection: CollectionItem[] = [
  { id: 1, name: "Радуга", emoji: "🌈", rarity: "обычный", color: "#B5F0C8", equipped: true },
  { id: 2, name: "Корона", emoji: "👑", rarity: "редкий", color: "#FFE4B5", equipped: false },
  { id: 3, name: "Кристалл", emoji: "💎", rarity: "эпический", color: "#B5D8FF", equipped: false },
  { id: 4, name: "Дракон", emoji: "🐉", rarity: "легендарный", color: "#E8B5FF", equipped: false },
  { id: 5, name: "Звезда", emoji: "⭐", rarity: "обычный", color: "#FFE4B5", equipped: false },
  { id: 6, name: "Волшебная палочка", emoji: "🪄", rarity: "редкий", color: "#C8B5FF", equipped: false },
];

const initAchievements: Achievement[] = [
  { id: 1, name: "Первый шаг", emoji: "👟", description: "Выполни первую привычку", unlocked: true, color: "#FFE4B5", progress: 1, total: 1 },
  { id: 2, name: "Суперзвезда", emoji: "⭐", description: "Выполни все привычки за день", unlocked: false, color: "#FFD700", progress: 3, total: 6 },
  { id: 3, name: "Недельный герой", emoji: "🦸", description: "7 дней подряд", unlocked: false, color: "#C8B5FF", progress: 5, total: 7 },
  { id: 4, name: "Чистюля", emoji: "✨", description: "10 дней чистить зубы", unlocked: true, color: "#B5D8FF", progress: 10, total: 10 },
  { id: 5, name: "Книжный червь", emoji: "📖", description: "Читай 14 дней подряд", unlocked: false, color: "#B5F0C8", progress: 7, total: 14 },
  { id: 6, name: "Водяной", emoji: "🌊", description: "10 дней пить воду", unlocked: true, color: "#B5F5EC", progress: 10, total: 10 },
  { id: 7, name: "Коллекционер", emoji: "🎁", description: "Собери 5 предметов", unlocked: false, color: "#FFB5C8", progress: 2, total: 5 },
  { id: 8, name: "Богач", emoji: "💰", description: "Накопи 100 монеток", unlocked: false, color: "#FFE4B5", progress: 42, total: 100 },
];

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const todayIdx = (new Date().getDay() + 6) % 7;

const rarityColor: Record<string, string> = {
  обычный: "#9DB8C8",
  редкий: "#6CC88A",
  эпический: "#A882DD",
  легендарный: "#F7C948",
};

const PALETTE = ["#FFB5C8","#FFCAB5","#FFE4B5","#B5F0C8","#B5D8FF","#C8B5FF","#E8B5FF","#B5F5EC"];
let colorIdx = 0;

// ─── Tab screens ──────────────────────────────────────────────────────────────

function HomeTab({ habits, coins, onToggle }: {
  habits: Habit[];
  coins: number;
  onToggle: (id: number) => void;
}) {
  const active = habits.filter(h => h.active);
  const done = active.filter(h => h.done).length;
  const total = active.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const allDone = done === total && total > 0;

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold" style={{ color: "#B09CC8" }}>Привет,</p>
          <h1 className="text-2xl font-black" style={{ color: "#6A4C9C" }}>Маша! 👋</h1>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl"
          style={{ background: "linear-gradient(135deg,#FFE066,#FFC300)", boxShadow: "0 4px 12px rgba(255,195,0,.35)" }}>
          <span className="text-lg">🪙</span>
          <span className="text-base font-black text-white">{coins}</span>
        </div>
      </div>

      {/* Day pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-4" style={{ scrollbarWidth: "none" }}>
        {DAYS.map((d, i) => {
          const isToday = i === todayIdx;
          return (
            <div key={d} className="flex flex-col items-center flex-shrink-0 w-10 py-2 rounded-xl"
              style={isToday
                ? { background: "linear-gradient(135deg,#FF8DC7,#C47FFF)", boxShadow: "0 4px 12px rgba(196,127,255,.4)" }
                : { background: "rgba(255,255,255,.6)" }}>
              <span className="text-xs font-bold" style={{ color: isToday ? "white" : "#C8A8E8" }}>{d}</span>
              {isToday && <div className="w-1.5 h-1.5 rounded-full bg-white mt-1 opacity-80" />}
            </div>
          );
        })}
      </div>

      {/* Progress card */}
      <div className="rounded-3xl p-4 mb-5 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#FF8DC7,#C47FFF 50%,#7EB8FF)", boxShadow: "0 8px 24px rgba(196,127,255,.35)" }}>
        <div className="absolute -right-3 -top-3 text-6xl opacity-20 rotate-12 select-none">🌈</div>
        <div className="flex items-center justify-between mb-3 relative z-10">
          <div>
            <p className="text-white/80 text-sm font-semibold">Сегодня</p>
            <p className="text-white text-3xl font-black">{done}<span className="text-lg opacity-70">/{total}</span></p>
          </div>
          <span className="text-4xl">{allDone ? "🏆" : done >= total / 2 ? "🌟" : "💪"}</span>
        </div>
        <div className="h-3 rounded-full relative z-10" style={{ background: "rgba(255,255,255,.3)" }}>
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: "linear-gradient(90deg,#FFE066,#FFFDE0)", boxShadow: "0 0 8px rgba(255,220,50,.6)" }} />
        </div>
        <p className="text-white/80 text-xs font-semibold mt-2 relative z-10">
          {allDone ? "🎉 Всё выполнено! Молодец!" : `Осталось ${total - done}`}
        </p>
      </div>

      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#C8A8E8" }}>Задания дня ✨</p>
      <div className="space-y-3">
        {active.map(h => (
          <button key={h.id} onClick={() => onToggle(h.id)}
            className="w-full text-left rounded-2xl p-4 flex items-center gap-3 transition-all duration-300 active:scale-95"
            style={{
              background: h.done ? `linear-gradient(135deg,${h.bg},${h.shadow}55)` : "rgba(255,255,255,.85)",
              border: h.done ? `2px solid ${h.shadow}` : "2px solid rgba(255,255,255,.8)",
              boxShadow: h.done ? `0 4px 16px ${h.shadow}88` : "0 2px 12px rgba(180,150,220,.12)",
            }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: h.bg, boxShadow: `0 4px 12px ${h.shadow}66` }}>{h.emoji}</div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-sm truncate"
                style={{ color: h.done ? h.color : "#5A4070", textDecoration: h.done ? "line-through" : "none" }}>{h.name}</p>
              <p className="text-xs font-bold mt-0.5" style={{ color: "#E8A0C0" }}>🔥 {h.streak} дней подряд</p>
            </div>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={h.done
                ? { background: `linear-gradient(135deg,${h.color},${h.shadow})`, boxShadow: `0 4px 8px ${h.shadow}88` }
                : { background: "rgba(200,170,240,.15)", border: "2px dashed rgba(200,170,240,.4)" }}>
              {h.done
                ? <span className="text-white font-black text-sm">✓</span>
                : <span className="text-xs font-bold" style={{ color: "#C8A8E8" }}>+5</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ShopTab({ shop, coins, onBuy }: {
  shop: ShopItem[];
  coins: number;
  onBuy: (id: number) => void;
}) {
  const [cat, setCat] = useState<"all" | "pets" | "decor" | "power">("all");
  const filtered = cat === "all" ? shop : shop.filter(i => i.category === cat);

  const cats: { key: typeof cat; label: string; emoji: string }[] = [
    { key: "all", label: "Все", emoji: "🛒" },
    { key: "pets", label: "Питомцы", emoji: "🐾" },
    { key: "decor", label: "Декор", emoji: "🎨" },
    { key: "power", label: "Бонусы", emoji: "⚡" },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-black" style={{ color: "#6A4C9C" }}>Магазин 🛍️</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{ background: "linear-gradient(135deg,#FFE066,#FFC300)", boxShadow: "0 4px 10px rgba(255,195,0,.3)" }}>
          <span>🪙</span>
          <span className="font-black text-white">{coins}</span>
        </div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
        {cats.map(c => (
          <button key={c.key} onClick={() => setCat(c.key)}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold transition-all"
            style={cat === c.key
              ? { background: "linear-gradient(135deg,#FF8DC7,#C47FFF)", color: "white", boxShadow: "0 4px 10px rgba(196,127,255,.35)" }
              : { background: "rgba(255,255,255,.7)", color: "#9070B0" }}>
            <span>{c.emoji}</span>{c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map(item => (
          <div key={item.id} className="rounded-2xl p-4 flex flex-col items-center text-center"
            style={{
              background: item.owned ? `linear-gradient(135deg,${item.color}66,${item.color}33)` : "rgba(255,255,255,.85)",
              border: item.owned ? `2px solid ${item.color}` : "2px solid rgba(220,200,240,.4)",
              boxShadow: item.owned ? `0 4px 16px ${item.color}44` : "0 2px 12px rgba(180,150,220,.1)",
            }}>
            <div className="text-4xl mb-2">{item.emoji}</div>
            <p className="font-extrabold text-sm leading-tight mb-1" style={{ color: "#5A4070" }}>{item.name}</p>
            <p className="text-xs mb-3 font-semibold" style={{ color: "#9070B0" }}>{item.description}</p>
            {item.owned ? (
              <div className="w-full py-1.5 rounded-xl text-xs font-bold text-white text-center"
                style={{ background: "linear-gradient(135deg,#6CC88A,#4AB070)" }}>✓ Куплено</div>
            ) : (
              <button onClick={() => onBuy(item.id)} disabled={coins < item.price}
                className="w-full py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95"
                style={coins >= item.price
                  ? { background: "linear-gradient(135deg,#FF8DC7,#C47FFF)", color: "white", boxShadow: "0 4px 10px rgba(196,127,255,.35)" }
                  : { background: "rgba(200,180,230,.2)", color: "#C0A8D8" }}>
                🪙 {item.price}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CollectionTab({ collection, onEquip }: {
  collection: CollectionItem[];
  onEquip: (id: number) => void;
}) {
  const equipped = collection.find(c => c.equipped);

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
      <h2 className="text-2xl font-black mb-4" style={{ color: "#6A4C9C" }}>Коллекция 🎁</h2>

      {equipped && (
        <div className="rounded-3xl p-5 mb-5 flex items-center gap-4"
          style={{ background: `linear-gradient(135deg,${equipped.color}88,${equipped.color}44)`, border: `2px solid ${equipped.color}` }}>
          <div className="text-6xl">{equipped.emoji}</div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#9070B0" }}>Активный предмет</p>
            <p className="text-xl font-black" style={{ color: "#5A4070" }}>{equipped.name}</p>
            <div className="inline-block px-2 py-0.5 rounded-full text-xs font-bold mt-1"
              style={{ background: rarityColor[equipped.rarity] + "33", color: rarityColor[equipped.rarity], border: `1px solid ${rarityColor[equipped.rarity]}` }}>
              {equipped.rarity}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#C8A8E8" }}>
        Все предметы ({collection.length}) ✨
      </p>
      <div className="grid grid-cols-2 gap-3">
        {collection.map(item => (
          <div key={item.id} className="rounded-2xl p-4 flex flex-col items-center text-center"
            style={{
              background: item.equipped ? `linear-gradient(135deg,${item.color}66,${item.color}33)` : "rgba(255,255,255,.85)",
              border: item.equipped ? `2px solid ${item.color}` : "2px solid rgba(220,200,240,.4)",
              boxShadow: item.equipped ? `0 4px 16px ${item.color}44` : "0 2px 12px rgba(180,150,220,.1)",
            }}>
            <div className="text-4xl mb-2">{item.emoji}</div>
            <p className="font-extrabold text-sm mb-1" style={{ color: "#5A4070" }}>{item.name}</p>
            <div className="px-2 py-0.5 rounded-full text-xs font-bold mb-3"
              style={{ background: rarityColor[item.rarity] + "22", color: rarityColor[item.rarity], border: `1px solid ${rarityColor[item.rarity]}55` }}>
              {item.rarity}
            </div>
            <button onClick={() => onEquip(item.id)}
              className="w-full py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95"
              style={item.equipped
                ? { background: "rgba(200,180,230,.2)", color: "#C0A8D8" }
                : { background: "linear-gradient(135deg,#FF8DC7,#C47FFF)", color: "white", boxShadow: "0 4px 10px rgba(196,127,255,.35)" }}>
              {item.equipped ? "Надет" : "Надеть"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsTab({ achievements, coins }: { achievements: Achievement[]; coins: number }) {
  const unlocked = achievements.filter(a => a.unlocked).length;

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
      <h2 className="text-2xl font-black mb-4" style={{ color: "#6A4C9C" }}>Успехи 🏆</h2>

      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { emoji: "🏅", label: "Достижений", value: `${unlocked}/${achievements.length}`, color: "#C8B5FF" },
          { emoji: "🪙", label: "Монеток", value: String(coins), color: "#FFE4B5" },
          { emoji: "🔥", label: "Серия", value: "10 дн", color: "#FFCAB5" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-3 text-center"
            style={{ background: `${s.color}55`, border: `2px solid ${s.color}88` }}>
            <div className="text-2xl mb-1">{s.emoji}</div>
            <p className="text-base font-black" style={{ color: "#5A4070" }}>{s.value}</p>
            <p className="text-xs font-semibold" style={{ color: "#9070B0" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#C8A8E8" }}>Все достижения ✨</p>
      <div className="space-y-3">
        {achievements.map(ach => (
          <div key={ach.id} className="rounded-2xl p-4 flex items-center gap-4"
            style={{
              background: ach.unlocked ? `linear-gradient(135deg,${ach.color}55,${ach.color}22)` : "rgba(255,255,255,.7)",
              border: ach.unlocked ? `2px solid ${ach.color}88` : "2px solid rgba(220,200,240,.3)",
              opacity: ach.unlocked ? 1 : 0.65,
            }}>
            <div className="text-4xl flex-shrink-0" style={{ filter: ach.unlocked ? "none" : "grayscale(80%)" }}>
              {ach.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-sm" style={{ color: "#5A4070" }}>{ach.name}</p>
              <p className="text-xs font-semibold mb-2" style={{ color: "#9070B0" }}>{ach.description}</p>
              {!ach.unlocked && (
                <>
                  <div className="h-2 rounded-full" style={{ background: "rgba(200,170,240,.3)" }}>
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${(ach.progress / ach.total) * 100}%`, background: `linear-gradient(90deg,${ach.color},${ach.color}bb)` }} />
                  </div>
                  <p className="text-xs font-bold mt-1" style={{ color: "#C8A8E8" }}>{ach.progress}/{ach.total}</p>
                </>
              )}
            </div>
            {ach.unlocked && (
              <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg,${ach.color},${ach.color}88)` }}>
                <span className="text-white font-black text-sm">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ParentsTab({ habits, onToggleHabit, onAddHabit }: {
  habits: Habit[];
  onToggleHabit: (id: number) => void;
  onAddHabit: (name: string, emoji: string) => void;
}) {
  const [childName, setChildName] = useState("Маша");
  const [editingName, setEditingName] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitEmoji, setNewHabitEmoji] = useState("⭐");
  const [showAddForm, setShowAddForm] = useState(false);
  const [pinEntered, setPinEntered] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const PIN = "1234";

  if (!pinEntered) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-xl font-black mb-1" style={{ color: "#6A4C9C" }}>Раздел для родителей</h2>
        <p className="text-sm font-semibold text-center mb-6" style={{ color: "#9070B0" }}>Введите PIN-код для доступа</p>
        <div className="flex gap-3 mb-6">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-black transition-all"
              style={{
                background: pinError ? "rgba(255,150,150,.2)" : "rgba(255,255,255,.8)",
                border: `2px solid ${pinError ? "rgba(255,100,100,.4)" : "rgba(196,127,255,.3)"}`,
                color: "#6A4C9C",
              }}>
              {pinInput[i] ? "●" : "·"}
            </div>
          ))}
        </div>
        {pinError && <p className="text-xs font-bold mb-4" style={{ color: "#E07070" }}>Неверный код, попробуй ещё</p>}
        <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
          {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((k, i) => (
            <button key={i} disabled={!k}
              onClick={() => {
                if (!k) return;
                setPinError(false);
                if (k === "⌫") { setPinInput(p => p.slice(0, -1)); return; }
                const next = pinInput + k;
                setPinInput(next);
                if (next.length === 4) {
                  if (next === PIN) { setPinEntered(true); setPinInput(""); }
                  else { setPinError(true); setTimeout(() => { setPinInput(""); setPinError(false); }, 600); }
                }
              }}
              className="h-14 rounded-2xl font-black text-lg transition-all active:scale-95"
              style={k
                ? { background: "rgba(255,255,255,.85)", color: "#6A4C9C", boxShadow: "0 2px 10px rgba(180,150,220,.15)", border: "2px solid rgba(220,200,240,.4)" }
                : { opacity: 0, pointerEvents: "none" }}>
              {k}
            </button>
          ))}
        </div>
        <p className="text-xs mt-5 font-semibold" style={{ color: "#C8A8E8" }}>Подсказка: 1234</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-black" style={{ color: "#6A4C9C" }}>Родителям 👨‍👩‍👧</h2>
        <button onClick={() => setPinEntered(false)}
          className="text-xs font-bold px-3 py-1.5 rounded-xl"
          style={{ background: "rgba(200,180,230,.2)", color: "#9070B0" }}>Выйти</button>
      </div>

      {/* Child name */}
      <div className="rounded-2xl p-4 mb-4"
        style={{ background: "rgba(255,255,255,.85)", border: "2px solid rgba(220,200,240,.4)", boxShadow: "0 2px 12px rgba(180,150,220,.1)" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#C8A8E8" }}>Имя ребёнка</p>
        {editingName ? (
          <div className="flex gap-2">
            <input value={childName} onChange={e => setChildName(e.target.value)}
              className="flex-1 rounded-xl px-3 py-2 font-bold text-sm outline-none"
              style={{ background: "rgba(240,230,255,.5)", border: "2px solid rgba(196,127,255,.4)", color: "#5A4070" }} />
            <button onClick={() => setEditingName(false)}
              className="px-4 py-2 rounded-xl text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg,#FF8DC7,#C47FFF)" }}>OK</button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-xl font-black" style={{ color: "#5A4070" }}>{childName}</p>
            <button onClick={() => setEditingName(true)}
              className="text-xs font-bold px-3 py-1.5 rounded-xl"
              style={{ background: "rgba(196,127,255,.15)", color: "#9070B0" }}>Изменить</button>
          </div>
        )}
      </div>

      {/* Habits management */}
      <div className="rounded-2xl p-4 mb-4"
        style={{ background: "rgba(255,255,255,.85)", border: "2px solid rgba(220,200,240,.4)", boxShadow: "0 2px 12px rgba(180,150,220,.1)" }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#C8A8E8" }}>Привычки</p>
          <button onClick={() => setShowAddForm(v => !v)}
            className="text-xs font-bold px-3 py-1.5 rounded-xl text-white"
            style={{ background: "linear-gradient(135deg,#FF8DC7,#C47FFF)" }}>
            {showAddForm ? "Закрыть" : "+ Добавить"}
          </button>
        </div>

        {showAddForm && (
          <div className="mb-3 p-3 rounded-xl" style={{ background: "rgba(240,230,255,.4)", border: "1px solid rgba(196,127,255,.2)" }}>
            <div className="flex gap-2 mb-2">
              <input value={newHabitEmoji} onChange={e => setNewHabitEmoji(e.target.value)}
                className="w-14 text-center rounded-xl px-2 py-2 font-bold text-lg outline-none"
                style={{ background: "rgba(255,255,255,.8)", border: "2px solid rgba(196,127,255,.3)" }} />
              <input value={newHabitName} onChange={e => setNewHabitName(e.target.value)}
                placeholder="Название привычки..."
                className="flex-1 rounded-xl px-3 py-2 text-sm font-semibold outline-none"
                style={{ background: "rgba(255,255,255,.8)", border: "2px solid rgba(196,127,255,.3)", color: "#5A4070" }} />
            </div>
            <button onClick={() => {
              if (newHabitName.trim()) {
                onAddHabit(newHabitName.trim(), newHabitEmoji);
                setNewHabitName("");
                setNewHabitEmoji("⭐");
                setShowAddForm(false);
              }
            }} className="w-full py-2 rounded-xl text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg,#6CC88A,#4AB070)" }}>
              Добавить
            </button>
          </div>
        )}

        <div className="space-y-2">
          {habits.map(h => (
            <div key={h.id} className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: h.active ? h.bg : "rgba(240,235,245,.5)", opacity: h.active ? 1 : 0.5 }}>
              <span className="text-xl">{h.emoji}</span>
              <p className="flex-1 text-sm font-bold truncate" style={{ color: "#5A4070" }}>{h.name}</p>
              <button onClick={() => onToggleHabit(h.id)}
                className="px-3 py-1 rounded-lg text-xs font-bold transition-all"
                style={h.active
                  ? { background: "rgba(108,200,138,.2)", color: "#4A9060" }
                  : { background: "rgba(200,180,230,.2)", color: "#9070B0" }}>
                {h.active ? "Вкл" : "Выкл"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly stats */}
      <div className="rounded-2xl p-4"
        style={{ background: "rgba(255,255,255,.85)", border: "2px solid rgba(220,200,240,.4)", boxShadow: "0 2px 12px rgba(180,150,220,.1)" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#C8A8E8" }}>Сводка недели</p>
        {[
          { label: "Выполнено всего", value: "38 привычек", emoji: "✅" },
          { label: "Лучшая серия", value: "10 дней", emoji: "🔥" },
          { label: "Монеток заработано", value: "190", emoji: "🪙" },
        ].map(s => (
          <div key={s.label} className="flex items-center gap-3 py-2.5 border-b last:border-0"
            style={{ borderColor: "rgba(220,200,240,.3)" }}>
            <span className="text-xl">{s.emoji}</span>
            <p className="flex-1 text-sm font-semibold" style={{ color: "#9070B0" }}>{s.label}</p>
            <p className="font-black text-sm" style={{ color: "#5A4070" }}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [habits, setHabits] = useState<Habit[]>(initHabits);
  const [shop, setShop] = useState<ShopItem[]>(initShop);
  const [collection, setCollection] = useState<CollectionItem[]>(initCollection);
  const [achievements] = useState<Achievement[]>(initAchievements);
  const [coins, setCoins] = useState(42);
  const [confetti, setConfetti] = useState<{ id: number; x: number; emoji: string }[]>([]);

  const spawnConfetti = () => {
    const emojis = ["🌟", "✨", "🎉", "⭐", "💫", "🎊"];
    const items = Array.from({ length: 10 }, (_, i) => ({
      id: i, x: Math.random() * 90 + 5,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setConfetti(items);
    setTimeout(() => setConfetti([]), 1400);
  };

  const toggleHabit = (id: number) => {
    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h;
      const nowDone = !h.done;
      if (nowDone) { setCoins(c => c + 5); spawnConfetti(); }
      else setCoins(c => c - 5);
      return { ...h, done: nowDone };
    }));
  };

  const toggleHabitActive = (id: number) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, active: !h.active } : h));
  };

  const addHabit = (name: string, emoji: string) => {
    const col = PALETTE[colorIdx % PALETTE.length];
    colorIdx++;
    setHabits(prev => [...prev, {
      id: Date.now(), name, emoji,
      color: "#A882DD", bg: col + "55", shadow: col,
      done: false, streak: 0, active: true,
    }]);
  };

  const buyItem = (id: number) => {
    const item = shop.find(i => i.id === id);
    if (!item || item.owned || coins < item.price) return;
    setCoins(c => c - item.price);
    setShop(prev => prev.map(i => i.id === id ? { ...i, owned: true } : i));
    setCollection(prev => [...prev, {
      id: Date.now(), name: item.name, emoji: item.emoji,
      rarity: item.price >= 150 ? "легендарный" : item.price >= 80 ? "эпический" : item.price >= 40 ? "редкий" : "обычный",
      color: item.color, equipped: false,
    }]);
    spawnConfetti();
  };

  const equipItem = (id: number) => {
    setCollection(prev => prev.map(c => ({ ...c, equipped: c.id === id })));
  };

  const navItems: { key: Tab; label: string; icon: string }[] = [
    { key: "home",         label: "Главная",    icon: "Home" },
    { key: "shop",         label: "Магазин",    icon: "ShoppingBag" },
    { key: "collection",   label: "Коллекция",  icon: "Sparkles" },
    { key: "achievements", label: "Успехи",     icon: "Trophy" },
    { key: "parents",      label: "Родителям",  icon: "Settings2" },
  ];

  return (
    <div className="min-h-screen font-nunito flex flex-col"
      style={{ background: "linear-gradient(150deg,#FFF0F8 0%,#F3EEFF 50%,#E8F8FF 100%)" }}>

      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {confetti.map(c => (
          <div key={c.id} className="absolute text-2xl confetti-fall"
            style={{ left: `${c.x}%`, top: "-30px", animationDelay: `${Math.random() * 0.4}s` }}>
            {c.emoji}
          </div>
        ))}
      </div>

      {/* Page content */}
      <div className="max-w-sm mx-auto w-full flex-1 flex flex-col" style={{ paddingBottom: "76px" }}>
        {tab === "home"         && <HomeTab habits={habits} coins={coins} onToggle={toggleHabit} />}
        {tab === "shop"         && <ShopTab shop={shop} coins={coins} onBuy={buyItem} />}
        {tab === "collection"   && <CollectionTab collection={collection} onEquip={equipItem} />}
        {tab === "achievements" && <AchievementsTab achievements={achievements} coins={coins} />}
        {tab === "parents"      && <ParentsTab habits={habits} onToggleHabit={toggleHabitActive} onAddHabit={addHabit} />}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm z-40">
        <div className="mx-3 mb-3 rounded-3xl flex items-center px-1.5 py-1.5 gap-1"
          style={{
            background: "rgba(255,255,255,.94)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 -2px 20px rgba(180,150,220,.15), 0 4px 20px rgba(180,150,220,.15)",
          }}>
          {navItems.map(n => {
            const active = tab === n.key;
            return (
              <button key={n.key} onClick={() => setTab(n.key)}
                className="flex-1 flex flex-col items-center gap-0.5 py-2 rounded-2xl transition-all duration-300"
                style={active
                  ? { background: "linear-gradient(135deg,#FF8DC7,#C47FFF)", boxShadow: "0 4px 14px rgba(196,127,255,.45)" }
                  : {}}>
                <Icon name={n.icon} size={20}
                  style={{ color: active ? "white" : "#C8A8E8", strokeWidth: active ? 2.5 : 1.8 }} />
                <span className="text-[9px] font-bold leading-none"
                  style={{ color: active ? "white" : "#C8A8E8" }}>{n.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
