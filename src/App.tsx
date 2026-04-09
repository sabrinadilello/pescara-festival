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

  const performerImages = [
    'colette.jpeg', 'gigi.jpeg', 'lisabel.jpeg', 'lizzananda.jpeg', 'lollynoir.jpeg', 'nocca.jpeg', 'sciagura.jpeg'
  ].map(img => `/images/performer/${img}`);

  const imageBorderClass = "border-4 border-white hover:border-[#D4AF37] active:border-[#D4AF37] transition-all duration-300 shadow-lg";

  const mapsLink = "https://www.google.com/maps/search/?api=1&query=Teatro+Cavour+Via+Camillo+Benso+Conte+di+Cavour+9+Pescara";
  const instagramUrl = "https://www.instagram.com/pescara_burlesque_festival";
  const emailAddress = "pescaraburlesquefestival@gmail.com";

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,#b0ddf6_0%,#25a3e9_25%,#003ba3_50%,#061c57_75%,#112149_100%)] text-white pb-24 font-montserrat">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@400;700&display=swap');
        
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }

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
                className={`font-montserrat text-xs uppercase tracking-widest mt-1 transition-colors duration-300 ${currentPage === item.page ? 'text-[#D4AF37]' : 'text-white/40 group-hover:text-[#D4AF37]'
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
          <div className="max-w-4xl mx-auto text-center relative z-10 w-full">

            {/* Punto 3: Rimossa linea sotto il titolo (pb-4 e border-b-2 rimosse) e Punto 5: MAIUSCOLO */}
            <h1 className="font-cormorant text-5xl md:text-7xl text-[#D4AF37] mb-8 tracking-wider text-center text-shadow-3d uppercase">
              Pescara Burlesque Festival
            </h1>

            {/* Punto 1: Rimossa ombra dorata | Punto 4: Uniformato font a Cormorant */}
            <div className="text-2xl md:text-3xl text-white mb-2 font-cormorant tracking-widest uppercase">
              II EDIZIONE
            </div>
            <div className="font-cormorant text-base text-white mb-8 italic tracking-wider">
              una produzione di Matisse Royale
            </div>

            <p className="text-xl md:text-2xl text-[#D4AF37] font-cormorant mb-12 italic">
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

            <div className="text-lg md:text-xl leading-relaxed mb-12 text-center max-w-3xl mx-auto space-y-6 font-montserrat text-white text-shadow-3d">
              <p>Il Pescara Burlesque Festival è l’evento internazionale che porta sulla costa adriatica il fascino senza tempo del burlesque, trasformando la città di Pescara in un palcoscenico di arte e seduzione.</p>
              <p>In una cornice elegante e suggestiva, il pubblico viene accolto in un’atmosfera sospesa, quasi irreale, in cui luci, musica e corpi raccontano storie di bellezza, desiderio e libertà.</p>

              <p className="italic pt-6 text-center font-cormorant text-xl md:text-2xl text-[#D4AF37]">
                Preparati a varcare la soglia di un mondo in cui tutto è possibile… ✨
              </p>
            </div>

            <div className="border-t border-b border-[#D4AF37] py-6 mb-8">
              <div className="text-lg md:text-xl font-cormorant mb-4 tracking-wide text-center text-white">
                Sabato 16 maggio ore 21:00
              </div>

              <div className="flex flex-row items-center justify-center gap-3 text-white text-lg md:text-xl font-montserrat">
                <MapPin className="w-6 h-6 shrink-0 text-[#D4AF37]" />
                <span className="tracking-wide">Teatro Cavour – Via Camillo Benso Conte di Cavour, 9, Pescara</span>
              </div>

              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-white hover:text-[#D4AF37] transition-all duration-300 underline font-montserrat"
              >
                Apri su Google Maps →
              </a>
            </div>

            <div className="border-4 border-white p-8 bg-white/5 text-white">
              {/* Punto 4: Grandezza 3xl come Roma */}
              <h3 className="text-3xl font-cormorant mb-6 uppercase tracking-wider">Prenotazioni</h3>
              {/* Punto 2: Testo rimpicciolito (text-base md:text-lg e opacity) */}
              <p className="text-2xl md:text-2xl mb-6 font-montserrat opacity-80 max-w-2xl mx-auto">
                Vuoi partecipare al Pescara Burlesque Festival? Compila il modulo di prenotazione e assicurati il tuo posto in platea.
              </p>

              {/* Punto 3: Rimosso grassetto */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc9-Ur65j0i9ynErCy7L0sksM3G_zPUdiPnobASG0YRUaq1Zw/viewform?usp=sharing&ouid=106777875788059470191"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-[#0b46d0] px-12 py-4 text-xl font-montserrat hover:bg-[#D4AF37] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
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
            <h2 className="font-cormorant text-4xl md:text-6xl text-[#D4AF37] mb-12 tracking-wider border-b-2 border-[#D4AF37] pb-4 text-center text-shadow-3d uppercase">
              Il Cast
            </h2>

            {[
              {
                role: "PRODUCER",
                name: "Matisse Royale",
                img: "/images/presentatore.jpg",
                desc: [
                  "Matisse Royale è l’anima scintillante dell’Excelsior: showman, performer di fama internazionale e raffinato narratore di emozioni. Artista di boylesque, cantante e ballerino, unisce eleganza, ironia e sensualità in uno stile unico e riconoscibile.",
                  "Dai palchi d’Europa alle luci dell’Excelsior, porta con sé un universo fatto di glamour, poesia e provocazione. Sul palco incanta, dietro le quinte crea: ogni suo spettacolo è un invito a lasciarsi sedurre dal potere dell’arte e dal piacere della meraviglia."
                ]
              },
              {
                role: "THE GODMOTHER",
                name: "Candy Rose",
                img: "/images/godmother.jpeg",
                desc: [
                  "Candy Rose incanta con uno sguardo magnetico, un sorriso irresistibile e un’eleganza che si traduce in pura presenza scenica. Artista poliedrica, accompagna il pubblico in atmosfere sensuali e suggestive, distinguendosi per uno stile raffinato e inconfondibile.",
                  "Ballerina versatile, si avvicina alla danza fin da bambina, intraprendendo un percorso di costante crescita e perfezionamento attraverso stage e collaborazioni con maestri di fama internazionale.",
                  "Eleganza e charme definiscono la sua essenza: pelle diafana, labbra rosso intenso e un’estetica rétro che la rendono una figura iconica, capace di evocare il fascino senza tempo del burlesque."
                ],
                extra: "Elegance. Charm. Seduction."
              },
              {
                role: "THE HOST",
                name: "Stefano Cirulli",
                img: "/images/host.jpeg",
                desc: [
                  "Stefano Cirulli, cantante, musicista e autentico mattatore di palco, è la voce che accompagnerà il pubblico in una serata carica di energia e spettacolo. Con carisma e presenza scenica, guida lo show tra ritmo, ironia e momenti sorprendenti.",
                  "Con il microfono in una mano e il cuore nell’altra, conduce gli spettatori in un viaggio fatto di musica, emozioni e intrattenimento, trasformando ogni istante in un’esperienza coinvolgente e indimenticabile."
                ],
                extra: "Energy. Rhythm. Show."
              }
            ].map((person, idx) => (
              <div key={idx} className="mb-24 text-center">
                <button onClick={() => openModal([person.img], 0)} className="cursor-zoom-in mb-8">
                  <img src={person.img} alt={person.name} className={`max-w-full h-auto mx-auto ${imageBorderClass}`} />
                </button>
                <div className="text-white">
                  <p className="text-xl md:text-2xl font-cormorant text-[#D4AF37] uppercase tracking-widest mb-2">{person.role}</p>
                  <p className="text-3xl md:text-4xl font-cormorant mb-8">{person.name}</p>
                  <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl font-montserrat text-center leading-relaxed">
                    {person.desc.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                  {person.extra && <p className="text-xl md:text-2xl font-cormorant italic text-[#D4AF37] mt-8">{person.extra}</p>}
                </div>
              </div>
            ))}

            <div className="space-y-8 mt-16 text-center">
              <div>
                <button onClick={() => toggleSection('performer')} className="w-full flex justify-between items-center font-cormorant text-3xl text-white border-b border-white/20 pb-3 hover:text-[#D4AF37] transition-colors">
                  <span className="uppercase tracking-widest">PERFORMER</span>
                  <ChevronDown className={`w-8 h-8 transition-transform duration-300 ${openSection === 'performer' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'performer' && (
                  <div className="py-4 text-center">
                    <p className="text-center text-lg italic text-white/70 mb-8 font-montserrat">Un assaggio del piacere che ti attende… scorri le immagini.</p>
                    <Swiper
                      modules={[Navigation, Pagination]} loop={true} spaceBetween={20} slidesPerView={2} navigation pagination={{ clickable: true }}
                      breakpoints={{ 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
                      className="w-full pb-12"
                    >
                      {performerImages.map((src, index) => (
                        <SwiperSlide key={index}>
                          <button onClick={() => openModal(performerImages, index)} className="w-full cursor-zoom-in">
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
        <section className="min-h-screen flex flex-col items-center px-6 py-20">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="font-cormorant text-4xl md:text-6xl text-[#D4AF37] mb-12 tracking-wider border-b-2 border-[#D4AF37] pb-4 text-center text-shadow-3d uppercase">
              Workshop
            </h2>

            <div className="flex flex-col items-center gap-12">
              <button onClick={() => openModal(['/images/workshop.jpeg'], 0)} className="cursor-zoom-in group w-full max-w-2xl">
                <img src="/images/workshop.jpeg" alt="Workshop Floorwork" className={`w-full h-auto object-cover mx-auto ${imageBorderClass}`} />
              </button>

              <div className="w-full text-left font-montserrat">
                <h3 className="text-2xl md:text-3xl text-white mb-2 font-cormorant tracking-tight">
                  ✨ WORKSHOP DI FLOORWORK – CON MATISSE ROYALE ✨
                </h3>
                <p className="text-xl text-[#D4AF37] font-cormorant mb-6">TENUTO DA: MATISSE ROYALE</p>

                <div className="border-t border-b border-white/20 py-4 mb-4 space-y-2">
                  <p className="text-white text-base flex items-center gap-2">
                    🗓 <span className="font-cormorant text-[#D4AF37] uppercase tracking-widest text-sm">Data:</span> Sabato 16 Maggio, ore 15:00
                  </p>
                  <p className="text-white text-base flex items-center gap-2">
                    💰 <span className="font-cormorant text-[#D4AF37] uppercase tracking-widest text-sm">Costo:</span> 25€ – <span className="font-cormorant text-[#D4AF37] uppercase tracking-widest text-sm">Durata:</span> 1h 15 min
                  </p>
                </div>

                <div className="pt-6 space-y-6 text-white/90 text-lg md:text-xl leading-relaxed">
                  <p>C’è un momento, sulla scena, in cui tutto si rallenta… e ogni dettaglio diventa essenziale.</p>
                  <p>È nel contatto con il pavimento che il movimento si fa più intimo, più profondo, quasi sussurrato. Qui il floorwork incontra l’eleganza del burlesque, dando vita a una danza fatta di linee morbide, gesti sospesi e silenzi carichi di significato.</p>
                </div>

                <div className="mt-8 space-y-2">
                  <p className="text-[#D4AF37] font-cormorant tracking-widest uppercase text-sm">📍 Location:</p>
                  <p className="text-white text-base md:text-lg">Teatro Cavour – Via Camillo Conte di Cavour 9, Pescara</p>
                </div>

                <div className="mt-16 border-4 border-white p-8 bg-white/5 text-white text-center">
                  <h3 className="text-3xl font-cormorant mb-6 uppercase tracking-wider">Prenotazioni</h3>
                  {/* Punto 2: Testo rimpicciolito */}
                  <p className="text-base md:text-lg mb-6 font-montserrat opacity-80 max-w-xl mx-auto">
                    I posti sono limitati. Assicurati il tuo spazio e scopri un nuovo modo di vivere il palco.
                  </p>
                  {/* Punto 3: Rimosso grassetto */}
                  <a
                    href="https://wa.me/393922752576"
                    target="_blank"
                    className="inline-block bg-white text-[#0b46d0] px-12 py-4 text-xl font-montserrat hover:bg-[#D4AF37] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg uppercase"
                  >
                    <MessageCircle className="w-6 h-6 inline-block mr-2" /> Iscriviti ora
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
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center">

            <h2 className="font-cormorant text-4xl md:text-6xl text-[#D4AF37] mb-12 tracking-wider text-shadow-3d text-center w-full uppercase">
              Informazioni e Contatti
            </h2>

            <div className="space-y-8 w-full max-w-fit">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-cormorant text-[#D4AF37] tracking-widest text-sm uppercase">LOCATION:</p>
                  <p className="text-white font-montserrat text-lg md:text-xl">Teatro Cavour – Pescara</p>
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#D4AF37] transition-colors underline text-base font-montserrat">
                    Apri su Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Instagram className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-cormorant text-[#D4AF37] tracking-widest text-sm uppercase">PAGINA UFFICIALE:</p>
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#D4AF37] transition-colors underline font-montserrat text-lg md:text-xl">
                    @pescara_burlesque_festival
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-cormorant text-[#D4AF37] tracking-widest text-sm uppercase">EMAIL:</p>
                  <a href={`mailto:${emailAddress}`} className="text-white hover:text-[#D4AF37] transition-colors underline font-montserrat text-lg md:text-xl">
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