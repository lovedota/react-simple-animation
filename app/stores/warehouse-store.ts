/// <reference path="../../typings/tsd.d.ts"/>

import * as Immutable     from 'immutable';
import {EventEmitter}     from 'events';
import Dispatcher         from '../cores/dispatcher';
import WarehouseConstants from '../constants/warehouse-constants';

interface WarehouseAction {
  type: string;
  warehouses?: Warehouse[];
  warehouseId?: string;
}

let _warehouses: Immutable.Map<string, Warehouse>;

class WarehouseStore extends EventEmitter {
  constructor() {
    super();
    Dispatcher.register((action: WarehouseAction) => {
      switch(action.type) {
        case WarehouseConstants.WAREHOUSE_LOAD_COMPLETE:
          convertWarehousesToViewModel(action.warehouses);
          this.emitChange();
          break;

        case WarehouseConstants.WAREHOUSE_ITEM_TOGGLE:
          toggleWarehouseItem(action.warehouseId);
          this.emitChange();
          break;

        case WarehouseConstants.WAREHOUSE_PRODUCT_TOGGLE:
          _warehouses = _warehouses.update(action.warehouseId, (warehouse) => {
            warehouse.expanded = !warehouse.expanded;
            return warehouse;
          });
          this.emitChange();
          break;


        default:
          break;
      }
    });
  }

  get warehouses() {
    return _warehouses.toArray();
  }

  addChangeListener(callback) {
    this.on(WarehouseConstants.WAREHOUSE_CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(WarehouseConstants.WAREHOUSE_CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(WarehouseConstants.WAREHOUSE_CHANGE_EVENT);
  }
}

function convertWarehousesToViewModel(warehouses: Warehouse[]) {
  _warehouses = Immutable.Map<string, Warehouse>(
    warehouses.map(w => {
      return [w.id, Object.assign(w, {expanded: false})];
    })
  );
}

function toggleWarehouseItem(warehouseId) {
  _warehouses = _warehouses.update(warehouseId, (warehouse) => {
    warehouse.expanded = !warehouse.expanded;
    return warehouse;
  });
}

export default new WarehouseStore();
