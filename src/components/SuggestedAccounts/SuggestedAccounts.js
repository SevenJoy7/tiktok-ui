import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Wrapper from '~/components/Popper';
import AccountPreview from './AccountPreview';
import Image from '~/components/Image';
import styles from './SuggestedAccounts.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SuggestedAccounts({ data, sidebar, ...passProps }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <Wrapper>
                    <AccountPreview data={data} />
                </Wrapper>
            </div>
        );
    };

    return (
        <HeadlessTippy
            interactive
            appendTo={() => document.body}
            delay={[700, 0]}
            offset={[-20, 10]}
            placement="bottom-start"
            render={renderPreview}
        >
            <Link to={`/@${data.nickname}`} className={cx('account-item', { sidebar })} {...passProps} state={data}>
                <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />

                <div className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>{data.nickname}</strong>
                        {data.tick && <FontAwesomeIcon className={cx('checkicon')} icon={faCheckCircle} />}
                    </p>
                    <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                </div>
            </Link>
        </HeadlessTippy>
    );
}

SuggestedAccounts.propTypes = {
    data: PropTypes.object.isRequired,
};

export default SuggestedAccounts;
