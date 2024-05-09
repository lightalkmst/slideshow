import * as most from 'most'

export default sources => {
    const {
        DOM, 
        HTTP,
        list_input$,
        time_input$,
    } = sources

    const timer$ = time_input$.map (most.periodic).switch ()

    const index$ = 
        most.merge (
            timer$.constant (true),
            list_input$.constant (false),
        )
        .scan ((a, x) => x ? a + 1 : 0, 0)

    const fetch$ = 
        most.from (HTTP.select ('list').flatten ())
            .map (D.get ('body'))
            .map (JSON.parse)

    const file$ =
        most.combineArray ((path, files, i) => `${path}/${files [i % files.length]}`, [
            list_input$,
            fetch$,
            index$,
        ])

    return {
        DOM:
            file$.map (btoa)
                .map (x => 
                    x ? <img src={`${base_url}/fetch?${x}`} style={{
                        display: 'block',
                        'margin': 'auto',
                        height: '90vh',
                    }}></img> : undefined
                )
                .startWith ()
        ,
    }
}
