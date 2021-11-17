import f from "../user-feed.json";
import Post from "../components/Post";
function Feed() {
  const feed = f.itemList;
  return (
    <div className='posts-page'>
      <h1>Feed</h1>
      <div className='posts'>
        {feed &&
          Object.values(feed).map((data) => {
            return <Post data={data} key={data.id}></Post>;
          })}
      </div>
    </div>
  );
}
export default Feed;
