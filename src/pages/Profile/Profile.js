import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";
import { useLocation } from 'react-router-dom'
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

import { EllipsisHorizontalIcon, LinkIcon, ShareIcon, FlagIcon, BanIcon, UploadIcon, UserRegularIcon, LockSolidIcon, LockIcon } from "~/components/Icons";
import Popper from '~/components/Popper';
import Image from "~/components/Image/Image";
import Button from "~/components/Button/Button";
import ShareAction from "~/components/ShareAction/ShareAction";
import VideoPreview from "~/components/VideoPreview/VideoPreview";
import { ModalContext } from "~/components/ModalProvider";
import styles from './Profile.module.scss'

const cx = classNames.bind(styles)


function Profile() {
    const location = useLocation();
    const data = location.state;

    const [videos, setVideos] = useState([]);
    const context = useContext(ModalContext);
    const [active, setActive] = useState(false);
    const elementUnderline = document.getElementsByClassName(cx('underline'))[0]
    const elementVideo = document.getElementsByClassName(cx('video-tab'))[0];
    const elementLiked = document.getElementsByClassName(cx('liked-tab'))[0];

    const handleMoveToRight = () => {
        elementUnderline.style.transform = "translateX(120px)";
    }
    const handleMoveToLeft = () => {
        elementUnderline.style.transform = "translateX(0)";
    }

    const handleClickVideo = () => {
        setActive(false)
        elementVideo.classList.add(cx('dark'))
        elementLiked.classList.remove(cx('light'))
    }
    const handleClickLiked = () => {
        setActive(true)
        elementLiked.classList.add(cx('light'))
        elementVideo.classList.remove(cx('dark'))
    }

    useEffect(() => {
        fetch(`https://tiktok.fullstack.edu.vn/api/users/@${data.nickname}`)
            .then(res => res.json())
            .then(json => setVideos(json.data.videos))

    }, [data.nickname])

    const renderOptions = attrs => (
        <div tabIndex="-1" {...attrs}>
            <Popper className={cx('more-tab')}>
                <div className={cx('action-message')}>
                    <p><UploadIcon />Send message</p>
                </div>
                <div className={cx('action-report')}>
                    <p><FlagIcon />Report</p>
                </div>
                <div className={cx('action-block')}>
                    <p><BanIcon />Block</p>
                </div>
            </Popper>
        </div>
    )

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info-container')}>
                <div className={cx('info')}>
                    <div className={cx('basic')}>
                        <Image
                            className={cx('avatar')}
                            src={data.avatar}
                            alt={data.avatar}
                        />
                        <div className={cx('name')}>
                            <div className={cx('username')}>
                                {data.nickname}
                                {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />}
                            </div>
                            <div className={cx('full-name')}>{data.full_name || `${data.first_name} ${data.last_name}`}</div>
                            <Button primary onClick={context.handleShowModal}>Follow</Button>
                        </div>
                    </div>

                    <div className={cx('counts')}>
                        <div className={cx('following')}><strong>{data.followings_count}</strong>Following</div>
                        <div className={cx('followers')}><strong>{data.followers_count}</strong>Followers</div>
                        <div className={cx('likes')}><strong>{data.likes_count}</strong>Likes</div>
                    </div>

                    <h2 className={cx('bio')}>{data.bio ? data.bio : 'No bio yet.'}</h2>

                    <Link to={data.website_url} target="blank">
                        {data.website_url && <div className={cx('website')}>
                            <LinkIcon />
                            {data.website_url}
                        </div>}
                    </Link>
                </div>
                <div className={cx('side-btn')}>
                    <div className={cx('share-btn')}>
                        <ShareAction offset={[-100, 8]} arrow={false}>
                            <div><ShareIcon /></div>
                        </ShareAction>
                    </div>
                    <HeadlessTippy
                        interactive
                        offset={[0, 10]}
                        delay={[100, 300]}
                        zIndex='99'
                        placement="bottom-end"
                        hideOnClick='false'
                        render={renderOptions}
                    >
                        <div className={cx('option-btn')}><EllipsisHorizontalIcon /></div>
                    </HeadlessTippy>
                </div>
            </div>
            <div className={cx('video-container')}>
                <div className={cx('tabs')}>
                    <div className={cx('video-tab')} onMouseOver={handleMoveToLeft} onMouseUp={handleClickVideo}><span>Videos</span></div>
                    <div className={cx('liked-tab')} onMouseOver={handleMoveToRight} onMouseUp={handleClickLiked}><span><LockSolidIcon /> Liked</span></div>
                    <div className={cx('underline')}></div>
                </div>

                {!active && videos.length > 0 && <div className={cx('videos')}>
                    {videos.map((video, key) =>
                        <VideoPreview data={video} key={key} />
                    )}
                </div>}

                {!active && videos.length === 0 && <div className={cx('not-video')}>
                    <div>
                        <UserRegularIcon />
                        <p className={cx('title')}>No content</p>
                        <p className={cx('description')}>This user has not published any videos.</p>
                    </div>
                </div>}

                {active && < div className={cx('title-liked')}>
                    <LockIcon />
                    <h4>This user's liked videos are private</h4>
                    <p>Videos liked by {data.nickname} are currently hidden</p>
                </div>}
            </div>
        </div >
    )
}

export default Profile;