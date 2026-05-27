"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { RxInstagramLogo } from "react-icons/rx";
import { AiOutlineYoutube } from "react-icons/ai";
import Logo from "../shared/Logo";

const Footer = () => {
    const pathname = usePathname();

    if (pathname && pathname.startsWith('/admin')) {
        return null;
    }
    return (
        <footer>
            <div className="container">
                <div className="footer-top">
                    <Logo />
                    <div className="social-media">
                        <Link href={'https://www.instagram.com/cloudkissed1_?igsh=cWlwOTB4dXY1Z25s&utm_source=qr'} target="_blank"><RxInstagramLogo /></Link>
                        <Link href={'https://www.youtube.com/@cloudkissed1'} target="_blank"><AiOutlineYoutube /></Link>
                    </div>
                </div>
                <div className="chat" id="anim">
                    <span>L</span>
                    <span>e</span>
                    <span>t</span>
                    <span>'</span>
                    <span>s</span>
                    <span>&nbsp;</span>
                    <span>F</span>
                    <span>l</span>
                    <span>y</span>
                    <span>&nbsp;</span>
                    <span>T</span>
                    <span>o</span>
                    <span>g</span>
                    <span>e</span>
                    <span>t</span>
                    <span>h</span>
                    <span>e</span>
                    <span>r</span>
                </div>
                <div className="footer-bottom">
                    <p>Copyright © 2026 Rafat Parveen. All rights reserved.</p>
                    <div className="footer-link">
                        Developed by:
                        <Link href={'https://noohark.com'} target="_blank">NoohArk.com</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;