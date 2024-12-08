import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useScrapedData } from "../utils/scrapeTextUtils";
import WordHighlighter  from "../utils/highlightTextUtils";

export const Homepage: React.FC = () => {
    const navigate = useNavigate();
    const [highlight, setHighlight] = useState(false);
    const { scrapedData, loading, error } = useScrapedData();

    // const openExtension = () =>
    // {
    //     navigate("/");
    //     const url = "chrome-extension://jfkpfocnjofoibmcihgfhibpeionpidf/index.html#learnpage";
    //     window.open(url, "_blank");
    // };

  return (
    <>
        <WordHighlighter />
      <div className="mt-4 space-y-4 m-3">
        <button

          className="w-full py-3 px-6 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          Start revision
        </button>
      </div>
    </>
  );
};
