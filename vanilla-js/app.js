class NameManager {
  constructor(container) {
    this.container = container
    this.nameList = container.querySelector('.name-inputs');
    this.container.addEventListener('submit', this.addName.bind(this))
  }

  addName(e) {
    e.preventDefault()
    // todo
  }

  getNames() {
    // todo
  }
}

class ResultManager {
  constructor(container, nameManager) {
    this.nameManager = nameManager;
    this.container = container;

    this.init();
  }

  init() {
    this.clear();
    const button = document.createElement('button');
    button.classList.add('big-button');
    button.textContent = 'Find Out';
    this.container.appendChild(button);
    button.addEventListener('click', this.getResults.bind(this))
  }

  clear() {
    while (this.container.hasChildNodes()) {
      this.container.lastChild.remove();
    }
  }

  async getResults() {
    const filteredNames = this.nameManager.getNames().filter(name => name !== '');
    if (!filteredNames.length) return;

    // todo
  }

  renderResults(results) {
    this.clear()
    const resultEl = document.createElement('div');
    const sortedResults = [...results.sort((a, b) => b.age - a.age)];

    const winnerEl = document.createElement('h1');
    winnerEl.textContent = `${sortedResults[0].name} is ${sortedResults[0].age}!`
    resultEl.appendChild(winnerEl);

    if (sortedResults.length > 1) {
      const restEl = document.createElement('div');
      const restContent = sortedResults.slice(1).map(r => `${r.name} (${r.age})`);
      restEl.textContent = `Followed by: ${restContent}`;
      resultEl.appendChild(restEl);
    }

    this.container.appendChild(resultEl);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  // todo
});

