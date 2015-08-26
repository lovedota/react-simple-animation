import './styles/warehouse-command-buttons.scss';
import * as React 						 from 'react';
import WarehouseActions 			 from '../../actions/warehouse-actions';
import WarehouseSelectionModal from './warehouse-selection-modal';

interface Props {
	disabled: boolean;
}

class WarehouseCommandButtonsComponent extends React.Component<Props, {}> {
	openWarehouseSelectionModal = () => {
		let modal: any = this.refs['warehouseSelectionModal'];
    modal.open();
	}

	render() {
		return (
			<div>
				<div className="warehouse-command-buttons">
					<div className="btn-group btn-default">
							<button
								className="btn btn-default"
								disabled={this.props.disabled}
								onClick={this.openWarehouseSelectionModal}
							>
									<i className="glyphicon glyphicon-transfer">
									</i> <span data-zh="转换" data-es="Transformar">Open Move Modal</span>
							</button>
							<button className="btn btn-default" disabled={this.props.disabled}>
									<i className="glyphicon glyphicon-trash"></i>
									<span data-zh="摧毁" data-es="Destruir">Destroy</span>
							</button>
					</div>
				</div>
				<WarehouseSelectionModal ref="warehouseSelectionModal"/>
			</div>
		);
	}
}

export default WarehouseCommandButtonsComponent;
