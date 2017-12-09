import * as THREE from "three";

class CameraController {

    constructor(camera, domElement){
        
        this.cameraRadius = 10;
        this.cameraStartPosition = {
            theta:-120,
            phi:70
        }

        this.camera = camera;
        this.calculateCameraPosition();
        this.registerMouseEvents(domElement);
    }

    registerMouseEvents = domElement => {
        domElement.addEventListener('mousedown', this.onMouseDonw, false);
        domElement.addEventListener('mouseup', this.onMouseUp, false);
        domElement.addEventListener('mousemove', this.onMouseOver, true);
    }
    
    onMouseDonw = event => {
        event.preventDefault();
        this.mouseDown = true;
        this.mousePosition = {
            x: event.layerX,
            y: event.layerY,
            theta: this.cameraStartPosition.theta,
            phi: this.cameraStartPosition.phi
        }
    }
    
    onMouseUp = event => {
        event.preventDefault();
        this.mouseDown = false;
    }

    onMouseOver = event => {
        event.preventDefault();
        if(!this.mouseDown){
            return;
        }
        let theta = - ( ( event.clientX - this.mousePosition.x ) * 0.5 )
            + this.mousePosition.theta;
        let phi = ( ( event.clientY - this.mousePosition.y ) * 0.5 )
            + this.mousePosition.phi;
        phi = Math.min(100, Math.max(0, phi));

        this.cameraStartPosition.phi = phi;
        this.cameraStartPosition.theta = theta;
        this.calculateCameraPosition();
    }

    calculateCameraPosition = () => {
        const theta = this.cameraStartPosition.theta;
        const phi = this.cameraStartPosition.phi;
        this.camera.position.x = this.cameraRadius * Math.sin( theta * Math.PI / 360 )
            * Math.cos( phi * Math.PI / 360 );
        this.camera.position.y = this.cameraRadius * Math.sin( phi * Math.PI / 360 );
        this.camera.position.z = this.cameraRadius * Math.cos( theta * Math.PI / 360 )
            * Math.cos( phi * Math.PI / 360 );
        this.camera.lookAt(0,0,0);
        this.camera.updateMatrix();
    }
}


export { CameraController }