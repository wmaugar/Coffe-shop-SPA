import { useSearchParams } from "react-router";
import Input from "./Input";
import Select from "./Select";
import Form from "./Form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "./Button";
import { HiOutlineSearch } from "react-icons/hi";
import Row from "./Row";
import styled from "styled-components";

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  grid-column: 1/-1;
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding-right: 9rem;
`;
const StyledForm = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 0.6fr 0.7fr 1fr 0.1fr;
  grid-template-rows: 1fr 0.1fr;
  column-gap: 1rem;
`;

function SearchBy({ options, defaultValue }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const [option, setOption] = useState(defaultValue);

  function onSubmit(data) {
    const newSearch = `${option}-${data.searchValue}`;
    console.log(newSearch);
    searchParams.set("searchBy", newSearch);
    setSearchParams(searchParams);
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="regular">
      <StyledForm>
        <label>Search by</label>
        <Select
          options={options}
          type="white"
          value={option}
          onChange={(e) => setOption(e.target.value)}
        />
        <Input
          type="text"
          id="searchValue"
          {...register("searchValue", {
            required: "This field is required",

            pattern: {
              value: /^[a-zA-Z0-9_ ]+$/,
              message: "Numbers, letters, underscore and spaces are allowed",
            },
          })}
        />

        <Button $variation="secondary" $size="medium">
          <HiOutlineSearch />
        </Button>
        {errors && <Error>{errors?.searchValue?.message}</Error>}
      </StyledForm>
    </Form>
  );
}

export default SearchBy;
