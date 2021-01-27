import Rigged from './rigged'

document.addEventListener('DOMContentLoaded', ()=>{
  let element = new Rigged({
    container: document.body,
    template: `
    div .nstool
      h1 (NSTOOL.aoizh#oa[paizjdpoazjd]izhd.apidzd)
      div .search #bjr (dis a search)
        input #search [autofocus="true"] [placeholder="yoursite.com"]
        div #suggests
      input @mail #mail [type="mail"] [placeholder="mail"]
      div #dnsResults
      div #certResults
    `
  })

  element.mail.setStyle({
    color: 'red',
    padding: '1rem'
  })
})
