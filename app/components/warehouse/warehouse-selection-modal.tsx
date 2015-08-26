import * as React 			from 'react';
import BootstrapModal   from '../common/bootstrap-modal';
import WarehouseActions from '../../actions/warehouse-actions';

interface Props {
  ref: any;
}

interface State {
  value: string;
}

class WarehouseSelectionModalComponent extends React.Component<Props, State> {
  constructor(props) {
      super(props);

      this.state = {
        value: ''
      }
  }

  open() {
    let modal: any = this.refs['modal'];
    modal.open();
  }

	render() {
		return (
      <BootstrapModal
        ref="modal"
        title="Move Products to Warehouse"
        confirm="Move"
        cancel="Close"
        onConfirm={this.handleWarehouseSelectionConfirm}
        disabled={Boolean(!this.state.value)}
      >
        <form>
          <select className="form-control" value={this.state.value} onChange={this.handleWarehouseSelectionChange}>
            <option>---Choose Warehouse---</option>
            <option value="1">Unassign Warehouse</option>
            <option value="2">Warehouse 1</option>
            <option value="3">Warehouse 2</option>
            <option value="4">Warehouse 3</option>
          </select>
        </form>
      </BootstrapModal>
		);
	}

  private handleWarehouseSelectionConfirm = () => {
    WarehouseActions.moveSelectedProductsToWarehouse();
  }

  private handleWarehouseSelectionChange = (e) => {
    let value = e.target.value;
    this.setState({value: value});
    WarehouseActions.saveSelectedNextWarehouse(value);
  }
}

export default WarehouseSelectionModalComponent;
