// utility function to make sure we don't have too small numbers
function epsilon( value: number ): number {
    return Math.abs( value ) < 0.000001 ? 0 : value;
}

// convert degrees to radians
var degreeToRadiansFactor = Math.PI / 180;
function degToRad( degrees: number): number {
    return degrees * degreeToRadiansFactor;
}

// convert radians to degress
var radianToDegreesFactor = 180 / Math.PI;
function radToDeg( radians: number): number {
    return radians * radianToDegreesFactor;
}    	

// minimal vector class
export class Vector {
    constructor(public x: number,
                public y: number,
                public z: number) {
    }
    static times(k: number, v: Vector) { return new Vector(k * v.x, k * v.y, k * v.z); }
    static minus(v1: Vector, v2: Vector) { return new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z); }
    static plus(v1: Vector, v2: Vector) { return new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z); }
    static dot(v1: Vector, v2: Vector) { return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z; }
    static mag(v: Vector) { return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z); }
    static norm(v: Vector) {
        var mag = Vector.mag(v);
        var div = (mag === 0) ? Infinity : 1.0 / mag;
        return Vector.times(div, v);
    }
    static cross(v1: Vector, v2: Vector) {
        return new Vector(v1.y * v2.z - v1.z * v2.y,
                          v1.z * v2.x - v1.x * v2.z,
                          v1.x * v2.y - v1.y * v2.x);
    }
    toString(): string {
        return "[" + this.x + ", " + this.y + ", " + this.z + "]";
    }
}

///////////////////////////////////////////
// Skelton of a matrix class, that you should fill in
// 
// Note: these methods create and return new matrix objects.  A realistic implementation would NOT do that, 
// as it causes a lot of allocations (and, in a language like Javascript, allocating and throwing away objects
// eventualy triggers garbage collection, which can cause smooth animation to stutter).  But, we do it here as
// it is easier to implement correctly.  
export class Matrix {
    // the matrix elements
    elements: number[];
    
    // construct a new matrix (including copying one and creating an identity matrix)
    constructor ( n11: number, n12: number, n13: number, n14: number, 
                  n21: number, n22: number, n23: number, n24: number, 
                  n31: number, n32: number, n33: number, n34: number, 
                  n41: number, n42: number, n43: number, n44: number ) {
    	this.elements = new Array<number>( 16 );
        var te = this.elements;
		te[ 0 ] = n11; te[ 4 ] = n12; te[ 8 ] = n13; te[ 12 ] = n14;
		te[ 1 ] = n21; te[ 5 ] = n22; te[ 9 ] = n23; te[ 13 ] = n24;
		te[ 2 ] = n31; te[ 6 ] = n32; te[ 10 ] = n33; te[ 14 ] = n34;
		te[ 3 ] = n41; te[ 7 ] = n42; te[ 11 ] = n43; te[ 15 ] = n44;
		return this;
    }
    
    // transpose the matrix, returning a new matrix with the result
    static transpose(m: Matrix): Matrix {
        var e = m.elements;
        return new Matrix(  e[0], e[1], e[2], e[3],
                            e[4], e[5], e[6], e[7],
                            e[8], e[9], e[10], e[11],
                            e[12], e[13], e[14], e[15]);
    }     

    // copy the matrix to a new matrix
    static copy (m: Matrix): Matrix {
        return new Matrix(  m.elements[0], m.elements[4], m.elements[8], m.elements[12],
                            m.elements[1], m.elements[5], m.elements[9], m.elements[13],
                            m.elements[2], m.elements[6], m.elements[10], m.elements[14],
                            m.elements[3], m.elements[7], m.elements[11], m.elements[15]);
	}

    // return a new matrix containing the identify matrix
	static identity(): Matrix { 
        return new Matrix(1, 0, 0, 0, 
                          0, 1, 0, 0, 
                          0, 0, 1, 0, 
                          0, 0, 0, 1); 
    }

