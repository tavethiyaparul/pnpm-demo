import logo from "./logo.svg";
import "./App.css";
import axois from "axios";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

function App() {
  const [all, setAll] = useState([]);

  const columns = [
    // { field: "_id", headerName: "_id", width: 70 },
    { field: "name", headerName: "name", width: 130 },
    { field: "age", headerName: "age", width: 130 },
    { field: "gender", headerName: "gender", width: 130 },

    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 90,
    // },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];
 

const rows=[]
all && all.length > 0 && all.map((item) => rows.push({
  id: item._id,
  name: item.name,
  age: item.age,
  gender: item.gender,
})
);

  const getall = async () => {
    await axois("api/all")
      .then((res) => {
        setAll(res.data.emp);
        console.log("res", res.data.emp);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  useEffect(() => {
    getall();
  }, []);

  console.log("all", all,rows);
  return (
    <>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
      />
      </div>
    </>
  );
}

export default App;
