import list1 from './../views/list1'
import list2 from './../views/list2'
import list3 from './../views/list3'
import list4 from './../views/list4'
import list5 from './../views/list5'
import list6 from './../views/list6'
import list7 from './../views/list7'


export const routerData = [
    {
        path: '/',
        name: 'list1',
        component: list1,
        meta: {title: '约课记录',params: {key: '约课记录',openKeys:[]}},

    },
    {
        path: '/list2',
        name: 'list2',
        component: list2,
        meta: {title: '日语', params: {key: '日语',openKeys:[{title:'课程管理',path:'/list2'}]}},

    },
    {
        path: '/list3',
        name: 'list3',
        component: list3,
        meta: {title: '美术', params: {key: '美术',openKeys:[{title:'课程管理',path:'/list2'}]}},

    },
    {
        path: '/list4',
        name: 'list4',
        component: list4,
        meta: {title: '课期列表1', params: {key: '课期列表1',openKeys:[{title:'课程管理',path:'/list2'},{title:'课期列表',path:'/list4'}]}},
    },
    {
        path: '/list5',
        name: 'list5',
        component: list5,
        meta: {title: '课期列表2', params: {key: '课期列表2',openKeys:[{title:'课程管理',path:'/list2'},{title:'课期列表',path:'/list4'}]}},

    },
    {
        path: '/list6',
        name: 'list6',
        component: list6,
        meta: {title: '课期列表ww',params: {key: '课期列表ww',openKeys:[]}},

    },
    {
        path: '/list7',
        name: 'list7',
        component: list7,
        meta: {title: '约课记录ww',params: {key: '约课记录ww',openKeys:[]}},

    }
];

export const menuData = [
    {
        icon: 'edit',
        path: '/',
        key: '约课记录',

    },
    {
        icon: 'scissor',
        key: '课程管理',
        children: [
            {
                path: '/list2',
                key: '日语',

            },
            {
                path: '/list3',
                key: '美术'

            },
            {
                key: '课期列表',
                children: [
                    {
                        path: '/list4',
                        key: '课期列表1'
                    },
                    {
                        path: '/list5',
                        key: '课期列表2'

                    },
                ]
            }
        ]

    },
    {
        icon: 'diff',
        path: '/list6',
        key: '课期列表ww',

    },
    {
        icon: 'area-chart',
        path: '/list7',
        key: '约课记录ww',

    }
];
