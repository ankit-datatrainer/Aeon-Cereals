/* =====================================================================
   AEON CEREALS — shared form handling (Careers, Become a Distributor)
   Client-side validation, file checks, loading state and a success
   panel with a reference number. There is no backend yet: connect the
   submit() hook below to an email service or API when one is chosen.
   ===================================================================== */
(function () {
  'use strict';

  const RULES = {
    email: { re: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, msg: 'Enter a valid email address.' },
    mobile: { re: /^[6-9]\d{9}$/, msg: 'Enter a valid 10-digit Indian mobile number.', clean: v => v.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '') },
    pincode: { re: /^[1-9]\d{5}$/, msg: 'Enter a valid 6-digit PIN code.' },
    gstin: { re: /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/, msg: 'GSTIN should be 15 characters, e.g. 07ABCDE1234F1Z5.', clean: v => v.toUpperCase().replace(/\s/g, '') },
    url: { re: /^https?:\/\/\S+\.\S+/, msg: 'Enter a full link starting with https://' },
    number: { re: /^\d+$/, msg: 'Enter a number.' }
  };

  function fieldOf(el) { return el.closest('.field') || el.closest('.form-section'); }
  function setError(el, msg) {
    const f = fieldOf(el);
    const target = el.closest('.check-grid') || el.closest('.file-drop') || el;
    target.classList.toggle('is-error', !!msg);
    const err = f && f.querySelector('.err');
    if (err) err.textContent = msg || '';
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  function validateField(el) {
    if (el.type === 'checkbox' && el.closest('.check-grid')) return true; // handled as a group
    let v = (el.value || '').trim();
    const rule = RULES[el.dataset.rule];
    if (rule && rule.clean && v) { v = rule.clean(v); el.value = v; }

    if (el.type === 'checkbox') {
      if (el.required && !el.checked) { setError(el, el.dataset.msg || 'Please confirm to continue.'); return false; }
      setError(el, ''); return true;
    }
    if (el.type === 'file') {
      const file = el.files && el.files[0];
      if (el.required && !file) { setError(el, 'Please attach your CV.'); return false; }
      if (file) {
        const maxMb = parseFloat(el.dataset.maxMb || 5);
        const okExt = /\.(pdf|docx?|DOCX?|PDF)$/.test(file.name);
        if (!okExt) { setError(el, 'Upload a PDF or Word document.'); return false; }
        if (file.size > maxMb * 1024 * 1024) { setError(el, `File is larger than ${maxMb} MB.`); return false; }
      }
      setError(el, ''); return true;
    }
    if (el.required && !v) { setError(el, el.dataset.msg || 'This field is required.'); return false; }
    if (v && el.minLength > 0 && v.length < el.minLength) { setError(el, `Please enter at least ${el.minLength} characters.`); return false; }
    if (v && rule && !rule.re.test(v)) { setError(el, rule.msg); return false; }
    setError(el, ''); return true;
  }

  function validateGroups(form) {
    let ok = true;
    form.querySelectorAll('.check-grid[data-min]').forEach(g => {
      const min = parseInt(g.dataset.min, 10) || 1;
      const n = g.querySelectorAll('input:checked').length;
      const f = g.closest('.field');
      const err = f && f.querySelector('.err');
      const bad = n < min;
      g.classList.toggle('is-error', bad);
      if (err) err.textContent = bad ? (g.dataset.msg || `Select at least ${min}.`) : '';
      if (bad) ok = false;
    });
    return ok;
  }

  function reference(prefix) {
    const d = new Date();
    const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    return `${prefix}-${ymd}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  /* Placeholder for a real endpoint. Resolves after a short delay. */
  function submit(form, data) {
    return new Promise(resolve => setTimeout(() => resolve({ ok: true }), 1200));
  }

  document.querySelectorAll('form[data-aeon-form]').forEach(form => {
    const fields = [...form.querySelectorAll('input, select, textarea')].filter(el => el.type !== 'hidden');
    const summary = form.querySelector('.form-summary');
    const btn = form.querySelector('button[type=submit]');
    const shell = form.closest('.form-shell');
    const success = shell && shell.querySelector('.form-success');

    fields.forEach(el => {
      const ev = el.tagName === 'SELECT' || el.type === 'checkbox' || el.type === 'file' ? 'change' : 'blur';
      el.addEventListener(ev, () => { if (el.type === 'checkbox' && el.closest('.check-grid')) validateGroups(form); else validateField(el); });
      el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') validateField(el); });
    });

    // File picker: show the chosen file name
    form.querySelectorAll('.file-drop').forEach(drop => {
      const input = drop.querySelector('input[type=file]');
      const label = drop.querySelector('b');
      const def = label.textContent;
      input.addEventListener('change', () => { label.textContent = input.files[0] ? input.files[0].name : def; });
      ['dragenter', 'dragover'].forEach(e => drop.addEventListener(e, () => drop.classList.add('is-drag')));
      ['dragleave', 'drop'].forEach(e => drop.addEventListener(e, () => drop.classList.remove('is-drag')));
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      let ok = true;
      fields.forEach(el => { if (!validateField(el)) ok = false; });
      if (!validateGroups(form)) ok = false;

      const invalid = form.querySelectorAll('[aria-invalid=true], .check-grid.is-error');
      if (!ok) {
        if (summary) {
          summary.textContent = `Please correct ${invalid.length} highlighted field${invalid.length === 1 ? '' : 's'} before submitting.`;
          summary.classList.add('is-visible');
        }
        const first = form.querySelector('[aria-invalid=true]') || form.querySelector('.check-grid.is-error input');
        if (first) {
          const y = first.getBoundingClientRect().top + window.scrollY - 140;
          if (window.lenis) window.lenis.scrollTo(y); else window.scrollTo({ top: y, behavior: 'smooth' });
          setTimeout(() => first.focus({ preventScroll: true }), 400);
        }
        return;
      }
      if (summary) summary.classList.remove('is-visible');

      btn.disabled = true; btn.classList.add('is-loading');
      const label = btn.querySelector('span');
      const original = label.textContent;
      label.textContent = 'Submitting';

      const data = Object.fromEntries(new FormData(form).entries());
      await submit(form, data);

      btn.disabled = false; btn.classList.remove('is-loading'); label.textContent = original;
      if (success) {
        const ref = reference(form.dataset.refPrefix || 'AEON');
        success.querySelector('.ref-chip').textContent = ref;
        const nameEl = success.querySelector('[data-fill=name]');
        const nameField = form.querySelector('[data-name-source]');
        if (nameEl && nameField) nameEl.textContent = nameField.value.trim().split(' ')[0];
        form.hidden = true;
        success.classList.add('is-visible');
        const y = shell.getBoundingClientRect().top + window.scrollY - 120;
        if (window.lenis) window.lenis.scrollTo(y); else window.scrollTo({ top: y, behavior: 'smooth' });
        if (typeof ScrollTrigger !== 'undefined') setTimeout(() => ScrollTrigger.refresh(), 300);
      }
    });

    // "Submit another" resets the form
    if (success) {
      const again = success.querySelector('[data-reset]');
      if (again) again.addEventListener('click', () => {
        form.reset();
        form.querySelectorAll('.file-drop b').forEach(b => b.textContent = b.dataset.default || 'Choose a file or drag it here');
        fields.forEach(el => setError(el, ''));
        success.classList.remove('is-visible');
        form.hidden = false;
      });
    }
  });

  /* Careers: job accordion + "apply for this role" */
  document.querySelectorAll('.job').forEach(job => {
    const head = job.querySelector('.job__head');
    const body = job.querySelector('.job__body');
    head.addEventListener('click', () => {
      const open = job.classList.toggle('is-open');
      head.setAttribute('aria-expanded', open);
      body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
      if (typeof ScrollTrigger !== 'undefined') setTimeout(() => ScrollTrigger.refresh(), 650);
    });
  });
  document.querySelectorAll('[data-apply]').forEach(b => b.addEventListener('click', () => {
    const select = document.getElementById('cPosition');
    if (select) { select.value = b.dataset.apply; select.dispatchEvent(new Event('change')); }
    const target = document.getElementById('apply');
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 110;
      if (window.lenis) window.lenis.scrollTo(y); else window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }));
})();
