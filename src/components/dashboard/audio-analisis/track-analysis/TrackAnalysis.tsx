import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";

import { Chart } from "./chart/Chart";
import { useChartOptions } from "./chart/useChartOptions";
import { dataTrackFeature } from "./mock/dataTrackFeature";

import style from "./style.module.css";
import { ModalFeatures } from "./ModalFeatures";

export const TrackAnalysis: React.FunctionComponent = () => {
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
        dataTrackFeature.danceability,
        dataTrackFeature.energy,
        dataTrackFeature.loudness,
        dataTrackFeature.speechiness,
        dataTrackFeature.acousticness,
        dataTrackFeature.instrumentalness,
        dataTrackFeature.liveness,
        dataTrackFeature.valence,
      ],
    },
  ];

  return (
    <Card sx={{ height: "100%" }} className={style.cardAnalysis}>
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
      <ModalFeatures open={open} handleClose={handleClose} />
    </Card>
  );
};
