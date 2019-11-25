<template functional>
    <a-sub-menu :key="props.menuInfo.meta.title">
        <span slot="title" class="submenu-title-wrapper">
            <a-icon v-if="props.menuInfo.icon" :type="props.menuInfo.icon"/>
            <span>{{ props.menuInfo.meta.title }}</span>
        </span>
        <template v-for="item in props.menuInfo.children">
            <a-menu-item
                    v-if="!item.children"
                    :key="item.meta.title"
            >
                <router-link :to="item.path">{{ item.meta.title }}</router-link>
            </a-menu-item>
            <subMenu
                    v-else
                    :key="item.meta.title"
                    :menuInfo="item"
            />
        </template>
    </a-sub-menu>
</template>

<script>
    export default {
        name: "subMenu",
        props: ['menuInfo'],
    }
</script>

<style scoped>

</style>
