/* AEON CEREALS — Financials gated download
   Step 1: details  →  Step 2: OTP (demo OTP shown in an on-screen "SMS")  →  Step 3: success + PDF opens. */
(function () {
  'use strict';
  const DEMO_OTP = '482913';          // dummy OTP for now — replace with a real SMS gateway later
  const PDF = 'assets/docs/AEON-2.pdf';

  const steps = [...document.querySelectorAll('.fin-step')];
  const bars = [...document.querySelectorAll('.steps span')];
  const form = document.getElementById('finForm');
  const toast = document.getElementById('smsToast');
  const otpWrap = document.getElementById('otpBoxes');
  const otpInputs = [...otpWrap.querySelectorAll('input')];
  const resendBtn = document.getElementById('resendOtp');
  const timerEl = document.getElementById('otpTimer');
  const verifyBtn = document.getElementById('verifyBtn');
  const otpPhone = document.getElementById('otpPhone');
  const viewer = document.getElementById('pdfViewer');
  let timer = null, seconds = 30;

  function go(n) {
    steps.forEach((s, i) => s.classList.toggle('is-active', i === n));
    bars.forEach((b, i) => b.classList.toggle('is-done', i <= n));
    if (typeof gsap !== 'undefined') gsap.fromTo(steps[n], { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: .8, ease: 'expo.out' });
    if (typeof ScrollTrigger !== 'undefined') setTimeout(() => ScrollTrigger.refresh(), 300);
  }

  function setError(input, msg) {
    input.classList.toggle('is-error', !!msg);
    const err = input.parentElement.querySelector('.err');
    if (err) err.textContent = msg || '';
  }

  function validate() {
    let ok = true;
    const name = form.name, email = form.email, phone = form.phone, company = form.company;
    if (name.value.trim().length < 2) { setError(name, 'Please enter your full name.'); ok = false; } else setError(name, '');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) { setError(email, 'Enter a valid email address.'); ok = false; } else setError(email, '');
    if (!/^[6-9]\d{9}$/.test(phone.value.replace(/\D/g, ''))) { setError(phone, 'Enter a valid 10-digit Indian mobile number.'); ok = false; } else setError(phone, '');
    if (!form.consent.checked) { document.getElementById('consentErr').textContent = 'Please accept the terms to continue.'; ok = false; } else document.getElementById('consentErr').textContent = '';
    return ok;
  }

  function showSms(phone) {
    toast.querySelector('p').innerHTML = `Your Aeon Cereals verification code for +91 ${phone.slice(0, 2)}xxxxx${phone.slice(-3)} is`;
    toast.querySelector('b').textContent = DEMO_OTP;
    toast.classList.add('is-visible');
    clearTimeout(toast._t); toast._t = setTimeout(() => toast.classList.remove('is-visible'), 14000);
  }
  toast.querySelector('button').addEventListener('click', () => toast.classList.remove('is-visible'));

  function startTimer() {
    seconds = 30; resendBtn.disabled = true;
    clearInterval(timer);
    timer = setInterval(() => {
      seconds--; timerEl.textContent = `Resend in 0:${String(seconds).padStart(2, '0')}`;
      if (seconds <= 0) { clearInterval(timer); timerEl.textContent = ''; resendBtn.disabled = false; }
    }, 1000);
    timerEl.textContent = 'Resend in 0:30';
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) { form.querySelector('.is-error')?.focus(); return; }
    const btn = form.querySelector('button[type=submit]');
    btn.disabled = true; btn.querySelector('span').textContent = 'Sending OTP…';
    setTimeout(() => {
      btn.disabled = false; btn.querySelector('span').textContent = 'Request OTP';
      const phone = form.phone.value.replace(/\D/g, '');
      otpPhone.textContent = '+91 ' + phone.replace(/(\d{5})(\d{5})/, '$1 $2');
      go(1);
      otpInputs.forEach(i => { i.value = ''; i.classList.remove('is-filled'); });
      setTimeout(() => otpInputs[0].focus(), 400);
      showSms(phone);
      startTimer();
    }, 900);
  });

  // OTP boxes UX
  otpInputs.forEach((inp, i) => {
    inp.addEventListener('input', () => {
      inp.value = inp.value.replace(/\D/g, '').slice(-1);
      inp.classList.toggle('is-filled', !!inp.value);
      otpWrap.classList.remove('is-error');
      if (inp.value && i < otpInputs.length - 1) otpInputs[i + 1].focus();
      if (otpInputs.every(x => x.value)) verify();
    });
    inp.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !inp.value && i > 0) otpInputs[i - 1].focus();
      if (e.key === 'ArrowLeft' && i > 0) otpInputs[i - 1].focus();
      if (e.key === 'ArrowRight' && i < otpInputs.length - 1) otpInputs[i + 1].focus();
    });
    inp.addEventListener('paste', e => {
      const d = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6);
      if (!d) return; e.preventDefault();
      d.split('').forEach((ch, k) => { if (otpInputs[k]) { otpInputs[k].value = ch; otpInputs[k].classList.add('is-filled'); } });
      otpInputs[Math.min(d.length, 5)].focus();
      if (d.length === 6) verify();
    });
  });

  resendBtn.addEventListener('click', () => { showSms(form.phone.value.replace(/\D/g, '')); startTimer(); otpInputs.forEach(i => { i.value = ''; i.classList.remove('is-filled'); }); otpInputs[0].focus(); });
  verifyBtn.addEventListener('click', verify);
  document.getElementById('backBtn').addEventListener('click', () => go(0));

  function verify() {
    const code = otpInputs.map(i => i.value).join('');
    if (code.length < 6) { otpWrap.classList.add('is-error'); setTimeout(() => otpWrap.classList.remove('is-error'), 600); return; }
    verifyBtn.disabled = true; verifyBtn.querySelector('span').textContent = 'Verifying…';
    setTimeout(() => {
      verifyBtn.disabled = false; verifyBtn.querySelector('span').textContent = 'Verify & Open Report';
      if (code !== DEMO_OTP) {
        otpWrap.classList.add('is-error');
        document.getElementById('otpErr').textContent = 'That code did not match. Please check the message and try again.';
        setTimeout(() => otpWrap.classList.remove('is-error'), 600);
        return;
      }
      document.getElementById('otpErr').textContent = '';
      clearInterval(timer);
      toast.classList.remove('is-visible');
      go(2);
      document.getElementById('successName').textContent = form.name.value.trim().split(' ')[0];
      setTimeout(() => document.querySelector('.success').classList.add('is-on'), 100);
      // Open the PDF: new tab + inline viewer as a fallback
      const win = window.open(PDF, '_blank', 'noopener');
      viewer.querySelector('iframe').src = PDF + '#view=FitH';
      viewer.classList.add('is-visible');
      if (typeof ScrollTrigger !== 'undefined') setTimeout(() => ScrollTrigger.refresh(), 400);
      setTimeout(() => { if (window.lenis) window.lenis.scrollTo(viewer, { offset: -100 }); else viewer.scrollIntoView({ behavior: 'smooth' }); }, 1800);
      if (!win) document.getElementById('popupNote').textContent = 'Pop-up was blocked, so the report is shown below. Use “Open in new tab” to view it full-screen.';
    }, 1000);
  }

  // Wire "Open in new tab" and "Download"
  document.querySelectorAll('[data-pdf]').forEach(a => { a.href = PDF; });
})();
