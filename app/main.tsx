import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import * as React from 'react';
import WarehouseActions from './actions/warehouse-actions';
import WarehousePage from './components/warehouse-page';

WarehouseActions.getWarehouses();

React.render(<WarehousePage />, document.getElementById('app-content'));