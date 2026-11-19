# קליסתניקס 🤸

אפליקציית אימוני משקל גוף (PWA) בעברית, עם מאמנת וירטואלית — מאיה — שמדגימה כל תרגיל וסופרת בקול.
במקום משקלים: **סולמות התקדמות** מהשלב הראשון (שכיבות סמיכה על קיר, תלייה על מתח) ועד מתח, עמידת ידיים, עליית כוח, לברים ופלאנש.
עובדת בבית או בפארק, גם בלי שום ציוד. כולל תזונה, מעקב משקל, שעון דופק וגיבוי.

שיטה ומקורות — מה מבוסס מחקר ומה מוסכמת מאמנים: [docs/CALISTHENICS.md](docs/CALISTHENICS.md)

> אפליקציה עצמאית. היא חולקת קוד עם [סטודיו כושר](https://github.com/dudutal-dev/Fitness-studio) (שבו קליסתניקס הוא אחד המסלולים)
> ועם [LOHEM](https://github.com/dudutal-dev/Fitness-center), אבל כאן יש רק קליסתניקס: מאמנת אחת, בלי חדר כושר ובלי ריצה.
> שלוש האפליקציות רצות באותו דומיין, ולכן לכל אחת מפתח אחסון ומטמון משלה (כאן: `calisthenics_v1`, `cali-…`).
> גיבוי מהסטודיו שיש בו סולמות אפשר לשחזר כאן, והוא ייכנס כמסלול קליסתניקס.
> בקוד נשארו מנועי חדר הכושר והריצה (לא בשימוש בממשק), כדי שעדכונים מהסטודיו ייכנסו בקלות.

## הפעלה מקומית
```bash
npm start            # שרת סטטי על http://localhost:8080
npm test             # בדיקות יחידה למנועים
```
אין תלויות ואין build. כל תיקייה סטטית (GitHub Pages / Cloudflare Pages / Netlify) מתאימה לאירוח.
בטלפון: לפתוח את הכתובת → "הוספה למסך הבית" → נפתחת כמו אפליקציה, עובדת גם בלי קליטה.

## פרסום
כל push לענף מתפרסם ב-GitHub Pages: https://dudutal-dev.github.io/Calisthenics/
לפני כל commit: `node tools/release.mjs "תיאור"` (הוסף `--media` אם קבצי וידאו/קול השתנו) — כך האפליקציות המותקנות מתעדכנות לבד.

## שרת התזכורות (Cloudflare Worker)
`worker/` — `index.js` (API + קרון), `webpush.js` (הצפנה + VAPID), `schedule.js` (מתי לשלוח). פרוס כ-`lohem-reminders` עם KV `SUBS`, משתנים `VAPID_PUBLIC`, `VAPID_SUBJECT` וסוד `VAPID_PRIVATE_JWK`, וקרון `*/5 * * * *`.

## יצירת הנכסים מחדש (ElevenLabs)
```bash
python3 tools/gen_coaches.py                      # דיוקנאות המאמנים
python3 tools/gen_demos.py [exercise_id ...]      # פריים + וידאו 4 שנ׳ לכל תרגיל ולכל מאמן (ממשיך מאיפה שעצר)
python3 tools/build_assets.py                     # כיווץ לווב (mp4 540p, webp, אייקונים)
python3 tools/analyze_demos.py                    # זיהוי קטעי החזרות בכל וידאו (לסנכרון עם הספירה)
NODE_USE_ENV_PROXY=1 node tools/gen_voice.mjs     # 246 קבצי קול (eleven_v3, עברית, ניקוד למילים קצרות)
python3 tools/verify_voice.py lines.json          # בדיקת הגייה: תמלול חוזר והשוואה
python3 tools/fix_voice.py lines2.json 0.9        # יצירה מחדש של קבצים חלשים (best-of-N)
python3 tools/trim_voice.py [--level-only a/b.mp3 …]  # חיתוך שקט + השוואת עוצמה; --level-only: חיתוך רק לקליפים שנוצרו מחדש
```
מפתח: משתנה סביבה `XI_API_KEY`.

## מאגר המזון
```bash
python3 tools/build_foods.py moh.json   # בונה את js/data/foods.js ואת docs/NUTRITION_SOURCES.md
```
`moh.json` = שלוש טבלאות ממאגר התזונה הלאומי ב-data.gov.il (`foods`, `units`, `weights`). הרשימה שנבחרה ידנית נמצאת בסקריפט (`SPEC`); הרחבת המאגר ב-`tools/foods_extra.json`.

## מבנה
```
index.html · manifest.webmanifest · sw.js
css/app.css                  מערכת עיצוב
js/app.js                    ניתוב וניווט
js/store.js                  מצב + שמירה אוטומטית
js/engine/                   program · progression · running · nutrition · stats
js/data/                     exercises · foods · voice-lines · coaches
js/views/                    onboarding · home · plan · workout · run · progress · nutrition · coach
js/coach/voice.js            תור השמעת המאמן
js/devices/                  Garmin: דופק BLE, GPS, מפענח FIT/TCX/GPX/ZIP
assets/                      coaches · demos/maya · voice/maya · icons · fonts (Heebo, Rubik — OFL)
tools/                       סקריפטי יצירת נכסים
tests/                       בדיקות
```
