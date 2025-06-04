import { Counter } from '../../Counter/Counter'
import style from './ProductCardForCartStyle.module.scss'
import { separator } from '../../../../../hooks/separator'
import { useDispatch } from 'react-redux'
import { totalShoppingItems, deleteProduct } from '../../../../../features/cart/cartSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export const ProductCardForCart = ({ item }) => {
  const dispatch = useDispatch()
  const deleteProductFromCart = (id) => {
    dispatch(
      deleteProduct(id)
    )
    dispatch(
      totalShoppingItems()
    )
  }
  deleteProduct
  return (
    <li className={style.group} >
      <div className={`${style.Item} ${style.Item1}`}>{item.productName}</div>
      <div className={style.CrossContainer} onClick={() => deleteProductFromCart(item.id)}>
        <FontAwesomeIcon icon={faTimes} className={style.Cross} />
      </div>
      <div className={`${style.Item} ${style.Item3}`}>RD${separator(item.price.total)}</div>
      <Counter
        className={`${style.Item}`}
        amountToBuyTotal={item.amountToBuy.total}
        stock={item.stock}
        id={item.id}
        product={item}
      />
    </li>
  )
}

