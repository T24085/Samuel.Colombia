const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const body = document.body;
const flash = document.querySelector('.flash');
const progressBar = document.querySelector('.progress-bar');
const sceneTitle = document.querySelector('.scene-title');
const sceneCount = document.querySelector('.scene-count');
const navLinks = [...document.querySelectorAll('.scene-nav a')];
const panels = [...document.querySelectorAll('.panel')];
const revealTargets = [...document.querySelectorAll('.reveal, .split-reveal')];
const heroVideos = [...document.querySelectorAll('#hero [data-hero-video]')];
const manifestoSection = document.querySelector('#manifesto');
const manifestoTypeTargets = [...document.querySelectorAll('#manifesto .manifesto-type')];
const serviceCards = [...document.querySelectorAll('.service-card')];
const motionSection = document.querySelector('#motion');
const motionVideos = [...document.querySelectorAll('#motion .motion-video')];
const manifestoArt = document.querySelector('#manifesto .manifesto-art');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('.lightbox__image');
const lightboxClose = lightbox?.querySelector('.lightbox__close');
const lightboxBackdrop = lightbox?.querySelector('.lightbox__backdrop');
const pricingModals = [...document.querySelectorAll('.pricing-modal')];
const pricingModalTriggers = [...document.querySelectorAll('[data-pricing-modal-open]')];
const collageCards = [...document.querySelectorAll('#headshots .collage-card--clickable, #lifestyle .collage-card--clickable')];
const brandingCollage = document.querySelector('#branding .collage');

