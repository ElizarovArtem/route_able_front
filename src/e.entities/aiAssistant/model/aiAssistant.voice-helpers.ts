import type { SpeakOptions } from './aiAssistant.model.ts';

/** Голосовой воспроизводитель */

const lastSaidUntilByKey = new Map<string, number>();

/** Нормализуем текст для сравнения и ключей кулдауна */
function normalizeText(text: string): string {
  return text.trim().replace(/\s+/g, ' ').toLowerCase();
}

/** Пытаемся найти голос по имени/языку */
function pickVoice(
  language?: string,
  voiceName?: string,
): SpeechSynthesisVoice | undefined {
  if (!('speechSynthesis' in window)) return undefined;
  const voices = window.speechSynthesis.getVoices();

  if (voiceName) {
    const byName = voices.find((v) => v.name === voiceName);
    if (byName) return byName;
  }
  if (language) {
    const byLang = voices.find((v) => v.lang === language);
    if (byLang) return byLang;
  }
  return voices[0];
}

/** Подготовить движок (некоторые браузеры загружают голоса асинхронно) */
export function ensureVoicesLoaded(): Promise<void> {
  if (!('speechSynthesis' in window)) return Promise.resolve();
  return new Promise((resolve) => {
    const tryResolve = () => resolve();
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) return resolve();
    window.speechSynthesis.onvoiceschanged = tryResolve;
    // небольшой таймаут как страховка
    setTimeout(tryResolve, 1000);
  });
}

/** Основная функция озвучки с антиспамом и опциями */
export async function speakText(text: string, options: SpeakOptions = {}) {
  if (!('speechSynthesis' in window)) return;
  if (!text) return;

  await ensureVoicesLoaded();

  const {
    cooldownMs = 3000,
    language = 'ru-RU',
    voiceName,
    rate = 1.0,
    pitch = 1.0,
    volume = 1.0,
    interrupt = false,
    groupKey,
    dedupe = true,
  } = options;

  const normalized = normalizeText(text);
  const cooldownKey = groupKey ? `${groupKey}:${normalized}` : normalized;

  const nowMs = Date.now();
  const allowedAfterMs = lastSaidUntilByKey.get(cooldownKey) ?? 0;

  // антиспам по кулдауну
  if (nowMs < allowedAfterMs) return;

  // простая дедупликация: если сейчас уже говорит то же самое — не добавлять
  if (dedupe && window.speechSynthesis.speaking) {
    // у Web Speech нет публичного доступа к очереди, поэтому ограничимся прерыванием/скипом
    // если хотим прерывать — сделаем cancel, иначе просто дадим договорить
    if (!interrupt) return;
  }

  if (interrupt) {
    window.speechSynthesis.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = volume;

  const selectedVoice = pickVoice(language, voiceName);
  if (selectedVoice) utterance.voice = selectedVoice;

  // обновим кулдаун только при старте воспроизведения (чтобы отфильтровать случайные отмены)
  utterance.onstart = () => {
    lastSaidUntilByKey.set(cooldownKey, Date.now() + cooldownMs);
  };

  window.speechSynthesis.speak(utterance);
}
