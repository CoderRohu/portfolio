// helper selectors
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

// typed headline
function typeText(el, texts, speed=50, pause=1200){
  let i=0, t=0, forward=true;
  function step(){
    const txt = texts[i];
    if(forward){ t++; el.textContent = txt.slice(0,t); if(t===txt.length){ forward=false; setTimeout(step,pause); return; } }
    else { t--; el.textContent = txt.slice(0,t); if(t===0){ forward=true; i=(i+1)%texts.length; } }
    setTimeout(step, speed);
  }
  step();
}

// reveal + animate skill bars
function initReveal(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add('visible');
        if(en.target.id === 'skills'){
          document.querySelectorAll('.bar span').forEach(s=>{
            s.style.width = s.getAttribute('data-width') || '70%';
          });
        }
      }
    });
  }, {threshold:0.2});
  $$(' .reveal, .two-col, .hero-title, .hero-sub, .hero-card, #skills').forEach(el=> obs.observe(el));
}

// nav toggle
function initNav(){
  const btn = $('#nav-toggle'); const nav = document.querySelector('.nav');
  if(!btn) return; btn.addEventListener('click', ()=> nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex');
}

document.addEventListener('DOMContentLoaded', ()=>{
  $('#year').textContent = new Date().getFullYear();
  const typedEl = document.getElementById('typed');
  if(typedEl) typeText(typedEl, ['I build responsive web apps.','I love clean UI & UX.','React • JavaScript • CSS']);
  initReveal(); initNav();
  const form = document.getElementById('contact-form');
  if(form){ form.addEventListener('submit', (e)=>{ e.preventDefault(); alert('Thanks! Message noted. (Demo)'); form.reset(); }); }
});
