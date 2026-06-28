/**
 * Apple Creative Showcase Logic Architecture
 * Features: Cinematic Scroll Trigger Reveals & Dynamic 3D Matrix Spatial Hover Lifts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check and load ScrollTrigger plugin programmatically if available inside document head
  if (typeof ScrollTrigger === 'undefined' && typeof gsap !== 'undefined') {
    console.warn("For scroll reveal activations, ensure ScrollTrigger is fully loaded.");
  }

  initHardwareThemeToggle();
  initAppleScrollRevealEngine();
  initInteractiveLogoEngine();
  init3DHardwareTiltEngine();
  initSmoothScrollTracking();
});

/**
 * 1. Hardware Capsule Switch Toggle Theme Switcher System
 */
function initHardwareThemeToggle() {
  const toggleBtn = document.getElementById('apple-theme-toggle');
  if (!toggleBtn) return;

  const toggleIcon = toggleBtn.querySelector('.theme-icon');
  const rootElement = document.documentElement;
  if (!toggleIcon) return;

  const isDark = rootElement.getAttribute('data-theme') === 'apple-dark';
  gsap.set(toggleIcon, { x: isDark ? 18 : 0 });

  toggleBtn.addEventListener('click', () => {
    const activeTheme = rootElement.getAttribute('data-theme');
    const nextTheme = activeTheme === 'apple-dark' ? 'apple-light' : 'apple-dark';
    
    rootElement.setAttribute('data-theme', nextTheme);
    const turningDark = nextTheme === 'apple-dark';

    // Slide capsule switch dot matching real hardware animations
    gsap.to(toggleIcon, {
      x: turningDark ? 18 : 0,
      duration: 0.4,
      ease: "power3.out"
    });

    // Subtle hardware compression response animation
    gsap.fromTo(toggleBtn, { scale: 0.93 }, { scale: 1, duration: 0.3, ease: "power2.out" });
  });
}

/**
 * 2. Apple Scroll Reveal Engine
 * Automatically discovers sections and blocks, driving elegant entry fades up as page scrolls
 */
function initAppleScrollRevealEngine() {
  const targetSections = document.querySelectorAll('.apple-hero > div, .apple-section');

  targetSections.forEach(section => {
    const elementsToReveal = section.querySelectorAll('.hero-eyebrow, .hero-title, .hero-subtitle, .section-header, .apple-card');
    if (elementsToReveal.length === 0) return;
    
    // Set initial structural hidden bounds programmatically
    gsap.set(elementsToReveal, { opacity: 0, y: 35 });

    // Build timeline connected to viewport intersection
    gsap.to(elementsToReveal, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: section,
        start: "top 85%", // Triggers right when element crosses active view threshold
        toggleActions: "play none none none"
      }
    });
  });
}

/**
 * 3. Interactive Logo Physics Engine
 * Handles 3D mouse vector transforms, custom boundary matrix curves, and spring bubble physics
 */
function initInteractiveLogoEngine() {
  // Accommodates both ID structures safely
  const dynamicLogo = document.getElementById('dynamic-3d-logo') || document.getElementById('interactive-josh-logo');
  if (!dynamicLogo) return;

  const logoBadge = dynamicLogo.querySelector('.nav-logo-badge') || dynamicLogo;
  const bubbleElement = dynamicLogo.querySelector('.logo-pop-bubble');

  dynamicLogo.addEventListener('mousemove', (e) => {
    const rect = dynamicLogo.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Coordinates 3D spatial transformation fields
    gsap.to(logoBadge, {
      rotateX: -y * 0.8,
      rotateY: x * 0.8,
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out"
    });
  });

  dynamicLogo.addEventListener('mouseenter', () => {
    if (!bubbleElement) return;
    // Create random asymmetrical squish values on hover entry
    const rTopLeft = Math.floor(Math.random() * 20) + 40;
    const rTopRight = Math.floor(Math.random() * 20) + 40;
    const rBottomLeft = Math.floor(Math.random() * 20) + 40;
    const rBottomRight = Math.floor(Math.random() * 20) + 40;
    
    bubbleElement.style.borderRadius = `${rTopLeft}% ${100 - rTopLeft}% ${rBottomLeft}% ${100 - rBottomLeft}% / ${rTopRight}% ${rBottomRight}% ${100 - rBottomRight}% ${100 - rTopRight}%`;
  });

  dynamicLogo.addEventListener('mouseleave', () => {
    // Revert 3D tilt metrics safely
    gsap.to(logoBadge, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.4,
      ease: "power3.out"
    });

    // Revert clean spring curves back to core parameters
    if (bubbleElement) {
      bubbleElement.style.borderRadius = "45% 55% 50% 50% / 50% 45% 55% 50__%";
    }
  });
}

