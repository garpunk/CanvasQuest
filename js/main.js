import { setupLoginModal } from './modal.js';
import './randomArtwork.js';

document.addEventListener('DOMContentLoaded', function () {
  setupLoginModal();

  const playButton = document.querySelector('.play-button'); // Update this with your correct class or ID for the play button
  const quizContainer = document.querySelector('.quiz-container'); // Ensure .quiz-container exists in HTML

  if (!playButton || !quizContainer) {
    console.error('Play button or quiz container not found!');
    return;
  }
});

// theme changer

const themeSelect = document.getElementById('theme-select');

const root = document.documentElement;
const lampImg = document.querySelector('.lamp-img');

const themes = {
  light: {
    '--bs-primary-color': '#1C3D5A',
    '--bs-secondary-color': '#8cc2c7',
    '--bs-body-font-color': '#18354f',
    '--bs-body-bg': '#d8d1c6',
    '--bs-body-bg-hover': '#EBE1DB',
    '--bs-button-color': '#ac8938',
    '--bs-button-hover-color': '#a07c27',

    '--bs-form-color': '#FEF7F2',
    '--bs-form-font-color': '#555',
    '--bs-form-border-color': '#ddd',
    '--bs-form-button-hover-color': '#68a8ae',
    '--bs-form-account-color': '#847d73',
    '--bs-form-account-color-hover': '#4c4841',
    '--bs-form-account-color-hover': 'rgba(106, 97, 85, 0.9)',
    '--lamp-src': 'images/lamp-light.svg',
  },
  dark: {
    '--bs-primary-color': '#EBE1DB',
    '--bs-secondary-color': '#ac8938',
    '--bs-body-font-color': '#EBE1DB',
    '--bs-body-bg': '#2a361f',
    '--bs-body-bg-hover': '#38442d',
    '--bs-button-color': '#ac8938',
    '--bs-button-hover-color': '#a07c27',

    '--bs-form-color': '#46533a',
    '--bs-form-font-color': '#EBE1DB',
    '--bs-form-border-color': '#2a361f',
    '--bs-form-button-hover-color': '#a07c27',
    '--bs-form-account-color': '#b19a64',
    '--bs-form-account-color-hover': '#cab073',
    '--bs-form-account-color-hover': 'rgba(20, 26, 15, 0.9)',
    '--lamp-src': 'images/lamp-dark.svg',
  },
};

function applyTheme(theme) {
  const settings = themes[theme];
  if (!settings) return;

  Object.entries(settings).forEach(([key, value]) => {
    if (key.startsWith('--')) {
      root.style.setProperty(key, value);
    }
  });
  if (lampImg && settings['--lamp-src']) {
    lampImg.src = settings['--lamp-src'];
  }

  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);
themeSelect.value = savedTheme;

themeSelect.addEventListener('change', (e) => {
  applyTheme(e.target.value);
});
