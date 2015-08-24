import Dispatcher         from '../cores/dispatcher';
import WarehouseConstants from '../constants/warehouse-constants';
import WarehouseService   from '../services/warehouse-services';
import WarehouseStore     from '../stores/warehouse-store';

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

  toogleWarehouseProduct(warehouseId: string, productId: string, checked: boolean) {
    Dispatcher.dispatch({
      type: WarehouseConstants.WAREHOUSE_PRODUCT_TOGGLE,
      warehouseId,
      productId,
      checked
    });
  }

  moveSelectedProductsToWarehouse() {
    let TIMEOUT_ANIMATION = 500;

    Dispatcher.dispatch({
      type: WarehouseConstants.WAREHOUSE_EXPAND_NEXT_WAREHOUSE
    });

    Dispatcher.dispatch({
      type: WarehouseConstants.WAREHOUSE_REMOVE_SELECTED_PRODUCTS_CURRENT_WAREHOUSE
    });

    setTimeout(() => {
      Dispatcher.dispatch({
        type: WarehouseConstants.WAREHOUSE_MOVE_SELECTED_PRODUCT_TO_WAREHOUSE
      });
    }, TIMEOUT_ANIMATION);
  }
}

export default new WarehouseActions();
