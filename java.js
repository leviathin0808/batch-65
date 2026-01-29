document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const projects = document.getElementById('projects');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Submit clicked');
    

    const name = form.name.value.trim();
    const start = form.star.value.trim();
    const end = form['end-date'].value.trim();
    const desc = form.description.value.trim();
    const techInput = form.querySelector('input[name="tech"]:checked');
    const tech = techInput ? techInput.value : '';

    const card = document.createElement('div');
    card.className = 'card mb-3';
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${escapeHtml(name || 'Untitled')}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${escapeHtml(tech)}</h6>
        <p class="card-text">${escapeHtml(desc)}</p>
        <p class="card-text"><small class="text-muted">Start: ${escapeHtml(start)} • End: ${escapeHtml(end)}</small></p>
      </div>
    `;

    if (projects) projects.prepend(card);
    form.reset();

    // show bootstrap toast notification
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
      document.body.appendChild(toastContainer);
    }

    //membuat element toast //
    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center text-bg-primary border-0';
    toastEl.role = 'alert';
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          Project "${escapeHtml(name || 'Untitled')}" added
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
//notif//
    toastContainer.appendChild(toastEl);
    const bsToast = new bootstrap.Toast(toastEl, { delay: 3000 });
    bsToast.show();
  });

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
});
