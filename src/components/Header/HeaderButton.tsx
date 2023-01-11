import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { HeaderButtonProps } from "../../types/props"

const HeaderButton: React.FC<HeaderButtonProps> = (props) => {
    const navigate = useNavigate()
    return(
        <Button variant="text" onClick={() => navigate(`${props.text.toLowerCase()}`)}> 
            {props.text}
        </Button>
    )
}

export default HeaderButton