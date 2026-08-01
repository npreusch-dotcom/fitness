# Update the Momentum App Already on the iPhone

## 1. Create a safety backup

In the current app:

```text
Coach > App and plan settings > Back up all data
```

Save the JSON file to iCloud Drive.

## 2. Replace the GitHub files

1. Download and unzip `momentum-coach-github-upload.zip`.
2. Open the same GitHub repository currently hosting Momentum.
3. Select **Add file > Upload files**.
4. Upload everything inside the unzipped `momentum-coach` folder, including `icons`.
5. Permit GitHub to replace matching files.
6. Commit with a message such as:

```text
Upgrade Momentum to version 2.0
```

Keep the same repository, username, and Pages address. The local app data is linked to that exact website address.

## 3. Load the update

1. Wait for the GitHub Pages deployment to finish.
2. Fully close Momentum from the iPhone app switcher.
3. Reopen it from the Home Screen.
4. When an update notice appears, close and reopen once more.
5. If the old interface remains, open the Pages address in Safari, refresh once, and reopen the Home Screen app.

Do not clear Safari website data unless a current backup exists.

## 4. Confirm version 2.0

The bottom navigation should be:

```text
Today | Train | Progress | Coach
```

The floating **+** button should open quick logging.

Open **Train** and confirm the eight-week strength and cardio program. Open **Coach** and confirm the food system, meal swaps, daily adjustments, weekly plan, reminders, and settings.

## Existing data

Momentum continues using the storage key from the earlier build. It preserves compatible historical logs, workout history, weight entries, reminders settings, and meal completion data. Old `#meals` and `#settings` links automatically redirect to the new Coach tab.

An unfinished workout remains resumable when its program template is compatible. The JSON backup can restore the earlier data if Safari storage is ever lost.
