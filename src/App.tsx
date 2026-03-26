import { useState, useEffect } from 'react';
import { MapPin, Instagram, Mail, Home, Users, X, Lightbulb, MessageCircle, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Definiamo un tipo per la galleria del modale
type ModalGallery = {
  images: string[];
  currentIndex: number;
};

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalGallery, setModalGallery] = useState<ModalGallery | null>(null);

  const [openSection, setOpenSection] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    setOpenSection(null);
  };

  const toggleSection = (sectionName: string) => {
    setOpenSection(prev => (prev === sectionName ? null : sectionName));
  };

  const openModal = (images: string[], index: number) => {
    setModalGallery({ images, currentIndex: index });
  };

  const showNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (modalGallery && modalGallery.currentIndex < modalGallery.images.length - 1) {
      setModalGallery(prev => prev ? { ...prev, currentIndex: prev.currentIndex + 1 } : null);
    }
  };

  const showPrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (modalGallery && modalGallery.currentIndex > 0) {
      setModalGallery(prev => prev ? { ...prev, currentIndex: prev.currentIndex - 1 } : null);
    }
  };


  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!modalGallery) return;

      if (event.key === 'Escape') {
        setModalGallery(null);
      }
      if (event.key === 'ArrowRight') {
        showNextImage();
      }
      if (event.key === 'ArrowLeft') {
        showPrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalGallery]);

  const navItems = [
    { page: 1, Icon: Home, label: 'Home' },
    { page: 2, Icon: Users, label: 'Cast' },
    { page: 3, Icon: Lightbulb, label: 'Workshop' },
    { page: 4, Icon: Mail, label: 'Contatti' },
  ];

  const primaSerataImages = [
    'cartolina Astrey&Halley.jpg', 'cartolina baby blond.jpg', 'cartolina.jpg', 'ele.jpg',
    'Ellis.jpg', 'lady like.jpg', 'Lady Malvasia.jpg', 'lady Xena.jpg',
    'lilith lyla.jpg', 'nina.jpg', 'ralda.jpg', 'romi.jpg', 'Sinti.jpg'
  ].map(img => `/images/prima serata/${img}`);

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24"> {/* Sfondo Blu Notte */}
      <style>{`
        :root {
          --swiper-theme-color: #38bdf8; /* Azzurro Pescara per lo slider */
          --swiper-pagination-bullet-inactive-color: rgba(255, 255, 255, 0.4); 
          --swiper-pagination-bullet-inactive-opacity: 1;
        }
      `}</style>

      {modalGallery && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setModalGallery(null)}
        >
          <button
            onClick={() => setModalGallery(null)}
            className="absolute top-4 right-4 text-white hover:text-sky-400 transition-colors z-50"
            aria-label="Chiudi"
          >
            <X className="w-10 h-10" />
          </button>

          {modalGallery.images.length > 1 && (
            <button
              onClick={showPrevImage}
              disabled={modalGallery.currentIndex === 0}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-blue-900/30 hover:bg-blue-800/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-50"
              aria-label="Immagine precedente"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
          )}

          <div
            className="relative max-w-3xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalGallery.images[modalGallery.currentIndex]}
              alt="Immagine ingrandita"
              className="w-full h-auto object-contain max-h-[90vh] border-2 border-sky-400/20"
            />
          </div>

          {modalGallery.images.length > 1 && (
            <button
              onClick={showNextImage}
              disabled={modalGallery.currentIndex === modalGallery.images.length - 1}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-blue-900/30 hover:bg-blue-800/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-50"
              aria-label="Immagine successiva"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          )}

        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-40 bg-slate-900/80 backdrop-blur-sm border-t border-sky-400/30">
        <div className="flex items-center py-3">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => goToPage(item.page)}
              className="flex flex-1 flex-col items-center gap-1 px-1 text-xs transition-all duration-300 transform"
              aria-label={item.label}
            >
              <item.Icon
                className={`w-6 h-6 ${currentPage === item.page ? 'text-sky-400' : 'text-slate-400 group-hover:text-sky-300'
                  }`}
              />
              <span
                className={`font-cinzel ${currentPage === item.page ? 'text-sky-400' : 'text-slate-400 group-hover:text-sky-300'
                  }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Page 1 - Home */}
      {currentPage === 1 && (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-sky-400 rounded-full" />
            <div className="absolute bottom-10 right-10 w-40 h-40 border border-blue-600 rounded-full" />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="font-cinzel text-5xl md:text-7xl text-sky-400 mb-4 tracking-wider">
              PESCARA BURLESQUE FESTIVAL
            </h1>
            <div className="text-2xl md:text-3xl text-sky-200/80 mb-2 font-light">
              II EDIZIONE
            </div>
            <div className="font-cinzel text-base text-sky-300/70 mb-8 italic tracking-wider">
              una produzione di Matisse Royale
            </div>
            <p className="text-xl md:text-2xl text-blue-400 font-cinzel mb-12 italic">
              La notte più glamour dell’Adriatico
            </p>
            <div className="mb-12 border-4 border-sky-400 p-4 bg-slate-900/50 inline-block shadow-lg shadow-sky-400/20">
              <button
                onClick={() => openModal(['/images/locandina.jpg'], 0)}
                className="cursor-zoom-in"
              >
                <img
                  src="/images/locandina.jpg"
                  alt="Locandina Pescara Burlesque Festival"
                  className="max-w-full h-auto max-h-96 object-contain"
                />
              </button>
            </div>
            <div className="text-lg md:text-xl leading-relaxed mb-12 text-left max-w-3xl mx-auto space-y-6">
              <p>
                Il Pescara Burlesque Festival è l’evento internazionale che porta sulla costa adriatica il fascino senza tempo del burlesque, trasformando la città di Pescara in un palcoscenico di arte e seduzione.
              </p>
              <p>
                In una cornice elegante e suggestiva, il pubblico viene accolto in un’atmosfera sospesa, quasi irreale...
              </p>
              <p className="italic text-sky-300/90 pt-6">
                Preparati a varcare la soglia di un mondo in cui tutto è possibile… ✨
              </p>
            </div>
            <div className="border-t border-b border-sky-400/50 py-6 mb-8 bg-blue-900/10">
              <div className="text-sky-300 text-2xl font-cinzel mb-4">
                Sabato 16 maggio ore 21:00
              </div>
              <div className="flex items-center justify-center gap-3 text-white text-lg md:text-xl">
                <MapPin className="w-6 h-6 text-sky-400" />
                <span className="font-cinzel">Teatro Cavour – Via Camillo Benso Conte di Cavour, 9, Pescara</span>
              </div>
            </div>

            <div className="border-4 border-sky-400 p-8 bg-slate-900/50">
              <h3 className="font-cinzel text-3xl text-sky-400 mb-6">
                PRENOTAZIONI
              </h3>
              <a
                href="https://docs.google.com/forms/d/..."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-12 py-4 text-xl font-cinzel hover:bg-sky-400 hover:text-slate-950 transition-all transform hover:scale-105 shadow-lg shadow-blue-600/30"
              >
                PRENOTA ORA
              </a>
            </div>

          </div>
        </section>
      )}

      {/* Page 2 - Cast */}
      {currentPage === 2 && (
        <section className="min-h-screen flex flex-col items-center px-6 py-20">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="font-cinzel text-4xl md:text-6xl text-sky-400 mb-12 tracking-wider border-b-2 border-sky-400 pb-4 text-center">
              IL CAST
            </h2>

            <div className="mb-12 text-center">
              <button onClick={() => openModal(['/images/presentatore.jpeg'], 0)} className="cursor-zoom-in">
                <img src="/images/presentatore.jpeg" alt="Producer" className="max-w-full h-auto border-2 border-sky-400/30" />
              </button>
            </div>

            <div className="mb-12 text-center">
              <button onClick={() => openModal(['/images/madrina.jpeg'], 0)} className="cursor-zoom-in">
                <img src="/images/madrina.jpeg" alt="Madrina" className="max-w-full h-auto border-2 border-sky-400/30" />
              </button>
              <p className="font-cinzel text-2xl text-blue-400 italic mt-6">🔥 La Dea dello Spettacolo! 🔥</p>
            </div>

            <div className="space-y-8 mt-16">
              <div>
                <button onClick={() => toggleSection('performer')} className="w-full flex justify-between items-center text-left font-cinzel text-3xl text-sky-400 mb-4 border-b border-sky-400/30 pb-3 hover:text-sky-300 transition-colors">
                  <span>PERFORMER</span>
                  <ChevronDown className={`w-8 h-8 transition-transform ${openSection === 'performer' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'performer' && (
                  <div className="py-4">
                    <Swiper
                      modules={[Navigation, Pagination]} loop={true} spaceBetween={20} slidesPerView={2} navigation pagination={{ clickable: true }}
                      breakpoints={{ 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
                      className="w-full"
                    >
                      {primaSerataImages.map((src, index) => (
                        <SwiperSlide key={index}>
                          <button onClick={() => openModal(primaSerataImages, index)} className="w-full cursor-zoom-in">
                            <img src={src} alt="Performer" className="w-full h-auto object-cover aspect-[3/4] border border-sky-400/20" />
                          </button>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Page 3 - Workshop */}
      {currentPage === 3 && (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-cinzel text-4xl md:text-6xl text-sky-400 mb-4 tracking-wider border-b-2 border-sky-400 pb-4">
              WORKSHOP
            </h2>
            <div className="mt-12 flex flex-col items-center gap-8">
              <button onClick={() => openModal(['/images/terryparadise.jpeg'], 0)} className="cursor-zoom-in w-full max-w-2xl">
                <img src="/images/terryparadise.jpeg" alt="Workshop" className="w-full h-auto border-4 border-sky-400 shadow-2xl shadow-sky-400/20" />
              </button>
              <div className="max-w-2xl w-full">
                <h3 className="font-cinzel text-3xl text-blue-400 mb-2">💄 MAKE-IT UP!</h3>
                <p className="text-sky-300 font-cinzel text-xl mb-4">Tenuto da: Terry Paradise</p>
                <div className="border-t border-b border-sky-400/30 py-4 mb-6 text-center">
                  <p className="text-xl">🗓 Sabato 16 Maggio</p>
                </div>
                <a href="https://wa.me/..." className="inline-flex items-center gap-3 bg-blue-600 text-white px-12 py-4 text-xl font-cinzel hover:bg-sky-400 hover:text-slate-950 transition-all">
                  <MessageCircle className="w-6 h-6" /> ISCRIVITI ORA
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Page 4 - Contacts */}
      {currentPage === 4 && (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-cinzel text-4xl md:text-6xl text-sky-400 mb-12 tracking-wider">
              CONTATTI
            </h2>
            <div className="space-y-8 text-lg mb-12 max-w-md mx-auto text-left">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-sky-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-cinzel text-sky-400">LOCATION:</p>
                  <p>Teatro Cavour – Pescara</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Instagram className="w-6 h-6 text-sky-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-cinzel text-sky-400">INSTAGRAM:</p>
                  <p className="underline text-sky-200">@pescara_burlesque_festival</p>
                </div>
              </div>
            </div>
            <div className="border-t border-sky-400/30 pt-8 text-sky-400/50 text-sm">
              © 2025 Pescara Burlesque Festival
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;