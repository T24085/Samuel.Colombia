const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const body = document.body;
const siteHeader = document.querySelector('.site-header');
const flash = document.querySelector('.flash');
const progressBar = document.querySelector('.progress-bar');
const sceneTitle = document.querySelector('.scene-title');
const sceneCount = document.querySelector('.scene-count');
const navLinks = [...document.querySelectorAll('.scene-nav a')];
const panels = [...document.querySelectorAll('.panel')];
const motionSelector = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-soft, .split-reveal';
let revealTargets = [...document.querySelectorAll(motionSelector)];
const staggerGroups = [...document.querySelectorAll('.stagger')];
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
const closeMotionMs = 520;

let posterPreviewSwapTimer = null;
let lightboxCloseTimer = null;
let pricingModalCloseTimer = null;
let serviceCardSwapTimer = null;

function syncHeaderOffset() {
  if (!siteHeader) return;

  const headerHeight = Math.max(0, Math.round(siteHeader.getBoundingClientRect().height));
  document.documentElement.style.setProperty('--header-offset', `${headerHeight}px`);
}

function scrollToSection(hash, { pushState = true } = {}) {
  if (!hash || hash[0] !== '#') return;

  const target = document.querySelector(hash);
  if (!target) return;

  const headerHeight = siteHeader?.getBoundingClientRect().height || 0;
  const targetTop = Math.max(0, Math.round(target.getBoundingClientRect().top + window.scrollY - headerHeight));

  window.scrollTo({
    top: targetTop,
    behavior: reducedMotion ? 'auto' : 'smooth',
  });

  if (pushState) {
    history.pushState(null, '', hash);
  }
}

function prepareStaggerGroups() {
  staggerGroups.forEach(group => {
    [...group.children].forEach((child, index) => {
      child.style.setProperty('--stagger-index', index);

      if (
        child.matches(motionSelector)
      ) {
        return;
      }

      child.classList.add('reveal-soft');
      if (!revealTargets.includes(child)) {
        revealTargets.push(child);
      }
    });
  });
}

function setVisibleState(target, visible) {
  target.classList.toggle('is-visible', visible);
  target.classList.toggle('in-view', visible);
}

