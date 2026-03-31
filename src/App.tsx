import { useState, useEffect } from 'react';
import { MapPin, Instagram, Mail, Home, Users, X, Lightbulb, MessageCircle, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

  // Dati di contatto
  const mapsLink = "https://www.google.com/maps/search/?api=1&query=Teatro+Cavour+Via+Camillo+Benso+Conte+di+Cavour+9+Pescara";
  const instagramUrl = "https://www.instagram.com/pescara_burlesque_festival";
  const emailAddress = "pescaraburlesquefestival@gmail.com";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#25a3e9] to-[#061c57] text-white pb-24 font-quicksand">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Satisfy&family=Quicksand:wght@300;400;600&display=swap');
        
        .font-playfair { font-family: 'Satisfy', cursive; }
        .font-quicksand { font-family: 'Quicksand', sans-serif; }

        .text-shadow-3d {
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5), 0px 0px 10px rgba(0,0,0,0.3);
        }

        :root {
          --swiper-theme-color: #EFBF04; 
          --swiper-pagination-bullet-inactive-color: rgba(255, 255, 255, 0.4); 
          --swiper-pagination-bullet-inactive-opacity: 1;
        }
      `}</style>

      {modalGallery && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setModalGallery(null)}
        >
          <button
            onClick={() => setModalGallery(null)}
            className="absolute top-4 right-4 text-white hover:text-[#EFBF04] transition-colors z-50"
          >
            <X className="w-10 h-10" />
          </button>

          {modalGallery.images.length > 1 && (
            <button
              onClick={showPrevImage}
              disabled={modalGallery.currentIndex === 0}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-50"
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
              alt="Ingrandimento"
              className="w-full h-auto object-contain max-h-[90vh] border border-[#D4AF37]/20"
            />
          </div>

          {modalGallery.images.length > 1 && (
            <button
              onClick={showNextImage}
              disabled={modalGallery.currentIndex === modalGallery.images.length - 1}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-50"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          )}

        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-40 bg-black/60 backdrop-blur-md border-t border-white/20">
        <div className="flex items-center py-3">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => goToPage(item.page)}
              className="group flex flex-1 flex-col items-center gap-1 px-1 text-xs transition-all duration-300 transform"
            >
              <item.Icon
                className={`w-6 h-6 transition-colors duration-300 ${currentPage === item.page ? 'text-[#D4AF37]' : 'text-white/40 group-hover:text-[#D4AF37]'
                  }`}
              />
              <span
                className={`font-playfair transition-colors duration-300 ${currentPage === item.page ? 'text-[#D4AF37]' : 'text-white/40 group-hover:text-[#D4AF37]'
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
          <div className="max-w-4xl mx-auto text-center relative z-10">

            <div className="mb-8 flex justify-center">
              <img
                src="/images/titolo.png"
                alt="Pescara Burlesque Festival"
                className="w-full max-w-3xl h-auto drop-shadow-2xl"
              />
            </div>

            <div className="text-2xl md:text-3xl text-white mb-2 font-light italic font-quicksand">
              II EDIZIONE
            </div>
            <div className="font-playfair text-2xl text-white mb-8 tracking-wider">
              una produzione di Matisse Royale
            </div>
            <p className="text-xl md:text-2xl text-sky-100 font-playfair mb-12 italic">
              La notte più glamour dell’Adriatico
            </p>

            {/* LOCANDINA: Senza spazio sotto e con bordo dorato al clic/hover */}
            <div className="mb-12 border-4 border-white inline-flex overflow-hidden transition-colors duration-300 hover:border-[#D4AF37] active:border-[#D4AF37]">
              <button
                onClick={() => openModal(['/images/locandina II ed..jpg'], 0)}
                className="cursor-zoom-in block"
              >
                <img
                  src="/images/locandina II ed..jpg"
                  alt="Locandina Pescara Burlesque Festival"
                  className="max-w-full h-auto max-h-[500px] object-contain block"
                />
              </button>
            </div>

            <div className="text-lg md:text-xl leading-relaxed mb-12 text-left max-w-3xl mx-auto space-y-6 font-quicksand">
              <p>Il Pescara Burlesque Festival è l’evento internazionale che porta sulla costa adriatica il fascino senza tempo del burlesque, trasformando la città di Pescara in un palcoscenico di arte e seduzione.</p>
              <p>In una cornice elegante e suggestiva, il pubblico viene accolto in un’atmosfera sospesa, quasi irreale, in cui luci, musica e corpi raccontano storie di bellezza, desiderio e libertà.</p>
              <p className="italic text-sky-100 pt-6">Preparati a varcare la soglia di un mondo in cui tutto è possibile… ✨</p>
            </div>

            <div className="border-t border-b border-white/30 py-6 mb-8">
              <div className="text-white text-2xl font-playfair mb-4 font-bold">
                Sabato 16 maggio ore 21:00
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-white text-lg md:text-xl font-quicksand">
                <MapPin className="w-6 h-6 text-white" />
                <span className="font-playfair text-3xl">Teatro Cavour – Via Camillo Benso Conte di Cavour, 9, Pescara</span>
              </div>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-white hover:text-[#0b46d0] transition-all duration-300 underline decoration-white/30 hover:decoration-[#0b46d0]"
              >
                Apri su Google Maps →
              </a>
            </div>

            <div className="border-4 border-white p-8 bg-white/5">
              <h3 className="font-playfair text-4xl text-white mb-6">PRENOTAZIONI</h3>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc9-Ur65j0i9ynErCy7L0sksM3G_zPUdiPnobASG0YRUaq1Zw/viewform?usp=sharing&ouid=106777875788059470191"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#D4AF37] text-black px-12 py-4 text-xl font-bold font-quicksand hover:bg-white hover:text-[#0b46d0] transition-all transform hover:scale-105"
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
            <h2 className="font-playfair text-4xl md:text-6xl text-[#D4AF37] mb-12 tracking-wider border-b-2 border-white/30 pb-4 text-center uppercase text-shadow-3d">
              IL CAST
            </h2>

            <div className="mb-12 text-center">
              <button onClick={() => openModal(['/images/presentatore.jpg'], 0)} className="cursor-zoom-in group">
                <img src="/images/presentatore.jpg" alt="Matisse Royale" className="max-w-full h-auto border border-white/20 group-hover:border-[#D4AF37] transition-colors duration-500" />
              </button>
              <div className="text-lg md:text-xl mt-8 text-left max-w-3xl mx-auto">
                <p>Matisse Royale è l’anima scintillante del festival: showman, performer e raffinato narratore di emozioni.</p>
              </div>
            </div>

            <div className="mb-12 text-center">
              <button onClick={() => openModal(['/images/madrina.jpeg'], 0)} className="cursor-zoom-in group">
                <img src="/images/madrina.jpeg" alt="Elektra Show" className="max-w-full h-auto border border-white/20 group-hover:border-[#D4AF37] transition-colors duration-500" />
              </button>
              <div className="text-lg md:text-xl mt-8 text-left max-w-3xl mx-auto">
                <p className="font-playfair text-2xl text-white italic text-center mb-6 font-bold">🔥 La Dea dello Spettacolo! 🔥</p>
                <p className="text-center font-playfair text-3xl"><strong>Elektra Show</strong> è la <strong>MADRINA</strong> del Pescara Burlesque Festival!</p>
              </div>
            </div>

            <div className="space-y-8 mt-16">
              <div>
                <button onClick={() => toggleSection('performer')} className="w-full flex justify-between items-center text-left font-playfair text-3xl text-[#D4AF37] mb-4 border-b border-white/20 pb-3 hover:text-white transition-colors duration-300 uppercase">
                  <span>PERFORMER</span>
                  <ChevronDown className={`w-8 h-8 transition-transform duration-300 ${openSection === 'performer' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'performer' && (
                  <div className="py-4 text-center">
                    <p className="text-center text-lg italic text-white/70 mb-8 font-playfair text-2xl">Un assaggio del piacere che ti attende… scorri le immagini.</p>
                    <Swiper
                      modules={[Navigation, Pagination]} loop={true} spaceBetween={20} slidesPerView={2} navigation pagination={{ clickable: true }}
                      breakpoints={{ 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
                      className="w-full"
                    >
                      {primaSerataImages.map((src, index) => (
                        <SwiperSlide key={index}>
                          <button onClick={() => openModal(primaSerataImages, index)} className="w-full cursor-zoom-in group">
                            <img src={src} alt="Performer" className="w-full h-auto object-cover aspect-[3/4] border border-white/10 group-hover:border-[#D4AF37] transition-colors duration-300" />
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
            <h2 className="font-playfair text-4xl md:text-6xl text-[#D4AF37] mb-4 tracking-wider border-b-2 border-white/30 pb-4 uppercase text-shadow-3d">
              WORKSHOP
            </h2>
            <div className="mt-12 flex flex-col items-center gap-8">
              <button onClick={() => openModal(['/images/terryparadise.jpeg'], 0)} className="cursor-zoom-in group w-full max-w-2xl">
                <img src="/images/terryparadise.jpeg" alt="Terry Paradise" className="w-full h-auto object-cover border-4 border-white/20 group-hover:border-[#D4AF37] shadow-xl transition-colors duration-500" />
              </button>
              <div className="max-w-2xl w-full">
                <h3 className="font-playfair text-5xl text-white mb-2 text-center italic">💄 MAKE-IT UP!</h3>
                <p className="text-white font-playfair text-xl mb-3 text-center">Tenuto da: Terry Paradise</p>
                <div className="text-sm border-t border-b border-white/20 py-4 mb-4 text-center font-quicksand">
                  <p className="text-xl">🗓 <span className="font-semibold text-white">Domenica 17 Maggio</span></p>
                  <p className="text-xl">💰 <span className="font-semibold text-white">Costo: 25€</span></p>
                </div>
                <div className="text-center mt-6">
                  <a href="https://wa.me/393922752576" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#D4AF37] text-black px-12 py-4 text-xl font-bold font-quicksand hover:bg-white hover:text-[#0b46d0] transition-all transform hover:scale-105">
                    <MessageCircle className="w-6 h-6" />
                    ISCRIVITI ORA
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Page 4 - Contacts */}
      {currentPage === 4 && (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-4xl md:text-6xl text-[#D4AF37] mb-12 tracking-wider text-shadow-3d uppercase">
              INFORMAZIONI E CONTATTI
            </h2>
            <div className="space-y-12 text-lg mb-12 max-w-md mx-auto">
              <div className="flex items-start gap-4">
                <MapPin className="w-8 h-8 text-white flex-shrink-0 mt-1" />
                <div className="text-left font-quicksand">
                  <p className="font-playfair text-4xl text-white mb-1">Location:</p>
                  <p className="text-white/90 mb-2">Teatro Cavour – Via Camillo Benso Conte di Cavour, 9, Pescara</p>
                  <a href={mapsLink} target="_blank" className="text-white hover:text-[#0b46d0] underline decoration-white/20 transition-all">Apri su Google Maps →</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Instagram className="w-8 h-8 text-white flex-shrink-0 mt-1" />
                <div className="text-left font-quicksand">
                  <p className="font-playfair text-4xl text-white mb-1">Pagina Ufficiale:</p>
                  <a href={instagramUrl} target="_blank" className="text-white hover:text-[#0b46d0] underline decoration-white/20 transition-all">@pescara_burlesque_festival</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-8 h-8 text-white flex-shrink-0 mt-1" />
                <div className="text-left font-quicksand">
                  <p className="font-playfair text-4xl text-white mb-1">Email:</p>
                  <a href={`mailto:${emailAddress}`} className="text-white hover:text-[#0b46d0] underline decoration-white/20 transition-all">{emailAddress}</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;