import { useUserAuth } from "../context/UserAuthContext";
import "../App.css";
import { useState, useEffect } from "react";
import Pagination from "./Pagination.js";
import CapturedCard from "./CapturedCard";
import { db } from "../Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [birdData, setbirdData] = useState([]);
  const [loading, setloading] = useState(true);
  const [search, setSearch] = useState("");
  const { user } = useUserAuth();
  const postsPerPage = 30;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const birdsCollectionRef = collection(db, `${user.reloadUserInfo.localId}`);
  /*  const currentPost = birds.slice(indexOfFirstPost, indexOfLastPost); */

  useEffect(() => {
    setloading(true);
    const getbirds = async () => {
      const data = await getDocs(birdsCollectionRef);
      const birdData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setbirdData(JSON.parse(birdData[0].birds));
      setloading(false);
    };
    getbirds();
  }, []);
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <h3 className="welcome-message"> Welcome back {user?.email} </h3>
      <h4 className="beforeSearch">Birds left to capture</h4>
      <input
        onChange={handleChange}
        id="search"
        className="search"
        placeholder="Search for a specific bird..."
      />
      {loading ? (
        <div>loading...</div>
      ) : (
        <section className="all-birds">
          {(() => {
            if (search === "") {
              return (
                <>
                  {birdData.map((bird, index) => {
                    return (
                      <div key={bird + index} className="all-birds">
                        <CapturedCard bird={bird} />
                      </div>
                    );
                  })}
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={birdData.length}
                    setCurrentPage={setCurrentPage}
                  />
                </>
              );
            } else if (search !== "") {
              return birdData.map((bird, index) => {
                if (
                  bird.birdName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return (
                    <div key={bird + index} className="all-birds">
                      <CapturedCard bird={bird} />
                    </div>
                  );
                }
              });
            }
          })()}
        </section>
      )}
    </>
  );
};
export default Home;
