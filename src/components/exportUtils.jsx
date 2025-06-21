import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";

export const exportToPDF = (articles) => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [["Title", "Author", "Date"]],
    body: articles.map((a) => [
      a.title,
      a.author || "Unknown",
      new Date(a.publishedAt).toLocaleDateString(),
    ]),
  });
  doc.save("articles.pdf");
};

export const exportToCSV = (articles) => {
  const csv = Papa.unparse(
    articles.map((a) => ({
      title: a.title,
      author: a.author || "Unknown",
      date: new Date(a.publishedAt).toLocaleDateString(),
    }))
  );
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "articles.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
