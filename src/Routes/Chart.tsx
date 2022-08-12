import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { getOhlcv } from "../api";
import { DataError, IHistorical } from "../Types/CoinType";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { data, isLoading: chartLoading } = useQuery<DataError & IHistorical[]>(
    ["ohlcv", coinId],
    getOhlcv
  );
  return (
    <div>
      {chartLoading ? (
        "Loading Chart..."
      ) : data?.error ? (
        "Data is not found."
      ) : (
        <>
          <ApexChart
            type="candlestick"
            series={[
              {
                data:
                  data?.map((price) => {
                    return {
                      x: new Date(price.time_close * 1000),
                      y: [
                        parseFloat(price.open),
                        parseFloat(price.high),
                        parseFloat(price.low),
                        parseFloat(price.close),
                      ],
                    };
                  }) ?? [],
              },
            ]}
            options={{
              chart: { toolbar: { show: false }, background: "transparent" },
              theme: { mode: "dark" },
              grid: { show: false },
              xaxis: {
                labels: { show: false },
                axisBorder: { show: false },
                axisTicks: { show: false },
              },
              yaxis: {
                show: false,
              },
            }}
          />
        </>
      )}
    </div>
  );
}

export default Chart;
