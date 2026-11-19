// מדריך שימוש: נפתח אוטומטית בפתיחה הראשונה, ואפשר לפתוח שוב בכל רגע (כפתור "?" במסך הבית / מסך המאמן / #/guide).
import { html, el, on, icon, em, ib } from '../ui/dom.js';
import { BRAND } from '../brand.js';
import { COACHES } from '../data/coaches.js';
import { set } from '../store.js';
import { unlock } from '../coach/voice.js';
import { platform, platformName, installSteps, installOneLine } from '../install.js';

const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

const step = (n, t, d) => `<div class="g-step"><span class="g-n num">${n}</span><div><b>${t}</b>${d ? `<span>${d}</span>` : ''}</div></div>`;
const tip = (i, t) => `<div class="g-tip">${em(i, 'acc', 'sm')}<div>${t}</div></div>`;

function slides() {
  const M = COACHES.maya;
  return [
    {
      // שקף פתיחה בעיצוב משלו: המאמנת, שם האפליקציה ושלוש הבטחות קצרות
      id: 'welcome', hero: true,
      visual: `<div class="g-solo"><img src="${M.img}" alt=""><div class="g-solo-cap"><b>${M.name}</b><span>${M.title}</span></div></div>`,
      body: `<div class="g-brand">${BRAND.name}</div><h2>${BRAND.tagline}</h2>
        <div class="g-feats">
          <div>${ib('rocket', 'pri')}<span><b>סולמות במקום משקלים</b>מהשלב הראשון ועד מתח, עמידת ידיים ופלאנש</span></div>
          <div>${ib('vol', 'acc')}<span><b>מאמנת שמדברת איתך</b>מדגימה כל תרגיל, סופרת חזרות ומודדת מנוחות</span></div>
          <div>${ib('pack', 'ok')}<span><b>בכל מקום</b>בבית או בפארק — גם בלי שום ציוד</span></div>
        </div>
        <p class="g-note">המדריך לוקח דקה. אפשר לחזור אליו תמיד מההגדרות.</p>`,
    },
    {
      id: 'install', title: 'שלב 1 · מתקינים על הטלפון', eyebrow: 'פעם אחת',
      visual: `${em('📲', 'pri', 'xl')}`,
      body: (standalone() ? tip('✅', 'האפליקציה כבר מותקנת על המסך הראשי. מעולה!') : '') +
        `<div class="sub" style="font-size:13px;margin:0 0 4px">ההוראות למכשיר שלך: <b>${platformName()}</b></div>` +
        installSteps().map(([t, d], i) => step(i + 1, t, d)).join('') +
        tip('📱', `<b>במכשיר אחר?</b> ${['ios-safari', 'ios-chrome', 'android'].filter((p) => p !== platform()).map(installOneLine).join(' ')}`) +
        tip('🔄', 'האפליקציה <b>מתעדכנת לבד</b> — לא צריך להוריד כלום שוב.') +
        tip('🔔', 'רק מהאפליקציה המותקנת אפשר להפעיל <b>תזכורות</b> (אימון, שתייה, שקילה): הגדרות ← תזכורות.') +
        tip('📴', 'עובדת גם בלי קליטה (אחרי הפתיחה הראשונה).'),
    },
    {
      id: 'setup', title: 'שלב 2 · ההיכרות', eyebrow: '2 דקות',
      visual: `${em('⚙️', 'pri', 'xl')}`,
      body: step(1, 'ציוד', 'מתח, מקבילים, טבעות או עמוד — או כלום. התוכנית נבנית ממה שיש') +
        step(2, 'פרטים אישיים', 'לשון פנייה (זכר/נקבה), שם, גיל, גובה, משקל ומשקל יעד') +
        step(3, 'מטרה', 'שליטה בגוף ומיומנויות / מסה / חיטוב') +
        step(4, 'מבדק רמה', 'שכיבות סמיכה, סקוואטים, מתח ופלאנק — כמה ברצף. 0 זה בסדר גמור; עדיף להעריך נמוך') +
        step(5, 'זמנים', 'כמה אימונים בשבוע וכמה דקות כל אימון. 3 בשבוע מספיקים') +
        step(6, 'פציעות ומה לא אוכלים', 'התוכנית והתפריט יתאימו את עצמם') +
        tip('🎯', 'לא צריך לדייק — <b>השלב בכל סולם מתעדכן לבד</b> לפי הביצועים, ואפשר גם לשנות ידנית.'),
    },
    {
      id: 'cali', title: 'סולמות ומיומנויות', eyebrow: 'השיטה',
      visual: `<div class="g-mock"><div class="gm-bars"><i style="height:30%"></i><i style="height:45%"></i><i style="height:60%"></i><i class="on" style="height:78%"></i><i style="height:95%;opacity:.35"></i></div></div>`,
      body: tip('🚀', '<b>סולמות במקום משקלים</b>: לכל תנועה סולם מהקל לקשה (למשל שכיבות סמיכה על קיר ← על הברכיים ← מלאות ← יהלום ← ביד אחת). כשכל הסטים מגיעים ליעד העליון — עולים שלב לבד.') +
        tip('🎯', '<b>מיומנויות</b>: ישיבת L ועמידת ידיים פתוחות מההתחלה. עליית כוח, לברים, פלאנש ודגל אנושי נפתחות כשהבסיס מוכן. מפעילים ומכבים במסך <b>התוכנית</b>.') +
        tip('🎒', '<b>עובד גם בלי ציוד</b> — רצפה, קיר, כיסא ושולחן יציב. מתח פותח את סולם המשיכה ואת הלברים; מסמנים ציוד בהגדרות.') +
        tip('⚠️', '<b>לאט זה מהר</b>: במיומנויות עם ידיים ישרות נשארים 3 שבועות לפחות בכל שלב, כי גידים מתחזקים לאט מהשריר. כאב חד במפרק — עוצרים.'),
    },
    {
      id: 'home', title: 'מסך הבית', eyebrow: 'כל יום',
      visual: `<div class="g-mock"><div class="gm-row"><span class="gm-ring num">72</span><div><b>הכושר שלך</b><small>כוח · מיומנות · עקביות · גוף</small></div></div>
        <div class="gm-card"><small>האימון הבא</small><b>גוף מלא A</b><span class="gm-btn">התחל אימון</span></div></div>`,
      body: tip('🎯', '<b>האימון הבא</b> — תמיד בראש המסך. לא צמוד לימים בשבוע: פשוט עושים את הבא.') +
        tip('💧', '<b>היום</b> — מים, קלוריות, משקל ומוכנות. הקשה אחת על אריח.') +
        tip('📊', '<b>הכושר שלך</b> — ציון מ-0 עד 100: <b>כוח</b> לפי המיקום בסולמות, <b>מיומנות</b> לפי המיומנויות שבחרת, <b>עקביות</b> לפי האימונים בחודש האחרון, ו<b>גוף</b> אחרי שקילה שנייה.') +
        tip('🎒', '<b>בנסיעה או בלי המתח?</b> כפתור "אימון בלי ציוד" — אותם סולמות, רק רצפה וקיר.') +
        tip('⚙️', `<b>כפתור הגדרות למעלה</b> — ציוד, מראה בהיר/כהה, שעון, גיבוי והמדריך הזה.`),
    },
    {
      id: 'workout', title: `איך מתאמנים עם ${M.name}`, eyebrow: 'הכי חשוב',
      visual: `<div class="g-mock"><div class="gm-tempo"><span class="num">4</span><small>מתוך 8</small></div><div class="gm-phase"><span class="ph-ico go-down">${icon('phDown')}</span>ירידה &nbsp;·&nbsp; <span class="ph-ico go-up">${icon('phUp')}</span>עלייה</div></div>`,
      body: step(0, 'צ׳ק־אין וחימום', '4 שאלות קצרות, ואז 5 תנועות חימום — שורשי כף היד והשכמות תמיד בפנים') +
        step(1, 'מיומנות קודם', 'עמידת ידיים, ישיבת L ודומיהן — בתחילת האימון, כשהגוף רענן') +
        step(2, 'מסתכלים על ההדגמה', 'מכוונים חזרות או שניות עם + / −. "הסבר" = דגשי ביצוע והמיקום בסולם') +
        step(3, 'לוחצים "התחל סט"', `${M.name} סופרת "3, 2, 1… יאללה!" — ומתחילים יחד איתה`) +
        step(4, 'עובדים בקצב שלה', '"ירידה… עלייה!" + מספר כל חזרה. בהחזקות — טיימר, ועוצרים כשהטכניקה נשברת') +
        step(5, 'מדרגים את הסט', 'קל / טוב / קשה / עד הקצה — לפי זה נקבעת העלייה בסולם') +
        step(6, 'מנוחה', 'טיימר עם ספירה לאחור. "דלג" או "+30" לפי הצורך') +
        tip('🔁', '<b>קשה מדי היום, או קל מדי?</b> "החלף תרגיל" נותן שלב אחר באותו סולם — רק לאימון הזה.') +
        tip('🔊', 'להגביר ווליום. הקול עובד גם כשהטלפון על שקט. אם אין קול — לגעת פעם אחת במסך.') +
        tip('📺', '<b>מצב טלוויזיה</b>: באימון בבית אפשר לסובב את הטלפון לרוחב (או ללחוץ על סמל המסך למעלה), ולהפעיל שיקוף מסך לטלוויזיה — AirPlay באייפון, Cast באנדרואיד. ההדגמה בצד אחד, ושעון גדול בצד השני.'),
    },
    {
      id: 'progress', title: 'התוכנית מתקדמת איתך', eyebrow: 'אוטומטי',
      visual: `<div class="g-mock"><div class="gm-bars"><i style="height:30%"></i><i style="height:45%"></i><i style="height:55%"></i><i style="height:75%"></i><i class="on" style="height:95%"></i></div></div>`,
      body: tip('📈', '<b>הגעת ליעד העליון בכל הסטים?</b> מהאימון הבא — שלב קשה יותר. שני אימונים מתחת ליעד? יורדים שלב ובונים מחדש.') +
        tip('🗓️', 'כל 4 שבועות = בלוק: שלושה שבועות עבודה ושבוע פריקה עם פחות סטים.') +
        tip('📊', 'מסך "התקדמות": <b>סיכום שבועי</b>, משקל עם מגמה, מצב כל <b>סולם</b> וגרף לכל תרגיל, ומפת שרירים שבועית.') +
        tip('✏️', 'טעות ברישום? לוחצים על אימון בהיסטוריה — <b>עריכה או מחיקה</b>.'),
    },
    {
      id: 'food', title: 'תזונה', eyebrow: 'דלק לאימון',
      visual: `${em('🍽️', 'pri', 'xl')}`,
      body: tip('🎯', 'יעד קלוריות וחלבון יומי מחושב לפי המשקל והמטרה. בקליסתניקס הכוח נמדד ביחס למשקל הגוף — לכן העודף הקלורי נשאר קטן.') +
        tip('📒', '<b>היום</b>: "הוספת אוכל" — חיפוש ב-600+ מאכלים, עם אחרונים ומועדפים, או <b>סריקת ברקוד</b> של מוצר ארוז. בלשונית <b>תפריט</b>: "אכלתי" רושם ארוחה שלמה.') +
        tip('🍱', 'תפריט לפי מקום: <b>בבית</b>, <b>בעבודה</b> (חדר אוכל או מסעדה) ו<b>בדרכים</b> (בלי מטבח). "תפריט אחר" לרעיונות.') +
        tip('🚫', 'בלשונית <b>העדפות</b>: "מה אני לא אוכל" — מסמנים, וזה לא יופיע לעולם. בלי ירקות? יש טיפים להשלמה.'),
    },
    {
      id: 'go', title: 'מוכנים?', eyebrow: 'עוד דבר אחד',
      visual: `<div class="g-coach"><img src="${M.img}" alt=""></div>`,
      body: tip('💪', '<b>עקביות מנצחת עוצמה.</b> עדיף 3 אימונים טובים בשבוע מ-6 חצאי אימונים.') +
        tip('😴', 'שינה, מים וחלבון — חצי מההתקדמות קורית מחוץ לאימון.') +
        tip('⚠️', 'כאב חד = עוצרים. לפני תוכנית אימונים מומלץ אישור רפואי.') +
        tip('💾', 'הנתונים נשמרים רק בטלפון. האפליקציה תזכיר לגבות פעם בחודש — הקובץ נשמר ב"קבצים" או ב-iCloud.'),
    },
  ];
}

