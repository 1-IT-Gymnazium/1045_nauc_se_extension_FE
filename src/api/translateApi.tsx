export {};
// import React, { useState, useEffect } from "react";

// interface TranslateApiProps {
//   textToTranslate: string;
// }

// export const TranslateApi: React.FC<TranslateApiProps> = ({ textToTranslate }) => {
//   const [translatedText, setTranslatedText] = useState<string>("");

//   const translateText = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/translate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           text: textToTranslate,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to translate text");
//       }

//       const data = await response.json();
//       setTranslatedText(data.translated_text);
//     } catch (err: any) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     if (textToTranslate) {
//       translateText();
//     }
//   }, [textToTranslate]);

//   return <>{translatedText ? translatedText : "Translating..."}</>;
// };
