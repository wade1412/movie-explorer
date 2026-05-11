import { Avatar, Rating } from "@mui/material";
import { getAvatarUrl } from "../utils";

function UserReview({ reviewData }) {
  //    {
  //       "author": "Goddard",
  //       "author_details": {
  //         "name": "",
  //         "username": "Goddard",
  //         "avatar_path": "/https://secure.gravatar.com/avatar/f248ec34f953bc62cafcbdd81fddd6b6.jpg",
  //         "rating": null
  //       },
  //       "content": "Pretty awesome movie.  It shows what one crazy person can convince other crazy people to do.  Everyone needs something to believe in.  I recommend Jesus Christ, but they want Tyler Durden.",
  //       "created_at": "2018-06-09T17:51:53.359Z",
  //       "id": "5b1c13b9c3a36848f2026384",
  //       "updated_at": "2021-06-23T15:58:09.421Z",
  //       "url": "https://www.themoviedb.org/review/5b1c13b9c3a36848f2026384"
  //     },

  const { author_details, content } = reviewData;
  const { name, username, avatar_path, rating } = author_details || {};

  const avatarSrc = getAvatarUrl(avatar_path);

  const displayName = name || username || "Anonymous";
  const firstLetter = displayName.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col gap-4 p-2">
      {/* Avatar and Name */}
      <div className="flex w-full flex-row gap-4 items-center font-semibold">
        {avatarSrc ? (
          <Avatar alt={displayName} src={avatarSrc} />
        ) : (
          <Avatar alt={displayName}>{firstLetter}</Avatar>
        )}
        <p>{reviewData.author}</p>
        <div className="flex justify-end flex-1">
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
        </div>
      </div>

      <p>{content}</p>
    </div>
  );
}

export default UserReview;
