export default function Board(context:CanvasRenderingContext2D |undefined, grid : Grid[]) {   
    if(context){
        grid.forEach((element,index) => {
            context.fillRect(element.corX,element.corY,40,40)
            context.strokeRect(element.corX,element.corY,40,40)
        })
        
    }   
    
}