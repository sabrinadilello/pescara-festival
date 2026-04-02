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
    'colette.jpeg', 'gigi.jpeg', 'lisabel.jpeg', 'lizzananda.jpeg', 'lollynoir.jpeg', 'nocca.jpeg', 'sciagura.jpeg'
  ].map(img => `/images/performer/${img}`);

  // Classe CSS comune per i bordi delle immagini
  const imageBorderClass = "border-4 border-white hover:border-[#D4AF37] active:border-[#D4AF37] transition-colors duration-300 shadow-lg";

  // Dati di contatto
  const mapsLink = "https://www.google.com/maps/search/?api=1&query=Teatro+Cavour+Via+Camillo+Benso+Conte+di+Cavour+9+Pescara";
  const instagramUrl = "https://www.instagram.com/pescara_burlesque_festival";
  const emailAddress = "pescaraburlesquefestival@gmail.com";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#b0ddf6] via-[#25a3e9] via-[#061c57] to-[#112149] text-white pb-24 font-montserrat">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=EB+Garamond:wght@400&family=Montserrat:wght@400&display=swap');
        
        .font-pinyon { font-family: 'Pinyon Script', cursive; }
        .font-garamond { font-family: 'EB Garamond', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }

        /* Ombreggiatura globale per i testi */
        * {
          text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
        }

        .text-shadow-3d {
          text-shadow: 0px 0px 15px rgba(255, 255, 255, 0.6), 0px 0px 5px rgba(255, 255, 255, 0.3);
        }

        :root {
          --swiper-theme-color: #D4AF37; 
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
            className="absolute top-4 right-4 text-white hover:text-[#D4AF37] transition-colors z-50"
          >
            <X className="w-10 h-10" />
          </button>

          {modalGallery.images.length > 1 && (
            <button
              onClick={showPrevImage}
              disabled={modalGallery.currentIndex === 0}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-white/10 hover:bg-[#D4AF37]/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-50"
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
              className="w-full h-auto object-contain max-h-[90vh] border-2 border-[#D4AF37]/40"
            />
          </div>

          {modalGallery.images.length > 1 && (
            <button
              onClick={showNextImage}
              disabled={modalGallery.currentIndex === modalGallery.images.length - 1}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-white/10 hover:bg-[#D4AF37]/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-50"
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
                className={`font-montserrat text-[10px] uppercase tracking-widest mt-1 transition-colors duration-300 ${currentPage === item.page ? 'text-[#D4AF37]' : 'text-white/40 group-hover:text-[#D4AF37]'
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

            <div className="text-2xl md:text-3xl mb-2 font-garamond italic uppercase tracking-widest text-[#0b46d0]">
              II EDIZIONE
            </div>
            <div className="mb-8 font-garamond tracking-wide text-[#0b46d0]">
              <span className="text-base md:text-xl block mb-1">una produzione di</span>
              <span className="text-2xl md:text-3xl">Matisse Royale</span>
            </div>
            <p className="text-2xl md:text-4xl font-pinyon mb-12 italic text-[#0b46d0]">
              La notte più glamour dell’Adriatico
            </p>

            <div className="mb-12 inline-flex overflow-hidden">
              <button
                onClick={() => openModal(['/images/locandina II ed..jpg'], 0)}
                className={`cursor-zoom-in block ${imageBorderClass}`}
              >
                <img
                  src="/images/locandina II ed..jpg"
                  alt="Locandina Pescara Burlesque Festival"
                  className="max-w-full h-auto max-h-[500px] object-contain block"
                />
              </button>
            </div>

            <div className="text-lg md:text-xl leading-relaxed mb-12 text-center max-w-3xl mx-auto space-y-6 font-montserrat text-white">
              <p>Il Pescara Burlesque Festival è l’evento internazionale che porta sulla costa adriatica il fascino senza tempo del burlesque, trasformando la città di Pescara in un palcoscenico di arte e seduzione.</p>
              <p>In una cornice elegante e suggestiva, il pubblico viene accolto in un’atmosfera sospesa, quasi irreale, in cui luci, musica e corpi raccontano storie di bellezza, desiderio e libertà.</p>
              <p className="italic pt-6">Preparati a varcare la soglia di un mondo in cui tutto è possibile… ✨</p>
            </div>

            <div className="border-t border-b border-[#061c57]/20 py-8 mb-10 text-white">
              <div className="text-2xl md:text-3xl font-garamond mb-4 tracking-wide">
                Sabato 16 maggio ore 21:00
              </div>
              <div className="flex flex-col items-center justify-center gap-3 text-lg md:text-xl font-montserrat">
                <MapPin className="w-6 h-6" />
                <span className="text-xl md:text-2xl tracking-wide text-center">Teatro Cavour – Via Camillo Benso Conte di Cavour, 9, Pescara</span>
              </div>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-5 text-white hover:text-[#D4AF37] transition-all duration-300 underline decoration-white/30 font-montserrat"
              >
                Apri su Google Maps →
              </a>
            </div>

            <div className="border-4 border-white p-8 bg-white/5 text-white">
              <h3 className="text-4xl md:text-5xl font-garamond mb-4">Prenotazioni</h3>
              <p className="text-sm md:text-base font-montserrat mb-8 max-w-xl mx-auto leading-relaxed opacity-80 text-center">
                Vuoi partecipare al Pescara Burlesque Festival? Compila il modulo di prenotazione e assicurati il tuo posto in platea.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc9-Ur65j0i9ynErCy7L0sksM3G_zPUdiPnobASG0YRUaq1Zw/viewform?usp=sharing&ouid=106777875788059470191"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-[#0b46d0] px-12 py-4 text-xl font-montserrat hover:bg-[#D4AF37] hover:text-black transition-all transform hover:scale-105 shadow-lg"
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
            <h2 className="font-pinyon text-7xl text-[#D4AF37] mb-12 tracking-wider border-b-2 border-[#D4AF37] pb-4 text-center text-shadow-3d">
              Il Cast
            </h2>

            {/* PRODUCER */}
            <div className="mb-24 text-center">
              <button onClick={() => openModal(['/images/presentatore.jpg'], 0)} className="cursor-zoom-in group mb-8">
                <img src="/images/presentatore.jpg" alt="Matisse Royale" className={`max-w-full h-auto mx-auto ${imageBorderClass}`} />
              </button>
              <div className="text-white">
                <p className="text-2xl md:text-3xl font-garamond text-[#D4AF37] uppercase tracking-widest mb-2">PRODUCER</p>
                <p className="text-3xl md:text-4xl font-pinyon mb-8">Matisse Royale</p>
                <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl font-montserrat text-center text-white leading-relaxed">
                  <p>Matisse Royale è l’anima scintillante dell’Excelsior: showman, performer di fama internazionale e raffinato narratore di emozioni. Artista di boylesque, cantante e ballerino, unisce eleganza, ironia e sensualità in uno stile unico e riconoscibile.</p>
                  <p>Dai palchi d’Europa alle luci dell’Excelsior, porta con sé un universo fatto di glamour, poesia e provocazione. Sul palco incanta, dietro le quinte crea: ogni suo spettacolo è un invito a lasciarsi sedurre dal potere dell’arte e dal piacere della meraviglia.</p>
                </div>
              </div>
            </div>

            {/* THE GODMOTHER */}
            <div className="mb-24 text-center">
              <button onClick={() => openModal(['/images/godmother.jpeg'], 0)} className="cursor-zoom-in group mb-8">
                <img src="/images/godmother.jpeg" alt="Candy Rose" className={`max-w-full h-auto mx-auto ${imageBorderClass}`} />
              </button>
              <div className="text-white">
                <p className="text-2xl md:text-3xl font-garamond text-[#D4AF37] uppercase tracking-widest mb-2">THE GODMOTHER</p>
                <p className="text-3xl md:text-4xl font-pinyon mb-8">Candy Rose</p>
                <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl font-montserrat text-center leading-relaxed opacity-90">
                  <p>Candy Rose incanta con uno sguardo magnetico, un sorriso irresistibile e un’eleganza che si traduce in pura presenza scenica. Artista poliedrica, accompagna il pubblico in atmosfere sensuali e suggestive, distinguendosi per uno stile raffinato e inconfondibile.</p>
                  <p>Ballerina versatile, si avvicina alla danza fin da bambina, intraprendendo un percorso di costante crescita e perfezionamento attraverso stage e collaborazioni con maestri di fama internazionale.</p>
                  <p>Eleganza e charme definiscono la sua essenza: pelle diafana, labbra rosso intenso e un’estetica rétro che la rendono una figura iconica, capace di evocare il fascino senza tempo del burlesque.</p>
                </div>
                <p className="text-xl md:text-2xl font-garamond italic text-[#D4AF37] mt-8 text-center">Elegance. Charm. Seduction.</p>
              </div>
            </div>

            {/* THE HOST */}
            <div className="mb-24 text-center">
              <button onClick={() => openModal(['/images/host.jpeg'], 0)} className="cursor-zoom-in group mb-8">
                <img src="/images/host.jpeg" alt="Stefano Cirulli" className={`max-w-full h-auto mx-auto ${imageBorderClass}`} />
              </button>
              <div className="text-white">
                <p className="text-2xl md:text-3xl font-garamond text-[#D4AF37] uppercase tracking-widest mb-2">THE HOST</p>
                <p className="text-3xl md:text-4xl font-pinyon mb-8">Stefano Cirulli</p>
                <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl font-montserrat text-center leading-relaxed opacity-90">
                  <p>Stefano Cirulli, cantante, musicista e autentico mattatore di palco, è la voce che accompagnerà il pubblico in una serata carica di energia e spettacolo. Con carisma e presenza scenica, guida lo show tra ritmo, ironia e momenti sorprendenti.</p>
                  <p>Con il microfono in una mano e il cuore nell’altra, conduce gli spettatori in un viaggio fatto di musica, emozioni e intrattenimento, trasformando ogni istante in un’esperienza coinvolgente e indimenticabile.</p>
                </div>
                <p className="text-xl md:text-2xl font-garamond italic text-[#D4AF37] mt-8 text-center">Energy. Rhythm. Show.</p>
              </div>
            </div>

            <div className="space-y-8 mt-16">
              <div>
                <button onClick={() => toggleSection('performer')} className="w-full flex justify-center items-center font-garamond text-3xl border-b border-white/20 pb-3 text-white hover:text-[#D4AF37] active:text-[#D4AF37] transition-colors duration-300">
                  <span className="uppercase tracking-widest">PERFORMER</span>
                  <ChevronDown className={`ml-4 w-8 h-8 transition-transform duration-300 ${openSection === 'performer' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'performer' && (
                  <div className="py-4 text-center">
                    <p className="text-center text-lg italic text-white/70 mb-8 font-montserrat">Un assaggio del piacere che ti attende… scorri le immagini.</p>
                    <Swiper
                      modules={[Navigation, Pagination]} loop={true} spaceBetween={20} slidesPerView={2} navigation pagination={{ clickable: true }}
                      breakpoints={{ 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
                      className="w-full pb-12"
                    >
                      {primaSerataImages.map((src, index) => (
                        <SwiperSlide key={index}>
                          <button onClick={() => openModal(primaSerataImages, index)} className="w-full cursor-zoom-in">
                            <img src={src} alt="Performer" className={`w-full h-auto object-cover aspect-[3/4] ${imageBorderClass}`} />
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
            <h2 className="font-pinyon text-7xl text-[#D4AF37] mb-4 border-b-2 border-[#D4AF37] pb-4 text-shadow-3d">
              Workshop
            </h2>
            <div className="mt-12 flex flex-col items-center gap-8">
              <button onClick={() => openModal(['/images/terryparadise.jpeg'], 0)} className="cursor-zoom-in group w-full max-w-2xl">
                <img src="/images/terryparadise.jpeg" alt="Terry Paradise" className={`w-full h-auto object-cover ${imageBorderClass}`} />
              </button>
              <div className="max-w-2xl w-full">
                <h3 className="text-4xl md:text-5xl text-white mb-2 text-center italic font-garamond">Make-it Up!</h3>
                <p className="text-white font-garamond text-xl md:text-2xl mb-8 text-center">Tenuto da: Terry Paradise</p>
                <a
                  href="https://wa.me/393922752576"
                  target="_blank"
                  className="inline-block bg-white text-[#0b46d0] px-12 py-4 text-xl font-montserrat hover:bg-[#D4AF37] hover:text-black transition-all transform hover:scale-105 shadow-lg"
                >
                  <MessageCircle className="w-6 h-6 inline-block mr-2" /> ISCRIVITI ORA
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Page 4 - Contacts */}
      {currentPage === 4 && (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
          {/* Contenitore principale centrato */}
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center">

            {/* Titolo sempre al centro */}
            <h2 className="font-pinyon text-6xl md:text-7xl text-[#D4AF37] mb-16 tracking-wider text-shadow-3d text-center w-full">
              Informazioni e Contatti
            </h2>

            <div className="space-y-10 w-full max-w-fit">
              {/* LOCATION */}
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#0b46d0] flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-garamond text-[#0b46d0] tracking-widest text-sm md:text-base uppercase">LOCATION:</p>
                  <p className="text-white font-montserrat text-base md:text-lg">Teatro Cavour – Via Camillo Benso Conte di Cavour, 9, Pescara</p>
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="text-[#061c57] hover:text-[#D4AF37] transition-colors underline text-base font-montserrat">
                    Apri su Google Maps →
                  </a>
                </div>
              </div>

              {/* PAGINA UFFICIALE */}
              <div className="flex items-start gap-4">
                <Instagram className="w-6 h-6 text-[#0b46d0] flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-garamond text-[#0b46d0] tracking-widest text-sm md:text-base uppercase">PAGINA UFFICIALE:</p>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#D4AF37] transition-colors underline font-montserrat text-base md:text-lg"
                  >
                    @pescara_burlesque_festival
                  </a>
                </div>
              </div>

              {/* DIREZIONE ARTISTICA */}
              <div className="flex items-start gap-4">
                <Instagram className="w-6 h-6 text-[#0b46d0] flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-garamond text-[#0b46d0] tracking-widest text-sm md:text-base uppercase">DIREZIONE ARTISTICA:</p>
                  <a
                    href="https://www.instagram.com/matisse_royale"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#D4AF37] transition-colors underline font-montserrat text-base md:text-lg"
                  >
                    @matisse_royale
                  </a>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#0b46d0] flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-garamond text-[#0b46d0] tracking-widest text-sm md:text-base uppercase">EMAIL:</p>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="text-white hover:text-[#D4AF37] transition-colors underline font-montserrat text-base md:text-lg"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 pt-8 mt-20 text-center w-full">
              <p className="text-white/50 text-sm font-montserrat">
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