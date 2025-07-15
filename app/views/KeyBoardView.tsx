'use client';

import React, {useState} from "react";
import { QWERTZ } from "../models/keyboards";
export default function KeyBoardView(){
    const [keyPressed,setKeyPressed]=useState<string | null>(null)
    function getFaceWidth(face:string): string{
       switch(face){
        case "":
            return "w-50"
            break;
        case "back":
            return "w-24"
            break;
         case "Enter":
            return "w-20"
            break;
        case "Shift":
            return "w-14"
            break;
        case "alt gr":
            return "w-12"
            break;
        default: 
          return "w-8"

       }

    }
    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
       
        setKeyPressed(event.key)
    
        console.log(event.key)
    }

return(
    <>
    <div className="font-medium m-5 rounded-2xl p-1 border-2 border-gray-400   ">
       Ich stehe um sieben Uhr auf. Dann frühstücke ich mit meiner Familie. Um acht Uhr gehe ich zur Arbeit. Ich arbeite in einem Büro. Am Mittag esse ich mit meinen Kollegen. Nach der Arbeit gehe ich nach Hause. Am Abend sehe ich fern oder lese ein Buch. Um zehn Uhr gehe ich ins Bett. 
    </div>
    <div tabIndex={0} // Make div focusable
      onKeyDown={handleKeyDown}
 className=" flex flex-col items-center rounded-3xl bg-black p-4 m-5">
            {QWERTZ.map(

                (row,index)=>
                <div className=" flex" key={index}>
                {row.map((face,index)=>
                <div key={index}
                    className={
                        `active:bg-emerald-600 h-8 rounded text-center flex-col  p-1 m-2 ${getFaceWidth(face.normal)} ${face.normal==keyPressed?"bg-emerald-600": "bg-gray-400"} `
                                    } >
                   
                    
                         {face.normal}
                    </div>)}

                </div>
                
                
                
                )}
    </div>
    </>
    
)

}