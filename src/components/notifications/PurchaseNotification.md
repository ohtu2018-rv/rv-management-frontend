### Without shadow

```js
var products = [
  {
    barcode: "0001",
    quantity: 2,
    price: 180,
    product_name: "Coca-Cola Zero"
  },
  {
    barcode: "0002",
    quantity: 3,
    price: 1644,
    product_name: "Yhden tähden jallu"
  }
];

<PurchaseNotification products={products} />;
```

### With shadow

```js
var products = [
  {
    barcode: "0001",
    quantity: 2,
    price: 180,
    product_name: "Coca-Cola Zero"
  },
  {
    barcode: "0002",
    quantity: 3,
    price: 1644,
    product_name: "Yhden tähden jallu"
  }
];

<PurchaseNotification products={products} shadow />;
```
