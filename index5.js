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
    let newElement = this.renderElement()
    oldElement.parentNode.replaceChild(newElement, oldElement)
  }
  renderElement () {
    // 把模板字符串转换成真实的DOM
    let renderString = this.render()
    this.domElement = this.createDOMFromDOMString(renderString)
    this.domElement.addEventListener('click', this.add.bind(this))
    return this.domElement
  }
  mount (container) {
    // 挂载
    container.appendChild(this.renderElement())
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
    return `<button id="counter-app">${this.state.number}</button>`
  }
}

// 父类提取
