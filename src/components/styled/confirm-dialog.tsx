import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    styled,
} from "@mui/material";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

export function ConfirmDialog({
    open,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    loading = false,
    onConfirm,
    onClose,
}: ConfirmDialogProps) {
    return (
        <DialogRoot
            open={open}
            onClose={loading ? undefined : onClose}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <Typography id="confirm-dialog-description" variant="body1">
                    {message}
                </Typography>
                <Box className="accent" />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={onClose}
                    disabled={loading}
                >
                    {cancelText}
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </DialogRoot>
    );
}

const DialogRoot = styled(Dialog)(({ theme }) => ({
    ".MuiDialog-paper": {
        borderRadius: 14,
        overflow: "hidden",
        border: `1px solid ${theme.palette.primary.main}22`,
    },
    ".MuiDialogTitle-root": {
        fontWeight: 700,
        color: theme.palette.primary.main,
        paddingBottom: theme.spacing(1),
    },
    ".MuiDialogContent-root": {
        color: theme.palette.text.primary,
        paddingTop: theme.spacing(1),
        position: "relative",
    },
    ".accent": {
        marginTop: theme.spacing(2),
        height: 4,
        borderRadius: 999,
        background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    },
    ".MuiDialogActions-root": {
        padding: theme.spacing(2, 3, 2.5),
        gap: theme.spacing(1),
    },
}));
