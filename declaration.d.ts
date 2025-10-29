// declaration.d.ts

// This tells TypeScript to treat any import ending in .css as a module
// This is specifically for side-effect imports like the one in your layout
declare module "*.css" {
	// Since CSS imports don't export a value, you can declare an empty object
	// or simply allow it to be any module.
	const content: any;
	export default content;
}

// If you use CSS Modules (i.e., files named *.module.css)
declare module "*.module.css" {
	const classes: { [key: string]: string };
	export default classes;
}
