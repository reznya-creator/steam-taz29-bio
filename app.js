/**
 * TAZIK29 - Retro Green Steam v1.0 (2003) Client Script
 * Complete UI interactivity, audio, chat simulation, and custom SVG icons.
 * (Screenshots gallery removed as requested)
 */

// ============================================================================
// 1. RETRO WEB AUDIO SYNTHESIZER
// ============================================================================
class SteamAudio {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  playMessageChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.13);

      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880.00, now + 0.12); // A5
      gain2.gain.setValueAtTime(0.18, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.33);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  playLaunchSound() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  playConsoleBeep() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(660, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {}
  }

  playOverlaySound() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.16);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  }

  playCameraShutter() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      // High-frequency mechanical shutter snap
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.05);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.07);

      // Secondary shutter release click
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(680, now + 0.06);
      osc2.frequency.exponentialRampToValueAtTime(140, now + 0.15);
      gain2.gain.setValueAtTime(0.12, now + 0.06);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now + 0.06);
      osc2.stop(now + 0.18);
    } catch (e) {}
  }

  playTrayBeep() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(740, now);
      osc.frequency.setValueAtTime(1180, now + 0.04);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  playSecretChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.09, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.22);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.24);
      });
    } catch(e) {}
  }

  playFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const chords = [
        { freqs: [261.63, 329.63, 392.00], time: 0, dur: 0.25 },
        { freqs: [349.23, 440.00, 523.25], time: 0.22, dur: 0.25 },
        { freqs: [392.00, 493.88, 587.33], time: 0.44, dur: 0.3 },
        { freqs: [523.25, 659.25, 783.99, 1046.50], time: 0.72, dur: 0.8 }
      ];
      chords.forEach(c => {
        c.freqs.forEach(freq => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + c.time);
          gain.gain.setValueAtTime(0.08, now + c.time);
          gain.gain.exponentialRampToValueAtTime(0.001, now + c.time + c.dur);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + c.time);
          osc.stop(now + c.time + c.dur + 0.02);
        });
      });
    } catch(e) {}
  }

  playCrowbarHit() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1420, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.12);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch(e) {}
  }

  startSecretAmbient() {
    this.init();
    if (!this.audioCtx) return;
    this.stopSecretAmbient();
    try {
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(65.41, this.audioCtx.currentTime);
      
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(98.00, this.audioCtx.currentTime);
      
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.audioCtx.currentTime);
      
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      osc1.start();
      osc2.start();
      
      this.ambientNodes = { osc1, osc2, gain };
    } catch(e) {}
  }

  stopSecretAmbient() {
    if (this.ambientNodes) {
      try {
        this.ambientNodes.osc1.stop();
        this.ambientNodes.osc2.stop();
      } catch(e) {}
      this.ambientNodes = null;
    }
  }
}

const sfx = new SteamAudio();

// ============================================================================
// 2. GAMES DATABASE WITH BEAUTIFUL CUSTOM SVGS
// ============================================================================
const GAMES_DB = {
  dwd2: {
    id: 'dwd2',
    title: 'Deal With Destiny 2',
    subtitle: 'Продолжение культовой модификации для Half-Life 2 от TAZIK29',
    iconImg: 'assets/icons/steam_games/dwd2.png',
    headerImg: 'assets/header.jpg',
    capsuleImg: 'assets/capsule.jpg',
    dev: 'TAZIK29',
    pub: 'KUNI',
    playtime: '1,337 ч.',
    lastPlayed: 'Сегодня',
    status: 'Готова к запуску',
    statusClass: 'highlight',
    genre: 'Action, Story Rich, FPS, Mod',
    engine: 'Source Engine (Valve)',
    releaseDate: 'Скоро (Дата: 2031)',
    appid: '4825530',
    screenshots: [
      { src: 'assets/screenshots/dwd2_shot_1.jpg', caption: 'Deal With Destiny 2 — Сортировочная станция и крушение товарного эшелона' },
      { src: 'assets/screenshots/dwd2_shot_2.jpg', caption: 'Deal With Destiny 2 — Промышленная зона, пути и патрули Альянса' },
      { src: 'assets/screenshots/dwd2_shot_3.jpg', caption: 'Deal With Destiny 2 — Внутренние железнодорожные цеха и депо' },
      { src: 'assets/screenshots/dwd2_shot_4.jpg', caption: 'Deal With Destiny 2 — Побег Оскара Уилсона и атмосферный левел-дизайн' }
    ],
    achievements: [
      { id: 'dwd2_1', title: 'Билет в один конец', desc: 'Сесть на товарный поезд и покинуть City 17', icon: 'assets/icons/locomotive.svg', unlocked: true, time: 'Разблокировано 12 окт. 2024' },
      { id: 'dwd2_2', title: 'Старая добрая монтировка', desc: 'Найти первое оружие в обломках эшелона', icon: 'assets/icons/crowbar.svg', unlocked: true, time: 'Разблокировано 14 окт. 2024' },
      { id: 'dwd2_3', title: 'Hammer SDK Мастер', desc: 'Скомпилировать 500-ю версию тестовой bsp-карты', icon: 'assets/icons/hammer_sdk.svg', unlocked: true, time: 'Разблокировано 28 дек. 2024' },
      { id: 'dwd2_4', title: 'Вспышка сканера', desc: 'Ослепить городской сканер Альянса на путях', icon: 'assets/icons/scanner.svg', unlocked: true, time: 'Разблокировано 15 янв. 2025' },
      { id: 'dwd2_5', title: 'Ждать до 2031 года', desc: 'Проверить статус разработки мода на стриме', icon: 'assets/icons/clock_2031.svg', unlocked: true, time: 'Разблокировано Сегодня' },
      { id: 'dwd2_6', title: 'Секреты депо', desc: 'Отыскать пасхалку с кастомной озвучкой Оскара Уилсона', icon: 'assets/icons/dwd2_secret.svg', unlocked: false, time: 'Заблокировано' }
    ],
    description: `
      <h4>ДОБРО ПОЖАЛОВАТЬ, ИГРОК. СЛЕДУЮЩАЯ ГЛАВА НАЧИНАЕТСЯ.</h4>
      <p><strong>Deal With Destiny 2</strong> (Дело о Судьбе 2) — фанатское продолжение культовой сюжетной модификации для Half-Life 2 от разработчика <strong>TAZIK29</strong>. Проект расширяет вселенную и бережно сохраняет фирменную мрачную атмосферу.</p>
      <p>Вы снова играете за <em>Оскара Уилсона (Oscar Willson)</em> — главного героя, судьба которого оказалась намертво вплетена в паутину Альянса. После побега на деревянном товарном поезде в финале первой части, надежды на спокойную жизнь рушатся: вертолеты Альянса перехватывают эшелон, бронетехника блокирует пути, и начинается масштабное крушение.</p>
      <p>Сжимая в руках верную монтировку, Оскар пробивается сквозь разрушенные промышленные депо, железнодорожные сортировки и заблокированные гермоворота навстречу неизвестности.</p>
      <h4>ОСОБЕННОСТИ ГЕЙМПЛЕЯ:</h4>
      <ul class="steam-bullet-list">
        <li><strong>Линейная захватывающая кампания</strong> в лучших традициях Half-Life 2 и Episode Two.</li>
        <li><strong>Классический арсенал Source Engine</strong> с использованием физики и окружения в бою.</li>
        <li><strong>Интерактивные физические пазлы</strong> и кинематографичные срежиссированные сцены.</li>
        <li><strong>Оригинальная русская озвучка</strong> и проработанные диалоги персонажей.</li>
        <li><strong>Разнообразие локаций:</strong> тесные товарные вагоны, промышленные дворы, полуразрушенные станции и открытые железнодорожные перегоны.</li>
      </ul>
    `
  },
  hl2: {
    id: 'hl2',
    title: 'Half-Life 2',
    subtitle: 'Шедевр Valve Corporation. Возвращение Гордона Фримена.',
    iconImg: 'assets/icons/steam_games/hl2.jpg',
    headerImg: 'assets/headers/hl2_hero.jpg',
    capsuleImg: 'assets/capsules/hl2_capsule.jpg',
    dev: 'Valve',
    pub: 'Valve',
    playtime: '2,410 ч.',
    lastPlayed: '3 дня назад',
    status: '100% - Готово',
    statusClass: '',
    genre: 'Sci-Fi FPS',
    engine: 'Source Engine',
    releaseDate: '16 ноя. 2004',
    appid: '220',
    screenshots: [
      { src: 'assets/screenshots/hl2_shot_1.jpg', caption: 'Half-Life 2 — Сити 17, Цитадель Альянса и патрули ГО' },
      { src: 'assets/screenshots/hl2_shot_2.jpg', caption: 'Half-Life 2 — Водные каналы и побег на аэроглиссере' },
      { src: 'assets/screenshots/hl2_shot_3.jpg', caption: 'Half-Life 2 — Рейвенхольм: ловушки отца Григория и хедкрабы' },
      { src: 'assets/screenshots/hl2_shot_4.jpg', caption: 'Half-Life 2 — Побережье Highway 17 и багги Гордона' }
    ],
    achievements: [
      { id: 'hl2_1', title: 'Нулевой манипулятор', desc: 'Получить гравитационную пушку в лаборатории Илая Вэнса', icon: 'assets/icons/hl2_gravity.svg', unlocked: true, time: 'Разблокировано 16 ноя. 2004' },
      { id: 'hl2_2', title: 'Мы не ходим в Рейвенхольм', desc: 'Пройти Рейвенхольм, используя только грави-пушку', icon: 'assets/icons/hl2_ravenholm.svg', unlocked: true, time: 'Разблокировано 20 ноя. 2004' },
      { id: 'hl2_3', title: 'Песчаный хранитель', desc: 'Пересечь песчаные пустоши, не потревожив муравьиных львов', icon: 'assets/icons/hl2_antlion.svg', unlocked: true, time: 'Разблокировано 25 ноя. 2004' },
      { id: 'hl2_4', title: 'Охотник на страйдеров', desc: 'Уничтожить всех страйдеров при обороне базы повстанцев', icon: 'assets/icons/hl2_strider.svg', unlocked: true, time: 'Разблокировано 30 ноя. 2004' },
      { id: 'hl2_5', title: 'Следопыт Лямбды', desc: 'Найти все секретные тайники с припасами повстанцев', icon: 'assets/icons/hl2_lambda_cache.svg', unlocked: true, time: 'Разблокировано 5 дек. 2004' },
      { id: 'hl2_6', title: 'Штурм Цитадели', desc: 'Добраться до вершины Цитадели и остановить телепорт Брина', icon: 'assets/icons/hl2_citadel.svg', unlocked: true, time: 'Разблокировано 12 дек. 2004' }
    ],
    description: `
      <h4>ПРОСНИТЕСЬ И ПОЙТЕ, МИСТЕР ФРИМЕН.</h4>
      <p>1998 год. Half-Life шокирует индустрию сочетанием напряженного действия и непрерывного захватывающего сюжета. Игра получает более 50 наград «Игра года».</p>
      <p>В Half-Life 2 гравипушка, реалистичная физика и непревзойденный левел-дизайн открыли новую эру для всех шутеров от первого лица.</p>
    `
  },
  cs16: {
    id: 'cs16',
    title: 'Counter-Strike 1.6',
    subtitle: 'Легендарный тактический сетевой шутер',
    iconImg: 'assets/icons/steam_games/cs16.jpg',
    headerImg: 'assets/headers/cs16_hero.jpg',
    capsuleImg: 'assets/capsules/cs16_capsule.jpg',
    dev: 'Valve',
    pub: 'Valve',
    playtime: '3,890 ч.',
    lastPlayed: 'Сегодня',
    status: '100% - Готово',
    statusClass: '',
    genre: 'Multiplayer FPS',
    engine: 'GoldSrc',
    releaseDate: '12 сен. 2003',
    appid: '10',
    screenshots: [
      { src: 'assets/screenshots/cs16_shot_1.jpg', caption: 'Counter-Strike 1.6 — Легендарная de_dust2: перестрелка на длине' },
      { src: 'assets/screenshots/cs16_shot_2.jpg', caption: 'Counter-Strike 1.6 — Тактический штурм спецназа и закупка оружия' },
      { src: 'assets/screenshots/cs16_shot_3.jpg', caption: 'Counter-Strike 1.6 — Классический сетевой раунд на de_inferno' },
      { src: 'assets/screenshots/cs16_shot_4.jpg', caption: 'Counter-Strike 1.6 — de_nuke: защита точки закладки бомбы' }
    ],
    achievements: [
      { id: 'cs16_1', title: 'Сапер высшего класса', desc: 'Обезвредить бомбу за 1 секунду до детонации на de_dust2', icon: 'assets/icons/cs_defuse.svg', unlocked: true, time: 'Разблокировано 12 сен. 2003' },
      { id: 'cs16_2', title: 'Снайперская точность', desc: 'Сделать 100 фрагов из AWP без промаха через щель на длине', icon: 'assets/icons/cs_awp.svg', unlocked: true, time: 'Разблокировано 18 сен. 2003' },
      { id: 'cs16_3', title: 'Спаситель заложников', desc: 'Эвакуировать всех заложников на cs_italy под шквальным огнем', icon: 'assets/icons/cs_hostage.svg', unlocked: true, time: 'Разблокировано 25 окт. 2003' },
      { id: 'cs16_4', title: '1 против 5: Клатч', desc: 'Выиграть решающий раунд в одиночку против всей команды', icon: 'assets/icons/cs_clutch.svg', unlocked: true, time: 'Разблокировано 14 ноя. 2003' },
      { id: 'cs16_5', title: 'Мастер холодного оружия', desc: 'Уничтожить противника ножом со спины в раунде на пистолетах', icon: 'assets/icons/cs_knife.svg', unlocked: true, time: 'Разблокировано 2 дек. 2003' },
      { id: 'cs16_6', title: 'Олигарх $16,000', desc: 'Накопить максимальный лимит денег и закупить оружие всей команде', icon: 'assets/icons/cs_money.svg', unlocked: true, time: 'Разблокировано 20 янв. 2004' }
    ],
    description: `
      <h4>COUNTER-TERRORISTS WIN.</h4>
      <p>Самый популярный сетевой командный экшен в мире. Присоединяйтесь к невероятно реалистичной войне с террористами в этой бессмертной классике.</p>
    `
  },
  hl2dm: {
    id: 'hl2dm',
    title: 'Half-Life 2: Deathmatch',
    subtitle: 'Сетевые баталии с грави-пушками и унитазами',
    iconImg: 'assets/icons/steam_games/hl2dm.jpg',
    headerImg: 'assets/headers/hl2dm_hero.jpg',
    capsuleImg: 'assets/capsules/hl2dm_capsule.jpg',
    dev: 'Valve',
    pub: 'Valve',
    playtime: '520 ч.',
    lastPlayed: 'Неделю назад',
    status: '100% - Готово',
    statusClass: '',
    genre: 'Action, Multiplayer',
    engine: 'Source',
    releaseDate: '1 дек. 2004',
    appid: '320',
    screenshots: [
      { src: 'assets/screenshots/hl2dm_shot_1.jpg', caption: 'Half-Life 2: Deathmatch — dm_lockdown: сетевые битвы с грави-пушками' },
      { src: 'assets/screenshots/hl2dm_shot_2.jpg', caption: 'Half-Life 2: Deathmatch — Метание батарей, циркулярных пил и бочек' },
      { src: 'assets/screenshots/hl2dm_shot_3.jpg', caption: 'Half-Life 2: Deathmatch — Динамичные перестрелки повстанцев и комбайнов' },
      { src: 'assets/screenshots/hl2dm_shot_4.jpg', caption: 'Half-Life 2: Deathmatch — Использование физики Havok в мультиплеере' }
    ],
    achievements: [
      { id: 'hl2dm_1', title: 'Сантехнический нокаут', desc: 'Уничтожить противника метким броском белого унитаза', icon: 'assets/icons/dm_toilet.svg', unlocked: true, time: 'Разблокировано 1 дек. 2004' },
      { id: 'hl2dm_2', title: 'Стальной диск', desc: 'Разрезать врага летящей циркулярной пилой на dm_lockdown', icon: 'assets/icons/dm_sawblade.svg', unlocked: true, time: 'Разблокировано 5 дек. 2004' },
      { id: 'hl2dm_3', title: 'Огненный взрыв', desc: 'Подорвать красную бочку рядом со скоплением комбайнов', icon: 'assets/icons/dm_barrel.svg', unlocked: true, time: 'Разблокировано 10 дек. 2004' },
      { id: 'hl2dm_4', title: 'Пригвоздить к стене', desc: 'Попасть раскаленным болтом арбалета с предельной дистанции', icon: 'assets/icons/dm_crossbow.svg', unlocked: true, time: 'Разблокировано 15 дек. 2004' },
      { id: 'hl2dm_5', title: 'Распрыжка и баннихоп', desc: 'Совершить серию идеальных длинных прыжков на полной скорости', icon: 'assets/icons/dm_longjump.svg', unlocked: true, time: 'Разблокировано 22 дек. 2004' },
      { id: 'hl2dm_6', title: 'Ядерная реакция', desc: 'Использовать шаровую молнию гравипушки и убить 4 игроков разом', icon: 'assets/icons/dm_nuke.svg', unlocked: false, time: 'Заблокировано' }
    ],
    description: `
      <h4>БЫСТРЫЙ ДЕЗМАТЧ ВО ВСЕЛЕННОЙ HALF-LIFE 2</h4>
      <p>Используйте грави-пушку, циркулярные пилы и физические предметы окружения против оппонентов со всего мира на классических картах.</p>
    `
  },
  synergy: {
    id: 'synergy',
    title: 'Synergy Co-op',
    subtitle: 'Кооперативное прохождение кампании Half-Life 2',
    iconImg: 'assets/icons/steam_games/synergy.jpg',
    headerImg: 'assets/headers/synergy_hero.jpg',
    capsuleImg: 'assets/capsules/synergy_capsule.jpg',
    dev: 'Synergy Team',
    pub: 'Community',
    playtime: '145 ч.',
    lastPlayed: '2 недели назад',
    status: 'Обновление завершено',
    statusClass: '',
    genre: 'Co-op FPS',
    engine: 'Source',
    releaseDate: '2008',
    appid: '17520',
    screenshots: [
      { src: 'assets/screenshots/synergy_shot_1.jpg', caption: 'Synergy Co-op — Совместное прохождение кампании Half-Life 2' },
      { src: 'assets/screenshots/synergy_shot_2.jpg', caption: 'Synergy Co-op — Командные заезды на транспорте и поддержка союзников' },
      { src: 'assets/screenshots/synergy_shot_3.jpg', caption: 'Synergy Co-op — Штурм позиций Альянса вместе с друзьями по четвергам' },
      { src: 'assets/screenshots/synergy_shot_4.jpg', caption: 'Synergy Co-op — Пользовательские карты и кооперативные моды' }
    ],
    achievements: [
      { id: 'syn_1', title: 'Второе дыхание', desc: 'Реанимировать павшего напарника адреналиновым дефибриллятором', icon: 'assets/icons/syn_revive.svg', unlocked: true, time: 'Разблокировано 15 мар. 2012' },
      { id: 'syn_2', title: 'Шоссе на двоих', desc: 'Проехать всю главу Highway 17 на одном багги вместе с другом', icon: 'assets/icons/syn_jeep.svg', unlocked: true, time: 'Разблокировано 20 мар. 2012' },
      { id: 'syn_3', title: 'Сетевой четверг', desc: 'Отыграть 4 часа подряд на сервере TAZIK29 в кооперативный день', icon: 'assets/icons/syn_survivor.svg', unlocked: true, time: 'Разблокировано 5 апр. 2018' },
      { id: 'syn_4', title: 'Гаечный ключ', desc: 'Отремонтировать поломанный генератор повстанцев', icon: 'assets/icons/syn_wrench.svg', unlocked: true, time: 'Разблокировано 12 мая 2020' },
      { id: 'syn_5', title: 'Штурм Цитадели бандой', desc: 'Захватить контрольные точки Альянса полным сквадом из 8 игроков', icon: 'assets/icons/syn_assault.svg', unlocked: true, time: 'Разблокировано 18 ноя. 2022' },
      { id: 'syn_6', title: 'Низвержение Голиафа', desc: 'Уничтожить вертолет-охотник Альянса залпом совместных ракет', icon: 'assets/icons/syn_boss.svg', unlocked: false, time: 'Заблокировано' }
    ],
    description: `
      <h4>ПРОХОДИТЕ ВСЕ МОДЫ И HALF-LIFE 2 ВМЕСТЕ С ДРУЗЬЯМИ</h4>
      <p>Synergy позволяет играть в сюжетные модификации Source с друзьями по сети, разделяя патроны и управляя техникой вместе.</p>
    `
  },
  tfc: {
    id: 'tfc',
    title: 'Team Fortress Classic',
    subtitle: 'Классический командный шутер Valve с классами',
    iconImg: 'assets/icons/steam_games/tfc.jpg',
    headerImg: 'assets/headers/tfc_hero.jpg',
    capsuleImg: 'assets/capsules/tfc_capsule.jpg',
    dev: 'Valve',
    pub: 'Valve',
    playtime: '95 ч.',
    lastPlayed: 'Месяц назад',
    status: '100% - Готово',
    statusClass: '',
    genre: 'Team FPS',
    engine: 'GoldSrc',
    releaseDate: '1999',
    appid: '20',
    screenshots: [
      { src: 'assets/screenshots/tfc_shot_1.jpg', caption: 'Team Fortress Classic — Классический 2Fort: захват разведданных' },
      { src: 'assets/screenshots/tfc_shot_2.jpg', caption: 'Team Fortress Classic — 9 уникальных классов Valve и командный баланс' },
      { src: 'assets/screenshots/tfc_shot_3.jpg', caption: 'Team Fortress Classic — Снайперские дуэли и гранатометы Солдата' },
      { src: 'assets/screenshots/tfc_shot_4.jpg', caption: 'Team Fortress Classic — Рокетджампы и тактический раунд' }
    ],
    achievements: [
      { id: 'tfc_1', title: 'Захват чемодана', desc: 'Украсть разведданные с вражеской базы 2Fort и донести до точки', icon: 'assets/icons/tfc_flag.svg', unlocked: true, time: 'Разблокировано 14 окт. 1999' },
      { id: 'tfc_2', title: 'Рокетджамп на крышу', desc: 'Запрыгнуть на крышу моста взрывной волной своей ракетницы', icon: 'assets/icons/tfc_rocket.svg', unlocked: true, time: 'Разблокировано 20 окт. 1999' },
      { id: 'tfc_3', title: 'Минная ловушка', desc: 'Взорвать 6 гранат-пайпов в коридоре как Подрывник', icon: 'assets/icons/tfc_pipe.svg', unlocked: true, time: 'Разблокировано 28 окт. 1999' },
      { id: 'tfc_4', title: 'Боевой Медик', desc: 'Заразить вирусным шприцем 5 шпионов противника', icon: 'assets/icons/tfc_medkit.svg', unlocked: true, time: 'Разблокировано 10 ноя. 1999' },
      { id: 'tfc_5', title: 'Саботаж турели', desc: 'Взломать и деактивировать вражескую турель за Шпиона', icon: 'assets/icons/tfc_sapper.svg', unlocked: true, time: 'Разблокировано 5 дек. 1999' },
      { id: 'tfc_6', title: 'Свинцовый шквал', desc: 'Раскрутить пулемет Пулеметчика и сдержать штурм базы в одиночку', icon: 'assets/icons/tfc_minigun.svg', unlocked: false, time: 'Заблокировано' }
    ],
    description: `
      <h4>ОДИН ИЗ САМЫХ ПОПУЛЯРНЫХ СЕТЕВЫХ ЭКШЕНОВ</h4>
      <p>Выберите свой класс: Солдат, Снайпер, Шпион, Медик или Инженер и сражайтесь за захват разведданных.</p>
    `
  },
  gmod: {
    id: 'gmod',
    title: "Garry's Mod",
    subtitle: 'Физическая песочница Valve & Facepunch Studios',
    iconImg: 'assets/icons/steam_games/gmod.jpg',
    headerImg: 'assets/headers/gmod_hero.jpg',
    capsuleImg: 'assets/capsules/gmod_capsule.jpg',
    dev: 'Facepunch Studios',
    pub: 'Valve',
    playtime: '1,890 ч.',
    lastPlayed: 'Вчера',
    status: '100% - Готово',
    statusClass: '',
    genre: 'Sandbox, Physics, Multiplayer',
    engine: 'Source',
    releaseDate: '29 ноя. 2006',
    appid: '4000',
    screenshots: [
      { src: 'assets/screenshots/gmod_shot_1.jpg', caption: "Garry's Mod — Физические постройки, рэгдоллы и спавн пропов" },
      { src: 'assets/screenshots/gmod_shot_2.jpg', caption: "Garry's Mod — Сетевой сервер TAZIK29 с аддонами из коллекции [puk]" },
      { src: 'assets/screenshots/gmod_shot_3.jpg', caption: "Garry's Mod — Безумие физики Source и инструмент Toolgun" },
      { src: 'assets/screenshots/gmod_shot_4.jpg', caption: "Garry's Mod — Позинг персонажей и кастомные игровые режимы" }
    ],
    achievements: [
      { id: 'gmod_1', title: 'Тулган в руках мастера', desc: 'Использовать Toolgun более 10,000 раз в режиме песочницы', icon: 'assets/icons/gmod_toolgun.svg', unlocked: true, time: 'Разблокировано 15 янв. 2007' },
      { id: 'gmod_2', title: 'Рэгдолл-апокалипсис', desc: 'Заспавнить 50 рэгдоллов повстанцев и устроить цепную реакцию', icon: 'assets/icons/gmod_ragdoll.svg', unlocked: true, time: 'Разблокировано 20 мар. 2008' },
      { id: 'gmod_3', title: 'Ракетный двигатель', desc: 'Приварить 10 трастеров к дивану и запустить его на луну', icon: 'assets/icons/gmod_thruster.svg', unlocked: true, time: 'Разблокировано 12 июн. 2011' },
      { id: 'gmod_4', title: 'Коллекция [puk]', desc: 'Подписаться на официальную коллекцию аддонов сервера TAZIK29', icon: 'assets/icons/gmod_puk.svg', unlocked: true, time: 'Разблокировано 14 мар. 2024' },
      { id: 'gmod_5', title: 'Гравитация отключена', desc: 'Построить летающий дом с нулевой гравитацией на gm_construct', icon: 'assets/icons/gmod_physics.svg', unlocked: true, time: 'Разблокировано 5 сен. 2024' },
      { id: 'gmod_6', title: 'Проводной гений Wiremod', desc: 'Собрать работающий процессор и дисплей на схемах Wiremod', icon: 'assets/icons/gmod_wire.svg', unlocked: false, time: 'Заблокировано' }
    ],
    description: `
      <h4>СВОБОДА ТВОРЧЕСТВА И БЕЗУМИЯ НА SOURCE ENGINE</h4>
      <p>Garry's Mod — легендарная физическая песочница. Здесь нет строгих ограничений: создавайте постройки, спавните рэгдоллы, управляйте физикой и играйте на сервере TAZIK29 с контентом из коллекции <strong>[puk]</strong>.</p>
    `
  }
};

