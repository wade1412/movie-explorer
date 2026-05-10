import { movieListSettings, tvListSettings } from "../constants";
import { useState } from "react";
import { useHomeList } from "../../../hooks/useHomeList";
import HorizontalList from "./HorizontalList";
import ListSelect from "./ListSelect";
import { headingStyle, sectionStyle } from "../styles";

function HomePageList({ showType }) {
  // Get settings based on show type; we are expecting only two show types - either TV or Movie, no need to complicate the logic here
  const listSettings =
    showType === "movie" ? movieListSettings : tvListSettings;

  const [selectedList, setSelectedList] = useState(listSettings[0].value);

  const { shows, status, errorMessage } = useHomeList(showType, selectedList);

  const handleListChange = (e) => {
    const value = e.target.value;
    setSelectedList(value);
  };

  return (
    <div className={sectionStyle}>
      <h2 className={headingStyle}>
        {showType === "movie" ? "Movie lists 🎬" : "TV Shows lists 📺"}
      </h2>
      <div className="px-4 py-2 mb-2">
        <ListSelect
          listSettings={listSettings}
          selectedList={selectedList}
          handleListChange={handleListChange}
        />
      </div>
      <HorizontalList
        shows={shows}
        showType={showType}
        status={status}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default HomePageList;
