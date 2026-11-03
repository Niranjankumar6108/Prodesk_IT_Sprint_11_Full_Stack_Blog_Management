// // import { useCallback, useEffect, useState } from 'react';
// // import './App.css';

// // const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

// // export default function App() {
// //   const [posts, setPosts] = useState([]);
// //   const [title, setTitle] = useState('');
// //   const [content, setContent] = useState('');
// //   const [author, setAuthor] = useState('Niranjan Kumar');
// //   const [image, setImage] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [saving, setSaving] = useState(false);
// //   const [error, setError] = useState('');
// //   const [notice, setNotice] = useState('');
// //   const [editingId, setEditingId] = useState(null);

// //   const loadPosts = useCallback(async () => {
// //     setLoading(true); setError('');
// //     try {
// //       const response = await fetch(`${API}/posts`);
// //       const result = await response.json();
// //       if (!response.ok || result.success === false) throw new Error(result.message || `HTTP ${response.status}`);
// //       setPosts(Array.isArray(result.data) ? result.data : []);
// //     } catch (e) {
// //       setError(`${e.message}. Check that the backend is running and VITE_API_URL is correct.`);
// //     } finally { setLoading(false); }
// //   }, []);

// //   useEffect(() => { loadPosts(); }, [loadPosts]);

// //   function clearForm() {
// //     setTitle(''); setContent(''); setAuthor('Niranjan Kumar'); setImage(null); setEditingId(null);
// //     const input = document.getElementById('post-image');
// //     if (input) input.value = '';
// //   }

// //   async function submit(event) {
// //     event.preventDefault(); setError(''); setNotice('');
// //     if (!title.trim() || !content.trim()) { setError('Title and content are required.'); return; }
// //     const form = new FormData();
// //     form.append('title', title.trim()); form.append('content', content.trim());
// //     form.append('author', author.trim() || 'Niranjan Kumar');
// //     if (image) form.append('image', image);
// //     setSaving(true);
// //     try {
// //       const response = await fetch(editingId ? `${API}/posts/${editingId}` : `${API}/posts`, {
// //         method: editingId ? 'PUT' : 'POST', body: form
// //       });
// //       const result = await response.json();
// //       if (!response.ok || result.success === false) throw new Error(result.message || `HTTP ${response.status}`);
// //       setNotice(editingId ? 'Post updated successfully.' : 'Post created successfully.');
// //       clearForm(); await loadPosts();
// //     } catch (e) { setError(e.message || 'Unable to save post.'); }
// //     finally { setSaving(false); }
// //   }

// //   function edit(post) {
// //     setEditingId(post._id); setTitle(post.title || ''); setContent(post.content || '');
// //     setAuthor(post.author || 'Niranjan Kumar'); setImage(null); setError(''); setNotice('');
// //     window.scrollTo({ top: 0, behavior: 'smooth' });
// //   }

// //   async function remove(id) {
// //     if (!window.confirm('Delete this post?')) return;
// //     setError(''); setNotice('');
// //     try {
// //       const response = await fetch(`${API}/posts/${id}`, { method: 'DELETE' });
// //       const result = await response.json();
// //       if (!response.ok || result.success === false) throw new Error(result.message || `HTTP ${response.status}`);
// //       setPosts((old) => old.filter((post) => post._id !== id));
// //       setNotice('Post deleted successfully.');
// //     } catch (e) { setError(e.message || 'Unable to delete post.'); }
// //   }

// //   return <div className="page">
// //     <header className="hero">
// //       <div><p className="eyebrow">PRODESK IT · SPRINT 11 · TRACK B</p>
// //         <h1>Blog <span>Data Hub</span></h1>
// //         <p>React + Express + MongoDB Atlas fullstack integration</p></div>
// //       <div className="badge">FULLSTACK<br/>PROJECT</div>
// //     </header>

