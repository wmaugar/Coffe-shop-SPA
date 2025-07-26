import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateProduct } from "./useCreateProduct";
import { useEditProduct } from "./useEditProduct";

function CreateProductForm({ productToEdit = {}, onCloseModal }) {
  const { isCreating, createProduct } = useCreateProduct();
  const { isEditing, editProduct } = useEditProduct();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = productToEdit;
  // Check if we are editing or creating a product
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  // formState give us the state of form, here we use it to obtain errors info
  const { errors } = formState;
  // queryClient get value of useQueryClient hook, so you can access to CACHED data

  function onSubmit(data) {
    const imageUrl =
      typeof data.imageUrl === "string" ? data.imageUrl : data.imageUrl[0];

    if (isEditSession)
      editProduct(
        {
          newProductData: { ...data, imageUrl },
          id: editId,
        },
        {
          onSuccess: (data) => {
            reset();
            // This function will be conditionally called,  only if exits onCloseModal property
            onCloseModal?.();
          },
        }
      );
    else
      createProduct(
        { ...data, imageUrl: imageUrl },
        {
          onSuccess: (data) => {
            reset();
            // This function will be conditionally called,  only if exits onCloseModal property
            onCloseModal?.();
          },
        }
      );
  }

  //this function will be called if there is some error on form submission
  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow
        label="Product name"
        disabled={isWorking}
        error={errors?.productName?.message}
      >
        <Input
          type="text"
          id="productName"
          {...register("productName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Category"
        disabled={isWorking}
        error={errors?.category?.message}
      >
        <Input
          type="text"
          id="category"
          {...register("category", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Unit price"
        disabled={isWorking}
        error={errors?.unitPrice?.message}
      >
        <Input
          type="text"
          id="unitPrice"
          {...register("unitPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
            pattern: {
              value: /^\d{1,}(\.\d{0,4})?$/,
              message: "Please provide a valid number",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        disabled={isWorking}
        error={errors?.discount?.message}
      >
        <Input
          type="text"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().unitPrice) ||
              "Discount should be less than regular price",
            pattern: {
              value: /^\d{1,}(\.\d{0,4})?$/,
              message: "Please provide a valid number",
            },
            //getValues returns the values of every field on form
            //This validation uses a callback funcion
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Product photo">
        <FileInput
          id="imageUrl"
          accept="imageUrl/*"
          // This tell react form to ask for this input as a mandatory.
          {...register("imageUrl", {
            // Require upload a imageUrl if it is a CREATING SESSION, OPPOSITE TO EDIT SESSION
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="is Featured ? ">
        <Input type="checkbox" id="isFeatured" {...register("isFeatured")} />
      </FormRow>

      <FormRow label="is Available ? ">
        <Input type="checkbox" id="isAvailable" {...register("isAvailable")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          // This function will be conditionally called,  only if exits onCloseModal property
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        {/* Check if is an Edit Session or Create product session */}
        <Button>{isEditSession ? "Edit product" : "Create new product"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateProductForm;
