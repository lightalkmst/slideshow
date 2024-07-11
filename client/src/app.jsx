import * as most from 'most'

import list_input from './components/list_input.jsx'
import time_input from './components/time_input.jsx'
import random_checkbox from './components/random_checkbox.jsx'
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
    DOM: random_dom$,
    checkbox$: random_checkbox$,
  } = random_checkbox ({
    name: 'random',
    init: false,
    label: 'random',
  }) (sources)

  const {
    DOM: slideshow_dom$,
  } = slideshow ({
    ... sources,
    list_input$,
    time_input$,
    random_checkbox$,
  })

  return {
    DOM: 
      most.combineArray ((
          list_dom,
          time_dom,
          random_dom,
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
                {random_dom}
              </div>
              <div>
                {slideshow_dom}
              </div>
          </div>
      , [
          list_dom$,
          time_dom$,
          random_dom$,
          slideshow_dom$,
      ])
    ,
    HTTP: list_http$,
  }
}
