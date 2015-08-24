import './styles/warehouse-products-row.scss';
import * as React 			 from 'react';
import classNames 			 from "classnames";
import WarehouseActions  from '../../actions/warehouse-actions';
import InteractionHelper from '../../helpers/interaction-helpers';

interface Props {
	warehouse: Warehouse;
	key: any;
	shouldScroll: boolean;
	nextWarehouseId: string;
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
			this.setHeight();
	}

	componentWillReceiveProps(newProps: Props) {
			//Should execute after the new item animation
			setTimeout(() => {
					this.setHeight();
			}, 0);

			if (newProps.shouldScroll && newProps.warehouse.id === newProps.nextWarehouseId) {
				InteractionHelper.scrollToElement(
					React.findDOMNode(this.refs['warehouseProductRow'])
				);
			}
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
              <td>
								<label>
									<input
										type="checkbox"
										checked={p.checked}
										onChange={this.handleProductCheckboxChange.bind(this, warehouse.id, p.id)}
									/>
									{` ${p.name}`}
								</label>
							</td>
               <td>{p.quantity}</td>
               <td><a href="#" onClick={this.move.bind(this, p.id)}>Move</a></td>
							 <td></td>
           </tr>
        )
      });

    return (
    	<tr className="well warehouse-products-row" ref="warehouseProductRow">
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

	private handleProductCheckboxChange = (warehouseId, productId, e) => {
		WarehouseActions.toogleWarehouseProduct(warehouseId, productId, e.target.checked);
	}

	private setHeight(): void {
		let height = this.props.warehouse.expanded ? React.findDOMNode(this.refs['warehouseProductsTable']).clientHeight : 0;
		this.setState({height: height});
	}
}

export default WarehouseProductsRowComponent;
