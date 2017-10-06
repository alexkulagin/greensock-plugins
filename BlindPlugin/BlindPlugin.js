


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
 ╚═════════════════════════════════════════════════════════╝
 *
 * version: 1.0
 * date: 06.10.2017
 * @author: alexkulagin.com
 **/


	var _gsScope = (typeof(module) !== 'undefined' && module.exports && typeof(global) !== 'undefined') ? global : this || window;

	(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {
		
		'use strict';

		_gsScope._gsDefine.plugin(
		{
			propName: 'BlindPlugin',
			priority: -1, 
			API: 2, 
			version: '1.0',

			init: function(target, value, tween, index)
			{
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

				var origin = (options.origin || '0 0') + '',
					a = origin.split(' '),
					l = a.lengt;
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