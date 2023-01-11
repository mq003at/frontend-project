import ProductCard from "../Basic/ProductCard"

const Cart: React.FC = () => {
    return(
        <>
            <ProductCard id={2} />
            <ProductCard type="circular" id={3} />
        </>
    )
}

export default Cart