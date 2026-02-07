# 🤖 Quick Start - Robotics Scoring App

## Start the App in 3 Steps

### Step 1: Open Terminal
Press ``Ctrl+` `` (or Cmd+` on Mac) to open the integrated terminal in VS Code

### Step 2: Run the Server
```bash
npm start
```

You should see:
```
Server running at http://localhost:3000
```

### Step 3: Open in Browser
Click this link: **http://localhost:3000**

---

## What You Can Do

✨ **Timer Page**
- Set custom time (minutes + seconds)
- Start, Pause, Stop the timer
- Large, easy-to-read display
- Switch between FLL and Robofest tabs

✨ **Add Team Page** 
- Click "+ Add Team" button
- Enter team name and pit number (FLL) or team number (Robofest)
- Teams are saved automatically

✨ **Team Display**
- See all teams on the home page
- View pit numbers and scores
- Delete teams if needed

---

## Customize Your App

### 1. Add Your Logo
Replace `public/robot.png` with your image file

### 2. Add Timer Sound
Replace `public/timer-sound.mp3` with your MP3 file

### 3. Change Colors
Edit `public/styles.css` - look for color values like `#667eea`

---

## Troubleshooting

**Server won't start?**
- Make sure you ran `npm install` first
- Check that port 3000 isn't in use
- Close other apps using port 3000

**Teams not saving?**
- Database is created automatically in `db/` folder
- Check browser console for errors (F12)

**Timer sound not playing?**
- Make sure `timer-sound.mp3` exists in `public/` folder
- Check it's a valid MP3 file

---

## Need More Help?
See **SETUP_GUIDE.md** for detailed information

---

**Ready to score some competitions!** 🏆
