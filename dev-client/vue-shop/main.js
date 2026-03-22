document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('vue-shop');
    const { createApp, ref } = Vue;

    createApp({
        setup() {
            const message = ref("Hello word");
            return { message }
        }
    }).mount(app)
})