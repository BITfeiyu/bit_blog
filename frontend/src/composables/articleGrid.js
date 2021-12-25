// import axios from "axios";

export default function articleGrid() {
  const imageIfExists = (article) => {
    return _imageIfExists(article);
  };

  const gridStyle = (article) => {
    return _gridStyle(article);
  };

  return {
    imageIfExists,
    gridStyle,
  };
}

function _imageIfExists(article) {
  if (article.avatar) {
    return article.avatar.resource;
    // let url = article.avatar.resource;
    // axios({
    //   url: url,
    //   method: "get",
    // })
    //   .then((response) => {
    //     console.log(response);
    //     return response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
}

function _gridStyle(article) {
  if (article.avatar) {
    return {
      display: "grid",
      gridTemplateColumns: "1fr 4fr",
    };
  }
}