// //     <section className="panel">
// //       <div className="section-head"><div><p className="eyebrow">PUBLISH CONTENT</p><h2>{editingId ? 'Edit post' : 'Create a post'}</h2></div>
// //         {editingId && <button className="btn light" type="button" onClick={clearForm}>Cancel edit</button>}</div>
// //       <form onSubmit={submit} className="form">
// //         <div className="field"><label htmlFor="post-title">Title *</label><input id="post-title" value={title} onChange={e=>setTitle(e.target.value)} maxLength={160} required placeholder="Enter post title"/></div>
// //         <div className="field"><label htmlFor="post-author">Author</label><input id="post-author" value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Your name"/></div>
// //         <div className="field full"><label htmlFor="post-content">Content *</label><textarea id="post-content" rows="4" value={content} onChange={e=>setContent(e.target.value)} required placeholder="Write your post..."/></div>
// //         <div className="field full"><label htmlFor="post-image">Thumbnail image (optional, max 5 MB)</label><input id="post-image" type="file" accept="image/*" onChange={e=>setImage(e.target.files?.[0] || null)}/><small>Cloudinary credentials are required for image upload.</small></div>
// //         <div className="form-foot full"><span>* Required fields</span><button className="btn primary" disabled={saving}>{saving ? 'Saving…' : editingId ? 'Save changes' : 'Publish post'}</button></div>
// //       </form>
// //     </section>

// //     {error && <div className="alert error" role="alert">{error}</div>}
// //     {notice && <div className="alert success" role="status">{notice}</div>}

// //     <section className="posts">
// //       <div className="section-head"><div><p className="eyebrow">FROM MONGODB ATLAS</p><h2>Published posts <span className="count">{posts.length}</span></h2></div><button className="btn light" onClick={loadPosts} disabled={loading}>{loading ? 'Loading…' : '↻ Refresh'}</button></div>
// //       {loading ? <div className="empty"><div className="spinner"/><p>Loading posts…</p></div>
// //       : posts.length === 0 ? <div className="empty"><h3>No posts yet</h3><p>Create your first post using the form above.</p></div>
// //       : <div className="grid">{posts.map(post=><article className="card" key={post._id}>
// //         {post.imageUrl ? <img className="thumb" src={post.imageUrl} alt={post.title}/> : <div className="thumb placeholder">✦</div>}
// //         <div className="card-body"><small>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'New post'}</small><h3>{post.title}</h3><p className="content">{post.content}</p><div className="author">By {post.author || 'Unknown author'}</div><div className="actions"><button className="btn light" onClick={()=>edit(post)}>Edit</button><button className="btn danger" onClick={()=>remove(post._id)}>Delete</button></div></div>
// //       </article>)}</div>}
// //     </section>
// //     {/* <footer>API endpoint: <code>{API}/posts</code></footer> */}
// //   </div>;
// // }










// import { useCallback, useEffect, useMemo, useState } from 'react';
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

//   const editingPost = posts.find(
//     (post) => post._id === editingId
//   );

//   // Fetch posts
//   const loadPosts = useCallback(async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch(`${API}/posts`);
//       const result = await response.json();

//       if (!response.ok || result.success === false) {
//         throw new Error(result.message || `HTTP ${response.status}`);
//       }

//       setPosts(Array.isArray(result.data) ? result.data : []);
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

//   // Close modal with Escape
//   useEffect(() => {
//     if (!selectedPost) return;

//     function handleKeyDown(event) {
//       if (event.key === 'Escape') {
//         setSelectedPost(null);
//       }
//     }

//     document.addEventListener('keydown', handleKeyDown);
//     document.body.style.overflow = 'hidden';

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//       document.body.style.overflow = '';
//     };
//   }, [selectedPost]);

//   // Search
//   const filteredPosts = useMemo(() => {
//     const query = search.toLowerCase().trim();

//     if (!query) return posts;

//     return posts.filter((post) =>
//       `${post.title} ${post.content} ${post.author}`
//         .toLowerCase()
//         .includes(query)
//     );
//   }, [posts, search]);

