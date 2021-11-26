export default {
    props: ["mirror", "connected"],

    template:`
    <div class="navbar navbar-dark bg-dark navigation-bar">
        <div class="container-fluid">
            <a target="_blank" class="navbar-brand d-flex align-items-center" href="#">
                <img src="/assets/logo.png" width="30" class="mr-3">
                <h4 class="ms-2 mb-0">Coderator</h4>
            </a>

            <div v-show="!connected" class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            
            <div class="form-check form-switch">
                <label class="form-check-label text-white small">Mirror</label>
                <input class="form-check-input" type="checkbox" :checked="mirror" @click="$emit('toggle')">
                <a target="_blank" href="https://github.com/pranjal021"><img src="/assets/github.svg" title="Github" width="30" class="ms-3"></a>
                <a target="_blank" href="https://www.linkedin.com/in/pranjal-mittal-81416816b/"><img src="/assets/linkedin.png" title="LinkedIn" width="29" class="ms-3"></a>
            </div>
        </div>
    </div>
    `,
};