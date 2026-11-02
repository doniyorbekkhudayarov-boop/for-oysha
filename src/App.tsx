import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, Heart, Sparkles, X } from 'lucide-react';
import { letterParagraphs, letterTitle, longLoveLine } from './data/letter';
import { photos } from './data/photos';

const ease = [0.22, 1, 0.36, 1] as const;

function scrollToSection(id: string, reduced: boolean) {
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
}

export function App() {
  const reducedMotion = useReducedMotion() ?? false;
  const [siteUnlocked, setSiteUnlocked] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const letterRef = useRef<HTMLElement>(null);

  const openLetter = () => {
    setIsOpened(true);
    window.setTimeout(() => {
      letterRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }, reducedMotion ? 0 : 500);
  };

  const changePhoto = (step: number) => {
    setSelectedPhoto((current) => current === null ? 0 : (current + step + photos.length) % photos.length);
  };

  useEffect(() => {
    if (selectedPhoto === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedPhoto(null);
      if (event.key === 'ArrowRight') changePhoto(1);
      if (event.key === 'ArrowLeft') changePhoto(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedPhoto]);

  if (!siteUnlocked) return <HeartCatcher onComplete={() => setSiteUnlocked(true)} reducedMotion={reducedMotion} />;

  return (
    <motion.div className="site-shell" initial={reducedMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.7, ease }}>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="К началу страницы">
          <span className="brand-mark">О</span>
          <span className="brand-label">ДЛЯ ОЙШИ</span>
        </a>
        <a className="topbar-link" href="#memories">Наши моменты <span>24</span></a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-wash hero-wash--one" aria-hidden="true" />
          <div className="hero-wash hero-wash--two" aria-hidden="true" />
          <div className="hero-grain" aria-hidden="true" />
          <motion.div
            className="hero-copy"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
          >
            <p className="eyebrow"><span className="eyebrow-line" />СЕГОДНЯ — ТВОЙ ДЕНЬ<span className="eyebrow-line" /></p>
            <h1>С днём рождения,<br /><em>моя Ойша</em><span className="title-heart">♥</span></h1>
            <p className="hero-subtitle">Для самой любимой — с бесконечной любовью.</p>
            <button className={`open-letter-button ${isOpened ? 'is-opened' : ''}`} type="button" onClick={openLetter}>
              <span>{isOpened ? 'Вернуться к письму' : 'Открыть письмо'}</span>
              <ArrowDown size={17} strokeWidth={1.7} />
            </button>
            <p className="hero-note"><Sparkles size={13} /> письмо, которое я давно хотела тебе сказать</p>
          </motion.div>

          <motion.div
            className="hero-photo-wrap"
            initial={reducedMotion ? false : { opacity: 0, y: 28, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.18, ease }}
          >
            <div className="hero-photo-frame">
              <img src={photos[0].src} alt={photos[0].alt} fetchPriority="high" />
              <div className="photo-caption"><span>ты и я</span><span>♡</span></div>
            </div>
            <span className="photo-orbit photo-orbit--one" aria-hidden="true">✳</span>
            <span className="photo-orbit photo-orbit--two" aria-hidden="true">✦</span>
            <span className="photo-stamp" aria-hidden="true">with<br />love</span>
          </motion.div>

          <div className="hero-bottom"><span>01 / ПИСЬМО</span><span className="hero-bottom-line" /><span>ЛИСТАЙ ВНИЗ</span></div>
        </section>

        <section className="letter-section section-pad" id="letter" ref={letterRef}>
          <div className="section-intro">
            <p className="eyebrow eyebrow--rose">СЛОВА ОТ СЕРДЦА</p>
            <h2>Моей самой<br /><em>родной девочке</em></h2>
            <p className="section-deck">Каждое слово — только для тебя.</p>
          </div>
          <motion.article
            className="letter-card"
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="letter-card-top"><span>МОЯ ОЙША</span><Heart size={16} fill="currentColor" strokeWidth={0} /><span>С ЛЮБОВЬЮ</span></div>
            <h3 className="letter-title">{letterTitle}</h3>
            <div className="letter-rule"><span>✦</span></div>
            <div className="letter-copy">
              {letterParagraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className={`letter-paragraph ${index === letterParagraphs.length - 1 ? 'letter-paragraph--closing' : ''}`}
                  initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.3), ease }}
                >{paragraph}</motion.p>
              ))}
              <p className="love-line">{longLoveLine}</p>
            </div>
            <div className="letter-signoff"><span className="signoff-heart">♥</span><span>обнимаю тебя крепко-крепко</span></div>
          </motion.article>
          <button className="text-link" type="button" onClick={() => scrollToSection('memories', reducedMotion)}>
            А теперь — наши воспоминания <ArrowDown size={16} />
          </button>
        </section>

        <section className="memories-section section-pad" id="memories">
          <div className="memories-heading">
            <div>
              <p className="eyebrow eyebrow--rose">МАЛЕНЬКАЯ ЧАСТЬ НАШЕЙ ИСТОРИИ</p>
              <h2>24 момента,<br /><em>которые я храню</em></h2>
            </div>
            <p className="memories-note">Нажми на фотографию,<br />чтобы рассмотреть её ближе.</p>
          </div>
          <div className="memory-grid">
            {photos.map((photo, index) => (
              <motion.button
                className={`memory-card memory-card--${index % 6}`}
                type="button"
                key={photo.id}
                onClick={() => setSelectedPhoto(index)}
                aria-label={`Открыть фотографию ${index + 1} из 24`}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.55, delay: reducedMotion ? 0 : (index % 4) * 0.06, ease }}
                whileHover={reducedMotion ? undefined : { y: -5, rotate: index % 2 ? 0.5 : -0.5 }}
                whileTap={{ scale: 0.985 }}
              >
                <img src={photo.src} alt={photo.alt} loading={index < 4 ? 'eager' : 'lazy'} decoding="async" />
                <span className="memory-index">{String(index + 1).padStart(2, '0')} <span>—</span> 24</span>
                <span className="memory-open" aria-hidden="true"><span>＋</span></span>
              </motion.button>
            ))}
          </div>
        </section>

        <section className="final-section" id="final">
          <div className="final-glow" aria-hidden="true" />
          <motion.div
            className="final-content"
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
          >
            <span className="final-sparkle">✦</span>
            <p className="eyebrow">СЕГОДНЯ И ВСЕГДА</p>
            <h2>Пусть твоё сердце<br />будет <em>счастливым</em></h2>
            <p className="final-wish">Пусть Аллах хранит тебя всегда,<br />моя родная.</p>
            <div className="final-heart" aria-hidden="true"><Heart fill="currentColor" strokeWidth={0} /></div>
            <p className="final-birthday">С днём рождения,<br /><span>моя любимая Ойша</span></p>
            <button className="back-to-top" type="button" onClick={() => scrollToSection('top', reducedMotion)}>
              Снова к началу <ArrowUpIcon />
            </button>
          </motion.div>
          <div className="final-footer"><span>СОЗДАНО С ЛЮБОВЬЮ</span><span>♡</span><span>ДЛЯ ОЙШИ</span></div>
        </section>
      </main>

      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Фотография ${selectedPhoto + 1} из 24`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.24 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <button className="lightbox-close" type="button" onClick={() => setSelectedPhoto(null)} aria-label="Закрыть просмотр"><X size={23} /></button>
            <button className="lightbox-arrow lightbox-arrow--left" type="button" onClick={(event) => { event.stopPropagation(); changePhoto(-1); }} aria-label="Предыдущее фото"><ArrowLeft /></button>
            <motion.figure
              className="lightbox-figure"
              key={selectedPhoto}
              initial={reducedMotion ? false : { opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.28, ease }}
              onClick={(event) => event.stopPropagation()}
            >
              <img src={photos[selectedPhoto].src} alt={photos[selectedPhoto].alt} />
              <figcaption><span>НАШИ МОМЕНТЫ</span><span>{String(selectedPhoto + 1).padStart(2, '0')} / 24</span></figcaption>
            </motion.figure>
            <button className="lightbox-arrow lightbox-arrow--right" type="button" onClick={(event) => { event.stopPropagation(); changePhoto(1); }} aria-label="Следующее фото"><ArrowRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type FallingHeart = {
  id: number;
  x: number;
  drift: number;
  size: number;
  duration: number;
  rotation: number;
};

const HEART_GOAL = 20;

function makeFallingHeart(id: number): FallingHeart {
  return {
    id,
    x: 7 + Math.random() * 86,
    drift: -35 + Math.random() * 70,
    size: 43 + Math.random() * 20,
    duration: 5.6 + Math.random() * 2.1,
    rotation: -25 + Math.random() * 50,
  };
}

function HeartCatcher({ onComplete, reducedMotion }: { onComplete: () => void; reducedMotion: boolean }) {
  const [caught, setCaught] = useState(0);
  const [complete, setComplete] = useState(false);
  const [drops, setDrops] = useState<FallingHeart[]>(() => Array.from({ length: 7 }, (_, i) => makeFallingHeart(i + 1)));
  const nextId = useRef(8);
  const [screenHeight, setScreenHeight] = useState(() => typeof window === 'undefined' ? 800 : window.innerHeight);

  useEffect(() => {
    const resize = () => setScreenHeight(window.innerHeight);
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    if (complete) return;
    const timer = window.setInterval(() => {
      setDrops((current) => {
        if (current.length >= 8) return current;
        return [...current, makeFallingHeart(nextId.current++)];
      });
    }, 650);
    return () => window.clearInterval(timer);
  }, [complete]);

  useEffect(() => {
    if (caught < HEART_GOAL || complete) return;
    setComplete(true);
    const timer = window.setTimeout(onComplete, reducedMotion ? 650 : 1850);
    return () => window.clearTimeout(timer);
  }, [caught, complete, onComplete, reducedMotion]);

  const catchHeart = (id: number) => {
    setDrops((current) => current.filter((heart) => heart.id !== id));
    setCaught((current) => Math.min(HEART_GOAL, current + 1));
  };

  return (
    <motion.main
      className="catcher-screen"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
      transition={{ duration: reducedMotion ? 0.2 : 0.7, ease }}
    >
      <div className="catcher-wash catcher-wash--left" aria-hidden="true" />
      <div className="catcher-wash catcher-wash--right" aria-hidden="true" />
      <div className="catcher-frame" aria-hidden="true" />

      <div className="catcher-brand"><span className="brand-mark">О</span><span>МАЛЕНЬКИЙ СЮРПРИЗ ДЛЯ ОЙШИ</span></div>

      <div className="catcher-copy">
        <p className="eyebrow"><span className="eyebrow-line" />ПЕРЕД ТЕМ КАК ОТКРЫТЬ ПИСЬМО<span className="eyebrow-line" /></p>
        <h1>Поймай <em>20 сердечек</em></h1>
        <p className="catcher-hint">Они падают для тебя — нажимай на каждое, чтобы собрать<br className="desktop-break" /> и открыть своё поздравление.</p>

        <div className="catcher-progress-card" aria-live="polite">
          <div className="catcher-progress-count"><span>{String(caught).padStart(2, '0')}</span><i>/</i><span>20</span></div>
          <div className="catcher-progress-hearts" aria-hidden="true">
            {Array.from({ length: HEART_GOAL }, (_, index) => (
              <Heart key={index} className={index < caught ? 'progress-heart is-filled' : 'progress-heart'} fill={index < caught ? 'currentColor' : 'none'} strokeWidth={1.5} />
            ))}
          </div>
          <p>{caught === 0 ? 'твоё маленькое испытание любви' : caught === HEART_GOAL ? 'все сердечки пойманы!' : 'каждое сердечко приближает сюрприз'}</p>
        </div>
      </div>

      <div className="falling-field" aria-label="Поле с падающими сердечками">
        <AnimatePresence>
          {drops.map((drop) => (
            <motion.button
              key={drop.id}
              className="falling-heart"
              type="button"
              aria-label={`Поймать сердечко. Собрано ${caught} из 20`}
              style={{ left: `${drop.x}%`, width: drop.size + 28, height: drop.size + 38 }}
              initial={{ y: -130, opacity: 0, scale: 0.65, rotate: drop.rotation * -0.6 }}
              animate={{ y: screenHeight + 150, opacity: [0, 1, 1, 0.96], scale: [0.72, 1, 1.04], rotate: drop.rotation, x: drop.drift }}
              exit={{ opacity: 0, scale: 1.5, transition: { duration: reducedMotion ? 0 : 0.16 } }}
              transition={{ duration: reducedMotion ? drop.duration * 1.35 : drop.duration, ease: 'linear' }}
              whileHover={reducedMotion ? undefined : { scale: 1.16 }}
              whileTap={{ scale: 0.74 }}
              onClick={() => catchHeart(drop.id)}
              onAnimationComplete={() => setDrops((current) => current.filter((heart) => heart.id !== drop.id))}
            >
              <Heart className="falling-heart-icon" size={drop.size} fill="currentColor" strokeWidth={1.2} />
              <span className="heart-glint" aria-hidden="true">✦</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <p className="catcher-bottom-note"><span>✦</span> Лови сердечки, пока они летят <span>✦</span></p>

      <AnimatePresence>
        {complete && (
          <motion.div
            className="catcher-complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.5 }}
          >
            <motion.div
              className="complete-card"
              initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="complete-hearts" aria-hidden="true">♥　♥　♥</div>
              <p className="eyebrow eyebrow--rose">ТЫ СОБРАЛА ВСЕ 20</p>
              <h2>Сюрприз уже<br /><em>ждёт тебя</em></h2>
              <p>Открываю поздравление…</p>
              <div className="complete-spinner"><Heart size={17} fill="currentColor" strokeWidth={0} /></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}

function ArrowUpIcon() {
  return <ArrowDown size={16} className="arrow-up-icon" />;
}