let currentSelectedGameId = 'dwd2';

// ============================================================================
// 3. UI TAB SWITCHING & GAME SELECTION
// ============================================================================
function switchTab(tabKey, playSound = true) {
  const tabs = document.querySelectorAll('.steam-tab');
  const panes = document.querySelectorAll('.tab-pane');
  const targetTab = document.querySelector(`.steam-tab[data-tab="${tabKey}"]`);
  const targetPane = document.getElementById('tab-' + tabKey);

  if (!targetTab || !targetPane) return;

  if (playSound) sfx.playClick();

  tabs.forEach(t => t.classList.remove('active'));
  panes.forEach(p => p.classList.remove('active'));

  targetTab.classList.add('active');
  targetPane.classList.add('active');

  try {
    localStorage.setItem('steam_active_tab', tabKey);
  } catch (e) {}
}

function initTabs() {
  const tabs = document.querySelectorAll('.steam-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabKey = tab.getAttribute('data-tab');
      switchTab(tabKey, true);
    });
  });
}

function selectGame(gameId, autoSwitchTab = true) {
  const game = GAMES_DB[gameId];
  if (!game) return;

  currentSelectedGameId = gameId;

  try {
    localStorage.setItem('steam_selected_game', gameId);
  } catch (e) {}

  // Switch to Games tab if requested
  if (autoSwitchTab) {
    const gamesTabBtn = document.querySelector('.steam-tab[data-tab="games"]');
    if (gamesTabBtn && !gamesTabBtn.classList.contains('active')) {
      switchTab('games', false);
    }
  }

  // Update sidebar active selection
  const listItems = document.querySelectorAll('.game-item');
  listItems.forEach(item => {
    if (item.getAttribute('data-game-id') === gameId) {
      item.classList.add('selected');
    } else {
      item.classList.remove('selected');
    }
  });

  // Update Detail Panel DOM
  const heroImg = document.getElementById('hero-img');
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');
  const heroBadge = document.querySelector('.hero-custom-badge-icon');
  const heroPlaytime = document.getElementById('hero-playtime');
  const heroLastPlayed = document.getElementById('hero-last-played');
  const heroDev = document.getElementById('hero-dev');
  const heroPub = document.getElementById('hero-pub');
  const gameDesc = document.getElementById('game-desc-content');
  const capsuleImg = document.querySelector('.capsule-img');

  if (heroImg) {
    heroImg.src = game.headerImg;
    heroImg.classList.remove('fade-in');
    void heroImg.offsetWidth;
    heroImg.classList.add('fade-in');
  }
  if (heroTitle) heroTitle.textContent = game.title;
  if (heroSubtitle) heroSubtitle.textContent = game.subtitle;
  if (heroBadge) heroBadge.src = game.iconImg;
  if (heroPlaytime) heroPlaytime.textContent = game.playtime;
  if (heroLastPlayed) heroLastPlayed.textContent = game.lastPlayed;
  if (heroDev) heroDev.textContent = game.dev;
  if (heroPub) heroPub.textContent = game.pub;
  if (gameDesc) gameDesc.innerHTML = game.description;
  if (capsuleImg) capsuleImg.src = game.capsuleImg;

  // Update right column metadata specs
  const metaGenre = document.getElementById('meta-genre');
  const metaEngine = document.getElementById('meta-engine');
  const metaDev = document.getElementById('meta-dev');
  const metaPub = document.getElementById('meta-pub');
  const metaRelease = document.getElementById('meta-release');
  const metaAppId = document.getElementById('meta-appid');

  if (metaGenre) metaGenre.textContent = game.genre || 'Action';
  if (metaEngine) metaEngine.textContent = game.engine || 'Source Engine';
  if (metaDev) metaDev.textContent = game.dev || 'Valve';
  if (metaPub) metaPub.textContent = game.pub || 'Valve';
  if (metaRelease) metaRelease.textContent = game.releaseDate || '2004';
  if (metaAppId) metaAppId.textContent = game.appid || '0';

  // Update account bar status
  const accountStatus = document.querySelector('.account-status.in-game');
  if (accountStatus) {
    accountStatus.textContent = `В игре: ${game.title}`;
  }

  // Trigger smooth transition on detail panel
  const detailPanel = document.querySelector('.game-detail-panel');
  if (detailPanel) {
    detailPanel.classList.remove('steam-game-fade');
    void detailPanel.offsetWidth;
    detailPanel.classList.add('steam-game-fade');
  }

  // Update window title
  const titlebarText = document.querySelector('.titlebar-text');
  if (titlebarText) {
    titlebarText.textContent = `Steam - ${game.title}`;
  }

  // Render Real Steam Screenshots Gallery & Custom Achievements
  renderScreenshots(game);
  renderAchievements(game);
}

// ============================================================================
// 2.2 LIBRARY SEARCH AND CATEGORY FILTERING
// ============================================================================
function initLibraryFiltering() {
  const searchInput = document.getElementById('library-search-input');
  const filterChips = document.querySelectorAll('.filter-chip');
  const badge = document.getElementById('library-filter-badge');
  const gameItems = document.querySelectorAll('.game-item');

  let activeCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visibleCount = 0;
    const q = searchQuery.toLowerCase().trim();

    gameItems.forEach(item => {
      const gameId = item.getAttribute('data-game-id');
      const gameData = GAMES_DB[gameId];
      const categoryAttr = (item.getAttribute('data-category') || '').toLowerCase();
      const categories = categoryAttr.split(' ');
      const title = (gameData ? gameData.title : item.querySelector('.game-title')?.textContent || '').toLowerCase();

      const matchesCategory = (activeCategory === 'all') || categories.includes(activeCategory);
      const matchesSearch = !q || title.includes(q);

      if (matchesCategory && matchesSearch) {
        item.style.display = 'flex';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    if (badge) {
      if (activeCategory === 'all' && !q) {
        badge.textContent = `Все (${visibleCount})`;
      } else {
        badge.textContent = `Найдено: ${visibleCount}`;
      }
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      applyFilters();
    });
  }

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      sfx.playClick();
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-filter') || 'all';
      applyFilters();
    });
  });
}

// ============================================================================
// 3.0 DYNAMIC STEAM ACHIEVEMENTS CONTROLLER (CUSTOM SVG ICONS PER GAME)
// ============================================================================
function renderAchievements(game) {
  const container = document.getElementById('achievements-grid');
  const countTitle = document.getElementById('achievements-count-title');
  const progressHint = document.getElementById('achievements-progress-hint');
  const progressBar = document.getElementById('achievements-progress-bar');
  if (!container) return;

  const achievements = game.achievements || [];
  if (achievements.length === 0) {
    container.innerHTML = '<div class="no-achievements" style="color: #7b8873; font-size: 11px; padding: 12px; grid-column: 1 / -1;">Нет данных о достижениях для этой игры.</div>';
    if (countTitle) countTitle.textContent = 'ДОСТИЖЕНИЯ STEAM';
    if (progressHint) progressHint.textContent = '0 / 0 (0%)';
    if (progressBar) progressBar.style.width = '0%';
    return;
  }

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const pct = Math.round((unlockedCount / totalCount) * 100);

  if (countTitle) {
    countTitle.textContent = `ДОСТИЖЕНИЯ STEAM (${unlockedCount} / ${totalCount})`;
  }
  if (progressHint) {
    progressHint.textContent = `Прогресс: ${pct}% (${unlockedCount} из ${totalCount} получено)`;
  }
  if (progressBar) {
    progressBar.style.width = `${pct}%`;
  }

  container.innerHTML = '';
  achievements.forEach(ach => {
    const card = document.createElement('div');
    card.className = `achieve-card ${ach.unlocked ? 'unlocked' : 'locked'}`;

    const iconHtml = ach.unlocked
      ? `<img src="${ach.icon}" alt="${escapeHtml(ach.title)}" class="custom-achieve-svg">`
      : `<img src="assets/icons/lock.svg" alt="Заблокировано" class="custom-achieve-svg" title="Заблокировано">`;

    card.innerHTML = `
      <div class="achieve-icon">
        ${iconHtml}
      </div>
      <div class="achieve-text">
        <strong>${escapeHtml(ach.title)}</strong>
        <span>${escapeHtml(ach.desc)}</span>
        <span class="achieve-time">${escapeHtml(ach.time)}</span>
      </div>
    `;

    card.setAttribute('data-ach-id', ach.id);
    if (ach.id === 'dwd2_2') {
      card.style.cursor = 'pointer';
      card.title = 'Нажмите, чтобы осмотреть монтировку Гордона';
      card.addEventListener('click', () => {
        sfx.playCrowbarHit();
        unlockSecret('crowbar');
      });
    }

    container.appendChild(card);
  });
}

// ============================================================================
// 3.1 SCREENSHOTS GALLERY & LIGHTBOX CONTROLLER
// ============================================================================
let currentViewerGameId = 'dwd2';
let currentViewerIndex = 0;

function renderScreenshots(game) {
  const container = document.getElementById('screenshots-strip-container');
  const section = document.getElementById('game-screenshots-section');
  if (!container || !section) return;

  if (!game.screenshots || game.screenshots.length === 0) {
    section.style.display = 'none';
    return;
  }
  section.style.display = 'block';
  container.innerHTML = '';

  game.screenshots.forEach((shot, index) => {
    const card = document.createElement('div');
    card.className = 'screenshot-thumb-card';
    card.setAttribute('data-index', index);
    card.setAttribute('title', shot.caption || `Скриншот ${index + 1}`);
    
    card.innerHTML = `
      <div class="thumb-img-wrapper">
        <img src="${shot.src}" alt="${escapeHtml(shot.caption || 'Screenshot')}" loading="lazy" class="screenshot-thumb-img">
        <div class="thumb-overlay-zoom">
          <img src="assets/icons/zoom.svg" alt="Zoom" class="zoom-icon-mini">
          <span class="zoom-text">Увеличить</span>
        </div>
      </div>
      <div class="screenshot-thumb-caption" title="${escapeHtml(shot.caption || '')}">
        ${escapeHtml(shot.caption ? (shot.caption.length > 44 ? shot.caption.substring(0, 41) + '...' : shot.caption) : 'Скриншот ' + (index + 1))}
      </div>
    `;

    card.addEventListener('click', () => {
      sfx.playClick();
      openScreenshotViewer(game.id, index);
    });

    container.appendChild(card);
  });
}

function openScreenshotViewer(gameId, index = 0) {
  const game = GAMES_DB[gameId];
  if (!game || !game.screenshots || !game.screenshots[index]) return;

  currentViewerGameId = gameId;
  currentViewerIndex = index;

  updateScreenshotViewerUI();
  const modal = document.getElementById('screenshot-viewer-modal');
  if (modal) {
    modal.style.display = 'flex';
    sfx.playClick();
  }
}

function updateScreenshotViewerUI() {
  const game = GAMES_DB[currentViewerGameId];
  if (!game || !game.screenshots) return;

  const total = game.screenshots.length;
  if (currentViewerIndex < 0) currentViewerIndex = 0;
  if (currentViewerIndex >= total) currentViewerIndex = total - 1;

  const current = game.screenshots[currentViewerIndex];
  if (!current) return;

  const imgEl = document.getElementById('screenshot-viewer-img');
  const captionEl = document.getElementById('screenshot-viewer-caption');
  const counterEl = document.getElementById('screenshot-viewer-counter');
  const titleEl = document.getElementById('screenshot-viewer-title');
  const prevBtn = document.getElementById('screenshot-viewer-prev');
  const nextBtn = document.getElementById('screenshot-viewer-next');

  if (imgEl) {
    imgEl.src = current.src;
    imgEl.alt = current.caption || `Скриншот ${currentViewerIndex + 1}`;
  }
  if (captionEl) {
    captionEl.innerHTML = `<strong>${escapeHtml(game.title)}</strong>: ${escapeHtml(current.caption || 'Скриншот сообщества Steam')}`;
  }
  if (counterEl) {
    counterEl.textContent = `${currentViewerIndex + 1} / ${total}`;
  }
  if (titleEl) {
    titleEl.textContent = `Просмотр скриншота Steam - ${game.title} (${currentViewerIndex + 1}/${total})`;
  }
  if (prevBtn) {
    prevBtn.disabled = (total <= 1);
  }
  if (nextBtn) {
    nextBtn.disabled = (total <= 1);
  }
}

function nextScreenshot() {
  const game = GAMES_DB[currentViewerGameId];
  if (!game || !game.screenshots || game.screenshots.length <= 1) return;
  sfx.playClick();
  currentViewerIndex = (currentViewerIndex + 1) % game.screenshots.length;
  updateScreenshotViewerUI();
}

function prevScreenshot() {
  const game = GAMES_DB[currentViewerGameId];
  if (!game || !game.screenshots || game.screenshots.length <= 1) return;
  sfx.playClick();
  currentViewerIndex = (currentViewerIndex - 1 + game.screenshots.length) % game.screenshots.length;
  updateScreenshotViewerUI();
}

function closeScreenshotViewer() {
  const modal = document.getElementById('screenshot-viewer-modal');
  if (modal) {
    modal.style.display = 'none';
    sfx.playClick();
  }
}

// ============================================================================
// 4. GAME LAUNCHER SIMULATION MODAL
// ============================================================================
let launchInterval = null;

function launchGameModal() {
  sfx.playLaunchSound();
  const modal = document.getElementById('launch-modal');
  const pBar = document.getElementById('launch-progress-bar');
  const pStatus = document.getElementById('launch-progress-status');
  const playBtn = document.getElementById('launch-play-now-btn');
  const game = GAMES_DB[currentSelectedGameId] || GAMES_DB['dwd2'];

  const modalTitle = modal.querySelector('.window-title');
  const modalHeading = modal.querySelector('.launch-desc h3');
  const modalGameIcon = document.getElementById('launch-modal-game-icon');
  const engineLabel = modal.querySelector('.source-engine-logo span');

  if (modalTitle) modalTitle.textContent = `Запуск игры - ${game.title}`;
  if (modalHeading) modalHeading.textContent = `Подготовка к запуску ${game.title}...`;
  if (modalGameIcon) modalGameIcon.src = game.iconImg;
  if (engineLabel) engineLabel.textContent = game.engine.toUpperCase();

  modal.style.display = 'flex';
  pBar.style.width = '5%';
  playBtn.disabled = true;
  playBtn.textContent = 'Загрузка...';

  const isGoldSrc = (game.engine && game.engine.toLowerCase().includes('goldsrc'));
  const steps = [
    { pct: '15%', text: 'Инициализация VGUI и файловой системы Steam...' },
    { pct: '35%', text: isGoldSrc ? 'Инициализация OpenGL и текстурных паков WAD...' : `Загрузка шейдеров и материалов ${game.engine}...` },
    { pct: '65%', text: `Монтирование архивов ресурсов: ${game.title}...` },
    { pct: '88%', text: isGoldSrc ? 'Калибровка сетевого протокола GoldSrc и звука...' : 'Подключение физической модели Havok & звуковых дорожек...' },
    { pct: '100%', text: 'Готово к запуску! Игра ожидает ввода.' }
  ];

  let currentStep = 0;
  clearInterval(launchInterval);

  launchInterval = setInterval(() => {
    if (currentStep < steps.length) {
      pBar.style.width = steps[currentStep].pct;
      pStatus.textContent = steps[currentStep].text;
      currentStep++;
      sfx.playClick();
    } else {
      clearInterval(launchInterval);
      playBtn.disabled = false;
      playBtn.textContent = 'В игру!';
      playBtn.classList.add('primary');
      sfx.playMessageChime();
    }
  }, 450);
}

function closeLaunchModal() {
  sfx.playClick();
  clearInterval(launchInterval);
  document.getElementById('launch-modal').style.display = 'none';
}

