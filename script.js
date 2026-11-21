"use strict";

/* ========================== NAVIGATION START ========================== */
const dropdownTriggers = Array.from(document.querySelectorAll('.nav-menu-trigger'));
const mobileMenuButton = document.querySelector('#mobile-menu-btn');
const mobileNavigation = document.querySelector('#mobile-nav');
const dialog = document.querySelector('#app-dialog');
const dialogContent = document.querySelector('#dialog-content');
const toast = document.querySelector('#toast');
let lastTrigger = null;
let toastTimeout;
let demoStep = 0;

function closeDropdowns(except = null) {
  dropdownTriggers.forEach((trigger) => {
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (panel !== except) {
      panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

dropdownTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.stopPropagation();
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    const shouldOpen = panel.hidden;
    closeDropdowns();
    panel.hidden = !shouldOpen;
    trigger.setAttribute('aria-expanded', String(shouldOpen));
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-dropdown')) closeDropdowns();
  if (!event.target.closest('#mobile-nav') && !event.target.closest('#mobile-menu-btn')) closeMobileMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeDropdowns();
    closeMobileMenu();
  }
});

function closeMobileMenu() {
  mobileNavigation.hidden = true;
  mobileMenuButton.setAttribute('aria-expanded', 'false');
  mobileMenuButton.setAttribute('aria-label', 'Open navigation menu');
  mobileMenuButton.querySelector('ion-icon').setAttribute('name', 'menu-outline');
}

mobileMenuButton.addEventListener('click', () => {
  const shouldOpen = mobileNavigation.hidden;
  mobileNavigation.hidden = !shouldOpen;
  mobileMenuButton.setAttribute('aria-expanded', String(shouldOpen));
  mobileMenuButton.setAttribute('aria-label', shouldOpen ? 'Close navigation menu' : 'Open navigation menu');
  mobileMenuButton.querySelector('ion-icon').setAttribute('name', shouldOpen ? 'close-outline' : 'menu-outline');
  closeDropdowns();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 880) closeMobileMenu();
});
/* ========================== NAVIGATION END ========================== */

/* ========================== DIALOG CONTENT START ========================== */
const icon = (name) => `<ion-icon name="${name}" aria-hidden="true"></ion-icon>`;
const card = (name, title, description) => `<div class="info-card">${icon(name)}<div><h3>${title}</h3><p>${description}</p></div></div>`;
const header = (glyph, kicker, title, description) => `<div class="dialog-kicker">${icon(glyph)}${kicker}</div><h2 id="dialog-title">${title}</h2><p class="dialog-lead">${description}</p>`;

