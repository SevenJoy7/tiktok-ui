import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import { ForwardStepIcon, PCIcon, SmartPhoneIcon, XMarkIcon } from '~/components/Icons';
import styles from './GetApp.module.scss';
import Wrapper from '../Popper';

const cx = classNames.bind(styles);

function GetApp() {
    const [active, setActive] = useState(false);
    const [hide, setHide] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setActive(true);
            } else {
                setActive(false);
            }
        });
    }, []);

    const handleHide = () => {
        setHide(true);
    };
    const handleShow = () => {
        setHide(false);
    };

    //Render Tippy
    const renderGetApp = (attrs) => (
        <div tabIndex="-1" {...attrs}>
            <Wrapper>
                <div className={cx('tippy-wrapper')}>
                    <div className={cx('tippy-inner', { hide })}>
                        <div className={cx('item')}>
                            <PCIcon className={cx('icon')} />
                            <span>Get TikTok for desktop</span>
                        </div>
                        <div className={cx('splitter')}></div>
                        <div className={cx('item')}>
                            <SmartPhoneIcon className={cx('icon')} />
                            <span>Get TikTok App</span>
                        </div>
                    </div>
                    <div className={cx('close-btn', { hide })} onClick={handleHide}>
                        <XMarkIcon />{' '}
                    </div>
                </div>
            </Wrapper>
        </div>
    );

    return (
        <div className={cx('wrapper', { active })}>
            <div className={cx('container')}>
                <HeadlessTippy
                    interactive
                    trigger="click"
                    offset={[0, -30]}
                    placement="top-end"
                    zIndex={1}
                    render={renderGetApp}
                >
                    <button className={cx('get-app-btn')} onClick={handleShow}>
                        Get app
                    </button>
                </HeadlessTippy>
            </div>
            <button className={cx('back-to-top')} onClick={scrollToTop}>
                {' '}
                <ForwardStepIcon />{' '}
            </button>
        </div>
    );
}

export default GetApp;
