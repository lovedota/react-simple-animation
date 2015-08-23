import * as React     from 'react';
import logClass       from '../../decorators/log-class-decorator';
import WarehouseList  from './warehouse-list';
import BootstrapModal from '../common/bootstrap-modal';
import WarehouseStore from '../../stores/warehouse-store';

interface Props {

}

interface WarehousePageState {
  warehouses: Warehouse[];
  isProcessing: boolean;
}

function getStateFromStores(): WarehousePageState {
  return {
    warehouses: WarehouseStore.warehouses,
    isProcessing: false
  };
}

@logClass
class WarehousePageComponent extends React.Component<Props, {}> {
  state: WarehousePageState;

  constructor() {
      super();
      this.state = getStateFromStores();
  }

  componentWillUnmount() {
    WarehouseStore.removeChangeListener(this._onChange);
  }

  componentDidMount() {
    WarehouseStore.addChangeListener(this._onChange);
  }

  render() {
     return (
       <div>
        <WarehouseList
          warehouses={this.state.warehouses}
          isProcessing={this.state.isProcessing}
        />
        <BootstrapModal
          title="Move Products to Warehouse"
          confirm="Move"
          cancel="Close"
          onConfirm={this._handleMoveProductsToWarehouse}
        >
          123
        </BootstrapModal>
       </div>
     );

  }

  _handleMoveProductsToWarehouse = () => {

  }

  _onChange = () => {
    this.setState(getStateFromStores());
  }
}

export default WarehousePageComponent;
