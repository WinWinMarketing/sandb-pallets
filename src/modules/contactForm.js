import gsap from 'gsap';

export function initContactForm() {
  const form = document.querySelector('[data-form]');
  if (!form) return;

  const requiredFields = form.querySelectorAll('[required]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstInvalid = null;

    requiredFields.forEach((field) => {
      const error = document.getElementById(`${field.id}-error`);
      if (!field.value.trim()) {
        if (error) error.textContent = 'This field is required';
        field.classList.add('form-input--error');
        if (!firstInvalid) firstInvalid = field;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        if (error) error.textContent = 'Please enter a valid email';
        field.classList.add('form-input--error');
        if (!firstInvalid) firstInvalid = field;
      } else {
        if (error) error.textContent = '';
        field.classList.remove('form-input--error');
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      const btn = form.querySelector('.form-submit');
      if (btn) {
        gsap.to(btn, { x: [-8, 8, -4, 4, 0], duration: 0.4, ease: 'power2.out' });
      }
      return;
    }

    // Success animation
    const btn = form.querySelector('.form-submit');
    if (btn) {
      const origText = btn.querySelector('.btn__text').textContent;
      btn.querySelector('.btn__text').textContent = 'Sent!';
      btn.querySelector('.btn__arrow').textContent = '✓';
      btn.disabled = true;
      gsap.fromTo(btn, { scale: 0.95 }, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });

      setTimeout(() => {
        btn.querySelector('.btn__text').textContent = origText;
        btn.querySelector('.btn__arrow').innerHTML = '&rarr;';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }
  });

  // Clear errors on input
  requiredFields.forEach((field) => {
    field.addEventListener('input', () => {
      const error = document.getElementById(`${field.id}-error`);
      if (error) error.textContent = '';
      field.classList.remove('form-input--error');
    });
  });
}
