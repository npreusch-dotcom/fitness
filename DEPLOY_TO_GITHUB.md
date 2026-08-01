"use strict";

const APP_VERSION = "2.0.0";
const STORAGE_KEY = "momentumCoach.state.v1";
const PERSONAL_PROGRAM_ID = "fat-loss-cardio-v1";
const PERSONAL_PROGRAM_VERSION = 1;
const PERSONAL_REQUIRED_DAYS = [1, 2, 3, 4, 6];
const PERSONAL_REQUIRED_EQUIPMENT = ["bodyweight", "dumbbells", "treadmill", "peloton", "ab_roller"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ICONS = {
  home: '<path d="M3 10.8 12 3l9 7.8"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-6h5v6"/>',
  dumbbell: '<path d="M6.5 7v10M3.5 9v6M17.5 7v10M20.5 9v6M6.5 12h11"/>',
  fork: '<path d="M6 3v7M3.5 3v4.5A2.5 2.5 0 0 0 6 10v11M8.5 3v4.5A2.5 2.5 0 0 1 6 10"/><path d="M16 3v18M16 3c3 2 4 5 4 8h-4"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9A1.7 1.7 0 0 0 21 10h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  water: '<path d="M12 2S5.5 9.3 5.5 14.5a6.5 6.5 0 0 0 13 0C18.5 9.3 12 2 12 2Z"/><path d="M9 16.5c.7 1 1.7 1.5 3 1.5"/>',
  scale: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M8 9a4 4 0 0 1 8 0M12 9l2-2"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  play: '<path d="m8 5 11 7-11 7Z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  fire: '<path d="M12 22c4 0 7-3 7-7 0-5-4-8-6-12 0 4-2 6-4 8-1-2-2-3-2-5-2 2-3 5-3 8 0 5 3 8 8 8Z"/><path d="M9 18c0-2 2-3 3-5 0 2 3 3 3 5a3 3 0 0 1-6 0Z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  refresh: '<path d="M20 7v5h-5"/><path d="M4 17v-5h5"/><path d="M6.1 9a7 7 0 0 1 11.5-2L20 12M4 12l2.4 5a7 7 0 0 0 11.5-2"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5M4 21h16"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  walk: '<circle cx="13" cy="4" r="2"/><path d="m10 21 2-7-3-2 2-5 3 3 4 1M14 13l4 6M8 12l-3 4"/>',
  moon: '<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  bolt: '<path d="m13 2-9 12h7l-1 8 9-12h-7Z"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
  spark: '<path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z"/>',
  trophy: '<path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0Z"/><path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 1M9 2h6M12 5V2"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  food: '<path d="M4 11h16M6 11a6 6 0 0 1 12 0M12 5V3M3 19h18"/>',
  note: '<path d="M4 3h16v18H4Z"/><path d="M8 8h8M8 12h8M8 16h5"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>'
};

function icon(name, className = "icon") {
  const body = ICONS[name] || ICONS.info;
  return `<span class="${className}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg></span>`;
}

function hydrateStaticIcons() {
  document.querySelectorAll("[data-icon]").forEach((node) => {
    const name = node.dataset.icon;
    node.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.info}</svg>`;
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value) || 0));
}

function roundTo(value, step = 1) {
  return Math.round(value / step) * step;
}

function uid(prefix = "id") {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateFromKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

function addDays(date, amount) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + amount);
  return copy;
}

function addMinutesToTime(time, minutes) {
  const [hour, minute] = String(time || "00:00").split(":").map(Number);
  const total = ((hour * 60 + minute + minutes) % 1440 + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function timeToMinutes(time) {
  const [hour, minute] = String(time || "00:00").split(":").map(Number);
  return (hour * 60) + minute;
}

function minutesToTime(minutes) {
  const total = ((Math.round(minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function formatClock(time) {
  const [hour, minute] = String(time || "00:00").split(":").map(Number);
  const date = new Date(2020, 0, 1, hour, minute);
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(date);
}

function formatDate(date, options = {}) {
  return new Intl.DateTimeFormat(undefined, options).format(date);
}

function formatDuration(seconds) {
  const safe = Math.max(0, Math.floor(seconds || 0));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  if (hours > 0) return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function weekStart(date = new Date()) {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(12, 0, 0, 0);
  return copy;
}

function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function deepMerge(defaultValue, savedValue) {
  if (Array.isArray(defaultValue)) return Array.isArray(savedValue) ? savedValue : defaultValue;
  if (defaultValue && typeof defaultValue === "object") {
    const output = { ...defaultValue };
    if (savedValue && typeof savedValue === "object") {
      Object.keys(savedValue).forEach((key) => {
        output[key] = key in defaultValue ? deepMerge(defaultValue[key], savedValue[key]) : savedValue[key];
      });
    }
    return output;
  }
  return savedValue === undefined ? defaultValue : savedValue;
}

const MEAL_IDEAS = {
  breakfast: [
    { name: "Protein yogurt bowl", detail: "High-protein Greek yogurt, berries, and a small serving of high-fiber cereal or oats." },
    { name: "Yogurt plus shake", detail: "Protein yogurt with berries plus half a ready-to-drink protein shake when breakfast needs more staying power." },
    { name: "Fast yogurt parfait", detail: "Greek yogurt, frozen berries, chia seeds, and a measured sprinkle of granola." }
  ],
  lunch: [
    { name: "Chicken burrito bowl", detail: "5-7 oz chicken, microwave rice or half cauliflower rice, black beans, vegetables, salsa, and Greek yogurt." },
    { name: "Chicken Caesar wrap", detail: "Pre-cooked chicken, bagged salad, a high-fiber tortilla, light dressing, and fruit." },
    { name: "Rotisserie chicken power bowl", detail: "Chicken breast, bagged greens or microwave vegetables, a potato or rice cup, and a measured sauce." },
    { name: "Chicken meal-prep box", detail: "Chicken, frozen or roasted vegetables, a controlled rice or potato serving, and a low-calorie sauce." }
  ],
  snack: [
    { name: "Protein shake and banana", detail: "The fastest default for a packed day: open, drink, and keep moving." },
    { name: "Greek yogurt and berries", detail: "Refrigerated, high-protein, and ready in under a minute." },
    { name: "Jerky and an apple", detail: "A shelf-stable protein option paired with fruit." },
    { name: "String cheese and fruit", detail: "No preparation and easy to portion." },
    { name: "Cottage cheese and fruit", detail: "A filling refrigerated option with minimal effort." },
    { name: "Protein bar and water", detail: "Keep one at your desk, in your car, and in your work bag for emergencies." }
  ],
  dinner: [
    { name: "Chef-prepared dinner", detail: "Eat the protein first, vegetables second, and starch third. Pause before taking more." },
    { name: "Lighter dinner plate", detail: "Aim for roughly half vegetables, one-quarter protein, and one-quarter starch." },
    { name: "Richer dinner strategy", detail: "Keep the meal, reduce the portion, and skip unplanned grazing afterward." }
  ],
  evening: [
    { name: "Greek yogurt", detail: "Use only when genuinely hungry and protein is still short." },
    { name: "Cottage cheese", detail: "A simple protein-focused option with fruit or cinnamon." },
    { name: "Kitchen closed", detail: "Tea or water when dinner was enough and targets are already met." }
  ]
};

const EXERCISES = [
  { key: "bodyweight_squat", name: "Bodyweight Squat", pattern: "squat", requires: ["bodyweight"], difficulty: 1, tier: 1, type: "compound", increment: 0, cue: "Sit between your hips, keep your whole foot down, and stand tall." },
  { key: "goblet_squat", name: "Goblet Squat", pattern: "squat", requires: ["dumbbells"], difficulty: 1, tier: 3, type: "compound", increment: 5, cue: "Hold one dumbbell at your chest and keep your ribs stacked over your hips." },
  { key: "dumbbell_front_squat", name: "Dumbbell Front Squat", pattern: "squat", requires: ["dumbbells"], difficulty: 2, tier: 4, type: "compound", increment: 5, cue: "Brace before each rep and keep the dumbbells stable at shoulder height." },
  { key: "back_squat", name: "Barbell Back Squat", pattern: "squat", requires: ["barbell"], difficulty: 2, tier: 5, type: "compound", increment: 5, cue: "Brace, descend under control, and drive evenly through both feet." },
  { key: "leg_press", name: "Leg Press", pattern: "squat", requires: ["machines"], difficulty: 1, tier: 4, type: "compound", increment: 10, cue: "Keep your lower back supported and use a comfortable depth." },

  { key: "glute_bridge", name: "Glute Bridge", pattern: "hinge", requires: ["bodyweight"], difficulty: 1, tier: 1, type: "compound", increment: 0, cue: "Tuck your ribs, squeeze your glutes, and avoid arching your lower back." },
  { key: "dumbbell_glute_bridge", name: "Dumbbell Glute Bridge", pattern: "hinge", requires: ["dumbbells"], difficulty: 1, tier: 3, type: "compound", increment: 5, cue: "Place one dumbbell securely across your hips, keep your ribs down, and squeeze at the top." },
  { key: "dumbbell_rdl", name: "Dumbbell Romanian Deadlift", pattern: "hinge", requires: ["dumbbells"], difficulty: 1, tier: 4, type: "compound", increment: 5, cue: "Push your hips back, keep the weights close, and stop before your back rounds." },
  { key: "hip_thrust", name: "Bench Hip Thrust", pattern: "hinge", requires: ["bench"], difficulty: 1, tier: 3, type: "compound", increment: 5, cue: "Keep your chin tucked and finish by squeezing your glutes, not your lower back." },
  { key: "barbell_rdl", name: "Barbell Romanian Deadlift", pattern: "hinge", requires: ["barbell"], difficulty: 2, tier: 5, type: "compound", increment: 10, cue: "Brace hard, hinge at the hips, and keep the bar close to your legs." },
  { key: "leg_curl", name: "Leg Curl", pattern: "hinge", requires: ["machines"], difficulty: 1, tier: 3, type: "accessory", increment: 5, cue: "Control both directions and keep your hips anchored." },

  { key: "incline_pushup", name: "Incline Push-Up", pattern: "horizontal_push", requires: ["bodyweight"], difficulty: 1, tier: 1, type: "compound", increment: 0, cue: "Keep a straight line from head to heel and lower your chest toward the support." },
  { key: "pushup", name: "Push-Up", pattern: "horizontal_push", requires: ["bodyweight"], difficulty: 2, tier: 2, type: "compound", increment: 0, cue: "Keep your elbows slightly tucked and your body rigid." },
  { key: "dumbbell_floor_press", name: "Dumbbell Floor Press", pattern: "horizontal_push", requires: ["dumbbells"], difficulty: 1, tier: 3, type: "compound", increment: 5, cue: "Pause your upper arms gently on the floor and press without shrugging." },
  { key: "dumbbell_bench_press", name: "Dumbbell Bench Press", pattern: "horizontal_push", requires: ["dumbbells", "bench"], difficulty: 1, tier: 5, type: "compound", increment: 5, cue: "Set your shoulder blades, use a comfortable range, and press smoothly." },
  { key: "bench_press", name: "Barbell Bench Press", pattern: "horizontal_push", requires: ["barbell", "bench"], difficulty: 2, tier: 6, type: "compound", increment: 5, cue: "Keep your feet planted, shoulder blades set, and bar path controlled." },
  { key: "chest_press", name: "Machine Chest Press", pattern: "horizontal_push", requires: ["machines"], difficulty: 1, tier: 4, type: "compound", increment: 5, cue: "Set the seat so the handles line up with mid-chest and avoid shrugging." },

  { key: "reverse_snow_angel", name: "Reverse Snow Angel", pattern: "horizontal_pull", requires: ["bodyweight"], difficulty: 1, tier: 1, type: "accessory", increment: 0, cue: "Move slowly, keep your ribs down, and squeeze your upper back." },
  { key: "band_row", name: "Resistance Band Row", pattern: "horizontal_pull", requires: ["bands"], difficulty: 1, tier: 3, type: "compound", increment: 0, cue: "Pull your elbows back and pause without leaning away." },
  { key: "one_arm_row", name: "One-Arm Dumbbell Row", pattern: "horizontal_pull", requires: ["dumbbells"], difficulty: 1, tier: 4, type: "compound", increment: 5, cue: "Keep your torso still and pull the weight toward your back pocket." },
  { key: "chest_supported_row", name: "Chest-Supported Dumbbell Row", pattern: "horizontal_pull", requires: ["dumbbells", "bench"], difficulty: 1, tier: 5, type: "compound", increment: 5, cue: "Keep your chest supported and pull without shrugging." },
  { key: "cable_row", name: "Seated Cable Row", pattern: "horizontal_pull", requires: ["machines"], difficulty: 1, tier: 4, type: "compound", increment: 5, cue: "Stay tall, pull to your lower ribs, and control the return." },

  { key: "pike_pushup", name: "Pike Push-Up", pattern: "vertical_push", requires: ["bodyweight"], difficulty: 2, tier: 1, type: "compound", increment: 0, cue: "Keep your hips high and lower the crown of your head toward the floor." },
  { key: "dumbbell_shoulder_press", name: "Dumbbell Shoulder Press", pattern: "vertical_push", requires: ["dumbbells"], difficulty: 1, tier: 4, type: "compound", increment: 5, cue: "Keep your ribs down and finish with the weights over your shoulders." },
  { key: "machine_shoulder_press", name: "Machine Shoulder Press", pattern: "vertical_push", requires: ["machines"], difficulty: 1, tier: 3, type: "compound", increment: 5, cue: "Set the seat comfortably and avoid arching your lower back." },

  { key: "floor_lat_pull", name: "Floor Lat Pull", pattern: "vertical_pull", requires: ["bodyweight"], difficulty: 1, tier: 1, type: "accessory", increment: 0, cue: "Lie face down, pull your elbows toward your ribs, and squeeze your back." },
  { key: "band_pulldown", name: "Band Lat Pulldown", pattern: "vertical_pull", requires: ["bands"], difficulty: 1, tier: 3, type: "compound", increment: 0, cue: "Pull your elbows down toward your sides without leaning back." },
  { key: "lat_pulldown", name: "Lat Pulldown", pattern: "vertical_pull", requires: ["machines"], difficulty: 1, tier: 5, type: "compound", increment: 5, cue: "Stay tall and pull the bar toward your upper chest with your elbows." },
  { key: "assisted_pullup", name: "Assisted Pull-Up", pattern: "vertical_pull", requires: ["machines"], difficulty: 2, tier: 4, type: "compound", increment: 5, cue: "Start from a controlled hang and drive your elbows down." },

  { key: "reverse_lunge", name: "Reverse Lunge", pattern: "single_leg", requires: ["bodyweight"], difficulty: 1, tier: 2, type: "compound", increment: 0, cue: "Step back softly, keep your front foot planted, and stand through the front leg." },
  { key: "dumbbell_split_squat", name: "Dumbbell Split Squat", pattern: "single_leg", requires: ["dumbbells"], difficulty: 2, tier: 4, type: "compound", increment: 5, cue: "Use a stable stance and lower straight down under control." },
  { key: "step_up", name: "Step-Up", pattern: "single_leg", requires: ["bench"], difficulty: 1, tier: 3, type: "compound", increment: 5, cue: "Drive through the working leg and avoid pushing off the floor." },
  { key: "walking_lunge", name: "Walking Lunge", pattern: "single_leg", requires: ["bodyweight"], difficulty: 2, tier: 2, type: "compound", increment: 0, cue: "Take controlled steps and keep your front knee tracking over your foot." },

  { key: "calf_raise", name: "Standing Calf Raise", pattern: "calves", requires: ["bodyweight"], difficulty: 1, tier: 1, type: "accessory", increment: 0, cue: "Use a full range, pause at the top, and lower slowly." },
  { key: "dumbbell_calf_raise", name: "Dumbbell Calf Raise", pattern: "calves", requires: ["dumbbells"], difficulty: 1, tier: 3, type: "accessory", increment: 5, cue: "Stay tall and control the stretch at the bottom." },

  { key: "dead_bug", name: "Dead Bug", pattern: "core", requires: ["bodyweight"], difficulty: 1, tier: 2, type: "core", increment: 0, cue: "Keep your lower back gently pressed down while opposite limbs move." },
  { key: "ab_roller", name: "Ab Roller", pattern: "core", requires: ["ab_roller"], difficulty: 2, tier: 4, type: "core", increment: 0, cue: "Start from your knees, brace before rolling, and stop before your lower back begins to arch." },
  { key: "plank", name: "Front Plank", pattern: "core", requires: ["bodyweight"], difficulty: 1, tier: 1, type: "core", increment: 0, cue: "Squeeze your glutes and keep a straight line from head to heel." },
  { key: "side_plank", name: "Side Plank", pattern: "core", requires: ["bodyweight"], difficulty: 2, tier: 2, type: "core", increment: 0, cue: "Stack your shoulders and hips and stay long through your body." },
  { key: "pallof_press", name: "Band Pallof Press", pattern: "core", requires: ["bands"], difficulty: 1, tier: 3, type: "core", increment: 0, cue: "Resist rotation and press straight out from your chest." },
  { key: "cable_chop", name: "Cable Chop", pattern: "core", requires: ["machines"], difficulty: 1, tier: 3, type: "core", increment: 5, cue: "Rotate through your upper back while keeping your hips controlled." },

  { key: "dumbbell_lateral_raise", name: "Dumbbell Lateral Raise", pattern: "shoulders", requires: ["dumbbells"], difficulty: 1, tier: 3, type: "accessory", increment: 5, cue: "Use a light load, keep a soft bend in your elbows, and raise only to about shoulder height." },

  { key: "towel_curl", name: "Towel Isometric Curl", pattern: "biceps", requires: ["bodyweight"], difficulty: 1, tier: 1, type: "accessory", increment: 0, cue: "Pull against the towel and hold steady tension without shrugging." },
  { key: "dumbbell_curl", name: "Dumbbell Curl", pattern: "biceps", requires: ["dumbbells"], difficulty: 1, tier: 4, type: "accessory", increment: 5, cue: "Keep your elbows near your sides and avoid swinging." },
  { key: "band_curl", name: "Band Curl", pattern: "biceps", requires: ["bands"], difficulty: 1, tier: 3, type: "accessory", increment: 0, cue: "Keep steady tension and control the lowering phase." },
  { key: "cable_curl", name: "Cable Curl", pattern: "biceps", requires: ["machines"], difficulty: 1, tier: 3, type: "accessory", increment: 5, cue: "Keep your upper arms still and squeeze at the top." },

  { key: "close_grip_pushup", name: "Close-Grip Push-Up", pattern: "triceps", requires: ["bodyweight"], difficulty: 2, tier: 1, type: "accessory", increment: 0, cue: "Keep your elbows close and use an incline if needed." },
  { key: "dumbbell_triceps", name: "Dumbbell Overhead Triceps Extension", pattern: "triceps", requires: ["dumbbells"], difficulty: 1, tier: 4, type: "accessory", increment: 5, cue: "Keep your ribs down and point your elbows forward." },
  { key: "band_pressdown", name: "Band Triceps Pressdown", pattern: "triceps", requires: ["bands"], difficulty: 1, tier: 3, type: "accessory", increment: 0, cue: "Pin your elbows at your sides and finish each rep fully." },
  { key: "cable_pressdown", name: "Cable Triceps Pressdown", pattern: "triceps", requires: ["machines"], difficulty: 1, tier: 3, type: "accessory", increment: 5, cue: "Keep your shoulders relaxed and move only at the elbows." },

  { key: "brisk_walk", name: "Brisk Walk", pattern: "conditioning", requires: ["bodyweight"], difficulty: 1, tier: 1, type: "conditioning", increment: 0, cue: "Walk at a pace that raises your breathing but still allows short sentences." },
  { key: "incline_treadmill", name: "Incline Treadmill Walk", pattern: "conditioning", requires: ["treadmill"], difficulty: 1, tier: 4, type: "conditioning", increment: 1, cue: "Use a purposeful pace and an incline you can maintain without holding the rails." },
  { key: "treadmill_intervals", name: "Treadmill Intervals", pattern: "conditioning", requires: ["treadmill"], difficulty: 2, tier: 3, type: "conditioning", increment: 1, cue: "Alternate one brisk minute with one easier minute and finish in control." },
  { key: "peloton_endurance", name: "Peloton Easy Endurance", pattern: "conditioning", requires: ["peloton"], difficulty: 1, tier: 5, type: "conditioning", increment: 0, cue: "Choose a Peloton power walk, walk-run, or treadmill endurance class and stay near RPE 5-6." },
  { key: "peloton_intervals", name: "Peloton Interval Walk / Walk-Run", pattern: "conditioning", requires: ["peloton"], difficulty: 2, tier: 5, type: "conditioning", increment: 0, cue: "Use controlled hard efforts around RPE 8, never an all-out sprint, and recover fully between rounds." },
  { key: "peloton_low_impact", name: "Peloton Low-Impact Walk", pattern: "conditioning", requires: ["peloton"], difficulty: 1, tier: 5, type: "conditioning", increment: 0, cue: "Keep this easy. The purpose is extra movement after strength work, not another hard session." },
  { key: "recovery_walk", name: "Recovery Walk", pattern: "conditioning", requires: ["treadmill"], difficulty: 1, tier: 4, type: "conditioning", increment: 0, cue: "Walk comfortably for circulation and recovery. You should finish feeling better than when you started." },
  { key: "busy_day_10", name: "10-Minute Minimum", pattern: "conditioning", requires: ["bodyweight"], difficulty: 1, tier: 1, type: "conditioning", increment: 0, cue: "Choose any 10-minute Peloton class or a 10-minute treadmill walk. Protect the habit and move on." },
  { key: "mobility_flow", name: "Mobility Flow", pattern: "mobility", requires: ["bodyweight"], difficulty: 1, tier: 1, type: "mobility", increment: 0, cue: "Move slowly through hips, upper back, shoulders, and ankles without forcing range." }
];

const TEMPLATE_LIBRARY = {
  1: [
    { title: "Full Body", focus: "Total-body foundation", slots: [["squat", 0], ["horizontal_push", 0], ["horizontal_pull", 0], ["hinge", 0], ["core", 0], ["conditioning", 0]] }
  ],
  2: [
    { title: "Full Body A", focus: "Squat and push", slots: [["squat", 0], ["horizontal_push", 0], ["horizontal_pull", 0], ["hinge", 0], ["core", 0], ["conditioning", 0]] },
    { title: "Full Body B", focus: "Hinge and pull", slots: [["hinge", 1], ["vertical_push", 0], ["vertical_pull", 0], ["single_leg", 0], ["core", 1], ["conditioning", 1]] }
  ],
  3: [
    { title: "Full Body A", focus: "Squat strength", slots: [["squat", 0], ["horizontal_push", 0], ["horizontal_pull", 0], ["hinge", 0], ["core", 0], ["conditioning", 0]] },
    { title: "Full Body B", focus: "Hinge strength", slots: [["hinge", 1], ["vertical_push", 0], ["vertical_pull", 0], ["single_leg", 0], ["core", 1], ["conditioning", 1]] },
    { title: "Full Body C", focus: "Balanced volume", slots: [["single_leg", 1], ["horizontal_push", 1], ["horizontal_pull", 1], ["squat", 1], ["core", 2], ["conditioning", 0]] }
  ],
  4: [
    { title: "Upper A", focus: "Chest, back, and shoulders", slots: [["horizontal_push", 0], ["horizontal_pull", 0], ["vertical_push", 0], ["vertical_pull", 0], ["biceps", 0], ["triceps", 0]] },
    { title: "Lower A", focus: "Squat and core", slots: [["squat", 0], ["hinge", 0], ["single_leg", 0], ["calves", 0], ["core", 0], ["conditioning", 0]] },
    { title: "Upper B", focus: "Back, shoulders, and arms", slots: [["horizontal_pull", 1], ["horizontal_push", 1], ["vertical_pull", 1], ["vertical_push", 1], ["biceps", 1], ["triceps", 1]] },
    { title: "Lower B", focus: "Hinge and single-leg", slots: [["hinge", 1], ["single_leg", 1], ["squat", 1], ["calves", 1], ["core", 1], ["conditioning", 1]] }
  ],
  5: [
    { title: "Push", focus: "Chest, shoulders, and triceps", slots: [["horizontal_push", 0], ["vertical_push", 0], ["horizontal_push", 1], ["triceps", 0], ["core", 0]] },
    { title: "Pull", focus: "Back and biceps", slots: [["horizontal_pull", 0], ["vertical_pull", 0], ["horizontal_pull", 1], ["biceps", 0], ["core", 1]] },
    { title: "Legs", focus: "Lower-body strength", slots: [["squat", 0], ["hinge", 0], ["single_leg", 0], ["calves", 0], ["core", 0]] },
    { title: "Upper", focus: "Balanced upper body", slots: [["horizontal_push", 1], ["horizontal_pull", 1], ["vertical_push", 1], ["vertical_pull", 1], ["biceps", 1], ["triceps", 1]] },
    { title: "Conditioning", focus: "Cardio, mobility, and core", slots: [["conditioning", 1], ["mobility", 0], ["core", 2], ["single_leg", 1]] }
  ],
  6: [
    { title: "Push A", focus: "Chest emphasis", slots: [["horizontal_push", 0], ["vertical_push", 0], ["horizontal_push", 1], ["triceps", 0], ["core", 0]] },
    { title: "Pull A", focus: "Row emphasis", slots: [["horizontal_pull", 0], ["vertical_pull", 0], ["horizontal_pull", 1], ["biceps", 0], ["core", 1]] },
    { title: "Legs A", focus: "Squat emphasis", slots: [["squat", 0], ["hinge", 0], ["single_leg", 0], ["calves", 0], ["core", 0]] },
    { title: "Push B", focus: "Shoulder emphasis", slots: [["vertical_push", 1], ["horizontal_push", 1], ["vertical_push", 0], ["triceps", 1], ["core", 2]] },
    { title: "Pull B", focus: "Pulldown emphasis", slots: [["vertical_pull", 1], ["horizontal_pull", 1], ["vertical_pull", 0], ["biceps", 1], ["core", 0]] },
    { title: "Legs B", focus: "Hinge emphasis", slots: [["hinge", 1], ["single_leg", 1], ["squat", 1], ["calves", 1], ["conditioning", 0]] }
  ]
};

function createDefaultProfile() {
  return {
    name: "Nick",
    programId: PERSONAL_PROGRAM_ID,
    goal: "fat_loss",
    fitnessLevel: "beginner",
    workoutDays: [...PERSONAL_REQUIRED_DAYS],
    sessionMinutes: 45,
    equipment: [...PERSONAL_REQUIRED_EQUIPMENT],
    dumbbellMax: 25,
    wakeTime: "06:30",
    bedTime: "22:30",
    workoutTime: "17:30",
    weightUnit: "lb",
    currentWeight: "",
    targetWeight: "",
    proteinTarget: 150,
    waterTarget: 80,
    reminderList: "Momentum",
    reminderShortcutName: "Momentum Reminders",
    theme: "auto"
  };
}

function mealLabelsForCount(count) {
  const labels = {
    3: ["Breakfast", "Lunch", "Dinner"],
    4: ["Breakfast", "Lunch", "Afternoon snack", "Dinner"],
    5: ["Breakfast", "Morning snack", "Lunch", "Afternoon snack", "Dinner"],
    6: ["Breakfast", "Morning snack", "Lunch", "Afternoon snack", "Dinner", "Evening snack"]
  };
  return labels[count] || labels[4];
}

function mealCategory(label, index, total) {
  const value = String(label || "").toLowerCase();
  if (value.includes("breakfast")) return "breakfast";
  if (value.includes("lunch")) return "lunch";
  if (value.includes("dinner")) return "dinner";
  if (value.includes("evening")) return "evening";
  if (value.includes("snack")) return "snack";
  if (index === 0) return "breakfast";
  if (index === total - 1) return "dinner";
  return "snack";
}

function generateMealSchedule(wakeTime, bedTime, count = 4, proteinTarget = 150) {
  const safeCount = clamp(count, 3, 6);
  let start = timeToMinutes(wakeTime) + 60;
  let end = timeToMinutes(bedTime) - 150;
  if (end <= start) end += 1440;
  const labels = mealLabelsForCount(safeCount);
  const proteinWeights = {
    3: [0.28, 0.32, 0.40],
    4: [0.23, 0.29, 0.16, 0.32],
    5: [0.20, 0.12, 0.25, 0.13, 0.30],
    6: [0.18, 0.10, 0.23, 0.10, 0.27, 0.12]
  }[safeCount];

  return labels.map((label, index) => {
    const ratio = safeCount === 1 ? 0 : index / (safeCount - 1);
    const minutes = start + ((end - start) * ratio);
    const category = mealCategory(label, index, safeCount);
    return {
      id: uid("meal"),
      label,
      time: minutesToTime(roundTo(minutes, 5)),
      targetProtein: Math.max(10, roundTo(proteinTarget * proteinWeights[index], 5)),
      category,
      optionIndex: 0
    };
  });
}

function createPersonalMealSchedule(proteinTarget = 150) {
  const target = Math.max(50, Number(proteinTarget) || 150);
  const definitions = [
    { id: "meal-breakfast", label: "Protein yogurt breakfast", time: "07:30", category: "breakfast", weight: 0.20, coachNote: "Default: high-protein yogurt, berries, and a measured high-fiber topping." },
    { id: "meal-morning-snack", label: "Morning protein snack", time: "10:30", category: "snack", weight: 0.13, coachNote: "A fast protein anchor for long or meeting-heavy mornings; skip only when breakfast comfortably carries you to lunch." },
    { id: "meal-lunch", label: "Chicken-based lunch", time: "13:00", category: "lunch", weight: 0.30, coachNote: "Build around 5-7 oz chicken, vegetables, and one controlled serving of rice, potato, beans, or a wrap." },
    { id: "meal-afternoon-snack", label: "Busy-day snack", time: "16:00", category: "snack", weight: 0.13, coachNote: "Keep this at your desk, in the refrigerator, or in your work bag so the choice takes under a minute." },
    { id: "meal-dinner", label: "Chef-prepared dinner", time: "19:00", category: "dinner", weight: 0.24, coachNote: "Protein first, vegetables second, starch third. Pause before seconds." }
  ];
  let allocated = 0;
  return definitions.map((meal, index) => {
    const isLast = index === definitions.length - 1;
    const targetProtein = isLast ? Math.max(10, target - allocated) : Math.max(10, roundTo(target * meal.weight, 5));
    allocated += targetProtein;
    return { ...meal, targetProtein, optionIndex: 0 };
  });
}

function createDefaultState() {
  const profile = createDefaultProfile();
  const coachProgram = {
    id: PERSONAL_PROGRAM_ID,
    version: PERSONAL_PROGRAM_VERSION,
    startDate: localDateKey()
  };
  const mealSchedule = createPersonalMealSchedule(profile.proteinTarget);
  return {
    version: 2,
    appVersion: APP_VERSION,
    onboardingComplete: true,
    installDismissed: false,
    profile,
    coachProgram,
    mealSchedule,
    workoutPlan: generateWorkoutPlan(profile, coachProgram),
    logs: {},
    exerciseProgress: {},
    activeWorkout: null,
    settings: {
      shortcutConfigured: false,
      lastBackupAt: null
    }
  };
}

function planSignature(profile, coachProgram = null) {
  return JSON.stringify({
    programId: profile.programId || "custom",
    programVersion: coachProgram?.version || 0,
    goal: profile.goal,
    fitnessLevel: profile.fitnessLevel,
    workoutDays: [...profile.workoutDays].sort(),
    sessionMinutes: Number(profile.sessionMinutes),
    equipment: [...profile.equipment].sort()
  });
}

function expandedEquipment(profile) {
  const set = new Set(profile.equipment || []);
  set.add("bodyweight");
  if (set.has("full_gym")) {
    ["dumbbells", "bands", "bench", "treadmill", "barbell", "machines"].forEach((item) => set.add(item));
  }
  return set;
}

function exerciseAvailable(exercise, equipment) {
  return exercise.requires.every((item) => equipment.has(item));
}

function getExercise(pattern, variantIndex, profile, usedKeys = new Set()) {
  const equipment = expandedEquipment(profile);
  let candidates = EXERCISES.filter((exercise) => exercise.pattern === pattern && exerciseAvailable(exercise, equipment));
  if (profile.fitnessLevel === "beginner") {
    const beginnerCandidates = candidates.filter((exercise) => exercise.difficulty <= 1);
    if (beginnerCandidates.length) candidates = beginnerCandidates;
  }

  candidates.sort((a, b) => {
    const usedA = usedKeys.has(a.key) ? 1 : 0;
    const usedB = usedKeys.has(b.key) ? 1 : 0;
    if (usedA !== usedB) return usedA - usedB;
    return b.tier - a.tier;
  });

  if (!candidates.length) {
    candidates = EXERCISES.filter((exercise) => exercise.pattern === pattern && exercise.requires.includes("bodyweight"));
  }

  const selected = candidates[Math.abs(variantIndex || 0) % Math.max(1, candidates.length)] || EXERCISES.find((exercise) => exercise.key === "mobility_flow");
  usedKeys.add(selected.key);
  return selected;
}

function prescriptionFor(exercise, profile) {
  const duration = Number(profile.sessionMinutes) || 35;
  const level = profile.fitnessLevel;
  const goal = profile.goal;
  let sets = level === "beginner" ? 2 : 3;
  let targetReps = "8-12";
  let defaultReps = 10;
  let rest = 60;

  if (exercise.type === "compound") {
    sets = level === "beginner" ? 2 : 3;
    rest = 90;
    if (goal === "strength") {
      sets = level === "beginner" ? 3 : 4;
      targetReps = "5-8";
      defaultReps = 6;
      rest = 120;
    } else if (goal === "muscle") {
      sets = level === "beginner" ? 3 : 4;
      targetReps = "8-12";
      defaultReps = 10;
      rest = 90;
    } else if (goal === "fat_loss") {
      sets = 3;
      targetReps = "10-15";
      defaultReps = 12;
      rest = 60;
    }
  } else if (exercise.type === "accessory") {
    sets = level === "beginner" ? 2 : 3;
    targetReps = "10-15";
    defaultReps = 12;
    rest = 45;
  } else if (exercise.type === "core") {
    sets = level === "beginner" ? 2 : 3;
    targetReps = exercise.key.includes("plank") ? "30-45 sec" : "8-12 / side";
    defaultReps = exercise.key.includes("plank") ? 30 : 10;
    rest = 45;
  } else if (exercise.type === "conditioning") {
    sets = 1;
    targetReps = `${Math.max(8, Math.round(duration * 0.28))} min`;
    defaultReps = Math.max(8, Math.round(duration * 0.28));
    rest = 0;
  } else if (exercise.type === "mobility") {
    sets = 1;
    targetReps = "6-10 min";
    defaultReps = 8;
    rest = 0;
  }

  if (duration <= 20 && sets > 2) sets -= 1;
  if (duration >= 55 && exercise.type === "compound" && goal !== "fat_loss") sets += 1;

  return { sets, targetReps, defaultReps, rest };
}

function coachProgramWeek(referenceDate = new Date(), program = state?.coachProgram) {
  const start = program?.startDate ? dateFromKey(program.startDate) : new Date();
  const current = referenceDate instanceof Date ? referenceDate : dateFromKey(referenceDate);
  const elapsedDays = Math.max(0, Math.floor((current.getTime() - start.getTime()) / 86400000));
  return Math.min(8, Math.floor(elapsedDays / 7) + 1);
}

function cardioProgressionForWeek(week) {
  const safeWeek = clamp(week, 1, 8);
  if (safeWeek <= 2) {
    return {
      block: "Weeks 1-2",
      enduranceMinutes: 30,
      intervalMinutes: 26,
      intervalText: "5-min warmup, 8 rounds of 30 sec hard / 90 sec easy, 5-min cooldown"
    };
  }
  if (safeWeek <= 4) {
    return {
      block: "Weeks 3-4",
      enduranceMinutes: 35,
      intervalMinutes: 26,
      intervalText: "5-min warmup, 8 rounds of 45 sec hard / 75 sec easy, 5-min cooldown"
    };
  }
  if (safeWeek <= 6) {
    return {
      block: "Weeks 5-6",
      enduranceMinutes: 40,
      intervalMinutes: 26,
      intervalText: "5-min warmup, 8 rounds of 60 sec hard / 60 sec easy, 5-min cooldown"
    };
  }
  return {
    block: "Weeks 7-8",
    enduranceMinutes: 45,
    intervalMinutes: 30,
    intervalText: "5-min warmup, 10 rounds of 60 sec hard / 60 sec easy, 5-min cooldown"
  };
}

function personalExercise(exerciseKey, sets, targetReps, defaultReps, rest = 60, coachCue = "") {
  return { exerciseKey, sets, targetReps, defaultReps, rest, coachCue };
}

function generatePersonalWorkoutPlan(profile, coachProgram = null) {
  const signature = planSignature(profile, coachProgram);
  const schedule = [
    {
      id: "coach-mon-strength-a",
      weekday: 1,
      title: "Full Body A",
      focus: "Strength foundation + incline walk",
      estimatedMinutes: 45,
      kind: "strength",
      exercises: [
        personalExercise("goblet_squat", 3, "10-15", 12, 60, "Finish each set with about two good reps still available."),
        personalExercise("dumbbell_floor_press", 3, "10-15", 12, 60),
        personalExercise("one_arm_row", 3, "10-15 / side", 12, 60),
        personalExercise("dumbbell_rdl", 3, "10-15", 12, 60),
        personalExercise("ab_roller", 2, "5-10", 6, 45, "Use a short range at first. Stop before your lower back arches."),
        personalExercise("incline_treadmill", 1, "8-10 min", 10, 0, "Purposeful pace; do not hold the rails.")
      ]
    },
    {
      id: "coach-tue-endurance",
      weekday: 2,
      title: "Peloton Endurance",
      focus: "Build the aerobic base at RPE 5-6",
      estimatedMinutes: 30,
      kind: "cardio",
      adaptiveCardio: "endurance",
      exercises: [
        personalExercise("peloton_endurance", 1, "30 min", 30, 0, "You should breathe harder but still be able to speak in short sentences.")
      ]
    },
    {
      id: "coach-wed-strength-b",
      weekday: 3,
      title: "Full Body B",
      focus: "Single-leg strength, shoulders, and core",
      estimatedMinutes: 45,
      kind: "strength",
      exercises: [
        personalExercise("reverse_lunge", 3, "8-12 / leg", 10, 60, "Begin with bodyweight when needed; add dumbbells only when balance is solid."),
        personalExercise("dumbbell_shoulder_press", 3, "8-12", 10, 60),
        personalExercise("one_arm_row", 3, "10-15 / side", 12, 60),
        personalExercise("dumbbell_glute_bridge", 3, "12-20", 15, 60),
        personalExercise("dumbbell_curl", 2, "10-15", 12, 45),
        personalExercise("plank", 2, "30-45 sec", 30, 45),
        personalExercise("brisk_walk", 1, "5-10 min", 8, 0, "Keep this easy; it is a cooldown, not a test.")
      ]
    },
    {
      id: "coach-thu-intervals",
      weekday: 4,
      title: "Peloton Intervals",
      focus: "Controlled speed and cardiovascular capacity",
      estimatedMinutes: 26,
      kind: "cardio",
      adaptiveCardio: "intervals",
      exercises: [
        personalExercise("peloton_intervals", 1, "26 min", 26, 0, "Hard efforts are about RPE 8, not all-out sprints.")
      ]
    },
    {
      id: "coach-fri-recovery",
      weekday: 5,
      title: "Recovery Walk",
      focus: "Optional easy movement or complete rest",
      estimatedMinutes: 25,
      kind: "recovery",
      optional: true,
      exercises: [
        personalExercise("recovery_walk", 1, "20-30 min", 25, 0, "Skip this without guilt when recovery or life demands a full rest day.")
      ]
    },
    {
      id: "coach-sat-strength-c",
      weekday: 6,
      title: "Full Body C",
      focus: "Balanced strength volume + easy Peloton walk",
      estimatedMinutes: 50,
      kind: "strength",
      exercises: [
        personalExercise("dumbbell_front_squat", 3, "10-15", 12, 60),
        personalExercise("incline_pushup", 3, "Stop 2 reps before failure", 10, 60, "Lower the incline over time, then move to floor push-ups when ready."),
        personalExercise("dumbbell_rdl", 3, "12-15", 12, 60),
        personalExercise("one_arm_row", 3, "12-15 / side", 12, 60),
        personalExercise("dumbbell_lateral_raise", 2, "12-20", 15, 45, "Your 5-lb setting may be enough. Keep every rep controlled."),
        personalExercise("ab_roller", 2, "5-10", 6, 45),
        personalExercise("peloton_low_impact", 1, "10-15 min", 12, 0, "Keep the intensity easy after strength work.")
      ]
    }
  ];

  return {
    signature,
    programId: PERSONAL_PROGRAM_ID,
    generatedAt: new Date().toISOString(),
    schedule,
    fallback: {
      id: "coach-busy-day-fallback",
      weekday: -1,
      title: "10-Minute Minimum",
      focus: "Protect the habit on overloaded days",
      estimatedMinutes: 10,
      kind: "fallback",
      optional: true,
      exercises: [personalExercise("busy_day_10", 1, "10 min", 10, 0)]
    }
  };
}

function resolvePlanForCurrentWeek(plan, dateKey = localDateKey()) {
  if (!plan) return null;
  const resolved = {
    ...plan,
    exercises: (plan.exercises || []).map((item) => ({ ...item }))
  };
  if (!plan.adaptiveCardio) return resolved;
  const week = coachProgramWeek(dateFromKey(dateKey));
  const phase = cardioProgressionForWeek(week);
  resolved.coachWeek = week;
  resolved.phaseLabel = phase.block;
  if (plan.adaptiveCardio === "endurance") {
    resolved.estimatedMinutes = phase.enduranceMinutes;
    resolved.focus = `Aerobic base - Week ${week} - RPE 5-6`;
    resolved.exercises[0] = {
      ...resolved.exercises[0],
      targetReps: `${phase.enduranceMinutes} min`,
      defaultReps: phase.enduranceMinutes,
      coachCue: `Use a Peloton power walk, walk-run, or treadmill endurance class. Stay sustainable at RPE 5-6 for ${phase.enduranceMinutes} minutes.`
    };
  } else if (plan.adaptiveCardio === "intervals") {
    resolved.estimatedMinutes = phase.intervalMinutes;
    resolved.focus = `Intervals - Week ${week} - controlled hard efforts`;
    resolved.exercises[0] = {
      ...resolved.exercises[0],
      targetReps: `${phase.intervalMinutes} min`,
      defaultReps: phase.intervalMinutes,
      coachCue: `${phase.intervalText}. Hard efforts are about RPE 8, never an all-out sprint.`
    };
  }
  return resolved;
}

function programSummary(profile = state?.profile, workoutPlan = state?.workoutPlan) {
  if (profile?.programId === PERSONAL_PROGRAM_ID || workoutPlan?.programId === PERSONAL_PROGRAM_ID) {
    return "5 training days + optional Friday recovery";
  }
  return `${profile?.workoutDays?.length || 0} workout days`;
}

function generateWorkoutPlan(profile, coachProgram = null) {
  if (profile.programId === PERSONAL_PROGRAM_ID) return generatePersonalWorkoutPlan(profile, coachProgram);
  const days = [...new Set((profile.workoutDays || [1, 3, 5]).map(Number))].sort((a, b) => a - b).slice(0, 6);
  const count = clamp(days.length || 1, 1, 6);
  const templates = TEMPLATE_LIBRARY[count] || TEMPLATE_LIBRARY[3];
  const maxExercises = Number(profile.sessionMinutes) <= 20 ? 4 : Number(profile.sessionMinutes) <= 35 ? 5 : Number(profile.sessionMinutes) <= 50 ? 6 : 7;
  const schedule = days.map((weekday, index) => {
    const template = templates[index % templates.length];
    const usedKeys = new Set();
    let slots = [...template.slots];

    if (profile.goal === "mobility") {
      slots = [["mobility", 0], ["squat", 0], ["horizontal_pull", 0], ["single_leg", 0], ["core", 0], ["conditioning", 0]];
    }

    if (profile.goal === "fat_loss" && !slots.some(([pattern]) => pattern === "conditioning")) {
      slots.push(["conditioning", index]);
    }

    const exercises = slots.slice(0, maxExercises).map(([pattern, variant]) => {
      const exercise = getExercise(pattern, Number(variant) + index, profile, usedKeys);
      return {
        exerciseKey: exercise.key,
        ...prescriptionFor(exercise, profile)
      };
    });

    return {
      id: `plan-${weekday}-${index}`,
      weekday,
      title: template.title,
      focus: template.focus,
      estimatedMinutes: Number(profile.sessionMinutes) || 35,
      exercises
    };
  });

  return {
    signature: planSignature(profile, coachProgram),
    generatedAt: new Date().toISOString(),
    schedule
  };
}

function getExerciseByKey(key) {
  return EXERCISES.find((exercise) => exercise.key === key) || EXERCISES[0];
}

let state = null;
let currentView = "today";
let toastTimer = null;
let sessionTimer = null;
let restTimer = null;
let restRemaining = 0;
let wakeLock = null;
let onboardingStep = 0;

function migrateMealLogs(oldSchedule, newSchedule, logs) {
  const oldMeals = Array.isArray(oldSchedule) ? oldSchedule : [];
  Object.values(logs || {}).forEach((log) => {
    if (!log?.meals) return;
    const used = new Set();
    const nextMeals = {};
    const unmatched = [];

    // Match every meal by category first. Doing this as a complete first pass
    // prevents an old dinner from being consumed by a new snack slot merely
    // because the two happen to share the same array index.
    newSchedule.forEach((newMeal, index) => {
      const sourceIndex = oldMeals.findIndex((oldMeal, candidateIndex) => {
        return !used.has(candidateIndex)
          && oldMeal.category === newMeal.category
          && log.meals[oldMeal.id];
      });
      if (sourceIndex >= 0) {
        used.add(sourceIndex);
        nextMeals[newMeal.id] = { ...log.meals[oldMeals[sourceIndex].id] };
      } else {
        unmatched.push({ newMeal, index });
      }
    });

    // Only after all category matches are protected do we use a positional
    // fallback for unusual legacy schedules that did not store categories.
    unmatched.forEach(({ newMeal, index }) => {
      let sourceIndex = -1;
      const sameIndexMeal = oldMeals[index];
      if (sameIndexMeal && !used.has(index) && log.meals[sameIndexMeal.id]) {
        sourceIndex = index;
      }
      if (sourceIndex < 0) {
        sourceIndex = oldMeals.findIndex((oldMeal, candidateIndex) => {
          return !used.has(candidateIndex) && log.meals[oldMeal.id] && !oldMeal.category;
        });
      }
      if (sourceIndex >= 0) {
        used.add(sourceIndex);
        nextMeals[newMeal.id] = { ...log.meals[oldMeals[sourceIndex].id] };
      }
    });

    log.meals = nextMeals;
  });
}

function upgradeToPersonalProgram(merged, parsed = {}) {
  // Determine whether this was already the personalized build from the saved
  // source, not from defaults that deepMerge may have filled in around a
  // legacy state. This is what makes an in-place GitHub update migrate safely.
  const source = parsed && typeof parsed === "object" ? parsed : {};
  const oldSchedule = Array.isArray(source.mealSchedule)
    ? source.mealSchedule
    : (Array.isArray(merged.mealSchedule) ? merged.mealSchedule : []);
  const alreadyPersonal = source.profile?.programId === PERSONAL_PROGRAM_ID
    && source.workoutPlan?.programId === PERSONAL_PROGRAM_ID;
  const hasPersonalMeals = oldSchedule.some((meal) => meal.id === "meal-breakfast");

  merged.profile = {
    ...merged.profile,
    name: String(merged.profile?.name || "Nick").trim() || "Nick",
    programId: PERSONAL_PROGRAM_ID,
    goal: "fat_loss",
    workoutDays: [...PERSONAL_REQUIRED_DAYS],
    sessionMinutes: 45,
    dumbbellMax: clamp(Number(merged.profile?.dumbbellMax) || 25, 5, 200),
    equipment: [...new Set([...PERSONAL_REQUIRED_EQUIPMENT, ...(merged.profile?.equipment || [])])]
  };

  const existingStart = merged.coachProgram?.startDate;
  merged.coachProgram = {
    id: PERSONAL_PROGRAM_ID,
    version: PERSONAL_PROGRAM_VERSION,
    startDate: existingStart || localDateKey()
  };

  if (!alreadyPersonal || !hasPersonalMeals) {
    const personalMeals = createPersonalMealSchedule(merged.profile.proteinTarget || 150);
    migrateMealLogs(oldSchedule, personalMeals, merged.logs);
    merged.mealSchedule = personalMeals;
  }

  if (!alreadyPersonal) {
    merged.workoutPlan = generateWorkoutPlan(merged.profile, merged.coachProgram);
    merged.activeWorkout = null;
  }

  merged.onboardingComplete = true;
  merged.version = 2;
  return merged;
}

function loadState() {
  const defaults = createDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    const merged = upgradeToPersonalProgram(deepMerge(defaults, parsed), parsed);
    merged.version = 2;
    merged.appVersion = APP_VERSION;
    merged.profile.workoutDays = [...new Set((merged.profile.workoutDays || []).map(Number))].sort((a, b) => a - b);
    merged.profile.equipment = [...new Set(["bodyweight", ...(merged.profile.equipment || [])])];
    const expectedSignature = planSignature(merged.profile, merged.coachProgram);
    if (!merged.workoutPlan || merged.workoutPlan.signature !== expectedSignature) {
      merged.workoutPlan = generateWorkoutPlan(merged.profile, merged.coachProgram);
    }
    return merged;
  } catch (error) {
    console.error("Could not load saved data", error);
    return defaults;
  }
}

function saveState(options = {}) {
  const { render = true } = options;
  state.version = 2;
  state.appVersion = APP_VERSION;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Could not save data", error);
    showToast("Could not save. Your browser storage may be full.", true);
  }
  if (render) renderAll();
  updateAppBadge();
}

function applyTheme() {
  const theme = state?.profile?.theme || "auto";
  if (theme === "auto") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.dataset.theme = theme;
  }
}

function createDayLog() {
  return {
    morningComplete: false,
    eveningComplete: false,
    meals: {},
    water: 0,
    proteinExtra: 0,
    weight: null,
    energy: null,
    notes: "",
    timeOverrides: {},
    workout: null
  };
}

function getDayLog(dateKey = localDateKey(), create = true) {
  if (!state.logs[dateKey] && create) state.logs[dateKey] = createDayLog();
  return state.logs[dateKey] || createDayLog();
}

function getPlanById(planId, dateKey = localDateKey()) {
  const basePlan = state.workoutPlan.schedule.find((item) => item.id === planId)
    || (state.workoutPlan.fallback?.id === planId ? state.workoutPlan.fallback : null);
  return resolvePlanForCurrentWeek(basePlan, dateKey);
}

function getScheduledWorkout(dateKey = localDateKey()) {
  const date = dateFromKey(dateKey);
  const basePlan = state.workoutPlan.schedule.find((item) => item.weekday === date.getDay()) || null;
  return resolvePlanForCurrentWeek(basePlan, dateKey);
}

function getWorkoutForDate(dateKey = localDateKey()) {
  const log = getDayLog(dateKey, false);
  if (log?.workout?.planId) return getPlanById(log.workout.planId, dateKey) || getScheduledWorkout(dateKey);
  if (state.activeWorkout?.dateKey === dateKey) return getPlanById(state.activeWorkout.planId, dateKey) || getScheduledWorkout(dateKey);
  return getScheduledWorkout(dateKey);
}

function getMealLog(dateKey, mealId, create = true) {
  const log = getDayLog(dateKey, create);
  if (!log) return { complete: false, optionIndex: 0, note: "" };
  if (!log.meals[mealId]) {
    if (!create) return { complete: false, optionIndex: 0, note: "" };
    log.meals[mealId] = {
      complete: false,
      optionIndex: 0,
      note: ""
    };
  }
  return log.meals[mealId];
}

function getProteinTotal(dateKey = localDateKey()) {
  const log = getDayLog(dateKey, false);
  if (!log) return 0;
  const mealProtein = state.mealSchedule.reduce((total, meal) => {
    return total + (log.meals?.[meal.id]?.complete ? Number(meal.targetProtein || 0) : 0);
  }, 0);
  return Math.max(0, mealProtein + Number(log.proteinExtra || 0));
}

function getTaskTime(log, taskId, fallback) {
  return log.timeOverrides?.[taskId] || fallback;
}

function getTasks(dateKey = localDateKey(), create = true) {
  const log = getDayLog(dateKey, create);
  if (!log) return [];
  const tasks = [];
  const morningTime = addMinutesToTime(state.profile.wakeTime, 15);
  tasks.push({
    id: "morning",
    type: "morning",
    title: "Morning check-in",
    detail: log.weight ? `${log.weight} ${state.profile.weightUnit} logged` : "Log weight and set the day",
    time: getTaskTime(log, "morning", morningTime),
    complete: Boolean(log.morningComplete || log.weight),
    points: 10,
    icon: "scale"
  });

  state.mealSchedule.forEach((meal) => {
    const mealLog = getMealLog(dateKey, meal.id, create);
    const idea = getMealIdea(meal, mealLog.optionIndex);
    tasks.push({
      id: `meal:${meal.id}`,
      type: "meal",
      mealId: meal.id,
      title: meal.label,
      detail: mealLog.complete ? `${meal.targetProtein}g protein planned` : idea.name,
      time: getTaskTime(log, `meal:${meal.id}`, meal.time),
      complete: Boolean(mealLog.complete),
      points: 30 / Math.max(1, state.mealSchedule.length),
      icon: "food"
    });
  });

  const workout = getWorkoutForDate(dateKey);
  const active = state.activeWorkout?.dateKey === dateKey;
  const activePlan = active ? getPlanById(state.activeWorkout.planId) : null;
  const taskPlan = activePlan || workout;
  if (taskPlan || log.workout?.complete) {
    const completed = Boolean(log.workout?.complete);
    const completedKind = log.workout?.kind || "strength";
    const optional = completed ? Boolean(log.workout?.optional) : Boolean(taskPlan?.optional);
    const detail = completed
      ? `${log.workout.cardioMinutes ? `${log.workout.cardioMinutes} cardio min - ` : ""}${log.workout.durationMinutes || 0} session min completed`
      : optional
        ? `Optional - ${taskPlan?.estimatedMinutes || 25} min easy recovery`
        : `${taskPlan?.exercises?.length || 0} exercises - about ${taskPlan?.estimatedMinutes || state.profile.sessionMinutes} min`;
    const kind = completed ? completedKind : (taskPlan?.kind || "strength");
    tasks.push({
      id: "workout",
      type: "workout",
      planId: taskPlan?.id || log.workout?.planId,
      title: active ? `Resume ${activePlan?.title || "workout"}` : (taskPlan?.title || log.workout?.title || "Workout"),
      detail,
      time: getTaskTime(log, "workout", state.profile.workoutTime),
      complete: completed,
      optional,
      points: optional ? 0 : 35,
      icon: ["cardio", "recovery", "fallback"].includes(kind) ? "walk" : "dumbbell"
    });
  }

  const waterTime = addMinutesToTime(state.profile.bedTime, -90);
  tasks.push({
    id: "water",
    type: "water",
    title: "Water goal",
    detail: `${log.water || 0} of ${state.profile.waterTarget} oz`,
    time: getTaskTime(log, "water", waterTime),
    complete: Number(log.water || 0) >= Number(state.profile.waterTarget || 0),
    points: 15,
    icon: "water"
  });

  const eveningTime = addMinutesToTime(state.profile.bedTime, -30);
  tasks.push({
    id: "evening",
    type: "evening",
    title: "Evening check-in",
    detail: log.eveningComplete ? "Day reviewed" : "Record energy and close the day",
    time: getTaskTime(log, "evening", eveningTime),
    complete: Boolean(log.eveningComplete),
    points: 10,
    icon: "moon"
  });

  return tasks.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
}

function getDailyScore(dateKey = localDateKey()) {
  const isToday = dateKey === localDateKey();
  if (!isToday && !state.logs[dateKey]) return 0;
  const tasks = getTasks(dateKey, isToday);
  const totalPoints = tasks.reduce((sum, task) => sum + task.points, 0);
  const earned = tasks.reduce((sum, task) => sum + (task.complete ? task.points : 0), 0);
  return totalPoints ? Math.round((earned / totalPoints) * 100) : 0;
}

function getNextTask(dateKey = localDateKey()) {
  const required = getTasks(dateKey).filter((task) => !task.complete && !task.optional);
  if (!required.length) return null;
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  return required.find((task) => timeToMinutes(task.time) >= nowMinutes) || required[0];
}

function getStreak() {
  let streak = 0;
  let cursor = new Date();
  const todayScore = getDailyScore(localDateKey(cursor));
  if (todayScore < 80) cursor = addDays(cursor, -1);
  for (let i = 0; i < 365; i += 1) {
    const key = localDateKey(cursor);
    if (!state.logs[key] || getDailyScore(key) < 80) break;
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

function getMealIdea(meal, optionIndex = 0) {
  const category = meal.category || mealCategory(meal.label, 0, 1);
  const ideas = MEAL_IDEAS[category] || MEAL_IDEAS.snack;
  return ideas[Math.abs(Number(optionIndex) || 0) % ideas.length];
}

function getWeekDates(reference = new Date()) {
  const start = weekStart(reference);
  return Array.from({ length: 7 }, (_, index) => addDays(start, index));
}

function getCompletedWorkoutCount(days = 7) {
  let count = 0;
  for (let i = 0; i < days; i += 1) {
    const key = localDateKey(addDays(new Date(), -i));
    if (state.logs[key]?.workout?.complete) count += 1;
  }
  return count;
}

function getRecentWeightEntries(limit = 30) {
  return Object.entries(state.logs)
    .filter(([, log]) => log.weight !== null && log.weight !== undefined && log.weight !== "")
    .map(([dateKey, log]) => ({ dateKey, value: Number(log.weight) }))
    .filter((item) => Number.isFinite(item.value))
    .sort((a, b) => a.dateKey.localeCompare(b.dateKey))
    .slice(-limit);
}

function goalLabel(goal) {
  return {
    general: "General fitness",
    fat_loss: "Fat loss",
    muscle: "Build muscle",
    strength: "Get stronger",
    mobility: "Move better"
  }[goal] || "General fitness";
}

function levelLabel(level) {
  return {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced"
  }[level] || "Beginner";
}

function equipmentLabel(key) {
  return {
    bodyweight: "Bodyweight",
    dumbbells: "Dumbbells",
    bands: "Resistance bands",
    bench: "Bench",
    treadmill: "Treadmill",
    peloton: "Peloton classes",
    ab_roller: "Ab roller",
    barbell: "Barbell and rack",
    machines: "Gym machines",
    full_gym: "Full gym"
  }[key] || key;
}

function taskActionLabel(task) {
  if (!task) return "Review today";
  if (task.type === "workout") return state.activeWorkout ? "Resume workout" : task.optional ? "Start recovery" : "Start workout";
  if (task.type === "meal") return "Mark meal done";
  if (task.type === "morning") return "Log weight";
  if (task.type === "water") return "Add water";
  if (task.type === "evening") return "Check in";
  return "Complete";
}

function taskStatus(task) {
  if (task.complete) return "Done";
  if (task.optional) return "Optional";
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  return timeToMinutes(task.time) < nowMinutes ? "Overdue" : formatClock(task.time);
}

function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.toggle("error", isError);
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function updateOnlineStatus() {
  const indicator = document.getElementById("offlineIndicator");
  if (!indicator) return;
  indicator.classList.toggle("hidden", navigator.onLine);
}

async function updateAppBadge() {
  if (!("setAppBadge" in navigator)) return;
  try {
    const incomplete = getTasks(localDateKey()).filter((task) => !task.complete && !task.optional).length;
    if (incomplete > 0) await navigator.setAppBadge(incomplete);
    else if ("clearAppBadge" in navigator) await navigator.clearAppBadge();
  } catch (error) {
    // Badging is optional and may require permission on some devices.
  }
}

function renderAll() {
  if (!state) return;
  applyTheme();
  renderHeader();
  renderToday();
  renderWorkout();
  renderProgress();
  renderCoach();
  setActiveViewClasses();
  requestAnimationFrame(drawWeightChart);
}

function renderHeader() {
  const title = document.getElementById("pageTitle");
  const eyebrow = document.getElementById("eyebrow");
  const avatar = document.getElementById("avatarInitial");
  const name = String(state.profile.name || "").trim();
  const titles = {
    today: name ? `${getGreeting()}, ${name}.` : `${getGreeting()}.`,
    workout: "Train",
    progress: "Progress",
    coach: "Coach"
  };
  const eyebrows = {
    today: formatDate(new Date(), { weekday: "long", month: "long", day: "numeric" }).toUpperCase(),
    workout: `WEEK ${coachProgramWeek()} OF 8`,
    progress: "YOUR TREND, NOT ONE DAY",
    coach: "PERSONAL GUIDANCE"
  };
  title.textContent = titles[currentView] || "Momentum";
  eyebrow.textContent = eyebrows[currentView] || "MOMENTUM";
  avatar.textContent = name ? name.charAt(0).toUpperCase() : "M";
}

function setActiveViewClasses() {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.dataset.view === currentView);
  });
  document.querySelectorAll(".nav-item").forEach((item) => {
    const active = item.dataset.nav === currentView;
    item.classList.toggle("active", active);
    if (active) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
}

function renderToday() {
  const container = document.getElementById("todayContent");
  const dateKey = localDateKey();
  const log = getDayLog(dateKey);
  const score = getDailyScore(dateKey);
  const tasks = getTasks(dateKey);
  const requiredTasks = tasks.filter((task) => !task.optional);
  const scheduleTasks = tasks.filter((task) => task.type === "meal" || task.type === "workout");
  const basicTasks = tasks.filter((task) => ["morning", "water", "evening"].includes(task.type));
  const pendingOptional = tasks.find((task) => task.optional && !task.complete);
  const nextTask = getNextTask(dateKey);
  const protein = getProteinTotal(dateKey);
  const proteinTarget = Number(state.profile.proteinTarget || 1);
  const water = Number(log.water || 0);
  const waterTarget = Number(state.profile.waterTarget || 1);
  const streak = getStreak();
  const completeCount = requiredTasks.filter((task) => task.complete).length;
  const scoreLabel = score >= 85 ? "Excellent" : score >= 65 ? "Good momentum" : score >= 35 ? "Building" : "Start with one win";

  const hero = nextTask ? `
    <div class="dashboard-hero">
      <div class="dashboard-hero-top">
        <div>
          <p class="dashboard-kicker">YOUR NEXT MOVE</p>
          <h2>${escapeHtml(nextTask.title)}</h2>
          <p>${formatClock(nextTask.time)} - ${escapeHtml(nextTask.detail)}</p>
        </div>
        <div class="hero-score"><strong>${score}%</strong><span>today</span></div>
      </div>
      <div class="dashboard-hero-footer">
        <span>${icon("fire", "inline-icon")} ${streak} day streak</span>
        <span>${completeCount} of ${requiredTasks.length} complete</span>
      </div>
      <div class="hero-actions">
        <button class="button dashboard-primary" type="button" data-action="task-action" data-task-id="${escapeHtml(nextTask.id)}">
          ${icon(nextTask.type === "workout" ? "play" : "check", "button-icon")}
          ${taskActionLabel(nextTask)}
        </button>
        ${nextTask.type === "workout" ? `
          <button class="button dashboard-secondary" type="button" data-action="start-fallback">
            ${icon("bolt", "button-icon")} 10-min option
          </button>` : `
          <button class="button dashboard-secondary" type="button" data-action="run-reminders">
            ${icon("bell", "button-icon")} Reminders
          </button>`}
      </div>
    </div>` : `
    <div class="dashboard-hero day-finished">
      <div class="dashboard-hero-top">
        <div>
          <p class="dashboard-kicker">DAY COMPLETE</p>
          <h2>You closed the loop.</h2>
          <p>Everything required is done. Recovery and tomorrow's setup are the only jobs left.</p>
        </div>
        <div class="hero-score"><strong>${score}%</strong><span>today</span></div>
      </div>
      <div class="hero-actions">
        <button class="button dashboard-primary" type="button" data-action="show-checkin">${icon("moon", "button-icon")} Review the day</button>
      </div>
    </div>`;

  const schedule = scheduleTasks.map((task) => {
    const status = taskStatus(task);
    const overdue = status === "Overdue";
    return `
      <div class="schedule-row ${task.complete ? "done" : ""} ${task.optional ? "optional" : ""}">
        <div class="schedule-time">${formatClock(task.time)}</div>
        <button class="schedule-copy text-button-reset" type="button" data-action="task-action" data-task-id="${escapeHtml(task.id)}">
          <strong>${escapeHtml(task.title)}</strong>
          <span>${escapeHtml(task.detail)}</span>
        </button>
        <button class="schedule-check ${task.complete ? "done" : ""}" type="button" data-action="task-action" data-task-id="${escapeHtml(task.id)}" aria-label="${task.complete ? "Completed" : `Open ${escapeHtml(task.title)}`}">
          ${task.complete ? icon("check", "icon") : task.optional ? '<span>OPT</span>' : overdue ? '<span>!</span>' : ""}
        </button>
      </div>`;
  }).join("");

  const basics = basicTasks.map((task) => `
    <button class="basic-chip ${task.complete ? "done" : ""}" type="button" data-action="task-action" data-task-id="${escapeHtml(task.id)}">
      <span class="basic-chip-icon">${icon(task.type === "morning" ? "scale" : task.type === "water" ? "water" : "moon", "icon")}</span>
      <span><strong>${escapeHtml(task.title)}</strong><small>${task.complete ? "Done" : task.type === "water" ? `${Math.round(water)} / ${waterTarget} oz` : formatClock(task.time)}</small></span>
      ${task.complete ? icon("check", "chip-check") : ""}
    </button>`).join("");

  const optionalCallout = pendingOptional ? `
    <div class="optional-callout compact-callout">
      <span class="optional-callout-icon">${icon("walk", "icon")}</span>
      <div><strong>${escapeHtml(pendingOptional.title)} is optional</strong><span>Use it when easy movement helps. Skipping it never lowers your score.</span></div>
      <button class="button button-small button-ghost" type="button" data-action="task-action" data-task-id="${escapeHtml(pendingOptional.id)}">Open</button>
    </div>` : "";

  container.innerHTML = `
    <div class="stack dashboard-stack">
      ${hero}

      <section class="dashboard-section">
        <div class="section-head compact-head"><div><h2>Today at a glance</h2><p>${scoreLabel}</p></div></div>
        <div class="today-metrics">
          <button class="today-metric text-button-reset" type="button" data-nav="progress">
            <small>Score</small><strong>${score}%</strong><span>${scoreLabel}</span>
          </button>
          <button class="today-metric text-button-reset" type="button" data-action="open-coach-nutrition">
            <small>Protein</small><strong>${Math.round(protein)}g</strong><span>of ${proteinTarget}g</span>
          </button>
          <button class="today-metric text-button-reset" type="button" data-action="show-quick-log">
            <small>Water</small><strong>${Math.round(water)}oz</strong><span>of ${waterTarget}oz</span>
          </button>
        </div>
      </section>

      <section class="dashboard-section">
        <div class="section-head compact-head">
          <div><h2>Schedule</h2><p>Meals and training built around your day.</p></div>
          ${Object.keys(log.timeOverrides || {}).length ? '<button class="text-button" type="button" data-action="restore-schedule">Restore</button>' : ''}
        </div>
        <div class="schedule-card">${schedule || '<div class="empty-inline">No meal or workout items are scheduled today.</div>'}</div>
      </section>

      ${optionalCallout}

      <section class="dashboard-section">
        <div class="section-head compact-head"><div><h2>Daily basics</h2><p>The small actions that keep the plan honest.</p></div></div>
        <div class="basic-actions">${basics}</div>
      </section>

      <section class="dashboard-section">
        <div class="section-head compact-head"><div><h2>Quick actions</h2><p>One tap, then get back to your day.</p></div></div>
        <div class="dashboard-quick-grid">
          <button type="button" data-action="add-water" data-amount="16"><strong>+16 oz</strong><span>Log water</span></button>
          <button type="button" data-action="add-protein" data-amount="25"><strong>+25g</strong><span>Log protein</span></button>
          <button type="button" data-action="show-weight"><strong>${log.weight ? escapeHtml(log.weight) : "Weight"}</strong><span>${log.weight ? state.profile.weightUnit + " today" : "Log weigh-in"}</span></button>
          <button type="button" data-action="start-fallback"><strong>10 min</strong><span>Minimum workout</span></button>
        </div>
      </section>
    </div>`;
}

function renderWaterCard(dateKey = localDateKey()) {
  const log = getDayLog(dateKey);
  const water = Number(log.water || 0);
  const target = Number(state.profile.waterTarget || 1);
  const progress = clamp((water / target) * 100, 0, 100);
  return `
    <section class="section">
      <div class="card water-card">
        <div class="water-head">
          <div>
            <h3>Water</h3>
            <p>Small check-ins beat catching up at night.</p>
          </div>
          <span class="water-amount">${Math.round(water)} / ${target} oz</span>
        </div>
        <div class="progress-track" style="margin-top:12px"><span style="--progress:${progress}%"></span></div>
        <div class="water-buttons">
          <button class="water-button" type="button" data-action="add-water" data-amount="8">+8 oz</button>
          <button class="water-button" type="button" data-action="add-water" data-amount="16">+16 oz</button>
          <button class="water-button" type="button" data-action="add-water" data-amount="-8">-8 oz</button>
        </div>
      </div>
    </section>`;
}

function renderWorkout() {
  const container = document.getElementById("workoutContent");
  const dateKey = localDateKey();
  const log = getDayLog(dateKey);
  let workout = getWorkoutForDate(dateKey);
  let dayOffset = 0;
  let scheduledText = "Today's workout";

  if (!workout) {
    for (let offset = 1; offset <= 7; offset += 1) {
      const candidateDate = addDays(new Date(), offset);
      const candidate = state.workoutPlan.schedule.find((item) => item.weekday === candidateDate.getDay());
      if (candidate) {
        workout = resolvePlanForCurrentWeek(candidate, localDateKey(candidateDate));
        dayOffset = offset;
        scheduledText = `${DAY_SHORT[candidateDate.getDay()]}'s workout`;
        break;
      }
    }
  }

  const active = state.activeWorkout && (!workout || state.activeWorkout.planId === workout.id);
  const completed = Boolean(log.workout?.complete && workout);
  const preview = workout ? workout.exercises.map((item, index) => {
    const exercise = getExerciseByKey(item.exerciseKey);
    return `
      <div class="exercise-preview-row">
        <span class="exercise-number">${index + 1}</span>
        <span><strong>${escapeHtml(exercise.name)}</strong><span>${item.sets} set${item.sets === 1 ? "" : "s"} x ${escapeHtml(item.targetReps)}</span>${item.coachCue ? `<small class="exercise-coach-note">${escapeHtml(item.coachCue)}</small>` : ""}</span>
        <span>${item.rest ? `${item.rest}s` : ""}</span>
      </div>`;
  }).join("") : "";

  const weekDates = getWeekDates();
  const weekStrip = weekDates.map((date) => {
    const key = localDateKey(date);
    const plan = state.workoutPlan.schedule.find((item) => item.weekday === date.getDay());
    const planned = Boolean(plan);
    const optional = Boolean(plan?.optional);
    const done = Boolean(state.logs[key]?.workout?.complete);
    const today = key === dateKey;
    return `
      <button class="day-pill ${planned ? "workout-day" : ""} ${optional ? "optional" : ""} ${done ? "complete" : ""} ${today ? "today" : ""}" type="button" data-action="noop" aria-label="${DAY_SHORT[date.getDay()]}${done ? ", complete" : optional ? ", optional recovery" : planned ? ", workout planned" : ", rest day"}">
        <strong>${DAY_SHORT[date.getDay()].charAt(0)}</strong>
        <span></span>
      </button>`;
  }).join("");

  const weeklyPlan = state.workoutPlan.schedule.map((basePlan) => {
    const weekDate = weekDates.find((date) => date.getDay() === basePlan.weekday) || new Date();
    const plan = resolvePlanForCurrentWeek(basePlan, localDateKey(weekDate));
    const isToday = plan.weekday === new Date().getDay();
    const isActive = state.activeWorkout?.planId === plan.id;
    const iconName = plan.kind === "cardio" || plan.kind === "recovery" ? "walk" : "dumbbell";
    return `
      <div class="plan-day-card ${isToday || isActive ? "active" : ""} ${plan.optional ? "optional" : ""}">
        <div class="plan-day-label"><strong>${DAY_SHORT[plan.weekday]}</strong><span>${plan.estimatedMinutes} min</span></div>
        <div><h3>${escapeHtml(plan.title)} ${plan.optional ? '<span class="mini-label">OPTIONAL</span>' : ""}</h3><p>${escapeHtml(plan.focus)} - ${plan.exercises.length} exercise${plan.exercises.length === 1 ? "" : "s"}</p></div>
        <button class="icon-button soft" type="button" data-action="start-workout" data-plan-id="${escapeHtml(plan.id)}" aria-label="Start ${escapeHtml(plan.title)}">${icon(isActive ? "arrow" : iconName, "icon")}</button>
      </div>`;
  }).join("");

  const isCoachPlan = state.profile.programId === PERSONAL_PROGRAM_ID || state.workoutPlan.programId === PERSONAL_PROGRAM_ID;
  const coachWeek = coachProgramWeek();
  const cardioPhase = cardioProgressionForWeek(coachWeek);
  const coachCard = isCoachPlan ? `
    <div class="card coach-program-card">
      <div class="coach-program-head">
        <div>
          <span class="workout-badge">${icon("target", "icon")} 8-WEEK FAT-LOSS + CARDIO PLAN</span>
          <h2>Week ${coachWeek} of 8</h2>
          <p>${escapeHtml(cardioPhase.block)} - build consistency before intensity.</p>
        </div>
        <span class="coach-week-ring">${coachWeek}<small>/8</small></span>
      </div>
      <div class="coach-target-grid">
        <div><span>Tuesday</span><strong>${cardioPhase.enduranceMinutes} min</strong><small>Easy endurance - RPE 5-6</small></div>
        <div><span>Thursday</span><strong>${cardioPhase.intervalMinutes} min</strong><small>${escapeHtml(cardioPhase.intervalText)}</small></div>
      </div>
      <div class="progress-track"><span style="--progress:${Math.round((coachWeek / 8) * 100)}%"></span></div>
    </div>` : "";

  const fallback = state.workoutPlan.fallback ? resolvePlanForCurrentWeek(state.workoutPlan.fallback, dateKey) : null;
  const fallbackCard = fallback ? `
    <div class="card fallback-card">
      <span class="fallback-icon">${icon("bolt", "icon")}</span>
      <div><h3>10-Minute Minimum</h3><p>Work exploded? Any 10-minute Peloton class or treadmill walk protects the habit and counts as today's workout.</p></div>
      <button class="button button-small button-ghost" type="button" data-action="start-workout" data-plan-id="${escapeHtml(fallback.id)}">Start 10 min</button>
    </div>` : "";

  container.innerHTML = `
    <div class="stack">
      ${coachCard}
      ${workout ? `
        <div class="card workout-summary-card">
          <div class="workout-card-head">
            <div>
              <span class="workout-badge">${completed ? icon("check", "icon") : icon(workout.kind === "cardio" || workout.kind === "recovery" ? "walk" : "dumbbell", "icon")} ${completed ? "COMPLETED" : workout.optional ? "OPTIONAL RECOVERY" : escapeHtml(scheduledText.toUpperCase())}</span>
              <h2>${escapeHtml(workout.title)}</h2>
              <p>${escapeHtml(workout.focus)}</p>
            </div>
            ${dayOffset ? `<span class="badge">in ${dayOffset} day${dayOffset === 1 ? "" : "s"}</span>` : workout.phaseLabel ? `<span class="badge">${escapeHtml(workout.phaseLabel)}</span>` : ""}
          </div>
          <div class="workout-meta-row">
            <span class="info-chip">${icon("clock", "icon")} ${workout.estimatedMinutes} min</span>
            <span class="info-chip">${icon("list", "icon")} ${workout.exercises.length} exercise${workout.exercises.length === 1 ? "" : "s"}</span>
            <span class="info-chip">${icon("target", "icon")} ${workout.optional ? "Optional" : escapeHtml(goalLabel(state.profile.goal))}</span>
          </div>
          <button class="button button-block ${completed ? "button-ghost" : ""}" type="button" data-action="start-workout" data-plan-id="${escapeHtml(workout.id)}">
            ${icon(active ? "arrow" : completed ? "refresh" : "play", "button-icon")}
            ${active ? "Resume workout" : completed ? "Repeat workout" : dayOffset ? "Start early" : workout.optional ? "Start recovery walk" : "Start workout"}
          </button>
          <div class="exercise-preview">${preview}</div>
        </div>` : `
        <div class="card empty-state">
          <span class="empty-icon">${icon("moon", "icon")}</span>
          <h3>Full rest day</h3>
          <p>Recovery is part of the program. An easy walk is fine, but nothing is required today.</p>
        </div>`}

      <section class="section">
        <div class="section-head"><div><h2>This week</h2><p>Solid dots are planned, outlined dots are optional, and green dots are complete.</p></div></div>
        <div class="week-strip">${weekStrip}</div>
      </section>

      <section class="section">
        <div class="section-head">
          <div><h2>Your program</h2><p>${escapeHtml(programSummary())}</p></div>
          <button class="text-button" type="button" data-action="regenerate-plan">Reset plan</button>
        </div>
        <div class="week-plan-list">${weeklyPlan}</div>
      </section>

      ${fallbackCard}

      <div class="notice"><strong>Strength progression:</strong> finish most sets with about two clean reps left. Reach the top of the rep range on every set before increasing weight. When 25 lb is no longer challenging, slow the lowering phase, add pauses, or use single-leg variations.</div>
    </div>`;
}

