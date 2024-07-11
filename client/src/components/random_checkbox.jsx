import * as most from 'most'

export default ({
    name,
    init,
    label,
 }) => sources => {
    const {DOM} = sources

    const checkbox$ = 
        most.from (DOM.select (`.${name}`)
            .events ('change'))
            .debounce (1000)
            .map (x => x.target.checked)
            .startWith (init)

    return {
        DOM: most.of (
            <div>
                {label ? `${label}: ` : undefined}
                <input className={name} checked={init || undefined} type='checkbox'></input>
            </div>
        ),
        checkbox$,
    }
}