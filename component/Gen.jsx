export default function Gen({id,startTime,generation}){
    return(
        <div>
            <h3>id: {id}</h3>
            <h2>Generation {generation}</h2>
            <p>Started at: {startTime}</p>

        </div>
    )
}