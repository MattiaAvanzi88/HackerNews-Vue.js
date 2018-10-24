import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import DiscussItem from '../components/DiscussItem.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/item/:id',
            name: 'DiscussItem',
            component: DiscussItem
        }
    ]
})