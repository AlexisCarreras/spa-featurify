import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
} from "@mui/material";

import { Chart } from "./chart/Chart";
import { useChartOptions } from "./chart/useChartOptions";

import style from "./style.module.css";
import { ModalFeatures } from "./ModalFeatures";
import { TrackAnalysisProp } from "../type";

export const TrackAnalysis: React.FunctionComponent<TrackAnalysisProp> = ({
  dataTrackFeature: {
    danceability,
    energy,
    speechiness,
    acousticness,
    instrumentalness,
    liveness,
    valence,
  },
  loading,
}) => {
  const chartOptions = useChartOptions();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const chartSeries = [
    {
      name: "Feature",
      data: [
        danceability,
        energy,
        speechiness,
        acousticness,
        instrumentalness,
        liveness,
        valence,
      ],
    },
  ];

  return (
    <Card sx={{ height: "100%" }} className={style.cardAnalysis}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "64.5vh",
          }}
        >
          <CircularProgress sx={{ color: "#4E36F5" }} size={100} />
        </Box>
      ) : (
        <>
          <CardHeader title="Análisis del Track" />
          <CardContent>
            <Chart
              height={400}
              options={chartOptions}
              series={chartSeries}
              type="bar"
              width="100%"
            />
          </CardContent>
          <Divider className={style.divider} />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              onClick={handleClickOpen}
              color="inherit"
              className={style.button}
              size="small"
            >
              Descripción de características
            </Button>
          </CardActions>
        </>
      )}
      <ModalFeatures open={open} handleClose={handleClose} />
    </Card>
  );
};
