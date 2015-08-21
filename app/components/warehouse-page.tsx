import './warehouse-page.scss';
import * as React from 'react';
import logClass from '../decorators/log-class-decorator';
import WarehouseList from './warehouse-list';
import WarehouseStore from '../stores/warehouse-store';

interface Props {

}

interface WarehousePageState {
  warehouses: any[];
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
     return <WarehouseList warehouses={this.state.warehouses} isProcessing={this.state.isProcessing}/>;
  }

  _onChange = () => {
    this.setState(getStateFromStores());
  }
}

export default WarehousePageComponent;
