const headersCollections = [
  { label: "Title", key: "title" },
  { label: "Description", key: "description" },
  { label: "Tags", key: "tags" },
  { label: "CommentsID", key: "comments" },
  { label: "Number of Likes", key: "likes" },
  { label: "Image Link", key: "image" },
];

const userCollectionHeader = [
  { label: "Full name", key: "fullName" },
  { label: "Gender", key: "gender" },
  { label: "Email", key: "email" },
  { label: "Phone", key: "phone" },
  { label: "Password", key: "password" },
  { label: "Number of Collections", key: "collections" },
  { label: "Role", key: "role" },
];

const BASE_URl = "http://collections-api.mrhumble.uz";
// const BASE_URl = "https://rich-tan-sea-urchin-veil.cyclic.app";

exports.BASE_URL = BASE_URl;
exports.headersCollections = headersCollections;
exports.userCollectionHeader = userCollectionHeader;
