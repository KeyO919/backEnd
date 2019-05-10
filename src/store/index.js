import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'

import systemConfig from './modules/config'
import tagsView from './modules/tagsView'
import tableSetting from './modules/tableSetting'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        systemConfig,
        tagsView,
        tableSetting
    },
    mutations,
    getters
})
