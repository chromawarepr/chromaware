import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { db, auth } from "../firebase/config";

import "./Admin.css";


function Admin() {

  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);



  useEffect(() => {


    onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);

    });


  }, []);




  useEffect(() => {


    if (!user) return;


    async function fetchResults() {


      const snapshot = await getDocs(
        collection(db, "testResults")
      );


      const data = snapshot.docs.map((doc) => ({

        id: doc.id,

        ...doc.data()

      }));


      setResults(data);


    }


    fetchResults();


  }, [user]);





  async function logout() {

    await signOut(auth);

    window.location.href = "/admin-login";

  }




  if (!user) {


    return (

      <div className="admin-page">

        <h2>
          Access Denied
        </h2>

        <p>
          Please login as researcher.
        </p>

      </div>

    );

  }





  return (

    <div className="admin-page">


      <h1>
        ChromAware Research Dashboard
      </h1>


      <button onClick={logout}>
        Logout
      </button>



      <table>


        <thead>

          <tr>

            <th>
              Name
            </th>

            <th>
              Score
            </th>

            <th>
              Date
            </th>

          </tr>

        </thead>



        <tbody>


          {results.map((result) => (


            <tr key={result.id}>


              <td>
                {result.name}
              </td>


              <td>
                {result.score}/{result.totalQuestions}
              </td>


              <td>
                {result.date?.toDate().toLocaleDateString()}
              </td>


            </tr>


          ))}


        </tbody>


      </table>


    </div>

  );

}


export default Admin;