//   // Read time
//   function getReadTime(text = '') {
//     const words = text.trim().split(/\s+/).filter(Boolean).length;
//     return Math.max(1, Math.ceil(words / 200));
//   }

//   // Date formatting
//   function formatDate(date) {
//     if (!date) return 'Recently published';

//     const parsed = new Date(date);

//     if (Number.isNaN(parsed.getTime())) return 'Recently published';

//     return parsed.toLocaleDateString('en-IN', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     });
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

//   // Image selection
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

//   // Create / Update post
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
//     formData.append('author', author.trim() || 'Niranjan Kumar');

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
//         throw new Error(result.message || `HTTP ${response.status}`);
//       }

//       setNotice(
//         editingId
//           ? 'Your article has been updated successfully.'
//           : 'Your article has been published successfully.'
//       );

//       clearForm();
//       await loadPosts();

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

//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
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
//         throw new Error(result.message || `HTTP ${response.status}`);
//       }

//       setPosts((old) => old.filter((post) => post._id !== id));

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
//         <a href="#" className="brand">
//           <span className="brand-icon">B.</span>
//           <span>Blog<span className="brand-light">Space</span></span>
//         </a>

//         <div className="nav-right">
//           <span className="nav-status">
//             <span className="status-dot"></span>
//             Publishing platform
//           </span>
//           <span className="nav-avatar">N</span>
//         </div>
//       </nav>

//       <main className="container">

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
//               Discover ideas, explore perspectives and share
//               your knowledge with the world.
//             </p>

//             <a href="#publish" className="hero-link">
//               Start writing <span>↓</span>
//             </a>
//           </div>

//           <div className="hero-art" aria-hidden="true">
//             <div className="art-circle"></div>
//             <div className="art-card art-card-back">
//               <span>IDEAS</span>
//               <div className="art-lines"></div>
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
//             {error}
//             <button onClick={() => setError('')}>×</button>
//           </div>
//         )}

//         {notice && (
//           <div className="alert success" role="status">
//             <span>✓</span>
//             {notice}
//             <button onClick={() => setNotice('')}>×</button>
//           </div>
//         )}

//         {/* CREATE POST */}

//         <section className="publish-section" id="publish">

//           <div className="section-heading">
//             <div>
//               <span className="section-kicker">YOUR WORKSPACE</span>
//               <h2>{editingId ? 'Edit your story' : 'Create something new'}</h2>
//               <p>Good ideas deserve to be shared.</p>
//             </div>

//             {editingId && (
//               <button
//                 className="btn btn-outline"
//                 type="button"
//                 onClick={clearForm}
//               >
//                 Cancel editing
//               </button>
//             )}
//           </div>

//           <form className="editor" onSubmit={submit}>

//             <div className="editor-top">
//               <div className="editor-icon">✎</div>
//               <div>
//                 <strong>Article editor</strong>
//                 <small>Write and publish your thoughts</small>
//               </div>
//               <span className="draft-label">NEW ARTICLE</span>
//             </div>

//             <div className="editor-fields">

//               <div className="field">
//                 <label htmlFor="post-title">Article title</label>
//                 <input
//                   id="post-title"
//                   type="text"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   maxLength={160}
//                   required
//                   placeholder="Give your story a meaningful title..."
//                 />
//               </div>

//               <div className="field">
//                 <label htmlFor="post-author">Author name</label>
//                 <input
//                   id="post-author"
//                   type="text"
//                   value={author}
//                   onChange={(e) => setAuthor(e.target.value)}
//                   placeholder="Your name"
//                 />
//               </div>

//               <div className="field field-full">
//                 <div className="label-row">
//                   <label htmlFor="post-content">Your story</label>
//                   <span>Share your thoughts and ideas</span>
//                 </div>

//                 <textarea
//                   id="post-content"
//                   rows="5"
//                   value={content}
//                   onChange={(e) => setContent(e.target.value)}
//                   required
//                   placeholder="Start writing your article here..."
//                 />

