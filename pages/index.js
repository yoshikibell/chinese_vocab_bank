import Head from "next/head";
import { google } from "googleapis";
import Item from "../components/Item";

export async function getServerSideProps(context) {
  const UA = context.req.headers["user-agent"];
  const isMobile = Boolean(UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
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
      deviceType: isMobile ? "mobile" : "desktop",
    },
  };
}

export default function Home({ res, deviceType }) {
  const indexAttrs = ["ID", "Simplified", "Traditional", "Pinyin", "Definition"];
  let rowData;
  res.forEach((data) => {
    rowData = data.values;
  });

  const ghostHandler = (e) => {
    const colHeader = e.currentTarget;
    const checkbox = colHeader.querySelector("input[type='checkbox']");
    colHeader.classList.toggle("is-checked");
    if (e.target == colHeader) {
      checkbox.checked = !checkbox.checked;
    }

    const columns = document.getElementsByClassName(colHeader.id);
    for (let i = 0; i < columns.length; i++) {
      columns[i].classList.toggle("is-hidden");
    }
  };

  const unLockGhostHandler = (e) => {
    const tableData = document.querySelectorAll("td");

    if (e.type == "pointerdown") {
      for (let i = 0; i < tableData.length; i++) {
        tableData[i].classList.toggle("is-visible");
      }
    } else {
      for (let i = 0; i < tableData.length; i++) {
        tableData[i].classList.toggle("is-visible");
      }
    }
  };

  return (
    <div className="container">
      <Head>
        <title>zhongwen word bank</title>
        <meta name="description" content="chinese study tool" />
      </Head>

      <main className={`wrapper ${deviceType == "mobile" ? "mobile" : "desktop"}`}>
        <div className="title-heading">
          <h1>中文单词银行</h1>
        </div>
        <div className="table__container">
          <table>
            <thead>
              <tr className="column-locks">
                {indexAttrs.map((attr, index) => {
                  return (
                    <th key={index} id={`col_${index}`} onClick={(e) => ghostHandler(e)}>
                      <input type="checkbox" name={attr.toLowerCase()} />
                    </th>
                  );
                })}
              </tr>
              <tr className="index-attributes">
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
        <div className="unlock-btn" id="unlock" onPointerDown={(e) => unLockGhostHandler(e)} onPointerUp={(e) => unLockGhostHandler(e)}>
          view
        </div>
      </main>
    </div>
  );
}
