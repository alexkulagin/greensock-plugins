


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
 * version: 1.3
 * update: 25.10.2017
 * github: https://github.com/alexkulagin/greensock-plugins/tree/master/BlindPlugin
 * @author: alexkulagin.com
 * 
 **/


	var _gsScope = (typeof(module) !== 'undefined' && module.exports && typeof(global) !== 'undefined') ? global : this || window;

	(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {
		
		'use strict';
		
		// UTILS
		const _error = function (err) { throw new Error(err) };
		const _isNumber = function (n) { return !isNaN(parseFloat(n)) && isFinite(n) };
		

		// HELPERS
		const _getTranslateRatio = function (pivot)
		{
			if (!(typeof pivot === 'string' || pivot instanceof String)) {
				_error('origin must be a string!' + ' ' + pivot + ' is not string!');
			}

			var origin, first, _first, second, _second, 
				l, r, t, b, c, vRatio, hRatio;

			
			origin = pivot.replace(/ +(?= )/g,'').trim().split(' ');

			first = _first = origin[0];
			second = _second = origin[1];

			l = origin.indexOf('left');
			r = origin.indexOf('right');
			t = origin.indexOf('top');
			b = origin.indexOf('bottom');
			c = origin.indexOf('center');


			// vertical & horizontal translate ratio
			vRatio = hRatio = null;


			// single direction
			if (!second)
			{
				if (c !== -1) {
					vRatio = hRatio = 0.5;
				}

				else if (_isNumber(first)) {
					vRatio = hRatio = first;
				}

				else {
					vRatio = (t >= 0) ? 0 : (b >= 0) ? 1 : null;
					hRatio = (l >= 0) ? 0 : (r >= 0) ? 1 : null;	
				}
			}


			// multi direction
			else if (second)
			{
				// numbers & number with center [v,h] 
				if (l < 0 && r < 0 && t < 0 && b < 0) {
					vRatio = (first === 'center') ? 0.5 : _isNumber(first) ? first : null;
					hRatio = (second === 'center') ? 0.5 : _isNumber(second) ? second : null;
				}

				// [v,h]
				else 
				{
					// [h,v]
					if ((t == 1 && b == 1) || (l == 0 || r == 0)) {
						_first = second; 
						_second = first;
					}

					vRatio = (_first === 'top') ? 0 : (_first === 'bottom') ? 1 : (_first === 'center') ? 0.5 : _isNumber(_first) ? _first : null;
					hRatio = (_second === 'left') ? 0 : (_second === 'right') ? 1 : (_second === 'center') ? 0.5 : _isNumber(_second) ? _second : null;
					
				}
			}

			return { v: vRatio, h: hRatio };
		};


		_gsScope._gsDefine.plugin(
		{
			propName: 'blind',
			priority: -1, 
			API: 2, 
			version: '1.3',

			
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

				
				var targetStyle = document.defaultView.getComputedStyle(target, null),
					tweencss = tween.vars.css;


				// setup overflow hidden
				if (targetStyle.overflow !== 'hidden') {
					target.style.setProperty('overflow', 'hidden'/*, 'important'*/);
				}


				// horizontal & vertical translate ratio
				var tr = _getTranslateRatio(options.origin),
					h_offset = tr.h,
					v_offset = tr.v;


				// base width and height
				var	baseWidth = options.width || Math.max(target.scrollWidth, target.clientWidth),
					baseHeight = options.height || Math.max(target.scrollHeight, target.clientHeight);


				h_offset = (Math.abs(h_offset) > 1) ? h_offset / baseWidth : h_offset;
				v_offset = (Math.abs(v_offset) > 1) ? v_offset / baseHeight : v_offset;


				// end points
				var endWidth = tweencss.width || 0,
					endHeight = tweencss.height || 0,
					endX = (Math.abs(h_offset) > 0) ? (baseWidth * h_offset) - (endWidth * h_offset) : 0,
					endY = (Math.abs(v_offset) > 0) ? (baseHeight * v_offset) - (endHeight * v_offset) : 0;


				// apply tween properties
				tweencss.x = Math.abs(tweencss.x) > 0 ? tweencss.x + endX : endX;
				tweencss.y = Math.abs(tweencss.y) > 0 ? tweencss.y + endY : endY;

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



