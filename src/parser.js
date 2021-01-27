export default class Parser{

  static parse(template) {
      let parsed = template.trim().split('\n')
      let tree = []
      let lastIndent = 0
      let lastEl = null

      if (!parsed.length) return null

      parsed = parsed.map((str, i) => {

          let tag = str.trim().match(/^[^ ]*/)[0]

          let el = document.createElement(tag)

          let id = Parser.parseId(str)
          if (id) el.id = id

          let connector = Parser.parseConnector(str)
          if(connector) el._connector = connector

          let classes = Parser.parseClasses(str)
          if (classes) classes.map(cls => el.classList.add(cls))

          let attributes = Parser.parseAttributes(str)
          if(attributes) attributes.map(attr => {
            el.setAttribute(attr.key, attr.value)
          })

          let content = Parser.parseContent(str)
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

  static removeAttributes(str){
    return str.replace(/\[[^\[\]]*?\]/gs, '')
  }

  static removeContent(str){
    return str.replace(/\([^\(\)]*?\)/gs, '')
  }

  static parseClasses(str) {
      str = Parser.removeAttributes(str)
      str = Parser.removeContent(str)

      str = str.match(/\.[^\.\ ]*/gms)

      if(!str) return null
      return str.map(cls => cls.replace(/\./, ''))
  }

  static parseId(str) {
      str = Parser.removeContent(str)
      str = str.match(/\#[^\#\. ]*/)
      if(str) return str[0].replace(/#/, '')
      return null
  }

  static parseConnector(str){
    str = Parser.removeContent(str)
    let connector = str.match(/\@[^\@\. ]*/)
    if(connector) return connector[0].replace(/@/, '')
    return null
  }

  static parseAttributes(str) {
      str = Parser.removeContent(str)
      str = str.match(/\[[^\]]*\]/gm)
      if(!str) return null
      return str.map(attr => {
        let key = attr.replace('[', '').replace(/\=.*?$/, '')
        let value = attr.match(/\".*?\"/)[0].replaceAll('"', '')
        return {key, value}
      })
  }

  static parseContent(str){
      str = str.match(/\([^\)]*\)/)
      if(!str) return ""
      str = str[0].replace(/[\(|\)]/gs, '')
      return str
  }

}
