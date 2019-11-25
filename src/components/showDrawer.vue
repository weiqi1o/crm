<template>
    <div>
        <a-drawer
            :width="300"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="showDrawer"
        >
            <h3>整体风格设置</h3>
            <div class="overallStyle">
                <div @click="setOverallStyle($event.currentTarget)" class="activeChecked" data-styleVal="0">
                    <img src="./../../static/imgs/LCkqqYNmvBEbokSDscrm.svg" alt="">
                    <a-icon type="check" class="check" style="color: red"/>
                </div>
                <div @click="setOverallStyle($event.currentTarget)" data-styleVal="1">
                    <img src="./../../static/imgs/jpRkZQMyYRryryPNtyIC.svg" alt="">
                    <a-icon type="check" class="check" style="color: red"/>
                </div>
            </div>
            <h3>主题颜色</h3>
            <div class="styleColor">
                <div v-for="(item,index) in styleColor" :class="{'activeChecked':index==5}" :style="{background:item}"
                     @click="setStyleColor($event.currentTarget)">
                    <a-icon type="check" class="radio"/>
                </div>
            </div>
            <a-divider/>

            <h3>导航样式</h3>
            <div class="navStyle">
                <div @click="setNavStyle($event.currentTarget)" class="activeChecked" data-navStyle="0">
                    <img src="./../../static/imgs/JopDzEhOqwOjeNTXkoje.svg" alt="">
                    <a-icon type="check" class="check" style="color: red"/>
                </div>
                <div @click="setNavStyle($event.currentTarget)" data-navStyle="1">
                    <img src="./../../static/imgs/KDNDBbriJhLwuqMoxcAr.svg" alt="">
                    <a-icon type="check" class="check" style="color: red"/>
                </div>
            </div>
        </a-drawer>
    </div>
</template>

<script>
    export default {
        name: "showDrawer",
        props: ['showDrawer'],
        data() {
            return {
                visible: '',
                overallStyle: 0,
                styleColor: ['rgb(245, 34, 45)', 'rgb(250, 84, 28)', 'rgb(250, 173, 20)', 'rgb(19, 194, 194)', 'rgb(82, 196, 26)', 'rgb(24, 144, 255)', 'rgb(47, 84, 235)', 'rgb(114, 46, 209)'],
                activeStyleColor: '',
                navStyle: 0
            };
        },
        methods: {
            //收起
            onClose() {
                this.$emit('drawerHide', false)
            },

            //选择
            choose(node) {
                $(node).siblings().removeClass('activeChecked');
                $(node).addClass('activeChecked');

            },
            // 设置主题风格
            setOverallStyle(node) {
                this.choose(node);
                this.overallStyle = $(node).attr('data-styleVal');
                this.$emit('overallStyle', this.overallStyle)
            },
            //设置主题颜色
            setStyleColor(node) {
                this.choose(node);
                window.less.modifyVars({
                    "@primary-color": this.styleColor[$(node).index()]
                });
            },
            //设置导航风格
            setNavStyle(node) {
                this.choose(node);
                this.navStyle = $(node).attr('data-navStyle');
                this.$emit('navStyle', this.navStyle)
            }

        },
    }
</script>

<style scoped lang="less">
    h3 {
        margin-bottom: 0.5em;
        color: rgba(0, 0, 0, 0.85);
    }

    .overallStyle, .navStyle {
        margin-bottom: 24px;
        & > div {
            display: inline-block;
            width: 47px;
            margin-right: 16px;
            position: relative;
            cursor: pointer;
            & > img {
                width: 100%;
            }
            .check {
                display: none;
                position: absolute;
                top: 58%;
                left: 70%;
                transform: translate(-50%, -50%);
            }
        }
        .activeChecked {
            .check {
                display: block;
            }
        }
    }

    .styleColor {
        & > div {
            display: inline-block;
            margin-right: 8px;
            width: 20px;
            height: 20px;
            vertical-align: top;
            cursor: pointer;
            .radio {
                width: 100%;
                height: 100%;
                color: white;
                display: none;
            }
        }
        .activeChecked {
            .radio {
                display: inline-block;
            }
        }

    }

</style>
