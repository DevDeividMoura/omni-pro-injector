// src/main.js
import { CONFIG } from './config.js';
import { DomService } from './utils/domService.js';
import { ClipboardService } from './utils/clipboardService.js';
import { ExtractionService } from './services/extractionService.js';
import { TabHandlerService } from './services/tabHandlerService.js';

const domService = new DomService(CONFIG);
const clipboardService = new ClipboardService();
const extractionService = new ExtractionService(CONFIG, domService, clipboardService);
const tabHandler = new TabHandlerService(CONFIG, domService, extractionService);

// Injeta estilos em #tabs
domService.applyStyles(CONFIG.selectors.tabs, {
  float: 'right',
  maxHeight: '72vh',
  overflowY: 'auto'
});

// Anexa listeners
tabHandler.attachListeners(extractionService);

console.log('OmniPro Injector carregado com Clean Architecture e SOLID.');
