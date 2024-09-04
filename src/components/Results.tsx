import axios from "axios";
import React, { FormEvent, useState } from "react";

interface NitStudent {
  name: string;
  rollNo: number;
  maths: number;
  sci: number;
  eng: number;
  college: string;
}

export default function Results() {
  const [rollNo, setRollNo] = useState("");

  const [stuRes, setStuRes] = useState<NitStudent>();

  const searchRes = (e: FormEvent) => {
    e.preventDefault();
    console.log("idd..." + rollNo);
    axios
      .get<NitStudent>("http://localhost:8080/nit/results?id=" + rollNo)
      .then((res) => setStuRes(res.data));
  };

  return (
    <div>
      <form onSubmit={searchRes}>
        <div className="input-group">
          <div className="form-outline" data-mdb-input-init>
            <input
              id="search-input"
              type="text"
              onChange={(e) => setRollNo(e.target.value)}
              className="form-control"
            />
            <label className="form-label">Search</label>
          </div>
          <input type="submit" className="btn btn-primary" />
        </div>
      </form>
{stuRes == null?null:stuRes.rollNo == 0?"Invalid Rool No":
    <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">RollNo</th>
            <th scope="col">Maths</th>
            <th scope="col">Sci</th>
            <th scope="col">Eng</th>
            <th scope="col">CollegeName</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{stuRes?.name}</th>
            <td>{stuRes?.rollNo}</td>
            <td>{stuRes?.maths}</td>
            <td>{stuRes?.sci}</td>
            <td>{stuRes?.eng}</td>
            <td>{stuRes?.college}</td>
          </tr>
        </tbody>
      </table>}      
    </div>
  );
}
