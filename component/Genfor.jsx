export default function Genfor({generation,startTime,horizon}){
    return(
        <div>
            {/* <h1>id {id}</h1> */}
            <h2>Generation {generation}</h2>
            <h1>{startTime}</h1>
            <h2>{horizon}</h2>
        </div>
    )
}