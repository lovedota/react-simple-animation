class WarehouseService {
  getWarehouses(): Warehouse[] {
    return [
      {
      	id: '1',
      	name: 'Unassign Warehouse',
        products: [
        	{id: '1a',name: 'Unassign Product 1', quantity: 1},
          {id: '2a',name: 'Unassign Product 2', quantity: 2},
          {id: '3a',name: 'Unassign Product 3', quantity: 3},
          {id: '4a',name: 'Unassign Product 4', quantity: 4},
          {id: '5a',name: 'Unassign Product 5', quantity: 5},
          {id: '6a',name: 'Unassign Product 6', quantity: 6},
          {id: '7a',name: 'Unassign Product 7', quantity: 7},
          {id: '8a',name: 'Unassign Product 8', quantity: 8},
          {id: '9a',name: 'Unassign Product 9', quantity: 9},
          {id: '10a',name: 'Unassign Product 10', quantity: 10},
          {id: '11a',name: 'Unassign Product 11', quantity: 11},
          {id: '12a',name: 'Unassign Product 12', quantity: 12}
        ]
      },
      {
          id: '2',
          name: 'Warehouse 1',
          products: [
            {id: '1a',name: 'Product 1.1', quantity: 1},
          ]
      },
      {
          id: '3',
          name: 'Warehouse 2',
          products: [
            {id: '2a',name: 'Product 2.1', quantity: 5},
          ]
      }
    ]
  }
}

export default new WarehouseService();
