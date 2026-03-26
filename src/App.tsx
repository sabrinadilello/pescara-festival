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
      if (event.key === 'Escape') setModalGallery(null);
      if (event.key === 'ArrowRight') showNextImage();
      if (event.key === 'ArrowLeft') showPrevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalGallery]);

  const navItems = [
    { page: 1, Icon: Home, label: 'Home' },
    { page: 2, Icon: Users, label: 'Cast' },
    { page: 3, Icon: Lightbulb, label: 'Workshop' },
    { page: 4, Icon: Mail, label: 'Contatti' },
  ];

  // Immagini per la sezione Performer (unite in un unico slider)
  const performerImages = [
    '/images/prima serata/cartolina.jpg',
    '/images/seconda serata/cartolina 1.jpg',
    '/images/terza serata/Lady BB.jpg',
    // Aggiungi qui i percorsi di tutte le performer che vuoi mostrare
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <style>{`
        :root {
          --swiper-theme-color: #daa520;
          --swiper-pagination-bullet-inactive-color: rgba(255, 255, 255, 0.4);
          --swiper-pagination-bullet-inactive-opacity: 1;
        }
      `}</style>

      {modalGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fadeIn" onClick={() => setModalGallery(null)}>
          <button onClick={() => setModalGallery(null)} className="absolute top-4 right-4 text-white hover:text-gold transition-colors z-50"><X className="w-10 h-10" /></button>
          {modalGallery.images.length > 1 && (
            <button onClick={showPrevImage} disabled={modalGallery.currentIndex === 0} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/30 hover:bg-black/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-50"><ChevronLeft className="w-10 h-10" /></button>
          )}
          <div className="relative max-w-3xl w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={modalGallery.images[modalGallery.currentIndex]} alt="Ingrandimento" className="w-full h-auto object-contain max-h-[90vh]" />
          </div>
          {modalGallery.images.length > 1 && (
            <button onClick={showNextImage} disabled={modalGallery.currentIndex === modalGallery.images.length - 1} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/30 hover:bg-black/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-50"><ChevronRight className="w-10 h-10" /></button>
          )}
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-40 bg-black/80 backdrop-blur-sm border-t border-gold/30">
        <div className="flex items-center py-3">
          {navItems.map((item) => (
            <button key={item.page} onClick={() => goToPage(item.page)} className="flex flex-1 flex-col items-center gap-1 px-1 text-xs transition-all duration-300 transform">
              <item.Icon className={`w-6 h-6 ${currentPage === item.page ? 'text-gold' : 'text-gray-400'}`} />
              <span className={`font-cinzel ${currentPage === item.page ? 'text-gold' : 'text-gray-400'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Page 1 - Home */}
      {currentPage === 1 && (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="font-cinzel text-5xl md:text-7xl text-gold mb-4 tracking-wider">PESCARA BURLESQUE FESTIVAL</h1>
            <div className="text-2xl md:text-3xl text-gold/80 mb-2 font-light italic">I EDIZIONE</div>
            <p className="text-xl md:text-2xl text-porpora font-cinzel mb-12 italic">Eleganza e Seduzione in riva all'Adriatico</p>
            <div className="mb-12 border-4 border-gold p-4 bg-black/50 inline-block">
              <img src="/images/locandina II ed..jpg" alt="Locandina" className="max-w-full h-auto max-h-96" />
            </div>
            <div className="border-4 border-gold p-8 bg-black/50">
              <h3 className="font-cinzel text-3xl text-gold mb-6">PRENOTAZIONI</h3>
              <a href="https://forms.gle/nAeke1KamjxbaTqeA" target="_blank" rel="noopener noreferrer" className="inline-block bg-porpora text-white px-12 py-4 text-xl font-cinzel hover:bg-gold hover:text-black transition-all">PRENOTA ORA</a>
            </div>
          </div>
        </section>
      )}

      {/* Page 2 - Cast (MODIFICATA) */}
      {currentPage === 2 && (
        <section className="min-h-screen flex flex-col items-center px-6 py-20">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="font-cinzel text-4xl md:text-6xl text-gold mb-12 tracking-wider border-b-2 border-gold pb-4 text-center">IL CAST</h2>

            {/* PRODUCER */}
            <div className="mb-20 text-center">
              <h3 className="font-cinzel text-3xl text-gold mb-6 italic">PRODUCER</h3>
              <button onClick={() => openModal(['/images/presentatore.jpeg'], 0)} className="cursor-zoom-in mb-6">
                <img src="/images/presentatore.jpeg" alt="Producer" className="max-w-md w-full h-auto mx-auto border-2 border-gold" />
              </button>
              <p className="text-lg leading-relaxed max-w-2xl mx-auto">Matisse Royale: ideatore e anima pulsante del festival.</p>
            </div>

            {/* HEADLINER */}
            <div className="mb-20 text-center">
              <h3 className="font-cinzel text-3xl text-gold mb-6 italic">HEADLINER</h3>
              <button onClick={() => openModal(['/images/madrina.jpeg'], 0)} className="cursor-zoom-in mb-6">
                <img src="/images/madrina.jpeg" alt="Headliner" className="max-w-md w-full h-auto mx-auto border-2 border-gold" />
              </button>
              <p className="text-lg leading-relaxed max-w-2xl mx-auto">Elektra Show: la nostra stella internazionale.</p>
            </div>

            {/* PERFORMER (Con slider) */}
            <div className="mb-20">
              <button onClick={() => toggleSection('performer')} className="w-full flex justify-between items-center text-left font-cinzel text-3xl text-gold mb-4 border-b border-gold/30 pb-3">
                <span>PERFORMER</span>
                <ChevronDown className={`w-8 h-8 transition-transform ${openSection === 'performer' ? 'rotate-180' : ''}`} />
              </button>
              {openSection === 'performer' && (
                <div className="py-4">
                  <Swiper modules={[Navigation, Pagination]} loop={true} spaceBetween={20} slidesPerView={2} navigation pagination={{ clickable: true }}
                    breakpoints={{ 768: { slidesPerView: 3 } }} className="w-full">
                    {performerImages.map((src, index) => (
                      <SwiperSlide key={index}>
                        <button onClick={() => openModal(performerImages, index)} className="w-full cursor-zoom-in">
                          <img src={src} alt={`Performer ${index + 1}`} className="w-full h-auto object-cover aspect-[3/4]" />
                        </button>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
            </div>

            {/* PRESENTATORE */}
            <div className="mb-20 text-center">
              <h3 className="font-cinzel text-3xl text-gold mb-6 italic">PRESENTATORE</h3>
              <div className="max-w-2xl mx-auto p-6 border-2 border-gold/30 bg-gold/5">
                <p className="text-xl font-cinzel text-gold mb-4">Matisse Royale</p>
                <p className="text-lg leading-relaxed">Lo showman che guiderà il pubblico attraverso la magia del Burlesque.</p>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Page 3 - Workshop (MODIFICATA - Solo 1 grande) */}
      {currentPage === 3 && (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-cinzel text-4xl md:text-6xl text-gold mb-4 tracking-wider border-b-2 border-gold pb-4">WORKSHOP</h2>
            <p className="text-2xl text-porpora font-cinzel my-6 italic">Un'occasione unica per brillare</p>

            <div className="mt-12">
              <div className="flex flex-col gap-8 items-center">
                {/* Immagine Ingrandita */}
                <button onClick={() => openModal(['/images/terryparadise.jpeg'], 0)} className="cursor-zoom-in w-full max-w-2xl">
                  <img src="/images/terryparadise.jpeg" alt="Workshop Terry Paradise" className="w-full h-auto object-cover border-4 border-gold shadow-2xl" />
                </button>

                <div className="text-left max-w-2xl">
                  <h3 className="font-cinzel text-3xl text-porpora mb-2 text-center">💄 MAKE-IT UP!</h3>
                  <p className="text-gold font-cinzel text-xl mb-4 text-center">Tenuto da: Terry Paradise</p>
                  <div className="text-base border-t border-b border-gold/30 py-4 mb-6 space-y-1 text-center">
                    <p>🗓 <span className="font-semibold">Sabato 15 Novembre</span></p>
                    <p>💰 <span className="font-semibold">Costo: 25€</span> – Durata: 1h 15 min</p>
                  </div>
                  <p className="text-lg mb-6">In questo workshop esclusivo, Terry Paradise ti guiderà nella costruzione di un personaggio burlesque autentico e potente. Scopri i segreti della presenza scenica e del trucco artistico per raccontare la tua storia sul palco.</p>
                  <div className="text-center">
                    <a href="https://wa.me/393922752576" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-porpora text-white px-12 py-4 text-xl font-cinzel hover:bg-gold hover:text-black transition-all">
                      <MessageCircle className="w-6 h-6" /> ISCRIVITI ORA
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Page 4 - Contacts (INVARIATA) */}
      {currentPage === 4 && (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-cinzel text-4xl md:text-6xl text-gold mb-12 tracking-wider">CONTATTI</h2>
            <div className="space-y-8 text-lg mb-12 max-w-md mx-auto text-left">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-cinzel text-gold">LOCATION:</p>
                  <p>Teatro Pescara - Via Esempio 1, Pescara</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Instagram className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-cinzel text-gold">INSTAGRAM:</p>
                  <a href="#" className="underline">@pescara_burlesque_festival</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <p className="font-cinzel text-gold">EMAIL:</p>
                  <p>pescaraburlesque@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gold pt-8 text-gold/70 text-sm">© 2025 Pescara Burlesque Festival</div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;