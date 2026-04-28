import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { io } from 'socket.io-client'
import TopBar from './components/TopBar'
import BottomBar from './components/BottomBar'
import Home from './views/Home'
import HomeOrdovician from './views/HomeOrdovician'
import HomeDevonian from './views/HomeDevonian'
import SectionIntro from './views/SectionIntro'
import HomePermian from './views/HomePermian'
import SilurianGlobe from './views/SilurianGlobe'
import SilurianSpecimen from './views/SilurianSpecimen'
import SilurianDoubleSpecimen from './views/SilurianDoubleSpecimen'
import DevonianExtinctionEnvironments from './views/DevonianExtinctionEnvironments'
import ExtinctionContent from './views/ExtinctionContent'
import ExtinctionContentDevonian from './views/ExtinctionContentDevonian'
import SpecimenDetail from './views/SpecimenDetail'
import { slidesData, periodStartIndex } from './data/slides'
import EventHeader from './views/EventHeader'
import EventDetail from './views/EventDetail'
import DoubleSpecimenDetail from './views/DoubleSpecimenDetail'
import MorphingPageDots from './components/MorphingPageDots'
import DesignEditor from './components/DesignEditor'
import designSettings from './data/design_settings.json'
import './App.css'

function getHashForSlide(slide) {
  if (!slide) return '';
  const sameSectionSlides = slidesData.filter(s => s.period === slide.period && s.section === slide.section);
  const relativeIndex = sameSectionSlides.findIndex(s => s === slide);

  if (slide.section === 'biodiversidade') {
    return `${slide.period}-${slide.section}-${relativeIndex}`;
  }

  if (slide.id) {
    return `${slide.period}-${slide.section}-${slide.id}`;
  }
  return `${slide.period}-${slide.section}-${relativeIndex}`;
}

function getIndexForHash(hashStr) {
  const cleanHash = hashStr.replace('#', '');
  if (!cleanHash) return 0;
  
  const index = slidesData.findIndex(slide => {
    const sameSectionSlides = slidesData.filter(s => s.period === slide.period && s.section === slide.section);
    const relativeIndex = sameSectionSlides.findIndex(s => s === slide);

    if (slide.section === 'biodiversidade') {
      return `${slide.period}-${slide.section}-${relativeIndex}` === cleanHash;
    }

    if (slide.id) {
      return `${slide.period}-${slide.section}-${slide.id}` === cleanHash;
    }
    return `${slide.period}-${slide.section}-${relativeIndex}` === cleanHash;
  });
  return index >= 0 ? index : 0;
}

