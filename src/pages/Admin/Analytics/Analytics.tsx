import React, { useEffect, useState } from "react";
import "./Analytics.scss";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryPie,
  VictoryLabel,
} from "victory";
import {
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
  }>();
  const [topCustomerAmount, setTopCustomersAmount] = useState<number>(5);
  const [topSellingAlbumsAmount, setTopSellingAlbumsAmount] = useState<number>(
    5
  );

  useEffect(() => {
    (async () => {
      const topCustomers = await fetchTopCustomers(topCustomerAmount);
      const topSellingAlbums = await fetchTopSellingAlbums(
        topSellingAlbumsAmount
      );
      const topSellingCountries = await fetchTopSellingCountries(5);

      setAnalyticsData({
        topCustomers: topCustomers as any,
        topSellingAlbums: topSellingAlbums as any,
        topSellingCountries: topSellingCountries as any,
      });
    })();
  }, [topCustomerAmount, topSellingAlbumsAmount]);

  return (
    <div className="admin-analytics">
      <div className="admin-analytics__wrapper">
        <Title link={`admin/analytics`} title="Anayltics" />
        <div className="admin-analytics__wrapper__chart">
          <div className="admin-analytics__wrapper__chart__title">
            Top Customers by Orders{" "}
          </div>
          Amount:{" "}
          <input
            type="number"
            className="admin-analytics__wrapper__chart__input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTopCustomersAmount(+e.target.value);
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
                  labels: { fill: "var(--color-white)" },
                }}
                data={[...(analyticsData?.topCustomers || [])]?.map(
                  (c: any) => {
                    return { x: c.email, y: 0, y0: c.invoice_count };
                  }
                )}
                animate={{ onLoad: { duration: 0 } }}
              />
            </VictoryChart>
          </div>
        </div>
        <div className="admin-analytics__wrapper__chart">
          <div className="admin-analytics__wrapper__chart__title">
            Top selling Albums
          </div>
          Amount:{" "}
          <input
            type="number"
            className="admin-analytics__wrapper__chart__input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
            Top countries
          </div>
          <div>
            <VictoryPie
              data={[...(analyticsData?.topSellingCountries || [])].map(
                (c: any) => {
                  console.log(c);
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