const panelIndex = new Map(panels.map((panel, index) => [panel, index]));
const posterSection = document.querySelector('#services');
const eventsSection = document.querySelector('#events');
const eventsTitle = document.querySelector('#events .section-title');
const eventsTitleText = eventsTitle?.textContent.trim() || '';
const cashFlowPeople = [...document.querySelectorAll('.cash-flow-person')];
const posterCopyBlock = document.querySelector('.poster-copy-block');
const posterWordButtons = [...document.querySelectorAll('.poster-word')];
const posterPreview = document.querySelector('.poster-preview');
const posterPreviewTitle = document.querySelector('.cash-flow-preview__title');
const posterPreviewCopy = document.querySelector('.cash-flow-preview__text');
const posterPreviewGrid = document.querySelector('.cash-flow-preview__grid');
const posterCaption = document.querySelector('.poster-caption');
const posterPrice = document.querySelector('.cash-flow-price strong');
const posterDefault = posterWordButtons.find(button => button.classList.contains('is-active')) || posterWordButtons[0];
const contactForm = document.querySelector('#contact-form');
const contactStatus = document.querySelector('.contact-status');
const contactSubmit = contactForm?.querySelector('[data-contact-submit]');
const emailServiceId = 'service_p55qfka';
const emailTemplateId = 'template_gxa8uvc';
const emailPublicKey = 'IFJYlgeXzSgqsFRBS';
const contactEmail = 'studiodefiant@gmail.com';
const servicePreviewData = {
  branding: {
    title: 'Branding',
    copy: 'Personal branding, founders, creators, and expats photographed with editorial direction.',
    price: '$350-$700',
    images: [
      { src: 'assets/Branding/branding_001.jpg', alt: 'Branding example photo of a fashion editorial portrait' },
      { src: 'assets/Branding/branding_002.jpg', alt: 'Branding example photo of a dynamic editorial pose' },
      { src: 'assets/Branding/branding_003.jpg', alt: 'Branding example photo of a confident editorial portrait' },
    ],
  },
  lifestyle: {
    title: 'Lifestyle',
    copy: 'Dating profile, social presence, and lifestyle imagery built around confidence and motion.',
    price: '$350-$700',
    images: [
      { src: 'assets/Lifestyle/lifestyle_001.jpg', alt: 'Lifestyle example photo with two women walking outdoors' },
      { src: 'assets/Lifestyle/lifestyle_012.jpg', alt: 'Lifestyle example photo with two women on an indoor staircase' },
      { src: 'assets/Lifestyle/lifestyle_013.jpg', alt: 'Lifestyle example photo with two women standing by a brick wall' },
    ],
  },
  headshots: {
    title: 'Headshots',
    copy: 'LinkedIn, startup, remote worker, and environmental portraits with a clean professional edge.',
    price: '$350-$700',
    images: [
      { src: 'assets/Headshots Personal Branding/headshots_personal_branding_006.jpg', alt: 'Headshot example photo of a woman against a dark studio background' },
      { src: 'assets/Headshots Personal Branding/headshots_personal_branding_007.jpg', alt: 'Headshot example photo of a man in a dark blazer against a dark studio background' },
      { src: 'assets/Headshots Personal Branding/headshots_personal_branding_008.jpg', alt: 'Headshot example photo of a smiling man in a blue blazer against a dark studio background' },
    ],
  },
  travel: {
    title: 'Travel',
    copy: 'Couples, solo travelers, and city-led experience shoots across Medellin and Colombia.',
    price: '$350-$700',
    images: [
      { src: 'assets/Travel/fashion_on_location_lifestyle_campaign_018.jpg', alt: 'Travel example photo of a model in a pale dress posed against ornate wood doors' },
      { src: 'assets/Travel/fashion_on_location_lifestyle_campaign_020.jpg', alt: 'Travel example photo of a warm group portrait outdoors' },
      { src: 'assets/Travel/fashion_on_location_lifestyle_campaign_038.jpg', alt: 'Travel example photo of a model in a blue tailored outfit on a porch' },
    ],
  },
  events: {
    title: 'Events',
    copy: 'Small luxury events, networking nights, and brand activations covered with restraint.',
    price: '$350-$700',
    images: [
      { src: 'assets/Events/events_001.jpg', alt: 'Event example photo with a fashion-forward purple-lit look' },
      { src: 'assets/Events/events_002.jpg', alt: 'Event example photo with a dark look and structured outfit' },
    ],
  },
  websites: {
    title: 'Websites',
    copy: 'Simple personal websites and image-led identity systems after the shoot.',
    price: '$300-$1000',
    images: [
      { src: 'assets/Websites/samuel-studio-website2.png', alt: 'Samuel Studio website preview screenshot' },
      { src: 'assets/Websites/samuel-studio-colombia-website.png', alt: 'Samuel Studio Colombia website preview screenshot' },
      { src: 'assets/Websites/defiant-boudoir-website.png', alt: 'Defiant Boudoir website preview screenshot' },
    ],
  },
};

function prepareEventsTitle() {
  if (!eventsTitle || eventsTitle.dataset.eventsReady === 'true' || !eventsTitleText) return;

  const words = eventsTitleText.split(/\s+/).filter(Boolean);
  eventsTitle.setAttribute('aria-label', eventsTitleText);
  eventsTitle.textContent = '';

  words.forEach((word, index) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'events-title__word';
    wordSpan.style.setProperty('--events-word-index', String(index));
    wordSpan.textContent = word;
    eventsTitle.appendChild(wordSpan);

    if (index < words.length - 1) {
      eventsTitle.appendChild(document.createTextNode(' '));
    }
  });

  eventsTitle.dataset.eventsReady = 'true';
}

function playEventsTitleReveal() {
  if (!eventsTitle || !eventsTitleText) return;

  prepareEventsTitle();
  eventsTitle.classList.remove('is-revealed');
  void eventsTitle.offsetWidth;
  eventsTitle.classList.add('is-revealed');
}

function resetEventsTitleReveal() {
  if (!eventsTitle) return;

  eventsTitle.classList.remove('is-revealed');
}

function setContactStatus(message, tone = '') {
  if (!contactStatus) return;

  contactStatus.textContent = message;
  contactStatus.dataset.tone = tone;
}

