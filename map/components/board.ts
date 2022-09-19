import React, { useRef, useState } from "react";

export function Board(context:CanvasRenderingContext2D |undefined |null) {   
        if(context){
            context.fillRect(0,0,10,10)
        }

}