//                 <div className="character-count">
//                   {content.length} characters
//                 </div>
//               </div>

//               <div className="upload-area">
//                 <div className="upload-info">
//                   <div className="upload-icon">▧</div>
//                   <div>
//                     <strong>Cover image</strong>
//                     <small>Choose a beautiful image for your story · Max 5 MB</small>
//                   </div>
//                 </div>

//                 <label className="upload-button" htmlFor="post-image">
//                   + Choose image
//                 </label>

//                 <input
//                   id="post-image"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   hidden
//                 />
//               </div>

//               {(imagePreview || (editingPost && editingPost.imageUrl)) && (
//                 <div className="preview-wrap">
//                   <img
//                     src={imagePreview || editingPost.imageUrl}
//                     alt="Cover preview"
//                     className="image-preview"
//                   />
//                   <button
//                     type="button"
//                     className="remove-image"
//                     onClick={() => {
//                       setImage(null);
//                       const input = document.getElementById('post-image');
//                       if (input) input.value = '';
//                     }}
//                   >
//                     Remove selected image
//                   </button>
//                 </div>
//               )}

//             </div>

//             <div className="editor-footer">
//               <span>
//                 <span className="privacy-dot"></span>
//                 Ready to share your ideas?
//               </span>

//               <button
//                 className="btn btn-publish"
//                 type="submit"
//                 disabled={saving}
//               >
//                 {saving
//                   ? 'Publishing...'
//                   : editingId
//                     ? 'Save changes →'
//                     : 'Publish article →'}
//               </button>
//             </div>
//           </form>
//         </section>

//         {/* BLOG POSTS */}

//         <section className="posts-section" id="articles">

//           <div className="posts-heading">
//             <div>
//               <span className="section-kicker">THE LATEST STORIES</span>
//               <h2>Explore articles</h2>
//               <p>Fresh ideas and perspectives from our community.</p>
//             </div>

//             <button
//               className="btn btn-outline refresh-button"
//               onClick={loadPosts}
//               disabled={loading}
//               type="button"
//             >
//               ↻ {loading ? 'Loading...' : 'Refresh'}
//             </button>
//           </div>

//           <div className="posts-toolbar">
//             <div className="results-count">
//               All stories <span>{filteredPosts.length}</span>
//             </div>

//             <div className="search-box">
//               <span>⌕</span>
//               <input
//                 type="search"
//                 placeholder="Search articles..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               {search && (
//                 <button
//                   onClick={() => setSearch('')}
//                   type="button"
//                 >
//                   ×
//                 </button>
//               )}
//             </div>
//           </div>

//           {loading ? (
//             <div className="empty-state">
//               <div className="spinner"></div>
//               <p>Discovering stories...</p>
//             </div>
//           ) : filteredPosts.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-icon">✳</div>
//               <h3>{search ? 'No matching stories' : 'Your story starts here'}</h3>
//               <p>
//                 {search
//                   ? 'Try another keyword to find an article.'
//                   : 'Publish your first article and share your ideas with everyone.'}
//               </p>
//             </div>
//           ) : (
//             <div className="post-grid">
//               {filteredPosts.map((post) => (
//                 <article className="post-card" key={post._id}>

//                   <div
//                     className="post-image-wrap"
//                     onClick={() => setSelectedPost(post)}
//                     role="button"
//                     tabIndex={0}
//                     onKeyDown={(e) => {
//                       if (e.key === 'Enter') setSelectedPost(post);
//                     }}
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

//                     <span className="image-label">ARTICLE</span>
//                   </div>

//                   <div className="post-card-body">

//                     <div className="post-meta">
//                       <span>{formatDate(post.createdAt)}</span>
//                       <span className="meta-dot">·</span>
//                       <span>{getReadTime(post.content)} min read</span>
//                     </div>

//                     <h3>{post.title}</h3>

//                     <p className="post-excerpt">
//                       {post.content}
//                     </p>

