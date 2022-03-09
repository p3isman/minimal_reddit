const Comment = ({ comment }) => {
  const { author, body } = comment;

  return (
    <div className='p-1 m-2 border-t'>
      <p className='text-sm p-1'>u/{author}</p>
      <p>{body}</p>
    </div>
  );
};

export default Comment;
