import { Suspense } from 'react';
import {
  Link,
  useLoaderData,
  useSearchParams,
  defer,
  Await,
} from 'react-router-dom';
import { BlogFilter } from 'components/BlogFilter';

export const Blogpage = () => {
  const { posts } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const postQuery = searchParams.get('post') || '';
  const latest = searchParams.has('latest');

  const startsFrom = latest ? 80 : 1;

  return (
    <div>
      <h1>Our news</h1>
      <BlogFilter
        setSearchParams={setSearchParams}
        postQuery={postQuery}
        latest={latest}
      />
      <Link to="/posts/new">Add new post</Link>
      <Suspense fallback={<h2>Posts are Loading...</h2>}>
        <Await resolve={posts}>
          {resolvedPosts => (
            <>
              {resolvedPosts
                .filter(
                  post =>
                    post.title.includes(postQuery) && post.id >= startsFrom
                )
                .map(post => (
                  <Link key={post.id} to={`/posts/${post.id}`}>
                    <li>{post.title}</li>
                  </Link>
                ))}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok)
    throw new Response('', { status: res.status, statusText: 'Not found' });
  return res.json();
}

export const blogLoader = async () => {
  return defer({
    posts: getPosts(),
  });
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

// import { useState, useEffect } from 'react';
// import { Link, useSearchParams } from 'react-router-dom';
// import { BlogFilter } from '../components/BlogFilter';

// const Blogpage = () => {
//     const [posts, setPosts] = useState([]);
//     const [searchParams, setSearchParams] = useSearchParams();

//     const postQuery = searchParams.get('post') || '';
//     const latest = searchParams.has('latest');

//     const startsFrom = latest ? 80 : 1;

//     useEffect(() => {
//         fetch('https://jsonplaceholder.typicode.com/posts')
//             .then(res => res.json())
//             .then(data => setPosts(data))
//     }, []);

//     return (
//         <div>
//             <h1>Our news</h1>

//             <BlogFilter postQuery={postQuery} latest={latest} setSearchParams={setSearchParams} />

//             <Link to="/posts/new" style={{margin: '1rem 0', display: 'inline-block'}}>Add new post</Link>
//             {
//                 posts.filter(
//                     post => post.title.includes(postQuery) && post.id >= startsFrom
//                 ).map(post => (
//                     <Link key={post.id} to={`/posts/${post.id}`}>
//                         <li>{post.title}</li>
//                     </Link>
//                 ))
//             }
//         </div>
//     )
// }

// export {Blogpage}
