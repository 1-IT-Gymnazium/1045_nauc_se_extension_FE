export {};
// import React, { useEffect, useRef } from 'react';

// interface HighlightTextProps {
//   text: string;  // Expecting plain text here, not JSX
// }

// const HighlightText: React.FC<HighlightTextProps> = ({ text }) => {
//   const textContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (textContainerRef.current && text) {
//       textContainerRef.current.innerHTML = '';  // Clear previous content

//       const div = document.createElement('div');
//       div.textContent = text;  // Add plain text, not JSX
//       textContainerRef.current.appendChild(div);

//       highlightText(text);
//     }
//   }, [text]);

//   const highlightText = (text: string) => {
//     if (text) {
//       const range = document.createRange();
//       const selection = window.getSelection();
//       const body = document.body;

//       // Iterate over all text nodes in the document body
//       const walker = document.createTreeWalker(
//         body,
//         NodeFilter.SHOW_TEXT,
//         null
//       );

//       let node;
//       while ((node = walker.nextNode())) {
//         const textContent = node.textContent || '';

//         if (textContent.includes(text)) {
//           const start = textContent.indexOf(text);
//           const end = start + text.length;

//           // Create a range to highlight the text
//           range.setStart(node, start);
//           range.setEnd(node, end);

//           // Surround the highlighted text with a <mark> tag
//           const span = document.createElement('mark');
//           span.appendChild(range.extractContents());
//           range.insertNode(span);
//         }
//       }
//     }
//   };

//   return <div ref={textContainerRef}></div>;
// };

// export default HighlightText;
