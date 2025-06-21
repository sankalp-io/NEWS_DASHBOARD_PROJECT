import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import { useState } from "react";

const PayoutTable = ({ articles }) => {
  const [rates, setRates] = useState({});

  const authorArticles = articles.reduce((acc, article) => {
    const author = article.author || "Unknown";
    if (!acc[author]) acc[author] = [];
    acc[author].push(article);
    return acc;
  }, {});

  const handleRateChange = (author, value) => {
    setRates((prev) => ({ ...prev, [author]: parseFloat(value) || 0 }));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Author</TableCell>
          <TableCell># Articles</TableCell>
          <TableCell>Payout Rate ($)</TableCell>
          <TableCell>Total ($)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(authorArticles).map(([author, articles]) => {
          const rate = rates[author] || 0;
          return (
            <TableRow key={author}>
              <TableCell>{author}</TableCell>
              <TableCell>{articles.length}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  size="small"
                  value={rate}
                  onChange={(e) => handleRateChange(author, e.target.value)}
                />
              </TableCell>
              <TableCell>{(rate * articles.length).toFixed(2)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default PayoutTable;
