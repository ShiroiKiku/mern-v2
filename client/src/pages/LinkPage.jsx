import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";
import { Page } from "../components/Page";

export const LinkPage = () => {
    // const { request, loading } = useHttp();
    // const [page, setPage] = useState(null);
    // console.log(pages);
    // const getPage = useCallback(async () => {
    //     try {
    //         const fetched = await request(`/api/page/pageid`, "GET", {
    //             page: pages,
    //         });
    //         setPage(fetched);
    //     } catch (e) {}
    // }, [request]);

    // useEffect(() => {
    //     getPage();
    // }, [getPage]);

    // if (loading) {
    //     return <Loader />;
    // }

    // return <>{!loading && page && <Page page={page} />}</>;
    return <h1>qwe</h1>;
};
