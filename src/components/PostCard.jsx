export const PostCard = ({ author, date, title, text, tag, status }) => {
  return (
    <div>
      <div>
        <img src="" alt="" />
        <p>{author}</p>
        <p>{date}</p>
        <p>{status}</p>
      </div>
      <div>
        <div>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        <div>
          <p>{tag}</p>
          <div>
            <p>icons</p>
          </div>
        </div>
      </div>
    </div>
  );
};
