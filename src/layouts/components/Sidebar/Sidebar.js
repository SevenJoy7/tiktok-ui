import classNames from 'classnames/bind';
import { useState, useEffect, useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
    HashtagIcon,
    MusicIcon,
} from '~/components/Icons';

import Menu, { MenuItem } from './Menu';
import config from '~/config';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import * as userService from '~/services/userService';
import styles from './Sidebar.module.scss';
import Button from '~/components/Button';
import { ModalContext } from '~/components/ModalProvider';

const cx = classNames.bind(styles);

function Sidebar() {
    const currentUser = false;
    const context = useContext(ModalContext);

    const currentYear = new Date().getFullYear();

    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [seeAll, setSeeAll] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            if (!seeAll) {
                const result = await userService.getSuggested(1, 5);
                setSuggestedUsers(result);
            } else {
                const result = await userService.getSuggested(1, 16);
                setSuggestedUsers(result);
            }
        };

        fetchAPI();
    }, [seeAll]);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>

            {!currentUser ? (
                <div className={cx('login')}>
                    <div className={cx('detail')}>
                        <p>Log in to follow creators, like videos, and view comments.</p>
                        <Button ouline onClick={context.handleShowModal}>
                            Log in
                        </Button>
                    </div>
                </div>
            ) : (
                <div className={cx('container')}>
                    <p className={cx('label')}>Suggested accounts</p>

                    {suggestedUsers.map((account) => (
                        <SuggestedAccounts key={account.id} data={account} />
                    ))}

                    {seeAll ? (
                        <p className={cx('more-btn')} onClick={() => setSeeAll(false)}>
                            See less
                        </p>
                    ) : (
                        <p className={cx('more-btn')} onClick={() => setSeeAll(true)}>
                            See all
                        </p>
                    )}
                </div>
            )}

            <div className={cx('discover', 'container')}>
                <p className={cx('label')}>Discover</p>
                <div className={cx('discover-list')}>
                    <div className={cx('hashtag')}>
                        <HashtagIcon />
                        <p className={cx('text')}>suthatla</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <HashtagIcon />
                        <p className={cx('text')}>mackedoi</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <HashtagIcon />
                        <p className={cx('text')}>sansangthaydoi</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <MusicIcon width="1.6rem" height="1.6rem" />
                        <p className={cx('text')}>Yêu Đơn Phương Là Gì (MEE Remix) - Mee Remix sdaak</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <MusicIcon width="1.6rem" height="1.6rem" />
                        <p className={cx('text')}>
                            Về Nghe Mẹ Ru - NSND Bach Tuyet &amp; Hứa Kim Tuyền &amp; 14 Casper &amp; Hoàng Dũng
                        </p>
                    </div>
                    <div className={cx('hashtag')}>
                        <MusicIcon width="1.6rem" height="1.6rem" />
                        <p className={cx('text')}>Thiên Thần Tình Yêu - RICKY STAR</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <HashtagIcon />
                        <p className={cx('text')}>7749hieuung</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <HashtagIcon />
                        <p className={cx('text')}>genzlife</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <MusicIcon width="1.6rem" height="1.6rem" />
                        <p className={cx('text')}>Tình Đã Đầy Một Tim - Huyền Tâm Môn</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <MusicIcon width="1.6rem" height="1.6rem" />
                        <p className={cx('text')}>Thằng Hầu (Thái Hoàng Remix) [Short Version] - Dunghoangpham</p>
                    </div>
                </div>
            </div>

            <div className={cx('footer')}>
                <div className={cx('links-1')}>
                    <a href="https://www.tiktok.com/about?lang=en" target="blank">
                        About
                    </a>
                    <a href="https://www.tiktok.com/browse" target="blank">
                        TikTok Browse
                    </a>
                    <a href="https://newsroom.tiktok.com/" target="blank">
                        Newsroom
                    </a>
                    <a href="https://www.tiktok.com/about/contact?lang=en" target="blank">
                        Contact
                    </a>
                    <a href="https://careers.tiktok.com" target="blank">
                        Careers
                    </a>
                    <a href="https://www.bytedance.com/" target="blank">
                        ByteDance
                    </a>
                </div>

                <div className={cx('links-2')}>
                    <a href="https://www.tiktok.com/forgood" target="blank">
                        TikTok for Good
                    </a>
                    <a
                        href="https://www.tiktok.com/business/?attr_medium=tt_official_site_guidance&amp;attr_source=tt_official_site&amp;refer=tiktok_web"
                        target="blank"
                    >
                        Advertise
                    </a>
                    <a href="https://developers.tiktok.com/?refer=tiktok_web" target="blank">
                        Developers
                    </a>
                    <a href="https://www.tiktok.com/transparency?lang=en" target="blank">
                        Transparency
                    </a>
                    <a href="https://www.tiktok.com/tiktok-rewards/en" target="blank">
                        TikTok Rewards
                    </a>
                </div>

                <div className={cx('links-3')}>
                    <a href="https://support.tiktok.com/en" target="blank">
                        Help
                    </a>
                    <a href="https://www.tiktok.com/safety?lang=en" target="blank">
                        Safety
                    </a>
                    <a href="https://www.tiktok.com/legal/terms-of-service?lang=en" target="blank">
                        Terms
                    </a>
                    <a href="https://www.tiktok.com/legal/privacy-policy-row?lang=en" target="blank">
                        Privacy
                    </a>
                    <a href="https://www.tiktok.com/creators/creator-portal/en-us/" target="blank">
                        Creator Portal
                    </a>
                    <a href="https://www.tiktok.com/community-guidelines?lang=en" target="blank">
                        Community Guidelines
                    </a>
                </div>

                <span className={cx('copyright')}>
                    <FontAwesomeIcon icon={faCopyright} /> <p>{currentYear} TikTok - Made by namkiit</p>
                </span>
            </div>
        </aside>
    );
}

export default Sidebar;
