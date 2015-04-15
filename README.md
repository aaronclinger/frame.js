# Frame

`Frame` is a static JavaScript class that makes working with `requestAnimationFrame` easier:

* Polyfills `requestAnimationFrame` for cross-browser usage
* Can define, per callback, the speed in which to be called (1-60 FPS)
* The ability to set the total times / repeats the function will be called.
* Repeatedly calls the callback function until it is removed. No need to continue to call `requestAnimationFrame` every update.

## Example Usage

```js
function update() {
	console.log('Update');
}

Frame.addFrameUpdate(update);

function repeat() {
	console.log('Repeat');
}

Frame.addFrameUpdate({
	fps: 10,
	repeat: 5,
	callback: repeat
});
```


## Documentation

### Frame.addFrameUpdate(*options*)

Adds a function to be called every update.

The `addFrameUpdate` method accepts either a function or an object:

* **options** (function) - The callback function to call every frame update.
* **options** (object) - An object that defines the frame update settings and callback function.
    * **options.callback** (function) - The function to call every frame update.
    * **[options.fps]** (number) - The requested speed, represented as frames per second, the callback function is called; valid values are 1-60. Defaults to 60.
    * **[options.repeat]** (number) - The amount of total repetitions the callback function is called. Defaults to infinite.

### Frame.removeFrameUpdate(*fn*)

Cancels a callback update.

* **fn** (function) - The callback function that was provided to `addFrameUpdate`.

## License

`Frame` can be used freely for any open source or commercial works and is released under a [MIT license](http://en.wikipedia.org/wiki/MIT_License).


## Author

[Aaron Clinger](http://aaronclinger.com)