function renderMeals() {
  const container = document.getElementById("mealsContent");
  const dateKey = localDateKey();
  const log = getDayLog(dateKey);
  const protein = getProteinTotal(dateKey);
  const target = Number(state.profile.proteinTarget || 1);
  const proteinProgress = clamp((protein / target) * 100, 0, 100);
  const completedMeals = state.mealSchedule.filter((meal) => log.meals?.[meal.id]?.complete).length;

  const mealCards = state.mealSchedule.map((meal) => {
    const mealLog = getMealLog(dateKey, meal.id);
    const idea = getMealIdea(meal, mealLog.optionIndex);
    return `
      <div class="card meal-card ${mealLog.complete ? "done" : ""}">
        <div class="meal-card-head">
          <div>
            <span class="meal-time">${formatClock(getTaskTime(log, `meal:${meal.id}`, meal.time))}</span>
            <h3>${escapeHtml(meal.label)}</h3>
            <p>${meal.targetProtein}g protein target</p>
          </div>
          <button class="check-button ${mealLog.complete ? "done" : ""}" type="button" data-action="toggle-meal" data-meal-id="${escapeHtml(meal.id)}" aria-label="${mealLog.complete ? "Mark meal incomplete" : "Mark meal complete"}">${mealLog.complete ? icon("check", "icon") : ""}</button>
        </div>
        <div class="meal-option">
          <strong>${escapeHtml(idea.name)}</strong>
          <p>${escapeHtml(idea.detail)}</p>
        </div>
        ${meal.coachNote ? `<p class="coach-note">${icon("spark", "icon")} <span>${escapeHtml(meal.coachNote)}</span></p>` : ""}
        <div class="meal-actions">
          <button class="button button-small button-ghost" type="button" data-action="cycle-meal-idea" data-meal-id="${escapeHtml(meal.id)}">${icon("refresh", "button-icon")} Another idea</button>
          <button class="button button-small button-ghost" type="button" data-action="meal-note" data-meal-id="${escapeHtml(meal.id)}">${icon("note", "button-icon")} ${mealLog.note ? "Edit note" : "Add note"}</button>
        </div>
        ${mealLog.note ? `<p class="inline-note" style="margin-top:10px"><strong>Note:</strong> ${escapeHtml(mealLog.note)}</p>` : ""}
      </div>`;
  }).join("");

  container.innerHTML = `
    <div class="stack">
      <div class="card protein-card">
        <div class="macro-head">
          <div><h3>Protein</h3><p>${completedMeals} of ${state.mealSchedule.length} meals complete</p></div>
          <span class="badge ${protein >= target ? "badge-success" : ""}">${protein >= target ? "Goal met" : `${Math.max(0, target - protein)}g left`}</span>
        </div>
        <div class="protein-value">${Math.round(protein)}g <small>/ ${target}g</small></div>
        <div class="progress-track"><span style="--progress:${proteinProgress}%"></span></div>
        <div class="water-buttons">
          <button class="water-button" type="button" data-action="add-protein" data-amount="10">+10g</button>
          <button class="water-button" type="button" data-action="add-protein" data-amount="25">+25g</button>
          <button class="water-button" type="button" data-action="add-protein" data-amount="-10">-10g</button>
        </div>
        <p class="inline-note" style="margin:10px 0 0">Quick adds are for protein outside your planned meals.</p>
      </div>

      <div class="card nutrition-system-card">
        <span class="workout-badge">${icon("fork", "icon")} YOUR SIMPLE FOOD SYSTEM</span>
        <div class="nutrition-rule-grid">
          <div><strong>Breakfast</strong><span>Protein yogurt is the automatic default.</span></div>
          <div><strong>Lunch</strong><span>Chicken + vegetables + one controlled carb.</span></div>
          <div><strong>Dinner</strong><span>Protein first, vegetables second, starch third.</span></div>
          <div><strong>Snacks</strong><span>Choose something with protein that takes under one minute.</span></div>
        </div>
      </div>

      <section class="section">
        <div class="section-head">
          <div><h2>Today's meals</h2><p>Repeat the easy defaults and rotate only when you need variety.</p></div>
          <button class="text-button" type="button" data-action="edit-meals">Edit schedule</button>
        </div>
        <div class="stack-tight">${mealCards}</div>
      </section>

      ${renderWaterCard(dateKey)}

      <div class="notice"><strong>Keep it practical:</strong> this schedule is a consistency tool, not medical nutrition advice. Adjust targets with a qualified professional when health conditions, medications, pregnancy, or eating-disorder concerns apply.</div>
    </div>`;
}

