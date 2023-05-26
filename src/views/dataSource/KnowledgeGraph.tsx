import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Loading } from "components/shared";
import { Graph } from "../../models/echarts";
import {
  apiGetDataSourceVertices,
  makeGraph,
} from "../../services/DataSourceService";
import { useParams } from "react-router-dom";

const KnowledgeGraph = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const { id: dataSourceId } = useParams<{ id: string }>();

  useEffect(() => {
    setLoading(true);
    const chart = echarts.init(chartRef.current!);
    apiGetDataSourceVertices(dataSourceId!)
      .then((res) => {
        const graph = makeGraph(res.data);
        console.log(graph);
        updateGraph(chart, graph);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Loading loading={loading} type="cover" className="h-full">
      <div className="w-full h-full" ref={chartRef}></div>
    </Loading>
  );
};

function updateGraph(chart: echarts.ECharts, graph: Graph) {
  const option = {
    tooltip: {},
    legend: [
      {
        data: graph.categories?.map(function (a) {
          return a.name;
        }),
      },
    ],
    series: [
      {
        name: "Les Miserables",
        type: "graph",
        layout: "circular",
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
}

export default KnowledgeGraph;
