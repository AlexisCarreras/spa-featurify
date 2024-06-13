import { Box, CircularProgress } from "@mui/material";

interface useLoadingProps {
  height: string;
  size: number;
}

export const UseLoading: React.FunctionComponent<useLoadingProps> = ({
  height,
  size,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: { height },
      }}
    >
      <CircularProgress sx={{ color: "#4E36F5" }} size={size} />
    </Box>
  );
};
