import styled from "styled-components";

function UsersLayout({ children }) {
  const StyledUsersLayout = styled.div`
    display: flex;
    background-color: var(--color-silver-100);
    flex-direction: column;
    width: 600px;
    row-gap: 3rem;

    padding: 1rem 2rem;
    margin: 0 auto;
    border-style: solid;
    border-width: 1px;
    border-color: var(--color-blue-700);
    border-radius: 10px;
  `;
  return <StyledUsersLayout>{children}</StyledUsersLayout>;
}

export default UsersLayout;
