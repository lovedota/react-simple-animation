import './styles/warehouse-products-row.scss';
import * as React from 'react';
import classNames from "classnames";

interface Props {
	warehouse: Warehouse;
	key: any;
}

interface WarehouseProductState {
  height: number
}

class WarehouseProductsRowComponent extends React.Component<Props, WarehouseProductState> {
	constructor(props) {
    super(props);
    this.state = {
      height: 0
    };
  }

	componentDidMount() {
			this._setHeight();
	}

	componentWillReceiveProps() {
			//Should execute after the new item animation
			setTimeout(() => {
					this._setHeight();
			}, 0);
	}

  move(productId, event: Event) {
    event.preventDefault();
  }

  render() {
      let warehouse = this.props.warehouse,
				rows = [],
        cellCssClasses = classNames('cell', {collapsed: !warehouse.expanded}),
        wrapperStyles = {
          height: this.state.height
        },
        products = warehouse.products;

      products.forEach(p => {
				let rowCssClasses = classNames({'new-item': p.isNew});
        rows.push(
          <tr className={rowCssClasses} key={`warehouse-product-${p.id}`} id={`warehouse-product-${p.id}`}>
               <td>{p.name}</td>
               <td>{p.quantity}</td>
               <td><a href="#" onClick={this.move.bind(this, p.id)}>Move</a></td>
							 <td></td>
           </tr>
        )
      });

    return (
    	<tr className="well warehouse-products-row">
      	<td colSpan={4} className={cellCssClasses}>
        	<div className="wrapper" style={wrapperStyles}>
            <table className="table table-bordered" ref="warehouseProductsTable">
              <thead>
                <th className="name-column">Name</th>
                <th className="quantity-column">Quantity</th>
                <th className="action-column">Actions</th>
								<th></th>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    );
  }

	_setHeight() {
		let height = this.props.warehouse.expanded ? React.findDOMNode(this.refs['warehouseProductsTable']).clientHeight : 0;
		this.setState({height: height});
	}
}

export default WarehouseProductsRowComponent;