const servicePreviewData = {
  branding: {
    title: 'Brand Identity',
    copy: 'Personal branding, founders, creators, and expats photographed with editorial direction.',
    price: '$350-$700',
    images: [
      { src: 'assets/Branding/branding_001.jpg', alt: 'Branding example photo of a fashion editorial portrait' },
      { src: 'assets/Branding/branding_002.jpg', alt: 'Branding example photo of a dynamic editorial pose' },
      { src: 'assets/Branding/branding_003.jpg', alt: 'Branding example photo of a confident editorial portrait' },
    ],
  },
  lifestyle: {
    title: 'Lifestyle & Content',
    copy: 'Dating profile, social presence, and lifestyle imagery built around confidence and motion.',
    price: '$350-$700',
    images: [
      { src: 'assets/Lifestyle/lifestyle_001.jpg', alt: 'Lifestyle example photo with two women walking outdoors' },
      { src: 'assets/Lifestyle/lifestyle_012.jpg', alt: 'Lifestyle example photo with two women on an indoor staircase' },
      { src: 'assets/Lifestyle/lifestyle_013.jpg', alt: 'Lifestyle example photo with two women standing by a brick wall' },
    ],
  },
  headshots: {
    title: 'Professional Headshots',
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
    title: 'Event Coverage',
    copy: 'Small luxury events, networking nights, and brand activations covered with restraint.',
    price: '$350-$700',
    images: [
      { src: 'assets/Events/events_001.jpg', alt: 'Event example photo with a fashion-forward purple-lit look' },
      { src: 'assets/Events/events_002.jpg', alt: 'Event example photo with a dark look and structured outfit' },
    ],
  },
  websites: {
    title: 'Web Design',
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

function applyPosterPreviewSelection(word) {
  if (!posterPreview || !posterPreviewTitle || !posterPreviewCopy || !posterPreviewGrid || !word) return;

  const key = word.dataset.serviceKey;
  const service = servicePreviewData[key] || servicePreviewData.branding;

  posterWordButtons.forEach(button => {
    const active = button === word;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
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

function setPosterPreview(word) {
  if (!posterPreview || !posterPreviewTitle || !posterPreviewCopy || !posterPreviewGrid || !word) return;

  window.clearTimeout(posterPreviewSwapTimer);
  posterPreview.classList.add('is-changing');
  posterPreviewSwapTimer = window.setTimeout(() => {
    applyPosterPreviewSelection(word);
    requestAnimationFrame(() => {
      posterPreview.classList.remove('is-changing');
    });
  }, 180);
}

function clearPosterPreview() {
  if (!posterPreview || !posterPreviewTitle || !posterPreviewCopy || !posterPreviewGrid) return;

  window.clearTimeout(posterPreviewSwapTimer);
  posterPreview.classList.remove('is-changing');
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
  window.clearTimeout(lightboxCloseTimer);
  lightbox.classList.remove('is-closing');
  lightboxImage.src = src;
  lightboxImage.alt = alt || '';
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  body.classList.add('lightbox-open');
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  if (!lightbox.classList.contains('is-open') || lightbox.classList.contains('is-closing')) return;

  lightbox.classList.add('is-closing');
  window.clearTimeout(lightboxCloseTimer);
  lightboxCloseTimer = window.setTimeout(() => {
    lightbox.classList.remove('is-open', 'is-closing');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    if (!document.querySelector('.pricing-modal.is-open')) {
      body.classList.remove('lightbox-open');
    }
  }, closeMotionMs);
}

function openPricingModal(modalName) {
  const modal = pricingModals.find(item => item.dataset.pricingModal === modalName);
  if (!modal) return;
  window.clearTimeout(modal._closeTimer);
  modal.classList.remove('is-closing');
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  body.classList.add('lightbox-open');
}

function closePricingModal(modal) {
  if (!modal) return;
  if (!modal.classList.contains('is-open') || modal.classList.contains('is-closing')) return;

  modal.classList.add('is-closing');
  window.clearTimeout(modal._closeTimer);
  modal._closeTimer = window.setTimeout(() => {
    modal.classList.remove('is-open', 'is-closing');
    modal.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.lightbox.is-open, .pricing-modal.is-open')) {
      body.classList.remove('lightbox-open');
    }
  }, closeMotionMs);
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

prepareStaggerGroups();

if (!reducedMotion) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      setVisibleState(entry.target, true);
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  revealTargets.forEach(target => revealObserver.observe(target));

  if (manifestoSection) {
    const manifestoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.45;

        if (visible) {
          if (manifestoArt) {
            manifestoArt.classList.remove('in-view');
            void manifestoArt.offsetWidth;
            manifestoArt.classList.add('in-view');
          }
          manifestoTypeTargets.forEach(target => {
            target.classList.remove('in-view');
            void target.offsetWidth;
            target.classList.add('in-view');
          });
          manifestoObserver.unobserve(entry.target);
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
          eventsObserver.unobserve(entry.target);
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
  revealTargets.forEach(target => setVisibleState(target, true));
  manifestoTypeTargets.forEach(target => target.classList.add('in-view', 'is-visible'));
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
window.addEventListener('resize', syncHeaderOffset);
window.addEventListener('load', syncHeaderOffset);
window.addEventListener('hashchange', () => {
  if (location.hash) {
    scrollToSection(location.hash, { pushState: false });
  }
});
syncHeaderOffset();
setProgress();
setScene(panels[0]);

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const hash = link.getAttribute('href');
    if (!hash || !hash.startsWith('#')) return;

    const target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();
    scrollToSection(hash);
  });
});

if (location.hash) {
  requestAnimationFrame(() => {
    scrollToSection(location.hash, { pushState: false });
  });
}

const serviceStack = document.querySelector('.service-menu, .service-stack');
function activateServiceCard(card) {
  const nextCard = card || serviceCards[0];
  if (!nextCard) return;

  window.clearTimeout(serviceCardSwapTimer);
  serviceCards.forEach(item => item.classList.add('is-changing'));
  serviceCardSwapTimer = window.setTimeout(() => {
    serviceCards.forEach(item => {
      const active = item === nextCard;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
      item.classList.remove('is-changing');
    });
  }, 180);
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
    button.addEventListener('click', () => {
      setPosterPreview(button);
      const targetId = button.dataset.sectionTarget;
      if (targetId) {
        scrollToSection(`#${targetId}`);
      }
    });
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
