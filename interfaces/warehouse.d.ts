interface Product {
  id: string;
  name: string;
  quantity: number;
  isNew?: boolean;
  checked?: boolean;
}

interface Warehouse {
    id: string;
    name: string;
    products: Product[];
    expanded?: boolean;
}
