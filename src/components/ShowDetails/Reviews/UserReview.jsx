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

  return (
    <div>
      <p>{reviewData.author}</p>
      <p>{reviewData.content}</p>
    </div>
  );
}

export default UserReview;
