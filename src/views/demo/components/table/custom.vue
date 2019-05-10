<template>
<el-card shadow="never">
    <columnFilter class="fr mb-20" :columnsData="tableColumn" type="personColumns" />
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column v-for="column in showCloumn" :key="column.prop" :prop="column.prop" :label="column.label" :width="column.width">
        </el-table-column>
    </el-table>
</el-card>
</template>

<script>
import columnFilter from '@/components/columnFilter'

export default {
    components: {
        columnFilter
    },
    data() {
        return {
            tableColumn: [{
                    prop: 'date',
                    label: '日期',
                    width: '180',
                    showCloumn: true
                },
                {
                    prop: 'name',
                    label: '姓名',
                    width: '180',
                    showCloumn: true
                },
                {
                    prop: 'address',
                    label: '地址',
                    showCloumn: true
                }
            ],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    computed: {
        showCloumn(val) {
            let checkedColumn = this.$store.getters['personColumns']
            return this.tableColumn.filter(function(item) {
                return checkedColumn.length > 0 ? checkedColumn.indexOf(item.label) > -1 : true
            })
        }
    },
    mounted() {
        this.$store.commit('DBTOVUEX', 'personColumns')
    }
}
</script>
