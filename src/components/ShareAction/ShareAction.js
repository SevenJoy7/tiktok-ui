import classNames from "classnames/bind";
import styles from './ShareAction.module.scss'
import { useState } from "react";
import { EmbedIcon, PaperPlaneIcon, LinkRoundedIcon, EmailIcon, ChevronDownIcon } from '~/components/Icons'
import images from "~/assets/images";
import HeadlessTippy from "@tippyjs/react/headless";
import Popper from '~/components/Popper'

const cx = classNames.bind(styles)

function ShareAction({ children, offset, arrow = false }) {
    const [expanded, setExpanded] = useState(false);

    const SHARE_MENU = [
        {
            icon: <EmbedIcon />,
            title: 'Embed',
        },
        {
            icon: <PaperPlaneIcon />,
            title: 'Send to friends',
        },
        {
            icon: <img src={images.facebook} alt="" />,
            title: 'Share to Facebook',
        },
        {
            icon: <img src={images.whatsapp} alt="" />,
            title: 'Share to WhatsApp',
        },
        {
            icon: <LinkRoundedIcon />,
            title: 'Copy link',
        },
    ]

    const EXPANDED_SHARE_MENU = [
        ...SHARE_MENU,
        {
            icon: <img src={images.facebook} alt="" />,
            title: 'Share to Twitter',
        },
        {
            icon: <img src={images.linkedin} alt="" />,
            title: 'Share to LinkedIn',
        },
        {
            icon: <img src={images.telegram} alt="" />,
            title: 'Share to Telegram',
        },
        {
            icon: <EmailIcon />,
            title: 'Share to Email',
        },
        {
            icon: <img src={images.line} alt="" />,
            title: 'Share to LINE',
        },
        {
            icon: <img src={images.whatsapp} alt="" />,
            title: 'Share to Pinterest',
        },
    ]



    return (
        <HeadlessTippy
            interactive
            offset={offset}
            delay={[100, 300]}
            placement="top"
            hideOnClick="false"
            render={attrs => (
                <div tabIndex='-1' {...attrs}>
                    <Popper className={cx('share-tab')}>
                        <div className={cx('share-wrapper')}>
                            {expanded ? EXPANDED_SHARE_MENU.map((item, index) => (
                                <div className={cx('share-item')} key={index}>
                                    {item.icon} {item.title}
                                </div>
                            )
                            ) : (
                                SHARE_MENU.map((item, index) => (
                                    <div className={cx('share-item')} key={index}>
                                        {item.icon} {item.title}
                                    </div>
                                ))
                            )}
                            {!expanded && <div className={cx('more-btn')} onClick={() => setExpanded(true)}>
                                <ChevronDownIcon />
                            </div>}
                        </div>
                        {arrow ? <div className={cx('arrow-bottom')}></div> : <div className={cx('arrow-top')}></div>}
                    </Popper>
                </div>
            )}
            onHide={() => setExpanded(false)}
        >
            {children}
        </HeadlessTippy>
    );
}

export default ShareAction;