import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projectsData';

// Import local assets
import aboutPoster from '../assets/about-poster.png';
import exp1 from '../assets/expertise-1.png';
import exp2 from '../assets/expertise-2.png';
import exp3 from '../assets/expertise-3.png';
import exp4 from '../assets/expertise-4.png';
import exp5 from '../assets/expertise-5.png';
import exp6 from '../assets/expertise-6.png';

import nutecBag from '../assets/nutec-bag.png';
import nutecInfographic from '../assets/nutec-infographic.png';
import pantherBottle from '../assets/panther-bottle.png';
import pantherInfographic from '../assets/panther-infographic.png';
import farmerEducation from '../assets/farmer-education.png';
import farmerEducation2 from '../assets/farmer-education-2.png';
import pantherHero from '../assets/panther-hero.png';

const projectImages = {
  'nutec-bag.png': nutecBag,
  'nutec-infographic.png': nutecInfographic,
  'panther-bottle.png': pantherBottle,
  'panther-infographic.png': pantherInfographic,
  'farmer-education.png': farmerEducation,
  'farmer-education-2.png': farmerEducation2,
  'panther-hero.png': pantherHero
};

export default function Home() {
  const [projectsList] = useState(projects);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stats refs for counting triggers
  const statsSectionRef = useRef(null);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [stats, setStats] = useState({ creatives: 0, videos: 0, campaigns: 0 });

  // Intersection Observer for scroll reveals
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [projectsList]); // Re-run when projects load to capture dynamically rendered cards

  // Stats counting animation trigger
  useEffect(() => {
    const section = statsSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          setStatsAnimated(true);
          animateStats();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(section);
    return () => observer.disconnect();
  }, [statsAnimated]);

  const animateStats = () => {
    const duration = 1500;
    const startTime = performance.now();
    const targets = { creatives: 100, videos: 50, campaigns: 25 };

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress); // easeOutQuad

      setStats({
        creatives: Math.floor(ease * targets.creatives),
        videos: Math.floor(ease * targets.videos),
        campaigns: Math.floor(ease * targets.campaigns)
      });

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setStats(targets);
      }
    };
    requestAnimationFrame(update);
  };

  // Video fallback effect
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay blocked or video missing. Fallback handled via CSS overlay.", error);
        if (videoRef.current) videoRef.current.style.display = 'none';
      });
    }
  }, []);

  // Form submit handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      const formattedText = `Hi MVB Raithu Bata,\n\nI would like to inquire about your creative services:\n\n👤 Name: ${formData.name}\n📧 Email: ${formData.email}\n📞 Phone: ${formData.phone}\n💬 Message: ${formData.message}`;
      
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = `whatsapp://send?phone=916300659460&text=${encodeURIComponent(formattedText)}`;
      } else {
        window.open(`https://web.whatsapp.com/send?phone=916300659460&text=${encodeURIComponent(formattedText)}`, '_blank');
      }
      
      setFormStatus({ type: 'success', message: 'Opening WhatsApp to send your inquiry...' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setFormStatus({ type: 'error', message: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* 01 — HERO SECTION */}
      <header className="hero">
        <div className="hero-video-container">
          <video ref={videoRef} className="hero-video" autoPlay loop muted playsInline poster="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80">
            <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0542d87e143d0792dbdb66e5c33f284&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content reveal">
            <span className="hero-tagline">MVB RAITHU BATA</span>
            <h1 className="hero-title telugu-text">
              రైతు కోసం కంటెంట్…<br />
              <span style={{ color: 'var(--color-accent-gold)' }}>వ్యవసాయం కోసం డిజిటల్ శక్తి.</span>
            </h1>
            <p className="hero-subheading">Creating Powerful Agriculture Content That Connects Brands, Technology & Farmers.</p>
            <p className="hero-description telugu-text">
              వ్యవసాయ రంగంలో ఉన్న ఉత్పత్తులు, సాంకేతికతలు మరియు పంటల సమాచారాన్ని రైతులకు సులభంగా అర్థమయ్యేలా, ప్రొఫెషనల్గా మరియు ప్రభావవంతంగా అందించే డిజిటల్ కంటెంట్.
            </p>
            <div className="hero-actions">
              <a href="#portfolio" className="btn btn-primary" onClick={(e) => {
                e.preventDefault();
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }}>VIEW OUR WORK</a>
              <a href="#contact" className="btn btn-secondary" onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>WORK WITH US</a>
            </div>
          </div>
        </div>
      </header>

      {/* 02 — ABOUT MVB RAITHU BATA */}
      <section id="about" className="section-light">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual reveal">
              <div className="about-image-wrapper">
                <img src={aboutPoster} alt="MVB Raithu Bata Branding Poster" className="about-image" />
              </div>
            </div>
            <div className="about-content reveal delay-200">
              <span className="section-subtitle-eng">ABOUT THE PLATFORM</span>
              <h2 className="about-subtitle-tel telugu-text">
                వ్యవసాయాన్ని అర్థం చేసుకుని…<br />
                <span style={{ color: 'var(--color-accent-green)' }}>కంటెంట్ను సృష్టిస్తాం.</span>
              </h2>
              <p className="about-title-eng">MVB Raithu Bata is focused on creating meaningful digital content for the agricultural community.</p>
              <p className="about-desc-tel telugu-text">
                మా లక్ష్యం కేవలం కంటెంట్ తయారు చేయడం కాదు. వ్యవసాయ సమాచారాన్ని రైతుకు అర్థమయ్యే భాషలో, సరైన విజువల్స్తో మరియు ఆధునిక డిజిటల్ ఫార్మాట్లో అందించడం.
              </p>
              
              <div className="about-pillars">
                <div className="pillar-item">
                  <span className="pillar-number">01</span>
                  <span className="pillar-text">Agriculture Knowledge</span>
                </div>
                <div className="pillar-item">
                  <span className="pillar-number">02</span>
                  <span className="pillar-text">Visual Storytelling</span>
                </div>
                <div className="pillar-item">
                  <span className="pillar-number">03</span>
                  <span className="pillar-text">Digital Media</span>
                </div>
                <div className="pillar-item">
                  <span className="pillar-number">04</span>
                  <span className="pillar-text">Farmer Communication</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — WHAT WE CREATE (OUR EXPERTISE) */}
      <section id="expertise" className="section-dark">
        <div className="container">
          <div className="section-title-container reveal">
            <span className="section-subtitle-eng">OUR EXPERTISE</span>
            <h2 className="section-title-tel telugu-text">మేము సృష్టించే డిజిటల్ కంటెంట్</h2>
            <p className="section-subtitle-eng-main">High-impact formats engineered to communicate science and farming insights.</p>
          </div>
          
          <div className="expertise-grid">
            {/* Card 1 */}
            <div className="expertise-card reveal">
              <img src={exp1} alt="Crop Education Photo" className="expertise-icon" style={{ objectPosition: 'top' }} />
              <h3 className="expertise-title-eng">Crop Education</h3>
              <p className="expertise-desc-tel telugu-text">పంటల పెరుగుదల, పోషకాలు, పంట నిర్వహణ మరియు రైతులకు ఉపయోగపడే వ్యవసాయ సమాచారం.</p>
            </div>
            {/* Card 2 */}
            <div className="expertise-card reveal delay-100">
              <img src={exp2} alt="Product Education Photo" className="expertise-icon" style={{ objectPosition: 'top' }} />
              <h3 className="expertise-title-eng">Product Education</h3>
              <p className="expertise-desc-tel telugu-text">Fertilizers, crop nutrition products, plant protection products మరియు agricultural technologies గురించి easy-to-understand content.</p>
            </div>
            {/* Card 3 */}
            <div className="expertise-card reveal delay-200">
              <img src={exp3} alt="Agriculture Videos Photo" className="expertise-icon" style={{ objectPosition: 'top' }} />
              <h3 className="expertise-title-eng">Agriculture Videos</h3>
              <p className="expertise-desc-tel telugu-text">Instagram Reels, YouTube Shorts, product explainers మరియు farmer education videos.</p>
            </div>
            {/* Card 4 */}
            <div className="expertise-card reveal">
              <img src={exp4} alt="Creative Designs Photo" className="expertise-icon" />
              <h3 className="expertise-title-eng">Creative Designs</h3>
              <p className="expertise-desc-tel telugu-text">Premium agricultural posters, product creatives, infographics మరియు social media designs.</p>
            </div>
            {/* Card 5 */}
            <div className="expertise-card reveal delay-100">
              <img src={exp5} alt="Digital Marketing Photo" className="expertise-icon" />
              <h3 className="expertise-title-eng">Digital Marketing</h3>
              <p className="expertise-desc-tel telugu-text">Instagram, Facebook, WhatsApp మరియు ఇతర digital platforms కోసం agriculture-focused content.</p>
            </div>
            {/* Card 6 */}
            <div className="expertise-card reveal delay-200">
              <img src={exp6} alt="Farmer Communication Photo" className="expertise-icon" />
              <h3 className="expertise-title-eng">Farmer Communication</h3>
              <p className="expertise-desc-tel telugu-text">రైతులకు క్లిష్టమైన technical information ను simple Teluguలో అర్థమయ్యేలా మార్చడం.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 & 05 — FEATURED PORTFOLIO */}
      <section id="portfolio" className="section-light">
        <div className="container">
          <div className="section-title-container reveal">
            <span className="section-subtitle-eng">OUR PORTFOLIO</span>
            <h2 className="section-title-tel telugu-text">మేము చేసిన ముఖ్యమైన ప్రాజెక్ట్స్</h2>
            <p className="section-subtitle-eng-main">Work that speaks for itself. Click to explore case studies.</p>
          </div>
          
          <div className="portfolio-grid">
            {projectsList.map((project, idx) => {
              const isFeatured = idx === 0 || idx === 2; // Project 1 and 3 are featured full-width in layout
              return (
                <Link 
                  key={project.id} 
                  to={`/project/${project.id}`} 
                  className={`portfolio-card ${isFeatured ? 'portfolio-card-featured' : ''} reveal`}
                  style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
                >
                  <div 
                    className="portfolio-media" 
                    style={project.id !== 'farmer-education-series' ? { backgroundColor: '#ffffff' } : {}}
                  >
                    <img 
                      src={projectImages[project.visuals[project.id === 'farmer-education-series' ? 0 : 1]]} 
                      alt={project.titleEn} 
                      className="portfolio-img" 
                      style={project.id === 'farmer-education-series' ? { objectPosition: 'center 25%' } : { objectFit: 'contain', padding: '20px' }}
                    />
                    <div 
                      className="portfolio-overlay"
                      style={project.id !== 'farmer-education-series' ? { background: 'linear-gradient(to top, rgba(6, 43, 26, 0.4) 0%, rgba(6, 43, 26, 0.1) 100%)' } : {}}
                    >
                      <span className="portfolio-btn-circle">➔</span>
                    </div>
                  </div>
                  <div className="portfolio-info">
                    <div className="portfolio-meta">
                      <span className="portfolio-tag">{project.tag}</span>
                      <span className="portfolio-tech">{project.tech}</span>
                    </div>
                    <h3 className="portfolio-title-tel telugu-text">{project.titleTe}</h3>
                    <p className="portfolio-title-eng">{project.subtitle}</p>
                    <p className="portfolio-desc telugu-text">
                      {project.id === 'kengo-ken-root-nutec-21' && "DMPP టెక్నాలజీ గురించిన వివరాలు, నత్రజని యాజమాన్యం మరియు కస్టమ్ డిజైన్లు మరియు రైతు విద్యా వీడియోల సృష్టి."}
                      {project.id === 'kengo-ken-leaf-black-panther' && "మొక్క పోషక పదార్థాల ప్రాముఖ్యత మరియు ఉత్పత్తులను రైతులకు చేరవేసే విధంగా రూపొందించిన డిజిటల్ కంటెంట్."}
                      {project.id === 'farmer-education-series' && "సరియైన సమయంలో పంటల సంరక్షణ మరియు తెగుళ్ల నివారణా పద్ధతులపై తెలుగు రైతుల కోసం రూపొందించిన అవగాహనా కంటెంట్."}
                    </p>
                    <span className="portfolio-link">Explore Case Study →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 06 — OUR CONTENT PROCESS */}
      <section id="process" className="section-dark">
        <div className="container">
          <div className="section-title-container reveal">
            <span className="section-subtitle-eng">HOW WE WORK</span>
            <h2 className="section-title-tel telugu-text">కంటెంట్ తయారీ ప్రయాణం</h2>
            <p className="section-subtitle-eng-main">From technical farming details to visual digital impact.</p>
          </div>
          
          <div className="process-timeline">
            <div className="process-step reveal">
              <div className="process-number">01</div>
              <h3 className="process-title-eng">Understand</h3>
              <p className="process-desc-tel telugu-text">Product / crop / technology గురించి పూర్తిగా అర్థం చేసుకుంటాం.</p>
            </div>
            <div className="process-step reveal delay-100">
              <div className="process-number">02</div>
              <h3 className="process-title-eng">Research</h3>
              <p className="process-desc-tel telugu-text">Technical informationను రైతుకు ఉపయోగపడే విధంగా analyse చేస్తాం.</p>
            </div>
            <div className="process-step reveal delay-200">
              <div className="process-number">03</div>
              <h3 className="process-title-eng">Create</h3>
              <p className="process-desc-tel telugu-text">Script, visuals, graphics మరియు storytelling develop చేస్తాం.</p>
            </div>
            <div className="process-step reveal delay-300">
              <div className="process-number">04</div>
              <h3 className="process-title-eng">Design</h3>
              <p className="process-desc-tel telugu-text">Premium agriculture-focused visual identityతో content design చేస్తాం.</p>
            </div>
            <div className="process-step reveal delay-400">
              <div className="process-number">05</div>
              <h3 className="process-title-eng">Publish</h3>
              <p className="process-desc-tel telugu-text">Social media platforms కోసం content optimize చేస్తాం.</p>
            </div>
            <div className="process-step reveal delay-500">
              <div className="process-number">06</div>
              <h3 className="process-title-eng">Connect</h3>
              <p className="process-desc-tel telugu-text">చివరి లక్ష్యం — రైతుకు information చేరాలి.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — WHY MVB RAITHU BATA? */}
      <section id="why-us" className="section-light">
        <div className="container">
          <div className="section-title-container reveal">
            <span className="section-subtitle-eng">WHY WORK WITH US</span>
            <h2 className="section-title-tel telugu-text">ఎందుకు MVB రైతు బాట?</h2>
            <p className="section-subtitle-eng-main">Agriculture is our language. We connect field experience with creative digital execution.</p>
          </div>
          
          <div className="why-grid">
            <div className="why-card reveal">
              <img src="https://img.icons8.com/ios-filled/40/22C55E/wheat.png" alt="Farmer First Icon" className="why-icon" />
              <h3 className="why-title-eng">Farmer First</h3>
              <p className="why-desc-tel telugu-text">రైతుకు అర్థమయ్యే భాషలో communication.</p>
            </div>
            <div className="why-card reveal delay-100">
              <img src="https://img.icons8.com/ios-filled/40/22C55E/target.png" alt="Agri Focused Icon" className="why-icon" />
              <h3 className="why-title-eng">Agri Focused</h3>
              <p className="why-desc-tel telugu-text">Generic marketing కాదు. Agriculture మీద focused content.</p>
            </div>
            <div className="why-card reveal delay-200">
              <img src="https://img.icons8.com/ios-filled/40/22C55E/sparkles.png" alt="Visuals Icon" className="why-icon" />
              <h3 className="why-title-eng">Visuals</h3>
              <p className="why-desc-tel telugu-text">Technical informationను powerful visualsగా మార్చడం.</p>
            </div>
            <div className="why-card reveal delay-300">
              <img src="https://img.icons8.com/ios-filled/40/22C55E/speech-bubble.png" alt="Telugu Native Icon" className="why-icon" />
              <h3 className="why-title-eng">Telugu Native</h3>
              <p className="why-desc-tel telugu-text">తెలుగు రైతులకు naturalగా connect అయ్యే content.</p>
            </div>
            <div className="why-card reveal delay-400">
              <img src="https://img.icons8.com/ios-filled/40/22C55E/flash-on.png" alt="Modern Digital Icon" className="why-icon" />
              <h3 className="why-title-eng">Modern Digital</h3>
              <p className="why-desc-tel telugu-text">Traditional communicationను modern digitalతో combine చేయడం.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — SERVICES FOR AGRI BRANDS */}
      <section id="services" className="section-dark" style={{ paddingBottom: '50px' }}>
        <div className="container">
          <div className="services-cta reveal">
            <div className="services-info">
              <span className="section-subtitle-eng" style={{ color: 'var(--color-accent-gold)' }}>HAVE AN AGRICULTURAL PRODUCT?</span>
              <h2>LET'S TELL ITS STORY.</h2>
              <ul className="services-list">
                <li className="service-item">Agricultural Product Videos</li>
                <li className="service-item">Instagram Reels & Shorts</li>
                <li className="service-item">Product Posters & Leaflets</li>
                <li className="service-item">Product Explainer Videos</li>
                <li className="service-item">Farmer Education Content</li>
                <li className="service-item">Telugu Voiceover Content</li>
                <li className="service-item">Social Media Creatives</li>
                <li className="service-item">WhatsApp Marketing Creatives</li>
              </ul>
            </div>
            <div className="services-box">
              <span className="services-box-tag">CREATIVE CAMPAIGNS</span>
              <h3 className="services-box-title">BRING YOUR PRODUCT. WE'LL BUILD ITS STORY.</h3>
              <a href="#contact" className="btn btn-primary" onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>START A PROJECT →</a>
            </div>
          </div>
        </div>
      </section>

      {/* 09 — IMPACT SECTION */}
      <section id="impact" ref={statsSectionRef} className="section-light" style={{ paddingTop: '50px' }}>
        <div className="container">
          <div className="section-title-container reveal" style={{ marginBottom: '40px' }}>
            <span className="section-subtitle-eng">OUR TRACK RECORD</span>
            <h2 className="section-title-tel telugu-text">ఫీల్డ్ లెవల్ చేరిక</h2>
          </div>
          
          <div className="impact-grid">
            <div className="impact-card reveal">
              <div className="impact-number">{stats.creatives}+</div>
              <div className="impact-desc-tel telugu-text">Agriculture Creatives</div>
            </div>
            <div className="impact-card reveal delay-100">
              <div className="impact-number">{stats.videos}+</div>
              <div className="impact-desc-tel telugu-text">Videos & Reels</div>
            </div>
            <div className="impact-card reveal delay-200">
              <div className="impact-number">{stats.campaigns}+</div>
              <div className="impact-desc-tel telugu-text">Agriculture Campaigns</div>
            </div>
            <div className="impact-card reveal delay-300">
              <div className="impact-number">∞</div>
              <div className="impact-desc-tel telugu-text">Ideas For Better Farming</div>
            </div>
          </div>
        </div>
      </section>

      {/* 10 — FARMER-FIRST STATEMENT */}
      <section className="farmer-statement">
        <div className="container">
          <div className="farmer-statement-banner reveal">
            <h2 className="farmer-statement-title telugu-text">
              సమాచారం మారితే…<br />
              <span style={{ color: 'var(--color-accent-gold)' }}>వ్యవసాయ నిర్ణయం మారుతుంది.</span>
            </h2>
            <p className="farmer-statement-desc telugu-text">
              సరైన సమాచారం సరైన సమయంలో రైతుకు చేరేలా digital agriculture contentను రూపొందించడం మా లక్ష్యం.
            </p>
          </div>
        </div>
      </section>

      {/* 11 — CONTACT SECTION */}
      <section id="contact" className="section-dark">
        <div className="container">
          <div className="section-title-container reveal">
            <span className="section-subtitle-eng">WORK WITH US</span>
            <h2 className="section-title-tel telugu-text">వ్యవసాయ డిజిటల్ ప్రచారం ప్రారంభిద్దాం</h2>
            <p className="section-subtitle-eng-main">Let's create high-impact, easy-to-understand communication for your agriculture brand.</p>
          </div>

          <div className="contact-grid-layout">
            {/* Contact Form Column */}
            <div className="contact-form-container reveal" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', padding: '40px', borderRadius: 'var(--border-radius-sm)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <h3 className="contact-form-title" style={{ fontFamily: 'var(--font-primary)', color: 'var(--color-accent-gold)', marginBottom: '20px', fontSize: '1.5rem' }}>Send Us a Message</h3>
              
              {formStatus.message && (
                <div style={{
                  padding: '15px',
                  borderRadius: 'var(--border-radius-sm)',
                  marginBottom: '20px',
                  backgroundColor: formStatus.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: formStatus.type === 'success' ? '#22C55E' : '#EF4444',
                  border: `1px solid ${formStatus.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                  fontSize: '0.9rem'
                }}>
                  {formStatus.message}
                </div>
              )}

              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="name" style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Enter your name"
                    style={{
                      padding: '14px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      fontFamily: 'inherit',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-accent-green)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                  />
                </div>

                <div className="contact-form-row">
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="email" style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="name@company.com"
                      style={{
                        padding: '14px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#ffffff',
                        fontFamily: 'inherit',
                        outline: 'none',
                        transition: 'border-color 0.3s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-accent-green)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label htmlFor="phone" style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="Your 10-digit number"
                      style={{
                        padding: '14px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#ffffff',
                        fontFamily: 'inherit',
                        outline: 'none',
                        transition: 'border-color 0.3s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'var(--color-accent-green)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label htmlFor="message" style={{ fontSize: '0.85rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Brief Project Details</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows="4"
                    placeholder="Tell us about your brand, product, or campaign objective..."
                    style={{
                      padding: '14px',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      fontFamily: 'inherit',
                      outline: 'none',
                      resize: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-accent-green)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ alignSelf: 'flex-start', cursor: 'pointer', transition: 'all 0.3s' }}
                >
                  {isSubmitting ? 'SENDING...' : 'SUBMIT ENQUIRY'}
                </button>
              </form>
            </div>

            {/* Channels Column */}
            <div className="contact-channels-column" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* WhatsApp */}
              <div className="contact-card reveal" style={{ margin: 0 }}>
                <img src="https://img.icons8.com/ios-filled/44/d4af37/whatsapp.png" alt="WhatsApp Icon" className="contact-icon" />
                <div className="contact-label">WhatsApp</div>
                <div className="contact-info-text">Fast Project Chat</div>
                <a href="https://wa.me/916300659460?text=Hi%20MVB%20Raithu%20Bata,%20I'd%20like%20to%20inquire%20about%20creative%20services" target="_blank" rel="noopener noreferrer" className="btn btn-primary">WHATSAPP US</a>
              </div>
              {/* Call */}
              <div className="contact-card reveal delay-100" style={{ margin: 0 }}>
                <img src="https://img.icons8.com/ios-filled/44/d4af37/phone.png" alt="Phone Icon" className="contact-icon" />
                <div className="contact-label">Phone Support</div>
                <div className="contact-info-text">Want to talk</div>
                <a href="tel:+916300659460" className="btn btn-secondary">CALL US</a>
              </div>
              {/* Email */}
              <div className="contact-card reveal delay-200" style={{ margin: 0 }}>
                <img src="https://img.icons8.com/ios-filled/44/d4af37/new-post.png" alt="Email Icon" className="contact-icon" />
                <div className="contact-label">Email Inquiry</div>
                <div className="contact-info-text">For Collaborations</div>
                <a href="mailto:moodveerababu38@gmail.com?subject=MVB%20Raithu%20Bata%20Creative%20Inquiry" className="btn btn-secondary">EMAIL US</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
