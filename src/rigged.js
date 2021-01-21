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
        this.elements = this.parse(this.template)
        this.elements.map(element => {
            if (element._connector)
                this[element._connector] = element
        })
        this.element = this.elements[0]
        if(this.container) this.container.appendChild(this.element)
    }

    parse() {
        let parsed = this.template.trim().split('\n')
        let tree = []
        let lastIndent = 0
        let lastEl = null

        if (!parsed.length) return null

        parsed = parsed.map((str, i) => {

            let tag = str.trim().match(/^[^ ]*/)[0]

            let el = document.createElement(tag)

            let id = this.parseId(str)
            if (id) el.id = id

            let connector = this.parseConnector(str)
            if(connector) el._connector = connector

            let classes = this.parseClasses(str)
            if (classes) classes.map(cls => el.classList.add(cls))

            let attributes = this.parseAttributes(str)
            if(attributes) attributes.map(attr => {
              el.setAttribute(attr.key, attr.value)
            })

            let content = this.parseContent(str)
            if(content) el.innerHTML = content

            let indent = str.match(/^\ */)[0].length


            if (!tree.length) {
                tree.push(el)
            } else {

                // remove one from tree then append inside parent
                if (indent < lastIndent) {
                    tree.splice(tree.length-1, 1)
                    tree[tree.length - 1].appendChild(el)
                }
                else if(indent > lastIndent) {
                    if(!tree.includes(lastEl)) tree.push(lastEl)
                    lastEl.appendChild(el)
                }
                else {
                    tree[tree.length - 1].appendChild(el)
                }
            }

            lastIndent = indent
            lastEl = el
            return el
        })

        return parsed
    }

    parseClasses(str) {
        str = str
            .replace(/\[[^\[\]]*?\]/gs, '') // hide attributes before parsing classes (avoir dot inside attributes values)
            .match(/\.[^\.\ ]*/gms)
        if(!str) return null
        return str.map(cls => cls.replace(/\./, ''))
    }

    parseId(str) {
        let id = str.match(/\#[^\#\. ]*/)
        if(id) return id[0].replace(/#/, '')
        return null
    }

    parseConnector(str){
      let connector = str.match(/\@[^\@\. ]*/)
      if(connector) return connector[0].replace(/@/, '')
      return null
    }

    parseAttributes(str) {
        str = str.match(/\[[^\]]*\]/gm)
        if(!str) return null
        return str.map(attr => {
          let key = attr.replace('[', '').replace(/\=.*?$/, '')
          let value = attr.match(/\".*?\"/)[0].replaceAll('"', '')
          return {key, value}
        })
    }

    parseContent(str){
        str = str.match(/\([^\)]*\)/)
        if(!str) return ""
        str = str[0].replace(/[\(|\)]/gs, '')
        return str
    }

    selectOne(selector){
        return this.element.querySelector(selector)
    }

    selectAll(selector){
        return [...this.element.querySelectorAll(selector)]
    }

}
