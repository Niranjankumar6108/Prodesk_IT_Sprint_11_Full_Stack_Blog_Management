
// import React, { useEffect, useState } from "react";
// import "./ReviewSection.css";

// const API = (import.meta.env.VITE_API_URL || "http://localhost:5000")
//   .replace(/\/+$/, "");

// export default function ReviewSection({ postId }) {
//   const [reviews, setReviews] = useState([]);
//   const [name, setName] = useState("");
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   async function loadReviews() {
//     try {
//       setLoading(true);
//       const response = await fetch(`${API}/posts/${postId}/reviews`);
//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Could not load reviews");
//       }

//       setReviews(result.data || []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     if (postId) loadReviews();
//   }, [postId]);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     if (!name.trim() || !comment.trim()) {
//       setError("Please enter your name and review.");
//       return;
//     }

//     try {
//       setSubmitting(true);

//       const response = await fetch(
//         `${API}/posts/${postId}/reviews`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             name,
//             rating,
//             comment
//           })
//         }
//       );

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Review submission failed");
//       }

//       setReviews((previous) => [result.data, ...previous]);
//       setName("");
//       setRating(5);
//       setComment("");
//       setMessage("Your review was submitted successfully!");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <section className="review-section">
//       <div className="review-heading">
//         <div>
//           <h3>Reader Reviews</h3>
//           <p>{reviews.length} reviews</p>
//         </div>
//       </div>

//       <form className="review-form" onSubmit={handleSubmit}>
//         <h4>Write a Review</h4>

//         <label htmlFor={`review-name-${postId}`}>Your Name</label>
//         <input
//           id={`review-name-${postId}`}
//           type="text"
//           placeholder="Enter your name"
//           value={name}
//           maxLength={50}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

//         <label>Your Rating</label>
//         <div className="review-stars">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <button
//               key={star}
//               type="button"
//               className={star <= rating ? "star active" : "star"}
//               onClick={() => setRating(star)}
//               aria-label={`Rate ${star} stars`}
//             >
//               ★
//             </button>
//           ))}
//         </div>

//         <label htmlFor={`review-comment-${postId}`}>Your Review</label>
//         <textarea
//           id={`review-comment-${postId}`}
//           placeholder="Share your thoughts about this blog..."
//           value={comment}
//           maxLength={1000}
//           rows={4}
//           onChange={(e) => setComment(e.target.value)}
//           required
//         />

//         {error && <p className="review-error">{error}</p>}
//         {message && <p className="review-success">{message}</p>}

//         <button
//           type="submit"
//           className="review-submit"
//           disabled={submitting}
//         >
//           {submitting ? "Submitting..." : "Submit Review"}
//         </button>
//       </form>

//       <div className="review-list">
//         <h4>All Reviews</h4>

//         {loading ? (
//           <p>Loading reviews...</p>
//         ) : reviews.length === 0 ? (
//           <p>No reviews yet. Be the first to review!</p>
//         ) : (
//           reviews.map((review) => (
//             <article className="review-item" key={review._id}>
//               <div className="review-item-top">
//                 <strong>{review.name}</strong>
//                 <span className="review-date">
//                   {new Date(review.createdAt).toLocaleDateString()}
//                 </span>
//               </div>

//               <div className="review-display-stars">
//                 {"★".repeat(review.rating)}
//                 <span>{"☆".repeat(5 - review.rating)}</span>
//               </div>

//               <p>{review.comment}</p>
//             </article>
//           ))
//         )}
//       </div>
//     </section>
//   );
// }










import { useCallback, useEffect, useState } from "react";
import "./ReviewSection.css";

const API = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export default function ReviewSection({ postId, onReviewSubmitted }) {
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({
    reviewCount: 0,
    averageRating: 0
  });

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API}/posts/${postId}/reviews`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to load reviews");
      }

      setReviews(Array.isArray(result.data) ? result.data : []);
      setSummary({
        reviewCount: result.count || 0,
        averageRating: result.averageRating || 0
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) loadReviews();
  }, [postId, loadReviews]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (name.trim().length < 2 || comment.trim().length < 3) {
      setError("Please enter a valid name and review.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(`${API}/posts/${postId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim(),
          rating,
          comment: comment.trim()
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Review submission failed");
      }

      setName("");
      setRating(5);
      setComment("");
      setNotice("Thank you! Your review has been submitted.");


      // Refresh review count and rating on blog cards
  window.dispatchEvent(new Event("reviews:updated"));
  
      await loadReviews();

      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="review-section">
      <div className="review-heading">
        <div>
          <span className="review-eyebrow">COMMUNITY FEEDBACK</span>
          <h3>Reader Reviews</h3>
          <p>Real feedback from readers of this article.</p>
        </div>

        <div className="review-overall">
          <strong>{summary.averageRating.toFixed(1)}</strong>
          <span className="review-stars-static">★★★★★</span>
          <small>{summary.reviewCount} reviews</small>
        </div>
      </div>

      <form className="review-form" onSubmit={handleSubmit}>
        <h4>Share your experience</h4>

        <label htmlFor={`review-name-${postId}`}>Your name</label>
        <input
          id={`review-name-${postId}`}
          value={name}
          onChange={(event) => setName(event.target.value)}
          minLength={2}
          maxLength={50}
          placeholder="Enter your name"
          required
        />

        <label>Your rating</label>
        <div className="review-stars-input">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className={value <= rating ? "star active" : "star"}
              onClick={() => setRating(value)}
              aria-label={`Rate ${value} out of 5`}
              aria-pressed={rating === value}
            >
              ★
            </button>
          ))}
        </div>

        <label htmlFor={`review-comment-${postId}`}>Your review</label>
        <textarea
          id={`review-comment-${postId}`}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          minLength={3}
          maxLength={1000}
          rows={4}
          placeholder="What did you think about this article?"
          required
        />

        {error && <p className="review-error">{error}</p>}
        {notice && <p className="review-success">{notice}</p>}

        <button
          type="submit"
          className="review-submit"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit review"}
        </button>
      </form>

      <div className="review-list">
        <div className="review-list-heading">
          <h4>All reader reviews</h4>
          <span>{summary.reviewCount} total</span>
        </div>

        {loading ? (
          <p className="review-empty">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="review-empty">
            No reviews yet. Be the first to share your feedback.
          </p>
        ) : (
          reviews.map((review) => (
            <article className="review-item" key={review._id}>
              <div className="review-item-top">
                <div className="reviewer-avatar">
                  {(review.name || "R").charAt(0).toUpperCase()}
                </div>

                <div className="reviewer-details">
                  <strong>{review.name}</strong>
                  <small>
                    {new Date(review.createdAt).toLocaleDateString("en-IN")}
                  </small>
                </div>

                <span className="review-item-rating">
                  {"★".repeat(review.rating)}
                  <span>{"☆".repeat(5 - review.rating)}</span>
                </span>
              </div>

              <p className="review-comment">{review.comment}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