    // create a new rotation matrix from the input vector. 
    // eu.x, eu.y, eu.z contain the rotations in degrees around the three axes. 
    // Apply the rotations in the order x, y, z.
    static makeRotationFromEuler (eu: Vector): Matrix {     
        var cosx = Math.cos(degToRad(eu.x));
        var sinx = Math.sin(degToRad(eu.x));

        var cosy = Math.cos(degToRad(eu.y));
        var siny = Math.sin(degToRad(eu.y));

        var cosz = Math.cos(degToRad(eu.z));
        var sinz = Math.sin(degToRad(eu.z));

        var rx = new Matrix( 1, 0, 0, 0,
                             0, cosx, -sinx, 0,
                             0, sinx, cosx, 0,
                             0, 0, 0, 1);
        var ry = new Matrix(cosy, 0, siny, 0, 
                                0, 1, 0, 0, 
                            -siny, 0, cosy, 0, 
                                0, 0, 0, 1); 

        var rz = new Matrix(cosz, -sinz, 0, 0, 
                            sinz, cosz, 0, 0, 
                                0, 0, 1, 0, 
                                0, 0, 0, 1);   
        
        return (rx.multiply(ry)).multiply(rz);
        
	}

    // create a new translation matrix from the input vector
    // t.x, t.y, t.z contain the translation values in each direction
    static makeTranslation(t: Vector): Matrix {
        return new Matrix(   1, 0, 0, t.x,
                             0, 1, 0, t.y,
                             0, 0, 1, t.z,
                             0, 0, 0, 1)
    }
    
    // create a new scale matrix from the input vector
    // s.x, s.y, s.z contain the scale values in each direction
	static makeScale(s: Vector): Matrix {
        return new Matrix(  s.x,  0, 0, 0,
                            0,  s.y, 0, 0,
                            0,  0, s.z, 0,
                            0,  0,  0,  1)
    }
        
    // compose transformations with multiplication.  Multiply this * b, 
    // returning the result in a new matrix
    multiply (b: Matrix ): Matrix {
        var e = this.elements;
        var a = b.elements;
        return new Matrix(  e[0]*a[0] + e[4]*a[1] + e[8]*a[2] + e[12]*a[3],
                            e[0]*a[4] + e[4]*a[5] + e[8]*a[6] + e[12]*a[7],
                            e[0]*a[8] + e[4]*a[9] + e[8]*a[10]+ e[12]*a[11],
                            e[0]*a[12]+ e[4]*a[13]+ e[8]*a[14]+ e[12]*a[15],

                            e[1]*a[0] + e[5]*a[1] + e[9]*a[2] + e[13]*a[3],
                            e[1]*a[4] + e[5]*a[5] + e[9]*a[6] + e[13]*a[7],
                            e[1]*a[8] + e[5]*a[9] + e[9]*a[10]+ e[13]*a[11],
                            e[1]*a[12]+ e[5]*a[13]+ e[9]*a[14]+ e[13]*a[15],

                            e[2]*a[0] + e[6]*a[1] + e[10]*a[2] + e[14]*a[3],
                            e[2]*a[4] + e[6]*a[5] + e[10]*a[6] + e[14]*a[7],
                            e[2]*a[8] + e[6]*a[9] + e[10]*a[10]+ e[14]*a[11],
                            e[2]*a[12]+ e[6]*a[13]+ e[10]*a[14]+ e[14]*a[15],

                            e[3]*a[0] + e[7]*a[1] + e[11]*a[2] + e[15]*a[3],
                            e[3]*a[4] + e[7]*a[5] + e[11]*a[6] + e[15]*a[7],
                            e[3]*a[8] + e[7]*a[9] + e[11]*a[10]+ e[15]*a[11],
                            e[3]*a[12]+ e[7]*a[13]+ e[11]*a[14]+ e[15]*a[15]);
    }


    // get the translation/positional component out of the matrix
    getPosition(): Vector {
        return new Vector(this.elements[12], this.elements[13], this.elements[14])
    }
    // get the x, y and z vectors out of the rotation part of the matrix
    getXVector(): Vector {
        return Vector.norm(new Vector(this.elements[0], this.elements[1], this.elements[2]))
    }
    getYVector(): Vector {
        return Vector.norm(new Vector(this.elements[4], this.elements[5], this.elements[6]))
    }
    getZVector(): Vector {
        return Vector.norm(new Vector(this.elements[8], this.elements[9], this.elements[10]))
    }
    
