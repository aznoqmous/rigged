import Rigged from './rigged'
document.addEventListener('DOMContentLoaded', ()=>{
  let element = new Rigged({
    template: `
    div .nstool
      h1 (NSTOOL)
      div .search #bjr (dis a search)
        input #search [autofocus="true"] [placeholder="yoursite.com"]
        div #suggests
      input #mail [type="mail"] [placeholder="mail"]
      div #dnsResults
      div #certResults
    `
  })

})
