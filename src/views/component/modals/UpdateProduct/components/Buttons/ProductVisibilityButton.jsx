import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleDot, faCircle } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../../../../../templates/system/Button/Button'
import { useDispatch } from 'react-redux'

export const ProductVisibilityButton = ({product, setProduct}) => {
    const dispatch = useDispatch()
    const handleToggle = () => {
        dispatch(setProduct({ ...product, isVisible: !product.isVisible }))
    }
    return (
        <Button
            borderRadius={'normal'}
            alignText={'left'}
            title={product?.isVisible !== false ? 'Facturable' : 'No facturable'}
            isActivated={product?.isVisible !== false }            iconOn={<FontAwesomeIcon icon={faCircleDot} />}
            iconOff={<FontAwesomeIcon icon={faCircle} />}
            onClick={handleToggle}
        />
    )
}