function renderServicePreviewImages(images) {
  if (!posterPreviewGrid) return;

  const tiles = images.slice(0, 3).map(image => {
    const figure = document.createElement('figure');
    figure.className = 'cash-flow-preview__tile';

    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.loading = 'lazy';

    figure.appendChild(img);
    return figure;
  });

  while (tiles.length < 3) {
    const placeholder = document.createElement('figure');
    placeholder.className = 'cash-flow-preview__tile cash-flow-preview__tile--empty';
    placeholder.setAttribute('aria-hidden', 'true');
    tiles.push(placeholder);
  }

  posterPreviewGrid.replaceChildren(...tiles);
}

function setPosterPreview(word) {
  if (!posterPreview || !posterPreviewTitle || !posterPreviewCopy || !posterPreviewGrid || !word) return;

  const key = word.dataset.serviceKey;
  const service = servicePreviewData[key] || servicePreviewData.branding;

  posterWordButtons.forEach(button => {
    button.classList.toggle('is-active', button === word);
    button.setAttribute('aria-pressed', String(button === word));
  });

  posterPreviewTitle.textContent = service.title;
  posterPreviewCopy.textContent = service.copy;
  if (posterPrice) {
    posterPrice.textContent = service.price || '$350-$700';
    const blockRect = posterCopyBlock?.getBoundingClientRect();
    const wordRect = word.getBoundingClientRect();
    if (blockRect) {
      const left = ((wordRect.left - blockRect.left) + wordRect.width * 0.5) / blockRect.width * 100;
      const top = ((wordRect.top - blockRect.top) + wordRect.height * 0.5) / blockRect.height * 100;
      posterPrice.style.left = `${Math.max(14, Math.min(86, left))}%`;
      posterPrice.style.top = `${Math.max(18, Math.min(88, top + 18))}%`;
    }
  }
  renderServicePreviewImages(service.images);
  posterPreview.classList.add('is-active');
}

