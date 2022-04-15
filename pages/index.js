import Head from "next/head";
import { google } from "googleapis";
import Item from "../components/Item";

export async function getServerSideProps() {
  const auth = await google.auth.getClient({ scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"] });
  const sheets = google.sheets({ version: "v4", auth });
  const ranges = "Sheet1!A2:E";
  const response = await sheets.spreadsheets.values.batchGet({
    spreadsheetId: process.env.SHEET_ID,
    ranges: ranges,
  });
  const res = response.data.valueRanges;

  return {
    props: {
      res,
    },
  };
}

export default function Home({ res }) {
  const indexAttrs = ["ID", "Simplified", "Traditional", "Pinyin", "Definition"];
  let rowData;
  res.forEach((data) => {
    rowData = data.values;
  });

  return (
    <div className="container">
      <Head>
        <title>zhongwen word bank</title>
        <meta name="description" content="chinese study tool" />
      </Head>

      <main className="wrapper">
        <div className="table__container">
          <table>
            <thead>
              <tr>
                {indexAttrs.map((attr, index) => {
                  return <th key={index}>{attr}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {rowData.map((attr) => {
                return <Item key={attr[0]} data={attr} />;
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
