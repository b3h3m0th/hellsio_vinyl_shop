import React, { useEffect, useState } from "react";
import {
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
} from "victory";
import { fetchOrderTimeline } from "../fetchData";

const RevenueChart = () => {
  const [timeline, setTimeline] = useState<Array<any>>();
  const [zoomDomain, setZoomDomain] = useState<any>();

  const getDaysArray = (s: Date, e: Date) => {
    for (var a = [], d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
      a.push(new Date(d));
    }
    return a;
  };

  const fillMissingDaysInDateArray = (data: { invoice_day: Date }[]) => {
    data.forEach(
      (d: { invoice_day: Date }, i: number, a: { invoice_day: Date }[]) => {
        console.log(console.log(a[i + 1]));
      }
    );
  };

  useEffect(() => {
    (async () => {
      setTimeline((await fetchOrderTimeline()) as any);
    })();
  }, []);

  timeline && fillMissingDaysInDateArray(timeline as { invoice_day: Date }[]);

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
              brushDomain={zoomDomain}
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
