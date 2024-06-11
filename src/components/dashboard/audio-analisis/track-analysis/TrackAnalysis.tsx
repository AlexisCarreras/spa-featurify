import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";

import { Chart } from "./chart/Chart";

import style from "./style.module.css";
import { useChartOptions } from "./chart/useChartOptions";

export const TrackAnalysis: React.FunctionComponent = () => {
  const chartOptions = useChartOptions();

  const chartSeries = [
    {
      name: "2024",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 100, 115, 130],
    },
    {
      name: "2023",
      data: [20, 30, 45, 50, 49, 60, 70, 91, 125, 100, 115, 130],
    },
  ];

  return (
    <Card sx={{ height: "100%" }} className={style.cardAnalysis}>
      <CardHeader title="Análisis del Track" />
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="100%"
        />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          //   endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
        >
          Guardar en Favoritos
        </Button>
      </CardActions>
    </Card>
  );
};
