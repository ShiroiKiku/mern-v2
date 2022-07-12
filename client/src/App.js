import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";
import "materialize-css";
import Footer from "./components/Footer";
import "../src/style/style.css";
import "../src/style/index.sass";
import findToDatabase from "./services/admin/findToDatabase";
// import "bootstrap";

function App() {
    const { token, login, logout, userId, ready } = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <Loader />;
    }

    const navbarLinks = [
        {
            _id: 1,
            navItemUrl: "links",
            navItemName: "Ссылки",
            navItemDropItems: [],
        },
        {
            _id: 2,
            navItemUrl: "stream2",
            navItemName: "дроп1",
            navItemDropItems: [
                { dropItemLink: "stream1", dropItemName: "Стрим1" },
            ],
        },
        {
            _id: 3,
            navItemUrl: "stream4",
            navItemName: "дроп2",
            navItemDropItems: [
                { dropItemLink: "stream1", dropItemName: "Стрим5" },
                { dropItemLink: "stream2", dropItemName: "Стрим6" },
                { dropItemLink: "stream3", dropItemName: "Стрим7" },
            ],
        },
        {
            _id: 4,
            navItemUrl: "videochat",
            navItemName: "Видеоконференция",
            navItemDropItems: [],
        },

        {
            _id: 6,
            navItemUrl: "createlink",
            navItemName: "Создание страницы",
            navItemDropItems: [],
        },
    ];
    findToDatabase("navigate").then((res) => {
        for (let key of res) {
            navbarLinks.push(key);
        }
    });

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                userId,
                isAuthenticated,
            }}>
            <Router>
                <Navbar />
                <main className='container main'>{routes}</main>
                <Footer />
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
