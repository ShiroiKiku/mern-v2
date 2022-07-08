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

                <Route path='/videochat'>
                    <VideoСonferencePage />
                </Route>
                <Route path='/admin/navigate/add'>
                    <AddNewNavigateItem />
                </Route>
                <Route path='/admin/navigate/update'>
                    <UpdateNavigateItem />
                </Route>
                <Route path='/admin/navigate/delite'>
                    <DeliteNavigateItem />
                </Route>
                <Route path='/admin/navigate'>
                    <NavigateControl />
                </Route>
                <Route path='/admin'>
                    <AdminPage />
                </Route>

                {/* Навигация */}

                <Route path='/testpage'>
                    <TestPage />
                </Route>

                {/* <Route path='/stream'>
                    <VideoPlayer />
                </Route> */}
                {/* <Route path='/testdem'>
                    <TestDemon />
                </Route> */}

                {/* <PagesRoutes /> */}
                <Redirect to='/' />
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

            <Route path='/videochat'>
                <VideoСonferencePage />
            </Route>
            {/* <PagesRoutes /> */}
            <Redirect to='/' />
        </Switch>
    );
};
