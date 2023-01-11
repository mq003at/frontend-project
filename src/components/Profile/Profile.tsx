import ProductCard from "../Basic/ProductCard"

const Profile: React.FC = () => {
    return(
        <>
            <ProductCard id={2} />
            <ProductCard type="circular" id={3} />
        </>
    )
}

export default Profile