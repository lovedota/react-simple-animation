import * as React              from 'react';
import logClass                from '../../decorators/log-class-decorator';
import WarehouseList           from './warehouse-list';
import WarehouseCommandButtons from './warehouse-command-buttons';
import WarehouseStore          from '../../stores/warehouse-store';

interface Props {

}

interface WarehousePageState {
  warehouses: Warehouse[];
  isProcessing: boolean;
  hasNotCheckedProduct: boolean;
  shouldScroll: boolean;
  nextWarehouseId: string;
}

function getStateFromStores(): WarehousePageState {
  return {
    warehouses: WarehouseStore.warehouses,
    isProcessing: false,
    hasNotCheckedProduct: WarehouseStore.hasNotCheckedProduct,
    shouldScroll: WarehouseStore.shouldScroll,
    nextWarehouseId: WarehouseStore.nextWarehouseId
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
        <WarehouseCommandButtons disabled={this.state.hasNotCheckedProduct}/>
        <WarehouseList
          warehouses={this.state.warehouses}
          shouldScroll={this.state.shouldScroll}
          nextWarehouseId={this.state.nextWarehouseId}
          isProcessing={this.state.isProcessing}
        />
       </div>
     );

  }

  _handleMoveProductsToWarehouse = () => {

  }

  _onChange = () => {
    let state = getStateFromStores();
    this.setState(getStateFromStores());
  }
}

export default WarehousePageComponent;
