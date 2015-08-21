import * as React from 'react';
import WarehouseActions from '../actions/warehouse-actions';

interface Props {
	warehouse: any;
	key: any;
}

class WarehouseRowComponent extends React.Component<Props, {}> {

	toggle(warehouseId) {
		WarehouseActions.toogleWarehouseItem(warehouseId);
	}

	render() {
		let warehouse = this.props.warehouse;

		return (
			<tr id={`parent-$(warehouse.id)`}>
				<td onClick={this.toggle.bind(this, warehouse.id)}>
					<span className={warehouse.expanded ? 'glyphicon glyphicon-minus': 'glyphicon glyphicon-plus'}></span>
					{warehouse.id}
				</td>
				<td>{warehouse.name}</td>
			</tr>
		);
	}
}

export default WarehouseRowComponent;
