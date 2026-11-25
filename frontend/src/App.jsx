
// import ReviewSection from "./components/ReviewSection";
// import {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState
// } from 'react';
// import './App.css';

// const API = (
//   import.meta.env.VITE_API_URL || 'http://localhost:5000'
// ).replace(/\/+$/, '');

// export default function App() {
//   const [posts, setPosts] = useState([]);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [author, setAuthor] = useState('Niranjan Kumar');
//   const [image, setImage] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState('');
//   const [notice, setNotice] = useState('');

//   const [editingId, setEditingId] = useState(null);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [search, setSearch] = useState('');
//   const [imagePreview, setImagePreview] = useState('');
//   const [showEditor, setShowEditor] = useState(false);

//   const searchRef = useRef(null);
//   const editorRef = useRef(null);
//   const articlesRef = useRef(null);

//   const editingPost = posts.find(
//     (post) => post._id === editingId
//   );

//   // Load posts from MongoDB
//   const loadPosts = useCallback(async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(`${API}/posts`);
//       const result = await response.json();

//       if (!response.ok || result.success === false) {
//         throw new Error(
//           result.message || `HTTP ${response.status}`
//         );
//       }

//       setPosts(
//         Array.isArray(result.data) ? result.data : []
//       );
//     } catch (err) {
//       setError(
//         `${err.message}. Please check backend connection and API URL.`
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadPosts();
//   }, [loadPosts]);

//   // Image preview
//   useEffect(() => {
//     if (!image) {
//       setImagePreview('');
//       return;
//     }

//     const url = URL.createObjectURL(image);
//     setImagePreview(url);

//     return () => URL.revokeObjectURL(url);
//   }, [image]);

//   // Scroll to editor when opened
//   useEffect(() => {
//     if (showEditor) {
//       requestAnimationFrame(() => {
//         editorRef.current?.scrollIntoView({
//           behavior: 'smooth',
//           block: 'start'
//         });
//       });
//     }
//   }, [showEditor]);

//   // Close article with Escape
//   useEffect(() => {
//     if (!selectedPost) return;

//     const handleKeyDown = (event) => {
//       if (event.key === 'Escape') {
//         setSelectedPost(null);
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     document.body.style.overflow = 'hidden';

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//       document.body.style.overflow = '';
//     };
//   }, [selectedPost]);

//   // Search posts
//   const filteredPosts = useMemo(() => {
//     const query = search.trim().toLowerCase();

//     if (!query) return posts;

//     return posts.filter((post) =>
//       `${post.title || ''} ${post.content || ''} ${post.author || ''}`
//         .toLowerCase()
//         .includes(query)
//     );
//   }, [posts, search]);

//   // Helpers
//   function formatDate(date) {
//     if (!date) return 'Recently published';

//     const parsed = new Date(date);

//     if (Number.isNaN(parsed.getTime())) {
//       return 'Recently published';
//     }

//     return parsed.toLocaleDateString('en-IN', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     });
//   }

//   function getReadTime(text = '') {
//     const words = text.trim().split(/\s+/).filter(Boolean).length;
//     return Math.max(1, Math.ceil(words / 200));
//   }

//   function getExcerpt(text = '', limit = 145) {
//     const clean = text.replace(/\s+/g, ' ').trim();

//     if (clean.length <= limit) return clean;

//     return `${clean.slice(0, limit).trim()}...`;
//   }

//   // Navbar actions
//   function goToArticles() {
//     articlesRef.current?.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start'
//     });
//   }

//   function focusSearch() {
//     goToArticles();

//     setTimeout(() => {
//       searchRef.current?.focus();
//     }, 400);
//   }

//   function openEditor() {
//     setError('');
//     setNotice('');
//     setShowEditor(true);
//   }

//   function closeEditor() {
//     clearForm();
//     setShowEditor(false);
//   }

//   // Reset form
//   function clearForm() {
//     setTitle('');
//     setContent('');
//     setAuthor('Niranjan Kumar');
//     setImage(null);
//     setEditingId(null);

//     const input = document.getElementById('post-image');

//     if (input) input.value = '';
//   }

//   // Image validation
//   function handleImageChange(event) {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith('image/')) {
//       setError('Please select a valid image.');
//       event.target.value = '';
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       setError('Image size must be less than 5 MB.');
//       event.target.value = '';
//       return;
//     }

//     setError('');
//     setImage(file);
//   }

//   // Create or update post
//   async function submit(event) {
//     event.preventDefault();

