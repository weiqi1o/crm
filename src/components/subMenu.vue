<template functional>
    <a-sub-menu :key="props.menuInfo.key">
        <span slot="title" class="submenu-title-wrapper">
            <a-icon v-if="props.menuInfo.icon" :type="props.menuInfo.icon"/>
            <span>{{ props.menuInfo.key }}</span>
        </span>
        <template v-for="item in props.menuInfo.children">
            <a-menu-item
                    v-if="!item.children"
                    :key="item.key"
            >
                <router-link :to="item.path">{{ item.key }}</router-link>
            </a-menu-item>
            <subMenu
                    v-else
                    :key="item.key"
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