const dialogViews = {
  login: () => `${header('log-in-outline', 'Welcome back', 'Log in to Zentask', 'A preview of the sign-in experience. Connect your own authentication service before going live.')}
    <form data-demo-form="login"><label class="form-label" for="login-email">Email address</label><input class="form-input" type="email" id="login-email" name="email" autocomplete="email" placeholder="you@company.com" required />
    <label class="form-label" for="login-password">Password</label><input class="form-input" type="password" id="login-password" name="password" autocomplete="current-password" minlength="8" placeholder="At least 8 characters" required />
    <button class="btn btn-primary form-submit" type="submit">Continue</button><p class="form-caption">Front-end preview only. No information is sent or stored.</p></form>`,
  signup: () => `${header('sparkles-outline', 'Get started', 'Make more room for what matters', 'Start with a cleaner, more organized workflow. This form previews the future registration experience.')}
    <form data-demo-form="signup"><label class="form-label" for="signup-name">Your name</label><input class="form-input" type="text" id="signup-name" name="name" autocomplete="name" placeholder="Your full name" required minlength="2" />
    <label class="form-label" for="signup-email">Work email</label><input class="form-input" type="email" id="signup-email" name="email" autocomplete="email" placeholder="you@company.com" required />
    <button class="btn btn-primary form-submit" type="submit">Start Free</button><p class="form-caption">No account will be created in this static demo.</p></form>`,
  pricing: () => `${header('pricetag-outline', 'Simple pricing', 'Plans built around your work', 'Explore an illustrative pricing interface. Final plan details are not connected to a billing system.')}
    <div class="mini-switch" role="group" aria-label="Billing interval"><button type="button" class="active" data-billing="monthly" aria-pressed="true">Monthly</button><button type="button" data-billing="yearly" aria-pressed="false">Yearly</button></div>
    <div class="price-row"><span class="price-amount" id="demo-price">$0</span><span class="price-period" id="demo-period">/mo · preview value</span></div>
    ${card('checkmark-circle-outline','Essential features','Personal tasks, organized lists, and a clean view of your priorities.')}
    <button type="button" class="btn btn-primary form-submit" data-open="signup">Try Zentask Free</button>`,
  blogs: () => `${header('newspaper-outline', 'The Zentask journal', 'Better work starts with better habits', 'A preview of editorial content for the future blog.')}
    ${card('bulb-outline','5 small ways to reclaim your focus','Practical tips for building a calmer, more effective workday.')}
    ${card('calendar-outline','Make your weekly planning work','A lightweight routine for choosing what deserves attention.')}
    ${card('flash-outline','When to automate repeat tasks','Identify everyday processes that are worth simplifying.')}`,
  faqs: () => `${header('help-circle-outline', 'Questions & answers', 'Frequently asked questions', 'A quick look at the Zentask homepage demo.')}
    <div class="faq-list"><details><summary>What is Zentask?</summary><p>Zentask is presented here as a task-management and workflow-organization product concept.</p></details>
    <details><summary>Can I create an account here?</summary><p>Not yet. This download is a responsive front-end demo. The forms demonstrate validation but are not connected to a server.</p></details>
    <details><summary>Can I change the background, logo, or dashboard image?</summary><p>Yes. Replace the files in assets/images and keep the same file names, or update their paths in the HTML and CSS.</p></details>
    <details><summary>Does it work on mobile?</summary><p>Yes. The navigation, typography, dashboard preview, and dialogs adapt to smaller screens.</p></details></div>`,
  about: () => `${header('people-circle-outline', 'About', 'Less busywork. More momentum.', 'Zentask is a polished product landing-page concept designed around a simple idea: make daily teamwork feel effortless.')}
    ${card('heart-outline','Human-centered','Keep the important work front and center.')}
    ${card('layers-outline','Beautifully organized','Clear surfaces and thoughtful actions without unnecessary noise.')}`,
  contact: () => `${header('chatbubbles-outline', 'Contact', 'Say hello', 'This front-end demo does not include a working inbox, but this contact form is ready to wire up to your preferred email or backend service.')}
    <form data-demo-form="contact"><label class="form-label" for="contact-name">Name</label><input class="form-input" type="text" id="contact-name" name="name" placeholder="Your name" required />
    <label class="form-label" for="contact-email">Email</label><input class="form-input" type="email" id="contact-email" name="email" placeholder="you@company.com" required />
    <button class="btn btn-primary form-submit" type="submit">Preview message</button><p class="form-caption">This form does not send email.</p></form>`,
  'feature-tasks': () => `${header('checkbox-outline', 'Smart tasks', 'Everything you need, in view', 'Keep important work moving with an organized, intuitive task workspace.')}
    ${card('checkmark-done-outline','Prioritized task lists','Bring structure to every project, large or small.')}
    ${card('notifications-outline','Helpful reminders','Know what needs attention without constant checking.')}`,
  'feature-workflows': () => `${header('git-branch-outline', 'Workflow automation', 'Make repeat work automatic', 'Build the foundation for repeatable processes and smoother handoffs.')}
    ${card('repeat-outline','Recurring processes','Reduce the need to recreate routine work.')}
    ${card('flash-outline','Quicker workflows','Spend more time finishing work and less time organizing it.')}`,
  'feature-team': () => `${header('people-outline', 'Team insights', 'A clearer view of the team', 'Understand priorities and people at a glance.')}
    ${card('stats-chart-outline','Useful overview','Surface the numbers and updates that actually matter.')}
    ${card('people-circle-outline','Shared visibility','Help everyone know what comes next.')}`,
  demo: () => `${header('play-circle-outline', 'Product walkthrough', 'See Zentask in action', 'Explore this interactive 3-step front-end walkthrough.')}
    <div class="demo-window" id="demo-window" aria-live="polite"></div>
    <div class="demo-nav"><button type="button" id="demo-back">← Back</button><span class="demo-count" id="demo-count">1 of 3</span><button type="button" id="demo-next">Next →</button></div>
    <button type="button" class="btn btn-primary form-submit" data-open="signup">Start Free</button>`
};

