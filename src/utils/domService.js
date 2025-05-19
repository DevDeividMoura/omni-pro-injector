// src/utils/domService.js
export class DomService {
  constructor(config) {
    this.config = config;
  }

  query(selector) {
    return document.querySelector(selector);
  }

  queryAll(selector) {
    return Array.from(document.querySelectorAll(selector));
  }

  applyStyles(selector, styles) {
    const el = this.query(selector);
    if (!el) {
      console.warn(`Elemento ${selector} não encontrado.`);
      return;
    }
    Object.assign(el.style, styles);
    console.log(`Estilos aplicados em ${selector}.`);
  }

  waitNextFrame() {
    return new Promise(resolve => requestAnimationFrame(resolve));
  }

  getTextSafely(el) {
    return el?.textContent?.trim() || '';
  }
}