function renderProgress() {
  const container = document.getElementById("progressContent");
  const weekDates = getWeekDates();
  const scores = weekDates.map((date) => ({ date, key: localDateKey(date), score: getDailyScore(localDateKey(date)) }));
  const elapsedDays = scores.filter((item) => item.date <= new Date());
  const weeklyAverage = elapsedDays.length ? Math.round(elapsedDays.reduce((sum, item) => sum + item.score, 0) / elapsedDays.length) : 0;
  const completedThisWeek = scores.map((item) => state.logs[item.key]?.workout).filter((workout) => workout?.complete);
  const workouts = completedThisWeek.length;
  const cardioMinutes = completedThisWeek.reduce((sum, workout) => sum + Number(workout.cardioMinutes || 0), 0);
  const streak = getStreak();
  const weights = getRecentWeightEntries();
  const currentWeight = weights.length ? weights[weights.length - 1].value : state.profile.currentWeight;
  const coachWeek = coachProgramWeek();
  const cardioPhase = cardioProgressionForWeek(coachWeek);

  const bars = scores.map((item) => `
    <div class="bar-column">
      <span class="bar-value">${item.score}%</span>
      <div class="bar-track"><span class="bar-fill" style="--height:${item.score}%"></span></div>
      <span class="bar-label">${DAY_SHORT[item.date.getDay()].charAt(0)}</span>
    </div>`).join("");

  const workoutHistory = Object.entries(state.logs)
    .filter(([, log]) => log.workout?.complete)
    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
    .slice(0, 8)
    .map(([dateKey, log]) => {
      const date = dateFromKey(dateKey);
      const workout = log.workout;
      const cardio = ["cardio", "recovery", "fallback"].includes(workout.kind) || Number(workout.cardioMinutes || 0) > 0;
      const detailParts = [
        formatDate(date, { month: "short", day: "numeric" }),
        `${workout.durationMinutes || 0} session min`,
        workout.cardioMinutes ? `${workout.cardioMinutes} cardio min` : `${workout.exerciseLogs?.length || 0} exercises`
      ];
      return `
        <div class="history-row">
          <span class="history-icon">${icon(cardio ? "walk" : "dumbbell", "icon")}</span>
          <div><h3>${escapeHtml(workout.title || "Workout")}</h3><p>${detailParts.join(" - ")}</p></div>
          <span class="history-score">Done</span>
        </div>`;
    }).join("");

  container.innerHTML = `
    <div class="stack">
      <div class="card coach-progress-card">
        <div>
          <span class="workout-badge">${icon("target", "icon")} COACH PROGRAM</span>
          <h2>Week ${coachWeek} of 8</h2>
          <p>${escapeHtml(cardioPhase.block)} - Tuesday ${cardioPhase.enduranceMinutes}-minute endurance; Thursday ${cardioPhase.intervalMinutes}-minute intervals.</p>
        </div>
        <span class="coach-week-ring">${coachWeek}<small>/8</small></span>
      </div>

      <div class="metrics-grid four-up">
        <div class="metric-card">
          <span class="metric-icon">${icon("chart", "icon")}</span>
          <span class="metric-value">${weeklyAverage}%</span>
          <span class="metric-label">weekly average</span>
        </div>
        <div class="metric-card">
          <span class="metric-icon">${icon("dumbbell", "icon")}</span>
          <span class="metric-value">${workouts}</span>
          <span class="metric-label">sessions this week</span>
        </div>
        <div class="metric-card">
          <span class="metric-icon">${icon("walk", "icon")}</span>
          <span class="metric-value">${cardioMinutes}</span>
          <span class="metric-label">cardio min this week</span>
        </div>
        <div class="metric-card">
          <span class="metric-icon">${icon("fire", "icon")}</span>
          <span class="metric-value">${streak}</span>
          <span class="metric-label">day streak</span>
        </div>
      </div>

      <section class="section">
        <div class="section-head"><div><h2>Consistency</h2><p>Daily completion score for this week.</p></div></div>
        <div class="card chart-card"><div class="bar-chart">${bars}</div></div>
      </section>

      <section class="section">
        <div class="section-head">
          <div><h2>Weight trend</h2><p>${currentWeight ? `Latest: ${currentWeight} ${state.profile.weightUnit}` : "Log weight to start the chart."}</p></div>
          <button class="text-button" type="button" data-action="show-weight">Log</button>
        </div>
        <div class="card chart-card">
          ${weights.length >= 2 ? '<div class="chart-wrap"><canvas id="weightChart" aria-label="Weight trend chart"></canvas></div>' : `
            <div class="empty-state">
              <span class="empty-icon">${icon("scale", "icon")}</span>
              <h3>${weights.length === 1 ? "One entry logged" : "No weight entries yet"}</h3>
              <p>${weights.length === 1 ? "Log another day to see a trend line." : "Optional daily or weekly entries will appear here."}</p>
            </div>`}
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div><h2>Workout history</h2><p>Your most recent completed sessions.</p></div>
          <button class="text-button" type="button" data-action="export-csv">Export CSV</button>
        </div>
        ${workoutHistory ? `<div class="history-list">${workoutHistory}</div>` : `
          <div class="card empty-state"><span class="empty-icon">${icon("trophy", "icon")}</span><h3>Your first workout is waiting</h3><p>Completed sessions will build a useful history here.</p></div>`}
      </section>
    </div>`;
}
function getCoachRecommendation(dateKey = localDateKey()) {
  const tasks = getTasks(dateKey);
  const pending = tasks.filter((task) => !task.complete && !task.optional);
  const nextTask = getNextTask(dateKey);
  const log = getDayLog(dateKey);
  const proteinRemaining = Math.max(0, Number(state.profile.proteinTarget || 0) - getProteinTotal(dateKey));
  const waterRemaining = Math.max(0, Number(state.profile.waterTarget || 0) - Number(log.water || 0));
  const workoutTask = tasks.find((task) => task.type === "workout" && !task.optional);
  const hour = new Date().getHours();

  if (!pending.length) {
    return {
      eyebrow: "DAY COMPLETE",
      title: "You did enough today.",
      body: "The required plan is complete. Close the day, protect sleep, and let consistency do the work.",
      action: "show-checkin",
      label: "Review the day",
      icon: "moon"
    };
  }

  if (workoutTask && !workoutTask.complete && hour >= 19) {
    return {
      eyebrow: "PROTECT THE HABIT",
      title: "Do the 10-minute version.",
      body: "The ideal workout window has passed. A short Peloton class or treadmill walk is the best move now; it keeps the streak without stealing the evening.",
      action: "start-fallback",
      label: "Start 10-minute minimum",
      icon: "bolt"
    };
  }

  if (nextTask?.type === "workout") {
    return {
      eyebrow: "READY TO TRAIN",
      title: `${nextTask.title} is the next best move.`,
      body: `${nextTask.detail}. Finish with about two clean reps left on strength work. You can always use the 10-minute minimum if the day changes.`,
      action: "task-action",
      taskId: nextTask.id,
      label: "Start workout",
      icon: "play"
    };
  }

  if (proteinRemaining >= 45 && hour >= 15) {
    return {
      eyebrow: "MAKE DINNER EASIER",
      title: "Use an automatic protein snack.",
      body: `You have about ${Math.round(proteinRemaining)} grams of protein left. A ready-to-drink shake, Greek yogurt, jerky, or cottage cheese now keeps dinner from carrying the whole goal.`,
      action: "quick-protein",
      amount: 25,
      label: "Log a 25g protein snack",
      icon: "food"
    };
  }

  if (nextTask?.type === "meal") {
    return {
      eyebrow: "KEEP IT AUTOMATIC",
      title: nextTask.title,
      body: `${nextTask.detail}. Repeat the easy default instead of spending energy deciding what to eat.`,
      action: "task-action",
      taskId: nextTask.id,
      label: "Mark meal complete",
      icon: "check"
    };
  }

  return {
    eyebrow: "YOU ARE ON TRACK",
    title: nextTask ? nextTask.title : "Keep the next step small.",
    body: `${nextTask ? nextTask.detail + ". " : ""}${waterRemaining ? `${Math.round(waterRemaining)} ounces of water remain. ` : ""}Do the next useful action, not the perfect day.`,
    action: nextTask ? "task-action" : "show-checkin",
    taskId: nextTask?.id || "",
    label: nextTask ? taskActionLabel(nextTask) : "Review the day",
    icon: nextTask?.type === "water" ? "water" : "arrow"
  };
}

