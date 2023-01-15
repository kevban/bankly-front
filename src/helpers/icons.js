import EditIcon from '@mui/icons-material/Edit';
import FlareIcon from '@mui/icons-material/Flare';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import SchoolIcon from '@mui/icons-material/School';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PetsIcon from '@mui/icons-material/Pets';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import SavingsIcon from '@mui/icons-material/Savings';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import DiamondIcon from '@mui/icons-material/Diamond';

const getIcon = (category) => {
    switch (category.iconId) {
        case 0: // daily
            return <FlareIcon></FlareIcon>
        case 1: // Food
            return <LocalDiningIcon></LocalDiningIcon>
        case 2: // transportation
            return <DirectionsCarFilledIcon></DirectionsCarFilledIcon>
        case 3: //lodging
            return <HotelIcon></HotelIcon>
        case 4: //Telephone
            return <LocalPhoneIcon></LocalPhoneIcon>
        case 5: // Entertainment
            return <NightlifeIcon></NightlifeIcon>
        case 6: //medical
            return <MedicalServicesIcon></MedicalServicesIcon>
        case 7: //school
            return <SchoolIcon></SchoolIcon>
        case 8: //travel
            return <AirplanemodeActiveIcon></AirplanemodeActiveIcon>
        case 9:
            return <AttachMoneyIcon></AttachMoneyIcon>
        case 10:
            return <PetsIcon></PetsIcon>
        case 11:
            return <CheckroomIcon></CheckroomIcon>
        case 12:
            return <LocalLaundryServiceIcon></LocalLaundryServiceIcon>
        case 13:
            return <SavingsIcon></SavingsIcon>
        case 14:
            return <FitnessCenterIcon></FitnessCenterIcon>
        case 15:
            return <CreditCardIcon></CreditCardIcon>
        case 16:
            return <ShoppingCartIcon></ShoppingCartIcon>
        case 17:
            return <CardGiftcardIcon></CardGiftcardIcon>
        case 18:
            return <SportsEsportsIcon></SportsEsportsIcon>
        case 19:
            return <DiamondIcon></DiamondIcon>
        case -1:
            return <EditIcon></EditIcon>
        default:
            return

    }
}

export default getIcon