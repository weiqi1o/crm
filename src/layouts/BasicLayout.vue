<template>
    <a-layout :id="navStyle">
        <a-layout-sider :theme="theme" v-show="sider" :trigger="null" collapsible v-model="collapsed">
            <!--logo-->
            <div class="logo">
                <img src="./../../static/imgs/logo.png" alt="">
                <span v-show="!collapsed">
                    <img v-if="theme=='light'" src="./../../static/imgs/logot.png" alt="">
                    <img v-else src="./../../static/imgs/logotw.png" alt="">
                </span>

            </div>
            <!--logo结束-->

            <!--左侧菜单-->
            <a-menu v-model="current" :theme="theme" mode="inline">
                <template v-for="item in menu">
                    <a-menu-item :key="item.meta.title" v-if="item.path">
                        <router-link :to="item.path">
                            <a-icon :type="item.icon"/>
                            <span>{{item.meta.title}}</span>
                        </router-link>
                    </a-menu-item>
                    <subMenu v-else :menuInfo="item" :key="item.meta.title"/>
                </template>
            </a-menu>
            <!--左侧菜单结束-->

        </a-layout-sider>
        <a-layout>
            <a-layout-header :style="headerNav">
                <div class="header" :class="{'blackBackground':theme=='dark'}">
                    <div v-show="!sider" class="Hheader">
                        <div class="logo">
                            <img class="logo1" src="./../../static/imgs/logo.png" alt="">
                            <img v-if="theme=='light'" src="./../../static/imgs/logot.png" alt="">
                            <img v-else src="./../../static/imgs/logotw.png" alt="">
                        </div>
                        <!--头部导航-->
                        <a-menu  :openKeys.sync="openKeys" v-model="current" :theme="theme" class="Hmenu" mode="horizontal">
                            <template v-for="item in menu">
                                <a-menu-item :key="item.meta.title" v-if="item.path">
                                    <router-link :to="item.path">
                                        <a-icon type="mail"/>
                                        <span>{{item.meta.title}}</span>
                                    </router-link>
                                </a-menu-item>
                                <subMenu v-else :menuInfo="item" :key="item.meta.title"/>
                            </template>
                        </a-menu>
                        <!--头部导航结束-->
                    </div>
                    <!--左侧菜单控制按钮-->
                    <a-icon v-show="sider"
                            :class="[ theme == 'dark' ? 'whiteColor' : 'trigger']"
                            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                            @click="()=> collapsed = !collapsed"
                    />
                    <!--左侧菜单控制按钮结束-->

                    <!--个人信息-->
                    <div>
                        <a-dropdown>
                            <a class="ant-dropdown-link" href="#">
                                <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                <span class="avatar" v-if="theme=='dark'" :style="{'color':'white'}">像纯纯粹粹</span>
                                <span class="avatar" v-else="">像纯纯粹粹</span>
                            </a>
                            <a-menu slot="overlay">
                                <a-menu-item>
                                    <a href="javascript:;">
                                        <a-icon type="logout"/>
                                        退出登录</a>
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>
                    <!--个人信息结束-->
                </div>
            </a-layout-header>
            <a-layout-content>
                <div style="height: 100%">
                    <!--<tabs></tabs>-->
                    <div class="contentBox">
                        <div>
                            <router-view/>
                        </div>
                    </div>
                </div>
            </a-layout-content>
            <a-layout-footer class="footer">
                <p>上海市黄浦区南京西路388号仙乐斯·东朔商务中心2005室</p>
                <div>
                    <span>Copyright © 2012 - 2018</span> <span>版权所有：上海我憧教育科技有限公司</span> <a
                        href="http://www.beian.miit.gov.cn">沪ICP备18026897号-1</a> <span>全国统一电话：4000155291</span>
                </div>
            </a-layout-footer>
        </a-layout>


        <div class="set">
            <!--<a-button type="primary" size="large" icon="setting"></a-button>-->
            <a-button-group>
                <a-button type="primary" @click="showDrawer" size="large" icon="setting"/>
                <a-button size="large" type="link"/>
            </a-button-group>
            <br/>
        </div>
        <showDrawer @navStyle="navStyleData" @overallStyle="overallStyleData" @drawerHide="drawerData"
                    :showDrawer=visible></showDrawer>
    </a-layout>
</template>
<script>
    import tabs from './../components/tabs'
    import showDrawer from './../components/showDrawer'
    import subMenu from './../components/subMenu'
    import {menuData} from './../router/config'

    export default {
        name: "BasicLayout",
        components: {tabs, showDrawer,subMenu},
        data() {
            return {
                collapsed: false,
                visible: false,
                theme: 'dark',
                navStyle: 'components-layout-demo-custom-trigger',
                sider: true,
                current: ['mail'],
                openKeys: [],
                headerNav: {padding: 0},
                menu: menuData

            };
        },
        methods: {
            //打开设置主题
            showDrawer() {
                this.visible = true;
            },
            //接收主题组件收起信号
            drawerData(val) {
                this.visible = val
            },
            //接收主题整体风格信号
            overallStyleData(val) {
                this.theme = val == 0 ? 'dark' : 'light'
            },
            //接收导航风格信号
            navStyleData(val) {
                this.navStyle = val == 0 ? 'components-layout-demo-custom-trigger' : 'components-layout-demo-top';
                this.sider = val == 0 ? true : false;
                if(!this.sider){
                    this.theme  = 'dark'
                }
            }
        },
        mounted(){
            this.current = [this.$route.meta.title];
        }
    };
</script>
<style lang="less">
    #components-layout-demo-custom-trigger {
        height: 100vh;
    }

    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    #components-layout-demo-custom-trigger .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }

    .header {
        width: 100%;
        padding-right: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        border-bottom: 1px solid #0000001c;
        background: white;
        .Hheader {
            display: inline-block;
            .logo, .Hmenu {
                display: inline-block;
                vertical-align: middle;
            }

        }
    }

    .blackBackground {
        background: #001529 !important;
    }

    .whiteColor {
        color: white !important;
    }

    .avatar {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        vertical-align: middle;
    }

    .set {
        position: fixed;
        top: 50%;
        right: 0;
        transform: translate(50%, -50%);
    }

    .logo {
        white-space: nowrap;
        background: none !important;
        & > img {
            height: 32px;
            vertical-align: middle;
        }
        & > span {
            vertical-align: middle;
            & > img {
                height: 32px;
            }
        }
        .logo1 {
            padding-left: 24px;
        }
    }

    .ant-menu-horizontal {
        border-bottom: none !important;
        .ant-menu-item-selected {
            border-bottom: none !important;

        }
    }

    .footer {
        p {
            color: rgba(0, 0, 0, 0.45);
            font-size: 14px;
            text-align: center;
        }
        div {
            & > span, & > a {
                color: rgba(0, 0, 0, 0.45);
                font-size: 14px;
                margin-right: 30px;
            }
        }
    }

    .contentBox {
        width: 100%;
        height: 100%;
        padding: 24px 24px 0;
        box-sizing: border-box;
        & > div {
            /*min-height: calc(100vh - 89px);*/
            height: 100%;
            background: white;
        }
    }

</style>