function renderCoach() {
  const container = document.getElementById("coachContent");
  if (!container) return;
  const dateKey = localDateKey();
  const log = getDayLog(dateKey);
  const recommendation = getCoachRecommendation(dateKey);
  const protein = getProteinTotal(dateKey);
  const proteinTarget = Number(state.profile.proteinTarget || 1);
  const proteinProgress = clamp((protein / proteinTarget) * 100, 0, 100);
  const coachWeek = coachProgramWeek();
  const cardioPhase = cardioProgressionForWeek(coachWeek);
  const nextMeal = state.mealSchedule[0];
  const backupText = state.settings.lastBackupAt ? `Last backup ${formatDate(new Date(state.settings.lastBackupAt), { month: "short", day: "numeric" })}` : "No backup created yet";
  const startDate = state.coachProgram?.startDate ? formatDate(dateFromKey(state.coachProgram.startDate), { month: "short", day: "numeric", year: "numeric" }) : "Not set";

  const actionData = recommendation.taskId ? ` data-task-id="${escapeHtml(recommendation.taskId)}"` : recommendation.amount ? ` data-amount="${recommendation.amount}"` : "";

  const mealRows = state.mealSchedule.map((meal) => {
    const mealLog = getMealLog(dateKey, meal.id);
    const idea = getMealIdea(meal, mealLog.optionIndex);
    return `
      <div class="coach-meal-row ${mealLog.complete ? "done" : ""}">
        <div class="coach-meal-time">${formatClock(getTaskTime(log, `meal:${meal.id}`, meal.time))}</div>
        <div class="coach-meal-copy">
          <strong>${escapeHtml(meal.label)}</strong>
          <span>${escapeHtml(idea.name)} - ${meal.targetProtein}g target</span>
          <small>${escapeHtml(idea.detail)}</small>
        </div>
        <div class="coach-meal-actions">
          <button class="mini-icon-button" type="button" data-action="cycle-meal-idea" data-meal-id="${escapeHtml(meal.id)}" aria-label="Show another idea">${icon("refresh", "icon")}</button>
          <button class="schedule-check ${mealLog.complete ? "done" : ""}" type="button" data-action="toggle-meal" data-meal-id="${escapeHtml(meal.id)}" aria-label="${mealLog.complete ? "Mark incomplete" : "Mark complete"}">${mealLog.complete ? icon("check", "icon") : ""}</button>
        </div>
      </div>`;
  }).join("");

  const weeklyPlan = state.workoutPlan.schedule.map((basePlan) => {
    const plan = resolvePlanForCurrentWeek(basePlan, dateKey);
    const cardio = plan.kind === "cardio" || plan.kind === "recovery";
    return `
      <div class="coach-plan-row ${plan.optional ? "optional" : ""}">
        <div class="coach-plan-day">${DAY_SHORT[plan.weekday].toUpperCase()}</div>
        <span class="coach-plan-icon">${icon(cardio ? "walk" : "dumbbell", "icon")}</span>
        <div><strong>${escapeHtml(plan.title)}</strong><span>${escapeHtml(plan.focus)} - ${plan.estimatedMinutes} min${plan.optional ? " - optional" : ""}</span></div>
        <button class="mini-icon-button" type="button" data-action="start-workout" data-plan-id="${escapeHtml(plan.id)}" aria-label="Start ${escapeHtml(plan.title)}">${icon("arrow", "icon")}</button>
      </div>`;
  }).join("");

  container.innerHTML = `
    <div class="stack coach-stack">
      <div class="coach-hero-card">
        <span class="coach-orb">${icon("spark", "icon")}</span>
        <p class="dashboard-kicker">${escapeHtml(recommendation.eyebrow)}</p>
        <h2>${escapeHtml(recommendation.title)}</h2>
        <p>${escapeHtml(recommendation.body)}</p>
        <button class="button coach-primary button-block" type="button" data-action="${escapeHtml(recommendation.action)}"${actionData}>
          ${icon(recommendation.icon, "button-icon")} ${escapeHtml(recommendation.label)}
        </button>
      </div>

      <section class="dashboard-section">
        <div class="section-head compact-head"><div><h2>Adjust today</h2><p>Keep the plan useful when real life changes.</p></div></div>
        <div class="coach-adjust-grid">
          <button type="button" data-action="show-reflow"><span>${icon("clock", "icon")}</span><strong>Running late</strong><small>Rebuild the rest of today</small></button>
          <button type="button" data-action="start-fallback"><span>${icon("bolt", "icon")}</span><strong>10-minute minimum</strong><small>Protect the workout habit</small></button>
          <button type="button" data-action="run-reminders"><span>${icon("bell", "icon")}</span><strong>Set reminders</strong><small>Send the plan to Shortcuts</small></button>
          <button type="button" data-action="show-checkin"><span>${icon("moon", "icon")}</span><strong>Close the day</strong><small>Energy, notes, and review</small></button>
        </div>
      </section>

      <section id="coachNutrition" class="dashboard-section">
        <div class="section-head compact-head">
          <div><h2>Your food system</h2><p>Automatic breakfast, chicken lunch, easy snacks, prepared dinner.</p></div>
          <button class="text-button" type="button" data-action="edit-meals">Edit</button>
        </div>
        <div class="coach-protein-card">
          <div><small>PROTEIN TODAY</small><strong>${Math.round(protein)}g <span>/ ${proteinTarget}g</span></strong></div>
          <span class="badge ${protein >= proteinTarget ? "badge-success" : ""}">${protein >= proteinTarget ? "Goal met" : `${Math.max(0, proteinTarget - protein)}g left`}</span>
          <div class="progress-track"><span style="--progress:${proteinProgress}%"></span></div>
          <div class="coach-protein-buttons">
            <button type="button" data-action="add-protein" data-amount="10">+10g</button>
            <button type="button" data-action="add-protein" data-amount="25">+25g</button>
            <button type="button" data-action="add-protein" data-amount="-10">-10g</button>
          </div>
        </div>
        <div class="coach-meal-list">${mealRows}</div>
        <div class="nutrition-rule-strip">
          <div><strong>Breakfast</strong><span>Protein yogurt + berries.</span></div>
          <div><strong>Lunch</strong><span>Chicken + vegetables + one carb.</span></div>
          <div><strong>Dinner</strong><span>Protein first, vegetables second, starch third.</span></div>
        </div>
      </section>

      <section class="dashboard-section">
        <div class="section-head compact-head">
          <div><h2>Your current plan</h2><p>Week ${coachWeek} of 8 - ${escapeHtml(cardioPhase.block)}.</p></div>
          <button class="text-button" type="button" data-action="regenerate-plan">Reset</button>
        </div>
        <div class="coach-program-summary">
          <div><small>TUESDAY ENDURANCE</small><strong>${cardioPhase.enduranceMinutes} min</strong><span>RPE 5-6</span></div>
          <div><small>THURSDAY INTERVALS</small><strong>${cardioPhase.intervalMinutes} min</strong><span>${escapeHtml(cardioPhase.intervalText)}</span></div>
        </div>
        <div class="coach-plan-list">${weeklyPlan}</div>
      </section>

      <details id="coachSettings" class="settings-disclosure dashboard-section">
        <summary>
          <span>${icon("settings", "icon")}</span>
          <span><strong>App and plan settings</strong><small>Targets, reminders, appearance, backup, and privacy</small></span>
          ${icon("chevron", "summary-chevron")}
        </summary>
        <div class="settings-disclosure-body">
          <div class="settings-card">
            <button class="setting-row" type="button" data-action="edit-profile">
              <span class="setting-row-copy"><strong>Profile, timing, and targets</strong><span>${escapeHtml(state.profile.name || "Add your name")} - ${state.profile.proteinTarget}g protein - dumbbells to ${state.profile.dumbbellMax || 25} ${state.profile.weightUnit}</span></span>
              <span class="setting-row-value">Edit ${icon("chevron", "chevron")}</span>
            </button>
            <button class="setting-row" type="button" data-action="edit-meals">
              <span class="setting-row-copy"><strong>Eating schedule</strong><span>${state.mealSchedule.length} eating times starting ${nextMeal ? formatClock(nextMeal.time) : "--"}</span></span>
              <span class="setting-row-value">Edit ${icon("chevron", "chevron")}</span>
            </button>
            <button class="setting-row" type="button" data-action="restart-coach-program">
              <span class="setting-row-copy"><strong>Restart cardio progression</strong><span>Started ${escapeHtml(startDate)}</span></span>
              <span class="setting-row-value">Restart ${icon("chevron", "chevron")}</span>
            </button>
            <button class="setting-row" type="button" data-action="reminder-guide">
              <span class="setting-row-copy"><strong>Apple Reminders shortcut</strong><span>${state.settings.shortcutConfigured ? "Connected" : "One-time setup required"}</span></span>
              <span class="setting-row-value">${state.settings.shortcutConfigured ? '<span class="badge badge-success">Ready</span>' : "Set up"} ${icon("chevron", "chevron")}</span>
            </button>
            <button class="setting-row" type="button" data-action="download-ics">
              <span class="setting-row-copy"><strong>Calendar fallback</strong><span>Download today's remaining plan as calendar events</span></span>
              <span class="setting-row-value">Download ${icon("download", "chevron")}</span>
            </button>
            <button class="setting-row" type="button" data-action="show-install">
              <span class="setting-row-copy"><strong>Home Screen app</strong><span>${isStandalone() ? "Installed on this device" : "Install from Safari"}</span></span>
              <span class="setting-row-value">How ${icon("chevron", "chevron")}</span>
            </button>
          </div>

          <div class="settings-subhead">Appearance</div>
          <div class="settings-card card-pad">
            <div class="segmented" aria-label="Appearance">
              <button type="button" class="${state.profile.theme === "auto" ? "active" : ""}" data-action="set-theme" data-theme="auto">Auto</button>
              <button type="button" class="${state.profile.theme === "light" ? "active" : ""}" data-action="set-theme" data-theme="light">Light</button>
              <button type="button" class="${state.profile.theme === "dark" ? "active" : ""}" data-action="set-theme" data-theme="dark">Dark</button>
            </div>
          </div>

          <div class="settings-subhead">Data and privacy</div>
          <div class="settings-card">
            <button class="setting-row" type="button" data-action="export-data">
              <span class="setting-row-copy"><strong>Back up all data</strong><span>${backupText}</span></span>
              <span class="setting-row-value">Export ${icon("download", "chevron")}</span>
            </button>
            <button class="setting-row" type="button" data-action="trigger-import">
              <span class="setting-row-copy"><strong>Restore a backup</strong><span>Import a Momentum JSON file</span></span>
              <span class="setting-row-value">Import ${icon("upload", "chevron")}</span>
            </button>
            <button class="setting-row" type="button" data-action="privacy-info">
              <span class="setting-row-copy"><strong>Privacy and storage</strong><span>Your entries stay in this browser</span></span>
              <span class="setting-row-value">Info ${icon("chevron", "chevron")}</span>
            </button>
            <button class="setting-row" type="button" data-action="reset-data">
              <span class="setting-row-copy"><strong class="text-danger">Reset Momentum</strong><span>Delete local logs and restore the coach plan</span></span>
              <span class="setting-row-value text-danger">Reset</span>
            </button>
          </div>
          <input id="importFile" class="hidden" type="file" accept="application/json,.json">
          <div class="notice"><strong>Momentum Coach ${APP_VERSION}</strong><br>This is a routine and fitness tracking tool, not medical advice. Stop an exercise that causes sharp pain, dizziness, chest pain, or unusual shortness of breath and seek appropriate care.</div>
        </div>
      </details>
    </div>`;
}

