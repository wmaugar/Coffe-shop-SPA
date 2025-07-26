import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SettingsLayout from "../ui/SettingsLayout";

function Settings() {
  return (
    <SettingsLayout>
      <Heading as="h1">Update Coffee Shop settings</Heading>
      <UpdateSettingsForm />
    </SettingsLayout>
  );
}

export default Settings;