// ============================================================================
// 5. STEAM CHAT SIMULATION (TAZIK29 BOT)
// ============================================================================
const TAZIK_RESPONSES = [
  {
    triggers: ['релиз', 'когда', '2031', 'дата', 'выйдет', 'выйдет?'],
    reply: 'В стиме дата стоит 2031 год как защита от дедлайнов, но разработка идет очень бодро! Сортировочная станция и катсцена с поездом уже почти готовы. Главное сделать качественно, а не спешить.'
  },
  {
    triggers: ['мод', 'сюжет', 'о чем', 'история', 'оскар'],
    reply: 'Сюжет продолжает финал первой части Deal With Destiny. Оскар Уилсон пытается скрыться на товарном поезде, но попадает под перехват вертолетами Альянса. Дальше — плотный экшен, депо и загадки.'
  },
  {
    triggers: ['хаммер', 'hammer', 'sdk', 'маппинг', 'карты', 'движок', 'source'],
    reply: 'Hammer Editor — родной дом! Компилю свет радиксами, борюсь с утечками (leaks) и настраиваю prop_physics. Source до сих пор дает лучшую физическую отдачу.'
  },
  {
    triggers: ['иконка', 'иконки', 'логотип', 'дизайн'],
    reply: 'Красивые кастомные SVG-иконки отрисованы с градиентами и металлическими бейвелами специально для олдскульного Steam!'
  },
  {
    triggers: ['монтировка', 'оружие', 'crowbar'],
    reply: 'Монтировка в Deal With Destiny 2 — первый друг! Сразу после крушения состава без нее даже заколоченные доски вагона не выломать.'
  },
  {
    triggers: ['куни', 'kuni', 'издатель'],
    reply: 'KUNI — наш издатель, очень помогает с интеграцией в Steam и продвижением страницы!'
  },
  {
    triggers: ['привет', 'ку', 'хай', 'здравствуй', 'здорово', 'йо'],
    reply: 'Привет-привет! Рад видеть тебя в старом зеленом Стиме с красивыми кастомными иконками. Как тебе атмосфера?'
  },
  {
    triggers: ['стим', 'зеленый', '2003'],
    reply: 'Да, этот зеленый Steam 2003 года — эталон ностальгии! Никакого лишнего мусора, только игры, друзья и серверы.'
  },
  {
    triggers: ['сервер', 'сервера', 'ip', 'айпи', 'где играть', 'коннект', 'connect'],
    reply: 'Все мои официальные сервера работают! Заходи во вкладку «Серверы»: там Left 4 Dead 2, Synergy, Black Mesa, Sven Co-op, TF2, Майнкрафт projectT29, Роблокс, DoD:S и Garry\'s Mod с коллекцией [puk]!'
  },
  {
    triggers: ['стрим', 'расписание', 'когда стрим', 'время', 'четверг'],
    reply: 'Стримлю с понедельника по четверг! В четверг у нас практически всегда сетевые дни играем со зрителями. Если не стримлю — скорее всего заболел или пилю новый видос, так что ждите =)'
  },
  {
    triggers: ['донат', 'поддержать', 'карта', 'деньги', 'donate', 'рубли', 'ton', 'usdt'],
    reply: 'Огромное спасибо за поддержку! Можно закинуть через DonationAlerts (от 10р, а за 30р включится голосовое сообщение!), DonatePay, либо напрямую на карту RUB/USD или криптой (USDT TRC-20, BTC, TON). Все реквизиты во вкладке «Сообщество TAZIK29»!'
  },
  {
    triggers: ['пк', 'комп', 'железо', 'видюха', 'характеристики', 'rtx', 'i7'],
    reply: 'Мой ПК: Intel Core i7-7700 (3.6 GHz), MSI B250 Gaming Pro Carbon, 32 GB RAM HyperX FURY, видеокарта NVIDIA RTX 2080 Ti (11 GB), корпус Zalman Z9 Plus. Тащит и стримы, и компиляцию карт в Hammer!'
  }
];

const CHAT_PROFILES = {
  'TAZIK29': {
    id: 'TAZIK29',
    name: 'TAZIK29 [Разработчик]',
    status: 'В игре: Deal With Destiny 2',
    statusClass: 'status-in-game',
    avatar: 'assets/webcam.png',
    sender: 'TAZIK29',
    systemMsg: 'Вы начали диалог с пользователем TAZIK29. Никогда не сообщайте свой пароль в чате Steam.'
  },
  'KUNI': {
    id: 'KUNI',
    name: 'KUNI [Издатель]',
    status: 'В сети',
    statusClass: 'status-online',
    avatar: 'assets/kuni_avatar.jpg',
    sender: 'KUNI [Издатель]',
    systemMsg: 'Вы начали диалог с официальным издателем KU.NI (Steam Publisher: store.steampowered.com/publisher/kuni/). Следите за анонсами Deal With Destiny 2!'
  },
  'TIPRADD': {
    id: 'TIPRADD',
    name: 'TIPRADD',
    status: 'Монтирует нарезку со стрима',
    statusClass: 'status-offline',
    avatar: 'assets/icons/hammer_sdk.svg',
    sender: 'TIPRADD',
    systemMsg: 'Вы открыли диалог с пользователем TIPRADD (зритель, автор мемов и нарезок со стримов TAZIK29).'
  }
};

let currentChatTargetKey = 'TAZIK29';

const TIPRADD_RESPONSES = [
  {
    triggers: ['привет', 'ку', 'хай', 'здравствуй', 'здорово', 'йо'],
    reply: 'Привет, T1NE! Как тебе последний стрим Тазика? Я сейчас как раз отбираю самые угарные моменты для нарезки!'
  },
  {
    triggers: ['мем', 'нарезк', 'клип', 'видео', 'ютуб', 'монтаж'],
    reply: 'Я просто преданный зритель, делаю мемы и нарезки по стримам Тазика. Если кто-то пропустил стрим — мои видео в помощь!'
  },
  {
    triggers: ['dwd2', 'мод', 'движок', 'поезд', 'карты', 'оскар'],
    reply: 'Deal With Destiny 2 жду очень сильно! Когда выйдет — обязательно нарежу все эпичные моменты с поездом и побегом Оскара.'
  },
  {
    triggers: ['пасхалка', 'секрет', 'код', 'читер', 'консоль'],
    reply: 'О, зацени команду "tipradd" в консоли (~) — оставил там небольшую пасхалку для своих!'
  }
];

const KUNI_RESPONSES = [
  {
    triggers: ['релиз', 'когда', '2031', 'дата', 'выйдет', 'страница', 'готов', 'скоро'],
    reply: 'Мы как издатель KU.NI работаем в плотном контакте с Valve. Страница Deal With Destiny 2 в магазине Steam уже зарегистрирована (App ID 4825530), скоро начнём публиковать официальные дневники разработки!'
  },
  {
    triggers: ['тазик', 'дмитрий', 'tazik', 'автор', 'разработчик'],
    reply: 'Дмитрий (TAZIK29) — невероятно талантливый автор. Мы гордимся возможностью издавать Deal With Destiny 2 и помогать ему с технической частью в Steam!'
  },
  {
    triggers: ['куни', 'kuni', 'издатель', 'кто вы', 'игры', 'магазин'],
    reply: 'KU.NI — независимое издательство в Steam (https://store.steampowered.com/publisher/kuni/). Мы продвигаем сюжетные модификации и крутые проекты на Source Engine!'
  },
  {
    triggers: ['привет', 'ку', 'хай', 'здравствуй', 'здорово', 'йо'],
    reply: 'Здравствуйте! Рады приветствовать вас на официальной линии связи издательства KU.NI в клиенте Steam. Чем можем помочь?'
  },
  {
    triggers: ['сервер', 'сервера', 'где играть'],
    reply: 'Официальные игровые сервера TAZIK29 работают на полную мощность! Проверьте вкладку «Серверы» в клиенте.'
  }
];

function saveChatHistory(targetKey) {
  try {
    const messagesBox = document.getElementById('chat-messages');
    if (messagesBox) {
      localStorage.setItem(`steam_chat_history_${targetKey}`, messagesBox.innerHTML);
    }
  } catch (e) {}
}

function loadChatHistory(targetKey) {
  const messagesBox = document.getElementById('chat-messages');
  if (!messagesBox) return;

  const profile = CHAT_PROFILES[targetKey] || CHAT_PROFILES['TAZIK29'];
  const saved = localStorage.getItem(`steam_chat_history_${targetKey}`);

  if (saved && saved.trim()) {
    messagesBox.innerHTML = saved;
  } else {
    messagesBox.innerHTML = `
      <div class="chat-msg system">
        <span>${escapeHtml(profile.systemMsg)}</span>
      </div>
    `;
  }
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

function openChatWindow(targetKeyOrName = 'TAZIK29', playSound = true) {
  if (playSound) sfx.playClick();

  let targetKey = 'TAZIK29';
  const str = String(targetKeyOrName || '').toUpperCase();
  if (str.includes('KUNI')) {
    targetKey = 'KUNI';
  } else if (str.includes('TIPRADD')) {
    targetKey = 'TIPRADD';
  }

  currentChatTargetKey = targetKey;
  const profile = CHAT_PROFILES[targetKey] || CHAT_PROFILES['TAZIK29'];

  const chatWin = document.getElementById('window-chat');
  const titleEl = document.getElementById('chat-window-title');
  const nameEl = document.getElementById('chat-target-name');
  const statusEl = document.getElementById('chat-target-status');
  const avatarEl = document.getElementById('chat-target-avatar');

  if (titleEl) titleEl.textContent = `Чат с: ${profile.name}`;
  if (nameEl) nameEl.textContent = profile.name;
  if (statusEl) {
    statusEl.textContent = profile.status;
    statusEl.className = profile.statusClass;
  }
  if (avatarEl) {
    avatarEl.src = profile.avatar;
    avatarEl.alt = profile.name;
    avatarEl.className = `chat-avatar ${profile.statusClass}`;
  }

  // Restore messages for this target
  loadChatHistory(targetKey);

  chatWin.style.display = 'block';
  chatWin.style.zIndex = getHighestZIndex() + 1;
  const inputEl = document.getElementById('chat-text-input');
  if (inputEl) inputEl.focus();

  try {
    localStorage.setItem('steam_chat_open', 'true');
    localStorage.setItem('steam_chat_target', targetKey);
  } catch (e) {}
}

function closeChatWindow() {
  sfx.playClick();
  const chatWin = document.getElementById('window-chat');
  if (chatWin) {
    chatWin.style.display = 'none';
  }
  try {
    localStorage.setItem('steam_chat_open', 'false');
  } catch (e) {}
}

function sendChatMessage(text) {
  if (!text || !text.trim()) return;

  const messagesBox = document.getElementById('chat-messages');
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'chat-msg outgoing';
  userMsgEl.innerHTML = `
    <div class="chat-msg-header">
      <span class="sender">T1NE</span>
      <span class="time">${timeStr}</span>
    </div>
    <div class="chat-bubble">${escapeHtml(text)}</div>
  `;
  messagesBox.appendChild(userMsgEl);
  messagesBox.scrollTop = messagesBox.scrollHeight;
  sfx.playClick();

  const lower = text.toLowerCase();
  const targetKey = currentChatTargetKey;
  saveChatHistory(targetKey);
  sendLiveChatMessage('T1NE', text, targetKey);

  // Show typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'chat-typing-indicator';
  typingIndicator.id = 'chat-typing-active';
  const typingName = targetKey === 'KUNI' ? 'KUNI' : (targetKey === 'TIPRADD' ? 'TIPRADD' : 'TAZIK29');
  typingIndicator.innerHTML = `
    <span>${typingName} печатает</span>
    <span class="typing-dots">
      <span></span><span></span><span></span>
    </span>
  `;
  messagesBox.appendChild(typingIndicator);
  messagesBox.scrollTop = messagesBox.scrollHeight;

  if (targetKey === 'TIPRADD') {
    let matchedReply = null;
    for (const item of TIPRADD_RESPONSES) {
      if (item.triggers.some(t => lower.includes(t))) {
        matchedReply = item.reply;
        break;
      }
    }
    if (!matchedReply) {
      matchedReply = 'Сижу, монтирую свежую нарезку со стрима TAZIK29. Если пропустил эфир — скоро выложу новые мемы!';
    }

    setTimeout(() => {
      const activeTyping = document.getElementById('chat-typing-active');
      if (activeTyping) activeTyping.remove();

      const botMsgEl = document.createElement('div');
      botMsgEl.className = 'chat-msg incoming';
      botMsgEl.innerHTML = `
        <div class="chat-msg-header">
          <span class="sender">TIPRADD</span>
          <span class="time">${timeStr}</span>
        </div>
        <div class="chat-bubble">${matchedReply}</div>
      `;
      messagesBox.appendChild(botMsgEl);
      messagesBox.scrollTop = messagesBox.scrollHeight;
      sfx.playMessageChime();
      saveChatHistory('TIPRADD');
    }, 600);

    return;
  }

  if (targetKey === 'KUNI') {
    let matchedReply = null;
    for (const item of KUNI_RESPONSES) {
      if (item.triggers.some(t => lower.includes(t))) {
        matchedReply = item.reply;
        break;
      }
    }
    if (!matchedReply) {
      matchedReply = 'Спасибо за вопрос! Издательство KU.NI на связи. Все новости и обновления Deal With Destiny 2 будут публиковаться на странице в Steam!';
    }

    setTimeout(() => {
      const activeTyping = document.getElementById('chat-typing-active');
      if (activeTyping) activeTyping.remove();

      const botMsgEl = document.createElement('div');
      botMsgEl.className = 'chat-msg incoming';
      botMsgEl.innerHTML = `
        <div class="chat-msg-header">
          <span class="sender">KUNI [Издатель]</span>
          <span class="time">${timeStr}</span>
        </div>
        <div class="chat-bubble">${matchedReply}</div>
      `;
      messagesBox.appendChild(botMsgEl);
      messagesBox.scrollTop = messagesBox.scrollHeight;
      sfx.playMessageChime();
      saveChatHistory('KUNI');
    }, 750);

    return;
  }

  // Default: TAZIK29 responses
  let matchedReply = null;
  for (const item of TAZIK_RESPONSES) {
    if (item.triggers.some(t => lower.includes(t))) {
      matchedReply = item.reply;
      break;
    }
  }

  if (!matchedReply) {
    const defaultReplies = [
      'Понял тебя! Сейчас как раз тестирую новый скрипт спавна комбайнов на второй ветке путей.',
      'Интересная мысль! Записал себе в блокнот по разработке Deal With Destiny 2.',
      'Точно! Главное передать ощущение классического Half-Life 2, без лишней мишуры.',
      'Сейчас скомпилирую bsp и проверю в игре!'
    ];
    matchedReply = defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
  }

  setTimeout(() => {
    const activeTyping = document.getElementById('chat-typing-active');
    if (activeTyping) activeTyping.remove();

    const botMsgEl = document.createElement('div');
    botMsgEl.className = 'chat-msg incoming';
    botMsgEl.innerHTML = `
      <div class="chat-msg-header">
        <span class="sender">TAZIK29</span>
        <span class="time">${timeStr}</span>
      </div>
      <div class="chat-bubble">${matchedReply}</div>
    `;
    messagesBox.appendChild(botMsgEl);
    messagesBox.scrollTop = messagesBox.scrollHeight;
    sfx.playMessageChime();
    saveChatHistory('TAZIK29');
  }, 850);
}

// ============================================================================
// 6. PRODUCT ACTIVATION (CD-KEY EASTER EGGS)
// ============================================================================
function activateCdKey(key) {
  const cleanKey = (key || '').trim().toUpperCase();
  sfx.playClick();

  if (!cleanKey) {
    alert('Пожалуйста, введите ключ продукта в формате XXXXX-XXXXX-XXXXX.');
    return;
  }

  let message = '';
  if (cleanKey.includes('1337-SECRET') || cleanKey.includes('DWD2-1337-SECRET') || cleanKey.includes('T1NE-QUEST')) {
    unlockSecret('cdkey');
    message = '[*] [ТАЙНЫЙ CD-KEY РАСШИФРОВАН!] [*]\n\nПродукт: Valve Classified Archive Key (Квест 10 шагов)\nВладелец: T1NE\n\nШаг 4/10 успешно зачтен!';
  } else if (cleanKey.includes('TIPRADD')) {
    message = '[*] [ПАСХАЛКА TIPRADD АКТИВИРОВАНА] [*]\n\nПродукт: Пак лучших мемов и нарезок со стримов TAZIK29\nВладелец: T1NE\n\n«Спасибо за просмотр трансляций и поддержку комьюнити!»';
  } else if (cleanKey.includes('TAZIK') || cleanKey.includes('29')) {
    message = '[АКТИВАЦИЯ УСПЕШНА]\n\nПродукт: TAZIK29 VIP Supporter & Deal With Destiny 2 Beta\n\nВы получили статус почетного тестера модификаций TAZIK29!';
  } else if (cleanKey.includes('DWD')) {
    message = '[АКТИВАЦИЯ УСПЕШНА]\n\nПродукт: Deal With Destiny 2 - Early Pass (2031)\n\nТоварный состав с Оскаром Уилсоном готов к отправке!';
  } else if (cleanKey.includes('GABEN') || cleanKey.includes('VALVE')) {
    message = '[КЛЮЧ ГЕЙБА НЬЮЭЛЛА АКТИВИРОВАН]\n\n«Спасибо за преданность классическому зеленому клиенту Steam 2003 года.»';
  } else if (cleanKey.includes('CROWBAR') || cleanKey.includes('HL')) {
    message = '[ЗОЛОТАЯ МОНТИРОВКА АКТИВИРОВАНА]\n\nУрон ящикам Гордона Фримена увеличен на 300%.';
  } else {
    message = `[ПРОДУКТ АКТИВИРОВАН]\n\nПродукт [${cleanKey}] успешно привязан к вашей учетной записи Steam (T1NE).`;
  }

  alert(message);
  sfx.playMessageChime();
  document.getElementById('window-activate').style.display = 'none';
}

// ============================================================================
// 7. SERVER BROWSER REFRESH & CONNECT (ONLY TAZIK29 OFFICIAL SERVERS)
// ============================================================================
const SERVERS_DATA = [
  { 
    sec: true, 
    name: 'TAZIK29 :: Left 4 Dead 2', 
    game: 'Left 4 Dead 2', 
    gameCode: 'l4d2', 
    ip: '46.174.52.5:27246',
    connectType: 'ip',
    players: '4 / 8', 
    map: 'c2m1_highway', 
    ping: 18, 
    pingClass: 'ping-good' 
  },
  { 
    sec: true, 
    name: 'TAZIK29 :: Synergy', 
    game: 'Synergy Co-op', 
    gameCode: 'synergy', 
    ip: '46.174.52.201:27016',
    connectType: 'ip',
    players: '6 / 12', 
    map: 'syn_city17_rail', 
    ping: 22, 
    pingClass: 'ping-good' 
  },
  { 
    sec: true, 
    name: 'TAZIK29 :: Black Mesa', 
    game: 'Black Mesa', 
    gameCode: 'bm', 
    ip: '46.174.52.201:27015',
    connectType: 'ip',
    players: '8 / 16', 
    map: 'bm_c1a0a', 
    ping: 21, 
    pingClass: 'ping-good' 
  },
  { 
    sec: true, 
    name: 'TAZIK29 :: Sven Co-op', 
    game: 'Sven Co-op', 
    gameCode: 'sven', 
    ip: '62.122.215.96:27015',
    connectType: 'ip',
    players: '10 / 24', 
    map: 'stadium3', 
    ping: 19, 
    pingClass: 'ping-good' 
  },
  { 
    sec: true, 
    name: 'TAZIK29 :: Team Fortress 2', 
    game: 'Team Fortress 2', 
    gameCode: 'tf2', 
    ip: '46.174.48.48:27228',
    connectType: 'ip',
    players: '18 / 24', 
    map: 'pl_badwater', 
    ping: 17, 
    pingClass: 'ping-good' 
  },
  { 
    sec: false, 
    name: 'projectT29 :: Майнкрафт 1.16.5', 
    game: 'Minecraft 1.16.5', 
    gameCode: 'mc', 
    ip: 'projectT29.exaroton.me',
    connectType: 'ip',
    players: '14 / 50', 
    map: 'Survival World', 
    ping: 28, 
    pingClass: 'ping-good' 
  },
  { 
    sec: false, 
    name: 'TAZIK29 :: Roblox', 
    game: 'Roblox', 
    gameCode: 'roblox', 
    ip: 'https://www.roblox.com/share?code=dfbcaede84b2464e87905cac9ed91d7d&type=Server',
    connectType: 'url',
    players: '12 / 30', 
    map: 'Private Server', 
    ping: 35, 
    pingClass: 'ping-med' 
  },
  { 
    sec: true, 
    name: 'TAZIK29 :: Day of Defeat: Source', 
    game: 'Day of Defeat: Source', 
    gameCode: 'dods', 
    ip: '46.174.48.48:27207',
    connectType: 'ip',
    players: '14 / 20', 
    map: 'dod_avalanche', 
    ping: 16, 
    pingClass: 'ping-good' 
  },
  { 
    sec: true, 
    name: "TAZIK29 :: Garry's mod [puk]", 
    game: "Garry's Mod", 
    gameCode: 'gmod', 
    ip: '62.122.213.29:27015',
    connectType: 'ip',
    extraUrl: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3190430156',
    extraLabel: 'Коллекция [puk]',
    players: '22 / 32', 
    map: 'gm_construct', 
    ping: 19, 
    pingClass: 'ping-good' 
  }
];

function renderServers(gameFilter = 'all', searchQuery = '') {
  const tbody = document.getElementById('servers-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  const filtered = SERVERS_DATA.filter(srv => {
    const matchGame = (gameFilter === 'all') || (srv.gameCode === gameFilter);
    const q = (searchQuery || '').toLowerCase();
    const matchSearch = !q || 
      srv.name.toLowerCase().includes(q) || 
      srv.ip.toLowerCase().includes(q) || 
      srv.map.toLowerCase().includes(q) ||
      srv.game.toLowerCase().includes(q);
    return matchGame && matchSearch;
  });

  let totalOnlinePlayers = 0;

  filtered.forEach((srv, idx) => {
    const tr = document.createElement('tr');
    tr.className = 'server-row' + (idx === 0 ? ' selected' : '');
    tr.setAttribute('data-name', srv.name);
    tr.setAttribute('data-ip', srv.ip);

    const secIcon = srv.sec 
      ? '<img src="assets/icons/vac_shield.svg" alt="VAC" class="vac-icon-svg" title="Защищено Valve Anti-Cheat">'
      : '<span class="no-vac-tag" title="Внешний сервер / Сервер сообщества">—</span>';

    const countPart = parseInt(srv.players.split('/')[0]) || 0;
    totalOnlinePlayers += countPart;

    let ipColContent = '';
    if (srv.connectType === 'url') {
      ipColContent = `<a href="${escapeHtml(srv.ip)}" target="_blank" rel="noopener" class="server-ip-link" title="Открыть ссылку сервера Roblox">Roblox Ссылка ↗</a>`;
    } else {
      ipColContent = `
        <div class="server-ip-cell-box">
          <code class="server-ip-code">${escapeHtml(srv.ip)}</code>
          <button class="server-ip-copy-btn" onclick="event.stopPropagation(); copyText('${escapeHtml(srv.ip)}', 'IP скопирован: ${escapeHtml(srv.ip)}')" title="Скопировать IP"><img src="assets/icons/clipboard.svg" alt="Копировать" class="btn-ico-svg small"></button>
        </div>
      `;
    }

    if (srv.extraUrl) {
      ipColContent += ` <a href="${escapeHtml(srv.extraUrl)}" target="_blank" rel="noopener" class="server-addon-link" title="Steam Workshop коллекция" onclick="event.stopPropagation();">${escapeHtml(srv.extraLabel || '[Моды]')} ↗</a>`;
    }

    tr.innerHTML = `
      <td>${secIcon}</td>
      <td class="server-name-cell"><strong>${escapeHtml(srv.name)}</strong></td>
      <td><span class="server-game-badge">${escapeHtml(srv.game)}</span></td>
      <td>${ipColContent}</td>
      <td class="server-players-cell">${escapeHtml(srv.players)}</td>
      <td>${escapeHtml(srv.map)}</td>
      <td class="${srv.pingClass}">${srv.ping} ms</td>
    `;
    tr.addEventListener('click', () => {
      sfx.playClick();
      document.querySelectorAll('.server-row').forEach(r => r.classList.remove('selected'));
      tr.classList.add('selected');
    });
    tr.addEventListener('dblclick', () => {
      connectToServer(srv.name, srv.ip, srv.connectType);
    });
    tbody.appendChild(tr);
  });

  const countEl = document.getElementById('server-count-num');
  if (countEl) countEl.textContent = filtered.length;

  const onlineEl = document.getElementById('servers-online-num');
  if (onlineEl) onlineEl.textContent = totalOnlinePlayers;
}

