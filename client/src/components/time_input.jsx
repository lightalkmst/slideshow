import input from './input.jsx'

export default sources => {
    const {
        DOM: input_dom$,
        input$,
    } = input ({
        name: 'time',
        init: '5000',
        label: 'interval',
    }) (sources)

    return {
        DOM: input_dom$,
        input$: input$.map(x => +x),
    }
}