function showQuickLog() {
  const dateKey = localDateKey();
  const log = getDayLog(dateKey);
  const nextMeal = state.mealSchedule.find((meal) => !log.meals?.[meal.id]?.complete);
  const workout = getWorkoutForDate(dateKey) || getScheduledWorkout();
  openModal(`
    ${modalHeader("Quick log", "One tap, then get back to your day.")}
    <div class="modal-body">
      <div class="quick-log-grid">
        <button type="button" data-action="quick-water" data-amount="16"><span>${icon("water", "icon")}</span><strong>+16 oz</strong><small>Water</small></button>
        <button type="button" data-action="quick-protein" data-amount="25"><span>${icon("food", "icon")}</span><strong>+25g</strong><small>Protein</small></button>
        <button type="button" data-action="quick-weight"><span>${icon("scale", "icon")}</span><strong>${log.weight ? escapeHtml(log.weight) : "Weight"}</strong><small>Weigh-in</small></button>
        <button type="button" data-action="quick-next-meal" ${nextMeal ? `data-meal-id="${escapeHtml(nextMeal.id)}"` : "disabled"}><span>${icon("fork", "icon")}</span><strong>${nextMeal ? "Meal done" : "Meals done"}</strong><small>${nextMeal ? escapeHtml(nextMeal.label) : "All complete"}</small></button>
        <button type="button" data-action="quick-workout" ${workout ? `data-plan-id="${escapeHtml(workout.id)}"` : "disabled"}><span>${icon("dumbbell", "icon")}</span><strong>Workout</strong><small>${workout ? escapeHtml(workout.title) : "Rest day"}</small></button>
        <button type="button" data-action="start-fallback"><span>${icon("bolt", "icon")}</span><strong>10 min</strong><small>Minimum workout</small></button>
        <button type="button" data-action="quick-reflow"><span>${icon("clock", "icon")}</span><strong>Rebuild</strong><small>Move today's times</small></button>
        <button type="button" data-action="quick-checkin"><span>${icon("moon", "icon")}</span><strong>Check-in</strong><small>Close the day</small></button>
      </div>
    </div>
    <div class="modal-actions"><button class="button button-block button-ghost" type="button" data-action="close-modal">Close</button></div>
  `, { centered: false, focus: false });
}

function drawWeightChart() {
  const canvas = document.getElementById("weightChart");
  if (!canvas) return;
  const entries = getRecentWeightEntries(30);
  if (entries.length < 2) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const styles = getComputedStyle(document.documentElement);
  const primary = styles.getPropertyValue("--primary").trim();
  const accent = styles.getPropertyValue("--accent").trim();
  const grid = styles.getPropertyValue("--border").trim();
  const text = styles.getPropertyValue("--text-soft").trim();
  const width = rect.width;
  const height = rect.height;
  const pad = { top: 18, right: 16, bottom: 28, left: 42 };
  const values = entries.map((item) => item.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) { min -= 1; max += 1; }
  const rangePad = Math.max(0.8, (max - min) * 0.18);
  min -= rangePad;
  max += rangePad;

  ctx.clearRect(0, 0, width, height);
  ctx.font = "11px -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillStyle = text;
  ctx.strokeStyle = grid;
  ctx.lineWidth = 1;

  for (let i = 0; i <= 3; i += 1) {
    const y = pad.top + ((height - pad.top - pad.bottom) * (i / 3));
    const value = max - ((max - min) * (i / 3));
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    ctx.fillText(value.toFixed(1), 2, y + 4);
  }

  const points = entries.map((entry, index) => {
    const x = pad.left + ((width - pad.left - pad.right) * (index / (entries.length - 1)));
    const y = pad.top + ((max - entry.value) / (max - min)) * (height - pad.top - pad.bottom);
    return { x, y, entry };
  });

  const gradient = ctx.createLinearGradient(0, pad.top, 0, height - pad.bottom);
  gradient.addColorStop(0, `${primary}44`);
  gradient.addColorStop(1, `${accent}00`);
  ctx.beginPath();
  ctx.moveTo(points[0].x, height - pad.bottom);
  points.forEach((point) => ctx.lineTo(point.x, point.y));
  ctx.lineTo(points[points.length - 1].x, height - pad.bottom);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.strokeStyle = primary;
  ctx.lineWidth = 3;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.stroke();

  points.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = primary;
    ctx.fill();
  });

  const firstDate = dateFromKey(entries[0].dateKey);
  const lastDate = dateFromKey(entries[entries.length - 1].dateKey);
  ctx.fillStyle = text;
  ctx.textAlign = "left";
  ctx.fillText(formatDate(firstDate, { month: "short", day: "numeric" }), pad.left, height - 7);
  ctx.textAlign = "right";
  ctx.fillText(formatDate(lastDate, { month: "short", day: "numeric" }), width - pad.right, height - 7);
}

function openModal(content, options = {}) {
  const root = document.getElementById("modalRoot");
  const className = ["modal", options.centered ? "modal-centered" : "", options.full ? "modal-full" : ""].filter(Boolean).join(" ");
  root.innerHTML = `<div class="${className}" role="dialog" aria-modal="true">${content}</div>`;
  root.classList.add("open");
  document.body.style.overflow = "hidden";
  const firstInput = root.querySelector("input:not([type='hidden']), select, textarea, button");
  if (options.focus !== false && firstInput) setTimeout(() => firstInput.focus({ preventScroll: true }), 80);
}

function closeModal() {
  const root = document.getElementById("modalRoot");
  root.classList.remove("open");
  root.innerHTML = "";
  document.body.style.overflow = "";
  clearInterval(sessionTimer);
  sessionTimer = null;
  clearRestTimer(false);
  releaseWakeLock();
}

function modalHeader(title, subtitle = "", closeAction = "close-modal") {
  return `
    <div class="modal-head">
      <div><h2>${escapeHtml(title)}</h2>${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ""}</div>
      <button class="icon-button soft" type="button" data-action="${closeAction}" aria-label="Close">${icon("x", "icon")}</button>
    </div>`;
}

function showInstallGuide() {
  openModal(`
    ${modalHeader("Install on your iPhone", "Use Safari for the one-time setup.")}
    <div class="modal-body">
      <div class="onboarding-hero">
        <span class="onboarding-logo">${icon("spark", "icon")}</span>
        <h2>Make it feel like an app</h2>
        <p>Momentum will open full screen, keep working offline, and appear with its own icon.</p>
      </div>
      <ol class="list">
        <li class="list-row"><span class="list-number">1</span><div><h4>Open this page in Safari</h4><p>For the most reliable install, open the GitHub Pages link directly in Safari.</p></div></li>
        <li class="list-row"><span class="list-number">2</span><div><h4>Tap Share</h4><p>Use the square with the upward arrow in Safari.</p></div></li>
        <li class="list-row"><span class="list-number">3</span><div><h4>Tap Add to Home Screen</h4><p>If it is hidden, scroll down and use Edit Actions.</p></div></li>
        <li class="list-row"><span class="list-number">4</span><div><h4>Turn on Open as Web App</h4><p>Then tap Add. Launch Momentum from the new Home Screen icon.</p></div></li>
      </ol>
      <div class="notice notice-success" style="margin-top:16px"><strong>${isStandalone() ? "Momentum is already running as a Home Screen app on this device." : "After installation, open the Home Screen version before setting up reminders."}</strong></div>
    </div>
    <div class="modal-actions"><button class="button button-block" type="button" data-action="close-modal">Done</button></div>
  `, { centered: true, focus: false });
}

