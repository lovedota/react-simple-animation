import './styles/warehouse-list.scss';
import * as React 				  from 'react';
import classNames 					from 'classnames';
import WarehouseRow 				from './warehouse-row';
import WarehouseProductsRow from './warehouse-products-row';

interface Props {
	warehouses: Warehouse[];
	isProcessing: boolean;
	shouldScroll: boolean;
	nextWarehouseId: string;
}

class WarehouseListComponent extends React.Component<Props, {}> {
  render() {
    let warehouses = this.props.warehouses,
			tableCssClasses = classNames('warehouse-list table table-bordered', {wait: this.props.isProcessing}),
      rows = [];

    warehouses.forEach((warehouse, index) => {
      rows.push(<WarehouseRow warehouse={warehouse} key={`warehouse-row-${warehouse.id}`}/>);
      rows.push(
				<WarehouseProductsRow
					warehouse={warehouse}
					key={`warehouse-products-row-${warehouse.id}`}
					shouldScroll={this.props.shouldScroll}
					nextWarehouseId={this.props.nextWarehouseId}
				/>
			);
    });

    return (
        <table className={tableCssClasses}>
          <thead>
            <th className="name-column">Name</th>
						<th className="number-of-products-column">Number of Products</th>
						<th className="total-quantity-column">Total Quantity</th>
						<th></th>
          </thead>
          <tbody>
						{rows}
          </tbody>
        </table>
      );
  }
}

export default WarehouseListComponent;
