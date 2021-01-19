import Basic from './basic'
document.addEventListener('DOMContentLoaded', ()=>{
  let element = new Basic({
    template: `
    div .controls
      i #buttonLeft .button.button-left
      i .button-right
      span .btn
      input [type="text"] [autofocus="true"]
    `
  })

})
