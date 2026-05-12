import { Avatar, Rating } from "@mui/material";
import { getAvatarUrl } from "../utils";

function UserReview({ reviewData, isSelected, handleReviewClick }) {
  const { author_details, content, id } = reviewData;
  const { name, username, avatar_path, rating } = author_details || {};

  const avatarSrc = getAvatarUrl(avatar_path);

  const displayName = name || username || "Anonymous";
  const firstLetter = displayName.charAt(0).toUpperCase();

  return (
    <div
      className={`flex flex-col rounded-2xl p-2 transition-all duration-300 ${isSelected ? "bg-dark-blue-600 w-full gap-4 overflow-y-visible" : "bg-dark-blue-800 w-full xl:w-[calc(50%---spacing(2))] max-h-50 gap-2"} `}
      onClick={() => handleReviewClick(id)}
    >
      {/* Main Row: User Info and Rating*/}
      <div
        className={`flex w-full flex-row items-center rounded-2xl px-2 font-semibold ${isSelected ? "bg-dark-blue-800 py-2" : "bg-dark-blue-600 py-1"}`}
      >
        {/* Avatar picture or first letter of the username */}
        {avatarSrc ? (
          <Avatar alt={displayName} src={avatarSrc} />
        ) : (
          <Avatar alt={displayName}>{firstLetter}</Avatar>
        )}
        {/* Username and Rating */}
        <div className="flex w-full flex-col items-center justify-center gap-1 overflow-hidden">
          <p className="text-center">{reviewData.author}</p>
          <div
            className={`flex gap-1 ${isSelected ? "bg-dark-blue-800 w-fit justify-end rounded-xl py-1 lg:px-6" : ""}`}
          >
            {rating ? (
              <Rating
                value={(rating / 2).toFixed(1)}
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "oklch(87.9% 0.169 91.605)",
                  },
                  "& .MuiRating-iconEmpty": {
                    color: "#eeeeee",
                  },
                }}
                readOnly
              />
            ) : (
              <p className="font-light italic">Not rated</p>
            )}
          </div>
        </div>
      </div>

      {/* Review content */}
      <p
        className={`px-2 py-1 font-light ${!isSelected ? "line-clamp-2" : ""}`}
      >
        {content}
      </p>
    </div>
  );
}

export default UserReview;
