import * as most from 'most'

import list_input from './components/list_input.jsx'
import time_input from './components/time_input.jsx'
import slideshow from './components/slideshow.jsx'

export default sources => {
  const {DOM, HTTP} = sources

  const {
    DOM: list_dom$,
    HTTP: list_http$,
    input$: list_input$,
  } = list_input (sources)

  const {
    DOM: time_dom$,
    input$: time_input$,
  } = time_input (sources)

  const {
    DOM: slideshow_dom$,
  } = slideshow ({
    ... sources,
    list_input$,
    time_input$,
  })

  return {
    DOM: 
      most.combineArray ((
          list_dom,
          time_dom,
          slideshow_dom,
      ) => 
          <div>
              <div>
                {list_dom}
              </div>
              <div>
                {time_dom}
              </div>
              <div>
                {slideshow_dom}
              </div>
          </div>
      , [
          list_dom$,
          time_dom$,
          slideshow_dom$,
      ])
    ,
    HTTP: list_http$,
  }
}
