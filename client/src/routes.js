import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";
import { CreateLink } from "./pages/CreateLink";
import { PagesRoutes } from "./components/PagesRoutes";
import VideoChat from "./pages/VideoChat";
import VideoChatName from "./pages/VideoChatName";
import TestPage from "./pages/TestPage";

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
                    <VideoChat />
                </Route>
                <Route path='/videochat'>
                    <VideoChat />
                </Route>
                <Route path='/testpage'>
                    <TestPage />
                </Route>

                {/* <Route path='/stream'>
                    <VideoPlayer />
                </Route> */}
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
            {/* <Route path='/stream'>
                <VideoPlayer />
            </Route> */}
            <PagesRoutes />
            <Redirect to='/create' />
        </Switch>
    );
};
