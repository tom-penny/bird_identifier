import "babel-polyfill";
import silhoute from "../emptyBird.png";
import * as tf from "@tensorflow/tfjs";
import { MobileNet } from "./mobilenet";
import $ from "jquery";
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useUserAuth } from "../context/UserAuthContext";

const Capture = () => {
  const [birdieImage, setbirdieImage] = useState("");
  const [birdieName, setbirdieName] = useState("");
  const [disable, setdisable] = useState(false);
  const { user } = useUserAuth();
  const [sent, setSent] = useState(false);
  const birdsCollectionRef = collection(db, `${user.reloadUserInfo.localId}`);

  const addToCaptured = async (e) => {
    setdisable(true)
    e.preventDefault();
    const data = await getDocs(birdsCollectionRef);
    const birdData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const dataPath = doc(db, `${user.reloadUserInfo.localId}`, birdData[0].id);
    const parsed = JSON.parse(birdData[0].birds);
    console.log(birdieName)
    const birdie = birdieName.replace("\n", "");
    const reg = new RegExp(birdie, "ig");

    parsed.map((p, i) => {
      if (reg.test(p.birdName)) {
        p.birdImage = birdieImage;
      }
    });
    await updateDoc(dataPath, { birds: JSON.stringify(parsed) });
    setSent(true)
  };

  const findBird = (e) => {
    setdisable(false);
    setSent(false)
    setbirdieName("")
    e.preventDefault();
    const idBtn = $("#identifyBtn");
    const results = $("#results");
    const hiddenImage = $("#birdImage");
    const fileUpload = $("#fileUpload");
    const mobileNet = new MobileNet();
    mobileNet
      .load()
      .then(() => {
        console.log("loaded");
        idBtn.prop("disabled", false);
      })
      .catch((err) => {
        console.log(err);
      });

    idBtn.on("click", (evt) => {
      evt.preventDefault();
      idBtn.prop("disabled", true);
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setbirdieImage(reader.result);
        hiddenImage[0].src = reader.result;
      });

      reader.readAsDataURL(fileUpload.prop("files")[0]);

      const bird = document.getElementById("birdImage");
      bird.onload = async () => {
        bird.width = "224";
        bird.height = "224";
        const image = tf.browser.fromPixels(bird);
        let result = mobileNet.predict(image);
        const topK = mobileNet.getTopKClasses(result, 1);
        var res = "";
        topK.forEach((ele) => {
          res += ele.label + "</br>";
        });
        const birdieImg = results.html(res);
        setbirdieName(birdieImg[0].innerText);
        results.html(res);
        idBtn.prop("disabled", false);
      };
    });
  };
  useEffect(() => {
    localStorage.setItem("name", JSON.stringify(birdieName));
    localStorage.setItem("img", JSON.stringify(birdieImage));
  }, [birdieName, birdieImage]);

  return (
    <div className="alignment">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <div className="container">
        <div className="row">
          <div className="col-md-8 text-left">
            <form>
              <div className="form-group mb-3">
                <label htmlFor="fileUpload">Upload a bird's photo</label>
                <input
                  className="form-control"
                  id="fileUpload"
                  type="file"
                  onChange={(e) => {
                    findBird(e);
                  }}
                />
              </div>
              <button id="clearAllBtn" className="btn btn-danger">
                Clear All
              </button>
              <button
                id="identifyBtn"
                onClick={(e) => {
                  findBird(e);
                }}
                className="btn btn-success"
                disabled
              >
                Identify
              </button>
            </form>
            {birdieName && (
              <>
                <button
                  disabled={disable}
                  onClick={(e) => {
                    addToCaptured(e);
                  }}
                >
                  click to add to captured
                </button>
                {sent && <div>photo sent!</div>}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-8" id="results"></div>
          <div className="col-md-4">
            <img
              height="224px"
              width="224px"
              id="birdImage"
              alt="bird img"
              src={silhoute}
            />
          </div>
        </div>
      </div>

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
      ></script>
    </div>
  );
};

export default Capture;
