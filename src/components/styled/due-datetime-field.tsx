import { Box } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface DueDateTimeFieldProps {
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
    helperText?: string;
    label?: string;
}

export function DueDateTimeField({
    value,
    onChange,
    error = false,
    helperText = "Pick the deadline date and time",
    label = "Due Date & Time *",
}: DueDateTimeFieldProps) {
    return (
        <Box
            sx={{
                margin: 0,
                padding: 0,
                ".MuiFormControl-root": {
                    margin: 0,
                },
            }}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label={label}
                    value={value ? dayjs(value) : null}
                    onChange={(nextValue) => {
                        onChange(nextValue ? nextValue.toISOString() : "");
                    }}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            error,
                            helperText,
                            FormHelperTextProps: {
                                sx: {
                                    color: error
                                        ? "error.main"
                                        : "text.secondary",
                                    margin: "6px 0 0 0",
                                    fontSize: "0.78rem",
                                },
                            },
                            sx: {
                                margin: 0,
                                "& .MuiInputBase-root": {
                                    height: 42,
                                    borderRadius: "10px",
                                    backgroundColor: "#fff",
                                    paddingRight: "4px",
                                },
                                "& .MuiInputBase-input": {
                                    padding: "9px 14px !important",
                                    fontSize: "0.95rem",
                                },
                                "& .MuiPickersInputBase-root": {
                                    height: 42,
                                    borderRadius: "10px",
                                    backgroundColor: "#fff",
                                    paddingRight: "4px",
                                },
                                "& .MuiPickersSectionList-root": {
                                    padding: "9px 14px",
                                    fontSize: "0.95rem",
                                    lineHeight: "1.35rem",
                                },
                                "& .MuiPickersInputBase-sectionsContainer": {
                                    padding: "9px 14px",
                                },
                                "& .MuiInputLabel-root": {
                                    transform: "translate(14px, 12px) scale(1)",
                                    fontSize: "0.9rem",
                                },
                                "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                                    transform:
                                        "translate(14px, -8px) scale(0.75)",
                                },
                                "& .MuiInputAdornment-root": {
                                    marginRight: "2px",
                                },
                                "& .MuiPickersInputAdornment-root": {
                                    marginRight: "2px",
                                },
                            },
                        },
                        openPickerButton: {
                            color: "primary",
                            sx: {
                                borderRadius: "8px",
                                marginRight: 0,
                                padding: "5px",
                            },
                        },
                        desktopPaper: {
                            sx: {
                                borderRadius: 4,
                                border: (theme) =>
                                    `1px solid ${theme.palette.primary.main}22`,
                                boxShadow: "0 20px 44px rgba(24, 26, 32, 0.18)",
                            },
                        },
                        mobilePaper: {
                            sx: {
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            },
                        },
                        actionBar: {
                            actions: ["today", "cancel", "accept"],
                            sx: {
                                width: "100%",
                                justifyContent: "flex-end",
                                "& .MuiButton-root:first-of-type": {
                                    marginRight: "auto",
                                },
                            },
                        },
                    }}
                    sx={{
                        width: "100%",
                        margin: 0,
                        "& .MuiInputAdornment-root .MuiIconButton-root": {
                            color: "primary.main",
                        },
                    }}
                />
            </LocalizationProvider>
        </Box>
    );
}
