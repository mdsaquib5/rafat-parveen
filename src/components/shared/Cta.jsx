import Link from "next/link";
import { RxInstagramLogo } from "react-icons/rx";

const Cta = () => {
    return (
        <div className="cta">
            <Link href={'https://www.instagram.com/cloudkissed1_?igsh=cWlwOTB4dXY1Z25s&utm_source=qr'} target="_blank" className="btn primary-btn"><RxInstagramLogo />Follow me</Link>
        </div>
    )
}

export default Cta;