// renderGuide: מסך מלא. onDone נקרא בסיום/דילוג.
export function openGuide({ onDone, first = false } = {}) {
  document.querySelector('.guide')?.remove();
  const S = slides();
  let i = 0;
  const root = el(`<div class="guide" role="dialog" aria-label="מדריך שימוש">
    <div class="g-top"><div class="g-dots">${S.map(() => '<i></i>').join('')}</div><button class="g-skip" data-g="skip">${first ? 'דלג' : 'סגור ✕'}</button></div>
    <div class="g-track">${S.map((s) => html`<section class="g-slide ${s.hero ? 'hero' : ''}" data-id="${s.id}"><div class="g-visual">${s.visual}</div>
      <div class="g-body">${s.hero ? s.body : `<div class="eyebrow">${s.eyebrow}</div><h2>${s.title}</h2>${s.body}`}</div></section>`).join('')}</div>
    <div class="g-nav"><button class="btn" data-g="prev">הקודם</button><button class="btn primary xl" data-g="next">הבא</button></div></div>`);
  document.body.append(root);
  document.body.style.overflow = 'hidden';
  const track = root.querySelector('.g-track');

  const paint = () => {
    root.querySelectorAll('.g-dots i').forEach((d, j) => d.classList.toggle('on', j <= i));
    root.querySelector('[data-g="prev"]').style.display = i ? '' : 'none'; // בשקף הראשון כפתור "הבא" ברוחב מלא
    root.querySelector('[data-g="next"]').textContent = i === S.length - 1 ? (first ? 'בוא נתחיל' : 'סיום ✓') : 'הבא';
  };
  const go = (n) => {
    i = Math.max(0, Math.min(S.length - 1, n));
    track.children[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    track.children[i].querySelector('.g-body').scrollTop = 0;
    paint();
  };
  // החלקה באצבע מעדכנת את המיקום
  let st;
  track.addEventListener('scroll', () => {
    clearTimeout(st);
    st = setTimeout(() => {
      const w = track.clientWidth;
      const n = Math.round(Math.abs(track.scrollLeft) / w);
      if (n !== i) { i = n; paint(); }
    }, 80);
  }, { passive: true });

  const close = () => {
    set((s) => { s.guideSeen = true; return s; });
    root.remove();
    document.body.style.overflow = '';
    onDone?.();
  };
  on(root, 'click', '[data-g]', (e, b) => {
    unlock();
    const a = b.dataset.g;
    if (a === 'skip') close();
    if (a === 'prev') go(i - 1);
    if (a === 'next') (i === S.length - 1 ? close() : go(i + 1));
  });
  paint();
}
