import { Box, Typography } from "@mui/material";

const Banner: React.FC = () => {
  return (
    <Box className="banner" p={1} bgcolor="#bf0000" color="primary.contrastText">
      <Typography  variant="subtitle2" noWrap component="span" sx={{ flexGrow: 1, alignSelf: "flex-end" }}>
        FREE delivery for transaction over 40 EUR
      </Typography>
    </Box>
  );
};

export default Banner;
