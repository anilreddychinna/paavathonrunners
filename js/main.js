// Paavathon Runners - Simple interactions

document.addEventListener('DOMContentLoaded', function () {
  // Register service worker (PWA)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }

  // Close mobile menu after tapping a link
  var navCollapse = document.getElementById('mainNav');
  if (navCollapse) {
    navCollapse.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 992 && navCollapse.classList.contains('show')) {
          var instance = bootstrap.Collapse.getInstance(navCollapse);
          if (instance) instance.hide();
        }
      });
    });
  }

  // Filter chips toggle
  document.querySelectorAll('.filter-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var group = this.closest('.filter-group');
      if (group && group.dataset.single === 'true') {
        group.querySelectorAll('.filter-chip').forEach(function (c) {
          c.classList.remove('active');
        });
        this.classList.add('active');
      } else {
        this.classList.toggle('active');
      }
      if (typeof filterEvents === 'function') filterEvents();
    });
  });

  // Day picker buttons (forms)
  document.querySelectorAll('.day-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      this.classList.toggle('active');
    });
  });

  // Type toggle buttons (forms)
  document.querySelectorAll('.type-toggle .btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var group = this.closest('.type-toggle');
      group.querySelectorAll('.btn').forEach(function (b) {
        b.classList.remove('btn-primary-br');
        b.classList.add('btn-outline-secondary');
      });
      this.classList.remove('btn-outline-secondary');
      this.classList.add('btn-primary-br');
    });
  });

  // Form submit placeholder
  document.querySelectorAll('form[data-demo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Form submitted! (Demo mode — connect to your backend to save data.)');
    });
  });
});

function filterEvents() {
  var activeDistances = [];
  var activeTypes = [];

  document.querySelectorAll('.filter-group[data-filter="distance"] .filter-chip.active').forEach(function (c) {
    activeDistances.push(c.dataset.value);
  });
  document.querySelectorAll('.filter-group[data-filter="eventtype"] .filter-chip.active').forEach(function (c) {
    activeTypes.push(c.dataset.value);
  });

  document.querySelectorAll('.event-list-item').forEach(function (item) {
    var distances = item.dataset.distances.split(',');
    var type = item.dataset.type;
    var matchDistance = activeDistances.length === 0 || activeDistances.some(function (d) {
      return distances.includes(d);
    });
    var matchType = activeTypes.length === 0 || activeTypes.includes(type);
    item.style.display = matchDistance && matchType ? '' : 'none';
  });
}
