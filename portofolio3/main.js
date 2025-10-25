const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');
const headerEl = document.querySelector('header');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80, 
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  if(window.scrollY > 500){
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  // header shadow toggle
  if (headerEl) {
    if (window.scrollY > 10) headerEl.classList.add('scrolled');
    else headerEl.classList.remove('scrolled');
  }

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if(elementTop < windowHeight - revealPoint){
      el.classList.add('active-reveal');
    }
  });
});

const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content, .project-card, .c1, .skills a');
revealElements.forEach(el => el.classList.add('reveal'));

// Staggered delays
document.querySelectorAll('.project-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 120}ms`;
});
document.querySelectorAll('.c1').forEach((el, i) => {
  el.style.transitionDelay = `${i * 120}ms`;
});
document.querySelectorAll('.skills a').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 6) * 60}ms`;
});

const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #474af0;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

// Parallax for hero image (scroll + pointer)
const heroImg = document.querySelector('.home img');
function updateParallax(y = window.scrollY) {
  if (!heroImg) return;
  const rect = heroImg.getBoundingClientRect();
  const offset = Math.max(-20, Math.min(20, (rect.top - window.innerHeight/2) * -0.05));
  heroImg.style.setProperty('--py', `${offset}px`);
}
window.addEventListener('scroll', () => updateParallax());
if (heroImg) {
  heroImg.addEventListener('mousemove', (e) => {
    const bounds = heroImg.getBoundingClientRect();
    const relY = (e.clientY - bounds.top - bounds.height/2) * 0.03; // subtle
    heroImg.style.setProperty('--py', `${Math.max(-25, Math.min(25, relY))}px`);
  });
  heroImg.addEventListener('mouseleave', () => updateParallax());
  // initial
  updateParallax();
}

const typingElement = document.querySelector('.info-home h3'); 
const words = ["Frontend Developer", "UI/UX Designer", "Web Enthusiast", "React Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    
    typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

document.addEventListener('DOMContentLoaded', type);

// set initial header state on load
document.addEventListener('DOMContentLoaded', () => {
  if (headerEl) {
    if (window.scrollY > 10) headerEl.classList.add('scrolled');
    else headerEl.classList.remove('scrolled');
  }

  // Anime.js intro timeline for hero section
  if (window.anime) {
    const tl = anime.timeline({ easing: 'easeOutQuad', duration: 600 });
    tl.add({
      targets: '.info-home h1',
      opacity: [0, 1],
      translateY: [24, 0]
    })
    .add({
      targets: '.info-home h3',
      opacity: [0, 1],
      translateY: [20, 0]
    }, '-=250')
    .add({
      targets: '.info-p p',
      opacity: [0, 1],
      translateY: [16, 0],
      delay: anime.stagger(80)
    }, '-=200')
    .add({
      targets: '.btnn .btn-home1, .btnn .btn-home2',
      opacity: [0, 1],
      translateY: [12, 0],
      delay: anime.stagger(120)
    }, '-=150')
    .add({
      targets: '.home img',
      opacity: [0, 1],
      translateY: [20, 0]
    }, '-=300');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay=0){
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);          
  showElement(mainIcon, 800);         
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx*400);  
  });
  showElement(designerText, 2800);    

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => loadingScreen.style.display='none', 500);
    mainPage.classList.add("visible");
  }, 4000);
});

// IntersectionObserver + anime.js for staggered on-scroll reveals
if ('IntersectionObserver' in window && window.anime) {
  let lastScrollY = window.scrollY;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      // ensure base state
      if (getComputedStyle(el).opacity === '') el.style.opacity = 0;
      if (entry.isIntersecting) {
        anime.remove(el);
        anime({
          targets: el,
          opacity: 1,
          translateY: 0,
          duration: 650,
          easing: 'easeOutQuad'
        });
      } else {
        // animate out when leaving viewport so it can animate back in when scrolling back
        anime.remove(el);
        anime({
          targets: el,
          opacity: 0,
          translateY: 16,
          duration: 500,
          easing: 'easeOutQuad'
        });
      }
    });
    lastScrollY = window.scrollY;
  }, { threshold: 0.15 });

  // Grouped stagger for collections
  const groupStagger = (selector, step = 120) => {
    const items = document.querySelectorAll(selector);
    items.forEach((el, i) => {
      el.style.opacity = 0;
      el.style.willChange = 'transform, opacity';
      io.observe(el);
      el.style.transitionDelay = `${i * step}ms`;
    });
  };

  groupStagger('.project-card', 120);
  groupStagger('.c1', 120);
  groupStagger('.skills a', 60);
}

// Subtle anime-driven hover for buttons and nav links
const hoverAnim = (el, scaleIn = 1.05, scaleOut = 1) => {
  if (!window.anime || !el) return;
  el.addEventListener('mouseenter', () => {
    anime.remove(el);
    anime({ targets: el, scale: scaleIn, duration: 180, easing: 'easeOutQuad' });
  });
  el.addEventListener('mouseleave', () => {
    anime.remove(el);
    anime({ targets: el, scale: scaleOut, duration: 180, easing: 'easeOutQuad' });
  });
};

document.querySelectorAll('.btn-home1, .btn-home2, .btn, .ul-list li').forEach(el => hoverAnim(el, 1.03, 1));

// Ghost cursor trailing effect
(function(){
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) return; // disable on touch devices

  const container = document.createElement('div');
  container.className = 'ghost-cursor';
  document.body.appendChild(container);

  const DOTS = 12;
  const dots = [];
  let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
  let visible = false;

  for (let i = 0; i < DOTS; i++) {
    const d = document.createElement('div');
    d.className = 'ghost-dot';
    d.style.opacity = '0';
    container.appendChild(d);
    dots.push({ x: mouse.x, y: mouse.y, el: d });
  }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY; visible = true;
    dots.forEach((dot, i) => dot.el.style.opacity = String(1 - i / (DOTS + 2)));
  });
  window.addEventListener('mouseleave', () => { visible = false; });

  function animate() {
    const ease = 0.25; // follow smoothing
    let prevX = mouse.x, prevY = mouse.y;
    dots.forEach((dot, i) => {
      dot.x += (prevX - dot.x) * ease;
      dot.y += (prevY - dot.y) * ease;
      const scale = 1 - i / (DOTS + 2);
      dot.el.style.transform = `translate(${dot.x}px, ${dot.y}px) scale(${Math.max(0.4, scale)})`;
      if (!visible) {
        const current = parseFloat(dot.el.style.opacity || '0');
        dot.el.style.opacity = String(Math.max(0, current - 0.05));
      }
      prevX = dot.x; prevY = dot.y;
    });
    requestAnimationFrame(animate);
  }
  animate();
})();

document.addEventListener('DOMContentLoaded', () => {
  if (!window.anime || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const qs = el.getAttribute('data-anim-items');
      const items = qs ? el.querySelectorAll(qs) : [el];
      const cfg = JSON.parse(el.getAttribute('data-anim-cfg') || '{}');
      items.forEach(i => { i.style.opacity = '0'; i.style.transform = 'translateY(16px)'; });
      anime.remove(items);
      anime(Object.assign({ targets: items, opacity: [0,1], translateY: [16,0], duration: 650, easing: 'easeOutQuad', delay: anime.stagger(+el.getAttribute('data-anim-step') || 90) }, cfg));
      io.unobserve(el);
    });
  }, { threshold: 0.18 });

  const setups = [
    { sel: '.about .title', items: 'h1', cfg: { duration: 600 }, step: 80 },
    { sel: '.about .card', items: '.c1', cfg: { scale: [0.98, 1] }, step: 110 },
    { sel: '.projects-container', items: '.project-card', cfg: {}, step: 110 },
    { sel: '.services-container', items: '.service-card', cfg: {}, step: 100 },
    { sel: '.contact .contact-details', items: '.contact-item', cfg: {}, step: 80 },
    { sel: '.contact .social-links', items: '.social-link', cfg: {}, step: 70 }
  ];
  setups.forEach(s => {
    const root = document.querySelector(s.sel);
    if (!root) return;
    root.setAttribute('data-anim-items', s.items);
    root.setAttribute('data-anim-step', String(s.step));
    root.setAttribute('data-anim-cfg', JSON.stringify(s.cfg));
    io.observe(root);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  if (!window.anime) return;
  const svg = document.getElementById('about-draw');
  if (!svg) return;
  const paths = svg.querySelectorAll('path');
  const lengths = [];
  paths.forEach(p => {
    const L = p.getTotalLength();
    lengths.push(L);
    p.style.strokeDasharray = String(L);
    p.style.strokeDashoffset = String(L);
  });
  const tl = anime.timeline({ autoplay: false, easing: 'easeInOutCubic' });
  tl.add({
    targets: paths,
    strokeDashoffset: (el, i) => [lengths[i], 0],
    duration: 1600,
    delay: anime.stagger(40)
  });

  function calcProgress() {
    const r = svg.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const start = vh * 0.95;
    const end = -r.height * 0.25;
    const t = (start - r.top) / (start - end);
    return Math.max(0, Math.min(1, t));
  }

  function onScrollSync() {
    const p = calcProgress();
    tl.seek(p * tl.duration);
  }

  onScrollSync();
  window.addEventListener('scroll', onScrollSync, { passive: true });
  window.addEventListener('resize', onScrollSync);
});



// Three.js hero OBJ loader (replaces Spline)
(function(){
  const container = document.getElementById('hero-3d');
  if (!container || !window.THREE) return;
  if (container.querySelector('spline-viewer')) return;

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(2.5, 2, 3.5);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.appendChild(renderer.domElement);

  // Ensure a small mask exists to cover any injected watermark badge
  if (!container.querySelector('.spline-mask')) {
    const mask = document.createElement('div');
    mask.className = 'spline-mask';
    container.appendChild(mask);
  }

  const ambient = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambient);
  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(5, 10, 7);
  scene.add(dir);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 1.2;
  controls.maxDistance = 6;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.8;

  function resize(){
    const w = container.clientWidth || 600;
    const h = container.clientHeight || 420;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  const loader = new THREE.OBJLoader();
  loader.load('base.obj', (obj) => {
    // Normalize size and center
    const box = new THREE.Box3().setFromObject(obj);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2 / maxDim;
    obj.scale.setScalar(scale);
    obj.position.sub(center.multiplyScalar(scale));

    // Optional: add simple material if none
    obj.traverse(n => {
      if (n.isMesh && !n.material) {
        n.material = new THREE.MeshStandardMaterial({ color: 0x8aa0ff, metalness: 0.1, roughness: 0.6 });
      }
      if (n.isMesh) {
        n.castShadow = n.receiveShadow = true;
      }
    });

    scene.add(obj);
  }, undefined, (err) => {
    console.error('Failed to load base.obj', err);
  });

  function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
})();
