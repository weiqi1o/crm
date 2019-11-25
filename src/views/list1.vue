
<template>
    <a-table  :pagination='pagination' :columns="columns" :dataSource="data" :scroll="{x:1500,y:100+'%'}">
        <a slot="action" slot-scope="text" href="javascript:;">action</a>
    </a-table>
</template>
<script>
    const columns = [
        { title: 'Full Name', width: 120, dataIndex: 'name', key: 'name', fixed: 'left' },
        { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
        { title: 'Column 1', dataIndex: 'address', key: '1', width: 'auto' },
        { title: 'Column 2', dataIndex: 'address', key: '2', width: 'auto'},
        { title: 'Column 3', dataIndex: 'address', key: '3', width: 'auto' },
        { title: 'Column 4', dataIndex: 'address', key: '4', width: 'auto' },
        { title: 'Column 5', dataIndex: 'address', key: '5', width: 'auto' },
        { title: 'Column 7', dataIndex: 'address', key: '7', width: 'auto' },
        { title: 'Column 8', dataIndex: 'address', key: '8',width: 'auto' },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'action' },
        },
    ];

    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edrward ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
        });
    }

    export default {
        name: "list1",
        data() {
            return {
                data,
                columns,
                pagination: {
                    pageSize:10, // 默认每页显示数量
                }
            };
        },
        mounted(){
        }
    };
</script>

<style >
    .ant-table-pagination.ant-pagination{
        float:none !important;
        /*margin: 30px 0 !important;*/
    }

</style>
