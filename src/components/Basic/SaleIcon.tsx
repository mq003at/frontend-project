import saleLogo from "../../assets/35-off-hi.png"
const SaleIcon: React.FC<{size: number}> = (props) => {
    const size = props.size;
    return (
        <img className="saleIcon" src={saleLogo} alt="sale" width={size + "%"} height={size + "%"}></img>
    )
}

export default SaleIcon