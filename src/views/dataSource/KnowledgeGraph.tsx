import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Loading } from "components/shared";
import { Graph } from "../../models/echarts";
import {
  apiGetDataSourceVertices,
  makeGraph,
} from "../../services/DataSourceService";
import { useParams } from "react-router-dom";
import { apiGetEdgesByVertices } from "../../services/EdgeService";

const KnowledgeGraph = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const { id: dataSourceId } = useParams<{ id: string }>();

  useEffect(() => {
    setLoading(true);
    const chart = echarts.init(chartRef.current!);
    composeGraph(dataSourceId!)
      .then((data) => {
        const graph = makeGraph(data.vertices, data.edges);
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

const composeGraph = async (dataSourceId: string) => {
  const vertices = await apiGetDataSourceVertices(dataSourceId);
  const vertexIds = vertices.data.map((v) => v.id);
  console.log("vertexIds", vertexIds);
  const edge = await apiGetEdgesByVertices(vertexIds);
  return { vertices: vertices.data, edges: edge.data };
};

export default KnowledgeGraph;
