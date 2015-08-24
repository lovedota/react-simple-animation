import 'babel-core/polyfill';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import * as React       from 'react';
import WarehouseActions from './actions/warehouse-actions';
import WarehousePage    from './components/warehouse/warehouse-page';

WarehouseActions.getWarehouses();

React.render(<WarehousePage />, document.getElementById('app-content'));