/**
 * 4. 3D Spatial Mouse Tracking & Dynamic Flashlight Overlay Engine
 * Calculates coordinates over cards to apply depth tilt transformations
 */
function init3DHardwareTiltEngine() {
  const hardwareCards = document.querySelectorAll('.apple-card');

  hardwareCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      
      // Calculate cursor vector coordinate maps relative to card container limits
      const mouseX = e.clientX - cardRect.left;
      const mouseY = e.clientY - cardRect.top;
      
      // Update dynamic custom tokens controlling the spotlight mask orientation
      card.style.setProperty('--mouse-x', `${mouseX}px`);
      card.style.setProperty('--mouse-y', `${mouseY}px`);

      // Compute fine rotational values (-7deg to 7deg maximum bounds)
      const rotateX = -7 * ((mouseY - cardRect.height / 2) / (cardRect.height / 2));
      const rotateY = 7 * ((mouseX - cardRect.width / 2) / (cardRect.width / 2));

      // Coordinate spatial translation matrix
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.012,
        duration: 0.3,
        ease: "power2.out",
        borderColor: "var(--text-main)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.04)",
        overwrite: "auto"
      });
    });

    // Elegant crisp stabilization loop when mouse departs
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
        borderColor: "var(--border-color)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.01)",
        overwrite: "auto"
      });
    });

    // Compression mechanical tap click responses
    card.addEventListener('mousedown', () => {
      gsap.to(card, { scale: 0.99, duration: 0.12, ease: "power2.out" });
    });
    
    card.addEventListener('mouseup', () => {
      gsap.to(card, { scale: 1.012, duration: 0.2, ease: "power2.out" });
    });
  });
}

/**
 * 5. Micro-Inertial Navigation Link Smooth Tracking
 */
function initSmoothScrollTracking() {
  const navLinks = document.querySelectorAll('.nav-link-item');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 52,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}
/* ======================================
   APPLE LOGO REVEAL
====================================== */

const logo = document.getElementById("interactive-josh-logo");
const overlay = document.getElementById("profileOverlay");
const closeBtn = document.getElementById("closeOverlay");
const photo = document.getElementById("overlayPhoto");

if (logo && overlay && photo) {

    logo.addEventListener("click", () => {

    overlay.classList.add("active");

    const rect = logo.getBoundingClientRect();

    const tl = gsap.timeline();

    tl.set(".overlay-content",{
        transformOrigin:"top left",
        x:rect.left,
        y:rect.top,
        scale:0.06,
        opacity:0
    });

    tl.to(".apple-main",{
        scale:.96,
        filter:"blur(12px)",
        duration:.6,
        ease:"power2.out"
    },0);

    tl.to(".overlay-content",{
        x:0,
        y:0,
        scale:1,
        opacity:1,
        duration:1,
        ease:"expo.out"
    },0);

    tl.from("#overlayPhoto",{
        x:-250,
        rotateY:-35,
        rotateX:18,
        scale:.7,
        duration:1.2,
        ease:"power4.out"
    },.15);

    tl.from(".overlay-text",{
        x:120,
        opacity:0,
        duration:.8
    },.35);

});

        const rect = logo.getBoundingClientRect();

gsap.set(".overlay-content",{
    x: rect.left - window.innerWidth/2 + 90,
    y: rect.top - window.innerHeight/2 + 40,
    scale:.08,
    opacity:0
});

gsap.to(".overlay-content",{
    x:0,
    y:0,
    scale:1,
    opacity:1,
    duration:1,
    ease:"power4.out"
});

    function closeOverlay(){

        gsap.to(".overlay-content",{

            opacity:0,

            scale:.85,

            y:-40,

            duration:.45,

            ease:"power3.in",

            onComplete(){

                overlay.classList.remove("active");

            }

        });

    }

    closeBtn.addEventListener("click",closeOverlay);

    overlay.addEventListener("click",(e)=>{

        if(e.target===overlay){

            closeOverlay();

        }

    });

    document.addEventListener("keydown",(e)=>{

        if(e.key==="Escape"){

            closeOverlay();

        }

    });

}
const themeBtn = document.getElementById("apple-theme-toggle");

themeBtn.addEventListener("click", () => {

    const body = document.body;

    if(body.getAttribute("data-theme")==="apple-dark"){

        body.setAttribute("data-theme","apple-light");

        localStorage.setItem("theme","apple-light");

    }else{

        body.setAttribute("data-theme","apple-dark");

        localStorage.setItem("theme","apple-dark");

    }

});

const savedTheme = localStorage.getItem("theme");

if(savedTheme){

    document.body.setAttribute("data-theme",savedTheme);

}else{

    document.body.setAttribute("data-theme","apple-light");

}