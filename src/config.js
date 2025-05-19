// src/config.js
export const CONFIG = Object.freeze({
  selectors: {
    conversaContainer: '.tab-pane.active .conversa.col-lg-12',
    editableChatbox: "#Abas .tab-pane.active .faketextbox.pastable[contenteditable='true']",
    cpfLabelElement: 'small > strong',
    matriculaElement: 'small',
    tabs: '#tabs'
  },
  textMarkers: {
    cpfLabel: 'CPF Cliente:',
    matriculaIndicator: 'Matrícula:',
    matriculaSeparator: ' - '
  },
  keys: {
    cpfCopy: 'C',
    nameCopy: 'X'
  }
});
