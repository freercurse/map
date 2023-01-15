export default function Board(context:CanvasRenderingContext2D |undefined, grid : Grid[]) {  
    
    if(context){
        
        
        grid.forEach((element,index) => {
            
            context.strokeStyle = "#146356"
            context.fillRect(element.corX -10 ,element.corY-15,35,35)
            context.strokeRect(element.corX-10,element.corY-15,35,35)
        })
        
    }      
    
}