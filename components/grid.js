import { useEffect } from 'react';

const Grid = (props) => {

    function drawingLines(){
        const svgns = "http://www.w3.org/2000/svg"
        const grid = document.getElementById("grid")
        let num = props.size/10
        for(let i=0; i<num+1; i++){
            const horizLine = document.createElementNS(svgns, 'path')
            const vertLine = document.createElementNS(svgns, 'path')
            horizLine.setAttributeNS(null, 'd', `M 0 ${i*10} h${props.size}`)
            horizLine.setAttributeNS(null, 'stroke', "#bbbbbb")
            horizLine.setAttributeNS(null, 'strokeWidth', 0.1)
            vertLine.setAttributeNS(null, 'd', `M ${i*10} 0 v${props.size}`)
            vertLine.setAttributeNS(null, 'stroke', "#bbbbbb")
            vertLine.setAttributeNS(null, 'strokeWidth', 0.1)
            grid.appendChild(horizLine)
            grid.appendChild(vertLine)
        }
    }

        const viewbox = `0 0 ${props.size} ${props.size}`

    useEffect(() => {
        drawingLines()
    }, [])

    return(
        <div>
            <svg id="grid" height={props.size} width={props.size} viewBox={viewbox}>
                
            </svg>
        </div>
    )
}

export default Grid;