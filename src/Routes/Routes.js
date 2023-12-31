import config from '~/config';

//layouts
import { HeaderOnly } from '~/layouts';

import Home from '~/pages/Home/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';

//k cần đăng nhập vẫn xem được
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
];

//đăng nhập mới xem được chuyển sang trang login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
