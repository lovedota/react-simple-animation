import './warehouse-products-row.scss';
import * as React from 'react';

interface Props {
	warehouse: any;
	key: any;
}

interface Refs {
	warehouseProductsTable: any;
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
      let rows = [],
        cellCssClasses = this.props.warehouse.expanded ? ' cell' : ' cell collapsed',
        wrapperStyles = {
          height: this.state.height
        },
        products = this.props.warehouse.products;

      products.forEach(p => {
        rows.push(
          <tr className={p.isNew ? 'new-item' : ''} key={'children-item-' + p.id} id={'child-' + p.id}>
               <td>{p.id}</td>
               <td>{p.name}</td>
               <td>{p.quantity}</td>
               <td><a href="#" onClick={this.move.bind(this, p.id)}>Move</a></td>
           </tr>
        )
      });

    return (
    	<tr className="well warehouse-products-row">
      	<td colSpan={2} className={cellCssClasses}>
        	<div className="wrapper" style={wrapperStyles}>
            <table className="table" ref="warehouseProductsTable">
              <thead>
                <th></th>
                <th>Name</th>
                <th>Quantity</th>
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
