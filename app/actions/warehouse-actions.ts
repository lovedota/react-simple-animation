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

  toogleWarehouseItem(warehouseId) {
    Dispatcher.dispatch({
      type: WarehouseConstants.WAREHOUSE_TOGGLE_ITEM,
      warehouseId
    });
  }
}

export default new WarehouseActions();
