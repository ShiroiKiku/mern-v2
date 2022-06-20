import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";
import { CreateLink } from "./pages/CreateLink";
import { PagesRoutes } from "./components/PagesRoutes";
import VideoPlayer from "./components/VideoPlayer";
import TestPage from "./pages/TestPage";
import VideoСonferencePage from "./pages/VideoСonferencePage";
import TestDemon from "./pages/TestDemon";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/create' exact>
                    <CreatePage />
                </Route>
                <Route path='/detail/:id'>
                    <DetailPage />
                </Route>
                <Route path='/createlink'>
                    <CreateLink />
                </Route>

                <Route path='/videochat'>
                    <VideoСonferencePage />
                </Route>
                <Route path='/testpage'>
                    <TestPage />
                </Route>

                <Route path='/stream'>
                    <VideoPlayer />
                </Route>
                <Route path='/testdem'>
                    <TestDemon />
                </Route>
                <PagesRoutes />
                <Redirect to='/createlink' />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path='/detail/:id'>
                <DetailPage />
            </Route>
            <Route path='/authpage' exact>
                <AuthPage />
            </Route>
            <Route path='/stream'>
                <VideoPlayer />
            </Route>
            <Route path='/videochat'>
                <VideoСonferencePage />
            </Route>
            <PagesRoutes />
            <Redirect to='/create' />
        </Switch>
    );
};
