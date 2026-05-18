import Link from "next/link";
import { GiAirplaneDeparture } from "react-icons/gi";

const Logo = () => {
    return (
        <div className="logo">
            <Link href="/">
                Rafat <GiAirplaneDeparture />.Parveen
            </Link>
        </div>
    )
}

export default Logo;