//     setError('');
//     setNotice('');

//     if (!title.trim() || !content.trim()) {
//       setError('Please enter both title and content.');
//       return;
//     }

//     const formData = new FormData();

//     formData.append('title', title.trim());
//     formData.append('content', content.trim());
//     formData.append(
//       'author',
//       author.trim() || 'Niranjan Kumar'
//     );

//     if (image) {
//       formData.append('image', image);
//     }

//     setSaving(true);

//     try {
//       const response = await fetch(
//         editingId
//           ? `${API}/posts/${editingId}`
//           : `${API}/posts`,
//         {
//           method: editingId ? 'PUT' : 'POST',
//           body: formData
//         }
//       );

//       const result = await response.json();

//       if (!response.ok || result.success === false) {
//         throw new Error(
//           result.message || `HTTP ${response.status}`
//         );
//       }

//       setNotice(
//         editingId
//           ? 'Your article has been updated successfully.'
//           : 'Your article has been published successfully.'
//       );

//       clearForm();
//       setShowEditor(false);

//       await loadPosts();

//       window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//       });

//     } catch (err) {
//       setError(err.message || 'Unable to publish article.');
//     } finally {
//       setSaving(false);
//     }
//   }

//   // Edit post
//   function editPost(post) {
//     setEditingId(post._id);
//     setTitle(post.title || '');
//     setContent(post.content || '');
//     setAuthor(post.author || 'Niranjan Kumar');
//     setImage(null);

//     setError('');
//     setNotice('');
//     setShowEditor(true);
//   }

//   // Delete post
//   async function deletePost(id) {
//     const confirmed = window.confirm(
//       'Are you sure you want to delete this article?'
//     );

//     if (!confirmed) return;

//     setError('');
//     setNotice('');

//     try {
//       const response = await fetch(`${API}/posts/${id}`, {
//         method: 'DELETE'
//       });

//       const result = await response.json();

//       if (!response.ok || result.success === false) {
//         throw new Error(
//           result.message || `HTTP ${response.status}`
//         );
//       }

//       setPosts((old) =>
//         old.filter((post) => post._id !== id)
//       );

//       if (selectedPost?._id === id) {
//         setSelectedPost(null);
//       }

//       setNotice('Article deleted successfully.');

//     } catch (err) {
//       setError(err.message || 'Unable to delete article.');
//     }
//   }

//   return (
//     <div className="site">

//       {/* NAVIGATION */}

//       <nav className="navbar">
//         <div className="nav-container">

//           <a
//             href="#home"
//             className="brand"
//             onClick={() => window.scrollTo({
//               top: 0,
//               behavior: 'smooth'
//             })}
//           >
//             <span className="brand-icon">B.</span>
//             <span>
//               Blog<span className="brand-light">Space</span>
//             </span>
//           </a>

//           <div className="nav-links">
//             <a href="#home">Home</a>
//             <a href="#articles">Articles</a>
//             <button
//               type="button"
//               onClick={focusSearch}
//               className="nav-link-button"
//             >
//               Discover
//             </button>
//           </div>

//           <div className="nav-actions">

//             <div className="nav-search">
//               <span>⌕</span>
//               <input
//                 type="search"
//                 placeholder="Search stories..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 onFocus={goToArticles}
//                 ref={searchRef}
//                 aria-label="Search articles"
//               />
//               {search && (
//                 <button
//                   type="button"
//                   onClick={() => setSearch('')}
//                   aria-label="Clear search"
//                 >
//                   ×
//                 </button>
//               )}
//             </div>

//             <button
//               className="nav-write"
//               type="button"
//               onClick={openEditor}
//             >
//               <span>＋</span>
//               Write a Post
//             </button>

//             <button
//               className="mobile-search"
//               type="button"
//               onClick={focusSearch}
//               aria-label="Search"
//             >
//               ⌕
//             </button>

//           </div>
//         </div>
//       </nav>

//       <main className="container" id="home">

//         {/* HERO */}

//         <section className="hero">
//           <div className="hero-content">

//             <span className="hero-tag">
//               THE SPACE FOR IDEAS
//             </span>

//             <h1>
//               Stories worth
//               <br />
//               <span>sharing.</span>
//             </h1>

//             <p>
//               Discover fresh perspectives, explore new ideas
//               and share your knowledge with a community
//               that loves to learn.
//             </p>

