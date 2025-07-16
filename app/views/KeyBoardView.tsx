        'use client';

        import React, {useState,useRef,useEffect} from "react";
        import { QWERTZ } from "../models/keyboards";
        export default function KeyBoardView(){
            const lesson="ich stehe um sieben Uhr auf. Dann frühstücke ich mit meiner Familie. Um acht Uhr gehe ich zur Arbeit. Ich arbeite in einem Büro. Am Mittag esse ich mit meinen Kollegen. Nach der Arbeit gehe ich nach Hause. Am Abend sehe ich fern oder lese ein Buch. Um zehn Uhr gehe ich ins Bett."
            const [error, setError] = useState(false);
            const [greenlesson,setGreenLesson]=useState("")
            const[blacklesson,setBlackLesson]=useState(lesson)
         
            
            const keyboardRef = useRef<HTMLDivElement>(null);
            //focusing on the keyboard
            useEffect(() => {
        keyboardRef.current?.focus();
        
        }, []);
            const [keyPressed,setKeyPressed]=useState<string | null>(null)
        
            // function to get the custom width for  the keys
            function getFaceWidth(face:string): string{
            switch(face){
                case " ":
                    return "w-50"
                    
                case "back":
                    return "w-24"
                    
                case "Enter":
                    return "w-20"
                    
                case "Shift":
                    return "w-14"
                    
                case "alt gr":
                    return "w-14"
                    
                default: 
                return "w-8"

            }

            }
        
            // function to mask the keypressed with the real names
            function normalizeKey(key: string): string {
        switch (key) {
            case ' ':
            return ' ';
            case 'Backspace':
            return 'back';
            case 'Control':
            return 'ctrl';
            case 'AltGraph':
            return 'alt gr';
            case 'Meta':
            return 'win';
            case 'dead': 
            return '´';
            default: 
            return key
        }
        }
        

        function preventDefaultFunction(event :React.KeyboardEvent<HTMLDivElement>)
        {
            if (
            event.altKey ||
            event.ctrlKey ||
            event.metaKey ||
            ['Alt', 'AltGraph', 'Control', 'Meta','win'].includes(event.key)
        ) {
            event.preventDefault();
        }
        }

            function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
                preventDefaultFunction(event)
                const normalized=normalizeKey(event.key)
                setKeyPressed(normalized)
             // Check if user pressed correct key
            const expectedChar = blacklesson[0];
            if (normalized === expectedChar) {
              
                setGreenLesson(prev => prev + expectedChar);
                setBlackLesson(prev => prev.slice(1)); // remove first char
            setError(false); // correct input
            }
            else{
                 setError(true); // wrong input
    // Optional: clear error after 500ms
    setTimeout(() => setError(false), 500);
            }
                            
            
            }

        return(
            <>
        <div
  className={`font-medium text-xl bg-gray-200 m-5 rounded-2xl p-1 border-2  ${
    error ? "border-red-500 animate-shake" : "border-gray-400"
  }`}
>
  <span className="text-green-600">{greenlesson}</span>
  <span>{blacklesson}</span>
</div>
            
            <div tabIndex={0} // Make div focusable
            onKeyDown={handleKeyDown}
            ref={keyboardRef}
                className=" flex flex-col items-center rounded-3xl bg-black p-4 m-5">
                    {
                    QWERTZ.map((row,index)=>
                       /*div for rows*/
                       <div className="flex" key={index}>
                         {row.map((face,index)=>
                         /*div for keys*/
                                <div key={index}
                                   className={
                                        `active:bg-emerald-600 min-w-10  h-auto rounded p-1 m-1.5 ${getFaceWidth(face.normal)} 
                                        ${face.normal===keyPressed?"bg-emerald-600": 
                                            face.shift===keyPressed?"bg-emerald-600":
                                            face.altGr===keyPressed?"bg-emerald-600":"bg-gray-400"} `+
                                          (face.shift || face.altGr ? " flex flex-col" : " flex items-center justify-center")} >

                                {face.shift ?<div className=" text-xs">{face.shift ?? ''}</div>:null}
                                    <div className="flex justify-between items-baseline-last"> 
                                    <div className="text-lg font-bold grow ">{face.normal}</div>
                                    {face.altGr?<div className=" text-xs">{face.altGr}</div>:null} 
                                    </div>

                                </div>)}

                        </div> 
                        
                        )}
            </div>
            </>
            
        )

        }