import React, { useCallback, useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { OtherPage } from "../pages/OtherPage";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "./Loader";

export const PagesRoutes = () => {
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

    return (
        !loading &&
        pages &&
        pages.map((page) => {
            return (
                <Route key={page.linkUrl} path={`/${page.linkUrl}`}>
                    <OtherPage page={page} />
                </Route>
            );
        })
    );
};
