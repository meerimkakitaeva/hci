import React, {PropsWithChildren} from "react";
import {Box, Container} from "@mui/material";
import {useLocation} from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    const { pathname } = useLocation();

    const showHeaderAndSidebar = pathname !== "/" && pathname !== "/login";

    return (
        <Box sx={{ display: "flex" }}>
            {showHeaderAndSidebar && <Sidebar />}

            <Box sx={{ flexGrow: 1 }}>
                {showHeaderAndSidebar && (
                    <header>
                        <Header />
                    </header>
                )}
                <Container>
                    <main>{children}</main>
                </Container>
            </Box>
        </Box>
    );
};

export default Layout;
