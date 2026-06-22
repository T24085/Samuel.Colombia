const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const body = document.body;
const siteHeader = document.querySelector('.site-header');
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
const chatAssistantName = 'Nova';
const chatSiteKey = 'samuel-studio-colombia';
const chatContactEmail = 'capture@samuel.studio';
const chatBookingUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScCqxvBZ6NTmwh-qyphZyjKzdhz3-jouihSZjAXhRMkBaRpxw/viewform?usp=header';
const chatModelCandidates = ['gemma4:12b', 'gemma3:12b', 'llama3.1:8b', 'qwen2.5:7b'];
const chatBaseUrl = ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname) ? '' : 'https://chat.samuel.studio';
const assistantChatUrl = chatBaseUrl ? `${chatBaseUrl}/api/assistant-chat` : '/api/assistant-chat';
const chatLogEndpoint = chatBaseUrl ? `${chatBaseUrl}/api/chat-log` : '/api/chat-log';
const assistantSystemPrompt = `
You are ${chatAssistantName}, the website assistant for Samuel Studio Colombia.
Keep replies concise, direct, and photography-focused.
Use the booking form or email when the user wants to book.
`.trim();
const chatStarterPrompts = [
  'Which service fits an editorial campaign?',
  'What should I send for a custom quote?',
  'How do I book a session?',
  'Do you do personal branding portraits?',
];
const chatStorageKey = `samuel-studio-assistant-chat:${chatSiteKey}`;
const chatRequestTimeoutMs = 45000;

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
      { src: 'assets/Websites/nova-riven-website.png', alt: 'Nova Riven website preview screenshot' },
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

