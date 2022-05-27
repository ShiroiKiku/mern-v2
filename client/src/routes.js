import React, { useCallback, useState, useEffect } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { LinksPage } from "./pages/LinksPage";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { AuthPage } from "./pages/AuthPage";
import { CreateLink } from "./pages/CreateLink";
import { LinkPage } from "./pages/LinkPage";
import VideoPlayer from "./components/VideoPlayer";

import { Loader } from "./components/Loader";

import { useHttp } from "./hooks/http.hook";

export const useRoutes = (isAuthenticated) => {
    const { request, loading } = useHttp();
    const [pages, setPages] = useState(null);

    const getPages = useCallback(async () => {
        try {
            const fetched = await request(`/api/page/pageroutes`, "GET");
            setPages(fetched);
        } catch (e) {}
    }, [request]);

    useEffect(() => {
        getPages();
    }, [getPages]);

    if (loading) {
        return <Loader />;
    }

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

                {/* <Route path='/stream'>
                    <VideoPlayer />
                </Route> */}
                {!loading &&
                    pages &&
                    pages.map((page) => {
                        return (
                            <Route key={page.linkUrl} path={`/${page.linkUrl}`}>
                                <LinkPage />
                            </Route>
                        );
                    })}

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

            <Redirect to='/create' />
        </Switch>
    );
};
