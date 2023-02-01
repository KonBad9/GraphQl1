import { FC } from "react";
import { gql } from "graphql-request";
import { GetAllBooksQuery, useGetAllBooksQuery } from "@/src/generated/graphql";
import graphqlRequestClient from "@/src/lib/clients/graphqlRequestClient";

const GET_ALL_BOOKS_QUERY = gql`
  query GetAllBooks {
    books {
      bookId
      title
      author {
        authorId
        username
      }
    }
  }
`;

const GqlRequestQuery: FC = () => {
  const { isLoading, error, data } = useGetAllBooksQuery<
    GetAllBooksQuery,
    Error
  >(graphqlRequestClient, {});

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>False</p>;

  return (
    <>
      {data?.books?.map((book) => {
        return (
          <div key={book?.bookId}>
            <h1>{book?.title}</h1>
            <p>AuthorId: {book?.author?.authorId}</p>
            <p>Username: {book?.author?.username}</p>
            <p>BookId: {book?.bookId}</p>
          </div>
        );
      })}
    </>
  );
};

export default GqlRequestQuery;