//             <div className="hero-buttons">
//               <button
//                 className="hero-primary"
//                 onClick={goToArticles}
//                 type="button"
//               >
//                 Explore stories <span>→</span>
//               </button>

//               <button
//                 className="hero-secondary"
//                 onClick={openEditor}
//                 type="button"
//               >
//                 Start writing
//               </button>
//             </div>

//             <div className="hero-note">
//               <span className="hero-note-dot"></span>
//               Ideas, knowledge and stories for everyone
//             </div>
//           </div>

//           <div className="hero-art" aria-hidden="true">
//             <div className="art-circle"></div>

//             <div className="art-card art-card-back">
//               <span>IDEAS</span>
//               <div className="art-lines"></div>
//               <div className="art-lines short"></div>
//             </div>

//             <div className="art-card art-card-front">
//               <span className="art-small">A PLACE TO</span>
//               <strong>THINK.</strong>
//               <strong>WRITE.</strong>
//               <strong>SHARE.</strong>
//               <div className="art-star">✳</div>
//             </div>
//           </div>
//         </section>

//         {/* NOTIFICATIONS */}

//         {error && (
//           <div className="alert error" role="alert">
//             <span>!</span>
//             <p>{error}</p>
//             <button
//               type="button"
//               onClick={() => setError('')}
//               aria-label="Close error"
//             >
//               ×
//             </button>
//           </div>
//         )}

//         {notice && (
//           <div className="alert success" role="status">
//             <span>✓</span>
//             <p>{notice}</p>
//             <button
//               type="button"
//               onClick={() => setNotice('')}
//               aria-label="Close notification"
//             >
//               ×
//             </button>
//           </div>
//         )}

//         {/* ALL POSTS - RIGHT AFTER HERO */}

//         <section
//           className="posts-section"
//           id="articles"
//           ref={articlesRef}
//         >
//           <div className="posts-heading">
//             <div>
//               <span className="section-kicker">
//                 THE LATEST STORIES
//               </span>

//               <h2>Explore articles</h2>

//               <p>
//                 Discover ideas, stories and perspectives
//                 from our community.
//               </p>
//             </div>

//             <button
//               className="btn btn-outline"
//               onClick={loadPosts}
//               disabled={loading}
//               type="button"
//             >
//               ↻ {loading ? 'Loading...' : 'Refresh'}
//             </button>
//           </div>

//           <div className="posts-toolbar">
//             <div className="results-count">
//               All stories
//               <span>{filteredPosts.length}</span>
//             </div>

//             <div className="toolbar-search">
//               <span>⌕</span>
//               <input
//                 ref={searchRef}
//                 type="search"
//                 placeholder="Search by title, topic or author..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />

//               {search && (
//                 <button
//                   type="button"
//                   onClick={() => setSearch('')}
//                 >
//                   ×
//                 </button>
//               )}
//             </div>
//           </div>

//           {loading ? (
//             <div className="empty-state">
//               <div className="spinner"></div>
//               <h3>Discovering stories...</h3>
//               <p>Please wait while we load the latest articles.</p>
//             </div>
//           ) : filteredPosts.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-icon">✳</div>

//               <h3>
//                 {search
//                   ? 'No matching stories'
//                   : 'Your story starts here'}
//               </h3>

//               <p>
//                 {search
//                   ? 'Try another keyword to find an article.'
//                   : 'Be the first to publish an article and share your ideas.'}
//               </p>

//               {search ? (
//                 <button
//                   className="btn btn-outline"
//                   onClick={() => setSearch('')}
//                   type="button"
//                 >
//                   Clear search
//                 </button>
//               ) : (
//                 <button
//                   className="btn btn-publish"
//                   onClick={openEditor}
//                   type="button"
//                 >
//                   Write your first post →
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="post-grid">
//               {filteredPosts.map((post) => (
//                 <article className="post-card" key={post._id}>

//                   <button
//                     className="post-image-wrap"
//                     type="button"
//                     onClick={() => setSelectedPost(post)}
//                     aria-label={`Read ${post.title}`}
//                   >
//                     {post.imageUrl ? (
//                       <img
//                         className="post-image"
//                         src={post.imageUrl}
//                         alt={post.title}
//                         loading="lazy"
//                       />
//                     ) : (
//                       <div className="post-placeholder">
//                         <span>✳</span>
//                         <small>IDEAS & STORIES</small>
//                       </div>
//                     )}

//                     <span className="image-label">
//                       FEATURED STORY
//                     </span>
//                   </button>

//                   <div className="post-card-body">

