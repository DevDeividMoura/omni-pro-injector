// src/utils/clipboardService.js
export class ClipboardService {
  copy(text, label) {
    if (!text) {
      console.warn(`Nenhum ${label} válido encontrado para copiar.`);
      return;
    }
    navigator.clipboard.writeText(text)
      .then(() => console.log(`${label} copiado: ${text}`))
      .catch(err => console.error(`Erro ao copiar ${label}:`, err));
  }
}
