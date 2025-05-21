// src/services/tabHandlerService.js
export class TabHandlerService {
  constructor(config, domService, extractionService) {
    this.config = config;
    this.dom = domService;
    this.bracketRegex = /\[([^\]]+)\]/g;
    this.extractionService = extractionService
    this.keyActions = {
      [this.config.keys.cpfCopy.toUpperCase()]: () => this.extractionService.extractCPF(),
      [this.config.keys.nameCopy.toUpperCase()]: () => this.extractionService.extractName(),
    };
  }

  capitalizeFirstName(fullName) {
    const [first] = fullName.split(' ');
    return first
      ? first.charAt(0).toUpperCase() + first.slice(1).toLowerCase()
      : '';
  }

  transform(text) {
    return text.replace(/\{([^}]+)\}/g, (_, name) => this.capitalizeFirstName(name.trim()));
  }

  findBrackets(text) {
    const matches = [];
    let m;
    while ((m = this.bracketRegex.exec(text))) {
      matches.push({ start: m.index, end: this.bracketRegex.lastIndex -1 });
    }
    return matches;
  }

  async handleTab(event) {
    if (event.key !== 'Tab' || !event.target.matches(this.config.selectors.editableChatbox)) return;

    setTimeout(async () => {
      const el = event.target;
      const raw = el.innerText.trim();
      const transformed = this.transform(raw);

      el.innerText = transformed;
      await this.dom.waitNextFrame();

      const brackets = this.findBrackets(transformed);
      const selection = window.getSelection();

      if (brackets.length && selection) {
        const { start, end } = brackets[0];
        const startNode = this._getNodeAt(el, start);
        const endNode = this._getNodeAt(el, end + 1);
        if (startNode && endNode) {
          const range = document.createRange();
          range.setStart(startNode.node, startNode.offset);
          range.setEnd(endNode.node, endNode.offset);
          selection.removeAllRanges();
          selection.addRange(range);
        } else {
          this._moveCursorToEnd(el, selection);
        }
      } else {
        this._moveCursorToEnd(el, selection);
      }
    }, 0);
  }

  handleCtrlShiftKeyDown(event) {
    if (event.ctrlKey && event.shiftKey) {
      const actionKey = event.key.toUpperCase();
      const action = this.keyActions[actionKey]; 

      if (action) {
        event.preventDefault();
        action();
      }
    }
  }

  attachListeners() {
    document.addEventListener('keydown', e => this.handleCtrlShiftKeyDown(e), true);
    document.addEventListener('keydown', e => this.handleTab(e), true);
  }

  _getNodeAt(root, index) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let count = 0, node;
    while ((node = walker.nextNode())) {
      const len = node.nodeValue.length;
      if (count + len >= index) return { node, offset: index - count };
      count += len;
    }
    return null;
  }

  _moveCursorToEnd(el, selection) {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    el.scrollTop = el.scrollHeight;
  }
}
