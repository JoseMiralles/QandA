import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./Header";
import { HomePage } from "./Pages/HomePage";
import { SignInPage } from "./Pages/SignInPage";
import { AskPage } from "./Pages/AskPage";
import { SearchPage } from "./Pages/SearchPage";
import { NotFoundPage } from "./Pages/NotFoundPage";
import { QuestionPage } from "./Pages/QuestionPage";

function App() {
  return (

    <BrowserRouter>
      <div id='main-body-wrapper'>

        <Header />

        <br />
        <div id='main-content-wrapper'>
          <Routes>

            <Route path="" element={ <HomePage /> } />
            <Route path="search" element={<SearchPage />} />
            <Route path="ask" element={<AskPage />} />
            <Route path="signin" element={<SignInPage />} />
            
            {/* Handle resources with specific Ids */}
            <Route path="questions/:questionId" element={ <QuestionPage /> } />
            
            {/* Handle "not found" pages */}
            <Route path="*" element={ <NotFoundPage/> } />

          </Routes>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
