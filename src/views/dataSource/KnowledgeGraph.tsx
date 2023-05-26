import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import graph from "mock/knowledge-graph.json";
import { Loading } from "components/shared";

const KnowledgeGraph = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setLoading(true);
    const chart = echarts.init(chartRef.current!);
    const option = {
      tooltip: {},
      legend: [
        {
          data: graph.categories.map(function (a: { name: string }) {
            return a.name;
          }),
        },
      ],
      series: [
        {
          name: "Les Miserables",
          type: "graph",
          layout: "none",
          data: graph.nodes,
          links: graph.links,
          categories: graph.categories,
          roam: true,
          label: {
            show: true,
            position: "right",
            formatter: "{b}",
          },
          labelLayout: {
            hideOverlap: true,
          },
          scaleLimit: {
            min: 0.4,
            max: 2,
          },
          lineStyle: {
            color: "source",
            curveness: 0.3,
          },
        },
      ],
    };
    chart.setOption(option);
    setLoading(false);
    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <Loading loading={loading}>
      <div className="w-full h-full" ref={chartRef}></div>
    </Loading>
  );
};

export default KnowledgeGraph;
