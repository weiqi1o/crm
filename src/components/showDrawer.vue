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
                <el-color-picker
                        v-model="color"
                        show-alpha
                        @change =setStyleColor()
                        :predefine="styleColor">
                </el-color-picker>
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
                color:'rgb(24, 144, 255)',
                styleColor: ['#ff4500',
                    '#ff8c00',
                    '#ffd700',
                    '#90ee90',
                    '#00ced1',
                    'rgb(24, 144, 255)',
                    '#c71585',
                    'rgba(255, 69, 0, 0.68)',
                    'rgb(255, 120, 0)',
                    'hsv(51, 100, 98)',
                    'hsva(120, 40, 94, 0.5)',
                    'hsl(181, 100%, 37%)',
                    'hsla(209, 100%, 56%, 0.73)',
                    '#c7158577'],
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
                console.log(this.color)
                // this.choose(node);
                window.less.modifyVars({
                    "@primary-color": this.color
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

    }

</style>
