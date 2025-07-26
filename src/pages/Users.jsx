import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import UsersLayout from "../ui/UsersLayout";

function NewUsers() {
  return (
    <UsersLayout>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </UsersLayout>
  );
}

export default NewUsers;
