  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  function openModal(type) {
    const tag = document.getElementById('modalTag');
    const title = document.getElementById('modalTitle');
    const submissionType = document.getElementById('submissionType');
    if (type === 'waitlist') {
      tag.textContent = 'Join the Waitlist';
      title.textContent = 'Get early access to Pactura.ai.';
      submissionType.value = 'Waitlist';
    } else {
      tag.textContent = 'Request a Demo';
      title.textContent = "Let's talk about your compliance needs.";
      submissionType.value = 'Demo Request';
    }
    document.getElementById('formContent').style.display = 'block';
    document.getElementById('formSuccess').style.display = 'none';
    document.getElementById('formModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('formModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('formModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch(this.action, {
        method: 'POST',
        body: new FormData(this),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        document.getElementById('formContent').style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
        this.reset();
      } else {
        btn.textContent = 'Something went wrong. Try again.';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Something went wrong. Try again.';
      btn.disabled = false;
    }
  });