function connectToServer(serverName, serverIp, connectType) {
  sfx.playLaunchSound();
  if (connectType === 'url') {
    window.open(serverIp, '_blank');
    return;
  }
  const cleanIp = serverIp || '';
  navigator.clipboard.writeText(cleanIp).catch(() => {});
  alert(`ПОДКЛЮЧЕНИЕ К СЕРВЕРУ:\n${serverName}\n\nIP Адрес: ${cleanIp}\n(IP также скопирован в ваш буфер обмена!)\n\nСетевой протокол: 48\nСтатус: Соединение с сервером установлено!`);
}

// ============================================================================
// 7.5 LIVE SERVER QUERIES & P2P MULTI-TAB COMMUNITY HUB (GITHUB PAGES READY)
// ============================================================================
const IS_STATIC_HOST = (
  window.location.protocol === 'file:' ||
  window.location.hostname.endsWith('github.io') ||
  window.location.hostname.endsWith('pages.dev') ||
  window.location.hostname.endsWith('vercel.app') ||
  window.location.hostname.endsWith('netlify.app') ||
  (window.location.hostname === 'localhost' && window.location.port !== '8000')
);

// P2P Multi-Tab Synchronization via HTML5 BroadcastChannel
const clientTabId = 'tab_' + Math.random().toString(36).substring(2, 9);
const activeTabsSet = new Set([clientTabId]);
let broadcastCommunityChannel = null;

function initLocalBroadcastChannel() {
  if (typeof BroadcastChannel === 'undefined') return;
  try {
    broadcastCommunityChannel = new BroadcastChannel('t1ne_steam_network');
    broadcastCommunityChannel.onmessage = (event) => {
      const data = event.data;
      if (!data) return;

      if (data.type === 'tab_hello') {
        activeTabsSet.add(data.tabId);
        broadcastCommunityChannel.postMessage({ type: 'tab_welcome', tabId: clientTabId });
        updateMultiTabPresence();
      } else if (data.type === 'tab_welcome') {
        activeTabsSet.add(data.tabId);
        updateMultiTabPresence();
      } else if (data.type === 'tab_bye') {
        activeTabsSet.delete(data.tabId);
        updateMultiTabPresence();
      } else if (data.type === 'chat_message') {
        appendLiveChatMessage(data.sender, data.text, data.timestamp);
      } else if (data.type === 'sync_secret') {
        if (data.secretId) {
          unlockSecret(data.secretId, true);
        }
      }
    };

    broadcastCommunityChannel.postMessage({ type: 'tab_hello', tabId: clientTabId });

    window.addEventListener('beforeunload', () => {
      try {
        if (broadcastCommunityChannel) {
          broadcastCommunityChannel.postMessage({ type: 'tab_bye', tabId: clientTabId });
        }
      } catch (e) {}
    });
  } catch (e) {}
}

function updateMultiTabPresence() {
  const count = Math.max(1, activeTabsSet.size);
  const friendsTitle = document.getElementById('open-friends-shortcut');
  if (friendsTitle) {
    friendsTitle.innerHTML = `<img src="assets/icons/friends_icon.svg" alt="Friends" class="sys-ico"><span class="status-indicator online"></span> Друзья (${count} онлайн)`;
  }
}

function simulateLiveServerJitter() {
  SERVERS_DATA.forEach(srv => {
    if (srv.connectType !== 'url') {
      const parts = srv.players.split('/');
      if (parts.length === 2) {
        let curr = parseInt(parts[0], 10) || 0;
        const max = parseInt(parts[1], 10) || 24;
        const delta = Math.floor(Math.random() * 5) - 2;
        curr = Math.max(1, Math.min(max - 1, curr + delta));
        srv.players = `${curr}/${max}`;
      }
      const pingNum = parseInt(srv.ping, 10) || 20;
      const pingDelta = Math.floor(Math.random() * 7) - 3;
      const newPing = Math.max(8, pingNum + pingDelta);
      srv.ping = newPing;
      srv.pingClass = newPing < 30 ? 'ping-good' : (newPing < 70 ? 'ping-med' : 'ping-bad');
    }
  });
  const currentFilter = document.getElementById('server-filter-game')?.value || 'all';
  const currentSearch = document.getElementById('server-search-input')?.value || '';
  renderServers(currentFilter, currentSearch);
}

async function fetchLiveServers(animateBtn = false) {
  const refreshBtn = document.getElementById('refresh-servers-btn');
  if (animateBtn && refreshBtn) {
    const icon = refreshBtn.querySelector('.btn-ico-svg');
    if (icon) {
      icon.classList.remove('spinning-icon');
      void icon.offsetWidth;
      icon.classList.add('spinning-icon');
      setTimeout(() => icon.classList.remove('spinning-icon'), 850);
    }
  }

  if (IS_STATIC_HOST) {
    simulateLiveServerJitter();
    if (animateBtn) {
      printToConsole('[NET] Список серверов Valve 2003 обновлен (Пинги и онлайн пересчитаны).', 'info');
    }
    return;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch('/api/servers', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && data.servers && data.servers.length) {
        data.servers.forEach(liveSrv => {
          const local = SERVERS_DATA.find(s => s.gameCode === liveSrv.gameCode);
          if (local) {
            local.name = liveSrv.name || local.name;
            local.players = liveSrv.players || local.players;
            local.map = liveSrv.map || local.map;
            local.ping = liveSrv.ping || local.ping;
            local.pingClass = liveSrv.pingClass || local.pingClass;
            local.sec = liveSrv.sec !== undefined ? liveSrv.sec : local.sec;
          }
        });
        const currentFilter = document.getElementById('server-filter-game')?.value || 'all';
        const currentSearch = document.getElementById('server-search-input')?.value || '';
        renderServers(currentFilter, currentSearch);
        return;
      }
    }
  } catch (e) {}

  simulateLiveServerJitter();
}

let communitySocket = null;

function initCommunityWebSocket() {
  if (IS_STATIC_HOST) {
    printToConsole('[NET] Steam 2003 активен на GitHub Pages (Автономный режим клиента).', 'init');
    printToConsole('[P2P] Синхронизация между вкладками включена (BroadcastChannel API).', 'info');
    initLocalBroadcastChannel();
    fetchLiveServers(false);
    return;
  }

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${protocol}//${window.location.host}/ws/community`;

  let wsRetries = 0;
  function connectWS() {
    try {
      communitySocket = new WebSocket(wsUrl);

      communitySocket.onopen = () => {
        printToConsole('[NET] Мастер-сервер Valve 2003 подключен (Starlette + WebSockets LIVE).', 'init');
        fetchLiveServers(false);
      };

      communitySocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'presence') {
            const userCount = data.online_users || 1;
            const friendsTitle = document.getElementById('open-friends-shortcut');
            if (friendsTitle) {
              friendsTitle.innerHTML = `<img src="assets/icons/friends_icon.svg" alt="Friends" class="sys-ico"><span class="status-indicator online"></span> Друзья (${userCount} онлайн)`;
            }
          } else if (data.type === 'chat_message') {
            appendLiveChatMessage(data.sender, data.text, data.timestamp);
          }
        } catch (e) {}
      };

      communitySocket.onclose = () => {
        wsRetries++;
        if (wsRetries < 2) {
          setTimeout(connectWS, 4000);
        } else {
          initLocalBroadcastChannel();
        }
      };

      communitySocket.onerror = () => {
        initLocalBroadcastChannel();
      };
    } catch (e) {
      initLocalBroadcastChannel();
    }
  }

  connectWS();
}

function sendLiveChatMessage(sender, text, target) {
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (broadcastCommunityChannel) {
    try {
      broadcastCommunityChannel.postMessage({
        type: 'chat_message',
        sender: sender || 'T1NE',
        text: text,
        timestamp: timeStr
      });
    } catch (e) {}
  }

  if (communitySocket && communitySocket.readyState === WebSocket.OPEN) {
    try {
      communitySocket.send(JSON.stringify({
        type: 'chat',
        sender: sender || 'T1NE',
        text: text,
        target: target || 'global'
      }));
    } catch (e) {}
  } else if (!IS_STATIC_HOST) {
    fetch('/api/chat/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender: sender || 'T1NE', text: text, target: target || 'global' })
    }).catch(() => {});
  }
}

function appendLiveChatMessage(sender, text, timeStr) {
  if (sender === 'T1NE') return;
  const messagesBox = document.getElementById('chat-messages');
  if (!messagesBox) return;

  const msgEl = document.createElement('div');
  msgEl.className = 'chat-msg incoming';
  msgEl.innerHTML = `
    <div class="chat-msg-header">
      <span class="sender">${escapeHtml(sender)}</span>
      <span class="time">${escapeHtml(timeStr || '')}</span>
    </div>
    <div class="chat-bubble">${escapeHtml(text)}</div>
  `;
  messagesBox.appendChild(msgEl);
  messagesBox.scrollTop = messagesBox.scrollHeight;
  sfx.playMessageChime();
}

// ============================================================================
// RETRO STEAM TOAST NOTIFICATION SYSTEM (ОТКЛЮЧЕНО)
// ============================================================================
function showSteamToast() {
  const container = document.getElementById('steam-toast-container');
  if (container) {
    container.remove();
  }
  return;
}

// Global text copy helper
window.copyText = function(text, successMsg) {
  sfx.playClick();
  navigator.clipboard.writeText(text).then(() => {
    showSteamToast('Буфер обмена Steam', successMsg || `Скопировано: ${text}`, 'assets/icons/steam_icon.svg');
  }).catch(() => {
    showSteamToast('Буфер обмена Steam', `Скопировано: ${text}`, 'assets/icons/steam_icon.svg');
  });
};

// ============================================================================
// 8. DRAGGABLE FLOATING WINDOWS & POSITION PERSISTENCE
// ============================================================================
function saveWindowPos(winEl) {
  if (!winEl || !winEl.id) return;
  try {
    const pos = {
      left: winEl.style.left,
      top: winEl.style.top
    };
    localStorage.setItem(`steam_pos_${winEl.id}`, JSON.stringify(pos));
  } catch (e) {}
}

function restoreWindowPos(winEl) {
  if (!winEl || !winEl.id) return;
  try {
    const saved = localStorage.getItem(`steam_pos_${winEl.id}`);
    if (saved) {
      const pos = JSON.parse(saved);
      if (pos.left && pos.top) {
        winEl.style.left = pos.left;
        winEl.style.top = pos.top;
        winEl.style.right = 'auto';
        winEl.style.bottom = 'auto';
      }
    }
  } catch (e) {}
}

function makeDraggable(windowEl, handleEl) {
  let isDragging = false;
  let startX, startY, initialLeft, initialTop;

  handleEl.addEventListener('mousedown', (e) => {
    if (e.button !== 0 || e.target.classList.contains('win-btn')) return;

    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;

    const rect = windowEl.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;

    windowEl.style.zIndex = getHighestZIndex() + 1;
    document.body.style.cursor = 'move';
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    windowEl.style.left = `${initialLeft + dx}px`;
    windowEl.style.top = `${initialTop + dy}px`;
    windowEl.style.right = 'auto';
    windowEl.style.bottom = 'auto';
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      document.body.style.cursor = 'default';
      saveWindowPos(windowEl);
    }
  });
}

function getHighestZIndex() {
  const elements = document.querySelectorAll('.floating-window, .steam-window');
  let max = 100;
  elements.forEach(el => {
    const z = parseInt(window.getComputedStyle(el).zIndex, 10);
    if (!isNaN(z) && z > max) max = z;
  });
  return max;
}

// ============================================================================
// 8.5 10 SECRETS QUEST & MASTER ARCHIVE SYSTEM
// ============================================================================
const SECRETS_CONFIG = [
  {
    id: 'crowbar',
    title: 'Монтировка Гордона',
    hint: 'В библиотеке игр Deal With Destiny 2 найдите и кликните по иконке монтировки в блоке достижений.',
    actionName: 'Осмотреть монтировку'
  },
  {
    id: 'console',
    title: 'Шифровка консоли',
    hint: 'Откройте консоль разработчика (~) и введите секретную команду "secret".',
    actionName: 'Команда консоли'
  },
  {
    id: 'date2031',
    title: 'Временная петля 2031',
    hint: 'В свойствах Deal With Destiny 2 быстро кликните трижды по дате выхода (2031 год).',
    actionName: 'Временная аномалия'
  },
  {
    id: 'cdkey',
    title: 'Тайный CD-Key',
    hint: 'В мастере активации продукта введите ключ: DWD2-1337-SECRET.',
    actionName: 'Регистрация ключа'
  },
  {
    id: 'valve_valve',
    title: 'Клапан Valve',
    hint: 'Поверните клапан Valve: нажмите 5 раз на логотип Valve/Steam в левом верхнем углу окна.',
    actionName: 'Поворот клапана'
  },
  {
    id: 'barney',
    title: 'Долг Барни',
    hint: 'В списке друзей (окно "Друзья") кликните по Барни Калхуну, чтобы напомнить ему про пиво.',
    actionName: 'Напомнить Барни'
  },
  {
    id: 'news',
    title: 'Архив 2003 года',
    hint: 'Во вкладке "Новости" найдите и прочитайте засекреченную директиву Valve от 2003 года.',
    actionName: 'Изучить ретро-новости'
  },
  {
    id: 'store',
    title: 'Заводской пропуск',
    hint: 'Во вкладке "Магазин / Моды" кликните по плашке "Бесплатно для владельцев HL2" у DWD2.',
    actionName: 'Заводской пропуск'
  },
  {
    id: 'settings',
    title: 'Потайной тумблер',
    hint: 'В настройках Steam (Steam -> Настройки -> Интерфейс) включите скрытый тумблер отладки.',
    actionName: 'Тумблер отладки'
  },
  {
    id: 't1ne_keys',
    title: 'Печать T1NE',
    hint: 'Наберите на клавиатуре подряд буквы имени: T 1 N E (вне текстовых полей ввода).',
    actionName: 'Комбинация T1NE'
  }
];

