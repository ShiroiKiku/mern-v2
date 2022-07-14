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
import AdminPage from "./pages/AdminPage";
import NavigateControl from "./pages/admin/NavigateControl";
import AddNewNavigateItem from "./pages/admin/navigate/AddNewNavigateItem";
import UpdateNavigateItem from "./pages/admin/navigate/UpdateNavigateItem";
import DeliteNavigateItem from "./pages/admin/navigate/DeliteNavigateItem";
import AddNewNews from "./pages/admin/news/AddNewNews";
import {
    ADMIN,
    ADMIN_NAVIGATE,
    ADMIN_NAVIGATE_ADD,
    ADMIN_NAVIGATE_DEL,
    ADMIN_NAVIGATE_UP,
    ADMIN_NEWS,
    ADMIN_NEWS_ADD,
    AUTH,
    CUSTOM_PAGE,
    VIDEO_CHAT,
} from "./utils/routes";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/create'>
                    <CreatePage />
                </Route>
                <Route path='/detail/:id'>
                    <DetailPage />
                </Route>
                <Route path='/createlink'>
                    <CreateLink />
                </Route>
                <Route path={VIDEO_CHAT}>
                    <VideoСonferencePage />
                </Route>
                <Route exact path={ADMIN}>
                    <AdminPage />
                </Route>
                <Route exact path={ADMIN_NAVIGATE}>
                    <NavigateControl />
                </Route>
                <Route path={ADMIN_NAVIGATE_ADD}>
                    <AddNewNavigateItem />
                </Route>
                <Route path={ADMIN_NAVIGATE_UP}>
                    <UpdateNavigateItem />
                </Route>
                <Route path={ADMIN_NAVIGATE_DEL}>
                    <DeliteNavigateItem />
                </Route>
                <Route exact path={ADMIN_NEWS}></Route>
                <Route path={ADMIN_NEWS_ADD}>
                    <AddNewNews />
                </Route>
                <Route exact path={CUSTOM_PAGE}></Route>
                {/* <Route path='/stream'>
                    <VideoPlayer />
                </Route> */}

                {/* <PagesRoutes /> */}
                <Redirect to='/' />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path={AUTH} exact>
                <AuthPage />
            </Route>

            <Route path={VIDEO_CHAT}>
                <VideoСonferencePage />
            </Route>
            {/* <PagesRoutes /> */}
            <Redirect to='/' />
        </Switch>
    );
};