    // utility if you want to print it out
    toString(): string {
        var te = this.elements;
        return "[" + 
    		te[ 0 ] + ", " + te[ 4 ] + ", " + te[ 8 ] + ", " + te[ 12 ] + ",\n" +
		    te[ 1 ] + ", " + te[ 5 ] + ", " + te[ 9 ] + ", " + te[ 13 ] + ",\n" +
		    te[ 2 ] + ", " + te[ 6 ] + ", " + te[ 10 ]+ ", " + te[ 14 ] + ",\n" +
		    te[ 3 ] + ", " + te[ 7 ] + ", " + te[ 11 ]+ ", " + te[ 15 ] + "]";  
    }
}

//////////////////////////////////////////
// The nodes in the graph and the scene are inspired by the raytracer, but are different.
// All the nodes in the tree are Things
export class Thing {
    // the children of the node, and the parent
    children: Thing[];
    parent: Thing | null;
    // store position and scale as vectors, but orientation as a matrix, since there are many
    // ways to create an orientation matrix
    position: Vector;
    rotation: Matrix;
    scale: Vector;
    // the transform should be computed as position * rotation * scale, and NOT be set by the 
    // programmer who is using this library
    transform: Matrix;
    // inverse should be computed 
    inverseTransform: Matrix;
    // each node will store it's worldTransform as well as it's local transform
    worldTransform: Matrix;   
    constructor() {
        this.position = new Vector(0,0,0);
        this.rotation = Matrix.identity();
        this.scale = new Vector(1,1,1);
        
        this.parent = null;
        this.children = new Array();
        this.transform = Matrix.identity();
        this.inverseTransform = Matrix.identity();
        this.worldTransform = Matrix.identity();

    }
    // add and remote children to this Thing.  Note that we are careful to have the parent set, and to ensure only
    // one parent has this element as a child
    add(c: Thing) {
        this.children.push(c);
        if (c.parent) {
            c.parent.remove(c);
        }
        c.parent = this;
    }    
    remove(c: Thing) {
		var index = this.children.indexOf( c );

		if ( index !== - 1 ) {
			c.parent = null;
			this.children.splice( index, 1 );        
        }
    }

    // compute transform from position * rotation * scale and inverseTransform from their inverses 
    computeTransforms() {
        var pos = Matrix.makeTranslation(this.position)
        var sca = Matrix.makeScale(this.scale)
        this.transform = pos.multiply(this.rotation).multiply(sca)
        // this.transform = sca.multiply(this.rotation.multiply(pos));

        var invpos = Matrix.copy(pos)
        invpos.elements[12] = -invpos.elements[12]
        invpos.elements[13] = -invpos.elements[13]
        invpos.elements[14] = -invpos.elements[14]

        var invsca = Matrix.copy(sca)
        invsca.elements[0] = 1/invsca.elements[0]
        invsca.elements[5] = 1/invsca.elements[5]
        invsca.elements[10] = 1/invsca.elements[10]

        var invrot = Matrix.transpose(Matrix.copy(this.rotation))

        this.inverseTransform = invsca.multiply(invrot).multiply(invpos)
    }
    
    // traverse the graph, executing the provided callback on this node and it's children
    // execute the callback before traversing the children
	traverse ( callback: (obj: Thing ) => void ) {
        callback(this);
        if (this.children.length > 0) {
            this.children.forEach(c => {
                c.traverse(callback);
            });
        }
    }
}

