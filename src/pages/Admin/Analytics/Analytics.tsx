import React, { useEffect, useState } from "react";
import "./Analytics.scss";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryScatter,
  VictoryCursorContainer,
  VictoryBoxPlot,
} from "victory";
import { fetchTopCustomers, fetchTopSellingAlbums } from "./fetchData";
import Title from "../../../components/Title/Title";

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<{
    topCustomers: Array<any>;
    topSellingAlbums: Array<any>;
  }>();

  useEffect(() => {
    (async () => {
      const topCustomers = await fetchTopCustomers(5);
      const topSellingAlbums = await fetchTopSellingAlbums(5);

      setAnalyticsData({
        topCustomers: topCustomers as any,
        topSellingAlbums: topSellingAlbums as any,
      });
    })();
  }, []);

  console.log(analyticsData);

  return (
    <div className="admin-analytics">
      <div className="admin-analytics__wrapper">
        <Title link={`admin/analytics`} title="Anayltics" />
        <div className="admin-analytics__wrapper__chart">
          <div>Top Customers by Orders</div>
          <div>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={50}
              width={1000}
            >
              <VictoryBar
                style={{
                  data: { fill: "var(--color-red)", width: 50 },
                }}
                data={[...(analyticsData?.topCustomers || [])]?.map(
                  (c: any) => {
                    return { x: c.email, y: 0, y0: c.invoice_count };
                  }
                )}
                animate={{ onLoad: { duration: 0 } }}
              />
              {/* <VictoryScatter
                containerComponent={
                  <VictoryCursorContainer
                    cursorLabel={({ x, y }) =>
                      `${x.toPrecision(2)}, ${y.toPrecision(2)}`
                    }
                  />
                }
              /> */}
              <VictoryBoxPlot
                boxWidth={20}
                data={[
                  { x: 1, y: [1, 2, 3, 5] },
                  { x: 2, y: [3, 2, 8, 10] },
                  { x: 3, y: [2, 8, 6, 5] },
                  { x: 4, y: [1, 3, 2, 9] },
                ]}
              />
            </VictoryChart>
          </div>
        </div>
        <div className="admin-analytics__wrapper__chart">
          <div>Top selling Albums</div>
          <div>
            <VictoryChart
              theme={VictoryTheme.material}
              width={1200}
              domainPadding={50}
            >
              <VictoryBar
                style={{ data: { fill: "var(--color-red)", width: 50 } }}
                data={[...(analyticsData?.topSellingAlbums || [])]?.map(
                  (p: any) => {
                    return { x: p.code, y: 0, y0: p.sold_count };
                  }
                )}
                animate={{ onLoad: { duration: 0 } }}
              />
            </VictoryChart>
          </div>
        </div>
        <div className="admin-analytics__wrapper__chart">
          <div>Top selling Albums</div>
          <div>
            <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
              <VictoryBar
                style={{ data: { fill: "var(--color-red)" } }}
                data={[
                  { x: "Peter", y: 0, y0: 5 },
                  { x: "Simon", y: 0, y0: 3 },
                  { x: "Paul", y: 0, y0: 2 },
                  { x: "Jonas", y: 0, y0: 8 },
                ]}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                }}
              />
            </VictoryChart>
          </div>
        </div>
        <div className="admin-analytics__wrapper__chart">
          <div>Top selling Albums</div>
          <div>
            <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
              <VictoryBar
                style={{ data: { fill: "var(--color-red)" } }}
                data={[
                  { x: "Peter", y: 0, y0: 5 },
                  { x: "Simon", y: 0, y0: 3 },
                  { x: "Paul", y: 0, y0: 2 },
                  { x: "Jonas", y: 0, y0: 8 },
                ]}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                }}
              />
            </VictoryChart>
          </div>
        </div>
        <div className="admin-analytics__wrapper__chart">
          <div>Top selling Albums</div>
          <div>
            <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
              <VictoryBar
                style={{ data: { fill: "var(--color-red)" } }}
                data={[
                  { x: "Peter", y: 0, y0: 5 },
                  { x: "Simon", y: 0, y0: 3 },
                  { x: "Paul", y: 0, y0: 2 },
                  { x: "Jonas", y: 0, y0: 8 },
                ]}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                }}
              />
            </VictoryChart>
          </div>
        </div>
        <div className="admin-analytics__wrapper__chart">
          <div>Top selling Albums</div>
          <div>
            <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
              <VictoryBar
                style={{ data: { fill: "var(--color-red)" } }}
                data={[
                  { x: "Peter", y: 0, y0: 5 },
                  { x: "Simon", y: 0, y0: 3 },
                  { x: "Paul", y: 0, y0: 2 },
                  { x: "Jonas", y: 0, y0: 8 },
                ]}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                }}
              />
            </VictoryChart>
          </div>
        </div>
        <div className="admin-analytics__wrapper__chart">
          <div>Top selling Albums</div>
          <div>
            <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
              <VictoryBar
                style={{ data: { fill: "var(--color-red)" } }}
                data={[
                  { x: "Peter", y: 0, y0: 5 },
                  { x: "Simon", y: 0, y0: 3 },
                  { x: "Paul", y: 0, y0: 2 },
                  { x: "Jonas", y: 0, y0: 8 },
                ]}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                }}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
