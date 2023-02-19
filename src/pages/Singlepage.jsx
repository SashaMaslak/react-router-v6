import { Suspense } from 'react';
import {
  useAsyncValue,
  Link,
  useNavigate,
  useLoaderData,
  Await,
} from 'react-router-dom';

const Post = () => {
  const post = useAsyncValue();
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
};

const Comments = () => {
  const comments = useAsyncValue();
  return (
    <div>
      <h2>Comments</h2>
      {comments.map(comment => (
        <>
          <h3>{comment.body}</h3>
          <h4>{comment.body}</h4>
          <p>{comment.body}</p>
        </>
      ))}
    </div>
  );
};

export const Singlepage = () => {
  const { post, id, comments } = useLoaderData();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const goHome = () => navigate('/', { replace: true });

  return (
    <div>
      <button onClick={goBack}>Go back</button>
      <button onClick={goHome}>Go home</button>
      <Suspense fallback={<h2>Post is Loading...</h2>}>
        <Await resolve={post}>
          <Post />
        </Await>
      </Suspense>
      <Suspense fallback={<h2>Comments are Loading...</h2>}>
        <Await resolve={comments}>
          <Comments />
        </Await>
      </Suspense>
      <Link to={`/posts/${id}/edit`}>Edit this post</Link>
    </div>
  );
};

async function getPostById(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
}

async function getCommentsById(id) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );
  return res.json();
}

export const postLoader = async ({ params }) => {
  const id = params.id;

  return { post: await getPostById(id), id, comments: getCommentsById(id) };
};

// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { useState, useEffect } from 'react'

// const Singlepage = () => {
//     const {id} = useParams();
//     const navigate = useNavigate();
//     const [post, setPost] = useState(null);

//     const goBack = () => navigate(-1);
//     const goHome = () => navigate('/', {replace: true});

//     useEffect(() => {
//         fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
//             .then(res => res.json())
//             .then(data => setPost(data))
//     }, [id]);

//     return (
//         <div>
//             <button onClick={goBack}>Go back</button>
//             {/* Bad approach */}
//             <button onClick={goHome}>Go home</button>
//             {post && (
//                 <>
//                     <h1>{post.title}</h1>
//                     <p>{post.body}</p>
//                     <Link to={`/posts/${id}/edit`}>Edit this post</Link>
//                 </>
//             )}
//         </div>
//     )
// }

// export {Singlepage}
