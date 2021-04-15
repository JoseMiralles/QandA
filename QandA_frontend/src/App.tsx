import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./Store";

import { Header } from "./Header";
import { HomePage } from "./Pages/HomePage";
import { SignInPage } from "./Pages/SignInPage";
import { SignOutPage } from "./Pages/SignOutPage";
import { SearchPage } from "./Pages/SearchPage";
import { NotFoundPage } from "./Pages/NotFoundPage";
import { QuestionPage } from "./Pages/QuestionPage";

const AskPage = React.lazy(() => import('./Pages/AskPage'));

const store = configureStore();

function App() {
  return (

    <Provider store={ store }>
      <BrowserRouter>
        <div id='main-body-wrapper'>

          <Header />

          <br />
          <div id='main-content-wrapper'>
            <Routes>

              <Route path="" element={<HomePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="signin" element={<SignInPage action="signin" />} />
              <Route path="signin-callback" element={<SignInPage action="signin-callback" />} />
              <Route path="signout" element={ <SignOutPage action="signout"/> } />
              <Route path="signout-callback" element={ <SignOutPage action="signout-callback"/> } />

              <Route path="ask" element={
                <React.Suspense
                  fallback={
                    <div>Loading..</div>
                  }
                >
                  <AskPage />
                </React.Suspense>
              } />

              {/* Handle resources with specific Ids */}
              <Route path="questions/:questionId" element={<QuestionPage />} />

              {/* Handle "not found" pages */}
              <Route path="*" element={<NotFoundPage />} />

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
