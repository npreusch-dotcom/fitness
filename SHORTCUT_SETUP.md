# Connect Momentum Coach to Apple Reminders

Momentum Coach is a static GitHub Pages application. It cannot wake itself at future times to create native iPhone alerts. The included integration solves that by sending today’s incomplete plan to an Apple Shortcut, which creates normal Apple Reminders.

The app expects a Shortcut named:

```text
Momentum Reminders
```

You may use a different name, but it must exactly match **Momentum > Coach > App and plan settings > Profile, timing, and targets > Reminder Shortcut name**.

## What Momentum sends

When you select **Set reminders**, Momentum copies JSON like this to the clipboard and launches the Shortcut:

```json
{
  "source": "Momentum Coach",
  "date": "2026-08-01",
  "generatedAt": "2026-08-01T11:30:00.000Z",
  "items": [
    {
      "title": "Momentum: Chicken-based lunch",
      "due": "2026-08-01T12:30:00",
      "notes": "Chicken burrito bowl • 45g protein target",
      "type": "meal"
    }
  ]
}
```

Past-due items for the current day are moved a couple of minutes into the future so the alert is still useful.

## Build the Shortcut

Apple occasionally changes the wording or arrangement of Shortcut actions. Search by the bold action names below if an action is not immediately visible.

### 1. Create and name it

1. Open Apple **Shortcuts**.
2. Select **+** to create a Shortcut.
3. Select the name at the top and name it exactly:

   ```text
   Momentum Reminders
   ```

### 2. Convert the incoming text to a dictionary

1. Add **Get Dictionary from Input**.
2. Its input should be **Shortcut Input**.

Momentum launches the Shortcut with `input=clipboard`, so the JSON copied by the app arrives as the Shortcut input.

### 3. Extract the items array

1. Add **Get Dictionary Value**.
2. Set the key to:

   ```text
   items
   ```

3. The dictionary should be the output of **Get Dictionary from Input**.

### 4. Repeat through each planned item

1. Add **Repeat with Each**.
2. Repeat over the `items` value from the prior action.
3. Leave the actions below inside the Repeat block.

### 5. Read the title

Inside Repeat:

1. Add **Get Dictionary Value**.
2. Set the key to:

   ```text
   title
   ```

3. Set the dictionary to **Repeat Item**.

Rename this action’s output variable to `Reminder Title` if that helps keep the Shortcut clear.

### 6. Read and convert the due date

Still inside Repeat:

1. Add another **Get Dictionary Value**.
2. Set the key to:

   ```text
   due
   ```

3. Set the dictionary to **Repeat Item**.
4. Add **Get Dates from Input** immediately after it.
5. Pass the `due` value into **Get Dates from Input**.

The output is the alert date for the reminder.

### 7. Read the notes

Still inside Repeat:

1. Add another **Get Dictionary Value**.
2. Set the key to:

   ```text
   notes
   ```

3. Set the dictionary to **Repeat Item**.

### 8. Add the Apple Reminder

Still inside Repeat:

1. Add **Add New Reminder**.
2. Set the reminder title to the `title` value.
3. Choose the Reminders list you want to use. Creating a dedicated list named `Momentum` keeps the items organized, but it is optional.
4. Expand the action’s details.
5. Turn on the alert or due-date option and use the date returned by **Get Dates from Input**.
6. Put the `notes` value into the reminder notes field.
7. Turn off **Show When Run** if you want the Shortcut to run with fewer prompts.

The final structure should resemble:

```text
Get Dictionary from Input
Get Dictionary Value: items
Repeat with Each item
    Get Dictionary Value: title from Repeat Item
    Get Dictionary Value: due from Repeat Item
    Get Dates from Input: due
    Get Dictionary Value: notes from Repeat Item
    Add New Reminder
        Title: title
        Alert/Due Date: parsed due date
        Notes: notes
End Repeat
```

## Test it

1. Save the Shortcut.
2. Return to Momentum.
3. Open **Coach**, expand **App and plan settings**, and select **Apple Reminders shortcut**.
4. Select **I built it**.
5. Return to Today and select **Set reminders**.
6. The iPhone may ask for permission the first time Shortcuts accesses the clipboard or creates reminders. Approve the request.
7. Open Apple Reminders and confirm that the incomplete Momentum items were created with alert times.

## Prevent duplicates

Momentum sends all currently incomplete items each time the button is used. It does not have permission to read Apple Reminders and detect existing copies. Delete the earlier set before running it again, or run it once after using **Rebuild today**.

A future version could use a more advanced Shortcut that checks for matching reminder titles before creating them, but the simple version is more reliable to set up.

## Calendar fallback

Under **Momentum > Coach > App and plan settings**, select **Calendar fallback** to download an `.ics` calendar file for today’s incomplete items. This does not require a Shortcut, but importing calendar events is less convenient than creating reminders automatically.

## Troubleshooting

### Tapping Set reminders only opens the Shortcuts app

- Confirm the Shortcut name exactly matches the name in Momentum settings.
- Avoid extra spaces at the beginning or end.
- Confirm the Shortcut is saved, not still open as an unsaved draft.

### The Shortcut says it cannot convert text to a dictionary

- Return to Momentum and tap **Set reminders** again so fresh JSON is copied to the clipboard.
- Confirm the first action uses **Shortcut Input**.
- Confirm the Shortcut is being launched from Momentum, not manually from the Shortcuts library.

### Reminders are created without alert times

- Confirm the `due` value is passed through **Get Dates from Input**.
- Confirm **Add New Reminder** uses that parsed date for its alert or due date.
- Check that Shortcuts and Reminders have notification permissions in iPhone Settings.

### Reminders appear twice

Delete the earlier set before running the Shortcut again. The basic integration intentionally does not access or delete existing reminders.
