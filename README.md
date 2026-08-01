# Momentum Coach 2.0

Momentum Coach is an installable, offline-first iPhone web app built for GitHub Pages. It is preprogrammed for fat loss, improved cardio, and a busy schedule using adjustable dumbbells, a treadmill, Peloton classes, and an ab roller.

## The four main tabs

- **Today** - the next best action, daily score, meals, workout, water, protein, and quick logging
- **Train** - the exact eight-week strength and cardio program, set-by-set workout logging, rest timer, and 10-minute fallback
- **Progress** - weekly adherence, workout history, cardio minutes, streaks, and weight trend
- **Coach** - personalized guidance, schedule adjustments, food system, meal swaps, weekly plan, reminders, settings, and backup

The floating **+** button opens quick logging from every tab.

## Program already loaded

### Weekly training

- Monday: Full Body A plus incline treadmill walk
- Tuesday: Peloton easy-endurance cardio
- Wednesday: Full Body B plus easy treadmill walk
- Thursday: Peloton controlled intervals
- Friday: Optional recovery walk or complete rest
- Saturday: Full Body C plus easy Peloton walk
- Sunday: Full rest

Tuesday and Thursday automatically progress over eight weeks. The **10-Minute Minimum** can replace a scheduled workout on an overloaded day and still protects the habit.

### Equipment built into the plan

- Two adjustable dumbbells, 5-25 pounds each
- Treadmill
- Peloton subscription and classes
- Ab roller
- Bodyweight exercises

Momentum never recommends more than 25 pounds per dumbbell. When that limit becomes easy, it recommends slower lowering phases, pauses, higher repetitions, or unilateral variations.

### Eating rhythm

1. 7:30 AM protein-yogurt breakfast
2. 10:30 AM fast protein snack
3. 1:00 PM chicken-based lunch
4. 4:00 PM busy-day protein snack
5. 7:00 PM chef-prepared dinner

The starting targets are 150 grams of protein and 80 ounces of water. Both remain editable under **Coach > App and plan settings > Profile, timing, and targets**.

## Features

- Coach-first daily dashboard
- Exact exercises, sets, repetitions, weight, cues, and automatic progression
- Cardio effort and actual cardio-minute tracking
- Eight-week treadmill/Peloton progression
- Optional Friday that never lowers the daily score
- One-tap 10-minute fallback
- Protein-yogurt breakfast, rotating chicken lunches, easy snacks, and prepared-dinner guidance
- Water, weight, meal, energy, note, streak, and adherence tracking
- JSON backup and restore
- CSV progress export
- Apple Shortcuts handoff for native Reminders
- Calendar-file fallback
- Offline operation after installation
- Light, dark, and automatic appearance

The app uses no external libraries, advertising, analytics, account, or server database.

## Privacy

The GitHub Pages website and source code are publicly reachable. Do not put private information directly into repository files.

Weight entries, workout logs, completed meals, notes, and settings are stored in browser storage on the device using Momentum. This build does not commit those entries to GitHub or send them to a database.

Browser data can be erased. Use **Coach > App and plan settings > Back up all data** and save the JSON file in iCloud Drive.

## Deploy

1. Upload the contents of this folder to the root of a GitHub repository.
2. In **Settings > Pages**, select **Deploy from a branch**, branch `main`, and folder `/(root)`.
3. Open the published address in Safari on the iPhone.
4. Tap **Share > Add to Home Screen** and enable **Open as Web App**.
5. Launch Momentum from the Home Screen icon.

Detailed directions are in [DEPLOY_TO_GITHUB.md](DEPLOY_TO_GITHUB.md).

## Updating an existing Momentum site

1. In the current app, create a backup.
2. Upload all files in this build to the same repository and replace matching files.
3. Keep the same repository and Pages address so the browser can continue using the same local data.
4. After deployment, fully close and reopen the Home Screen app.

See [UPDATE_EXISTING_APP.md](UPDATE_EXISTING_APP.md).

## Project files

- `index.html` - app shell and four-tab navigation
- `styles.css` - iPhone-first interface, dark mode, workout logger, and modals
- `app.js` - program, Coach logic, tracking, reminders, migration, and storage
- `manifest.webmanifest` - PWA and Home Screen metadata
- `service-worker.js` - offline cache and update handling
- `.nojekyll` - prevents GitHub Pages from processing the project with Jekyll
- `icons/` - browser and Home Screen icons
- `YOUR_PROGRAM.md` - written training and eating plan
- `SHORTCUT_SETUP.md` - Apple Reminders setup
- `DEPLOY_TO_GITHUB.md` - deployment guide
- `UPDATE_EXISTING_APP.md` - safe update checklist

## Version

Momentum Coach 2.0.0 - Coach-First Edition
