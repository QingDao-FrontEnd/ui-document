export default [{
    path: '/dashboard',
    component: resolve => {
        require.ensure(['./pages/dashboard.vue'], () => {
            resolve(require('./pages/dashboard.vue'))
        })
    }
}]
