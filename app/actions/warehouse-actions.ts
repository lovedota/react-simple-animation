import Dispatcher         from '../cores/dispatcher';
import WarehouseConstants from '../constants/warehouse-constants';
import WarehouseService   from '../services/warehouse-services';

class WarehouseActions {
  getWarehouses() {
    Dispatcher.dispatch({
      type: WarehouseConstants.WAREHOUSE_LOAD_COMPLETE,
      warehouses: WarehouseService.getWarehouses()
    });
  }

  toogleWarehouseItem(warehouseId: string) {
    Dispatcher.dispatch({
      type: WarehouseConstants.WAREHOUSE_ITEM_TOGGLE,
      warehouseId
    });
  }
}

export default new WarehouseActions();