//                     <div className="post-meta">
//                       <span>{formatDate(post.createdAt)}</span>
//                       <span className="meta-dot">·</span>
//                       <span>
//                         {getReadTime(post.content)} min read
//                       </span>
//                     </div>

//                     <h3>{post.title}</h3>

//                     <p className="post-excerpt">
//                       {getExcerpt(post.content)}
//                     </p>

//                     <button
//                       className="read-link"
//                       type="button"
//                       onClick={() => setSelectedPost(post)}
//                     >
//                       Read full article <span>→</span>
//                     </button>

//                     <div className="post-card-footer">

//                       <div className="author-info">
//                         <div className="author-avatar">
//                           {(post.author || 'A')
//                             .charAt(0)
//                             .toUpperCase()}
//                         </div>

//                         <div>
//                           <small>Written by</small>
//                           <strong>
//                             {post.author || 'Anonymous'}
//                           </strong>
//                         </div>
//                       </div>

//                       <div className="card-actions">
//                         <button
//                           type="button"
//                           onClick={() => editPost(post)}
//                           title="Edit article"
//                         >
//                           Edit
//                         </button>

//                         <button
//                           type="button"
//                           className="delete-action"
//                           onClick={() => deletePost(post._id)}
//                           title="Delete article"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>

//                   </div>
//                 </article>
//               ))}
//             </div>
//           )}
//         </section>

//         {/* CREATE POST FORM - OPEN ONLY ON BUTTON CLICK */}

//         {showEditor && (
//           <section
//             className="publish-section"
//             id="publish"
//             ref={editorRef}
//           >
//             <div className="section-heading">
//               <div>
//                 <span className="section-kicker">
//                   YOUR WORKSPACE
//                 </span>

//                 <h2>
//                   {editingId
//                     ? 'Edit your story'
//                     : 'Create something new'}
//                 </h2>

//                 <p>
//                   Good ideas deserve to be shared.
//                 </p>
//               </div>

//               <button
//                 className="btn btn-outline"
//                 type="button"
//                 onClick={closeEditor}
//               >
//                 × Close
//               </button>
//             </div>

//             <form className="editor" onSubmit={submit}>

//               <div className="editor-top">
//                 <div className="editor-icon">✎</div>

//                 <div>
//                   <strong>Article editor</strong>
//                   <small>
//                     Write and publish your thoughts
//                   </small>
//                 </div>

//                 <span className="draft-label">
//                   {editingId ? 'EDIT ARTICLE' : 'NEW ARTICLE'}
//                 </span>
//               </div>

//               <div className="editor-fields">

//                 <div className="field">
//                   <label htmlFor="post-title">
//                     Article title *
//                   </label>

//                   <input
//                     id="post-title"
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     maxLength={160}
//                     required
//                     placeholder="Give your story a meaningful title..."
//                   />
//                 </div>

//                 <div className="field">
//                   <label htmlFor="post-author">
//                     Author name
//                   </label>

//                   <input
//                     id="post-author"
//                     type="text"
//                     value={author}
//                     onChange={(e) => setAuthor(e.target.value)}
//                     placeholder="Your name"
//                   />
//                 </div>

//                 <div className="field field-full">
//                   <div className="label-row">
//                     <label htmlFor="post-content">
//                       Article content *
//                     </label>

//                     <span>
//                       {content.length} characters
//                     </span>
//                   </div>

//                   <textarea
//                     id="post-content"
//                     rows="8"
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     required
//                     placeholder="Start writing your article here..."
//                   />
//                 </div>

//                 <div className="upload-area">
//                   <div className="upload-info">
//                     <div className="upload-icon">▧</div>

//                     <div>
//                       <strong>Cover image</strong>
//                       <small>
//                         Add an attractive thumbnail · Maximum 5 MB
//                       </small>
//                     </div>
//                   </div>

//                   <label
//                     className="upload-button"
//                     htmlFor="post-image"
//                   >
//                     + Choose image
//                   </label>

//                   <input
//                     id="post-image"
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     hidden
//                   />
//                 </div>

//                 {(imagePreview ||
//                   (editingPost && editingPost.imageUrl)) && (
//                     <div className="preview-wrap">
//                       <img
//                         src={imagePreview || editingPost.imageUrl}
//                         alt="Cover preview"
//                         className="image-preview"
//                       />

//                       <button
//                         type="button"
//                         className="remove-image"
//                         onClick={() => {
//                           setImage(null);

//                           const input =
//                             document.getElementById('post-image');

