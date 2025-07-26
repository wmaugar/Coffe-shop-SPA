import styled from "styled-components";

function SettingsLayout({ children }) {
  const StyledSettingsLayout = styled.div`
    display: flex;
    background-color: var(--color-silver-100);
    flex-direction: column;
    row-gap: 3rem;
    width: 600px;
    padding: 1rem 2rem;
    margin: 0 auto;
    border-style: solid;
    border-width: 1px;
    border-color: var(--color-blue-700);
    border-radius: 10px;
  `;
  return <StyledSettingsLayout>{children}</StyledSettingsLayout>;
}

export default SettingsLayout;
