import React, { useEffect } from "react";

interface LearnPageProps {
  homepageDivRef: React.RefObject<HTMLDivElement | null>;
}

export const LearnPage: React.FC<LearnPageProps> = ({ homepageDivRef }) => {
  useEffect(() => {
    if (homepageDivRef.current) {
      homepageDivRef.current.classList.add("page-big");
      homepageDivRef.current.classList.remove("page-small");
    }
  }, [homepageDivRef]);



  return (
    <div className="flex items-center justify-center mt-8">
    <div className="card w-40">
    <div className="card__content text-center relative p-20 transition-transform duration-1000 text-white font-bold">

        <div className="card__front absolute top-0 bottom-0 right-0 left-0 p-8 bg-pink-600 flex items-center justify-center">
        <h2>Front</h2>
        </div>
        <div className="card__back absolute top-0 bottom-0 right-0 left-0 p-8 bg-teal-500 flex items-center justify-center">
        <h2>Back</h2>
        </div>

    </div>
    </div>
    </div>
  );
};
