import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams, useHistory } from 'react-router-dom';

import Navbar from './Navbar';
import Axios from 'axios';

function Post() {
  const { id } = useParams();
  const [post, setPost] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [comment, setComment] = React.useState('');
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/posts/${id}`).then((res) => {
      setPost(res.data);
    });
    Axios.get(`http://localhost:3001/api/comments/${id}`).then((res) => {
      setComments(res.data);
    });
  }, [id]);

  const addComment = (e) => {
    Axios.post(
      `http://localhost:3001/api/comments`,
      {
        commentBody: comment,
        PostId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    ).then((res) => {
      if (res.data.error) {
        alert('Please login to add a comment');
        navigate('/login');
      } else {
        setComments([...comments, res.data]);
        setComment('');
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className='container mx-auto flex justify-center mt-5'>
        <div className='w-4/6'>
          <div className='shadow sm:rounded-md sm:overflow-hidden'>
            <div className='px-3 py-2 bg-white space-y-3 '>
              <p className='text-black font-semibold'>{post.title}</p>
              <p>{post.content}</p>
              <p className='text-right'>
                Created by: <a href='#'>{post.username}</a>
              </p>
            </div>

            <div className='px-3 py-2 bg-white space-y-3 '>
              <p className='text-black font-semibold mb-1'>Comments</p>
              <div>
                <form>
                  <div className='flex'>
                    <input
                      className='w-full p-2'
                      type='text'
                      placeholder='Comment'
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />
                    <button className='ml-2' onClick={addComment}>
                      Add
                    </button>
                  </div>
                </form>
              </div>
              {comments.map((comments, key) => (
                <div key={key} className='bg-gray-50 rounded-md p-2'>
                  <a href='#'>
                    <span className='text-blue-500'>{comments.username}</span>
                  </a>
                  <p>{comments.commentBody}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
