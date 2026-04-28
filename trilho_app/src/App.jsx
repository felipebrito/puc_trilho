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

  // Injetor de Estilos JSON para garantir fidelidade
  useEffect(() => {
    const currentSlide = slidesData[slideIndex];
    if (!currentSlide) return;

    const period = currentSlide.period;
    const section = currentSlide.section;
    const id = currentSlide.id;

    const settings = designSettings[period]?.[section]?.[id] || 
                     designSettings[period]?.["biodiversidade"]?.["default"];

    // PRIORIDADE: Se o usuário já mexeu no Editor para essa view, NÃO aplica o JSON
    const savedConfigs = localStorage.getItem('kiosk-design-config');
    if (savedConfigs) {
      const parsed = JSON.parse(savedConfigs);
      if (parsed[id]) return; 
    }

    if (settings) {
      // Reset da visibilidade do fundo por padrão
      document.documentElement.style.setProperty('--devonian-base-bg-display', 'block');

      Object.entries(settings).forEach(([key, value]) => {
        if (key === 'hideBaseBg') {
          document.documentElement.style.setProperty('--devonian-base-bg-display', value ? 'none' : 'block');
          return;
        }
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        document.documentElement.style.setProperty(`--devonian-${cssKey}`, value);
        document.documentElement.style.setProperty(`--devonian-${id}-${cssKey}`, value);
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

  // Reference and Editor Mapping
  const mapping = {
    'ordoviciano-home': { ref: '/assets/referencias/page-01.jpg', viewId: 'ordoviciano-home' },
    'ordoviciano-biodiversidade-intro': { ref: '/assets/referencias/page-02.jpg', viewId: 'ordoviciano-bio-intro' },
    'ordoviciano-biodiversidade-1': { ref: '/assets/referencias/page-03.jpg', viewId: 'ord-homotelus' },
    'ordoviciano-biodiversidade-2': { ref: '/assets/referencias/page-04.jpg', viewId: 'ord-cameroceras' },
    'ordoviciano-biodiversidade-3': { ref: '/assets/referencias/page-05.jpg', viewId: 'ord-megalograptus' },
    'ordoviciano-biodiversidade-4': { ref: '/assets/referencias/page-06.jpg', viewId: 'ord-balacrinus' },
    'ordoviciano-biodiversidade-5': { ref: '/assets/referencias/page-07.jpg', viewId: 'ord-sacabambaspis' },
    'ordoviciano-biodiversidade-6': { ref: '/assets/referencias/page-08.jpg', viewId: 'ord-promissum' },
    'ordoviciano-biodiversidade-7': { ref: '/assets/referencias/page-09.jpg', viewId: 'ord-sowerbyella' },
    'ordoviciano-extincao-intro': { ref: '/assets/referencias/page-10.jpg', viewId: 'ordoviciano-extincao-intro' },
    'ordoviciano-extincao-1': { ref: '/assets/referencias/page-11.jpg', viewId: 'ordoviciano-extincao-content' },
    'ordoviciano-pos_extincao-intro': { ref: '/assets/referencias/page-12.jpg', viewId: 'ordoviciano-pos-intro' },
    'ordoviciano-pos_extincao-1': { ref: '/assets/referencias/page-13.jpg', viewId: 'ordoviciano-pos-globe' },
    'ordoviciano-pos_extincao-2': { ref: '/assets/referencias/page-14.jpg', viewId: 'ordoviciano-pos-dalmanites' },
    'ordoviciano-pos_extincao-dalmanites': { ref: '/assets/referencias/page-14.jpg', viewId: 'ordoviciano-pos-dalmanites' },
    'ordoviciano-pos_extincao-3': { ref: '/assets/referencias/page-15.jpg', viewId: 'ordoviciano-pos-halysites' },
    'ordoviciano-pos_extincao-4': { ref: '/assets/referencias/page-16.jpg', viewId: 'ordoviciano-pos-cooksonia' },
    'ordoviciano-pos_extincao-atrypa': { ref: '/assets/referencias/page-17.jpg', viewId: 'ordoviciano-pos-atrypa' },
    'devoniano-home': { ref: '/assets/referencias/page-18.jpg', viewId: 'devoniano-home' },
    'devoniano-biodiversidade-intro': { ref: '/assets/referencias/page-19.jpg', viewId: 'devoniano-bio-intro' },
    'devoniano-biodiversidade-1': { ref: '/assets/referencias/page-20.jpg', viewId: 'devoniano-bio-dunkleosteus' },
    'devoniano-biodiversidade-2': { ref: '/assets/referencias/page-21.jpg', viewId: 'devoniano-bio-campbellodus' },
    'devoniano-biodiversidade-3': { ref: '/assets/referencias/page-22.jpg', viewId: 'devoniano-bio-ctenacanthus' },
    'devoniano-biodiversidade-4': { ref: '/assets/referencias/page-23.jpg', viewId: 'devoniano-bio-gogonasus' },
    'devoniano-biodiversidade-5': { ref: '/assets/referencias/page-24.jpg', viewId: 'devoniano-bio-griphognatus' },
    'devoniano-biodiversidade-6': { ref: '/assets/referencias/page-25.jpg', viewId: 'devoniano-bio-furcaster' },
    'devoniano-biodiversidade-7': { ref: '/assets/referencias/page-26.jpg', viewId: 'devoniano-bio-palaeoisopus' },
    'devoniano-biodiversidade-8': { ref: '/assets/referencias/page-27.jpg', viewId: 'devoniano-bio-archaeopteris' },
    'devoniano-biodiversidade-9': { ref: '/assets/referencias/page-28.jpg', viewId: 'devoniano-bio-tiktaalik' },
    'devoniano-biodiversidade-10': { ref: '/assets/referencias/page-29.jpg', viewId: 'devoniano-bio-ichthyostega' },
    'devoniano-biodiversidade-11': { ref: '/assets/referencias/page-30.jpg', viewId: 'devoniano-bio-drepanophycus' },
    'devoniano-extincao-intro': { ref: '/assets/referencias/page-31.jpg', viewId: 'devoniano-extincao-intro' },
    'devoniano-extincao-1': { ref: '/assets/referencias/page-32.jpg', viewId: 'devoniano-extincao-ambientes' },
    'devoniano-pos_extincao-intro': { ref: '/assets/referencias/page-33.jpg', viewId: 'devoniano-pos-extincao-intro' },
    'devoniano-pos_extincao-1': { ref: '/assets/referencias/page-34.jpg', viewId: 'devoniano-pos-extincao-globe' },
    'devoniano-pos_extincao-2': { ref: '/assets/referencias/page-35.jpg', viewId: 'devoniano-pos-extincao-summary' },
    'devoniano-pos_extincao-3': { ref: '/assets/referencias/page-36.jpg', viewId: 'devoniano-pos-carbon-meganeura' },
    'devoniano-pos_extincao-4': { ref: '/assets/referencias/page-37.jpg', viewId: 'devoniano-pos-carbon-stethacanthus' },
    'devoniano-pos_extincao-5': { ref: '/assets/referencias/page-38.jpg', viewId: 'devoniano-pos-carbon-arthropleura' },
    'devoniano-pos_extincao-6': { ref: '/assets/referencias/page-39.jpg', viewId: 'devoniano-pos-carbon-amphibamus' },
    'devoniano-pos_extincao-7': { ref: '/assets/referencias/page-40.jpg', viewId: 'devoniano-pos-carbon-sphenophyllum' },
    'devoniano-pos_extincao-8': { ref: '/assets/referencias/page-41.jpg', viewId: 'devoniano-pos-carbon-calamites' },
    'devoniano-pos_extincao-9': { ref: '/assets/referencias/page-42.jpg', viewId: 'devoniano-pos-carbon-cordaites' },
    'devoniano-pos_extincao-10': { ref: '/assets/referencias/page-43.jpg', viewId: 'devoniano-pos-carbon-sigillaria' }
  };

  let pageKey = sectionIndex;
  if (type === 'section_intro') pageKey = 'intro';
  if (type.startsWith('home')) pageKey = 'home';
  if (sectionIndex === -1 && type.startsWith('home')) pageKey = 'home';
  
  const designKey = `${currentPeriod}-${currentSection}-${pageKey}`;
  // Fallback for home without -home suffix if needed, but let's try to be precise
  let finalDesignKey = designKey;
  if (currentSection === 'home') finalDesignKey = `${currentPeriod}-home`;
  
  const currentMapping = mapping[finalDesignKey] || mapping[designKey] || {};

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
            else if (type === 'silurian_globe')             ComponentToRender = <SilurianGlobe slideData={currentSlide} onNavigate={scopedNavigate} viewId={currentMapping.viewId} />;
            else if (type === 'silurian_specimen')          ComponentToRender = <SilurianSpecimen slideData={currentSlide} onNavigate={scopedNavigate} />;
            else if (type === 'silurian_double_specimen')   ComponentToRender = <SilurianDoubleSpecimen slideData={currentSlide} onNavigate={scopedNavigate} />;
            else if (type === 'devonian_extinction_environments') ComponentToRender = <DevonianExtinctionEnvironments slideData={currentSlide} onNavigate={scopedNavigate} />;
            else if (type === 'double_species')             ComponentToRender = <DoubleSpecimenDetail slideIndex={sectionIndex} totalSlides={sectionSlides.length} onNavigate={scopedNavigate} slideData={currentSlide} />;

            return (
              <div key={key} style={{ width: '100%', height: '100%' }}>
                {ComponentToRender}
              </div>
            );
          })()}

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
        
        {currentMapping && currentMapping.ref && (
          <DesignEditor 
            referenceImage={currentMapping.ref} 
            viewId={currentMapping.viewId}
          />
        )}
      </div>
    </>
  );
}

export default App;
