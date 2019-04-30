class Component {
  constructor (props) {
    this.props = props
  }
  createDOMFromDOMString (domString) {
    let div = document.createElement('div');
    div.innerHTML = domString;
    return div.children[0]
  }
  setState (partialState) {
    // 部分状态，会合并
    this.state = Object.assign(this.state, partialState)
    let oldElement = this.domElement
    let newElement = this.render()
    oldElement.parentNode.replaceChild(newElement, oldElement)
  }
}

class Counter extends Component {
  constructor (props) {
    // 属性
    super(props)
    this.state = {
      number: 0
    }
  }
  add () {
    this.setState({
      number: this.state.number + 1
    })
  }
  render () {
    this.domElement = this.createDOMFromDOMString(`<button id="counter-app">${this.state.number}</button>`)
    this.domElement.addEventListener('click', this.add.bind(this))
    return this.domElement
  }
}

// 父类提取
