// modules/CanvasTool.js
export default class CanvasTool {
    static get toolbox() {
        return { 
            title: 'Sketch / Photo', 
            icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>' 
        };
    }

    constructor({ data }) {
        this.data = data.image || null; // Could be a blank canvas sketch, or an annotated photo
        this.wrapper = document.createElement('div');
    }

    render() {
        this.wrapper.innerHTML = `
            <div style="border: 1px solid #e0e0e0; padding: 10px; border-radius: 6px; text-align: center;">
                <p style="color: #666; font-size: 14px;">Canvas Tool Ready</p>
                <button id="upload-btn">Upload Base Image</button>
                <button id="draw-btn">Start Blank Whiteboard</button>
            </div>
        `;
        // Logic to swap between a blank canvas or drawing an image to the canvas goes here
        return this.wrapper;
    }

    save() {
        return { image: this.data };
    }
}
