import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./css.css";
import { AiFillDelete, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsBookmarkDash, BsFillBookmarkStarFill } from "react-icons/bs";
import { BASE_URL } from "../../extras/frontend_constants";
const CustomCollectionItem = ({
  id,
  image,
  title,
  description,
  link,
  collection,
  tags,
  user,
  onSelectTag,
}) => {
  const [toastMessage, setToastMessage] = useState("");
  const [isVisibleToast, setIsVisibleToast] = useState(false);
  const [fav, setFav] = useState(false);
  const navigate = useNavigate();
  const [tag, setTag] = useState("");
  return (
    <div className="a-box">
      <div className="img-container">
        <div className="img-inner">
          <div className="inner-skew">
            <img src={image} />
          </div>
        </div>
      </div>
      <div className="text-container">
        <h3>{title}</h3>
        <Link
          className="text-decoration-none"
          to={`/collection/${link}`}
          state={collection}
        >
          <div>{description}</div>
        </Link>
        <BsFillBookmarkStarFill
          className=""
          role={"button"}
          onClick={() => {
            setFav(!fav);
            const res = window.confirm(
              "Are you sure you want to Add this to your favorites?"
            );
            if (res) {
              axios
                .post(BASE_URL + "/add-to-fav", {
                  id: user,
                  collectionId: collection,
                })
                .then(async (r) => {
                  console.log(r);
                })
                .catch(async (err) => {
                  console.log(err);
                });
              setToastMessage("Added to favourites");
              setIsVisibleToast(true);
              setTimeout(() => {
                setIsVisibleToast(false);
              }, 2000);
              window.location.reload();
            }
          }}
          size={30}
          style={{ top: "20px", right: "20px" }}
          color={"orange"}
        />
        <BsBookmarkDash
          className="m-2 "
          role={"button"}
          onClick={() => {
            setFav(!fav);
            // eslint-disable-next-line no-restricted-globals
            const res = confirm(
              "Are you sure you want to remove this from your favorites?"
            );

            if (res) {
              axios
                .patch(BASE_URL + "/remove-from-fav", {
                  id: user._id,
                  collectionTitle: collection.title,
                })
                .then(async (r) => {})
                .catch(async (err) => {
                  console.log(err);
                });

              setToastMessage("Removed from favourites");

              window.location.reload();
            }
          }}
          size={28}
          style={{ top: "20px", right: "20px" }}
          color={"orange"}
        />
        <br />
        {tags.length > 0 &&
          tags.map((el, i) => (
            <p
              role="button"
              onClick={() => {
                axios
                  .post(BASE_URL + "/find-tag", { tag: el })
                  .then((response) => {
                    onSelectTag(response.data);
                  });
              }}
              key={i}
              className="d-inline-block mx-1 badge bg-light"
            >
              #{el}
            </p>
          ))}
        <center>
          <span
            className="badge fs-6 d-block rounded-pill bg-danger m-2"
            type="submit"
            onClick={() => {
              console.log("first");
              axios
                .post(BASE_URL + "/delete_collection", { id })
                .then(async (res) => {
                  console.log(res);
                })
                .catch((err) => console.log(err));

              setTimeout(() => {
                console.log("hello");
                window.location.reload();
              }, 1000);
            }}
          >
            Delete <AiFillDelete />
          </span>
        </center>
      </div>
    </div>
  );
};

export default CustomCollectionItem;
