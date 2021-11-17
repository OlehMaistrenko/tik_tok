import f from "../user-feed.json";
import UserPost from "../components/UserPost";
import { useParams, Link } from "react-router-dom";

function UserProfile() {
  let { userName } = useParams();
  const feed = f.itemList;
  return (
    <div className='posts-page'>
      <h1>User Profile @{userName}</h1>
      <h2>
        <Link to='/'>{`<back to feed`}</Link>
      </h2>
      <div className='user-posts'>
        {feed &&
          Object.values(feed).map((data) => {
            return (
              <UserPost viewed={data.stats.playCount} key={data.id}></UserPost>
            );
          })}
      </div>
    </div>
  );
}
export default UserProfile;
