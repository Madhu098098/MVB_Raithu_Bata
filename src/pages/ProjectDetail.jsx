import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projectsData';

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

import nutecVideo from '../assets/nutec.mp4';
import blackpantherVideo from '../assets/blackpanther.mp4';

const projectVideos = {
  'kengo-ken-root-nutec-21': nutecVideo,
  'kengo-ken-leaf-black-panther': blackpantherVideo
};

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load project detail locally
  useEffect(() => {
    setLoading(true);
    const foundProject = projects.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      setError(null);
    } else {
      setError('Project not found');
    }
    setLoading(false);
  }, [id]);

  // Scroll reveals trigger
  useEffect(() => {
    if (loading || !project) return;
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
  }, [loading, project]);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        color: 'var(--color-accent-gold)',
        fontFamily: 'var(--font-primary)',
        fontSize: '1.5rem'
      }}>
        Loading Case Study...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        color: '#ffffff',
        fontFamily: 'var(--font-primary)',
        gap: '20px'
      }}>
        <h2>Case Study Not Found</h2>
        <Link to="/" className="btn btn-primary">Back To Home</Link>
      </div>
    );
  }

  return (
    <div>
      {/* PROJECT HEADER */}
      <header className="project-header">
        <div className="container">
          <Link to="/" className="project-back-btn">← Back To Portfolio</Link>
          <div className="project-meta-grid">
            <div>
              <h1 className="project-title telugu-text">{project.titleTe}</h1>
              <p className="project-subtitle">{project.subtitle}</p>
            </div>
            <div className="project-specs">
              <div>
                <span className="spec-label">Category</span>
                <span className="spec-val">{project.category}</span>
              </div>
              <div>
                <span className="spec-label">Tech Focus</span>
                <span className="spec-val">{project.tech}</span>
              </div>
              <div>
                <span className="spec-label">Deliverables</span>
                <span className="spec-val">{project.deliverables}</span>
              </div>
              <div>
                <span className="spec-label">Language</span>
                <span className="spec-val">{project.language}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PROJECT BODY */}
      <main className="project-body">
        <div className="container">
          
          {/* SECTION 1: OBJECTIVE */}
          <div className="project-grid-block reveal">
            <div className="block-title">Objective</div>
            <div className="block-content">
              <p className="telugu-text">
                {project.objectiveTe}
              </p>
              {project.objectiveEn && (
                <p>
                  {project.objectiveEn}
                </p>
              )}
            </div>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid rgba(255, 255, 255, 0.05)', margin: '60px 0' }} />

          {/* SECTION 2: CONTENT CREATED */}
          <div className="project-grid-block reveal">
            <div className="block-title">Content Created</div>
            <div className="block-content">
              <p className="telugu-text">
                ఈ క్యాంపెయిన్ కోసం మేము క్రింది క్రియేటివ్ మరియు ఎడ్యుకేషనల్ మీడియా కంటెంట్ సృష్టించాము:
              </p>
              <ul className="telugu-text">
                {project.contentCreated.map((item, idx) => {
                  const parts = item.split(':');
                  if (parts.length > 1) {
                    return (
                      <li key={idx}>
                        <strong>{parts[0]}:</strong>{parts.slice(1).join(':')}
                      </li>
                    );
                  }
                  return <li key={idx}>{item}</li>;
                })}
              </ul>
            </div>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid rgba(255, 255, 255, 0.05)', margin: '60px 0' }} />

          {/* SECTION 3: VISUALS */}
          <div className="project-grid-block reveal">
            <div className="block-title">Visuals</div>
            <div className="block-content">
              <p>
                {project.id === 'kengo-ken-root-nutec-21' && "Premium agricultural branding, fertilizer technology explanation graphics, and field-level campaign posters."}
                {project.id === 'kengo-ken-leaf-black-panther' && "High-quality product focused posters and leaf protection campaign mockups."}
                {project.id === 'farmer-education-series' && "Educational banners, crop-nutrition schedules, and diagnostic infographics distributed to farming communities."}
              </p>
              <div className="project-visuals-grid">
                {project.visuals.map((visual, idx) => {
                  // We crop differently depending on whether it is a background bag mockup or infographic
                  const isInfographic = visual.includes('infographic');
                  const isFarmerEducation = project.id === 'farmer-education-series';
                  
                  return (
                    <div 
                      key={idx} 
                      className="project-visual-item" 
                      style={!isFarmerEducation ? {
                        backgroundColor: '#ffffff',
                        borderRadius: 'var(--border-radius-sm)',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                      } : {
                        borderRadius: 'var(--border-radius-sm)',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <img 
                        src={projectImages[visual]} 
                        alt={`${project.titleEn} Campaign Asset ${idx + 1}`} 
                        style={isFarmerEducation ? {
                          objectFit: 'cover',
                          height: '380px',
                          width: '100%',
                          objectPosition: idx === 0 ? 'center 25%' : 'center'
                        } : {
                          objectFit: 'contain',
                          maxHeight: '380px'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid rgba(255, 255, 255, 0.05)', margin: '60px 0' }} />

          {/* SECTION 4: VIDEO */}
          <div className="project-grid-block reveal">
            <div className="block-title">Video</div>
            <div className="block-content">
              <p>
                {project.id === 'kengo-ken-root-nutec-21' && "Digital Agriculture Explainer Video designed for social sharing and field agents."}
                {project.id === 'kengo-ken-leaf-black-panther' && "Instagram Explainer Reel mockup designed for direct brand-to-farmer communication."}
                {project.id === 'farmer-education-series' && "Short-form vertical video segment designed for mobile WhatsApp group distribution."}
              </p>
              <div className="project-video-wrapper" style={{ height: 'auto', aspectRatio: '16/9' }}>
                {projectVideos[project.id] ? (
                  <video 
                    src={projectVideos[project.id]} 
                    controls 
                    className="project-video"
                    style={{ width: '100%', height: '100%', borderRadius: 'var(--border-radius-md)', display: 'block', outline: 'none' }}
                  ></video>
                ) : (
                  <div className="project-video-placeholder">
                    <img src="https://img.icons8.com/ios-glyphs/60/d4af37/play--v1.png" alt="Play Icon" className="play-icon" />
                    <h3 className="telugu-text">{project.videoTitle}</h3>
                    <p style={{ opacity: 0.7, fontSize: '0.9rem', marginTop: '8px' }}>
                      Technical Animation & Explainer • (Video coming soon)
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <hr style={{ border: 0, borderTop: '1px solid rgba(255, 255, 255, 0.05)', margin: '60px 0' }} />

          {/* SECTION 5: RESULT */}
          <div className="project-grid-block reveal">
            <div className="block-title">Result</div>
            <div className="block-content">
              <p className="telugu-text">
                సాధించిన ఫలితాలు మరియు చేరిక:
              </p>
              <ul className="telugu-text">
                {project.id === 'kengo-ken-root-nutec-21' && (
                  <>
                    <li>DMPP టెక్నాలజీ గురించి ఫీల్డ్ లెవెల్‌లో రైతులకు సులభమైన అవగాహన లభించింది.</li>
                    <li>పోస్టర్లు మరియు యానిమేషన్ల ద్వారా నైట్రోజన్ వృథాను అరికట్టే విజ్ఞానం కింది స్థాయికి చేరింది.</li>
                    <li>వాట్సాప్ మరియు డిజిటల్ క్యాంపెయిన్ల ద్వారా అత్యధిక ఎంగేజ్‌మెంట్ లభించింది.</li>
                  </>
                )}
                {project.id === 'kengo-ken-leaf-black-panther' && (
                  <>
                    <li>క్యాల్షియం, మెగ్నీషియం, సల్ఫర్ వంటి ద్వితీయ పోషకాల ప్రాముఖ్యతపై అవగాహన పెరిగింది.</li>
                    <li>పంటల ఎదుగుదలలో లోపాలను గుర్తించే విజువల్ చార్టులకు ఫీల్డ్ లెవెల్ నుండి మంచి స్పందన లభించింది.</li>
                    <li>ఉత్పత్తి డీలర్ నెట్‌వర్క్ గ్రూపులలో ఈ కంటెంట్ విస్తృతంగా షేర్ చేయబడింది.</li>
                  </>
                )}
                {project.id === 'farmer-education-series' && (
                  <>
                    <li>మిరప, పత్తి, మొక్కజొన్న పండించే రైతులకు ఉపయోగకరమైన సలహాలు లభించాయి.</li>
                    <li>వాట్సాప్ గ్రూపుల ద్వారా కంటెంట్ తక్కువ సమయంలో ఎక్కువ మంది రైతులకు చేరింది.</li>
                    <li>క్షేత్రస్థాయి వ్యవసాయ అవసరాలకు తగిన సులభమైన విజ్ఞానాన్ని అందించడం జరిగింది.</li>
                  </>
                )}
              </ul>
              {project.resultEn && (
                <p style={{ marginTop: '20px', fontStyle: 'italic', opacity: 0.9 }}>
                  <strong>English Summary:</strong> {project.resultEn}
                </p>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
