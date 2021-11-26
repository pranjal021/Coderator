export default {
    data() {
        return {
            canvas: null,
        };
    },

    template: `
        <div class="board">
            <div class="tools-cont d-flex justify-content-between">
                <a href="#" class="pencil"> <img width="28" title="Pencil" src="assets/Pencil.svg"> </a>
                <a href="#" class="eraser"> <img width="28" title="Eraser" src="assets/Eraser.svg"> </a>
                <a href="#" class="download"> <img width="28" title="Download" src="assets/Download.svg"> </a>
                <a href="#" class="upload"> <img width="28" title="Upload" src="assets/Upload.svg"> </a>
                <a href="#" class="sticky"> <img width="28" title="Add sticky notes" src="assets/StickyNote.svg"> </a>
            </div>
            <div id="canvas"></div>
        </div>
    `
}