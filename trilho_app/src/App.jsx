import { useState, useEffect, useCallback, useRef } from 'react'
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
import HardwareConfigurator from './components/HardwareConfigurator'
import RailWizard from './components/RailWizard'
import PeriodVideoView from './views/PeriodVideoView'
import designSettings from './data/design_settings.json'
import railSettings from './data/rail_settings.json'
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
  const [isHardwareConfigVisible, setIsHardwareConfigVisible] = useState(false);
  const [isRailWizardVisible, setIsRailWizardVisible] = useState(false);
  const [showDebugPos, setShowDebugPos] = useState(false);
  const debugTimeoutRef = useRef(null);
  const [encoderPosition, setEncoderPosition] = useState(0);
  const [currentZoneId, setCurrentZoneId] = useState(1);
  const [lastHardwareAction, setLastHardwareAction] = useState(null);
  const [socket, setSocket] = useState(null);
  const lastClickTimeRef = useRef(0);
  const lastEncoderMoveTimeRef = useRef(0);

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
    console.log('🔌 Tentando conectar ao Socket em http://127.0.0.1:3000...');
    const socketInstance = io('http://127.0.0.1:3000', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: Infinity
    });

    socketInstance.on('connect', () => {
      console.log('✅ Socket Conectado com Sucesso!');
    });

    socketInstance.on('connect_error', (err) => {
      console.error('❌ Erro de Conexão Socket:', err.message);
    });

    socketInstance.on('encoder_action', (command) => {
      console.log('🕹️ Hardware Action:', command);
      setLastHardwareAction(command);
      
      const now = Date.now();
      
      if (command === 'LEFT')  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      if (command === 'RIGHT') window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      
      if (command === 'CLICK') {
        // Debounce: Ignora cliques muito próximos ou se houve movimento muito recente (ruído de indução)
        const timeSinceLastClick = now - lastClickTimeRef.current;
        const timeSinceLastMove = now - lastEncoderMoveTimeRef.current;
        
        if (timeSinceLastClick > 500 && timeSinceLastMove > 200) {
          console.log('✅ Click Validado');
          window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
          lastClickTimeRef.current = now;
        } else {
          console.warn('⚠️ Click ignorado (provável ruído):', { timeSinceLastClick, timeSinceLastMove });
        }
      }
      if (command === 'RESET') setEncoderPosition(0);
    });

    socketInstance.on('encoder_update', (data) => {
      const pos = typeof data === 'object' ? data.position : data;
      // console.log('📍 App recebeu posição:', pos);
      setEncoderPosition(pos);
      lastEncoderMoveTimeRef.current = Date.now(); // Marca movimento para filtrar ruído no botão
    });

    setSocket(socketInstance);
    return () => socketInstance.disconnect();
  }, []);

  // Lógica de Troca de Período via Encoder Position
  useEffect(() => {
    const zone = railSettings.zones.find(z => encoderPosition >= z.start && encoderPosition <= z.end);
    console.log('🗺️ Zona Calculada:', zone?.name, 'ID:', zone?.id, 'Pos:', encoderPosition);
    
    if (zone && zone.id !== currentZoneId) {
      console.log('🔄 Trocando para Zona:', zone.id);
      const direction = zone.id > (currentZoneId || 0) ? 'left' : 'right'; // Invertido para o efeito visual de trilho
      setSlideDirection(direction);
      setCurrentZoneId(zone.id);
      
      // Mapeia zona para o index de início do período (slidesData)
      const periodMap = {
        1: 'arqueano',
        2: 'proterozoico',
        3: 'cambriano',
        4: 'ordoviciano',
        5: 'siluriano',
        6: 'devoniano',
        7: 'carbonifero',
        8: 'permiano'
      };
      
      const periodKey = periodMap[zone.id];
      if (periodKey && periodStartIndex[periodKey] !== undefined) {
        // Se entrar em uma zona com conteúdo, vai para a HOME dela (slide 0 do período)
        setSlideIndex(periodStartIndex[periodKey]);
      } else {
        // Zonas apenas de vídeo (placeholder no slidesData)
        // Por enquanto, podemos ficar na Home ou criar slides específicos
      }
    }
  }, [encoderPosition, currentZoneId]);

  const sendHardwareCommand = useCallback((type, value) => {
    if (socket) {
      socket.emit('hardware_command', { type, value });
    }
  }, [socket]);

  // Atalhos de teclado
  useEffect(() => {
    const handler = (e) => {
      // Atalhos de teste 1-8 vinculados às zonas do trilho
      if (e.key >= '1' && e.key <= '8') {
        const zoneId = parseInt(e.key);
        const zone = railSettings.zones.find(z => z.id === zoneId);
        if (zone) {
          setEncoderPosition(zone.start + 10);
        }
      }
      if (e.key.toLowerCase() === 'c') { setIsHardwareConfigVisible(prev => !prev); }
      if (e.key.toLowerCase() === 'w') { setIsRailWizardVisible(prev => !prev); }
      if (e.key.toLowerCase() === 'd') { setShowDebugPos(prev => !prev); }
      if (e.key.toLowerCase() === 'f') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(e => console.error(e));
        } else {
          document.exitFullscreen().catch(e => console.error(e));
        }
      }
      
      // Mock de posição para teste (Shift + Setas)
      if (e.shiftKey && (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === '>' || e.key === '<' || e.key === '.' || e.key === ',')) {
        if (e.key === 'ArrowRight' || e.key === '>' || e.key === '.') setEncoderPosition(prev => Math.min(prev + 100, railSettings.maxEncoderValue));
        if (e.key === 'ArrowLeft' || e.key === '<' || e.key === ',') setEncoderPosition(prev => Math.max(prev - 100, 0));
        
        setShowDebugPos(true);
        if (debugTimeoutRef.current) clearTimeout(debugTimeoutRef.current);
        debugTimeoutRef.current = setTimeout(() => setShowDebugPos(false), 2000);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const pageVariants = {
    initial: (direction) => ({
      x: direction === 'left' ? 1080 : direction === 'right' ? -1080 : 0,
      y: direction === 'up' ? 1920 : direction === 'down' ? -1920 : 0,
      opacity: 0,
      filter: 'blur(20px)',
      scale: 1.05
    }),
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        y: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        filter: { duration: 0.8 },
        scale: { duration: 0.8 }
      }
    },
    exit: (direction) => ({
      x: direction === 'left' ? -1080 : direction === 'right' ? 1080 : 0,
      y: direction === 'up' ? -1920 : direction === 'down' ? 1920 : 0,
      opacity: 0,
      filter: 'blur(20px)',
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        y: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        filter: { duration: 0.8 },
        scale: { duration: 0.8 }
      }
    })
  };

  const currentSlide   = slidesData[slideIndex] || slidesData[0] || { type: 'home', period: 'arqueano', section: 'home' };
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
    'ordoviciano-home-intro':            '/assets/referencias/ordoviciano/page-01.jpg',
    'ordoviciano-biodiversidade-intro': '/assets/referencias/ordoviciano/page-02.jpg',
    'ordoviciano-biodiversidade-1':  '/assets/referencias/ordoviciano/page-03.jpg',
    'ordoviciano-biodiversidade-2':  '/assets/referencias/ordoviciano/page-04.jpg',
    'ordoviciano-biodiversidade-3':  '/assets/referencias/ordoviciano/page-05.jpg',
    'ordoviciano-biodiversidade-4':  '/assets/referencias/ordoviciano/page-06.jpg',
    'ordoviciano-biodiversidade-5':  '/assets/referencias/ordoviciano/page-07.jpg',
    'ordoviciano-biodiversidade-6':  '/assets/referencias/ordoviciano/page-08.jpg',
    'ordoviciano-biodiversidade-7':  '/assets/referencias/ordoviciano/page-09.jpg',
    'ordoviciano-extincao-intro':    '/assets/referencias/ordoviciano/page-10.jpg',
    'ordoviciano-extincao-1':        '/assets/referencias/ordoviciano/page-11.jpg',
    'ordoviciano-pos_extincao-intro':'/assets/referencias/ordoviciano/page-12.jpg',
    'ordoviciano-pos_extincao-1':    '/assets/referencias/ordoviciano/page-13.jpg',
    'ordoviciano-pos_extincao-2':    '/assets/referencias/ordoviciano/page-14.jpg',
    'ordoviciano-pos_extincao-3':    '/assets/referencias/ordoviciano/page-15.jpg',
    'ordoviciano-pos_extincao-4':    '/assets/referencias/ordoviciano/page-16.jpg',
    'ordoviciano-pos_extincao-5':    '/assets/referencias/ordoviciano/page-17.jpg',
    // Devoniano (pages 18-43)
    'devoniano-home-intro': '/assets/referencias/devoniano/page-18.jpg',
    'devoniano-biodiversidade-intro': '/assets/referencias/devoniano/page-19.jpg',
    'devoniano-biodiversidade-1': '/assets/referencias/devoniano/page-20.jpg',
    'devoniano-biodiversidade-2': '/assets/referencias/devoniano/page-21.jpg',
    'devoniano-biodiversidade-3': '/assets/referencias/devoniano/page-22.jpg',
    'devoniano-biodiversidade-4': '/assets/referencias/devoniano/page-23.jpg',
    'devoniano-biodiversidade-5': '/assets/referencias/devoniano/page-24.jpg',
    'devoniano-biodiversidade-6': '/assets/referencias/devoniano/page-25.jpg',
    'devoniano-biodiversidade-7': '/assets/referencias/devoniano/page-26.jpg',
    'devoniano-biodiversidade-8': '/assets/referencias/devoniano/page-27.jpg',
    'devoniano-biodiversidade-9': '/assets/referencias/devoniano/page-28.jpg',
    'devoniano-biodiversidade-10': '/assets/referencias/devoniano/page-29.jpg',
    'devoniano-biodiversidade-11': '/assets/referencias/devoniano/page-30.jpg',
    'devoniano-extincao-intro': '/assets/referencias/devoniano/page-31.jpg',
    'devoniano-extincao-1': '/assets/referencias/devoniano/page-32.jpg',
    'devoniano-pos_extincao-intro': '/assets/referencias/devoniano/page-33.jpg',
    'devoniano-pos_extincao-1': '/assets/referencias/devoniano/page-34.jpg',
    'devoniano-pos_extincao-2': '/assets/referencias/devoniano/page-35.jpg',
    'devoniano-pos_extincao-3': '/assets/referencias/devoniano/page-36.jpg',
    'devoniano-pos_extincao-4': '/assets/referencias/devoniano/page-37.jpg',
    'devoniano-pos_extincao-5': '/assets/referencias/devoniano/page-38.jpg',
    'devoniano-pos_extincao-6': '/assets/referencias/devoniano/page-39.jpg',
    'devoniano-pos_extincao-7': '/assets/referencias/devoniano/page-40.jpg',
    'devoniano-pos_extincao-10': '/assets/referencias/devoniano/page-43.jpg',
    // Permiano (pages 44-54)
    'permiano-home-intro': '/assets/referencias/permiano/page-44.jpg',
    'permiano-biodiversidade-intro': '/assets/referencias/permiano/page-45.jpg',
    'permiano-biodiversidade-1': '/assets/referencias/permiano/page-46.jpg',
    'permiano-biodiversidade-2': '/assets/referencias/permiano/page-47.jpg',
    'permiano-biodiversidade-3': '/assets/referencias/permiano/page-48.jpg',
    'permiano-biodiversidade-4': '/assets/referencias/permiano/page-49.jpg',
    'permiano-biodiversidade-5': '/assets/referencias/permiano/page-50.jpg',
    'permiano-biodiversidade-6': '/assets/referencias/permiano/page-51.jpg',
    'permiano-biodiversidade-7': '/assets/referencias/permiano/page-52.jpg',
    'permiano-extincao-intro': '/assets/referencias/permiano/page-53.jpg',
    'permiano-extincao-1': '/assets/referencias/permiano/page-54.jpg',
    'permiano-pos_extincao-intro': '/assets/referencias/permiano/page-55.jpg',
    'perm-pos-ext-mundo': '/assets/referencias/permiano/page-56.jpg',
    'perm-pos-ext-resistencia': '/assets/referencias/permiano/page-57.jpg',
    'benthosuchus': '/assets/referencias/permiano/page-58.jpg',
    'lystrosaurus': '/assets/referencias/permiano/page-59.jpg',
    'thrinaxodon': '/assets/referencias/permiano/page-60.jpg',
    'procolophon': '/assets/referencias/permiano/page-61.jpg',
    'voltziopsis': '/assets/referencias/permiano/page-62.jpg',
  };

  // Calcula viewId para qualquer slide, usado pelo DesignEditor
  function computeViewId(slide) {
    if (!slide) return null;
    const { type, period, section, id } = slide;
    if (type === 'home_ordoviciano') return 'ordoviciano-home';
    if (type === 'home_devonian')    return 'devoniano-home';
    if (type === 'home_permiano')    return 'permiano-home';
    if (type === 'section_intro') {
      if (id) return id;
      if (section === 'biodiversidade') return `${period}-bio-intro`;
      if (section === 'extincao')       return `${period}-extincao-intro`;
      if (section === 'pos_extincao')   return `${period}-pos-extincao-intro`;
    }
    if (type === 'devonian_extinction_environments') return 'devoniano-extincao-ambientes';
    if (type === 'extinction_content') {
      if (id) return id;
      return `${period}-extincao-content`;
    }
    if (type === 'extinction_content_devonian') return `${period}-extincao-content`;
    if (type === 'silurian_globe') return id ? `${period}-pos-${id}` : `${period}-pos-globe`;
    if (type === 'single_species' || type === 'double_species' || type === 'silurian_specimen' || type === 'silurian_double_specimen') {
      if (period === 'devoniano' && section === 'biodiversidade') return `devoniano-bio-${id}`;
      if (period === 'devoniano' && section === 'pos_extincao')   return `devoniano-pos-carbon-${id}`;
      if (period === 'ordoviciano' && section === 'biodiversidade') return id; 
      if (period === 'ordoviciano' && section === 'pos_extincao')   return `ordoviciano-pos-${id}`;
      if (period === 'permiano' && section === 'biodiversidade') return id;
      if (period === 'permiano' && section === 'pos_extincao')   return id;
    }
    return null;
}

  let pageKey = sectionIndex;
  if (type === 'section_intro' || type === 'home_devonian' || type === 'home_permiano' || type === 'home_ordoviciano') pageKey = 'intro';
  const viewId = computeViewId(currentSlide);
  const refKey = `${currentPeriod}-${currentSection}-${pageKey}`;
  const referenceImage = refMapping[viewId] || refMapping[refKey] || null;

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
        <AnimatePresence mode="popLayout" custom={slideDirection}>
          {(() => {
            let Comp = null;
            const zone = railSettings.zones.find(z => z.id === currentZoneId) || railSettings.zones[0];

            if      (type === 'home')                       Comp = <Home onNavigate={handleNavigate} />;
            else if (type === 'home_ordoviciano')           Comp = <HomeOrdovician onNavigate={absoluteNavigate} />;
            else if (type === 'home_devonian')              Comp = <HomeDevonian onNavigate={absoluteNavigate} />;
            else if (type === 'home_permiano')              Comp = <HomePermian onNavigate={absoluteNavigate} />;
            else if (type === 'section_intro')              Comp = <SectionIntro slideData={currentSlide} onNavigate={scopedNavigate} />;
            else if (type === 'extinction_content')         Comp = <ExtinctionContent slideData={currentSlide} onNavigate={scopedNavigate} viewId={viewId} />;
            else if (type === 'extinction_content_devonian') Comp = <ExtinctionContentDevonian slideData={currentSlide} onNavigate={scopedNavigate} />;
            else if (type === 'single_species')             Comp = <SpecimenDetail slideIndex={sectionIndex} totalSlides={sectionSlides.length} onNavigate={scopedNavigate} slideData={currentSlide} />;
            else if (type === 'event_header')               Comp = <EventHeader slideIndex={sectionIndex} totalSlides={sectionSlides.length} onNavigate={scopedNavigate} slideData={currentSlide} />;
            else if (type === 'event_detail')               Comp = <EventDetail slideIndex={sectionIndex} totalSlides={sectionSlides.length} onNavigate={scopedNavigate} slideData={currentSlide} />;
            else if (type === 'silurian_globe')             Comp = <SilurianGlobe slideData={currentSlide} onNavigate={scopedNavigate} viewId={viewId} />;
            else if (type === 'silurian_specimen')          Comp = <SilurianSpecimen slideData={currentSlide} onNavigate={scopedNavigate} />;
            else if (type === 'silurian_double_specimen')   Comp = <SilurianDoubleSpecimen slideData={currentSlide} onNavigate={scopedNavigate} />;
            else if (type === 'devonian_extinction_environments') Comp = <DevonianExtinctionEnvironments slideData={currentSlide} onNavigate={scopedNavigate} />;
            else if (type === 'double_species')             Comp = <DoubleSpecimenDetail slideIndex={sectionIndex} totalSlides={sectionSlides.length} onNavigate={scopedNavigate} slideData={currentSlide} />;
            else {
              Comp = (
                <PeriodVideoView 
                  videoSrc={zone.video} 
                  title={zone.name} 
                  periodNumber={zone.id} 
                  hasMenu={false}
                />
              );
            }

            return (
              <motion.div
                key={slideIndex}
                custom={slideDirection}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-container"
              >
                {Comp}
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
        
        {/* Debug Overlay */}
        {showDebugPos && (
          <div style={{
            position: 'fixed',
            top: 20,
            right: 20,
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '15px',
            borderRadius: '10px',
            zIndex: 10000,
            fontFamily: 'monospace',
            border: '1px solid #007AFF',
            pointerEvents: 'none'
          }}>
            <div>POS: {Math.round(encoderPosition)}</div>
            <div>ZONA: {railSettings.zones.find(z => encoderPosition >= z.start && encoderPosition <= z.end)?.name || 'FORA'}</div>
            <div style={{ color: socket?.connected ? '#4CD964' : '#FF2D55' }}>
              SOCKET: {socket?.connected ? 'CONECTADO' : 'DESCONECTADO'}
            </div>
          </div>
        )}

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
            return Object.fromEntries(
              Object.entries(raw).map(([k, v]) => {
                if (k.startsWith('--')) return [k, v];
                const cssKey = k.replace(/([A-Z])/g, '-$1').toLowerCase();
                return [`--devonian-${sid}-${cssKey}`, v];
              })
            );
          })()}
        />

        <HardwareConfigurator 
          isVisible={isHardwareConfigVisible} 
          onClose={() => setIsHardwareConfigVisible(false)}
          lastAction={lastHardwareAction}
          onSendCommand={sendHardwareCommand}
        />

        <RailWizard 
          isVisible={isRailWizardVisible}
          onClose={() => setIsRailWizardVisible(false)}
          currentPosition={encoderPosition}
        />

        {showDebugPos && (
          <div style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
              fontSize: '24px',
              zIndex: 10000,
              pointerEvents: 'none',
              textShadow: '0 0 10px rgba(0,0,0,0.5)'
          }}>
              POS: {encoderPosition}
          </div>
        )}
    </>
  );
}

export default App;
