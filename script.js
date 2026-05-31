// ── NAVBAR SCROLL EFFECT ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── SCROLL REVEAL ─────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.week-card, .book-card, .resource-card, .tool-card, .eval-item, .instructor-card, .objectives-list li'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// ── RESOURCE TABS ─────────────────────────────────────
document.querySelectorAll('.res-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.res-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.res-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// ── SEARCH DATA (UPDATED TO WEEKS 1-15) ───────────────────────────────────────
const searchData = [
  // WEEKS 1-8
  { week:'1', date:'2026-01-12', topic:'usability', title:'Introduction to HCI', desc:'History, scope, and the usability challenge.', section:'Weekly Topics', targetId:'topics', targetSelector:'.week-card[data-week="1"]' },
  { week:'2', date:'2026-01-19', topic:'cognitive', title:'Human Information Processing', desc:'Understanding human information processing for UI design.', section:'Weekly Topics', targetId:'topics', targetSelector:'.week-card[data-week="2"]' },
  { week:'3', date:'2026-01-26', topic:'computer', title:'The Computer in HCI', desc:'Exploring the role of the computer in HCI.', section:'Weekly Topics', targetId:'topics', targetSelector:'.week-card[data-week="3"]' },
  { week:'4', date:'2026-02-02', topic:'interaction', title:'The Interaction Model', desc:'Norman\'s model, gulfs of execution and evaluation.', section:'Weekly Topics', targetId:'topics', targetSelector:'.week-card[data-week="4"]' },
  { week:'5', date:'2026-02-09', topic:'ergonomics', title:'Ergonomics & Workspace Design', desc:'Physical ergonomics, workspace layout, anthropometry.', section:'Weekly Topics', targetId:'topics', targetSelector:'.week-card[data-week="5"]' },
  { week:'6', date:'2026-02-16', topic:'media', title:'Media & Interface Styles', desc:'WIMP, touch, voice, gesture, multimodal interfaces.', section:'Weekly Topics', targetId:'topics', targetSelector:'.week-card[data-week="6"]' },
  { week:'7', date:'2026-02-23', topic:'ucd', title:'Design & TCUID & UCD', desc:'Task-Centered and User-Centered Design principles.', section:'Weekly Topics', targetId:'topics', targetSelector:'.week-card[data-week="7"]' },
  { week:'8', date:'2026-03-02', topic:'heuristics', title:'Heuristics & Design Guidelines', desc:'Nielsen\'s 10 usability heuristics.', section:'Weekly Topics', targetId:'topics', targetSelector:'.week-card[data-week="8"]' },
  // WEEKS 9-15 (NEW)
  { week:'9', date:'2026-03-09', topic:'heuristics', title:'Interface Design + Heuristics', desc:'Design when you don\'t know how, Nielsen\'s heuristics.', section:'Weekly Topics', targetId:'topics', targetSelector:'.week-card[data-week="9"]' },
  { week:'10', date:'2026-03-16', topic:'ucd', title:'Design Approaches', desc:'Participatory Design, Task-Centered Design, UCD.', section:'Weekly Topics', targetId:'topics', targetSelector:'.week-card[data-week="10"]' },
  { week:'11', date:'2026-03-23', topic:'prototyping', title:'Prototyping', desc:'Low-fidelity, high-fidelity, paper prototyping.', section:'Weekly Topics', targetId:'topics', targetSelector:'.week-card[data-week="11"]' },
  { week:'12', date:'2026-03-30', topic:'web', title:'Project Demo & Web Systems', desc:'1st project demo, web design issues, IA, navigation.', section:'Weekly Topics', targetId:'topics', targetSelector:'.week-card[data-week="12"]' },
  { week:'13', date:'2026-04-06', topic:'evaluation', title:'Lab: Website Usability Evaluation', desc:'Heuristic evaluation, think-aloud method.', section:'Weekly Topics', targetId:'topics', targetSelector:'.week-card[data-week="13"]' },
  { week:'14', date:'2026-04-13', topic:'web', title:'Design & Evaluation of Web Systems', desc:'Full web lifecycle, metrics, implementation.', section:'Weekly Topics', targetId:'topics', targetSelector:'.week-card[data-week="14"]' },
  { week:'15', date:'2026-04-20', topic:'advanced', title:'Advanced HCI Topics', desc:'CSCW, Groupware, VR, Ubiquitous Computing, InfoVis.', section:'Weekly Topics', targetId:'topics', targetSelector:'.week-card[data-week="15"]' },

  // LECTURE SLIDES (keep as is)
  { week:'1', date:'2026-01-12', topic:'usability', title:'Slides: Introduction to HCI', desc:'Download PPT covering HCI fundamentals.', section:'Lecture Slides', targetId:'resources', targetSelector:'.resource-card[data-week="1"][data-topic="usability"]', tab:'slides' },
  { week:'2', date:'2026-01-19', topic:'cognitive', title:'Slides: Human Information Processing', desc:'Download PPT covering HIP.', section:'Lecture Slides', targetId:'resources', targetSelector:'.resource-card[data-week="2"][data-topic="cognitive"]', tab:'slides' },
  { week:'3', date:'2026-01-26', topic:'computer', title:'Slides: The Computer in HCI', desc:'Download PPT on computer role in HCI.', section:'Lecture Slides', targetId:'resources', targetSelector:'.resource-card[data-week="3"][data-topic="research"]', tab:'slides' },
  { week:'4', date:'2026-02-02', topic:'interaction', title:'Slides: The Interaction Model', desc:'Download PPT on interaction models.', section:'Lecture Slides', targetId:'resources', targetSelector:'.resource-card[data-week="4"][data-topic="design"]', tab:'slides' },
  { week:'5', date:'2026-02-09', topic:'ergonomics', title:'Slides: Ergonomics & Workspace', desc:'Download PPT on ergonomics.', section:'Lecture Slides', targetId:'resources', targetSelector:'.resource-card[data-week="5"][data-topic="prototyping"]', tab:'slides' },
  { week:'6', date:'2026-02-16', topic:'media', title:'Slides: Media & Interface Styles', desc:'Download PPT on interface styles.', section:'Lecture Slides', targetId:'resources', targetSelector:'.resource-card[data-week="6"][data-topic="evaluation"]', tab:'slides' },
  { week:'7', date:'2026-02-23', topic:'ucd', title:'Slides: TCUID & UCD', desc:'Download PPT on UCD methods.', section:'Lecture Slides', targetId:'resources', targetSelector:'.resource-card[data-week="7"][data-topic="accessibility"]', tab:'slides' },
  { week:'8', date:'2026-03-02', topic:'heuristics', title:'Slides: Heuristics & Guidelines', desc:'Download PPT on Nielsen\'s heuristics.', section:'Lecture Slides', targetId:'resources', targetSelector:'.resource-card[data-week="8"][data-topic="design"]', tab:'slides' },

  // YOUTUBE VIDEOS
  { week:'1', date:'2026-01-12', topic:'usability', title:'YouTube: What is HCI?', desc:'Full recorded lecture on HCI fundamentals.', section:'Videos', targetId:'resources', targetSelector:'.video-card[data-week="1"][data-topic="usability"]', tab:'videos' },
  { week:'2', date:'2026-01-19', topic:'cognitive', title:'YouTube: Human Information Processing', desc:'Explores HIP model.', section:'Videos', targetId:'resources', targetSelector:'.video-card[data-week="2"][data-topic="cognitive"]', tab:'videos' },
  { week:'3', date:'2026-01-26', topic:'computer', title:'YouTube: Visual Perception & Gestalt', desc:'Explains visual perception.', section:'Videos', targetId:'resources', targetSelector:'.video-card[data-week="3"][data-topic="research"]', tab:'videos' },
  { week:'4', date:'2026-02-02', topic:'interaction', title:'YouTube: HIP & LTM', desc:'Discusses HIP and Long-Term Memory.', section:'Videos', targetId:'resources', targetSelector:'.video-card[data-week="4"][data-topic="design"]', tab:'videos' },
  { week:'5', date:'2026-02-09', topic:'ergonomics', title:'YouTube: Interactivity in HCI', desc:'Focuses on interactivity.', section:'Videos', targetId:'resources', targetSelector:'.video-card[data-week="5"][data-topic="prototyping"]', tab:'videos' },
  { week:'6', date:'2026-02-16', topic:'media', title:'YouTube: Display Devices', desc:'Explains display devices.', section:'Videos', targetId:'resources', targetSelector:'.video-card[data-week="6"][data-topic="evaluation"]', tab:'videos' },

  // BOOKS
  { week:'1', date:'2026-01-12', topic:'usability', title:'Book: Human-Computer Interaction', desc:'Alan Dix — Primary textbook.', section:'Books', targetId:'books', targetSelector:'.book-card:first-child' },
  { week:'1', date:'2026-01-12', topic:'design', title:'Book: Designing the User Interface', desc:'Ben Shneiderman — UI guidelines.', section:'Books', targetId:'books', targetSelector:'.book-card:nth-child(2)' },
  { week:'1', date:'2026-01-12', topic:'design', title:'Book: Design of Everyday Things', desc:'Don Norman — Human-centered design.', section:'Books', targetId:'books', targetSelector:'.book-card:nth-child(3)' },
  { week:'1', date:'2026-01-12', topic:'research', title:'Book: Observing the User Experience', desc:'Goodman & Kuniavsky — User research.', section:'Books', targetId:'books', targetSelector:'.book-card:nth-child(4)' }
];

// Topic mapping
const topicLabels = {
  'usability': 'HCI Introduction',
  'cognitive': 'Human Information Processing',
  'computer': 'The Computer in HCI',
  'interaction': 'The Interaction Model',
  'ergonomics': 'Ergonomics & Workspace Design',
  'media': 'Media & Interface Styles',
  'ucd': 'Design Process, TCUID & UCD',
  'heuristics': 'Heuristics & Design Guidelines',
  'prototyping': 'Prototyping',
  'web': 'Web Systems',
  'evaluation': 'Evaluation',
  'advanced': 'Advanced Topics'
};

// ── FUNCTION TO SCROLL TO ELEMENT ─────────────────────
function scrollToElement(targetSelector, targetId, tabName = null) {
  document.getElementById('searchOverlay').classList.remove('open');
  
  if (tabName && targetId === 'resources') {
    const tabButton = document.querySelector(`.res-tab[data-tab="${tabName}"]`);
    if (tabButton) {
      document.querySelectorAll('.res-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.res-panel').forEach(p => p.classList.remove('active'));
      tabButton.classList.add('active');
      document.getElementById(`tab-${tabName}`).classList.add('active');
    }
  }
  
  const section = document.getElementById(targetId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    setTimeout(() => {
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        document.querySelectorAll('.search-highlight').forEach(el => {
          el.classList.remove('search-highlight');
        });
        targetElement.classList.add('search-highlight');
        targetElement.style.transition = 'all 0.3s ease';
        targetElement.style.boxShadow = '0 0 0 3px var(--blue)';
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          targetElement.style.boxShadow = '';
          targetElement.classList.remove('search-highlight');
        }, 3000);
      }
    }, 500);
  }
}

