import { Button } from "@mui/material"
import { HeaderButtonProps } from "../../types/props"

const HeaderButton: React.FC<HeaderButtonProps> = (props) => {
    return(
        <Button variant="text"> 
            {props.text}
        </Button>
    )
}

export default HeaderButton