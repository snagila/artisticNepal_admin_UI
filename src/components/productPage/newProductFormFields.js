export const newProductformFields = [
  {
    label: "Category *",
    name: "category",
    type: "select",
    placeholder: "Select category",
    required: true,
  },

  {
    label: "Name *",
    name: "name",
    type: "text",
    placeholder: "Enter product name",
    required: true,
  },
  {
    label: "Price *",
    name: "price",
    type: "number",
    placeholder: "Enter product price",
    required: true,
  },
  {
    label: "Available Quantity *",
    name: "quantity",
    type: "number",
    placeholder: "Enter available quantity",
    required: true,
  },
  {
    label: "SKU *",
    name: "sku",
    type: "text",
    placeholder: "Enter SKU",
    required: true,
  },
  {
    label: "Description *",
    name: "description",
    type: "textarea",
    placeholder: "Enter product description",
    required: true,
  },
  {
    label: "Status",
    name: "status",
    type: "select",
    placeholder: "Select Status",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
    required: true,
  },
  {
    label: "Sales Price",
    name: "salesPrice",
    type: "number",
    placeholder: "Enter sales price",
  },
  {
    label: "Sales Start Date",
    name: "salesStartDate",
    type: "date",
    placeholder: "Select sales date",
  },
  {
    label: "Sales End Date",
    name: "salesEndDate",
    type: "date",
    placeholder: "Select sales end",
  },
];