const demoSlides = [
  { icon: 'checkbox-outline', title: 'Organize your day', description: 'Capture tasks and sort what matters most.' },
  { icon: 'git-branch-outline', title: 'Simplify busywork', description: 'See how workflows can connect your team.' },
  { icon: 'analytics-outline', title: 'See the big picture', description: 'Make smarter decisions with useful insights.' }
];

function renderDemoSlide() {
  const area = dialogContent.querySelector('#demo-window');
  if (!area) return;
  const slide = demoSlides[demoStep];
  area.innerHTML = `<div><div class="demo-graphic">${icon(slide.icon)}</div><h3>${slide.title}</h3><p>${slide.description}</p></div>`;
  dialogContent.querySelector('#demo-count').textContent = `${demoStep + 1} of ${demoSlides.length}`;
  dialogContent.querySelector('#demo-back').disabled = demoStep === 0;
  dialogContent.querySelector('#demo-next').textContent = demoStep === demoSlides.length - 1 ? 'Restart ↻' : 'Next →';
}

function openDialog(view, trigger = document.activeElement) {
  const render = dialogViews[view];
  if (!render) return;
  lastTrigger = trigger;
  closeDropdowns();
  closeMobileMenu();
  if (dialog.open) dialog.close();
  dialogContent.innerHTML = render();
  dialog.showModal();
  if (view === 'demo') { demoStep = 0; renderDemoSlide(); }
  if (view === 'pricing') setupPricing();
}

function setupPricing() {
  dialogContent.querySelectorAll('[data-billing]').forEach((button) => {
    button.addEventListener('click', () => {
      const yearly = button.dataset.billing === 'yearly';
      dialogContent.querySelectorAll('[data-billing]').forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      dialogContent.querySelector('#demo-price').textContent = '$0';
      dialogContent.querySelector('#demo-period').textContent = yearly ? '/yr · preview value' : '/mo · preview value';
    });
  });
}

function showToast(message) {
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimeout = window.setTimeout(() => toast.classList.remove('visible'), 4400);
}

// Event delegation handles actions rendered into dialogs as well as navigation.
document.addEventListener('click', (event) => {
  const openButton = event.target.closest('[data-open]');
  if (openButton) openDialog(openButton.dataset.open, openButton);
});

dialogContent.addEventListener('click', (event) => {
  if (event.target.closest('#demo-back') && demoStep > 0) { demoStep -= 1; renderDemoSlide(); }
  if (event.target.closest('#demo-next')) { demoStep = (demoStep + 1) % demoSlides.length; renderDemoSlide(); }
});

dialogContent.addEventListener('submit', (event) => {
  const form = event.target.closest('[data-demo-form]');
  if (!form) return;
  event.preventDefault();
  if (!form.reportValidity()) return;
  dialog.close();
  showToast('Thanks for exploring! This is a front-end demo; nothing was sent or saved.');
});

document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { lastTrigger?.focus({ preventScroll: true }); });
/* ========================== DIALOG CONTENT END ========================== */