//                           if (input) input.value = '';
//                         }}
//                       >
//                         Remove selected image
//                       </button>
//                     </div>
//                   )}

//               </div>

//               <div className="editor-footer">
//                 <span>
//                   <span className="privacy-dot"></span>
//                   Ready to share your ideas?
//                 </span>

//                 <button
//                   className="btn btn-publish"
//                   type="submit"
//                   disabled={saving}
//                 >
//                   {saving
//                     ? 'Publishing...'
//                     : editingId
//                       ? 'Save changes →'
//                       : 'Publish article →'}
//                 </button>
//               </div>

//             </form>
//           </section>
//         )}

//         {/* FOOTER */}

//         <footer className="footer">
//           <a href="#home" className="brand">
//             <span className="brand-icon">B.</span>
//             <span>
//               Blog<span className="brand-light">Space</span>
//             </span>
//           </a>

//           <p>Made for ideas. Built for everyone.</p>

//           <span>
//             © {new Date().getFullYear()} BlogSpace
//           </span>
//         </footer>

//       </main>

//       {/* FULL ARTICLE MODAL */}

//       {selectedPost && (
//         <div
//           className="modal-overlay"
//           onClick={() => setSelectedPost(null)}
//         >
//           <article
//             className="article-modal"
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="article-title"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="modal-header">
//               <span className="section-kicker">
//                 FULL ARTICLE
//               </span>

//               <button
//                 type="button"
//                 className="modal-close"
//                 onClick={() => setSelectedPost(null)}
//                 aria-label="Close article"
//               >
//                 ×
//               </button>
//             </div>

//             {selectedPost.imageUrl && (
//               <img
//                 src={selectedPost.imageUrl}
//                 alt={selectedPost.title}
//                 className="modal-image"
//               />
//             )}

//             <div className="modal-content">
//               <div className="post-meta">
//                 <span>{formatDate(selectedPost.createdAt)}</span>
//                 <span>·</span>
//                 <span>
//                   {getReadTime(selectedPost.content)} min read
//                 </span>
//               </div>

//               <h2 id="article-title">
//                 {selectedPost.title}
//               </h2>

//               <div className="modal-author">
//                 <div className="author-avatar">
//                   {(selectedPost.author || 'A')
//                     .charAt(0)
//                     .toUpperCase()}
//                 </div>

//                 <div>
//                   <small>Written by</small>
//                   <strong>
//                     {selectedPost.author || 'Anonymous'}
//                   </strong>
//                 </div>
//               </div>

//               <div className="article-text">
//                 {selectedPost.content}
//               </div>

//               <div className="article-end">
//                 <span>✳</span>
//                 <p>Thank you for reading.</p>
//               </div>

//               {/* BLOG REVIEW SECTION */}
//               <ReviewSection postId={selectedPost._id} />

//             </div>


//             <div className="modal-footer">
//               <button
//                 className="btn btn-publish"
//                 type="button"
//                 onClick={() => setSelectedPost(null)}
//               >
//                 Close article
//               </button>
//             </div>
//           </article>
//         </div>
//       )}

//     </div>
//   );
// }














import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReviewSection from "./components/ReviewSection";
import "./App.css";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

