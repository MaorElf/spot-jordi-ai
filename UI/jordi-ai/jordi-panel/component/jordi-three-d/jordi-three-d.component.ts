import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';

@Component({
    selector: 'app-jordi-three-d',
    template: `
        <div #renderContainer></div>
        
    `,
    standalone: true,
    imports: [],
    // changeDetection:
})
export class JordiThreeDComponent implements OnInit {
    @ViewChild('renderContainer', { static: true }) rendererContainer: ElementRef;

    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private geometry: THREE.BoxGeometry;
    private material: THREE.MeshBasicMaterial;
    private cube: THREE.Mesh;

    // imageUrl: string = 'https://www.dropbox.com/scl/fi/eehl0fhfjsn2guiiupwuw/3.png?rlkey=kmon2n0y141kuh9yn8f8ciy0a&dl=1';
    imageUrl: string = 'https://ai-hackton.s3.us-east-1.amazonaws.com/img_1.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aDGV1LWNlbnRyYWwtMSJIMEYCIQDCUxGI17B%2Bf%2F0rDqYdTMmRs3MTmWH5DZ6Wg9CJAwvWHAIhAO4nELhRh2b7srBzNLlDn4DBjds8BsyAhS2xA%2BT808K5Kp0DCHgQAhoMOTc0MzM1MDEwODA1IgwstkA1r%2Frl3AGH6KAq%2BgKiD2b%2BW4zZ%2BF1GvFUy9B0%2FSyZUybddKxGL212cQLeDsn1xinl8vGP3Zqz4HCoTaldWwUEPsQMtmL9EroY846WFfBcCfD%2BRu2EQGd718lsJvai5oEGYmfVh0DJ33Fa4GgJMmDGV8xPurUZG7KIxPcYXRZb%2F%2FN0A9iIdodYiW1N5VhO8F34odLoooZmLUDbyyWXzA6YZWdtkBkXfa7TxESbD3wTu%2FnXRtyx9izs3vrCVce2pyOYRd8QWiEvRPgj3tWEe%2BMCaa1UTO2vqahjxJeKCkL717wXVIzdlhed%2BrNuzby0b8Q9ArsWgxQv4J3t0Yr7hG6lV0fPDwORww2E%2FABXLJhodNyNmAOBtO5MF1ZuMOSuV2UKSfUy2LQWplwTcmq1CJsnHRPXCHq%2Bz0nZoD6iep2PRA543FKMBeugdkDyToTOB%2FLO6LYWxx3Qi%2FzCuUKsxKBua3NtRBhJqcR3i7relqGBjgEDPFtqlHk4F1OwU%2FAWYLD3LERsmGGcwp8eXrwY6igLBjLkMSY%2BparYHYMenlBWBpSynH%2FIUA%2FJUyXIHA5o2sd6zeqGH1bPNJEwwdIVSTHkO7VH84tKT3t0BYP6h10PoR31mt5K%2Bhn3yo%2Br0umEa5ycN27B7Y2BKlg%2FN3jnQpnUBOYtNv%2Bv3XcdtVnnIfC4Jj%2Fb6spsXzNDZ1hujyWO4GqviYILf3LzJGnu6HZvkp9CpW3eY0jQd7eHoScVHfRSsqFqClgIxpuk9ZSt9whCIlTHE9gWFUXnQy56YAIMzuWD3YjUIn9ehue8ejHMZAuV4jXx1lxRm40ydk%2BvorWIGnkqrUPP%2BB%2F87ivxzFloT7Opt0%2B9I8Jh%2Fdxmqd%2FPk%2BXz12xkfhWtEsWtidw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240304T151010Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA6FWXEM72U3USVGVX%2F20240304%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=e7cd9c0df6bc10b0db8c289e7192d7d27f797e4d2e227f5f6c3da01994220451';
    // imageUrl: string = 'http://localhost:5005/assets/images/img_1.png';
    ngOnInit() {
        this.initializeScene();
        this.loadTexture();
    }

    private initializeScene() {
        // Set up the scene, camera, and renderer
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

        // Create a cube geometry and material
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);

        this.animate();
    }

    private animate() {
        requestAnimationFrame(() => this.animate());
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
    }

    private loadTexture() {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.setCrossOrigin('anonymous');
        textureLoader.setResourcePath(this.imageUrl)
        const texture = textureLoader.load(this.imageUrl);
        this.material.map = texture;
        this.material.needsUpdate = true;
    }
}
