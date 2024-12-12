export {};

// import React, { useState } from "react";

// interface WordPopupProps {
//   word: string;
//   position: { top: number; left: number };
//   onAdd: () => void;
//   onClose: () => void;
// }

// const WordPopup: React.FC<WordPopupProps> = ({ word, position, onAdd, onClose }) => {
//   return (
//     <div
//       className="absolute z-50"
//       style={{
//         top: position.top,
//         left: position.left,
//         backgroundColor: "white",
//         padding: "10px",
//         borderRadius: "8px",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <p className="font-bold mb-2">{word}</p>
//       <button
//         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
//         onClick={onAdd}
//       >
//         Add
//       </button>
//       <button
//         className="ml-2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
//         onClick={onClose}
//       >
//         Close
//       </button>
//     </div>
//   );
// };

// export const WordHighlighter: React.FC = () => {
//   const [popupData, setPopupData] = useState<{
//     word: string;
//     position: { top: number; left: number };
//   } | null>(null);

//   const handleMouseEnter = (event: MouseEvent) => {
//     const word = (event.target as HTMLElement).dataset.word;
//     const rect = (event.target as HTMLElement).getBoundingClientRect();
//     setPopupData({
//       word: word!,
//       position: {
//         top: rect.top + window.scrollY - 20,
//         left: rect.left + window.scrollX,
//       },
//     });
//   };

//   const handleAddWord = () => {
//     if (popupData) {
//       console.log(`Word added: ${popupData.word}`);
//       setPopupData(null); // Close popup after adding the word
//     }
//   };

//   const handleClosePopup = () => {
//     setPopupData(null);
//   };

//   return (
//     <div>
//       <div
//         onMouseEnter={handleMouseEnter}
//         data-word="Example"
//         style={{ color: "blue", fontWeight: "bold", cursor: "pointer" }}
//       >
//         Example
//       </div>

//       {popupData && (
//         <WordPopup
//           word={popupData.word}
//           position={popupData.position}
//           onAdd={handleAddWord}
//           onClose={handleClosePopup}
//         />
//       )}
//     </div>
//   );
// };
