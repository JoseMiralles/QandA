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
import { AuthProvider } from "./Auth";
import { AuthorizedPage } from "./AuthorizedPage";

const AskPage = React.lazy(() => import('./Pages/AskPage'));

const store = configureStore();

function App() {
  return (

    <Provider store={store}>
      <AuthProvider>
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
                <Route path="signout" element={<SignOutPage action="signout" />} />
                <Route path="signout-callback" element={<SignOutPage action="signout-callback" />} />

                <Route path="ask" element={
                  <React.Suspense
                    fallback={
                      <div>Loading..</div>
                    }
                  >
                    <AuthorizedPage>
                      <AskPage />
                    </AuthorizedPage>
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
      </AuthProvider>
    </Provider>

  );
}

export default App;
