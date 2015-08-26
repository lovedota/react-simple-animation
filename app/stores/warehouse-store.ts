/// <reference path="../../typings/tsd.d.ts"/>

import * as Immutable     from 'immutable';
import {EventEmitter}     from 'events';
import Dispatcher         from '../cores/dispatcher';
import WarehouseConstants from '../constants/warehouse-constants';

interface WarehouseAction {
  type: string;
  warehouses?: Warehouse[];
  warehouseId?: string;
  productId: string;
  checked?:boolean;
  nextWarehouseId?: string;
}

let _warehouses: Immutable.Map<string, Warehouse>,
  _checkedProductIds = Immutable.Map<string, Product>(),
  _currentWarehouseId = '1',
  _nextWarehouseId = '3',
  _shouldScroll = false;

class WarehouseStore extends EventEmitter {
  constructor() {
    super();

    Dispatcher.register((action: WarehouseAction) => {
      switch(action.type) {
        case WarehouseConstants.WAREHOUSE_LOAD_COMPLETE:
          this.convertWarehousesToViewModel(action.warehouses);
          break;

        case WarehouseConstants.WAREHOUSE_ITEM_TOGGLE:
          this.toggleWarehouseItem(action.warehouseId);
          break;

        case WarehouseConstants.WAREHOUSE_PRODUCT_TOGGLE:
          this.toggleWarehouseProduct(action.warehouseId, action.productId, action.checked);
          break;

        case WarehouseConstants.WAREHOUSE_MOVE_SELECTED_PRODUCT_TO_WAREHOUSE:
          this.moveSelectedProductsToWarehouse();
          break;

        case WarehouseConstants.WAREHOUSE_EXPAND_NEXT_WAREHOUSE:
          this.expandNextWarehouse();
          break;

        case WarehouseConstants.WAREHOUSE_REMOVE_SELECTED_PRODUCTS_CURRENT_WAREHOUSE:
          this.removeSelectedProductsFromCurrentWarehouse();
          break;

        case WarehouseConstants.WAREHOUSE_MOVE_SELECTED_PRODUCT_TO_WAREHOUSE:
          this.removeSelectedProductsFromCurrentWarehouse();
          break;

        case WarehouseConstants.WAREHOUSE_NEXT_WAREHOUSE_CHANGE:
          _nextWarehouseId = action.nextWarehouseId;
          break;

        default:
          break;
      }
    });
  }

  get warehouses() {
    return _warehouses.toArray();
  }

  get hasNotCheckedProduct() {
    return !_checkedProductIds.size;
  }

  get nextWarehouseId() {
    return _nextWarehouseId;
  }

  get shouldScroll() {
    return _shouldScroll;
  }

  addChangeListener(callback) {
    this.on(WarehouseConstants.WAREHOUSE_CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(WarehouseConstants.WAREHOUSE_CHANGE_EVENT, callback);
  }

  private convertWarehousesToViewModel(warehouses: Warehouse[]) {
    _warehouses = Immutable.Map<string, Warehouse>(
      warehouses.map((w: Warehouse) => {
        return [w.id, Object.assign(w, {expanded: false})];
      })
    );

    this.emitChange();
  }

  private toggleWarehouseItem(warehouseId: string) {
    _warehouses = _warehouses.update(warehouseId, (warehouse) => {
      warehouse.expanded = !warehouse.expanded;
      return warehouse;
    });

    this.emitChange();
  }

  private toggleWarehouseProduct(warehouseId: string, productId: string, checked: boolean) {
    _warehouses = _warehouses.update(warehouseId, (warehouse) => {
      let product = warehouse.products.find(p => p.id === productId);

      product.checked = checked;

      if (checked) {
        _checkedProductIds =_checkedProductIds.set(product.id, product);
      } else {
        _checkedProductIds = _checkedProductIds.remove(product.id);
      }

      return warehouse;
    });

    this.emitChange();
  }

  private expandNextWarehouse() {
    _warehouses = _warehouses.update(_nextWarehouseId, (warehouse) => {
      warehouse.expanded = true;
      return warehouse;
    });
    _shouldScroll = true;

    this.emitChange();
  }

  private removeSelectedProductsFromCurrentWarehouse() {
    _warehouses = _warehouses.update(_currentWarehouseId, (warehouse) => {
      warehouse.products = warehouse.products.filter(p => {
        return !_checkedProductIds.has(p.id);
      });
      return warehouse;
    });

    this.emitChange();
  }

  private moveSelectedProductsToWarehouse() {
    _warehouses = _warehouses.update(_nextWarehouseId, (warehouse) => {
      let newProducts = _checkedProductIds.toArray();

      warehouse.products.forEach(p => {
        p.isNew = false;
      });

      newProducts.forEach(p => {
        if (warehouse.products.indexOf(p) === -1) {
          p.isNew = true;
          p.checked = false;
          warehouse.products.push(p);
        }
      });

      return warehouse;
    });

    _shouldScroll = false;
    _checkedProductIds =_checkedProductIds.clear();

    this.emitChange();
  }

  private emitChange() {
    this.emit(WarehouseConstants.WAREHOUSE_CHANGE_EVENT);
  }
}

export default new WarehouseStore();
