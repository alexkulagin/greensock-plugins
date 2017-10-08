


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
 * date: 08.10.2017
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


				// max width & max height
				var	maxWidth = options.width || Math.max(target.scrollWidth, target.clientWidth),
					maxHeight = options.height || Math.max(target.scrollHeight, target.clientHeight);

				
				// calculation horizontal and vertical offset
				var	h_offset = 0,
					v_offset = 0;

				if (l === 1 && origin.indexOf('center') !== -1) {
					h_offset = v_offset = 0.5;
				} 

				else if (l === 1 || l === 2) {
					h_offset = origin.indexOf('left') !== -1 ? 0 : origin.indexOf('right') !== -1 ? 1 : origin[0];
					v_offset = origin.indexOf('top') !== -1 ? 0 : origin.indexOf('bottom') !== -1 ? 1 : origin[1];
				}

				h_offset = (Math.abs(h_offset) > 1) ? h_offset / maxWidth : h_offset;
				v_offset = (Math.abs(v_offset) > 1) ? v_offset / maxHeight : v_offset;
			}
		});

	}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()() }



	// plugin export
	!(function(name) {
		'use strict';
		var getGlobal = function() { return (_gsScope.GreenSockGlobals || _gsScope)[name] };
		/* node */ if (typeof(module) !== 'undefined' && module.exports) { require('../TweenLite.js'); module.exports = getGlobal() } 
		/* amd  */ else if (typeof(define) === 'function' && define.amd) { define(['TweenLite'], getGlobal) }
	}('BlindPlugin'));