function profileFormHtml(profile, options = {}) {
  const prefix = options.prefix || "profile";
  const coachWeek = coachProgramWeek();
  return `
    <form id="${prefix}Form" class="form-grid" autocomplete="off">
      <div class="coach-form-summary">
        <span class="workout-badge">${icon("target", "icon")} COACH PROGRAM LOCKED IN</span>
        <h3>Fat loss + cardiovascular improvement</h3>
        <p>Week ${coachWeek} of 8. Monday, Wednesday, and Saturday strength; Tuesday and Thursday cardio; optional Friday recovery.</p>
        <div class="equipment-line"><span>Dumbbells 5-${Number(profile.dumbbellMax) || 25} lb</span><span>Treadmill</span><span>Peloton classes</span><span>Ab roller</span></div>
      </div>

      <div class="form-row-2">
        <div class="field"><label for="${prefix}-name">First name</label><input class="input" id="${prefix}-name" name="name" value="${escapeHtml(profile.name || "")}" placeholder="Optional"></div>
        <div class="field"><label for="${prefix}-level">Training experience</label><div class="select-wrap"><select class="select" id="${prefix}-level" name="fitnessLevel">
          <option value="beginner" ${profile.fitnessLevel === "beginner" ? "selected" : ""}>Beginner or returning</option>
          <option value="intermediate" ${profile.fitnessLevel === "intermediate" ? "selected" : ""}>Intermediate</option>
          <option value="advanced" ${profile.fitnessLevel === "advanced" ? "selected" : ""}>Advanced</option>
        </select></div></div>
      </div>

      <div class="form-row-2">
        <div class="field"><label for="${prefix}-workout-time">Usual workout time</label><input class="input" id="${prefix}-workout-time" name="workoutTime" type="time" value="${escapeHtml(profile.workoutTime)}"><p class="field-help">Used for daily reminders.</p></div>
        <div class="field"><label for="${prefix}-dumbbell-max">Maximum dumbbell per hand (${escapeHtml(profile.weightUnit || "lb")})</label><input class="input" id="${prefix}-dumbbell-max" name="dumbbellMax" type="number" min="5" max="200" step="5" value="${Number(profile.dumbbellMax) || 25}" inputmode="decimal"><p class="field-help">Momentum will never suggest more than this.</p></div>
      </div>

      <div class="form-row-2">
        <div class="field"><label for="${prefix}-wake">Wake time</label><input class="input" id="${prefix}-wake" name="wakeTime" type="time" value="${escapeHtml(profile.wakeTime)}"></div>
        <div class="field"><label for="${prefix}-bed">Bedtime</label><input class="input" id="${prefix}-bed" name="bedTime" type="time" value="${escapeHtml(profile.bedTime)}"></div>
      </div>

      <div class="form-row-2">
        <div class="field"><label for="${prefix}-protein">Daily protein target</label><input class="input" id="${prefix}-protein" name="proteinTarget" type="number" min="30" max="400" step="5" value="${Number(profile.proteinTarget) || 150}" inputmode="numeric"><p class="field-help">The current 150g starting target remains editable until body-size details are added.</p></div>
        <div class="field"><label for="${prefix}-water">Daily water target (oz)</label><input class="input" id="${prefix}-water" name="waterTarget" type="number" min="16" max="300" step="8" value="${Number(profile.waterTarget) || 80}" inputmode="numeric"></div>
      </div>

      <div class="form-row-2">
        <div class="field"><label for="${prefix}-current-weight">Current weight</label><input class="input" id="${prefix}-current-weight" name="currentWeight" type="number" min="0" step="0.1" value="${escapeHtml(profile.currentWeight || "")}" inputmode="decimal" placeholder="Optional"></div>
        <div class="field"><label for="${prefix}-target-weight">Target weight</label><input class="input" id="${prefix}-target-weight" name="targetWeight" type="number" min="0" step="0.1" value="${escapeHtml(profile.targetWeight || "")}" inputmode="decimal" placeholder="Optional"></div>
      </div>

      <div class="form-row-2">
        <div class="field"><label for="${prefix}-unit">Weight unit</label><div class="select-wrap"><select class="select" id="${prefix}-unit" name="weightUnit"><option value="lb" ${profile.weightUnit === "lb" ? "selected" : ""}>Pounds (lb)</option><option value="kg" ${profile.weightUnit === "kg" ? "selected" : ""}>Kilograms (kg)</option></select></div></div>
        <div class="field"><label for="${prefix}-shortcut-name">Reminder Shortcut name</label><input class="input" id="${prefix}-shortcut-name" name="reminderShortcutName" value="${escapeHtml(profile.reminderShortcutName || "Momentum Reminders")}" placeholder="Momentum Reminders"><p class="field-help">This must exactly match the Shortcut name on your iPhone.</p></div>
      </div>
    </form>`;
}

function readProfileForm(form) {
  const data = new FormData(form);
  return {
    ...state.profile,
    programId: PERSONAL_PROGRAM_ID,
    name: String(data.get("name") || "").trim(),
    goal: "fat_loss",
    fitnessLevel: String(data.get("fitnessLevel") || "beginner"),
    workoutDays: [...PERSONAL_REQUIRED_DAYS],
    sessionMinutes: 45,
    dumbbellMax: clamp(data.get("dumbbellMax") || state.profile.dumbbellMax || 25, 5, 200),
    equipment: [...PERSONAL_REQUIRED_EQUIPMENT],
    wakeTime: String(data.get("wakeTime") || "06:30"),
    bedTime: String(data.get("bedTime") || "22:30"),
    workoutTime: String(data.get("workoutTime") || "17:30"),
    proteinTarget: clamp(data.get("proteinTarget"), 30, 400),
    waterTarget: clamp(data.get("waterTarget"), 16, 300),
    currentWeight: data.get("currentWeight") === "" ? "" : Number(data.get("currentWeight")),
    targetWeight: data.get("targetWeight") === "" ? "" : Number(data.get("targetWeight")),
    weightUnit: String(data.get("weightUnit") || "lb"),
    reminderShortcutName: String(data.get("reminderShortcutName") || "Momentum Reminders").trim() || "Momentum Reminders"
  };
}

function showProfileEditor() {
  openModal(`
    ${modalHeader("Profile and targets", "The coach program stays intact while you adjust timing and goals.")}
    <div class="modal-body">${profileFormHtml(state.profile, { prefix: "edit" })}</div>
    <div class="modal-actions">
      <button class="button button-ghost" type="button" data-action="close-modal">Cancel</button>
      <button class="button" type="button" data-action="save-profile">Save changes</button>
    </div>
  `, { full: true, focus: false });
}

function showOnboarding() {
  onboardingStep = 0;
  const draft = { ...state.profile };
  const mealCount = state.mealSchedule.length || 4;
  openModal(`
    <div class="modal-head">
      <div><h2>Set up Momentum</h2><p>Your answers stay on this device.</p></div>
      <button class="text-button" type="button" data-action="onboarding-skip">Use defaults</button>
    </div>
    <div class="modal-body">
      <div class="step-dots"><span class="step-dot active" data-step-dot="0"></span><span class="step-dot" data-step-dot="1"></span><span class="step-dot" data-step-dot="2"></span></div>
      <form id="onboardingForm" class="form-grid" autocomplete="off">
        <div data-onboarding-panel="0">
          <div class="onboarding-hero">
            <span class="onboarding-logo">${icon("spark", "icon")}</span>
            <h2>Do the next right thing</h2>
            <p>Momentum builds a realistic workout and eating rhythm, then keeps today's next action obvious.</p>
          </div>
          <div class="form-grid">
            <div class="field"><label for="onboard-name">First name</label><input class="input" id="onboard-name" name="name" value="${escapeHtml(draft.name || "")}" placeholder="Optional"></div>
            <div class="field"><label for="onboard-goal">Primary goal</label><div class="select-wrap"><select class="select" id="onboard-goal" name="goal">
              <option value="general" ${draft.goal === "general" ? "selected" : ""}>Build a consistent fitness routine</option>
              <option value="fat_loss" ${draft.goal === "fat_loss" ? "selected" : ""}>Lose body fat</option>
              <option value="muscle" ${draft.goal === "muscle" ? "selected" : ""}>Build muscle</option>
              <option value="strength" ${draft.goal === "strength" ? "selected" : ""}>Get stronger</option>
              <option value="mobility" ${draft.goal === "mobility" ? "selected" : ""}>Move and feel better</option>
            </select></div></div>
            <div class="field"><label for="onboard-level">Training experience</label><div class="select-wrap"><select class="select" id="onboard-level" name="fitnessLevel"><option value="beginner" ${draft.fitnessLevel === "beginner" ? "selected" : ""}>Beginner or returning</option><option value="intermediate" ${draft.fitnessLevel === "intermediate" ? "selected" : ""}>Intermediate</option><option value="advanced" ${draft.fitnessLevel === "advanced" ? "selected" : ""}>Advanced</option></select></div></div>
          </div>
        </div>

        <div data-onboarding-panel="1" class="hidden">
          <div class="section-head"><div><h2>Build your workout week</h2><p>Everything remains editable later.</p></div></div>
          <div class="form-grid">
            <div class="field"><span class="field-label">Workout days</span><div class="day-choice-grid">${DAY_SHORT.map((day, index) => `<span class="choice day-choice"><input id="onboard-day-${index}" type="checkbox" name="workoutDays" value="${index}" ${(draft.workoutDays || []).includes(index) ? "checked" : ""}><label for="onboard-day-${index}">${day}</label></span>`).join("")}</div></div>
            <div class="form-row-2">
              <div class="field"><label for="onboard-duration">Session length</label><div class="select-wrap"><select class="select" id="onboard-duration" name="sessionMinutes">${[20, 30, 35, 45, 60].map((minutes) => `<option value="${minutes}" ${Number(draft.sessionMinutes) === minutes ? "selected" : ""}>${minutes} minutes</option>`).join("")}</select></div></div>
              <div class="field"><label for="onboard-workout-time">Workout time</label><input class="input" id="onboard-workout-time" type="time" name="workoutTime" value="${escapeHtml(draft.workoutTime)}"></div>
            </div>
            <div class="field"><span class="field-label">Equipment</span><div class="choice-grid">${["bodyweight", "dumbbells", "treadmill", "peloton", "ab_roller", "bands", "bench", "barbell", "machines", "full_gym"].map((item) => `<span class="choice"><input id="onboard-equipment-${item}" type="checkbox" name="equipment" value="${item}" ${(draft.equipment || []).includes(item) ? "checked" : ""} ${item === "bodyweight" ? "disabled" : ""}><label for="onboard-equipment-${item}">${escapeHtml(equipmentLabel(item))}</label></span>`).join("")}</div></div>
          </div>
        </div>

        <div data-onboarding-panel="2" class="hidden">
          <div class="section-head"><div><h2>Set your daily rhythm</h2><p>We will spread meals between wake-up and bedtime.</p></div></div>
          <div class="form-grid">
            <div class="form-row-2"><div class="field"><label for="onboard-wake">Wake time</label><input class="input" id="onboard-wake" type="time" name="wakeTime" value="${escapeHtml(draft.wakeTime)}"></div><div class="field"><label for="onboard-bed">Bedtime</label><input class="input" id="onboard-bed" type="time" name="bedTime" value="${escapeHtml(draft.bedTime)}"></div></div>
            <div class="field"><label for="onboard-meals">Meals and planned snacks</label><div class="select-wrap"><select class="select" id="onboard-meals" name="mealCount">${[3, 4, 5, 6].map((count) => `<option value="${count}" ${mealCount === count ? "selected" : ""}>${count} eating times</option>`).join("")}</select></div></div>
            <div class="form-row-2"><div class="field"><label for="onboard-protein">Protein target (g)</label><input class="input" id="onboard-protein" type="number" name="proteinTarget" min="30" max="400" step="5" value="${draft.proteinTarget}"></div><div class="field"><label for="onboard-water">Water target (oz)</label><input class="input" id="onboard-water" type="number" name="waterTarget" min="16" max="300" step="8" value="${draft.waterTarget}"></div></div>
            <div class="form-row-2"><div class="field"><label for="onboard-current-weight">Current weight</label><input class="input" id="onboard-current-weight" type="number" name="currentWeight" min="0" step="0.1" value="${escapeHtml(draft.currentWeight || "")}" placeholder="Optional"></div><div class="field"><label for="onboard-unit">Unit</label><div class="select-wrap"><select class="select" id="onboard-unit" name="weightUnit"><option value="lb" ${draft.weightUnit === "lb" ? "selected" : ""}>lb</option><option value="kg" ${draft.weightUnit === "kg" ? "selected" : ""}>kg</option></select></div></div></div>
          </div>
          <div class="notice" style="margin-top:15px">Momentum is designed for consistency and general wellness. It does not diagnose conditions or replace individualized medical, nutrition, or exercise advice.</div>
        </div>
      </form>
    </div>
    <div class="modal-actions">
      <button id="onboardingBack" class="button button-ghost hidden" type="button" data-action="onboarding-back">Back</button>
      <button id="onboardingNext" class="button" type="button" data-action="onboarding-next">Continue</button>
      <button id="onboardingFinish" class="button hidden" type="button" data-action="onboarding-finish">Build my plan</button>
    </div>
  `, { full: true, focus: false });
}

function updateOnboardingStep(step) {
  onboardingStep = clamp(step, 0, 2);
  document.querySelectorAll("[data-onboarding-panel]").forEach((panel) => panel.classList.toggle("hidden", Number(panel.dataset.onboardingPanel) !== onboardingStep));
  document.querySelectorAll("[data-step-dot]").forEach((dot) => dot.classList.toggle("active", Number(dot.dataset.stepDot) === onboardingStep));
  document.getElementById("onboardingBack")?.classList.toggle("hidden", onboardingStep === 0);
  document.getElementById("onboardingNext")?.classList.toggle("hidden", onboardingStep === 2);
  document.getElementById("onboardingFinish")?.classList.toggle("hidden", onboardingStep !== 2);
  document.querySelector(".modal-body")?.scrollTo({ top: 0, behavior: "smooth" });
}

function finishOnboarding(useDefaults = false) {
  if (!useDefaults) {
    const form = document.getElementById("onboardingForm");
    const data = new FormData(form);
    const days = data.getAll("workoutDays").map(Number).sort((a, b) => a - b);
    if (!days.length) {
      updateOnboardingStep(1);
      showToast("Choose at least one workout day.", true);
      return;
    }
    const equipment = [...new Set(["bodyweight", ...data.getAll("equipment")])];
    state.profile = {
      ...state.profile,
      name: String(data.get("name") || "").trim(),
      goal: String(data.get("goal") || "general"),
      fitnessLevel: String(data.get("fitnessLevel") || "beginner"),
      workoutDays: days,
      sessionMinutes: Number(data.get("sessionMinutes") || 35),
      workoutTime: String(data.get("workoutTime") || "17:30"),
      equipment,
      wakeTime: String(data.get("wakeTime") || "06:30"),
      bedTime: String(data.get("bedTime") || "22:30"),
      proteinTarget: clamp(data.get("proteinTarget"), 30, 400),
      waterTarget: clamp(data.get("waterTarget"), 16, 300),
      currentWeight: data.get("currentWeight") === "" ? "" : Number(data.get("currentWeight")),
      weightUnit: String(data.get("weightUnit") || "lb")
    };
    state.mealSchedule = generateMealSchedule(state.profile.wakeTime, state.profile.bedTime, Number(data.get("mealCount") || 4), state.profile.proteinTarget);
  }
  state.profile = {
    ...state.profile,
    programId: PERSONAL_PROGRAM_ID,
    goal: "fat_loss",
    workoutDays: [...PERSONAL_REQUIRED_DAYS],
    sessionMinutes: 45,
    equipment: [...PERSONAL_REQUIRED_EQUIPMENT]
  };
  state.coachProgram = state.coachProgram || { id: PERSONAL_PROGRAM_ID, version: PERSONAL_PROGRAM_VERSION, startDate: localDateKey() };
  state.mealSchedule = createPersonalMealSchedule(state.profile.proteinTarget);
  state.workoutPlan = generateWorkoutPlan(state.profile, state.coachProgram);
  state.onboardingComplete = true;
  if (state.profile.currentWeight) {
    const log = getDayLog(localDateKey());
    log.weight = Number(state.profile.currentWeight);
    log.morningComplete = true;
  }
  saveState({ render: false });
  closeModal();
  renderAll();
  showToast("Your Momentum plan is ready.");
}

function showWeightModal() {
  const log = getDayLog(localDateKey());
  openModal(`
    ${modalHeader("Log weight", "Use the same conditions when practical.")}
    <div class="modal-body">
      <div class="field"><label for="weightInput">Weight (${escapeHtml(state.profile.weightUnit)})</label><input class="input" id="weightInput" type="number" min="0" step="0.1" value="${escapeHtml(log.weight ?? state.profile.currentWeight ?? "")}" inputmode="decimal" placeholder="0.0"></div>
      <p class="inline-note">The trend matters more than any single day.</p>
    </div>
    <div class="modal-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button><button class="button" type="button" data-action="save-weight">Save</button></div>
  `, { centered: true });
}

function showCheckinModal() {
  const log = getDayLog(localDateKey());
  openModal(`
    ${modalHeader("Evening check-in", "Close the loop without overthinking it.")}
    <div class="modal-body">
      <div class="field">
        <span class="field-label">Energy today</span>
        <div class="segmented">${[1, 2, 3, 4, 5].map((value) => `<button type="button" class="${Number(log.energy) === value ? "active" : ""}" data-action="select-energy" data-value="${value}">${value}</button>`).join("")}</div>
        <p class="field-help">1 = drained, 5 = excellent</p>
      </div>
      <div class="field" style="margin-top:14px"><label for="checkinNotes">What helped or got in the way?</label><textarea class="textarea" id="checkinNotes" placeholder="Optional note">${escapeHtml(log.notes || "")}</textarea></div>
      <input id="checkinEnergy" type="hidden" value="${escapeHtml(log.energy || "")}">
    </div>
    <div class="modal-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button><button class="button" type="button" data-action="save-checkin">Complete day</button></div>
  `, { centered: true, focus: false });
}

function showReflowModal() {
  openModal(`
    ${modalHeader("Rebuild the rest of today", "Keep the plan; move the timing.")}
    <div class="modal-body">
      <div class="field"><label for="reflowDelay">When should the next item happen?</label><div class="select-wrap"><select class="select" id="reflowDelay"><option value="15">In 15 minutes</option><option value="30" selected>In 30 minutes</option><option value="60">In 1 hour</option><option value="90">In 90 minutes</option></select></div></div>
      <div class="notice" style="margin-top:14px">Incomplete meals will be spaced about three hours apart. The workout and evening check-in will move with the rest of the day.</div>
    </div>
    <div class="modal-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button><button class="button" type="button" data-action="apply-reflow">Rebuild today</button></div>
  `, { centered: true, focus: false });
}

function mealEditorRow(meal) {
  return `
    <div class="meal-editor-row" data-meal-editor-row data-meal-id="${escapeHtml(meal.id || uid("meal"))}">
      <div class="field"><label>Label</label><input class="input" data-field="label" value="${escapeHtml(meal.label || "Meal")}"></div>
      <div class="field"><label>Time</label><input class="input" data-field="time" type="time" value="${escapeHtml(meal.time || "12:00")}"></div>
      <div class="field"><label>Protein</label><input class="input" data-field="protein" type="number" min="0" max="150" step="5" value="${Number(meal.targetProtein || 25)}"></div>
      <button class="icon-button soft" type="button" data-action="remove-meal-row" aria-label="Remove meal">${icon("trash", "icon")}</button>
    </div>`;
}

function showMealEditor() {
  openModal(`
    ${modalHeader("Eating schedule", "Set times and protein targets that fit your day.")}
    <div class="modal-body">
      <div id="mealEditorRows">${state.mealSchedule.map(mealEditorRow).join("")}</div>
      <button class="button button-ghost button-block" style="margin-top:13px" type="button" data-action="add-meal-row">${icon("plus", "button-icon")} Add eating time</button>
      <div class="notice" style="margin-top:14px">Changing a label also changes the meal ideas Momentum suggests. Use words such as breakfast, lunch, snack, dinner, or evening.</div>
    </div>
    <div class="modal-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button><button class="button" type="button" data-action="save-meals">Save schedule</button></div>
  `, { full: true, focus: false });
}

function showMealNote(mealId) {
  const meal = state.mealSchedule.find((item) => item.id === mealId);
  if (!meal) return;
  const mealLog = getMealLog(localDateKey(), mealId);
  openModal(`
    ${modalHeader(`${meal.label} note`, "Use this for what you actually ate or a simple plan.")}
    <div class="modal-body"><div class="field"><label for="mealNoteInput">Note</label><textarea class="textarea" id="mealNoteInput" placeholder="Example: leftover chicken and rice">${escapeHtml(mealLog.note || "")}</textarea></div><input type="hidden" id="mealNoteId" value="${escapeHtml(mealId)}"></div>
    <div class="modal-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button><button class="button" type="button" data-action="save-meal-note">Save</button></div>
  `, { centered: true });
}

