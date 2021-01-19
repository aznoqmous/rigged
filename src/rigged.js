export default class Rigged {

    constructor(options) {
        this.init(options)
        this.build()
    }

    init(options) {
        options = Object.assign({
            container: document.body,
            template: `div`
        }, options)
        for (let key in options) this[key] = options[key]
        if(!this.container) this.container = document.body
    }

    build() {
        this.elements = this.parse(this.template)
        this.elements.map(element => {
            if (element.id)
                this[element.id] = element
        })
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
            if (id) el.id = id[0]

            let classes = this.parseClasses(str)
            if (classes) classes.map(cls => el.classList.add(cls))

            let attributes = this.parseAttributes(str)
            if(attributes) attributes.map(attr => {
              el.setAttribute(attr.key, attr.value)
            })

            let indent = str.match(/^\ */)[0].length


            if (!tree.length) {
                this.container.appendChild(el)
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
            .match(/\.[^\.]*/gms)
        if(!str) return null
        return str.map(cls => cls.replace(/\./, ''))
    }

    parseId(str) {
        let id = str.match(/\#[^\#\. ]*/)
        if(id) return id.replace(/#/, '')
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

}
