import { useState } from "react";
import { Book, Review } from "../mocks/types";
import axios from "axios"

type Props = {
  book: Book;
};

export default function Home({ book }: Props) {
  const [reviews, setReviews] = useState<Review[] | null>(null);

  const handleGetReviews = () => {
    // Client-side request are mocked by `mocks/browser.ts`.
    axios.get("/reviews").then((r) => setReviews(r.data))
  };

  return (
    <div>
      <img src={book.imageUrl} alt={book.title} width="250" />
      <h1>{book.title}</h1>
      <p>{book.description}</p>
      <button onClick={handleGetReviews}>Load reviews</button>
      {reviews && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.text}</p>
              <p>{review.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  // Server-side requests are mocked by `mocks/server.ts`.
  // const res = await axios.get("https://my.backend/book");
  // const book = res.data;

  const res = await fetch("https://my.backend/book");
  const book = await res.json();

  return {
    props: {
      book,
    },
  };
}