function showReminderGuide() {
  const shortcutName = state.profile.reminderShortcutName || "Momentum Reminders";
  const sample = buildReminderPayload(localDateKey());
  openModal(`
    ${modalHeader("Apple Reminders setup", "A one-time Shortcut makes native iPhone alerts reliable.")}
    <div class="modal-body">
      <div class="notice notice-warning"><strong>Why a Shortcut?</strong> A static GitHub Pages app cannot schedule future iPhone alerts by itself while closed. Momentum copies today's plan to your clipboard, then your Shortcut creates real Apple Reminders.</div>
      <ol class="list" style="margin-top:14px">
        <li class="list-row"><span class="list-number">1</span><div><h4>Create a new Shortcut</h4><p>Open Shortcuts, tap +, and name it exactly <strong>${escapeHtml(shortcutName)}</strong>.</p></div></li>
        <li class="list-row"><span class="list-number">2</span><div><h4>Parse the clipboard input</h4><p>Add <strong>Get Dictionary from Input</strong>. The input arrives as JSON from Momentum.</p></div></li>
        <li class="list-row"><span class="list-number">3</span><div><h4>Get the items list</h4><p>Add <strong>Get Dictionary Value</strong>, enter the key <strong>items</strong>, then add <strong>Repeat with Each</strong> using that value.</p></div></li>
        <li class="list-row"><span class="list-number">4</span><div><h4>Inside the Repeat block</h4><p>From Repeat Item, get dictionary values for <strong>title</strong>, <strong>due</strong>, and <strong>notes</strong>. Run <strong>Get Dates from Input</strong> on the due value.</p></div></li>
        <li class="list-row"><span class="list-number">5</span><div><h4>Add the reminder</h4><p>Add <strong>Add New Reminder</strong>. Use title as the reminder name, choose your preferred list, use the parsed date for the alert, and add notes.</p></div></li>
        <li class="list-row"><span class="list-number">6</span><div><h4>Save and test</h4><p>Return here, mark setup complete, then tap Create today's reminders.</p></div></li>
      </ol>
      <details style="margin-top:14px">
        <summary class="text-button" style="cursor:pointer">See the data Momentum sends</summary>
        <pre class="code-block">${escapeHtml(JSON.stringify(sample, null, 2))}</pre>
      </details>
      <div class="notice" style="margin-top:14px"><strong>Shortcut name:</strong> ${escapeHtml(shortcutName)}<br>You can change this name in Profile and plan if you already use a different Shortcut.</div>
    </div>
    <div class="modal-actions">
      <button class="button button-ghost" type="button" data-action="open-shortcuts">Open Shortcuts</button>
      <button class="button" type="button" data-action="shortcut-ready">I built it</button>
    </div>
  `, { full: true, focus: false });
}

function showPrivacyInfo() {
  openModal(`
    ${modalHeader("Privacy and storage", "What is public and what stays private.")}
    <div class="modal-body">
      <div class="stack-tight">
        <div class="notice notice-success"><strong>Your entries are not committed to GitHub.</strong> Workout logs, weight, meal checkmarks, notes, and settings are stored in this browser's local storage on this device.</div>
        <div class="notice"><strong>The website code and plan templates are public.</strong> GitHub Pages sites are publicly reachable. The workout and meal templates are in the repository, but your weight, completion history, notes, and other entries are not.</div>
        <div class="notice"><strong>Local data can be lost.</strong> Clearing Safari website data, changing the site address, or removing browser storage may erase your history. Use Back up all data regularly and save the JSON file in iCloud Drive.</div>
        <div class="notice"><strong>No analytics are included.</strong> This build has no tracker, advertising script, external font, sign-in, or server database.</div>
      </div>
    </div>
    <div class="modal-actions"><button class="button button-block" type="button" data-action="close-modal">Done</button></div>
  `, { centered: true, focus: false });
}

let pendingConfirm = null;

function showConfirm(title, message, confirmLabel, callback, options = {}) {
  pendingConfirm = callback;
  openModal(`
    ${modalHeader(title, "")}
    <div class="modal-body"><p style="margin:0;color:var(--text-soft)">${escapeHtml(message)}</p></div>
    <div class="modal-actions"><button class="button button-ghost" type="button" data-action="close-modal">Cancel</button><button class="button ${options.danger ? "button-danger" : ""}" type="button" data-action="confirm-action">${escapeHtml(confirmLabel)}</button></div>
  `, { centered: true, focus: false });
}

function buildReminderPayload(dateKey = localDateKey()) {
  const tasks = getTasks(dateKey).filter((task) => !task.complete && !task.optional);
  const now = new Date();
  const date = dateFromKey(dateKey);
  return {
    source: "Momentum Coach",
    date: dateKey,
    generatedAt: now.toISOString(),
    items: tasks.map((task) => {
      const due = new Date(date.getFullYear(), date.getMonth(), date.getDate(), Math.floor(timeToMinutes(task.time) / 60), timeToMinutes(task.time) % 60, 0, 0);
      if (dateKey === localDateKey() && due < now) due.setTime(now.getTime() + 2 * 60 * 1000);
      const localDue = `${localDateKey(due)}T${String(due.getHours()).padStart(2, "0")}:${String(due.getMinutes()).padStart(2, "0")}:00`;
      return {
        title: `Momentum${task.optional ? " (optional)" : ""}: ${task.title}`,
        due: localDue,
        notes: task.detail,
        type: task.type
      };
    })
  };
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function isIOSDevice() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

async function runReminders() {
  if (!state.settings.shortcutConfigured) {
    showReminderGuide();
    return;
  }
  const payload = buildReminderPayload(localDateKey());
  if (!payload.items.length) {
    showToast("Everything planned for today is already complete.");
    return;
  }
  try {
    await copyText(JSON.stringify(payload));
    if (isIOSDevice()) {
      const name = encodeURIComponent(state.profile.reminderShortcutName || "Momentum Reminders");
      window.location.href = `shortcuts://run-shortcut?name=${name}&input=clipboard`;
    } else {
      showToast("Today's reminder data was copied to your clipboard.");
    }
  } catch (error) {
    console.error(error);
    showToast("Could not copy reminder data.", true);
  }
}

function escapeICS(value) {
  return String(value || "").replaceAll("\\", "\\\\").replaceAll(";", "\\;").replaceAll(",", "\\,").replaceAll("\n", "\\n");
}

function icsLocalDate(dateKey, time) {
  const [year, month, day] = dateKey.split("-");
  const [hour, minute] = time.split(":");
  return `${year}${month}${day}T${hour}${minute}00`;
}

function downloadTodayICS() {
  const dateKey = localDateKey();
  const tasks = getTasks(dateKey).filter((task) => !task.complete && !task.optional);
  if (!tasks.length) {
    showToast("Everything planned for today is already complete.");
    return;
  }
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const events = tasks.map((task, index) => {
    const workoutPlan = task.type === "workout" ? getPlanById(task.planId, dateKey) : null;
    const duration = workoutPlan ? Number(workoutPlan.estimatedMinutes || 35) : 20;
    const end = addMinutesToTime(task.time, duration);
    return [
      "BEGIN:VEVENT",
      `UID:momentum-${dateKey}-${index}@local`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${icsLocalDate(dateKey, task.time)}`,
      `DTEND:${icsLocalDate(dateKey, end)}`,
      `SUMMARY:${escapeICS(`Momentum: ${task.title}`)}`,
      `DESCRIPTION:${escapeICS(task.detail)}`,
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      "TRIGGER:-PT5M",
      `DESCRIPTION:${escapeICS(task.title)}`,
      "END:VALARM",
      "END:VEVENT"
    ].join("\r\n");
  }).join("\r\n");
  const content = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Momentum Coach//EN\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\n${events}\r\nEND:VCALENDAR\r\n`;
  downloadBlob(new Blob([content], { type: "text/calendar;charset=utf-8" }), `momentum-${dateKey}.ics`);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function exportData() {
  state.settings.lastBackupAt = new Date().toISOString();
  saveState({ render: false });
  const payload = {
    exportedAt: new Date().toISOString(),
    app: "Momentum Coach",
    appVersion: APP_VERSION,
    state
  };
  downloadBlob(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }), `momentum-backup-${localDateKey()}.json`);
  renderAll();
  showToast("Backup created. Save it in iCloud Drive.");
}

function exportProgressCSV() {
  const headers = ["Date", "Daily Score", "Weight", "Water Ounces", "Protein Grams", "Workout", "Workout Type", "Session Minutes", "Cardio Minutes", "Energy", "Notes"];
  const rows = Object.keys(state.logs).sort().map((dateKey) => {
    const log = state.logs[dateKey];
    return [
      dateKey,
      getDailyScore(dateKey),
      log.weight ?? "",
      log.water ?? 0,
      getProteinTotal(dateKey),
      log.workout?.complete ? log.workout.title || "Completed" : "",
      log.workout?.kind ?? "",
      log.workout?.durationMinutes ?? "",
      log.workout?.cardioMinutes ?? "",
      log.energy ?? "",
      log.notes ?? ""
    ];
  });
  const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\r\n");
  downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), `momentum-progress-${localDateKey()}.csv`);
}

async function importDataFile(file) {
  if (!file) return;
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const importedState = parsed.state || parsed;
    if (!importedState.profile || !importedState.logs || !importedState.mealSchedule) throw new Error("Invalid backup");
    state = upgradeToPersonalProgram(deepMerge(createDefaultState(), importedState), importedState);
    const expectedSignature = planSignature(state.profile, state.coachProgram);
    state.workoutPlan = state.workoutPlan?.signature === expectedSignature ? state.workoutPlan : generateWorkoutPlan(state.profile, state.coachProgram);
    saveState({ render: false });
    applyTheme();
    renderAll();
    showToast("Backup restored.");
  } catch (error) {
    console.error(error);
    showToast("That file is not a valid Momentum backup.", true);
  }
}

function reflowToday(delayMinutes) {
  const dateKey = localDateKey();
  const log = getDayLog(dateKey);
  const incomplete = getTasks(dateKey).filter((task) => !task.complete && !task.optional && task.type !== "morning");
  if (!incomplete.length) {
    showToast("There is nothing left to reschedule.");
    return;
  }
  const now = new Date();
  let cursor = now.getHours() * 60 + now.getMinutes() + Number(delayMinutes || 30);
  const bed = timeToMinutes(state.profile.bedTime);
  incomplete.forEach((task) => {
    if (task.type === "water") {
      log.timeOverrides[task.id] = minutesToTime(Math.max(cursor, bed - 90));
      return;
    }
    if (task.type === "evening") {
      log.timeOverrides[task.id] = minutesToTime(Math.max(cursor, bed - 30));
      return;
    }
    log.timeOverrides[task.id] = minutesToTime(cursor);
    if (task.type === "meal") cursor += 180;
    else if (task.type === "workout") cursor += Number(getPlanById(task.planId, dateKey)?.estimatedMinutes || state.profile.sessionMinutes || 35) + 60;
    else cursor += 60;
  });
  saveState({ render: false });
  closeModal();
  renderAll();
  showToast("The rest of today has been rebuilt.");
}

function parseTopRep(target) {
  const numbers = String(target || "").match(/\d+/g)?.map(Number) || [];
  return numbers.length ? Math.max(...numbers) : 0;
}

function exerciseUsesDumbbells(exercise) {
  return Boolean(exercise?.requires?.includes("dumbbells"));
}

function isCardioExercise(exercise, planKind = "") {
  return exercise?.type === "conditioning" || ["cardio", "recovery", "fallback"].includes(planKind);
}

function maxLoadForExercise(exercise) {
  if (!exerciseUsesDumbbells(exercise)) return null;
  return clamp(Number(state.profile.dumbbellMax) || 25, 5, 200);
}

function defaultCardioEffort(exercise, plan = null) {
  if (plan?.adaptiveCardio === "intervals" || exercise?.key === "peloton_intervals") return 8;
  if (plan?.kind === "recovery" || plan?.kind === "fallback" || ["recovery_walk", "peloton_low_impact", "busy_day_10"].includes(exercise?.key)) return 4;
  return 6;
}

function suggestedLoadFor(exercise, prescription, plan = null) {
  const progress = state.exerciseProgress[exercise.key];
  if (isCardioExercise(exercise, plan?.kind)) {
    const priorEffort = progress?.suggestedWeight ?? progress?.lastWeight;
    return priorEffort === "" || priorEffort === undefined || priorEffort === null
      ? defaultCardioEffort(exercise, plan)
      : clamp(priorEffort, 1, 10);
  }
  if (!progress) return "";
  let value = progress.suggestedWeight !== undefined && progress.suggestedWeight !== null && progress.suggestedWeight !== ""
    ? progress.suggestedWeight
    : progress.lastWeight ?? "";
  const max = maxLoadForExercise(exercise);
  if (max !== null && value !== "" && Number.isFinite(Number(value))) value = Math.min(max, Number(value));
  return value;
}

function createActiveWorkout(plan) {
  return {
    id: uid("session"),
    dateKey: localDateKey(),
    planId: plan.id,
    title: plan.title,
    kind: plan.kind || "strength",
    optional: Boolean(plan.optional),
    coachWeek: plan.coachWeek || coachProgramWeek(),
    estimatedMinutes: Number(plan.estimatedMinutes || 0),
    startedAt: new Date().toISOString(),
    exercises: plan.exercises.map((item) => {
      const exercise = getExerciseByKey(item.exerciseKey);
      const suggested = suggestedLoadFor(exercise, item, plan);
      return {
        exerciseKey: item.exerciseKey,
        targetSets: item.sets,
        targetReps: item.targetReps,
        defaultReps: item.defaultReps,
        rest: item.rest,
        coachCue: item.coachCue || "",
        sets: Array.from({ length: item.sets }, () => ({
          weight: suggested,
          reps: item.defaultReps,
          done: false
        }))
      };
    })
  };
}

function startWorkout(planId) {
  if (state.activeWorkout && state.activeWorkout.planId === planId) {
    showWorkoutSession();
    return;
  }
  const plan = getPlanById(planId);
  if (!plan) {
    showToast("That workout could not be found.", true);
    return;
  }
  if (state.activeWorkout && state.activeWorkout.planId !== planId) {
    showConfirm("Replace active workout?", "Starting this workout will discard the unfinished active session.", "Replace workout", () => {
      state.activeWorkout = createActiveWorkout(plan);
      saveState({ render: false });
      showWorkoutSession();
    }, { danger: true });
    return;
  }
  state.activeWorkout = createActiveWorkout(plan);
  saveState({ render: false });
  showWorkoutSession();
}

async function requestWakeLock() {
  if (!("wakeLock" in navigator)) return;
  try {
    wakeLock = await navigator.wakeLock.request("screen");
  } catch (error) {
    // Screen wake lock is optional.
  }
}

async function releaseWakeLock() {
  try {
    if (wakeLock) await wakeLock.release();
  } catch (error) {
    // No action needed.
  }
  wakeLock = null;
}

function showWorkoutSession() {
  if (!state.activeWorkout) return;
  const root = document.getElementById("modalRoot");
  root.classList.add("open");
  document.body.style.overflow = "hidden";
  renderWorkoutSession(false);
  clearInterval(sessionTimer);
  sessionTimer = setInterval(updateSessionClock, 1000);
  requestWakeLock();
}

function renderWorkoutSession(preserveScroll = true) {
  const root = document.getElementById("modalRoot");
  const active = state.activeWorkout;
  if (!active) return;
  const previousScroll = preserveScroll ? root.querySelector(".session-shell")?.scrollTop || 0 : 0;
  const plan = getPlanById(active.planId, active.dateKey);
  const planKind = active.kind || plan?.kind || "strength";
  const doneSets = active.exercises.reduce((total, exercise) => total + exercise.sets.filter((set) => set.done).length, 0);
  const totalSets = active.exercises.reduce((total, exercise) => total + exercise.sets.length, 0);

  const exerciseCards = active.exercises.map((activeExercise, exerciseIndex) => {
    const exercise = getExerciseByKey(activeExercise.exerciseKey);
    const planExercise = plan?.exercises?.[exerciseIndex] || plan?.exercises?.find((item) => item.exerciseKey === activeExercise.exerciseKey);
    const coachCue = activeExercise.coachCue || planExercise?.coachCue || "";
    const progress = state.exerciseProgress[exercise.key];
    const complete = activeExercise.sets.every((set) => set.done);
    const cardio = isCardioExercise(exercise, planKind);
    const timed = cardio || exercise.type === "mobility" || exercise.key.includes("plank");
    const usesDumbbells = exerciseUsesDumbbells(exercise);
    const maxLoad = maxLoadForExercise(exercise);
    const showLoadInput = cardio || usesDumbbells || exercise.increment > 0;
    const loadLabel = cardio ? "RPE" : usesDumbbells ? `${state.profile.weightUnit} / DB` : "Load";
    const repLabel = timed ? (cardio || exercise.type === "mobility" ? "Minutes" : "Seconds") : "Reps";
    const previousLabel = progress
      ? cardio
        ? `last RPE ${escapeHtml(progress.lastWeight ?? "-")}`
        : progress.lastWeight !== "" && progress.lastWeight !== undefined && progress.lastWeight !== null
          ? `last ${escapeHtml(progress.lastWeight)} ${usesDumbbells ? `${state.profile.weightUnit} / DB` : state.profile.weightUnit}`
          : "last: bodyweight"
      : "";
    const atMax = Boolean(progress?.atEquipmentMax && usesDumbbells);

    const sets = activeExercise.sets.map((set, setIndex) => {
      const loadControl = showLoadInput
        ? `<input class="input" type="number" step="${cardio ? "1" : exercise.increment ? "0.5" : "1"}" min="${cardio ? "1" : "0"}" ${cardio ? 'max="10"' : maxLoad !== null ? `max="${maxLoad}"` : ""} inputmode="decimal" value="${escapeHtml(set.weight ?? "")}" placeholder="${cardio ? "1-10" : usesDumbbells ? "5" : "0"}" data-session-field="weight" data-exercise-index="${exerciseIndex}" data-set-index="${setIndex}" aria-label="Set ${setIndex + 1} ${cardio ? "effort from 1 to 10" : usesDumbbells ? `weight per dumbbell, maximum ${maxLoad}` : "load"}">`
        : '<input class="input input-static" type="text" value="BW" disabled aria-label="Bodyweight">';
      return `
        <div class="set-row">
          <span class="set-number">${setIndex + 1}</span>
          ${loadControl}
          <input class="input" type="number" step="1" min="0" inputmode="numeric" value="${escapeHtml(set.reps ?? activeExercise.defaultReps)}" data-session-field="reps" data-exercise-index="${exerciseIndex}" data-set-index="${setIndex}" aria-label="Set ${setIndex + 1} ${repLabel.toLowerCase()}">
          <button class="set-check ${set.done ? "done" : ""}" type="button" data-action="toggle-set" data-exercise-index="${exerciseIndex}" data-set-index="${setIndex}" aria-label="${set.done ? "Mark set incomplete" : "Complete set"}">${set.done ? icon("check", "icon") : ""}</button>
        </div>`;
    }).join("");

    return `
      <article class="exercise-card ${complete ? "complete" : ""}" data-exercise-card="${exerciseIndex}">
        <div class="exercise-head">
          <span class="exercise-index">${exerciseIndex + 1}</span>
          <div class="exercise-title">
            <h3>${escapeHtml(exercise.name)}</h3>
            <p>${activeExercise.targetSets} set${activeExercise.targetSets === 1 ? "" : "s"} x ${escapeHtml(activeExercise.targetReps)}${previousLabel ? ` - ${previousLabel}` : ""}</p>
          </div>
          ${complete ? '<span class="badge badge-success">Done</span>' : ""}
        </div>
        <div class="exercise-cue">
          <span>${escapeHtml(exercise.cue)}</span>
          ${coachCue && coachCue !== exercise.cue ? `<span class="session-coach-cue"><strong>Coach:</strong> ${escapeHtml(coachCue)}</span>` : ""}
          ${atMax ? `<span class="session-max-cue"><strong>At your ${maxLoad} ${escapeHtml(state.profile.weightUnit)} limit:</strong> keep the weight and progress with more reps, a three-second lowering phase, pauses, or a harder unilateral variation.</span>` : ""}
        </div>
        <div class="set-table">
          <div class="set-head"><span>Set</span><span>${escapeHtml(loadLabel)}</span><span>${escapeHtml(repLabel)}</span><span>Done</span></div>
          ${sets}
        </div>
      </article>`;
  }).join("");

  root.innerHTML = `
    <div class="modal modal-full" role="dialog" aria-modal="true" aria-label="Active workout">
      <div class="session-shell">
        <header class="session-head">
          <button class="icon-button soft" type="button" data-action="close-session" aria-label="Close workout">${icon("x", "icon")}</button>
          <div style="flex:1;min-width:0"><h2>${escapeHtml(active.title)}</h2><p>${doneSets} of ${totalSets} sets complete${plan?.phaseLabel ? ` - ${escapeHtml(plan.phaseLabel)}` : ""}</p></div>
          <span id="sessionElapsed" class="session-timer">00:00</span>
        </header>
        ${plan?.focus ? `<div class="session-plan-focus">${icon(planKind === "strength" ? "dumbbell" : "walk", "icon")} <span>${escapeHtml(plan.focus)}</span></div>` : ""}
        <main class="session-body">${exerciseCards}</main>
        <footer class="session-footer ${planKind === "strength" ? "" : "single-action"}">
          ${planKind === "strength" ? `<button class="button button-ghost rest-button" type="button" data-action="start-rest" data-seconds="60">${icon("timer", "button-icon")} Rest</button>` : ""}
          <button class="button" type="button" data-action="finish-workout">${icon("check", "button-icon")} Finish workout</button>
        </footer>
      </div>
      <div id="restTimerMount"></div>
    </div>`;
  root.classList.add("open");
  const shell = root.querySelector(".session-shell");
  if (shell) shell.scrollTop = previousScroll;
  updateSessionClock();
  renderRestTimer();
}

function updateSessionClock() {
  const active = state.activeWorkout;
  const element = document.getElementById("sessionElapsed");
  if (!active || !element) return;
  const elapsed = Math.max(0, Math.floor((Date.now() - new Date(active.startedAt).getTime()) / 1000));
  element.textContent = formatDuration(elapsed);
}

function startRestTimer(seconds) {
  clearInterval(restTimer);
  restRemaining = Math.max(0, Number(seconds) || 60);
  renderRestTimer();
  restTimer = setInterval(() => {
    restRemaining -= 1;
    const count = document.getElementById("restCount");
    if (count) count.textContent = String(Math.max(0, restRemaining));
    if (restRemaining <= 0) {
      clearRestTimer(false);
      if (navigator.vibrate) navigator.vibrate([100, 80, 100]);
      showToast("Rest complete. Next set.");
    }
  }, 1000);
}

