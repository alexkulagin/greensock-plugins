


/*
 ╔═════════════════════════════════════════════════════════╗
 ║                                                         ║
 ║     ____                                    _           ║
 ║    / ___|_ __ ___  ___ _ __  ___  ___   ___| | __       ║
 ║   | |  _| '__/ _ \/ _ \ '_ \/ __|/ _ \ / __| |/ /       ║
 ║   | |_| | | |  __/  __/ | | \__ \ (_) | (__|   <        ║
 ║    \____|_|  \___|\___|_| |_|___/\___/ \___|_|\_\       ║
 ║    ____  _ _           _ ____  _             _          ║
 ║   | __ )| (_)_ __   __| |  _ \| |_   _  __ _(_)_ __     ║
 ║   |  _ \| | | '_ \ / _` | |_) | | | | |/ _` | | '_ \    ║
 ║   | |_) | | | | | | (_| |  __/| | |_| | (_| | | | | |   ║
 ║   |____/|_|_|_| |_|\__,_|_|   |_|\__,_|\__, |_|_| |_|   ║
 ║                                        |___/            ║
 ║                                                         ║
 ╠═════════════════════════════════════════════════════════╝
 ║
 *
 * GSAP BlindPlugin
 * version: 1.0
 * update: 22.10.2017
 * github: https://github.com/alexkulagin/greensock-plugins/tree/master/BlindPlugin
 * @author: alexkulagin.com
 * 
 **/


	var _gsScope = (typeof(module) !== 'undefined' && module.exports && typeof(global) !== 'undefined') ? global : this || window;

	(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {
		
		'use strict';
		
		_gsScope._gsDefine.plugin(
		{
			propName: 'blind',
			priority: -1, 
			API: 2, 
			version: '1.0',

			
			init: function(target, value, tween, index)
			{
				// only for dom elements
				if (!target.nodeType) { return false };


				// default options
				var options = {
					origin: '0 0',
					width: null, height: null
				};


				// initial options
				for (var prop in value) {
					options[prop] = value[prop];
				}


				// setup overflow hidden
				var targetStyle = document.defaultView.getComputedStyle(target, null);

				if (targetStyle.overflow !== 'hidden') {
					target.style.setProperty('overflow', 'hidden'/*, 'important'*/);
				}


				// blind origin
				var origin = ((options.origin || '0 0') + '').split(' '),
					originLength = origin.length;


				// base width and height
				var	baseWidth = options.width || Math.max(target.scrollWidth, target.clientWidth),
					baseHeight = options.height || Math.max(target.scrollHeight, target.clientHeight);

				
				// calculation horizontal and vertical offset
				var	h_offset = 0,
					v_offset = 0;

				if (originLength === 1 && origin.indexOf('center') !== -1) {
					h_offset = v_offset = 0.5;
				} 

				else if (originLength === 1 || originLength === 2) {
					h_offset = origin.indexOf('left') !== -1 ? 0 : origin.indexOf('right') !== -1 ? 1 : origin[0];
					v_offset = origin.indexOf('top') !== -1 ? 0 : origin.indexOf('bottom') !== -1 ? 1 : origin[1];
				}

				h_offset = (Math.abs(h_offset) > 1) ? h_offset / baseWidth : h_offset;
				v_offset = (Math.abs(v_offset) > 1) ? v_offset / baseHeight : v_offset;


				// end points
				var css = tween.vars.css,
					endWidth = css.width || 0,
					endHeight = css.height || 0,
					endX = (Math.abs(h_offset) > 0) ? (baseWidth * h_offset) - (endWidth * h_offset) : 0,
					endY = (Math.abs(v_offset) > 0) ? (baseHeight * v_offset) - (endHeight * v_offset) : 0;


				// apply tween properties
				css.x = Math.abs(css.x) >= 0 ? css.x + endX : endX;
				css.y = Math.abs(css.y) >= 0 ? css.y + endY : endY;

			}
		});

	}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()() }



	/* plugin export */

	!(function(name) {
		'use strict';
		var getGlobal = function() { return (_gsScope.GreenSockGlobals || _gsScope)[name] };
		/* node */ if (typeof(module) !== 'undefined' && module.exports) { require('../TweenLite.js'); module.exports = getGlobal() } 
		/* amd  */ else if (typeof(define) === 'function' && define.amd) { define(['TweenLite'], getGlobal) }
	}('BlindPlugin'));