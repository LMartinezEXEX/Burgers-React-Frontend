import { connect } from 'react-redux';
import '../assets/css/Order.css';
import { sortBurgerElementsForShow } from '../helpers/sorters';

const mapStateToProps = state => {
    return {
        types: state.design.types
    }
}

const Order = (props) => {

    return (
        <div className="order-card">
            <h3>{ props.street } - { props.city } <span className='order-id'>{ props.id }</span></h3>
            {props.burgers.map(burger => {
                const sortedElements = sortBurgerElementsForShow(burger.size, burger.ingredients, props.types)
                return (
                    <div>
                        <h6 className='burger-name'>{burger.name}:</h6>
                    
                        <ul>
                            {sortedElements.map(ingredient => {
                                return <li>{ ingredient.name }</li>
                            })}
                        </ul>
                    </div>
                )
            })}
        </div>
    );
};

export default connect(mapStateToProps)(Order);