function renderRestTimer() {
  const mount = document.getElementById("restTimerMount");
  if (!mount) return;
  if (restRemaining <= 0) {
    mount.innerHTML = "";
    return;
  }
  mount.innerHTML = `
    <div class="rest-timer-card">
      <div><strong>Rest timer</strong><span>Recover, then move to the next set.</span></div>
      <div style="display:flex;align-items:center;gap:8px"><button class="icon-button soft" type="button" data-action="add-rest" data-seconds="30" aria-label="Add 30 seconds">${icon("plus", "icon")}</button><span id="restCount" class="rest-count">${restRemaining}</span><button class="icon-button soft" type="button" data-action="clear-rest" aria-label="Skip rest">${icon("x", "icon")}</button></div>
    </div>`;
}

function clearRestTimer(resetRemaining = true) {
  clearInterval(restTimer);
  restTimer = null;
  if (resetRemaining) restRemaining = 0;
  else restRemaining = 0;
  const mount = document.getElementById("restTimerMount");
  if (mount) mount.innerHTML = "";
}

function toggleWorkoutSet(exerciseIndex, setIndex) {
  const active = state.activeWorkout;
  const exercise = active?.exercises?.[exerciseIndex];
  const set = exercise?.sets?.[setIndex];
  if (!set) return;
  set.done = !set.done;
  saveState({ render: false });
  if (set.done && exercise.rest > 0) startRestTimer(exercise.rest);
  renderWorkoutSession(true);
}

function workoutHasIncompleteSets() {
  if (!state.activeWorkout) return false;
  return state.activeWorkout.exercises.some((exercise) => exercise.sets.some((set) => !set.done));
}

function completeWorkout() {
  const active = state.activeWorkout;
  if (!active) return;
  const plan = getPlanById(active.planId, active.dateKey);
  const end = new Date();
  const durationMinutes = Math.max(1, Math.round((end.getTime() - new Date(active.startedAt).getTime()) / 60000));
  const exerciseLogs = active.exercises.map((activeExercise) => {
    const exercise = getExerciseByKey(activeExercise.exerciseKey);
    const cardio = isCardioExercise(exercise, plan?.kind || active.kind);
    const doneSets = activeExercise.sets.filter((set) => set.done).map((set) => ({
      weight: set.weight === "" ? "" : Number(set.weight),
      reps: set.reps === "" ? 0 : Number(set.reps),
      done: true
    }));

    if (doneSets.length) {
      const lastSet = doneSets[doneSets.length - 1];
      const topRep = parseTopRep(activeExercise.targetReps);
      const allAtTop = doneSets.length >= activeExercise.targetSets && doneSets.every((set) => Number(set.reps) >= topRep);
      const lastWeight = lastSet.weight === "" ? "" : Number(lastSet.weight);
      let suggestedWeight = lastWeight;
      let atEquipmentMax = false;

      if (!cardio && allAtTop && exercise.increment > 0 && Number.isFinite(lastWeight)) {
        const rawSuggestion = roundTo(lastWeight + exercise.increment, exercise.increment);
        const maxLoad = maxLoadForExercise(exercise);
        if (maxLoad !== null) {
          suggestedWeight = Math.min(maxLoad, rawSuggestion);
          atEquipmentMax = rawSuggestion > maxLoad || lastWeight >= maxLoad;
        } else {
          suggestedWeight = rawSuggestion;
        }
      } else if (cardio && Number.isFinite(lastWeight)) {
        suggestedWeight = clamp(lastWeight, 1, 10);
      }

      state.exerciseProgress[exercise.key] = {
        lastDate: active.dateKey,
        lastWeight,
        lastReps: lastSet.reps,
        completedSets: doneSets.length,
        suggestedWeight,
        atEquipmentMax,
        history: [
          ...(state.exerciseProgress[exercise.key]?.history || []).slice(-19),
          { date: active.dateKey, sets: doneSets }
        ]
      };
    }

    return {
      exerciseKey: activeExercise.exerciseKey,
      targetSets: activeExercise.targetSets,
      targetReps: activeExercise.targetReps,
      coachCue: activeExercise.coachCue || "",
      sets: doneSets
    };
  });

  const cardioMinutes = exerciseLogs.reduce((total, exerciseLog) => {
    const exercise = getExerciseByKey(exerciseLog.exerciseKey);
    if (exercise.type !== "conditioning") return total;
    return total + exerciseLog.sets.reduce((sum, set) => sum + Math.max(0, Number(set.reps) || 0), 0);
  }, 0);

  const log = getDayLog(active.dateKey);
  log.workout = {
    complete: true,
    planId: active.planId,
    title: plan?.title || active.title,
    kind: plan?.kind || active.kind || "strength",
    optional: Boolean(plan?.optional ?? active.optional),
    coachWeek: active.coachWeek || coachProgramWeek(),
    startedAt: active.startedAt,
    completedAt: end.toISOString(),
    durationMinutes,
    cardioMinutes,
    exerciseLogs
  };
  state.activeWorkout = null;
  saveState({ render: false });
  closeModal();
  renderAll();
  showToast(`Workout complete: ${durationMinutes} minutes.`);
}

function setView(view, updateHash = true) {
  if (view === "meals" || view === "settings") view = "coach";
  const allowed = ["today", "workout", "progress", "coach"];
  if (!allowed.includes(view)) view = "today";
  currentView = view;
  if (updateHash && window.location.hash !== `#${view}`) history.replaceState(null, "", `#${view}`);
  renderHeader();
  setActiveViewClasses();
  if (view === "progress") requestAnimationFrame(drawWeightChart);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function performTaskAction(taskId) {
  const task = getTasks(localDateKey()).find((item) => item.id === taskId);
  if (!task) return;
  if (task.type === "morning") {
    showWeightModal();
  } else if (task.type === "meal") {
    toggleMeal(task.mealId);
  } else if (task.type === "workout") {
    if (task.complete) {
      setView("progress");
      showToast("Today's workout is already complete.");
    } else {
      startWorkout(task.planId || getScheduledWorkout()?.id);
    }
  } else if (task.type === "water") {
    const log = getDayLog(localDateKey());
    log.water = Math.max(0, Number(log.water || 0) + 8);
    saveState();
    showToast("Added 8 oz of water.");
  } else if (task.type === "evening") {
    showCheckinModal();
  }
}

function toggleMeal(mealId) {
  const meal = state.mealSchedule.find((item) => item.id === mealId);
  if (!meal) return;
  const mealLog = getMealLog(localDateKey(), mealId);
  mealLog.complete = !mealLog.complete;
  saveState();
  showToast(mealLog.complete ? `${meal.label} complete.` : `${meal.label} reopened.`);
}

function saveProfileFromEditor() {
  const form = document.getElementById("editForm");
  if (!form) return;
  const nextProfile = readProfileForm(form);
  if (!nextProfile.workoutDays.length) {
    showToast("Choose at least one workout day.", true);
    return;
  }
  const oldProtein = Number(state.profile.proteinTarget || 1);
  const nextProtein = Number(nextProfile.proteinTarget || oldProtein);
  if (oldProtein !== nextProtein && state.mealSchedule.length) {
    const factor = nextProtein / oldProtein;
    state.mealSchedule = state.mealSchedule.map((meal) => ({
      ...meal,
      targetProtein: Math.max(5, roundTo(Number(meal.targetProtein || 0) * factor, 5))
    }));
  }
  state.profile = nextProfile;
  state.workoutPlan = generateWorkoutPlan(state.profile, state.coachProgram);
  if (nextProfile.currentWeight && !getDayLog(localDateKey()).weight) {
    const log = getDayLog(localDateKey());
    log.weight = Number(nextProfile.currentWeight);
    log.morningComplete = true;
  }
  saveState({ render: false });
  closeModal();
  renderAll();
  showToast("Profile and targets updated.");
}

function saveMealSchedule() {
  const rows = [...document.querySelectorAll("[data-meal-editor-row]")];
  if (rows.length < 2) {
    showToast("Keep at least two eating times.", true);
    return;
  }
  const meals = rows.map((row, index) => {
    const label = row.querySelector('[data-field="label"]')?.value.trim() || `Meal ${index + 1}`;
    const time = row.querySelector('[data-field="time"]')?.value || "12:00";
    const targetProtein = clamp(row.querySelector('[data-field="protein"]')?.value, 0, 150);
    const existing = state.mealSchedule.find((meal) => meal.id === row.dataset.mealId);
    return {
      id: row.dataset.mealId || uid("meal"),
      label,
      time,
      targetProtein,
      category: mealCategory(label, index, rows.length),
      optionIndex: existing?.optionIndex || 0,
      coachNote: existing?.coachNote || ""
    };
  }).sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
  state.mealSchedule = meals;
  const totalProtein = meals.reduce((sum, meal) => sum + Number(meal.targetProtein || 0), 0);
  if (totalProtein > 0) state.profile.proteinTarget = totalProtein;
  saveState({ render: false });
  closeModal();
  renderAll();
  showToast("Eating schedule updated.");
}

function regeneratePlan() {
  const restore = () => {
    state.profile = {
      ...state.profile,
      programId: PERSONAL_PROGRAM_ID,
      goal: "fat_loss",
      workoutDays: [...PERSONAL_REQUIRED_DAYS],
      sessionMinutes: 45,
      equipment: [...PERSONAL_REQUIRED_EQUIPMENT]
    };
    state.workoutPlan = generateWorkoutPlan(state.profile, state.coachProgram);
    saveState({ render: false });
    closeModal();
    renderAll();
    showToast("Coach workout plan restored.");
  };
  if (state.activeWorkout) {
    showConfirm("Restore the coach plan?", "The unfinished workout will be discarded and the exact weekly coach program will be restored.", "Restore plan", () => {
      state.activeWorkout = null;
      restore();
    });
    return;
  }
  restore();
}

function restartCoachProgram() {
  showConfirm("Restart the eight-week progression?", "Week 1 will begin today. Your completed workout and weight history will remain intact.", "Restart at week 1", () => {
    state.coachProgram = {
      id: PERSONAL_PROGRAM_ID,
      version: PERSONAL_PROGRAM_VERSION,
      startDate: localDateKey()
    };
    state.workoutPlan = generateWorkoutPlan(state.profile, state.coachProgram);
    saveState({ render: false });
    closeModal();
    renderAll();
    showToast("Cardio progression restarted at week 1.");
  });
}

function handleClick(event) {
  const nav = event.target.closest("[data-nav]");
  if (nav) {
    setView(nav.dataset.nav);
    return;
  }

  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;

  switch (action) {
    case "show-quick-log":
      showQuickLog();
      break;
    case "open-coach-nutrition":
      setView("coach");
      setTimeout(() => document.getElementById("coachNutrition")?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
      break;
    case "open-coach-settings":
      setView("coach");
      setTimeout(() => {
        const details = document.getElementById("coachSettings");
        if (details) details.open = true;
        details?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      break;
    case "start-fallback": {
      const fallback = state.workoutPlan?.fallback ? resolvePlanForCurrentWeek(state.workoutPlan.fallback, localDateKey()) : null;
      closeModal();
      if (fallback) startWorkout(fallback.id);
      else showToast("No fallback workout is available.", true);
      break;
    }
    case "quick-water": {
      const log = getDayLog(localDateKey());
      log.water = Math.max(0, Number(log.water || 0) + Number(target.dataset.amount || 16));
      saveState({ render: false });
      closeModal();
      renderAll();
      showToast("Water logged.");
      break;
    }
    case "quick-protein": {
      const log = getDayLog(localDateKey());
      log.proteinExtra = Math.max(0, Number(log.proteinExtra || 0) + Number(target.dataset.amount || 25));
      saveState({ render: false });
      closeModal();
      renderAll();
      showToast("Protein logged.");
      break;
    }
    case "quick-weight":
      closeModal();
      showWeightModal();
      break;
    case "quick-next-meal": {
      const mealId = target.dataset.mealId;
      closeModal();
      if (mealId) toggleMeal(mealId);
      break;
    }
    case "quick-workout":
      closeModal();
      if (target.dataset.planId) startWorkout(target.dataset.planId);
      break;
    case "quick-reflow":
      closeModal();
      showReflowModal();
      break;
    case "quick-checkin":
      closeModal();
      showCheckinModal();
      break;
    case "noop":
      break;
    case "close-modal":
      closeModal();
      break;
    case "show-install":
      showInstallGuide();
      break;
    case "dismiss-install":
      state.installDismissed = true;
      saveState({ render: false });
      document.getElementById("installBanner")?.classList.add("hidden");
      break;
    case "task-action":
      performTaskAction(target.dataset.taskId);
      break;
    case "add-water": {
      const log = getDayLog(localDateKey());
      log.water = Math.max(0, Number(log.water || 0) + Number(target.dataset.amount || 0));
      saveState();
      break;
    }
    case "add-protein": {
      const log = getDayLog(localDateKey());
      log.proteinExtra = Math.max(0, Number(log.proteinExtra || 0) + Number(target.dataset.amount || 0));
      saveState();
      break;
    }
    case "toggle-meal":
      toggleMeal(target.dataset.mealId);
      break;
    case "cycle-meal-idea": {
      const mealLog = getMealLog(localDateKey(), target.dataset.mealId);
      mealLog.optionIndex = Number(mealLog.optionIndex || 0) + 1;
      saveState();
      break;
    }
    case "meal-note":
      showMealNote(target.dataset.mealId);
      break;
    case "save-meal-note": {
      const mealId = document.getElementById("mealNoteId")?.value;
      const value = document.getElementById("mealNoteInput")?.value.trim() || "";
      getMealLog(localDateKey(), mealId).note = value;
      saveState({ render: false });
      closeModal();
      renderAll();
      showToast("Meal note saved.");
      break;
    }
    case "show-weight":
      showWeightModal();
      break;
    case "save-weight": {
      const input = document.getElementById("weightInput");
      const value = Number(input?.value);
      if (!Number.isFinite(value) || value <= 0) {
        showToast("Enter a valid weight.", true);
        break;
      }
      const log = getDayLog(localDateKey());
      log.weight = value;
      log.morningComplete = true;
      state.profile.currentWeight = value;
      saveState({ render: false });
      closeModal();
      renderAll();
      showToast("Weight logged.");
      break;
    }
    case "show-checkin":
      showCheckinModal();
      break;
    case "select-energy":
      document.querySelectorAll('[data-action="select-energy"]').forEach((button) => button.classList.toggle("active", button === target));
      document.getElementById("checkinEnergy").value = target.dataset.value;
      break;
    case "save-checkin": {
      const log = getDayLog(localDateKey());
      log.energy = Number(document.getElementById("checkinEnergy")?.value) || null;
      log.notes = document.getElementById("checkinNotes")?.value.trim() || "";
      log.eveningComplete = true;
      saveState({ render: false });
      closeModal();
      renderAll();
      showToast("Day closed. Nice work.");
      break;
    }
    case "show-reflow":
      showReflowModal();
      break;
    case "apply-reflow":
      reflowToday(Number(document.getElementById("reflowDelay")?.value || 30));
      break;
    case "restore-schedule":
      getDayLog(localDateKey()).timeOverrides = {};
      saveState();
      showToast("Original times restored.");
      break;
    case "edit-profile":
      showProfileEditor();
      break;
    case "save-profile":
      saveProfileFromEditor();
      break;
    case "edit-meals":
      showMealEditor();
      break;
    case "add-meal-row": {
      const rows = document.getElementById("mealEditorRows");
      if (!rows) break;
      const count = rows.querySelectorAll("[data-meal-editor-row]").length;
      if (count >= 8) {
        showToast("Eight eating times is the current maximum.", true);
        break;
      }
      rows.insertAdjacentHTML("beforeend", mealEditorRow({ id: uid("meal"), label: `Snack ${count + 1}`, time: "15:00", targetProtein: 20 }));
      break;
    }
    case "remove-meal-row": {
      const rows = document.querySelectorAll("[data-meal-editor-row]");
      if (rows.length <= 2) {
        showToast("Keep at least two eating times.", true);
        break;
      }
      target.closest("[data-meal-editor-row]")?.remove();
      break;
    }
    case "save-meals":
      saveMealSchedule();
      break;
    case "regenerate-plan":
      regeneratePlan();
      break;
    case "restart-coach-program":
      restartCoachProgram();
      break;
    case "set-theme":
      state.profile.theme = target.dataset.theme || "auto";
      saveState({ render: false });
      applyTheme();
      renderAll();
      break;
    case "reminder-guide":
      showReminderGuide();
      break;
    case "shortcut-ready":
      state.settings.shortcutConfigured = true;
      saveState({ render: false });
      closeModal();
      renderAll();
      showToast("Shortcut connection marked ready.");
      break;
    case "open-shortcuts":
      window.location.href = "shortcuts://";
      break;
    case "run-reminders":
      runReminders();
      break;
    case "download-ics":
      downloadTodayICS();
      break;
    case "export-data":
      exportData();
      break;
    case "trigger-import":
      document.getElementById("importFile")?.click();
      break;
    case "privacy-info":
      showPrivacyInfo();
      break;
    case "reset-data":
      showConfirm("Reset Momentum?", "This permanently deletes the plan and all local logs from this browser. Export a backup first if you may need them.", "Delete everything", () => {
        localStorage.removeItem(STORAGE_KEY);
        state = createDefaultState();
        saveState({ render: false });
        closeModal();
        renderAll();
        showToast("Momentum reset and the coach plan restored.");
      }, { danger: true });
      break;
    case "export-csv":
      exportProgressCSV();
      break;
    case "confirm-action": {
      const callback = pendingConfirm;
      pendingConfirm = null;
      if (callback) callback();
      break;
    }
    case "onboarding-next": {
      if (onboardingStep === 1) {
        const checked = document.querySelectorAll('#onboardingForm input[name="workoutDays"]:checked').length;
        if (!checked) {
          showToast("Choose at least one workout day.", true);
          break;
        }
      }
      updateOnboardingStep(onboardingStep + 1);
      break;
    }
    case "onboarding-back":
      updateOnboardingStep(onboardingStep - 1);
      break;
    case "onboarding-finish":
      finishOnboarding(false);
      break;
    case "onboarding-skip":
      finishOnboarding(true);
      break;
    case "start-workout":
      startWorkout(target.dataset.planId);
      break;
    case "close-session":
      saveState({ render: false });
      closeModal();
      renderAll();
      showToast("Workout saved. Resume whenever you are ready.");
      break;
    case "toggle-set":
      toggleWorkoutSet(Number(target.dataset.exerciseIndex), Number(target.dataset.setIndex));
      break;
    case "start-rest":
      startRestTimer(Number(target.dataset.seconds || 60));
      break;
    case "add-rest":
      restRemaining += Number(target.dataset.seconds || 30);
      renderRestTimer();
      break;
    case "clear-rest":
      clearRestTimer();
      break;
    case "finish-workout":
      if (workoutHasIncompleteSets()) {
        showConfirm("Finish with incomplete sets?", "Only completed sets will be saved. You can cancel and finish the remaining sets instead.", "Finish anyway", completeWorkout);
      } else {
        completeWorkout();
      }
      break;
    default:
      break;
  }
}

function handleInput(event) {
  const input = event.target.closest("[data-session-field]");
  if (!input || !state.activeWorkout) return;
  const exerciseIndex = Number(input.dataset.exerciseIndex);
  const setIndex = Number(input.dataset.setIndex);
  const activeExercise = state.activeWorkout.exercises?.[exerciseIndex];
  const set = activeExercise?.sets?.[setIndex];
  if (!set) return;

  let value = input.value;
  if (input.dataset.sessionField === "weight" && value !== "") {
    const exercise = getExerciseByKey(activeExercise.exerciseKey);
    const numeric = Number(value);
    if (Number.isFinite(numeric)) {
      if (isCardioExercise(exercise, state.activeWorkout.kind)) value = String(clamp(numeric, 1, 10));
      else {
        const maxLoad = maxLoadForExercise(exercise);
        if (maxLoad !== null) value = String(clamp(numeric, 0, maxLoad));
      }
      input.value = value;
    }
  }

  set[input.dataset.sessionField] = value;
  saveState({ render: false });
}

function handleChange(event) {
  if (event.target.id === "importFile") {
    const file = event.target.files?.[0];
    importDataFile(file);
    event.target.value = "";
  }
}

function setupInstallBanner() {
  const banner = document.getElementById("installBanner");
  if (!banner) return;
  const shouldShow = isIOSDevice() && !isStandalone() && !state.installDismissed;
  banner.classList.toggle("hidden", !shouldShow);
}

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  try {
    const registration = await navigator.serviceWorker.register("./service-worker.js");
    registration.addEventListener("updatefound", () => {
      const worker = registration.installing;
      if (!worker) return;
      worker.addEventListener("statechange", () => {
        if (worker.state === "installed" && navigator.serviceWorker.controller) {
          showToast("An update is ready. Reopen Momentum to use it.");
        }
      });
    });
  } catch (error) {
    console.error("Service worker registration failed", error);
  }
}

function init() {
  state = loadState();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Could not persist the initialized state", error);
  }
  const rawHash = window.location.hash.replace("#", "");
  const hash = rawHash === "meals" || rawHash === "settings" ? "coach" : rawHash;
  currentView = ["today", "workout", "progress", "coach"].includes(hash) ? hash : "today";
  applyTheme();
  hydrateStaticIcons();
  renderAll();
  updateOnlineStatus();
  setupInstallBanner();
  updateAppBadge();
  registerServiceWorker();

  document.addEventListener("click", handleClick);
  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleChange);
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  window.addEventListener("resize", () => {
    if (currentView === "progress") requestAnimationFrame(drawWeightChart);
  });
  window.addEventListener("hashchange", () => {
    const rawNext = window.location.hash.replace("#", "");
    const next = rawNext === "meals" || rawNext === "settings" ? "coach" : rawNext;
    if (["today", "workout", "progress", "coach"].includes(next)) setView(next, false);
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      if (state.activeWorkout && document.getElementById("sessionElapsed")) requestWakeLock();
      if (!document.getElementById("modalRoot")?.classList.contains("open")) renderAll();
    }
  });

  setInterval(() => {
    if (!document.getElementById("modalRoot")?.classList.contains("open")) renderAll();
  }, 60000);

  if (!state.onboardingComplete) setTimeout(showOnboarding, 220);
}

document.addEventListener("DOMContentLoaded", init);
