import { FC } from "react";
import {
  GetBooksByAuthorQuery,
  useGetBooksByAuthorQuery,
} from "@/src/generated/graphql";
import graphqlRequestClient from "@/src/lib/clients/graphqlRequestClient";

interface BooksByAuthorListProps {
  authorId: string;
}

const BooksByAuthorList: FC<BooksByAuthorListProps> = ({
  authorId,
}: BooksByAuthorListProps) => {
  const { isLoading, error, data } = useGetBooksByAuthorQuery<
    GetBooksByAuthorQuery,
    Error
  >(graphqlRequestClient, {
    authorId: parseInt(authorId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return error.message;

  return (
    <>
      {data?.booksByAuthor?.map((book) => {
        return (
          <div key={book?.bookId}>
            <h3>BookTitle: {book?.title}</h3>
            <p>BookId: {book?.bookId}</p>
          </div>
        );
      })}
    </>
  );
};

export default BooksByAuthorList;
