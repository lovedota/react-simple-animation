class WarehouseService {
  getWarehouses(): any[] {
    return [
      {
      	id: '1',
      	name: 'Unassign Warehouse',
        products: [
        	{id: '1a',name: 'Unassign Product 1', quantity: 1},
          {id: '2a',name: 'Unassign Product 2', quantity: 2},
          {id: '3a',name: 'Unassign Product 3', quantity: 3},
          {id: '4a',name: 'Unassign Product 4', quantity: 4},
          {id: '5a',name: 'Unassign Product 1', quantity: 1},
          {id: '6a',name: 'Unassign Product 2', quantity: 2},
          {id: '7a',name: 'Unassign Product 3', quantity: 3},
          {id: '8a',name: 'Unassign Product 4', quantity: 4},
          {id: '9a',name: 'Unassign Product 1', quantity: 1},
          {id: '10a',name: 'Unassign Product 2', quantity: 2},
          {id: '11a',name: 'Unassign Product 3', quantity: 3},
          {id: '12a',name: 'Unassign Product 4', quantity: 4}
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
