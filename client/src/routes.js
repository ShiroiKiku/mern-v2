import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { LinksPage } from "./pages/LinksPage";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";
import VideoPlayer from "./components/VideoPlayer";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/links' exact>
                    <LinksPage />
                </Route>
                <Route path='/create' exact>
                    <CreatePage />
                </Route>
                <Route path='/detail/:id'>
                    <DetailPage />
                </Route>
                {/* <Route path='/stream'>
                    <VideoPlayer />
                </Route> */}
                <Redirect to='/links' />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path='/links' exact>
                <LinksPage />
            </Route>

            <Route path='/detail/:id'>
                <DetailPage />
            </Route>
            <Route path='/authpage' exact>
                <AuthPage />
            </Route>
            {/* <Route path='/stream'>
                <VideoPlayer />
            </Route> */}
            <Redirect to='/links' />
        </Switch>
    );
};
