import input from './input.jsx'

export default sources => {
    const {
        DOM: input_dom$,
        input$,
    } = input ({
        name: 'dir',
        init: '',
        label: 'dir',
    }) (sources)

    return {
        DOM: input_dom$,
        HTTP: 
            input$.filter (F.id)
                .map (btoa)
                .map (x => ({
                    url: `${base_url}/list?${x}`,
                    method: 'GET',
                    category: 'list',
                }))
        ,
        input$,
    }
}