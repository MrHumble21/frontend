import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import CustomCollectionItem from "../../components/CollectionItem/CustomCollectionItem";
import { CSVLink } from "react-csv";
import {
  BASE_URL,
  headersCollections,
  userCollectionHeader,
} from "../../extras/frontend_constants";
import { AiFillCloseCircle, AiOutlineCloudDownload } from "react-icons/ai";
export function Collections() {
  const [collectionList, setCollectionList] = useState("");
  const id = JSON.parse(localStorage.getItem("userObject"));
  const [content, setContent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTag, setSearchTag] = useState("");
  const [close, setClose] = useState(true);
  const [typeName, setTypeName] = useState("");
  const [type, setType] = useState("");
  const [custom, setCustom] = useState([]);
  const [customValues, setCustomValues] = useState({});

  const selectTag = (t) => {
    setSearchTag(t);
    setClose(false);
  };

  const fetchCollections = async () => {
    setIsLoading(true);
    if (!id) {
      setContent(false);
      console.log("no id provided");
    }

    await axios
      .post(BASE_URL + "/get_user", {
        id: id._id,
      })
      .then((res) => {
        setCollectionList(res.data.col);

        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        console.log(err);
      });
  };
  ///get-collections-by-category
  useEffect(() => {
    fetchCollections();
  }, []);

  const dataCollections = [];
  const dataUser = [id];

  return (
    <div className={"container-fluid"}>
      <NavBar
        category={{
          title: "Add Category +",
          link: "/add_category",
          state: { id, collectionList },
        }}
      />
      {isLoading && <Loader />}

      <div id="custom">
        {custom.length > 0 && custom.map((el, i) => <div key={i}>{el}</div>)}
      </div>
      {!close && (
        <div
          className="container rounded my-5 p-3"
          style={{ backgroundColor: "#F6F6F6" }}
        >
          <div className="d-flex justify-content-between">
            <center>
              <h5 className="fs-4 text-black-50 font-weight-bold text-center">
                Result
              </h5>{" "}
            </center>
            <span
              role="button"
              onClick={() => {
                setClose(true);
              }}
              className=""
            >
              <AiFillCloseCircle size={40} color={"red"} />
            </span>
          </div>

          <div className="container p-3">
            <div className="row mb-2 ">
              {searchTag &&
                searchTag.filtered.map((el, i) => (
                  <div
                    key={i}
                    className="col-sm-12 d-flex justify-content-center align-items-center col-md-4 col-lg-3"
                  >
                    <CustomCollectionItem
                      id={el._id}
                      image={el.image}
                      title={el.title}
                      tags={el.tags}
                      description={el.description}
                      link={el._id}
                      collection={el}
                      user={id}
                      onSelectTag={selectTag}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {content ? (
        <>
          <div className="container d-flex">
            <div className="mx-1">
              {" "}
              <CSVLink
                data={dataCollections}
                headers={headersCollections}
                filename={"CollectionsReport.csv"}
                className="btn btn-primary"
                target="_blank"
              >
                Download Collections Report CSV{" "}
                <AiOutlineCloudDownload size={25} />
              </CSVLink>
            </div>
            <br />
            <CSVLink
              data={dataUser}
              headers={userCollectionHeader}
              filename={"User.csv"}
              className=" btn btn-primary"
              target="_blank"
            >
              Download User Report CSV
              <AiOutlineCloudDownload size={25} />
            </CSVLink>
          </div>
          <div className="m-1">
            <div className="container p-3">
              <div className="row mb-2 ">
                {collectionList.length > 0 &&
                  collectionList.map((el, i) => {
                    const a = {
                      title: el.title,
                      description: el.description,
                      tags: el.tags,
                      comments: el.comments,
                      likes: el.likes.length,
                      image: el.image,
                    };
                    dataCollections.push(a);
                    return (
                      <div key={i} className="col-sm-12 col-md-4 col-lg-3">
                        <CustomCollectionItem
                          id={el._id}
                          image={el.image}
                          title={el.name}
                          tags={el.tags}
                          description={el.description}
                          link={el._id}
                          collection={el}
                          user={id}
                          onSelectTag={selectTag}
                        />
                      </div>
                    );
                  })}
                <div className="col-sm-12 col-md-4 col-lg-3"></div>
              </div>
            </div>
          </div>
          <Link
            state={JSON.parse(localStorage.getItem("userObject"))}
            to={"/collections/add"}
          >
            <button
              style={{
                bottom: "40px",
                right: "20px",
                borderRadius: "100%",
              }}
              type="button"
              className="btn shadow p-3 position-absolute  btn-primary"
            >
              <BsPlusLg size={35} />
            </button>
          </Link>
        </>
      ) : (
        <h1 className="m-5 text-center"> You are not authorized </h1>
      )}
    </div>
  );
}
