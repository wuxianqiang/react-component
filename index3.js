class Counter {
  constructor () {
    this.state = {
      number: 0
    }
  }
  createDOMFromDOMString (domString) {
    let div = document.createElement('div');
    div.innerHTML = domString;
    return div.children[0]
  }
  add () {
    this.state = {number: this.state.number + 1}
    // 还要改变界面，通过节点替换可以改变
    let oldElement = this.domElement
    let newElement = this.render()
    oldElement.parentNode.replaceChild(newElement, oldElement)
  }
  render () {
    this.domElement = this.createDOMFromDOMString(`<button id="counter-app">${this.state.number}</button>`)
    this.domElement.addEventListener('click', this.add.bind(this))
    return this.domElement
  }
}
