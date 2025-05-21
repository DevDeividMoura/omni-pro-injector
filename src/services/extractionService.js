// src/services/extractionService.js
export class ExtractionService  {
  constructor(config, domService, clipboardService) {
    this.config = config;
    this.dom = domService;
    this.clip = clipboardService;
  }
  extractCPF() {
    const conv = this.dom.query(this.config.selectors.conversaContainer);
    if (!conv) return console.warn("Conversa n\xE3o encontrada para CPF.");

    // MODIFICAÇÃO: Passar 'conv' como contexto
    const el = this.dom.queryAll(this.config.selectors.matriculaElement, conv).find(
      (s) => this.dom.getTextSafely(s.querySelector(this.config.selectors.cpfLabelElement)) === this.config.textMarkers.cpfLabel
    );
    const text = el ? this.dom.getTextSafely(el).split(":")[1]?.trim() : "";
    this.clip.copy(text, "CPF");
  }
  extractName() {
    const conv = this.dom.query(this.config.selectors.conversaContainer);
    if (!conv) return console.warn("Conversa n\xE3o encontrada para Nome.");

    // MODIFICAÇÃO: Passar 'conv' como contexto
    const el = this.dom.queryAll(this.config.selectors.matriculaElement, conv).find(
      (s) => this.dom.getTextSafely(s).includes(this.config.textMarkers.matriculaIndicator)
    );
    const parts = el ? this.dom.getTextSafely(el).split(this.config.textMarkers.matriculaSeparator) : [];
    const name = parts[1]?.trim() || "";
    this.clip.copy(name, "Nome");
  }
};