function createChatId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `chat_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function normalizeChatProfile(profile) {
  if (!profile) {
    return null;
  }

  const name = typeof profile.name === 'string' ? profile.name.trim() : '';
  const email = typeof profile.email === 'string' ? profile.email.trim() : '';
  const phone = typeof profile.phone === 'string' ? profile.phone.trim() : '';

  if (!name || !email || !phone) {
    return null;
  }

  return { name, email, phone };
}

function createChatGreeting(profile) {
  const greetingName = profile?.name?.trim();

  return {
    id: createChatId(),
    role: 'assistant',
    content: greetingName
      ? `${chatAssistantName} is ready, ${greetingName}. Tell me what kind of session you need, what the images are for, and when you want to shoot.`
      : `${chatAssistantName} is ready. Tell me what kind of session you need, what the images are for, and when you want to shoot.`,
    createdAt: Date.now(),
    source: 'seed',
  };
}

function loadChatState() {
  if (typeof window === 'undefined') {
    return {
      sessionId: createChatId(),
      messages: [createChatGreeting()],
      clientProfile: null,
    };
  }

  try {
    const raw = window.localStorage.getItem(chatStorageKey);

    if (raw) {
      const parsed = JSON.parse(raw);
      const clientProfile = normalizeChatProfile(parsed.clientProfile);

      if (typeof parsed.sessionId === 'string' && Array.isArray(parsed.messages) && parsed.messages.length > 0) {
        return {
          sessionId: parsed.sessionId,
          messages: parsed.messages,
          clientProfile,
        };
      }
    }
  } catch {
    // Start a fresh session when storage is missing or corrupt.
  }

  return {
    sessionId: createChatId(),
    messages: [createChatGreeting()],
    clientProfile: null,
  };
}

function saveChatState(state) {
  window.localStorage.setItem(chatStorageKey, JSON.stringify(state));
}

function buildChatFallbackReply(userText) {
  const query = userText.toLowerCase();

  if (query.includes('price') || query.includes('pricing') || query.includes('cost') || query.includes('quote') || query.includes('rate') || query.includes('budget')) {
    return [
      'Samuel Studio Colombia uses custom quotes instead of fixed pricing.',
      'Send the session type, use case, location, and timing through the booking form or by email.',
      `Booking form: ${chatBookingUrl}. Email: ${chatContactEmail}.`,
    ].join(' ');
  }

  if (query.includes('book') || query.includes('booking') || query.includes('schedule') || query.includes('availability') || query.includes('date')) {
    return [
      'Use the booking form to request a session.',
      'Include the session type, preferred date, location, and any reference images so the studio has enough context.',
      `Booking form: ${chatBookingUrl}. Email: ${chatContactEmail}.`,
    ].join(' ');
  }

  if (query.includes('editorial') || query.includes('campaign') || query.includes('brand') || query.includes('launch') || query.includes('fashion') || query.includes('commercial')) {
    return [
      'Editorial & Campaign Work is the best fit.',
      'It is built for launch visuals, brand imagery, and a more controlled editorial look.',
      'What is the launch date and what will the images be used for?',
    ].join(' ');
  }

  if (query.includes('identity') || query.includes('personal brand') || query.includes('founder') || query.includes('speaker') || query.includes('professional') || query.includes('headshot') || query.includes('portrait')) {
    return [
      'Personal Identity is the best fit.',
      'It works well for founders, creatives, speakers, and visible professionals who need a polished portrait library.',
      'What platform or website will the images support?',
    ].join(' ');
  }

  if (query.includes('story') || query.includes('lifestyle') || query.includes('concept') || query.includes('narrative') || query.includes('launch visuals')) {
    return [
      'Visual Story Projects is the best fit.',
      'It is the route for narrative ideas, concept-led shoots, and image sequences that need pacing.',
      'What story are you trying to tell?',
    ].join(' ');
  }

  if (query.includes('family') || query.includes('couple') || query.includes('private') || query.includes('milestone')) {
    return [
      'Private Portraits is the best fit.',
      'It is built for individuals, couples, families, and milestone sessions that need a calm, guided approach.',
      'What is the occasion and where would you like to shoot?',
    ].join(' ');
  }

  return 'Tell me what kind of session you need, what the images are for, and when you want to shoot.';
}

function buildChatTranscriptMessages(conversation) {
  return conversation
    .filter(message => message.source !== 'seed')
    .map(message => ({
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.createdAt,
      source: message.source,
      model: message.model,
    }));
}

function appendFormattedText(parent, text) {
  const parts = String(text || '').split(/(https?:\/\/[^\s<]+)|(\n)/g);

  parts.forEach(part => {
    if (!part) return;

    if (part === '\n') {
      parent.appendChild(document.createElement('br'));
      return;
    }

    if (/^https?:\/\//.test(part)) {
      const link = document.createElement('a');
      link.href = part;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = part;
      parent.appendChild(link);
      return;
    }

    parent.appendChild(document.createTextNode(part));
  });
}

async function requestChatReply(payload) {
  let lastError = null;

  for (const model of chatModelCandidates) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), chatRequestTimeoutMs);

    try {
      const response = await fetch(assistantChatUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          assistant: chatAssistantName,
          sessionId: payload.sessionId,
          pageUrl: payload.pageUrl,
          siteKey: payload.siteKey,
          clientProfile: payload.clientProfile,
          systemPrompt: assistantSystemPrompt,
          modelCandidates: chatModelCandidates,
          model,
          messages: payload.messages,
          userText: payload.userText,
        }),
      });

      if (!response.ok) {
        lastError = new Error(`Assistant request failed with status ${response.status}`);
        continue;
      }

      const data = await response.json();
      const content = typeof data.content === 'string' ? data.content.trim() : '';

      if (content) {
        return {
          content,
          model: typeof data.model === 'string' && data.model.trim() ? data.model.trim() : model,
          usedFallback: Boolean(data.usedFallback),
        };
      }
    } catch (error) {
      lastError = error;
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  return {
    content: buildChatFallbackReply(payload.userText),
    model: 'fallback',
    usedFallback: true,
    error: lastError instanceof Error ? lastError.message : 'Assistant request failed.',
  };
}

async function persistChatTranscript(payload) {
  if (!chatLogEndpoint) {
    return;
  }

  const body = JSON.stringify({
    assistant: chatAssistantName,
    sessionId: payload.sessionId,
    pageUrl: payload.pageUrl,
    siteKey: payload.siteKey,
    model: payload.model,
    clientProfile: payload.clientProfile,
    loggedAt: new Date().toISOString(),
    sendEmail: payload.sendEmail ?? false,
    messages: payload.messages,
  });

  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    const sent = navigator.sendBeacon(chatLogEndpoint, new Blob([body], { type: 'application/json' }));

    if (sent) {
      return;
    }
  }

  await fetch(chatLogEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    keepalive: true,
  });
}

function initChatWidget() {
  const initialState = loadChatState();
  let sessionId = initialState.sessionId;
  let messages = initialState.messages;
  let clientProfile = initialState.clientProfile;
  let intakeDraft = {
    name: initialState.clientProfile?.name || '',
    email: initialState.clientProfile?.email || '',
    phone: initialState.clientProfile?.phone || '',
  };
  let open = false;
  let sending = false;
  let showSuggestions = false;
  let chatRoot = null;

  const chatWidget = document.createElement('div');
  chatWidget.className = 'chat-widget';
  chatWidget.innerHTML = `
    <button class="chat-widget__launcher" type="button" data-chat-launcher aria-expanded="false" aria-controls="samuel-chat-panel" aria-label="Chat with Nova">
      <span class="chat-widget__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
          <path d="M4 5h16v10H8.75L5 18.5V5Z" fill="currentColor"></path>
          <path d="M7.5 9h9M7.5 12h6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.6"></path>
        </svg>
      </span>
      <span class="chat-widget__copy">
        <strong>Chat with Nova</strong>
        <span>Ask about a session</span>
      </span>
    </button>

    <section class="chat-widget__panel" id="samuel-chat-panel" data-chat-panel aria-label="Website assistant" hidden>
      <header class="chat-widget__header">
        <div class="chat-widget__brand">
          <p>Local assistant</p>
          <h2>${chatAssistantName}</h2>
        </div>
        <button class="chat-widget__close" type="button" data-chat-close aria-label="Close chat assistant">×</button>
      </header>

      <div class="chat-widget__status">
        <span data-chat-status>Need details</span>
        <span>Samuel Studio Colombia</span>
      </div>

      <div class="chat-widget__intake" data-chat-intake-view>
        <p class="chat-widget__lede">Before we start, tell me who this session is for.</p>
        <p class="chat-widget__sublede">I need a name, email, and phone number so the conversation can be saved and forwarded later if needed.</p>

        <form class="chat-widget__intake-form" data-chat-intake-form>
          <label class="chat-widget__field">
            <span>Name</span>
            <input type="text" name="name" placeholder="Client name" autocomplete="name" required />
          </label>

          <label class="chat-widget__field">
            <span>Email</span>
            <input type="email" name="email" placeholder="client@example.com" autocomplete="email" required />
          </label>

          <label class="chat-widget__field">
            <span>Phone</span>
            <input type="tel" name="phone" placeholder="(555) 123-4567" autocomplete="tel" required />
          </label>

          <p class="chat-widget__error" data-chat-intake-error aria-live="polite"></p>

          <div class="chat-widget__actions">
            <button class="chat-widget__button chat-widget__button--ghost" type="button" data-chat-reset>Reset</button>
            <button class="chat-widget__button" type="submit">Start chat</button>
          </div>
        </form>
      </div>

      <div class="chat-widget__conversation" data-chat-conversation hidden>
        <div class="chat-widget__log" data-chat-log role="log" aria-live="polite"></div>

        <button class="chat-widget__toggle" type="button" data-chat-toggle-suggestions aria-expanded="false">
          <span>Suggested questions</span>
          <span data-chat-toggle-label>Show</span>
        </button>

        <div class="chat-widget__suggestions" data-chat-suggestions hidden>
          ${chatStarterPrompts.map(prompt => `<button class="chat-widget__suggestion" type="button" data-chat-suggestion>${prompt}</button>`).join('')}
        </div>

        <form class="chat-widget__composer" data-chat-form>
          <label class="sr-only" for="samuel-chat-input">Message Nova</label>
          <textarea id="samuel-chat-input" class="chat-widget__input" data-chat-input rows="3" placeholder="Ask about pricing, services, or booking..."></textarea>

          <div class="chat-widget__composer-footer">
            <p class="chat-widget__error" data-chat-error aria-live="polite"></p>
            <div class="chat-widget__actions">
              <button class="chat-widget__button chat-widget__button--ghost" type="button" data-chat-reset>Reset</button>
              <button class="chat-widget__button" type="submit" data-chat-send>Send</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  `;

  body.appendChild(chatWidget);

  chatRoot = chatWidget;

  const chatLauncher = chatWidget.querySelector('[data-chat-launcher]');
  const chatPanel = chatWidget.querySelector('[data-chat-panel]');
  const chatStatus = chatWidget.querySelector('[data-chat-status]');
  const chatClose = chatWidget.querySelector('[data-chat-close]');
  const chatIntakeView = chatWidget.querySelector('[data-chat-intake-view]');
  const chatConversationView = chatWidget.querySelector('[data-chat-conversation]');
  const chatIntakeForm = chatWidget.querySelector('[data-chat-intake-form]');
  const chatIntakeError = chatWidget.querySelector('[data-chat-intake-error]');
  const chatLog = chatWidget.querySelector('[data-chat-log]');
  const chatForm = chatWidget.querySelector('[data-chat-form]');
  const chatInput = chatWidget.querySelector('[data-chat-input]');
  const chatError = chatWidget.querySelector('[data-chat-error]');
  const chatSend = chatWidget.querySelector('[data-chat-send]');
  const chatToggleSuggestions = chatWidget.querySelector('[data-chat-toggle-suggestions]');
  const chatToggleLabel = chatWidget.querySelector('[data-chat-toggle-label]');
  const chatSuggestions = [...chatWidget.querySelectorAll('[data-chat-suggestion]')];
  const chatResets = [...chatWidget.querySelectorAll('[data-chat-reset]')];
  const intakeInputs = {
    name: chatIntakeForm?.querySelector('input[name="name"]'),
    email: chatIntakeForm?.querySelector('input[name="email"]'),
    phone: chatIntakeForm?.querySelector('input[name="phone"]'),
  };

  function renderMessages() {
    if (!chatLog) return;

    chatLog.replaceChildren();

    messages.forEach(message => {
      const article = document.createElement('article');
      article.className = `chat-widget__message ${message.role === 'user' ? 'chat-widget__message--user' : 'chat-widget__message--assistant'}`;

      const meta = document.createElement('div');
      meta.className = 'chat-widget__message-meta';
      const label = document.createElement('span');
      label.textContent = message.role === 'user' ? 'Client' : message.source === 'fallback' ? 'Fallback' : chatAssistantName;
      const siteLabel = document.createElement('span');
      siteLabel.textContent = 'Samuel Studio Colombia';
      meta.append(label, siteLabel);

      const content = document.createElement('div');
      content.className = 'chat-widget__message-copy';
      appendFormattedText(content, message.content);

      article.append(meta, content);
      chatLog.appendChild(article);
    });

    if (sending) {
      const typing = document.createElement('article');
      typing.className = 'chat-widget__message chat-widget__message--assistant';
      const meta = document.createElement('div');
      meta.className = 'chat-widget__message-meta';
      const label = document.createElement('span');
      label.textContent = `${chatAssistantName} is thinking`;
      const siteLabel = document.createElement('span');
      siteLabel.textContent = 'Samuel Studio Colombia';
      meta.append(label, siteLabel);
      const content = document.createElement('div');
      content.className = 'chat-widget__message-copy chat-widget__message-copy--typing';
      content.textContent = '•••';
      typing.append(meta, content);
      chatLog.appendChild(typing);
    }

    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function renderWidget() {
    if (!chatRoot || !chatPanel || !chatLauncher || !chatStatus || !chatIntakeView || !chatConversationView) {
      return;
    }

    chatRoot.classList.toggle('is-open', open);
    chatPanel.hidden = !open;
    chatLauncher.setAttribute('aria-expanded', String(open));
    chatStatus.textContent = sending ? 'Thinking' : clientProfile ? 'Ready' : 'Need details';

    const hasProfile = Boolean(clientProfile);
    chatIntakeView.hidden = hasProfile;
    chatConversationView.hidden = !hasProfile;

    if (intakeInputs.name) intakeInputs.name.value = intakeDraft.name;
    if (intakeInputs.email) intakeInputs.email.value = intakeDraft.email;
    if (intakeInputs.phone) intakeInputs.phone.value = intakeDraft.phone;

    if (chatIntakeError && !chatIntakeView.hidden) {
      chatIntakeError.textContent = '';
    }

    if (chatToggleSuggestions && chatToggleLabel) {
      chatToggleSuggestions.setAttribute('aria-expanded', String(showSuggestions));
      chatToggleLabel.textContent = showSuggestions ? 'Hide' : 'Show';
    }

    if (chatSend) {
      chatSend.disabled = sending;
      chatSend.textContent = sending ? 'Sending' : 'Send';
    }

    chatSuggestions.forEach(button => {
      button.hidden = !showSuggestions;
    });

    renderMessages();
  }

  function openChat() {
    open = true;
    renderWidget();

    window.setTimeout(() => {
      if (clientProfile) {
        chatInput?.focus();
      } else {
        intakeInputs.name?.focus();
      }
    }, 0);
  }

  function closeChat() {
    open = false;
    renderWidget();
  }

  function resetChat() {
    const nextSessionId = createChatId();
    sessionId = nextSessionId;
    messages = [createChatGreeting()];
    clientProfile = null;
    intakeDraft = { name: '', email: '', phone: '' };
    sending = false;
    showSuggestions = false;
    saveChatState({
      sessionId,
      messages,
      clientProfile,
    });
    renderWidget();
    closeChat();
  }

  function syncAndPersist() {
    saveChatState({
      sessionId,
      messages,
      clientProfile,
    });

    void persistChatTranscript({
      sessionId,
      pageUrl: window.location.href,
      siteKey: chatSiteKey,
      model: chatModelCandidates[0] || 'unknown-model',
      clientProfile,
      messages,
      sendEmail: false,
    }).catch(() => undefined);
  }

  async function submitIntake(event) {
    event.preventDefault();

    const nextProfile = normalizeChatProfile(intakeDraft);

    if (!nextProfile) {
      if (chatIntakeError) {
        chatIntakeError.textContent = 'Please add your name, email, and phone before starting the chat.';
      }
      return;
    }

    clientProfile = nextProfile;
    messages = [createChatGreeting(nextProfile)];
    open = true;
    showSuggestions = false;
    syncAndPersist();
    renderWidget();

    window.setTimeout(() => {
      chatInput?.focus();
    }, 0);
  }

  async function submitMessage(messageText) {
    const content = String(messageText || '').trim();

    if (!content || sending || !clientProfile) {
      return;
    }

    if (chatError) {
      chatError.textContent = '';
    }

    sending = true;

    const userMessage = {
      id: createChatId(),
      role: 'user',
      content,
      createdAt: Date.now(),
    };

    const conversation = [...messages, userMessage];
    messages = conversation;
    if (chatInput) {
      chatInput.value = '';
    }
    renderWidget();

    try {
      const reply = await requestChatReply({
        assistant: chatAssistantName,
        sessionId,
        pageUrl: window.location.href,
        siteKey: chatSiteKey,
        clientProfile,
        messages: buildChatTranscriptMessages(conversation),
        userText: content,
      });

      const assistantMessage = {
        id: createChatId(),
        role: 'assistant',
        content: reply.content || 'I can help plan a session, match the right service, or capture your booking details. Try asking about pricing, scheduling, or which service fits your project.',
        createdAt: Date.now(),
        source: reply.usedFallback ? 'fallback' : 'ollama',
        model: reply.model,
      };

      messages = [...conversation, assistantMessage];
      syncAndPersist();
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'The assistant is temporarily unavailable.';
      if (chatError) {
        chatError.textContent = message;
      }

      const fallbackMessage = {
        id: createChatId(),
        role: 'assistant',
        content: 'I am having trouble reaching the local model right now. Check that Ollama is running, then share the session type, date, location, and use case so I can still capture the brief.',
        createdAt: Date.now(),
        source: 'fallback',
        model: chatModelCandidates[0] || 'unknown-model',
      };

      messages = [...conversation, fallbackMessage];
      syncAndPersist();
    } finally {
      sending = false;
      renderWidget();
    }
  }

  chatLauncher?.addEventListener('click', () => {
    open = !open;
    renderWidget();

    if (open) {
      window.setTimeout(() => {
        if (clientProfile) {
          chatInput?.focus();
        } else {
          intakeInputs.name?.focus();
        }
      }, 0);
    }
  });

  chatClose?.addEventListener('click', closeChat);

  chatIntakeForm?.addEventListener('submit', submitIntake);
  chatForm?.addEventListener('submit', event => {
    event.preventDefault();
    void submitMessage(chatInput?.value || '');
  });

  chatInput?.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void submitMessage(chatInput.value);
    }
  });

  if (chatIntakeForm) {
    chatIntakeForm.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        intakeDraft = {
          name: String(intakeInputs.name?.value || '').trim(),
          email: String(intakeInputs.email?.value || '').trim(),
          phone: String(intakeInputs.phone?.value || '').trim(),
        };
        if (chatIntakeError) {
          chatIntakeError.textContent = '';
        }
      });
    });
  }

  chatToggleSuggestions?.addEventListener('click', () => {
    showSuggestions = !showSuggestions;
    renderWidget();
  });

  chatSuggestions.forEach(button => {
    button.addEventListener('click', () => {
      if (!clientProfile) {
        openChat();
        return;
      }

      void submitMessage(button.textContent || '');
    });
  });

  chatResets.forEach(button => {
    button.addEventListener('click', resetChat);
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && open) {
      closeChat();
    }
  });

  renderWidget();
}

initChatWidget();
