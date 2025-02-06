"use client";

import React from "react";
import styles from "./stats-graph.module.css";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";
import { IStat } from "@/interfaces/origamid/stats";

type GraphData = {
  x: string;
  y: number;
};

export default function StatsGraph({ stats }: { stats: IStat[] }) {
  const [graph, setGraph] = React.useState<GraphData[]>([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const graphData = stats.map((item) => {
      return {
        x: item.title,
        y: Number(item.acessos),
      };
    });

    setTotal(
      stats.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b, 0)
    );
    setGraph(graphData);
  }, [stats]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Entrances - {total}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: "#fff",
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: "#333",
            },
          }}
        />
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment="start" data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
}
