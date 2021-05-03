import React, { useEffect, useState } from "react";
import {
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
} from "victory";
import Title from "../../../../components/Title/Title";
import { fetchOrderTimeline } from "../fetchData";

const RevenueChart = () => {
  const [timeline, setTimeline] = useState<Array<any>>();
  const [selectedDomain, setSelectedDomain] = useState<any>();
  const [zoomDomain, setZoomDomain] = useState<any>();

  useEffect(() => {
    (async () => {
      setTimeline((await fetchOrderTimeline()) as any);
    })();
  }, []);

  return (
    <div className="admin-analytics__wrapper__chart">
      <div className="admin-analytics__wrapper__chart__title">Revenue</div>
      <div>
        <VictoryChart
          width={1100}
          height={400}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              responsive={false}
              zoomDimension="x"
              zoomDomain={zoomDomain}
              onZoomDomainChange={(domain) => setZoomDomain(domain)}
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "var(--color-red)" },
            }}
            data={[...(timeline || [])]?.map((p: any, i: number) => {
              return {
                y: p.total_sum,
                x: new Date(p.invoice_day),
              };
            })}
          />
        </VictoryChart>
        <VictoryChart
          width={550}
          height={90}
          scale={{ x: "time" }}
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          containerComponent={
            <VictoryBrushContainer
              responsive={false}
              brushDimension="x"
              brushDomain={selectedDomain}
              onBrushDomainChange={(domain) => setZoomDomain(domain)}
            />
          }
        >
          <VictoryAxis
            tickValues={[...(timeline || [])]?.map((p: any, i: number) => {
              return new Date(p.invoice_day);
            })}
            tickFormat={(x) => new Date(x).getFullYear()}
          />
          <VictoryLine
            style={{
              data: { stroke: "var(--color-red)" },
            }}
            data={[...(timeline || [])]?.map((p: any, i: number) => {
              return {
                y: p.total_sum,
                x: new Date(p.invoice_day),
              };
            })}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default RevenueChart;