//                     <button
//                       className="read-link"
//                       onClick={() => setSelectedPost(post)}
//                       type="button"
//                     >
//                       Read article <span>→</span>
//                     </button>

//                     <div className="post-card-footer">
//                       <div className="author-info">
//                         <div className="author-avatar">
//                           {(post.author || 'A').charAt(0).toUpperCase()}
//                         </div>
//                         <div>
//                           <small>Written by</small>
//                           <strong>{post.author || 'Anonymous'}</strong>
//                         </div>
//                       </div>

//                       <div className="card-actions">
//                         <button
//                           type="button"
//                           title="Edit article"
//                           onClick={() => editPost(post)}
//                         >
//                           Edit
//                         </button>

//                         <button
//                           type="button"
//                           title="Delete article"
//                           className="delete-action"
//                           onClick={() => deletePost(post._id)}
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

//         {/* FOOTER */}

//         <footer className="footer">
//           <a href="#" className="brand">
//             <span className="brand-icon">B.</span>
//             <span>Blog<span className="brand-light">Space</span></span>
//           </a>

//           <p>Made for ideas. Built for everyone.</p>

//           <span>© {new Date().getFullYear()} BlogSpace</span>
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
//               <span className="section-kicker">FULL ARTICLE</span>

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
//                 <span>{getReadTime(selectedPost.content)} min read</span>
//               </div>

//               <h2 id="article-title">{selectedPost.title}</h2>

//               <div className="modal-author">
//                 <div className="author-avatar">
//                   {(selectedPost.author || 'A').charAt(0).toUpperCase()}
//                 </div>
//                 <div>
//                   <small>Written by</small>
//                   <strong>{selectedPost.author || 'Anonymous'}</strong>
//                 </div>
//               </div>

//               <div className="article-text">
//                 {selectedPost.content}
//               </div>

//               <div className="article-end">
//                 <span>✳</span>
//                 <p>Thank you for reading.</p>
//               </div>
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














import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import './App.css';

const API = (
  import.meta.env.VITE_API_URL || 'http://localhost:5000'
).replace(/\/+$/, '');

