import * as most from 'most'

export default ({
    name,
    init,
    label,
 }) => sources => {
    const {DOM} = sources

    const input$ = 
        most.from (DOM.select (`.${name}`)
            .events ('input'))
            .debounce (1000)
            .map (x => x.target.value)
            .startWith (init)

    return {
        DOM: most.of (
            <div>
                {label ? `${label}: ` : undefined}
                <input className={name} value={init}></input>
            </div>
        ),
        input$,
    }
}