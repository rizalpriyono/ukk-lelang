import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";
import convertRupiah from "./convertRupiah";

// define a generatePDF function that accepts a tickets argument
const generatePDFAktivity = (data) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = [
    "No",
    "Penawar",
    "Nama Barang",
    "Harga Awal",
    "Penawaran Harga",
    "Tanggal Lelang Berakhir",
    "Tanggal",
  ];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  data.forEach((item, i) => {
    const itemData = [
      i + 1,
      item.masyarakat.username,
      item.lelang.barang.nama,
      `IDR ${convertRupiah(item.lelang.barang.hargaAwal)}`,
      `IDR ${convertRupiah(item.penawaranHarga)}`,
      // called date-fns to format the date on the item
      format(new Date(item.lelang.endTime), "yyyy-MM-dd"),
      format(new Date(item.createdAt), "yyyy-MM-dd HH:mm"),
    ];
    // push each tickcet's info into a row
    tableRows.push(itemData);
  });

  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[1] + date[2] + date[3];
  // ticket title. and margin-top + margin-left
  doc.text("Laporan Aktifitas Pelalangan", 15, 15);
  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  // we define the name of our PDF file.
  doc.save(`Laporan Aktifitas Pelelangan_${dateStr}.pdf`);
};

const generatePDFWinAuction = (data) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = [
    "No",
    "Nama Barang",
    "Harga Awal",
    "Penawar",
    "Harga Akhir",
    "Tanggal Mulai Lelang",
    "Tanggal Lelang Berakhir",
  ];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  data.forEach((item, i) => {
    const itemData = [
      i + 1,
      item.lelang.barang.nama,
      `IDR ${convertRupiah(item.lelang.barang.hargaAwal)}`,
      item.masyarakat.username,
      `IDR ${convertRupiah(item.lelang.hargaAkhir)}`,
      // called date-fns to format the date on the item
      format(new Date(item.lelang.tglLelang), "yyyy-MM-dd"),
      format(new Date(item.lelang.endTime), "yyyy-MM-dd"),
    ];
    // push each tickcet's info into a row
    tableRows.push(itemData);
  });

  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[1] + date[2] + date[3];
  // ticket title. and margin-top + margin-left
  doc.text("Laporan Pemenang Pelelangan", 15, 15);
  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  // we define the name of our PDF file.
  doc.save(`Laporan Pemenang Pelelangan_${dateStr}.pdf`);
};

export { generatePDFAktivity, generatePDFWinAuction };
