import Parser from './parser'
export default class Rigged {

    constructor(options) {
        this.init(options)
        this.build()
    }

    init(options) {
        options = Object.assign({
            container: null,
            template: `div`
        }, options)
        for (let key in options) this[key] = options[key]
    }

    build() {
        this.elements = Parser.parse(this.template)
        this.elements.map(element => {
            if (element._connector)
                this[element._connector] = element
                this.addMethods(element)
        })
        this.element = this.elements[0]
        this.addMethods(this.element)
        if(this.container) this.container.appendChild(this.element)
    }

    /**
    * Magic methods
    */
    addMethods(el){
      el.setStyle = (styles)=>{
        return this.setStyle(styles, el)
      }
      el.remove = ()=>{
        this.remove(el)
      }
      el.clear = ()=>{
        this.clear(el)
      }
      el.selectOne = (selector)=>{
        return this.selectOne(selector, el)
      }
      el.selectAll = (selector)=>{
        return this.selectAll(selector, el)
      }
    }

    setStyle(styles, el){
      for(let key in styles) el.style[key] = styles[key]
      return el
    }

    selectOne(selector, el){
        return el.querySelector(selector)
    }

    selectAll(selector, el){
        return [...el.querySelectorAll(selector)]
    }

    remove(el){
      el.parentElement.removeChild(el)
    }

    clear(el){
      el.innerHTML = ''
    }


}
