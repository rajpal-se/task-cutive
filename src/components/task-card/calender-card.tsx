import { Box, styled } from "@mui/material";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";

interface CalenderCardProps {
    date: Date;
    isImportant?: boolean;
}

export default function CalenderCard(props: CalenderCardProps) {
    const { date, isImportant } = props;
    return (
        <CalenderCardContainer>
            <Box className="calender-logo">
                {isImportant && <LabelImportantIcon className="important" />}
                <p className="day">
                    {date?.toLocaleString("default", { weekday: "short" })}
                </p>
                <div className="date-info">
                    <div className="date">{date?.getDate()}</div>
                    <div className="left-con">
                        <div className="month">
                            {date?.toLocaleString("default", {
                                month: "short",
                            })}
                        </div>
                        <div className="year">{date?.getFullYear()}</div>
                    </div>
                </div>
            </Box>
        </CalenderCardContainer>
    );
}

const CalenderCardContainer = styled(Box)(({ theme }) => ({
    height: "100px",
    width: "100px",
    // backgroundColor: "#eee",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    borderRadius: "8px",
    padding: "8px",

    ".calender-logo": {
        backgroundColor: "#444",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "75%",
        width: "100%",
        borderRadius: "8px",
        position: "relative",
        zIndex: 1,

        ".important": {
            position: "absolute",
            top: "-29px",
            right: "-20px",
            color: theme.palette.error.main,
        },

        "&:before, &:after": {
            content: '""',
            position: "absolute",
            top: "0px",
            height: "18%",
            width: "15%",
            backgroundColor: "#444",
            // backgroundColor: "red",
            borderRadius: "4px 4px 0px 0px",
            transform: "translateY(-80%)",
            zIndex: 0,
        },
        "&:before": {
            left: "20%",
        },
        "&:after": {
            right: "20%",
        },

        ".day": {
            color: "#fff",
            fontSize: "12px",
            margin: "0px",
            padding: "1px",
            // backgroundColor: "#888",
        },

        ".date-info": {
            flexGrow: 1,
            display: "flex",
            backgroundColor: theme.palette.background.paper,
            alignSelf: "stretch",
            borderRadius: "5px",
            margin: "4px",
            marginTop: "1px",
            fontSize: "10px",

            ">div": {
                flex: 1,
            },
        },
        ".date": {
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 500,
        },
        ".left-con": {
            display: "flex",
            flexDirection: "column",
            fontSize: "12px",
            fontWeight: 500,
            alignItems: "center",
            justifyContent: "center",

            ">.month": {
                textTransform: "uppercase",
            },
        },
    },
}));
