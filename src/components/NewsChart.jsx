import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from "recharts";
import { Typography, Box } from "@mui/material";

const NewsChart = ({ articles }) => {
  if (!Array.isArray(articles) || articles.length === 0) {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography align="center" color="textSecondary">
          No data available to display the chart.
        </Typography>
      </Box>
    );
  }

  const authorCounts = articles.reduce((acc, article) => {
    const author = article.author?.trim() || "Unknown";
    acc[author] = (acc[author] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(authorCounts)
    .map(([author, count]) => ({
      author: author.length > 20 ? `${author.slice(0, 18)}…` : author,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15); // Only top 15 authors

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="author"
          angle={-30}
          textAnchor="end"
          interval={0}
          height={80}
        >
          <Label value="Authors" position="insideBottom" offset={-10} />
        </XAxis>
        <YAxis allowDecimals={false}>
          <Label value="Number of Articles" angle={-90} position="insideLeft" />
        </YAxis>
        <Tooltip />
        <Bar dataKey="count" fill="#1976d2" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default NewsChart;
