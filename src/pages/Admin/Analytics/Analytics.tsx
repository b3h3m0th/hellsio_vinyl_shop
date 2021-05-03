import React, { useEffect, useState } from "react";
import "./Analytics.scss";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryPie,
  VictoryLine,
  VictoryZoomContainer,
  VictoryBrushContainer,
  VictoryAxis,
} from "victory";
import {
  fetchOrderTimeline,
  fetchTopCustomers,
  fetchTopSellingAlbums,
  fetchTopSellingCountries,
} from "./fetchData";
import Title from "../../../components/Title/Title";
import { colorShade } from "../../../util/color";

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<{
    topCustomers: Array<any>;
    topSellingAlbums: Array<any>;
    topSellingCountries: Array<any>;
    timeline: Array<any>;
  }>();
  const [topCustomerAmount, setTopCustomersAmount] = useState<number>(5);
  const [topSellingAlbumsAmount, setTopSellingAlbumsAmount] = useState<number>(
    5
  );

  const [selectedDomain, setSelectedDomain] = useState<any>();
  const [zoomDomain, setZoomDomain] = useState<any>();

  useEffect(() => {
    (async () => {
      const topCustomers = await fetchTopCustomers(topCustomerAmount);
      const topSellingAlbums = await fetchTopSellingAlbums(
        topSellingAlbumsAmount
      );
      const topSellingCountries = await fetchTopSellingCountries(5);
      const timeline = await fetchOrderTimeline();

      setAnalyticsData({
        topCustomers: topCustomers as any,
        topSellingAlbums: topSellingAlbums as any,
        topSellingCountries: topSellingCountries as any,
        timeline: timeline as any,
      });
    })();
  }, [topCustomerAmount, topSellingAlbumsAmount]);

  return (
    <div className="admin-analytics">
      <div className="admin-analytics__wrapper">
        <Title link={`admin/analytics`} title="Analytics" />

        <div className="admin-analytics__wrapper__chart">
          <div className="admin-analytics__wrapper__chart__title">
            Revenue per Day
          </div>
          <div>
            <VictoryChart
              width={550}
              height={300}
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
                  data: { stroke: "tomato" },
                }}
                data={[
                  { x: new Date(1982, 1, 1), y: 125 },
                  { x: new Date(1987, 1, 1), y: 257 },
                  { x: new Date(1993, 1, 1), y: 345 },
                  { x: new Date(1997, 1, 1), y: 515 },
                  { x: new Date(2001, 1, 1), y: 132 },
                  { x: new Date(2005, 1, 1), y: 305 },
                  { x: new Date(2011, 1, 1), y: 270 },
                  { x: new Date(2015, 1, 1), y: 470 },
                ]}
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
                  onBrushDomainChange={(domain) => setSelectedDomain(domain)}
                />
              }
            >
              <VictoryAxis
                tickValues={[
                  new Date(1985, 1, 1),
                  new Date(1990, 1, 1),
                  new Date(1995, 1, 1),
                  new Date(2000, 1, 1),
                  new Date(2005, 1, 1),
                  new Date(2010, 1, 1),
                  new Date(2015, 1, 1),
                ]}
                tickFormat={(x) => new Date(x).getFullYear()}
              />
              <VictoryLine
                style={{
                  data: { stroke: "tomato" },
                }}
                data={[
                  { x: new Date(1982, 1, 1), y: 125 },
                  { x: new Date(1987, 1, 1), y: 257 },
                  { x: new Date(1993, 1, 1), y: 345 },
                  { x: new Date(1997, 1, 1), y: 515 },
                  { x: new Date(2001, 1, 1), y: 132 },
                  { x: new Date(2005, 1, 1), y: 305 },
                  { x: new Date(2011, 1, 1), y: 270 },
                  { x: new Date(2015, 1, 1), y: 470 },
                ]}
              />
            </VictoryChart>
          </div>
        </div>

        <div className="admin-analytics__wrapper__chart">
          <div className="admin-analytics__wrapper__chart__title">
            Revenue per Day
          </div>
          <div>
            <VictoryChart
              theme={VictoryTheme.material}
              width={1100}
              domainPadding={50}
            >
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine
                  style={{
                    data: { stroke: "var(--color-red)" },
                    parent: { border: "1px solid #ccc" },
                  }}
                  data={[...(analyticsData?.timeline || [])]?.map(
                    (p: any, i: number) => {
                      return {
                        y: p.total_sum,
                        x: new Date(p.invoice_day).toLocaleDateString(),
                      };
                    }
                  )}
                  interpolation="natural"
                  animate={{
                    duration: 2000,
                  }}
                />
              </VictoryChart>
            </VictoryChart>
          </div>
        </div>
        <div className="admin-analytics__wrapper__chart">
          <div className="admin-analytics__wrapper__chart__title">
            Top Customers by Total Order Value{" "}
          </div>
          Amount:{" "}
          <input
            type="number"
            min={1}
            className="admin-analytics__wrapper__chart__input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (+e.target.value !== 0) setTopCustomersAmount(+e.target.value);
            }}
            value={topCustomerAmount}
          />
          <div>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={50}
              width={1100}
            >
              <VictoryBar
                style={{
                  data: { fill: "var(--color-red)", width: 50 },
                }}
                data={[...(analyticsData?.topCustomers || [])]?.map(
                  (c: any) => {
                    return {
                      x: c.email,
                      y: 0,
                      y0: c.total,
                    };
                  }
                )}
                animate={{ onLoad: { duration: 0 } }}
              />
            </VictoryChart>
          </div>
        </div>
        <div className="admin-analytics__wrapper__chart">
          <div className="admin-analytics__wrapper__chart__title">
            Top Selling Albums
          </div>
          Amount:{" "}
          <input
            type="number"
            min={1}
            className="admin-analytics__wrapper__chart__input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (+e.target.value !== 0)
                setTopSellingAlbumsAmount(+e.target.value);
            }}
            value={topSellingAlbumsAmount}
          />
          <div>
            <VictoryChart
              theme={VictoryTheme.material}
              width={1100}
              domainPadding={50}
            >
              <VictoryBar
                style={{
                  labels: { fill: "var(--color-white)" },
                  data: {
                    fill: "var(--color-red)",
                    width: 50,
                  },
                }}
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
          <div className="admin-analytics__wrapper__chart__title">
            Top countries by orders
          </div>
          <div>
            <VictoryPie
              data={[...(analyticsData?.topSellingCountries || [])].map(
                (c: any) => {
                  return { x: c.country_name, y: c.sold_count };
                }
              )}
              colorScale={[...new Array(6)].map((c: any, i: number) => {
                return colorShade("#ae0b00", 50 * i);
              })}
              innerRadius={100}
              animate={{
                duration: 2000,
              }}
              style={{ labels: { fill: "var(--color-white)" } }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
