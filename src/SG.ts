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
    }     

    // copy the matrix to a new matrix
    static copy (m: Matrix): Matrix {
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
	}

    // create a new translation matrix from the input vector
    // t.x, t.y, t.z contain the translation values in each direction
    static makeTranslation(t: Vector): Matrix {
    }
    
    // create a new scale matrix from the input vector
    // s.x, s.y, s.z contain the scale values in each direction
	static makeScale(s: Vector): Matrix {
    }
        
    // compose transformations with multiplication.  Multiply this * b, 
    // returning the result in a new matrix
    multiply (b: Matrix ): Matrix {
	}
    
    // get the translation/positional componenet out of the matrix
    getPosition(): Vector {
    }
    
    // get the x, y and z vectors out of the rotation part of the matrix
    getXVector(): Vector {
    }
    getYVector(): Vector {
    }
    getZVector(): Vector {
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
    }    
        
    // traverse the graph, executing the provided callback on this node and it's children
    // execute the callback before traversing the children
	traverse ( callback: (obj: Thing ) => void ) {
	}
    
}

// The Thing that puts something on the screen is the HTMLDivThing.    
// The HTMLDivThing is simply a holder for the div being manipulated by the library.
// By having it be a class, we can recognize when a node is one of these and handle appropriately
export class HTMLDivThing extends Thing {
    constructor(public div: HTMLDivElement) {
        super();
    	this.div.style.position = 'absolute';        
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

        // uncomment this to clip the contents of the domElement to the boundaries of the 
        // domElement; otherwise, div's can go outside of it's boundaries (useful for 
        // debugging!)

        //this.domElement.style.overflow = 'hidden';

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
        
        // CSS uses a weird +y is DOWN coordinate frame, so we're going to
        // scale by -1 in Y in each of the elements, and then undo that scale here.
        // By doing this, all of our transformations can by in the more common
        // +1 is UP coordinate frame.
        // We'll also translate to the center of the viewport (CSS coords are now in the
        // lower left)
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

    // the render function.
    //
    // In here, you should:
    // - update all the Things' internal matrices
    // - update all the Things' worldTransforms
    // - find the Camera and save it, and figure out it's inverse transformation to the root
    // - set the perspective on this.container and add a translation to move the camera to it's origin, 
    //   both based on the focalLength, as follows:
    //      var focalLength = this.camera.getFocalLength(this.height).toString();
    //      this.container.style.perspective = focalLength + "px";
    //      this.domElement.style.transform = "translate3d(0px,0px," + focalLength + "px)" + this.windowTransform;
    // - for each object, figure out the entire transformation to that object
    //   (including the inverse camera transformation). 
    // - add the DIV's in the HTMLDivThings directly to this.domElement (do not use a
    //   heirarchy) and set the transformation as follows:
    //        const transformStr = this.getObjectCSSMatrix(m);
    //        obj.div.style.transform = transformStr; 
    //
    // hint: you will need to traverse the graph more than once to do all of this.
    
    render() {  
        // here is an example of declaring a function inline and calling the traverse method 
        // to walk through the graph.   
        var updateMatricies = (obj: Thing) => {
        }
        this.world.traverse(updateMatricies);

    }
}