import styled from "styled-components";
import Button from "../../starter/ui/Button";
import Heading from "../../starter/ui/Heading";

const StyledConfirmDisabled = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDisabled({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDisabled>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to set this product as disabled (Not Available) ?.
      </p>
      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Disable
        </Button>
      </div>
    </StyledConfirmDisabled>
  );
}

export default ConfirmDisabled;
