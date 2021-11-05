import React, { useState } from "react";
import { useHistory } from "react-router";
import SceneInGalleryAddModal from "./SceneInGalleryAddModal";
require("dotenv").config();

function MadeScene({ scene, haveGallery }) {
  const history = useHistory();
  const [addModal, setAddModal] = useState(false);

  const handleSetAddModal = () => {
    setAddModal(!addModal);
  };

  return (
    <div>
      <div className="result-scene-img">
        {/* TODO: 북마커 클릭 시 갤러리리스트에 추가 되어야 함 */}
        <div className="bookmarker" onClick={() => setAddModal(true)}>
          <div id="addTogall">갤러리에 추가</div>
        </div>

        <img
          src={`${process.env.REACT_APP_S3_URL_ImageUpload}/${scene.image}`}
          alt={scene.image}
          onClick={() => history.push(`/post/${scene.id}`)}
        />
      </div>
      {addModal ? (
        <SceneInGalleryAddModal
          handleSetAddModal={handleSetAddModal}
          scene={scene}
          haveGallery={haveGallery}
        />
      ) : null}
    </div>
  );
}

export default MadeScene;