function getUnlockedSecrets() {
  try {
    const raw = localStorage.getItem('steam_secrets_unlocked');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function unlockSecret(secretId) {
  const current = getUnlockedSecrets();
  if (current.includes(secretId)) return false;

  current.push(secretId);
  try {
    localStorage.setItem('steam_secrets_unlocked', JSON.stringify(current));
  } catch (e) {}

  const secretInfo = SECRETS_CONFIG.find(s => s.id === secretId);
  const count = current.length;

  sfx.playSecretChime();
  printToConsole(`[*] [ТАЙНА STEAM 2003 РАСКРЫТА] [Шаг ${count}/10: ${secretInfo ? secretInfo.title : secretId}]`, 'highlight');

  updateSecretsUI();

  if (count === 10) {
    setTimeout(() => {
      sfx.playFanfare();
      openMasterSecretWindow();
      printToConsole('================================================================', 'highlight');
      printToConsole('[*] [ПОЗДРАВЛЯЕМ! ВСЕ 10 ШАГОВ ВЫПОЛНЕНЫ! ГРАНД-АРХИВ ОТКРЫТ!] [*]', 'highlight');
      printToConsole('Пользователь: T1NE [ВЕРХОВНЫЙ АРХИВАРИУС STEAM 2003]', 'init');
      printToConsole('================================================================', 'highlight');
    }, 600);
  }
  return true;
}

function resetSecretsProgress() {
  try {
    localStorage.removeItem('steam_secrets_unlocked');
  } catch (e) {}
  sfx.playClick();
  updateSecretsUI();
  printToConsole('[СЕКРЕТЫ СБРОШЕНЫ] Прогресс расследования обнулен.', 'info');
}

function updateSecretsUI() {
  const unlocked = getUnlockedSecrets();
  const count = unlocked.length;

  const menuItem = document.getElementById('menu-secrets-quest');
  if (menuItem) {
    menuItem.textContent = `Тайны Steam (${count}/10)...`;
  }

  const badgeSlot = document.getElementById('archivist-badge-slot');
  if (badgeSlot) {
    if (count === 10) {
      badgeSlot.innerHTML = '<span class="archivist-badge" title="Верховный Архивариус Steam 2003 (Все 10 секретов разгаданы)">[[*] 10/10]</span>';
    } else {
      badgeSlot.innerHTML = '';
    }
  }

  const counterEl = document.getElementById('quest-progress-counter');
  const barFillEl = document.getElementById('quest-progress-bar-fill');
  const openArchiveBtn = document.getElementById('btn-open-master-archive');
  const listContainer = document.getElementById('quest-list-container');

  if (counterEl) counterEl.textContent = `${count} / 10`;
  if (barFillEl) barFillEl.style.width = `${Math.round((count / 10) * 100)}%`;
  if (openArchiveBtn) {
    openArchiveBtn.disabled = (count < 10);
  }

  if (listContainer) {
    listContainer.innerHTML = '';
    SECRETS_CONFIG.forEach((s, idx) => {
      const isDone = unlocked.includes(s.id);
      const row = document.createElement('div');
      row.className = 'quest-step-row';
      row.innerHTML = `
        <span class="quest-step-status ${isDone ? 'unlocked' : 'locked'}">
          ${isDone ? '[РАЗГАДАНО]' : `[ШАГ ${idx + 1}]`}
        </span>
        <div class="quest-step-body">
          <div class="quest-step-title">${idx + 1}. ${escapeHtml(s.title)}</div>
          <div class="quest-step-hint">${escapeHtml(isDone ? 'Тайна найдена и подтверждена в логах ядра.' : s.hint)}</div>
        </div>
      `;
      listContainer.appendChild(row);
    });
  }

  const devCheckbox = document.getElementById('secret-dev-checkbox');
  if (devCheckbox && unlocked.includes('settings')) {
    devCheckbox.checked = true;
  }
}

function openQuestTrackerWindow() {
  const win = document.getElementById('window-quest-tracker');
  if (!win) return;
  sfx.playWindowPopup();
  win.style.display = 'block';
  win.style.zIndex = getHighestZIndex('.floating-window') + 1;
  updateSecretsUI();
}

function openMasterSecretWindow() {
  const win = document.getElementById('window-master-secret');
  if (!win) return;
  sfx.playLaunchSound();
  win.style.display = 'block';
  win.style.zIndex = getHighestZIndex('.floating-window') + 2;
  updateSecretsUI();
}

function initSecretsSystem() {
  updateSecretsUI();

  // Step 3: Date 2031 triple click
  let dateClickCount = 0;
  let dateClickTimeout = null;
  const metaRelease = document.getElementById('meta-release');
  if (metaRelease) {
    metaRelease.style.cursor = 'pointer';
    metaRelease.addEventListener('click', () => {
      dateClickCount++;
      clearTimeout(dateClickTimeout);
      dateClickTimeout = setTimeout(() => { dateClickCount = 0; }, 1200);
      if (dateClickCount >= 3) {
        dateClickCount = 0;
        unlockSecret('date2031');
      }
    });
  }

  // Step 5: Valve logo 5 clicks
  let valveClickCount = 0;
  let valveClickTimeout = null;
  const valveTrigger = document.getElementById('valve-valve-trigger');
  if (valveTrigger) {
    valveTrigger.addEventListener('click', () => {
      valveClickCount++;
      clearTimeout(valveClickTimeout);
      valveClickTimeout = setTimeout(() => { valveClickCount = 0; }, 2200);
      if (valveClickCount >= 5) {
        valveClickCount = 0;
        unlockSecret('valve_valve');
      }
    });
  }

  // Step 6: Barney in friends
  const friendBarney = document.getElementById('friend-open-barney');
  if (friendBarney) {
    friendBarney.addEventListener('click', () => {
      sfx.playClick();
      unlockSecret('barney');
      alert('Барни Калхун:\n\n«Эй, T1NE! Насчет того пива, что я задолжал... Я всё помню! Шаг 6/10 зачтен!»');
    });
  }

  // Step 7: News 2003
  const newsSecret = document.getElementById('news-secret-2003');
  if (newsSecret) {
    newsSecret.addEventListener('click', () => {
      sfx.playClick();
      unlockSecret('news');
      alert('Засекреченная директива Valve (12.09.2003):\n\n«Внимание: в ранних сборках сетевого движка зафиксирована аномалия с товарным составом. Архив 2003 года успешно рассекречен!»');
    });
  }

  // Step 8: Store tag
  const storeSecretTag = document.getElementById('store-secret-price-tag');
  if (storeSecretTag) {
    storeSecretTag.addEventListener('click', (e) => {
      e.stopPropagation();
      sfx.playClick();
      unlockSecret('store');
      alert('Заводской пропуск TAZIK29:\n\n«Вы получили бесплатный пропуск через проходную завода на показ Deal With Destiny 2!»');
    });
  }

  // Step 9: Settings checkbox
  const secretCheckbox = document.getElementById('secret-dev-checkbox');
  if (secretCheckbox) {
    secretCheckbox.addEventListener('change', () => {
      if (secretCheckbox.checked) {
        sfx.playClick();
        unlockSecret('settings');
      }
    });
  }

  // Step 10: Keyboard T-1-N-E
  let keyBuffer = '';
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-4);
    if (keyBuffer === 't1ne') {
      keyBuffer = '';
      unlockSecret('t1ne_keys');
    }
  });

  // Windows controls
  const masterClose = document.getElementById('master-secret-close-btn');
  const masterDone = document.getElementById('master-secret-done-btn');
  const questClose = document.getElementById('quest-tracker-close-btn');
  const questOk = document.getElementById('quest-tracker-ok-btn');
  const menuQuest = document.getElementById('menu-secrets-quest');
  const btnOpenMasterFromQuest = document.getElementById('btn-open-master-archive');
  const btnResetQuest = document.getElementById('btn-reset-quest-progress');

  const closeMaster = () => {
    const w = document.getElementById('window-master-secret');
    if (w) w.style.display = 'none';
    sfx.stopSecretAmbient();
    const playBtn = document.getElementById('btn-play-secret-ambient');
    const stopBtn = document.getElementById('btn-stop-secret-ambient');
    const statusText = document.getElementById('secret-audio-status');
    const viz = document.getElementById('secret-audio-visualizer');
    if (playBtn) playBtn.disabled = false;
    if (stopBtn) stopBtn.disabled = true;
    if (statusText) statusText.textContent = 'Остановлено';
    if (viz) viz.classList.remove('playing');
  };

  if (masterClose) masterClose.addEventListener('click', closeMaster);
  if (masterDone) masterDone.addEventListener('click', closeMaster);

  if (questClose) questClose.addEventListener('click', () => {
    const w = document.getElementById('window-quest-tracker');
    if (w) w.style.display = 'none';
  });
  if (questOk) questOk.addEventListener('click', () => {
    const w = document.getElementById('window-quest-tracker');
    if (w) w.style.display = 'none';
  });

  if (menuQuest) menuQuest.addEventListener('click', () => {
    if (getUnlockedSecrets().length >= 10) {
      openMasterSecretWindow();
    } else {
      openQuestTrackerWindow();
    }
  });

  if (btnOpenMasterFromQuest) {
    btnOpenMasterFromQuest.addEventListener('click', () => {
      openMasterSecretWindow();
    });
  }

  if (btnResetQuest) {
    btnResetQuest.addEventListener('click', () => {
      if (confirm('Сбросить весь прогресс расследования тайн (0/10)?')) {
        resetSecretsProgress();
      }
    });
  }

  // Ambient soundtrack play/stop
  const playAmbientBtn = document.getElementById('btn-play-secret-ambient');
  const stopAmbientBtn = document.getElementById('btn-stop-secret-ambient');
  const ambientStatus = document.getElementById('secret-audio-status');
  const ambientViz = document.getElementById('secret-audio-visualizer');

  if (playAmbientBtn && stopAmbientBtn) {
    playAmbientBtn.addEventListener('click', () => {
      sfx.startSecretAmbient();
      playAmbientBtn.disabled = true;
      stopAmbientBtn.disabled = false;
      if (ambientStatus) ambientStatus.textContent = 'Воспроизведение... (Эмбиент депо)';
      if (ambientViz) ambientViz.classList.add('playing');
    });

    stopAmbientBtn.addEventListener('click', () => {
      sfx.stopSecretAmbient();
      playAmbientBtn.disabled = false;
      stopAmbientBtn.disabled = true;
      if (ambientStatus) ambientStatus.textContent = 'Остановлено';
      if (ambientViz) ambientViz.classList.remove('playing');
    });
  }

  // CRT scanlines mode toggle
  const toggleCrtBtn = document.getElementById('btn-toggle-crt-mode');
  const crtIndicator = document.getElementById('crt-status-indicator');
  const crtLabel = document.getElementById('crt-toggle-label');

  if (toggleCrtBtn) {
    toggleCrtBtn.addEventListener('click', () => {
      sfx.playClick();
      const isCrt = document.body.classList.toggle('crt-mode');
      if (crtIndicator) {
        crtIndicator.textContent = isCrt ? 'Включен' : 'Выключен';
        crtIndicator.classList.toggle('active', isCrt);
      }
      if (crtLabel) {
        crtLabel.textContent = isCrt ? 'Выключить CRT Scanline Режим' : 'Включить CRT Scanline Режим';
      }
    });
  }

  // Make windows draggable
  makeDraggable(document.getElementById('window-quest-tracker'), document.getElementById('quest-tracker-titlebar'));
  makeDraggable(document.getElementById('window-master-secret'), document.getElementById('master-secret-titlebar'));
  restoreWindowPos(document.getElementById('window-quest-tracker'));
  restoreWindowPos(document.getElementById('window-master-secret'));
}

// ============================================================================
// 9. UTILITIES & INITIALIZATION
// ============================================================================
function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const staleToast = document.getElementById('steam-toast-container');
  if (staleToast) staleToast.remove();

  // 1. Initialize Tabs & Restore Active Tab State
  initTabs();

  // 2. Restore Selected Game (without forcing tab switch)
  const savedGame = localStorage.getItem('steam_selected_game') || 'dwd2';
  selectGame(savedGame, false);

  // 3. Restore Active Tab from localStorage (defaults to 'games')
  const savedTab = localStorage.getItem('steam_active_tab') || 'games';
  switchTab(savedTab, false);

  // Initialize Library search and category filtering
  initLibraryFiltering();

  // Initialize 10 Secrets & Master Archive System
  initSecretsSystem();

  // Initialize Live WebSockets & Valve UDP Server Polling
  initCommunityWebSocket();
  fetchLiveServers(false);

  // Sidebar item click
  document.querySelectorAll('.game-item').forEach(item => {
    item.addEventListener('click', () => {
      sfx.playClick();
      const gameId = item.getAttribute('data-game-id');
      selectGame(gameId, true);
    });
  });

  // 3. Play Game Button & Modals
  const launchBtn = document.getElementById('launch-game-btn');
  if (launchBtn) {
    launchBtn.addEventListener('click', launchGameModal);
  }
  const launchCancelBtn = document.getElementById('launch-modal-cancel');
  if (launchCancelBtn) {
    launchCancelBtn.addEventListener('click', closeLaunchModal);
  }
  const launchCloseBtn = document.getElementById('launch-modal-close');
  if (launchCloseBtn) {
    launchCloseBtn.addEventListener('click', closeLaunchModal);
  }
  const playNowBtn = document.getElementById('launch-play-now-btn');
  if (playNowBtn) {
    playNowBtn.addEventListener('click', () => {
      const game = GAMES_DB[currentSelectedGameId] || GAMES_DB['dwd2'];
      sfx.playMessageChime();
      showSteamToast('Steam', `Игра ${game.title} успешно запущена!`, 'assets/icons/play.svg');
      closeLaunchModal();
    });
  }

  // 4. Screenshot Viewer Lightbox Event Listeners
  const viewerModal = document.getElementById('screenshot-viewer-modal');
  const viewerCloseBtn = document.getElementById('screenshot-viewer-close');
  const viewerCloseFooterBtn = document.getElementById('screenshot-viewer-close-btn');
  const viewerPrevBtn = document.getElementById('screenshot-viewer-prev');
  const viewerNextBtn = document.getElementById('screenshot-viewer-next');
  const viewerImg = document.getElementById('screenshot-viewer-img');

  if (viewerCloseBtn) viewerCloseBtn.addEventListener('click', closeScreenshotViewer);
  if (viewerCloseFooterBtn) viewerCloseFooterBtn.addEventListener('click', closeScreenshotViewer);
  if (viewerPrevBtn) viewerPrevBtn.addEventListener('click', prevScreenshot);
  if (viewerNextBtn) viewerNextBtn.addEventListener('click', nextScreenshot);
  if (viewerImg) {
    viewerImg.addEventListener('click', () => {
      nextScreenshot();
    });
  }
  if (viewerModal) {
    viewerModal.addEventListener('click', (e) => {
      if (e.target === viewerModal) {
        closeScreenshotViewer();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    const launchModal = document.getElementById('launch-modal');
    if (launchModal && launchModal.style.display === 'flex' && e.key === 'Escape') {
      closeLaunchModal();
    }

    if (viewerModal && viewerModal.style.display === 'flex') {
      if (e.key === 'Escape') {
        closeScreenshotViewer();
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextScreenshot();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevScreenshot();
      }
    }
  });

  // 5. Floating Windows Drag & Drop and Position Restoration
  const friendsWin = document.getElementById('window-friends');
  const friendsTitle = document.getElementById('friends-titlebar');
  if (friendsWin && friendsTitle) makeDraggable(friendsWin, friendsTitle);

  const chatWin = document.getElementById('window-chat');
  const chatTitle = document.getElementById('chat-titlebar');
  if (chatWin && chatTitle) makeDraggable(chatWin, chatTitle);

  const activateWin = document.getElementById('window-activate');
  const activateTitle = document.getElementById('activate-titlebar');
  if (activateWin && activateTitle) makeDraggable(activateWin, activateTitle);

  // Restore Window Positions from localStorage
  if (friendsWin) restoreWindowPos(friendsWin);
  if (chatWin) restoreWindowPos(chatWin);
  if (activateWin) restoreWindowPos(activateWin);

  // Floating Windows: All start strictly CLOSED on entry (only Library open)
  if (friendsWin) friendsWin.style.display = 'none';
  if (chatWin) chatWin.style.display = 'none';
  if (activateWin) activateWin.style.display = 'none';
  try {
    localStorage.removeItem('steam_friends_open');
    localStorage.removeItem('steam_chat_open');
    localStorage.removeItem('steam_activate_open');
  } catch (e) {}

  // 6. Sound Toggle Restoration
  const toggleSoundBtn = document.getElementById('toggle-sound-btn');
  const soundStatusText = document.getElementById('sound-status-text');
  const soundIcoImg = document.getElementById('sound-ico-img');
  
  const savedSound = localStorage.getItem('steam_sound_enabled');
  if (savedSound === 'false') {
    sfx.enabled = false;
    if (soundStatusText) soundStatusText.textContent = 'Звук: ВЫКЛ';
    if (soundIcoImg) soundIcoImg.src = 'assets/icons/sound_off.svg';
  }

  if (toggleSoundBtn) {
    toggleSoundBtn.addEventListener('click', () => {
      const isEnabled = sfx.toggle();
      soundStatusText.textContent = isEnabled ? 'Звук: ВКЛ' : 'Звук: ВЫКЛ';
      if (soundIcoImg) {
        soundIcoImg.src = isEnabled ? 'assets/icons/sound_on.svg' : 'assets/icons/sound_off.svg';
      }
      try {
        localStorage.setItem('steam_sound_enabled', isEnabled ? 'true' : 'false');
      } catch (e) {}
      sfx.playClick();
      showSteamToast('Настройки звука', isEnabled ? 'Звуковые эффекты Steam включены' : 'Звуковые эффекты Steam отключены', isEnabled ? 'assets/icons/sound_on.svg' : 'assets/icons/sound_off.svg');
    });
  }

  try {
    localStorage.removeItem('steam_crt_active');
    document.body.classList.remove('crt-active');
  } catch (e) {}

  // 7. Friends Window Controls
  const friendsShortcut = document.getElementById('open-friends-shortcut');
  if (friendsShortcut) {
    friendsShortcut.addEventListener('click', () => {
      sfx.playClick();
      const willOpen = friendsWin.style.display === 'none';
      friendsWin.style.display = willOpen ? 'block' : 'none';
      if (willOpen) friendsWin.style.zIndex = getHighestZIndex() + 1;
      try {
        localStorage.setItem('steam_friends_open', willOpen ? 'true' : 'false');
      } catch (e) {}
    });
  }

  const friendsCloseBtn = document.getElementById('friends-close-btn');
  if (friendsCloseBtn) {
    friendsCloseBtn.addEventListener('click', () => {
      sfx.playClick();
      friendsWin.style.display = 'none';
      try {
        localStorage.setItem('steam_friends_open', 'false');
      } catch (e) {}
    });
  }

  // 8. CD Key Activation Window Controls
  const activateShortcut = document.getElementById('open-activate-shortcut');
  if (activateShortcut) {
    activateShortcut.addEventListener('click', () => {
      sfx.playClick();
      activateWin.style.display = 'block';
      activateWin.style.zIndex = getHighestZIndex() + 1;
      try {
        localStorage.setItem('steam_activate_open', 'true');
      } catch (e) {}
    });
  }

  const activateCloseBtn = document.getElementById('activate-close-btn');
  if (activateCloseBtn) {
    activateCloseBtn.addEventListener('click', () => {
      sfx.playClick();
      activateWin.style.display = 'none';
      try {
        localStorage.setItem('steam_activate_open', 'false');
      } catch (e) {}
    });
  }
  const activateCancelBtn = document.getElementById('activate-cancel-btn');
  if (activateCancelBtn) {
    activateCancelBtn.addEventListener('click', () => {
      sfx.playClick();
      activateWin.style.display = 'none';
      try {
        localStorage.setItem('steam_activate_open', 'false');
      } catch (e) {}
    });
  }

  const activateSubmitBtn = document.getElementById('activate-submit-btn');
  if (activateSubmitBtn) {
    activateSubmitBtn.addEventListener('click', () => {
      const keyVal = document.getElementById('cd-key-input').value;
      activateCdKey(keyVal);
    });
  }

  const serversShortcut = document.getElementById('open-servers-shortcut');
  if (serversShortcut) {
    serversShortcut.addEventListener('click', () => {
      switchTab('servers-tab', true);
    });
  }

  // 9. Chat Window Controls & Triggers
  const chatCloseBtn = document.getElementById('chat-close-btn');
  if (chatCloseBtn) {
    chatCloseBtn.addEventListener('click', closeChatWindow);
  }
  const chatMinBtn = document.getElementById('chat-min-btn');
  if (chatMinBtn) {
    chatMinBtn.addEventListener('click', closeChatWindow);
  }

  const chatForm = document.getElementById('chat-form');
  if (chatForm) {
    chatForm.addEventListener('click', () => sfx.init());
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('chat-text-input');
      const val = input.value;
      input.value = '';
      sendChatMessage(val);
    });
  }

  // Opening chat with TAZIK29 from various triggers
  document.querySelectorAll('#friend-open-tazik, #btn-message-profile, #link-chat-tazik, #btn-chat-author-big').forEach(el => {
    if (el) el.addEventListener('click', () => openChatWindow('TAZIK29'));
  });

  // Opening chat with KUNI Publisher from various triggers
  const friendKuni = document.getElementById('friend-open-kuni');
  if (friendKuni) {
    friendKuni.addEventListener('click', () => openChatWindow('KUNI'));
  }
  const friendMiniKuni = document.getElementById('friend-mini-kuni');
  if (friendMiniKuni) {
    friendMiniKuni.addEventListener('click', () => openChatWindow('KUNI'));
  }

  // Opening chat with TIPRADD [Пасхалка]
  const friendTipradd = document.getElementById('friend-open-tipradd');
  if (friendTipradd) {
    friendTipradd.addEventListener('click', () => openChatWindow('TIPRADD'));
  }


  // 10. Server browser events & persistence
  const serverFilterGame = document.getElementById('server-filter-game');
  const serverSearchInput = document.getElementById('server-search-input');
  
  const savedServerFilter = localStorage.getItem('steam_server_filter') || 'all';
  const savedServerSearch = localStorage.getItem('steam_server_search') || '';
  if (serverFilterGame) serverFilterGame.value = savedServerFilter;
  if (serverSearchInput) serverSearchInput.value = savedServerSearch;
  renderServers(savedServerFilter, savedServerSearch);

  if (serverFilterGame) {
    serverFilterGame.addEventListener('change', () => {
      sfx.playClick();
      try { localStorage.setItem('steam_server_filter', serverFilterGame.value); } catch(e){}
      renderServers(serverFilterGame.value, serverSearchInput ? serverSearchInput.value : '');
    });
  }
  if (serverSearchInput) {
    serverSearchInput.addEventListener('input', () => {
      try { localStorage.setItem('steam_server_search', serverSearchInput.value); } catch(e){}
      renderServers(serverFilterGame ? serverFilterGame.value : 'all', serverSearchInput.value);
    });
  }

  const refreshServersBtn = document.getElementById('refresh-servers-btn');
  if (refreshServersBtn) {
    refreshServersBtn.addEventListener('click', () => {
      sfx.playClick();
      fetchLiveServers(true);
    });
  }

  const btnServerConnect = document.getElementById('btn-server-connect');
  if (btnServerConnect) {
    btnServerConnect.addEventListener('click', () => {
      const selectedRow = document.querySelector('.server-row.selected');
      const name = selectedRow ? selectedRow.getAttribute('data-name') : 'TAZIK29 Server';
      const ip = selectedRow ? selectedRow.getAttribute('data-ip') : '';
      const srvObj = SERVERS_DATA.find(s => s.name === name);
      connectToServer(name, ip, srvObj ? srvObj.connectType : 'ip');
    });
  }

  const btnServerInfo = document.getElementById('btn-server-info');
  if (btnServerInfo) {
    btnServerInfo.addEventListener('click', () => {
      sfx.playClick();
      const selectedRow = document.querySelector('.server-row.selected');
      const name = selectedRow ? selectedRow.getAttribute('data-name') : 'TAZIK29 Server';
      const srvObj = SERVERS_DATA.find(s => s.name === name);
      if (srvObj) {
        alert(`ИНФОРМАЦИЯ О СЕРВЕРЕ:\n\nНазвание: ${srvObj.name}\nИгра: ${srvObj.game}\nАдрес: ${srvObj.ip}\nКарта: ${srvObj.map}\nИгроки: ${srvObj.players}\nПинг: ${srvObj.ping} ms\nЗащита VAC: ${srvObj.sec ? 'Включена' : 'Нет'}`);
      } else {
        alert(`Сервер: ${name}`);
      }
    });
  }

  const addFavoriteServerBtn = document.getElementById('add-favorite-server-btn');
  if (addFavoriteServerBtn) {
    addFavoriteServerBtn.addEventListener('click', () => {
      sfx.playClick();
      const newIp = prompt('Введите IP-адрес или домен сервера для добавления в избранное:', '46.174.52.201:27016');
      if (newIp && newIp.trim()) {
        showSteamToast('Избранное Steam', `Сервер [${newIp.trim()}] успешно добавлен в избранное!`, 'assets/icons/servers.svg');
      }
    });
  }

  const btnOpenFolder = document.getElementById('btn-open-folder');
  if (btnOpenFolder) {
    btnOpenFolder.addEventListener('click', () => {
      sfx.playClick();
      const game = GAMES_DB[currentSelectedGameId] || GAMES_DB['dwd2'];
      showSteamToast('Проводник Steam', `C:\\Program Files\\Steam\\steamapps\\common\\${game.title}\\`, 'assets/icons/folder.svg');
    });
  }

  const btnCheckIntegrity = document.getElementById('btn-check-integrity');
  if (btnCheckIntegrity) {
    btnCheckIntegrity.addEventListener('click', () => {
      sfx.playClick();
      const game = GAMES_DB[currentSelectedGameId] || GAMES_DB['dwd2'];
      showSteamToast('Проверка кэша', `Проверка файлов ${game.title}...`, 'assets/icons/refresh.svg');
      setTimeout(() => {
        sfx.playMessageChime();
        showSteamToast('Проверка кэша', `Все файлы ${game.title} успешно подтверждены (100% OK)`, 'assets/icons/vac_shield.svg');
      }, 1000);
    });
  }

  const btnCopySteamId = document.getElementById('btn-copy-steamid');
  if (btnCopySteamId) {
    btnCopySteamId.addEventListener('click', () => {
      copyText('STEAM_0:1:29292929', 'Steam ID скопирован: STEAM_0:1:29292929');
    });
  }

  // 11. Menu bar items triggers
  initMenuBarActions();

  // 12. Context Menu & Properties Modal
  initContextMenu();
  initPropertiesModal();
  initAboutSteamModal();

  // 13. Keyboard Navigation
  initKeyboardNavigation();

  // 14. Server table interactive sorting & sub-tabs
  initServerSortingAndSubTabs();

  // 15. Developer Console (Source Engine ~)
  initDeveloperConsole();

  // 16. In-Game Steam Overlay (Shift+Tab)
  initSteamOverlay();

  // 17. Steam Settings Dialog
  initSettingsDialog();

  // 18. Library Views Switcher (Details / List / Small)
  initLibraryViews();

  // 19. Master Server Live Jitter Simulation
  initLiveServerJitter();

  // 20. Steam Download Manager & Network Graph
  initDownloadManager();

  // 21. Win32 System Tray & Window Minimize/Restore
  initSystemTrayAndWindowControls();

  // 22. Screenshot Capture System (F12 & Camera Snapshot)
  initScreenshotCapture();

  // Audio start on first click
  window.addEventListener('click', () => sfx.init(), { once: true });
});

