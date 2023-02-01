import { FC } from "react";
import { useQueryClient } from "react-query";
import AuthorsList from "@/src/components/AuthorsList";
import {
  CreateAuthorMutation,
  CreateAuthorMutationVariables,
  useCreateAuthorMutation,
} from "@/src/generated/graphql";
import graphqlRequestClient from "@/src/lib/clients/graphqlRequestClient";

const GraphqlMutation: FC = () => {
  const queryClient = useQueryClient();
  const { mutate } = useCreateAuthorMutation<Error>(graphqlRequestClient, {
    onSuccess: (
      data: CreateAuthorMutation,
      _variables: CreateAuthorMutationVariables,
      _context: unknown
    ) => {
      queryClient.invalidateQueries("GetAllAuthors");
      return console.log("mutation data", data);
    },
  });

  return (
    <>
      <button
        type="button"
        onClick={() => mutate({ input: { username: "Bucko" } })}
      >
        Add
      </button>
      <AuthorsList />
    </>
  );
};

export default GraphqlMutation;
