import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import AllProducts from "../../src/components/dashboard/AllPodcasts";
import { ThemeProvider } from "@mui/material";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { useEffect } from "react";

export default function Index() {
    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem("mycreator"))
        if (!admin) {
            window.location.href = "/login-creator"
        }
    }, [])
    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
            .footer{
                display: none;
            }
            `}</style>
            <FullLayout>
                <Grid container spacing={0}>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={8}>
                        <AllProducts />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <BlogCard />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    );
}
