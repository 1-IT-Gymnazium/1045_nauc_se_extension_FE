import React, { useRef} from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/homepage";
import { LearnPage } from "./pages/learningpage";
import { Header } from "./components/header";
import { SignupPage } from "./features/signup";
import { LoginPage } from "./features/login";

const App: React.FC = () => {

    const homepageDivRef = useRef<HTMLDivElement | null>(null);


    return (
    <Router>
        <div ref={homepageDivRef} className="page page-small limit--width">
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/learnpage" element={<LearnPage homepageDivRef={homepageDivRef} />}/>
            </Routes>
        </div>
    </Router>
  );
};

export default App;
