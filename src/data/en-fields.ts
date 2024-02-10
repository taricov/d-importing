export default [
  {
    // invoice data
    label: "Invoice Fields",
    options:[
    {
      related: 'invoice',
      key: 'no',
    },
    {
      related: 'invoice',
      key: 'date',
    },
    {
      related: 'invoice',
      key: 'due_date',
    },
    {
      related: 'invoice',
      key: 'draft',
    },
    {
      related: 'invoice',
      key: 'branch_id',
    },
    {
      related: 'invoice',
      key: 'notes',
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
    },
    {
      related: 'client',
      key: 'business_name',
    },
    {
      related: 'client',
      key: 'first_name',
    },
    {
      related: 'client',
      key: 'last_name',
    },
    {
      related: 'client',
      key: 'email',
    },
    {
      related: 'client',
      key: 'address1',
    },
    {
      related: 'client',
      key: 'phone1',
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
    },
    {
      related: 'payment',
      key: 'payment_method',
    },
    {
      related: 'payment',
      key: 'amount',
    },
    {
      related: 'payment',
      key: 'summary_discount', // Total Invoice Discount
    },
    {
      related: 'payment',
      key: 'summary_subtotal', //Before Tax
    },
    {
      related: 'payment',
      key: 'summary_tax1',
    },
    {
      related: 'payment ',
      key: 'payment_method',
    },
    {
      related: 'payment',
      key: 'treasury_code',
    },
  ],
},
{
  label: "Invoice Items",
  options:[
    // Item data
    {
      related: 'item',
      key: 'item',
    },
    {
      related: 'item',
      key: 'description',
    },
    {
      related: 'item',
      key: 'unit_price',
    },
    {
      related: 'item',
      key: 'quantity',
    },
    {
      related: 'item',
      key: 'summary_tax1',
    },
    {
      related: 'item',
      key: 'discount',
    },
    {
      related: 'item',
      key: 'discount_type',
    },
    {
      related: 'item',
      key: 'subtotal',
    },
    {
      related: 'item',
      key: 'product_id',
    },
    {
      related: 'item',
      key: 'product_code',
    }
  ]
}
]