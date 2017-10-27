


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
 * version: 1.5
 * update: 27.10.2017
 * github: https://github.com/alexkulagin/greensock-plugins/tree/master/BlindPlugin
 * @author: alexkulagin.com
 * 
 **/


	var _gsScope = (typeof(module) !== 'undefined' && module.exports && typeof(global) !== 'undefined') ? global : this || window;

	(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {
		
		'use strict';
		
		// UTILS
		const _error = function (err) { throw new Error(err) };
		const _extend = function (a,b) { for (var i in b) { a[i] = b[i] } return a };
		const _isNumber = function (n) { return !isNaN(parseFloat(n)) && isFinite(n) };
		

		// HELPERS
		const _getTranslateRatio = function (pivot)
		{
			if (!(typeof pivot === 'string' || pivot instanceof String)) {
				_error('origin must be a string!' + ' ' + pivot + ' is not string!');
			}

			var origin, first, second, _f, _s, 
				l, r, t, b, c, vr, hr;


			origin = pivot.replace(/ +(?= )/g,'').trim().split(' ');

			_f = first = origin[0];
			_s = second = origin[1];

			l = origin.indexOf('left');
			r = origin.indexOf('right');
			t = origin.indexOf('top');
			b = origin.indexOf('bottom');
			c = origin.indexOf('center');


			// vertical & horizontal translate ratio
			vr = hr = null;


			// single direction
			if (!second)
			{
				if (c !== -1) {
					vr = hr = 0.5;
				}

				else if (_isNumber(first)) {
					vr = hr = first;
				}

				else {
					vr = (t >= 0) ? 0 : (b >= 0) ? 1 : null;
					hr = (l >= 0) ? 0 : (r >= 0) ? 1 : null;	
				}
			}


			// multi direction
			else if (second)
			{
				// numbers & number with center [v,h] 
				if (l < 0 && r < 0 && t < 0 && b < 0) {
					vr = (first === 'center') ? 0.5 : _isNumber(first) ? first : null;
					hr = (second === 'center') ? 0.5 : _isNumber(second) ? second : null;
				}

				// [v,h]
				else 
				{
					if ((first == second) || ((first == 'top' || first == 'bottom') && (second == 'top' || second == 'bottom')) || ((first == 'left' || first == 'right') && (second == 'left' || second == 'right'))) {
						_error('origin must be correct!');
					}

					// [h,v]
					if ((t == 1 && b == 1) || (l == 0 || r == 0)) {
						_f = second; 
						_s = first;
					}

					vr = (_f === 'top') ? 0 : (_f === 'bottom') ? 1 : (_f === 'center') ? 0.5 : _isNumber(_f) ? _f : null;
					hr = (_s === 'left') ? 0 : (_s === 'right') ? 1 : (_s === 'center') ? 0.5 : _isNumber(_s) ? _s : null;
					
				}
			}

			if (vr == null && hr == null) {
				_error('origin must be correct!');
			}

			return { v: vr, h: hr };
		};


		// PLUGIN
		_gsScope._gsDefine.plugin(
		{
			propName: 'blind',
			priority: -1, 
			API: 2, 
			version: '1.5',

			
			init: function(target, value, tween, index)
			{
				// only for dom elements
				if (!target.nodeType) { return false };

				var targetStyle = document.defaultView.getComputedStyle(target, null);

				// setup hidden overflow
				if (targetStyle.overflow != 'hidden') {
					target.style.setProperty('overflow', 'hidden'/*, 'important'*/);
				}

				// default options
				var defaultOptions = { size: 0, origin: '0 0' };

				// initial options
				var options = _extend(defaultOptions, value),
					vars = tween.vars.css;

				// horizontal & vertical translate ratio
				var tr = _getTranslateRatio(options.origin),
					hr = tr.h !== null ? Math.abs(tr.h) : null,
					vr = tr.v !== null ? Math.abs(tr.v) : null;

				var size = options.size || 0, 
					maxWidth, maxHeight,
					minWidth, minHeight,
					endWidth, endHeight,
					endX, endY;


				if (hr !== null) 
				{
					maxWidth = options.maxWidth || target.scrollWidth;
					minWidth = options.minWidth || 0;

					endWidth = vars.width || (maxWidth - minWidth) * size + minWidth;
					endX = (hr > 0) ? (maxWidth * hr) - (endWidth * hr) : 0;

					vars.x = (vars.x && vars.x !== 0) ? vars.x + endX : endX;
					vars.width = endWidth;
				}


				if (vr !== null) 
				{
					maxHeight = options.maxHeight || target.scrollHeight;
					minHeight = options.minHeight || 0;

					endHeight = vars.height || (maxHeight - minHeight) * size + minHeight;
					endY = (vr > 0) ? (maxHeight * vr) - (endHeight * vr) : 0;

					vars.y = (vars.y && vars.y !== 0) ? vars.y + endY : endY;
					vars.height = endHeight;
				}

				return true;
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



