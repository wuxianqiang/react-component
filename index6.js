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
    // DOM节点添加属性是组件的实例，DOM和组件关联起来
    this.domElement.component = this
    return this.domElement
  }
  mount (container) {
    // 挂载
    container.appendChild(this.renderElement())
  }
}

window.trigger = function (event, method) {
  console.log(event, method)
  event.target.component[method].call(event.target.component, event)
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
    return `<button id="counter-app" onclick="trigger(event, 'add')">${this.state.number}</button>`
  }
}

// 事件委托
