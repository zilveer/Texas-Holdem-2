/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./card.js":
/*!*****************!*\
  !*** ./card.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = function () {
  function Card(suit, value) {
    _classCallCheck(this, Card);

    this.suit = suit;
    this.value = value;
  }

  _createClass(Card, [{
    key: "SUITS_STRINGS",
    value: function SUITS_STRINGS() {
      return {
        clubs: "♣",
        diamonds: "♦",
        hearts: "♥",
        spades: "♠"
      };
    }
  }, {
    key: "VALUES_STRINGS",
    value: function VALUES_STRINGS() {
      return {
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
        ten: "10",
        jack: "J",
        queen: "Q",
        king: "K",
        ace: "A"
      };
    }
  }, {
    key: "values",
    value: function values() {
      return Object.keys(this.VALUES_STRINGS());
    }
  }, {
    key: "suits",
    value: function suits() {
      return Object.keys(this.SUITS_STRINGS());
    }
  }, {
    key: "isEqual",
    value: function isEqual(otherCard) {
      return this.suit === otherCard.suit && this.value === otherCard.value;
    }
  }, {
    key: "isGreaterThan",
    value: function isGreaterThan(otherCard) {
      if (this.value != otherCard.value) {
        return this.values().indexOf(this.value) > this.values().indexOf(otherCard.value);
      } else if (this.suit != otherCard.suit) {
        return this.suits().indexOf(this.suit) > this.suits().indexOf(otherCard.suit);
      }
    }
  }]);

  return Card;
}();

exports.default = Card;

/***/ }),

/***/ "./deck.js":
/*!*****************!*\
  !*** ./deck.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _card = __webpack_require__(/*! ./card.js */ "./card.js");

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Deck = function () {
  function Deck() {
    _classCallCheck(this, Deck);

    this.cards = this.populateDeck();
  }

  _createClass(Deck, [{
    key: 'populateDeck',
    value: function populateDeck() {
      var sample = new _card2.default();
      var deck = [];
      sample.values().forEach(function (value) {
        sample.suits().forEach(function (suit) {
          deck.push(new _card2.default(suit, value));
        });
      });
      return deck;
    }
  }]);

  return Deck;
}();

//
// class Deck
//   def self.all_cards
//     Card.suits.product(Card.values).map do |suit, value|
//       Card.new(suit, value)
//     end
//   end
//
//   def initialize(cards = Deck.all_cards)
//     @cards = cards
//   end
//
//   def deal_hand
//     Hand.new(take(5))
//   end
//
//   def count
//     @cards.count
//   end
//
//   def take(n)
//     raise "not enough cards" if n > count
//     @cards.shift(n)
//   end
//
//   def return(cards)
//     @cards.push(*cards)
//   end
//
//   def shuffle
//     @cards.shuffle!
//   end
// end

exports.default = Deck;

/***/ }),

/***/ "./game.js":
/*!*****************!*\
  !*** ./game.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _deck = __webpack_require__(/*! ./deck */ "./deck.js");

var _deck2 = _interopRequireDefault(_deck);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map