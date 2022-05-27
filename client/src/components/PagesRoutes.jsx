import React from "react";
import React, { useCallback, useState, useEffect } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";

import { useHttp } from "../hooks/http.hook";

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

    return <div></div>;
};