// The Thing that puts something on the screen is the HTMLDivThing.    
// The HTMLDivThing is simply a holder for the div being manipulated by the library.
// By having it be a class, we can recognize when a node is one of these and handle appropriately
export class HTMLDivThing extends Thing {
    constructor(public div: HTMLDivElement) {
        super();
    	this.div.style.position = 'absolute';     
        this.div.style.borderColor = 'transparent'
    }
}
// The Camera Thing.  There must be one and only one in the Scene.
export class Camera extends Thing {
    // hint:  you will need to figure out and keep track of the inverse transform from
    // the camera up to the root of the scene.  
    worldInverseTransform: Matrix;
    constructor(public fovy: number) {
        super();
		this.worldInverseTransform = Matrix.identity();
    }
    // get the focal length (distance from the viewplane) for a window of a specified
    // height and the camera's fovy    
    getFocalLength (height: number): number {
        var angle = this.fovy / 2;
        var h = height / 2
        var a = Math.tan(degToRad(angle))
        return (h / a)
    }
}
// A scene!
export class Scene {
    world: Thing;
    camera: Camera | null;
    // internal
    private domElement: HTMLDivElement;
    private width: number;
    private height: number;
    private windowTransform: string;
    constructor(public container: HTMLDivElement) {
        this.world = new Thing();
        this.camera = null;

        this.domElement = document.createElement( 'div' );

        // set the transform-style to "preserve-3d" so the 3D values inherit
        this.domElement.style.transformStyle = "preserve-3d";

        // add our new DOM element to the provided container
        this.container.appendChild(this.domElement);

        // get the size of the provided container, and set our DOM element to it's size       
        var rect = container.getBoundingClientRect();

        this.width = rect.width;
        this.height = rect.height;
		this.domElement.style.width = this.width + 'px';
        this.domElement.style.height = this.height + 'px';
        
        // CSS uses a weird +y is DOWN coordinate frame, so we're going to scale by -1 in Y in each of the elements, and then undo that scale here. // By doing this, all of our transformations can by in the more common // +1 is UP coordinate frame. // We'll also translate to the center of the viewport (CSS coords are now in the // lower left)

        this.windowTransform = "matrix3d(1,0,0,0, 0,-1,0,0, 0,0,1,0, 0,0,0,1)" +
            " translate3d(" + this.width/2 + 'px, ' + this.height/2 + 'px, 0px)'; 
    }
    // convenience function provided so you don't have to fight with this peculiarity of CSS.  
    // we invert Y here, as described above.  We also translate the DIV so it's center is
    // at the origin instead of it's lower left corner.
    getObjectCSSMatrix( m: Matrix ): string {
		var elements = m.elements;
		return 'translate3d(-50%, -50%, 0) matrix3d(' +
			epsilon( elements[ 0 ]  ) + ',' +
			epsilon( elements[ 1 ]  ) + ',' +
			epsilon( elements[ 2 ]  ) + ',' +
			epsilon( elements[ 3 ]  ) + ',' +
			epsilon( - elements[ 4 ]  ) + ',' +
			epsilon( - elements[ 5 ]  ) + ',' +
			epsilon( - elements[ 6 ]  ) + ',' +
			epsilon( - elements[ 7 ]  ) + ',' +
			epsilon( elements[ 8 ]  ) + ',' +
			epsilon( elements[ 9 ]  ) + ',' +
			epsilon( elements[ 10 ]  ) + ',' +
			epsilon( elements[ 11 ]  ) + ',' +
			epsilon( elements[ 12 ]  ) + ',' +
			epsilon( elements[ 13 ]  ) + ',' +
			epsilon( elements[ 14 ]  ) + ',' +
			epsilon( elements[ 15 ]  ) +
		')';
    };
    
    
    render() {  
        var updateMatrices = (obj: Thing) => {
            obj.computeTransforms()
            if (obj.parent) {
                obj.worldTransform = obj.parent.worldTransform.multiply(obj.transform)
            } else {
                obj.worldTransform = obj.transform
            }
            if (obj instanceof Camera) {
                this.camera = obj
                this.camera.worldInverseTransform = obj.inverseTransform;
                var curr = this.camera.parent
                while (curr) {
                    this.camera.worldInverseTransform = this.camera.worldInverseTransform.multiply(curr.inverseTransform);
                    curr = curr.parent;
                }

                var focalLength = this.camera.getFocalLength(this.height);
                this.container.style.perspective = focalLength + "px";
                this.domElement.style.transform = "translate3d(0px,0px," + focalLength + "px)" + this.windowTransform;
            }
        }

        var cameraPerspec = (c: Thing) => {
            if (this.camera) {
                var thing = this.camera.worldInverseTransform.multiply(c.worldTransform);
                if (c instanceof HTMLDivThing) {
                    const transformStr = this.getObjectCSSMatrix(thing);
                    c.div.style.transform = transformStr;
                    this.domElement.appendChild(c.div)
                }
            }
        }
        
        this.world.traverse(updateMatrices);
        this.world.traverse(cameraPerspec);
    }
}