function App() {
  const [slideIndex, setSlideIndex] = useState(() => getIndexForHash(window.location.hash));
  const [slideDirection, setSlideDirection] = useState('up');

  // Aplica configurações do design_settings.json ao trocar de slide
  useEffect(() => {
    const currentSlide = slidesData[slideIndex];
    if (!currentSlide) return;

    const { period, section, id } = currentSlide;
    // Slides sem id (ex: section_intro) usam o viewId como chave
    const settingsId = id || computeViewId(currentSlide);
    const settings = designSettings[period]?.[section]?.[settingsId] ||
                     designSettings[period]?.["biodiversidade"]?.["default"];

    if (settings) {
      Object.entries(settings).forEach(([key, value]) => {
        // Suporta novo formato (chaves CSS diretas com --) e formato legado (camelCase)
        if (key.startsWith('--')) {
          document.documentElement.style.setProperty(key, value);
        } else {
          const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          document.documentElement.style.setProperty(`--devonian-${settingsId}-${cssKey}`, value);
        }
      });
    }
  }, [slideIndex]);


  // Sincroniza a URL com o slideIndex atual
  useEffect(() => {
    const newHash = getHashForSlide(slidesData[slideIndex]);
    if (newHash) {
      window.history.replaceState(null, '', `#${newHash}`);
    }
  }, [slideIndex]);

  // Permite navegação usando os botões de voltar/avançar do navegador
  useEffect(() => {
    const handleHashChange = () => {
      const parsed = getIndexForHash(window.location.hash);
      if (parsed !== slideIndex) {
        setSlideDirection(parsed > slideIndex ? 'right' : 'left');
        setSlideIndex(parsed);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [slideIndex]);

  const handleNavigate = useCallback((directionStr, targetAbsoluteIndex = null) => {
    setSlideDirection(directionStr);

    if (targetAbsoluteIndex !== null) {
      setSlideIndex(targetAbsoluteIndex);
      return;
    }

    setSlideIndex((prevIndex) => {
      const currentPeriod = slidesData[prevIndex].period;
      const currentSection = slidesData[prevIndex].section;
      const sectionSlides = slidesData
        .map((s, idx) => ({ ...s, absoluteIndex: idx }))
        .filter(s => s.section === currentSection && s.period === currentPeriod);

      const sectionIndex = sectionSlides.findIndex(s => s.absoluteIndex === prevIndex);
      let newIndex = prevIndex;

      if (directionStr === 'right') {
        if (sectionIndex < sectionSlides.length - 1) {
          newIndex = sectionSlides[sectionIndex + 1].absoluteIndex;
        } else {
          newIndex = sectionSlides[0].absoluteIndex;
        }
      } else if (directionStr === 'left') {
        if (sectionIndex > 0) {
          newIndex = sectionSlides[sectionIndex - 1].absoluteIndex;
        }
      } else if (directionStr === 'down') {
        newIndex = periodStartIndex[currentPeriod] ?? 0;
      }

      return newIndex;
    });
  }, []);

  // Socket IO — encoder
  useEffect(() => {
    const socket = io('https://localhost:3000', {
      secure: true,
      rejectUnauthorized: false
    });
    socket.on('encoder_action', (command) => {
      if (command === 'LEFT')  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      if (command === 'RIGHT') window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      if (command === 'CLICK') window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });
    return () => socket.disconnect();
  }, []);

  // Teclas 1 e 2 — trocar período
  useEffect(() => {
    const handler = (e) => {
      if (e.key === '1') { setSlideDirection('left');  setSlideIndex(periodStartIndex.ordoviciano); }
      if (e.key === '2') { setSlideDirection('right'); setSlideIndex(periodStartIndex.devoniano); }
      if (e.key === '3') { setSlideDirection('right'); setSlideIndex(periodStartIndex.permiano); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const slideVariants = {
    initial: (dir) => {
      let x = 0, y = 0;
      if (dir === 'right') x = 1080;
      if (dir === 'left')  x = -1080;
      if (dir === 'down')  y = -1920;
      if (dir === 'up')    y = 1920;
      return { x, y, opacity: 0, position: 'absolute', width: '100%', height: '100%', zIndex: 5 };
    },
    animate: { x: 0, y: 0, opacity: 1, position: 'absolute', width: '100%', height: '100%', zIndex: 10, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } },
    exit: (dir) => {
      let x = 0, y = 0;
      if (dir === 'right') x = -1080;
      if (dir === 'left')  x = 1080;
      if (dir === 'down')  y = 1920;
      if (dir === 'up')    y = -1920;
      return { x, y, opacity: 0, position: 'absolute', width: '100%', height: '100%', zIndex: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } };
    }
  };

  const currentSlide   = slidesData[slideIndex];
  const type           = currentSlide.type;
  const currentPeriod  = currentSlide.period;
  const currentSection = currentSlide.section;

  const sectionSlides = slidesData
    .map((s, idx) => ({ ...s, absoluteIndex: idx }))
    .filter(s => s.section === currentSection && s.period === currentPeriod);

  const sectionIndex = sectionSlides.findIndex(s => s.absoluteIndex === slideIndex);

  // Imagens de referência por página
  const refMapping = {
    // Ordoviciano (pages 01-17)
    'ordoviciano-home-0':            '/assets/referencias/page-01.jpg',
    'ordoviciano-biodiversidade-intro': '/assets/referencias/page-02.jpg',
    'ordoviciano-biodiversidade-1':  '/assets/referencias/page-03.jpg',
    'ordoviciano-biodiversidade-2':  '/assets/referencias/page-04.jpg',
    'ordoviciano-biodiversidade-3':  '/assets/referencias/page-05.jpg',
    'ordoviciano-biodiversidade-4':  '/assets/referencias/page-06.jpg',
    'ordoviciano-biodiversidade-5':  '/assets/referencias/page-07.jpg',
    'ordoviciano-biodiversidade-6':  '/assets/referencias/page-08.jpg',
    'ordoviciano-biodiversidade-7':  '/assets/referencias/page-09.jpg',
    'ordoviciano-extincao-intro':    '/assets/referencias/page-10.jpg',
    'ordoviciano-extincao-1':        '/assets/referencias/page-11.jpg',
    'ordoviciano-pos_extincao-intro':'/assets/referencias/page-12.jpg',
    'ordoviciano-pos_extincao-1':    '/assets/referencias/page-13.jpg',
    'ordoviciano-pos_extincao-2':    '/assets/referencias/page-14.jpg',
    'ordoviciano-pos_extincao-3':    '/assets/referencias/page-15.jpg',
    'ordoviciano-pos_extincao-4':    '/assets/referencias/page-16.jpg',
    'ordoviciano-pos_extincao-5':    '/assets/referencias/page-17.jpg',
    // Devoniano (pages 18-43)
    'devoniano-home-intro': '/assets/referencias/page-18.jpg',
    'devoniano-biodiversidade-intro': '/assets/referencias/page-19.jpg',
    'devoniano-biodiversidade-1': '/assets/referencias/page-20.jpg',
    'devoniano-biodiversidade-2': '/assets/referencias/page-21.jpg',
    'devoniano-biodiversidade-3': '/assets/referencias/page-22.jpg',
    'devoniano-biodiversidade-4': '/assets/referencias/page-23.jpg',
    'devoniano-biodiversidade-5': '/assets/referencias/page-24.jpg',
    'devoniano-biodiversidade-6': '/assets/referencias/page-25.jpg',
    'devoniano-biodiversidade-7': '/assets/referencias/page-26.jpg',
    'devoniano-biodiversidade-8': '/assets/referencias/page-27.jpg',
    'devoniano-biodiversidade-9': '/assets/referencias/page-28.jpg',
    'devoniano-biodiversidade-10': '/assets/referencias/page-29.jpg',
    'devoniano-biodiversidade-11': '/assets/referencias/page-30.jpg',
    'devoniano-extincao-intro': '/assets/referencias/page-31.jpg',
    'devoniano-extincao-1': '/assets/referencias/page-32.jpg',
    'devoniano-pos_extincao-intro': '/assets/referencias/page-33.jpg',
    'devoniano-pos_extincao-1': '/assets/referencias/page-34.jpg',
    'devoniano-pos_extincao-2': '/assets/referencias/page-35.jpg',
    'devoniano-pos_extincao-3': '/assets/referencias/page-36.jpg',
    'devoniano-pos_extincao-4': '/assets/referencias/page-37.jpg',
    'devoniano-pos_extincao-5': '/assets/referencias/page-38.jpg',
    'devoniano-pos_extincao-6': '/assets/referencias/page-39.jpg',
    'devoniano-pos_extincao-7': '/assets/referencias/page-40.jpg',
    'devoniano-pos_extincao-8': '/assets/referencias/page-41.jpg',
    'devoniano-pos_extincao-9': '/assets/referencias/page-42.jpg',
    'devoniano-pos_extincao-10': '/assets/referencias/page-43.jpg',
  };

  // Calcula viewId para qualquer slide, usado pelo DesignEditor
  function computeViewId(slide) {
    if (!slide) return null;
    const { type, period, section, id } = slide;
    if (type === 'home_ordoviciano') return 'ordoviciano-home';
    if (type === 'home_devonian')    return 'devoniano-home';
    if (type === 'section_intro') {
      if (section === 'biodiversidade') return `${period}-bio-intro`;
      if (section === 'extincao')       return `${period}-extincao-intro`;
      if (section === 'pos_extincao')   return `${period}-pos-extincao-intro`;
    }
    if (type === 'devonian_extinction_environments') return 'devoniano-extincao-ambientes';
    if (type === 'extinction_content') return `${period}-extincao-content`;
    if (type === 'extinction_content_devonian') return `${period}-extincao-content`;
    if (type === 'silurian_globe') return `${period}-pos-globe`;
    if (type === 'single_species' || type === 'double_species' || type === 'silurian_specimen' || type === 'silurian_double_specimen') {
      if (period === 'devoniano' && section === 'biodiversidade') return `devoniano-bio-${id}`;
      if (period === 'devoniano' && section === 'pos_extincao')   return `devoniano-pos-carbon-${id}`;
      if (period === 'ordoviciano' && section === 'biodiversidade') return id; // já inclui 'ord-' no id
      if (period === 'ordoviciano' && section === 'pos_extincao')   return `ordoviciano-pos-${id}`;
    }
    return null;
  }

  let pageKey = sectionIndex;
  if (type === 'section_intro' || type === 'home_devonian') pageKey = 'intro';
  const refKey = `${currentPeriod}-${currentSection}-${pageKey}`;
  const referenceImage = refMapping[refKey] || null;
  const viewId = computeViewId(currentSlide);

  const scopedNavigate = (dir, targetSectionIndex = null) => {
    if (targetSectionIndex !== null) {
      handleNavigate(dir, sectionSlides[targetSectionIndex].absoluteIndex);
    } else {
      handleNavigate(dir);
    }
  };

  const absoluteNavigate = (dir, absoluteIdx) => handleNavigate(dir, absoluteIdx);

  return (
    <>
      <TopBar />
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        <AnimatePresence custom={slideDirection} initial={false}>
          {(() => {
            let ComponentToRender = null;
            const key = `${type}-${slideIndex}`;

            if      (type === 'home')                       ComponentToRender = <Home onNavigate={handleNavigate} />;
            else if (type === 'home_ordoviciano')           ComponentToRender = <HomeOrdovician onNavigate={absoluteNavigate} />;
            else if (type === 'home_devonian')              ComponentToRender = <HomeDevonian onNavigate={absoluteNavigate} />;
            else if (type === 'home_permiano')              ComponentToRender = <HomePermian onNavigate={absoluteNavigate} />;
            else if (type === 'section_intro')              ComponentToRender = <SectionIntro slideData={currentSlide} onNavigate={scopedNavigate} />;
            else if (type === 'extinction_content')         ComponentToRender = <ExtinctionContent slideData={currentSlide} onNavigate={scopedNavigate} />;
            else if (type === 'extinction_content_devonian') ComponentToRender = <ExtinctionContentDevonian slideData={currentSlide} onNavigate={scopedNavigate} />;
            else if (type === 'single_species')             ComponentToRender = <SpecimenDetail slideIndex={sectionIndex} totalSlides={sectionSlides.length} onNavigate={scopedNavigate} slideData={currentSlide} />;
            else if (type === 'event_header')               ComponentToRender = <EventHeader slideIndex={sectionIndex} totalSlides={sectionSlides.length} onNavigate={scopedNavigate} slideData={currentSlide} />;
            else if (type === 'event_detail')               ComponentToRender = <EventDetail slideIndex={sectionIndex} totalSlides={sectionSlides.length} onNavigate={scopedNavigate} slideData={currentSlide} />;
            else if (type === 'silurian_globe')             ComponentToRender = <SilurianGlobe slideData={currentSlide} onNavigate={scopedNavigate} viewId={viewId} />;
            else if (type === 'silurian_specimen')          ComponentToRender = <SilurianSpecimen slideData={currentSlide} onNavigate={scopedNavigate} />;
            else if (type === 'silurian_double_specimen')   ComponentToRender = <SilurianDoubleSpecimen slideData={currentSlide} onNavigate={scopedNavigate} />;
            else if (type === 'devonian_extinction_environments') ComponentToRender = <DevonianExtinctionEnvironments slideData={currentSlide} onNavigate={scopedNavigate} />;
            else if (type === 'double_species')             ComponentToRender = <DoubleSpecimenDetail slideIndex={sectionIndex} totalSlides={sectionSlides.length} onNavigate={scopedNavigate} slideData={currentSlide} />;

            return (
              <motion.div
                key={key}
                custom={slideDirection}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {ComponentToRender}
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {currentSection !== 'home' && (
          <div style={{ position: 'absolute', bottom: '100px', width: '100%', zIndex: 100 }}>
            <MorphingPageDots
              total={sectionSlides.length}
              activeIndex={sectionIndex}
              onChange={(index, direction) => scopedNavigate(direction, index)}
            />
          </div>
        )}

        {currentSection === 'home' && <BottomBar />}

        {/* Prerender invisível para forçar decode das imagens antes da transição */}
        <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}>
          {slidesData.map((slide, i) => {
            const src = slide?.videoSrc || slide?.bgImage || slide?.imageSrc;
            if (!src || !/\.(png|jpe?g|gif|webp)$/i.test(src)) return null;
            return <img key={i} src={src} alt="" />;
          })}
        </div>

        <DesignEditor
          referenceImage={referenceImage}
          viewId={viewId}
          period={currentPeriod}
          section={currentSection}
          slideId={currentSlide.id || viewId}
          savedSettings={(() => {
            const sid = currentSlide.id || viewId;
            const raw = designSettings[currentPeriod]?.[currentSection]?.[sid] || null;
            if (!raw) return null;
            // Normaliza formato antigo (camelCase) para CSS props (--devonian-{id}-*)
            return Object.fromEntries(
              Object.entries(raw).map(([k, v]) => {
                if (k.startsWith('--')) return [k, v];
                const cssKey = k.replace(/([A-Z])/g, '-$1').toLowerCase();
                return [`--devonian-${sid}-${cssKey}`, v];
              })
            );
          })()}
        />
      </div>
    </>
  );
}

export default App;
