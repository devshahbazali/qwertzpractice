"use client";
import React, { useState, useRef, useEffect } from "react";
import { LESSONS } from "../models/lessons";
import { QWERTZ } from "../models/keyboards";

export default function KeyBoardView() {
   const [error, setError] = useState(false);
  const [greenLesson, setGreenLesson] = useState("");
  const [blackLesson, setBlackLesson] = useState("");
  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const lessonDisplayRef = useRef<HTMLDivElement>(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(-1);
 const didLoadFromStorage = useRef(false); 
  //focusing on the keyboard
  useEffect(() => {
    keyboardRef.current?.focus();
  }, []);

// saving the selected lesson to localstorage
  useEffect(() => {
     if(selectedLessonIndex!==-1)
  localStorage.setItem("selectedLessonIndex", selectedLessonIndex.toString());
}, [selectedLessonIndex]);
// saving the lesson progress to localstorage
useEffect(() => {
 if (!didLoadFromStorage.current) return;
{  localStorage.setItem("greenLesson", greenLesson);
  localStorage.setItem("blackLesson", blackLesson);
}  
}, [greenLesson, blackLesson]);

 // Load saved progress on mount
 useEffect(() => {
  const savedIndex = localStorage.getItem("selectedLessonIndex");
  const savedGreen = localStorage.getItem("greenLesson");
  const savedBlack = localStorage.getItem("blackLesson");

  // Only set state if values exist in localStorage
  if (savedIndex !== null) {   
    setSelectedLessonIndex(parseInt(savedIndex));
  }
  if (savedGreen !== null) {
    setGreenLesson(savedGreen);
  }
  if (savedBlack !== null) {
    setBlackLesson(savedBlack);
  }

  // If nothing was saved, initialize with first lesson
  if (savedIndex === null && savedGreen === null && savedBlack === null) {
   
    setSelectedLessonIndex(0);
    setGreenLesson("");
    setBlackLesson(LESSONS[0]);
  }
  didLoadFromStorage.current = true;
}, []);

 
function scrollLine(line:number){
  for (let index = 0; index < line; index++) {
     //scroll after completion of line
       lessonDisplayRef.current?.scrollBy({
            top: 28, // You can adjust this value to match 1 line
            behavior: "smooth",
          });
  }
    
}
  // function to get the custom width for  the keys
  function getFaceWidth(face: string): string {
    switch (face) {
      case " ":
        return "w-50";

      case "back":
        return "w-24";

      case "Enter":
        return "w-20";

      case "Shift":
        return "w-14";

      case "alt gr":
        return "w-14";

      default:
        return "w-8";
    }
  }

  // function to mask the keypressed with the real names
  function normalizeKey(key: string): string {
    switch (key) {
      case " ":
        return " ";
      case "Backspace":
        return "back";
      case "Control":
        return "ctrl";
      case "AltGraph":
        return "alt gr";
      case "Meta":
        return "win";
      case "dead":
        return "´";
      case "Enter":
        return "\n";
      default:
        return key;
    }
  }

  function preventDefaultFunction(event: React.KeyboardEvent<HTMLDivElement>) {
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      ["Alt", "AltGraph", "Control", "Meta", "win"].includes(event.key)
    ) {
      event.preventDefault();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    preventDefaultFunction(event);
    const normalized = normalizeKey(event.key);
    setKeyPressed(normalized);
    // Check if user pressed correct key
    const expectedChar = blackLesson[0];    if (normalized === expectedChar) {
      setGreenLesson((prev) => prev + expectedChar);
      setBlackLesson((prev) => prev.slice(1)); // remove first char
      setError(false); // correct input
    if (expectedChar === "\n") {
        scrollLine(1)
        }


    } else {
      setError(true); // wrong input
      // Optional: clear error after 500ms
      setTimeout(() => setError(false), 500);
    }
  }

  function handleLessonChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const index = parseInt(event.target.value, 10);
    setSelectedLessonIndex(index);
    
    setGreenLesson("");
    setBlackLesson(LESSONS[index]);
     keyboardRef.current?.focus();
  }
  return (
    <main className="flex flex-col items-center"> 
   {/* div for lesson selection */}
      <div className="m-5 flex">
        <label className="font-bold mr-2">Wähle eine Lektion:</label>
        <select
          value={selectedLessonIndex}
          onChange={handleLessonChange}
          className="border rounded p-1"
        >
          {LESSONS.map((_, index) => (
            <option key={index} value={index}>
              Lektion {index + 1}
            </option>
          ))}
        </select>
      </div>
 {/* div for lesson lessons*/}
      <div   ref={lessonDisplayRef} 
      style={{ width: keyboardRef.current?.offsetWidth }}
        className={`font-medium text-xl  h-40 px-4 bg-gray-200 mx-52 rounded-2xl p-1 border-2  whitespace-pre-wrap
             overflow-scroll overflow-x-clip
            ${error ? "border-red-500 " : "border-gray-400"}`}
      >
        <span className="text-green-600">{greenLesson}</span>
        <span>{blackLesson}</span>
      </div>
 {/* div for keyboard layout*/}
      <div
        tabIndex={0} // Make div focusable
        onKeyDown={handleKeyDown}
        ref={keyboardRef}
        className={` flex flex-col items-center rounded-3xl bg-black p-4 mx-5 my-2 w-fit 
          ${error?"shake":""}`}
      >
        {QWERTZ.map((row, index) => (
          /*div for rows*/
          <div className="flex" key={index}>
            {row.map((face, index) => (
              /*div for keys*/
              <div
                key={index}
                className={
                  `active:bg-emerald-600 min-w-12  h-auto rounded p-1 m-1.5 ${getFaceWidth(
                    face.normal
                  )} 
                                        ${
                                          face.normal === keyPressed
                                            ? "bg-emerald-600"
                                            : face.shift === keyPressed
                                            ? "bg-emerald-600"
                                            : face.altGr === keyPressed
                                            ? "bg-emerald-600"
                                            : "bg-gray-400"
                                        } ` +
                  (face.shift || face.altGr
                    ? " flex flex-col"
                    : " flex items-center justify-center")
                }
              >
                {face.shift ? (
                  <div className=" text-xs">{face.shift ?? ""}</div>
                ) : null}
                <div className="flex justify-between items-baseline-last">
                  <div className="text-lg font-medium grow ">{face.normal}</div>
                  {face.altGr ? (
                    <div className=" text-xs">{face.altGr}</div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
