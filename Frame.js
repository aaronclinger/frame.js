/**
 * @author Aaron Clinger - https://github.com/aaronclinger/frame.js
 */
(function(window) {
	'use strict';
	
	function Frame() {
		var pub        = {};
		var updates    = [];
		var isUpdating = false;
		
		
		pub.addFrameUpdate = function(options) {
			if (typeof(options) === 'function') {
				options = {callback: options};
			}
			
			var fps = Math.min(60, options.fps || 60);
			
			updates.push({
				time: Date.now(),
				delay: (fps === 60) ? 0 : Math.floor(1000 / fps),
				repeat: options.repeat || -1,
				callback: options.callback
			});
			
			if ( ! isUpdating) {
				isUpdating = true;
				
				window.requestAnimationFrame(onFrame);
			}
		};
		
		pub.removeFrameUpdate = function(fn) {
			var len = updates.length;
			
			while (len--) {
				if (fn === updates[len].callback) {
					updates.splice(len, 1);
					
					return true;
				}
			}
			
			return false;
		};
		
		var onFrame = function() {
			var now = Date.now();
			var len = updates.length;
			var item;
			var diff;
			
			while (len--) {
				item = updates[len];
				diff = now - item.time;
				
				if (item.delay === 0 || diff >= item.delay) {
					item.time = now;
					item.callback();
					
					if (item.repeat !== -1 && --item.repeat === 0) {
						pub.removeFrameUpdate(item.callback);
					}
				}
			}
			
			if (updates.length) {
				window.requestAnimationFrame(onFrame);
			} else {
				isUpdating = false;
			}
		};
		
		if ( ! window.requestAnimationFrame) {
			window.requestAnimationFrame = (function() {
				return window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					function(callback) {
						window.setTimeout(callback, 17);
					};
			})();
		}
		
		if ( ! Date.now) {
			Date.now = function now() {
				return new Date().getTime();
			};
		}
		
		return pub;
	}
	
	window.Frame = new Frame();
}(window));