// ── SEARCH OVERLAY ────────────────────────────────────
const searchToggle = document.getElementById('searchToggle');
const searchClose = document.getElementById('searchClose');
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');

searchToggle.addEventListener('click', () => { searchOverlay.classList.add('open'); searchInput.focus(); });
searchClose.addEventListener('click', () => searchOverlay.classList.remove('open'));
searchOverlay.addEventListener('click', e => { if (e.target === searchOverlay) searchOverlay.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') searchOverlay.classList.remove('open'); });

// ── LIVE SEARCH ───────────────────────────────────────
function runSearch() {
  const query = searchInput.value.toLowerCase().trim();
  const week = document.getElementById('filterWeek').value;
  const dateVal = document.getElementById('filterDate').value;
  const topic = document.getElementById('filterTopic').value;
  const resultsEl = document.getElementById('searchResults');

  let results = searchData.filter(item => {
    const matchQuery = !query ||
      item.title.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.section.toLowerCase().includes(query);
    const matchWeek = !week || item.week === week;
    const matchDate = !dateVal || item.date === dateVal;
    const matchTopic = !topic || item.topic === topic;
    return matchQuery && matchWeek && matchDate && matchTopic;
  });

  if (!query && !week && !dateVal && !topic) {
    resultsEl.innerHTML = '<div class="no-results">Start typing or apply a filter to search course content.</div>';
    return;
  }

  if (results.length === 0) {
    resultsEl.innerHTML = '<div class="no-results">No results found. Try different keywords or filters.</div>';
    return;
  }

  resultsEl.innerHTML = results.map((r, index) => `
    <div class="search-result-item" data-result-index="${index}">
      <div class="sr-meta">${r.section} · Week ${r.week} · ${r.date}</div>
      <div class="sr-title">${highlight(r.title, query)}</div>
      <div class="sr-desc">${highlight(r.desc, query)}</div>
    </div>
  `).join('');

  document.querySelectorAll('.search-result-item').forEach((item, idx) => {
    item.addEventListener('click', () => {
      const result = results[idx];
      if (result) {
        scrollToElement(result.targetSelector, result.targetId, result.tab);
      }
    });
  });
}

function highlight(text, query) {
  if (!query) return text;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark style="background:#d5ecff;border-radius:3px;padding:0 2px">$1</mark>');
}

// Event listeners
if (searchInput) searchInput.addEventListener('input', runSearch);
const applyBtn = document.getElementById('applyFilters');
const clearBtn = document.getElementById('clearFilters');
if (applyBtn) applyBtn.addEventListener('click', runSearch);
if (clearBtn) {
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    document.getElementById('filterWeek').value = '';
    document.getElementById('filterDate').value = '';
    document.getElementById('filterTopic').value = '';
    document.getElementById('searchResults').innerHTML = '<div class="no-results">Start typing or apply a filter to search course content.</div>';
  });
}

// Initial state
const resultsEl = document.getElementById('searchResults');
if (resultsEl) resultsEl.innerHTML = '<div class="no-results">Start typing or apply a filter to search course content.</div>';

// ── WEEK ACCORDION FUNCTIONALITY ─────────────────────
document.querySelectorAll('.week-accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const accordionItem = header.parentElement;
    accordionItem.classList.toggle('open');
  });
});