import classNames from "classnames/bind";
import styles from './Footer.module.scss';
import { Link } from "react-router-dom";



const cx = classNames.bind(styles)
function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('about')}>
                <Link to="https://www.tiktok.com/about?lang=en" target="blank">About</Link>
                <Link to="https://newsroom.tiktok.com/" target="blank">Newsroom</Link>
                <Link to="https://www.tiktok.com/about/contact?lang=en" target="blank">Contact</Link>
                <Link to="https://careers.tiktok.com" target="blank">Careers</Link>
                <Link to="https://www.bytedance.com/" target="blank">ByteDance</Link>
            </div>
            <div className={cx('advertise')}>
                <Link to="https://www.tiktok.com/forgood" target="blank">TikTok for Good</Link>
                <Link to="https://www.tiktok.com/business/?attr_medium=tt_official_site_guidance&amp;attr_source=tt_official_site&amp;refer=tiktok_web" target="blank">Advertise</Link>
                <Link to="https://developers.tiktok.com/?refer=tiktok_web" target="blank">Developers</Link>
                <Link to="https://www.tiktok.com/transparency?lang=en" target="blank">Transparency</Link>
                <Link to="https://www.tiktok.com/tiktok-rewards/en" target="blank">TikTok Rewards</Link>
                <Link to="https://www.tiktok.com/embed" target="blank">TikTok Embeds</Link>
            </div>
            <div className={cx('policy')}>
                <Link to="https://support.tiktok.com/en" target="blank">Help</Link>
                <Link to="https://www.tiktok.com/safety?lang=en" target="blank">Safety</Link>
                <Link to="https://www.tiktok.com/legal/terms-of-service?lang=en" target="blank">Terms</Link>
                <Link to="https://www.tiktok.com/legal/privacy-policy-row?lang=en" target="blank">Privacy</Link>
                <Link to="https://www.tiktok.com/creators/creator-portal/en-us/" target="blank">Creator Portal</Link>
                <Link to="https://www.tiktok.com/community-guidelines?lang=en" target="blank">Community Guidelines</Link>
            </div>
            <p className={cx('copyright')}>© {currentYear} TikTok - Made by Hong</p>
        </div>
    );
}

export default Footer;