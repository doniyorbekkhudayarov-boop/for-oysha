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

  return (
    <div className="site-shell">
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
    </div>
  );
}

function ArrowUpIcon() {
  return <ArrowDown size={16} className="arrow-up-icon" />;
}

