import * as React from 'react';
import WarehouseRow from './warehouse-row';
import WarehouseProductsRow from './warehouse-products-row';

interface Props {
	warehouses: any[];
	isProcessing: boolean;
}

class WarehouseListComponent extends React.Component<Props, {}> {
  getTableCssClasses() {
  	return this.props.isProcessing ? 'table table-bordered wait' : 'table table-bordered';
  }

  render() {
    let warehouses = this.props.warehouses,
      rows = [];

    warehouses.forEach((warehouse, index) => {
      rows.push(<WarehouseRow warehouse={warehouse} key={`warehouse-row-${warehouse.id}`}/>);
      rows.push(<WarehouseProductsRow warehouse={warehouse} key={`warehouse-products-row-${warehouse.id}`}/>);
    });

    return (
        <table className={this.getTableCssClasses()}>
          <thead>
              <th></th>
              <th>Name</th>
          </thead>
          <tbody>
						{rows}
          </tbody>
        </table>
      );
  }
}

export default WarehouseListComponent;
