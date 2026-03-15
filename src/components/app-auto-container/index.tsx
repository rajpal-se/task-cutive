import { Box, styled, type SxProps } from "@mui/material";

export default function AppAutoContainer({
    children,
    sx,
    className = "wrapper",
}: {
    className?: string;
    children: React.ReactNode;
    sx?: SxProps;
}) {
    const { ...restSx } = sx || {};
    return (
        <AppAutoContainerWrapper className={className} sx={{ ...restSx }}>
            {children}
        </AppAutoContainerWrapper>
    );
}

const AppAutoContainerWrapper = styled(Box)(() => ({
    width: "800px",
    height: "100%",
    margin: "0 auto",
}));
