/// <reference path="../../typings/tsd.d.ts"/>

import * as Immutable     from 'immutable';
import {EventEmitter}     from 'events';
import Dispatcher         from '../cores/dispatcher';
import WarehouseConstants from '../constants/warehouse-constants';

interface WarehouseAction {
  type: string;
  warehouses?: any[];
  warehouseId?: any;
}

let _warehouses: Immutable.Map<any, any>;

class WarehouseStore extends EventEmitter {
  constructor() {
    super();
    Dispatcher.register((action: WarehouseAction) => {
      switch(action.type) {
        case WarehouseConstants.WAREHOUSE_LOAD_COMPLETE:
          _warehouses = Immutable.Map<any, any>(
            action.warehouses.map(w => {
              return [w.id, Object.assign(w, {expanded: false})];
            })
          );
          this.emitChange();
          break;
        case WarehouseConstants.WAREHOUSE_TOGGLE_ITEM:
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

export default new WarehouseStore();