// ============================================================================
// 12. CONTEXT MENU & PROPERTIES MODAL CONTROLLERS
// ============================================================================
let contextMenuTargetGameId = 'dwd2';

function initContextMenu() {
  const contextMenu = document.getElementById('game-context-menu');
  const gameItems = document.querySelectorAll('.game-item');
  if (!contextMenu) return;

  gameItems.forEach(item => {
    item.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      sfx.playClick();
      const gameId = item.getAttribute('data-game-id');
      contextMenuTargetGameId = gameId;
      selectGame(gameId, true);

      // Position context menu safely within viewport
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const menuWidth = 195;
      const menuHeight = 160;

      const x = (mouseX + menuWidth > window.innerWidth) ? (window.innerWidth - menuWidth - 10) : mouseX;
      const y = (mouseY + menuHeight > window.innerHeight) ? (window.innerHeight - menuHeight - 10) : mouseY;

      contextMenu.style.left = `${x}px`;
      contextMenu.style.top = `${y}px`;
      contextMenu.style.display = 'block';
    });
  });

  // Hide context menu on click elsewhere or escape
  window.addEventListener('click', () => {
    if (contextMenu.style.display !== 'none') {
      contextMenu.style.display = 'none';
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contextMenu.style.display !== 'none') {
      contextMenu.style.display = 'none';
    }
  });

  // Context Menu items
  const ctxLaunch = document.getElementById('ctx-launch');
  if (ctxLaunch) {
    ctxLaunch.addEventListener('click', () => {
      contextMenu.style.display = 'none';
      launchGameModal();
    });
  }

  const ctxOpenFolder = document.getElementById('ctx-open-folder');
  if (ctxOpenFolder) {
    ctxOpenFolder.addEventListener('click', () => {
      contextMenu.style.display = 'none';
      const game = GAMES_DB[contextMenuTargetGameId] || GAMES_DB['dwd2'];
      sfx.playClick();
      showSteamToast('Проводник Steam', `C:\\Program Files\\Steam\\steamapps\\common\\${game.title}\\`, 'assets/icons/folder.svg');
    });
  }

  const ctxCheckIntegrity = document.getElementById('ctx-check-integrity');
  if (ctxCheckIntegrity) {
    ctxCheckIntegrity.addEventListener('click', () => {
      contextMenu.style.display = 'none';
      const game = GAMES_DB[contextMenuTargetGameId] || GAMES_DB['dwd2'];
      sfx.playClick();
      showSteamToast('Проверка кэша', `Проверка файлов ${game.title}...`, 'assets/icons/refresh.svg');
      setTimeout(() => {
        sfx.playMessageChime();
        showSteamToast('Проверка кэша', `Все файлы ${game.title} успешно подтверждены (100% OK)`, 'assets/icons/vac_shield.svg');
      }, 1000);
    });
  }

  const ctxCreateShortcut = document.getElementById('ctx-create-shortcut');
  if (ctxCreateShortcut) {
    ctxCreateShortcut.addEventListener('click', () => {
      contextMenu.style.display = 'none';
      const game = GAMES_DB[contextMenuTargetGameId] || GAMES_DB['dwd2'];
      sfx.playMessageChime();
      showSteamToast('Рабочий стол', `Ярлык для «${game.title}» создан: steam://rungameid/${game.appid}`, 'assets/icons/steam_valve.svg');
    });
  }

  const ctxProperties = document.getElementById('ctx-properties');
  if (ctxProperties) {
    ctxProperties.addEventListener('click', () => {
      contextMenu.style.display = 'none';
      openPropertiesModal(contextMenuTargetGameId);
    });
  }
}

function openPropertiesModal(gameId) {
  const modal = document.getElementById('properties-modal');
  const game = GAMES_DB[gameId] || GAMES_DB['dwd2'];
  if (!modal || !game) return;

  sfx.playClick();

  // Populate data
  document.getElementById('prop-window-title').textContent = `Свойства - ${game.title}`;
  document.getElementById('prop-game-title').textContent = game.title;
  document.getElementById('prop-game-engine').textContent = game.engine;
  document.getElementById('prop-game-icon').src = game.iconImg;
  document.getElementById('prop-game-dev').textContent = game.dev;
  document.getElementById('prop-game-pub').textContent = game.pub;
  document.getElementById('prop-game-appid').textContent = game.appid;

  const sizes = {
    dwd2: '4,520 MB',
    hl2: '3,890 MB',
    cs16: '480 MB',
    hl2dm: '1,240 MB',
    synergy: '2,900 MB',
    tfc: '340 MB',
    gmod: '5,120 MB'
  };
  const sizeEl = document.getElementById('prop-game-size');
  if (sizeEl) sizeEl.textContent = sizes[gameId] || '3,400 MB';

  // Switch to general tab
  switchPropTab('general');

  modal.style.display = 'flex';
}

function switchPropTab(tabName) {
  const tabs = document.querySelectorAll('.prop-tab');
  const panes = document.querySelectorAll('.prop-pane');

  tabs.forEach(t => {
    if (t.getAttribute('data-prop-tab') === tabName) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });

  panes.forEach(p => {
    if (p.id === `prop-pane-${tabName}`) {
      p.style.display = 'block';
    } else {
      p.style.display = 'none';
    }
  });
}

function initPropertiesModal() {
  const modal = document.getElementById('properties-modal');
  const closeBtn = document.getElementById('properties-modal-close');
  const okBtn = document.getElementById('properties-modal-ok');
  if (!modal) return;

  document.querySelectorAll('.prop-tab').forEach(t => {
    t.addEventListener('click', () => {
      sfx.playClick();
      switchPropTab(t.getAttribute('data-prop-tab'));
    });
  });

  const closeModal = () => {
    sfx.playClick();
    modal.style.display = 'none';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (okBtn) okBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  const launchOptsBtn = document.getElementById('prop-launch-options-btn');
  if (launchOptsBtn) {
    launchOptsBtn.addEventListener('click', () => {
      sfx.playClick();
      const currentVal = localStorage.getItem('steam_launch_opts_' + currentSelectedGameId) || '-novid -console';
      const newVal = prompt('Параметры запуска (для продвинутых пользователей):', currentVal);
      if (newVal !== null) {
        try { localStorage.setItem('steam_launch_opts_' + currentSelectedGameId, newVal); } catch (e) {}
        showSteamToast('Параметры запуска', `Параметры сохранены: [${newVal}]`, 'assets/icons/gear.svg');
      }
    });
  }

  const propOpenFolderBtn = document.getElementById('prop-open-folder-btn');
  if (propOpenFolderBtn) {
    propOpenFolderBtn.addEventListener('click', () => {
      const game = GAMES_DB[currentSelectedGameId] || GAMES_DB['dwd2'];
      sfx.playClick();
      showSteamToast('Проводник Steam', `C:\\Program Files\\Steam\\steamapps\\common\\${game.title}\\`, 'assets/icons/folder.svg');
    });
  }

  const propVerifyBtn = document.getElementById('prop-verify-btn');
  if (propVerifyBtn) {
    propVerifyBtn.addEventListener('click', () => {
      const game = GAMES_DB[currentSelectedGameId] || GAMES_DB['dwd2'];
      sfx.playClick();
      showSteamToast('Проверка кэша', `Проверка файлов ${game.title}...`, 'assets/icons/refresh.svg');
      setTimeout(() => {
        sfx.playMessageChime();
        showSteamToast('Проверка кэша', `Все файлы ${game.title} успешно подтверждены (100% OK)`, 'assets/icons/vac_shield.svg');
      }, 1000);
    });
  }

  const propBackupBtn = document.getElementById('prop-backup-btn');
  if (propBackupBtn) {
    propBackupBtn.addEventListener('click', () => {
      const game = GAMES_DB[currentSelectedGameId] || GAMES_DB['dwd2'];
      sfx.playClick();
      showSteamToast('Резервное копирование', `Файлы ${game.title} архивированы в C:\\SteamBackups\\`, 'assets/icons/save.svg');
    });
  }
}

function initAboutSteamModal() {
  const modal = document.getElementById('about-steam-modal');
  const closeBtn = document.getElementById('about-steam-close');
  const okBtn = document.getElementById('about-steam-ok');
  if (!modal) return;

  const close = () => {
    sfx.playClick();
    modal.style.display = 'none';
  };

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (okBtn) okBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
}

function openAboutSteamModal() {
  const modal = document.getElementById('about-steam-modal');
  if (modal) {
    sfx.playClick();
    modal.style.display = 'flex';
  }
}

function initKeyboardNavigation() {
  const gameIds = ['dwd2', 'hl2', 'cs16', 'hl2dm', 'synergy', 'tfc', 'gmod'];
  window.addEventListener('keydown', (e) => {
    if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
      return;
    }
    const modals = document.querySelectorAll('.steam-modal-backdrop');
    let anyModalOpen = false;
    modals.forEach(m => {
      if (m.style.display === 'flex') anyModalOpen = true;
    });
    if (anyModalOpen) return;

    const currentTab = document.querySelector('.steam-tab.active');
    if (!currentTab || currentTab.getAttribute('data-tab') !== 'games') return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const curIdx = gameIds.indexOf(currentSelectedGameId);
      const nextIdx = (curIdx + 1) % gameIds.length;
      selectGame(gameIds[nextIdx], true);
      sfx.playClick();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const curIdx = gameIds.indexOf(currentSelectedGameId);
      const prevIdx = (curIdx - 1 + gameIds.length) % gameIds.length;
      selectGame(gameIds[prevIdx], true);
      sfx.playClick();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      launchGameModal();
    }
  });
}

function initMenuBarActions() {
  const menuActivateKey = document.getElementById('menu-activate-key');
  const activateWin = document.getElementById('window-activate');
  if (menuActivateKey && activateWin) {
    menuActivateKey.addEventListener('click', () => {
      sfx.playClick();
      activateWin.style.display = 'block';
      activateWin.style.zIndex = getHighestZIndex() + 1;
      try { localStorage.setItem('steam_activate_open', 'true'); } catch (e) {}
    });
  }

  const menuCheckUpdates = document.getElementById('menu-check-updates');
  if (menuCheckUpdates) {
    menuCheckUpdates.addEventListener('click', () => {
      sfx.playClick();
      showSteamToast('Обновление Steam', 'Ваша версия Steam [v1.0.0.29] актуальна', 'assets/icons/refresh.svg');
    });
  }

  const menuSettings = document.getElementById('menu-settings');
  if (menuSettings) {
    menuSettings.addEventListener('click', () => {
      sfx.playClick();
      showSteamToast('Настройки Steam', 'Тема: Valve Olive Green | Звуки: ВКЛ | Синхронизация Cloud: ВКЛ', 'assets/icons/gear.svg');
    });
  }

  const menuExit = document.getElementById('menu-exit');
  if (menuExit) {
    menuExit.addEventListener('click', () => {
      sfx.playClick();
      if (confirm('Вы уверены, что хотите выйти из Steam?')) {
        showSteamToast('Steam', 'Клиент Steam свернут в системный трей', 'assets/icons/steam_valve.svg');
      }
    });
  }

  const menuGoOffline = document.getElementById('menu-go-offline');
  if (menuGoOffline) {
    let isOffline = false;
    menuGoOffline.addEventListener('click', () => {
      sfx.playClick();
      isOffline = !isOffline;
      const statusLabel = document.getElementById('steam-status-label');
      const accountStatus = document.querySelector('.account-status.in-game');
      if (isOffline) {
        menuGoOffline.textContent = 'Перейти в режим «В сети»';
        if (statusLabel) statusLabel.textContent = 'Автономный режим';
        if (accountStatus) accountStatus.textContent = 'Автономный режим';
        showSteamToast('Steam', 'Переход в автономный режим выполнен', 'assets/icons/steam_valve.svg');
      } else {
        menuGoOffline.textContent = 'Перейти в автономный режим';
        if (statusLabel) statusLabel.textContent = 'Готово';
        const game = GAMES_DB[currentSelectedGameId] || GAMES_DB['dwd2'];
        if (accountStatus) accountStatus.textContent = `В игре: ${game.title}`;
        showSteamToast('Steam', 'Соединение с мастер-сервером Valve восстановлено', 'assets/icons/steam_valve.svg');
      }
    });
  }

  const menuFriendsOpen = document.getElementById('menu-friends-open');
  const viewFriends = document.getElementById('view-friends');
  const openFriends = () => {
    sfx.playClick();
    const friendsWin = document.getElementById('window-friends');
    if (friendsWin) {
      friendsWin.style.display = 'block';
      friendsWin.style.zIndex = getHighestZIndex() + 1;
    }
  };
  if (menuFriendsOpen) menuFriendsOpen.addEventListener('click', openFriends);
  if (viewFriends) viewFriends.addEventListener('click', openFriends);

  const menuAddFriend = document.getElementById('menu-add-friend');
  if (menuAddFriend) {
    menuAddFriend.addEventListener('click', () => {
      sfx.playClick();
      const name = prompt('Введите Steam ID или имя пользователя для добавления в друзья:', 'TAZIK29');
      if (name && name.trim()) {
        showSteamToast('Steam Друзья', `Запрос дружбы отправлен пользователю: ${name.trim()}`, 'assets/icons/friends_icon.svg');
      }
    });
  }

  const menuLaunchSelected = document.getElementById('menu-launch-selected');
  if (menuLaunchSelected) {
    menuLaunchSelected.addEventListener('click', () => {
      sfx.playClick();
      launchGameModal();
    });
  }

  const menuBrowseGames = document.getElementById('menu-browse-games');
  if (menuBrowseGames) {
    menuBrowseGames.addEventListener('click', () => {
      sfx.playClick();
      switchTab('store', true);
    });
  }

  const menuBackupFiles = document.getElementById('menu-backup-files');
  if (menuBackupFiles) {
    menuBackupFiles.addEventListener('click', () => {
      sfx.playClick();
      const game = GAMES_DB[currentSelectedGameId] || GAMES_DB['dwd2'];
      showSteamToast('Резервное копирование', `Архивирование файлов ${game.title} в C:\\SteamBackups\\ завершено (100% OK)`, 'assets/icons/save.svg');
    });
  }

  const menuAboutTazik = document.getElementById('menu-about-tazik');
  if (menuAboutTazik) {
    menuAboutTazik.addEventListener('click', () => {
      sfx.playClick();
      switchTab('about-author', true);
    });
  }

  const menuAboutSteam = document.getElementById('menu-about-steam');
  if (menuAboutSteam) {
    menuAboutSteam.addEventListener('click', () => {
      openAboutSteamModal();
    });
  }

  const viewServers = document.getElementById('view-servers');
  if (viewServers) {
    viewServers.addEventListener('click', () => {
      sfx.playClick();
      switchTab('servers-tab', true);
    });
  }
}

function initServerSortingAndSubTabs() {
  const table = document.querySelector('.server-table');
  if (!table) return;

  const ths = table.querySelectorAll('thead th');
  let currentSortCol = null;
  let sortAsc = true;

  ths.forEach((th, colIdx) => {
    th.style.cursor = 'pointer';
    th.setAttribute('title', 'Нажмите для сортировки');
    th.addEventListener('click', () => {
      sfx.playClick();
      if (currentSortCol === colIdx) {
        sortAsc = !sortAsc;
      } else {
        currentSortCol = colIdx;
        sortAsc = true;
      }

      SERVERS_DATA.sort((a, b) => {
        let valA, valB;
        if (colIdx === 0) { // Sec
          valA = a.sec ? 1 : 0;
          valB = b.sec ? 1 : 0;
        } else if (colIdx === 1) { // Name
          valA = a.name.toLowerCase();
          valB = b.name.toLowerCase();
        } else if (colIdx === 2) { // Game
          valA = a.game.toLowerCase();
          valB = b.game.toLowerCase();
        } else if (colIdx === 3) { // IP
          valA = a.ip.toLowerCase();
          valB = b.ip.toLowerCase();
        } else if (colIdx === 4) { // Players
          valA = parseInt(a.players.split('/')[0]) || 0;
          valB = parseInt(b.players.split('/')[0]) || 0;
        } else if (colIdx === 5) { // Map
          valA = a.map.toLowerCase();
          valB = b.map.toLowerCase();
        } else if (colIdx === 6) { // Ping
          valA = a.ping;
          valB = b.ping;
        }
        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });

      const serverFilterGame = document.getElementById('server-filter-game');
      const serverSearchInput = document.getElementById('server-search-input');
      renderServers(serverFilterGame ? serverFilterGame.value : 'all', serverSearchInput ? serverSearchInput.value : '');
    });
  });

  // Server Sub Tabs
  const subTabs = document.querySelectorAll('.server-tabs-sub .sub-tab');
  subTabs.forEach(st => {
    st.addEventListener('click', () => {
      sfx.playClick();
      subTabs.forEach(t => t.classList.remove('active'));
      st.classList.add('active');
      const name = st.textContent.trim();
      if (name.includes('Избранное')) {
        showSteamToast('Серверы', 'Отображение серверов из избранного (все серверы TAZIK29 добавлены в избранное)', 'assets/icons/servers.svg');
      } else if (name.includes('LAN')) {
        showSteamToast('Локальная сеть', 'Сканирование LAN сети... Серверы не обнаружены', 'assets/icons/servers.svg');
      } else if (name.includes('Друзья')) {
        showSteamToast('Друзья в игре', 'TAZIK29 находится на сервере Deal With Destiny 2 (Dev Build)', 'assets/icons/friends_icon.svg');
      } else if (name.includes('История')) {
        showSteamToast('История', 'Показана история недавних подключений', 'assets/icons/servers.svg');
      }
    });
  });
}

// ============================================================================
// 15. DEVELOPER CONSOLE (VALVE SOURCE ENGINE ~)
// ============================================================================
let consoleHistory = [];
let consoleHistoryIdx = -1;

function initDeveloperConsole() {
  const consoleWin = document.getElementById('window-console');
  const consoleTitle = document.getElementById('console-titlebar');
  const consoleClose = document.getElementById('console-close-btn');
  const consoleMin = document.getElementById('console-min-btn');
  const consoleForm = document.getElementById('console-form');
  const consoleInput = document.getElementById('console-input');
  const consoleClear = document.getElementById('console-clear-btn');
  const consoleShortcut = document.getElementById('open-console-shortcut');
  const viewConsole = document.getElementById('view-console');

  if (consoleWin && consoleTitle) makeDraggable(consoleWin, consoleTitle);

  const toggleConsole = () => {
    if (!consoleWin) return;
    const isClosed = consoleWin.style.display === 'none';
    if (isClosed) {
      sfx.playConsoleBeep();
      consoleWin.style.display = 'block';
      consoleWin.style.zIndex = getHighestZIndex() + 1;
      if (consoleInput) {
        setTimeout(() => consoleInput.focus(), 50);
      }
    } else {
      sfx.playClick();
      consoleWin.style.display = 'none';
    }
  };

  if (consoleShortcut) consoleShortcut.addEventListener('click', toggleConsole);
  if (viewConsole) viewConsole.addEventListener('click', toggleConsole);
  if (consoleClose) consoleClose.addEventListener('click', () => { sfx.playClick(); consoleWin.style.display = 'none'; });
  if (consoleMin) consoleMin.addEventListener('click', () => { sfx.playClick(); consoleWin.style.display = 'none'; });
  if (consoleClear) {
    consoleClear.addEventListener('click', () => {
      sfx.playClick();
      const log = document.getElementById('console-log');
      if (log) log.innerHTML = '<div class="con-line prompt-hint">Консоль очищена. Введите "help" для списка команд.</div>';
    });
  }

  // Global ~ key listener
  window.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~' || e.key === 'ё' || e.key === 'Ё') {
      if (document.activeElement === consoleInput) return;
      e.preventDefault();
      toggleConsole();
    }
  });

  // Console input form submit
  if (consoleForm && consoleInput) {
    consoleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawCmd = consoleInput.value.trim();
      if (!rawCmd) return;

      consoleHistory.push(rawCmd);
      consoleHistoryIdx = consoleHistory.length;
      consoleInput.value = '';

      executeConsoleCommand(rawCmd);
    });

    // History navigation with ArrowUp and ArrowDown
    consoleInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (consoleHistory.length > 0 && consoleHistoryIdx > 0) {
          consoleHistoryIdx--;
          consoleInput.value = consoleHistory[consoleHistoryIdx] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (consoleHistoryIdx < consoleHistory.length - 1) {
          consoleHistoryIdx++;
          consoleInput.value = consoleHistory[consoleHistoryIdx] || '';
        } else {
          consoleHistoryIdx = consoleHistory.length;
          consoleInput.value = '';
        }
      }
    });
  }
}

