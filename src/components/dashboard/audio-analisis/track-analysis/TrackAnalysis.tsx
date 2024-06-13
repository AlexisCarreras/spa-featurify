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

import style from "./style.module.css";
import { ModalFeatures } from "./ModalFeatures";
import { TrackAnalysisProp } from "../type";
import { UseLoading } from "../../../../hooks/UseLoading";

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
  loadingFeatures,
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
      {loadingFeatures ? (
        <UseLoading height="64.5vh" size={100} />
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
