export default [
  {
    // invoice data
    label: "Invoice Fields",
    options:[
    {
      related: 'invoice',
      key: 'no',
      label: 'Invoice Number',
    },
    {
      related: 'invoice',
      key: 'date',
      label: 'Invoice Date',
    },
    {
      related: 'invoice',
      key: 'due_date',
      label: 'Due Date',
    },
    {
      related: 'invoice',
      key: 'draft',
      label: 'Draft Invoice'
    },
    {
      related: 'invoice',
      key: 'branch_id',
      label: 'Branch Number',
    },
    {
      related: 'invoice',
      key: 'notes',
      label: 'Invoice Notes'
    },
  ],
},
{
  label: "Invoice Client",
  options:[
    // client data
    {
      related: 'client',
      key: 'client_number',
      label: 'Client Number'
    },
    {
      related: 'client',
      key: 'business_name',
      label: 'Business Name'
    },
    {
      related: 'client',
      key: 'first_name',
      label: 'First Name'
    },
    {
      related: 'client',
      key: 'last_name',
      label: 'Last Name'
    },
    {
      related: 'client',
      key: 'email',
      label: 'Email Address'
    },
    {
      related: 'client',
      key: 'address1',
      label: 'Address'
    },
    {
      related: 'client',
      key: 'phone1',
      label: 'Phone Number'
    },
  ],
},
{
  label: "Invoice Payment",
  options:[
    // payment data
    {
      related: 'payment',
      key: 'payment_status',
      label: 'Payment Status'
    },
    {
      related: 'payment',
      key: 'amount',
      label: 'Amount'
    },
    {
      related: 'payment',
      key: 'summary_discount', // Total Invoice Discount
      label: 'Discount (on total invoice)'
    },
    {
      related: 'payment',
      key: 'summary_subtotal', //Before Tax
      label: 'Total Before Tax'
    },
    {
      related: 'payment',
      key: 'summary_tax1',
      label: 'Total Tax'
    },
    {
      related: 'payment ',
      key: 'payment_method',
      label: 'Payment Method'
    },
    {
      related: 'payment',
      key: 'treasury_code',
      label: 'Treasury Number'
    },
  ],
},
{
  label: "Invoice Items",
  options:[
    // Item data
    {
      related: 'item',
      key: 'product_code',
      label: 'Product Number'
    },
    {
      related: 'item',
      key: 'item',
      label: 'Product Name'
    },
    {
      related: 'item',
      key: 'description',
      label: 'Description'
    },
    {
      related: 'item',
      key: 'unit_price',
      label: 'Unit Price'
    },
    {
      related: 'item',
      key: 'quantity',
      label: 'Quantity'
    },
    {
      related: 'item',
      key: 'summary_tax1',
      label: 'Is Taxed?'
    },
    {
      related: 'item',
      key: 'discount',
      label: 'Item Discount'
    },
    {
      related: 'item',
      key: 'discount_type',
      label: 'Discount Type'
    },
    {
      related: 'item',
      key: 'subtotal',
      label: 'Total Before Tax'
    },

  ]
}
]