function printToConsole(text, lineClass = 'info') {
  const log = document.getElementById('console-log');
  if (!log) return;
  const line = document.createElement('div');
  line.className = `con-line ${lineClass}`;
  line.textContent = text;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

function executeConsoleCommand(rawCmd) {
  sfx.playConsoleBeep();
  printToConsole(`] ${rawCmd}`, 'cmd');

  const parts = rawCmd.split(' ');
  const cmd = parts[0].toLowerCase();
  const arg1 = parts[1] || '';

  switch (cmd) {
    case 'help':
    case 'commands':
      printToConsole('=== ДОСТУПНЫЕ КОМАНДЫ SOURCE CONSOLE ===', 'highlight');
      printToConsole('status          - Информация о клиенте, карте и соединении', 'info');
      printToConsole('map <name>      - Загрузить карту (dwd2_depot_01, de_dust2, etc.)', 'info');
      printToConsole('connect <ip>    - Подключиться к игровому серверу TAZIK29', 'info');
      printToConsole('ping            - Проверить сетевой отклик master-сервера', 'info');
      printToConsole('version         - Версия Source Engine и Steam Client', 'info');
      printToConsole('sv_cheats 1/0   - Включить режим читов', 'info');
      printToConsole('god             - Режим неуязвимости Гордона / Оскара', 'info');
      printToConsole('noclip          - Режим полета сквозь стены', 'info');
      printToConsole('give <weapon>   - Выдать предмет (weapon_crowbar, item_suit)', 'info');
      printToConsole('volume <0-1>    - Установить громкость звука', 'info');
      printToConsole('tazik / dwd2    - Секретная инфа о моде и авторе TAZIK29', 'highlight');
      printToConsole('secrets / quest - Список тайн Steam 2003 (Квест 10 шагов)', 'highlight');
      printToConsole('secret          - Проверить секретный протокол', 'info');
      printToConsole('open_archive    - Открыть Гранд-Архив (после 10/10)', 'info');
      printToConsole('clear           - Очистить вывод консоли', 'info');
      printToConsole('echo <text>     - Вывести текст в консоль', 'info');
      break;

    case 'status':
      const game = GAMES_DB[currentSelectedGameId] || GAMES_DB['dwd2'];
      printToConsole('hostname: TAZIK29 Source Dedicated Client (Windows 11)', 'init');
      printToConsole(`version : 1.0.0.29/2482 (${game.engine})`, 'init');
      printToConsole(`active_game : ${game.title} (AppID ${game.appid})`, 'highlight');
      printToConsole('map     : dwd2_train_station_01 at: 0 x, 0 y, 0 z', 'init');
      printToConsole('players : 1 humans, 0 bots (32 max)', 'init');
      printToConsole('account : T1NE (STEAM_0:1:13374825)', 'info');
      printToConsole('ping    : 18 ms [Valve Anti-Cheat: Secure]', 'info');
      break;

    case 'version':
      printToConsole('Valve Source Engine build 2482 (Dec 2004 / 2026)', 'init');
      printToConsole('Steam Client v1.0.0.29 (VGUI2 / Win32 Native)', 'init');
      printToConsole('Protocol version 7, Exe build 16:40:00 Oct 04 2026 (4825530)', 'info');
      break;

    case 'map':
      const mapName = arg1 || 'dwd2_depot_01';
      printToConsole(`Loading map "${mapName}"...`, 'highlight');
      printToConsole('Precached 240 model indices and 115 material shaders.', 'info');
      printToConsole('Spawning player at entity info_player_start (Oscar Willson)...', 'info');
      printToConsole(`Карта "${mapName}" успешно инициализирована!`, 'highlight');
      showSteamToast('Source Console', `Карта [${mapName}] загружена`, 'assets/icons/hammer_sdk.svg');
      break;

    case 'connect':
      if (!arg1) {
        printToConsole('Использование: connect <ip:port> (например: connect 46.174.48.48:27207)', 'error');
        return;
      }
      const targetSrv = SERVERS_DATA.find(s => s.ip.includes(arg1));
      printToConsole(`Connecting to ${arg1}...`, 'highlight');
      printToConsole('Sending connection packet to Steam master server...', 'info');
      printToConsole('Connection accepted! Entering game...', 'info');
      if (targetSrv) {
        connectToServer(targetSrv.name, targetSrv.ip, targetSrv.connectType);
      } else {
        showSteamToast('Подключение', `Подключение к ${arg1}...`, 'assets/icons/servers_icon.svg');
      }
      break;

    case 'ping':
      printToConsole('Pinging Valve Master Server (ms.valvesoftware.com)... 14ms', 'info');
      printToConsole('Pinging TAZIK29 L4D2 Server (46.174.48.48:27207)... 16ms', 'info');
      printToConsole('Pinging TAZIK29 Garry\'s Mod [puk] (62.122.213.29)... 19ms', 'info');
      printToConsole('Пакетных потерь: 0.0% (Rate: 30000, Cmdrate: 66, Cl_updaterate: 66)', 'highlight');
      break;

    case 'volume':
      const volNum = parseFloat(arg1);
      if (!isNaN(volNum) && volNum >= 0 && volNum <= 1) {
        printToConsole(`Master sound volume set to ${volNum}`, 'info');
        showSteamToast('Звук', `Громкость установлена: ${Math.round(volNum * 100)}%`, 'assets/icons/sound_on.svg');
      } else {
        printToConsole('Использование: volume <0.0 - 1.0> (текущее: 1.0)', 'error');
      }
      break;

    case 'sv_cheats':
      if (arg1 === '1') {
        printToConsole('Server cvar "sv_cheats" changed to 1 (Читы включены!)', 'highlight');
      } else {
        printToConsole('Server cvar "sv_cheats" changed to 0 (Читы отключены)', 'info');
      }
      break;

    case 'god':
      printToConsole('godmode ON - Оскар Уилсон и Гордон Фримен получили бессмертие!', 'highlight');
      showSteamToast('Source Cheats', 'Режим Бога активирован', 'assets/icons/star.svg');
      break;

    case 'noclip':
      printToConsole('noclip ON - Свободное перемещение сквозь браши карты включено.', 'highlight');
      showSteamToast('Source Cheats', 'Noclip активирован', 'assets/icons/star.svg');
      break;

    case 'give':
      const weapon = arg1 || 'weapon_crowbar';
      printToConsole(`Gave player entity: ${weapon}`, 'highlight');
      showSteamToast('Инвентарь', `Получен предмет: ${weapon}`, 'assets/icons/crowbar.svg');
      break;

    case 'tazik':
    case 'dwd2':
      printToConsole('=== DEAL WITH DESTINY 2 // TAZIK29 ===', 'highlight');
      printToConsole('Разработчик: Дмитрий (TAZIK29), 35 лет, работает на заводе.', 'info');
      printToConsole('Движок: Valve Source Engine. Единственный мод в разработке: DWD2.', 'info');
      printToConsole('Сюжет: Оскар Уилсон спасается на товарном поезде, попадает в крушение.', 'info');
      printToConsole('Стримы: с понедельника по четверг на YouTube @tazik29!', 'info');
      printToConsole('Издатель: KU.NI (store.steampowered.com/publisher/kuni/)', 'info');
      break;

    case 'tipradd':
      printToConsole('================================================================', 'highlight');
      printToConsole('[*] [ПАСХАЛКА: TIPRADD] [*]', 'highlight');
      printToConsole('Пользователь: TIPRADD', 'info');
      printToConsole('Роль: Преданный зритель стримов TAZIK29, автор мемов и лучших нарезок', 'init');
      printToConsole('Заметка: Смотрит стримы, делает смешные нарезки и мемы для комьюнити.', 'info');
      printToConsole('«Привет от T1NE! Спасибо за отличные нарезки и ламповую атмосферу.»', 'highlight');
      printToConsole('================================================================', 'highlight');
      sfx.playLaunchSound();
      break;

    case 'secret':
    case 'clue':
    case 'dwd2_secret':
      sfx.playClick();
      unlockSecret('console');
      printToConsole('================================================================', 'highlight');
      printToConsole('[*] [КОНСОЛЬНЫЙ ПРОТОКОЛ РАСШИФРОВАН] [*]', 'highlight');
      printToConsole('Секретная команда принята. Шаг 2/10 успешно зачтен!', 'init');
      printToConsole('================================================================', 'highlight');
      break;

    case 'secrets':
    case 'quest':
      printToConsole('================================================================', 'highlight');
      const curUnlocked = getUnlockedSecrets();
      printToConsole(`[*] [РАССЛЕДОВАНИЕ STEAM 2003] Найдено: ${curUnlocked.length} из 10 тайн`, 'highlight');
      SECRETS_CONFIG.forEach((s, i) => {
        const done = curUnlocked.includes(s.id);
        printToConsole(`${i + 1}. [${done ? 'РАЗГАДАНО' : 'НЕ НАЙДЕНО'}] ${s.title} — ${done ? 'Выполнено!' : s.hint}`, done ? 'init' : 'info');
      });
      printToConsole('Для открытия окна журнала введите "quest_window" или откройте Справка -> Тайны Steam.', 'info');
      if (curUnlocked.length === 10) {
        printToConsole('Все 10 шагов пройдены! Введите "open_archive" для вызова Гранд-Архива.', 'highlight');
      }
      printToConsole('================================================================', 'highlight');
      break;

    case 'open_archive':
    case 'archive':
    case 'master':
      if (getUnlockedSecrets().length >= 10) {
        openMasterSecretWindow();
      } else {
        printToConsole(`Архив закрыт. Найдено только ${getUnlockedSecrets().length} из 10 тайн. Введите "secrets" для подсказок.`, 'error');
      }
      break;

    case 'quest_window':
      openQuestTrackerWindow();
      break;

    case 'reset_secrets':
      resetSecretsProgress();
      break;

    case 'clear':
    case 'cls':
      const logEl = document.getElementById('console-log');
      if (logEl) logEl.innerHTML = '';
      break;

    case 'echo':
      printToConsole(parts.slice(1).join(' '), 'info');
      break;

    default:
      printToConsole(`Неизвестная команда "${cmd}". Введите "help" для списка команд.`, 'error');
      break;
  }
}

// ============================================================================
// 16. STEAM IN-GAME OVERLAY (SHIFT + TAB)
// ============================================================================
let overlayInterval = null;
let sessionSeconds = 5040; // ~1h 24m initially

function initSteamOverlay() {
  const overlay = document.getElementById('steam-overlay-modal');
  const closeBtn = document.getElementById('overlay-close-btn');
  const shortcutBtn = document.getElementById('open-overlay-shortcut');
  const viewOverlay = document.getElementById('view-overlay');

  if (!overlay) return;

  const toggleOverlay = () => {
    const isClosed = overlay.style.display === 'none';
    if (isClosed) {
      openOverlay();
    } else {
      closeOverlay();
    }
  };

  if (shortcutBtn) shortcutBtn.addEventListener('click', toggleOverlay);
  if (viewOverlay) viewOverlay.addEventListener('click', toggleOverlay);
  if (closeBtn) closeBtn.addEventListener('click', closeOverlay);

  // Overlay Shift+Tab hotkey
  window.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key === 'Tab') {
      e.preventDefault();
      toggleOverlay();
    } else if (e.key === 'Escape' && overlay.style.display !== 'none') {
      closeOverlay();
    }
  });

  // Overlay quick links
  const linkServers = document.getElementById('overlay-link-servers');
  if (linkServers) {
    linkServers.addEventListener('click', (e) => {
      e.preventDefault();
      closeOverlay();
      switchTab('servers-tab', true);
    });
  }

  const linkDwd2 = document.getElementById('overlay-link-dwd2');
  if (linkDwd2) {
    linkDwd2.addEventListener('click', (e) => {
      e.preventDefault();
      closeOverlay();
      selectGame('dwd2', true);
    });
  }

  const chatTazik = document.getElementById('overlay-chat-tazik');
  if (chatTazik) {
    chatTazik.addEventListener('click', () => {
      closeOverlay();
      openChatWith('TAZIK29');
    });
  }

  const chatKuni = document.getElementById('overlay-chat-kuni');
  if (chatKuni) {
    chatKuni.addEventListener('click', () => {
      closeOverlay();
      openChatWith('KUNI');
    });
  }
}

function openOverlay() {
  const overlay = document.getElementById('steam-overlay-modal');
  if (!overlay) return;

  sfx.playOverlaySound();
  updateOverlayContent();
  overlay.style.display = 'flex';

  clearInterval(overlayInterval);
  overlayInterval = setInterval(() => {
    sessionSeconds++;
    updateOverlayTime();
  }, 1000);
}

function closeOverlay() {
  const overlay = document.getElementById('steam-overlay-modal');
  if (!overlay) return;
  sfx.playClick();
  clearInterval(overlayInterval);
  overlay.style.display = 'none';
}

function updateOverlayTime() {
  const clockEl = document.getElementById('overlay-clock');
  const dateEl = document.getElementById('overlay-date');
  const sessionEl = document.getElementById('overlay-session-time');

  const now = new Date();
  const hrs = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  if (clockEl) clockEl.textContent = `${hrs}:${mins}`;

  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  if (dateEl) dateEl.textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;

  const sHrs = Math.floor(sessionSeconds / 3600);
  const sMins = Math.floor((sessionSeconds % 3600) / 60);
  if (sessionEl) sessionEl.textContent = `${sHrs} ч. ${sMins} мин.`;
}

function updateOverlayContent() {
  const game = GAMES_DB[currentSelectedGameId] || GAMES_DB['dwd2'];
  const titleEl = document.getElementById('overlay-game-title');
  if (titleEl) titleEl.textContent = game.title;

  updateOverlayTime();

  // Populate overlay achievements summary
  const achieveBox = document.getElementById('overlay-achieve-summary');
  if (achieveBox) {
    achieveBox.innerHTML = '';
    const achs = (game.achievements || []).slice(0, 3);
    achs.forEach(ach => {
      const card = document.createElement('div');
      card.className = 'overlay-achieve-mini-card';
      card.innerHTML = `
        <img src="${ach.icon}" alt="Achieve" class="overlay-achieve-ico">
        <div class="overlay-achieve-meta">
          <strong>${escapeHtml(ach.title)}</strong>
          <span>${escapeHtml(ach.desc)}</span>
        </div>
      `;
      achieveBox.appendChild(card);
    });
  }

  // Populate overlay screenshots
  const strip = document.getElementById('overlay-screenshots-strip');
  if (strip) {
    strip.innerHTML = '';
    const shots = (game.screenshots || []).slice(0, 4);
    shots.forEach((shot, idx) => {
      const img = document.createElement('img');
      img.src = shot.src;
      img.alt = shot.caption || 'Screenshot';
      img.className = 'overlay-screen-thumb';
      img.addEventListener('click', () => {
        closeOverlay();
        openScreenshotViewer(game.id, idx);
      });
      strip.appendChild(img);
    });
  }
}

// ============================================================================
// 17. STEAM SETTINGS DIALOG (VGUI2)
// ============================================================================
function initSettingsDialog() {
  const modal = document.getElementById('settings-modal');
  const openMenuBtn = document.getElementById('menu-settings');
  const closeBtn = document.getElementById('settings-close-btn');
  const cancelBtn = document.getElementById('settings-cancel-btn');
  const okBtn = document.getElementById('settings-ok-btn');
  const testMicBtn = document.getElementById('btn-test-mic');
  const micBar = document.getElementById('mic-meter-bar');

  if (!modal) return;

  const openSettings = () => {
    sfx.playClick();
    switchSettingsTab('account');
    modal.style.display = 'flex';
  };

  const closeSettings = () => {
    sfx.playClick();
    modal.style.display = 'none';
  };

  if (openMenuBtn) openMenuBtn.addEventListener('click', openSettings);
  if (closeBtn) closeBtn.addEventListener('click', closeSettings);
  if (cancelBtn) cancelBtn.addEventListener('click', closeSettings);
  if (okBtn) {
    okBtn.addEventListener('click', () => {
      sfx.playMessageChime();
      showSteamToast('Настройки Steam', 'Настройки успешно сохранены в реестре', 'assets/icons/gear.svg');
      modal.style.display = 'none';
    });
  }

  // Settings Tabs
  const setTabs = document.querySelectorAll('#settings-tabs .prop-tab');
  setTabs.forEach(t => {
    t.addEventListener('click', () => {
      sfx.playClick();
      switchSettingsTab(t.getAttribute('data-set-tab'));
    });
  });

  // Mic test simulation
  let micInterval = null;
  if (testMicBtn && micBar) {
    let isTesting = false;
    testMicBtn.addEventListener('click', () => {
      sfx.playClick();
      isTesting = !isTesting;
      if (isTesting) {
        testMicBtn.textContent = 'Остановить тест';
        micInterval = setInterval(() => {
          const val = Math.floor(Math.random() * 85) + 15;
          micBar.style.width = `${val}%`;
        }, 80);
      } else {
        testMicBtn.textContent = 'Тест микрофона';
        clearInterval(micInterval);
        micBar.style.width = '0%';
      }
    });
  }

  const clearCacheBtn = document.getElementById('btn-clear-download-cache');
  if (clearCacheBtn) {
    clearCacheBtn.addEventListener('click', () => {
      sfx.playClick();
      showSteamToast('Загрузки', 'Кэш загрузок Steam успешно очищен (0 KB)', 'assets/icons/refresh.svg');
    });
  }

  // Steam ID Card Modal & Canvas Generator
  const steamIdModal = document.getElementById('steam-id-modal');
  const openSteamIdBtn = document.getElementById('btn-open-steam-id');
  const closeSteamIdBtn = document.getElementById('steam-id-close-btn');
  const closeSteamIdModalBtn = document.getElementById('btn-close-steam-id-modal');
  const downloadSteamIdBtn = document.getElementById('btn-download-steam-id');

  if (openSteamIdBtn && steamIdModal) {
    openSteamIdBtn.addEventListener('click', () => {
      sfx.playClick();
      steamIdModal.style.display = 'flex';
      renderSteamIdCard();
    });
  }

  const closeSteamIdModal = () => {
    sfx.playClick();
    if (steamIdModal) steamIdModal.style.display = 'none';
  };
  if (closeSteamIdBtn) closeSteamIdBtn.addEventListener('click', closeSteamIdModal);
  if (closeSteamIdModalBtn) closeSteamIdModalBtn.addEventListener('click', closeSteamIdModal);

  if (downloadSteamIdBtn) {
    downloadSteamIdBtn.addEventListener('click', () => {
      const canvas = document.getElementById('steam-id-canvas');
      if (!canvas) return;
      sfx.playClick();
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'steam_id_card_t1ne.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      sfx.playMessageChime();
    });
  }

  // Backup Export / Import Handlers
  const exportBtn = document.getElementById('btn-export-save');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportSaveData);
  }

  const importBtn = document.getElementById('btn-import-save');
  const importInput = document.getElementById('input-import-save-file');
  if (importBtn && importInput) {
    importBtn.addEventListener('click', () => {
      sfx.playClick();
      importInput.click();
    });
    importInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        importSaveData(e.target.files[0]);
      }
    });
  }
}

