import {
    Avatar,
    Box,
    Chip,
    Divider,
    Paper,
    Typography,
    styled,
} from "@mui/material";
import { useSelector } from "react-redux";
import AppAutoContainer from "../../components/app-auto-container";
import { userDataSelector } from "../../store";

function formatDateTime(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "-";
    }
    return date.toLocaleString();
}

export default function Profile() {
    const userData = useSelector(userDataSelector);

    if (!userData) {
        return (
            <ProfilePageRoot>
                <AppAutoContainer>
                    <Paper className="profileCard" elevation={2}>
                        <Typography variant="h5" className="title">
                            Profile
                        </Typography>
                        <Typography color="text.secondary">
                            No profile data available.
                        </Typography>
                    </Paper>
                </AppAutoContainer>
            </ProfilePageRoot>
        );
    }

    const fullName = `${userData.firstName} ${userData.lastName}`.trim();

    return (
        <ProfilePageRoot>
            <AppAutoContainer>
                <Paper className="profileCard" elevation={2}>
                    <Box className="profileHeader">
                        <Avatar className="avatar">{fullName.charAt(0)}</Avatar>
                        <Box className="titleSection">
                            <Typography variant="h5" className="title">
                                {fullName || "User"}
                            </Typography>
                            <Typography color="text.secondary">
                                {userData.email}
                            </Typography>
                        </Box>
                        <Chip
                            label={
                                userData.verified ? "Verified" : "Unverified"
                            }
                            color={userData.verified ? "success" : "warning"}
                            variant="outlined"
                        />
                    </Box>

                    <Divider className="divider" />

                    <Box className="detailsGrid">
                        <DetailItem label="User ID" value={userData._id} />
                        <DetailItem label="Role" value={userData.role} />
                        <DetailItem
                            label="Created At"
                            value={formatDateTime(userData.created_at)}
                        />
                        <DetailItem
                            label="Updated At"
                            value={formatDateTime(userData.updated_at)}
                        />
                    </Box>
                </Paper>
            </AppAutoContainer>
        </ProfilePageRoot>
    );
}

function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <Box className="detailItem">
            <Typography variant="caption" className="label">
                {label}
            </Typography>
            <Typography variant="body1" className="value">
                {value || "-"}
            </Typography>
        </Box>
    );
}

const ProfilePageRoot = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4, 0),

    ".profileCard": {
        borderRadius: 4,
        padding: theme.spacing(3),
    },

    ".profileHeader": {
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(2),
        flexWrap: "wrap",
    },

    ".avatar": {
        width: 64,
        height: 64,
        fontSize: "1.8rem",
        fontWeight: 600,
        backgroundColor: theme.palette.primary.main,
    },

    ".titleSection": {
        flexGrow: 1,
    },

    ".title": {
        fontWeight: 600,
    },

    ".divider": {
        margin: theme.spacing(2, 0, 3),
    },

    ".detailsGrid": {
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: theme.spacing(2),

        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: "1fr",
        },
    },

    ".detailItem": {
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 12,
        padding: theme.spacing(1.5, 2),
    },

    ".label": {
        display: "block",
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(0.5),
    },

    ".value": {
        fontWeight: 500,
        wordBreak: "break-word",
    },
}));
