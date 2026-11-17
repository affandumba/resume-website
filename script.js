(function () {
  const themeToggle = document.getElementById('theme-toggle');
  const themeLabel = document.getElementById('theme-label');
  const catToggle = document.getElementById('cat-toggle');
  const catLabel = document.getElementById('cat-label');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const toast = document.getElementById('toast');

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(function () {
      toast.classList.remove('show');
    }, 2600);
  }

  themeToggle.addEventListener('click', function () {
    const isInverted = document.body.classList.toggle('inverted-theme');
    themeLabel.textContent = isInverted ? 'Yellow' : 'Invert';
  });

  menuToggle.addEventListener('click', function () {
    navMenu.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
    });
  });

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');
      filterButtons.forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      projectCards.forEach(function (card) {
        const cats = card.getAttribute('data-category') || '';
        if (filter === 'all' || cats.indexOf(filter) !== -1) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Floating Cat Animation
  const catEl = document.getElementById('floating-cat');
  const catSvg = document.getElementById('cat-svg');
  const catBubble = document.getElementById('cat-bubble');
  const catLines = [
    'meow!',
    'distributed purrs~',
    'model.train(snacks)',
    'RAFT consensus? naps.',
    'git push --purr',
    'PESU cat says hi!'
  ];

  let catActive = true;
  let catX = Math.max(20, window.innerWidth - 130);
  let catY = Math.max(90, window.innerHeight - 140);
  let vx = -1.15;
  let vy = -0.85;
  let bobPhase = 0;

  function stepCat() {
    if (catActive) {
      const maxX = Math.max(20, window.innerWidth - 96);
      const maxY = Math.max(90, window.innerHeight - 108);

      catX += vx;
      catY += vy;
      bobPhase += 0.06;

      if (catX <= 12) {
        catX = 12;
        vx = Math.abs(vx) * (0.9 + Math.random() * 0.25);
      } else if (catX >= maxX) {
        catX = maxX;
        vx = -Math.abs(vx) * (0.9 + Math.random() * 0.25);
      }

      if (catY <= 84) {
        catY = 84;
        vy = Math.abs(vy) * (0.9 + Math.random() * 0.25);
      } else if (catY >= maxY) {
        catY = maxY;
        vy = -Math.abs(vy) * (0.9 + Math.random() * 0.25);
      }

      if (Math.random() < 0.004) {
        vx = (Math.random() > 0.5 ? 1 : -1) * (0.8 + Math.random() * 0.8);
        vy = (Math.random() > 0.5 ? 1 : -1) * (0.6 + Math.random() * 0.7);
      }

      const bobOffset = Math.sin(bobPhase) * 4;
      catEl.style.transform = 'translate3d(' + Math.round(catX) + 'px, ' + Math.round(catY + bobOffset) + 'px, 0)';
      catSvg.style.transform = vx < 0 ? 'scaleX(-1)' : 'scaleX(1)';
    }
    window.requestAnimationFrame(stepCat);
  }

  function triggerCatMeow() {
    const line = catLines[Math.floor(Math.random() * catLines.length)];
    catBubble.textContent = line;
    catEl.classList.add('talking', 'hop');
    setTimeout(function () {
      catEl.classList.remove('hop');
    }, 200);
    clearTimeout(triggerCatMeow._timer);
    triggerCatMeow._timer = setTimeout(function () {
      catEl.classList.remove('talking');
    }, 2200);
  }

  catEl.addEventListener('click', triggerCatMeow);
  catEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerCatMeow();
    }
  });

  catToggle.addEventListener('click', function () {
    catActive = !catActive;
    catEl.classList.toggle('paused', !catActive);
    catLabel.textContent = catActive ? 'Cat: ON' : 'Cat: OFF';
  });

  window.requestAnimationFrame(stepCat);
})();
