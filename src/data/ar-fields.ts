export default [
  {
    // invoice data
    label: "بيانات أساسية",
    options:[
    {
      related: 'invoice',
      key: 'no',
      label: 'رقم الفاتورة',
    },
    {
      related: 'invoice',
      key: 'date',
      label: 'تاريخ الفاتورة',
    },
    {
      related: 'invoice',
      key: 'due_date',
      label: 'تاريخ الاستحقاق',
    },
    {
      related: 'invoice',
      key: 'draft',
      label: 'فاتورة مسودة'
    },
    {
      related: 'invoice',
      key: 'branch_id',
      label: 'رقم الفرع',
    },
    {
      related: 'invoice',
      key: 'notes',
      label: 'ملاحظات على الفاتورة'
    },
  ],
},
{
  label: "بيانات العميل",
  options:[
    // client data
    {
      related: 'client',
      key: 'client_number',
      label: 'رقم/كود العميل'
    },
    {
      related: 'client',
      key: 'business_name',
      label: 'اسم العميل بالكامل'
    },
    {
      related: 'client',
      key: 'first_name',
      label: 'الاسم الأول'
    },
    {
      related: 'client',
      key: 'last_name',
      label: 'الاسم الأخير'
    },
    {
      related: 'client',
      key: 'email',
      label: 'الإيميل'
    },
    {
      related: 'client',
      key: 'address1',
      label: 'العنوان'
    },
    {
      related: 'client',
      key: 'phone1',
      label: 'رقم الجوال'
    },
  ],
},
{
  label: "بيانات الدفع",
  options:[
    // payment data
    {
      related: 'payment',
      key: 'payment_status',
      label: 'حالة الدفع'
    },
    {
      related: 'payment',
      key: 'amount',
      label: 'المدفوع'
    },
    {
      related: 'payment',
      key: 'summary_discount', // Total Invoice Discount
      label: 'الخصم (على مستوى الفاتورة)'
    },
    {
      related: 'payment',
      key: 'summary_subtotal', //Before Tax
      label: 'الإجمالي قبل الضريبة'
    },
    {
      related: 'payment',
      key: 'summary_total', //Before Tax
      label: 'الإجمالي بعد الضريبة'
    },
    {
      related: 'payment',
      key: 'summary_tax1',
      label: 'إجمالي الضريبة'
    },
    {
      related: 'payment ',
      key: 'payment_method',
      label: 'طريقة الدفع'
    },
    {
      related: 'payment',
      key: 'treasury_code',
      label: 'رقم الخزينة'
    },
  ],
},
{
  label: "بيانات البنود",
  options:[
    // Item data
    {
      related: 'item',
      key: 'product_code',
      label: 'رقم/كود المنتج'
    },
    {
      related: 'item',
      key: 'item',
      label: 'اسم المنتج'
    },
    {
      related: 'item',
      key: 'description',
      label: 'وصف المنتج'
    },
    {
      related: 'item',
      key: 'unit_price',
      label: 'سعر الوحدة'
    },
    {
      related: 'item',
      key: 'quantity',
      label: 'الكمية'
    },
    {
      related: 'item',
      key: 'إجمالي الضريبة (على مستوى البند)',
      label: ''
    },
    {
      related: 'item',
      key: 'discount',
      label: 'الخصم (على مستوى البند)'
    },
    {
      related: 'item',
      key: 'discount_type',
      label: 'نوع الخصم (نسبة/مبلغ)'
    },
    {
      related: 'item',
      key: 'subtotal',
      label: 'الإجمالي فبل الضريبة'
    },
    {
      related: 'item',
      key: 'summary_total',
      label: 'الإجمالي بعد الضريبة'
    },

  ]
}
]