export default function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Niranjan Kumar');
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [search, setSearch] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  const searchRef = useRef(null);
  const editorRef = useRef(null);
  const articlesRef = useRef(null);

  const editingPost = posts.find(
    (post) => post._id === editingId
  );

  // Load posts from MongoDB
  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API}/posts`);
      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message || `HTTP ${response.status}`
        );
      }

      setPosts(
        Array.isArray(result.data) ? result.data : []
      );
    } catch (err) {
      setError(
        `${err.message}. Please check backend connection and API URL.`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Image preview
  useEffect(() => {
    if (!image) {
      setImagePreview('');
      return;
    }

    const url = URL.createObjectURL(image);
    setImagePreview(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  // Scroll to editor when opened
  useEffect(() => {
    if (showEditor) {
      requestAnimationFrame(() => {
        editorRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    }
  }, [showEditor]);

  // Close article with Escape
  useEffect(() => {
    if (!selectedPost) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedPost(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPost]);

  // Search posts
  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return posts;

    return posts.filter((post) =>
      `${post.title || ''} ${post.content || ''} ${post.author || ''}`
        .toLowerCase()
        .includes(query)
    );
  }, [posts, search]);

  // Helpers
  function formatDate(date) {
    if (!date) return 'Recently published';

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return 'Recently published';
    }

    return parsed.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  function getReadTime(text = '') {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  }

  function getExcerpt(text = '', limit = 145) {
    const clean = text.replace(/\s+/g, ' ').trim();

    if (clean.length <= limit) return clean;

    return `${clean.slice(0, limit).trim()}...`;
  }

  // Navbar actions
  function goToArticles() {
    articlesRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  function focusSearch() {
    goToArticles();

    setTimeout(() => {
      searchRef.current?.focus();
    }, 400);
  }

  function openEditor() {
    setError('');
    setNotice('');
    setShowEditor(true);
  }

  function closeEditor() {
    clearForm();
    setShowEditor(false);
  }

  // Reset form
  function clearForm() {
    setTitle('');
    setContent('');
    setAuthor('Niranjan Kumar');
    setImage(null);
    setEditingId(null);

    const input = document.getElementById('post-image');

    if (input) input.value = '';
  }

  // Image validation
  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image.');
      event.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5 MB.');
      event.target.value = '';
      return;
    }

    setError('');
    setImage(file);
  }

  // Create or update post
  async function submit(event) {
    event.preventDefault();

    setError('');
    setNotice('');

    if (!title.trim() || !content.trim()) {
      setError('Please enter both title and content.');
      return;
    }

    const formData = new FormData();

    formData.append('title', title.trim());
    formData.append('content', content.trim());
    formData.append(
      'author',
      author.trim() || 'Niranjan Kumar'
    );

    if (image) {
      formData.append('image', image);
    }

    setSaving(true);

    try {
      const response = await fetch(
        editingId
          ? `${API}/posts/${editingId}`
          : `${API}/posts`,
        {
          method: editingId ? 'PUT' : 'POST',
          body: formData
        }
      );

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message || `HTTP ${response.status}`
        );
      }

      setNotice(
        editingId
          ? 'Your article has been updated successfully.'
          : 'Your article has been published successfully.'
      );

      clearForm();
      setShowEditor(false);

      await loadPosts();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    } catch (err) {
      setError(err.message || 'Unable to publish article.');
    } finally {
      setSaving(false);
    }
  }

  // Edit post
  function editPost(post) {
    setEditingId(post._id);
    setTitle(post.title || '');
    setContent(post.content || '');
    setAuthor(post.author || 'Niranjan Kumar');
    setImage(null);

    setError('');
    setNotice('');
    setShowEditor(true);
  }

  // Delete post
  async function deletePost(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this article?'
    );

    if (!confirmed) return;

    setError('');
    setNotice('');

    try {
      const response = await fetch(`${API}/posts/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message || `HTTP ${response.status}`
        );
      }

      setPosts((old) =>
        old.filter((post) => post._id !== id)
      );

      if (selectedPost?._id === id) {
        setSelectedPost(null);
      }

      setNotice('Article deleted successfully.');

    } catch (err) {
      setError(err.message || 'Unable to delete article.');
    }
  }

  return (
    <div className="site">

      {/* NAVIGATION */}

      <nav className="navbar">
        <div className="nav-container">

          <a
            href="#home"
            className="brand"
            onClick={() => window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })}
          >
            <span className="brand-icon">B.</span>
            <span>
              Blog<span className="brand-light">Space</span>
            </span>
          </a>

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#articles">Articles</a>
            <button
              type="button"
              onClick={focusSearch}
              className="nav-link-button"
            >
              Discover
            </button>
          </div>

          <div className="nav-actions">

            <div className="nav-search">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search stories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={goToArticles}
                ref={searchRef}
                aria-label="Search articles"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <button
              className="nav-write"
              type="button"
              onClick={openEditor}
            >
              <span>＋</span>
              Write a Post
            </button>

            <button
              className="mobile-search"
              type="button"
              onClick={focusSearch}
              aria-label="Search"
            >
              ⌕
            </button>

          </div>
        </div>
      </nav>

      <main className="container" id="home">

        {/* HERO */}

        <section className="hero">
          <div className="hero-content">

            <span className="hero-tag">
              THE SPACE FOR IDEAS
            </span>

            <h1>
              Stories worth
              <br />
              <span>sharing.</span>
            </h1>

            <p>
              Discover fresh perspectives, explore new ideas
              and share your knowledge with a community
              that loves to learn.
            </p>

            <div className="hero-buttons">
              <button
                className="hero-primary"
                onClick={goToArticles}
                type="button"
              >
                Explore stories <span>→</span>
              </button>

              <button
                className="hero-secondary"
                onClick={openEditor}
                type="button"
              >
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

        {/* NOTIFICATIONS */}

        {error && (
          <div className="alert error" role="alert">
            <span>!</span>
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setError('')}
              aria-label="Close error"
            >
              ×
            </button>
          </div>
        )}

        {notice && (
          <div className="alert success" role="status">
            <span>✓</span>
            <p>{notice}</p>
            <button
              type="button"
              onClick={() => setNotice('')}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        )}

        {/* ALL POSTS - RIGHT AFTER HERO */}

        <section
          className="posts-section"
          id="articles"
          ref={articlesRef}
        >
          <div className="posts-heading">
            <div>
              <span className="section-kicker">
                THE LATEST STORIES
              </span>

              <h2>Explore articles</h2>

              <p>
                Discover ideas, stories and perspectives
                from our community.
              </p>
            </div>

            <button
              className="btn btn-outline"
              onClick={loadPosts}
              disabled={loading}
              type="button"
            >
              ↻ {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          <div className="posts-toolbar">
            <div className="results-count">
              All stories
              <span>{filteredPosts.length}</span>
            </div>

            <div className="toolbar-search">
              <span>⌕</span>
              <input
                ref={searchRef}
                type="search"
                placeholder="Search by title, topic or author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                >
                  ×
                </button>
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

              <h3>
                {search
                  ? 'No matching stories'
                  : 'Your story starts here'}
              </h3>

              <p>
                {search
                  ? 'Try another keyword to find an article.'
                  : 'Be the first to publish an article and share your ideas.'}
              </p>

              {search ? (
                <button
                  className="btn btn-outline"
                  onClick={() => setSearch('')}
                  type="button"
                >
                  Clear search
                </button>
              ) : (
                <button
                  className="btn btn-publish"
                  onClick={openEditor}
                  type="button"
                >
                  Write your first post →
                </button>
              )}
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
                      <img
                        className="post-image"
                        src={post.imageUrl}
                        alt={post.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="post-placeholder">
                        <span>✳</span>
                        <small>IDEAS & STORIES</small>
                      </div>
                    )}

                    <span className="image-label">
                      FEATURED STORY
                    </span>
                  </button>

                  <div className="post-card-body">

                    <div className="post-meta">
                      <span>{formatDate(post.createdAt)}</span>
                      <span className="meta-dot">·</span>
                      <span>
                        {getReadTime(post.content)} min read
                      </span>
                    </div>

                    <h3>{post.title}</h3>

                    <p className="post-excerpt">
                      {getExcerpt(post.content)}
                    </p>

                    <button
                      className="read-link"
                      type="button"
                      onClick={() => setSelectedPost(post)}
                    >
                      Read full article <span>→</span>
                    </button>

                    <div className="post-card-footer">

                      <div className="author-info">
                        <div className="author-avatar">
                          {(post.author || 'A')
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <small>Written by</small>
                          <strong>
                            {post.author || 'Anonymous'}
                          </strong>
                        </div>
                      </div>

                      <div className="card-actions">
                        <button
                          type="button"
                          onClick={() => editPost(post)}
                          title="Edit article"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-action"
                          onClick={() => deletePost(post._id)}
                          title="Delete article"
                        >
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

        {/* CREATE POST FORM - OPEN ONLY ON BUTTON CLICK */}

        {showEditor && (
          <section
            className="publish-section"
            id="publish"
            ref={editorRef}
          >
            <div className="section-heading">
              <div>
                <span className="section-kicker">
                  YOUR WORKSPACE
                </span>

                <h2>
                  {editingId
                    ? 'Edit your story'
                    : 'Create something new'}
                </h2>

                <p>
                  Good ideas deserve to be shared.
                </p>
              </div>

              <button
                className="btn btn-outline"
                type="button"
                onClick={closeEditor}
              >
                × Close
              </button>
            </div>

            <form className="editor" onSubmit={submit}>

              <div className="editor-top">
                <div className="editor-icon">✎</div>

                <div>
                  <strong>Article editor</strong>
                  <small>
                    Write and publish your thoughts
                  </small>
                </div>

                <span className="draft-label">
                  {editingId ? 'EDIT ARTICLE' : 'NEW ARTICLE'}
                </span>
              </div>

              <div className="editor-fields">

                <div className="field">
                  <label htmlFor="post-title">
                    Article title *
                  </label>

                  <input
                    id="post-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={160}
                    required
                    placeholder="Give your story a meaningful title..."
                  />
                </div>

                <div className="field">
                  <label htmlFor="post-author">
                    Author name
                  </label>

                  <input
                    id="post-author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Your name"
                  />
                </div>

                <div className="field field-full">
                  <div className="label-row">
                    <label htmlFor="post-content">
                      Article content *
                    </label>

                    <span>
                      {content.length} characters
                    </span>
                  </div>

                  <textarea
                    id="post-content"
                    rows="8"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    placeholder="Start writing your article here..."
                  />
                </div>

                <div className="upload-area">
                  <div className="upload-info">
                    <div className="upload-icon">▧</div>

                    <div>
                      <strong>Cover image</strong>
                      <small>
                        Add an attractive thumbnail · Maximum 5 MB
                      </small>
                    </div>
                  </div>

                  <label
                    className="upload-button"
                    htmlFor="post-image"
                  >
                    + Choose image
                  </label>

                  <input
                    id="post-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    hidden
                  />
                </div>

                {(imagePreview ||
                  (editingPost && editingPost.imageUrl)) && (
                  <div className="preview-wrap">
                    <img
                      src={imagePreview || editingPost.imageUrl}
                      alt="Cover preview"
                      className="image-preview"
                    />

                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => {
                        setImage(null);

                        const input =
                          document.getElementById('post-image');

                        if (input) input.value = '';
                      }}
                    >
                      Remove selected image
                    </button>
                  </div>
                )}

              </div>

              <div className="editor-footer">
                <span>
                  <span className="privacy-dot"></span>
                  Ready to share your ideas?
                </span>

                <button
                  className="btn btn-publish"
                  type="submit"
                  disabled={saving}
                >
                  {saving
                    ? 'Publishing...'
                    : editingId
                      ? 'Save changes →'
                      : 'Publish article →'}
                </button>
              </div>

            </form>
          </section>
        )}

        {/* FOOTER */}

        <footer className="footer">
          <a href="#home" className="brand">
            <span className="brand-icon">B.</span>
            <span>
              Blog<span className="brand-light">Space</span>
            </span>
          </a>

          <p>Made for ideas. Built for everyone.</p>

          <span>
            © {new Date().getFullYear()} BlogSpace
          </span>
        </footer>

      </main>

      {/* FULL ARTICLE MODAL */}

      {selectedPost && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedPost(null)}
        >
          <article
            className="article-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <span className="section-kicker">
                FULL ARTICLE
              </span>

              <button
                type="button"
                className="modal-close"
                onClick={() => setSelectedPost(null)}
                aria-label="Close article"
              >
                ×
              </button>
            </div>

            {selectedPost.imageUrl && (
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="modal-image"
              />
            )}

            <div className="modal-content">
              <div className="post-meta">
                <span>{formatDate(selectedPost.createdAt)}</span>
                <span>·</span>
                <span>
                  {getReadTime(selectedPost.content)} min read
                </span>
              </div>

              <h2 id="article-title">
                {selectedPost.title}
              </h2>

              <div className="modal-author">
                <div className="author-avatar">
                  {(selectedPost.author || 'A')
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <small>Written by</small>
                  <strong>
                    {selectedPost.author || 'Anonymous'}
                  </strong>
                </div>
              </div>

              <div className="article-text">
                {selectedPost.content}
              </div>

              <div className="article-end">
                <span>✳</span>
                <p>Thank you for reading.</p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-publish"
                type="button"
                onClick={() => setSelectedPost(null)}
              >
                Close article
              </button>
            </div>
          </article>
        </div>
      )}

    </div>
  );
}