function renderSteamIdCard() {
  const canvas = document.getElementById('steam-id-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, 240);
  grad.addColorStop(0, '#3e4a38');
  grad.addColorStop(1, '#272f23');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 460, 240);

  // Outer border & bevel
  ctx.strokeStyle = '#6d7f62';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, 458, 238);
  ctx.strokeStyle = '#1b2218';
  ctx.lineWidth = 1;
  ctx.strokeRect(4, 4, 452, 232);

  // Header band
  ctx.fillStyle = '#22291e';
  ctx.fillRect(5, 5, 450, 36);
  ctx.strokeStyle = '#43513b';
  ctx.strokeRect(5, 5, 450, 36);

  // Valve tag
  ctx.fillStyle = '#c0392b';
  ctx.fillRect(14, 11, 46, 22);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px Tahoma, Arial, sans-serif';
  ctx.fillText('VALVE', 20, 26);

  ctx.fillStyle = '#d5dfd1';
  ctx.font = 'bold 12px Tahoma, Arial, sans-serif';
  ctx.fillText('STEAM WIN32 CLIENT // COMMUNITY PASS', 68, 27);

  // Avatar Box
  ctx.fillStyle = '#1b2218';
  ctx.fillRect(16, 52, 70, 70);
  ctx.strokeStyle = '#5a6951';
  ctx.strokeRect(16, 52, 70, 70);

  // Draw avatar icon or retro silhouette
  ctx.fillStyle = '#7a8f72';
  ctx.beginPath();
  ctx.arc(51, 75, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(51, 110, 22, Math.PI, 0);
  ctx.fill();

  // User Details
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px Tahoma, Arial, sans-serif';
  ctx.fillText('T1NE', 98, 68);

  ctx.fillStyle = '#9cb195';
  ctx.font = '11px Tahoma, Arial, sans-serif';
  ctx.fillText('STEAM ID:', 98, 86);
  ctx.fillStyle = '#dce7d8';
  ctx.font = 'bold 11px "Courier New", monospace';
  ctx.fillText('STEAM_0:1:13374825', 160, 86);

  ctx.fillStyle = '#9cb195';
  ctx.font = '11px Tahoma, Arial, sans-serif';
  ctx.fillText('СТАТУС:', 98, 102);
  ctx.fillStyle = '#55ff55';
  ctx.font = 'bold 11px Tahoma, Arial, sans-serif';
  ctx.fillText('В СЕТИ // WON AUTH VERIFIED', 160, 102);

  ctx.fillStyle = '#9cb195';
  ctx.font = '11px Tahoma, Arial, sans-serif';
  ctx.fillText('ПРОЕКТ:', 98, 118);
  ctx.fillStyle = '#dce7d8';
  ctx.font = 'bold 11px Tahoma, Arial, sans-serif';
  ctx.fillText('Deal With Destiny 2 (2031)', 160, 118);

  // Divider line
  ctx.strokeStyle = '#3d4935';
  ctx.beginPath();
  ctx.moveTo(16, 134);
  ctx.lineTo(444, 134);
  ctx.stroke();

  // Secrets & Quests Status
  const unlocked = JSON.parse(localStorage.getItem('steam_unlocked_secrets') || '[]');
  const count = unlocked.length;
  ctx.fillStyle = '#9cb195';
  ctx.font = '11px Tahoma, Arial, sans-serif';
  ctx.fillText('СЕКРЕТНЫЙ АРХИВ:', 16, 154);
  ctx.fillStyle = count === 10 ? '#ffd700' : '#dce7d8';
  ctx.font = 'bold 11px Tahoma, Arial, sans-serif';
  ctx.fillText(`${count} / 10 СЕКРЕТОВ РАСШИФРОВАНО`, 130, 154);

  // Barcode area
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(16, 168, 220, 46);
  ctx.fillStyle = '#000000';
  let barX = 22;
  const barcodePattern = [2, 1, 3, 1, 2, 4, 1, 2, 3, 2, 1, 1, 4, 2, 1, 3, 2, 1, 2, 3, 1, 4, 1, 2, 3, 1, 2, 1, 3, 2, 1, 4, 2, 1, 2];
  for (let i = 0; i < barcodePattern.length && barX < 228; i++) {
    const w = barcodePattern[i];
    ctx.fillRect(barX, 172, w, 32);
    barX += w + ((i % 2 === 0) ? 2 : 3);
  }
  ctx.font = '9px "Courier New", monospace';
  ctx.fillStyle = '#000000';
  ctx.fillText('*WON-4825-T1NE-2003*', 52, 210);

  // Stamp Box on Right
  ctx.strokeStyle = '#c5a059';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(250, 168, 194, 46);
  ctx.fillStyle = '#c5a059';
  ctx.font = 'bold 10px Tahoma, Arial, sans-serif';
  ctx.fillText('ОФИЦИАЛЬНО ЗАВЕРЕНО', 280, 185);
  ctx.font = '9px Tahoma, Arial, sans-serif';
  ctx.fillText('VALVE CORP & TAZIK29 DEV', 280, 199);
  ctx.fillText('GITHUB PAGES DEPLOYMENT READY', 260, 210);
}

function exportSaveData() {
  sfx.playClick();
  const data = {
    app: 'Steam 2003 Win32 Client',
    version: '2003.1.0',
    exportDate: new Date().toISOString(),
    account: 'T1NE',
    activeTab: localStorage.getItem('steam_active_tab') || 'games',
    selectedGame: localStorage.getItem('steam_selected_game') || 'dwd2',
    unlockedSecrets: JSON.parse(localStorage.getItem('steam_unlocked_secrets') || '[]'),
    masterUnlocked: localStorage.getItem('steam_master_unlocked') === 'true',
    chatHistory: {
      TAZIK29: localStorage.getItem('steam_chat_history_TAZIK29'),
      TIPRADD: localStorage.getItem('steam_chat_history_TIPRADD'),
      KUNI: localStorage.getItem('steam_chat_history_KUNI')
    },
    soundEnabled: localStorage.getItem('steam_sound_enabled'),
    crtScanlines: localStorage.getItem('steam_crt_scanlines')
  };

  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `steam_t1ne_save_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  sfx.playMessageChime();
  alert('[РЕЗЕРВНОЕ КОПИРОВАНИЕ STEAM]\n\nФайл сохранения успешно скачан:\nsteam_t1ne_save.json\n\nВсе 10 секретов, квесты и история сообщений сохранены!');
}

function importSaveData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data || typeof data !== 'object') throw new Error('Некорректный формат JSON');

      if (data.activeTab) localStorage.setItem('steam_active_tab', data.activeTab);
      if (data.selectedGame) localStorage.setItem('steam_selected_game', data.selectedGame);
      if (Array.isArray(data.unlockedSecrets)) {
        localStorage.setItem('steam_unlocked_secrets', JSON.stringify(data.unlockedSecrets));
      }
      if (typeof data.masterUnlocked === 'boolean') {
        localStorage.setItem('steam_master_unlocked', data.masterUnlocked ? 'true' : 'false');
      }
      if (data.chatHistory) {
        if (data.chatHistory.TAZIK29) localStorage.setItem('steam_chat_history_TAZIK29', data.chatHistory.TAZIK29);
        if (data.chatHistory.TIPRADD) localStorage.setItem('steam_chat_history_TIPRADD', data.chatHistory.TIPRADD);
        if (data.chatHistory.KUNI) localStorage.setItem('steam_chat_history_KUNI', data.chatHistory.KUNI);
      }
      if (data.soundEnabled !== undefined) localStorage.setItem('steam_sound_enabled', data.soundEnabled);
      if (data.crtScanlines !== undefined) localStorage.setItem('steam_crt_scanlines', data.crtScanlines);

      sfx.playLaunchSound();
      alert('[ИМПОРТ ЗАВЕРШЕН]\n\nПрогресс T1NE успешно восстановлен!\nСтраница будет перезагружена для применения данных.');
      window.location.reload();
    } catch (err) {
      alert('[ОШИБКА ИМПОРТА]\n\nНе удалось прочитать файл сохранения: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function switchSettingsTab(tabName) {
  const tabs = document.querySelectorAll('#settings-tabs .prop-tab');
  const panes = document.querySelectorAll('#settings-panes .prop-pane');

  tabs.forEach(t => {
    if (t.getAttribute('data-set-tab') === tabName) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });

  panes.forEach(p => {
    if (p.id === `set-pane-${tabName}`) {
      p.style.display = 'block';
    } else {
      p.style.display = 'none';
    }
  });
}

// ============================================================================
// 18. LIBRARY VIEWS SWITCHER (DETAILS / SPREADSHEET LIST / COMPACT)
// ============================================================================
function initLibraryViews() {
  const viewDetailsBtn = document.getElementById('view-details');
  const viewListBtn = document.getElementById('view-list');
  const viewSmallBtn = document.getElementById('view-small');
  const backToDetailsBtn = document.getElementById('btn-back-to-details');
  const detailPanel = document.getElementById('game-detail-panel');
  const listViewPanel = document.getElementById('game-list-view-panel');
  const gamesSidebar = document.querySelector('.games-sidebar');

  function showDetailsView() {
    sfx.playClick();
    if (detailPanel) detailPanel.style.display = 'block';
    if (listViewPanel) listViewPanel.style.display = 'none';
    if (gamesSidebar) gamesSidebar.style.display = 'flex';
    document.querySelectorAll('[id^="view-"]').forEach(el => el.classList.remove('active-view-mode'));
    if (viewDetailsBtn) viewDetailsBtn.classList.add('active-view-mode');
  }

  function showListView() {
    sfx.playClick();
    if (detailPanel) detailPanel.style.display = 'none';
    if (listViewPanel) listViewPanel.style.display = 'flex';
    if (gamesSidebar) gamesSidebar.style.display = 'flex';
    renderSpreadsheetGames();
    document.querySelectorAll('[id^="view-"]').forEach(el => el.classList.remove('active-view-mode'));
    if (viewListBtn) viewListBtn.classList.add('active-view-mode');
  }

  function showSmallView() {
    sfx.playClick();
    const isSmall = gamesSidebar && gamesSidebar.classList.contains('compact-mode');
    if (isSmall) {
      if (gamesSidebar) gamesSidebar.classList.remove('compact-mode');
      showDetailsView();
    } else {
      if (gamesSidebar) gamesSidebar.classList.add('compact-mode');
      showSteamToast('Вид', 'Включен компактный режим библиотеки', 'assets/icons/gear.svg');
      if (viewSmallBtn) viewSmallBtn.classList.add('active-view-mode');
    }
  }

  if (viewDetailsBtn) viewDetailsBtn.addEventListener('click', showDetailsView);
  if (viewListBtn) viewListBtn.addEventListener('click', showListView);
  if (viewSmallBtn) viewSmallBtn.addEventListener('click', showSmallView);
  if (backToDetailsBtn) backToDetailsBtn.addEventListener('click', showDetailsView);
}

function renderSpreadsheetGames() {
  const tbody = document.getElementById('games-spreadsheet-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  const gameKeys = Object.keys(GAMES_DB);

  gameKeys.forEach(k => {
    const g = GAMES_DB[k];
    const tr = document.createElement('tr');
    if (k === currentSelectedGameId) tr.classList.add('selected');

    tr.innerHTML = `
      <td style="text-align: center;"><img src="${g.iconImg}" alt="ico" class="spreadsheet-ico"></td>
      <td><strong>${escapeHtml(g.title)}</strong></td>
      <td><span class="${g.statusClass ? 'green-text' : ''}">${escapeHtml(g.status)}</span></td>
      <td>${escapeHtml(g.playtime)}</td>
      <td>${escapeHtml(g.engine)}</td>
      <td>${escapeHtml(g.dev)}</td>
      <td>${escapeHtml(g.appid)}</td>
      <td><button class="steam-retro-btn small launch-sp-btn" data-game="${g.id}">Запустить</button></td>
    `;

    tr.addEventListener('click', () => {
      sfx.playClick();
      document.querySelectorAll('#games-spreadsheet-tbody tr').forEach(r => r.classList.remove('selected'));
      tr.classList.add('selected');
      selectGame(g.id, false);
    });

    tr.addEventListener('dblclick', () => {
      selectGame(g.id, false);
      launchGameModal();
    });

    const btn = tr.querySelector('.launch-sp-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectGame(g.id, false);
        launchGameModal();
      });
    }

    tbody.appendChild(tr);
  });
}

// ============================================================================
// 19. MASTER SERVER LIVE JITTER SIMULATION
// ============================================================================
function initLiveServerJitter() {
  setInterval(() => {
    const idx1 = Math.floor(Math.random() * SERVERS_DATA.length);
    const delta1 = Math.floor(Math.random() * 5) - 2;
    SERVERS_DATA[idx1].ping = Math.max(8, SERVERS_DATA[idx1].ping + delta1);

    const serverFilterGame = document.getElementById('server-filter-game');
    const serverSearchInput = document.getElementById('server-search-input');
    const serversTab = document.getElementById('tab-servers-tab');

    if (serversTab && serversTab.classList.contains('active')) {
      renderServers(serverFilterGame ? serverFilterGame.value : 'all', serverSearchInput ? serverSearchInput.value : '');
    }
  }, 4000);
}

// ============================================================================
// 20. STEAM DOWNLOAD MANAGER & NETWORK SPEED GRAPH
// ============================================================================
function initDownloadManager() {
  const downloadsWin = document.getElementById('window-downloads');
  const downloadsTitle = document.getElementById('downloads-titlebar');
  const downloadsCloseBtn = document.getElementById('downloads-close-btn');
  const downloadsMinBtn = document.getElementById('downloads-min-btn');
  const statusDownloadsBtn = document.getElementById('status-downloads-btn');
  const pauseBtn = document.getElementById('dl-pause-btn');
  const canvas = document.getElementById('downloads-canvas');
  const liveSpeedEl = document.getElementById('live-dl-speed');
  const bytesLabelEl = document.getElementById('dl-bytes-label');
  const progressBarEl = document.getElementById('dl-progress-bar');

  if (downloadsWin && downloadsTitle) {
    makeDraggable(downloadsWin, downloadsTitle);
  }

  function toggleDownloadsWindow() {
    if (!downloadsWin) return;
    sfx.playClick();
    if (downloadsWin.style.display === 'none' || !downloadsWin.style.display) {
      downloadsWin.style.display = 'block';
    } else {
      downloadsWin.style.display = 'none';
    }
  }

  if (statusDownloadsBtn) {
    statusDownloadsBtn.addEventListener('click', toggleDownloadsWindow);
  }

  if (downloadsCloseBtn) {
    downloadsCloseBtn.addEventListener('click', () => {
      sfx.playClick();
      if (downloadsWin) downloadsWin.style.display = 'none';
    });
  }

  if (downloadsMinBtn) {
    downloadsMinBtn.addEventListener('click', () => {
      sfx.playClick();
      if (downloadsWin) downloadsWin.style.display = 'none';
    });
  }

  // Active Download Simulation
  let isPaused = false;
  let isComplete = false;
  let downloadedMB = 4120;
  const totalMB = 4520;
  const historyPoints = 60;
  const speedHistory = new Array(historyPoints).fill(11.4);

  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      sfx.playClick();
      if (isComplete) {
        isComplete = false;
        downloadedMB = 3800;
        pauseBtn.textContent = 'Пауза';
        if (progressBarEl) progressBarEl.classList.add('dl-striped-bar');
        return;
      }
      isPaused = !isPaused;
      if (isPaused) {
        pauseBtn.textContent = 'Возобновить';
        if (liveSpeedEl) liveSpeedEl.textContent = '0.0 KB/s (Пауза)';
        if (progressBarEl) progressBarEl.classList.remove('dl-striped-bar');
      } else {
        pauseBtn.textContent = 'Пауза';
        if (progressBarEl) progressBarEl.classList.add('dl-striped-bar');
      }
    });
  }

  function drawGraph() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Background
    ctx.fillStyle = '#11150e';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = '#20291a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // Horizontal lines
    for (let y = 15; y < h; y += 20) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    // Vertical lines
    for (let x = 30; x < w; x += 40) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    ctx.stroke();

    // Area fill
    const maxSpeed = 16.0; // scale max
    const stepX = w / (historyPoints - 1);

    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let i = 0; i < historyPoints; i++) {
      const speedVal = speedHistory[i];
      const y = h - (speedVal / maxSpeed) * (h - 12) - 4;
      const x = i * stepX;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(99, 255, 96, 0.35)');
    grad.addColorStop(1, 'rgba(45, 95, 38, 0.02)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Speed curve line
    ctx.beginPath();
    ctx.strokeStyle = '#63ff60';
    ctx.lineWidth = 1.8;
    ctx.lineJoin = 'round';
    for (let i = 0; i < historyPoints; i++) {
      const speedVal = speedHistory[i];
      const y = h - (speedVal / maxSpeed) * (h - 12) - 4;
      const x = i * stepX;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Latest tip point circle
    const lastY = h - (speedHistory[historyPoints - 1] / maxSpeed) * (h - 12) - 4;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(w - 2, lastY, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  setInterval(() => {
    let currentSpeed = 0;
    if (!isPaused && !isComplete) {
      const timeFactor = Date.now() / 2400;
      const wave = Math.sin(timeFactor) * 1.5;
      const noise = (Math.random() - 0.5) * 0.9;
      currentSpeed = Math.max(7.5, Math.min(13.8, 11.2 + wave + noise));

      downloadedMB += (currentSpeed * 0.06);
      if (downloadedMB >= totalMB) {
        downloadedMB = totalMB;
        isComplete = true;
        if (pauseBtn) pauseBtn.textContent = 'Завершено';
        if (progressBarEl) progressBarEl.classList.remove('dl-striped-bar');
      }

      if (liveSpeedEl) {
        liveSpeedEl.textContent = `${currentSpeed.toFixed(1)} MB/s`;
      }

      if (statusDownloadsBtn) {
        statusDownloadsBtn.innerHTML = `<span class="download-pulse-dot"></span> Сеть: ${currentSpeed.toFixed(1)} MB/s (Загрузки)`;
      }

      if (bytesLabelEl) {
        bytesLabelEl.textContent = `${Math.floor(downloadedMB).toLocaleString()} MB / ${totalMB.toLocaleString()} MB`;
      }

      if (progressBarEl) {
        const pct = Math.min(100, (downloadedMB / totalMB) * 100);
        progressBarEl.style.width = `${pct.toFixed(1)}%`;
      }
    } else {
      currentSpeed = 0;
      if (liveSpeedEl) {
        liveSpeedEl.textContent = isComplete ? '0.0 KB/s (Завершено)' : '0.0 KB/s (Пауза)';
      }
      if (statusDownloadsBtn) {
        statusDownloadsBtn.innerHTML = `<span class="download-pulse-dot" style="background: #8e9e8b; box-shadow: none;"></span> Сеть: 0.0 KB/s (${isComplete ? 'Готово' : 'Пауза'})`;
      }
    }

    speedHistory.shift();
    speedHistory.push(currentSpeed);
    drawGraph();
  }, 300);

  // Initial render of graph
  drawGraph();
}

// ============================================================================
// 21. WIN32 SYSTEM TRAY & WINDOW CONTROLS (MINIMIZE / RESTORE / MAXIMIZE)
// ============================================================================
function initSystemTrayAndWindowControls() {
  const mainWindow = document.getElementById('main-steam-window');
  const trayBar = document.getElementById('system-tray-bar');
  const trayRestoreBtn = document.getElementById('tray-restore-btn');
  const trayClock = document.getElementById('tray-clock');
  const minBtn = document.getElementById('win-min-btn');
  const maxBtn = document.getElementById('win-max-btn');
  const closeBtn = document.getElementById('win-close-btn');

  function updateClock() {
    if (!trayClock) return;
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    trayClock.textContent = `${hh}:${mm}`;
  }
  updateClock();
  setInterval(updateClock, 10000);

  function minimizeToTray() {
    sfx.playTrayBeep();
    if (mainWindow) mainWindow.style.display = 'none';
    if (trayBar) trayBar.style.display = 'flex';
    updateClock();
    showSteamToast('Steam', 'Клиент свернут в область уведомлений (системный трей)', 'assets/icons/steam_valve.svg');
  }

  function restoreFromTray() {
    sfx.playTrayBeep();
    if (mainWindow) mainWindow.style.display = 'flex';
    if (trayBar) trayBar.style.display = 'none';
  }

  if (minBtn) minBtn.addEventListener('click', minimizeToTray);
  if (trayRestoreBtn) trayRestoreBtn.addEventListener('click', restoreFromTray);

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      sfx.playTrayBeep();
      minimizeToTray();
    });
  }

  if (maxBtn) {
    maxBtn.addEventListener('click', () => {
      sfx.playClick();
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        showSteamToast('Окно', 'Полноэкранный режим активирован', 'assets/icons/screen.svg');
      } else {
        document.exitFullscreen().catch(() => {});
        showSteamToast('Окно', 'Оконный режим восстановлен', 'assets/icons/screen.svg');
      }
    });
  }
}

// ============================================================================
// 22. SCREENSHOT CAPTURE SYSTEM (F12 HOTKEY & CAMERA SNAPSHOT)
// ============================================================================
function initScreenshotCapture() {
  const flashEl = document.getElementById('screen-shutter-flash');
  const cameraBtn = document.getElementById('btn-camera-snapshot');

  function takeScreenshot() {
    sfx.playCameraShutter();

    // Trigger white shutter burst flash
    if (flashEl) {
      flashEl.style.display = 'block';
      flashEl.classList.add('flashing');
      setTimeout(() => {
        flashEl.classList.remove('flashing');
      }, 70);
      setTimeout(() => {
        flashEl.style.display = 'none';
      }, 360);
    }

    const game = GAMES_DB[currentSelectedGameId] || GAMES_DB['dwd2'];
    const timeStr = new Date().toLocaleTimeString();

    // Add screenshot to current game's screenshots array
    const sampleShots = [
      'assets/screenshots/dwd2_shot_1.jpg',
      'assets/screenshots/dwd2_shot_2.jpg',
      'assets/screenshots/dwd2_shot_3.jpg',
      'assets/screenshots/dwd2_shot_4.jpg'
    ];
    const pickedSrc = sampleShots[Math.floor(Math.random() * sampleShots.length)];
    const newShot = {
      src: pickedSrc,
      caption: `${game.title} — Пользовательский скриншот (${timeStr})`
    };

    if (game.screenshots) {
      game.screenshots.unshift(newShot);
    }

    // Refresh overlay screenshots row if populated
    const overlayStrip = document.getElementById('overlay-screenshots-strip');
    if (overlayStrip) {
      const div = document.createElement('div');
      div.className = 'overlay-screen-thumb';
      div.innerHTML = `<img src="${newShot.src}" alt="Shot">`;
      overlayStrip.prepend(div);
    }

    showSteamToast('Снимок экрана', `Скриншот сохранен: ${game.title} (F12)`, 'assets/icons/zoom.svg');
  }

  if (cameraBtn) {
    cameraBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      takeScreenshot();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'F12') {
      e.preventDefault();
      takeScreenshot();
    }
  });
}

