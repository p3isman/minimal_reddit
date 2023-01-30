import ReactMarkdown from 'react-markdown';

const Comment = ({ comment }) => {
  const { author, body } = comment;

  return (
    <div className='p-2 border-t'>
      <p className='text-sm p-1'>u/{author}</p>
      <ReactMarkdown>{body}</ReactMarkdown>
    </div>
  );
};

export default Comment;
