import { useShowRecommendations } from "../../../hooks/useShowRecommendations";
import HorizontalList from "../../HomePage/HomePageList/HorizontalList";

function ShowDetailsRecommendations({ showType, id }) {
  const { recommendations, status, errorMessage } = useShowRecommendations(
    showType,
    id,
  );

  return (
    <>
      <HorizontalList
        shows={recommendations}
        showType={showType}
        status={status}
        errorMessage={errorMessage}
      />
    </>
  );
}

export default ShowDetailsRecommendations;
