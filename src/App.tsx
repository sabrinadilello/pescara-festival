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
    <div className="min-h-screen bg-black text-white pb-24">
      <style>{`
        :root {
          --swiper-theme-color: #daa520; 
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
            className="absolute top-4 right-4 text-white hover:text-gold transition-colors z-50"
            aria-label="Chiudi"
          >
            <X className="w-10 h-10" />
          </button>

          {modalGallery.images.length > 1 && (
            <button
              onClick={showPrevImage}
              disabled={modalGallery.currentIndex === 0}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/30 hover:bg-black/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-50"
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
              className="w-full h-auto object-contain max-h-[90vh]"
            />
          </div>

          {modalGallery.images.length > 1 && (
            <button
              onClick={showNextImage}
              disabled={modalGallery.currentIndex === modalGallery.images.length - 1}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/30 hover:bg-black/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-50"
              aria-label="Immagine successiva"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          )}

        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-40 bg-black/80 backdrop-blur-sm border-t border-gold/30">
        <div className="flex items-center py-3">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => goToPage(item.page)}
              className="flex flex-1 flex-col items-center gap-1 px-1 text-xs transition-all duration-300 transform"
              aria-label={item.label}
            >
              <item.Icon
                className={`w-6 h-6 ${currentPage === item.page ? 'text-gold' : 'text-gray-400 group-hover:text-gold'
                  }`}
              />
              <span
                className={`font-cinzel ${currentPage === item.page ? 'text-gold' : 'text-gray-400 group-hover:text-gold'
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
            <div className="absolute top-10 left-10 w-32 h-32 border border-gold rounded-full" />
            <div className="absolute bottom-10 right-10 w-40 h-40 border border-gold rounded-full" />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="font-cinzel text-5xl md:text-7xl text-gold mb-4 tracking-wider">
              PESCARA BURLESQUE FESTIVAL
            </h1>
            <div className="text-2xl md:text-3xl text-gold/80 mb-2 font-light">
              II EDIZIONE
            </div>
            <div className="font-cinzel text-base text-gold/70 mb-8 italic tracking-wider">
              una produzione di Matisse Royale
            </div>
            <p className="text-xl md:text-2xl text-porpora font-cinzel mb-12 italic">
              La notte più glamour dell’Adriatico
            </p>
            <div className="mb-12 border-4 border-gold p-4 bg-black/50 inline-block">
              <button
                onClick={() => openModal(['/images/locandina II ed..jpg'], 0)}
                className="cursor-zoom-in"
              >
                <img
                  src="/images/locandina II ed..jpg"
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
                In una cornice elegante e suggestiva, il pubblico viene accolto in un’atmosfera sospesa, quasi irreale, in cui luci, musica e corpi raccontano storie di bellezza, desiderio e libertà. Un viaggio magnetico tra sensualità e ironia, dove il glamour si fonde con il respiro del mare e ogni dettaglio è pensato per incantare.
              </p>
              <p>
                Un appuntamento imperdibile per chi desidera lasciarsi sedurre e vivere una notte fuori dall’ordinario.
              </p>
              <p className="italic text-gold/90 pt-6">
                Preparati a varcare la soglia di un mondo in cui tutto è possibile… e lasciati travolgere dalla notte più glamour dell’Adriatico. ✨
              </p>
            </div>
            <div className="border-t border-b border-gold py-6 mb-8">
              <div className="text-gold text-2xl font-cinzel mb-4">
                Sabato 16 maggio ore 21:00
              </div>
              <div className="flex items-center justify-center gap-3 text-gold text-lg md:text-xl">
                <MapPin className="w-6 h-6" />
                <span className="font-cinzel">Teatro Cavour – Via Camillo Benso Conte di Cavour, 9, Pescara</span>
              </div>
              <a
                href="https://maps.google.com/?q=Teatro+Cavour+Via+Camillo+Benso+Conte+di+Cavour+9+Pescara"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-porpora hover:text-white transition-colors underline"
              >
                Apri su Google Maps →
              </a>
            </div>

            <div className="border-4 border-gold p-8 bg-black/50">
              <h3 className="font-cinzel text-3xl text-gold mb-6">
                PRENOTAZIONI
              </h3>
              <p className="text-lg mb-6">
                Vuoi partecipare al Pescara Burlesque Festival? Compila il modulo di prenotazione
                e assicurati il tuo posto in platea.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc9-Ur65j0i9ynErCy7L0sksM3G_zPUdiPnobASG0YRUaq1Zw/viewform?usp=sharing&ouid=106777875788059470191"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-porpora text-white px-12 py-4 text-xl font-cinzel hover:bg-gold hover:text-black transition-all transform hover:scale-105"
              >
                PRENOTA ORA
              </a>
            </div>

          </div>
        </section>
      )}

      {/* Page 2 - Cast (MODIFICATA) */}
      {currentPage === 2 && (
        <section className="min-h-screen flex flex-col items-center px-6 py-20">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="font-cinzel text-4xl md:text-6xl text-gold mb-12 tracking-wider border-b-2 border-gold pb-4 text-center">
              IL CAST – II EDIZIONE
            </h2>

            <div className="mb-12 text-center">
              <button
                onClick={() => openModal(['/images/presentatore.jpeg'], 0)}
                className="cursor-zoom-in"
              >
                <img src="/images/presentatore.jpeg" alt="Matisse Royale, producer" className="max-w-full h-auto" />
              </button>
              <div className="text-lg md:text-xl leading-relaxed mt-8 space-y-4 text-left max-w-3xl mx-auto">
                <p>
                  Matisse Royale è l’anima scintillante del festival: showman, performer di fama internazionale e raffinato narratore di emozioni.
                </p>
                <p>
                  Artista di boylesque, cantante e ballerino, unisce eleganza, ironia e sensualità in uno stile unico e riconoscibile.
                </p>
                <p>
                  Sul palco incanta, dietro le quinte crea: ogni suo spettacolo è un invito a lasciarsi sedurre dal potere dell’arte e dal piacere della meraviglia.
                </p>
              </div>
            </div>

            <div className="mb-12 text-center">
              <button
                onClick={() => openModal(['/images/madrina.jpeg'], 0)}
                className="cursor-zoom-in"
              >
                <img src="/images/madrina.jpeg" alt="Elektra Show, madrina del festival" className="max-w-full h-auto" />
              </button>
              <div className="text-lg md:text-xl leading-relaxed mt-8 space-y-4 text-left max-w-3xl mx-auto">
                <p className="font-cinzel text-2xl text-porpora italic text-center mb-6">
                  🔥 La Dea dello Spettacolo! 🔥
                </p>
                <p>
                  Dalla Repubblica Ceca con furore, eleganza e magnetismo… <strong>Elektra Show</strong> è la <strong>MADRINA</strong> della seconda edizione del Pescara Burlesque Festival!
                </p>
                <p>
                  Artista raffinata e regina del palcoscenico, Elektra incarna la perfetta fusione tra il fascino del burlesque classico e l’energia travolgente del neo-burlesque. Con la sua presenza scenica mozzafiato e numeri ricchi di sorprese, saprà conquistare il pubblico come una vera imperatrice.
                </p>
              </div>
            </div>

            <div className="space-y-8 mt-16">
              <div>
                <button onClick={() => toggleSection('performer')} className="w-full flex justify-between items-center text-left font-cinzel text-3xl text-gold mb-4 border-b border-gold/30 pb-3 transition-colors hover:text-gold/80">
                  <span>PERFORMER</span>
                  <ChevronDown className={`w-8 h-8 transition-transform duration-300 ${openSection === 'performer' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'performer' && (
                  <div className="py-4">
                    <p className="text-center text-lg italic text-gold/90 mb-8">Un assaggio del piacere che ti attende… scorri le immagini e scopri le dive del Festival</p>
                    <Swiper
                      modules={[Navigation, Pagination]} loop={true} spaceBetween={20} slidesPerView={2} navigation pagination={{ clickable: true }}
                      breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 20 }, 768: { slidesPerView: 3, spaceBetween: 30 }, 1024: { slidesPerView: 4, spaceBetween: 40 }, }}
                      className="w-full"
                    >
                      {primaSerataImages.map((src, index) => (
                        <SwiperSlide key={index}>
                          <button onClick={() => openModal(primaSerataImages, index)} className="w-full cursor-zoom-in">
                            <img src={src} alt={`Performer ${index + 1}`} className="w-full h-auto object-cover aspect-[3/4]" />
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
            <h2 className="font-cinzel text-4xl md:text-6xl text-gold mb-4 tracking-wider border-b-2 border-gold pb-4">
              WORKSHOP
            </h2>
            <p className="text-2xl text-porpora font-cinzel my-6 italic">
              Esplora. Impara. Brilla.
            </p>
            <div className="text-lg leading-relaxed space-y-4 mb-12 text-left max-w-3xl mx-auto">
              <p>
                Il Pescara Burlesque Festival non è solo spettacolo… è anche formazione, scoperta e condivisione.
              </p>
            </div>

            <div className="flex flex-col items-center mb-12 text-left">
              <div className="flex flex-col items-center gap-8">
                <div className="w-full max-w-2xl">
                  <button onClick={() => openModal(['/images/terryparadise.jpeg'], 0)} className="cursor-zoom-in w-full">
                    <img src="/images/terryparadise.jpeg" alt="Foto di Terry Paradise" className="w-full h-auto object-cover border-4 border-gold" />
                  </button>
                </div>
                <div className="max-w-2xl w-full">
                  <h3 className="font-cinzel text-3xl text-porpora mb-2 text-center">
                    💄 MAKE-IT UP! – La tua storia, il tuo personaggio
                  </h3>
                  <p className="text-gold font-cinzel text-xl mb-3 text-center">Tenuto da: Terry Paradise</p>
                  <div className="text-sm md:text-base border-t border-b border-gold/30 py-4 mb-4 space-y-1 text-center">
                    <p>🗓 <span className="font-semibold">Domenica 17 Maggio</span></p>
                    <p>💰 <span className="font-semibold">Costo: 25€</span> – Durata: 1h 15 min</p>
                  </div>
                  <p className="mb-4 text-center">In questo originalissimo workshop, Terry Paradise invita ogni partecipante non solo a sperimentare l’arte della seduzione, ma anche a dare vita a un personaggio burlesque unico e autentico. Attraverso elementi fondamentali dell’arte scenica scoprirai come raccontare te stessə sul palco in modo consapevole, potente e creativo.</p>
                  <div className="text-center mt-6">
                    <a href="https://wa.me/393922752576" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-porpora text-white px-12 py-4 text-xl font-cinzel hover:bg-gold hover:text-black transition-all transform hover:scale-105">
                      <MessageCircle className="w-6 h-6" />
                      ISCRIVITI ORA
                    </a>
                  </div>
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
            <h2 className="font-cinzel text-4xl md:text-6xl text-gold mb-12 tracking-wider">
              INFORMAZIONI E CONTATTI
            </h2>
            <div className="space-y-8 text-lg mb-12 max-w-md mx-auto">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-cinzel text-gold">LOCATION:</p>
                  <p className="text-white">Teatro Cavour – Via Camillo Benso Conte di Cavour, 9, Pescara</p>
                  <a href="https://maps.google.com/?q=Teatro+Cavour+Via+Camillo+Benso+Conte+di+Cavour+9+Pescara" target="_blank" rel="noopener noreferrer" className="text-porpora hover:text-gold transition-colors underline text-base">
                    Apri su Google Maps →
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Instagram className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-cinzel text-gold">PAGINA UFFICIALE:</p>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-porpora transition-colors underline"
                  >
                    @pescara_burlesque_festival
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-cinzel text-gold">EMAIL:</p>
                  <a
                    href="mailto:pescaraburlesquefestival@gmail.com"
                    className="text-white hover:text-porpora transition-colors underline"
                  >
                    pescaraburlesquefestival@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gold pt-8">
              <p className="text-gold/70 text-sm">
                © 2025 Pescara Burlesque Festival – Tutti i diritti riservati
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;