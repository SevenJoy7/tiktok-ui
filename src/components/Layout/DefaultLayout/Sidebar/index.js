import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    return <aside className={cx('wrapper')}>
        <h2>Dành cho bạn</h2>
        <h2>Follwing</h2>
    </aside>;
}

export default Sidebar;
