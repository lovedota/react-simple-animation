import './styles/warehouse-row.scss';
import * as React 			from 'react';
import classNames 			from "classnames";
import WarehouseActions from '../../actions/warehouse-actions';

interface Props {
	warehouse: Warehouse;
	key: any;
}

class WarehouseRowComponent extends React.Component<Props, {}> {

	toggle(warehouseId) {
		WarehouseActions.toogleWarehouseItem(warehouseId);
	}

	calculateTotalQuantity(warehouse: Warehouse) {
		return warehouse.products.reduce((count, product) => {
			return count + product.quantity;
		}, 0);
	}

	render() {
		let warehouse = this.props.warehouse,
			toggleCssClasses = classNames('glyphicon', {
				'glyphicon-minus': warehouse.expanded,
				'glyphicon-plus': !warehouse.expanded
			});

		return (
			<tr className="warehouse-row" id={`parent-$(warehouse.id)`}>
				<td className="name-cell" onClick={this.toggle.bind(this, warehouse.id)}>
					<span className={toggleCssClasses}></span>
					{warehouse.name}
				</td>
				<td>{warehouse.products.length}</td>
				<td>{this.calculateTotalQuantity(warehouse)}</td>
				<td></td>
			</tr>
		);
	}
}

export default WarehouseRowComponent;
