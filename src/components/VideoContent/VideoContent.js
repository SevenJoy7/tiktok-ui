import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import {
    faBookmark,
    faCircleCheck,
    faCommentDots,
    faFlag,
    faHeart,
    faMusic,
    faShare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';

import Image from '~/components/Image';
import styles from './VideoContent.module.scss';
import AccountPreview from '../SuggestedAccounts/AccountPreview';
import Wrapper from '~/components/Popper';
import { ModalContext } from '~/components/ModalProvider';
import Button from '../Button';
import { MutedIcon, PauseIcon, PlaySolidIcon, UnMuteIcon } from '../Icons';
import ShareAction from '../ShareAction';

const cx = classNames.bind(styles);

function VideoContent({ data, mute, volume, adjustVolume, toggleMuted }) {
    const [isPlaying, setIsPlaying] = useState(true);

    const videoRef = useRef();
    const context = useContext(ModalContext);

    useEffect(() => {
        if (mute) {
            videoRef.current.volume = 0;
        } else videoRef.current.volume = volume;
    });

    const playVideo = () => {
        if (isPlaying === false) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const pauseVideo = () => {
        if (isPlaying === true) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const togglePlay = () => {
        if (isPlaying === false) {
            playVideo();
        } else {
            pauseVideo();
        }
    };

    function playVideoInViewport() {
        var bounding = videoRef.current.getBoundingClientRect();

        if (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        ) {
            playVideo();
        } else {
            pauseVideo();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', playVideoInViewport);
        return () => window.removeEventListener('scroll', playVideoInViewport);
    });

    const renderPreview = (attrs) => (
        <div tabIndex="-1" {...attrs}>
            <Wrapper>
                <AccountPreview data={data?.user} />
            </Wrapper>
        </div>
    );
    return (
        <div className={cx('wrapper')}>
            <div>
                <HeadlessTippy
                    offset={[-6, 0]}
                    delay={[500, 200]}
                    interactive
                    placement="bottom-start"
                    render={renderPreview}
                >
                    <Link className={cx('avatar-large')} to={`/@${data?.user.nickname}`} state={data?.user}>
                        <Image className={cx('avatar')} src={data?.user.avatar} alt={data?.user.avatar} />
                    </Link>
                </HeadlessTippy>
            </div>
            <div className={cx('container')}>
                <div className={cx('info')}>
                    <HeadlessTippy
                        offset={[-74, 36]}
                        delay={[500, 200]}
                        interactive
                        placement="bottom-start"
                        render={renderPreview}
                    >
                        <div className={cx('info-small')}>
                            <Link className={cx('name')} to={`/@${data?.user.nickname}`} state={data?.user}>
                                <h3 className={cx('username')}>
                                    {data?.user.nickname}
                                    {data?.user.tick && (
                                        <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />
                                    )}
                                </h3>
                                <h4 className={cx('full-name')}>
                                    {data?.user.full_name || `${data?.user.first_name} ${data?.user.last_name}`}
                                </h4>
                            </Link>
                        </div>
                    </HeadlessTippy>
                    <Button small ouline className={cx('follow-btn')} onClick={context.handleShowModal}>
                        Follow
                    </Button>
                    <div className={cx('desc')}>{data?.description}</div>
                    <Link to="/" className={cx('music')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faMusic} />
                        <h4 className={cx('music-desc')}>
                            {data.music || `Nhạc nền - ${data?.user.nickname}`}
                        </h4>
                    </Link>
                </div>
                <div className={cx('video-wrapper')}>
                    <div className={cx('video-container')}>
                        <video
                            style={data?.meta.video.resolution_x < data?.meta.video.resolution_y ? { width: '273px' } : { width: '463px' }}
                            loop
                            src={data?.file_url}
                            ref={videoRef}
                        ></video>
                        <div className={cx('play-btn')} onClick={togglePlay}>
                            {isPlaying ? <PauseIcon /> : <PlaySolidIcon />}
                        </div>

                        <div className={cx('volume-container', { active: mute })}>
                            <div className={cx('volume-range')}>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    orient="vertical"
                                    onChange={adjustVolume}
                                    value={volume * 100}
                                />
                            </div>

                            <div className={cx('volume-btn')} onClick={toggleMuted}>
                                {mute || volume === 0 ? <MutedIcon /> : <UnMuteIcon />}
                            </div>
                        </div>

                        <div className={cx('report')}>
                            <FontAwesomeIcon icon={faFlag} />
                            <span>Report</span>
                        </div>
                    </div>

                    <div className={cx('video-item')}>
                        <button onClick={context.handleShowModal}>
                            <FontAwesomeIcon icon={faHeart} />
                        </button>
                        <strong>{data?.likes_count}</strong>

                        <button onClick={context.handleShowModal}>
                            <FontAwesomeIcon icon={faCommentDots} />
                        </button>
                        <strong>{data?.comments_count}</strong>

                        <button onClick={context.handleShowModal}>
                            <FontAwesomeIcon icon={faBookmark} />
                        </button>
                        <strong>0</strong>

                        <ShareAction offset={[90, 12]} arrow={true}>
                            <div className={cx('share-btn')}>
                                <button>
                                    <FontAwesomeIcon icon={faShare} />
                                </button>
                                <strong>{data?.shares_count}</strong>
                            </div>
                        </ShareAction>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoContent;