export default function App() {
  const [posts, setPosts] = useState([]);
  const [reviewSummaries, setReviewSummaries] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Niranjan Kumar");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [search, setSearch] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const searchRef = useRef(null);
  const editorRef = useRef(null);
  const articlesRef = useRef(null);

  const editingPost = posts.find((post) => post._id === editingId);

  const loadReviewSummaries = useCallback(async (postList) => {
    if (!postList?.length) {
      setReviewSummaries({});
      return;
    }

    const entries = await Promise.all(
      postList.map(async (post) => {
        try {
          const response = await fetch(`${API}/posts/${post._id}/reviews`);
          const result = await response.json();

          if (!response.ok || result.success === false) {
            throw new Error(result.message || "Unable to load reviews");
          }

          return [
            post._id,
            {
              count: Number(result.count) || 0,
              averageRating: Number(result.averageRating) || 0
            }
          ];
        } catch {
          return [post._id, { count: 0, averageRating: 0 }];
        }
      })
    );

    setReviewSummaries(Object.fromEntries(entries));
  }, []);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API}/posts`);
      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || `HTTP ${response.status}`);
      }

      const postList = Array.isArray(result.data) ? result.data : [];
      setPosts(postList);
      await loadReviewSummaries(postList);
    } catch (err) {
      setError(`${err.message}. Please check backend connection and API URL.`);
    } finally {
      setLoading(false);
    }
  }, [loadReviewSummaries]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Refresh card ratings after a review is submitted.
  useEffect(() => {
    const handleReviewUpdate = () => loadReviewSummaries(posts);
    window.addEventListener("reviews:updated", handleReviewUpdate);

    return () => {
      window.removeEventListener("reviews:updated", handleReviewUpdate);
    };
  }, [posts, loadReviewSummaries]);

  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return;
    }

    const url = URL.createObjectURL(image);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  useEffect(() => {
    if (!showEditor) return;

    requestAnimationFrame(() => {
      editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [showEditor]);

  useEffect(() => {
    if (!selectedPost) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedPost(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedPost]);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return posts;

    return posts.filter((post) =>
      `${post.title || ""} ${post.content || ""} ${post.author || ""}`
        .toLowerCase()
        .includes(query)
    );
  }, [posts, search]);

  function formatDate(date) {
    if (!date) return "Recently published";
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "Recently published";

    return parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  function getReadTime(text = "") {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  }

  function getExcerpt(text = "", limit = 145) {
    const clean = text.replace(/\s+/g, " ").trim();
    return clean.length <= limit ? clean : `${clean.slice(0, limit).trim()}...`;
  }

  function goToArticles() {
    articlesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function focusSearch() {
    goToArticles();
    window.setTimeout(() => searchRef.current?.focus(), 400);
  }

  function openEditor() {
    setError("");
    setNotice("");
    setShowEditor(true);
  }

  function clearForm() {
    setTitle("");
    setContent("");
    setAuthor("Niranjan Kumar");
    setImage(null);
    setEditingId(null);

    const input = document.getElementById("post-image");
    if (input) input.value = "";
  }

  function closeEditor() {
    clearForm();
    setShowEditor(false);
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    setError("");
    setImage(file);
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!title.trim() || !content.trim()) {
      setError("Please enter both title and content.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("content", content.trim());
    formData.append("author", author.trim() || "Niranjan Kumar");
    if (image) formData.append("image", image);

    setSaving(true);

    try {
      const response = await fetch(
        editingId ? `${API}/posts/${editingId}` : `${API}/posts`,
        {
          method: editingId ? "PUT" : "POST",
          body: formData
        }
      );

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || `HTTP ${response.status}`);
      }

      setNotice(editingId ? "Article updated successfully." : "Article published successfully.");
      clearForm();
      setShowEditor(false);
      await loadPosts();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message || "Unable to save article.");
    } finally {
      setSaving(false);
    }
  }

  function editPost(post) {
    setEditingId(post._id);
    setTitle(post.title || "");
    setContent(post.content || "");
    setAuthor(post.author || "Niranjan Kumar");
    setImage(null);
    setError("");
    setNotice("");
    setShowEditor(true);
  }

  async function deletePost(id) {
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    setError("");
    setNotice("");

    try {
      const response = await fetch(`${API}/posts/${id}`, { method: "DELETE" });
      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || `HTTP ${response.status}`);
      }

      setPosts((old) => old.filter((post) => post._id !== id));
      setReviewSummaries((old) => {
        const updated = { ...old };
        delete updated[id];
        return updated;
      });

      if (selectedPost?._id === id) setSelectedPost(null);
      setNotice("Article deleted successfully.");
    } catch (err) {
      setError(err.message || "Unable to delete article.");
    }
  }

  function renderRating(postId) {
    const summary = reviewSummaries[postId] || {
      count: 0,
      averageRating: 0
    };

    return (
      <div className="card-review-summary" aria-label="Article review summary">
        <span className="card-rating-stars">
          {summary.count > 0 ? "★".repeat(Math.round(summary.averageRating)) : "☆☆☆☆☆"}
        </span>
        <strong>
          {summary.count > 0 ? summary.averageRating.toFixed(1) : "New"}
        </strong>
        <span>
          {summary.count} {summary.count === 1 ? "review" : "reviews"}
        </span>
      </div>
    );
  }

  return (
    <div className="site">
      <nav className="navbar">
        <div className="nav-container">
          <a href="#home" className="brand">
            <span className="brand-icon">B.</span>
            <span>Blog<span className="brand-light">Space</span></span>
          </a>

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#articles">Articles</a>
            <button type="button" onClick={focusSearch} className="nav-link-button">
              Discover
            </button>
          </div>

          <div className="nav-actions">
            <div className="nav-search">
              <span>⌕</span>
              <input
                ref={searchRef}
                type="search"
                placeholder="Search stories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search articles"
              />
              {search && (
                <button type="button" onClick={() => setSearch("")}>×</button>
              )}
            </div>

            <button className="nav-write" type="button" onClick={openEditor}>
              ＋ Write a Post
            </button>
          </div>
        </div>
      </nav>

      <main className="container" id="home">
        <section className="hero">
          <div className="hero-content">
            <span className="hero-tag">THE SPACE FOR IDEAS</span>
            <h1>Stories worth<br /><span>sharing.</span></h1>
            <p>
              Discover fresh perspectives, explore new ideas and share
              your knowledge with a community that loves to learn.
            </p>
            <div className="hero-buttons">
              <button className="hero-primary" onClick={goToArticles} type="button">
                Explore stories <span>→</span>
              </button>
              <button className="hero-secondary" onClick={openEditor} type="button">
                Start writing
              </button>
            </div>
            <div className="hero-note">
              <span className="hero-note-dot"></span>
              Ideas, knowledge and stories for everyone
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="art-circle"></div>
            <div className="art-card art-card-back">
              <span>IDEAS</span>
              <div className="art-lines"></div>
              <div className="art-lines short"></div>
            </div>
            <div className="art-card art-card-front">
              <span className="art-small">A PLACE TO</span>
              <strong>THINK.</strong>
              <strong>WRITE.</strong>
              <strong>SHARE.</strong>
              <div className="art-star">✳</div>
            </div>
          </div>
        </section>

        {error && (
          <div className="alert error" role="alert">
            <span>!</span><p>{error}</p>
            <button type="button" onClick={() => setError("")}>×</button>
          </div>
        )}

        {notice && (
          <div className="alert success" role="status">
            <span>✓</span><p>{notice}</p>
            <button type="button" onClick={() => setNotice("")}>×</button>
          </div>
        )}

        <section className="posts-section" id="articles" ref={articlesRef}>
          <div className="posts-heading">
            <div>
              <span className="section-kicker">THE LATEST STORIES</span>
              <h2>Explore articles</h2>
              <p>Discover ideas, stories and perspectives from our community.</p>
            </div>
            <button className="btn btn-outline" onClick={loadPosts} disabled={loading} type="button">
              ↻ {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          <div className="posts-toolbar">
            <div className="results-count">
              All stories <span>{filteredPosts.length}</span>
            </div>
            <div className="toolbar-search">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search by title, topic or author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button type="button" onClick={() => setSearch("")}>×</button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="empty-state">
              <div className="spinner"></div>
              <h3>Discovering stories...</h3>
              <p>Please wait while we load the latest articles.</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✳</div>
              <h3>{search ? "No matching stories" : "Your story starts here"}</h3>
              <p>
                {search
                  ? "Try another keyword to find an article."
                  : "Be the first to publish an article and share your ideas."}
              </p>
              <button className="btn btn-publish" onClick={search ? () => setSearch("") : openEditor} type="button">
                {search ? "Clear search" : "Write your first post →"}
              </button>
            </div>
          ) : (
            <div className="post-grid">
              {filteredPosts.map((post) => (
                <article className="post-card" key={post._id}>
                  <button
                    className="post-image-wrap"
                    type="button"
                    onClick={() => setSelectedPost(post)}
                    aria-label={`Read ${post.title}`}
                  >
                    {post.imageUrl ? (
                      <img className="post-image" src={post.imageUrl} alt={post.title} loading="lazy" />
                    ) : (
                      <div className="post-placeholder">
                        <span>✳</span><small>IDEAS & STORIES</small>
                      </div>
                    )}
                    <span className="image-label">FEATURED STORY</span>
                  </button>

                  <div className="post-card-body">
                    <div className="post-meta">
                      <span>{formatDate(post.createdAt)}</span>
                      <span className="meta-dot">·</span>
                      <span>{getReadTime(post.content)} min read</span>
                    </div>

                    <h3>{post.title}</h3>
                    <p className="post-excerpt">{getExcerpt(post.content)}</p>

                    {renderRating(post._id)}

                    <button className="read-link" type="button" onClick={() => setSelectedPost(post)}>
                      Read full article <span>→</span>
                    </button>

                    <div className="post-card-footer">
                      <div className="author-info">
                        <div className="author-avatar">
                          {(post.author || "A").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <small>Written by</small>
                          <strong>{post.author || "Anonymous"}</strong>
                        </div>
                      </div>

                      <div className="card-actions">
                        <button type="button" onClick={() => editPost(post)}>Edit</button>
                        <button type="button" className="delete-action" onClick={() => deletePost(post._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {showEditor && (
          <section className="publish-section" id="publish" ref={editorRef}>
            <div className="section-heading">
              <div>
                <span className="section-kicker">YOUR WORKSPACE</span>
                <h2>{editingId ? "Edit your story" : "Create something new"}</h2>
                <p>Good ideas deserve to be shared.</p>
              </div>
              <button className="btn btn-outline" type="button" onClick={closeEditor}>
                × Close
              </button>
            </div>

            <form className="editor" onSubmit={submit}>
              <div className="editor-top">
                <div className="editor-icon">✎</div>
                <div><strong>Article editor</strong><small>Write and publish your thoughts</small></div>
                <span className="draft-label">{editingId ? "EDIT ARTICLE" : "NEW ARTICLE"}</span>
              </div>

              <div className="editor-fields">
                <div className="field">
                  <label htmlFor="post-title">Article title *</label>
                  <input id="post-title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={160} required placeholder="Give your story a meaningful title..." />
                </div>

                <div className="field">
                  <label htmlFor="post-author">Author name</label>
                  <input id="post-author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" />
                </div>

                <div className="field field-full">
                  <div className="label-row">
                    <label htmlFor="post-content">Article content *</label>
                    <span>{content.length} characters</span>
                  </div>
                  <textarea id="post-content" rows="8" value={content} onChange={(e) => setContent(e.target.value)} required placeholder="Start writing your article here..." />
                </div>

                <div className="upload-area">
                  <div className="upload-info">
                    <div className="upload-icon">▧</div>
                    <div><strong>Cover image</strong><small>Add an attractive thumbnail · Maximum 5 MB</small></div>
                  </div>
                  <label className="upload-button" htmlFor="post-image">+ Choose image</label>
                  <input id="post-image" type="file" accept="image/*" onChange={handleImageChange} hidden />
                </div>

                {(imagePreview || editingPost?.imageUrl) && (
                  <div className="preview-wrap">
                    <img src={imagePreview || editingPost.imageUrl} alt="Cover preview" className="image-preview" />
                    <button type="button" className="remove-image" onClick={() => {
                      setImage(null);
                      const input = document.getElementById("post-image");
                      if (input) input.value = "";
                    }}>
                      Remove selected image
                    </button>
                  </div>
                )}
              </div>

              <div className="editor-footer">
                <span><span className="privacy-dot"></span>Ready to share your ideas?</span>
                <button className="btn btn-publish" type="submit" disabled={saving}>
                  {saving ? "Publishing..." : editingId ? "Save changes →" : "Publish article →"}
                </button>
              </div>
            </form>
          </section>
        )}

        <footer className="footer">
          <a href="#home" className="brand">
            <span className="brand-icon">B.</span>
            <span>Blog<span className="brand-light">Space</span></span>
          </a>
          <p>Made for ideas. Built for everyone.</p>
          <span>© {new Date().getFullYear()} BlogSpace</span>
        </footer>
      </main>

      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <article
            className="article-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <span className="section-kicker">FULL ARTICLE</span>
              <button type="button" className="modal-close" onClick={() => setSelectedPost(null)} aria-label="Close article">×</button>
            </div>

            {selectedPost.imageUrl && (
              <img src={selectedPost.imageUrl} alt={selectedPost.title} className="modal-image" />
            )}

            <div className="modal-content">
              <div className="post-meta">
                <span>{formatDate(selectedPost.createdAt)}</span>
                <span>·</span>
                <span>{getReadTime(selectedPost.content)} min read</span>
              </div>

              <h2 id="article-title">{selectedPost.title}</h2>

              <div className="modal-author">
                <div className="author-avatar">
                  {(selectedPost.author || "A").charAt(0).toUpperCase()}
                </div>
                <div><small>Written by</small><strong>{selectedPost.author || "Anonymous"}</strong></div>
              </div>

              <div className="article-text">{selectedPost.content}</div>

              <div className="article-end"><span>✳</span><p>Thank you for reading.</p></div>

              <ReviewSection postId={selectedPost._id} />
            </div>

            <div className="modal-footer">
              <button className="btn btn-publish" type="button" onClick={() => setSelectedPost(null)}>
                Close article
              </button>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}
