import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    // firts this data will be empty, and then will be populated
    settings: {
      maxItemsPerCart,
      rowsPerMenu,
      enableDiscount,
      monthlySalesGoal,
      monthlyOrdersGoal,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;
    console.log(value);
    if (!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Max items per cart">
        <Input
          type="number"
          id="max-items"
          defaultValue={maxItemsPerCart}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxItemsPerCart")}
        />
      </FormRow>

      <FormRow label="Rows per menu">
        <Input
          type="number"
          id="menu-rows-number"
          defaultValue={rowsPerMenu}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "rowsPerMenu")}
        />
      </FormRow>

      <FormRow label="Enable discounts">
        <Input
          type="checkbox"
          id="enable-discount"
          defaultValue={enableDiscount}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "enableDiscount")}
        />
      </FormRow>
      <FormRow label="Monthly Sales Goal">
        <Input
          type="number"
          id="monthly-sales-goal"
          defaultValue={monthlySalesGoal}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "monthlySalesGoal")}
        />
      </FormRow>
      <FormRow label="Monthly Orders Goal">
        <Input
          type="number"
          id="monthly-orders-goal"
          defaultValue={monthlyOrdersGoal}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "monthlyOrdersGoal")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
