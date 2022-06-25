import hljs from 'highlight.js'
import 'highlight.js/styles/base16/github.css'

let HighLight = {};

HighLight.install = (app) => {
    app.directive('high-light', {
        mounted(el) {
            let blocks = el.querySelectorAll('pre code')
            for(let i = 0; i < blocks.length; i ++){
                hljs.highlightElement(blocks[i])
            }
        }
    })
}

export { HighLight }