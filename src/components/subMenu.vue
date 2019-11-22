<template>
    <!--<a-sub-menu :key="props.menuInfo.meta.title">-->
        <!--<span slot="title" class="submenu-title-wrapper">-->
            <!--<a-icon type="setting"/>-->
            <!--<span>{{ props.menuInfo.meta.title }}</span>-->
        <!--</span>-->
        <!--<template v-for="item in props.menuInfo.children">-->
            <!--<a-menu-item-->
                    <!--v-if="!item.children"-->
                    <!--:key="item.meta.title"-->
            <!--&gt;-->
                <!--<span>{{ item.meta.title }}</span>-->
            <!--</a-menu-item>-->
            <!--<sub-menu-->
                    <!--v-else-->
                    <!--:key="item.meta.title"-->
                    <!--:menu-info="item"-->
            <!--/>-->
        <!--</template>-->
    <!--</a-sub-menu>-->
</template>

<script>
    export default {
        name: "subMenu1",
        // props: ['menuInfo'],
        mounted(){
            // console.log(this.menuInfo)
        }
    }
</script>

<style scoped>

</style>