function clearPosterPreview() {
  if (!posterPreview || !posterPreviewTitle || !posterPreviewCopy || !posterPreviewGrid) return;

  posterPreview.classList.remove('is-active');
  posterWordButtons.forEach(button => {
    const active = button === posterDefault;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const defaultService = servicePreviewData[posterDefault?.dataset.serviceKey] || servicePreviewData.branding;
  posterPreviewTitle.textContent = defaultService.title;
  posterPreviewCopy.textContent = defaultService.copy;
  if (posterPrice) {
    posterPrice.textContent = defaultService.price || '$350-$700';
    posterPrice.style.left = '50%';
    posterPrice.style.top = '100%';
  }
  renderServicePreviewImages(defaultService.images);
}

function setMotionPlayback(shouldPlay) {
  motionVideos.forEach(video => {
    if (shouldPlay) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}

let heroVideoIndex = 0;
let heroVideoTimer = null;

function setHeroVideo(index) {
  if (!heroVideos.length) return;

  heroVideoIndex = ((index % heroVideos.length) + heroVideos.length) % heroVideos.length;

  heroVideos.forEach((video, videoIndex) => {
    const active = videoIndex === heroVideoIndex;
    video.classList.toggle('is-active', active);

    if (active) {
      if (video.readyState >= 1) {
        try {
          video.currentTime = 0;
        } catch (_) {}
      }
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}

function startHeroRotation() {
  if (!heroVideos.length || reducedMotion) return;

  window.clearInterval(heroVideoTimer);
  heroVideoTimer = window.setInterval(() => {
    setHeroVideo(heroVideoIndex + 1);
  }, 8000);
}

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt || '';
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  body.classList.add('lightbox-open');
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  body.classList.remove('lightbox-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';
}

function openPricingModal(modalName) {
  const modal = pricingModals.find(item => item.dataset.pricingModal === modalName);
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  body.classList.add('lightbox-open');
}

function closePricingModal(modal) {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  body.classList.remove('lightbox-open');
}

function setServicesParallax() {
  if (!posterSection || !cashFlowPeople.length) return;

  const rect = posterSection.getBoundingClientRect();
  const viewport = window.innerHeight || document.documentElement.clientHeight || 1;
  const travel = rect.height + viewport;
  const progress = travel > 0 ? (viewport - rect.top) / travel : 0.5;
  const centeredProgress = Math.max(-1, Math.min(1, (progress - 0.5) * 2));
  const offset = Math.round(Math.abs(centeredProgress) * 76);

  cashFlowPeople.forEach(person => {
    person.style.setProperty('--scroll-offset', `${offset}px`);
  });
}

function setProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  if (progressBar) {
    progressBar.style.height = `${Math.max(14, Math.min(100, progress * 100))}%`;
  }
  if (!reducedMotion) {
    setServicesParallax();
  }
}

function setScene(panel) {
  if (!panel) return;

  body.dataset.accent = panel.dataset.accent || 'gold';
  body.classList.toggle('is-websites-active', panel.id === 'websites');

  const index = panelIndex.get(panel) ?? 0;
  const total = panels.length;
  const label = panel.dataset.scene || panel.id || 'Scene';

  if (sceneTitle) sceneTitle.textContent = label;
  if (sceneCount) {
    sceneCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  }

  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${panel.id}`;
    if (active) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  if (flash) {
    flash.classList.add('active');
    window.clearTimeout(flash._timer);
    flash._timer = window.setTimeout(() => flash.classList.remove('active'), 140);
  }
}

if (!reducedMotion) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else if (entry.target === brandingCollage) {
        entry.target.classList.remove('in-view');
      }
    });
  }, { threshold: 0.18 });

  revealTargets.forEach(target => revealObserver.observe(target));

  let manifestoVisible = false;
  const playManifestoType = () => {
    manifestoTypeTargets.forEach(target => {
      target.classList.remove('in-view');
      void target.offsetWidth;
      target.classList.add('in-view');
    });
  };

  if (manifestoSection) {
    const manifestoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.45;

        if (visible && !manifestoVisible) {
          if (manifestoArt) {
            manifestoArt.classList.remove('in-view');
            void manifestoArt.offsetWidth;
          }
          playManifestoType();
          if (manifestoArt) {
            manifestoArt.classList.add('in-view');
          }
          manifestoVisible = true;
        } else if (!visible && manifestoVisible) {
          manifestoTypeTargets.forEach(target => target.classList.remove('in-view'));
          if (manifestoArt) manifestoArt.classList.remove('in-view');
          manifestoVisible = false;
        }
      });
    }, { threshold: [0, 0.25, 0.45, 0.65, 0.85] });

    manifestoObserver.observe(manifestoSection);
  }

    if (posterSection) {
      const posterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          posterSection.classList.add('is-visible', 'is-animated');
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
          posterSection.classList.remove('is-visible');
          posterSection.classList.remove('is-animated');
          clearPosterPreview();
        }
      });
    }, { threshold: [0.15, 0.35, 0.55, 0.75] });

      posterObserver.observe(posterSection);
    }

    if (eventsSection && eventsTitle) {
      const eventsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const visible = entry.isIntersecting && entry.intersectionRatio >= 0.45;
          if (visible) {
            playEventsTitleReveal();
          } else {
            resetEventsTitleReveal();
          }
        });
      }, { threshold: [0.2, 0.45, 0.7] });

      eventsObserver.observe(eventsSection);
    }

    if (motionSection && motionVideos.length) {
      let motionVisible = false;
    const motionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;

        if (visible && !motionVisible) {
          setMotionPlayback(true);
          motionVisible = true;
        } else if (!visible && motionVisible) {
          setMotionPlayback(false);
          motionVisible = false;
        }
      });
    }, { threshold: [0.15, 0.35, 0.55, 0.75] });

    motionObserver.observe(motionSection);
  }

  setHeroVideo(0);
  startHeroRotation();
  } else {
    revealTargets.forEach(target => target.classList.add('in-view'));
    manifestoTypeTargets.forEach(target => target.classList.add('in-view'));
    if (posterSection) posterSection.classList.add('is-visible', 'is-animated');
    playEventsTitleReveal();
    setMotionPlayback(true);
    setHeroVideo(0);
  }

if (window.emailjs && emailPublicKey) {
  emailjs.init({ publicKey: emailPublicKey });
}

const panelObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setScene(entry.target);
    }
  });
}, { threshold: 0.58 });

panels.forEach(panel => panelObserver.observe(panel));

window.addEventListener('scroll', setProgress, { passive: true });
window.addEventListener('resize', setProgress);
setProgress();
setScene(panels[0]);

const serviceStack = document.querySelector('.service-menu, .service-stack');
function activateServiceCard(card) {
  serviceCards.forEach(item => {
    const active = item === card;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
}

serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => activateServiceCard(card));
  card.addEventListener('focus', () => activateServiceCard(card));
  card.addEventListener('click', () => activateServiceCard(card));
});

if (serviceStack) {
  serviceStack.addEventListener('mouseleave', () => {
    activateServiceCard(serviceCards[0]);
  });
}

if (posterCopyBlock && posterWordButtons.length) {
  posterWordButtons.forEach(button => {
    button.addEventListener('pointerenter', () => setPosterPreview(button));
    button.addEventListener('focus', () => setPosterPreview(button));
    button.addEventListener('click', () => setPosterPreview(button));
    button.addEventListener('pointermove', () => setPosterPreview(button));
    button.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        clearPosterPreview();
        button.blur();
      }
    });
  });

  posterCopyBlock.addEventListener('pointerleave', clearPosterPreview);
  posterCopyBlock.addEventListener('focusout', event => {
    if (!posterCopyBlock.contains(event.relatedTarget)) {
      clearPosterPreview();
    }
  });
}

collageCards.forEach(card => {
  card.addEventListener('click', () => {
    openLightbox(card.dataset.lightboxSrc || '', card.dataset.lightboxAlt || '');
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxBackdrop?.addEventListener('click', closeLightbox);

pricingModalTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => openPricingModal(trigger.dataset.pricingModalOpen || ''));
});

pricingModals.forEach(modal => {
  modal.querySelector('.pricing-modal__close')?.addEventListener('click', () => closePricingModal(modal));
  modal.querySelector('.pricing-modal__backdrop')?.addEventListener('click', () => closePricingModal(modal));
});

window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && lightbox?.classList.contains('is-open')) {
    closeLightbox();
  } else if (event.key === 'Escape') {
    const openPricingModalElement = pricingModals.find(modal => modal.classList.contains('is-open'));
    if (openPricingModalElement) {
      closePricingModal(openPricingModalElement);
    }
  }
});

if (contactForm) {
  contactForm.querySelector('input[name="time"]').value = new Date().toISOString();

  contactForm.addEventListener('submit', async event => {
    event.preventDefault();

    const submitButton = contactSubmit;
    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const service = String(formData.get('service') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const subject = `New Inquiry — ${name} (${service || 'Service'})`;
    const mailtoSubject = encodeURIComponent(subject);
    const mailtoBody = encodeURIComponent([
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'N/A'}`,
      `Service: ${service || 'N/A'}`,
      '',
      message,
    ].join('\n'));

    if (!window.emailjs || !emailTemplateId || !emailPublicKey) {
      setContactStatus('EmailJS still needs your public key and template ID. Opening your email app instead.', 'warning');
      window.location.href = `mailto:${contactEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
      return;
    }

    if (submitButton) submitButton.disabled = true;
    setContactStatus('Sending your inquiry...', 'pending');

    try {
      await emailjs.send(emailServiceId, emailTemplateId, {
        name,
        email,
        phone,
        service,
        from_name: name,
        reply_to: email,
        to_email: contactEmail,
        title: subject,
        subject,
        message,
        time: formData.get('time') || new Date().toISOString(),
        site: 'Samuel Studio Columbia',
      });
      contactForm.reset();
      contactForm.querySelector('input[name="time"]').value = new Date().toISOString();
      setContactStatus('Message sent. Samuel Studio will reply soon.', 'success');
    } catch (error) {
      console.error('EmailJS send failed', error);
      setContactStatus('Send failed. Use the direct email link below for now.', 'error');
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}
