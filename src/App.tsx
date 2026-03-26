import { useState, useEffect } from 'react';
import { MapPin, Instagram, Mail, Home, Users, Calendar, X, Lightbulb, MessageCircle, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

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

  // AGGIORNATO: Rimosso Programma e rinumerato Contatti
  const navItems = [
    { page: 1, Icon: Home, label: 'Home' },
    { page: 2, Icon: Users, label: 'Cast' },
    { page: 3, Icon: Lightbulb, label: 'Workshop' },
    { page: 4, Icon: Mail, label: 'Contatti' },
  ];

  const giudiciImages = [
    'Giudice Amalia.jpg', 'Giudice Cristiana.jpg', 'Giudice Elektra.jpg',
    'Giudice Lola.jpg', 'Giudice Lune.jpg'
  ].map(img => `/images/giudici/${img}`);

  const primaSerataImages = [
    'cartolina Astrey&Halley.jpg', 'cartolina baby blond.jpg', 'cartolina.jpg', 'ele.jpg',
    'Ellis.jpg', 'lady like.jpg', 'Lady Malvasia.jpg', 'lady Xena.jpg',
    'lilith lyla.jpg', 'nina.jpg', 'ralda.jpg', 'romi.jpg', 'Sinti.jpg'
  ].map(img => `/images/prima serata/${img}`);

  const secondaSerataImages = [
    'cartolina 1.jpg', 'cartolina 2.jpg', 'cartolina 3.jpg', 'cartolina 4.jpg',
    'cartolina 5.jpg', 'cartolina Betty Rocket.jpg', 'cartolina.jpg',
    'cartolina6.jpg', 'cartolina7.jpg', 'cartolina8.jpg'
  ].map(img => `/images/seconda serata/${img}`);

  const terzaSerataImages = [
    'Elektra Headliner.jpg',
    'Amalia.jpg',
    'Lady BB.jpg',
    'Lun Du Nil 2025.jpg',
    'Rocky Bon Bon.jpg',
    'Titty Flambè.jpg'
  ].map(img => `/images/terza serata/${img}`);

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
              EXCELSIOR BURLESQUE FESTIVAL
            </h1>
            <div className="text-2xl md:text-3xl text-gold/80 mb-2 font-light">
              II EDIZIONE
            </div>
            <div className="font-cinzel text-base text-gold/70 mb-8 italic tracking-wider">
              una produzione di Matisse Royale
            </div>
            <p className="text-xl md:text-2xl text-porpora font-cinzel mb-12 italic">
              Tre giorni di eleganza, ironia e seduzione nella Roma Imperiale
            </p>
            <div className="mb-12 border-4 border-gold p-4 bg-black/50 inline-block">
              <button
                onClick={() => openModal(['/images/locandina II ed..jpg'], 0)}
                className="cursor-zoom-in"
              >
                <img
                  src="/images/locandina II ed..jpg"
                  alt="Locandina Excelsior Burlesque Festival II Edizione"
                  className="max-w-full h-auto max-h-96 object-contain"
                />
              </button>
            </div>
            <div className="text-lg md:text-xl leading-relaxed mb-12 text-left max-w-3xl mx-auto space-y-6">
              <p>
                Il fascino del burlesque incontra la grandezza di Roma in un festival unico nel suo genere.
                Per tre serate, il Teatro Petrolini si trasforma in un'arena scintillante dove piume, ventagli
                e tacchi a spillo rendono omaggio alla sensualità e alla Roma Imperiale.
              </p>
              <p className="text-gold font-semibold">
                Dal 14 al 16 novembre 2025, il pubblico vivrà un viaggio tra spettacolo e storia:
              </p>
              <ul className="space-y-4 pl-6">
                <li>
                  <span className="text-gold font-cinzel text-xl">• Venerdì 14 – Ludus Levis</span>
                  <br />
                  <span className="text-sm md:text-base">
                    Cerimonia d'apertura con performance mozzafiato e il primo tuffo nell'universo dell'Excelsior.
                  </span>
                </li>
                <li>
                  <span className="text-gold font-cinzel text-xl">• Sabato 15 – Electio Imperatoris</span>
                  <br />
                  <span className="text-sm md:text-base">
                    La notte del grande contest: una giuria di esperti incoronerà l'Imperatrice di Roma,
                    la Vestale e la Gladiatrice, mentre il pubblico sceglierà il proprio campione — il Favor Populi.
                  </span>
                </li>
                <li>
                  <span className="text-gold font-cinzel text-xl">• Domenica 16 – Spectaculum Excellens</span>
                  <br />
                  <span className="text-sm md:text-base">
                    Gran Galà di chiusura con le esibizioni delle guest star, la madrina del festival e le vincitrici del contest.
                  </span>
                </li>
              </ul>
              <p className="italic text-gold/90 pt-6">
                Tre giorni di spettacolo, workshop e pura celebrazione dell'arte burlesque.
                Una festa di libertà, ironia e bellezza. Un tributo alla Roma che fu — e alla femminilità che è.
              </p>
            </div>
            <div className="border-t border-b border-gold py-6 mb-8">
              <div className="flex items-center justify-center gap-3 text-gold text-lg md:text-xl">
                <MapPin className="w-6 h-6" />
                <span className="font-cinzel">Teatro Petrolini – Via Rubattino 5, Roma (Testaccio)</span>
              </div>
              <a
                href="https://maps.google.com/?q=Teatro+Petrolini+Via+Rubattino+5+Roma"
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
                Vuoi partecipare all'Excelsior Burlesque Festival? Compila il modulo di prenotazione
                e assicurati il tuo posto in platea.
              </p>
              <a
                href="https://forms.gle/nAeke1KamjxbaTqeA"
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

      {/* Page 2 - Cast */}
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
                  Matisse Royale è l’anima scintillante dell’Excelsior: showman, performer di fama internazionale e raffinato narratore di emozioni.
                </p>
                <p>
                  Artista di boylesque, cantante e ballerino, unisce eleganza, ironia e sensualità in uno stile unico e riconoscibile.
                </p>
                <p>
                  Dai palchi d’Europa alle luci dell’Excelsior, porta con sé un universo fatto di glamour, poesia e provocazione.
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
                  🔥 Roma si inchina alla sua nuova Dea dello Spettacolo! 🔥
                </p>
                <p>
                  Dalla Repubblica Ceca con furore, eleganza e magnetismo… <strong>Elektra Show</strong> è la <strong>MADRINA</strong> della seconda edizione dell’Excelsior Burlesque Festival!
                </p>
                <p>
                  Artista raffinata e regina del palcoscenico, Elektra incarna la perfetta fusione tra il fascino del burlesque classico e l’energia travolgente del neo-burlesque. Con la sua presenza scenica mozzafiato e numeri ricchi di sorprese, saprà conquistare il pubblico come una vera imperatrice dell’Impero Romano… in paillettes!
                </p>
                <p className="font-cinzel text-gold font-bold text-center pt-4">
                  Preparatevi ad accoglierla… AVE ELEKTRA!
                </p>
              </div>
            </div>

            <div className="space-y-8 mt-16">

              <div>
                <button onClick={() => toggleSection('giudici')} className="w-full flex justify-between items-center text-left font-cinzel text-3xl text-gold mb-4 border-b border-gold/30 pb-3 transition-colors hover:text-gold/80">
                  <span>Giudici</span>
                  <ChevronDown className={`w-8 h-8 transition-transform duration-300 ${openSection === 'giudici' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'giudici' && (
                  <div className="py-4">
                    <p className="text-center text-lg italic text-gold/90 mb-8">
                      Ecco la prestigiosa giuria che avrà l'onore di incoronare l'Imperatrice di Roma. Un panel di esperti dall'occhio critico e dal cuore appassionato.
                    </p>
                    <Swiper
                      modules={[Navigation, Pagination]} loop={true} spaceBetween={20} slidesPerView={2} navigation pagination={{ clickable: true }}
                      breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 20 }, 768: { slidesPerView: 3, spaceBetween: 30 }, 1024: { slidesPerView: 4, spaceBetween: 40 }, }}
                      className="w-full"
                    >
                      {giudiciImages.map((src, index) => (
                        <SwiperSlide key={index}>
                          <button onClick={() => openModal(giudiciImages, index)} className="w-full cursor-zoom-in">
                            <img src={src} alt={`Giudice ${index + 1}`} className="w-full h-auto object-cover aspect-[3/4]" />
                          </button>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
              </div>

              <div>
                <button onClick={() => toggleSection('ludusLevis')} className="w-full flex justify-between items-center text-left font-cinzel text-3xl text-gold mb-4 border-b border-gold/30 pb-3 transition-colors hover:text-gold/80">
                  <span>Ludus Levis</span>
                  <ChevronDown className={`w-8 h-8 transition-transform duration-300 ${openSection === 'ludusLevis' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'ludusLevis' && (
                  <div className="py-4">
                    <p className="text-center text-lg italic text-gold/90 mb-8">Un assaggio del piacere che ti attende… scorri le immagini e scopri le dive della serata Ludus Levis</p>
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

              <div>
                <button onClick={() => toggleSection('electioImperatoris')} className="w-full flex justify-between items-center text-left font-cinzel text-3xl text-gold mb-4 border-b border-gold/30 pb-3 transition-colors hover:text-gold/80">
                  <span>Electio Imperatoris</span>
                  <ChevronDown className={`w-8 h-8 transition-transform duration-300 ${openSection === 'electioImperatoris' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'electioImperatoris' && (
                  <div className="py-4">
                    <p className="text-center text-lg italic text-gold/90 mb-8">Una notte di sfide, fascino e potere. Scorri per conoscere le regine che si contenderanno il titolo di Imperatrice.</p>
                    <Swiper
                      modules={[Navigation, Pagination]} loop={true} spaceBetween={20} slidesPerView={2} navigation pagination={{ clickable: true }}
                      breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 20 }, 768: { slidesPerView: 3, spaceBetween: 30 }, 1024: { slidesPerView: 4, spaceBetween: 40 }, }}
                      className="w-full"
                    >
                      {secondaSerataImages.map((src, index) => (
                        <SwiperSlide key={index}>
                          <button onClick={() => openModal(secondaSerataImages, index)} className="w-full cursor-zoom-in">
                            <img src={src} alt={`Contestant ${index + 1}`} className="w-full h-auto object-cover aspect-[3/4]" />
                          </button>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
              </div>

              <div>
                <button onClick={() => toggleSection('spectaculumExcellens')} className="w-full flex justify-between items-center text-left font-cinzel text-3xl text-gold mb-4 border-b border-gold/30 pb-3 transition-colors hover:text-gold/80">
                  <span>Spectaculum Excellens</span>
                  <ChevronDown className={`w-8 h-8 transition-transform duration-300 ${openSection === 'spectaculumExcellens' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'spectaculumExcellens' && (
                  <div className="py-4">
                    <p className="text-center text-lg italic text-gold/90 mb-8">
                      Nella serata conclusiva, il sipario si apre sull’eccellenza: ecco le protagoniste della serata “Spectaculum Excellens”.
                    </p>
                    <Swiper
                      modules={[Navigation, Pagination]} loop={true} spaceBetween={20} slidesPerView={2} navigation pagination={{ clickable: true }}
                      breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 20 }, 768: { slidesPerView: 3, spaceBetween: 30 }, 1024: { slidesPerView: 4, spaceBetween: 40 }, }}
                      className="w-full"
                    >
                      {terzaSerataImages.map((src, index) => (
                        <SwiperSlide key={index}>
                          <button onClick={() => openModal(terzaSerataImages, index)} className="w-full cursor-zoom-in">
                            <img src={src} alt={`Performer Terza Serata ${index + 1}`} className="w-full h-auto object-cover aspect-[3/4]" />
                          </button>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
              </div>

            </div>

            <div className="border-4 border-gold p-8 bg-black/50 mt-16 text-center">
              <h3 className="font-cinzel text-3xl text-gold mb-6">
                PRENOTAZIONI
              </h3>
              <p className="text-lg mb-6">
                Vuoi partecipare all'Excelsior Burlesque Festival? Compila il modulo di prenotazione
                e assicurati il tuo posto in platea.
              </p>
              <a href="https://forms.gle/nAeke1KamjxbaTqeA" target="_blank" rel="noopener noreferrer" className="inline-block bg-porpora text-white px-12 py-4 text-xl font-cinzel hover:bg-gold hover:text-black transition-all transform hover:scale-105">
                PRENOTA ORA
              </a>
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
                L’Excelsior Burlesque Festival non è solo spettacolo… è anche formazione, scoperta e condivisione.
                Durante il weekend del festival, performer e insegnanti di fama nazionale guideranno i partecipanti in un viaggio alla scoperta del burlesque, dell’espressione scenica e della consapevolezza del corpo.
              </p>
              <p>
                Quattro workshop unici, ognuno con una personalità e un approccio diverso: dalla costruzione del personaggio alla gestione dell’imprevisto, dalla sinuosità dei movimenti alla seduzione in scena.
                Che tu sia alle prime armi o un’artista già esperta, troverai un’occasione per metterti in gioco, imparare e divertirti… con un pizzico di piume, glitter e autoironia!
              </p>
              <p className="text-gold pt-4">
                Prenota il tuo posto e vivi da protagonista l’atmosfera dell’Excelsior Burlesque Festival. 💋
              </p>
            </div>

            <div className="flex flex-col gap-16 mb-12 text-left">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-64 flex-shrink-0">
                  <button onClick={() => openModal(['/images/terryparadise.jpeg'], 0)} className="cursor-zoom-in w-full">
                    <img src="/images/terryparadise.jpeg" alt="Foto di Terry Paradise" className="w-full h-auto object-cover" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="font-cinzel text-2xl text-porpora mb-2">
                    💄 MAKE-IT UP! – La tua storia, il tuo personaggio
                  </h3>
                  <p className="text-gold font-cinzel text-xl mb-3">Tenuto da: Terry Paradise</p>
                  <div className="text-sm md:text-base border-t border-b border-gold/30 py-2 mb-4 space-y-1">
                    <p>🗓 <span className="font-semibold">Sabato 15 Novembre, ore 17:15</span></p>
                    <p>💰 <span className="font-semibold">Costo: 25€</span> – Durata: 1h 15 min</p>
                  </div>
                  <p className="mb-4">In questo originalissimo workshop, Terry Paradise invita ogni partecipante non solo a sperimentare l’arte della seduzione, ma anche a dare vita a un personaggio burlesque unico e autentico. Attraverso elementi fondamentali dell’arte scenica — come trucco, costume, presenza scenica e costruzione del progetto artistico — scoprirai come raccontare te stessə sul palco in modo consapevole, potente e creativo.</p>
                  <p className="font-cinzel text-gold mt-4">Contenuti:</p>
                  <p>Breve storia del Burlesque e creazione di un progetto e sviluppo del personaggio. (Saranno rilasciate brevi dispense)</p>
                  <p className="font-cinzel text-gold mt-4">A chi è rivolto:</p>
                  <p>A tuttə coloro che desiderano esprimersi in modo creativo e personale, con o senza esperienza nel mondo del burlesque o delle arti performative.</p>
                  <p className="font-cinzel text-gold mt-4">Cosa portare:</p>
                  <p>Abbigliamento comodo e un accessorio con cui giocare o sperimentare la propria espressività.</p>
                  <p className="font-cinzel text-gold mt-4">Obiettivi:</p>
                  <p>Costruire un personaggio scenico coerente con la propria identità creativa e con la propria visione artistica.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-64 flex-shrink-0">
                  <button onClick={() => openModal(['/images/ladybb.jpeg'], 0)} className="cursor-zoom-in w-full">
                    <img src="/images/ladybb.jpeg" alt="Foto di Lady BB" className="w-full h-auto object-cover" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="font-cinzel text-2xl text-porpora mb-2">
                    IMPROVVISAZIONE E GESTIONE DELL’IMPREVISTO
                  </h3>
                  <p className="text-gold font-cinzel text-xl mb-3">Tenuto da: Lady BB</p>
                  <div className="text-sm md:text-base border-t border-b border-gold/30 py-2 mb-4 space-y-1">
                    <p>🗓 <span className="font-semibold">Sabato 15 Novembre, ore 18:45</span></p>
                    <p>💰 <span className="font-semibold">Costo: 25€</span> – Durata: 1h 15 min</p>
                  </div>
                  <p className="italic mb-4">“La zip che non scende, il corsetto che non si slaccia... Tutti imprevisti che possono capitare sul palco! Lady BB vi insegnerà come uscirne indenni e vittoriosə!”</p>
                  <p className="mb-4">In questo frizzante workshop, Lady BB condurrà i partecipanti nel mondo dell’improvvisazione teatrale applicata al burlesque. Scoprirete come trasformare gli imprevisti in momenti di comicità, fascino e sicurezza scenica. Perché nel burlesque, anche quando qualcosa va storto… lo spettacolo deve continuare — con stile!</p>
                  <p className="font-cinzel text-gold mt-4">Contenuti:</p>
                  <p>Tecniche di improvvisazione, gestione scenica e come trasformare l’errore in opportunità artistica.</p>
                  <p className="font-cinzel text-gold mt-4">A chi è rivolto:</p>
                  <p>A performer, aspiranti performer o chiunque voglia migliorare la propria presenza scenica e capacità di reazione dal vivo.</p>
                  <p className="font-cinzel text-gold mt-4">Cosa portare:</p>
                  <p>Abbigliamento comodo e un piccolo oggetto di scena o costume con cui esercitarsi.</p>
                  <p className="font-cinzel text-gold mt-4">Obiettivi:</p>
                  <p>Sviluppare prontezza scenica, capacità di improvvisazione e fiducia nel proprio istinto artistico.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-64 flex-shrink-0">
                  <button onClick={() => openModal(['/images/lunedunil.jpeg'], 0)} className="cursor-zoom-in w-full">
                    <img src="/images/lunedunil.jpeg" alt="Foto di Lune du Nil" className="w-full h-auto object-cover" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="font-cinzel text-2xl text-porpora mb-2">
                    SINUOSITY 🐍
                  </h3>
                  <p className="text-gold font-cinzel text-xl mb-3">Tenuto da: Lune du Nil</p>
                  <div className="text-sm md:text-base border-t border-b border-gold/30 py-2 mb-4 space-y-1">
                    <p>🗓 <span className="font-semibold">Domenica 16 Novembre, ore 14:00</span></p>
                    <p>💰 <span className="font-semibold">Costo: 25€</span> – Durata: 1h 15 min</p>
                  </div>
                  <p className="mb-4">Una lezione che celebra la sinuosità del corpo, la sensualità dei movimenti e la gestione dell’energia emotiva sul palco. Attraverso esercizi di comunicazione non verbale, Lune guiderà le partecipanti in un viaggio sensoriale tra gestualità, consapevolezza e potenza espressiva.</p>
                  <p className="font-cinzel text-gold mt-4">A chi è rivolto:</p>
                  <p>A tutt*! Dalle performer, ai ballerini, fino a chi desidera esplorare la propria sensualità e riscoprire il piacere del movimento.</p>
                  <p className="font-cinzel text-gold mt-4">Cosa portare:</p>
                  <p>Abbigliamento comodo, tacchi comodi (o calzini), il vostro sorriso e voglia di divertirsi!</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-64 flex-shrink-0">
                  <button onClick={() => openModal(['/images/elektrashow.jpeg'], 0)} className="cursor-zoom-in w-full">
                    <img src="/images/elektrashow.jpeg" alt="Foto di Elektra Show" className="w-full h-auto object-cover" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="font-cinzel text-2xl text-porpora mb-2">
                    BURLESQUE – I Tuoi Passi nel Mondo della Seduzione
                  </h3>
                  <p className="text-gold font-cinzel text-xl mb-3">Tenuto da: Elektra Show</p>
                  <div className="text-sm md:text-base border-t border-b border-gold/30 py-2 mb-4 space-y-1">
                    <p>🗓 <span className="font-semibold">Domenica 16 Novembre, ore 15:30</span></p>
                    <p>💰 <span className="font-semibold">Costo: 25€</span> – Durata: 1h 15 min</p>
                  </div>
                  <p className="mb-4">Un workshop dedicato a chi desidera avvicinarsi o approfondire l’arte della seduzione in movimento. Esploreremo le basi di pose, passi e dinamiche sceniche del linguaggio burlesque, arricchite da un tocco di glamour da showgirl. Si imparerà una breve coreografia con accenni di floor work.</p>
                  <p className="font-cinzel text-gold mt-4">A chi è rivolto:</p>
                  <p>A tutt*! Dai curiosi che muovono i primi passi nel burlesque ai performer che desiderano affinare la propria presenza scenica.</p>
                  <p className="font-cinzel text-gold mt-4">Cosa portare:</p>
                  <p>👠 Scarpe da scena o tacchi comodi, 🧤 guanti, calze a rete, reggicalze. Penna e carta facoltativi.</p>
                </div>
              </div>
            </div>

            <div className="border-4 border-gold p-8 bg-black/50 my-12">
              <h3 className="font-cinzel text-3xl text-porpora mb-4">
                Pacchetto Academia Excelsior
              </h3>
              <p className="text-lg mb-6">
                Se vuoi vivere il festival al massimo, c’è il pacchetto perfetto per te: tutte e quattro le lezioni, un unico percorso per scoprire, creare e brillare.
              </p>
              <p className="text-2xl font-cinzel text-gold">
                Prezzo speciale: 80€ invece di 100€
              </p>
            </div>

            <div className="border-4 border-gold p-8 bg-black/50 mb-8">
              <h3 className="font-cinzel text-3xl text-gold mb-6">
                ISCRIVITI AI WORKSHOP
              </h3>
              <p className="text-lg mb-6">
                I posti per i workshop sono limitati. Contattaci su WhatsApp per riservare il tuo posto e specificare a quali lezioni vuoi partecipare.
              </p>
              <a href="https://wa.me/393922752576" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-porpora text-white px-12 py-4 text-xl font-cinzel hover:bg-gold hover:text-black transition-all transform hover:scale-105">
                <MessageCircle className="w-6 h-6" />
                ISCRIVITI ORA
              </a>
            </div>
          </div>
        </section>
      )}


      {/* Page 4 - Contacts */}
      {currentPage === 4 && (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-12">
              <img
                src="/images/logo per video.jpg"
                alt="Logo Excelsior Burlesque Festival"
                className="max-w-xs mx-auto border-4 border-gold p-4"
              />
            </div>
            <h2 className="font-cinzel text-4xl md:text-6xl text-gold mb-12 tracking-wider">
              INFORMAZIONI E CONTATTI
            </h2>
            <div className="space-y-8 text-lg mb-12 max-w-md mx-auto">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-cinzel text-gold">LOCATION:</p>
                  <p className="text-white">Teatro Petrolini - Via Rubattino 5, Roma (Testaccio)</p>
                  <a href="https://maps.google.com/?q=Teatro+Petrolini+Via+Rubattino+5+Roma" target="_blank" rel="noopener noreferrer" className="text-porpora hover:text-gold transition-colors underline text-base">
                    Apri su Google Maps →
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Instagram className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-cinzel text-gold">PAGINA UFFICIALE:</p>
                  <a
                    href="https://www.instagram.com/excelsior_burlesque_festival"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-porpora transition-colors underline"
                  >
                    @excelsior_burlesque_festival
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Instagram className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-cinzel text-gold">DIREZIONE ARTISTICA:</p>
                  <a
                    href="https://www.instagram.com/matisse_royale"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-porpora transition-colors underline"
                  >
                    @matisse_royale
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="font-cinzel text-gold">EMAIL:</p>
                  <a
                    href="mailto:excelsiorburlesquefestival@gmail.com"
                    className="text-white hover:text-porpora transition-colors underline"
                  >
                    excelsiorburlesquefestival@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gold pt-8">
              <p className="text-gold/70 text-sm">
                © 2025 Excelsior Burlesque Festival – Tutti i diritti riservati
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;