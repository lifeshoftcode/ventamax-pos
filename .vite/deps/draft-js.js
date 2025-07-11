import {
  require_object_assign
} from "./chunk-YRQRZKBP.js";
import {
  require_react_dom
} from "./chunk-UYZMRQBA.js";
import {
  require_react
} from "./chunk-YW5IJWHK.js";
import {
  __commonJS
} from "./chunk-OL46QLBJ.js";

// node_modules/immutable/dist/immutable.js
var require_immutable = __commonJS({
  "node_modules/immutable/dist/immutable.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global2.Immutable = factory();
    })(exports, function() {
      "use strict";
      var SLICE$0 = Array.prototype.slice;
      function createClass(ctor, superClass) {
        if (superClass) {
          ctor.prototype = Object.create(superClass.prototype);
        }
        ctor.prototype.constructor = ctor;
      }
      function Iterable(value) {
        return isIterable(value) ? value : Seq(value);
      }
      createClass(KeyedIterable, Iterable);
      function KeyedIterable(value) {
        return isKeyed(value) ? value : KeyedSeq(value);
      }
      createClass(IndexedIterable, Iterable);
      function IndexedIterable(value) {
        return isIndexed(value) ? value : IndexedSeq(value);
      }
      createClass(SetIterable, Iterable);
      function SetIterable(value) {
        return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
      }
      function isIterable(maybeIterable) {
        return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
      }
      function isKeyed(maybeKeyed) {
        return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
      }
      function isIndexed(maybeIndexed) {
        return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
      }
      function isAssociative(maybeAssociative) {
        return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
      }
      function isOrdered(maybeOrdered) {
        return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
      }
      Iterable.isIterable = isIterable;
      Iterable.isKeyed = isKeyed;
      Iterable.isIndexed = isIndexed;
      Iterable.isAssociative = isAssociative;
      Iterable.isOrdered = isOrdered;
      Iterable.Keyed = KeyedIterable;
      Iterable.Indexed = IndexedIterable;
      Iterable.Set = SetIterable;
      var IS_ITERABLE_SENTINEL = "@@__IMMUTABLE_ITERABLE__@@";
      var IS_KEYED_SENTINEL = "@@__IMMUTABLE_KEYED__@@";
      var IS_INDEXED_SENTINEL = "@@__IMMUTABLE_INDEXED__@@";
      var IS_ORDERED_SENTINEL = "@@__IMMUTABLE_ORDERED__@@";
      var DELETE = "delete";
      var SHIFT = 5;
      var SIZE = 1 << SHIFT;
      var MASK = SIZE - 1;
      var NOT_SET = {};
      var CHANGE_LENGTH = { value: false };
      var DID_ALTER = { value: false };
      function MakeRef(ref) {
        ref.value = false;
        return ref;
      }
      function SetRef(ref) {
        ref && (ref.value = true);
      }
      function OwnerID() {
      }
      function arrCopy(arr, offset) {
        offset = offset || 0;
        var len = Math.max(0, arr.length - offset);
        var newArr = new Array(len);
        for (var ii = 0; ii < len; ii++) {
          newArr[ii] = arr[ii + offset];
        }
        return newArr;
      }
      function ensureSize(iter) {
        if (iter.size === void 0) {
          iter.size = iter.__iterate(returnTrue);
        }
        return iter.size;
      }
      function wrapIndex(iter, index) {
        if (typeof index !== "number") {
          var uint32Index = index >>> 0;
          if ("" + uint32Index !== index || uint32Index === 4294967295) {
            return NaN;
          }
          index = uint32Index;
        }
        return index < 0 ? ensureSize(iter) + index : index;
      }
      function returnTrue() {
        return true;
      }
      function wholeSlice(begin, end, size) {
        return (begin === 0 || size !== void 0 && begin <= -size) && (end === void 0 || size !== void 0 && end >= size);
      }
      function resolveBegin(begin, size) {
        return resolveIndex(begin, size, 0);
      }
      function resolveEnd(end, size) {
        return resolveIndex(end, size, size);
      }
      function resolveIndex(index, size, defaultIndex) {
        return index === void 0 ? defaultIndex : index < 0 ? Math.max(0, size + index) : size === void 0 ? index : Math.min(size, index);
      }
      var ITERATE_KEYS = 0;
      var ITERATE_VALUES = 1;
      var ITERATE_ENTRIES = 2;
      var REAL_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;
      function Iterator(next) {
        this.next = next;
      }
      Iterator.prototype.toString = function() {
        return "[Iterator]";
      };
      Iterator.KEYS = ITERATE_KEYS;
      Iterator.VALUES = ITERATE_VALUES;
      Iterator.ENTRIES = ITERATE_ENTRIES;
      Iterator.prototype.inspect = Iterator.prototype.toSource = function() {
        return this.toString();
      };
      Iterator.prototype[ITERATOR_SYMBOL] = function() {
        return this;
      };
      function iteratorValue(type, k, v, iteratorResult) {
        var value = type === 0 ? k : type === 1 ? v : [k, v];
        iteratorResult ? iteratorResult.value = value : iteratorResult = {
          value,
          done: false
        };
        return iteratorResult;
      }
      function iteratorDone() {
        return { value: void 0, done: true };
      }
      function hasIterator(maybeIterable) {
        return !!getIteratorFn(maybeIterable);
      }
      function isIterator(maybeIterator) {
        return maybeIterator && typeof maybeIterator.next === "function";
      }
      function getIterator(iterable) {
        var iteratorFn = getIteratorFn(iterable);
        return iteratorFn && iteratorFn.call(iterable);
      }
      function getIteratorFn(iterable) {
        var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      function isArrayLike(value) {
        return value && typeof value.length === "number";
      }
      createClass(Seq, Iterable);
      function Seq(value) {
        return value === null || value === void 0 ? emptySequence() : isIterable(value) ? value.toSeq() : seqFromValue(value);
      }
      Seq.of = function() {
        return Seq(arguments);
      };
      Seq.prototype.toSeq = function() {
        return this;
      };
      Seq.prototype.toString = function() {
        return this.__toString("Seq {", "}");
      };
      Seq.prototype.cacheResult = function() {
        if (!this._cache && this.__iterateUncached) {
          this._cache = this.entrySeq().toArray();
          this.size = this._cache.length;
        }
        return this;
      };
      Seq.prototype.__iterate = function(fn, reverse) {
        return seqIterate(this, fn, reverse, true);
      };
      Seq.prototype.__iterator = function(type, reverse) {
        return seqIterator(this, type, reverse, true);
      };
      createClass(KeyedSeq, Seq);
      function KeyedSeq(value) {
        return value === null || value === void 0 ? emptySequence().toKeyedSeq() : isIterable(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : keyedSeqFromValue(value);
      }
      KeyedSeq.prototype.toKeyedSeq = function() {
        return this;
      };
      createClass(IndexedSeq, Seq);
      function IndexedSeq(value) {
        return value === null || value === void 0 ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
      }
      IndexedSeq.of = function() {
        return IndexedSeq(arguments);
      };
      IndexedSeq.prototype.toIndexedSeq = function() {
        return this;
      };
      IndexedSeq.prototype.toString = function() {
        return this.__toString("Seq [", "]");
      };
      IndexedSeq.prototype.__iterate = function(fn, reverse) {
        return seqIterate(this, fn, reverse, false);
      };
      IndexedSeq.prototype.__iterator = function(type, reverse) {
        return seqIterator(this, type, reverse, false);
      };
      createClass(SetSeq, Seq);
      function SetSeq(value) {
        return (value === null || value === void 0 ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value).toSetSeq();
      }
      SetSeq.of = function() {
        return SetSeq(arguments);
      };
      SetSeq.prototype.toSetSeq = function() {
        return this;
      };
      Seq.isSeq = isSeq;
      Seq.Keyed = KeyedSeq;
      Seq.Set = SetSeq;
      Seq.Indexed = IndexedSeq;
      var IS_SEQ_SENTINEL = "@@__IMMUTABLE_SEQ__@@";
      Seq.prototype[IS_SEQ_SENTINEL] = true;
      createClass(ArraySeq, IndexedSeq);
      function ArraySeq(array) {
        this._array = array;
        this.size = array.length;
      }
      ArraySeq.prototype.get = function(index, notSetValue) {
        return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
      };
      ArraySeq.prototype.__iterate = function(fn, reverse) {
        var array = this._array;
        var maxIndex = array.length - 1;
        for (var ii = 0; ii <= maxIndex; ii++) {
          if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
            return ii + 1;
          }
        }
        return ii;
      };
      ArraySeq.prototype.__iterator = function(type, reverse) {
        var array = this._array;
        var maxIndex = array.length - 1;
        var ii = 0;
        return new Iterator(
          function() {
            return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++]);
          }
        );
      };
      createClass(ObjectSeq, KeyedSeq);
      function ObjectSeq(object) {
        var keys = Object.keys(object);
        this._object = object;
        this._keys = keys;
        this.size = keys.length;
      }
      ObjectSeq.prototype.get = function(key, notSetValue) {
        if (notSetValue !== void 0 && !this.has(key)) {
          return notSetValue;
        }
        return this._object[key];
      };
      ObjectSeq.prototype.has = function(key) {
        return this._object.hasOwnProperty(key);
      };
      ObjectSeq.prototype.__iterate = function(fn, reverse) {
        var object = this._object;
        var keys = this._keys;
        var maxIndex = keys.length - 1;
        for (var ii = 0; ii <= maxIndex; ii++) {
          var key = keys[reverse ? maxIndex - ii : ii];
          if (fn(object[key], key, this) === false) {
            return ii + 1;
          }
        }
        return ii;
      };
      ObjectSeq.prototype.__iterator = function(type, reverse) {
        var object = this._object;
        var keys = this._keys;
        var maxIndex = keys.length - 1;
        var ii = 0;
        return new Iterator(function() {
          var key = keys[reverse ? maxIndex - ii : ii];
          return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, key, object[key]);
        });
      };
      ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;
      createClass(IterableSeq, IndexedSeq);
      function IterableSeq(iterable) {
        this._iterable = iterable;
        this.size = iterable.length || iterable.size;
      }
      IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
        if (reverse) {
          return this.cacheResult().__iterate(fn, reverse);
        }
        var iterable = this._iterable;
        var iterator = getIterator(iterable);
        var iterations = 0;
        if (isIterator(iterator)) {
          var step;
          while (!(step = iterator.next()).done) {
            if (fn(step.value, iterations++, this) === false) {
              break;
            }
          }
        }
        return iterations;
      };
      IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
        if (reverse) {
          return this.cacheResult().__iterator(type, reverse);
        }
        var iterable = this._iterable;
        var iterator = getIterator(iterable);
        if (!isIterator(iterator)) {
          return new Iterator(iteratorDone);
        }
        var iterations = 0;
        return new Iterator(function() {
          var step = iterator.next();
          return step.done ? step : iteratorValue(type, iterations++, step.value);
        });
      };
      createClass(IteratorSeq, IndexedSeq);
      function IteratorSeq(iterator) {
        this._iterator = iterator;
        this._iteratorCache = [];
      }
      IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
        if (reverse) {
          return this.cacheResult().__iterate(fn, reverse);
        }
        var iterator = this._iterator;
        var cache = this._iteratorCache;
        var iterations = 0;
        while (iterations < cache.length) {
          if (fn(cache[iterations], iterations++, this) === false) {
            return iterations;
          }
        }
        var step;
        while (!(step = iterator.next()).done) {
          var val = step.value;
          cache[iterations] = val;
          if (fn(val, iterations++, this) === false) {
            break;
          }
        }
        return iterations;
      };
      IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
        if (reverse) {
          return this.cacheResult().__iterator(type, reverse);
        }
        var iterator = this._iterator;
        var cache = this._iteratorCache;
        var iterations = 0;
        return new Iterator(function() {
          if (iterations >= cache.length) {
            var step = iterator.next();
            if (step.done) {
              return step;
            }
            cache[iterations] = step.value;
          }
          return iteratorValue(type, iterations, cache[iterations++]);
        });
      };
      function isSeq(maybeSeq) {
        return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
      }
      var EMPTY_SEQ;
      function emptySequence() {
        return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
      }
      function keyedSeqFromValue(value) {
        var seq = Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() : isIterator(value) ? new IteratorSeq(value).fromEntrySeq() : hasIterator(value) ? new IterableSeq(value).fromEntrySeq() : typeof value === "object" ? new ObjectSeq(value) : void 0;
        if (!seq) {
          throw new TypeError(
            "Expected Array or iterable object of [k, v] entries, or keyed object: " + value
          );
        }
        return seq;
      }
      function indexedSeqFromValue(value) {
        var seq = maybeIndexedSeqFromValue(value);
        if (!seq) {
          throw new TypeError(
            "Expected Array or iterable object of values: " + value
          );
        }
        return seq;
      }
      function seqFromValue(value) {
        var seq = maybeIndexedSeqFromValue(value) || typeof value === "object" && new ObjectSeq(value);
        if (!seq) {
          throw new TypeError(
            "Expected Array or iterable object of values, or keyed object: " + value
          );
        }
        return seq;
      }
      function maybeIndexedSeqFromValue(value) {
        return isArrayLike(value) ? new ArraySeq(value) : isIterator(value) ? new IteratorSeq(value) : hasIterator(value) ? new IterableSeq(value) : void 0;
      }
      function seqIterate(seq, fn, reverse, useKeys) {
        var cache = seq._cache;
        if (cache) {
          var maxIndex = cache.length - 1;
          for (var ii = 0; ii <= maxIndex; ii++) {
            var entry = cache[reverse ? maxIndex - ii : ii];
            if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
              return ii + 1;
            }
          }
          return ii;
        }
        return seq.__iterateUncached(fn, reverse);
      }
      function seqIterator(seq, type, reverse, useKeys) {
        var cache = seq._cache;
        if (cache) {
          var maxIndex = cache.length - 1;
          var ii = 0;
          return new Iterator(function() {
            var entry = cache[reverse ? maxIndex - ii : ii];
            return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
          });
        }
        return seq.__iteratorUncached(type, reverse);
      }
      function fromJS(json, converter) {
        return converter ? fromJSWith(converter, json, "", { "": json }) : fromJSDefault(json);
      }
      function fromJSWith(converter, json, key, parentJSON) {
        if (Array.isArray(json)) {
          return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k) {
            return fromJSWith(converter, v, k, json);
          }));
        }
        if (isPlainObj(json)) {
          return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k) {
            return fromJSWith(converter, v, k, json);
          }));
        }
        return json;
      }
      function fromJSDefault(json) {
        if (Array.isArray(json)) {
          return IndexedSeq(json).map(fromJSDefault).toList();
        }
        if (isPlainObj(json)) {
          return KeyedSeq(json).map(fromJSDefault).toMap();
        }
        return json;
      }
      function isPlainObj(value) {
        return value && (value.constructor === Object || value.constructor === void 0);
      }
      function is(valueA, valueB) {
        if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
          return true;
        }
        if (!valueA || !valueB) {
          return false;
        }
        if (typeof valueA.valueOf === "function" && typeof valueB.valueOf === "function") {
          valueA = valueA.valueOf();
          valueB = valueB.valueOf();
          if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
            return true;
          }
          if (!valueA || !valueB) {
            return false;
          }
        }
        if (typeof valueA.equals === "function" && typeof valueB.equals === "function" && valueA.equals(valueB)) {
          return true;
        }
        return false;
      }
      function deepEqual(a, b) {
        if (a === b) {
          return true;
        }
        if (!isIterable(b) || a.size !== void 0 && b.size !== void 0 && a.size !== b.size || a.__hash !== void 0 && b.__hash !== void 0 && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)) {
          return false;
        }
        if (a.size === 0 && b.size === 0) {
          return true;
        }
        var notAssociative = !isAssociative(a);
        if (isOrdered(a)) {
          var entries = a.entries();
          return b.every(function(v, k) {
            var entry = entries.next().value;
            return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
          }) && entries.next().done;
        }
        var flipped = false;
        if (a.size === void 0) {
          if (b.size === void 0) {
            if (typeof a.cacheResult === "function") {
              a.cacheResult();
            }
          } else {
            flipped = true;
            var _ = a;
            a = b;
            b = _;
          }
        }
        var allEqual = true;
        var bSize = b.__iterate(function(v, k) {
          if (notAssociative ? !a.has(v) : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
            allEqual = false;
            return false;
          }
        });
        return allEqual && a.size === bSize;
      }
      createClass(Repeat, IndexedSeq);
      function Repeat(value, times) {
        if (!(this instanceof Repeat)) {
          return new Repeat(value, times);
        }
        this._value = value;
        this.size = times === void 0 ? Infinity : Math.max(0, times);
        if (this.size === 0) {
          if (EMPTY_REPEAT) {
            return EMPTY_REPEAT;
          }
          EMPTY_REPEAT = this;
        }
      }
      Repeat.prototype.toString = function() {
        if (this.size === 0) {
          return "Repeat []";
        }
        return "Repeat [ " + this._value + " " + this.size + " times ]";
      };
      Repeat.prototype.get = function(index, notSetValue) {
        return this.has(index) ? this._value : notSetValue;
      };
      Repeat.prototype.includes = function(searchValue) {
        return is(this._value, searchValue);
      };
      Repeat.prototype.slice = function(begin, end) {
        var size = this.size;
        return wholeSlice(begin, end, size) ? this : new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
      };
      Repeat.prototype.reverse = function() {
        return this;
      };
      Repeat.prototype.indexOf = function(searchValue) {
        if (is(this._value, searchValue)) {
          return 0;
        }
        return -1;
      };
      Repeat.prototype.lastIndexOf = function(searchValue) {
        if (is(this._value, searchValue)) {
          return this.size;
        }
        return -1;
      };
      Repeat.prototype.__iterate = function(fn, reverse) {
        for (var ii = 0; ii < this.size; ii++) {
          if (fn(this._value, ii, this) === false) {
            return ii + 1;
          }
        }
        return ii;
      };
      Repeat.prototype.__iterator = function(type, reverse) {
        var this$0 = this;
        var ii = 0;
        return new Iterator(
          function() {
            return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone();
          }
        );
      };
      Repeat.prototype.equals = function(other) {
        return other instanceof Repeat ? is(this._value, other._value) : deepEqual(other);
      };
      var EMPTY_REPEAT;
      function invariant(condition, error) {
        if (!condition) throw new Error(error);
      }
      createClass(Range, IndexedSeq);
      function Range(start, end, step) {
        if (!(this instanceof Range)) {
          return new Range(start, end, step);
        }
        invariant(step !== 0, "Cannot step a Range by 0");
        start = start || 0;
        if (end === void 0) {
          end = Infinity;
        }
        step = step === void 0 ? 1 : Math.abs(step);
        if (end < start) {
          step = -step;
        }
        this._start = start;
        this._end = end;
        this._step = step;
        this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
        if (this.size === 0) {
          if (EMPTY_RANGE) {
            return EMPTY_RANGE;
          }
          EMPTY_RANGE = this;
        }
      }
      Range.prototype.toString = function() {
        if (this.size === 0) {
          return "Range []";
        }
        return "Range [ " + this._start + "..." + this._end + (this._step > 1 ? " by " + this._step : "") + " ]";
      };
      Range.prototype.get = function(index, notSetValue) {
        return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
      };
      Range.prototype.includes = function(searchValue) {
        var possibleIndex = (searchValue - this._start) / this._step;
        return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
      };
      Range.prototype.slice = function(begin, end) {
        if (wholeSlice(begin, end, this.size)) {
          return this;
        }
        begin = resolveBegin(begin, this.size);
        end = resolveEnd(end, this.size);
        if (end <= begin) {
          return new Range(0, 0);
        }
        return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
      };
      Range.prototype.indexOf = function(searchValue) {
        var offsetValue = searchValue - this._start;
        if (offsetValue % this._step === 0) {
          var index = offsetValue / this._step;
          if (index >= 0 && index < this.size) {
            return index;
          }
        }
        return -1;
      };
      Range.prototype.lastIndexOf = function(searchValue) {
        return this.indexOf(searchValue);
      };
      Range.prototype.__iterate = function(fn, reverse) {
        var maxIndex = this.size - 1;
        var step = this._step;
        var value = reverse ? this._start + maxIndex * step : this._start;
        for (var ii = 0; ii <= maxIndex; ii++) {
          if (fn(value, ii, this) === false) {
            return ii + 1;
          }
          value += reverse ? -step : step;
        }
        return ii;
      };
      Range.prototype.__iterator = function(type, reverse) {
        var maxIndex = this.size - 1;
        var step = this._step;
        var value = reverse ? this._start + maxIndex * step : this._start;
        var ii = 0;
        return new Iterator(function() {
          var v = value;
          value += reverse ? -step : step;
          return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
        });
      };
      Range.prototype.equals = function(other) {
        return other instanceof Range ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
      };
      var EMPTY_RANGE;
      createClass(Collection, Iterable);
      function Collection() {
        throw TypeError("Abstract");
      }
      createClass(KeyedCollection, Collection);
      function KeyedCollection() {
      }
      createClass(IndexedCollection, Collection);
      function IndexedCollection() {
      }
      createClass(SetCollection, Collection);
      function SetCollection() {
      }
      Collection.Keyed = KeyedCollection;
      Collection.Indexed = IndexedCollection;
      Collection.Set = SetCollection;
      var imul = typeof Math.imul === "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : function imul2(a, b) {
        a = a | 0;
        b = b | 0;
        var c = a & 65535;
        var d = b & 65535;
        return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0;
      };
      function smi(i32) {
        return i32 >>> 1 & 1073741824 | i32 & 3221225471;
      }
      function hash(o) {
        if (o === false || o === null || o === void 0) {
          return 0;
        }
        if (typeof o.valueOf === "function") {
          o = o.valueOf();
          if (o === false || o === null || o === void 0) {
            return 0;
          }
        }
        if (o === true) {
          return 1;
        }
        var type = typeof o;
        if (type === "number") {
          var h = o | 0;
          if (h !== o) {
            h ^= o * 4294967295;
          }
          while (o > 4294967295) {
            o /= 4294967295;
            h ^= o;
          }
          return smi(h);
        }
        if (type === "string") {
          return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
        }
        if (typeof o.hashCode === "function") {
          return o.hashCode();
        }
        if (type === "object") {
          return hashJSObj(o);
        }
        if (typeof o.toString === "function") {
          return hashString(o.toString());
        }
        throw new Error("Value type " + type + " cannot be hashed.");
      }
      function cachedHashString(string) {
        var hash2 = stringHashCache[string];
        if (hash2 === void 0) {
          hash2 = hashString(string);
          if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
            STRING_HASH_CACHE_SIZE = 0;
            stringHashCache = {};
          }
          STRING_HASH_CACHE_SIZE++;
          stringHashCache[string] = hash2;
        }
        return hash2;
      }
      function hashString(string) {
        var hash2 = 0;
        for (var ii = 0; ii < string.length; ii++) {
          hash2 = 31 * hash2 + string.charCodeAt(ii) | 0;
        }
        return smi(hash2);
      }
      function hashJSObj(obj) {
        var hash2;
        if (usingWeakMap) {
          hash2 = weakMap.get(obj);
          if (hash2 !== void 0) {
            return hash2;
          }
        }
        hash2 = obj[UID_HASH_KEY];
        if (hash2 !== void 0) {
          return hash2;
        }
        if (!canDefineProperty) {
          hash2 = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
          if (hash2 !== void 0) {
            return hash2;
          }
          hash2 = getIENodeHash(obj);
          if (hash2 !== void 0) {
            return hash2;
          }
        }
        hash2 = ++objHashUID;
        if (objHashUID & 1073741824) {
          objHashUID = 0;
        }
        if (usingWeakMap) {
          weakMap.set(obj, hash2);
        } else if (isExtensible !== void 0 && isExtensible(obj) === false) {
          throw new Error("Non-extensible objects are not allowed as keys.");
        } else if (canDefineProperty) {
          Object.defineProperty(obj, UID_HASH_KEY, {
            "enumerable": false,
            "configurable": false,
            "writable": false,
            "value": hash2
          });
        } else if (obj.propertyIsEnumerable !== void 0 && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
          obj.propertyIsEnumerable = function() {
            return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
          };
          obj.propertyIsEnumerable[UID_HASH_KEY] = hash2;
        } else if (obj.nodeType !== void 0) {
          obj[UID_HASH_KEY] = hash2;
        } else {
          throw new Error("Unable to set a non-enumerable property on object.");
        }
        return hash2;
      }
      var isExtensible = Object.isExtensible;
      var canDefineProperty = function() {
        try {
          Object.defineProperty({}, "@", {});
          return true;
        } catch (e) {
          return false;
        }
      }();
      function getIENodeHash(node) {
        if (node && node.nodeType > 0) {
          switch (node.nodeType) {
            case 1:
              return node.uniqueID;
            case 9:
              return node.documentElement && node.documentElement.uniqueID;
          }
        }
      }
      var usingWeakMap = typeof WeakMap === "function";
      var weakMap;
      if (usingWeakMap) {
        weakMap = /* @__PURE__ */ new WeakMap();
      }
      var objHashUID = 0;
      var UID_HASH_KEY = "__immutablehash__";
      if (typeof Symbol === "function") {
        UID_HASH_KEY = Symbol(UID_HASH_KEY);
      }
      var STRING_HASH_CACHE_MIN_STRLEN = 16;
      var STRING_HASH_CACHE_MAX_SIZE = 255;
      var STRING_HASH_CACHE_SIZE = 0;
      var stringHashCache = {};
      function assertNotInfinite(size) {
        invariant(
          size !== Infinity,
          "Cannot perform this action with an infinite size."
        );
      }
      createClass(Map, KeyedCollection);
      function Map(value) {
        return value === null || value === void 0 ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function(map) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k) {
            return map.set(k, v);
          });
        });
      }
      Map.prototype.toString = function() {
        return this.__toString("Map {", "}");
      };
      Map.prototype.get = function(k, notSetValue) {
        return this._root ? this._root.get(0, void 0, k, notSetValue) : notSetValue;
      };
      Map.prototype.set = function(k, v) {
        return updateMap(this, k, v);
      };
      Map.prototype.setIn = function(keyPath, v) {
        return this.updateIn(keyPath, NOT_SET, function() {
          return v;
        });
      };
      Map.prototype.remove = function(k) {
        return updateMap(this, k, NOT_SET);
      };
      Map.prototype.deleteIn = function(keyPath) {
        return this.updateIn(keyPath, function() {
          return NOT_SET;
        });
      };
      Map.prototype.update = function(k, notSetValue, updater) {
        return arguments.length === 1 ? k(this) : this.updateIn([k], notSetValue, updater);
      };
      Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
        if (!updater) {
          updater = notSetValue;
          notSetValue = void 0;
        }
        var updatedValue = updateInDeepMap(
          this,
          forceIterator(keyPath),
          notSetValue,
          updater
        );
        return updatedValue === NOT_SET ? void 0 : updatedValue;
      };
      Map.prototype.clear = function() {
        if (this.size === 0) {
          return this;
        }
        if (this.__ownerID) {
          this.size = 0;
          this._root = null;
          this.__hash = void 0;
          this.__altered = true;
          return this;
        }
        return emptyMap();
      };
      Map.prototype.merge = function() {
        return mergeIntoMapWith(this, void 0, arguments);
      };
      Map.prototype.mergeWith = function(merger) {
        var iters = SLICE$0.call(arguments, 1);
        return mergeIntoMapWith(this, merger, iters);
      };
      Map.prototype.mergeIn = function(keyPath) {
        var iters = SLICE$0.call(arguments, 1);
        return this.updateIn(
          keyPath,
          emptyMap(),
          function(m) {
            return typeof m.merge === "function" ? m.merge.apply(m, iters) : iters[iters.length - 1];
          }
        );
      };
      Map.prototype.mergeDeep = function() {
        return mergeIntoMapWith(this, deepMerger, arguments);
      };
      Map.prototype.mergeDeepWith = function(merger) {
        var iters = SLICE$0.call(arguments, 1);
        return mergeIntoMapWith(this, deepMergerWith(merger), iters);
      };
      Map.prototype.mergeDeepIn = function(keyPath) {
        var iters = SLICE$0.call(arguments, 1);
        return this.updateIn(
          keyPath,
          emptyMap(),
          function(m) {
            return typeof m.mergeDeep === "function" ? m.mergeDeep.apply(m, iters) : iters[iters.length - 1];
          }
        );
      };
      Map.prototype.sort = function(comparator) {
        return OrderedMap(sortFactory(this, comparator));
      };
      Map.prototype.sortBy = function(mapper, comparator) {
        return OrderedMap(sortFactory(this, comparator, mapper));
      };
      Map.prototype.withMutations = function(fn) {
        var mutable = this.asMutable();
        fn(mutable);
        return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
      };
      Map.prototype.asMutable = function() {
        return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
      };
      Map.prototype.asImmutable = function() {
        return this.__ensureOwner();
      };
      Map.prototype.wasAltered = function() {
        return this.__altered;
      };
      Map.prototype.__iterator = function(type, reverse) {
        return new MapIterator(this, type, reverse);
      };
      Map.prototype.__iterate = function(fn, reverse) {
        var this$0 = this;
        var iterations = 0;
        this._root && this._root.iterate(function(entry) {
          iterations++;
          return fn(entry[1], entry[0], this$0);
        }, reverse);
        return iterations;
      };
      Map.prototype.__ensureOwner = function(ownerID) {
        if (ownerID === this.__ownerID) {
          return this;
        }
        if (!ownerID) {
          this.__ownerID = ownerID;
          this.__altered = false;
          return this;
        }
        return makeMap(this.size, this._root, ownerID, this.__hash);
      };
      function isMap(maybeMap) {
        return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
      }
      Map.isMap = isMap;
      var IS_MAP_SENTINEL = "@@__IMMUTABLE_MAP__@@";
      var MapPrototype = Map.prototype;
      MapPrototype[IS_MAP_SENTINEL] = true;
      MapPrototype[DELETE] = MapPrototype.remove;
      MapPrototype.removeIn = MapPrototype.deleteIn;
      function ArrayMapNode(ownerID, entries) {
        this.ownerID = ownerID;
        this.entries = entries;
      }
      ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
        var entries = this.entries;
        for (var ii = 0, len = entries.length; ii < len; ii++) {
          if (is(key, entries[ii][0])) {
            return entries[ii][1];
          }
        }
        return notSetValue;
      };
      ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        var removed = value === NOT_SET;
        var entries = this.entries;
        var idx = 0;
        for (var len = entries.length; idx < len; idx++) {
          if (is(key, entries[idx][0])) {
            break;
          }
        }
        var exists = idx < len;
        if (exists ? entries[idx][1] === value : removed) {
          return this;
        }
        SetRef(didAlter);
        (removed || !exists) && SetRef(didChangeSize);
        if (removed && entries.length === 1) {
          return;
        }
        if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
          return createNodes(ownerID, entries, key, value);
        }
        var isEditable = ownerID && ownerID === this.ownerID;
        var newEntries = isEditable ? entries : arrCopy(entries);
        if (exists) {
          if (removed) {
            idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
          } else {
            newEntries[idx] = [key, value];
          }
        } else {
          newEntries.push([key, value]);
        }
        if (isEditable) {
          this.entries = newEntries;
          return this;
        }
        return new ArrayMapNode(ownerID, newEntries);
      };
      function BitmapIndexedNode(ownerID, bitmap, nodes) {
        this.ownerID = ownerID;
        this.bitmap = bitmap;
        this.nodes = nodes;
      }
      BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
        if (keyHash === void 0) {
          keyHash = hash(key);
        }
        var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
        var bitmap = this.bitmap;
        return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(shift + SHIFT, keyHash, key, notSetValue);
      };
      BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        if (keyHash === void 0) {
          keyHash = hash(key);
        }
        var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
        var bit = 1 << keyHashFrag;
        var bitmap = this.bitmap;
        var exists = (bitmap & bit) !== 0;
        if (!exists && value === NOT_SET) {
          return this;
        }
        var idx = popCount(bitmap & bit - 1);
        var nodes = this.nodes;
        var node = exists ? nodes[idx] : void 0;
        var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
        if (newNode === node) {
          return this;
        }
        if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
          return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
        }
        if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
          return nodes[idx ^ 1];
        }
        if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
          return newNode;
        }
        var isEditable = ownerID && ownerID === this.ownerID;
        var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
        var newNodes = exists ? newNode ? setIn(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);
        if (isEditable) {
          this.bitmap = newBitmap;
          this.nodes = newNodes;
          return this;
        }
        return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
      };
      function HashArrayMapNode(ownerID, count, nodes) {
        this.ownerID = ownerID;
        this.count = count;
        this.nodes = nodes;
      }
      HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
        if (keyHash === void 0) {
          keyHash = hash(key);
        }
        var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
        var node = this.nodes[idx];
        return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
      };
      HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        if (keyHash === void 0) {
          keyHash = hash(key);
        }
        var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
        var removed = value === NOT_SET;
        var nodes = this.nodes;
        var node = nodes[idx];
        if (removed && !node) {
          return this;
        }
        var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
        if (newNode === node) {
          return this;
        }
        var newCount = this.count;
        if (!node) {
          newCount++;
        } else if (!newNode) {
          newCount--;
          if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
            return packNodes(ownerID, nodes, newCount, idx);
          }
        }
        var isEditable = ownerID && ownerID === this.ownerID;
        var newNodes = setIn(nodes, idx, newNode, isEditable);
        if (isEditable) {
          this.count = newCount;
          this.nodes = newNodes;
          return this;
        }
        return new HashArrayMapNode(ownerID, newCount, newNodes);
      };
      function HashCollisionNode(ownerID, keyHash, entries) {
        this.ownerID = ownerID;
        this.keyHash = keyHash;
        this.entries = entries;
      }
      HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
        var entries = this.entries;
        for (var ii = 0, len = entries.length; ii < len; ii++) {
          if (is(key, entries[ii][0])) {
            return entries[ii][1];
          }
        }
        return notSetValue;
      };
      HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        if (keyHash === void 0) {
          keyHash = hash(key);
        }
        var removed = value === NOT_SET;
        if (keyHash !== this.keyHash) {
          if (removed) {
            return this;
          }
          SetRef(didAlter);
          SetRef(didChangeSize);
          return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
        }
        var entries = this.entries;
        var idx = 0;
        for (var len = entries.length; idx < len; idx++) {
          if (is(key, entries[idx][0])) {
            break;
          }
        }
        var exists = idx < len;
        if (exists ? entries[idx][1] === value : removed) {
          return this;
        }
        SetRef(didAlter);
        (removed || !exists) && SetRef(didChangeSize);
        if (removed && len === 2) {
          return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
        }
        var isEditable = ownerID && ownerID === this.ownerID;
        var newEntries = isEditable ? entries : arrCopy(entries);
        if (exists) {
          if (removed) {
            idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
          } else {
            newEntries[idx] = [key, value];
          }
        } else {
          newEntries.push([key, value]);
        }
        if (isEditable) {
          this.entries = newEntries;
          return this;
        }
        return new HashCollisionNode(ownerID, this.keyHash, newEntries);
      };
      function ValueNode(ownerID, keyHash, entry) {
        this.ownerID = ownerID;
        this.keyHash = keyHash;
        this.entry = entry;
      }
      ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
        return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
      };
      ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        var removed = value === NOT_SET;
        var keyMatch = is(key, this.entry[0]);
        if (keyMatch ? value === this.entry[1] : removed) {
          return this;
        }
        SetRef(didAlter);
        if (removed) {
          SetRef(didChangeSize);
          return;
        }
        if (keyMatch) {
          if (ownerID && ownerID === this.ownerID) {
            this.entry[1] = value;
            return this;
          }
          return new ValueNode(ownerID, this.keyHash, [key, value]);
        }
        SetRef(didChangeSize);
        return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
      };
      ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function(fn, reverse) {
        var entries = this.entries;
        for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
          if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
            return false;
          }
        }
      };
      BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function(fn, reverse) {
        var nodes = this.nodes;
        for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
          var node = nodes[reverse ? maxIndex - ii : ii];
          if (node && node.iterate(fn, reverse) === false) {
            return false;
          }
        }
      };
      ValueNode.prototype.iterate = function(fn, reverse) {
        return fn(this.entry);
      };
      createClass(MapIterator, Iterator);
      function MapIterator(map, type, reverse) {
        this._type = type;
        this._reverse = reverse;
        this._stack = map._root && mapIteratorFrame(map._root);
      }
      MapIterator.prototype.next = function() {
        var type = this._type;
        var stack = this._stack;
        while (stack) {
          var node = stack.node;
          var index = stack.index++;
          var maxIndex;
          if (node.entry) {
            if (index === 0) {
              return mapIteratorValue(type, node.entry);
            }
          } else if (node.entries) {
            maxIndex = node.entries.length - 1;
            if (index <= maxIndex) {
              return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
            }
          } else {
            maxIndex = node.nodes.length - 1;
            if (index <= maxIndex) {
              var subNode = node.nodes[this._reverse ? maxIndex - index : index];
              if (subNode) {
                if (subNode.entry) {
                  return mapIteratorValue(type, subNode.entry);
                }
                stack = this._stack = mapIteratorFrame(subNode, stack);
              }
              continue;
            }
          }
          stack = this._stack = this._stack.__prev;
        }
        return iteratorDone();
      };
      function mapIteratorValue(type, entry) {
        return iteratorValue(type, entry[0], entry[1]);
      }
      function mapIteratorFrame(node, prev) {
        return {
          node,
          index: 0,
          __prev: prev
        };
      }
      function makeMap(size, root, ownerID, hash2) {
        var map = Object.create(MapPrototype);
        map.size = size;
        map._root = root;
        map.__ownerID = ownerID;
        map.__hash = hash2;
        map.__altered = false;
        return map;
      }
      var EMPTY_MAP;
      function emptyMap() {
        return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
      }
      function updateMap(map, k, v) {
        var newRoot;
        var newSize;
        if (!map._root) {
          if (v === NOT_SET) {
            return map;
          }
          newSize = 1;
          newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
        } else {
          var didChangeSize = MakeRef(CHANGE_LENGTH);
          var didAlter = MakeRef(DID_ALTER);
          newRoot = updateNode(map._root, map.__ownerID, 0, void 0, k, v, didChangeSize, didAlter);
          if (!didAlter.value) {
            return map;
          }
          newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
        }
        if (map.__ownerID) {
          map.size = newSize;
          map._root = newRoot;
          map.__hash = void 0;
          map.__altered = true;
          return map;
        }
        return newRoot ? makeMap(newSize, newRoot) : emptyMap();
      }
      function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
        if (!node) {
          if (value === NOT_SET) {
            return node;
          }
          SetRef(didAlter);
          SetRef(didChangeSize);
          return new ValueNode(ownerID, keyHash, [key, value]);
        }
        return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
      }
      function isLeafNode(node) {
        return node.constructor === ValueNode || node.constructor === HashCollisionNode;
      }
      function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
        if (node.keyHash === keyHash) {
          return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
        }
        var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
        var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
        var newNode;
        var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);
        return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
      }
      function createNodes(ownerID, entries, key, value) {
        if (!ownerID) {
          ownerID = new OwnerID();
        }
        var node = new ValueNode(ownerID, hash(key), [key, value]);
        for (var ii = 0; ii < entries.length; ii++) {
          var entry = entries[ii];
          node = node.update(ownerID, 0, void 0, entry[0], entry[1]);
        }
        return node;
      }
      function packNodes(ownerID, nodes, count, excluding) {
        var bitmap = 0;
        var packedII = 0;
        var packedNodes = new Array(count);
        for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
          var node = nodes[ii];
          if (node !== void 0 && ii !== excluding) {
            bitmap |= bit;
            packedNodes[packedII++] = node;
          }
        }
        return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
      }
      function expandNodes(ownerID, nodes, bitmap, including, node) {
        var count = 0;
        var expandedNodes = new Array(SIZE);
        for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
          expandedNodes[ii] = bitmap & 1 ? nodes[count++] : void 0;
        }
        expandedNodes[including] = node;
        return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
      }
      function mergeIntoMapWith(map, merger, iterables) {
        var iters = [];
        for (var ii = 0; ii < iterables.length; ii++) {
          var value = iterables[ii];
          var iter = KeyedIterable(value);
          if (!isIterable(value)) {
            iter = iter.map(function(v) {
              return fromJS(v);
            });
          }
          iters.push(iter);
        }
        return mergeIntoCollectionWith(map, merger, iters);
      }
      function deepMerger(existing, value, key) {
        return existing && existing.mergeDeep && isIterable(value) ? existing.mergeDeep(value) : is(existing, value) ? existing : value;
      }
      function deepMergerWith(merger) {
        return function(existing, value, key) {
          if (existing && existing.mergeDeepWith && isIterable(value)) {
            return existing.mergeDeepWith(merger, value);
          }
          var nextValue = merger(existing, value, key);
          return is(existing, nextValue) ? existing : nextValue;
        };
      }
      function mergeIntoCollectionWith(collection, merger, iters) {
        iters = iters.filter(function(x) {
          return x.size !== 0;
        });
        if (iters.length === 0) {
          return collection;
        }
        if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
          return collection.constructor(iters[0]);
        }
        return collection.withMutations(function(collection2) {
          var mergeIntoMap = merger ? function(value, key) {
            collection2.update(
              key,
              NOT_SET,
              function(existing) {
                return existing === NOT_SET ? value : merger(existing, value, key);
              }
            );
          } : function(value, key) {
            collection2.set(key, value);
          };
          for (var ii = 0; ii < iters.length; ii++) {
            iters[ii].forEach(mergeIntoMap);
          }
        });
      }
      function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
        var isNotSet = existing === NOT_SET;
        var step = keyPathIter.next();
        if (step.done) {
          var existingValue = isNotSet ? notSetValue : existing;
          var newValue = updater(existingValue);
          return newValue === existingValue ? existing : newValue;
        }
        invariant(
          isNotSet || existing && existing.set,
          "invalid keyPath"
        );
        var key = step.value;
        var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
        var nextUpdated = updateInDeepMap(
          nextExisting,
          keyPathIter,
          notSetValue,
          updater
        );
        return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? existing.remove(key) : (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
      }
      function popCount(x) {
        x = x - (x >> 1 & 1431655765);
        x = (x & 858993459) + (x >> 2 & 858993459);
        x = x + (x >> 4) & 252645135;
        x = x + (x >> 8);
        x = x + (x >> 16);
        return x & 127;
      }
      function setIn(array, idx, val, canEdit) {
        var newArray = canEdit ? array : arrCopy(array);
        newArray[idx] = val;
        return newArray;
      }
      function spliceIn(array, idx, val, canEdit) {
        var newLen = array.length + 1;
        if (canEdit && idx + 1 === newLen) {
          array[idx] = val;
          return array;
        }
        var newArray = new Array(newLen);
        var after = 0;
        for (var ii = 0; ii < newLen; ii++) {
          if (ii === idx) {
            newArray[ii] = val;
            after = -1;
          } else {
            newArray[ii] = array[ii + after];
          }
        }
        return newArray;
      }
      function spliceOut(array, idx, canEdit) {
        var newLen = array.length - 1;
        if (canEdit && idx === newLen) {
          array.pop();
          return array;
        }
        var newArray = new Array(newLen);
        var after = 0;
        for (var ii = 0; ii < newLen; ii++) {
          if (ii === idx) {
            after = 1;
          }
          newArray[ii] = array[ii + after];
        }
        return newArray;
      }
      var MAX_ARRAY_MAP_SIZE = SIZE / 4;
      var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
      var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;
      createClass(List, IndexedCollection);
      function List(value) {
        var empty = emptyList();
        if (value === null || value === void 0) {
          return empty;
        }
        if (isList(value)) {
          return value;
        }
        var iter = IndexedIterable(value);
        var size = iter.size;
        if (size === 0) {
          return empty;
        }
        assertNotInfinite(size);
        if (size > 0 && size < SIZE) {
          return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
        }
        return empty.withMutations(function(list) {
          list.setSize(size);
          iter.forEach(function(v, i) {
            return list.set(i, v);
          });
        });
      }
      List.of = function() {
        return this(arguments);
      };
      List.prototype.toString = function() {
        return this.__toString("List [", "]");
      };
      List.prototype.get = function(index, notSetValue) {
        index = wrapIndex(this, index);
        if (index >= 0 && index < this.size) {
          index += this._origin;
          var node = listNodeFor(this, index);
          return node && node.array[index & MASK];
        }
        return notSetValue;
      };
      List.prototype.set = function(index, value) {
        return updateList(this, index, value);
      };
      List.prototype.remove = function(index) {
        return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
      };
      List.prototype.insert = function(index, value) {
        return this.splice(index, 0, value);
      };
      List.prototype.clear = function() {
        if (this.size === 0) {
          return this;
        }
        if (this.__ownerID) {
          this.size = this._origin = this._capacity = 0;
          this._level = SHIFT;
          this._root = this._tail = null;
          this.__hash = void 0;
          this.__altered = true;
          return this;
        }
        return emptyList();
      };
      List.prototype.push = function() {
        var values = arguments;
        var oldSize = this.size;
        return this.withMutations(function(list) {
          setListBounds(list, 0, oldSize + values.length);
          for (var ii = 0; ii < values.length; ii++) {
            list.set(oldSize + ii, values[ii]);
          }
        });
      };
      List.prototype.pop = function() {
        return setListBounds(this, 0, -1);
      };
      List.prototype.unshift = function() {
        var values = arguments;
        return this.withMutations(function(list) {
          setListBounds(list, -values.length);
          for (var ii = 0; ii < values.length; ii++) {
            list.set(ii, values[ii]);
          }
        });
      };
      List.prototype.shift = function() {
        return setListBounds(this, 1);
      };
      List.prototype.merge = function() {
        return mergeIntoListWith(this, void 0, arguments);
      };
      List.prototype.mergeWith = function(merger) {
        var iters = SLICE$0.call(arguments, 1);
        return mergeIntoListWith(this, merger, iters);
      };
      List.prototype.mergeDeep = function() {
        return mergeIntoListWith(this, deepMerger, arguments);
      };
      List.prototype.mergeDeepWith = function(merger) {
        var iters = SLICE$0.call(arguments, 1);
        return mergeIntoListWith(this, deepMergerWith(merger), iters);
      };
      List.prototype.setSize = function(size) {
        return setListBounds(this, 0, size);
      };
      List.prototype.slice = function(begin, end) {
        var size = this.size;
        if (wholeSlice(begin, end, size)) {
          return this;
        }
        return setListBounds(
          this,
          resolveBegin(begin, size),
          resolveEnd(end, size)
        );
      };
      List.prototype.__iterator = function(type, reverse) {
        var index = 0;
        var values = iterateList(this, reverse);
        return new Iterator(function() {
          var value = values();
          return value === DONE ? iteratorDone() : iteratorValue(type, index++, value);
        });
      };
      List.prototype.__iterate = function(fn, reverse) {
        var index = 0;
        var values = iterateList(this, reverse);
        var value;
        while ((value = values()) !== DONE) {
          if (fn(value, index++, this) === false) {
            break;
          }
        }
        return index;
      };
      List.prototype.__ensureOwner = function(ownerID) {
        if (ownerID === this.__ownerID) {
          return this;
        }
        if (!ownerID) {
          this.__ownerID = ownerID;
          return this;
        }
        return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
      };
      function isList(maybeList) {
        return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
      }
      List.isList = isList;
      var IS_LIST_SENTINEL = "@@__IMMUTABLE_LIST__@@";
      var ListPrototype = List.prototype;
      ListPrototype[IS_LIST_SENTINEL] = true;
      ListPrototype[DELETE] = ListPrototype.remove;
      ListPrototype.setIn = MapPrototype.setIn;
      ListPrototype.deleteIn = ListPrototype.removeIn = MapPrototype.removeIn;
      ListPrototype.update = MapPrototype.update;
      ListPrototype.updateIn = MapPrototype.updateIn;
      ListPrototype.mergeIn = MapPrototype.mergeIn;
      ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
      ListPrototype.withMutations = MapPrototype.withMutations;
      ListPrototype.asMutable = MapPrototype.asMutable;
      ListPrototype.asImmutable = MapPrototype.asImmutable;
      ListPrototype.wasAltered = MapPrototype.wasAltered;
      function VNode(array, ownerID) {
        this.array = array;
        this.ownerID = ownerID;
      }
      VNode.prototype.removeBefore = function(ownerID, level, index) {
        if (index === level ? 1 << level : this.array.length === 0) {
          return this;
        }
        var originIndex = index >>> level & MASK;
        if (originIndex >= this.array.length) {
          return new VNode([], ownerID);
        }
        var removingFirst = originIndex === 0;
        var newChild;
        if (level > 0) {
          var oldChild = this.array[originIndex];
          newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
          if (newChild === oldChild && removingFirst) {
            return this;
          }
        }
        if (removingFirst && !newChild) {
          return this;
        }
        var editable = editableVNode(this, ownerID);
        if (!removingFirst) {
          for (var ii = 0; ii < originIndex; ii++) {
            editable.array[ii] = void 0;
          }
        }
        if (newChild) {
          editable.array[originIndex] = newChild;
        }
        return editable;
      };
      VNode.prototype.removeAfter = function(ownerID, level, index) {
        if (index === (level ? 1 << level : 0) || this.array.length === 0) {
          return this;
        }
        var sizeIndex = index - 1 >>> level & MASK;
        if (sizeIndex >= this.array.length) {
          return this;
        }
        var newChild;
        if (level > 0) {
          var oldChild = this.array[sizeIndex];
          newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
          if (newChild === oldChild && sizeIndex === this.array.length - 1) {
            return this;
          }
        }
        var editable = editableVNode(this, ownerID);
        editable.array.splice(sizeIndex + 1);
        if (newChild) {
          editable.array[sizeIndex] = newChild;
        }
        return editable;
      };
      var DONE = {};
      function iterateList(list, reverse) {
        var left = list._origin;
        var right = list._capacity;
        var tailPos = getTailOffset(right);
        var tail = list._tail;
        return iterateNodeOrLeaf(list._root, list._level, 0);
        function iterateNodeOrLeaf(node, level, offset) {
          return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
        }
        function iterateLeaf(node, offset) {
          var array = offset === tailPos ? tail && tail.array : node && node.array;
          var from = offset > left ? 0 : left - offset;
          var to = right - offset;
          if (to > SIZE) {
            to = SIZE;
          }
          return function() {
            if (from === to) {
              return DONE;
            }
            var idx = reverse ? --to : from++;
            return array && array[idx];
          };
        }
        function iterateNode(node, level, offset) {
          var values;
          var array = node && node.array;
          var from = offset > left ? 0 : left - offset >> level;
          var to = (right - offset >> level) + 1;
          if (to > SIZE) {
            to = SIZE;
          }
          return function() {
            do {
              if (values) {
                var value = values();
                if (value !== DONE) {
                  return value;
                }
                values = null;
              }
              if (from === to) {
                return DONE;
              }
              var idx = reverse ? --to : from++;
              values = iterateNodeOrLeaf(
                array && array[idx],
                level - SHIFT,
                offset + (idx << level)
              );
            } while (true);
          };
        }
      }
      function makeList(origin, capacity, level, root, tail, ownerID, hash2) {
        var list = Object.create(ListPrototype);
        list.size = capacity - origin;
        list._origin = origin;
        list._capacity = capacity;
        list._level = level;
        list._root = root;
        list._tail = tail;
        list.__ownerID = ownerID;
        list.__hash = hash2;
        list.__altered = false;
        return list;
      }
      var EMPTY_LIST;
      function emptyList() {
        return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
      }
      function updateList(list, index, value) {
        index = wrapIndex(list, index);
        if (index !== index) {
          return list;
        }
        if (index >= list.size || index < 0) {
          return list.withMutations(function(list2) {
            index < 0 ? setListBounds(list2, index).set(0, value) : setListBounds(list2, 0, index + 1).set(index, value);
          });
        }
        index += list._origin;
        var newTail = list._tail;
        var newRoot = list._root;
        var didAlter = MakeRef(DID_ALTER);
        if (index >= getTailOffset(list._capacity)) {
          newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
        } else {
          newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
        }
        if (!didAlter.value) {
          return list;
        }
        if (list.__ownerID) {
          list._root = newRoot;
          list._tail = newTail;
          list.__hash = void 0;
          list.__altered = true;
          return list;
        }
        return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
      }
      function updateVNode(node, ownerID, level, index, value, didAlter) {
        var idx = index >>> level & MASK;
        var nodeHas = node && idx < node.array.length;
        if (!nodeHas && value === void 0) {
          return node;
        }
        var newNode;
        if (level > 0) {
          var lowerNode = node && node.array[idx];
          var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
          if (newLowerNode === lowerNode) {
            return node;
          }
          newNode = editableVNode(node, ownerID);
          newNode.array[idx] = newLowerNode;
          return newNode;
        }
        if (nodeHas && node.array[idx] === value) {
          return node;
        }
        SetRef(didAlter);
        newNode = editableVNode(node, ownerID);
        if (value === void 0 && idx === newNode.array.length - 1) {
          newNode.array.pop();
        } else {
          newNode.array[idx] = value;
        }
        return newNode;
      }
      function editableVNode(node, ownerID) {
        if (ownerID && node && ownerID === node.ownerID) {
          return node;
        }
        return new VNode(node ? node.array.slice() : [], ownerID);
      }
      function listNodeFor(list, rawIndex) {
        if (rawIndex >= getTailOffset(list._capacity)) {
          return list._tail;
        }
        if (rawIndex < 1 << list._level + SHIFT) {
          var node = list._root;
          var level = list._level;
          while (node && level > 0) {
            node = node.array[rawIndex >>> level & MASK];
            level -= SHIFT;
          }
          return node;
        }
      }
      function setListBounds(list, begin, end) {
        if (begin !== void 0) {
          begin = begin | 0;
        }
        if (end !== void 0) {
          end = end | 0;
        }
        var owner = list.__ownerID || new OwnerID();
        var oldOrigin = list._origin;
        var oldCapacity = list._capacity;
        var newOrigin = oldOrigin + begin;
        var newCapacity = end === void 0 ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
        if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
          return list;
        }
        if (newOrigin >= newCapacity) {
          return list.clear();
        }
        var newLevel = list._level;
        var newRoot = list._root;
        var offsetShift = 0;
        while (newOrigin + offsetShift < 0) {
          newRoot = new VNode(newRoot && newRoot.array.length ? [void 0, newRoot] : [], owner);
          newLevel += SHIFT;
          offsetShift += 1 << newLevel;
        }
        if (offsetShift) {
          newOrigin += offsetShift;
          oldOrigin += offsetShift;
          newCapacity += offsetShift;
          oldCapacity += offsetShift;
        }
        var oldTailOffset = getTailOffset(oldCapacity);
        var newTailOffset = getTailOffset(newCapacity);
        while (newTailOffset >= 1 << newLevel + SHIFT) {
          newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
          newLevel += SHIFT;
        }
        var oldTail = list._tail;
        var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;
        if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
          newRoot = editableVNode(newRoot, owner);
          var node = newRoot;
          for (var level = newLevel; level > SHIFT; level -= SHIFT) {
            var idx = oldTailOffset >>> level & MASK;
            node = node.array[idx] = editableVNode(node.array[idx], owner);
          }
          node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
        }
        if (newCapacity < oldCapacity) {
          newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
        }
        if (newOrigin >= newTailOffset) {
          newOrigin -= newTailOffset;
          newCapacity -= newTailOffset;
          newLevel = SHIFT;
          newRoot = null;
          newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);
        } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
          offsetShift = 0;
          while (newRoot) {
            var beginIndex = newOrigin >>> newLevel & MASK;
            if (beginIndex !== newTailOffset >>> newLevel & MASK) {
              break;
            }
            if (beginIndex) {
              offsetShift += (1 << newLevel) * beginIndex;
            }
            newLevel -= SHIFT;
            newRoot = newRoot.array[beginIndex];
          }
          if (newRoot && newOrigin > oldOrigin) {
            newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
          }
          if (newRoot && newTailOffset < oldTailOffset) {
            newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
          }
          if (offsetShift) {
            newOrigin -= offsetShift;
            newCapacity -= offsetShift;
          }
        }
        if (list.__ownerID) {
          list.size = newCapacity - newOrigin;
          list._origin = newOrigin;
          list._capacity = newCapacity;
          list._level = newLevel;
          list._root = newRoot;
          list._tail = newTail;
          list.__hash = void 0;
          list.__altered = true;
          return list;
        }
        return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
      }
      function mergeIntoListWith(list, merger, iterables) {
        var iters = [];
        var maxSize = 0;
        for (var ii = 0; ii < iterables.length; ii++) {
          var value = iterables[ii];
          var iter = IndexedIterable(value);
          if (iter.size > maxSize) {
            maxSize = iter.size;
          }
          if (!isIterable(value)) {
            iter = iter.map(function(v) {
              return fromJS(v);
            });
          }
          iters.push(iter);
        }
        if (maxSize > list.size) {
          list = list.setSize(maxSize);
        }
        return mergeIntoCollectionWith(list, merger, iters);
      }
      function getTailOffset(size) {
        return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
      }
      createClass(OrderedMap, Map);
      function OrderedMap(value) {
        return value === null || value === void 0 ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function(map) {
          var iter = KeyedIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v, k) {
            return map.set(k, v);
          });
        });
      }
      OrderedMap.of = function() {
        return this(arguments);
      };
      OrderedMap.prototype.toString = function() {
        return this.__toString("OrderedMap {", "}");
      };
      OrderedMap.prototype.get = function(k, notSetValue) {
        var index = this._map.get(k);
        return index !== void 0 ? this._list.get(index)[1] : notSetValue;
      };
      OrderedMap.prototype.clear = function() {
        if (this.size === 0) {
          return this;
        }
        if (this.__ownerID) {
          this.size = 0;
          this._map.clear();
          this._list.clear();
          return this;
        }
        return emptyOrderedMap();
      };
      OrderedMap.prototype.set = function(k, v) {
        return updateOrderedMap(this, k, v);
      };
      OrderedMap.prototype.remove = function(k) {
        return updateOrderedMap(this, k, NOT_SET);
      };
      OrderedMap.prototype.wasAltered = function() {
        return this._map.wasAltered() || this._list.wasAltered();
      };
      OrderedMap.prototype.__iterate = function(fn, reverse) {
        var this$0 = this;
        return this._list.__iterate(
          function(entry) {
            return entry && fn(entry[1], entry[0], this$0);
          },
          reverse
        );
      };
      OrderedMap.prototype.__iterator = function(type, reverse) {
        return this._list.fromEntrySeq().__iterator(type, reverse);
      };
      OrderedMap.prototype.__ensureOwner = function(ownerID) {
        if (ownerID === this.__ownerID) {
          return this;
        }
        var newMap = this._map.__ensureOwner(ownerID);
        var newList = this._list.__ensureOwner(ownerID);
        if (!ownerID) {
          this.__ownerID = ownerID;
          this._map = newMap;
          this._list = newList;
          return this;
        }
        return makeOrderedMap(newMap, newList, ownerID, this.__hash);
      };
      function isOrderedMap(maybeOrderedMap) {
        return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
      }
      OrderedMap.isOrderedMap = isOrderedMap;
      OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
      OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;
      function makeOrderedMap(map, list, ownerID, hash2) {
        var omap = Object.create(OrderedMap.prototype);
        omap.size = map ? map.size : 0;
        omap._map = map;
        omap._list = list;
        omap.__ownerID = ownerID;
        omap.__hash = hash2;
        return omap;
      }
      var EMPTY_ORDERED_MAP;
      function emptyOrderedMap() {
        return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
      }
      function updateOrderedMap(omap, k, v) {
        var map = omap._map;
        var list = omap._list;
        var i = map.get(k);
        var has = i !== void 0;
        var newMap;
        var newList;
        if (v === NOT_SET) {
          if (!has) {
            return omap;
          }
          if (list.size >= SIZE && list.size >= map.size * 2) {
            newList = list.filter(function(entry, idx) {
              return entry !== void 0 && i !== idx;
            });
            newMap = newList.toKeyedSeq().map(function(entry) {
              return entry[0];
            }).flip().toMap();
            if (omap.__ownerID) {
              newMap.__ownerID = newList.__ownerID = omap.__ownerID;
            }
          } else {
            newMap = map.remove(k);
            newList = i === list.size - 1 ? list.pop() : list.set(i, void 0);
          }
        } else {
          if (has) {
            if (v === list.get(i)[1]) {
              return omap;
            }
            newMap = map;
            newList = list.set(i, [k, v]);
          } else {
            newMap = map.set(k, list.size);
            newList = list.set(list.size, [k, v]);
          }
        }
        if (omap.__ownerID) {
          omap.size = newMap.size;
          omap._map = newMap;
          omap._list = newList;
          omap.__hash = void 0;
          return omap;
        }
        return makeOrderedMap(newMap, newList);
      }
      createClass(ToKeyedSequence, KeyedSeq);
      function ToKeyedSequence(indexed, useKeys) {
        this._iter = indexed;
        this._useKeys = useKeys;
        this.size = indexed.size;
      }
      ToKeyedSequence.prototype.get = function(key, notSetValue) {
        return this._iter.get(key, notSetValue);
      };
      ToKeyedSequence.prototype.has = function(key) {
        return this._iter.has(key);
      };
      ToKeyedSequence.prototype.valueSeq = function() {
        return this._iter.valueSeq();
      };
      ToKeyedSequence.prototype.reverse = function() {
        var this$0 = this;
        var reversedSequence = reverseFactory(this, true);
        if (!this._useKeys) {
          reversedSequence.valueSeq = function() {
            return this$0._iter.toSeq().reverse();
          };
        }
        return reversedSequence;
      };
      ToKeyedSequence.prototype.map = function(mapper, context) {
        var this$0 = this;
        var mappedSequence = mapFactory(this, mapper, context);
        if (!this._useKeys) {
          mappedSequence.valueSeq = function() {
            return this$0._iter.toSeq().map(mapper, context);
          };
        }
        return mappedSequence;
      };
      ToKeyedSequence.prototype.__iterate = function(fn, reverse) {
        var this$0 = this;
        var ii;
        return this._iter.__iterate(
          this._useKeys ? function(v, k) {
            return fn(v, k, this$0);
          } : (ii = reverse ? resolveSize(this) : 0, function(v) {
            return fn(v, reverse ? --ii : ii++, this$0);
          }),
          reverse
        );
      };
      ToKeyedSequence.prototype.__iterator = function(type, reverse) {
        if (this._useKeys) {
          return this._iter.__iterator(type, reverse);
        }
        var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
        var ii = reverse ? resolveSize(this) : 0;
        return new Iterator(function() {
          var step = iterator.next();
          return step.done ? step : iteratorValue(type, reverse ? --ii : ii++, step.value, step);
        });
      };
      ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;
      createClass(ToIndexedSequence, IndexedSeq);
      function ToIndexedSequence(iter) {
        this._iter = iter;
        this.size = iter.size;
      }
      ToIndexedSequence.prototype.includes = function(value) {
        return this._iter.includes(value);
      };
      ToIndexedSequence.prototype.__iterate = function(fn, reverse) {
        var this$0 = this;
        var iterations = 0;
        return this._iter.__iterate(function(v) {
          return fn(v, iterations++, this$0);
        }, reverse);
      };
      ToIndexedSequence.prototype.__iterator = function(type, reverse) {
        var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
        var iterations = 0;
        return new Iterator(function() {
          var step = iterator.next();
          return step.done ? step : iteratorValue(type, iterations++, step.value, step);
        });
      };
      createClass(ToSetSequence, SetSeq);
      function ToSetSequence(iter) {
        this._iter = iter;
        this.size = iter.size;
      }
      ToSetSequence.prototype.has = function(key) {
        return this._iter.includes(key);
      };
      ToSetSequence.prototype.__iterate = function(fn, reverse) {
        var this$0 = this;
        return this._iter.__iterate(function(v) {
          return fn(v, v, this$0);
        }, reverse);
      };
      ToSetSequence.prototype.__iterator = function(type, reverse) {
        var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
        return new Iterator(function() {
          var step = iterator.next();
          return step.done ? step : iteratorValue(type, step.value, step.value, step);
        });
      };
      createClass(FromEntriesSequence, KeyedSeq);
      function FromEntriesSequence(entries) {
        this._iter = entries;
        this.size = entries.size;
      }
      FromEntriesSequence.prototype.entrySeq = function() {
        return this._iter.toSeq();
      };
      FromEntriesSequence.prototype.__iterate = function(fn, reverse) {
        var this$0 = this;
        return this._iter.__iterate(function(entry) {
          if (entry) {
            validateEntry(entry);
            var indexedIterable = isIterable(entry);
            return fn(
              indexedIterable ? entry.get(1) : entry[1],
              indexedIterable ? entry.get(0) : entry[0],
              this$0
            );
          }
        }, reverse);
      };
      FromEntriesSequence.prototype.__iterator = function(type, reverse) {
        var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
        return new Iterator(function() {
          while (true) {
            var step = iterator.next();
            if (step.done) {
              return step;
            }
            var entry = step.value;
            if (entry) {
              validateEntry(entry);
              var indexedIterable = isIterable(entry);
              return iteratorValue(
                type,
                indexedIterable ? entry.get(0) : entry[0],
                indexedIterable ? entry.get(1) : entry[1],
                step
              );
            }
          }
        });
      };
      ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;
      function flipFactory(iterable) {
        var flipSequence = makeSequence(iterable);
        flipSequence._iter = iterable;
        flipSequence.size = iterable.size;
        flipSequence.flip = function() {
          return iterable;
        };
        flipSequence.reverse = function() {
          var reversedSequence = iterable.reverse.apply(this);
          reversedSequence.flip = function() {
            return iterable.reverse();
          };
          return reversedSequence;
        };
        flipSequence.has = function(key) {
          return iterable.includes(key);
        };
        flipSequence.includes = function(key) {
          return iterable.has(key);
        };
        flipSequence.cacheResult = cacheResultThrough;
        flipSequence.__iterateUncached = function(fn, reverse) {
          var this$0 = this;
          return iterable.__iterate(function(v, k) {
            return fn(k, v, this$0) !== false;
          }, reverse);
        };
        flipSequence.__iteratorUncached = function(type, reverse) {
          if (type === ITERATE_ENTRIES) {
            var iterator = iterable.__iterator(type, reverse);
            return new Iterator(function() {
              var step = iterator.next();
              if (!step.done) {
                var k = step.value[0];
                step.value[0] = step.value[1];
                step.value[1] = k;
              }
              return step;
            });
          }
          return iterable.__iterator(
            type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
            reverse
          );
        };
        return flipSequence;
      }
      function mapFactory(iterable, mapper, context) {
        var mappedSequence = makeSequence(iterable);
        mappedSequence.size = iterable.size;
        mappedSequence.has = function(key) {
          return iterable.has(key);
        };
        mappedSequence.get = function(key, notSetValue) {
          var v = iterable.get(key, NOT_SET);
          return v === NOT_SET ? notSetValue : mapper.call(context, v, key, iterable);
        };
        mappedSequence.__iterateUncached = function(fn, reverse) {
          var this$0 = this;
          return iterable.__iterate(
            function(v, k, c) {
              return fn(mapper.call(context, v, k, c), k, this$0) !== false;
            },
            reverse
          );
        };
        mappedSequence.__iteratorUncached = function(type, reverse) {
          var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
          return new Iterator(function() {
            var step = iterator.next();
            if (step.done) {
              return step;
            }
            var entry = step.value;
            var key = entry[0];
            return iteratorValue(
              type,
              key,
              mapper.call(context, entry[1], key, iterable),
              step
            );
          });
        };
        return mappedSequence;
      }
      function reverseFactory(iterable, useKeys) {
        var reversedSequence = makeSequence(iterable);
        reversedSequence._iter = iterable;
        reversedSequence.size = iterable.size;
        reversedSequence.reverse = function() {
          return iterable;
        };
        if (iterable.flip) {
          reversedSequence.flip = function() {
            var flipSequence = flipFactory(iterable);
            flipSequence.reverse = function() {
              return iterable.flip();
            };
            return flipSequence;
          };
        }
        reversedSequence.get = function(key, notSetValue) {
          return iterable.get(useKeys ? key : -1 - key, notSetValue);
        };
        reversedSequence.has = function(key) {
          return iterable.has(useKeys ? key : -1 - key);
        };
        reversedSequence.includes = function(value) {
          return iterable.includes(value);
        };
        reversedSequence.cacheResult = cacheResultThrough;
        reversedSequence.__iterate = function(fn, reverse) {
          var this$0 = this;
          return iterable.__iterate(function(v, k) {
            return fn(v, k, this$0);
          }, !reverse);
        };
        reversedSequence.__iterator = function(type, reverse) {
          return iterable.__iterator(type, !reverse);
        };
        return reversedSequence;
      }
      function filterFactory(iterable, predicate, context, useKeys) {
        var filterSequence = makeSequence(iterable);
        if (useKeys) {
          filterSequence.has = function(key) {
            var v = iterable.get(key, NOT_SET);
            return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
          };
          filterSequence.get = function(key, notSetValue) {
            var v = iterable.get(key, NOT_SET);
            return v !== NOT_SET && predicate.call(context, v, key, iterable) ? v : notSetValue;
          };
        }
        filterSequence.__iterateUncached = function(fn, reverse) {
          var this$0 = this;
          var iterations = 0;
          iterable.__iterate(function(v, k, c) {
            if (predicate.call(context, v, k, c)) {
              iterations++;
              return fn(v, useKeys ? k : iterations - 1, this$0);
            }
          }, reverse);
          return iterations;
        };
        filterSequence.__iteratorUncached = function(type, reverse) {
          var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
          var iterations = 0;
          return new Iterator(function() {
            while (true) {
              var step = iterator.next();
              if (step.done) {
                return step;
              }
              var entry = step.value;
              var key = entry[0];
              var value = entry[1];
              if (predicate.call(context, value, key, iterable)) {
                return iteratorValue(type, useKeys ? key : iterations++, value, step);
              }
            }
          });
        };
        return filterSequence;
      }
      function countByFactory(iterable, grouper, context) {
        var groups = Map().asMutable();
        iterable.__iterate(function(v, k) {
          groups.update(
            grouper.call(context, v, k, iterable),
            0,
            function(a) {
              return a + 1;
            }
          );
        });
        return groups.asImmutable();
      }
      function groupByFactory(iterable, grouper, context) {
        var isKeyedIter = isKeyed(iterable);
        var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
        iterable.__iterate(function(v, k) {
          groups.update(
            grouper.call(context, v, k, iterable),
            function(a) {
              return a = a || [], a.push(isKeyedIter ? [k, v] : v), a;
            }
          );
        });
        var coerce = iterableClass(iterable);
        return groups.map(function(arr) {
          return reify(iterable, coerce(arr));
        });
      }
      function sliceFactory(iterable, begin, end, useKeys) {
        var originalSize = iterable.size;
        if (begin !== void 0) {
          begin = begin | 0;
        }
        if (end !== void 0) {
          end = end | 0;
        }
        if (wholeSlice(begin, end, originalSize)) {
          return iterable;
        }
        var resolvedBegin = resolveBegin(begin, originalSize);
        var resolvedEnd = resolveEnd(end, originalSize);
        if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
          return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
        }
        var resolvedSize = resolvedEnd - resolvedBegin;
        var sliceSize;
        if (resolvedSize === resolvedSize) {
          sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
        }
        var sliceSeq = makeSequence(iterable);
        sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || void 0;
        if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
          sliceSeq.get = function(index, notSetValue) {
            index = wrapIndex(this, index);
            return index >= 0 && index < sliceSize ? iterable.get(index + resolvedBegin, notSetValue) : notSetValue;
          };
        }
        sliceSeq.__iterateUncached = function(fn, reverse) {
          var this$0 = this;
          if (sliceSize === 0) {
            return 0;
          }
          if (reverse) {
            return this.cacheResult().__iterate(fn, reverse);
          }
          var skipped = 0;
          var isSkipping = true;
          var iterations = 0;
          iterable.__iterate(function(v, k) {
            if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
              iterations++;
              return fn(v, useKeys ? k : iterations - 1, this$0) !== false && iterations !== sliceSize;
            }
          });
          return iterations;
        };
        sliceSeq.__iteratorUncached = function(type, reverse) {
          if (sliceSize !== 0 && reverse) {
            return this.cacheResult().__iterator(type, reverse);
          }
          var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
          var skipped = 0;
          var iterations = 0;
          return new Iterator(function() {
            while (skipped++ < resolvedBegin) {
              iterator.next();
            }
            if (++iterations > sliceSize) {
              return iteratorDone();
            }
            var step = iterator.next();
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            } else if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations - 1, void 0, step);
            } else {
              return iteratorValue(type, iterations - 1, step.value[1], step);
            }
          });
        };
        return sliceSeq;
      }
      function takeWhileFactory(iterable, predicate, context) {
        var takeSequence = makeSequence(iterable);
        takeSequence.__iterateUncached = function(fn, reverse) {
          var this$0 = this;
          if (reverse) {
            return this.cacheResult().__iterate(fn, reverse);
          }
          var iterations = 0;
          iterable.__iterate(
            function(v, k, c) {
              return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0);
            }
          );
          return iterations;
        };
        takeSequence.__iteratorUncached = function(type, reverse) {
          var this$0 = this;
          if (reverse) {
            return this.cacheResult().__iterator(type, reverse);
          }
          var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
          var iterating = true;
          return new Iterator(function() {
            if (!iterating) {
              return iteratorDone();
            }
            var step = iterator.next();
            if (step.done) {
              return step;
            }
            var entry = step.value;
            var k = entry[0];
            var v = entry[1];
            if (!predicate.call(context, v, k, this$0)) {
              iterating = false;
              return iteratorDone();
            }
            return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
          });
        };
        return takeSequence;
      }
      function skipWhileFactory(iterable, predicate, context, useKeys) {
        var skipSequence = makeSequence(iterable);
        skipSequence.__iterateUncached = function(fn, reverse) {
          var this$0 = this;
          if (reverse) {
            return this.cacheResult().__iterate(fn, reverse);
          }
          var isSkipping = true;
          var iterations = 0;
          iterable.__iterate(function(v, k, c) {
            if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
              iterations++;
              return fn(v, useKeys ? k : iterations - 1, this$0);
            }
          });
          return iterations;
        };
        skipSequence.__iteratorUncached = function(type, reverse) {
          var this$0 = this;
          if (reverse) {
            return this.cacheResult().__iterator(type, reverse);
          }
          var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
          var skipping = true;
          var iterations = 0;
          return new Iterator(function() {
            var step, k, v;
            do {
              step = iterator.next();
              if (step.done) {
                if (useKeys || type === ITERATE_VALUES) {
                  return step;
                } else if (type === ITERATE_KEYS) {
                  return iteratorValue(type, iterations++, void 0, step);
                } else {
                  return iteratorValue(type, iterations++, step.value[1], step);
                }
              }
              var entry = step.value;
              k = entry[0];
              v = entry[1];
              skipping && (skipping = predicate.call(context, v, k, this$0));
            } while (skipping);
            return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
          });
        };
        return skipSequence;
      }
      function concatFactory(iterable, values) {
        var isKeyedIterable = isKeyed(iterable);
        var iters = [iterable].concat(values).map(function(v) {
          if (!isIterable(v)) {
            v = isKeyedIterable ? keyedSeqFromValue(v) : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
          } else if (isKeyedIterable) {
            v = KeyedIterable(v);
          }
          return v;
        }).filter(function(v) {
          return v.size !== 0;
        });
        if (iters.length === 0) {
          return iterable;
        }
        if (iters.length === 1) {
          var singleton = iters[0];
          if (singleton === iterable || isKeyedIterable && isKeyed(singleton) || isIndexed(iterable) && isIndexed(singleton)) {
            return singleton;
          }
        }
        var concatSeq = new ArraySeq(iters);
        if (isKeyedIterable) {
          concatSeq = concatSeq.toKeyedSeq();
        } else if (!isIndexed(iterable)) {
          concatSeq = concatSeq.toSetSeq();
        }
        concatSeq = concatSeq.flatten(true);
        concatSeq.size = iters.reduce(
          function(sum, seq) {
            if (sum !== void 0) {
              var size = seq.size;
              if (size !== void 0) {
                return sum + size;
              }
            }
          },
          0
        );
        return concatSeq;
      }
      function flattenFactory(iterable, depth, useKeys) {
        var flatSequence = makeSequence(iterable);
        flatSequence.__iterateUncached = function(fn, reverse) {
          var iterations = 0;
          var stopped = false;
          function flatDeep(iter, currentDepth) {
            var this$0 = this;
            iter.__iterate(function(v, k) {
              if ((!depth || currentDepth < depth) && isIterable(v)) {
                flatDeep(v, currentDepth + 1);
              } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
                stopped = true;
              }
              return !stopped;
            }, reverse);
          }
          flatDeep(iterable, 0);
          return iterations;
        };
        flatSequence.__iteratorUncached = function(type, reverse) {
          var iterator = iterable.__iterator(type, reverse);
          var stack = [];
          var iterations = 0;
          return new Iterator(function() {
            while (iterator) {
              var step = iterator.next();
              if (step.done !== false) {
                iterator = stack.pop();
                continue;
              }
              var v = step.value;
              if (type === ITERATE_ENTRIES) {
                v = v[1];
              }
              if ((!depth || stack.length < depth) && isIterable(v)) {
                stack.push(iterator);
                iterator = v.__iterator(type, reverse);
              } else {
                return useKeys ? step : iteratorValue(type, iterations++, v, step);
              }
            }
            return iteratorDone();
          });
        };
        return flatSequence;
      }
      function flatMapFactory(iterable, mapper, context) {
        var coerce = iterableClass(iterable);
        return iterable.toSeq().map(
          function(v, k) {
            return coerce(mapper.call(context, v, k, iterable));
          }
        ).flatten(true);
      }
      function interposeFactory(iterable, separator) {
        var interposedSequence = makeSequence(iterable);
        interposedSequence.size = iterable.size && iterable.size * 2 - 1;
        interposedSequence.__iterateUncached = function(fn, reverse) {
          var this$0 = this;
          var iterations = 0;
          iterable.__iterate(
            function(v, k) {
              return (!iterations || fn(separator, iterations++, this$0) !== false) && fn(v, iterations++, this$0) !== false;
            },
            reverse
          );
          return iterations;
        };
        interposedSequence.__iteratorUncached = function(type, reverse) {
          var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
          var iterations = 0;
          var step;
          return new Iterator(function() {
            if (!step || iterations % 2) {
              step = iterator.next();
              if (step.done) {
                return step;
              }
            }
            return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
          });
        };
        return interposedSequence;
      }
      function sortFactory(iterable, comparator, mapper) {
        if (!comparator) {
          comparator = defaultComparator;
        }
        var isKeyedIterable = isKeyed(iterable);
        var index = 0;
        var entries = iterable.toSeq().map(
          function(v, k) {
            return [k, v, index++, mapper ? mapper(v, k, iterable) : v];
          }
        ).toArray();
        entries.sort(function(a, b) {
          return comparator(a[3], b[3]) || a[2] - b[2];
        }).forEach(
          isKeyedIterable ? function(v, i) {
            entries[i].length = 2;
          } : function(v, i) {
            entries[i] = v[1];
          }
        );
        return isKeyedIterable ? KeyedSeq(entries) : isIndexed(iterable) ? IndexedSeq(entries) : SetSeq(entries);
      }
      function maxFactory(iterable, comparator, mapper) {
        if (!comparator) {
          comparator = defaultComparator;
        }
        if (mapper) {
          var entry = iterable.toSeq().map(function(v, k) {
            return [v, mapper(v, k, iterable)];
          }).reduce(function(a, b) {
            return maxCompare(comparator, a[1], b[1]) ? b : a;
          });
          return entry && entry[0];
        } else {
          return iterable.reduce(function(a, b) {
            return maxCompare(comparator, a, b) ? b : a;
          });
        }
      }
      function maxCompare(comparator, a, b) {
        var comp = comparator(b, a);
        return comp === 0 && b !== a && (b === void 0 || b === null || b !== b) || comp > 0;
      }
      function zipWithFactory(keyIter, zipper, iters) {
        var zipSequence = makeSequence(keyIter);
        zipSequence.size = new ArraySeq(iters).map(function(i) {
          return i.size;
        }).min();
        zipSequence.__iterate = function(fn, reverse) {
          var iterator = this.__iterator(ITERATE_VALUES, reverse);
          var step;
          var iterations = 0;
          while (!(step = iterator.next()).done) {
            if (fn(step.value, iterations++, this) === false) {
              break;
            }
          }
          return iterations;
        };
        zipSequence.__iteratorUncached = function(type, reverse) {
          var iterators = iters.map(
            function(i) {
              return i = Iterable(i), getIterator(reverse ? i.reverse() : i);
            }
          );
          var iterations = 0;
          var isDone = false;
          return new Iterator(function() {
            var steps;
            if (!isDone) {
              steps = iterators.map(function(i) {
                return i.next();
              });
              isDone = steps.some(function(s) {
                return s.done;
              });
            }
            if (isDone) {
              return iteratorDone();
            }
            return iteratorValue(
              type,
              iterations++,
              zipper.apply(null, steps.map(function(s) {
                return s.value;
              }))
            );
          });
        };
        return zipSequence;
      }
      function reify(iter, seq) {
        return isSeq(iter) ? seq : iter.constructor(seq);
      }
      function validateEntry(entry) {
        if (entry !== Object(entry)) {
          throw new TypeError("Expected [K, V] tuple: " + entry);
        }
      }
      function resolveSize(iter) {
        assertNotInfinite(iter.size);
        return ensureSize(iter);
      }
      function iterableClass(iterable) {
        return isKeyed(iterable) ? KeyedIterable : isIndexed(iterable) ? IndexedIterable : SetIterable;
      }
      function makeSequence(iterable) {
        return Object.create(
          (isKeyed(iterable) ? KeyedSeq : isIndexed(iterable) ? IndexedSeq : SetSeq).prototype
        );
      }
      function cacheResultThrough() {
        if (this._iter.cacheResult) {
          this._iter.cacheResult();
          this.size = this._iter.size;
          return this;
        } else {
          return Seq.prototype.cacheResult.call(this);
        }
      }
      function defaultComparator(a, b) {
        return a > b ? 1 : a < b ? -1 : 0;
      }
      function forceIterator(keyPath) {
        var iter = getIterator(keyPath);
        if (!iter) {
          if (!isArrayLike(keyPath)) {
            throw new TypeError("Expected iterable or array-like: " + keyPath);
          }
          iter = getIterator(Iterable(keyPath));
        }
        return iter;
      }
      createClass(Record, KeyedCollection);
      function Record(defaultValues, name) {
        var hasInitialized;
        var RecordType = function Record2(values) {
          if (values instanceof RecordType) {
            return values;
          }
          if (!(this instanceof RecordType)) {
            return new RecordType(values);
          }
          if (!hasInitialized) {
            hasInitialized = true;
            var keys = Object.keys(defaultValues);
            setProps(RecordTypePrototype, keys);
            RecordTypePrototype.size = keys.length;
            RecordTypePrototype._name = name;
            RecordTypePrototype._keys = keys;
            RecordTypePrototype._defaultValues = defaultValues;
          }
          this._map = Map(values);
        };
        var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
        RecordTypePrototype.constructor = RecordType;
        return RecordType;
      }
      Record.prototype.toString = function() {
        return this.__toString(recordName(this) + " {", "}");
      };
      Record.prototype.has = function(k) {
        return this._defaultValues.hasOwnProperty(k);
      };
      Record.prototype.get = function(k, notSetValue) {
        if (!this.has(k)) {
          return notSetValue;
        }
        var defaultVal = this._defaultValues[k];
        return this._map ? this._map.get(k, defaultVal) : defaultVal;
      };
      Record.prototype.clear = function() {
        if (this.__ownerID) {
          this._map && this._map.clear();
          return this;
        }
        var RecordType = this.constructor;
        return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
      };
      Record.prototype.set = function(k, v) {
        if (!this.has(k)) {
          throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
        }
        var newMap = this._map && this._map.set(k, v);
        if (this.__ownerID || newMap === this._map) {
          return this;
        }
        return makeRecord(this, newMap);
      };
      Record.prototype.remove = function(k) {
        if (!this.has(k)) {
          return this;
        }
        var newMap = this._map && this._map.remove(k);
        if (this.__ownerID || newMap === this._map) {
          return this;
        }
        return makeRecord(this, newMap);
      };
      Record.prototype.wasAltered = function() {
        return this._map.wasAltered();
      };
      Record.prototype.__iterator = function(type, reverse) {
        var this$0 = this;
        return KeyedIterable(this._defaultValues).map(function(_, k) {
          return this$0.get(k);
        }).__iterator(type, reverse);
      };
      Record.prototype.__iterate = function(fn, reverse) {
        var this$0 = this;
        return KeyedIterable(this._defaultValues).map(function(_, k) {
          return this$0.get(k);
        }).__iterate(fn, reverse);
      };
      Record.prototype.__ensureOwner = function(ownerID) {
        if (ownerID === this.__ownerID) {
          return this;
        }
        var newMap = this._map && this._map.__ensureOwner(ownerID);
        if (!ownerID) {
          this.__ownerID = ownerID;
          this._map = newMap;
          return this;
        }
        return makeRecord(this, newMap, ownerID);
      };
      var RecordPrototype = Record.prototype;
      RecordPrototype[DELETE] = RecordPrototype.remove;
      RecordPrototype.deleteIn = RecordPrototype.removeIn = MapPrototype.removeIn;
      RecordPrototype.merge = MapPrototype.merge;
      RecordPrototype.mergeWith = MapPrototype.mergeWith;
      RecordPrototype.mergeIn = MapPrototype.mergeIn;
      RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
      RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
      RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
      RecordPrototype.setIn = MapPrototype.setIn;
      RecordPrototype.update = MapPrototype.update;
      RecordPrototype.updateIn = MapPrototype.updateIn;
      RecordPrototype.withMutations = MapPrototype.withMutations;
      RecordPrototype.asMutable = MapPrototype.asMutable;
      RecordPrototype.asImmutable = MapPrototype.asImmutable;
      function makeRecord(likeRecord, map, ownerID) {
        var record = Object.create(Object.getPrototypeOf(likeRecord));
        record._map = map;
        record.__ownerID = ownerID;
        return record;
      }
      function recordName(record) {
        return record._name || record.constructor.name || "Record";
      }
      function setProps(prototype, names) {
        try {
          names.forEach(setProp.bind(void 0, prototype));
        } catch (error) {
        }
      }
      function setProp(prototype, name) {
        Object.defineProperty(prototype, name, {
          get: function() {
            return this.get(name);
          },
          set: function(value) {
            invariant(this.__ownerID, "Cannot set on an immutable record.");
            this.set(name, value);
          }
        });
      }
      createClass(Set, SetCollection);
      function Set(value) {
        return value === null || value === void 0 ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function(set) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v) {
            return set.add(v);
          });
        });
      }
      Set.of = function() {
        return this(arguments);
      };
      Set.fromKeys = function(value) {
        return this(KeyedIterable(value).keySeq());
      };
      Set.prototype.toString = function() {
        return this.__toString("Set {", "}");
      };
      Set.prototype.has = function(value) {
        return this._map.has(value);
      };
      Set.prototype.add = function(value) {
        return updateSet(this, this._map.set(value, true));
      };
      Set.prototype.remove = function(value) {
        return updateSet(this, this._map.remove(value));
      };
      Set.prototype.clear = function() {
        return updateSet(this, this._map.clear());
      };
      Set.prototype.union = function() {
        var iters = SLICE$0.call(arguments, 0);
        iters = iters.filter(function(x) {
          return x.size !== 0;
        });
        if (iters.length === 0) {
          return this;
        }
        if (this.size === 0 && !this.__ownerID && iters.length === 1) {
          return this.constructor(iters[0]);
        }
        return this.withMutations(function(set) {
          for (var ii = 0; ii < iters.length; ii++) {
            SetIterable(iters[ii]).forEach(function(value) {
              return set.add(value);
            });
          }
        });
      };
      Set.prototype.intersect = function() {
        var iters = SLICE$0.call(arguments, 0);
        if (iters.length === 0) {
          return this;
        }
        iters = iters.map(function(iter) {
          return SetIterable(iter);
        });
        var originalSet = this;
        return this.withMutations(function(set) {
          originalSet.forEach(function(value) {
            if (!iters.every(function(iter) {
              return iter.includes(value);
            })) {
              set.remove(value);
            }
          });
        });
      };
      Set.prototype.subtract = function() {
        var iters = SLICE$0.call(arguments, 0);
        if (iters.length === 0) {
          return this;
        }
        iters = iters.map(function(iter) {
          return SetIterable(iter);
        });
        var originalSet = this;
        return this.withMutations(function(set) {
          originalSet.forEach(function(value) {
            if (iters.some(function(iter) {
              return iter.includes(value);
            })) {
              set.remove(value);
            }
          });
        });
      };
      Set.prototype.merge = function() {
        return this.union.apply(this, arguments);
      };
      Set.prototype.mergeWith = function(merger) {
        var iters = SLICE$0.call(arguments, 1);
        return this.union.apply(this, iters);
      };
      Set.prototype.sort = function(comparator) {
        return OrderedSet(sortFactory(this, comparator));
      };
      Set.prototype.sortBy = function(mapper, comparator) {
        return OrderedSet(sortFactory(this, comparator, mapper));
      };
      Set.prototype.wasAltered = function() {
        return this._map.wasAltered();
      };
      Set.prototype.__iterate = function(fn, reverse) {
        var this$0 = this;
        return this._map.__iterate(function(_, k) {
          return fn(k, k, this$0);
        }, reverse);
      };
      Set.prototype.__iterator = function(type, reverse) {
        return this._map.map(function(_, k) {
          return k;
        }).__iterator(type, reverse);
      };
      Set.prototype.__ensureOwner = function(ownerID) {
        if (ownerID === this.__ownerID) {
          return this;
        }
        var newMap = this._map.__ensureOwner(ownerID);
        if (!ownerID) {
          this.__ownerID = ownerID;
          this._map = newMap;
          return this;
        }
        return this.__make(newMap, ownerID);
      };
      function isSet(maybeSet) {
        return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
      }
      Set.isSet = isSet;
      var IS_SET_SENTINEL = "@@__IMMUTABLE_SET__@@";
      var SetPrototype = Set.prototype;
      SetPrototype[IS_SET_SENTINEL] = true;
      SetPrototype[DELETE] = SetPrototype.remove;
      SetPrototype.mergeDeep = SetPrototype.merge;
      SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
      SetPrototype.withMutations = MapPrototype.withMutations;
      SetPrototype.asMutable = MapPrototype.asMutable;
      SetPrototype.asImmutable = MapPrototype.asImmutable;
      SetPrototype.__empty = emptySet;
      SetPrototype.__make = makeSet;
      function updateSet(set, newMap) {
        if (set.__ownerID) {
          set.size = newMap.size;
          set._map = newMap;
          return set;
        }
        return newMap === set._map ? set : newMap.size === 0 ? set.__empty() : set.__make(newMap);
      }
      function makeSet(map, ownerID) {
        var set = Object.create(SetPrototype);
        set.size = map ? map.size : 0;
        set._map = map;
        set.__ownerID = ownerID;
        return set;
      }
      var EMPTY_SET;
      function emptySet() {
        return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
      }
      createClass(OrderedSet, Set);
      function OrderedSet(value) {
        return value === null || value === void 0 ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function(set) {
          var iter = SetIterable(value);
          assertNotInfinite(iter.size);
          iter.forEach(function(v) {
            return set.add(v);
          });
        });
      }
      OrderedSet.of = function() {
        return this(arguments);
      };
      OrderedSet.fromKeys = function(value) {
        return this(KeyedIterable(value).keySeq());
      };
      OrderedSet.prototype.toString = function() {
        return this.__toString("OrderedSet {", "}");
      };
      function isOrderedSet(maybeOrderedSet) {
        return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
      }
      OrderedSet.isOrderedSet = isOrderedSet;
      var OrderedSetPrototype = OrderedSet.prototype;
      OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;
      OrderedSetPrototype.__empty = emptyOrderedSet;
      OrderedSetPrototype.__make = makeOrderedSet;
      function makeOrderedSet(map, ownerID) {
        var set = Object.create(OrderedSetPrototype);
        set.size = map ? map.size : 0;
        set._map = map;
        set.__ownerID = ownerID;
        return set;
      }
      var EMPTY_ORDERED_SET;
      function emptyOrderedSet() {
        return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
      }
      createClass(Stack, IndexedCollection);
      function Stack(value) {
        return value === null || value === void 0 ? emptyStack() : isStack(value) ? value : emptyStack().unshiftAll(value);
      }
      Stack.of = function() {
        return this(arguments);
      };
      Stack.prototype.toString = function() {
        return this.__toString("Stack [", "]");
      };
      Stack.prototype.get = function(index, notSetValue) {
        var head = this._head;
        index = wrapIndex(this, index);
        while (head && index--) {
          head = head.next;
        }
        return head ? head.value : notSetValue;
      };
      Stack.prototype.peek = function() {
        return this._head && this._head.value;
      };
      Stack.prototype.push = function() {
        if (arguments.length === 0) {
          return this;
        }
        var newSize = this.size + arguments.length;
        var head = this._head;
        for (var ii = arguments.length - 1; ii >= 0; ii--) {
          head = {
            value: arguments[ii],
            next: head
          };
        }
        if (this.__ownerID) {
          this.size = newSize;
          this._head = head;
          this.__hash = void 0;
          this.__altered = true;
          return this;
        }
        return makeStack(newSize, head);
      };
      Stack.prototype.pushAll = function(iter) {
        iter = IndexedIterable(iter);
        if (iter.size === 0) {
          return this;
        }
        assertNotInfinite(iter.size);
        var newSize = this.size;
        var head = this._head;
        iter.reverse().forEach(function(value) {
          newSize++;
          head = {
            value,
            next: head
          };
        });
        if (this.__ownerID) {
          this.size = newSize;
          this._head = head;
          this.__hash = void 0;
          this.__altered = true;
          return this;
        }
        return makeStack(newSize, head);
      };
      Stack.prototype.pop = function() {
        return this.slice(1);
      };
      Stack.prototype.unshift = function() {
        return this.push.apply(this, arguments);
      };
      Stack.prototype.unshiftAll = function(iter) {
        return this.pushAll(iter);
      };
      Stack.prototype.shift = function() {
        return this.pop.apply(this, arguments);
      };
      Stack.prototype.clear = function() {
        if (this.size === 0) {
          return this;
        }
        if (this.__ownerID) {
          this.size = 0;
          this._head = void 0;
          this.__hash = void 0;
          this.__altered = true;
          return this;
        }
        return emptyStack();
      };
      Stack.prototype.slice = function(begin, end) {
        if (wholeSlice(begin, end, this.size)) {
          return this;
        }
        var resolvedBegin = resolveBegin(begin, this.size);
        var resolvedEnd = resolveEnd(end, this.size);
        if (resolvedEnd !== this.size) {
          return IndexedCollection.prototype.slice.call(this, begin, end);
        }
        var newSize = this.size - resolvedBegin;
        var head = this._head;
        while (resolvedBegin--) {
          head = head.next;
        }
        if (this.__ownerID) {
          this.size = newSize;
          this._head = head;
          this.__hash = void 0;
          this.__altered = true;
          return this;
        }
        return makeStack(newSize, head);
      };
      Stack.prototype.__ensureOwner = function(ownerID) {
        if (ownerID === this.__ownerID) {
          return this;
        }
        if (!ownerID) {
          this.__ownerID = ownerID;
          this.__altered = false;
          return this;
        }
        return makeStack(this.size, this._head, ownerID, this.__hash);
      };
      Stack.prototype.__iterate = function(fn, reverse) {
        if (reverse) {
          return this.reverse().__iterate(fn);
        }
        var iterations = 0;
        var node = this._head;
        while (node) {
          if (fn(node.value, iterations++, this) === false) {
            break;
          }
          node = node.next;
        }
        return iterations;
      };
      Stack.prototype.__iterator = function(type, reverse) {
        if (reverse) {
          return this.reverse().__iterator(type);
        }
        var iterations = 0;
        var node = this._head;
        return new Iterator(function() {
          if (node) {
            var value = node.value;
            node = node.next;
            return iteratorValue(type, iterations++, value);
          }
          return iteratorDone();
        });
      };
      function isStack(maybeStack) {
        return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
      }
      Stack.isStack = isStack;
      var IS_STACK_SENTINEL = "@@__IMMUTABLE_STACK__@@";
      var StackPrototype = Stack.prototype;
      StackPrototype[IS_STACK_SENTINEL] = true;
      StackPrototype.withMutations = MapPrototype.withMutations;
      StackPrototype.asMutable = MapPrototype.asMutable;
      StackPrototype.asImmutable = MapPrototype.asImmutable;
      StackPrototype.wasAltered = MapPrototype.wasAltered;
      function makeStack(size, head, ownerID, hash2) {
        var map = Object.create(StackPrototype);
        map.size = size;
        map._head = head;
        map.__ownerID = ownerID;
        map.__hash = hash2;
        map.__altered = false;
        return map;
      }
      var EMPTY_STACK;
      function emptyStack() {
        return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
      }
      function mixin(ctor, methods) {
        var keyCopier = function(key) {
          ctor.prototype[key] = methods[key];
        };
        Object.keys(methods).forEach(keyCopier);
        Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
        return ctor;
      }
      Iterable.Iterator = Iterator;
      mixin(Iterable, {
        // ### Conversion to other types
        toArray: function() {
          assertNotInfinite(this.size);
          var array = new Array(this.size || 0);
          this.valueSeq().__iterate(function(v, i) {
            array[i] = v;
          });
          return array;
        },
        toIndexedSeq: function() {
          return new ToIndexedSequence(this);
        },
        toJS: function() {
          return this.toSeq().map(
            function(value) {
              return value && typeof value.toJS === "function" ? value.toJS() : value;
            }
          ).__toJS();
        },
        toJSON: function() {
          return this.toSeq().map(
            function(value) {
              return value && typeof value.toJSON === "function" ? value.toJSON() : value;
            }
          ).__toJS();
        },
        toKeyedSeq: function() {
          return new ToKeyedSequence(this, true);
        },
        toMap: function() {
          return Map(this.toKeyedSeq());
        },
        toObject: function() {
          assertNotInfinite(this.size);
          var object = {};
          this.__iterate(function(v, k) {
            object[k] = v;
          });
          return object;
        },
        toOrderedMap: function() {
          return OrderedMap(this.toKeyedSeq());
        },
        toOrderedSet: function() {
          return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
        },
        toSet: function() {
          return Set(isKeyed(this) ? this.valueSeq() : this);
        },
        toSetSeq: function() {
          return new ToSetSequence(this);
        },
        toSeq: function() {
          return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
        },
        toStack: function() {
          return Stack(isKeyed(this) ? this.valueSeq() : this);
        },
        toList: function() {
          return List(isKeyed(this) ? this.valueSeq() : this);
        },
        // ### Common JavaScript methods and properties
        toString: function() {
          return "[Iterable]";
        },
        __toString: function(head, tail) {
          if (this.size === 0) {
            return head + tail;
          }
          return head + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + tail;
        },
        // ### ES6 Collection methods (ES6 Array and Map)
        concat: function() {
          var values = SLICE$0.call(arguments, 0);
          return reify(this, concatFactory(this, values));
        },
        includes: function(searchValue) {
          return this.some(function(value) {
            return is(value, searchValue);
          });
        },
        entries: function() {
          return this.__iterator(ITERATE_ENTRIES);
        },
        every: function(predicate, context) {
          assertNotInfinite(this.size);
          var returnValue = true;
          this.__iterate(function(v, k, c) {
            if (!predicate.call(context, v, k, c)) {
              returnValue = false;
              return false;
            }
          });
          return returnValue;
        },
        filter: function(predicate, context) {
          return reify(this, filterFactory(this, predicate, context, true));
        },
        find: function(predicate, context, notSetValue) {
          var entry = this.findEntry(predicate, context);
          return entry ? entry[1] : notSetValue;
        },
        findEntry: function(predicate, context) {
          var found;
          this.__iterate(function(v, k, c) {
            if (predicate.call(context, v, k, c)) {
              found = [k, v];
              return false;
            }
          });
          return found;
        },
        findLastEntry: function(predicate, context) {
          return this.toSeq().reverse().findEntry(predicate, context);
        },
        forEach: function(sideEffect, context) {
          assertNotInfinite(this.size);
          return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
        },
        join: function(separator) {
          assertNotInfinite(this.size);
          separator = separator !== void 0 ? "" + separator : ",";
          var joined = "";
          var isFirst = true;
          this.__iterate(function(v) {
            isFirst ? isFirst = false : joined += separator;
            joined += v !== null && v !== void 0 ? v.toString() : "";
          });
          return joined;
        },
        keys: function() {
          return this.__iterator(ITERATE_KEYS);
        },
        map: function(mapper, context) {
          return reify(this, mapFactory(this, mapper, context));
        },
        reduce: function(reducer, initialReduction, context) {
          assertNotInfinite(this.size);
          var reduction;
          var useFirst;
          if (arguments.length < 2) {
            useFirst = true;
          } else {
            reduction = initialReduction;
          }
          this.__iterate(function(v, k, c) {
            if (useFirst) {
              useFirst = false;
              reduction = v;
            } else {
              reduction = reducer.call(context, reduction, v, k, c);
            }
          });
          return reduction;
        },
        reduceRight: function(reducer, initialReduction, context) {
          var reversed = this.toKeyedSeq().reverse();
          return reversed.reduce.apply(reversed, arguments);
        },
        reverse: function() {
          return reify(this, reverseFactory(this, true));
        },
        slice: function(begin, end) {
          return reify(this, sliceFactory(this, begin, end, true));
        },
        some: function(predicate, context) {
          return !this.every(not(predicate), context);
        },
        sort: function(comparator) {
          return reify(this, sortFactory(this, comparator));
        },
        values: function() {
          return this.__iterator(ITERATE_VALUES);
        },
        // ### More sequential methods
        butLast: function() {
          return this.slice(0, -1);
        },
        isEmpty: function() {
          return this.size !== void 0 ? this.size === 0 : !this.some(function() {
            return true;
          });
        },
        count: function(predicate, context) {
          return ensureSize(
            predicate ? this.toSeq().filter(predicate, context) : this
          );
        },
        countBy: function(grouper, context) {
          return countByFactory(this, grouper, context);
        },
        equals: function(other) {
          return deepEqual(this, other);
        },
        entrySeq: function() {
          var iterable = this;
          if (iterable._cache) {
            return new ArraySeq(iterable._cache);
          }
          var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
          entriesSequence.fromEntrySeq = function() {
            return iterable.toSeq();
          };
          return entriesSequence;
        },
        filterNot: function(predicate, context) {
          return this.filter(not(predicate), context);
        },
        findLast: function(predicate, context, notSetValue) {
          return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
        },
        first: function() {
          return this.find(returnTrue);
        },
        flatMap: function(mapper, context) {
          return reify(this, flatMapFactory(this, mapper, context));
        },
        flatten: function(depth) {
          return reify(this, flattenFactory(this, depth, true));
        },
        fromEntrySeq: function() {
          return new FromEntriesSequence(this);
        },
        get: function(searchKey, notSetValue) {
          return this.find(function(_, key) {
            return is(key, searchKey);
          }, void 0, notSetValue);
        },
        getIn: function(searchKeyPath, notSetValue) {
          var nested = this;
          var iter = forceIterator(searchKeyPath);
          var step;
          while (!(step = iter.next()).done) {
            var key = step.value;
            nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
            if (nested === NOT_SET) {
              return notSetValue;
            }
          }
          return nested;
        },
        groupBy: function(grouper, context) {
          return groupByFactory(this, grouper, context);
        },
        has: function(searchKey) {
          return this.get(searchKey, NOT_SET) !== NOT_SET;
        },
        hasIn: function(searchKeyPath) {
          return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
        },
        isSubset: function(iter) {
          iter = typeof iter.includes === "function" ? iter : Iterable(iter);
          return this.every(function(value) {
            return iter.includes(value);
          });
        },
        isSuperset: function(iter) {
          iter = typeof iter.isSubset === "function" ? iter : Iterable(iter);
          return iter.isSubset(this);
        },
        keySeq: function() {
          return this.toSeq().map(keyMapper).toIndexedSeq();
        },
        last: function() {
          return this.toSeq().reverse().first();
        },
        max: function(comparator) {
          return maxFactory(this, comparator);
        },
        maxBy: function(mapper, comparator) {
          return maxFactory(this, comparator, mapper);
        },
        min: function(comparator) {
          return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
        },
        minBy: function(mapper, comparator) {
          return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
        },
        rest: function() {
          return this.slice(1);
        },
        skip: function(amount) {
          return this.slice(Math.max(0, amount));
        },
        skipLast: function(amount) {
          return reify(this, this.toSeq().reverse().skip(amount).reverse());
        },
        skipWhile: function(predicate, context) {
          return reify(this, skipWhileFactory(this, predicate, context, true));
        },
        skipUntil: function(predicate, context) {
          return this.skipWhile(not(predicate), context);
        },
        sortBy: function(mapper, comparator) {
          return reify(this, sortFactory(this, comparator, mapper));
        },
        take: function(amount) {
          return this.slice(0, Math.max(0, amount));
        },
        takeLast: function(amount) {
          return reify(this, this.toSeq().reverse().take(amount).reverse());
        },
        takeWhile: function(predicate, context) {
          return reify(this, takeWhileFactory(this, predicate, context));
        },
        takeUntil: function(predicate, context) {
          return this.takeWhile(not(predicate), context);
        },
        valueSeq: function() {
          return this.toIndexedSeq();
        },
        // ### Hashable Object
        hashCode: function() {
          return this.__hash || (this.__hash = hashIterable(this));
        }
        // ### Internal
        // abstract __iterate(fn, reverse)
        // abstract __iterator(type, reverse)
      });
      var IterablePrototype = Iterable.prototype;
      IterablePrototype[IS_ITERABLE_SENTINEL] = true;
      IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
      IterablePrototype.__toJS = IterablePrototype.toArray;
      IterablePrototype.__toStringMapper = quoteString;
      IterablePrototype.inspect = IterablePrototype.toSource = function() {
        return this.toString();
      };
      IterablePrototype.chain = IterablePrototype.flatMap;
      IterablePrototype.contains = IterablePrototype.includes;
      (function() {
        try {
          Object.defineProperty(IterablePrototype, "length", {
            get: function() {
              if (!Iterable.noLengthWarning) {
                var stack;
                try {
                  throw new Error();
                } catch (error) {
                  stack = error.stack;
                }
                if (stack.indexOf("_wrapObject") === -1) {
                  console && console.warn && console.warn(
                    "iterable.length has been deprecated, use iterable.size or iterable.count(). This warning will become a silent error in a future version. " + stack
                  );
                  return this.size;
                }
              }
            }
          });
        } catch (e) {
        }
      })();
      mixin(KeyedIterable, {
        // ### More sequential methods
        flip: function() {
          return reify(this, flipFactory(this));
        },
        findKey: function(predicate, context) {
          var entry = this.findEntry(predicate, context);
          return entry && entry[0];
        },
        findLastKey: function(predicate, context) {
          return this.toSeq().reverse().findKey(predicate, context);
        },
        keyOf: function(searchValue) {
          return this.findKey(function(value) {
            return is(value, searchValue);
          });
        },
        lastKeyOf: function(searchValue) {
          return this.findLastKey(function(value) {
            return is(value, searchValue);
          });
        },
        mapEntries: function(mapper, context) {
          var this$0 = this;
          var iterations = 0;
          return reify(
            this,
            this.toSeq().map(
              function(v, k) {
                return mapper.call(context, [k, v], iterations++, this$0);
              }
            ).fromEntrySeq()
          );
        },
        mapKeys: function(mapper, context) {
          var this$0 = this;
          return reify(
            this,
            this.toSeq().flip().map(
              function(k, v) {
                return mapper.call(context, k, v, this$0);
              }
            ).flip()
          );
        }
      });
      var KeyedIterablePrototype = KeyedIterable.prototype;
      KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
      KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
      KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
      KeyedIterablePrototype.__toStringMapper = function(v, k) {
        return JSON.stringify(k) + ": " + quoteString(v);
      };
      mixin(IndexedIterable, {
        // ### Conversion to other types
        toKeyedSeq: function() {
          return new ToKeyedSequence(this, false);
        },
        // ### ES6 Collection methods (ES6 Array and Map)
        filter: function(predicate, context) {
          return reify(this, filterFactory(this, predicate, context, false));
        },
        findIndex: function(predicate, context) {
          var entry = this.findEntry(predicate, context);
          return entry ? entry[0] : -1;
        },
        indexOf: function(searchValue) {
          var key = this.toKeyedSeq().keyOf(searchValue);
          return key === void 0 ? -1 : key;
        },
        lastIndexOf: function(searchValue) {
          var key = this.toKeyedSeq().reverse().keyOf(searchValue);
          return key === void 0 ? -1 : key;
        },
        reverse: function() {
          return reify(this, reverseFactory(this, false));
        },
        slice: function(begin, end) {
          return reify(this, sliceFactory(this, begin, end, false));
        },
        splice: function(index, removeNum) {
          var numArgs = arguments.length;
          removeNum = Math.max(removeNum | 0, 0);
          if (numArgs === 0 || numArgs === 2 && !removeNum) {
            return this;
          }
          index = resolveBegin(index, index < 0 ? this.count() : this.size);
          var spliced = this.slice(0, index);
          return reify(
            this,
            numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
          );
        },
        // ### More collection methods
        findLastIndex: function(predicate, context) {
          var key = this.toKeyedSeq().findLastKey(predicate, context);
          return key === void 0 ? -1 : key;
        },
        first: function() {
          return this.get(0);
        },
        flatten: function(depth) {
          return reify(this, flattenFactory(this, depth, false));
        },
        get: function(index, notSetValue) {
          index = wrapIndex(this, index);
          return index < 0 || (this.size === Infinity || this.size !== void 0 && index > this.size) ? notSetValue : this.find(function(_, key) {
            return key === index;
          }, void 0, notSetValue);
        },
        has: function(index) {
          index = wrapIndex(this, index);
          return index >= 0 && (this.size !== void 0 ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
        },
        interpose: function(separator) {
          return reify(this, interposeFactory(this, separator));
        },
        interleave: function() {
          var iterables = [this].concat(arrCopy(arguments));
          var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
          var interleaved = zipped.flatten(true);
          if (zipped.size) {
            interleaved.size = zipped.size * iterables.length;
          }
          return reify(this, interleaved);
        },
        last: function() {
          return this.get(-1);
        },
        skipWhile: function(predicate, context) {
          return reify(this, skipWhileFactory(this, predicate, context, false));
        },
        zip: function() {
          var iterables = [this].concat(arrCopy(arguments));
          return reify(this, zipWithFactory(this, defaultZipper, iterables));
        },
        zipWith: function(zipper) {
          var iterables = arrCopy(arguments);
          iterables[0] = this;
          return reify(this, zipWithFactory(this, zipper, iterables));
        }
      });
      IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
      IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;
      mixin(SetIterable, {
        // ### ES6 Collection methods (ES6 Array and Map)
        get: function(value, notSetValue) {
          return this.has(value) ? value : notSetValue;
        },
        includes: function(value) {
          return this.has(value);
        },
        // ### More sequential methods
        keySeq: function() {
          return this.valueSeq();
        }
      });
      SetIterable.prototype.has = IterablePrototype.includes;
      mixin(KeyedSeq, KeyedIterable.prototype);
      mixin(IndexedSeq, IndexedIterable.prototype);
      mixin(SetSeq, SetIterable.prototype);
      mixin(KeyedCollection, KeyedIterable.prototype);
      mixin(IndexedCollection, IndexedIterable.prototype);
      mixin(SetCollection, SetIterable.prototype);
      function keyMapper(v, k) {
        return k;
      }
      function entryMapper(v, k) {
        return [k, v];
      }
      function not(predicate) {
        return function() {
          return !predicate.apply(this, arguments);
        };
      }
      function neg(predicate) {
        return function() {
          return -predicate.apply(this, arguments);
        };
      }
      function quoteString(value) {
        return typeof value === "string" ? JSON.stringify(value) : value;
      }
      function defaultZipper() {
        return arrCopy(arguments);
      }
      function defaultNegComparator(a, b) {
        return a < b ? 1 : a > b ? -1 : 0;
      }
      function hashIterable(iterable) {
        if (iterable.size === Infinity) {
          return 0;
        }
        var ordered = isOrdered(iterable);
        var keyed = isKeyed(iterable);
        var h = ordered ? 1 : 0;
        var size = iterable.__iterate(
          keyed ? ordered ? function(v, k) {
            h = 31 * h + hashMerge(hash(v), hash(k)) | 0;
          } : function(v, k) {
            h = h + hashMerge(hash(v), hash(k)) | 0;
          } : ordered ? function(v) {
            h = 31 * h + hash(v) | 0;
          } : function(v) {
            h = h + hash(v) | 0;
          }
        );
        return murmurHashOfSize(size, h);
      }
      function murmurHashOfSize(size, h) {
        h = imul(h, 3432918353);
        h = imul(h << 15 | h >>> -15, 461845907);
        h = imul(h << 13 | h >>> -13, 5);
        h = (h + 3864292196 | 0) ^ size;
        h = imul(h ^ h >>> 16, 2246822507);
        h = imul(h ^ h >>> 13, 3266489909);
        h = smi(h ^ h >>> 16);
        return h;
      }
      function hashMerge(a, b) {
        return a ^ b + 2654435769 + (a << 6) + (a >> 2) | 0;
      }
      var Immutable = {
        Iterable,
        Seq,
        Collection,
        Map,
        OrderedMap,
        List,
        Stack,
        Set,
        OrderedSet,
        Record,
        Range,
        Repeat,
        is,
        fromJS
      };
      return Immutable;
    });
  }
});

// node_modules/draft-js/lib/BlockMapBuilder.js
var require_BlockMapBuilder = __commonJS({
  "node_modules/draft-js/lib/BlockMapBuilder.js"(exports, module) {
    "use strict";
    var Immutable = require_immutable();
    var OrderedMap = Immutable.OrderedMap;
    var BlockMapBuilder = {
      createFromArray: function createFromArray(blocks) {
        return OrderedMap(blocks.map(function(block) {
          return [block.getKey(), block];
        }));
      }
    };
    module.exports = BlockMapBuilder;
  }
});

// node_modules/draft-js/lib/CharacterMetadata.js
var require_CharacterMetadata = __commonJS({
  "node_modules/draft-js/lib/CharacterMetadata.js"(exports, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var _require = require_immutable();
    var Map = _require.Map;
    var OrderedSet = _require.OrderedSet;
    var Record = _require.Record;
    var EMPTY_SET = OrderedSet();
    var defaultRecord = {
      style: EMPTY_SET,
      entity: null
    };
    var CharacterMetadataRecord = Record(defaultRecord);
    var CharacterMetadata = function(_CharacterMetadataRec) {
      _inheritsLoose(CharacterMetadata2, _CharacterMetadataRec);
      function CharacterMetadata2() {
        return _CharacterMetadataRec.apply(this, arguments) || this;
      }
      var _proto = CharacterMetadata2.prototype;
      _proto.getStyle = function getStyle() {
        return this.get("style");
      };
      _proto.getEntity = function getEntity() {
        return this.get("entity");
      };
      _proto.hasStyle = function hasStyle(style) {
        return this.getStyle().includes(style);
      };
      CharacterMetadata2.applyStyle = function applyStyle(record, style) {
        var withStyle = record.set("style", record.getStyle().add(style));
        return CharacterMetadata2.create(withStyle);
      };
      CharacterMetadata2.removeStyle = function removeStyle(record, style) {
        var withoutStyle = record.set("style", record.getStyle().remove(style));
        return CharacterMetadata2.create(withoutStyle);
      };
      CharacterMetadata2.applyEntity = function applyEntity(record, entityKey) {
        var withEntity = record.getEntity() === entityKey ? record : record.set("entity", entityKey);
        return CharacterMetadata2.create(withEntity);
      };
      CharacterMetadata2.create = function create(config) {
        if (!config) {
          return EMPTY;
        }
        var defaultConfig = {
          style: EMPTY_SET,
          entity: null
        };
        var configMap = Map(defaultConfig).merge(config);
        var existing = pool.get(configMap);
        if (existing) {
          return existing;
        }
        var newCharacter = new CharacterMetadata2(configMap);
        pool = pool.set(configMap, newCharacter);
        return newCharacter;
      };
      CharacterMetadata2.fromJS = function fromJS(_ref) {
        var style = _ref.style, entity = _ref.entity;
        return new CharacterMetadata2({
          style: Array.isArray(style) ? OrderedSet(style) : style,
          entity: Array.isArray(entity) ? OrderedSet(entity) : entity
        });
      };
      return CharacterMetadata2;
    }(CharacterMetadataRecord);
    var EMPTY = new CharacterMetadata();
    var pool = Map([[Map(defaultRecord), EMPTY]]);
    CharacterMetadata.EMPTY = EMPTY;
    module.exports = CharacterMetadata;
  }
});

// node_modules/draft-js/lib/findRangesImmutable.js
var require_findRangesImmutable = __commonJS({
  "node_modules/draft-js/lib/findRangesImmutable.js"(exports, module) {
    "use strict";
    function findRangesImmutable(haystack, areEqualFn, filterFn, foundFn) {
      if (!haystack.size) {
        return;
      }
      var cursor = 0;
      haystack.reduce(function(value, nextValue, nextIndex) {
        if (!areEqualFn(value, nextValue)) {
          if (filterFn(value)) {
            foundFn(cursor, nextIndex);
          }
          cursor = nextIndex;
        }
        return nextValue;
      });
      filterFn(haystack.last()) && foundFn(cursor, haystack.count());
    }
    module.exports = findRangesImmutable;
  }
});

// node_modules/draft-js/lib/ContentBlock.js
var require_ContentBlock = __commonJS({
  "node_modules/draft-js/lib/ContentBlock.js"(exports, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var CharacterMetadata = require_CharacterMetadata();
    var findRangesImmutable = require_findRangesImmutable();
    var Immutable = require_immutable();
    var List = Immutable.List;
    var Map = Immutable.Map;
    var OrderedSet = Immutable.OrderedSet;
    var Record = Immutable.Record;
    var Repeat = Immutable.Repeat;
    var EMPTY_SET = OrderedSet();
    var defaultRecord = {
      key: "",
      type: "unstyled",
      text: "",
      characterList: List(),
      depth: 0,
      data: Map()
    };
    var ContentBlockRecord = Record(defaultRecord);
    var decorateCharacterList = function decorateCharacterList2(config) {
      if (!config) {
        return config;
      }
      var characterList = config.characterList, text = config.text;
      if (text && !characterList) {
        config.characterList = List(Repeat(CharacterMetadata.EMPTY, text.length));
      }
      return config;
    };
    var ContentBlock = function(_ContentBlockRecord) {
      _inheritsLoose(ContentBlock2, _ContentBlockRecord);
      function ContentBlock2(config) {
        return _ContentBlockRecord.call(this, decorateCharacterList(config)) || this;
      }
      var _proto = ContentBlock2.prototype;
      _proto.getKey = function getKey() {
        return this.get("key");
      };
      _proto.getType = function getType() {
        return this.get("type");
      };
      _proto.getText = function getText() {
        return this.get("text");
      };
      _proto.getCharacterList = function getCharacterList() {
        return this.get("characterList");
      };
      _proto.getLength = function getLength() {
        return this.getText().length;
      };
      _proto.getDepth = function getDepth() {
        return this.get("depth");
      };
      _proto.getData = function getData() {
        return this.get("data");
      };
      _proto.getInlineStyleAt = function getInlineStyleAt(offset) {
        var character = this.getCharacterList().get(offset);
        return character ? character.getStyle() : EMPTY_SET;
      };
      _proto.getEntityAt = function getEntityAt(offset) {
        var character = this.getCharacterList().get(offset);
        return character ? character.getEntity() : null;
      };
      _proto.findStyleRanges = function findStyleRanges(filterFn, callback) {
        findRangesImmutable(this.getCharacterList(), haveEqualStyle, filterFn, callback);
      };
      _proto.findEntityRanges = function findEntityRanges(filterFn, callback) {
        findRangesImmutable(this.getCharacterList(), haveEqualEntity, filterFn, callback);
      };
      return ContentBlock2;
    }(ContentBlockRecord);
    function haveEqualStyle(charA, charB) {
      return charA.getStyle() === charB.getStyle();
    }
    function haveEqualEntity(charA, charB) {
      return charA.getEntity() === charB.getEntity();
    }
    module.exports = ContentBlock;
  }
});

// node_modules/draft-js/lib/ContentBlockNode.js
var require_ContentBlockNode = __commonJS({
  "node_modules/draft-js/lib/ContentBlockNode.js"(exports, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var CharacterMetadata = require_CharacterMetadata();
    var findRangesImmutable = require_findRangesImmutable();
    var Immutable = require_immutable();
    var List = Immutable.List;
    var Map = Immutable.Map;
    var OrderedSet = Immutable.OrderedSet;
    var Record = Immutable.Record;
    var Repeat = Immutable.Repeat;
    var EMPTY_SET = OrderedSet();
    var defaultRecord = {
      parent: null,
      characterList: List(),
      data: Map(),
      depth: 0,
      key: "",
      text: "",
      type: "unstyled",
      children: List(),
      prevSibling: null,
      nextSibling: null
    };
    var haveEqualStyle = function haveEqualStyle2(charA, charB) {
      return charA.getStyle() === charB.getStyle();
    };
    var haveEqualEntity = function haveEqualEntity2(charA, charB) {
      return charA.getEntity() === charB.getEntity();
    };
    var decorateCharacterList = function decorateCharacterList2(config) {
      if (!config) {
        return config;
      }
      var characterList = config.characterList, text = config.text;
      if (text && !characterList) {
        config.characterList = List(Repeat(CharacterMetadata.EMPTY, text.length));
      }
      return config;
    };
    var ContentBlockNode = function(_ref) {
      _inheritsLoose(ContentBlockNode2, _ref);
      function ContentBlockNode2() {
        var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultRecord;
        return _ref.call(this, decorateCharacterList(props)) || this;
      }
      var _proto = ContentBlockNode2.prototype;
      _proto.getKey = function getKey() {
        return this.get("key");
      };
      _proto.getType = function getType() {
        return this.get("type");
      };
      _proto.getText = function getText() {
        return this.get("text");
      };
      _proto.getCharacterList = function getCharacterList() {
        return this.get("characterList");
      };
      _proto.getLength = function getLength() {
        return this.getText().length;
      };
      _proto.getDepth = function getDepth() {
        return this.get("depth");
      };
      _proto.getData = function getData() {
        return this.get("data");
      };
      _proto.getInlineStyleAt = function getInlineStyleAt(offset) {
        var character = this.getCharacterList().get(offset);
        return character ? character.getStyle() : EMPTY_SET;
      };
      _proto.getEntityAt = function getEntityAt(offset) {
        var character = this.getCharacterList().get(offset);
        return character ? character.getEntity() : null;
      };
      _proto.getChildKeys = function getChildKeys() {
        return this.get("children");
      };
      _proto.getParentKey = function getParentKey() {
        return this.get("parent");
      };
      _proto.getPrevSiblingKey = function getPrevSiblingKey() {
        return this.get("prevSibling");
      };
      _proto.getNextSiblingKey = function getNextSiblingKey() {
        return this.get("nextSibling");
      };
      _proto.findStyleRanges = function findStyleRanges(filterFn, callback) {
        findRangesImmutable(this.getCharacterList(), haveEqualStyle, filterFn, callback);
      };
      _proto.findEntityRanges = function findEntityRanges(filterFn, callback) {
        findRangesImmutable(this.getCharacterList(), haveEqualEntity, filterFn, callback);
      };
      return ContentBlockNode2;
    }(Record(defaultRecord));
    module.exports = ContentBlockNode;
  }
});

// node_modules/draft-js/lib/ContentStateInlineStyle.js
var require_ContentStateInlineStyle = __commonJS({
  "node_modules/draft-js/lib/ContentStateInlineStyle.js"(exports, module) {
    "use strict";
    var CharacterMetadata = require_CharacterMetadata();
    var _require = require_immutable();
    var Map = _require.Map;
    var ContentStateInlineStyle = {
      add: function add(contentState, selectionState, inlineStyle) {
        return modifyInlineStyle(contentState, selectionState, inlineStyle, true);
      },
      remove: function remove(contentState, selectionState, inlineStyle) {
        return modifyInlineStyle(contentState, selectionState, inlineStyle, false);
      }
    };
    function modifyInlineStyle(contentState, selectionState, inlineStyle, addOrRemove) {
      var blockMap = contentState.getBlockMap();
      var startKey = selectionState.getStartKey();
      var startOffset = selectionState.getStartOffset();
      var endKey = selectionState.getEndKey();
      var endOffset = selectionState.getEndOffset();
      var newBlocks = blockMap.skipUntil(function(_, k) {
        return k === startKey;
      }).takeUntil(function(_, k) {
        return k === endKey;
      }).concat(Map([[endKey, blockMap.get(endKey)]])).map(function(block, blockKey) {
        var sliceStart;
        var sliceEnd;
        if (startKey === endKey) {
          sliceStart = startOffset;
          sliceEnd = endOffset;
        } else {
          sliceStart = blockKey === startKey ? startOffset : 0;
          sliceEnd = blockKey === endKey ? endOffset : block.getLength();
        }
        var chars = block.getCharacterList();
        var current;
        while (sliceStart < sliceEnd) {
          current = chars.get(sliceStart);
          chars = chars.set(sliceStart, addOrRemove ? CharacterMetadata.applyStyle(current, inlineStyle) : CharacterMetadata.removeStyle(current, inlineStyle));
          sliceStart++;
        }
        return block.set("characterList", chars);
      });
      return contentState.merge({
        blockMap: blockMap.merge(newBlocks),
        selectionBefore: selectionState,
        selectionAfter: selectionState
      });
    }
    module.exports = ContentStateInlineStyle;
  }
});

// node_modules/draft-js/lib/applyEntityToContentBlock.js
var require_applyEntityToContentBlock = __commonJS({
  "node_modules/draft-js/lib/applyEntityToContentBlock.js"(exports, module) {
    "use strict";
    var CharacterMetadata = require_CharacterMetadata();
    function applyEntityToContentBlock(contentBlock, startArg, end, entityKey) {
      var start = startArg;
      var characterList = contentBlock.getCharacterList();
      while (start < end) {
        characterList = characterList.set(start, CharacterMetadata.applyEntity(characterList.get(start), entityKey));
        start++;
      }
      return contentBlock.set("characterList", characterList);
    }
    module.exports = applyEntityToContentBlock;
  }
});

// node_modules/draft-js/lib/applyEntityToContentState.js
var require_applyEntityToContentState = __commonJS({
  "node_modules/draft-js/lib/applyEntityToContentState.js"(exports, module) {
    "use strict";
    var applyEntityToContentBlock = require_applyEntityToContentBlock();
    var Immutable = require_immutable();
    function applyEntityToContentState(contentState, selectionState, entityKey) {
      var blockMap = contentState.getBlockMap();
      var startKey = selectionState.getStartKey();
      var startOffset = selectionState.getStartOffset();
      var endKey = selectionState.getEndKey();
      var endOffset = selectionState.getEndOffset();
      var newBlocks = blockMap.skipUntil(function(_, k) {
        return k === startKey;
      }).takeUntil(function(_, k) {
        return k === endKey;
      }).toOrderedMap().merge(Immutable.OrderedMap([[endKey, blockMap.get(endKey)]])).map(function(block, blockKey) {
        var sliceStart = blockKey === startKey ? startOffset : 0;
        var sliceEnd = blockKey === endKey ? endOffset : block.getLength();
        return applyEntityToContentBlock(block, sliceStart, sliceEnd, entityKey);
      });
      return contentState.merge({
        blockMap: blockMap.merge(newBlocks),
        selectionBefore: selectionState,
        selectionAfter: selectionState
      });
    }
    module.exports = applyEntityToContentState;
  }
});

// node_modules/draft-js/lib/DraftEntitySegments.js
var require_DraftEntitySegments = __commonJS({
  "node_modules/draft-js/lib/DraftEntitySegments.js"(exports, module) {
    "use strict";
    var DraftEntitySegments = {
      getRemovalRange: function getRemovalRange(selectionStart, selectionEnd, text, entityStart, direction) {
        var segments = text.split(" ");
        segments = segments.map(function(segment2, ii) {
          if (direction === "forward") {
            if (ii > 0) {
              return " " + segment2;
            }
          } else if (ii < segments.length - 1) {
            return segment2 + " ";
          }
          return segment2;
        });
        var segmentStart = entityStart;
        var segmentEnd;
        var segment;
        var removalStart = null;
        var removalEnd = null;
        for (var jj = 0; jj < segments.length; jj++) {
          segment = segments[jj];
          segmentEnd = segmentStart + segment.length;
          if (selectionStart < segmentEnd && segmentStart < selectionEnd) {
            if (removalStart !== null) {
              removalEnd = segmentEnd;
            } else {
              removalStart = segmentStart;
              removalEnd = segmentEnd;
            }
          } else if (removalStart !== null) {
            break;
          }
          segmentStart = segmentEnd;
        }
        var entityEnd = entityStart + text.length;
        var atStart = removalStart === entityStart;
        var atEnd = removalEnd === entityEnd;
        if (!atStart && atEnd || atStart && !atEnd) {
          if (direction === "forward") {
            if (removalEnd !== entityEnd) {
              removalEnd++;
            }
          } else if (removalStart !== entityStart) {
            removalStart--;
          }
        }
        return {
          start: removalStart,
          end: removalEnd
        };
      }
    };
    module.exports = DraftEntitySegments;
  }
});

// node_modules/fbjs/lib/invariant.js
var require_invariant = __commonJS({
  "node_modules/fbjs/lib/invariant.js"(exports, module) {
    "use strict";
    var validateFormat = true ? function(format) {
      if (format === void 0) {
        throw new Error("invariant(...): Second argument must be a string.");
      }
    } : function(format) {
    };
    function invariant(condition, format) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }
      validateFormat(format);
      if (!condition) {
        var error;
        if (format === void 0) {
          error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
        } else {
          var argIndex = 0;
          error = new Error(format.replace(/%s/g, function() {
            return String(args[argIndex++]);
          }));
          error.name = "Invariant Violation";
        }
        error.framesToPop = 1;
        throw error;
      }
    }
    module.exports = invariant;
  }
});

// node_modules/draft-js/lib/getRangesForDraftEntity.js
var require_getRangesForDraftEntity = __commonJS({
  "node_modules/draft-js/lib/getRangesForDraftEntity.js"(exports, module) {
    "use strict";
    var invariant = require_invariant();
    function getRangesForDraftEntity(block, key) {
      var ranges = [];
      block.findEntityRanges(function(c) {
        return c.getEntity() === key;
      }, function(start, end) {
        ranges.push({
          start,
          end
        });
      });
      !!!ranges.length ? true ? invariant(false, "Entity key not found in this range.") : invariant(false) : void 0;
      return ranges;
    }
    module.exports = getRangesForDraftEntity;
  }
});

// node_modules/draft-js/lib/getCharacterRemovalRange.js
var require_getCharacterRemovalRange = __commonJS({
  "node_modules/draft-js/lib/getCharacterRemovalRange.js"(exports, module) {
    "use strict";
    var DraftEntitySegments = require_DraftEntitySegments();
    var getRangesForDraftEntity = require_getRangesForDraftEntity();
    var invariant = require_invariant();
    function getCharacterRemovalRange(entityMap, startBlock, endBlock, selectionState, direction) {
      var start = selectionState.getStartOffset();
      var end = selectionState.getEndOffset();
      var startEntityKey = startBlock.getEntityAt(start);
      var endEntityKey = endBlock.getEntityAt(end - 1);
      if (!startEntityKey && !endEntityKey) {
        return selectionState;
      }
      var newSelectionState = selectionState;
      if (startEntityKey && startEntityKey === endEntityKey) {
        newSelectionState = getEntityRemovalRange(entityMap, startBlock, newSelectionState, direction, startEntityKey, true, true);
      } else if (startEntityKey && endEntityKey) {
        var startSelectionState = getEntityRemovalRange(entityMap, startBlock, newSelectionState, direction, startEntityKey, false, true);
        var endSelectionState = getEntityRemovalRange(entityMap, endBlock, newSelectionState, direction, endEntityKey, false, false);
        newSelectionState = newSelectionState.merge({
          anchorOffset: startSelectionState.getAnchorOffset(),
          focusOffset: endSelectionState.getFocusOffset(),
          isBackward: false
        });
      } else if (startEntityKey) {
        var _startSelectionState = getEntityRemovalRange(entityMap, startBlock, newSelectionState, direction, startEntityKey, false, true);
        newSelectionState = newSelectionState.merge({
          anchorOffset: _startSelectionState.getStartOffset(),
          isBackward: false
        });
      } else if (endEntityKey) {
        var _endSelectionState = getEntityRemovalRange(entityMap, endBlock, newSelectionState, direction, endEntityKey, false, false);
        newSelectionState = newSelectionState.merge({
          focusOffset: _endSelectionState.getEndOffset(),
          isBackward: false
        });
      }
      return newSelectionState;
    }
    function getEntityRemovalRange(entityMap, block, selectionState, direction, entityKey, isEntireSelectionWithinEntity, isEntityAtStart) {
      var start = selectionState.getStartOffset();
      var end = selectionState.getEndOffset();
      var entity = entityMap.__get(entityKey);
      var mutability = entity.getMutability();
      var sideToConsider = isEntityAtStart ? start : end;
      if (mutability === "MUTABLE") {
        return selectionState;
      }
      var entityRanges = getRangesForDraftEntity(block, entityKey).filter(function(range) {
        return sideToConsider <= range.end && sideToConsider >= range.start;
      });
      !(entityRanges.length == 1) ? true ? invariant(false, "There should only be one entity range within this removal range.") : invariant(false) : void 0;
      var entityRange = entityRanges[0];
      if (mutability === "IMMUTABLE") {
        return selectionState.merge({
          anchorOffset: entityRange.start,
          focusOffset: entityRange.end,
          isBackward: false
        });
      }
      if (!isEntireSelectionWithinEntity) {
        if (isEntityAtStart) {
          end = entityRange.end;
        } else {
          start = entityRange.start;
        }
      }
      var removalRange = DraftEntitySegments.getRemovalRange(start, end, block.getText().slice(entityRange.start, entityRange.end), entityRange.start, direction);
      return selectionState.merge({
        anchorOffset: removalRange.start,
        focusOffset: removalRange.end,
        isBackward: false
      });
    }
    module.exports = getCharacterRemovalRange;
  }
});

// node_modules/draft-js/lib/generateRandomKey.js
var require_generateRandomKey = __commonJS({
  "node_modules/draft-js/lib/generateRandomKey.js"(exports, module) {
    "use strict";
    var seenKeys = {};
    var MULTIPLIER = Math.pow(2, 24);
    function generateRandomKey() {
      var key;
      while (key === void 0 || seenKeys.hasOwnProperty(key) || !isNaN(+key)) {
        key = Math.floor(Math.random() * MULTIPLIER).toString(32);
      }
      seenKeys[key] = true;
      return key;
    }
    module.exports = generateRandomKey;
  }
});

// node_modules/draft-js/lib/randomizeBlockMapKeys.js
var require_randomizeBlockMapKeys = __commonJS({
  "node_modules/draft-js/lib/randomizeBlockMapKeys.js"(exports, module) {
    "use strict";
    var ContentBlockNode = require_ContentBlockNode();
    var generateRandomKey = require_generateRandomKey();
    var Immutable = require_immutable();
    var OrderedMap = Immutable.OrderedMap;
    var randomizeContentBlockNodeKeys = function randomizeContentBlockNodeKeys2(blockMap) {
      var newKeysRef = {};
      var lastRootBlock;
      return OrderedMap(blockMap.withMutations(function(blockMapState) {
        blockMapState.forEach(function(block, index) {
          var oldKey = block.getKey();
          var nextKey = block.getNextSiblingKey();
          var prevKey = block.getPrevSiblingKey();
          var childrenKeys = block.getChildKeys();
          var parentKey = block.getParentKey();
          var key = generateRandomKey();
          newKeysRef[oldKey] = key;
          if (nextKey) {
            var nextBlock = blockMapState.get(nextKey);
            if (nextBlock) {
              blockMapState.setIn([nextKey, "prevSibling"], key);
            } else {
              blockMapState.setIn([oldKey, "nextSibling"], null);
            }
          }
          if (prevKey) {
            var prevBlock = blockMapState.get(prevKey);
            if (prevBlock) {
              blockMapState.setIn([prevKey, "nextSibling"], key);
            } else {
              blockMapState.setIn([oldKey, "prevSibling"], null);
            }
          }
          if (parentKey && blockMapState.get(parentKey)) {
            var parentBlock = blockMapState.get(parentKey);
            var parentChildrenList = parentBlock.getChildKeys();
            blockMapState.setIn([parentKey, "children"], parentChildrenList.set(parentChildrenList.indexOf(block.getKey()), key));
          } else {
            blockMapState.setIn([oldKey, "parent"], null);
            if (lastRootBlock) {
              blockMapState.setIn([lastRootBlock.getKey(), "nextSibling"], key);
              blockMapState.setIn([oldKey, "prevSibling"], newKeysRef[lastRootBlock.getKey()]);
            }
            lastRootBlock = blockMapState.get(oldKey);
          }
          childrenKeys.forEach(function(childKey) {
            var childBlock = blockMapState.get(childKey);
            if (childBlock) {
              blockMapState.setIn([childKey, "parent"], key);
            } else {
              blockMapState.setIn([oldKey, "children"], block.getChildKeys().filter(function(child) {
                return child !== childKey;
              }));
            }
          });
        });
      }).toArray().map(function(block) {
        return [newKeysRef[block.getKey()], block.set("key", newKeysRef[block.getKey()])];
      }));
    };
    var randomizeContentBlockKeys = function randomizeContentBlockKeys2(blockMap) {
      return OrderedMap(blockMap.toArray().map(function(block) {
        var key = generateRandomKey();
        return [key, block.set("key", key)];
      }));
    };
    var randomizeBlockMapKeys = function randomizeBlockMapKeys2(blockMap) {
      var isTreeBasedBlockMap = blockMap.first() instanceof ContentBlockNode;
      if (!isTreeBasedBlockMap) {
        return randomizeContentBlockKeys(blockMap);
      }
      return randomizeContentBlockNodeKeys(blockMap);
    };
    module.exports = randomizeBlockMapKeys;
  }
});

// node_modules/draft-js/lib/removeEntitiesAtEdges.js
var require_removeEntitiesAtEdges = __commonJS({
  "node_modules/draft-js/lib/removeEntitiesAtEdges.js"(exports, module) {
    "use strict";
    var CharacterMetadata = require_CharacterMetadata();
    var findRangesImmutable = require_findRangesImmutable();
    var invariant = require_invariant();
    function removeEntitiesAtEdges(contentState, selectionState) {
      var blockMap = contentState.getBlockMap();
      var entityMap = contentState.getEntityMap();
      var updatedBlocks = {};
      var startKey = selectionState.getStartKey();
      var startOffset = selectionState.getStartOffset();
      var startBlock = blockMap.get(startKey);
      var updatedStart = removeForBlock(entityMap, startBlock, startOffset);
      if (updatedStart !== startBlock) {
        updatedBlocks[startKey] = updatedStart;
      }
      var endKey = selectionState.getEndKey();
      var endOffset = selectionState.getEndOffset();
      var endBlock = blockMap.get(endKey);
      if (startKey === endKey) {
        endBlock = updatedStart;
      }
      var updatedEnd = removeForBlock(entityMap, endBlock, endOffset);
      if (updatedEnd !== endBlock) {
        updatedBlocks[endKey] = updatedEnd;
      }
      if (!Object.keys(updatedBlocks).length) {
        return contentState.set("selectionAfter", selectionState);
      }
      return contentState.merge({
        blockMap: blockMap.merge(updatedBlocks),
        selectionAfter: selectionState
      });
    }
    function getRemovalRange(characters, entityKey, offset) {
      var removalRange;
      findRangesImmutable(
        characters,
        // the list to iterate through
        function(a, b) {
          return a.getEntity() === b.getEntity();
        },
        // 'isEqual' callback
        function(element) {
          return element.getEntity() === entityKey;
        },
        // 'filter' callback
        function(start, end) {
          if (start <= offset && end >= offset) {
            removalRange = {
              start,
              end
            };
          }
        }
      );
      !(typeof removalRange === "object") ? true ? invariant(false, "Removal range must exist within character list.") : invariant(false) : void 0;
      return removalRange;
    }
    function removeForBlock(entityMap, block, offset) {
      var chars = block.getCharacterList();
      var charBefore = offset > 0 ? chars.get(offset - 1) : void 0;
      var charAfter = offset < chars.count() ? chars.get(offset) : void 0;
      var entityBeforeCursor = charBefore ? charBefore.getEntity() : void 0;
      var entityAfterCursor = charAfter ? charAfter.getEntity() : void 0;
      if (entityAfterCursor && entityAfterCursor === entityBeforeCursor) {
        var entity = entityMap.__get(entityAfterCursor);
        if (entity.getMutability() !== "MUTABLE") {
          var _getRemovalRange = getRemovalRange(chars, entityAfterCursor, offset), start = _getRemovalRange.start, end = _getRemovalRange.end;
          var current;
          while (start < end) {
            current = chars.get(start);
            chars = chars.set(start, CharacterMetadata.applyEntity(current, null));
            start++;
          }
          return block.set("characterList", chars);
        }
      }
      return block;
    }
    module.exports = removeEntitiesAtEdges;
  }
});

// node_modules/draft-js/lib/getContentStateFragment.js
var require_getContentStateFragment = __commonJS({
  "node_modules/draft-js/lib/getContentStateFragment.js"(exports, module) {
    "use strict";
    var randomizeBlockMapKeys = require_randomizeBlockMapKeys();
    var removeEntitiesAtEdges = require_removeEntitiesAtEdges();
    var getContentStateFragment = function getContentStateFragment2(contentState, selectionState) {
      var startKey = selectionState.getStartKey();
      var startOffset = selectionState.getStartOffset();
      var endKey = selectionState.getEndKey();
      var endOffset = selectionState.getEndOffset();
      var contentWithoutEdgeEntities = removeEntitiesAtEdges(contentState, selectionState);
      var blockMap = contentWithoutEdgeEntities.getBlockMap();
      var blockKeys = blockMap.keySeq();
      var startIndex = blockKeys.indexOf(startKey);
      var endIndex = blockKeys.indexOf(endKey) + 1;
      return randomizeBlockMapKeys(blockMap.slice(startIndex, endIndex).map(function(block, blockKey) {
        var text = block.getText();
        var chars = block.getCharacterList();
        if (startKey === endKey) {
          return block.merge({
            text: text.slice(startOffset, endOffset),
            characterList: chars.slice(startOffset, endOffset)
          });
        }
        if (blockKey === startKey) {
          return block.merge({
            text: text.slice(startOffset),
            characterList: chars.slice(startOffset)
          });
        }
        if (blockKey === endKey) {
          return block.merge({
            text: text.slice(0, endOffset),
            characterList: chars.slice(0, endOffset)
          });
        }
        return block;
      }));
    };
    module.exports = getContentStateFragment;
  }
});

// node_modules/draft-js/lib/insertIntoList.js
var require_insertIntoList = __commonJS({
  "node_modules/draft-js/lib/insertIntoList.js"(exports, module) {
    "use strict";
    function insertIntoList(targetListArg, toInsert, offset) {
      var targetList = targetListArg;
      if (offset === targetList.count()) {
        toInsert.forEach(function(c) {
          targetList = targetList.push(c);
        });
      } else if (offset === 0) {
        toInsert.reverse().forEach(function(c) {
          targetList = targetList.unshift(c);
        });
      } else {
        var head = targetList.slice(0, offset);
        var tail = targetList.slice(offset);
        targetList = head.concat(toInsert, tail).toList();
      }
      return targetList;
    }
    module.exports = insertIntoList;
  }
});

// node_modules/draft-js/lib/insertFragmentIntoContentState.js
var require_insertFragmentIntoContentState = __commonJS({
  "node_modules/draft-js/lib/insertFragmentIntoContentState.js"(exports, module) {
    "use strict";
    var BlockMapBuilder = require_BlockMapBuilder();
    var ContentBlockNode = require_ContentBlockNode();
    var Immutable = require_immutable();
    var insertIntoList = require_insertIntoList();
    var invariant = require_invariant();
    var randomizeBlockMapKeys = require_randomizeBlockMapKeys();
    var List = Immutable.List;
    var updateExistingBlock = function updateExistingBlock2(contentState, selectionState, blockMap, fragmentBlock, targetKey, targetOffset) {
      var mergeBlockData = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : "REPLACE_WITH_NEW_DATA";
      var targetBlock = blockMap.get(targetKey);
      var text = targetBlock.getText();
      var chars = targetBlock.getCharacterList();
      var finalKey = targetKey;
      var finalOffset = targetOffset + fragmentBlock.getText().length;
      var data = null;
      switch (mergeBlockData) {
        case "MERGE_OLD_DATA_TO_NEW_DATA":
          data = fragmentBlock.getData().merge(targetBlock.getData());
          break;
        case "REPLACE_WITH_NEW_DATA":
          data = fragmentBlock.getData();
          break;
      }
      var type = targetBlock.getType();
      if (text && type === "unstyled") {
        type = fragmentBlock.getType();
      }
      var newBlock = targetBlock.merge({
        text: text.slice(0, targetOffset) + fragmentBlock.getText() + text.slice(targetOffset),
        characterList: insertIntoList(chars, fragmentBlock.getCharacterList(), targetOffset),
        type,
        data
      });
      return contentState.merge({
        blockMap: blockMap.set(targetKey, newBlock),
        selectionBefore: selectionState,
        selectionAfter: selectionState.merge({
          anchorKey: finalKey,
          anchorOffset: finalOffset,
          focusKey: finalKey,
          focusOffset: finalOffset,
          isBackward: false
        })
      });
    };
    var updateHead = function updateHead2(block, targetOffset, fragment) {
      var text = block.getText();
      var chars = block.getCharacterList();
      var headText = text.slice(0, targetOffset);
      var headCharacters = chars.slice(0, targetOffset);
      var appendToHead = fragment.first();
      return block.merge({
        text: headText + appendToHead.getText(),
        characterList: headCharacters.concat(appendToHead.getCharacterList()),
        type: headText ? block.getType() : appendToHead.getType(),
        data: appendToHead.getData()
      });
    };
    var updateTail = function updateTail2(block, targetOffset, fragment) {
      var text = block.getText();
      var chars = block.getCharacterList();
      var blockSize = text.length;
      var tailText = text.slice(targetOffset, blockSize);
      var tailCharacters = chars.slice(targetOffset, blockSize);
      var prependToTail = fragment.last();
      return prependToTail.merge({
        text: prependToTail.getText() + tailText,
        characterList: prependToTail.getCharacterList().concat(tailCharacters),
        data: prependToTail.getData()
      });
    };
    var getRootBlocks = function getRootBlocks2(block, blockMap) {
      var headKey = block.getKey();
      var rootBlock = block;
      var rootBlocks = [];
      if (blockMap.get(headKey)) {
        rootBlocks.push(headKey);
      }
      while (rootBlock && rootBlock.getNextSiblingKey()) {
        var lastSiblingKey = rootBlock.getNextSiblingKey();
        if (!lastSiblingKey) {
          break;
        }
        rootBlocks.push(lastSiblingKey);
        rootBlock = blockMap.get(lastSiblingKey);
      }
      return rootBlocks;
    };
    var updateBlockMapLinks = function updateBlockMapLinks2(blockMap, originalBlockMap, targetBlock, fragmentHeadBlock) {
      return blockMap.withMutations(function(blockMapState) {
        var targetKey = targetBlock.getKey();
        var headKey = fragmentHeadBlock.getKey();
        var targetNextKey = targetBlock.getNextSiblingKey();
        var targetParentKey = targetBlock.getParentKey();
        var fragmentRootBlocks = getRootBlocks(fragmentHeadBlock, blockMap);
        var lastRootFragmentBlockKey = fragmentRootBlocks[fragmentRootBlocks.length - 1];
        if (blockMapState.get(headKey)) {
          blockMapState.setIn([targetKey, "nextSibling"], headKey);
          blockMapState.setIn([headKey, "prevSibling"], targetKey);
        } else {
          blockMapState.setIn([targetKey, "nextSibling"], fragmentHeadBlock.getNextSiblingKey());
          blockMapState.setIn([fragmentHeadBlock.getNextSiblingKey(), "prevSibling"], targetKey);
        }
        blockMapState.setIn([lastRootFragmentBlockKey, "nextSibling"], targetNextKey);
        if (targetNextKey) {
          blockMapState.setIn([targetNextKey, "prevSibling"], lastRootFragmentBlockKey);
        }
        fragmentRootBlocks.forEach(function(blockKey) {
          return blockMapState.setIn([blockKey, "parent"], targetParentKey);
        });
        if (targetParentKey) {
          var targetParent = blockMap.get(targetParentKey);
          var originalTargetParentChildKeys = targetParent.getChildKeys();
          var targetBlockIndex = originalTargetParentChildKeys.indexOf(targetKey);
          var insertionIndex = targetBlockIndex + 1;
          var newChildrenKeysArray = originalTargetParentChildKeys.toArray();
          newChildrenKeysArray.splice.apply(newChildrenKeysArray, [insertionIndex, 0].concat(fragmentRootBlocks));
          blockMapState.setIn([targetParentKey, "children"], List(newChildrenKeysArray));
        }
      });
    };
    var insertFragment = function insertFragment2(contentState, selectionState, blockMap, fragment, targetKey, targetOffset) {
      var isTreeBasedBlockMap = blockMap.first() instanceof ContentBlockNode;
      var newBlockArr = [];
      var fragmentSize = fragment.size;
      var target = blockMap.get(targetKey);
      var head = fragment.first();
      var tail = fragment.last();
      var finalOffset = tail.getLength();
      var finalKey = tail.getKey();
      var shouldNotUpdateFromFragmentBlock = isTreeBasedBlockMap && (!target.getChildKeys().isEmpty() || !head.getChildKeys().isEmpty());
      blockMap.forEach(function(block, blockKey) {
        if (blockKey !== targetKey) {
          newBlockArr.push(block);
          return;
        }
        if (shouldNotUpdateFromFragmentBlock) {
          newBlockArr.push(block);
        } else {
          newBlockArr.push(updateHead(block, targetOffset, fragment));
        }
        fragment.slice(shouldNotUpdateFromFragmentBlock ? 0 : 1, fragmentSize - 1).forEach(function(fragmentBlock) {
          return newBlockArr.push(fragmentBlock);
        });
        newBlockArr.push(updateTail(block, targetOffset, fragment));
      });
      var updatedBlockMap = BlockMapBuilder.createFromArray(newBlockArr);
      if (isTreeBasedBlockMap) {
        updatedBlockMap = updateBlockMapLinks(updatedBlockMap, blockMap, target, head);
      }
      return contentState.merge({
        blockMap: updatedBlockMap,
        selectionBefore: selectionState,
        selectionAfter: selectionState.merge({
          anchorKey: finalKey,
          anchorOffset: finalOffset,
          focusKey: finalKey,
          focusOffset: finalOffset,
          isBackward: false
        })
      });
    };
    var insertFragmentIntoContentState = function insertFragmentIntoContentState2(contentState, selectionState, fragmentBlockMap) {
      var mergeBlockData = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "REPLACE_WITH_NEW_DATA";
      !selectionState.isCollapsed() ? true ? invariant(false, "`insertFragment` should only be called with a collapsed selection state.") : invariant(false) : void 0;
      var blockMap = contentState.getBlockMap();
      var fragment = randomizeBlockMapKeys(fragmentBlockMap);
      var targetKey = selectionState.getStartKey();
      var targetOffset = selectionState.getStartOffset();
      var targetBlock = blockMap.get(targetKey);
      if (targetBlock instanceof ContentBlockNode) {
        !targetBlock.getChildKeys().isEmpty() ? true ? invariant(false, "`insertFragment` should not be called when a container node is selected.") : invariant(false) : void 0;
      }
      if (fragment.size === 1) {
        return updateExistingBlock(contentState, selectionState, blockMap, fragment.first(), targetKey, targetOffset, mergeBlockData);
      }
      return insertFragment(contentState, selectionState, blockMap, fragment, targetKey, targetOffset);
    };
    module.exports = insertFragmentIntoContentState;
  }
});

// node_modules/draft-js/lib/insertTextIntoContentState.js
var require_insertTextIntoContentState = __commonJS({
  "node_modules/draft-js/lib/insertTextIntoContentState.js"(exports, module) {
    "use strict";
    var Immutable = require_immutable();
    var insertIntoList = require_insertIntoList();
    var invariant = require_invariant();
    var Repeat = Immutable.Repeat;
    function insertTextIntoContentState(contentState, selectionState, text, characterMetadata) {
      !selectionState.isCollapsed() ? true ? invariant(false, "`insertText` should only be called with a collapsed range.") : invariant(false) : void 0;
      var len = null;
      if (text != null) {
        len = text.length;
      }
      if (len == null || len === 0) {
        return contentState;
      }
      var blockMap = contentState.getBlockMap();
      var key = selectionState.getStartKey();
      var offset = selectionState.getStartOffset();
      var block = blockMap.get(key);
      var blockText = block.getText();
      var newBlock = block.merge({
        text: blockText.slice(0, offset) + text + blockText.slice(offset, block.getLength()),
        characterList: insertIntoList(block.getCharacterList(), Repeat(characterMetadata, len).toList(), offset)
      });
      var newOffset = offset + len;
      return contentState.merge({
        blockMap: blockMap.set(key, newBlock),
        selectionAfter: selectionState.merge({
          anchorOffset: newOffset,
          focusOffset: newOffset
        })
      });
    }
    module.exports = insertTextIntoContentState;
  }
});

// node_modules/draft-js/lib/modifyBlockForContentState.js
var require_modifyBlockForContentState = __commonJS({
  "node_modules/draft-js/lib/modifyBlockForContentState.js"(exports, module) {
    "use strict";
    var Immutable = require_immutable();
    var Map = Immutable.Map;
    function modifyBlockForContentState(contentState, selectionState, operation) {
      var startKey = selectionState.getStartKey();
      var endKey = selectionState.getEndKey();
      var blockMap = contentState.getBlockMap();
      var newBlocks = blockMap.toSeq().skipUntil(function(_, k) {
        return k === startKey;
      }).takeUntil(function(_, k) {
        return k === endKey;
      }).concat(Map([[endKey, blockMap.get(endKey)]])).map(operation);
      return contentState.merge({
        blockMap: blockMap.merge(newBlocks),
        selectionBefore: selectionState,
        selectionAfter: selectionState
      });
    }
    module.exports = modifyBlockForContentState;
  }
});

// node_modules/draft-js/lib/getNextDelimiterBlockKey.js
var require_getNextDelimiterBlockKey = __commonJS({
  "node_modules/draft-js/lib/getNextDelimiterBlockKey.js"(exports, module) {
    "use strict";
    var ContentBlockNode = require_ContentBlockNode();
    var getNextDelimiterBlockKey = function getNextDelimiterBlockKey2(block, blockMap) {
      var isExperimentalTreeBlock = block instanceof ContentBlockNode;
      if (!isExperimentalTreeBlock) {
        return null;
      }
      var nextSiblingKey = block.getNextSiblingKey();
      if (nextSiblingKey) {
        return nextSiblingKey;
      }
      var parent = block.getParentKey();
      if (!parent) {
        return null;
      }
      var nextNonDescendantBlock = blockMap.get(parent);
      while (nextNonDescendantBlock && !nextNonDescendantBlock.getNextSiblingKey()) {
        var parentKey = nextNonDescendantBlock.getParentKey();
        nextNonDescendantBlock = parentKey ? blockMap.get(parentKey) : null;
      }
      if (!nextNonDescendantBlock) {
        return null;
      }
      return nextNonDescendantBlock.getNextSiblingKey();
    };
    module.exports = getNextDelimiterBlockKey;
  }
});

// node_modules/draft-js/lib/removeRangeFromContentState.js
var require_removeRangeFromContentState = __commonJS({
  "node_modules/draft-js/lib/removeRangeFromContentState.js"(exports, module) {
    "use strict";
    var ContentBlockNode = require_ContentBlockNode();
    var getNextDelimiterBlockKey = require_getNextDelimiterBlockKey();
    var Immutable = require_immutable();
    var List = Immutable.List;
    var Map = Immutable.Map;
    var transformBlock = function transformBlock2(key, blockMap, func) {
      if (!key) {
        return;
      }
      var block = blockMap.get(key);
      if (!block) {
        return;
      }
      blockMap.set(key, func(block));
    };
    var getAncestorsKeys = function getAncestorsKeys2(blockKey, blockMap) {
      var parents = [];
      if (!blockKey) {
        return parents;
      }
      var blockNode = blockMap.get(blockKey);
      while (blockNode && blockNode.getParentKey()) {
        var parentKey = blockNode.getParentKey();
        if (parentKey) {
          parents.push(parentKey);
        }
        blockNode = parentKey ? blockMap.get(parentKey) : null;
      }
      return parents;
    };
    var getNextDelimitersBlockKeys = function getNextDelimitersBlockKeys2(block, blockMap) {
      var nextDelimiters = [];
      if (!block) {
        return nextDelimiters;
      }
      var nextDelimiter = getNextDelimiterBlockKey(block, blockMap);
      while (nextDelimiter && blockMap.get(nextDelimiter)) {
        var _block = blockMap.get(nextDelimiter);
        nextDelimiters.push(nextDelimiter);
        nextDelimiter = _block.getParentKey() ? getNextDelimiterBlockKey(_block, blockMap) : null;
      }
      return nextDelimiters;
    };
    var getNextValidSibling = function getNextValidSibling2(block, blockMap, originalBlockMap) {
      if (!block) {
        return null;
      }
      var nextValidSiblingKey = originalBlockMap.get(block.getKey()).getNextSiblingKey();
      while (nextValidSiblingKey && !blockMap.get(nextValidSiblingKey)) {
        nextValidSiblingKey = originalBlockMap.get(nextValidSiblingKey).getNextSiblingKey() || null;
      }
      return nextValidSiblingKey;
    };
    var getPrevValidSibling = function getPrevValidSibling2(block, blockMap, originalBlockMap) {
      if (!block) {
        return null;
      }
      var prevValidSiblingKey = originalBlockMap.get(block.getKey()).getPrevSiblingKey();
      while (prevValidSiblingKey && !blockMap.get(prevValidSiblingKey)) {
        prevValidSiblingKey = originalBlockMap.get(prevValidSiblingKey).getPrevSiblingKey() || null;
      }
      return prevValidSiblingKey;
    };
    var updateBlockMapLinks = function updateBlockMapLinks2(blockMap, startBlock, endBlock, originalBlockMap) {
      return blockMap.withMutations(function(blocks) {
        transformBlock(startBlock.getKey(), blocks, function(block) {
          return block.merge({
            nextSibling: getNextValidSibling(block, blocks, originalBlockMap),
            prevSibling: getPrevValidSibling(block, blocks, originalBlockMap)
          });
        });
        transformBlock(endBlock.getKey(), blocks, function(block) {
          return block.merge({
            nextSibling: getNextValidSibling(block, blocks, originalBlockMap),
            prevSibling: getPrevValidSibling(block, blocks, originalBlockMap)
          });
        });
        getAncestorsKeys(startBlock.getKey(), originalBlockMap).forEach(function(parentKey) {
          return transformBlock(parentKey, blocks, function(block) {
            return block.merge({
              children: block.getChildKeys().filter(function(key) {
                return blocks.get(key);
              }),
              nextSibling: getNextValidSibling(block, blocks, originalBlockMap),
              prevSibling: getPrevValidSibling(block, blocks, originalBlockMap)
            });
          });
        });
        transformBlock(startBlock.getNextSiblingKey(), blocks, function(block) {
          return block.merge({
            prevSibling: startBlock.getPrevSiblingKey()
          });
        });
        transformBlock(startBlock.getPrevSiblingKey(), blocks, function(block) {
          return block.merge({
            nextSibling: getNextValidSibling(block, blocks, originalBlockMap)
          });
        });
        transformBlock(endBlock.getNextSiblingKey(), blocks, function(block) {
          return block.merge({
            prevSibling: getPrevValidSibling(block, blocks, originalBlockMap)
          });
        });
        transformBlock(endBlock.getPrevSiblingKey(), blocks, function(block) {
          return block.merge({
            nextSibling: endBlock.getNextSiblingKey()
          });
        });
        getAncestorsKeys(endBlock.getKey(), originalBlockMap).forEach(function(parentKey) {
          transformBlock(parentKey, blocks, function(block) {
            return block.merge({
              children: block.getChildKeys().filter(function(key) {
                return blocks.get(key);
              }),
              nextSibling: getNextValidSibling(block, blocks, originalBlockMap),
              prevSibling: getPrevValidSibling(block, blocks, originalBlockMap)
            });
          });
        });
        getNextDelimitersBlockKeys(endBlock, originalBlockMap).forEach(function(delimiterKey) {
          return transformBlock(delimiterKey, blocks, function(block) {
            return block.merge({
              nextSibling: getNextValidSibling(block, blocks, originalBlockMap),
              prevSibling: getPrevValidSibling(block, blocks, originalBlockMap)
            });
          });
        });
        if (blockMap.get(startBlock.getKey()) == null && blockMap.get(endBlock.getKey()) != null && endBlock.getParentKey() === startBlock.getKey() && endBlock.getPrevSiblingKey() == null) {
          var prevSiblingKey = startBlock.getPrevSiblingKey();
          transformBlock(endBlock.getKey(), blocks, function(block) {
            return block.merge({
              prevSibling: prevSiblingKey
            });
          });
          transformBlock(prevSiblingKey, blocks, function(block) {
            return block.merge({
              nextSibling: endBlock.getKey()
            });
          });
          var prevSibling = prevSiblingKey ? blockMap.get(prevSiblingKey) : null;
          var newParentKey = prevSibling ? prevSibling.getParentKey() : null;
          startBlock.getChildKeys().forEach(function(childKey) {
            transformBlock(childKey, blocks, function(block) {
              return block.merge({
                parent: newParentKey
                // set to null if there is no parent
              });
            });
          });
          if (newParentKey != null) {
            var newParent = blockMap.get(newParentKey);
            transformBlock(newParentKey, blocks, function(block) {
              return block.merge({
                children: newParent.getChildKeys().concat(startBlock.getChildKeys())
              });
            });
          }
          transformBlock(startBlock.getChildKeys().find(function(key) {
            var block = blockMap.get(key);
            return block.getNextSiblingKey() === null;
          }), blocks, function(block) {
            return block.merge({
              nextSibling: startBlock.getNextSiblingKey()
            });
          });
        }
      });
    };
    var removeRangeFromContentState = function removeRangeFromContentState2(contentState, selectionState) {
      if (selectionState.isCollapsed()) {
        return contentState;
      }
      var blockMap = contentState.getBlockMap();
      var startKey = selectionState.getStartKey();
      var startOffset = selectionState.getStartOffset();
      var endKey = selectionState.getEndKey();
      var endOffset = selectionState.getEndOffset();
      var startBlock = blockMap.get(startKey);
      var endBlock = blockMap.get(endKey);
      var isExperimentalTreeBlock = startBlock instanceof ContentBlockNode;
      var parentAncestors = [];
      if (isExperimentalTreeBlock) {
        var endBlockchildrenKeys = endBlock.getChildKeys();
        var endBlockAncestors = getAncestorsKeys(endKey, blockMap);
        if (endBlock.getNextSiblingKey()) {
          parentAncestors = parentAncestors.concat(endBlockAncestors);
        }
        if (!endBlockchildrenKeys.isEmpty()) {
          parentAncestors = parentAncestors.concat(endBlockAncestors.concat([endKey]));
        }
        parentAncestors = parentAncestors.concat(getAncestorsKeys(getNextDelimiterBlockKey(endBlock, blockMap), blockMap));
      }
      var characterList;
      if (startBlock === endBlock) {
        characterList = removeFromList(startBlock.getCharacterList(), startOffset, endOffset);
      } else {
        characterList = startBlock.getCharacterList().slice(0, startOffset).concat(endBlock.getCharacterList().slice(endOffset));
      }
      var modifiedStart = startBlock.merge({
        text: startBlock.getText().slice(0, startOffset) + endBlock.getText().slice(endOffset),
        characterList
      });
      var shouldDeleteParent = isExperimentalTreeBlock && startOffset === 0 && endOffset === 0 && endBlock.getParentKey() === startKey && endBlock.getPrevSiblingKey() == null;
      var newBlocks = shouldDeleteParent ? Map([[startKey, null]]) : blockMap.toSeq().skipUntil(function(_, k) {
        return k === startKey;
      }).takeUntil(function(_, k) {
        return k === endKey;
      }).filter(function(_, k) {
        return parentAncestors.indexOf(k) === -1;
      }).concat(Map([[endKey, null]])).map(function(_, k) {
        return k === startKey ? modifiedStart : null;
      });
      var updatedBlockMap = blockMap.merge(newBlocks).filter(function(block) {
        return !!block;
      });
      if (isExperimentalTreeBlock && startBlock !== endBlock) {
        updatedBlockMap = updateBlockMapLinks(updatedBlockMap, startBlock, endBlock, blockMap);
      }
      return contentState.merge({
        blockMap: updatedBlockMap,
        selectionBefore: selectionState,
        selectionAfter: selectionState.merge({
          anchorKey: startKey,
          anchorOffset: startOffset,
          focusKey: startKey,
          focusOffset: startOffset,
          isBackward: false
        })
      });
    };
    var removeFromList = function removeFromList2(targetList, startOffset, endOffset) {
      if (startOffset === 0) {
        while (startOffset < endOffset) {
          targetList = targetList.shift();
          startOffset++;
        }
      } else if (endOffset === targetList.count()) {
        while (endOffset > startOffset) {
          targetList = targetList.pop();
          endOffset--;
        }
      } else {
        var head = targetList.slice(0, startOffset);
        var tail = targetList.slice(endOffset);
        targetList = head.concat(tail).toList();
      }
      return targetList;
    };
    module.exports = removeRangeFromContentState;
  }
});

// node_modules/draft-js/lib/splitBlockInContentState.js
var require_splitBlockInContentState = __commonJS({
  "node_modules/draft-js/lib/splitBlockInContentState.js"(exports, module) {
    "use strict";
    var ContentBlockNode = require_ContentBlockNode();
    var generateRandomKey = require_generateRandomKey();
    var Immutable = require_immutable();
    var invariant = require_invariant();
    var modifyBlockForContentState = require_modifyBlockForContentState();
    var List = Immutable.List;
    var Map = Immutable.Map;
    var transformBlock = function transformBlock2(key, blockMap, func) {
      if (!key) {
        return;
      }
      var block = blockMap.get(key);
      if (!block) {
        return;
      }
      blockMap.set(key, func(block));
    };
    var updateBlockMapLinks = function updateBlockMapLinks2(blockMap, originalBlock, belowBlock) {
      return blockMap.withMutations(function(blocks) {
        var originalBlockKey = originalBlock.getKey();
        var belowBlockKey = belowBlock.getKey();
        transformBlock(originalBlock.getParentKey(), blocks, function(block) {
          var parentChildrenList = block.getChildKeys();
          var insertionIndex = parentChildrenList.indexOf(originalBlockKey) + 1;
          var newChildrenArray = parentChildrenList.toArray();
          newChildrenArray.splice(insertionIndex, 0, belowBlockKey);
          return block.merge({
            children: List(newChildrenArray)
          });
        });
        transformBlock(originalBlock.getNextSiblingKey(), blocks, function(block) {
          return block.merge({
            prevSibling: belowBlockKey
          });
        });
        transformBlock(originalBlockKey, blocks, function(block) {
          return block.merge({
            nextSibling: belowBlockKey
          });
        });
        transformBlock(belowBlockKey, blocks, function(block) {
          return block.merge({
            prevSibling: originalBlockKey
          });
        });
      });
    };
    var splitBlockInContentState = function splitBlockInContentState2(contentState, selectionState) {
      !selectionState.isCollapsed() ? true ? invariant(false, "Selection range must be collapsed.") : invariant(false) : void 0;
      var key = selectionState.getAnchorKey();
      var blockMap = contentState.getBlockMap();
      var blockToSplit = blockMap.get(key);
      var text = blockToSplit.getText();
      if (!text) {
        var blockType = blockToSplit.getType();
        if (blockType === "unordered-list-item" || blockType === "ordered-list-item") {
          return modifyBlockForContentState(contentState, selectionState, function(block) {
            return block.merge({
              type: "unstyled",
              depth: 0
            });
          });
        }
      }
      var offset = selectionState.getAnchorOffset();
      var chars = blockToSplit.getCharacterList();
      var keyBelow = generateRandomKey();
      var isExperimentalTreeBlock = blockToSplit instanceof ContentBlockNode;
      var blockAbove = blockToSplit.merge({
        text: text.slice(0, offset),
        characterList: chars.slice(0, offset)
      });
      var blockBelow = blockAbove.merge({
        key: keyBelow,
        text: text.slice(offset),
        characterList: chars.slice(offset),
        data: Map()
      });
      var blocksBefore = blockMap.toSeq().takeUntil(function(v) {
        return v === blockToSplit;
      });
      var blocksAfter = blockMap.toSeq().skipUntil(function(v) {
        return v === blockToSplit;
      }).rest();
      var newBlocks = blocksBefore.concat([[key, blockAbove], [keyBelow, blockBelow]], blocksAfter).toOrderedMap();
      if (isExperimentalTreeBlock) {
        !blockToSplit.getChildKeys().isEmpty() ? true ? invariant(false, "ContentBlockNode must not have children") : invariant(false) : void 0;
        newBlocks = updateBlockMapLinks(newBlocks, blockAbove, blockBelow);
      }
      return contentState.merge({
        blockMap: newBlocks,
        selectionBefore: selectionState,
        selectionAfter: selectionState.merge({
          anchorKey: keyBelow,
          anchorOffset: 0,
          focusKey: keyBelow,
          focusOffset: 0,
          isBackward: false
        })
      });
    };
    module.exports = splitBlockInContentState;
  }
});

// node_modules/draft-js/lib/DraftModifier.js
var require_DraftModifier = __commonJS({
  "node_modules/draft-js/lib/DraftModifier.js"(exports, module) {
    "use strict";
    var CharacterMetadata = require_CharacterMetadata();
    var ContentStateInlineStyle = require_ContentStateInlineStyle();
    var applyEntityToContentState = require_applyEntityToContentState();
    var getCharacterRemovalRange = require_getCharacterRemovalRange();
    var getContentStateFragment = require_getContentStateFragment();
    var Immutable = require_immutable();
    var insertFragmentIntoContentState = require_insertFragmentIntoContentState();
    var insertTextIntoContentState = require_insertTextIntoContentState();
    var invariant = require_invariant();
    var modifyBlockForContentState = require_modifyBlockForContentState();
    var removeEntitiesAtEdges = require_removeEntitiesAtEdges();
    var removeRangeFromContentState = require_removeRangeFromContentState();
    var splitBlockInContentState = require_splitBlockInContentState();
    var OrderedSet = Immutable.OrderedSet;
    var DraftModifier = {
      replaceText: function replaceText(contentState, rangeToReplace, text, inlineStyle, entityKey) {
        var withoutEntities = removeEntitiesAtEdges(contentState, rangeToReplace);
        var withoutText = removeRangeFromContentState(withoutEntities, rangeToReplace);
        var character = CharacterMetadata.create({
          style: inlineStyle || OrderedSet(),
          entity: entityKey || null
        });
        return insertTextIntoContentState(withoutText, withoutText.getSelectionAfter(), text, character);
      },
      insertText: function insertText(contentState, targetRange, text, inlineStyle, entityKey) {
        !targetRange.isCollapsed() ? true ? invariant(false, "Target range must be collapsed for `insertText`.") : invariant(false) : void 0;
        return DraftModifier.replaceText(contentState, targetRange, text, inlineStyle, entityKey);
      },
      moveText: function moveText(contentState, removalRange, targetRange) {
        var movedFragment = getContentStateFragment(contentState, removalRange);
        var afterRemoval = DraftModifier.removeRange(contentState, removalRange, "backward");
        return DraftModifier.replaceWithFragment(afterRemoval, targetRange, movedFragment);
      },
      replaceWithFragment: function replaceWithFragment(contentState, targetRange, fragment) {
        var mergeBlockData = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "REPLACE_WITH_NEW_DATA";
        var withoutEntities = removeEntitiesAtEdges(contentState, targetRange);
        var withoutText = removeRangeFromContentState(withoutEntities, targetRange);
        return insertFragmentIntoContentState(withoutText, withoutText.getSelectionAfter(), fragment, mergeBlockData);
      },
      removeRange: function removeRange(contentState, rangeToRemove, removalDirection) {
        var startKey, endKey, startBlock, endBlock;
        if (rangeToRemove.getIsBackward()) {
          rangeToRemove = rangeToRemove.merge({
            anchorKey: rangeToRemove.getFocusKey(),
            anchorOffset: rangeToRemove.getFocusOffset(),
            focusKey: rangeToRemove.getAnchorKey(),
            focusOffset: rangeToRemove.getAnchorOffset(),
            isBackward: false
          });
        }
        startKey = rangeToRemove.getAnchorKey();
        endKey = rangeToRemove.getFocusKey();
        startBlock = contentState.getBlockForKey(startKey);
        endBlock = contentState.getBlockForKey(endKey);
        var startOffset = rangeToRemove.getStartOffset();
        var endOffset = rangeToRemove.getEndOffset();
        var startEntityKey = startBlock.getEntityAt(startOffset);
        var endEntityKey = endBlock.getEntityAt(endOffset - 1);
        if (startKey === endKey) {
          if (startEntityKey && startEntityKey === endEntityKey) {
            var adjustedRemovalRange = getCharacterRemovalRange(contentState.getEntityMap(), startBlock, endBlock, rangeToRemove, removalDirection);
            return removeRangeFromContentState(contentState, adjustedRemovalRange);
          }
        }
        var withoutEntities = removeEntitiesAtEdges(contentState, rangeToRemove);
        return removeRangeFromContentState(withoutEntities, rangeToRemove);
      },
      splitBlock: function splitBlock(contentState, selectionState) {
        var withoutEntities = removeEntitiesAtEdges(contentState, selectionState);
        var withoutText = removeRangeFromContentState(withoutEntities, selectionState);
        return splitBlockInContentState(withoutText, withoutText.getSelectionAfter());
      },
      applyInlineStyle: function applyInlineStyle(contentState, selectionState, inlineStyle) {
        return ContentStateInlineStyle.add(contentState, selectionState, inlineStyle);
      },
      removeInlineStyle: function removeInlineStyle(contentState, selectionState, inlineStyle) {
        return ContentStateInlineStyle.remove(contentState, selectionState, inlineStyle);
      },
      setBlockType: function setBlockType(contentState, selectionState, blockType) {
        return modifyBlockForContentState(contentState, selectionState, function(block) {
          return block.merge({
            type: blockType,
            depth: 0
          });
        });
      },
      setBlockData: function setBlockData(contentState, selectionState, blockData) {
        return modifyBlockForContentState(contentState, selectionState, function(block) {
          return block.merge({
            data: blockData
          });
        });
      },
      mergeBlockData: function mergeBlockData(contentState, selectionState, blockData) {
        return modifyBlockForContentState(contentState, selectionState, function(block) {
          return block.merge({
            data: block.getData().merge(blockData)
          });
        });
      },
      applyEntity: function applyEntity(contentState, selectionState, entityKey) {
        var withoutEntities = removeEntitiesAtEdges(contentState, selectionState);
        return applyEntityToContentState(withoutEntities, selectionState, entityKey);
      }
    };
    module.exports = DraftModifier;
  }
});

// node_modules/draft-js/lib/getOwnObjectValues.js
var require_getOwnObjectValues = __commonJS({
  "node_modules/draft-js/lib/getOwnObjectValues.js"(exports, module) {
    "use strict";
    function getOwnObjectValues(obj) {
      return Object.keys(obj).map(function(key) {
        return obj[key];
      });
    }
    module.exports = getOwnObjectValues;
  }
});

// node_modules/draft-js/lib/BlockTree.js
var require_BlockTree = __commonJS({
  "node_modules/draft-js/lib/BlockTree.js"(exports, module) {
    "use strict";
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var findRangesImmutable = require_findRangesImmutable();
    var getOwnObjectValues = require_getOwnObjectValues();
    var Immutable = require_immutable();
    var List = Immutable.List;
    var Repeat = Immutable.Repeat;
    var Record = Immutable.Record;
    var returnTrue = function returnTrue2() {
      return true;
    };
    var defaultLeafRange = {
      start: null,
      end: null
    };
    var LeafRange = Record(defaultLeafRange);
    var defaultDecoratorRange = {
      start: null,
      end: null,
      decoratorKey: null,
      leaves: null
    };
    var DecoratorRange = Record(defaultDecoratorRange);
    var BlockTree = {
      /**
       * Generate a block tree for a given ContentBlock/decorator pair.
       */
      generate: function generate(contentState, block, decorator) {
        var textLength = block.getLength();
        if (!textLength) {
          return List.of(new DecoratorRange({
            start: 0,
            end: 0,
            decoratorKey: null,
            leaves: List.of(new LeafRange({
              start: 0,
              end: 0
            }))
          }));
        }
        var leafSets = [];
        var decorations = decorator ? decorator.getDecorations(block, contentState) : List(Repeat(null, textLength));
        var chars = block.getCharacterList();
        findRangesImmutable(decorations, areEqual, returnTrue, function(start, end) {
          leafSets.push(new DecoratorRange({
            start,
            end,
            decoratorKey: decorations.get(start),
            leaves: generateLeaves(chars.slice(start, end).toList(), start)
          }));
        });
        return List(leafSets);
      },
      fromJS: function fromJS(_ref) {
        var leaves = _ref.leaves, other = _objectWithoutPropertiesLoose(_ref, ["leaves"]);
        return new DecoratorRange(_objectSpread({}, other, {
          leaves: leaves != null ? List(Array.isArray(leaves) ? leaves : getOwnObjectValues(leaves)).map(function(leaf) {
            return LeafRange(leaf);
          }) : null
        }));
      }
    };
    function generateLeaves(characters, offset) {
      var leaves = [];
      var inlineStyles = characters.map(function(c) {
        return c.getStyle();
      }).toList();
      findRangesImmutable(inlineStyles, areEqual, returnTrue, function(start, end) {
        leaves.push(new LeafRange({
          start: start + offset,
          end: end + offset
        }));
      });
      return List(leaves);
    }
    function areEqual(a, b) {
      return a === b;
    }
    module.exports = BlockTree;
  }
});

// node_modules/draft-js/lib/DraftEntityInstance.js
var require_DraftEntityInstance = __commonJS({
  "node_modules/draft-js/lib/DraftEntityInstance.js"(exports, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var Immutable = require_immutable();
    var Record = Immutable.Record;
    var DraftEntityInstanceRecord = Record({
      type: "TOKEN",
      mutability: "IMMUTABLE",
      data: Object
    });
    var DraftEntityInstance = function(_DraftEntityInstanceR) {
      _inheritsLoose(DraftEntityInstance2, _DraftEntityInstanceR);
      function DraftEntityInstance2() {
        return _DraftEntityInstanceR.apply(this, arguments) || this;
      }
      var _proto = DraftEntityInstance2.prototype;
      _proto.getType = function getType() {
        return this.get("type");
      };
      _proto.getMutability = function getMutability() {
        return this.get("mutability");
      };
      _proto.getData = function getData() {
        return this.get("data");
      };
      return DraftEntityInstance2;
    }(DraftEntityInstanceRecord);
    module.exports = DraftEntityInstance;
  }
});

// node_modules/draft-js/lib/uuid.js
var require_uuid = __commonJS({
  "node_modules/draft-js/lib/uuid.js"(exports, module) {
    "use strict";
    function uuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        var v = c == "x" ? r : r & 3 | 8;
        return v.toString(16);
      });
    }
    module.exports = uuid;
  }
});

// node_modules/draft-js/lib/DraftEntity.js
var require_DraftEntity = __commonJS({
  "node_modules/draft-js/lib/DraftEntity.js"(exports, module) {
    "use strict";
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var DraftEntityInstance = require_DraftEntityInstance();
    var Immutable = require_immutable();
    var invariant = require_invariant();
    var uuid = require_uuid();
    var Map = Immutable.Map;
    var instances = Map();
    var instanceKey = uuid();
    function logWarning(oldMethodCall, newMethodCall) {
      console.warn("WARNING: " + oldMethodCall + ' will be deprecated soon!\nPlease use "' + newMethodCall + '" instead.');
    }
    var DraftEntity = {
      /**
       * WARNING: This method will be deprecated soon!
       * Please use 'contentState.getLastCreatedEntityKey' instead.
       * ---
       * Get the random key string from whatever entity was last created.
       * We need this to support the new API, as part of transitioning to put Entity
       * storage in contentState.
       */
      getLastCreatedEntityKey: function getLastCreatedEntityKey() {
        logWarning("DraftEntity.getLastCreatedEntityKey", "contentState.getLastCreatedEntityKey");
        return DraftEntity.__getLastCreatedEntityKey();
      },
      /**
       * WARNING: This method will be deprecated soon!
       * Please use 'contentState.createEntity' instead.
       * ---
       * Create a DraftEntityInstance and store it for later retrieval.
       *
       * A random key string will be generated and returned. This key may
       * be used to track the entity's usage in a ContentBlock, and for
       * retrieving data about the entity at render time.
       */
      create: function create(type, mutability, data) {
        logWarning("DraftEntity.create", "contentState.createEntity");
        return DraftEntity.__create(type, mutability, data);
      },
      /**
       * WARNING: This method will be deprecated soon!
       * Please use 'contentState.addEntity' instead.
       * ---
       * Add an existing DraftEntityInstance to the DraftEntity map. This is
       * useful when restoring instances from the server.
       */
      add: function add(instance) {
        logWarning("DraftEntity.add", "contentState.addEntity");
        return DraftEntity.__add(instance);
      },
      /**
       * WARNING: This method will be deprecated soon!
       * Please use 'contentState.getEntity' instead.
       * ---
       * Retrieve the entity corresponding to the supplied key string.
       */
      get: function get(key) {
        logWarning("DraftEntity.get", "contentState.getEntity");
        return DraftEntity.__get(key);
      },
      /**
       * Get all the entities in the content state.
       */
      __getAll: function __getAll() {
        return instances;
      },
      /**
       * Load the entity map with the given set of entities.
       */
      __loadWithEntities: function __loadWithEntities(entities) {
        instances = entities;
        instanceKey = uuid();
      },
      /**
       * WARNING: This method will be deprecated soon!
       * Please use 'contentState.mergeEntityData' instead.
       * ---
       * Entity instances are immutable. If you need to update the data for an
       * instance, this method will merge your data updates and return a new
       * instance.
       */
      mergeData: function mergeData(key, toMerge) {
        logWarning("DraftEntity.mergeData", "contentState.mergeEntityData");
        return DraftEntity.__mergeData(key, toMerge);
      },
      /**
       * WARNING: This method will be deprecated soon!
       * Please use 'contentState.replaceEntityData' instead.
       * ---
       * Completely replace the data for a given instance.
       */
      replaceData: function replaceData(key, newData) {
        logWarning("DraftEntity.replaceData", "contentState.replaceEntityData");
        return DraftEntity.__replaceData(key, newData);
      },
      // ***********************************WARNING******************************
      // --- the above public API will be deprecated in the next version of Draft!
      // The methods below this line are private - don't call them directly.
      /**
       * Get the random key string from whatever entity was last created.
       * We need this to support the new API, as part of transitioning to put Entity
       * storage in contentState.
       */
      __getLastCreatedEntityKey: function __getLastCreatedEntityKey() {
        return instanceKey;
      },
      /**
       * Create a DraftEntityInstance and store it for later retrieval.
       *
       * A random key string will be generated and returned. This key may
       * be used to track the entity's usage in a ContentBlock, and for
       * retrieving data about the entity at render time.
       */
      __create: function __create(type, mutability, data) {
        return DraftEntity.__add(new DraftEntityInstance({
          type,
          mutability,
          data: data || {}
        }));
      },
      /**
       * Add an existing DraftEntityInstance to the DraftEntity map. This is
       * useful when restoring instances from the server.
       */
      __add: function __add(instance) {
        instanceKey = uuid();
        instances = instances.set(instanceKey, instance);
        return instanceKey;
      },
      /**
       * Retrieve the entity corresponding to the supplied key string.
       */
      __get: function __get(key) {
        var instance = instances.get(key);
        !!!instance ? true ? invariant(false, "Unknown DraftEntity key: %s.", key) : invariant(false) : void 0;
        return instance;
      },
      /**
       * Entity instances are immutable. If you need to update the data for an
       * instance, this method will merge your data updates and return a new
       * instance.
       */
      __mergeData: function __mergeData(key, toMerge) {
        var instance = DraftEntity.__get(key);
        var newData = _objectSpread({}, instance.getData(), toMerge);
        var newInstance = instance.set("data", newData);
        instances = instances.set(key, newInstance);
        return newInstance;
      },
      /**
       * Completely replace the data for a given instance.
       */
      __replaceData: function __replaceData(key, newData) {
        var instance = DraftEntity.__get(key);
        var newInstance = instance.set("data", newData);
        instances = instances.set(key, newInstance);
        return newInstance;
      }
    };
    module.exports = DraftEntity;
  }
});

// node_modules/draft-js/lib/SelectionState.js
var require_SelectionState = __commonJS({
  "node_modules/draft-js/lib/SelectionState.js"(exports, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var Immutable = require_immutable();
    var Record = Immutable.Record;
    var defaultRecord = {
      anchorKey: "",
      anchorOffset: 0,
      focusKey: "",
      focusOffset: 0,
      isBackward: false,
      hasFocus: false
    };
    var SelectionStateRecord = Record(defaultRecord);
    var SelectionState = function(_SelectionStateRecord) {
      _inheritsLoose(SelectionState2, _SelectionStateRecord);
      function SelectionState2() {
        return _SelectionStateRecord.apply(this, arguments) || this;
      }
      var _proto = SelectionState2.prototype;
      _proto.serialize = function serialize() {
        return "Anchor: " + this.getAnchorKey() + ":" + this.getAnchorOffset() + ", Focus: " + this.getFocusKey() + ":" + this.getFocusOffset() + ", Is Backward: " + String(this.getIsBackward()) + ", Has Focus: " + String(this.getHasFocus());
      };
      _proto.getAnchorKey = function getAnchorKey() {
        return this.get("anchorKey");
      };
      _proto.getAnchorOffset = function getAnchorOffset() {
        return this.get("anchorOffset");
      };
      _proto.getFocusKey = function getFocusKey() {
        return this.get("focusKey");
      };
      _proto.getFocusOffset = function getFocusOffset() {
        return this.get("focusOffset");
      };
      _proto.getIsBackward = function getIsBackward() {
        return this.get("isBackward");
      };
      _proto.getHasFocus = function getHasFocus() {
        return this.get("hasFocus");
      };
      _proto.hasEdgeWithin = function hasEdgeWithin(blockKey, start, end) {
        var anchorKey = this.getAnchorKey();
        var focusKey = this.getFocusKey();
        if (anchorKey === focusKey && anchorKey === blockKey) {
          var selectionStart = this.getStartOffset();
          var selectionEnd = this.getEndOffset();
          return start <= selectionStart && selectionStart <= end || // selectionStart is between start and end, or
          start <= selectionEnd && selectionEnd <= end;
        }
        if (blockKey !== anchorKey && blockKey !== focusKey) {
          return false;
        }
        var offsetToCheck = blockKey === anchorKey ? this.getAnchorOffset() : this.getFocusOffset();
        return start <= offsetToCheck && end >= offsetToCheck;
      };
      _proto.isCollapsed = function isCollapsed() {
        return this.getAnchorKey() === this.getFocusKey() && this.getAnchorOffset() === this.getFocusOffset();
      };
      _proto.getStartKey = function getStartKey() {
        return this.getIsBackward() ? this.getFocusKey() : this.getAnchorKey();
      };
      _proto.getStartOffset = function getStartOffset() {
        return this.getIsBackward() ? this.getFocusOffset() : this.getAnchorOffset();
      };
      _proto.getEndKey = function getEndKey() {
        return this.getIsBackward() ? this.getAnchorKey() : this.getFocusKey();
      };
      _proto.getEndOffset = function getEndOffset() {
        return this.getIsBackward() ? this.getAnchorOffset() : this.getFocusOffset();
      };
      SelectionState2.createEmpty = function createEmpty(key) {
        return new SelectionState2({
          anchorKey: key,
          anchorOffset: 0,
          focusKey: key,
          focusOffset: 0,
          isBackward: false,
          hasFocus: false
        });
      };
      return SelectionState2;
    }(SelectionStateRecord);
    module.exports = SelectionState;
  }
});

// node_modules/draft-js/lib/gkx.js
var require_gkx = __commonJS({
  "node_modules/draft-js/lib/gkx.js"(exports, module) {
    "use strict";
    module.exports = function(name) {
      if (typeof window !== "undefined" && window.__DRAFT_GKX) {
        return !!window.__DRAFT_GKX[name];
      }
      return false;
    };
  }
});

// node_modules/draft-js/lib/sanitizeDraftText.js
var require_sanitizeDraftText = __commonJS({
  "node_modules/draft-js/lib/sanitizeDraftText.js"(exports, module) {
    "use strict";
    var REGEX_BLOCK_DELIMITER = new RegExp("\r", "g");
    function sanitizeDraftText(input) {
      return input.replace(REGEX_BLOCK_DELIMITER, "");
    }
    module.exports = sanitizeDraftText;
  }
});

// node_modules/draft-js/lib/ContentState.js
var require_ContentState = __commonJS({
  "node_modules/draft-js/lib/ContentState.js"(exports, module) {
    "use strict";
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var BlockMapBuilder = require_BlockMapBuilder();
    var CharacterMetadata = require_CharacterMetadata();
    var ContentBlock = require_ContentBlock();
    var ContentBlockNode = require_ContentBlockNode();
    var DraftEntity = require_DraftEntity();
    var SelectionState = require_SelectionState();
    var generateRandomKey = require_generateRandomKey();
    var getOwnObjectValues = require_getOwnObjectValues();
    var gkx = require_gkx();
    var Immutable = require_immutable();
    var sanitizeDraftText = require_sanitizeDraftText();
    var List = Immutable.List;
    var Record = Immutable.Record;
    var Repeat = Immutable.Repeat;
    var ImmutableMap = Immutable.Map;
    var OrderedMap = Immutable.OrderedMap;
    var defaultRecord = {
      entityMap: null,
      blockMap: null,
      selectionBefore: null,
      selectionAfter: null
    };
    var ContentStateRecord = Record(defaultRecord);
    var ContentBlockNodeRecord = gkx("draft_tree_data_support") ? ContentBlockNode : ContentBlock;
    var ContentState = function(_ContentStateRecord) {
      _inheritsLoose(ContentState2, _ContentStateRecord);
      function ContentState2() {
        return _ContentStateRecord.apply(this, arguments) || this;
      }
      var _proto = ContentState2.prototype;
      _proto.getEntityMap = function getEntityMap() {
        return DraftEntity;
      };
      _proto.getBlockMap = function getBlockMap() {
        return this.get("blockMap");
      };
      _proto.getSelectionBefore = function getSelectionBefore() {
        return this.get("selectionBefore");
      };
      _proto.getSelectionAfter = function getSelectionAfter() {
        return this.get("selectionAfter");
      };
      _proto.getBlockForKey = function getBlockForKey(key) {
        var block = this.getBlockMap().get(key);
        return block;
      };
      _proto.getKeyBefore = function getKeyBefore(key) {
        return this.getBlockMap().reverse().keySeq().skipUntil(function(v) {
          return v === key;
        }).skip(1).first();
      };
      _proto.getKeyAfter = function getKeyAfter(key) {
        return this.getBlockMap().keySeq().skipUntil(function(v) {
          return v === key;
        }).skip(1).first();
      };
      _proto.getBlockAfter = function getBlockAfter(key) {
        return this.getBlockMap().skipUntil(function(_, k) {
          return k === key;
        }).skip(1).first();
      };
      _proto.getBlockBefore = function getBlockBefore(key) {
        return this.getBlockMap().reverse().skipUntil(function(_, k) {
          return k === key;
        }).skip(1).first();
      };
      _proto.getBlocksAsArray = function getBlocksAsArray() {
        return this.getBlockMap().toArray();
      };
      _proto.getFirstBlock = function getFirstBlock() {
        return this.getBlockMap().first();
      };
      _proto.getLastBlock = function getLastBlock() {
        return this.getBlockMap().last();
      };
      _proto.getPlainText = function getPlainText(delimiter) {
        return this.getBlockMap().map(function(block) {
          return block ? block.getText() : "";
        }).join(delimiter || "\n");
      };
      _proto.getLastCreatedEntityKey = function getLastCreatedEntityKey() {
        return DraftEntity.__getLastCreatedEntityKey();
      };
      _proto.hasText = function hasText() {
        var blockMap = this.getBlockMap();
        return blockMap.size > 1 || // make sure that there are no zero width space chars
        escape(blockMap.first().getText()).replace(/%u200B/g, "").length > 0;
      };
      _proto.createEntity = function createEntity(type, mutability, data) {
        DraftEntity.__create(type, mutability, data);
        return this;
      };
      _proto.mergeEntityData = function mergeEntityData(key, toMerge) {
        DraftEntity.__mergeData(key, toMerge);
        return this;
      };
      _proto.replaceEntityData = function replaceEntityData(key, newData) {
        DraftEntity.__replaceData(key, newData);
        return this;
      };
      _proto.addEntity = function addEntity(instance) {
        DraftEntity.__add(instance);
        return this;
      };
      _proto.getEntity = function getEntity(key) {
        return DraftEntity.__get(key);
      };
      _proto.getAllEntities = function getAllEntities() {
        return DraftEntity.__getAll();
      };
      _proto.loadWithEntities = function loadWithEntities(entities) {
        return DraftEntity.__loadWithEntities(entities);
      };
      ContentState2.createFromBlockArray = function createFromBlockArray(blocks, entityMap) {
        var theBlocks = Array.isArray(blocks) ? blocks : blocks.contentBlocks;
        var blockMap = BlockMapBuilder.createFromArray(theBlocks);
        var selectionState = blockMap.isEmpty() ? new SelectionState() : SelectionState.createEmpty(blockMap.first().getKey());
        return new ContentState2({
          blockMap,
          entityMap: entityMap || DraftEntity,
          selectionBefore: selectionState,
          selectionAfter: selectionState
        });
      };
      ContentState2.createFromText = function createFromText(text) {
        var delimiter = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /\r\n?|\n/g;
        var strings = text.split(delimiter);
        var blocks = strings.map(function(block) {
          block = sanitizeDraftText(block);
          return new ContentBlockNodeRecord({
            key: generateRandomKey(),
            text: block,
            type: "unstyled",
            characterList: List(Repeat(CharacterMetadata.EMPTY, block.length))
          });
        });
        return ContentState2.createFromBlockArray(blocks);
      };
      ContentState2.fromJS = function fromJS(state) {
        return new ContentState2(_objectSpread({}, state, {
          blockMap: OrderedMap(state.blockMap).map(ContentState2.createContentBlockFromJS),
          selectionBefore: new SelectionState(state.selectionBefore),
          selectionAfter: new SelectionState(state.selectionAfter)
        }));
      };
      ContentState2.createContentBlockFromJS = function createContentBlockFromJS(block) {
        var characterList = block.characterList;
        return new ContentBlockNodeRecord(_objectSpread({}, block, {
          data: ImmutableMap(block.data),
          characterList: characterList != null ? List((Array.isArray(characterList) ? characterList : getOwnObjectValues(characterList)).map(function(c) {
            return CharacterMetadata.fromJS(c);
          })) : void 0
        }));
      };
      return ContentState2;
    }(ContentStateRecord);
    module.exports = ContentState;
  }
});

// node_modules/fbjs/lib/UnicodeBidiDirection.js
var require_UnicodeBidiDirection = __commonJS({
  "node_modules/fbjs/lib/UnicodeBidiDirection.js"(exports, module) {
    "use strict";
    var invariant = require_invariant();
    var NEUTRAL = "NEUTRAL";
    var LTR = "LTR";
    var RTL = "RTL";
    var globalDir = null;
    function isStrong(dir) {
      return dir === LTR || dir === RTL;
    }
    function getHTMLDir(dir) {
      !isStrong(dir) ? true ? invariant(false, "`dir` must be a strong direction to be converted to HTML Direction") : invariant(false) : void 0;
      return dir === LTR ? "ltr" : "rtl";
    }
    function getHTMLDirIfDifferent(dir, otherDir) {
      !isStrong(dir) ? true ? invariant(false, "`dir` must be a strong direction to be converted to HTML Direction") : invariant(false) : void 0;
      !isStrong(otherDir) ? true ? invariant(false, "`otherDir` must be a strong direction to be converted to HTML Direction") : invariant(false) : void 0;
      return dir === otherDir ? null : getHTMLDir(dir);
    }
    function setGlobalDir(dir) {
      globalDir = dir;
    }
    function initGlobalDir() {
      setGlobalDir(LTR);
    }
    function getGlobalDir() {
      if (!globalDir) {
        this.initGlobalDir();
      }
      !globalDir ? true ? invariant(false, "Global direction not set.") : invariant(false) : void 0;
      return globalDir;
    }
    var UnicodeBidiDirection = {
      // Values
      NEUTRAL,
      LTR,
      RTL,
      // Helpers
      isStrong,
      getHTMLDir,
      getHTMLDirIfDifferent,
      // Global Direction
      setGlobalDir,
      initGlobalDir,
      getGlobalDir
    };
    module.exports = UnicodeBidiDirection;
  }
});

// node_modules/fbjs/lib/UnicodeBidi.js
var require_UnicodeBidi = __commonJS({
  "node_modules/fbjs/lib/UnicodeBidi.js"(exports, module) {
    "use strict";
    var UnicodeBidiDirection = require_UnicodeBidiDirection();
    var invariant = require_invariant();
    var RANGE_BY_BIDI_TYPE = {
      L: "A-Za-zªµºÀ-ÖØ-öø-ƺƻƼ-ƿǀ-ǃǄ-ʓʔʕ-ʯʰ-ʸʻ-ˁː-ˑˠ-ˤˮͰ-ͳͶ-ͷͺͻ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҂Ҋ-ԯԱ-Ֆՙ՚-՟ա-և։ःऄ-हऻऽा-ीॉ-ौॎ-ॏॐक़-ॡ।-॥०-९॰ॱॲ-ঀং-ঃঅ-ঌএ-ঐও-নপ-রলশ-হঽা-ীে-ৈো-ৌৎৗড়-ঢ়য়-ৡ০-৯ৰ-ৱ৴-৹৺ਃਅ-ਊਏ-ਐਓ-ਨਪ-ਰਲ-ਲ਼ਵ-ਸ਼ਸ-ਹਾ-ੀਖ਼-ੜਫ਼੦-੯ੲ-ੴઃઅ-ઍએ-ઑઓ-નપ-રલ-ળવ-હઽા-ીૉો-ૌૐૠ-ૡ૦-૯૰ଂ-ଃଅ-ଌଏ-ଐଓ-ନପ-ରଲ-ଳଵ-ହଽାୀେ-ୈୋ-ୌୗଡ଼-ଢ଼ୟ-ୡ୦-୯୰ୱ୲-୷ஃஅ-ஊஎ-ஐஒ-கங-சஜஞ-டண-தந-பம-ஹா-ிு-ூெ-ைொ-ௌௐௗ௦-௯௰-௲ఁ-ఃఅ-ఌఎ-ఐఒ-నప-హఽు-ౄౘ-ౙౠ-ౡ౦-౯౿ಂ-ಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽಾಿೀ-ೄೆೇ-ೈೊ-ೋೕ-ೖೞೠ-ೡ೦-೯ೱ-ೲം-ഃഅ-ഌഎ-ഐഒ-ഺഽാ-ീെ-ൈൊ-ൌൎൗൠ-ൡ൦-൯൰-൵൹ൺ-ൿං-ඃඅ-ඖක-නඳ-රලව-ෆා-ෑෘ-ෟ෦-෯ෲ-ෳ෴ก-ะา-ำเ-ๅๆ๏๐-๙๚-๛ກ-ຂຄງ-ຈຊຍດ-ທນ-ຟມ-ຣລວສ-ຫອ-ະາ-ຳຽເ-ໄໆ໐-໙ໜ-ໟༀ༁-༃༄-༒༓༔༕-༗༚-༟༠-༩༪-༳༴༶༸༾-༿ཀ-ཇཉ-ཬཿ྅ྈ-ྌ྾-࿅࿇-࿌࿎-࿏࿐-࿔࿕-࿘࿙-࿚က-ဪါ-ာေးျ-ြဿ၀-၉၊-၏ၐ-ၕၖ-ၗၚ-ၝၡၢ-ၤၥ-ၦၧ-ၭၮ-ၰၵ-ႁႃ-ႄႇ-ႌႎႏ႐-႙ႚ-ႜ႞-႟Ⴀ-ჅჇჍა-ჺ჻ჼჽ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፠-፨፩-፼ᎀ-ᎏᎠ-Ᏼᐁ-ᙬ᙭-᙮ᙯ-ᙿᚁ-ᚚᚠ-ᛪ᛫-᛭ᛮ-ᛰᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱ᜵-᜶ᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳាើ-ៅះ-ៈ។-៖ៗ៘-៚ៜ០-៩᠐-᠙ᠠ-ᡂᡃᡄ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᤣ-ᤦᤩ-ᤫᤰ-ᤱᤳ-ᤸ᥆-᥏ᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧀᧁ-ᧇᧈ-ᧉ᧐-᧙᧚ᨀ-ᨖᨙ-ᨚ᨞-᨟ᨠ-ᩔᩕᩗᩡᩣ-ᩤᩭ-ᩲ᪀-᪉᪐-᪙᪠-᪦ᪧ᪨-᪭ᬄᬅ-ᬳᬵᬻᬽ-ᭁᭃ-᭄ᭅ-ᭋ᭐-᭙᭚-᭠᭡-᭪᭴-᭼ᮂᮃ-ᮠᮡᮦ-ᮧ᮪ᮮ-ᮯ᮰-᮹ᮺ-ᯥᯧᯪ-ᯬᯮ᯲-᯳᯼-᯿ᰀ-ᰣᰤ-ᰫᰴ-ᰵ᰻-᰿᱀-᱉ᱍ-ᱏ᱐-᱙ᱚ-ᱷᱸ-ᱽ᱾-᱿᳀-᳇᳓᳡ᳩ-ᳬᳮ-ᳱᳲ-ᳳᳵ-ᳶᴀ-ᴫᴬ-ᵪᵫ-ᵷᵸᵹ-ᶚᶛ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‎ⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℴℵ-ℸℹℼ-ℿⅅ-ⅉⅎ⅏Ⅰ-ↂↃ-ↄↅ-ↈ⌶-⍺⎕⒜-ⓩ⚬⠀-⣿Ⰰ-Ⱞⰰ-ⱞⱠ-ⱻⱼ-ⱽⱾ-ⳤⳫ-ⳮⳲ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵰ⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々〆〇〡-〩〮-〯〱-〵〸-〺〻〼ぁ-ゖゝ-ゞゟァ-ヺー-ヾヿㄅ-ㄭㄱ-ㆎ㆐-㆑㆒-㆕㆖-㆟ㆠ-ㆺㇰ-ㇿ㈀-㈜㈠-㈩㈪-㉇㉈-㉏㉠-㉻㉿㊀-㊉㊊-㊰㋀-㋋㋐-㋾㌀-㍶㍻-㏝㏠-㏾㐀-䶵一-鿌ꀀ-ꀔꀕꀖ-ꒌꓐ-ꓷꓸ-ꓽ꓾-꓿ꔀ-ꘋꘌꘐ-ꘟ꘠-꘩ꘪ-ꘫꙀ-ꙭꙮꚀ-ꚛꚜ-ꚝꚠ-ꛥꛦ-ꛯ꛲-꛷Ꜣ-ꝯꝰꝱ-ꞇ꞉-꞊Ꞌ-ꞎꞐ-ꞭꞰ-Ʇꟷꟸ-ꟹꟺꟻ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꠣ-ꠤꠧ꠰-꠵꠶-꠷ꡀ-ꡳꢀ-ꢁꢂ-ꢳꢴ-ꣃ꣎-꣏꣐-꣙ꣲ-ꣷ꣸-꣺ꣻ꤀-꤉ꤊ-ꤥ꤮-꤯ꤰ-ꥆꥒ-꥓꥟ꥠ-ꥼꦃꦄ-ꦲꦴ-ꦵꦺ-ꦻꦽ-꧀꧁-꧍ꧏ꧐-꧙꧞-꧟ꧠ-ꧤꧦꧧ-ꧯ꧰-꧹ꧺ-ꧾꨀ-ꨨꨯ-ꨰꨳ-ꨴꩀ-ꩂꩄ-ꩋꩍ꩐-꩙꩜-꩟ꩠ-ꩯꩰꩱ-ꩶ꩷-꩹ꩺꩻꩽꩾ-ꪯꪱꪵ-ꪶꪹ-ꪽꫀꫂꫛ-ꫜꫝ꫞-꫟ꫠ-ꫪꫫꫮ-ꫯ꫰-꫱ꫲꫳ-ꫴꫵꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚ꭛ꭜ-ꭟꭤ-ꭥꯀ-ꯢꯣ-ꯤꯦ-ꯧꯩ-ꯪ꯫꯬꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ-豈-舘並-龎ﬀ-ﬆﬓ-ﬗＡ-Ｚａ-ｚｦ-ｯｰｱ-ﾝﾞ-ﾟﾠ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
      R: "֐־׀׃׆׈-׏א-ת׫-ׯװ-ײ׳-״׵-׿߀-߉ߊ-ߪߴ-ߵߺ߻-߿ࠀ-ࠕࠚࠤࠨ࠮-࠯࠰-࠾࠿ࡀ-ࡘ࡜-࡝࡞࡟-࢟‏יִײַ-ﬨשׁ-זּ﬷טּ-לּ﬽מּ﬿נּ-סּ﭂ףּ-פּ﭅צּ-ﭏ",
      AL: "؈؋؍؛؜؝؞-؟ؠ-ؿـف-ي٭ٮ-ٯٱ-ۓ۔ەۥ-ۦۮ-ۯۺ-ۼ۽-۾ۿ܀-܍܎܏ܐܒ-ܯ݋-݌ݍ-ޥޱ޲-޿ࢠ-ࢲࢳ-ࣣﭐ-ﮱ﮲-﯁﯂-﯒ﯓ-ﴽ﵀-﵏ﵐ-ﶏ﶐-﶑ﶒ-ﷇ﷈-﷏ﷰ-ﷻ﷼﷾-﷿ﹰ-ﹴ﹵ﹶ-ﻼ﻽-﻾"
    };
    var REGEX_STRONG = new RegExp("[" + RANGE_BY_BIDI_TYPE.L + RANGE_BY_BIDI_TYPE.R + RANGE_BY_BIDI_TYPE.AL + "]");
    var REGEX_RTL = new RegExp("[" + RANGE_BY_BIDI_TYPE.R + RANGE_BY_BIDI_TYPE.AL + "]");
    function firstStrongChar(str) {
      var match = REGEX_STRONG.exec(str);
      return match == null ? null : match[0];
    }
    function firstStrongCharDir(str) {
      var strongChar = firstStrongChar(str);
      if (strongChar == null) {
        return UnicodeBidiDirection.NEUTRAL;
      }
      return REGEX_RTL.exec(strongChar) ? UnicodeBidiDirection.RTL : UnicodeBidiDirection.LTR;
    }
    function resolveBlockDir(str, fallback) {
      fallback = fallback || UnicodeBidiDirection.NEUTRAL;
      if (!str.length) {
        return fallback;
      }
      var blockDir = firstStrongCharDir(str);
      return blockDir === UnicodeBidiDirection.NEUTRAL ? fallback : blockDir;
    }
    function getDirection(str, strongFallback) {
      if (!strongFallback) {
        strongFallback = UnicodeBidiDirection.getGlobalDir();
      }
      !UnicodeBidiDirection.isStrong(strongFallback) ? true ? invariant(false, "Fallback direction must be a strong direction") : invariant(false) : void 0;
      return resolveBlockDir(str, strongFallback);
    }
    function isDirectionLTR(str, strongFallback) {
      return getDirection(str, strongFallback) === UnicodeBidiDirection.LTR;
    }
    function isDirectionRTL(str, strongFallback) {
      return getDirection(str, strongFallback) === UnicodeBidiDirection.RTL;
    }
    var UnicodeBidi = {
      firstStrongChar,
      firstStrongCharDir,
      resolveBlockDir,
      getDirection,
      isDirectionLTR,
      isDirectionRTL
    };
    module.exports = UnicodeBidi;
  }
});

// node_modules/fbjs/lib/UnicodeBidiService.js
var require_UnicodeBidiService = __commonJS({
  "node_modules/fbjs/lib/UnicodeBidiService.js"(exports, module) {
    "use strict";
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var UnicodeBidi = require_UnicodeBidi();
    var UnicodeBidiDirection = require_UnicodeBidiDirection();
    var invariant = require_invariant();
    var UnicodeBidiService = function() {
      function UnicodeBidiService2(defaultDir) {
        _defineProperty(this, "_defaultDir", void 0);
        _defineProperty(this, "_lastDir", void 0);
        if (!defaultDir) {
          defaultDir = UnicodeBidiDirection.getGlobalDir();
        } else {
          !UnicodeBidiDirection.isStrong(defaultDir) ? true ? invariant(false, "Default direction must be a strong direction (LTR or RTL)") : invariant(false) : void 0;
        }
        this._defaultDir = defaultDir;
        this.reset();
      }
      var _proto = UnicodeBidiService2.prototype;
      _proto.reset = function reset() {
        this._lastDir = this._defaultDir;
      };
      _proto.getDirection = function getDirection(str) {
        this._lastDir = UnicodeBidi.getDirection(str, this._lastDir);
        return this._lastDir;
      };
      return UnicodeBidiService2;
    }();
    module.exports = UnicodeBidiService;
  }
});

// node_modules/fbjs/lib/nullthrows.js
var require_nullthrows = __commonJS({
  "node_modules/fbjs/lib/nullthrows.js"(exports, module) {
    "use strict";
    var nullthrows = function nullthrows2(x) {
      if (x != null) {
        return x;
      }
      throw new Error("Got unexpected null or undefined");
    };
    module.exports = nullthrows;
  }
});

// node_modules/draft-js/lib/EditorBidiService.js
var require_EditorBidiService = __commonJS({
  "node_modules/draft-js/lib/EditorBidiService.js"(exports, module) {
    "use strict";
    var UnicodeBidiService = require_UnicodeBidiService();
    var Immutable = require_immutable();
    var nullthrows = require_nullthrows();
    var OrderedMap = Immutable.OrderedMap;
    var bidiService;
    var EditorBidiService = {
      getDirectionMap: function getDirectionMap(content, prevBidiMap) {
        if (!bidiService) {
          bidiService = new UnicodeBidiService();
        } else {
          bidiService.reset();
        }
        var blockMap = content.getBlockMap();
        var nextBidi = blockMap.valueSeq().map(function(block) {
          return nullthrows(bidiService).getDirection(block.getText());
        });
        var bidiMap = OrderedMap(blockMap.keySeq().zip(nextBidi));
        if (prevBidiMap != null && Immutable.is(prevBidiMap, bidiMap)) {
          return prevBidiMap;
        }
        return bidiMap;
      }
    };
    module.exports = EditorBidiService;
  }
});

// node_modules/draft-js/lib/EditorState.js
var require_EditorState = __commonJS({
  "node_modules/draft-js/lib/EditorState.js"(exports, module) {
    "use strict";
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var BlockTree = require_BlockTree();
    var ContentState = require_ContentState();
    var EditorBidiService = require_EditorBidiService();
    var SelectionState = require_SelectionState();
    var Immutable = require_immutable();
    var OrderedSet = Immutable.OrderedSet;
    var Record = Immutable.Record;
    var Stack = Immutable.Stack;
    var OrderedMap = Immutable.OrderedMap;
    var List = Immutable.List;
    var defaultRecord = {
      allowUndo: true,
      currentContent: null,
      decorator: null,
      directionMap: null,
      forceSelection: false,
      inCompositionMode: false,
      inlineStyleOverride: null,
      lastChangeType: null,
      nativelyRenderedContent: null,
      redoStack: Stack(),
      selection: null,
      treeMap: null,
      undoStack: Stack()
    };
    var EditorStateRecord = Record(defaultRecord);
    var EditorState = function() {
      EditorState2.createEmpty = function createEmpty(decorator) {
        return this.createWithText("", decorator);
      };
      EditorState2.createWithText = function createWithText(text, decorator) {
        return EditorState2.createWithContent(ContentState.createFromText(text), decorator);
      };
      EditorState2.createWithContent = function createWithContent(contentState, decorator) {
        if (contentState.getBlockMap().count() === 0) {
          return EditorState2.createEmpty(decorator);
        }
        var firstKey = contentState.getBlockMap().first().getKey();
        return EditorState2.create({
          currentContent: contentState,
          undoStack: Stack(),
          redoStack: Stack(),
          decorator: decorator || null,
          selection: SelectionState.createEmpty(firstKey)
        });
      };
      EditorState2.create = function create(config) {
        var currentContent = config.currentContent, decorator = config.decorator;
        var recordConfig = _objectSpread({}, config, {
          treeMap: generateNewTreeMap(currentContent, decorator),
          directionMap: EditorBidiService.getDirectionMap(currentContent)
        });
        return new EditorState2(new EditorStateRecord(recordConfig));
      };
      EditorState2.fromJS = function fromJS(config) {
        return new EditorState2(new EditorStateRecord(_objectSpread({}, config, {
          directionMap: config.directionMap != null ? OrderedMap(config.directionMap) : config.directionMap,
          inlineStyleOverride: config.inlineStyleOverride != null ? OrderedSet(config.inlineStyleOverride) : config.inlineStyleOverride,
          nativelyRenderedContent: config.nativelyRenderedContent != null ? ContentState.fromJS(config.nativelyRenderedContent) : config.nativelyRenderedContent,
          redoStack: config.redoStack != null ? Stack(config.redoStack.map(function(v) {
            return ContentState.fromJS(v);
          })) : config.redoStack,
          selection: config.selection != null ? new SelectionState(config.selection) : config.selection,
          treeMap: config.treeMap != null ? OrderedMap(config.treeMap).map(function(v) {
            return List(v).map(function(v2) {
              return BlockTree.fromJS(v2);
            });
          }) : config.treeMap,
          undoStack: config.undoStack != null ? Stack(config.undoStack.map(function(v) {
            return ContentState.fromJS(v);
          })) : config.undoStack,
          currentContent: ContentState.fromJS(config.currentContent)
        })));
      };
      EditorState2.set = function set(editorState, put) {
        var map = editorState.getImmutable().withMutations(function(state) {
          var existingDecorator = state.get("decorator");
          var decorator = existingDecorator;
          if (put.decorator === null) {
            decorator = null;
          } else if (put.decorator) {
            decorator = put.decorator;
          }
          var newContent = put.currentContent || editorState.getCurrentContent();
          if (decorator !== existingDecorator) {
            var treeMap = state.get("treeMap");
            var newTreeMap;
            if (decorator && existingDecorator) {
              newTreeMap = regenerateTreeForNewDecorator(newContent, newContent.getBlockMap(), treeMap, decorator, existingDecorator);
            } else {
              newTreeMap = generateNewTreeMap(newContent, decorator);
            }
            state.merge({
              decorator,
              treeMap: newTreeMap,
              nativelyRenderedContent: null
            });
            return;
          }
          var existingContent = editorState.getCurrentContent();
          if (newContent !== existingContent) {
            state.set("treeMap", regenerateTreeForNewBlocks(editorState, newContent.getBlockMap(), newContent.getEntityMap(), decorator));
          }
          state.merge(put);
        });
        return new EditorState2(map);
      };
      var _proto = EditorState2.prototype;
      _proto.toJS = function toJS() {
        return this.getImmutable().toJS();
      };
      _proto.getAllowUndo = function getAllowUndo() {
        return this.getImmutable().get("allowUndo");
      };
      _proto.getCurrentContent = function getCurrentContent() {
        return this.getImmutable().get("currentContent");
      };
      _proto.getUndoStack = function getUndoStack() {
        return this.getImmutable().get("undoStack");
      };
      _proto.getRedoStack = function getRedoStack() {
        return this.getImmutable().get("redoStack");
      };
      _proto.getSelection = function getSelection() {
        return this.getImmutable().get("selection");
      };
      _proto.getDecorator = function getDecorator() {
        return this.getImmutable().get("decorator");
      };
      _proto.isInCompositionMode = function isInCompositionMode() {
        return this.getImmutable().get("inCompositionMode");
      };
      _proto.mustForceSelection = function mustForceSelection() {
        return this.getImmutable().get("forceSelection");
      };
      _proto.getNativelyRenderedContent = function getNativelyRenderedContent() {
        return this.getImmutable().get("nativelyRenderedContent");
      };
      _proto.getLastChangeType = function getLastChangeType() {
        return this.getImmutable().get("lastChangeType");
      };
      _proto.getInlineStyleOverride = function getInlineStyleOverride() {
        return this.getImmutable().get("inlineStyleOverride");
      };
      EditorState2.setInlineStyleOverride = function setInlineStyleOverride(editorState, inlineStyleOverride) {
        return EditorState2.set(editorState, {
          inlineStyleOverride
        });
      };
      _proto.getCurrentInlineStyle = function getCurrentInlineStyle() {
        var override = this.getInlineStyleOverride();
        if (override != null) {
          return override;
        }
        var content = this.getCurrentContent();
        var selection = this.getSelection();
        if (selection.isCollapsed()) {
          return getInlineStyleForCollapsedSelection(content, selection);
        }
        return getInlineStyleForNonCollapsedSelection(content, selection);
      };
      _proto.getBlockTree = function getBlockTree(blockKey) {
        return this.getImmutable().getIn(["treeMap", blockKey]);
      };
      _proto.isSelectionAtStartOfContent = function isSelectionAtStartOfContent() {
        var firstKey = this.getCurrentContent().getBlockMap().first().getKey();
        return this.getSelection().hasEdgeWithin(firstKey, 0, 0);
      };
      _proto.isSelectionAtEndOfContent = function isSelectionAtEndOfContent() {
        var content = this.getCurrentContent();
        var blockMap = content.getBlockMap();
        var last = blockMap.last();
        var end = last.getLength();
        return this.getSelection().hasEdgeWithin(last.getKey(), end, end);
      };
      _proto.getDirectionMap = function getDirectionMap() {
        return this.getImmutable().get("directionMap");
      };
      EditorState2.acceptSelection = function acceptSelection(editorState, selection) {
        return updateSelection(editorState, selection, false);
      };
      EditorState2.forceSelection = function forceSelection(editorState, selection) {
        if (!selection.getHasFocus()) {
          selection = selection.set("hasFocus", true);
        }
        return updateSelection(editorState, selection, true);
      };
      EditorState2.moveSelectionToEnd = function moveSelectionToEnd(editorState) {
        var content = editorState.getCurrentContent();
        var lastBlock = content.getLastBlock();
        var lastKey = lastBlock.getKey();
        var length = lastBlock.getLength();
        return EditorState2.acceptSelection(editorState, new SelectionState({
          anchorKey: lastKey,
          anchorOffset: length,
          focusKey: lastKey,
          focusOffset: length,
          isBackward: false
        }));
      };
      EditorState2.moveFocusToEnd = function moveFocusToEnd(editorState) {
        var afterSelectionMove = EditorState2.moveSelectionToEnd(editorState);
        return EditorState2.forceSelection(afterSelectionMove, afterSelectionMove.getSelection());
      };
      EditorState2.push = function push(editorState, contentState, changeType) {
        var forceSelection = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
        if (editorState.getCurrentContent() === contentState) {
          return editorState;
        }
        var directionMap = EditorBidiService.getDirectionMap(contentState, editorState.getDirectionMap());
        if (!editorState.getAllowUndo()) {
          return EditorState2.set(editorState, {
            currentContent: contentState,
            directionMap,
            lastChangeType: changeType,
            selection: contentState.getSelectionAfter(),
            forceSelection,
            inlineStyleOverride: null
          });
        }
        var selection = editorState.getSelection();
        var currentContent = editorState.getCurrentContent();
        var undoStack = editorState.getUndoStack();
        var newContent = contentState;
        if (selection !== currentContent.getSelectionAfter() || mustBecomeBoundary(editorState, changeType)) {
          undoStack = undoStack.push(currentContent);
          newContent = newContent.set("selectionBefore", selection);
        } else if (changeType === "insert-characters" || changeType === "backspace-character" || changeType === "delete-character") {
          newContent = newContent.set("selectionBefore", currentContent.getSelectionBefore());
        }
        var inlineStyleOverride = editorState.getInlineStyleOverride();
        var overrideChangeTypes = ["adjust-depth", "change-block-type", "split-block"];
        if (overrideChangeTypes.indexOf(changeType) === -1) {
          inlineStyleOverride = null;
        }
        var editorStateChanges = {
          currentContent: newContent,
          directionMap,
          undoStack,
          redoStack: Stack(),
          lastChangeType: changeType,
          selection: contentState.getSelectionAfter(),
          forceSelection,
          inlineStyleOverride
        };
        return EditorState2.set(editorState, editorStateChanges);
      };
      EditorState2.undo = function undo(editorState) {
        if (!editorState.getAllowUndo()) {
          return editorState;
        }
        var undoStack = editorState.getUndoStack();
        var newCurrentContent = undoStack.peek();
        if (!newCurrentContent) {
          return editorState;
        }
        var currentContent = editorState.getCurrentContent();
        var directionMap = EditorBidiService.getDirectionMap(newCurrentContent, editorState.getDirectionMap());
        return EditorState2.set(editorState, {
          currentContent: newCurrentContent,
          directionMap,
          undoStack: undoStack.shift(),
          redoStack: editorState.getRedoStack().push(currentContent),
          forceSelection: true,
          inlineStyleOverride: null,
          lastChangeType: "undo",
          nativelyRenderedContent: null,
          selection: currentContent.getSelectionBefore()
        });
      };
      EditorState2.redo = function redo(editorState) {
        if (!editorState.getAllowUndo()) {
          return editorState;
        }
        var redoStack = editorState.getRedoStack();
        var newCurrentContent = redoStack.peek();
        if (!newCurrentContent) {
          return editorState;
        }
        var currentContent = editorState.getCurrentContent();
        var directionMap = EditorBidiService.getDirectionMap(newCurrentContent, editorState.getDirectionMap());
        return EditorState2.set(editorState, {
          currentContent: newCurrentContent,
          directionMap,
          undoStack: editorState.getUndoStack().push(currentContent),
          redoStack: redoStack.shift(),
          forceSelection: true,
          inlineStyleOverride: null,
          lastChangeType: "redo",
          nativelyRenderedContent: null,
          selection: newCurrentContent.getSelectionAfter()
        });
      };
      function EditorState2(immutable) {
        _defineProperty(this, "_immutable", void 0);
        this._immutable = immutable;
      }
      _proto.getImmutable = function getImmutable() {
        return this._immutable;
      };
      return EditorState2;
    }();
    function updateSelection(editorState, selection, forceSelection) {
      return EditorState.set(editorState, {
        selection,
        forceSelection,
        nativelyRenderedContent: null,
        inlineStyleOverride: null
      });
    }
    function generateNewTreeMap(contentState, decorator) {
      return contentState.getBlockMap().map(function(block) {
        return BlockTree.generate(contentState, block, decorator);
      }).toOrderedMap();
    }
    function regenerateTreeForNewBlocks(editorState, newBlockMap, newEntityMap, decorator) {
      var contentState = editorState.getCurrentContent().set("entityMap", newEntityMap);
      var prevBlockMap = contentState.getBlockMap();
      var prevTreeMap = editorState.getImmutable().get("treeMap");
      return prevTreeMap.merge(newBlockMap.toSeq().filter(function(block, key) {
        return block !== prevBlockMap.get(key);
      }).map(function(block) {
        return BlockTree.generate(contentState, block, decorator);
      }));
    }
    function regenerateTreeForNewDecorator(content, blockMap, previousTreeMap, decorator, existingDecorator) {
      return previousTreeMap.merge(blockMap.toSeq().filter(function(block) {
        return decorator.getDecorations(block, content) !== existingDecorator.getDecorations(block, content);
      }).map(function(block) {
        return BlockTree.generate(content, block, decorator);
      }));
    }
    function mustBecomeBoundary(editorState, changeType) {
      var lastChangeType = editorState.getLastChangeType();
      return changeType !== lastChangeType || changeType !== "insert-characters" && changeType !== "backspace-character" && changeType !== "delete-character";
    }
    function getInlineStyleForCollapsedSelection(content, selection) {
      var startKey = selection.getStartKey();
      var startOffset = selection.getStartOffset();
      var startBlock = content.getBlockForKey(startKey);
      if (startOffset > 0) {
        return startBlock.getInlineStyleAt(startOffset - 1);
      }
      if (startBlock.getLength()) {
        return startBlock.getInlineStyleAt(0);
      }
      return lookUpwardForInlineStyle(content, startKey);
    }
    function getInlineStyleForNonCollapsedSelection(content, selection) {
      var startKey = selection.getStartKey();
      var startOffset = selection.getStartOffset();
      var startBlock = content.getBlockForKey(startKey);
      if (startOffset < startBlock.getLength()) {
        return startBlock.getInlineStyleAt(startOffset);
      }
      if (startOffset > 0) {
        return startBlock.getInlineStyleAt(startOffset - 1);
      }
      return lookUpwardForInlineStyle(content, startKey);
    }
    function lookUpwardForInlineStyle(content, fromKey) {
      var lastNonEmpty = content.getBlockMap().reverse().skipUntil(function(_, k) {
        return k === fromKey;
      }).skip(1).skipUntil(function(block, _) {
        return block.getLength();
      }).first();
      if (lastNonEmpty) {
        return lastNonEmpty.getInlineStyleAt(lastNonEmpty.getLength() - 1);
      }
      return OrderedSet();
    }
    module.exports = EditorState;
  }
});

// node_modules/draft-js/lib/moveBlockInContentState.js
var require_moveBlockInContentState = __commonJS({
  "node_modules/draft-js/lib/moveBlockInContentState.js"(exports, module) {
    "use strict";
    var ContentBlockNode = require_ContentBlockNode();
    var getNextDelimiterBlockKey = require_getNextDelimiterBlockKey();
    var Immutable = require_immutable();
    var invariant = require_invariant();
    var OrderedMap = Immutable.OrderedMap;
    var List = Immutable.List;
    var transformBlock = function transformBlock2(key, blockMap, func) {
      if (!key) {
        return;
      }
      var block = blockMap.get(key);
      if (!block) {
        return;
      }
      blockMap.set(key, func(block));
    };
    var updateBlockMapLinks = function updateBlockMapLinks2(blockMap, originalBlockToBeMoved, originalTargetBlock, insertionMode, isExperimentalTreeBlock) {
      if (!isExperimentalTreeBlock) {
        return blockMap;
      }
      var isInsertedAfterTarget = insertionMode === "after";
      var originalBlockKey = originalBlockToBeMoved.getKey();
      var originalTargetKey = originalTargetBlock.getKey();
      var originalParentKey = originalBlockToBeMoved.getParentKey();
      var originalNextSiblingKey = originalBlockToBeMoved.getNextSiblingKey();
      var originalPrevSiblingKey = originalBlockToBeMoved.getPrevSiblingKey();
      var newParentKey = originalTargetBlock.getParentKey();
      var newNextSiblingKey = isInsertedAfterTarget ? originalTargetBlock.getNextSiblingKey() : originalTargetKey;
      var newPrevSiblingKey = isInsertedAfterTarget ? originalTargetKey : originalTargetBlock.getPrevSiblingKey();
      return blockMap.withMutations(function(blocks) {
        transformBlock(originalParentKey, blocks, function(block) {
          var parentChildrenList = block.getChildKeys();
          return block.merge({
            children: parentChildrenList["delete"](parentChildrenList.indexOf(originalBlockKey))
          });
        });
        transformBlock(originalPrevSiblingKey, blocks, function(block) {
          return block.merge({
            nextSibling: originalNextSiblingKey
          });
        });
        transformBlock(originalNextSiblingKey, blocks, function(block) {
          return block.merge({
            prevSibling: originalPrevSiblingKey
          });
        });
        transformBlock(newNextSiblingKey, blocks, function(block) {
          return block.merge({
            prevSibling: originalBlockKey
          });
        });
        transformBlock(newPrevSiblingKey, blocks, function(block) {
          return block.merge({
            nextSibling: originalBlockKey
          });
        });
        transformBlock(newParentKey, blocks, function(block) {
          var newParentChildrenList = block.getChildKeys();
          var targetBlockIndex = newParentChildrenList.indexOf(originalTargetKey);
          var insertionIndex = isInsertedAfterTarget ? targetBlockIndex + 1 : targetBlockIndex !== 0 ? targetBlockIndex - 1 : 0;
          var newChildrenArray = newParentChildrenList.toArray();
          newChildrenArray.splice(insertionIndex, 0, originalBlockKey);
          return block.merge({
            children: List(newChildrenArray)
          });
        });
        transformBlock(originalBlockKey, blocks, function(block) {
          return block.merge({
            nextSibling: newNextSiblingKey,
            prevSibling: newPrevSiblingKey,
            parent: newParentKey
          });
        });
      });
    };
    var moveBlockInContentState = function moveBlockInContentState2(contentState, blockToBeMoved, targetBlock, insertionMode) {
      !(insertionMode !== "replace") ? true ? invariant(false, "Replacing blocks is not supported.") : invariant(false) : void 0;
      var targetKey = targetBlock.getKey();
      var blockKey = blockToBeMoved.getKey();
      !(blockKey !== targetKey) ? true ? invariant(false, "Block cannot be moved next to itself.") : invariant(false) : void 0;
      var blockMap = contentState.getBlockMap();
      var isExperimentalTreeBlock = blockToBeMoved instanceof ContentBlockNode;
      var blocksToBeMoved = [blockToBeMoved];
      var blockMapWithoutBlocksToBeMoved = blockMap["delete"](blockKey);
      if (isExperimentalTreeBlock) {
        blocksToBeMoved = [];
        blockMapWithoutBlocksToBeMoved = blockMap.withMutations(function(blocks) {
          var nextSiblingKey = blockToBeMoved.getNextSiblingKey();
          var nextDelimiterBlockKey = getNextDelimiterBlockKey(blockToBeMoved, blocks);
          blocks.toSeq().skipUntil(function(block) {
            return block.getKey() === blockKey;
          }).takeWhile(function(block) {
            var key = block.getKey();
            var isBlockToBeMoved = key === blockKey;
            var hasNextSiblingAndIsNotNextSibling = nextSiblingKey && key !== nextSiblingKey;
            var doesNotHaveNextSiblingAndIsNotDelimiter = !nextSiblingKey && block.getParentKey() && (!nextDelimiterBlockKey || key !== nextDelimiterBlockKey);
            return !!(isBlockToBeMoved || hasNextSiblingAndIsNotNextSibling || doesNotHaveNextSiblingAndIsNotDelimiter);
          }).forEach(function(block) {
            blocksToBeMoved.push(block);
            blocks["delete"](block.getKey());
          });
        });
      }
      var blocksBefore = blockMapWithoutBlocksToBeMoved.toSeq().takeUntil(function(v) {
        return v === targetBlock;
      });
      var blocksAfter = blockMapWithoutBlocksToBeMoved.toSeq().skipUntil(function(v) {
        return v === targetBlock;
      }).skip(1);
      var slicedBlocks = blocksToBeMoved.map(function(block) {
        return [block.getKey(), block];
      });
      var newBlocks = OrderedMap();
      if (insertionMode === "before") {
        var blockBefore = contentState.getBlockBefore(targetKey);
        !(!blockBefore || blockBefore.getKey() !== blockToBeMoved.getKey()) ? true ? invariant(false, "Block cannot be moved next to itself.") : invariant(false) : void 0;
        newBlocks = blocksBefore.concat([].concat(slicedBlocks, [[targetKey, targetBlock]]), blocksAfter).toOrderedMap();
      } else if (insertionMode === "after") {
        var blockAfter = contentState.getBlockAfter(targetKey);
        !(!blockAfter || blockAfter.getKey() !== blockKey) ? true ? invariant(false, "Block cannot be moved next to itself.") : invariant(false) : void 0;
        newBlocks = blocksBefore.concat([[targetKey, targetBlock]].concat(slicedBlocks), blocksAfter).toOrderedMap();
      }
      return contentState.merge({
        blockMap: updateBlockMapLinks(newBlocks, blockToBeMoved, targetBlock, insertionMode, isExperimentalTreeBlock),
        selectionBefore: contentState.getSelectionAfter(),
        selectionAfter: contentState.getSelectionAfter().merge({
          anchorKey: blockKey,
          focusKey: blockKey
        })
      });
    };
    module.exports = moveBlockInContentState;
  }
});

// node_modules/draft-js/lib/AtomicBlockUtils.js
var require_AtomicBlockUtils = __commonJS({
  "node_modules/draft-js/lib/AtomicBlockUtils.js"(exports, module) {
    "use strict";
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var BlockMapBuilder = require_BlockMapBuilder();
    var CharacterMetadata = require_CharacterMetadata();
    var ContentBlock = require_ContentBlock();
    var ContentBlockNode = require_ContentBlockNode();
    var DraftModifier = require_DraftModifier();
    var EditorState = require_EditorState();
    var generateRandomKey = require_generateRandomKey();
    var gkx = require_gkx();
    var Immutable = require_immutable();
    var moveBlockInContentState = require_moveBlockInContentState();
    var experimentalTreeDataSupport = gkx("draft_tree_data_support");
    var ContentBlockRecord = experimentalTreeDataSupport ? ContentBlockNode : ContentBlock;
    var List = Immutable.List;
    var Repeat = Immutable.Repeat;
    var AtomicBlockUtils = {
      insertAtomicBlock: function insertAtomicBlock(editorState, entityKey, character) {
        var contentState = editorState.getCurrentContent();
        var selectionState = editorState.getSelection();
        var afterRemoval = DraftModifier.removeRange(contentState, selectionState, "backward");
        var targetSelection = afterRemoval.getSelectionAfter();
        var afterSplit = DraftModifier.splitBlock(afterRemoval, targetSelection);
        var insertionTarget = afterSplit.getSelectionAfter();
        var asAtomicBlock = DraftModifier.setBlockType(afterSplit, insertionTarget, "atomic");
        var charData = CharacterMetadata.create({
          entity: entityKey
        });
        var atomicBlockConfig = {
          key: generateRandomKey(),
          type: "atomic",
          text: character,
          characterList: List(Repeat(charData, character.length))
        };
        var atomicDividerBlockConfig = {
          key: generateRandomKey(),
          type: "unstyled"
        };
        if (experimentalTreeDataSupport) {
          atomicBlockConfig = _objectSpread({}, atomicBlockConfig, {
            nextSibling: atomicDividerBlockConfig.key
          });
          atomicDividerBlockConfig = _objectSpread({}, atomicDividerBlockConfig, {
            prevSibling: atomicBlockConfig.key
          });
        }
        var fragmentArray = [new ContentBlockRecord(atomicBlockConfig), new ContentBlockRecord(atomicDividerBlockConfig)];
        var fragment = BlockMapBuilder.createFromArray(fragmentArray);
        var withAtomicBlock = DraftModifier.replaceWithFragment(asAtomicBlock, insertionTarget, fragment);
        var newContent = withAtomicBlock.merge({
          selectionBefore: selectionState,
          selectionAfter: withAtomicBlock.getSelectionAfter().set("hasFocus", true)
        });
        return EditorState.push(editorState, newContent, "insert-fragment");
      },
      moveAtomicBlock: function moveAtomicBlock(editorState, atomicBlock, targetRange, insertionMode) {
        var contentState = editorState.getCurrentContent();
        var selectionState = editorState.getSelection();
        var withMovedAtomicBlock;
        if (insertionMode === "before" || insertionMode === "after") {
          var targetBlock = contentState.getBlockForKey(insertionMode === "before" ? targetRange.getStartKey() : targetRange.getEndKey());
          withMovedAtomicBlock = moveBlockInContentState(contentState, atomicBlock, targetBlock, insertionMode);
        } else {
          var afterRemoval = DraftModifier.removeRange(contentState, targetRange, "backward");
          var selectionAfterRemoval = afterRemoval.getSelectionAfter();
          var _targetBlock = afterRemoval.getBlockForKey(selectionAfterRemoval.getFocusKey());
          if (selectionAfterRemoval.getStartOffset() === 0) {
            withMovedAtomicBlock = moveBlockInContentState(afterRemoval, atomicBlock, _targetBlock, "before");
          } else if (selectionAfterRemoval.getEndOffset() === _targetBlock.getLength()) {
            withMovedAtomicBlock = moveBlockInContentState(afterRemoval, atomicBlock, _targetBlock, "after");
          } else {
            var afterSplit = DraftModifier.splitBlock(afterRemoval, selectionAfterRemoval);
            var selectionAfterSplit = afterSplit.getSelectionAfter();
            var _targetBlock2 = afterSplit.getBlockForKey(selectionAfterSplit.getFocusKey());
            withMovedAtomicBlock = moveBlockInContentState(afterSplit, atomicBlock, _targetBlock2, "before");
          }
        }
        var newContent = withMovedAtomicBlock.merge({
          selectionBefore: selectionState,
          selectionAfter: withMovedAtomicBlock.getSelectionAfter().set("hasFocus", true)
        });
        return EditorState.push(editorState, newContent, "move-block");
      }
    };
    module.exports = AtomicBlockUtils;
  }
});

// node_modules/draft-js/lib/CompositeDraftDecorator.js
var require_CompositeDraftDecorator = __commonJS({
  "node_modules/draft-js/lib/CompositeDraftDecorator.js"(exports, module) {
    "use strict";
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var Immutable = require_immutable();
    var List = Immutable.List;
    var DELIMITER = ".";
    var CompositeDraftDecorator = function() {
      function CompositeDraftDecorator2(decorators) {
        _defineProperty(this, "_decorators", void 0);
        this._decorators = decorators.slice();
      }
      var _proto = CompositeDraftDecorator2.prototype;
      _proto.getDecorations = function getDecorations(block, contentState) {
        var decorations = Array(block.getText().length).fill(null);
        this._decorators.forEach(function(decorator, ii) {
          var counter = 0;
          var strategy = decorator.strategy;
          var callback = function callback2(start, end) {
            if (canOccupySlice(decorations, start, end)) {
              occupySlice(decorations, start, end, ii + DELIMITER + counter);
              counter++;
            }
          };
          strategy(block, callback, contentState);
        });
        return List(decorations);
      };
      _proto.getComponentForKey = function getComponentForKey(key) {
        var componentKey = parseInt(key.split(DELIMITER)[0], 10);
        return this._decorators[componentKey].component;
      };
      _proto.getPropsForKey = function getPropsForKey(key) {
        var componentKey = parseInt(key.split(DELIMITER)[0], 10);
        return this._decorators[componentKey].props;
      };
      return CompositeDraftDecorator2;
    }();
    function canOccupySlice(decorations, start, end) {
      for (var ii = start; ii < end; ii++) {
        if (decorations[ii] != null) {
          return false;
        }
      }
      return true;
    }
    function occupySlice(targetArr, start, end, componentKey) {
      for (var ii = start; ii < end; ii++) {
        targetArr[ii] = componentKey;
      }
    }
    module.exports = CompositeDraftDecorator;
  }
});

// node_modules/fbjs/lib/cx.js
var require_cx = __commonJS({
  "node_modules/fbjs/lib/cx.js"(exports, module) {
    "use strict";
    function cx(classNames) {
      if (typeof classNames == "object") {
        return Object.keys(classNames).filter(function(className) {
          return classNames[className];
        }).map(replace).join(" ");
      }
      return Array.prototype.map.call(arguments, replace).join(" ");
    }
    function replace(str) {
      return str.replace(/\//g, "-");
    }
    module.exports = cx;
  }
});

// node_modules/draft-js/lib/DefaultDraftBlockRenderMap.js
var require_DefaultDraftBlockRenderMap = __commonJS({
  "node_modules/draft-js/lib/DefaultDraftBlockRenderMap.js"(exports, module) {
    "use strict";
    var React = require_react();
    var cx = require_cx();
    var _require = require_immutable();
    var Map = _require.Map;
    var UL_WRAP = React.createElement("ul", {
      className: cx("public/DraftStyleDefault/ul")
    });
    var OL_WRAP = React.createElement("ol", {
      className: cx("public/DraftStyleDefault/ol")
    });
    var PRE_WRAP = React.createElement("pre", {
      className: cx("public/DraftStyleDefault/pre")
    });
    var DefaultDraftBlockRenderMap = Map({
      "header-one": {
        element: "h1"
      },
      "header-two": {
        element: "h2"
      },
      "header-three": {
        element: "h3"
      },
      "header-four": {
        element: "h4"
      },
      "header-five": {
        element: "h5"
      },
      "header-six": {
        element: "h6"
      },
      section: {
        element: "section"
      },
      article: {
        element: "article"
      },
      "unordered-list-item": {
        element: "li",
        wrapper: UL_WRAP
      },
      "ordered-list-item": {
        element: "li",
        wrapper: OL_WRAP
      },
      blockquote: {
        element: "blockquote"
      },
      atomic: {
        element: "figure"
      },
      "code-block": {
        element: "pre",
        wrapper: PRE_WRAP
      },
      unstyled: {
        element: "div",
        aliasedElements: ["p"]
      }
    });
    module.exports = DefaultDraftBlockRenderMap;
  }
});

// node_modules/draft-js/lib/DefaultDraftInlineStyle.js
var require_DefaultDraftInlineStyle = __commonJS({
  "node_modules/draft-js/lib/DefaultDraftInlineStyle.js"(exports, module) {
    "use strict";
    module.exports = {
      BOLD: {
        fontWeight: "bold"
      },
      CODE: {
        fontFamily: "monospace",
        wordWrap: "break-word"
      },
      ITALIC: {
        fontStyle: "italic"
      },
      STRIKETHROUGH: {
        textDecoration: "line-through"
      },
      UNDERLINE: {
        textDecoration: "underline"
      }
    };
  }
});

// node_modules/ua-parser-js/src/ua-parser.js
var require_ua_parser = __commonJS({
  "node_modules/ua-parser-js/src/ua-parser.js"(exports, module) {
    (function(window2, undefined2) {
      "use strict";
      var LIBVERSION = "0.7.37", EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", STR_TYPE = "string", MAJOR = "major", MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", ARCHITECTURE = "architecture", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", WEARABLE = "wearable", EMBEDDED = "embedded", UA_MAX_LENGTH = 500;
      var AMAZON = "Amazon", APPLE = "Apple", ASUS = "ASUS", BLACKBERRY = "BlackBerry", BROWSER = "Browser", CHROME = "Chrome", EDGE = "Edge", FIREFOX = "Firefox", GOOGLE = "Google", HUAWEI = "Huawei", LG = "LG", MICROSOFT = "Microsoft", MOTOROLA = "Motorola", OPERA = "Opera", SAMSUNG = "Samsung", SHARP = "Sharp", SONY = "Sony", XIAOMI = "Xiaomi", ZEBRA = "Zebra", FACEBOOK = "Facebook", CHROMIUM_OS = "Chromium OS", MAC_OS = "Mac OS";
      var extend = function(regexes2, extensions) {
        var mergedRegexes = {};
        for (var i in regexes2) {
          if (extensions[i] && extensions[i].length % 2 === 0) {
            mergedRegexes[i] = extensions[i].concat(regexes2[i]);
          } else {
            mergedRegexes[i] = regexes2[i];
          }
        }
        return mergedRegexes;
      }, enumerize = function(arr) {
        var enums = {};
        for (var i = 0; i < arr.length; i++) {
          enums[arr[i].toUpperCase()] = arr[i];
        }
        return enums;
      }, has = function(str1, str2) {
        return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
      }, lowerize = function(str) {
        return str.toLowerCase();
      }, majorize = function(version) {
        return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split(".")[0] : undefined2;
      }, trim = function(str, len) {
        if (typeof str === STR_TYPE) {
          str = str.replace(/^\s\s*/, EMPTY);
          return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
        }
      };
      var rgxMapper = function(ua, arrays) {
        var i = 0, j, k, p, q, matches, match;
        while (i < arrays.length && !matches) {
          var regex = arrays[i], props = arrays[i + 1];
          j = k = 0;
          while (j < regex.length && !matches) {
            if (!regex[j]) {
              break;
            }
            matches = regex[j++].exec(ua);
            if (!!matches) {
              for (p = 0; p < props.length; p++) {
                match = matches[++k];
                q = props[p];
                if (typeof q === OBJ_TYPE && q.length > 0) {
                  if (q.length === 2) {
                    if (typeof q[1] == FUNC_TYPE) {
                      this[q[0]] = q[1].call(this, match);
                    } else {
                      this[q[0]] = q[1];
                    }
                  } else if (q.length === 3) {
                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                      this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined2;
                    } else {
                      this[q[0]] = match ? match.replace(q[1], q[2]) : undefined2;
                    }
                  } else if (q.length === 4) {
                    this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined2;
                  }
                } else {
                  this[q] = match ? match : undefined2;
                }
              }
            }
          }
          i += 2;
        }
      }, strMapper = function(str, map) {
        for (var i in map) {
          if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
            for (var j = 0; j < map[i].length; j++) {
              if (has(map[i][j], str)) {
                return i === UNKNOWN ? undefined2 : i;
              }
            }
          } else if (has(map[i], str)) {
            return i === UNKNOWN ? undefined2 : i;
          }
        }
        return str;
      };
      var oldSafariMap = {
        "1.0": "/8",
        "1.2": "/1",
        "1.3": "/3",
        "2.0": "/412",
        "2.0.2": "/416",
        "2.0.3": "/417",
        "2.0.4": "/419",
        "?": "/"
      }, windowsVersionMap = {
        "ME": "4.90",
        "NT 3.11": "NT3.51",
        "NT 4.0": "NT4.0",
        "2000": "NT 5.0",
        "XP": ["NT 5.1", "NT 5.2"],
        "Vista": "NT 6.0",
        "7": "NT 6.1",
        "8": "NT 6.2",
        "8.1": "NT 6.3",
        "10": ["NT 6.4", "NT 10.0"],
        "RT": "ARM"
      };
      var regexes = {
        browser: [
          [
            /\b(?:crmo|crios)\/([\w\.]+)/i
            // Chrome for Android/iOS
          ],
          [VERSION, [NAME, "Chrome"]],
          [
            /edg(?:e|ios|a)?\/([\w\.]+)/i
            // Microsoft Edge
          ],
          [VERSION, [NAME, "Edge"]],
          [
            // Presto based
            /(opera mini)\/([-\w\.]+)/i,
            // Opera Mini
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
            // Opera Mobi/Tablet
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
            // Opera
          ],
          [NAME, VERSION],
          [
            /opios[\/ ]+([\w\.]+)/i
            // Opera mini on iphone >= 8.0
          ],
          [VERSION, [NAME, OPERA + " Mini"]],
          [
            /\bopr\/([\w\.]+)/i
            // Opera Webkit
          ],
          [VERSION, [NAME, OPERA]],
          [
            // Mixed
            /\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i
            // Baidu
          ],
          [VERSION, [NAME, "Baidu"]],
          [
            /(kindle)\/([\w\.]+)/i,
            // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
            // Lunascape/Maxthon/Netfront/Jasmine/Blazer
            // Trident based
            /(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,
            // Avant/IEMobile/SlimBrowser
            /(?:ms|\()(ie) ([\w\.]+)/i,
            // Internet Explorer
            // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
            /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
            // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
            /(heytap|ovi)browser\/([\d\.]+)/i,
            // Heytap/Ovi
            /(weibo)__([\d\.]+)/i
            // Weibo
          ],
          [NAME, VERSION],
          [
            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
            // UCBrowser
          ],
          [VERSION, [NAME, "UC" + BROWSER]],
          [
            /microm.+\bqbcore\/([\w\.]+)/i,
            // WeChat Desktop for Windows Built-in Browser
            /\bqbcore\/([\w\.]+).+microm/i,
            /micromessenger\/([\w\.]+)/i
            // WeChat
          ],
          [VERSION, [NAME, "WeChat"]],
          [
            /konqueror\/([\w\.]+)/i
            // Konqueror
          ],
          [VERSION, [NAME, "Konqueror"]],
          [
            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
            // IE11
          ],
          [VERSION, [NAME, "IE"]],
          [
            /ya(?:search)?browser\/([\w\.]+)/i
            // Yandex
          ],
          [VERSION, [NAME, "Yandex"]],
          [
            /slbrowser\/([\w\.]+)/i
            // Smart Lenovo Browser
          ],
          [VERSION, [NAME, "Smart Lenovo " + BROWSER]],
          [
            /(avast|avg)\/([\w\.]+)/i
            // Avast/AVG Secure Browser
          ],
          [[NAME, /(.+)/, "$1 Secure " + BROWSER], VERSION],
          [
            /\bfocus\/([\w\.]+)/i
            // Firefox Focus
          ],
          [VERSION, [NAME, FIREFOX + " Focus"]],
          [
            /\bopt\/([\w\.]+)/i
            // Opera Touch
          ],
          [VERSION, [NAME, OPERA + " Touch"]],
          [
            /coc_coc\w+\/([\w\.]+)/i
            // Coc Coc Browser
          ],
          [VERSION, [NAME, "Coc Coc"]],
          [
            /dolfin\/([\w\.]+)/i
            // Dolphin
          ],
          [VERSION, [NAME, "Dolphin"]],
          [
            /coast\/([\w\.]+)/i
            // Opera Coast
          ],
          [VERSION, [NAME, OPERA + " Coast"]],
          [
            /miuibrowser\/([\w\.]+)/i
            // MIUI Browser
          ],
          [VERSION, [NAME, "MIUI " + BROWSER]],
          [
            /fxios\/([-\w\.]+)/i
            // Firefox for iOS
          ],
          [VERSION, [NAME, FIREFOX]],
          [
            /\bqihu|(qi?ho?o?|360)browser/i
            // 360
          ],
          [[NAME, "360 " + BROWSER]],
          [
            /(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i
          ],
          [[NAME, /(.+)/, "$1 " + BROWSER], VERSION],
          [
            // Oculus/Sailfish/HuaweiBrowser/VivoBrowser
            /samsungbrowser\/([\w\.]+)/i
            // Samsung Internet
          ],
          [VERSION, [NAME, SAMSUNG + " Internet"]],
          [
            /(comodo_dragon)\/([\w\.]+)/i
            // Comodo Dragon
          ],
          [[NAME, /_/g, " "], VERSION],
          [
            /metasr[\/ ]?([\d\.]+)/i
            // Sogou Explorer
          ],
          [VERSION, [NAME, "Sogou Explorer"]],
          [
            /(sogou)mo\w+\/([\d\.]+)/i
            // Sogou Mobile
          ],
          [[NAME, "Sogou Mobile"], VERSION],
          [
            /(electron)\/([\w\.]+) safari/i,
            // Electron-based App
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
            // Tesla
            /m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i
            // QQBrowser/2345 Browser
          ],
          [NAME, VERSION],
          [
            /(lbbrowser)/i,
            // LieBao Browser
            /\[(linkedin)app\]/i
            // LinkedIn App for iOS & Android
          ],
          [NAME],
          [
            // WebView
            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
            // Facebook App for iOS & Android
          ],
          [[NAME, FACEBOOK], VERSION],
          [
            /(Klarna)\/([\w\.]+)/i,
            // Klarna Shopping Browser for iOS & Android
            /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
            // Kakao App
            /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
            // Naver InApp
            /safari (line)\/([\w\.]+)/i,
            // Line App for iOS
            /\b(line)\/([\w\.]+)\/iab/i,
            // Line App for Android
            /(alipay)client\/([\w\.]+)/i,
            // Alipay
            /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i
            // Chromium/Instagram/Snapchat
          ],
          [NAME, VERSION],
          [
            /\bgsa\/([\w\.]+) .*safari\//i
            // Google Search Appliance on iOS
          ],
          [VERSION, [NAME, "GSA"]],
          [
            /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
            // TikTok
          ],
          [VERSION, [NAME, "TikTok"]],
          [
            /headlesschrome(?:\/([\w\.]+)| )/i
            // Chrome Headless
          ],
          [VERSION, [NAME, CHROME + " Headless"]],
          [
            / wv\).+(chrome)\/([\w\.]+)/i
            // Chrome WebView
          ],
          [[NAME, CHROME + " WebView"], VERSION],
          [
            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
            // Android Browser
          ],
          [VERSION, [NAME, "Android " + BROWSER]],
          [
            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
            // Chrome/OmniWeb/Arora/Tizen/Nokia
          ],
          [NAME, VERSION],
          [
            /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i
            // Mobile Safari
          ],
          [VERSION, [NAME, "Mobile Safari"]],
          [
            /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i
            // Safari & Safari Mobile
          ],
          [VERSION, NAME],
          [
            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
            // Safari < 3.0
          ],
          [NAME, [VERSION, strMapper, oldSafariMap]],
          [
            /(webkit|khtml)\/([\w\.]+)/i
          ],
          [NAME, VERSION],
          [
            // Gecko based
            /(navigator|netscape\d?)\/([-\w\.]+)/i
            // Netscape
          ],
          [[NAME, "Netscape"], VERSION],
          [
            /mobile vr; rv:([\w\.]+)\).+firefox/i
            // Firefox Reality
          ],
          [VERSION, [NAME, FIREFOX + " Reality"]],
          [
            /ekiohf.+(flow)\/([\w\.]+)/i,
            // Flow
            /(swiftfox)/i,
            // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
            // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
            // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(firefox)\/([\w\.]+)/i,
            // Other Firefox-based
            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
            // Mozilla
            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
            // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
            /(links) \(([\w\.]+)/i,
            // Links
            /panasonic;(viera)/i
            // Panasonic Viera
          ],
          [NAME, VERSION],
          [
            /(cobalt)\/([\w\.]+)/i
            // Cobalt
          ],
          [NAME, [VERSION, /master.|lts./, ""]]
        ],
        cpu: [
          [
            /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
            // AMD64 (x64)
          ],
          [[ARCHITECTURE, "amd64"]],
          [
            /(ia32(?=;))/i
            // IA32 (quicktime)
          ],
          [[ARCHITECTURE, lowerize]],
          [
            /((?:i[346]|x)86)[;\)]/i
            // IA32 (x86)
          ],
          [[ARCHITECTURE, "ia32"]],
          [
            /\b(aarch64|arm(v?8e?l?|_?64))\b/i
            // ARM64
          ],
          [[ARCHITECTURE, "arm64"]],
          [
            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
            // ARMHF
          ],
          [[ARCHITECTURE, "armhf"]],
          [
            // PocketPC mistakenly identified as PowerPC
            /windows (ce|mobile); ppc;/i
          ],
          [[ARCHITECTURE, "arm"]],
          [
            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
            // PowerPC
          ],
          [[ARCHITECTURE, /ower/, EMPTY, lowerize]],
          [
            /(sun4\w)[;\)]/i
            // SPARC
          ],
          [[ARCHITECTURE, "sparc"]],
          [
            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
            // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
          ],
          [[ARCHITECTURE, lowerize]]
        ],
        device: [
          [
            //////////////////////////
            // MOBILES & TABLETS
            /////////////////////////
            // Samsung
            /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
          ],
          [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]],
          [
            /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
            /samsung[- ]([-\w]+)/i,
            /sec-(sgh\w+)/i
          ],
          [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]],
          [
            // Apple
            /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
            // iPod/iPhone
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]],
          [
            /\((ipad);[-\w\),; ]+apple/i,
            // iPad
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, TABLET]],
          [
            /(macintosh);/i
          ],
          [MODEL, [VENDOR, APPLE]],
          [
            // Sharp
            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
          ],
          [MODEL, [VENDOR, SHARP], [TYPE, MOBILE]],
          [
            // Huawei
            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
          ],
          [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]],
          [
            /(?:huawei|honor)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
          ],
          [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]],
          [
            // Xiaomi
            /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
            // Xiaomi POCO
            /\b; (\w+) build\/hm\1/i,
            // Xiaomi Hongmi 'numeric' models
            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
            // Xiaomi Hongmi
            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
            // Xiaomi Redmi
            /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,
            // Xiaomi Redmi 'numeric' models
            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
            // Xiaomi Mi
          ],
          [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, MOBILE]],
          [
            /oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,
            // Redmi Pad
            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
            // Mi Pad tablets
          ],
          [[MODEL, /_/g, " "], [VENDOR, XIAOMI], [TYPE, TABLET]],
          [
            // OPPO
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
          ],
          [MODEL, [VENDOR, "OPPO"], [TYPE, MOBILE]],
          [
            // Vivo
            /vivo (\w+)(?: bui|\))/i,
            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
          ],
          [MODEL, [VENDOR, "Vivo"], [TYPE, MOBILE]],
          [
            // Realme
            /\b(rmx[1-3]\d{3})(?: bui|;|\))/i
          ],
          [MODEL, [VENDOR, "Realme"], [TYPE, MOBILE]],
          [
            // Motorola
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
          ],
          [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]],
          [
            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
          ],
          [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]],
          [
            // LG
            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
          ],
          [MODEL, [VENDOR, LG], [TYPE, TABLET]],
          [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
            /\blg-?([\d\w]+) bui/i
          ],
          [MODEL, [VENDOR, LG], [TYPE, MOBILE]],
          [
            // Lenovo
            /(ideatab[-\w ]+)/i,
            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
          ],
          [MODEL, [VENDOR, "Lenovo"], [TYPE, TABLET]],
          [
            // Nokia
            /(?:maemo|nokia).*(n900|lumia \d+)/i,
            /nokia[-_ ]?([-\w\.]*)/i
          ],
          [[MODEL, /_/g, " "], [VENDOR, "Nokia"], [TYPE, MOBILE]],
          [
            // Google
            /(pixel c)\b/i
            // Google Pixel C
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]],
          [
            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
            // Google Pixel
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]],
          [
            // Sony
            /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
          ],
          [MODEL, [VENDOR, SONY], [TYPE, MOBILE]],
          [
            /sony tablet [ps]/i,
            /\b(?:sony)?sgp\w+(?: bui|\))/i
          ],
          [[MODEL, "Xperia Tablet"], [VENDOR, SONY], [TYPE, TABLET]],
          [
            // OnePlus
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
          ],
          [MODEL, [VENDOR, "OnePlus"], [TYPE, MOBILE]],
          [
            // Amazon
            /(alexa)webm/i,
            /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
            // Kindle Fire without Silk / Echo Show
            /(kf[a-z]+)( bui|\)).+silk\//i
            // Kindle Fire HD
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]],
          [
            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
            // Fire Phone
          ],
          [[MODEL, /(.+)/g, "Fire Phone $1"], [VENDOR, AMAZON], [TYPE, MOBILE]],
          [
            // BlackBerry
            /(playbook);[-\w\),; ]+(rim)/i
            // BlackBerry PlayBook
          ],
          [MODEL, VENDOR, [TYPE, TABLET]],
          [
            /\b((?:bb[a-f]|st[hv])100-\d)/i,
            /\(bb10; (\w+)/i
            // BlackBerry 10
          ],
          [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]],
          [
            // Asus
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
          ],
          [MODEL, [VENDOR, ASUS], [TYPE, TABLET]],
          [
            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
          ],
          [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]],
          [
            // HTC
            /(nexus 9)/i
            // HTC Nexus 9
          ],
          [MODEL, [VENDOR, "HTC"], [TYPE, TABLET]],
          [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
            // HTC
            // ZTE
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
            // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
          ],
          [VENDOR, [MODEL, /_/g, " "], [TYPE, MOBILE]],
          [
            // Acer
            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
          ],
          [MODEL, [VENDOR, "Acer"], [TYPE, TABLET]],
          [
            // Meizu
            /droid.+; (m[1-5] note) bui/i,
            /\bmz-([-\w]{2,})/i
          ],
          [MODEL, [VENDOR, "Meizu"], [TYPE, MOBILE]],
          [
            // Ulefone
            /; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i
          ],
          [MODEL, [VENDOR, "Ulefone"], [TYPE, MOBILE]],
          [
            // MIXED
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
            // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp) ([\w ]+\w)/i,
            // HP iPAQ
            /(asus)-?(\w+)/i,
            // Asus
            /(microsoft); (lumia[\w ]+)/i,
            // Microsoft Lumia
            /(lenovo)[-_ ]?([-\w]+)/i,
            // Lenovo
            /(jolla)/i,
            // Jolla
            /(oppo) ?([\w ]+) bui/i
            // OPPO
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /(kobo)\s(ereader|touch)/i,
            // Kobo
            /(archos) (gamepad2?)/i,
            // Archos
            /(hp).+(touchpad(?!.+tablet)|tablet)/i,
            // HP TouchPad
            /(kindle)\/([\w\.]+)/i,
            // Kindle
            /(nook)[\w ]+build\/(\w+)/i,
            // Nook
            /(dell) (strea[kpr\d ]*[\dko])/i,
            // Dell Streak
            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
            // Le Pan Tablets
            /(trinity)[- ]*(t\d{3}) bui/i,
            // Trinity Tablets
            /(gigaset)[- ]+(q\w{1,9}) bui/i,
            // Gigaset Tablets
            /(vodafone) ([\w ]+)(?:\)| bui)/i
            // Vodafone
          ],
          [VENDOR, MODEL, [TYPE, TABLET]],
          [
            /(surface duo)/i
            // Surface Duo
          ],
          [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]],
          [
            /droid [\d\.]+; (fp\du?)(?: b|\))/i
            // Fairphone
          ],
          [MODEL, [VENDOR, "Fairphone"], [TYPE, MOBILE]],
          [
            /(u304aa)/i
            // AT&T
          ],
          [MODEL, [VENDOR, "AT&T"], [TYPE, MOBILE]],
          [
            /\bsie-(\w*)/i
            // Siemens
          ],
          [MODEL, [VENDOR, "Siemens"], [TYPE, MOBILE]],
          [
            /\b(rct\w+) b/i
            // RCA Tablets
          ],
          [MODEL, [VENDOR, "RCA"], [TYPE, TABLET]],
          [
            /\b(venue[\d ]{2,7}) b/i
            // Dell Venue Tablets
          ],
          [MODEL, [VENDOR, "Dell"], [TYPE, TABLET]],
          [
            /\b(q(?:mv|ta)\w+) b/i
            // Verizon Tablet
          ],
          [MODEL, [VENDOR, "Verizon"], [TYPE, TABLET]],
          [
            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
            // Barnes & Noble Tablet
          ],
          [MODEL, [VENDOR, "Barnes & Noble"], [TYPE, TABLET]],
          [
            /\b(tm\d{3}\w+) b/i
          ],
          [MODEL, [VENDOR, "NuVision"], [TYPE, TABLET]],
          [
            /\b(k88) b/i
            // ZTE K Series Tablet
          ],
          [MODEL, [VENDOR, "ZTE"], [TYPE, TABLET]],
          [
            /\b(nx\d{3}j) b/i
            // ZTE Nubia
          ],
          [MODEL, [VENDOR, "ZTE"], [TYPE, MOBILE]],
          [
            /\b(gen\d{3}) b.+49h/i
            // Swiss GEN Mobile
          ],
          [MODEL, [VENDOR, "Swiss"], [TYPE, MOBILE]],
          [
            /\b(zur\d{3}) b/i
            // Swiss ZUR Tablet
          ],
          [MODEL, [VENDOR, "Swiss"], [TYPE, TABLET]],
          [
            /\b((zeki)?tb.*\b) b/i
            // Zeki Tablets
          ],
          [MODEL, [VENDOR, "Zeki"], [TYPE, TABLET]],
          [
            /\b([yr]\d{2}) b/i,
            /\b(dragon[- ]+touch |dt)(\w{5}) b/i
            // Dragon Touch Tablet
          ],
          [[VENDOR, "Dragon Touch"], MODEL, [TYPE, TABLET]],
          [
            /\b(ns-?\w{0,9}) b/i
            // Insignia Tablets
          ],
          [MODEL, [VENDOR, "Insignia"], [TYPE, TABLET]],
          [
            /\b((nxa|next)-?\w{0,9}) b/i
            // NextBook Tablets
          ],
          [MODEL, [VENDOR, "NextBook"], [TYPE, TABLET]],
          [
            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
            // Voice Xtreme Phones
          ],
          [[VENDOR, "Voice"], MODEL, [TYPE, MOBILE]],
          [
            /\b(lvtel\-)?(v1[12]) b/i
            // LvTel Phones
          ],
          [[VENDOR, "LvTel"], MODEL, [TYPE, MOBILE]],
          [
            /\b(ph-1) /i
            // Essential PH-1
          ],
          [MODEL, [VENDOR, "Essential"], [TYPE, MOBILE]],
          [
            /\b(v(100md|700na|7011|917g).*\b) b/i
            // Envizen Tablets
          ],
          [MODEL, [VENDOR, "Envizen"], [TYPE, TABLET]],
          [
            /\b(trio[-\w\. ]+) b/i
            // MachSpeed Tablets
          ],
          [MODEL, [VENDOR, "MachSpeed"], [TYPE, TABLET]],
          [
            /\btu_(1491) b/i
            // Rotor Tablets
          ],
          [MODEL, [VENDOR, "Rotor"], [TYPE, TABLET]],
          [
            /(shield[\w ]+) b/i
            // Nvidia Shield Tablets
          ],
          [MODEL, [VENDOR, "Nvidia"], [TYPE, TABLET]],
          [
            /(sprint) (\w+)/i
            // Sprint Phones
          ],
          [VENDOR, MODEL, [TYPE, MOBILE]],
          [
            /(kin\.[onetw]{3})/i
            // Microsoft Kin
          ],
          [[MODEL, /\./g, " "], [VENDOR, MICROSOFT], [TYPE, MOBILE]],
          [
            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
            // Zebra
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]],
          [
            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]],
          [
            ///////////////////
            // SMARTTVS
            ///////////////////
            /smart-tv.+(samsung)/i
            // Samsung
          ],
          [VENDOR, [TYPE, SMARTTV]],
          [
            /hbbtv.+maple;(\d+)/i
          ],
          [[MODEL, /^/, "SmartTV"], [VENDOR, SAMSUNG], [TYPE, SMARTTV]],
          [
            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
            // LG SmartTV
          ],
          [[VENDOR, LG], [TYPE, SMARTTV]],
          [
            /(apple) ?tv/i
            // Apple TV
          ],
          [VENDOR, [MODEL, APPLE + " TV"], [TYPE, SMARTTV]],
          [
            /crkey/i
            // Google Chromecast
          ],
          [[MODEL, CHROME + "cast"], [VENDOR, GOOGLE], [TYPE, SMARTTV]],
          [
            /droid.+aft(\w+)( bui|\))/i
            // Fire TV
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]],
          [
            /\(dtv[\);].+(aquos)/i,
            /(aquos-tv[\w ]+)\)/i
            // Sharp
          ],
          [MODEL, [VENDOR, SHARP], [TYPE, SMARTTV]],
          [
            /(bravia[\w ]+)( bui|\))/i
            // Sony
          ],
          [MODEL, [VENDOR, SONY], [TYPE, SMARTTV]],
          [
            /(mitv-\w{5}) bui/i
            // Xiaomi
          ],
          [MODEL, [VENDOR, XIAOMI], [TYPE, SMARTTV]],
          [
            /Hbbtv.*(technisat) (.*);/i
            // TechniSAT
          ],
          [VENDOR, MODEL, [TYPE, SMARTTV]],
          [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
            // Roku
            /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
            // HbbTV devices
          ],
          [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]],
          [
            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
            // SmartTV from Unidentified Vendors
          ],
          [[TYPE, SMARTTV]],
          [
            ///////////////////
            // CONSOLES
            ///////////////////
            /(ouya)/i,
            // Ouya
            /(nintendo) ([wids3utch]+)/i
            // Nintendo
          ],
          [VENDOR, MODEL, [TYPE, CONSOLE]],
          [
            /droid.+; (shield) bui/i
            // Nvidia
          ],
          [MODEL, [VENDOR, "Nvidia"], [TYPE, CONSOLE]],
          [
            /(playstation [345portablevi]+)/i
            // Playstation
          ],
          [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]],
          [
            /\b(xbox(?: one)?(?!; xbox))[\); ]/i
            // Microsoft Xbox
          ],
          [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]],
          [
            ///////////////////
            // WEARABLES
            ///////////////////
            /((pebble))app/i
            // Pebble
          ],
          [VENDOR, MODEL, [TYPE, WEARABLE]],
          [
            /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
            // Apple Watch
          ],
          [MODEL, [VENDOR, APPLE], [TYPE, WEARABLE]],
          [
            /droid.+; (glass) \d/i
            // Google Glass
          ],
          [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]],
          [
            /droid.+; (wt63?0{2,3})\)/i
          ],
          [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]],
          [
            /(quest( 2| pro)?)/i
            // Oculus Quest
          ],
          [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]],
          [
            ///////////////////
            // EMBEDDED
            ///////////////////
            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
            // Tesla
          ],
          [VENDOR, [TYPE, EMBEDDED]],
          [
            /(aeobc)\b/i
            // Echo Dot
          ],
          [MODEL, [VENDOR, AMAZON], [TYPE, EMBEDDED]],
          [
            ////////////////////
            // MIXED (GENERIC)
            ///////////////////
            /droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i
            // Android Phones from Unidentified Vendors
          ],
          [MODEL, [TYPE, MOBILE]],
          [
            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
            // Android Tablets from Unidentified Vendors
          ],
          [MODEL, [TYPE, TABLET]],
          [
            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
            // Unidentifiable Tablet
          ],
          [[TYPE, TABLET]],
          [
            /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
            // Unidentifiable Mobile
          ],
          [[TYPE, MOBILE]],
          [
            /(android[-\w\. ]{0,9});.+buil/i
            // Generic Android Device
          ],
          [MODEL, [VENDOR, "Generic"]]
        ],
        engine: [
          [
            /windows.+ edge\/([\w\.]+)/i
            // EdgeHTML
          ],
          [VERSION, [NAME, EDGE + "HTML"]],
          [
            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
            // Blink
          ],
          [VERSION, [NAME, "Blink"]],
          [
            /(presto)\/([\w\.]+)/i,
            // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
            // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
            /ekioh(flow)\/([\w\.]+)/i,
            // Flow
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
            // KHTML/Tasman/Links
            /(icab)[\/ ]([23]\.[\d\.]+)/i,
            // iCab
            /\b(libweb)/i
          ],
          [NAME, VERSION],
          [
            /rv\:([\w\.]{1,9})\b.+(gecko)/i
            // Gecko
          ],
          [VERSION, NAME]
        ],
        os: [
          [
            // Windows
            /microsoft (windows) (vista|xp)/i
            // Windows (iTunes)
          ],
          [NAME, VERSION],
          [
            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i
            // Windows Phone
          ],
          [NAME, [VERSION, strMapper, windowsVersionMap]],
          [
            /windows nt 6\.2; (arm)/i,
            // Windows RT
            /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
            /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i
          ],
          [[VERSION, strMapper, windowsVersionMap], [NAME, "Windows"]],
          [
            // iOS/macOS
            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
            // iOS
            /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
            /cfnetwork\/.+darwin/i
          ],
          [[VERSION, /_/g, "."], [NAME, "iOS"]],
          [
            /(mac os x) ?([\w\. ]*)/i,
            /(macintosh|mac_powerpc\b)(?!.+haiku)/i
            // Mac OS
          ],
          [[NAME, MAC_OS], [VERSION, /_/g, "."]],
          [
            // Mobile OSes
            /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
            // Android-x86/HarmonyOS
          ],
          [VERSION, NAME],
          [
            // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS
            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
            /(blackberry)\w*\/([\w\.]*)/i,
            // Blackberry
            /(tizen|kaios)[\/ ]([\w\.]+)/i,
            // Tizen/KaiOS
            /\((series40);/i
            // Series 40
          ],
          [NAME, VERSION],
          [
            /\(bb(10);/i
            // BlackBerry 10
          ],
          [VERSION, [NAME, BLACKBERRY]],
          [
            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
            // Symbian
          ],
          [VERSION, [NAME, "Symbian"]],
          [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
            // Firefox OS
          ],
          [VERSION, [NAME, FIREFOX + " OS"]],
          [
            /web0s;.+rt(tv)/i,
            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
            // WebOS
          ],
          [VERSION, [NAME, "webOS"]],
          [
            /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
            // watchOS
          ],
          [VERSION, [NAME, "watchOS"]],
          [
            // Google Chromecast
            /crkey\/([\d\.]+)/i
            // Google Chromecast
          ],
          [VERSION, [NAME, CHROME + "cast"]],
          [
            /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
            // Chromium OS
          ],
          [[NAME, CHROMIUM_OS], VERSION],
          [
            // Smart TVs
            /panasonic;(viera)/i,
            // Panasonic Viera
            /(netrange)mmh/i,
            // Netrange
            /(nettv)\/(\d+\.[\w\.]+)/i,
            // NetTV
            // Console
            /(nintendo|playstation) ([wids345portablevuch]+)/i,
            // Nintendo/Playstation
            /(xbox); +xbox ([^\);]+)/i,
            // Microsoft Xbox (360, One, X, S, Series X, Series S)
            // Other
            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
            // Joli/Palm
            /(mint)[\/\(\) ]?(\w*)/i,
            // Mint
            /(mageia|vectorlinux)[; ]/i,
            // Mageia/VectorLinux
            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
            // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
            /(hurd|linux) ?([\w\.]*)/i,
            // Hurd/Linux
            /(gnu) ?([\w\.]*)/i,
            // GNU
            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
            // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
            /(haiku) (\w+)/i
            // Haiku
          ],
          [NAME, VERSION],
          [
            /(sunos) ?([\w\.\d]*)/i
            // Solaris
          ],
          [[NAME, "Solaris"], VERSION],
          [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
            // Solaris
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
            // AIX
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
            // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX/SerenityOS
            /(unix) ?([\w\.]*)/i
            // UNIX
          ],
          [NAME, VERSION]
        ]
      };
      var UAParser = function(ua, extensions) {
        if (typeof ua === OBJ_TYPE) {
          extensions = ua;
          ua = undefined2;
        }
        if (!(this instanceof UAParser)) {
          return new UAParser(ua, extensions).getResult();
        }
        var _navigator = typeof window2 !== UNDEF_TYPE && window2.navigator ? window2.navigator : undefined2;
        var _ua = ua || (_navigator && _navigator.userAgent ? _navigator.userAgent : EMPTY);
        var _uach = _navigator && _navigator.userAgentData ? _navigator.userAgentData : undefined2;
        var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
        var _isSelfNav = _navigator && _navigator.userAgent == _ua;
        this.getBrowser = function() {
          var _browser = {};
          _browser[NAME] = undefined2;
          _browser[VERSION] = undefined2;
          rgxMapper.call(_browser, _ua, _rgxmap.browser);
          _browser[MAJOR] = majorize(_browser[VERSION]);
          if (_isSelfNav && _navigator && _navigator.brave && typeof _navigator.brave.isBrave == FUNC_TYPE) {
            _browser[NAME] = "Brave";
          }
          return _browser;
        };
        this.getCPU = function() {
          var _cpu = {};
          _cpu[ARCHITECTURE] = undefined2;
          rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
          return _cpu;
        };
        this.getDevice = function() {
          var _device = {};
          _device[VENDOR] = undefined2;
          _device[MODEL] = undefined2;
          _device[TYPE] = undefined2;
          rgxMapper.call(_device, _ua, _rgxmap.device);
          if (_isSelfNav && !_device[TYPE] && _uach && _uach.mobile) {
            _device[TYPE] = MOBILE;
          }
          if (_isSelfNav && _device[MODEL] == "Macintosh" && _navigator && typeof _navigator.standalone !== UNDEF_TYPE && _navigator.maxTouchPoints && _navigator.maxTouchPoints > 2) {
            _device[MODEL] = "iPad";
            _device[TYPE] = TABLET;
          }
          return _device;
        };
        this.getEngine = function() {
          var _engine = {};
          _engine[NAME] = undefined2;
          _engine[VERSION] = undefined2;
          rgxMapper.call(_engine, _ua, _rgxmap.engine);
          return _engine;
        };
        this.getOS = function() {
          var _os = {};
          _os[NAME] = undefined2;
          _os[VERSION] = undefined2;
          rgxMapper.call(_os, _ua, _rgxmap.os);
          if (_isSelfNav && !_os[NAME] && _uach && _uach.platform != "Unknown") {
            _os[NAME] = _uach.platform.replace(/chrome os/i, CHROMIUM_OS).replace(/macos/i, MAC_OS);
          }
          return _os;
        };
        this.getResult = function() {
          return {
            ua: this.getUA(),
            browser: this.getBrowser(),
            engine: this.getEngine(),
            os: this.getOS(),
            device: this.getDevice(),
            cpu: this.getCPU()
          };
        };
        this.getUA = function() {
          return _ua;
        };
        this.setUA = function(ua2) {
          _ua = typeof ua2 === STR_TYPE && ua2.length > UA_MAX_LENGTH ? trim(ua2, UA_MAX_LENGTH) : ua2;
          return this;
        };
        this.setUA(_ua);
        return this;
      };
      UAParser.VERSION = LIBVERSION;
      UAParser.BROWSER = enumerize([NAME, VERSION, MAJOR]);
      UAParser.CPU = enumerize([ARCHITECTURE]);
      UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
      UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]);
      if (typeof exports !== UNDEF_TYPE) {
        if (typeof module !== UNDEF_TYPE && module.exports) {
          exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
      } else {
        if (typeof define === FUNC_TYPE && define.amd) {
          define(function() {
            return UAParser;
          });
        } else if (typeof window2 !== UNDEF_TYPE) {
          window2.UAParser = UAParser;
        }
      }
      var $ = typeof window2 !== UNDEF_TYPE && (window2.jQuery || window2.Zepto);
      if ($ && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function() {
          return parser.getUA();
        };
        $.ua.set = function(ua) {
          parser.setUA(ua);
          var result = parser.getResult();
          for (var prop in result) {
            $.ua[prop] = result[prop];
          }
        };
      }
    })(typeof window === "object" ? window : exports);
  }
});

// node_modules/fbjs/lib/UserAgentData.js
var require_UserAgentData = __commonJS({
  "node_modules/fbjs/lib/UserAgentData.js"(exports, module) {
    "use strict";
    var UAParser = require_ua_parser();
    var UNKNOWN = "Unknown";
    var PLATFORM_MAP = {
      "Mac OS": "Mac OS X"
    };
    function convertPlatformName(name) {
      return PLATFORM_MAP[name] || name;
    }
    function getBrowserVersion(version) {
      if (!version) {
        return {
          major: "",
          minor: ""
        };
      }
      var parts = version.split(".");
      return {
        major: parts[0],
        minor: parts[1]
      };
    }
    var parser = new UAParser();
    var results = parser.getResult();
    var browserVersionData = getBrowserVersion(results.browser.version);
    var uaData = {
      browserArchitecture: results.cpu.architecture || UNKNOWN,
      browserFullVersion: results.browser.version || UNKNOWN,
      browserMinorVersion: browserVersionData.minor || UNKNOWN,
      browserName: results.browser.name || UNKNOWN,
      browserVersion: results.browser.major || UNKNOWN,
      deviceName: results.device.model || UNKNOWN,
      engineName: results.engine.name || UNKNOWN,
      engineVersion: results.engine.version || UNKNOWN,
      platformArchitecture: results.cpu.architecture || UNKNOWN,
      platformName: convertPlatformName(results.os.name) || UNKNOWN,
      platformVersion: results.os.version || UNKNOWN,
      platformFullVersion: results.os.version || UNKNOWN
    };
    module.exports = uaData;
  }
});

// node_modules/fbjs/lib/VersionRange.js
var require_VersionRange = __commonJS({
  "node_modules/fbjs/lib/VersionRange.js"(exports, module) {
    "use strict";
    var invariant = require_invariant();
    var componentRegex = /\./;
    var orRegex = /\|\|/;
    var rangeRegex = /\s+\-\s+/;
    var modifierRegex = /^(<=|<|=|>=|~>|~|>|)?\s*(.+)/;
    var numericRegex = /^(\d*)(.*)/;
    function checkOrExpression(range, version) {
      var expressions = range.split(orRegex);
      if (expressions.length > 1) {
        return expressions.some(function(range2) {
          return VersionRange.contains(range2, version);
        });
      } else {
        range = expressions[0].trim();
        return checkRangeExpression(range, version);
      }
    }
    function checkRangeExpression(range, version) {
      var expressions = range.split(rangeRegex);
      !(expressions.length > 0 && expressions.length <= 2) ? true ? invariant(false, 'the "-" operator expects exactly 2 operands') : invariant(false) : void 0;
      if (expressions.length === 1) {
        return checkSimpleExpression(expressions[0], version);
      } else {
        var startVersion = expressions[0], endVersion = expressions[1];
        !(isSimpleVersion(startVersion) && isSimpleVersion(endVersion)) ? true ? invariant(false, 'operands to the "-" operator must be simple (no modifiers)') : invariant(false) : void 0;
        return checkSimpleExpression(">=" + startVersion, version) && checkSimpleExpression("<=" + endVersion, version);
      }
    }
    function checkSimpleExpression(range, version) {
      range = range.trim();
      if (range === "") {
        return true;
      }
      var versionComponents = version.split(componentRegex);
      var _getModifierAndCompon = getModifierAndComponents(range), modifier = _getModifierAndCompon.modifier, rangeComponents = _getModifierAndCompon.rangeComponents;
      switch (modifier) {
        case "<":
          return checkLessThan(versionComponents, rangeComponents);
        case "<=":
          return checkLessThanOrEqual(versionComponents, rangeComponents);
        case ">=":
          return checkGreaterThanOrEqual(versionComponents, rangeComponents);
        case ">":
          return checkGreaterThan(versionComponents, rangeComponents);
        case "~":
        case "~>":
          return checkApproximateVersion(versionComponents, rangeComponents);
        default:
          return checkEqual(versionComponents, rangeComponents);
      }
    }
    function checkLessThan(a, b) {
      return compareComponents(a, b) === -1;
    }
    function checkLessThanOrEqual(a, b) {
      var result = compareComponents(a, b);
      return result === -1 || result === 0;
    }
    function checkEqual(a, b) {
      return compareComponents(a, b) === 0;
    }
    function checkGreaterThanOrEqual(a, b) {
      var result = compareComponents(a, b);
      return result === 1 || result === 0;
    }
    function checkGreaterThan(a, b) {
      return compareComponents(a, b) === 1;
    }
    function checkApproximateVersion(a, b) {
      var lowerBound = b.slice();
      var upperBound = b.slice();
      if (upperBound.length > 1) {
        upperBound.pop();
      }
      var lastIndex = upperBound.length - 1;
      var numeric = parseInt(upperBound[lastIndex], 10);
      if (isNumber(numeric)) {
        upperBound[lastIndex] = numeric + 1 + "";
      }
      return checkGreaterThanOrEqual(a, lowerBound) && checkLessThan(a, upperBound);
    }
    function getModifierAndComponents(range) {
      var rangeComponents = range.split(componentRegex);
      var matches = rangeComponents[0].match(modifierRegex);
      !matches ? true ? invariant(false, "expected regex to match but it did not") : invariant(false) : void 0;
      return {
        modifier: matches[1],
        rangeComponents: [matches[2]].concat(rangeComponents.slice(1))
      };
    }
    function isNumber(number) {
      return !isNaN(number) && isFinite(number);
    }
    function isSimpleVersion(range) {
      return !getModifierAndComponents(range).modifier;
    }
    function zeroPad(array, length) {
      for (var i = array.length; i < length; i++) {
        array[i] = "0";
      }
    }
    function normalizeVersions(a, b) {
      a = a.slice();
      b = b.slice();
      zeroPad(a, b.length);
      for (var i = 0; i < b.length; i++) {
        var matches = b[i].match(/^[x*]$/i);
        if (matches) {
          b[i] = a[i] = "0";
          if (matches[0] === "*" && i === b.length - 1) {
            for (var j = i; j < a.length; j++) {
              a[j] = "0";
            }
          }
        }
      }
      zeroPad(b, a.length);
      return [a, b];
    }
    function compareNumeric(a, b) {
      var aPrefix = a.match(numericRegex)[1];
      var bPrefix = b.match(numericRegex)[1];
      var aNumeric = parseInt(aPrefix, 10);
      var bNumeric = parseInt(bPrefix, 10);
      if (isNumber(aNumeric) && isNumber(bNumeric) && aNumeric !== bNumeric) {
        return compare(aNumeric, bNumeric);
      } else {
        return compare(a, b);
      }
    }
    function compare(a, b) {
      !(typeof a === typeof b) ? true ? invariant(false, '"a" and "b" must be of the same type') : invariant(false) : void 0;
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    }
    function compareComponents(a, b) {
      var _normalizeVersions = normalizeVersions(a, b), aNormalized = _normalizeVersions[0], bNormalized = _normalizeVersions[1];
      for (var i = 0; i < bNormalized.length; i++) {
        var result = compareNumeric(aNormalized[i], bNormalized[i]);
        if (result) {
          return result;
        }
      }
      return 0;
    }
    var VersionRange = {
      /**
       * Checks whether `version` satisfies the `range` specification.
       *
       * We support a subset of the expressions defined in
       * https://www.npmjs.org/doc/misc/semver.html:
       *
       *    version   Must match version exactly
       *    =version  Same as just version
       *    >version  Must be greater than version
       *    >=version Must be greater than or equal to version
       *    <version  Must be less than version
       *    <=version Must be less than or equal to version
       *    ~version  Must be at least version, but less than the next significant
       *              revision above version:
       *              "~1.2.3" is equivalent to ">= 1.2.3 and < 1.3"
       *    ~>version Equivalent to ~version
       *    1.2.x     Must match "1.2.x", where "x" is a wildcard that matches
       *              anything
       *    1.2.*     Similar to "1.2.x", but "*" in the trailing position is a
       *              "greedy" wildcard, so will match any number of additional
       *              components:
       *              "1.2.*" will match "1.2.1", "1.2.1.1", "1.2.1.1.1" etc
       *    *         Any version
       *    ""        (Empty string) Same as *
       *    v1 - v2   Equivalent to ">= v1 and <= v2"
       *    r1 || r2  Passes if either r1 or r2 are satisfied
       *
       * @param {string} range
       * @param {string} version
       * @returns {boolean}
       */
      contains: function contains(range, version) {
        return checkOrExpression(range.trim(), version.trim());
      }
    };
    module.exports = VersionRange;
  }
});

// node_modules/fbjs/lib/mapObject.js
var require_mapObject = __commonJS({
  "node_modules/fbjs/lib/mapObject.js"(exports, module) {
    "use strict";
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function mapObject(object, callback, context) {
      if (!object) {
        return null;
      }
      var result = {};
      for (var name in object) {
        if (hasOwnProperty.call(object, name)) {
          result[name] = callback.call(context, object[name], name, object);
        }
      }
      return result;
    }
    module.exports = mapObject;
  }
});

// node_modules/fbjs/lib/memoizeStringOnly.js
var require_memoizeStringOnly = __commonJS({
  "node_modules/fbjs/lib/memoizeStringOnly.js"(exports, module) {
    "use strict";
    function memoizeStringOnly(callback) {
      var cache = {};
      return function(string) {
        if (!cache.hasOwnProperty(string)) {
          cache[string] = callback.call(this, string);
        }
        return cache[string];
      };
    }
    module.exports = memoizeStringOnly;
  }
});

// node_modules/fbjs/lib/UserAgent.js
var require_UserAgent = __commonJS({
  "node_modules/fbjs/lib/UserAgent.js"(exports, module) {
    "use strict";
    var UserAgentData = require_UserAgentData();
    var VersionRange = require_VersionRange();
    var mapObject = require_mapObject();
    var memoizeStringOnly = require_memoizeStringOnly();
    function compare(name, version, query, normalizer) {
      if (name === query) {
        return true;
      }
      if (!query.startsWith(name)) {
        return false;
      }
      var range = query.slice(name.length);
      if (version) {
        range = normalizer ? normalizer(range) : range;
        return VersionRange.contains(range, version);
      }
      return false;
    }
    function normalizePlatformVersion(version) {
      if (UserAgentData.platformName === "Windows") {
        return version.replace(/^\s*NT/, "");
      }
      return version;
    }
    var UserAgent = {
      /**
       * Check if the User Agent browser matches `query`.
       *
       * `query` should be a string like "Chrome" or "Chrome > 33".
       *
       * Valid browser names include:
       *
       * - ACCESS NetFront
       * - AOL
       * - Amazon Silk
       * - Android
       * - BlackBerry
       * - BlackBerry PlayBook
       * - Chrome
       * - Chrome for iOS
       * - Chrome frame
       * - Facebook PHP SDK
       * - Facebook for iOS
       * - Firefox
       * - IE
       * - IE Mobile
       * - Mobile Safari
       * - Motorola Internet Browser
       * - Nokia
       * - Openwave Mobile Browser
       * - Opera
       * - Opera Mini
       * - Opera Mobile
       * - Safari
       * - UIWebView
       * - Unknown
       * - webOS
       * - etc...
       *
       * An authoritative list can be found in the PHP `BrowserDetector` class and
       * related classes in the same file (see calls to `new UserAgentBrowser` here:
       * https://fburl.com/50728104).
       *
       * @note Function results are memoized
       *
       * @param {string} query Query of the form "Name [range expression]"
       * @return {boolean}
       */
      isBrowser: function isBrowser(query) {
        return compare(UserAgentData.browserName, UserAgentData.browserFullVersion, query);
      },
      /**
       * Check if the User Agent browser uses a 32 or 64 bit architecture.
       *
       * @note Function results are memoized
       *
       * @param {string} query Query of the form "32" or "64".
       * @return {boolean}
       */
      isBrowserArchitecture: function isBrowserArchitecture(query) {
        return compare(UserAgentData.browserArchitecture, null, query);
      },
      /**
       * Check if the User Agent device matches `query`.
       *
       * `query` should be a string like "iPhone" or "iPad".
       *
       * Valid device names include:
       *
       * - Kindle
       * - Kindle Fire
       * - Unknown
       * - iPad
       * - iPhone
       * - iPod
       * - etc...
       *
       * An authoritative list can be found in the PHP `DeviceDetector` class and
       * related classes in the same file (see calls to `new UserAgentDevice` here:
       * https://fburl.com/50728332).
       *
       * @note Function results are memoized
       *
       * @param {string} query Query of the form "Name"
       * @return {boolean}
       */
      isDevice: function isDevice(query) {
        return compare(UserAgentData.deviceName, null, query);
      },
      /**
       * Check if the User Agent rendering engine matches `query`.
       *
       * `query` should be a string like "WebKit" or "WebKit >= 537".
       *
       * Valid engine names include:
       *
       * - Gecko
       * - Presto
       * - Trident
       * - WebKit
       * - etc...
       *
       * An authoritative list can be found in the PHP `RenderingEngineDetector`
       * class related classes in the same file (see calls to `new
       * UserAgentRenderingEngine` here: https://fburl.com/50728617).
       *
       * @note Function results are memoized
       *
       * @param {string} query Query of the form "Name [range expression]"
       * @return {boolean}
       */
      isEngine: function isEngine(query) {
        return compare(UserAgentData.engineName, UserAgentData.engineVersion, query);
      },
      /**
       * Check if the User Agent platform matches `query`.
       *
       * `query` should be a string like "Windows" or "iOS 5 - 6".
       *
       * Valid platform names include:
       *
       * - Android
       * - BlackBerry OS
       * - Java ME
       * - Linux
       * - Mac OS X
       * - Mac OS X Calendar
       * - Mac OS X Internet Account
       * - Symbian
       * - SymbianOS
       * - Windows
       * - Windows Mobile
       * - Windows Phone
       * - iOS
       * - iOS Facebook Integration Account
       * - iOS Facebook Social Sharing UI
       * - webOS
       * - Chrome OS
       * - etc...
       *
       * An authoritative list can be found in the PHP `PlatformDetector` class and
       * related classes in the same file (see calls to `new UserAgentPlatform`
       * here: https://fburl.com/50729226).
       *
       * @note Function results are memoized
       *
       * @param {string} query Query of the form "Name [range expression]"
       * @return {boolean}
       */
      isPlatform: function isPlatform(query) {
        return compare(UserAgentData.platformName, UserAgentData.platformFullVersion, query, normalizePlatformVersion);
      },
      /**
       * Check if the User Agent platform is a 32 or 64 bit architecture.
       *
       * @note Function results are memoized
       *
       * @param {string} query Query of the form "32" or "64".
       * @return {boolean}
       */
      isPlatformArchitecture: function isPlatformArchitecture(query) {
        return compare(UserAgentData.platformArchitecture, null, query);
      }
    };
    module.exports = mapObject(UserAgent, memoizeStringOnly);
  }
});

// node_modules/draft-js/lib/getCorrectDocumentFromNode.js
var require_getCorrectDocumentFromNode = __commonJS({
  "node_modules/draft-js/lib/getCorrectDocumentFromNode.js"(exports, module) {
    "use strict";
    function getCorrectDocumentFromNode(node) {
      if (!node || !node.ownerDocument) {
        return document;
      }
      return node.ownerDocument;
    }
    module.exports = getCorrectDocumentFromNode;
  }
});

// node_modules/draft-js/lib/isElement.js
var require_isElement = __commonJS({
  "node_modules/draft-js/lib/isElement.js"(exports, module) {
    "use strict";
    function isElement(node) {
      if (!node || !node.ownerDocument) {
        return false;
      }
      return node.nodeType === Node.ELEMENT_NODE;
    }
    module.exports = isElement;
  }
});

// node_modules/draft-js/lib/getSelectionOffsetKeyForNode.js
var require_getSelectionOffsetKeyForNode = __commonJS({
  "node_modules/draft-js/lib/getSelectionOffsetKeyForNode.js"(exports, module) {
    "use strict";
    var isElement = require_isElement();
    function getSelectionOffsetKeyForNode(node) {
      if (isElement(node)) {
        var castedNode = node;
        var offsetKey = castedNode.getAttribute("data-offset-key");
        if (offsetKey) {
          return offsetKey;
        }
        for (var ii = 0; ii < castedNode.childNodes.length; ii++) {
          var childOffsetKey = getSelectionOffsetKeyForNode(castedNode.childNodes[ii]);
          if (childOffsetKey) {
            return childOffsetKey;
          }
        }
      }
      return null;
    }
    module.exports = getSelectionOffsetKeyForNode;
  }
});

// node_modules/draft-js/lib/findAncestorOffsetKey.js
var require_findAncestorOffsetKey = __commonJS({
  "node_modules/draft-js/lib/findAncestorOffsetKey.js"(exports, module) {
    "use strict";
    var getCorrectDocumentFromNode = require_getCorrectDocumentFromNode();
    var getSelectionOffsetKeyForNode = require_getSelectionOffsetKeyForNode();
    function findAncestorOffsetKey(node) {
      var searchNode = node;
      while (searchNode && searchNode !== getCorrectDocumentFromNode(node).documentElement) {
        var key = getSelectionOffsetKeyForNode(searchNode);
        if (key != null) {
          return key;
        }
        searchNode = searchNode.parentNode;
      }
      return null;
    }
    module.exports = findAncestorOffsetKey;
  }
});

// node_modules/draft-js/lib/getWindowForNode.js
var require_getWindowForNode = __commonJS({
  "node_modules/draft-js/lib/getWindowForNode.js"(exports, module) {
    "use strict";
    function getWindowForNode(node) {
      if (!node || !node.ownerDocument || !node.ownerDocument.defaultView) {
        return window;
      }
      return node.ownerDocument.defaultView;
    }
    module.exports = getWindowForNode;
  }
});

// node_modules/draft-js/lib/DOMObserver.js
var require_DOMObserver = __commonJS({
  "node_modules/draft-js/lib/DOMObserver.js"(exports, module) {
    "use strict";
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var UserAgent = require_UserAgent();
    var findAncestorOffsetKey = require_findAncestorOffsetKey();
    var getWindowForNode = require_getWindowForNode();
    var Immutable = require_immutable();
    var invariant = require_invariant();
    var nullthrows = require_nullthrows();
    var Map = Immutable.Map;
    var DOM_OBSERVER_OPTIONS = {
      subtree: true,
      characterData: true,
      childList: true,
      characterDataOldValue: false,
      attributes: false
    };
    var USE_CHAR_DATA = UserAgent.isBrowser("IE <= 11");
    var DOMObserver = function() {
      function DOMObserver2(container) {
        var _this = this;
        _defineProperty(this, "observer", void 0);
        _defineProperty(this, "container", void 0);
        _defineProperty(this, "mutations", void 0);
        _defineProperty(this, "onCharData", void 0);
        this.container = container;
        this.mutations = Map();
        var containerWindow = getWindowForNode(container);
        if (containerWindow.MutationObserver && !USE_CHAR_DATA) {
          this.observer = new containerWindow.MutationObserver(function(mutations) {
            return _this.registerMutations(mutations);
          });
        } else {
          this.onCharData = function(e) {
            !(e.target instanceof Node) ? true ? invariant(false, "Expected target to be an instance of Node") : invariant(false) : void 0;
            _this.registerMutation({
              type: "characterData",
              target: e.target
            });
          };
        }
      }
      var _proto = DOMObserver2.prototype;
      _proto.start = function start() {
        if (this.observer) {
          this.observer.observe(this.container, DOM_OBSERVER_OPTIONS);
        } else {
          this.container.addEventListener("DOMCharacterDataModified", this.onCharData);
        }
      };
      _proto.stopAndFlushMutations = function stopAndFlushMutations() {
        var observer = this.observer;
        if (observer) {
          this.registerMutations(observer.takeRecords());
          observer.disconnect();
        } else {
          this.container.removeEventListener("DOMCharacterDataModified", this.onCharData);
        }
        var mutations = this.mutations;
        this.mutations = Map();
        return mutations;
      };
      _proto.registerMutations = function registerMutations(mutations) {
        for (var i = 0; i < mutations.length; i++) {
          this.registerMutation(mutations[i]);
        }
      };
      _proto.getMutationTextContent = function getMutationTextContent(mutation) {
        var type = mutation.type, target = mutation.target, removedNodes = mutation.removedNodes;
        if (type === "characterData") {
          if (target.textContent !== "") {
            if (USE_CHAR_DATA) {
              return target.textContent.replace("\n", "");
            }
            return target.textContent;
          }
        } else if (type === "childList") {
          if (removedNodes && removedNodes.length) {
            return "";
          } else if (target.textContent !== "") {
            return target.textContent;
          }
        }
        return null;
      };
      _proto.registerMutation = function registerMutation(mutation) {
        var textContent = this.getMutationTextContent(mutation);
        if (textContent != null) {
          var offsetKey = nullthrows(findAncestorOffsetKey(mutation.target));
          this.mutations = this.mutations.set(offsetKey, textContent);
        }
      };
      return DOMObserver2;
    }();
    module.exports = DOMObserver;
  }
});

// node_modules/draft-js/lib/DraftOffsetKey.js
var require_DraftOffsetKey = __commonJS({
  "node_modules/draft-js/lib/DraftOffsetKey.js"(exports, module) {
    "use strict";
    var KEY_DELIMITER = "-";
    var DraftOffsetKey = {
      encode: function encode(blockKey, decoratorKey, leafKey) {
        return blockKey + KEY_DELIMITER + decoratorKey + KEY_DELIMITER + leafKey;
      },
      decode: function decode(offsetKey) {
        var _offsetKey$split$reve = offsetKey.split(KEY_DELIMITER).reverse(), leafKey = _offsetKey$split$reve[0], decoratorKey = _offsetKey$split$reve[1], blockKeyParts = _offsetKey$split$reve.slice(2);
        return {
          // Recomposes the parts of blockKey after reversing them
          blockKey: blockKeyParts.reverse().join(KEY_DELIMITER),
          decoratorKey: parseInt(decoratorKey, 10),
          leafKey: parseInt(leafKey, 10)
        };
      }
    };
    module.exports = DraftOffsetKey;
  }
});

// node_modules/fbjs/lib/Keys.js
var require_Keys = __commonJS({
  "node_modules/fbjs/lib/Keys.js"(exports, module) {
    "use strict";
    module.exports = {
      BACKSPACE: 8,
      TAB: 9,
      RETURN: 13,
      ALT: 18,
      ESC: 27,
      SPACE: 32,
      PAGE_UP: 33,
      PAGE_DOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      DELETE: 46,
      COMMA: 188,
      PERIOD: 190,
      A: 65,
      Z: 90,
      ZERO: 48,
      NUMPAD_0: 96,
      NUMPAD_9: 105
    };
  }
});

// node_modules/draft-js/lib/DraftJsDebugLogging.js
var require_DraftJsDebugLogging = __commonJS({
  "node_modules/draft-js/lib/DraftJsDebugLogging.js"(exports, module) {
    "use strict";
    module.exports = {
      logBlockedSelectionEvent: function logBlockedSelectionEvent() {
        return null;
      },
      logSelectionStateFailure: function logSelectionStateFailure() {
        return null;
      }
    };
  }
});

// node_modules/draft-js/lib/isHTMLElement.js
var require_isHTMLElement = __commonJS({
  "node_modules/draft-js/lib/isHTMLElement.js"(exports, module) {
    "use strict";
    function isHTMLElement(node) {
      if (!node || !node.ownerDocument) {
        return false;
      }
      if (!node.ownerDocument.defaultView) {
        return node instanceof HTMLElement;
      }
      if (node instanceof node.ownerDocument.defaultView.HTMLElement) {
        return true;
      }
      return false;
    }
    module.exports = isHTMLElement;
  }
});

// node_modules/draft-js/lib/getContentEditableContainer.js
var require_getContentEditableContainer = __commonJS({
  "node_modules/draft-js/lib/getContentEditableContainer.js"(exports, module) {
    "use strict";
    var invariant = require_invariant();
    var isHTMLElement = require_isHTMLElement();
    function getContentEditableContainer(editor) {
      var editorNode = editor.editorContainer;
      !editorNode ? true ? invariant(false, "Missing editorNode") : invariant(false) : void 0;
      !isHTMLElement(editorNode.firstChild) ? true ? invariant(false, "editorNode.firstChild is not an HTMLElement") : invariant(false) : void 0;
      var htmlElement = editorNode.firstChild;
      return htmlElement;
    }
    module.exports = getContentEditableContainer;
  }
});

// node_modules/draft-js/lib/getUpdatedSelectionState.js
var require_getUpdatedSelectionState = __commonJS({
  "node_modules/draft-js/lib/getUpdatedSelectionState.js"(exports, module) {
    "use strict";
    var DraftOffsetKey = require_DraftOffsetKey();
    var nullthrows = require_nullthrows();
    function getUpdatedSelectionState(editorState, anchorKey, anchorOffset, focusKey, focusOffset) {
      var selection = nullthrows(editorState.getSelection());
      if (!anchorKey || !focusKey) {
        if (true) {
          console.warn("Invalid selection state.", arguments, editorState.toJS());
        }
        return selection;
      }
      var anchorPath = DraftOffsetKey.decode(anchorKey);
      var anchorBlockKey = anchorPath.blockKey;
      var anchorLeafBlockTree = editorState.getBlockTree(anchorBlockKey);
      var anchorLeaf = anchorLeafBlockTree && anchorLeafBlockTree.getIn([anchorPath.decoratorKey, "leaves", anchorPath.leafKey]);
      var focusPath = DraftOffsetKey.decode(focusKey);
      var focusBlockKey = focusPath.blockKey;
      var focusLeafBlockTree = editorState.getBlockTree(focusBlockKey);
      var focusLeaf = focusLeafBlockTree && focusLeafBlockTree.getIn([focusPath.decoratorKey, "leaves", focusPath.leafKey]);
      if (!anchorLeaf || !focusLeaf) {
        if (true) {
          console.warn("Invalid selection state.", arguments, editorState.toJS());
        }
        return selection;
      }
      var anchorLeafStart = anchorLeaf.get("start");
      var focusLeafStart = focusLeaf.get("start");
      var anchorBlockOffset = anchorLeaf ? anchorLeafStart + anchorOffset : null;
      var focusBlockOffset = focusLeaf ? focusLeafStart + focusOffset : null;
      var areEqual = selection.getAnchorKey() === anchorBlockKey && selection.getAnchorOffset() === anchorBlockOffset && selection.getFocusKey() === focusBlockKey && selection.getFocusOffset() === focusBlockOffset;
      if (areEqual) {
        return selection;
      }
      var isBackward = false;
      if (anchorBlockKey === focusBlockKey) {
        var anchorLeafEnd = anchorLeaf.get("end");
        var focusLeafEnd = focusLeaf.get("end");
        if (focusLeafStart === anchorLeafStart && focusLeafEnd === anchorLeafEnd) {
          isBackward = focusOffset < anchorOffset;
        } else {
          isBackward = focusLeafStart < anchorLeafStart;
        }
      } else {
        var startKey = editorState.getCurrentContent().getBlockMap().keySeq().skipUntil(function(v) {
          return v === anchorBlockKey || v === focusBlockKey;
        }).first();
        isBackward = startKey === focusBlockKey;
      }
      return selection.merge({
        anchorKey: anchorBlockKey,
        anchorOffset: anchorBlockOffset,
        focusKey: focusBlockKey,
        focusOffset: focusBlockOffset,
        isBackward
      });
    }
    module.exports = getUpdatedSelectionState;
  }
});

// node_modules/draft-js/lib/getDraftEditorSelectionWithNodes.js
var require_getDraftEditorSelectionWithNodes = __commonJS({
  "node_modules/draft-js/lib/getDraftEditorSelectionWithNodes.js"(exports, module) {
    "use strict";
    var findAncestorOffsetKey = require_findAncestorOffsetKey();
    var getSelectionOffsetKeyForNode = require_getSelectionOffsetKeyForNode();
    var getUpdatedSelectionState = require_getUpdatedSelectionState();
    var invariant = require_invariant();
    var isElement = require_isElement();
    var nullthrows = require_nullthrows();
    function getDraftEditorSelectionWithNodes(editorState, root, anchorNode, anchorOffset, focusNode, focusOffset) {
      var anchorIsTextNode = anchorNode.nodeType === Node.TEXT_NODE;
      var focusIsTextNode = focusNode.nodeType === Node.TEXT_NODE;
      if (anchorIsTextNode && focusIsTextNode) {
        return {
          selectionState: getUpdatedSelectionState(editorState, nullthrows(findAncestorOffsetKey(anchorNode)), anchorOffset, nullthrows(findAncestorOffsetKey(focusNode)), focusOffset),
          needsRecovery: false
        };
      }
      var anchorPoint = null;
      var focusPoint = null;
      var needsRecovery = true;
      if (anchorIsTextNode) {
        anchorPoint = {
          key: nullthrows(findAncestorOffsetKey(anchorNode)),
          offset: anchorOffset
        };
        focusPoint = getPointForNonTextNode(root, focusNode, focusOffset);
      } else if (focusIsTextNode) {
        focusPoint = {
          key: nullthrows(findAncestorOffsetKey(focusNode)),
          offset: focusOffset
        };
        anchorPoint = getPointForNonTextNode(root, anchorNode, anchorOffset);
      } else {
        anchorPoint = getPointForNonTextNode(root, anchorNode, anchorOffset);
        focusPoint = getPointForNonTextNode(root, focusNode, focusOffset);
        if (anchorNode === focusNode && anchorOffset === focusOffset) {
          needsRecovery = !!anchorNode.firstChild && anchorNode.firstChild.nodeName !== "BR";
        }
      }
      return {
        selectionState: getUpdatedSelectionState(editorState, anchorPoint.key, anchorPoint.offset, focusPoint.key, focusPoint.offset),
        needsRecovery
      };
    }
    function getFirstLeaf(node) {
      while (node.firstChild && // data-blocks has no offset
      (isElement(node.firstChild) && node.firstChild.getAttribute("data-blocks") === "true" || getSelectionOffsetKeyForNode(node.firstChild))) {
        node = node.firstChild;
      }
      return node;
    }
    function getLastLeaf(node) {
      while (node.lastChild && // data-blocks has no offset
      (isElement(node.lastChild) && node.lastChild.getAttribute("data-blocks") === "true" || getSelectionOffsetKeyForNode(node.lastChild))) {
        node = node.lastChild;
      }
      return node;
    }
    function getPointForNonTextNode(editorRoot, startNode, childOffset) {
      var node = startNode;
      var offsetKey = findAncestorOffsetKey(node);
      !(offsetKey != null || editorRoot && (editorRoot === node || editorRoot.firstChild === node)) ? true ? invariant(false, "Unknown node in selection range.") : invariant(false) : void 0;
      if (editorRoot === node) {
        node = node.firstChild;
        !isElement(node) ? true ? invariant(false, "Invalid DraftEditorContents node.") : invariant(false) : void 0;
        var castedNode = node;
        node = castedNode;
        !(node.getAttribute("data-contents") === "true") ? true ? invariant(false, "Invalid DraftEditorContents structure.") : invariant(false) : void 0;
        if (childOffset > 0) {
          childOffset = node.childNodes.length;
        }
      }
      if (childOffset === 0) {
        var key = null;
        if (offsetKey != null) {
          key = offsetKey;
        } else {
          var firstLeaf = getFirstLeaf(node);
          key = nullthrows(getSelectionOffsetKeyForNode(firstLeaf));
        }
        return {
          key,
          offset: 0
        };
      }
      var nodeBeforeCursor = node.childNodes[childOffset - 1];
      var leafKey = null;
      var textLength = null;
      if (!getSelectionOffsetKeyForNode(nodeBeforeCursor)) {
        leafKey = nullthrows(offsetKey);
        textLength = getTextContentLength(nodeBeforeCursor);
      } else {
        var lastLeaf = getLastLeaf(nodeBeforeCursor);
        leafKey = nullthrows(getSelectionOffsetKeyForNode(lastLeaf));
        textLength = getTextContentLength(lastLeaf);
      }
      return {
        key: leafKey,
        offset: textLength
      };
    }
    function getTextContentLength(node) {
      var textContent = node.textContent;
      return textContent === "\n" ? 0 : textContent.length;
    }
    module.exports = getDraftEditorSelectionWithNodes;
  }
});

// node_modules/draft-js/lib/getDraftEditorSelection.js
var require_getDraftEditorSelection = __commonJS({
  "node_modules/draft-js/lib/getDraftEditorSelection.js"(exports, module) {
    "use strict";
    var getDraftEditorSelectionWithNodes = require_getDraftEditorSelectionWithNodes();
    function getDraftEditorSelection(editorState, root) {
      var selection = root.ownerDocument.defaultView.getSelection();
      var anchorNode = selection.anchorNode, anchorOffset = selection.anchorOffset, focusNode = selection.focusNode, focusOffset = selection.focusOffset, rangeCount = selection.rangeCount;
      if (
        // No active selection.
        rangeCount === 0 || // No selection, ever. As in, the user hasn't selected anything since
        // opening the document.
        anchorNode == null || focusNode == null
      ) {
        return {
          selectionState: editorState.getSelection().set("hasFocus", false),
          needsRecovery: false
        };
      }
      return getDraftEditorSelectionWithNodes(editorState, root, anchorNode, anchorOffset, focusNode, focusOffset);
    }
    module.exports = getDraftEditorSelection;
  }
});

// node_modules/draft-js/lib/editOnSelect.js
var require_editOnSelect = __commonJS({
  "node_modules/draft-js/lib/editOnSelect.js"(exports, module) {
    "use strict";
    var DraftJsDebugLogging = require_DraftJsDebugLogging();
    var EditorState = require_EditorState();
    var getContentEditableContainer = require_getContentEditableContainer();
    var getDraftEditorSelection = require_getDraftEditorSelection();
    function editOnSelect(editor) {
      if (editor._blockSelectEvents || editor._latestEditorState !== editor.props.editorState) {
        if (editor._blockSelectEvents) {
          var _editorState = editor.props.editorState;
          var selectionState = _editorState.getSelection();
          DraftJsDebugLogging.logBlockedSelectionEvent({
            // For now I don't think we need any other info
            anonymizedDom: "N/A",
            extraParams: JSON.stringify({
              stacktrace: new Error().stack
            }),
            selectionState: JSON.stringify(selectionState.toJS())
          });
        }
        return;
      }
      var editorState = editor.props.editorState;
      var documentSelection = getDraftEditorSelection(editorState, getContentEditableContainer(editor));
      var updatedSelectionState = documentSelection.selectionState;
      if (updatedSelectionState !== editorState.getSelection()) {
        if (documentSelection.needsRecovery) {
          editorState = EditorState.forceSelection(editorState, updatedSelectionState);
        } else {
          editorState = EditorState.acceptSelection(editorState, updatedSelectionState);
        }
        editor.update(editorState);
      }
    }
    module.exports = editOnSelect;
  }
});

// node_modules/draft-js/lib/draftKeyUtils.js
var require_draftKeyUtils = __commonJS({
  "node_modules/draft-js/lib/draftKeyUtils.js"(exports, module) {
    "use strict";
    function notEmptyKey(key) {
      return key != null && key != "";
    }
    module.exports = {
      notEmptyKey
    };
  }
});

// node_modules/draft-js/lib/getEntityKeyForSelection.js
var require_getEntityKeyForSelection = __commonJS({
  "node_modules/draft-js/lib/getEntityKeyForSelection.js"(exports, module) {
    "use strict";
    var _require = require_draftKeyUtils();
    var notEmptyKey = _require.notEmptyKey;
    function getEntityKeyForSelection(contentState, targetSelection) {
      var entityKey;
      if (targetSelection.isCollapsed()) {
        var key = targetSelection.getAnchorKey();
        var offset = targetSelection.getAnchorOffset();
        if (offset > 0) {
          entityKey = contentState.getBlockForKey(key).getEntityAt(offset - 1);
          if (entityKey !== contentState.getBlockForKey(key).getEntityAt(offset)) {
            return null;
          }
          return filterKey(contentState.getEntityMap(), entityKey);
        }
        return null;
      }
      var startKey = targetSelection.getStartKey();
      var startOffset = targetSelection.getStartOffset();
      var startBlock = contentState.getBlockForKey(startKey);
      entityKey = startOffset === startBlock.getLength() ? null : startBlock.getEntityAt(startOffset);
      return filterKey(contentState.getEntityMap(), entityKey);
    }
    function filterKey(entityMap, entityKey) {
      if (notEmptyKey(entityKey)) {
        var entity = entityMap.__get(entityKey);
        return entity.getMutability() === "MUTABLE" ? entityKey : null;
      }
      return null;
    }
    module.exports = getEntityKeyForSelection;
  }
});

// node_modules/draft-js/lib/DraftEditorCompositionHandler.js
var require_DraftEditorCompositionHandler = __commonJS({
  "node_modules/draft-js/lib/DraftEditorCompositionHandler.js"(exports, module) {
    "use strict";
    var DOMObserver = require_DOMObserver();
    var DraftModifier = require_DraftModifier();
    var DraftOffsetKey = require_DraftOffsetKey();
    var EditorState = require_EditorState();
    var Keys = require_Keys();
    var UserAgent = require_UserAgent();
    var editOnSelect = require_editOnSelect();
    var getContentEditableContainer = require_getContentEditableContainer();
    var getDraftEditorSelection = require_getDraftEditorSelection();
    var getEntityKeyForSelection = require_getEntityKeyForSelection();
    var nullthrows = require_nullthrows();
    var isIE = UserAgent.isBrowser("IE");
    var RESOLVE_DELAY = 20;
    var resolved = false;
    var stillComposing = false;
    var domObserver = null;
    function startDOMObserver(editor) {
      if (!domObserver) {
        domObserver = new DOMObserver(getContentEditableContainer(editor));
        domObserver.start();
      }
    }
    var DraftEditorCompositionHandler = {
      /**
       * A `compositionstart` event has fired while we're still in composition
       * mode. Continue the current composition session to prevent a re-render.
       */
      onCompositionStart: function onCompositionStart(editor) {
        stillComposing = true;
        startDOMObserver(editor);
      },
      /**
       * Attempt to end the current composition session.
       *
       * Defer handling because browser will still insert the chars into active
       * element after `compositionend`. If a `compositionstart` event fires
       * before `resolveComposition` executes, our composition session will
       * continue.
       *
       * The `resolved` flag is useful because certain IME interfaces fire the
       * `compositionend` event multiple times, thus queueing up multiple attempts
       * at handling the composition. Since handling the same composition event
       * twice could break the DOM, we only use the first event. Example: Arabic
       * Google Input Tools on Windows 8.1 fires `compositionend` three times.
       */
      onCompositionEnd: function onCompositionEnd(editor) {
        resolved = false;
        stillComposing = false;
        setTimeout(function() {
          if (!resolved) {
            DraftEditorCompositionHandler.resolveComposition(editor);
          }
        }, RESOLVE_DELAY);
      },
      onSelect: editOnSelect,
      /**
       * In Safari, keydown events may fire when committing compositions. If
       * the arrow keys are used to commit, prevent default so that the cursor
       * doesn't move, otherwise it will jump back noticeably on re-render.
       */
      onKeyDown: function onKeyDown(editor, e) {
        if (!stillComposing) {
          DraftEditorCompositionHandler.resolveComposition(editor);
          editor._onKeyDown(e);
          return;
        }
        if (e.which === Keys.RIGHT || e.which === Keys.LEFT) {
          e.preventDefault();
        }
      },
      /**
       * Keypress events may fire when committing compositions. In Firefox,
       * pressing RETURN commits the composition and inserts extra newline
       * characters that we do not want. `preventDefault` allows the composition
       * to be committed while preventing the extra characters.
       */
      onKeyPress: function onKeyPress(_editor, e) {
        if (e.which === Keys.RETURN) {
          e.preventDefault();
        }
      },
      /**
       * Attempt to insert composed characters into the document.
       *
       * If we are still in a composition session, do nothing. Otherwise, insert
       * the characters into the document and terminate the composition session.
       *
       * If no characters were composed -- for instance, the user
       * deleted all composed characters and committed nothing new --
       * force a re-render. We also re-render when the composition occurs
       * at the beginning of a leaf, to ensure that if the browser has
       * created a new text node for the composition, we will discard it.
       *
       * Resetting innerHTML will move focus to the beginning of the editor,
       * so we update to force it back to the correct place.
       */
      resolveComposition: function resolveComposition(editor) {
        if (stillComposing) {
          return;
        }
        var mutations = nullthrows(domObserver).stopAndFlushMutations();
        domObserver = null;
        resolved = true;
        var editorState = EditorState.set(editor._latestEditorState, {
          inCompositionMode: false
        });
        editor.exitCurrentMode();
        if (!mutations.size) {
          editor.update(editorState);
          return;
        }
        var contentState = editorState.getCurrentContent();
        mutations.forEach(function(composedChars, offsetKey) {
          var _DraftOffsetKey$decod = DraftOffsetKey.decode(offsetKey), blockKey = _DraftOffsetKey$decod.blockKey, decoratorKey = _DraftOffsetKey$decod.decoratorKey, leafKey = _DraftOffsetKey$decod.leafKey;
          var _editorState$getBlock = editorState.getBlockTree(blockKey).getIn([decoratorKey, "leaves", leafKey]), start = _editorState$getBlock.start, end = _editorState$getBlock.end;
          var replacementRange = editorState.getSelection().merge({
            anchorKey: blockKey,
            focusKey: blockKey,
            anchorOffset: start,
            focusOffset: end,
            isBackward: false
          });
          var entityKey = getEntityKeyForSelection(contentState, replacementRange);
          var currentStyle = contentState.getBlockForKey(blockKey).getInlineStyleAt(start);
          contentState = DraftModifier.replaceText(contentState, replacementRange, composedChars, currentStyle, entityKey);
          editorState = EditorState.set(editorState, {
            currentContent: contentState
          });
        });
        var documentSelection = getDraftEditorSelection(editorState, getContentEditableContainer(editor));
        var compositionEndSelectionState = documentSelection.selectionState;
        editor.restoreEditorDOM();
        var editorStateWithUpdatedSelection = isIE ? EditorState.forceSelection(editorState, compositionEndSelectionState) : EditorState.acceptSelection(editorState, compositionEndSelectionState);
        editor.update(EditorState.push(editorStateWithUpdatedSelection, contentState, "insert-characters"));
      }
    };
    module.exports = DraftEditorCompositionHandler;
  }
});

// node_modules/draft-js/lib/DraftEditorDecoratedLeaves.react.js
var require_DraftEditorDecoratedLeaves_react = __commonJS({
  "node_modules/draft-js/lib/DraftEditorDecoratedLeaves.react.js"(exports, module) {
    "use strict";
    var _assign = require_object_assign();
    function _extends() {
      _extends = _assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var DraftOffsetKey = require_DraftOffsetKey();
    var React = require_react();
    var UnicodeBidi = require_UnicodeBidi();
    var UnicodeBidiDirection = require_UnicodeBidiDirection();
    var DraftEditorDecoratedLeaves = function(_React$Component) {
      _inheritsLoose(DraftEditorDecoratedLeaves2, _React$Component);
      function DraftEditorDecoratedLeaves2() {
        return _React$Component.apply(this, arguments) || this;
      }
      var _proto = DraftEditorDecoratedLeaves2.prototype;
      _proto.render = function render() {
        var _this$props = this.props, block = _this$props.block, children = _this$props.children, contentState = _this$props.contentState, decorator = _this$props.decorator, decoratorKey = _this$props.decoratorKey, direction = _this$props.direction, leafSet = _this$props.leafSet, text = _this$props.text;
        var blockKey = block.getKey();
        var leavesForLeafSet = leafSet.get("leaves");
        var DecoratorComponent = decorator.getComponentForKey(decoratorKey);
        var decoratorProps = decorator.getPropsForKey(decoratorKey);
        var decoratorOffsetKey = DraftOffsetKey.encode(blockKey, parseInt(decoratorKey, 10), 0);
        var decoratedText = text.slice(leavesForLeafSet.first().get("start"), leavesForLeafSet.last().get("end"));
        var dir = UnicodeBidiDirection.getHTMLDirIfDifferent(UnicodeBidi.getDirection(decoratedText), direction);
        return React.createElement(DecoratorComponent, _extends({}, decoratorProps, {
          contentState,
          decoratedText,
          dir,
          key: decoratorOffsetKey,
          entityKey: block.getEntityAt(leafSet.get("start")),
          offsetKey: decoratorOffsetKey
        }), children);
      };
      return DraftEditorDecoratedLeaves2;
    }(React.Component);
    module.exports = DraftEditorDecoratedLeaves;
  }
});

// node_modules/draft-js/lib/DraftEditorTextNode.react.js
var require_DraftEditorTextNode_react = __commonJS({
  "node_modules/draft-js/lib/DraftEditorTextNode.react.js"(exports, module) {
    "use strict";
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var React = require_react();
    var UserAgent = require_UserAgent();
    var invariant = require_invariant();
    var isElement = require_isElement();
    var useNewlineChar = UserAgent.isBrowser("IE <= 11");
    function isNewline(node) {
      return useNewlineChar ? node.textContent === "\n" : node.tagName === "BR";
    }
    var NEWLINE_A = function NEWLINE_A2(ref) {
      return useNewlineChar ? React.createElement("span", {
        key: "A",
        "data-text": "true",
        ref
      }, "\n") : React.createElement("br", {
        key: "A",
        "data-text": "true",
        ref
      });
    };
    var NEWLINE_B = function NEWLINE_B2(ref) {
      return useNewlineChar ? React.createElement("span", {
        key: "B",
        "data-text": "true",
        ref
      }, "\n") : React.createElement("br", {
        key: "B",
        "data-text": "true",
        ref
      });
    };
    var DraftEditorTextNode = function(_React$Component) {
      _inheritsLoose(DraftEditorTextNode2, _React$Component);
      function DraftEditorTextNode2(props) {
        var _this;
        _this = _React$Component.call(this, props) || this;
        _defineProperty(_assertThisInitialized(_this), "_forceFlag", void 0);
        _defineProperty(_assertThisInitialized(_this), "_node", void 0);
        _this._forceFlag = false;
        return _this;
      }
      var _proto = DraftEditorTextNode2.prototype;
      _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        var node = this._node;
        var shouldBeNewline = nextProps.children === "";
        !isElement(node) ? true ? invariant(false, "node is not an Element") : invariant(false) : void 0;
        var elementNode = node;
        if (shouldBeNewline) {
          return !isNewline(elementNode);
        }
        return elementNode.textContent !== nextProps.children;
      };
      _proto.componentDidMount = function componentDidMount() {
        this._forceFlag = !this._forceFlag;
      };
      _proto.componentDidUpdate = function componentDidUpdate() {
        this._forceFlag = !this._forceFlag;
      };
      _proto.render = function render() {
        var _this2 = this;
        if (this.props.children === "") {
          return this._forceFlag ? NEWLINE_A(function(ref) {
            return _this2._node = ref;
          }) : NEWLINE_B(function(ref) {
            return _this2._node = ref;
          });
        }
        return React.createElement("span", {
          key: this._forceFlag ? "A" : "B",
          "data-text": "true",
          ref: function ref(_ref) {
            return _this2._node = _ref;
          }
        }, this.props.children);
      };
      return DraftEditorTextNode2;
    }(React.Component);
    module.exports = DraftEditorTextNode;
  }
});

// node_modules/draft-js/lib/isHTMLBRElement.js
var require_isHTMLBRElement = __commonJS({
  "node_modules/draft-js/lib/isHTMLBRElement.js"(exports, module) {
    "use strict";
    var isElement = require_isElement();
    function isHTMLBRElement(node) {
      if (!node || !node.ownerDocument) {
        return false;
      }
      return isElement(node) && node.nodeName === "BR";
    }
    module.exports = isHTMLBRElement;
  }
});

// node_modules/draft-js/lib/DraftEffects.js
var require_DraftEffects = __commonJS({
  "node_modules/draft-js/lib/DraftEffects.js"(exports, module) {
    "use strict";
    module.exports = {
      initODS: function initODS() {
      },
      handleExtensionCausedError: function handleExtensionCausedError() {
      }
    };
  }
});

// node_modules/fbjs/lib/isNode.js
var require_isNode = __commonJS({
  "node_modules/fbjs/lib/isNode.js"(exports, module) {
    "use strict";
    function isNode(object) {
      var doc = object ? object.ownerDocument || object : document;
      var defaultView = doc.defaultView || window;
      return !!(object && (typeof defaultView.Node === "function" ? object instanceof defaultView.Node : typeof object === "object" && typeof object.nodeType === "number" && typeof object.nodeName === "string"));
    }
    module.exports = isNode;
  }
});

// node_modules/fbjs/lib/isTextNode.js
var require_isTextNode = __commonJS({
  "node_modules/fbjs/lib/isTextNode.js"(exports, module) {
    "use strict";
    var isNode = require_isNode();
    function isTextNode(object) {
      return isNode(object) && object.nodeType == 3;
    }
    module.exports = isTextNode;
  }
});

// node_modules/fbjs/lib/containsNode.js
var require_containsNode = __commonJS({
  "node_modules/fbjs/lib/containsNode.js"(exports, module) {
    "use strict";
    var isTextNode = require_isTextNode();
    function containsNode(outerNode, innerNode) {
      if (!outerNode || !innerNode) {
        return false;
      } else if (outerNode === innerNode) {
        return true;
      } else if (isTextNode(outerNode)) {
        return false;
      } else if (isTextNode(innerNode)) {
        return containsNode(outerNode, innerNode.parentNode);
      } else if ("contains" in outerNode) {
        return outerNode.contains(innerNode);
      } else if (outerNode.compareDocumentPosition) {
        return !!(outerNode.compareDocumentPosition(innerNode) & 16);
      } else {
        return false;
      }
    }
    module.exports = containsNode;
  }
});

// node_modules/fbjs/lib/getActiveElement.js
var require_getActiveElement = __commonJS({
  "node_modules/fbjs/lib/getActiveElement.js"(exports, module) {
    "use strict";
    function getActiveElement(doc) {
      doc = doc || (typeof document !== "undefined" ? document : void 0);
      if (typeof doc === "undefined") {
        return null;
      }
      try {
        return doc.activeElement || doc.body;
      } catch (e) {
        return doc.body;
      }
    }
    module.exports = getActiveElement;
  }
});

// node_modules/draft-js/lib/setDraftEditorSelection.js
var require_setDraftEditorSelection = __commonJS({
  "node_modules/draft-js/lib/setDraftEditorSelection.js"(exports, module) {
    "use strict";
    var DraftEffects = require_DraftEffects();
    var DraftJsDebugLogging = require_DraftJsDebugLogging();
    var UserAgent = require_UserAgent();
    var containsNode = require_containsNode();
    var getActiveElement = require_getActiveElement();
    var getCorrectDocumentFromNode = require_getCorrectDocumentFromNode();
    var invariant = require_invariant();
    var isElement = require_isElement();
    var isIE = UserAgent.isBrowser("IE");
    function getAnonymizedDOM(node, getNodeLabels) {
      if (!node) {
        return "[empty]";
      }
      var anonymized = anonymizeTextWithin(node, getNodeLabels);
      if (anonymized.nodeType === Node.TEXT_NODE) {
        return anonymized.textContent;
      }
      !isElement(anonymized) ? true ? invariant(false, "Node must be an Element if it is not a text node.") : invariant(false) : void 0;
      var castedElement = anonymized;
      return castedElement.outerHTML;
    }
    function anonymizeTextWithin(node, getNodeLabels) {
      var labels = getNodeLabels !== void 0 ? getNodeLabels(node) : [];
      if (node.nodeType === Node.TEXT_NODE) {
        var length = node.textContent.length;
        return getCorrectDocumentFromNode(node).createTextNode("[text " + length + (labels.length ? " | " + labels.join(", ") : "") + "]");
      }
      var clone = node.cloneNode();
      if (clone.nodeType === 1 && labels.length) {
        clone.setAttribute("data-labels", labels.join(", "));
      }
      var childNodes = node.childNodes;
      for (var ii = 0; ii < childNodes.length; ii++) {
        clone.appendChild(anonymizeTextWithin(childNodes[ii], getNodeLabels));
      }
      return clone;
    }
    function getAnonymizedEditorDOM(node, getNodeLabels) {
      var currentNode = node;
      var castedNode = currentNode;
      while (currentNode) {
        if (isElement(currentNode) && castedNode.hasAttribute("contenteditable")) {
          return getAnonymizedDOM(currentNode, getNodeLabels);
        } else {
          currentNode = currentNode.parentNode;
          castedNode = currentNode;
        }
      }
      return "Could not find contentEditable parent of node";
    }
    function getNodeLength(node) {
      return node.nodeValue === null ? node.childNodes.length : node.nodeValue.length;
    }
    function setDraftEditorSelection(selectionState, node, blockKey, nodeStart, nodeEnd) {
      var documentObject = getCorrectDocumentFromNode(node);
      if (!containsNode(documentObject.documentElement, node)) {
        return;
      }
      var selection = documentObject.defaultView.getSelection();
      var anchorKey = selectionState.getAnchorKey();
      var anchorOffset = selectionState.getAnchorOffset();
      var focusKey = selectionState.getFocusKey();
      var focusOffset = selectionState.getFocusOffset();
      var isBackward = selectionState.getIsBackward();
      if (!selection.extend && isBackward) {
        var tempKey = anchorKey;
        var tempOffset = anchorOffset;
        anchorKey = focusKey;
        anchorOffset = focusOffset;
        focusKey = tempKey;
        focusOffset = tempOffset;
        isBackward = false;
      }
      var hasAnchor = anchorKey === blockKey && nodeStart <= anchorOffset && nodeEnd >= anchorOffset;
      var hasFocus = focusKey === blockKey && nodeStart <= focusOffset && nodeEnd >= focusOffset;
      if (hasAnchor && hasFocus) {
        selection.removeAllRanges();
        addPointToSelection(selection, node, anchorOffset - nodeStart, selectionState);
        addFocusToSelection(selection, node, focusOffset - nodeStart, selectionState);
        return;
      }
      if (!isBackward) {
        if (hasAnchor) {
          selection.removeAllRanges();
          addPointToSelection(selection, node, anchorOffset - nodeStart, selectionState);
        }
        if (hasFocus) {
          addFocusToSelection(selection, node, focusOffset - nodeStart, selectionState);
        }
      } else {
        if (hasFocus) {
          selection.removeAllRanges();
          addPointToSelection(selection, node, focusOffset - nodeStart, selectionState);
        }
        if (hasAnchor) {
          var storedFocusNode = selection.focusNode;
          var storedFocusOffset = selection.focusOffset;
          selection.removeAllRanges();
          addPointToSelection(selection, node, anchorOffset - nodeStart, selectionState);
          addFocusToSelection(selection, storedFocusNode, storedFocusOffset, selectionState);
        }
      }
    }
    function addFocusToSelection(selection, node, offset, selectionState) {
      var activeElement = getActiveElement();
      var extend = selection.extend;
      if (extend && node != null && containsNode(activeElement, node)) {
        if (offset > getNodeLength(node)) {
          DraftJsDebugLogging.logSelectionStateFailure({
            anonymizedDom: getAnonymizedEditorDOM(node),
            extraParams: JSON.stringify({
              offset
            }),
            selectionState: JSON.stringify(selectionState.toJS())
          });
        }
        var nodeWasFocus = node === selection.focusNode;
        try {
          if (selection.rangeCount > 0 && selection.extend) {
            selection.extend(node, offset);
          }
        } catch (e) {
          DraftJsDebugLogging.logSelectionStateFailure({
            anonymizedDom: getAnonymizedEditorDOM(node, function(n) {
              var labels = [];
              if (n === activeElement) {
                labels.push("active element");
              }
              if (n === selection.anchorNode) {
                labels.push("selection anchor node");
              }
              if (n === selection.focusNode) {
                labels.push("selection focus node");
              }
              return labels;
            }),
            extraParams: JSON.stringify({
              activeElementName: activeElement ? activeElement.nodeName : null,
              nodeIsFocus: node === selection.focusNode,
              nodeWasFocus,
              selectionRangeCount: selection.rangeCount,
              selectionAnchorNodeName: selection.anchorNode ? selection.anchorNode.nodeName : null,
              selectionAnchorOffset: selection.anchorOffset,
              selectionFocusNodeName: selection.focusNode ? selection.focusNode.nodeName : null,
              selectionFocusOffset: selection.focusOffset,
              message: e ? "" + e : null,
              offset
            }, null, 2),
            selectionState: JSON.stringify(selectionState.toJS(), null, 2)
          });
          throw e;
        }
      } else {
        if (node && selection.rangeCount > 0) {
          var range = selection.getRangeAt(0);
          range.setEnd(node, offset);
          selection.addRange(range.cloneRange());
        }
      }
    }
    function addPointToSelection(selection, node, offset, selectionState) {
      var range = getCorrectDocumentFromNode(node).createRange();
      if (offset > getNodeLength(node)) {
        DraftJsDebugLogging.logSelectionStateFailure({
          anonymizedDom: getAnonymizedEditorDOM(node),
          extraParams: JSON.stringify({
            offset
          }),
          selectionState: JSON.stringify(selectionState.toJS())
        });
        DraftEffects.handleExtensionCausedError();
      }
      range.setStart(node, offset);
      if (isIE) {
        try {
          selection.addRange(range);
        } catch (e) {
          if (true) {
            console.warn("Call to selection.addRange() threw exception: ", e);
          }
        }
      } else {
        selection.addRange(range);
      }
    }
    module.exports = {
      setDraftEditorSelection,
      addFocusToSelection
    };
  }
});

// node_modules/draft-js/lib/DraftEditorLeaf.react.js
var require_DraftEditorLeaf_react = __commonJS({
  "node_modules/draft-js/lib/DraftEditorLeaf.react.js"(exports, module) {
    "use strict";
    var _assign = require_object_assign();
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var DraftEditorTextNode = require_DraftEditorTextNode_react();
    var React = require_react();
    var invariant = require_invariant();
    var isHTMLBRElement = require_isHTMLBRElement();
    var setDraftEditorSelection = require_setDraftEditorSelection().setDraftEditorSelection;
    var DraftEditorLeaf = function(_React$Component) {
      _inheritsLoose(DraftEditorLeaf2, _React$Component);
      function DraftEditorLeaf2() {
        var _this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
        _defineProperty(_assertThisInitialized(_this), "leaf", void 0);
        return _this;
      }
      var _proto = DraftEditorLeaf2.prototype;
      _proto._setSelection = function _setSelection() {
        var selection = this.props.selection;
        if (selection == null || !selection.getHasFocus()) {
          return;
        }
        var _this$props = this.props, block = _this$props.block, start = _this$props.start, text = _this$props.text;
        var blockKey = block.getKey();
        var end = start + text.length;
        if (!selection.hasEdgeWithin(blockKey, start, end)) {
          return;
        }
        var node = this.leaf;
        !node ? true ? invariant(false, "Missing node") : invariant(false) : void 0;
        var child = node.firstChild;
        !child ? true ? invariant(false, "Missing child") : invariant(false) : void 0;
        var targetNode;
        if (child.nodeType === Node.TEXT_NODE) {
          targetNode = child;
        } else if (isHTMLBRElement(child)) {
          targetNode = node;
        } else {
          targetNode = child.firstChild;
          !targetNode ? true ? invariant(false, "Missing targetNode") : invariant(false) : void 0;
        }
        setDraftEditorSelection(selection, targetNode, blockKey, start, end);
      };
      _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        var leafNode = this.leaf;
        !leafNode ? true ? invariant(false, "Missing leafNode") : invariant(false) : void 0;
        var shouldUpdate = leafNode.textContent !== nextProps.text || nextProps.styleSet !== this.props.styleSet || nextProps.forceSelection;
        return shouldUpdate;
      };
      _proto.componentDidUpdate = function componentDidUpdate() {
        this._setSelection();
      };
      _proto.componentDidMount = function componentDidMount() {
        this._setSelection();
      };
      _proto.render = function render() {
        var _this2 = this;
        var block = this.props.block;
        var text = this.props.text;
        if (text.endsWith("\n") && this.props.isLast) {
          text += "\n";
        }
        var _this$props2 = this.props, customStyleMap = _this$props2.customStyleMap, customStyleFn = _this$props2.customStyleFn, offsetKey = _this$props2.offsetKey, styleSet = _this$props2.styleSet;
        var styleObj = styleSet.reduce(function(map, styleName) {
          var mergedStyles = {};
          var style = customStyleMap[styleName];
          if (style !== void 0 && map.textDecoration !== style.textDecoration) {
            mergedStyles.textDecoration = [map.textDecoration, style.textDecoration].join(" ").trim();
          }
          return _assign(map, style, mergedStyles);
        }, {});
        if (customStyleFn) {
          var newStyles = customStyleFn(styleSet, block);
          styleObj = _assign(styleObj, newStyles);
        }
        return React.createElement("span", {
          "data-offset-key": offsetKey,
          ref: function ref(_ref) {
            return _this2.leaf = _ref;
          },
          style: styleObj
        }, React.createElement(DraftEditorTextNode, null, text));
      };
      return DraftEditorLeaf2;
    }(React.Component);
    module.exports = DraftEditorLeaf;
  }
});

// node_modules/draft-js/lib/DraftEditorNode.react.js
var require_DraftEditorNode_react = __commonJS({
  "node_modules/draft-js/lib/DraftEditorNode.react.js"(exports, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var DraftEditorDecoratedLeaves = require_DraftEditorDecoratedLeaves_react();
    var DraftEditorLeaf = require_DraftEditorLeaf_react();
    var DraftOffsetKey = require_DraftOffsetKey();
    var Immutable = require_immutable();
    var React = require_react();
    var cx = require_cx();
    var List = Immutable.List;
    var DraftEditorNode = function(_React$Component) {
      _inheritsLoose(DraftEditorNode2, _React$Component);
      function DraftEditorNode2() {
        return _React$Component.apply(this, arguments) || this;
      }
      var _proto = DraftEditorNode2.prototype;
      _proto.render = function render() {
        var _this$props = this.props, block = _this$props.block, contentState = _this$props.contentState, customStyleFn = _this$props.customStyleFn, customStyleMap = _this$props.customStyleMap, decorator = _this$props.decorator, direction = _this$props.direction, forceSelection = _this$props.forceSelection, hasSelection = _this$props.hasSelection, selection = _this$props.selection, tree = _this$props.tree;
        var blockKey = block.getKey();
        var text = block.getText();
        var lastLeafSet = tree.size - 1;
        var children = this.props.children || tree.map(function(leafSet, ii) {
          var decoratorKey = leafSet.get("decoratorKey");
          var leavesForLeafSet = leafSet.get("leaves");
          var lastLeaf = leavesForLeafSet.size - 1;
          var Leaves = leavesForLeafSet.map(function(leaf, jj) {
            var offsetKey = DraftOffsetKey.encode(blockKey, ii, jj);
            var start = leaf.get("start");
            var end = leaf.get("end");
            return React.createElement(DraftEditorLeaf, {
              key: offsetKey,
              offsetKey,
              block,
              start,
              selection: hasSelection ? selection : null,
              forceSelection,
              text: text.slice(start, end),
              styleSet: block.getInlineStyleAt(start),
              customStyleMap,
              customStyleFn,
              isLast: decoratorKey === lastLeafSet && jj === lastLeaf
            });
          }).toArray();
          if (!decoratorKey || !decorator) {
            return Leaves;
          }
          return React.createElement(DraftEditorDecoratedLeaves, {
            block,
            children: Leaves,
            contentState,
            decorator,
            decoratorKey,
            direction,
            leafSet,
            text,
            key: ii
          });
        }).toArray();
        return React.createElement("div", {
          "data-offset-key": DraftOffsetKey.encode(blockKey, 0, 0),
          className: cx({
            "public/DraftStyleDefault/block": true,
            "public/DraftStyleDefault/ltr": direction === "LTR",
            "public/DraftStyleDefault/rtl": direction === "RTL"
          })
        }, children);
      };
      return DraftEditorNode2;
    }(React.Component);
    module.exports = DraftEditorNode;
  }
});

// node_modules/fbjs/lib/Scroll.js
var require_Scroll = __commonJS({
  "node_modules/fbjs/lib/Scroll.js"(exports, module) {
    "use strict";
    function _isViewportScrollElement(element, doc) {
      return !!doc && (element === doc.documentElement || element === doc.body);
    }
    var Scroll = {
      /**
       * @param {DOMElement} element
       * @return {number}
       */
      getTop: function getTop(element) {
        var doc = element.ownerDocument;
        return _isViewportScrollElement(element, doc) ? (
          // In practice, they will either both have the same value,
          // or one will be zero and the other will be the scroll position
          // of the viewport. So we can use `X || Y` instead of `Math.max(X, Y)`
          doc.body.scrollTop || doc.documentElement.scrollTop
        ) : element.scrollTop;
      },
      /**
       * @param {DOMElement} element
       * @param {number} newTop
       */
      setTop: function setTop(element, newTop) {
        var doc = element.ownerDocument;
        if (_isViewportScrollElement(element, doc)) {
          doc.body.scrollTop = doc.documentElement.scrollTop = newTop;
        } else {
          element.scrollTop = newTop;
        }
      },
      /**
       * @param {DOMElement} element
       * @return {number}
       */
      getLeft: function getLeft(element) {
        var doc = element.ownerDocument;
        return _isViewportScrollElement(element, doc) ? doc.body.scrollLeft || doc.documentElement.scrollLeft : element.scrollLeft;
      },
      /**
       * @param {DOMElement} element
       * @param {number} newLeft
       */
      setLeft: function setLeft(element, newLeft) {
        var doc = element.ownerDocument;
        if (_isViewportScrollElement(element, doc)) {
          doc.body.scrollLeft = doc.documentElement.scrollLeft = newLeft;
        } else {
          element.scrollLeft = newLeft;
        }
      }
    };
    module.exports = Scroll;
  }
});

// node_modules/fbjs/lib/camelize.js
var require_camelize = __commonJS({
  "node_modules/fbjs/lib/camelize.js"(exports, module) {
    "use strict";
    var _hyphenPattern = /-(.)/g;
    function camelize(string) {
      return string.replace(_hyphenPattern, function(_, character) {
        return character.toUpperCase();
      });
    }
    module.exports = camelize;
  }
});

// node_modules/fbjs/lib/hyphenate.js
var require_hyphenate = __commonJS({
  "node_modules/fbjs/lib/hyphenate.js"(exports, module) {
    "use strict";
    var _uppercasePattern = /([A-Z])/g;
    function hyphenate(string) {
      return string.replace(_uppercasePattern, "-$1").toLowerCase();
    }
    module.exports = hyphenate;
  }
});

// node_modules/fbjs/lib/getStyleProperty.js
var require_getStyleProperty = __commonJS({
  "node_modules/fbjs/lib/getStyleProperty.js"(exports, module) {
    "use strict";
    var camelize = require_camelize();
    var hyphenate = require_hyphenate();
    function asString(value) {
      return value == null ? value : String(value);
    }
    function getStyleProperty(node, name) {
      var computedStyle;
      if (window.getComputedStyle) {
        computedStyle = window.getComputedStyle(node, null);
        if (computedStyle) {
          return asString(computedStyle.getPropertyValue(hyphenate(name)));
        }
      }
      if (document.defaultView && document.defaultView.getComputedStyle) {
        computedStyle = document.defaultView.getComputedStyle(node, null);
        if (computedStyle) {
          return asString(computedStyle.getPropertyValue(hyphenate(name)));
        }
        if (name === "display") {
          return "none";
        }
      }
      if (node.currentStyle) {
        if (name === "float") {
          return asString(node.currentStyle.cssFloat || node.currentStyle.styleFloat);
        }
        return asString(node.currentStyle[camelize(name)]);
      }
      return asString(node.style && node.style[camelize(name)]);
    }
    module.exports = getStyleProperty;
  }
});

// node_modules/fbjs/lib/Style.js
var require_Style = __commonJS({
  "node_modules/fbjs/lib/Style.js"(exports, module) {
    "use strict";
    var getStyleProperty = require_getStyleProperty();
    function _isNodeScrollable(element, name) {
      var overflow = Style.get(element, name);
      return overflow === "auto" || overflow === "scroll";
    }
    var Style = {
      /**
       * Gets the style property for the supplied node. This will return either the
       * computed style, if available, or the declared style.
       *
       * @param {DOMNode} node
       * @param {string} name Style property name.
       * @return {?string} Style property value.
       */
      get: getStyleProperty,
      /**
       * Determines the nearest ancestor of a node that is scrollable.
       *
       * NOTE: This can be expensive if used repeatedly or on a node nested deeply.
       *
       * @param {?DOMNode} node Node from which to start searching.
       * @return {?DOMWindow|DOMElement} Scroll parent of the supplied node.
       */
      getScrollParent: function getScrollParent(node) {
        if (!node) {
          return null;
        }
        var ownerDocument = node.ownerDocument;
        while (node && node !== ownerDocument.body) {
          if (_isNodeScrollable(node, "overflow") || _isNodeScrollable(node, "overflowY") || _isNodeScrollable(node, "overflowX")) {
            return node;
          }
          node = node.parentNode;
        }
        return ownerDocument.defaultView || ownerDocument.parentWindow;
      }
    };
    module.exports = Style;
  }
});

// node_modules/fbjs/lib/getElementRect.js
var require_getElementRect = __commonJS({
  "node_modules/fbjs/lib/getElementRect.js"(exports, module) {
    "use strict";
    var containsNode = require_containsNode();
    function getElementRect(elem) {
      var docElem = elem.ownerDocument.documentElement;
      if (!("getBoundingClientRect" in elem) || !containsNode(docElem, elem)) {
        return {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        };
      }
      var rect = elem.getBoundingClientRect();
      return {
        left: Math.round(rect.left) - docElem.clientLeft,
        right: Math.round(rect.right) - docElem.clientLeft,
        top: Math.round(rect.top) - docElem.clientTop,
        bottom: Math.round(rect.bottom) - docElem.clientTop
      };
    }
    module.exports = getElementRect;
  }
});

// node_modules/fbjs/lib/getElementPosition.js
var require_getElementPosition = __commonJS({
  "node_modules/fbjs/lib/getElementPosition.js"(exports, module) {
    "use strict";
    var getElementRect = require_getElementRect();
    function getElementPosition(element) {
      var rect = getElementRect(element);
      return {
        x: rect.left,
        y: rect.top,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
      };
    }
    module.exports = getElementPosition;
  }
});

// node_modules/fbjs/lib/getDocumentScrollElement.js
var require_getDocumentScrollElement = __commonJS({
  "node_modules/fbjs/lib/getDocumentScrollElement.js"(exports, module) {
    "use strict";
    var isWebkit = typeof navigator !== "undefined" && navigator.userAgent.indexOf("AppleWebKit") > -1;
    function getDocumentScrollElement(doc) {
      doc = doc || document;
      if (doc.scrollingElement) {
        return doc.scrollingElement;
      }
      return !isWebkit && doc.compatMode === "CSS1Compat" ? doc.documentElement : doc.body;
    }
    module.exports = getDocumentScrollElement;
  }
});

// node_modules/fbjs/lib/getUnboundedScrollPosition.js
var require_getUnboundedScrollPosition = __commonJS({
  "node_modules/fbjs/lib/getUnboundedScrollPosition.js"(exports, module) {
    "use strict";
    function getUnboundedScrollPosition(scrollable) {
      if (scrollable.Window && scrollable instanceof scrollable.Window) {
        return {
          x: scrollable.pageXOffset || scrollable.document.documentElement.scrollLeft,
          y: scrollable.pageYOffset || scrollable.document.documentElement.scrollTop
        };
      }
      return {
        x: scrollable.scrollLeft,
        y: scrollable.scrollTop
      };
    }
    module.exports = getUnboundedScrollPosition;
  }
});

// node_modules/fbjs/lib/getScrollPosition.js
var require_getScrollPosition = __commonJS({
  "node_modules/fbjs/lib/getScrollPosition.js"(exports, module) {
    "use strict";
    var getDocumentScrollElement = require_getDocumentScrollElement();
    var getUnboundedScrollPosition = require_getUnboundedScrollPosition();
    function getScrollPosition(scrollable) {
      var documentScrollElement = getDocumentScrollElement(scrollable.ownerDocument || scrollable.document);
      if (scrollable.Window && scrollable instanceof scrollable.Window) {
        scrollable = documentScrollElement;
      }
      var scrollPosition = getUnboundedScrollPosition(scrollable);
      var viewport = scrollable === documentScrollElement ? scrollable.ownerDocument.documentElement : scrollable;
      var xMax = scrollable.scrollWidth - viewport.clientWidth;
      var yMax = scrollable.scrollHeight - viewport.clientHeight;
      scrollPosition.x = Math.max(0, Math.min(scrollPosition.x, xMax));
      scrollPosition.y = Math.max(0, Math.min(scrollPosition.y, yMax));
      return scrollPosition;
    }
    module.exports = getScrollPosition;
  }
});

// node_modules/fbjs/lib/getViewportDimensions.js
var require_getViewportDimensions = __commonJS({
  "node_modules/fbjs/lib/getViewportDimensions.js"(exports, module) {
    "use strict";
    function getViewportWidth() {
      var width;
      if (document.documentElement) {
        width = document.documentElement.clientWidth;
      }
      if (!width && document.body) {
        width = document.body.clientWidth;
      }
      return width || 0;
    }
    function getViewportHeight() {
      var height;
      if (document.documentElement) {
        height = document.documentElement.clientHeight;
      }
      if (!height && document.body) {
        height = document.body.clientHeight;
      }
      return height || 0;
    }
    function getViewportDimensions() {
      return {
        width: window.innerWidth || getViewportWidth(),
        height: window.innerHeight || getViewportHeight()
      };
    }
    getViewportDimensions.withoutScrollbars = function() {
      return {
        width: getViewportWidth(),
        height: getViewportHeight()
      };
    };
    module.exports = getViewportDimensions;
  }
});

// node_modules/draft-js/lib/DraftEditorBlockNode.react.js
var require_DraftEditorBlockNode_react = __commonJS({
  "node_modules/draft-js/lib/DraftEditorBlockNode.react.js"(exports, module) {
    "use strict";
    var _assign = require_object_assign();
    function _extends() {
      _extends = _assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var DraftEditorNode = require_DraftEditorNode_react();
    var DraftOffsetKey = require_DraftOffsetKey();
    var React = require_react();
    var Scroll = require_Scroll();
    var Style = require_Style();
    var getElementPosition = require_getElementPosition();
    var getScrollPosition = require_getScrollPosition();
    var getViewportDimensions = require_getViewportDimensions();
    var Immutable = require_immutable();
    var invariant = require_invariant();
    var isHTMLElement = require_isHTMLElement();
    var SCROLL_BUFFER = 10;
    var List = Immutable.List;
    var isBlockOnSelectionEdge = function isBlockOnSelectionEdge2(selection, key) {
      return selection.getAnchorKey() === key || selection.getFocusKey() === key;
    };
    var shouldNotAddWrapperElement = function shouldNotAddWrapperElement2(block, contentState) {
      var nextSiblingKey = block.getNextSiblingKey();
      return nextSiblingKey ? contentState.getBlockForKey(nextSiblingKey).getType() === block.getType() : false;
    };
    var applyWrapperElementToSiblings = function applyWrapperElementToSiblings2(wrapperTemplate, Element, nodes) {
      var wrappedSiblings = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = void 0;
      try {
        for (var _iterator = nodes.reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var sibling = _step.value;
          if (sibling.type !== Element) {
            break;
          }
          wrappedSiblings.push(sibling);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      nodes.splice(nodes.indexOf(wrappedSiblings[0]), wrappedSiblings.length + 1);
      var childrenIs = wrappedSiblings.reverse();
      var key = childrenIs[0].key;
      nodes.push(React.cloneElement(wrapperTemplate, {
        key: "".concat(key, "-wrap"),
        "data-offset-key": DraftOffsetKey.encode(key, 0, 0)
      }, childrenIs));
      return nodes;
    };
    var getDraftRenderConfig = function getDraftRenderConfig2(block, blockRenderMap) {
      var configForType = blockRenderMap.get(block.getType()) || blockRenderMap.get("unstyled");
      var wrapperTemplate = configForType.wrapper;
      var Element = configForType.element || blockRenderMap.get("unstyled").element;
      return {
        Element,
        wrapperTemplate
      };
    };
    var getCustomRenderConfig = function getCustomRenderConfig2(block, blockRendererFn) {
      var customRenderer = blockRendererFn(block);
      if (!customRenderer) {
        return {};
      }
      var CustomComponent = customRenderer.component, customProps = customRenderer.props, customEditable = customRenderer.editable;
      return {
        CustomComponent,
        customProps,
        customEditable
      };
    };
    var getElementPropsConfig = function getElementPropsConfig2(block, editorKey, offsetKey, blockStyleFn, customConfig, ref) {
      var elementProps = {
        "data-block": true,
        "data-editor": editorKey,
        "data-offset-key": offsetKey,
        key: block.getKey(),
        ref
      };
      var customClass = blockStyleFn(block);
      if (customClass) {
        elementProps.className = customClass;
      }
      if (customConfig.customEditable !== void 0) {
        elementProps = _objectSpread({}, elementProps, {
          contentEditable: customConfig.customEditable,
          suppressContentEditableWarning: true
        });
      }
      return elementProps;
    };
    var DraftEditorBlockNode = function(_React$Component) {
      _inheritsLoose(DraftEditorBlockNode2, _React$Component);
      function DraftEditorBlockNode2() {
        var _this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
        _defineProperty(_assertThisInitialized(_this), "wrapperRef", React.createRef());
        return _this;
      }
      var _proto = DraftEditorBlockNode2.prototype;
      _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        var _this$props = this.props, block = _this$props.block, direction = _this$props.direction, tree = _this$props.tree;
        var isContainerNode = !block.getChildKeys().isEmpty();
        var blockHasChanged = block !== nextProps.block || tree !== nextProps.tree || direction !== nextProps.direction || isBlockOnSelectionEdge(nextProps.selection, nextProps.block.getKey()) && nextProps.forceSelection;
        return isContainerNode || blockHasChanged;
      };
      _proto.componentDidMount = function componentDidMount() {
        var selection = this.props.selection;
        var endKey = selection.getEndKey();
        if (!selection.getHasFocus() || endKey !== this.props.block.getKey()) {
          return;
        }
        var blockNode = this.wrapperRef.current;
        if (!blockNode) {
          return;
        }
        var scrollParent = Style.getScrollParent(blockNode);
        var scrollPosition = getScrollPosition(scrollParent);
        var scrollDelta;
        if (scrollParent === window) {
          var nodePosition = getElementPosition(blockNode);
          var nodeBottom = nodePosition.y + nodePosition.height;
          var viewportHeight = getViewportDimensions().height;
          scrollDelta = nodeBottom - viewportHeight;
          if (scrollDelta > 0) {
            window.scrollTo(scrollPosition.x, scrollPosition.y + scrollDelta + SCROLL_BUFFER);
          }
        } else {
          !isHTMLElement(blockNode) ? true ? invariant(false, "blockNode is not an HTMLElement") : invariant(false) : void 0;
          var htmlBlockNode = blockNode;
          var blockBottom = htmlBlockNode.offsetHeight + htmlBlockNode.offsetTop;
          var scrollBottom = scrollParent.offsetHeight + scrollPosition.y;
          scrollDelta = blockBottom - scrollBottom;
          if (scrollDelta > 0) {
            Scroll.setTop(scrollParent, Scroll.getTop(scrollParent) + scrollDelta + SCROLL_BUFFER);
          }
        }
      };
      _proto.render = function render() {
        var _this2 = this;
        var _this$props2 = this.props, block = _this$props2.block, blockRenderMap = _this$props2.blockRenderMap, blockRendererFn = _this$props2.blockRendererFn, blockStyleFn = _this$props2.blockStyleFn, contentState = _this$props2.contentState, decorator = _this$props2.decorator, editorKey = _this$props2.editorKey, editorState = _this$props2.editorState, customStyleFn = _this$props2.customStyleFn, customStyleMap = _this$props2.customStyleMap, direction = _this$props2.direction, forceSelection = _this$props2.forceSelection, selection = _this$props2.selection, tree = _this$props2.tree;
        var children = null;
        if (block.children.size) {
          children = block.children.reduce(function(acc, key) {
            var offsetKey2 = DraftOffsetKey.encode(key, 0, 0);
            var child = contentState.getBlockForKey(key);
            var customConfig2 = getCustomRenderConfig(child, blockRendererFn);
            var Component2 = customConfig2.CustomComponent || DraftEditorBlockNode2;
            var _getDraftRenderConfig = getDraftRenderConfig(child, blockRenderMap), Element2 = _getDraftRenderConfig.Element, wrapperTemplate = _getDraftRenderConfig.wrapperTemplate;
            var elementProps2 = getElementPropsConfig(child, editorKey, offsetKey2, blockStyleFn, customConfig2, null);
            var childProps = _objectSpread({}, _this2.props, {
              tree: editorState.getBlockTree(key),
              blockProps: customConfig2.customProps,
              offsetKey: offsetKey2,
              block: child
            });
            acc.push(React.createElement(Element2, elementProps2, React.createElement(Component2, childProps)));
            if (!wrapperTemplate || shouldNotAddWrapperElement(child, contentState)) {
              return acc;
            }
            applyWrapperElementToSiblings(wrapperTemplate, Element2, acc);
            return acc;
          }, []);
        }
        var blockKey = block.getKey();
        var offsetKey = DraftOffsetKey.encode(blockKey, 0, 0);
        var customConfig = getCustomRenderConfig(block, blockRendererFn);
        var Component = customConfig.CustomComponent;
        var blockNode = Component != null ? React.createElement(Component, _extends({}, this.props, {
          tree: editorState.getBlockTree(blockKey),
          blockProps: customConfig.customProps,
          offsetKey,
          block
        })) : React.createElement(DraftEditorNode, {
          block,
          children,
          contentState,
          customStyleFn,
          customStyleMap,
          decorator,
          direction,
          forceSelection,
          hasSelection: isBlockOnSelectionEdge(selection, blockKey),
          selection,
          tree
        });
        if (block.getParentKey()) {
          return blockNode;
        }
        var _getDraftRenderConfig2 = getDraftRenderConfig(block, blockRenderMap), Element = _getDraftRenderConfig2.Element;
        var elementProps = getElementPropsConfig(block, editorKey, offsetKey, blockStyleFn, customConfig, this.wrapperRef);
        return React.createElement(Element, elementProps, blockNode);
      };
      return DraftEditorBlockNode2;
    }(React.Component);
    module.exports = DraftEditorBlockNode;
  }
});

// node_modules/draft-js/lib/DraftEditorContentsExperimental.react.js
var require_DraftEditorContentsExperimental_react = __commonJS({
  "node_modules/draft-js/lib/DraftEditorContentsExperimental.react.js"(exports, module) {
    "use strict";
    var _assign = require_object_assign();
    function _extends() {
      _extends = _assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var DraftEditorBlockNode = require_DraftEditorBlockNode_react();
    var DraftOffsetKey = require_DraftOffsetKey();
    var React = require_react();
    var nullthrows = require_nullthrows();
    var DraftEditorContentsExperimental = function(_React$Component) {
      _inheritsLoose(DraftEditorContentsExperimental2, _React$Component);
      function DraftEditorContentsExperimental2() {
        return _React$Component.apply(this, arguments) || this;
      }
      var _proto = DraftEditorContentsExperimental2.prototype;
      _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        var prevEditorState = this.props.editorState;
        var nextEditorState = nextProps.editorState;
        var prevDirectionMap = prevEditorState.getDirectionMap();
        var nextDirectionMap = nextEditorState.getDirectionMap();
        if (prevDirectionMap !== nextDirectionMap) {
          return true;
        }
        var didHaveFocus = prevEditorState.getSelection().getHasFocus();
        var nowHasFocus = nextEditorState.getSelection().getHasFocus();
        if (didHaveFocus !== nowHasFocus) {
          return true;
        }
        var nextNativeContent = nextEditorState.getNativelyRenderedContent();
        var wasComposing = prevEditorState.isInCompositionMode();
        var nowComposing = nextEditorState.isInCompositionMode();
        if (prevEditorState === nextEditorState || nextNativeContent !== null && nextEditorState.getCurrentContent() === nextNativeContent || wasComposing && nowComposing) {
          return false;
        }
        var prevContent = prevEditorState.getCurrentContent();
        var nextContent = nextEditorState.getCurrentContent();
        var prevDecorator = prevEditorState.getDecorator();
        var nextDecorator = nextEditorState.getDecorator();
        return wasComposing !== nowComposing || prevContent !== nextContent || prevDecorator !== nextDecorator || nextEditorState.mustForceSelection();
      };
      _proto.render = function render() {
        var _this$props = this.props, blockRenderMap = _this$props.blockRenderMap, blockRendererFn = _this$props.blockRendererFn, blockStyleFn = _this$props.blockStyleFn, customStyleMap = _this$props.customStyleMap, customStyleFn = _this$props.customStyleFn, editorState = _this$props.editorState, editorKey = _this$props.editorKey, textDirectionality = _this$props.textDirectionality;
        var content = editorState.getCurrentContent();
        var selection = editorState.getSelection();
        var forceSelection = editorState.mustForceSelection();
        var decorator = editorState.getDecorator();
        var directionMap = nullthrows(editorState.getDirectionMap());
        var blocksAsArray = content.getBlocksAsArray();
        var rootBlock = blocksAsArray[0];
        var processedBlocks = [];
        var nodeBlock = rootBlock;
        while (nodeBlock) {
          var blockKey = nodeBlock.getKey();
          var blockProps = {
            blockRenderMap,
            blockRendererFn,
            blockStyleFn,
            contentState: content,
            customStyleFn,
            customStyleMap,
            decorator,
            editorKey,
            editorState,
            forceSelection,
            selection,
            block: nodeBlock,
            direction: textDirectionality ? textDirectionality : directionMap.get(blockKey),
            tree: editorState.getBlockTree(blockKey)
          };
          var configForType = blockRenderMap.get(nodeBlock.getType()) || blockRenderMap.get("unstyled");
          var wrapperTemplate = configForType.wrapper;
          processedBlocks.push({
            /* $FlowFixMe[incompatible-type] (>=0.112.0 site=www,mobile) This
             * comment suppresses an error found when Flow v0.112 was deployed. To
             * see the error delete this comment and run Flow. */
            block: React.createElement(DraftEditorBlockNode, _extends({
              key: blockKey
            }, blockProps)),
            wrapperTemplate,
            key: blockKey,
            offsetKey: DraftOffsetKey.encode(blockKey, 0, 0)
          });
          var nextBlockKey = nodeBlock.getNextSiblingKey();
          nodeBlock = nextBlockKey ? content.getBlockForKey(nextBlockKey) : null;
        }
        var outputBlocks = [];
        for (var ii = 0; ii < processedBlocks.length; ) {
          var info = processedBlocks[ii];
          if (info.wrapperTemplate) {
            var blocks = [];
            do {
              blocks.push(processedBlocks[ii].block);
              ii++;
            } while (ii < processedBlocks.length && processedBlocks[ii].wrapperTemplate === info.wrapperTemplate);
            var wrapperElement = React.cloneElement(info.wrapperTemplate, {
              key: info.key + "-wrap",
              "data-offset-key": info.offsetKey
            }, blocks);
            outputBlocks.push(wrapperElement);
          } else {
            outputBlocks.push(info.block);
            ii++;
          }
        }
        return React.createElement("div", {
          "data-contents": "true"
        }, outputBlocks);
      };
      return DraftEditorContentsExperimental2;
    }(React.Component);
    module.exports = DraftEditorContentsExperimental;
  }
});

// node_modules/draft-js/lib/DraftEditorBlock.react.js
var require_DraftEditorBlock_react = __commonJS({
  "node_modules/draft-js/lib/DraftEditorBlock.react.js"(exports, module) {
    "use strict";
    var _assign = require_object_assign();
    function _extends() {
      _extends = _assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var DraftEditorLeaf = require_DraftEditorLeaf_react();
    var DraftOffsetKey = require_DraftOffsetKey();
    var React = require_react();
    var Scroll = require_Scroll();
    var Style = require_Style();
    var UnicodeBidi = require_UnicodeBidi();
    var UnicodeBidiDirection = require_UnicodeBidiDirection();
    var cx = require_cx();
    var getElementPosition = require_getElementPosition();
    var getScrollPosition = require_getScrollPosition();
    var getViewportDimensions = require_getViewportDimensions();
    var invariant = require_invariant();
    var isHTMLElement = require_isHTMLElement();
    var nullthrows = require_nullthrows();
    var SCROLL_BUFFER = 10;
    var isBlockOnSelectionEdge = function isBlockOnSelectionEdge2(selection, key) {
      return selection.getAnchorKey() === key || selection.getFocusKey() === key;
    };
    var DraftEditorBlock = function(_React$Component) {
      _inheritsLoose(DraftEditorBlock2, _React$Component);
      function DraftEditorBlock2() {
        var _this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
        _defineProperty(_assertThisInitialized(_this), "_node", void 0);
        return _this;
      }
      var _proto = DraftEditorBlock2.prototype;
      _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return this.props.block !== nextProps.block || this.props.tree !== nextProps.tree || this.props.direction !== nextProps.direction || isBlockOnSelectionEdge(nextProps.selection, nextProps.block.getKey()) && nextProps.forceSelection;
      };
      _proto.componentDidMount = function componentDidMount() {
        if (this.props.preventScroll) {
          return;
        }
        var selection = this.props.selection;
        var endKey = selection.getEndKey();
        if (!selection.getHasFocus() || endKey !== this.props.block.getKey()) {
          return;
        }
        var blockNode = this._node;
        if (blockNode == null) {
          return;
        }
        var scrollParent = Style.getScrollParent(blockNode);
        var scrollPosition = getScrollPosition(scrollParent);
        var scrollDelta;
        if (scrollParent === window) {
          var nodePosition = getElementPosition(blockNode);
          var nodeBottom = nodePosition.y + nodePosition.height;
          var viewportHeight = getViewportDimensions().height;
          scrollDelta = nodeBottom - viewportHeight;
          if (scrollDelta > 0) {
            window.scrollTo(scrollPosition.x, scrollPosition.y + scrollDelta + SCROLL_BUFFER);
          }
        } else {
          !isHTMLElement(blockNode) ? true ? invariant(false, "blockNode is not an HTMLElement") : invariant(false) : void 0;
          var blockBottom = blockNode.offsetHeight + blockNode.offsetTop;
          var pOffset = scrollParent.offsetTop + scrollParent.offsetHeight;
          var scrollBottom = pOffset + scrollPosition.y;
          scrollDelta = blockBottom - scrollBottom;
          if (scrollDelta > 0) {
            Scroll.setTop(scrollParent, Scroll.getTop(scrollParent) + scrollDelta + SCROLL_BUFFER);
          }
        }
      };
      _proto._renderChildren = function _renderChildren() {
        var _this2 = this;
        var block = this.props.block;
        var blockKey = block.getKey();
        var text = block.getText();
        var lastLeafSet = this.props.tree.size - 1;
        var hasSelection = isBlockOnSelectionEdge(this.props.selection, blockKey);
        return this.props.tree.map(function(leafSet, ii) {
          var leavesForLeafSet = leafSet.get("leaves");
          if (leavesForLeafSet.size === 0) {
            return null;
          }
          var lastLeaf = leavesForLeafSet.size - 1;
          var leaves = leavesForLeafSet.map(function(leaf, jj) {
            var offsetKey = DraftOffsetKey.encode(blockKey, ii, jj);
            var start2 = leaf.get("start");
            var end2 = leaf.get("end");
            return React.createElement(DraftEditorLeaf, {
              key: offsetKey,
              offsetKey,
              block,
              start: start2,
              selection: hasSelection ? _this2.props.selection : null,
              forceSelection: _this2.props.forceSelection,
              text: text.slice(start2, end2),
              styleSet: block.getInlineStyleAt(start2),
              customStyleMap: _this2.props.customStyleMap,
              customStyleFn: _this2.props.customStyleFn,
              isLast: ii === lastLeafSet && jj === lastLeaf
            });
          }).toArray();
          var decoratorKey = leafSet.get("decoratorKey");
          if (decoratorKey == null) {
            return leaves;
          }
          if (!_this2.props.decorator) {
            return leaves;
          }
          var decorator = nullthrows(_this2.props.decorator);
          var DecoratorComponent = decorator.getComponentForKey(decoratorKey);
          if (!DecoratorComponent) {
            return leaves;
          }
          var decoratorProps = decorator.getPropsForKey(decoratorKey);
          var decoratorOffsetKey = DraftOffsetKey.encode(blockKey, ii, 0);
          var start = leavesForLeafSet.first().get("start");
          var end = leavesForLeafSet.last().get("end");
          var decoratedText = text.slice(start, end);
          var entityKey = block.getEntityAt(leafSet.get("start"));
          var dir = UnicodeBidiDirection.getHTMLDirIfDifferent(UnicodeBidi.getDirection(decoratedText), _this2.props.direction);
          var commonProps = {
            contentState: _this2.props.contentState,
            decoratedText,
            dir,
            start,
            end,
            blockKey,
            entityKey,
            offsetKey: decoratorOffsetKey
          };
          return React.createElement(DecoratorComponent, _extends({}, decoratorProps, commonProps, {
            key: decoratorOffsetKey
          }), leaves);
        }).toArray();
      };
      _proto.render = function render() {
        var _this3 = this;
        var _this$props = this.props, direction = _this$props.direction, offsetKey = _this$props.offsetKey;
        var className = cx({
          "public/DraftStyleDefault/block": true,
          "public/DraftStyleDefault/ltr": direction === "LTR",
          "public/DraftStyleDefault/rtl": direction === "RTL"
        });
        return React.createElement("div", {
          "data-offset-key": offsetKey,
          className,
          ref: function ref(_ref) {
            return _this3._node = _ref;
          }
        }, this._renderChildren());
      };
      return DraftEditorBlock2;
    }(React.Component);
    module.exports = DraftEditorBlock;
  }
});

// node_modules/fbjs/lib/joinClasses.js
var require_joinClasses = __commonJS({
  "node_modules/fbjs/lib/joinClasses.js"(exports, module) {
    "use strict";
    function joinClasses(className) {
      var newClassName = className || "";
      var argLength = arguments.length;
      if (argLength > 1) {
        for (var index = 1; index < argLength; index++) {
          var nextClass = arguments[index];
          if (nextClass) {
            newClassName = (newClassName ? newClassName + " " : "") + nextClass;
          }
        }
      }
      return newClassName;
    }
    module.exports = joinClasses;
  }
});

// node_modules/draft-js/lib/DraftEditorContents-core.react.js
var require_DraftEditorContents_core_react = __commonJS({
  "node_modules/draft-js/lib/DraftEditorContents-core.react.js"(exports, module) {
    "use strict";
    var _assign = require_object_assign();
    function _extends() {
      _extends = _assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var DraftEditorBlock = require_DraftEditorBlock_react();
    var DraftOffsetKey = require_DraftOffsetKey();
    var React = require_react();
    var cx = require_cx();
    var joinClasses = require_joinClasses();
    var nullthrows = require_nullthrows();
    var getListItemClasses = function getListItemClasses2(type, depth, shouldResetCount, direction) {
      return cx({
        "public/DraftStyleDefault/unorderedListItem": type === "unordered-list-item",
        "public/DraftStyleDefault/orderedListItem": type === "ordered-list-item",
        "public/DraftStyleDefault/reset": shouldResetCount,
        "public/DraftStyleDefault/depth0": depth === 0,
        "public/DraftStyleDefault/depth1": depth === 1,
        "public/DraftStyleDefault/depth2": depth === 2,
        "public/DraftStyleDefault/depth3": depth === 3,
        "public/DraftStyleDefault/depth4": depth >= 4,
        "public/DraftStyleDefault/listLTR": direction === "LTR",
        "public/DraftStyleDefault/listRTL": direction === "RTL"
      });
    };
    var DraftEditorContents = function(_React$Component) {
      _inheritsLoose(DraftEditorContents2, _React$Component);
      function DraftEditorContents2() {
        return _React$Component.apply(this, arguments) || this;
      }
      var _proto = DraftEditorContents2.prototype;
      _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        var prevEditorState = this.props.editorState;
        var nextEditorState = nextProps.editorState;
        var prevDirectionMap = prevEditorState.getDirectionMap();
        var nextDirectionMap = nextEditorState.getDirectionMap();
        if (prevDirectionMap !== nextDirectionMap) {
          return true;
        }
        var didHaveFocus = prevEditorState.getSelection().getHasFocus();
        var nowHasFocus = nextEditorState.getSelection().getHasFocus();
        if (didHaveFocus !== nowHasFocus) {
          return true;
        }
        var nextNativeContent = nextEditorState.getNativelyRenderedContent();
        var wasComposing = prevEditorState.isInCompositionMode();
        var nowComposing = nextEditorState.isInCompositionMode();
        if (prevEditorState === nextEditorState || nextNativeContent !== null && nextEditorState.getCurrentContent() === nextNativeContent || wasComposing && nowComposing) {
          return false;
        }
        var prevContent = prevEditorState.getCurrentContent();
        var nextContent = nextEditorState.getCurrentContent();
        var prevDecorator = prevEditorState.getDecorator();
        var nextDecorator = nextEditorState.getDecorator();
        return wasComposing !== nowComposing || prevContent !== nextContent || prevDecorator !== nextDecorator || nextEditorState.mustForceSelection();
      };
      _proto.render = function render() {
        var _this$props = this.props, blockRenderMap = _this$props.blockRenderMap, blockRendererFn = _this$props.blockRendererFn, blockStyleFn = _this$props.blockStyleFn, customStyleMap = _this$props.customStyleMap, customStyleFn = _this$props.customStyleFn, editorState = _this$props.editorState, editorKey = _this$props.editorKey, preventScroll = _this$props.preventScroll, textDirectionality = _this$props.textDirectionality;
        var content = editorState.getCurrentContent();
        var selection = editorState.getSelection();
        var forceSelection = editorState.mustForceSelection();
        var decorator = editorState.getDecorator();
        var directionMap = nullthrows(editorState.getDirectionMap());
        var blocksAsArray = content.getBlocksAsArray();
        var processedBlocks = [];
        var currentDepth = null;
        var lastWrapperTemplate = null;
        for (var ii = 0; ii < blocksAsArray.length; ii++) {
          var _block = blocksAsArray[ii];
          var key = _block.getKey();
          var blockType = _block.getType();
          var customRenderer = blockRendererFn(_block);
          var CustomComponent = void 0, customProps = void 0, customEditable = void 0;
          if (customRenderer) {
            CustomComponent = customRenderer.component;
            customProps = customRenderer.props;
            customEditable = customRenderer.editable;
          }
          var direction = textDirectionality ? textDirectionality : directionMap.get(key);
          var offsetKey = DraftOffsetKey.encode(key, 0, 0);
          var componentProps = {
            contentState: content,
            block: _block,
            blockProps: customProps,
            blockStyleFn,
            customStyleMap,
            customStyleFn,
            decorator,
            direction,
            forceSelection,
            offsetKey,
            preventScroll,
            selection,
            tree: editorState.getBlockTree(key)
          };
          var configForType = blockRenderMap.get(blockType) || blockRenderMap.get("unstyled");
          var wrapperTemplate = configForType.wrapper;
          var Element = configForType.element || blockRenderMap.get("unstyled").element;
          var depth = _block.getDepth();
          var _className = "";
          if (blockStyleFn) {
            _className = blockStyleFn(_block);
          }
          if (Element === "li") {
            var shouldResetCount = lastWrapperTemplate !== wrapperTemplate || currentDepth === null || depth > currentDepth;
            _className = joinClasses(_className, getListItemClasses(blockType, depth, shouldResetCount, direction));
          }
          var Component = CustomComponent || DraftEditorBlock;
          var childProps = {
            className: _className,
            "data-block": true,
            "data-editor": editorKey,
            "data-offset-key": offsetKey,
            key
          };
          if (customEditable !== void 0) {
            childProps = _objectSpread({}, childProps, {
              contentEditable: customEditable,
              suppressContentEditableWarning: true
            });
          }
          var child = React.createElement(
            Element,
            childProps,
            /* $FlowFixMe[incompatible-type] (>=0.112.0 site=www,mobile) This
             * comment suppresses an error found when Flow v0.112 was deployed. To
             * see the error delete this comment and run Flow. */
            React.createElement(Component, _extends({}, componentProps, {
              key
            }))
          );
          processedBlocks.push({
            block: child,
            wrapperTemplate,
            key,
            offsetKey
          });
          if (wrapperTemplate) {
            currentDepth = _block.getDepth();
          } else {
            currentDepth = null;
          }
          lastWrapperTemplate = wrapperTemplate;
        }
        var outputBlocks = [];
        for (var _ii = 0; _ii < processedBlocks.length; ) {
          var info = processedBlocks[_ii];
          if (info.wrapperTemplate) {
            var blocks = [];
            do {
              blocks.push(processedBlocks[_ii].block);
              _ii++;
            } while (_ii < processedBlocks.length && processedBlocks[_ii].wrapperTemplate === info.wrapperTemplate);
            var wrapperElement = React.cloneElement(info.wrapperTemplate, {
              key: info.key + "-wrap",
              "data-offset-key": info.offsetKey
            }, blocks);
            outputBlocks.push(wrapperElement);
          } else {
            outputBlocks.push(info.block);
            _ii++;
          }
        }
        return React.createElement("div", {
          "data-contents": "true"
        }, outputBlocks);
      };
      return DraftEditorContents2;
    }(React.Component);
    module.exports = DraftEditorContents;
  }
});

// node_modules/draft-js/lib/DraftEditorContents.react.js
var require_DraftEditorContents_react = __commonJS({
  "node_modules/draft-js/lib/DraftEditorContents.react.js"(exports, module) {
    "use strict";
    var gkx = require_gkx();
    var experimentalTreeDataSupport = gkx("draft_tree_data_support");
    module.exports = experimentalTreeDataSupport ? require_DraftEditorContentsExperimental_react() : require_DraftEditorContents_core_react();
  }
});

// node_modules/fbjs/lib/PhotosMimeType.js
var require_PhotosMimeType = __commonJS({
  "node_modules/fbjs/lib/PhotosMimeType.js"(exports, module) {
    "use strict";
    var PhotosMimeType = {
      isImage: function isImage(mimeString) {
        return getParts(mimeString)[0] === "image";
      },
      isJpeg: function isJpeg(mimeString) {
        var parts = getParts(mimeString);
        return PhotosMimeType.isImage(mimeString) && // see http://fburl.com/10972194
        (parts[1] === "jpeg" || parts[1] === "pjpeg");
      }
    };
    function getParts(mimeString) {
      return mimeString.split("/");
    }
    module.exports = PhotosMimeType;
  }
});

// node_modules/fbjs/lib/createArrayFromMixed.js
var require_createArrayFromMixed = __commonJS({
  "node_modules/fbjs/lib/createArrayFromMixed.js"(exports, module) {
    "use strict";
    var invariant = require_invariant();
    function toArray(obj) {
      var length = obj.length;
      !(!Array.isArray(obj) && (typeof obj === "object" || typeof obj === "function")) ? true ? invariant(false, "toArray: Array-like object expected") : invariant(false) : void 0;
      !(typeof length === "number") ? true ? invariant(false, "toArray: Object needs a length property") : invariant(false) : void 0;
      !(length === 0 || length - 1 in obj) ? true ? invariant(false, "toArray: Object should have keys for indices") : invariant(false) : void 0;
      !(typeof obj.callee !== "function") ? true ? invariant(false, "toArray: Object can't be `arguments`. Use rest params (function(...args) {}) or Array.from() instead.") : invariant(false) : void 0;
      if (obj.hasOwnProperty) {
        try {
          return Array.prototype.slice.call(obj);
        } catch (e) {
        }
      }
      var ret = Array(length);
      for (var ii = 0; ii < length; ii++) {
        ret[ii] = obj[ii];
      }
      return ret;
    }
    function hasArrayNature(obj) {
      return (
        // not null/false
        !!obj && // arrays are objects, NodeLists are functions in Safari
        (typeof obj == "object" || typeof obj == "function") && // quacks like an array
        "length" in obj && // not window
        !("setInterval" in obj) && // no DOM node should be considered an array-like
        // a 'select' element has 'length' and 'item' properties on IE8
        typeof obj.nodeType != "number" && // a real array
        (Array.isArray(obj) || // arguments
        "callee" in obj || // HTMLCollection/NodeList
        "item" in obj)
      );
    }
    function createArrayFromMixed(obj) {
      if (!hasArrayNature(obj)) {
        return [obj];
      } else if (Array.isArray(obj)) {
        return obj.slice();
      } else {
        return toArray(obj);
      }
    }
    module.exports = createArrayFromMixed;
  }
});

// node_modules/fbjs/lib/emptyFunction.js
var require_emptyFunction = __commonJS({
  "node_modules/fbjs/lib/emptyFunction.js"(exports, module) {
    "use strict";
    function makeEmptyFunction(arg) {
      return function() {
        return arg;
      };
    }
    var emptyFunction = function emptyFunction2() {
    };
    emptyFunction.thatReturns = makeEmptyFunction;
    emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
    emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
    emptyFunction.thatReturnsNull = makeEmptyFunction(null);
    emptyFunction.thatReturnsThis = function() {
      return this;
    };
    emptyFunction.thatReturnsArgument = function(arg) {
      return arg;
    };
    module.exports = emptyFunction;
  }
});

// node_modules/fbjs/lib/DataTransfer.js
var require_DataTransfer = __commonJS({
  "node_modules/fbjs/lib/DataTransfer.js"(exports, module) {
    "use strict";
    var PhotosMimeType = require_PhotosMimeType();
    var createArrayFromMixed = require_createArrayFromMixed();
    var emptyFunction = require_emptyFunction();
    var CR_LF_REGEX = new RegExp("\r\n", "g");
    var LF_ONLY = "\n";
    var RICH_TEXT_TYPES = {
      "text/rtf": 1,
      "text/html": 1
    };
    function getFileFromDataTransfer(item) {
      if (item.kind == "file") {
        return item.getAsFile();
      }
    }
    var DataTransfer = function() {
      function DataTransfer2(data) {
        this.data = data;
        this.types = data.types ? createArrayFromMixed(data.types) : [];
      }
      var _proto = DataTransfer2.prototype;
      _proto.isRichText = function isRichText() {
        if (this.getHTML() && this.getText()) {
          return true;
        }
        if (this.isImage()) {
          return false;
        }
        return this.types.some(function(type) {
          return RICH_TEXT_TYPES[type];
        });
      };
      _proto.getText = function getText() {
        var text;
        if (this.data.getData) {
          if (!this.types.length) {
            text = this.data.getData("Text");
          } else if (this.types.indexOf("text/plain") != -1) {
            text = this.data.getData("text/plain");
          }
        }
        return text ? text.replace(CR_LF_REGEX, LF_ONLY) : null;
      };
      _proto.getHTML = function getHTML() {
        if (this.data.getData) {
          if (!this.types.length) {
            return this.data.getData("Text");
          } else if (this.types.indexOf("text/html") != -1) {
            return this.data.getData("text/html");
          }
        }
      };
      _proto.isLink = function isLink() {
        return this.types.some(function(type) {
          return type.indexOf("Url") != -1 || type.indexOf("text/uri-list") != -1 || type.indexOf("text/x-moz-url");
        });
      };
      _proto.getLink = function getLink() {
        if (this.data.getData) {
          if (this.types.indexOf("text/x-moz-url") != -1) {
            var url = this.data.getData("text/x-moz-url").split("\n");
            return url[0];
          }
          return this.types.indexOf("text/uri-list") != -1 ? this.data.getData("text/uri-list") : this.data.getData("url");
        }
        return null;
      };
      _proto.isImage = function isImage() {
        var isImage2 = this.types.some(function(type2) {
          return type2.indexOf("application/x-moz-file") != -1;
        });
        if (isImage2) {
          return true;
        }
        var items = this.getFiles();
        for (var i = 0; i < items.length; i++) {
          var type = items[i].type;
          if (!PhotosMimeType.isImage(type)) {
            return false;
          }
        }
        return true;
      };
      _proto.getCount = function getCount() {
        if (this.data.hasOwnProperty("items")) {
          return this.data.items.length;
        } else if (this.data.hasOwnProperty("mozItemCount")) {
          return this.data.mozItemCount;
        } else if (this.data.files) {
          return this.data.files.length;
        }
        return null;
      };
      _proto.getFiles = function getFiles() {
        if (this.data.items) {
          return Array.prototype.slice.call(this.data.items).map(getFileFromDataTransfer).filter(emptyFunction.thatReturnsArgument);
        } else if (this.data.files) {
          return Array.prototype.slice.call(this.data.files);
        } else {
          return [];
        }
      };
      _proto.hasFiles = function hasFiles() {
        return this.getFiles().length > 0;
      };
      return DataTransfer2;
    }();
    module.exports = DataTransfer;
  }
});

// node_modules/draft-js/lib/getTextContentFromFiles.js
var require_getTextContentFromFiles = __commonJS({
  "node_modules/draft-js/lib/getTextContentFromFiles.js"(exports, module) {
    "use strict";
    var invariant = require_invariant();
    var TEXT_CLIPPING_REGEX = /\.textClipping$/;
    var TEXT_TYPES = {
      "text/plain": true,
      "text/html": true,
      "text/rtf": true
    };
    var TEXT_SIZE_UPPER_BOUND = 5e3;
    function getTextContentFromFiles(files, callback) {
      var readCount = 0;
      var results = [];
      files.forEach(function(file) {
        readFile(file, function(text) {
          readCount++;
          text && results.push(text.slice(0, TEXT_SIZE_UPPER_BOUND));
          if (readCount == files.length) {
            callback(results.join("\r"));
          }
        });
      });
    }
    function readFile(file, callback) {
      if (!global.FileReader || file.type && !(file.type in TEXT_TYPES)) {
        callback("");
        return;
      }
      if (file.type === "") {
        var _contents = "";
        if (TEXT_CLIPPING_REGEX.test(file.name)) {
          _contents = file.name.replace(TEXT_CLIPPING_REGEX, "");
        }
        callback(_contents);
        return;
      }
      var reader = new FileReader();
      reader.onload = function() {
        var result = reader.result;
        !(typeof result === "string") ? true ? invariant(false, 'We should be calling "FileReader.readAsText" which returns a string') : invariant(false) : void 0;
        callback(result);
      };
      reader.onerror = function() {
        callback("");
      };
      reader.readAsText(file);
    }
    module.exports = getTextContentFromFiles;
  }
});

// node_modules/draft-js/lib/isEventHandled.js
var require_isEventHandled = __commonJS({
  "node_modules/draft-js/lib/isEventHandled.js"(exports, module) {
    "use strict";
    function isEventHandled(value) {
      return value === "handled" || value === true;
    }
    module.exports = isEventHandled;
  }
});

// node_modules/draft-js/lib/DraftEditorDragHandler.js
var require_DraftEditorDragHandler = __commonJS({
  "node_modules/draft-js/lib/DraftEditorDragHandler.js"(exports, module) {
    "use strict";
    var DataTransfer = require_DataTransfer();
    var DraftModifier = require_DraftModifier();
    var EditorState = require_EditorState();
    var findAncestorOffsetKey = require_findAncestorOffsetKey();
    var getCorrectDocumentFromNode = require_getCorrectDocumentFromNode();
    var getTextContentFromFiles = require_getTextContentFromFiles();
    var getUpdatedSelectionState = require_getUpdatedSelectionState();
    var getWindowForNode = require_getWindowForNode();
    var isEventHandled = require_isEventHandled();
    var nullthrows = require_nullthrows();
    function getSelectionForEvent(event, editorState) {
      var node = null;
      var offset = null;
      var eventTargetDocument = getCorrectDocumentFromNode(event.currentTarget);
      if (typeof eventTargetDocument.caretRangeFromPoint === "function") {
        var dropRange = eventTargetDocument.caretRangeFromPoint(event.x, event.y);
        node = dropRange.startContainer;
        offset = dropRange.startOffset;
      } else if (event.rangeParent) {
        node = event.rangeParent;
        offset = event.rangeOffset;
      } else {
        return null;
      }
      node = nullthrows(node);
      offset = nullthrows(offset);
      var offsetKey = nullthrows(findAncestorOffsetKey(node));
      return getUpdatedSelectionState(editorState, offsetKey, offset, offsetKey, offset);
    }
    var DraftEditorDragHandler = {
      /**
       * Drag originating from input terminated.
       */
      onDragEnd: function onDragEnd(editor) {
        editor.exitCurrentMode();
        endDrag(editor);
      },
      /**
       * Handle data being dropped.
       */
      onDrop: function onDrop(editor, e) {
        var data = new DataTransfer(e.nativeEvent.dataTransfer);
        var editorState = editor._latestEditorState;
        var dropSelection = getSelectionForEvent(e.nativeEvent, editorState);
        e.preventDefault();
        editor._dragCount = 0;
        editor.exitCurrentMode();
        if (dropSelection == null) {
          return;
        }
        var files = data.getFiles();
        if (files.length > 0) {
          if (editor.props.handleDroppedFiles && isEventHandled(editor.props.handleDroppedFiles(dropSelection, files))) {
            return;
          }
          getTextContentFromFiles(files, function(fileText) {
            fileText && editor.update(insertTextAtSelection(editorState, dropSelection, fileText));
          });
          return;
        }
        var dragType = editor._internalDrag ? "internal" : "external";
        if (editor.props.handleDrop && isEventHandled(editor.props.handleDrop(dropSelection, data, dragType))) {
        } else if (editor._internalDrag) {
          editor.update(moveText(editorState, dropSelection));
        } else {
          editor.update(insertTextAtSelection(editorState, dropSelection, data.getText()));
        }
        endDrag(editor);
      }
    };
    function endDrag(editor) {
      editor._internalDrag = false;
      var editorNode = editor.editorContainer;
      if (editorNode) {
        var mouseUpEvent = new MouseEvent("mouseup", {
          view: getWindowForNode(editorNode),
          bubbles: true,
          cancelable: true
        });
        editorNode.dispatchEvent(mouseUpEvent);
      }
    }
    function moveText(editorState, targetSelection) {
      var newContentState = DraftModifier.moveText(editorState.getCurrentContent(), editorState.getSelection(), targetSelection);
      return EditorState.push(editorState, newContentState, "insert-fragment");
    }
    function insertTextAtSelection(editorState, selection, text) {
      var newContentState = DraftModifier.insertText(editorState.getCurrentContent(), selection, text, editorState.getCurrentInlineStyle());
      return EditorState.push(editorState, newContentState, "insert-fragment");
    }
    module.exports = DraftEditorDragHandler;
  }
});

// node_modules/draft-js/lib/isSelectionAtLeafStart.js
var require_isSelectionAtLeafStart = __commonJS({
  "node_modules/draft-js/lib/isSelectionAtLeafStart.js"(exports, module) {
    "use strict";
    function isSelectionAtLeafStart(editorState) {
      var selection = editorState.getSelection();
      var anchorKey = selection.getAnchorKey();
      var blockTree = editorState.getBlockTree(anchorKey);
      var offset = selection.getStartOffset();
      var isAtStart = false;
      blockTree.some(function(leafSet) {
        if (offset === leafSet.get("start")) {
          isAtStart = true;
          return true;
        }
        if (offset < leafSet.get("end")) {
          return leafSet.get("leaves").some(function(leaf) {
            var leafStart = leaf.get("start");
            if (offset === leafStart) {
              isAtStart = true;
              return true;
            }
            return false;
          });
        }
        return false;
      });
      return isAtStart;
    }
    module.exports = isSelectionAtLeafStart;
  }
});

// node_modules/setimmediate/setImmediate.js
var require_setImmediate = __commonJS({
  "node_modules/setimmediate/setImmediate.js"(exports) {
    (function(global2, undefined2) {
      "use strict";
      if (global2.setImmediate) {
        return;
      }
      var nextHandle = 1;
      var tasksByHandle = {};
      var currentlyRunningATask = false;
      var doc = global2.document;
      var registerImmediate;
      function setImmediate(callback) {
        if (typeof callback !== "function") {
          callback = new Function("" + callback);
        }
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
        }
        var task = { callback, args };
        tasksByHandle[nextHandle] = task;
        registerImmediate(nextHandle);
        return nextHandle++;
      }
      function clearImmediate(handle) {
        delete tasksByHandle[handle];
      }
      function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
          case 0:
            callback();
            break;
          case 1:
            callback(args[0]);
            break;
          case 2:
            callback(args[0], args[1]);
            break;
          case 3:
            callback(args[0], args[1], args[2]);
            break;
          default:
            callback.apply(undefined2, args);
            break;
        }
      }
      function runIfPresent(handle) {
        if (currentlyRunningATask) {
          setTimeout(runIfPresent, 0, handle);
        } else {
          var task = tasksByHandle[handle];
          if (task) {
            currentlyRunningATask = true;
            try {
              run(task);
            } finally {
              clearImmediate(handle);
              currentlyRunningATask = false;
            }
          }
        }
      }
      function installNextTickImplementation() {
        registerImmediate = function(handle) {
          process.nextTick(function() {
            runIfPresent(handle);
          });
        };
      }
      function canUsePostMessage() {
        if (global2.postMessage && !global2.importScripts) {
          var postMessageIsAsynchronous = true;
          var oldOnMessage = global2.onmessage;
          global2.onmessage = function() {
            postMessageIsAsynchronous = false;
          };
          global2.postMessage("", "*");
          global2.onmessage = oldOnMessage;
          return postMessageIsAsynchronous;
        }
      }
      function installPostMessageImplementation() {
        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
          if (event.source === global2 && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
            runIfPresent(+event.data.slice(messagePrefix.length));
          }
        };
        if (global2.addEventListener) {
          global2.addEventListener("message", onGlobalMessage, false);
        } else {
          global2.attachEvent("onmessage", onGlobalMessage);
        }
        registerImmediate = function(handle) {
          global2.postMessage(messagePrefix + handle, "*");
        };
      }
      function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
          var handle = event.data;
          runIfPresent(handle);
        };
        registerImmediate = function(handle) {
          channel.port2.postMessage(handle);
        };
      }
      function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
          var script = doc.createElement("script");
          script.onreadystatechange = function() {
            runIfPresent(handle);
            script.onreadystatechange = null;
            html.removeChild(script);
            script = null;
          };
          html.appendChild(script);
        };
      }
      function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
          setTimeout(runIfPresent, 0, handle);
        };
      }
      var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global2);
      attachTo = attachTo && attachTo.setTimeout ? attachTo : global2;
      if ({}.toString.call(global2.process) === "[object process]") {
        installNextTickImplementation();
      } else if (canUsePostMessage()) {
        installPostMessageImplementation();
      } else if (global2.MessageChannel) {
        installMessageChannelImplementation();
      } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        installReadyStateChangeImplementation();
      } else {
        installSetTimeoutImplementation();
      }
      attachTo.setImmediate = setImmediate;
      attachTo.clearImmediate = clearImmediate;
    })(typeof self === "undefined" ? typeof global === "undefined" ? exports : global : self);
  }
});

// node_modules/fbjs/lib/setImmediate.js
var require_setImmediate2 = __commonJS({
  "node_modules/fbjs/lib/setImmediate.js"(exports, module) {
    "use strict";
    require_setImmediate();
    module.exports = global.setImmediate;
  }
});

// node_modules/draft-js/lib/editOnBeforeInput.js
var require_editOnBeforeInput = __commonJS({
  "node_modules/draft-js/lib/editOnBeforeInput.js"(exports, module) {
    "use strict";
    var DraftModifier = require_DraftModifier();
    var EditorState = require_EditorState();
    var UserAgent = require_UserAgent();
    var getEntityKeyForSelection = require_getEntityKeyForSelection();
    var isEventHandled = require_isEventHandled();
    var isSelectionAtLeafStart = require_isSelectionAtLeafStart();
    var nullthrows = require_nullthrows();
    var setImmediate = require_setImmediate2();
    var FF_QUICKFIND_CHAR = "'";
    var FF_QUICKFIND_LINK_CHAR = "/";
    var isFirefox = UserAgent.isBrowser("Firefox");
    function mustPreventDefaultForCharacter(character) {
      return isFirefox && (character == FF_QUICKFIND_CHAR || character == FF_QUICKFIND_LINK_CHAR);
    }
    function replaceText(editorState, text, inlineStyle, entityKey, forceSelection) {
      var contentState = DraftModifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), text, inlineStyle, entityKey);
      return EditorState.push(editorState, contentState, "insert-characters", forceSelection);
    }
    function editOnBeforeInput(editor, e) {
      if (editor._pendingStateFromBeforeInput !== void 0) {
        editor.update(editor._pendingStateFromBeforeInput);
        editor._pendingStateFromBeforeInput = void 0;
      }
      var editorState = editor._latestEditorState;
      var chars = e.data;
      if (!chars) {
        return;
      }
      if (editor.props.handleBeforeInput && isEventHandled(editor.props.handleBeforeInput(chars, editorState, e.timeStamp))) {
        e.preventDefault();
        return;
      }
      var selection = editorState.getSelection();
      var selectionStart = selection.getStartOffset();
      var anchorKey = selection.getAnchorKey();
      if (!selection.isCollapsed()) {
        e.preventDefault();
        editor.update(replaceText(editorState, chars, editorState.getCurrentInlineStyle(), getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection()), true));
        return;
      }
      var newEditorState = replaceText(editorState, chars, editorState.getCurrentInlineStyle(), getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection()), false);
      var mustPreventNative = false;
      if (!mustPreventNative) {
        mustPreventNative = isSelectionAtLeafStart(editor._latestCommittedEditorState);
      }
      if (!mustPreventNative) {
        var oldBlockTree = editorState.getBlockTree(anchorKey);
        var newBlockTree = newEditorState.getBlockTree(anchorKey);
        mustPreventNative = oldBlockTree.size !== newBlockTree.size || oldBlockTree.zip(newBlockTree).some(function(_ref) {
          var oldLeafSet = _ref[0], newLeafSet = _ref[1];
          var oldStart = oldLeafSet.get("start");
          var adjustedStart = oldStart + (oldStart >= selectionStart ? chars.length : 0);
          var oldEnd = oldLeafSet.get("end");
          var adjustedEnd = oldEnd + (oldEnd >= selectionStart ? chars.length : 0);
          var newStart = newLeafSet.get("start");
          var newEnd = newLeafSet.get("end");
          var newDecoratorKey = newLeafSet.get("decoratorKey");
          return (
            // Different decorators
            oldLeafSet.get("decoratorKey") !== newDecoratorKey || // Different number of inline styles
            oldLeafSet.get("leaves").size !== newLeafSet.get("leaves").size || // Different effective decorator position
            adjustedStart !== newStart || adjustedEnd !== newEnd || // Decorator already existed and its length changed
            newDecoratorKey != null && newEnd - newStart !== oldEnd - oldStart
          );
        });
      }
      if (!mustPreventNative) {
        mustPreventNative = mustPreventDefaultForCharacter(chars);
      }
      if (!mustPreventNative) {
        mustPreventNative = nullthrows(newEditorState.getDirectionMap()).get(anchorKey) !== nullthrows(editorState.getDirectionMap()).get(anchorKey);
      }
      if (mustPreventNative) {
        e.preventDefault();
        newEditorState = EditorState.set(newEditorState, {
          forceSelection: true
        });
        editor.update(newEditorState);
        return;
      }
      newEditorState = EditorState.set(newEditorState, {
        nativelyRenderedContent: newEditorState.getCurrentContent()
      });
      editor._pendingStateFromBeforeInput = newEditorState;
      setImmediate(function() {
        if (editor._pendingStateFromBeforeInput !== void 0) {
          editor.update(editor._pendingStateFromBeforeInput);
          editor._pendingStateFromBeforeInput = void 0;
        }
      });
    }
    module.exports = editOnBeforeInput;
  }
});

// node_modules/draft-js/lib/editOnBlur.js
var require_editOnBlur = __commonJS({
  "node_modules/draft-js/lib/editOnBlur.js"(exports, module) {
    "use strict";
    var EditorState = require_EditorState();
    var containsNode = require_containsNode();
    var getActiveElement = require_getActiveElement();
    function editOnBlur(editor, e) {
      var ownerDocument = e.currentTarget.ownerDocument;
      if (
        // This ESLint rule conflicts with `sketchy-null-bool` flow check
        // eslint-disable-next-line no-extra-boolean-cast
        !Boolean(editor.props.preserveSelectionOnBlur) && getActiveElement(ownerDocument) === ownerDocument.body
      ) {
        var _selection = ownerDocument.defaultView.getSelection();
        var editorNode = editor.editor;
        if (_selection.rangeCount === 1 && containsNode(editorNode, _selection.anchorNode) && containsNode(editorNode, _selection.focusNode)) {
          _selection.removeAllRanges();
        }
      }
      var editorState = editor._latestEditorState;
      var currentSelection = editorState.getSelection();
      if (!currentSelection.getHasFocus()) {
        return;
      }
      var selection = currentSelection.set("hasFocus", false);
      editor.props.onBlur && editor.props.onBlur(e);
      editor.update(EditorState.acceptSelection(editorState, selection));
    }
    module.exports = editOnBlur;
  }
});

// node_modules/draft-js/lib/editOnCompositionStart.js
var require_editOnCompositionStart = __commonJS({
  "node_modules/draft-js/lib/editOnCompositionStart.js"(exports, module) {
    "use strict";
    var EditorState = require_EditorState();
    function editOnCompositionStart(editor, e) {
      editor.setMode("composite");
      editor.update(EditorState.set(editor._latestEditorState, {
        inCompositionMode: true
      }));
      editor._onCompositionStart(e);
    }
    module.exports = editOnCompositionStart;
  }
});

// node_modules/draft-js/lib/getFragmentFromSelection.js
var require_getFragmentFromSelection = __commonJS({
  "node_modules/draft-js/lib/getFragmentFromSelection.js"(exports, module) {
    "use strict";
    var getContentStateFragment = require_getContentStateFragment();
    function getFragmentFromSelection(editorState) {
      var selectionState = editorState.getSelection();
      if (selectionState.isCollapsed()) {
        return null;
      }
      return getContentStateFragment(editorState.getCurrentContent(), selectionState);
    }
    module.exports = getFragmentFromSelection;
  }
});

// node_modules/draft-js/lib/editOnCopy.js
var require_editOnCopy = __commonJS({
  "node_modules/draft-js/lib/editOnCopy.js"(exports, module) {
    "use strict";
    var getFragmentFromSelection = require_getFragmentFromSelection();
    function editOnCopy(editor, e) {
      var editorState = editor._latestEditorState;
      var selection = editorState.getSelection();
      if (selection.isCollapsed()) {
        e.preventDefault();
        return;
      }
      editor.setClipboard(getFragmentFromSelection(editor._latestEditorState));
    }
    module.exports = editOnCopy;
  }
});

// node_modules/draft-js/lib/isInstanceOfNode.js
var require_isInstanceOfNode = __commonJS({
  "node_modules/draft-js/lib/isInstanceOfNode.js"(exports, module) {
    "use strict";
    function isInstanceOfNode(target) {
      if (!target || !("ownerDocument" in target)) {
        return false;
      }
      if ("ownerDocument" in target) {
        var node = target;
        if (!node.ownerDocument.defaultView) {
          return node instanceof Node;
        }
        if (node instanceof node.ownerDocument.defaultView.Node) {
          return true;
        }
      }
      return false;
    }
    module.exports = isInstanceOfNode;
  }
});

// node_modules/draft-js/lib/editOnCut.js
var require_editOnCut = __commonJS({
  "node_modules/draft-js/lib/editOnCut.js"(exports, module) {
    "use strict";
    var DraftModifier = require_DraftModifier();
    var EditorState = require_EditorState();
    var Style = require_Style();
    var getFragmentFromSelection = require_getFragmentFromSelection();
    var getScrollPosition = require_getScrollPosition();
    var isNode = require_isInstanceOfNode();
    function editOnCut(editor, e) {
      var editorState = editor._latestEditorState;
      var selection = editorState.getSelection();
      var element = e.target;
      var scrollPosition;
      if (selection.isCollapsed()) {
        e.preventDefault();
        return;
      }
      if (isNode(element)) {
        var node = element;
        scrollPosition = getScrollPosition(Style.getScrollParent(node));
      }
      var fragment = getFragmentFromSelection(editorState);
      editor.setClipboard(fragment);
      editor.setMode("cut");
      setTimeout(function() {
        editor.restoreEditorDOM(scrollPosition);
        editor.exitCurrentMode();
        editor.update(removeFragment(editorState));
      }, 0);
    }
    function removeFragment(editorState) {
      var newContent = DraftModifier.removeRange(editorState.getCurrentContent(), editorState.getSelection(), "forward");
      return EditorState.push(editorState, newContent, "remove-range");
    }
    module.exports = editOnCut;
  }
});

// node_modules/draft-js/lib/editOnDragOver.js
var require_editOnDragOver = __commonJS({
  "node_modules/draft-js/lib/editOnDragOver.js"(exports, module) {
    "use strict";
    function editOnDragOver(editor, e) {
      editor.setMode("drag");
      e.preventDefault();
    }
    module.exports = editOnDragOver;
  }
});

// node_modules/draft-js/lib/editOnDragStart.js
var require_editOnDragStart = __commonJS({
  "node_modules/draft-js/lib/editOnDragStart.js"(exports, module) {
    "use strict";
    function editOnDragStart(editor) {
      editor._internalDrag = true;
      editor.setMode("drag");
    }
    module.exports = editOnDragStart;
  }
});

// node_modules/draft-js/lib/editOnFocus.js
var require_editOnFocus = __commonJS({
  "node_modules/draft-js/lib/editOnFocus.js"(exports, module) {
    "use strict";
    var EditorState = require_EditorState();
    var UserAgent = require_UserAgent();
    function editOnFocus(editor, e) {
      var editorState = editor._latestEditorState;
      var currentSelection = editorState.getSelection();
      if (currentSelection.getHasFocus()) {
        return;
      }
      var selection = currentSelection.set("hasFocus", true);
      editor.props.onFocus && editor.props.onFocus(e);
      if (UserAgent.isBrowser("Chrome < 60.0.3081.0")) {
        editor.update(EditorState.forceSelection(editorState, selection));
      } else {
        editor.update(EditorState.acceptSelection(editorState, selection));
      }
    }
    module.exports = editOnFocus;
  }
});

// node_modules/fbjs/lib/UnicodeUtils.js
var require_UnicodeUtils = __commonJS({
  "node_modules/fbjs/lib/UnicodeUtils.js"(exports, module) {
    "use strict";
    var invariant = require_invariant();
    var SURROGATE_HIGH_START = 55296;
    var SURROGATE_HIGH_END = 56319;
    var SURROGATE_LOW_START = 56320;
    var SURROGATE_LOW_END = 57343;
    var SURROGATE_UNITS_REGEX = /[\uD800-\uDFFF]/;
    function isCodeUnitInSurrogateRange(codeUnit) {
      return SURROGATE_HIGH_START <= codeUnit && codeUnit <= SURROGATE_LOW_END;
    }
    function isSurrogatePair(str, index) {
      !(0 <= index && index < str.length) ? true ? invariant(false, "isSurrogatePair: Invalid index %s for string length %s.", index, str.length) : invariant(false) : void 0;
      if (index + 1 === str.length) {
        return false;
      }
      var first = str.charCodeAt(index);
      var second = str.charCodeAt(index + 1);
      return SURROGATE_HIGH_START <= first && first <= SURROGATE_HIGH_END && SURROGATE_LOW_START <= second && second <= SURROGATE_LOW_END;
    }
    function hasSurrogateUnit(str) {
      return SURROGATE_UNITS_REGEX.test(str);
    }
    function getUTF16Length(str, pos) {
      return 1 + isCodeUnitInSurrogateRange(str.charCodeAt(pos));
    }
    function strlen(str) {
      if (!hasSurrogateUnit(str)) {
        return str.length;
      }
      var len = 0;
      for (var pos = 0; pos < str.length; pos += getUTF16Length(str, pos)) {
        len++;
      }
      return len;
    }
    function substr(str, start, length) {
      start = start || 0;
      length = length === void 0 ? Infinity : length || 0;
      if (!hasSurrogateUnit(str)) {
        return str.substr(start, length);
      }
      var size = str.length;
      if (size <= 0 || start > size || length <= 0) {
        return "";
      }
      var posA = 0;
      if (start > 0) {
        for (; start > 0 && posA < size; start--) {
          posA += getUTF16Length(str, posA);
        }
        if (posA >= size) {
          return "";
        }
      } else if (start < 0) {
        for (posA = size; start < 0 && 0 < posA; start++) {
          posA -= getUTF16Length(str, posA - 1);
        }
        if (posA < 0) {
          posA = 0;
        }
      }
      var posB = size;
      if (length < size) {
        for (posB = posA; length > 0 && posB < size; length--) {
          posB += getUTF16Length(str, posB);
        }
      }
      return str.substring(posA, posB);
    }
    function substring(str, start, end) {
      start = start || 0;
      end = end === void 0 ? Infinity : end || 0;
      if (start < 0) {
        start = 0;
      }
      if (end < 0) {
        end = 0;
      }
      var length = Math.abs(end - start);
      start = start < end ? start : end;
      return substr(str, start, length);
    }
    function getCodePoints(str) {
      var codePoints = [];
      for (var pos = 0; pos < str.length; pos += getUTF16Length(str, pos)) {
        codePoints.push(str.codePointAt(pos));
      }
      return codePoints;
    }
    var UnicodeUtils = {
      getCodePoints,
      getUTF16Length,
      hasSurrogateUnit,
      isCodeUnitInSurrogateRange,
      isSurrogatePair,
      strlen,
      substring,
      substr
    };
    module.exports = UnicodeUtils;
  }
});

// node_modules/fbjs/lib/warning.js
var require_warning = __commonJS({
  "node_modules/fbjs/lib/warning.js"(exports, module) {
    "use strict";
    var emptyFunction = require_emptyFunction();
    function printWarning(format) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      var argIndex = 0;
      var message = "Warning: " + format.replace(/%s/g, function() {
        return args[argIndex++];
      });
      if (typeof console !== "undefined") {
        console.error(message);
      }
      try {
        throw new Error(message);
      } catch (x) {
      }
    }
    var warning = true ? function(condition, format) {
      if (format === void 0) {
        throw new Error("`warning(condition, format, ...args)` requires a warning message argument");
      }
      if (!condition) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }
        printWarning.apply(void 0, [format].concat(args));
      }
    } : emptyFunction;
    module.exports = warning;
  }
});

// node_modules/draft-js/lib/moveSelectionBackward.js
var require_moveSelectionBackward = __commonJS({
  "node_modules/draft-js/lib/moveSelectionBackward.js"(exports, module) {
    "use strict";
    var warning = require_warning();
    function moveSelectionBackward(editorState, maxDistance) {
      var selection = editorState.getSelection();
      true ? warning(selection.isCollapsed(), "moveSelectionBackward should only be called with a collapsed SelectionState") : void 0;
      var content = editorState.getCurrentContent();
      var key = selection.getStartKey();
      var offset = selection.getStartOffset();
      var focusKey = key;
      var focusOffset = 0;
      if (maxDistance > offset) {
        var keyBefore = content.getKeyBefore(key);
        if (keyBefore == null) {
          focusKey = key;
        } else {
          focusKey = keyBefore;
          var blockBefore = content.getBlockForKey(keyBefore);
          focusOffset = blockBefore.getText().length;
        }
      } else {
        focusOffset = offset - maxDistance;
      }
      return selection.merge({
        focusKey,
        focusOffset,
        isBackward: true
      });
    }
    module.exports = moveSelectionBackward;
  }
});

// node_modules/draft-js/lib/removeTextWithStrategy.js
var require_removeTextWithStrategy = __commonJS({
  "node_modules/draft-js/lib/removeTextWithStrategy.js"(exports, module) {
    "use strict";
    var DraftModifier = require_DraftModifier();
    var gkx = require_gkx();
    var experimentalTreeDataSupport = gkx("draft_tree_data_support");
    function removeTextWithStrategy(editorState, strategy, direction) {
      var selection = editorState.getSelection();
      var content = editorState.getCurrentContent();
      var target = selection;
      var anchorKey = selection.getAnchorKey();
      var focusKey = selection.getFocusKey();
      var anchorBlock = content.getBlockForKey(anchorKey);
      if (experimentalTreeDataSupport) {
        if (direction === "forward") {
          if (anchorKey !== focusKey) {
            return content;
          }
        }
      }
      if (selection.isCollapsed()) {
        if (direction === "forward") {
          if (editorState.isSelectionAtEndOfContent()) {
            return content;
          }
          if (experimentalTreeDataSupport) {
            var isAtEndOfBlock = selection.getAnchorOffset() === content.getBlockForKey(anchorKey).getLength();
            if (isAtEndOfBlock) {
              var anchorBlockSibling = content.getBlockForKey(anchorBlock.nextSibling);
              if (!anchorBlockSibling || anchorBlockSibling.getLength() === 0) {
                return content;
              }
            }
          }
        } else if (editorState.isSelectionAtStartOfContent()) {
          return content;
        }
        target = strategy(editorState);
        if (target === selection) {
          return content;
        }
      }
      return DraftModifier.removeRange(content, target, direction);
    }
    module.exports = removeTextWithStrategy;
  }
});

// node_modules/draft-js/lib/keyCommandPlainBackspace.js
var require_keyCommandPlainBackspace = __commonJS({
  "node_modules/draft-js/lib/keyCommandPlainBackspace.js"(exports, module) {
    "use strict";
    var EditorState = require_EditorState();
    var UnicodeUtils = require_UnicodeUtils();
    var moveSelectionBackward = require_moveSelectionBackward();
    var removeTextWithStrategy = require_removeTextWithStrategy();
    function keyCommandPlainBackspace(editorState) {
      var afterRemoval = removeTextWithStrategy(editorState, function(strategyState) {
        var selection2 = strategyState.getSelection();
        var content = strategyState.getCurrentContent();
        var key = selection2.getAnchorKey();
        var offset = selection2.getAnchorOffset();
        var charBehind = content.getBlockForKey(key).getText()[offset - 1];
        return moveSelectionBackward(strategyState, charBehind ? UnicodeUtils.getUTF16Length(charBehind, 0) : 1);
      }, "backward");
      if (afterRemoval === editorState.getCurrentContent()) {
        return editorState;
      }
      var selection = editorState.getSelection();
      return EditorState.push(editorState, afterRemoval.set("selectionBefore", selection), selection.isCollapsed() ? "backspace-character" : "remove-range");
    }
    module.exports = keyCommandPlainBackspace;
  }
});

// node_modules/draft-js/lib/editOnInput.js
var require_editOnInput = __commonJS({
  "node_modules/draft-js/lib/editOnInput.js"(exports, module) {
    "use strict";
    var DraftModifier = require_DraftModifier();
    var DraftOffsetKey = require_DraftOffsetKey();
    var EditorState = require_EditorState();
    var UserAgent = require_UserAgent();
    var _require = require_draftKeyUtils();
    var notEmptyKey = _require.notEmptyKey;
    var findAncestorOffsetKey = require_findAncestorOffsetKey();
    var keyCommandPlainBackspace = require_keyCommandPlainBackspace();
    var nullthrows = require_nullthrows();
    var isGecko = UserAgent.isEngine("Gecko");
    var DOUBLE_NEWLINE = "\n\n";
    function onInputType(inputType, editorState) {
      switch (inputType) {
        case "deleteContentBackward":
          return keyCommandPlainBackspace(editorState);
      }
      return editorState;
    }
    function editOnInput(editor, e) {
      if (editor._pendingStateFromBeforeInput !== void 0) {
        editor.update(editor._pendingStateFromBeforeInput);
        editor._pendingStateFromBeforeInput = void 0;
      }
      var castedEditorElement = editor.editor;
      var domSelection = castedEditorElement.ownerDocument.defaultView.getSelection();
      var anchorNode = domSelection.anchorNode, isCollapsed = domSelection.isCollapsed;
      var isNotTextOrElementNode = (anchorNode === null || anchorNode === void 0 ? void 0 : anchorNode.nodeType) !== Node.TEXT_NODE && (anchorNode === null || anchorNode === void 0 ? void 0 : anchorNode.nodeType) !== Node.ELEMENT_NODE;
      if (anchorNode == null || isNotTextOrElementNode) {
        return;
      }
      if (anchorNode.nodeType === Node.TEXT_NODE && (anchorNode.previousSibling !== null || anchorNode.nextSibling !== null)) {
        var span = anchorNode.parentNode;
        if (span == null) {
          return;
        }
        anchorNode.nodeValue = span.textContent;
        for (var child = span.firstChild; child != null; child = child.nextSibling) {
          if (child !== anchorNode) {
            span.removeChild(child);
          }
        }
      }
      var domText = anchorNode.textContent;
      var editorState = editor._latestEditorState;
      var offsetKey = nullthrows(findAncestorOffsetKey(anchorNode));
      var _DraftOffsetKey$decod = DraftOffsetKey.decode(offsetKey), blockKey = _DraftOffsetKey$decod.blockKey, decoratorKey = _DraftOffsetKey$decod.decoratorKey, leafKey = _DraftOffsetKey$decod.leafKey;
      var _editorState$getBlock = editorState.getBlockTree(blockKey).getIn([decoratorKey, "leaves", leafKey]), start = _editorState$getBlock.start, end = _editorState$getBlock.end;
      var content = editorState.getCurrentContent();
      var block = content.getBlockForKey(blockKey);
      var modelText = block.getText().slice(start, end);
      if (domText.endsWith(DOUBLE_NEWLINE)) {
        domText = domText.slice(0, -1);
      }
      if (domText === modelText) {
        var inputType = e.nativeEvent.inputType;
        if (inputType) {
          var newEditorState = onInputType(inputType, editorState);
          if (newEditorState !== editorState) {
            editor.restoreEditorDOM();
            editor.update(newEditorState);
            return;
          }
        }
        return;
      }
      var selection = editorState.getSelection();
      var targetRange = selection.merge({
        anchorOffset: start,
        focusOffset: end,
        isBackward: false
      });
      var entityKey = block.getEntityAt(start);
      var entity = notEmptyKey(entityKey) ? content.getEntity(entityKey) : null;
      var entityType = entity != null ? entity.getMutability() : null;
      var preserveEntity = entityType === "MUTABLE";
      var changeType = preserveEntity ? "spellcheck-change" : "apply-entity";
      var newContent = DraftModifier.replaceText(content, targetRange, domText, block.getInlineStyleAt(start), preserveEntity ? block.getEntityAt(start) : null);
      var anchorOffset, focusOffset, startOffset, endOffset;
      if (isGecko) {
        anchorOffset = domSelection.anchorOffset;
        focusOffset = domSelection.focusOffset;
        startOffset = start + Math.min(anchorOffset, focusOffset);
        endOffset = startOffset + Math.abs(anchorOffset - focusOffset);
        anchorOffset = startOffset;
        focusOffset = endOffset;
      } else {
        var charDelta = domText.length - modelText.length;
        startOffset = selection.getStartOffset();
        endOffset = selection.getEndOffset();
        anchorOffset = isCollapsed ? endOffset + charDelta : startOffset;
        focusOffset = endOffset + charDelta;
      }
      var contentWithAdjustedDOMSelection = newContent.merge({
        selectionBefore: content.getSelectionAfter(),
        selectionAfter: selection.merge({
          anchorOffset,
          focusOffset
        })
      });
      editor.update(EditorState.push(editorState, contentWithAdjustedDOMSelection, changeType));
    }
    module.exports = editOnInput;
  }
});

// node_modules/draft-js/lib/isSoftNewlineEvent.js
var require_isSoftNewlineEvent = __commonJS({
  "node_modules/draft-js/lib/isSoftNewlineEvent.js"(exports, module) {
    "use strict";
    var Keys = require_Keys();
    function isSoftNewlineEvent(e) {
      return e.which === Keys.RETURN && (e.getModifierState("Shift") || e.getModifierState("Alt") || e.getModifierState("Control"));
    }
    module.exports = isSoftNewlineEvent;
  }
});

// node_modules/draft-js/lib/KeyBindingUtil.js
var require_KeyBindingUtil = __commonJS({
  "node_modules/draft-js/lib/KeyBindingUtil.js"(exports, module) {
    "use strict";
    var UserAgent = require_UserAgent();
    var isSoftNewlineEvent = require_isSoftNewlineEvent();
    var isOSX = UserAgent.isPlatform("Mac OS X");
    var KeyBindingUtil = {
      /**
       * Check whether the ctrlKey modifier is *not* being used in conjunction with
       * the altKey modifier. If they are combined, the result is an `altGraph`
       * key modifier, which should not be handled by this set of key bindings.
       */
      isCtrlKeyCommand: function isCtrlKeyCommand(e) {
        return !!e.ctrlKey && !e.altKey;
      },
      isOptionKeyCommand: function isOptionKeyCommand(e) {
        return isOSX && e.altKey;
      },
      usesMacOSHeuristics: function usesMacOSHeuristics() {
        return isOSX;
      },
      hasCommandModifier: function hasCommandModifier(e) {
        return isOSX ? !!e.metaKey && !e.altKey : KeyBindingUtil.isCtrlKeyCommand(e);
      },
      isSoftNewlineEvent
    };
    module.exports = KeyBindingUtil;
  }
});

// node_modules/draft-js/lib/SecondaryClipboard.js
var require_SecondaryClipboard = __commonJS({
  "node_modules/draft-js/lib/SecondaryClipboard.js"(exports, module) {
    "use strict";
    var DraftModifier = require_DraftModifier();
    var EditorState = require_EditorState();
    var getContentStateFragment = require_getContentStateFragment();
    var nullthrows = require_nullthrows();
    var clipboard = null;
    var SecondaryClipboard = {
      cut: function cut(editorState) {
        var content = editorState.getCurrentContent();
        var selection = editorState.getSelection();
        var targetRange = null;
        if (selection.isCollapsed()) {
          var anchorKey = selection.getAnchorKey();
          var blockEnd = content.getBlockForKey(anchorKey).getLength();
          if (blockEnd === selection.getAnchorOffset()) {
            var keyAfter = content.getKeyAfter(anchorKey);
            if (keyAfter == null) {
              return editorState;
            }
            targetRange = selection.set("focusKey", keyAfter).set("focusOffset", 0);
          } else {
            targetRange = selection.set("focusOffset", blockEnd);
          }
        } else {
          targetRange = selection;
        }
        targetRange = nullthrows(targetRange);
        clipboard = getContentStateFragment(content, targetRange);
        var afterRemoval = DraftModifier.removeRange(content, targetRange, "forward");
        if (afterRemoval === content) {
          return editorState;
        }
        return EditorState.push(editorState, afterRemoval, "remove-range");
      },
      paste: function paste(editorState) {
        if (!clipboard) {
          return editorState;
        }
        var newContent = DraftModifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), clipboard);
        return EditorState.push(editorState, newContent, "insert-fragment");
      }
    };
    module.exports = SecondaryClipboard;
  }
});

// node_modules/draft-js/lib/getRangeClientRects.js
var require_getRangeClientRects = __commonJS({
  "node_modules/draft-js/lib/getRangeClientRects.js"(exports, module) {
    "use strict";
    var UserAgent = require_UserAgent();
    var invariant = require_invariant();
    var isChrome = UserAgent.isBrowser("Chrome");
    function getRangeClientRectsChrome(range) {
      var tempRange = range.cloneRange();
      var clientRects = [];
      for (var ancestor = range.endContainer; ancestor != null; ancestor = ancestor.parentNode) {
        var atCommonAncestor = ancestor === range.commonAncestorContainer;
        if (atCommonAncestor) {
          tempRange.setStart(range.startContainer, range.startOffset);
        } else {
          tempRange.setStart(tempRange.endContainer, 0);
        }
        var rects = Array.from(tempRange.getClientRects());
        clientRects.push(rects);
        if (atCommonAncestor) {
          var _ref;
          clientRects.reverse();
          return (_ref = []).concat.apply(_ref, clientRects);
        }
        tempRange.setEndBefore(ancestor);
      }
      true ? true ? invariant(false, "Found an unexpected detached subtree when getting range client rects.") : invariant(false) : void 0;
    }
    var getRangeClientRects = isChrome ? getRangeClientRectsChrome : function(range) {
      return Array.from(range.getClientRects());
    };
    module.exports = getRangeClientRects;
  }
});

// node_modules/draft-js/lib/expandRangeToStartOfLine.js
var require_expandRangeToStartOfLine = __commonJS({
  "node_modules/draft-js/lib/expandRangeToStartOfLine.js"(exports, module) {
    "use strict";
    var UnicodeUtils = require_UnicodeUtils();
    var getCorrectDocumentFromNode = require_getCorrectDocumentFromNode();
    var getRangeClientRects = require_getRangeClientRects();
    var invariant = require_invariant();
    function getLineHeightPx(element) {
      var computed = getComputedStyle(element);
      var correctDocument = getCorrectDocumentFromNode(element);
      var div = correctDocument.createElement("div");
      div.style.fontFamily = computed.fontFamily;
      div.style.fontSize = computed.fontSize;
      div.style.fontStyle = computed.fontStyle;
      div.style.fontWeight = computed.fontWeight;
      div.style.lineHeight = computed.lineHeight;
      div.style.position = "absolute";
      div.textContent = "M";
      var documentBody = correctDocument.body;
      !documentBody ? true ? invariant(false, "Missing document.body") : invariant(false) : void 0;
      documentBody.appendChild(div);
      var rect = div.getBoundingClientRect();
      documentBody.removeChild(div);
      return rect.height;
    }
    function areRectsOnOneLine(rects, lineHeight) {
      var minTop = Infinity;
      var minBottom = Infinity;
      var maxTop = -Infinity;
      var maxBottom = -Infinity;
      for (var ii = 0; ii < rects.length; ii++) {
        var rect = rects[ii];
        if (rect.width === 0 || rect.width === 1) {
          continue;
        }
        minTop = Math.min(minTop, rect.top);
        minBottom = Math.min(minBottom, rect.bottom);
        maxTop = Math.max(maxTop, rect.top);
        maxBottom = Math.max(maxBottom, rect.bottom);
      }
      return maxTop <= minBottom && maxTop - minTop < lineHeight && maxBottom - minBottom < lineHeight;
    }
    function getNodeLength(node) {
      switch (node.nodeType) {
        case Node.DOCUMENT_TYPE_NODE:
          return 0;
        case Node.TEXT_NODE:
        case Node.PROCESSING_INSTRUCTION_NODE:
        case Node.COMMENT_NODE:
          return node.length;
        default:
          return node.childNodes.length;
      }
    }
    function expandRangeToStartOfLine(range) {
      !range.collapsed ? true ? invariant(false, "expandRangeToStartOfLine: Provided range is not collapsed.") : invariant(false) : void 0;
      range = range.cloneRange();
      var containingElement = range.startContainer;
      if (containingElement.nodeType !== 1) {
        containingElement = containingElement.parentNode;
      }
      var lineHeight = getLineHeightPx(containingElement);
      var bestContainer = range.endContainer;
      var bestOffset = range.endOffset;
      range.setStart(range.startContainer, 0);
      while (areRectsOnOneLine(getRangeClientRects(range), lineHeight)) {
        bestContainer = range.startContainer;
        bestOffset = range.startOffset;
        !bestContainer.parentNode ? true ? invariant(false, "Found unexpected detached subtree when traversing.") : invariant(false) : void 0;
        range.setStartBefore(bestContainer);
        if (bestContainer.nodeType === 1 && getComputedStyle(bestContainer).display !== "inline") {
          break;
        }
      }
      var currentContainer = bestContainer;
      var maxIndexToConsider = bestOffset - 1;
      do {
        var nodeValue = currentContainer.nodeValue;
        var ii = maxIndexToConsider;
        for (; ii >= 0; ii--) {
          if (nodeValue != null && ii > 0 && UnicodeUtils.isSurrogatePair(nodeValue, ii - 1)) {
            continue;
          }
          range.setStart(currentContainer, ii);
          if (areRectsOnOneLine(getRangeClientRects(range), lineHeight)) {
            bestContainer = currentContainer;
            bestOffset = ii;
          } else {
            break;
          }
        }
        if (ii === -1 || currentContainer.childNodes.length === 0) {
          break;
        }
        currentContainer = currentContainer.childNodes[ii];
        maxIndexToConsider = getNodeLength(currentContainer);
      } while (true);
      range.setStart(bestContainer, bestOffset);
      return range;
    }
    module.exports = expandRangeToStartOfLine;
  }
});

// node_modules/draft-js/lib/keyCommandBackspaceToStartOfLine.js
var require_keyCommandBackspaceToStartOfLine = __commonJS({
  "node_modules/draft-js/lib/keyCommandBackspaceToStartOfLine.js"(exports, module) {
    "use strict";
    var EditorState = require_EditorState();
    var expandRangeToStartOfLine = require_expandRangeToStartOfLine();
    var getDraftEditorSelectionWithNodes = require_getDraftEditorSelectionWithNodes();
    var moveSelectionBackward = require_moveSelectionBackward();
    var removeTextWithStrategy = require_removeTextWithStrategy();
    function keyCommandBackspaceToStartOfLine(editorState, e) {
      var afterRemoval = removeTextWithStrategy(editorState, function(strategyState) {
        var selection = strategyState.getSelection();
        if (selection.isCollapsed() && selection.getAnchorOffset() === 0) {
          return moveSelectionBackward(strategyState, 1);
        }
        var ownerDocument = e.currentTarget.ownerDocument;
        var domSelection = ownerDocument.defaultView.getSelection();
        var range = domSelection.getRangeAt(0);
        range = expandRangeToStartOfLine(range);
        return getDraftEditorSelectionWithNodes(strategyState, null, range.endContainer, range.endOffset, range.startContainer, range.startOffset).selectionState;
      }, "backward");
      if (afterRemoval === editorState.getCurrentContent()) {
        return editorState;
      }
      return EditorState.push(editorState, afterRemoval, "remove-range");
    }
    module.exports = keyCommandBackspaceToStartOfLine;
  }
});

// node_modules/fbjs/lib/TokenizeUtil.js
var require_TokenizeUtil = __commonJS({
  "node_modules/fbjs/lib/TokenizeUtil.js"(exports, module) {
    "use strict";
    var PUNCTUATION = `[.,+*?$|#{}()'\\^\\-\\[\\]\\\\\\/!@%"~=<>_:;・、。〈-】〔-〟：-？！-／［-｀｛-･⸮؟٪-٬؛،؍﴾﴿᠁।၊။‐-‧‰-⁞¡-±´-¸º»¿]`;
    module.exports = {
      getPunctuation: function getPunctuation() {
        return PUNCTUATION;
      }
    };
  }
});

// node_modules/draft-js/lib/DraftRemovableWord.js
var require_DraftRemovableWord = __commonJS({
  "node_modules/draft-js/lib/DraftRemovableWord.js"(exports, module) {
    "use strict";
    var TokenizeUtil = require_TokenizeUtil();
    var punctuation = TokenizeUtil.getPunctuation();
    var CHAMELEON_CHARS = "['‘’]";
    var WHITESPACE_AND_PUNCTUATION = "\\s|(?![_])" + punctuation;
    var DELETE_STRING = "^(?:" + WHITESPACE_AND_PUNCTUATION + ")*(?:" + CHAMELEON_CHARS + "|(?!" + WHITESPACE_AND_PUNCTUATION + ").)*(?:(?!" + WHITESPACE_AND_PUNCTUATION + ").)";
    var DELETE_REGEX = new RegExp(DELETE_STRING);
    var BACKSPACE_STRING = "(?:(?!" + WHITESPACE_AND_PUNCTUATION + ").)(?:" + CHAMELEON_CHARS + "|(?!" + WHITESPACE_AND_PUNCTUATION + ").)*(?:" + WHITESPACE_AND_PUNCTUATION + ")*$";
    var BACKSPACE_REGEX = new RegExp(BACKSPACE_STRING);
    function getRemovableWord(text, isBackward) {
      var matches = isBackward ? BACKSPACE_REGEX.exec(text) : DELETE_REGEX.exec(text);
      return matches ? matches[0] : text;
    }
    var DraftRemovableWord = {
      getBackward: function getBackward(text) {
        return getRemovableWord(text, true);
      },
      getForward: function getForward(text) {
        return getRemovableWord(text, false);
      }
    };
    module.exports = DraftRemovableWord;
  }
});

// node_modules/draft-js/lib/keyCommandBackspaceWord.js
var require_keyCommandBackspaceWord = __commonJS({
  "node_modules/draft-js/lib/keyCommandBackspaceWord.js"(exports, module) {
    "use strict";
    var DraftRemovableWord = require_DraftRemovableWord();
    var EditorState = require_EditorState();
    var moveSelectionBackward = require_moveSelectionBackward();
    var removeTextWithStrategy = require_removeTextWithStrategy();
    function keyCommandBackspaceWord(editorState) {
      var afterRemoval = removeTextWithStrategy(editorState, function(strategyState) {
        var selection = strategyState.getSelection();
        var offset = selection.getStartOffset();
        if (offset === 0) {
          return moveSelectionBackward(strategyState, 1);
        }
        var key = selection.getStartKey();
        var content = strategyState.getCurrentContent();
        var text = content.getBlockForKey(key).getText().slice(0, offset);
        var toRemove = DraftRemovableWord.getBackward(text);
        return moveSelectionBackward(strategyState, toRemove.length || 1);
      }, "backward");
      if (afterRemoval === editorState.getCurrentContent()) {
        return editorState;
      }
      return EditorState.push(editorState, afterRemoval, "remove-range");
    }
    module.exports = keyCommandBackspaceWord;
  }
});

// node_modules/draft-js/lib/moveSelectionForward.js
var require_moveSelectionForward = __commonJS({
  "node_modules/draft-js/lib/moveSelectionForward.js"(exports, module) {
    "use strict";
    var warning = require_warning();
    function moveSelectionForward(editorState, maxDistance) {
      var selection = editorState.getSelection();
      true ? warning(selection.isCollapsed(), "moveSelectionForward should only be called with a collapsed SelectionState") : void 0;
      var key = selection.getStartKey();
      var offset = selection.getStartOffset();
      var content = editorState.getCurrentContent();
      var focusKey = key;
      var focusOffset;
      var block = content.getBlockForKey(key);
      if (maxDistance > block.getText().length - offset) {
        focusKey = content.getKeyAfter(key);
        focusOffset = 0;
      } else {
        focusOffset = offset + maxDistance;
      }
      return selection.merge({
        focusKey,
        focusOffset
      });
    }
    module.exports = moveSelectionForward;
  }
});

// node_modules/draft-js/lib/keyCommandDeleteWord.js
var require_keyCommandDeleteWord = __commonJS({
  "node_modules/draft-js/lib/keyCommandDeleteWord.js"(exports, module) {
    "use strict";
    var DraftRemovableWord = require_DraftRemovableWord();
    var EditorState = require_EditorState();
    var moveSelectionForward = require_moveSelectionForward();
    var removeTextWithStrategy = require_removeTextWithStrategy();
    function keyCommandDeleteWord(editorState) {
      var afterRemoval = removeTextWithStrategy(editorState, function(strategyState) {
        var selection = strategyState.getSelection();
        var offset = selection.getStartOffset();
        var key = selection.getStartKey();
        var content = strategyState.getCurrentContent();
        var text = content.getBlockForKey(key).getText().slice(offset);
        var toRemove = DraftRemovableWord.getForward(text);
        return moveSelectionForward(strategyState, toRemove.length || 1);
      }, "forward");
      if (afterRemoval === editorState.getCurrentContent()) {
        return editorState;
      }
      return EditorState.push(editorState, afterRemoval, "remove-range");
    }
    module.exports = keyCommandDeleteWord;
  }
});

// node_modules/draft-js/lib/keyCommandInsertNewline.js
var require_keyCommandInsertNewline = __commonJS({
  "node_modules/draft-js/lib/keyCommandInsertNewline.js"(exports, module) {
    "use strict";
    var DraftModifier = require_DraftModifier();
    var EditorState = require_EditorState();
    function keyCommandInsertNewline(editorState) {
      var contentState = DraftModifier.splitBlock(editorState.getCurrentContent(), editorState.getSelection());
      return EditorState.push(editorState, contentState, "split-block");
    }
    module.exports = keyCommandInsertNewline;
  }
});

// node_modules/draft-js/lib/keyCommandMoveSelectionToEndOfBlock.js
var require_keyCommandMoveSelectionToEndOfBlock = __commonJS({
  "node_modules/draft-js/lib/keyCommandMoveSelectionToEndOfBlock.js"(exports, module) {
    "use strict";
    var EditorState = require_EditorState();
    function keyCommandMoveSelectionToEndOfBlock(editorState) {
      var selection = editorState.getSelection();
      var endKey = selection.getEndKey();
      var content = editorState.getCurrentContent();
      var textLength = content.getBlockForKey(endKey).getLength();
      return EditorState.set(editorState, {
        selection: selection.merge({
          anchorKey: endKey,
          anchorOffset: textLength,
          focusKey: endKey,
          focusOffset: textLength,
          isBackward: false
        }),
        forceSelection: true
      });
    }
    module.exports = keyCommandMoveSelectionToEndOfBlock;
  }
});

// node_modules/draft-js/lib/keyCommandMoveSelectionToStartOfBlock.js
var require_keyCommandMoveSelectionToStartOfBlock = __commonJS({
  "node_modules/draft-js/lib/keyCommandMoveSelectionToStartOfBlock.js"(exports, module) {
    "use strict";
    var EditorState = require_EditorState();
    function keyCommandMoveSelectionToStartOfBlock(editorState) {
      var selection = editorState.getSelection();
      var startKey = selection.getStartKey();
      return EditorState.set(editorState, {
        selection: selection.merge({
          anchorKey: startKey,
          anchorOffset: 0,
          focusKey: startKey,
          focusOffset: 0,
          isBackward: false
        }),
        forceSelection: true
      });
    }
    module.exports = keyCommandMoveSelectionToStartOfBlock;
  }
});

// node_modules/draft-js/lib/keyCommandPlainDelete.js
var require_keyCommandPlainDelete = __commonJS({
  "node_modules/draft-js/lib/keyCommandPlainDelete.js"(exports, module) {
    "use strict";
    var EditorState = require_EditorState();
    var UnicodeUtils = require_UnicodeUtils();
    var moveSelectionForward = require_moveSelectionForward();
    var removeTextWithStrategy = require_removeTextWithStrategy();
    function keyCommandPlainDelete(editorState) {
      var afterRemoval = removeTextWithStrategy(editorState, function(strategyState) {
        var selection2 = strategyState.getSelection();
        var content = strategyState.getCurrentContent();
        var key = selection2.getAnchorKey();
        var offset = selection2.getAnchorOffset();
        var charAhead = content.getBlockForKey(key).getText()[offset];
        return moveSelectionForward(strategyState, charAhead ? UnicodeUtils.getUTF16Length(charAhead, 0) : 1);
      }, "forward");
      if (afterRemoval === editorState.getCurrentContent()) {
        return editorState;
      }
      var selection = editorState.getSelection();
      return EditorState.push(editorState, afterRemoval.set("selectionBefore", selection), selection.isCollapsed() ? "delete-character" : "remove-range");
    }
    module.exports = keyCommandPlainDelete;
  }
});

// node_modules/draft-js/lib/keyCommandTransposeCharacters.js
var require_keyCommandTransposeCharacters = __commonJS({
  "node_modules/draft-js/lib/keyCommandTransposeCharacters.js"(exports, module) {
    "use strict";
    var DraftModifier = require_DraftModifier();
    var EditorState = require_EditorState();
    var getContentStateFragment = require_getContentStateFragment();
    function keyCommandTransposeCharacters(editorState) {
      var selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
        return editorState;
      }
      var offset = selection.getAnchorOffset();
      if (offset === 0) {
        return editorState;
      }
      var blockKey = selection.getAnchorKey();
      var content = editorState.getCurrentContent();
      var block = content.getBlockForKey(blockKey);
      var length = block.getLength();
      if (length <= 1) {
        return editorState;
      }
      var removalRange;
      var finalSelection;
      if (offset === length) {
        removalRange = selection.set("anchorOffset", offset - 1);
        finalSelection = selection;
      } else {
        removalRange = selection.set("focusOffset", offset + 1);
        finalSelection = removalRange.set("anchorOffset", offset + 1);
      }
      var movedFragment = getContentStateFragment(content, removalRange);
      var afterRemoval = DraftModifier.removeRange(content, removalRange, "backward");
      var selectionAfter = afterRemoval.getSelectionAfter();
      var targetOffset = selectionAfter.getAnchorOffset() - 1;
      var targetRange = selectionAfter.merge({
        anchorOffset: targetOffset,
        focusOffset: targetOffset
      });
      var afterInsert = DraftModifier.replaceWithFragment(afterRemoval, targetRange, movedFragment);
      var newEditorState = EditorState.push(editorState, afterInsert, "insert-fragment");
      return EditorState.acceptSelection(newEditorState, finalSelection);
    }
    module.exports = keyCommandTransposeCharacters;
  }
});

// node_modules/draft-js/lib/keyCommandUndo.js
var require_keyCommandUndo = __commonJS({
  "node_modules/draft-js/lib/keyCommandUndo.js"(exports, module) {
    "use strict";
    var EditorState = require_EditorState();
    function keyCommandUndo(e, editorState, updateFn) {
      var undoneState = EditorState.undo(editorState);
      if (editorState.getLastChangeType() === "spellcheck-change") {
        var nativelyRenderedContent = undoneState.getCurrentContent();
        updateFn(EditorState.set(undoneState, {
          nativelyRenderedContent
        }));
        return;
      }
      e.preventDefault();
      if (!editorState.getNativelyRenderedContent()) {
        updateFn(undoneState);
        return;
      }
      updateFn(EditorState.set(editorState, {
        nativelyRenderedContent: null
      }));
      setTimeout(function() {
        updateFn(undoneState);
      }, 0);
    }
    module.exports = keyCommandUndo;
  }
});

// node_modules/draft-js/lib/editOnKeyDown.js
var require_editOnKeyDown = __commonJS({
  "node_modules/draft-js/lib/editOnKeyDown.js"(exports, module) {
    "use strict";
    var DraftModifier = require_DraftModifier();
    var EditorState = require_EditorState();
    var KeyBindingUtil = require_KeyBindingUtil();
    var Keys = require_Keys();
    var SecondaryClipboard = require_SecondaryClipboard();
    var UserAgent = require_UserAgent();
    var isEventHandled = require_isEventHandled();
    var keyCommandBackspaceToStartOfLine = require_keyCommandBackspaceToStartOfLine();
    var keyCommandBackspaceWord = require_keyCommandBackspaceWord();
    var keyCommandDeleteWord = require_keyCommandDeleteWord();
    var keyCommandInsertNewline = require_keyCommandInsertNewline();
    var keyCommandMoveSelectionToEndOfBlock = require_keyCommandMoveSelectionToEndOfBlock();
    var keyCommandMoveSelectionToStartOfBlock = require_keyCommandMoveSelectionToStartOfBlock();
    var keyCommandPlainBackspace = require_keyCommandPlainBackspace();
    var keyCommandPlainDelete = require_keyCommandPlainDelete();
    var keyCommandTransposeCharacters = require_keyCommandTransposeCharacters();
    var keyCommandUndo = require_keyCommandUndo();
    var isOptionKeyCommand = KeyBindingUtil.isOptionKeyCommand;
    var isChrome = UserAgent.isBrowser("Chrome");
    function onKeyCommand(command, editorState, e) {
      switch (command) {
        case "redo":
          return EditorState.redo(editorState);
        case "delete":
          return keyCommandPlainDelete(editorState);
        case "delete-word":
          return keyCommandDeleteWord(editorState);
        case "backspace":
          return keyCommandPlainBackspace(editorState);
        case "backspace-word":
          return keyCommandBackspaceWord(editorState);
        case "backspace-to-start-of-line":
          return keyCommandBackspaceToStartOfLine(editorState, e);
        case "split-block":
          return keyCommandInsertNewline(editorState);
        case "transpose-characters":
          return keyCommandTransposeCharacters(editorState);
        case "move-selection-to-start-of-block":
          return keyCommandMoveSelectionToStartOfBlock(editorState);
        case "move-selection-to-end-of-block":
          return keyCommandMoveSelectionToEndOfBlock(editorState);
        case "secondary-cut":
          return SecondaryClipboard.cut(editorState);
        case "secondary-paste":
          return SecondaryClipboard.paste(editorState);
        default:
          return editorState;
      }
    }
    function editOnKeyDown(editor, e) {
      var keyCode = e.which;
      var editorState = editor._latestEditorState;
      function callDeprecatedHandler(handlerName) {
        var deprecatedHandler = editor.props[handlerName];
        if (deprecatedHandler) {
          deprecatedHandler(e);
          return true;
        } else {
          return false;
        }
      }
      switch (keyCode) {
        case Keys.RETURN:
          e.preventDefault();
          if (editor.props.handleReturn && isEventHandled(editor.props.handleReturn(e, editorState))) {
            return;
          }
          break;
        case Keys.ESC:
          e.preventDefault();
          if (callDeprecatedHandler("onEscape")) {
            return;
          }
          break;
        case Keys.TAB:
          if (callDeprecatedHandler("onTab")) {
            return;
          }
          break;
        case Keys.UP:
          if (callDeprecatedHandler("onUpArrow")) {
            return;
          }
          break;
        case Keys.RIGHT:
          if (callDeprecatedHandler("onRightArrow")) {
            return;
          }
          break;
        case Keys.DOWN:
          if (callDeprecatedHandler("onDownArrow")) {
            return;
          }
          break;
        case Keys.LEFT:
          if (callDeprecatedHandler("onLeftArrow")) {
            return;
          }
          break;
        case Keys.SPACE:
          if (isChrome && isOptionKeyCommand(e)) {
            e.preventDefault();
          }
      }
      var command = editor.props.keyBindingFn(e);
      if (command == null || command === "") {
        if (keyCode === Keys.SPACE && isChrome && isOptionKeyCommand(e)) {
          var contentState = DraftModifier.replaceText(editorState.getCurrentContent(), editorState.getSelection(), " ");
          editor.update(EditorState.push(editorState, contentState, "insert-characters"));
        }
        return;
      }
      if (command === "undo") {
        keyCommandUndo(e, editorState, editor.update);
        return;
      }
      e.preventDefault();
      if (editor.props.handleKeyCommand && isEventHandled(editor.props.handleKeyCommand(command, editorState, e.timeStamp))) {
        return;
      }
      var newState = onKeyCommand(command, editorState, e);
      if (newState !== editorState) {
        editor.update(newState);
      }
    }
    module.exports = editOnKeyDown;
  }
});

// node_modules/fbjs/lib/URI.js
var require_URI = __commonJS({
  "node_modules/fbjs/lib/URI.js"(exports, module) {
    "use strict";
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var URI = function() {
      function URI2(uri) {
        _defineProperty(this, "_uri", void 0);
        this._uri = uri;
      }
      var _proto = URI2.prototype;
      _proto.toString = function toString() {
        return this._uri;
      };
      return URI2;
    }();
    module.exports = URI;
  }
});

// node_modules/draft-js/lib/getSafeBodyFromHTML.js
var require_getSafeBodyFromHTML = __commonJS({
  "node_modules/draft-js/lib/getSafeBodyFromHTML.js"(exports, module) {
    "use strict";
    var UserAgent = require_UserAgent();
    var invariant = require_invariant();
    var isOldIE = UserAgent.isBrowser("IE <= 9");
    function getSafeBodyFromHTML(html) {
      var doc;
      var root = null;
      if (!isOldIE && document.implementation && document.implementation.createHTMLDocument) {
        doc = document.implementation.createHTMLDocument("foo");
        !doc.documentElement ? true ? invariant(false, "Missing doc.documentElement") : invariant(false) : void 0;
        doc.documentElement.innerHTML = html;
        root = doc.getElementsByTagName("body")[0];
      }
      return root;
    }
    module.exports = getSafeBodyFromHTML;
  }
});

// node_modules/draft-js/lib/isHTMLAnchorElement.js
var require_isHTMLAnchorElement = __commonJS({
  "node_modules/draft-js/lib/isHTMLAnchorElement.js"(exports, module) {
    "use strict";
    var isElement = require_isElement();
    function isHTMLAnchorElement(node) {
      if (!node || !node.ownerDocument) {
        return false;
      }
      return isElement(node) && node.nodeName === "A";
    }
    module.exports = isHTMLAnchorElement;
  }
});

// node_modules/draft-js/lib/isHTMLImageElement.js
var require_isHTMLImageElement = __commonJS({
  "node_modules/draft-js/lib/isHTMLImageElement.js"(exports, module) {
    "use strict";
    var isElement = require_isElement();
    function isHTMLImageElement(node) {
      if (!node || !node.ownerDocument) {
        return false;
      }
      return isElement(node) && node.nodeName === "IMG";
    }
    module.exports = isHTMLImageElement;
  }
});

// node_modules/draft-js/lib/convertFromHTMLToContentBlocks.js
var require_convertFromHTMLToContentBlocks = __commonJS({
  "node_modules/draft-js/lib/convertFromHTMLToContentBlocks.js"(exports, module) {
    "use strict";
    var _knownListItemDepthCl;
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var CharacterMetadata = require_CharacterMetadata();
    var ContentBlock = require_ContentBlock();
    var ContentBlockNode = require_ContentBlockNode();
    var DefaultDraftBlockRenderMap = require_DefaultDraftBlockRenderMap();
    var DraftEntity = require_DraftEntity();
    var URI = require_URI();
    var cx = require_cx();
    var generateRandomKey = require_generateRandomKey();
    var getSafeBodyFromHTML = require_getSafeBodyFromHTML();
    var gkx = require_gkx();
    var _require = require_immutable();
    var List = _require.List;
    var Map = _require.Map;
    var OrderedSet = _require.OrderedSet;
    var isHTMLAnchorElement = require_isHTMLAnchorElement();
    var isHTMLBRElement = require_isHTMLBRElement();
    var isHTMLElement = require_isHTMLElement();
    var isHTMLImageElement = require_isHTMLImageElement();
    var experimentalTreeDataSupport = gkx("draft_tree_data_support");
    var NBSP = "&nbsp;";
    var SPACE = " ";
    var REGEX_CR = new RegExp("\r", "g");
    var REGEX_LF = new RegExp("\n", "g");
    var REGEX_LEADING_LF = new RegExp("^\n", "g");
    var REGEX_NBSP = new RegExp(NBSP, "g");
    var REGEX_CARRIAGE = new RegExp("&#13;?", "g");
    var REGEX_ZWS = new RegExp("&#8203;?", "g");
    var boldValues = ["bold", "bolder", "500", "600", "700", "800", "900"];
    var notBoldValues = ["light", "lighter", "normal", "100", "200", "300", "400"];
    var anchorAttr = ["className", "href", "rel", "target", "title"];
    var imgAttr = ["alt", "className", "height", "src", "width"];
    var knownListItemDepthClasses = (_knownListItemDepthCl = {}, _defineProperty(_knownListItemDepthCl, cx("public/DraftStyleDefault/depth0"), 0), _defineProperty(_knownListItemDepthCl, cx("public/DraftStyleDefault/depth1"), 1), _defineProperty(_knownListItemDepthCl, cx("public/DraftStyleDefault/depth2"), 2), _defineProperty(_knownListItemDepthCl, cx("public/DraftStyleDefault/depth3"), 3), _defineProperty(_knownListItemDepthCl, cx("public/DraftStyleDefault/depth4"), 4), _knownListItemDepthCl);
    var HTMLTagToRawInlineStyleMap = Map({
      b: "BOLD",
      code: "CODE",
      del: "STRIKETHROUGH",
      em: "ITALIC",
      i: "ITALIC",
      s: "STRIKETHROUGH",
      strike: "STRIKETHROUGH",
      strong: "BOLD",
      u: "UNDERLINE",
      mark: "HIGHLIGHT"
    });
    var buildBlockTypeMap = function buildBlockTypeMap2(blockRenderMap) {
      var blockTypeMap = {};
      blockRenderMap.mapKeys(function(blockType, desc) {
        var elements = [desc.element];
        if (desc.aliasedElements !== void 0) {
          elements.push.apply(elements, desc.aliasedElements);
        }
        elements.forEach(function(element) {
          if (blockTypeMap[element] === void 0) {
            blockTypeMap[element] = blockType;
          } else if (typeof blockTypeMap[element] === "string") {
            blockTypeMap[element] = [blockTypeMap[element], blockType];
          } else {
            blockTypeMap[element].push(blockType);
          }
        });
      });
      return Map(blockTypeMap);
    };
    var detectInlineStyle = function detectInlineStyle2(node) {
      if (isHTMLElement(node)) {
        var element = node;
        if (element.style.fontFamily.includes("monospace")) {
          return "CODE";
        }
      }
      return null;
    };
    var getListItemDepth = function getListItemDepth2(node) {
      var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      Object.keys(knownListItemDepthClasses).some(function(depthClass) {
        if (node.classList.contains(depthClass)) {
          depth = knownListItemDepthClasses[depthClass];
        }
      });
      return depth;
    };
    var isValidAnchor = function isValidAnchor2(node) {
      if (!isHTMLAnchorElement(node)) {
        return false;
      }
      var anchorNode = node;
      if (!anchorNode.href || anchorNode.protocol !== "http:" && anchorNode.protocol !== "https:" && anchorNode.protocol !== "mailto:" && anchorNode.protocol !== "tel:") {
        return false;
      }
      try {
        var _ = new URI(anchorNode.href);
        return true;
      } catch (_2) {
        return false;
      }
    };
    var isValidImage = function isValidImage2(node) {
      if (!isHTMLImageElement(node)) {
        return false;
      }
      var imageNode = node;
      return !!(imageNode.attributes.getNamedItem("src") && imageNode.attributes.getNamedItem("src").value);
    };
    var styleFromNodeAttributes = function styleFromNodeAttributes2(node, style) {
      if (!isHTMLElement(node)) {
        return style;
      }
      var htmlElement = node;
      var fontWeight = htmlElement.style.fontWeight;
      var fontStyle = htmlElement.style.fontStyle;
      var textDecoration = htmlElement.style.textDecoration;
      return style.withMutations(function(style2) {
        if (boldValues.indexOf(fontWeight) >= 0) {
          style2.add("BOLD");
        } else if (notBoldValues.indexOf(fontWeight) >= 0) {
          style2.remove("BOLD");
        }
        if (fontStyle === "italic") {
          style2.add("ITALIC");
        } else if (fontStyle === "normal") {
          style2.remove("ITALIC");
        }
        if (textDecoration === "underline") {
          style2.add("UNDERLINE");
        }
        if (textDecoration === "line-through") {
          style2.add("STRIKETHROUGH");
        }
        if (textDecoration === "none") {
          style2.remove("UNDERLINE");
          style2.remove("STRIKETHROUGH");
        }
      });
    };
    var isListNode = function isListNode2(nodeName) {
      return nodeName === "ul" || nodeName === "ol";
    };
    var ContentBlocksBuilder = function() {
      function ContentBlocksBuilder2(blockTypeMap, disambiguate) {
        _defineProperty(this, "characterList", List());
        _defineProperty(this, "currentBlockType", "unstyled");
        _defineProperty(this, "currentDepth", 0);
        _defineProperty(this, "currentEntity", null);
        _defineProperty(this, "currentText", "");
        _defineProperty(this, "wrapper", null);
        _defineProperty(this, "blockConfigs", []);
        _defineProperty(this, "contentBlocks", []);
        _defineProperty(this, "entityMap", DraftEntity);
        _defineProperty(this, "blockTypeMap", void 0);
        _defineProperty(this, "disambiguate", void 0);
        this.clear();
        this.blockTypeMap = blockTypeMap;
        this.disambiguate = disambiguate;
      }
      var _proto = ContentBlocksBuilder2.prototype;
      _proto.clear = function clear() {
        this.characterList = List();
        this.blockConfigs = [];
        this.currentBlockType = "unstyled";
        this.currentDepth = 0;
        this.currentEntity = null;
        this.currentText = "";
        this.entityMap = DraftEntity;
        this.wrapper = null;
        this.contentBlocks = [];
      };
      _proto.addDOMNode = function addDOMNode(node) {
        var _this$blockConfigs;
        this.contentBlocks = [];
        this.currentDepth = 0;
        (_this$blockConfigs = this.blockConfigs).push.apply(_this$blockConfigs, this._toBlockConfigs([node], OrderedSet()));
        this._trimCurrentText();
        if (this.currentText !== "") {
          this.blockConfigs.push(this._makeBlockConfig());
        }
        return this;
      };
      _proto.getContentBlocks = function getContentBlocks() {
        if (this.contentBlocks.length === 0) {
          if (experimentalTreeDataSupport) {
            this._toContentBlocks(this.blockConfigs);
          } else {
            this._toFlatContentBlocks(this.blockConfigs);
          }
        }
        return {
          contentBlocks: this.contentBlocks,
          entityMap: this.entityMap
        };
      };
      _proto._makeBlockConfig = function _makeBlockConfig() {
        var config = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var key = config.key || generateRandomKey();
        var block = _objectSpread({
          key,
          type: this.currentBlockType,
          text: this.currentText,
          characterList: this.characterList,
          depth: this.currentDepth,
          parent: null,
          children: List(),
          prevSibling: null,
          nextSibling: null,
          childConfigs: []
        }, config);
        this.characterList = List();
        this.currentBlockType = "unstyled";
        this.currentText = "";
        return block;
      };
      _proto._toBlockConfigs = function _toBlockConfigs(nodes, style) {
        var blockConfigs = [];
        for (var i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          var nodeName = node.nodeName.toLowerCase();
          if (nodeName === "body" || isListNode(nodeName)) {
            this._trimCurrentText();
            if (this.currentText !== "") {
              blockConfigs.push(this._makeBlockConfig());
            }
            var wasCurrentDepth = this.currentDepth;
            var wasWrapper = this.wrapper;
            if (isListNode(nodeName)) {
              this.wrapper = nodeName;
              if (isListNode(wasWrapper)) {
                this.currentDepth++;
              }
            }
            blockConfigs.push.apply(blockConfigs, this._toBlockConfigs(Array.from(node.childNodes), style));
            this.currentDepth = wasCurrentDepth;
            this.wrapper = wasWrapper;
            continue;
          }
          var blockType = this.blockTypeMap.get(nodeName);
          if (blockType !== void 0) {
            this._trimCurrentText();
            if (this.currentText !== "") {
              blockConfigs.push(this._makeBlockConfig());
            }
            var _wasCurrentDepth = this.currentDepth;
            var _wasWrapper = this.wrapper;
            this.wrapper = nodeName === "pre" ? "pre" : this.wrapper;
            if (typeof blockType !== "string") {
              blockType = this.disambiguate(nodeName, this.wrapper) || blockType[0] || "unstyled";
            }
            if (!experimentalTreeDataSupport && isHTMLElement(node) && (blockType === "unordered-list-item" || blockType === "ordered-list-item")) {
              var htmlElement = node;
              this.currentDepth = getListItemDepth(htmlElement, this.currentDepth);
            }
            var key = generateRandomKey();
            var childConfigs = this._toBlockConfigs(Array.from(node.childNodes), style);
            this._trimCurrentText();
            blockConfigs.push(this._makeBlockConfig({
              key,
              childConfigs,
              type: blockType
            }));
            this.currentDepth = _wasCurrentDepth;
            this.wrapper = _wasWrapper;
            continue;
          }
          if (nodeName === "#text") {
            this._addTextNode(node, style);
            continue;
          }
          if (nodeName === "br") {
            this._addBreakNode(node, style);
            continue;
          }
          if (isValidImage(node)) {
            this._addImgNode(node, style);
            continue;
          }
          if (isValidAnchor(node)) {
            this._addAnchorNode(node, blockConfigs, style);
            continue;
          }
          var newStyle = style;
          if (HTMLTagToRawInlineStyleMap.has(nodeName)) {
            newStyle = newStyle.add(HTMLTagToRawInlineStyleMap.get(nodeName));
          }
          newStyle = styleFromNodeAttributes(node, newStyle);
          var inlineStyle = detectInlineStyle(node);
          if (inlineStyle != null) {
            newStyle = newStyle.add(inlineStyle);
          }
          blockConfigs.push.apply(blockConfigs, this._toBlockConfigs(Array.from(node.childNodes), newStyle));
        }
        return blockConfigs;
      };
      _proto._appendText = function _appendText(text, style) {
        var _this$characterList;
        this.currentText += text;
        var characterMetadata = CharacterMetadata.create({
          style,
          entity: this.currentEntity
        });
        this.characterList = (_this$characterList = this.characterList).push.apply(_this$characterList, Array(text.length).fill(characterMetadata));
      };
      _proto._trimCurrentText = function _trimCurrentText() {
        var l = this.currentText.length;
        var begin = l - this.currentText.trimLeft().length;
        var end = this.currentText.trimRight().length;
        var entity = this.characterList.findEntry(function(characterMetadata) {
          return characterMetadata.getEntity() !== null;
        });
        begin = entity !== void 0 ? Math.min(begin, entity[0]) : begin;
        entity = this.characterList.reverse().findEntry(function(characterMetadata) {
          return characterMetadata.getEntity() !== null;
        });
        end = entity !== void 0 ? Math.max(end, l - entity[0]) : end;
        if (begin > end) {
          this.currentText = "";
          this.characterList = List();
        } else {
          this.currentText = this.currentText.slice(begin, end);
          this.characterList = this.characterList.slice(begin, end);
        }
      };
      _proto._addTextNode = function _addTextNode(node, style) {
        var text = node.textContent;
        var trimmedText = text.trim();
        if (trimmedText === "" && this.wrapper !== "pre") {
          text = " ";
        }
        if (this.wrapper !== "pre") {
          text = text.replace(REGEX_LEADING_LF, "");
          text = text.replace(REGEX_LF, SPACE);
        }
        this._appendText(text, style);
      };
      _proto._addBreakNode = function _addBreakNode(node, style) {
        if (!isHTMLBRElement(node)) {
          return;
        }
        this._appendText("\n", style);
      };
      _proto._addImgNode = function _addImgNode(node, style) {
        if (!isHTMLImageElement(node)) {
          return;
        }
        var image = node;
        var entityConfig = {};
        imgAttr.forEach(function(attr) {
          var imageAttribute = image.getAttribute(attr);
          if (imageAttribute) {
            entityConfig[attr] = imageAttribute;
          }
        });
        this.currentEntity = this.entityMap.__create("IMAGE", "IMMUTABLE", entityConfig);
        if (gkx("draftjs_fix_paste_for_img")) {
          if (image.getAttribute("role") !== "presentation") {
            this._appendText("📷", style);
          }
        } else {
          this._appendText("📷", style);
        }
        this.currentEntity = null;
      };
      _proto._addAnchorNode = function _addAnchorNode(node, blockConfigs, style) {
        if (!isHTMLAnchorElement(node)) {
          return;
        }
        var anchor = node;
        var entityConfig = {};
        anchorAttr.forEach(function(attr) {
          var anchorAttribute = anchor.getAttribute(attr);
          if (anchorAttribute) {
            entityConfig[attr] = anchorAttribute;
          }
        });
        entityConfig.url = new URI(anchor.href).toString();
        this.currentEntity = this.entityMap.__create("LINK", "MUTABLE", entityConfig || {});
        blockConfigs.push.apply(blockConfigs, this._toBlockConfigs(Array.from(node.childNodes), style));
        this.currentEntity = null;
      };
      _proto._toContentBlocks = function _toContentBlocks(blockConfigs) {
        var parent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var l = blockConfigs.length - 1;
        for (var i = 0; i <= l; i++) {
          var config = blockConfigs[i];
          config.parent = parent;
          config.prevSibling = i > 0 ? blockConfigs[i - 1].key : null;
          config.nextSibling = i < l ? blockConfigs[i + 1].key : null;
          config.children = List(config.childConfigs.map(function(child) {
            return child.key;
          }));
          this.contentBlocks.push(new ContentBlockNode(_objectSpread({}, config)));
          this._toContentBlocks(config.childConfigs, config.key);
        }
      };
      _proto._hoistContainersInBlockConfigs = function _hoistContainersInBlockConfigs(blockConfigs) {
        var _this = this;
        var hoisted = List(blockConfigs).flatMap(function(blockConfig) {
          if (blockConfig.type !== "unstyled" || blockConfig.text !== "") {
            return [blockConfig];
          }
          return _this._hoistContainersInBlockConfigs(blockConfig.childConfigs);
        });
        return hoisted;
      };
      _proto._toFlatContentBlocks = function _toFlatContentBlocks(blockConfigs) {
        var _this2 = this;
        var cleanConfigs = this._hoistContainersInBlockConfigs(blockConfigs);
        cleanConfigs.forEach(function(config) {
          var _this2$_extractTextFr = _this2._extractTextFromBlockConfigs(config.childConfigs), text = _this2$_extractTextFr.text, characterList = _this2$_extractTextFr.characterList;
          _this2.contentBlocks.push(new ContentBlock(_objectSpread({}, config, {
            text: config.text + text,
            characterList: config.characterList.concat(characterList)
          })));
        });
      };
      _proto._extractTextFromBlockConfigs = function _extractTextFromBlockConfigs(blockConfigs) {
        var l = blockConfigs.length - 1;
        var text = "";
        var characterList = List();
        for (var i = 0; i <= l; i++) {
          var config = blockConfigs[i];
          text += config.text;
          characterList = characterList.concat(config.characterList);
          if (text !== "" && config.type !== "unstyled") {
            text += "\n";
            characterList = characterList.push(characterList.last());
          }
          var children = this._extractTextFromBlockConfigs(config.childConfigs);
          text += children.text;
          characterList = characterList.concat(children.characterList);
        }
        return {
          text,
          characterList
        };
      };
      return ContentBlocksBuilder2;
    }();
    var convertFromHTMLToContentBlocks = function convertFromHTMLToContentBlocks2(html) {
      var DOMBuilder = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getSafeBodyFromHTML;
      var blockRenderMap = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : DefaultDraftBlockRenderMap;
      html = html.trim().replace(REGEX_CR, "").replace(REGEX_NBSP, SPACE).replace(REGEX_CARRIAGE, "").replace(REGEX_ZWS, "");
      var safeBody = DOMBuilder(html);
      if (!safeBody) {
        return null;
      }
      var blockTypeMap = buildBlockTypeMap(blockRenderMap);
      var disambiguate = function disambiguate2(tag, wrapper) {
        if (tag === "li") {
          return wrapper === "ol" ? "ordered-list-item" : "unordered-list-item";
        }
        return null;
      };
      return new ContentBlocksBuilder(blockTypeMap, disambiguate).addDOMNode(safeBody).getContentBlocks();
    };
    module.exports = convertFromHTMLToContentBlocks;
  }
});

// node_modules/draft-js/lib/DraftPasteProcessor.js
var require_DraftPasteProcessor = __commonJS({
  "node_modules/draft-js/lib/DraftPasteProcessor.js"(exports, module) {
    "use strict";
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var ContentBlock = require_ContentBlock();
    var ContentBlockNode = require_ContentBlockNode();
    var convertFromHTMLToContentBlocks = require_convertFromHTMLToContentBlocks();
    var generateRandomKey = require_generateRandomKey();
    var getSafeBodyFromHTML = require_getSafeBodyFromHTML();
    var gkx = require_gkx();
    var Immutable = require_immutable();
    var sanitizeDraftText = require_sanitizeDraftText();
    var List = Immutable.List;
    var Repeat = Immutable.Repeat;
    var experimentalTreeDataSupport = gkx("draft_tree_data_support");
    var ContentBlockRecord = experimentalTreeDataSupport ? ContentBlockNode : ContentBlock;
    var DraftPasteProcessor = {
      processHTML: function processHTML(html, blockRenderMap) {
        return convertFromHTMLToContentBlocks(html, getSafeBodyFromHTML, blockRenderMap);
      },
      processText: function processText(textBlocks, character, type) {
        return textBlocks.reduce(function(acc, textLine, index) {
          textLine = sanitizeDraftText(textLine);
          var key = generateRandomKey();
          var blockNodeConfig = {
            key,
            type,
            text: textLine,
            characterList: List(Repeat(character, textLine.length))
          };
          if (experimentalTreeDataSupport && index !== 0) {
            var prevSiblingIndex = index - 1;
            var previousBlock = acc[prevSiblingIndex] = acc[prevSiblingIndex].merge({
              nextSibling: key
            });
            blockNodeConfig = _objectSpread({}, blockNodeConfig, {
              prevSibling: previousBlock.getKey()
            });
          }
          acc.push(new ContentBlockRecord(blockNodeConfig));
          return acc;
        }, []);
      }
    };
    module.exports = DraftPasteProcessor;
  }
});

// node_modules/draft-js/lib/adjustBlockDepthForContentState.js
var require_adjustBlockDepthForContentState = __commonJS({
  "node_modules/draft-js/lib/adjustBlockDepthForContentState.js"(exports, module) {
    "use strict";
    function adjustBlockDepthForContentState(contentState, selectionState, adjustment, maxDepth) {
      var startKey = selectionState.getStartKey();
      var endKey = selectionState.getEndKey();
      var blockMap = contentState.getBlockMap();
      var blocks = blockMap.toSeq().skipUntil(function(_, k) {
        return k === startKey;
      }).takeUntil(function(_, k) {
        return k === endKey;
      }).concat([[endKey, blockMap.get(endKey)]]).map(function(block) {
        var depth = block.getDepth() + adjustment;
        depth = Math.max(0, Math.min(depth, maxDepth));
        return block.set("depth", depth);
      });
      blockMap = blockMap.merge(blocks);
      return contentState.merge({
        blockMap,
        selectionBefore: selectionState,
        selectionAfter: selectionState
      });
    }
    module.exports = adjustBlockDepthForContentState;
  }
});

// node_modules/draft-js/lib/RichTextEditorUtil.js
var require_RichTextEditorUtil = __commonJS({
  "node_modules/draft-js/lib/RichTextEditorUtil.js"(exports, module) {
    "use strict";
    var DraftModifier = require_DraftModifier();
    var EditorState = require_EditorState();
    var adjustBlockDepthForContentState = require_adjustBlockDepthForContentState();
    var nullthrows = require_nullthrows();
    var RichTextEditorUtil = {
      currentBlockContainsLink: function currentBlockContainsLink(editorState) {
        var selection = editorState.getSelection();
        var contentState = editorState.getCurrentContent();
        var entityMap = contentState.getEntityMap();
        return contentState.getBlockForKey(selection.getAnchorKey()).getCharacterList().slice(selection.getStartOffset(), selection.getEndOffset()).some(function(v) {
          var entity = v.getEntity();
          return !!entity && entityMap.__get(entity).getType() === "LINK";
        });
      },
      getCurrentBlockType: function getCurrentBlockType(editorState) {
        var selection = editorState.getSelection();
        return editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
      },
      getDataObjectForLinkURL: function getDataObjectForLinkURL(uri) {
        return {
          url: uri.toString()
        };
      },
      handleKeyCommand: function handleKeyCommand(editorState, command, eventTimeStamp) {
        switch (command) {
          case "bold":
            return RichTextEditorUtil.toggleInlineStyle(editorState, "BOLD");
          case "italic":
            return RichTextEditorUtil.toggleInlineStyle(editorState, "ITALIC");
          case "underline":
            return RichTextEditorUtil.toggleInlineStyle(editorState, "UNDERLINE");
          case "code":
            return RichTextEditorUtil.toggleCode(editorState);
          case "backspace":
          case "backspace-word":
          case "backspace-to-start-of-line":
            return RichTextEditorUtil.onBackspace(editorState);
          case "delete":
          case "delete-word":
          case "delete-to-end-of-block":
            return RichTextEditorUtil.onDelete(editorState);
          default:
            return null;
        }
      },
      insertSoftNewline: function insertSoftNewline(editorState) {
        var contentState = DraftModifier.insertText(editorState.getCurrentContent(), editorState.getSelection(), "\n", editorState.getCurrentInlineStyle(), null);
        var newEditorState = EditorState.push(editorState, contentState, "insert-characters");
        return EditorState.forceSelection(newEditorState, contentState.getSelectionAfter());
      },
      /**
       * For collapsed selections at the start of styled blocks, backspace should
       * just remove the existing style.
       */
      onBackspace: function onBackspace(editorState) {
        var selection = editorState.getSelection();
        if (!selection.isCollapsed() || selection.getAnchorOffset() || selection.getFocusOffset()) {
          return null;
        }
        var content = editorState.getCurrentContent();
        var startKey = selection.getStartKey();
        var blockBefore = content.getBlockBefore(startKey);
        if (blockBefore && blockBefore.getType() === "atomic") {
          var blockMap = content.getBlockMap()["delete"](blockBefore.getKey());
          var withoutAtomicBlock = content.merge({
            blockMap,
            selectionAfter: selection
          });
          if (withoutAtomicBlock !== content) {
            return EditorState.push(editorState, withoutAtomicBlock, "remove-range");
          }
        }
        var withoutBlockStyle = RichTextEditorUtil.tryToRemoveBlockStyle(editorState);
        if (withoutBlockStyle) {
          return EditorState.push(editorState, withoutBlockStyle, "change-block-type");
        }
        return null;
      },
      onDelete: function onDelete(editorState) {
        var selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
          return null;
        }
        var content = editorState.getCurrentContent();
        var startKey = selection.getStartKey();
        var block = content.getBlockForKey(startKey);
        var length = block.getLength();
        if (selection.getStartOffset() < length) {
          return null;
        }
        var blockAfter = content.getBlockAfter(startKey);
        if (!blockAfter || blockAfter.getType() !== "atomic") {
          return null;
        }
        var atomicBlockTarget = selection.merge({
          focusKey: blockAfter.getKey(),
          focusOffset: blockAfter.getLength()
        });
        var withoutAtomicBlock = DraftModifier.removeRange(content, atomicBlockTarget, "forward");
        if (withoutAtomicBlock !== content) {
          return EditorState.push(editorState, withoutAtomicBlock, "remove-range");
        }
        return null;
      },
      onTab: function onTab(event, editorState, maxDepth) {
        var selection = editorState.getSelection();
        var key = selection.getAnchorKey();
        if (key !== selection.getFocusKey()) {
          return editorState;
        }
        var content = editorState.getCurrentContent();
        var block = content.getBlockForKey(key);
        var type = block.getType();
        if (type !== "unordered-list-item" && type !== "ordered-list-item") {
          return editorState;
        }
        event.preventDefault();
        var depth = block.getDepth();
        if (!event.shiftKey && depth === maxDepth) {
          return editorState;
        }
        var withAdjustment = adjustBlockDepthForContentState(content, selection, event.shiftKey ? -1 : 1, maxDepth);
        return EditorState.push(editorState, withAdjustment, "adjust-depth");
      },
      toggleBlockType: function toggleBlockType(editorState, blockType) {
        var selection = editorState.getSelection();
        var startKey = selection.getStartKey();
        var endKey = selection.getEndKey();
        var content = editorState.getCurrentContent();
        var target = selection;
        if (startKey !== endKey && selection.getEndOffset() === 0) {
          var blockBefore = nullthrows(content.getBlockBefore(endKey));
          endKey = blockBefore.getKey();
          target = target.merge({
            anchorKey: startKey,
            anchorOffset: selection.getStartOffset(),
            focusKey: endKey,
            focusOffset: blockBefore.getLength(),
            isBackward: false
          });
        }
        var hasAtomicBlock = content.getBlockMap().skipWhile(function(_, k) {
          return k !== startKey;
        }).reverse().skipWhile(function(_, k) {
          return k !== endKey;
        }).some(function(v) {
          return v.getType() === "atomic";
        });
        if (hasAtomicBlock) {
          return editorState;
        }
        var typeToSet = content.getBlockForKey(startKey).getType() === blockType ? "unstyled" : blockType;
        return EditorState.push(editorState, DraftModifier.setBlockType(content, target, typeToSet), "change-block-type");
      },
      toggleCode: function toggleCode(editorState) {
        var selection = editorState.getSelection();
        var anchorKey = selection.getAnchorKey();
        var focusKey = selection.getFocusKey();
        if (selection.isCollapsed() || anchorKey !== focusKey) {
          return RichTextEditorUtil.toggleBlockType(editorState, "code-block");
        }
        return RichTextEditorUtil.toggleInlineStyle(editorState, "CODE");
      },
      /**
       * Toggle the specified inline style for the selection. If the
       * user's selection is collapsed, apply or remove the style for the
       * internal state. If it is not collapsed, apply the change directly
       * to the document state.
       */
      toggleInlineStyle: function toggleInlineStyle(editorState, inlineStyle) {
        var selection = editorState.getSelection();
        var currentStyle = editorState.getCurrentInlineStyle();
        if (selection.isCollapsed()) {
          return EditorState.setInlineStyleOverride(editorState, currentStyle.has(inlineStyle) ? currentStyle.remove(inlineStyle) : currentStyle.add(inlineStyle));
        }
        var content = editorState.getCurrentContent();
        var newContent;
        if (currentStyle.has(inlineStyle)) {
          newContent = DraftModifier.removeInlineStyle(content, selection, inlineStyle);
        } else {
          newContent = DraftModifier.applyInlineStyle(content, selection, inlineStyle);
        }
        return EditorState.push(editorState, newContent, "change-inline-style");
      },
      toggleLink: function toggleLink(editorState, targetSelection, entityKey) {
        var withoutLink = DraftModifier.applyEntity(editorState.getCurrentContent(), targetSelection, entityKey);
        return EditorState.push(editorState, withoutLink, "apply-entity");
      },
      /**
       * When a collapsed cursor is at the start of a styled block, changes block
       * type to 'unstyled'. Returns null if selection does not meet that criteria.
       */
      tryToRemoveBlockStyle: function tryToRemoveBlockStyle(editorState) {
        var selection = editorState.getSelection();
        var offset = selection.getAnchorOffset();
        if (selection.isCollapsed() && offset === 0) {
          var key = selection.getAnchorKey();
          var content = editorState.getCurrentContent();
          var block = content.getBlockForKey(key);
          var type = block.getType();
          var blockBefore = content.getBlockBefore(key);
          if (type === "code-block" && blockBefore && blockBefore.getType() === "code-block" && blockBefore.getLength() !== 0) {
            return null;
          }
          if (type !== "unstyled") {
            return DraftModifier.setBlockType(content, selection, "unstyled");
          }
        }
        return null;
      }
    };
    module.exports = RichTextEditorUtil;
  }
});

// node_modules/draft-js/lib/splitTextIntoTextBlocks.js
var require_splitTextIntoTextBlocks = __commonJS({
  "node_modules/draft-js/lib/splitTextIntoTextBlocks.js"(exports, module) {
    "use strict";
    var NEWLINE_REGEX = /\r\n?|\n/g;
    function splitTextIntoTextBlocks(text) {
      return text.split(NEWLINE_REGEX);
    }
    module.exports = splitTextIntoTextBlocks;
  }
});

// node_modules/draft-js/lib/editOnPaste.js
var require_editOnPaste = __commonJS({
  "node_modules/draft-js/lib/editOnPaste.js"(exports, module) {
    "use strict";
    var BlockMapBuilder = require_BlockMapBuilder();
    var CharacterMetadata = require_CharacterMetadata();
    var DataTransfer = require_DataTransfer();
    var DraftModifier = require_DraftModifier();
    var DraftPasteProcessor = require_DraftPasteProcessor();
    var EditorState = require_EditorState();
    var RichTextEditorUtil = require_RichTextEditorUtil();
    var getEntityKeyForSelection = require_getEntityKeyForSelection();
    var getTextContentFromFiles = require_getTextContentFromFiles();
    var isEventHandled = require_isEventHandled();
    var splitTextIntoTextBlocks = require_splitTextIntoTextBlocks();
    function editOnPaste(editor, e) {
      e.preventDefault();
      var data = new DataTransfer(e.clipboardData);
      if (!data.isRichText()) {
        var files = data.getFiles();
        var defaultFileText = data.getText();
        if (files.length > 0) {
          if (editor.props.handlePastedFiles && isEventHandled(editor.props.handlePastedFiles(files))) {
            return;
          }
          getTextContentFromFiles(files, function(fileText) {
            fileText = fileText || defaultFileText;
            if (!fileText) {
              return;
            }
            var editorState2 = editor._latestEditorState;
            var blocks = splitTextIntoTextBlocks(fileText);
            var character2 = CharacterMetadata.create({
              style: editorState2.getCurrentInlineStyle(),
              entity: getEntityKeyForSelection(editorState2.getCurrentContent(), editorState2.getSelection())
            });
            var currentBlockType2 = RichTextEditorUtil.getCurrentBlockType(editorState2);
            var text2 = DraftPasteProcessor.processText(blocks, character2, currentBlockType2);
            var fragment = BlockMapBuilder.createFromArray(text2);
            var withInsertedText = DraftModifier.replaceWithFragment(editorState2.getCurrentContent(), editorState2.getSelection(), fragment);
            editor.update(EditorState.push(editorState2, withInsertedText, "insert-fragment"));
          });
          return;
        }
      }
      var textBlocks = [];
      var text = data.getText();
      var html = data.getHTML();
      var editorState = editor._latestEditorState;
      if (editor.props.formatPastedText) {
        var _editor$props$formatP = editor.props.formatPastedText(text, html), formattedText = _editor$props$formatP.text, formattedHtml = _editor$props$formatP.html;
        text = formattedText;
        html = formattedHtml;
      }
      if (editor.props.handlePastedText && isEventHandled(editor.props.handlePastedText(text, html, editorState))) {
        return;
      }
      if (text) {
        textBlocks = splitTextIntoTextBlocks(text);
      }
      if (!editor.props.stripPastedStyles) {
        var internalClipboard = editor.getClipboard();
        if (!editor.props.formatPastedText && data.isRichText() && internalClipboard) {
          var _html;
          if (
            // If the editorKey is present in the pasted HTML, it should be safe to
            // assume this is an internal paste.
            ((_html = html) === null || _html === void 0 ? void 0 : _html.indexOf(editor.getEditorKey())) !== -1 || // The copy may have been made within a single block, in which case the
            // editor key won't be part of the paste. In this case, just check
            // whether the pasted text matches the internal clipboard.
            textBlocks.length === 1 && internalClipboard.size === 1 && internalClipboard.first().getText() === text
          ) {
            editor.update(insertFragment(editor._latestEditorState, internalClipboard));
            return;
          }
        } else if (internalClipboard && data.types.includes("com.apple.webarchive") && !data.types.includes("text/html") && areTextBlocksAndClipboardEqual(textBlocks, internalClipboard)) {
          editor.update(insertFragment(editor._latestEditorState, internalClipboard));
          return;
        }
        if (html) {
          var htmlFragment = DraftPasteProcessor.processHTML(html, editor.props.blockRenderMap);
          if (htmlFragment) {
            var contentBlocks = htmlFragment.contentBlocks, entityMap = htmlFragment.entityMap;
            if (contentBlocks) {
              var htmlMap = BlockMapBuilder.createFromArray(contentBlocks);
              editor.update(insertFragment(editor._latestEditorState, htmlMap, entityMap));
              return;
            }
          }
        }
        editor.setClipboard(null);
      }
      if (textBlocks.length) {
        var character = CharacterMetadata.create({
          style: editorState.getCurrentInlineStyle(),
          entity: getEntityKeyForSelection(editorState.getCurrentContent(), editorState.getSelection())
        });
        var currentBlockType = RichTextEditorUtil.getCurrentBlockType(editorState);
        var textFragment = DraftPasteProcessor.processText(textBlocks, character, currentBlockType);
        var textMap = BlockMapBuilder.createFromArray(textFragment);
        editor.update(insertFragment(editor._latestEditorState, textMap));
      }
    }
    function insertFragment(editorState, fragment, entityMap) {
      var newContent = DraftModifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), fragment);
      return EditorState.push(editorState, newContent.set("entityMap", entityMap), "insert-fragment");
    }
    function areTextBlocksAndClipboardEqual(textBlocks, blockMap) {
      return textBlocks.length === blockMap.size && blockMap.valueSeq().every(function(block, ii) {
        return block.getText() === textBlocks[ii];
      });
    }
    module.exports = editOnPaste;
  }
});

// node_modules/draft-js/lib/DraftEditorEditHandler.js
var require_DraftEditorEditHandler = __commonJS({
  "node_modules/draft-js/lib/DraftEditorEditHandler.js"(exports, module) {
    "use strict";
    var UserAgent = require_UserAgent();
    var onBeforeInput = require_editOnBeforeInput();
    var onBlur = require_editOnBlur();
    var onCompositionStart = require_editOnCompositionStart();
    var onCopy = require_editOnCopy();
    var onCut = require_editOnCut();
    var onDragOver = require_editOnDragOver();
    var onDragStart = require_editOnDragStart();
    var onFocus = require_editOnFocus();
    var onInput = require_editOnInput();
    var onKeyDown = require_editOnKeyDown();
    var onPaste = require_editOnPaste();
    var onSelect = require_editOnSelect();
    var isChrome = UserAgent.isBrowser("Chrome");
    var isFirefox = UserAgent.isBrowser("Firefox");
    var selectionHandler = isChrome || isFirefox ? onSelect : function(e) {
    };
    var DraftEditorEditHandler = {
      onBeforeInput,
      onBlur,
      onCompositionStart,
      onCopy,
      onCut,
      onDragOver,
      onDragStart,
      onFocus,
      onInput,
      onKeyDown,
      onPaste,
      onSelect,
      // In certain cases, contenteditable on chrome does not fire the onSelect
      // event, causing problems with cursor positioning. Therefore, the selection
      // state update handler is added to more events to ensure that the selection
      // state is always synced with the actual cursor positions.
      onMouseUp: selectionHandler,
      onKeyUp: selectionHandler
    };
    module.exports = DraftEditorEditHandler;
  }
});

// node_modules/draft-js/lib/DraftEditorFlushControlled.js
var require_DraftEditorFlushControlled = __commonJS({
  "node_modules/draft-js/lib/DraftEditorFlushControlled.js"(exports, module) {
    "use strict";
    var ReactDOMComet = require_react_dom();
    var flushControlled = ReactDOMComet.unstable_flushControlled;
    module.exports = flushControlled;
  }
});

// node_modules/draft-js/lib/DraftEditorPlaceholder.react.js
var require_DraftEditorPlaceholder_react = __commonJS({
  "node_modules/draft-js/lib/DraftEditorPlaceholder.react.js"(exports, module) {
    "use strict";
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var React = require_react();
    var cx = require_cx();
    var DraftEditorPlaceholder = function(_React$Component) {
      _inheritsLoose(DraftEditorPlaceholder2, _React$Component);
      function DraftEditorPlaceholder2() {
        return _React$Component.apply(this, arguments) || this;
      }
      var _proto = DraftEditorPlaceholder2.prototype;
      _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return this.props.text !== nextProps.text || this.props.editorState.getSelection().getHasFocus() !== nextProps.editorState.getSelection().getHasFocus();
      };
      _proto.render = function render() {
        var hasFocus = this.props.editorState.getSelection().getHasFocus();
        var className = cx({
          "public/DraftEditorPlaceholder/root": true,
          "public/DraftEditorPlaceholder/hasFocus": hasFocus
        });
        var contentStyle = {
          whiteSpace: "pre-wrap"
        };
        return React.createElement("div", {
          className
        }, React.createElement("div", {
          className: cx("public/DraftEditorPlaceholder/inner"),
          id: this.props.accessibilityID,
          style: contentStyle
        }, this.props.text));
      };
      return DraftEditorPlaceholder2;
    }(React.Component);
    module.exports = DraftEditorPlaceholder;
  }
});

// node_modules/draft-js/lib/getDefaultKeyBinding.js
var require_getDefaultKeyBinding = __commonJS({
  "node_modules/draft-js/lib/getDefaultKeyBinding.js"(exports, module) {
    "use strict";
    var KeyBindingUtil = require_KeyBindingUtil();
    var Keys = require_Keys();
    var UserAgent = require_UserAgent();
    var isOSX = UserAgent.isPlatform("Mac OS X");
    var shouldFixFirefoxMovement = isOSX && UserAgent.isBrowser("Firefox < 29");
    var hasCommandModifier = KeyBindingUtil.hasCommandModifier;
    var isCtrlKeyCommand = KeyBindingUtil.isCtrlKeyCommand;
    function shouldRemoveWord(e) {
      return isOSX && e.altKey || isCtrlKeyCommand(e);
    }
    function getZCommand(e) {
      if (!hasCommandModifier(e)) {
        return null;
      }
      return e.shiftKey ? "redo" : "undo";
    }
    function getDeleteCommand(e) {
      if (!isOSX && e.shiftKey) {
        return null;
      }
      return shouldRemoveWord(e) ? "delete-word" : "delete";
    }
    function getBackspaceCommand(e) {
      if (hasCommandModifier(e) && isOSX) {
        return "backspace-to-start-of-line";
      }
      return shouldRemoveWord(e) ? "backspace-word" : "backspace";
    }
    function getDefaultKeyBinding(e) {
      switch (e.keyCode) {
        case 66:
          return hasCommandModifier(e) ? "bold" : null;
        case 68:
          return isCtrlKeyCommand(e) ? "delete" : null;
        case 72:
          return isCtrlKeyCommand(e) ? "backspace" : null;
        case 73:
          return hasCommandModifier(e) ? "italic" : null;
        case 74:
          return hasCommandModifier(e) ? "code" : null;
        case 75:
          return isOSX && isCtrlKeyCommand(e) ? "secondary-cut" : null;
        case 77:
          return isCtrlKeyCommand(e) ? "split-block" : null;
        case 79:
          return isCtrlKeyCommand(e) ? "split-block" : null;
        case 84:
          return isOSX && isCtrlKeyCommand(e) ? "transpose-characters" : null;
        case 85:
          return hasCommandModifier(e) ? "underline" : null;
        case 87:
          return isOSX && isCtrlKeyCommand(e) ? "backspace-word" : null;
        case 89:
          if (isCtrlKeyCommand(e)) {
            return isOSX ? "secondary-paste" : "redo";
          }
          return null;
        case 90:
          return getZCommand(e) || null;
        case Keys.RETURN:
          return "split-block";
        case Keys.DELETE:
          return getDeleteCommand(e);
        case Keys.BACKSPACE:
          return getBackspaceCommand(e);
        case Keys.LEFT:
          return shouldFixFirefoxMovement && hasCommandModifier(e) ? "move-selection-to-start-of-block" : null;
        case Keys.RIGHT:
          return shouldFixFirefoxMovement && hasCommandModifier(e) ? "move-selection-to-end-of-block" : null;
        default:
          return null;
      }
    }
    module.exports = getDefaultKeyBinding;
  }
});

// node_modules/draft-js/lib/DraftEditor.react.js
var require_DraftEditor_react = __commonJS({
  "node_modules/draft-js/lib/DraftEditor.react.js"(exports, module) {
    "use strict";
    var _assign = require_object_assign();
    function _extends() {
      _extends = _assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var DefaultDraftBlockRenderMap = require_DefaultDraftBlockRenderMap();
    var DefaultDraftInlineStyle = require_DefaultDraftInlineStyle();
    var DraftEditorCompositionHandler = require_DraftEditorCompositionHandler();
    var DraftEditorContents = require_DraftEditorContents_react();
    var DraftEditorDragHandler = require_DraftEditorDragHandler();
    var DraftEditorEditHandler = require_DraftEditorEditHandler();
    var flushControlled = require_DraftEditorFlushControlled();
    var DraftEditorPlaceholder = require_DraftEditorPlaceholder_react();
    var DraftEffects = require_DraftEffects();
    var EditorState = require_EditorState();
    var React = require_react();
    var Scroll = require_Scroll();
    var Style = require_Style();
    var UserAgent = require_UserAgent();
    var cx = require_cx();
    var generateRandomKey = require_generateRandomKey();
    var getDefaultKeyBinding = require_getDefaultKeyBinding();
    var getScrollPosition = require_getScrollPosition();
    var gkx = require_gkx();
    var invariant = require_invariant();
    var isHTMLElement = require_isHTMLElement();
    var nullthrows = require_nullthrows();
    var isIE = UserAgent.isBrowser("IE");
    var allowSpellCheck = !isIE;
    var handlerMap = {
      edit: DraftEditorEditHandler,
      composite: DraftEditorCompositionHandler,
      drag: DraftEditorDragHandler,
      cut: null,
      render: null
    };
    var didInitODS = false;
    var UpdateDraftEditorFlags = function(_React$Component) {
      _inheritsLoose(UpdateDraftEditorFlags2, _React$Component);
      function UpdateDraftEditorFlags2() {
        return _React$Component.apply(this, arguments) || this;
      }
      var _proto = UpdateDraftEditorFlags2.prototype;
      _proto.render = function render() {
        return null;
      };
      _proto.componentDidMount = function componentDidMount() {
        this._update();
      };
      _proto.componentDidUpdate = function componentDidUpdate() {
        this._update();
      };
      _proto._update = function _update() {
        var editor = this.props.editor;
        editor._latestEditorState = this.props.editorState;
        editor._blockSelectEvents = true;
      };
      return UpdateDraftEditorFlags2;
    }(React.Component);
    var DraftEditor = function(_React$Component2) {
      _inheritsLoose(DraftEditor2, _React$Component2);
      function DraftEditor2(props) {
        var _this;
        _this = _React$Component2.call(this, props) || this;
        _defineProperty(_assertThisInitialized(_this), "_blockSelectEvents", void 0);
        _defineProperty(_assertThisInitialized(_this), "_clipboard", void 0);
        _defineProperty(_assertThisInitialized(_this), "_handler", void 0);
        _defineProperty(_assertThisInitialized(_this), "_dragCount", void 0);
        _defineProperty(_assertThisInitialized(_this), "_internalDrag", void 0);
        _defineProperty(_assertThisInitialized(_this), "_editorKey", void 0);
        _defineProperty(_assertThisInitialized(_this), "_placeholderAccessibilityID", void 0);
        _defineProperty(_assertThisInitialized(_this), "_latestEditorState", void 0);
        _defineProperty(_assertThisInitialized(_this), "_latestCommittedEditorState", void 0);
        _defineProperty(_assertThisInitialized(_this), "_pendingStateFromBeforeInput", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onBeforeInput", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onBlur", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onCharacterData", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onCompositionEnd", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onCompositionStart", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onCopy", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onCut", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onDragEnd", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onDragOver", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onDragStart", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onDrop", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onInput", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onFocus", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onKeyDown", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onKeyPress", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onKeyUp", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onMouseDown", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onMouseUp", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onPaste", void 0);
        _defineProperty(_assertThisInitialized(_this), "_onSelect", void 0);
        _defineProperty(_assertThisInitialized(_this), "editor", void 0);
        _defineProperty(_assertThisInitialized(_this), "editorContainer", void 0);
        _defineProperty(_assertThisInitialized(_this), "focus", void 0);
        _defineProperty(_assertThisInitialized(_this), "blur", void 0);
        _defineProperty(_assertThisInitialized(_this), "setMode", void 0);
        _defineProperty(_assertThisInitialized(_this), "exitCurrentMode", void 0);
        _defineProperty(_assertThisInitialized(_this), "restoreEditorDOM", void 0);
        _defineProperty(_assertThisInitialized(_this), "setClipboard", void 0);
        _defineProperty(_assertThisInitialized(_this), "getClipboard", void 0);
        _defineProperty(_assertThisInitialized(_this), "getEditorKey", void 0);
        _defineProperty(_assertThisInitialized(_this), "update", void 0);
        _defineProperty(_assertThisInitialized(_this), "onDragEnter", void 0);
        _defineProperty(_assertThisInitialized(_this), "onDragLeave", void 0);
        _defineProperty(_assertThisInitialized(_this), "_handleEditorContainerRef", function(node) {
          _this.editorContainer = node;
          _this.editor = node !== null ? node.firstChild : null;
        });
        _defineProperty(_assertThisInitialized(_this), "focus", function(scrollPosition) {
          var editorState = _this.props.editorState;
          var alreadyHasFocus = editorState.getSelection().getHasFocus();
          var editorNode = _this.editor;
          if (!editorNode) {
            return;
          }
          var scrollParent = Style.getScrollParent(editorNode);
          var _ref = scrollPosition || getScrollPosition(scrollParent), x = _ref.x, y = _ref.y;
          !isHTMLElement(editorNode) ? true ? invariant(false, "editorNode is not an HTMLElement") : invariant(false) : void 0;
          editorNode.focus();
          if (scrollParent === window) {
            window.scrollTo(x, y);
          } else {
            Scroll.setTop(scrollParent, y);
          }
          if (!alreadyHasFocus) {
            _this.update(EditorState.forceSelection(editorState, editorState.getSelection()));
          }
        });
        _defineProperty(_assertThisInitialized(_this), "blur", function() {
          var editorNode = _this.editor;
          if (!editorNode) {
            return;
          }
          !isHTMLElement(editorNode) ? true ? invariant(false, "editorNode is not an HTMLElement") : invariant(false) : void 0;
          editorNode.blur();
        });
        _defineProperty(_assertThisInitialized(_this), "setMode", function(mode) {
          var _this$props = _this.props, onPaste = _this$props.onPaste, onCut = _this$props.onCut, onCopy = _this$props.onCopy;
          var editHandler = _objectSpread({}, handlerMap.edit);
          if (onPaste) {
            editHandler.onPaste = onPaste;
          }
          if (onCut) {
            editHandler.onCut = onCut;
          }
          if (onCopy) {
            editHandler.onCopy = onCopy;
          }
          var handler = _objectSpread({}, handlerMap, {
            edit: editHandler
          });
          _this._handler = handler[mode];
        });
        _defineProperty(_assertThisInitialized(_this), "exitCurrentMode", function() {
          _this.setMode("edit");
        });
        _defineProperty(_assertThisInitialized(_this), "restoreEditorDOM", function(scrollPosition) {
          _this.setState({
            contentsKey: _this.state.contentsKey + 1
          }, function() {
            _this.focus(scrollPosition);
          });
        });
        _defineProperty(_assertThisInitialized(_this), "setClipboard", function(clipboard) {
          _this._clipboard = clipboard;
        });
        _defineProperty(_assertThisInitialized(_this), "getClipboard", function() {
          return _this._clipboard;
        });
        _defineProperty(_assertThisInitialized(_this), "update", function(editorState) {
          _this._latestEditorState = editorState;
          _this.props.onChange(editorState);
        });
        _defineProperty(_assertThisInitialized(_this), "onDragEnter", function() {
          _this._dragCount++;
        });
        _defineProperty(_assertThisInitialized(_this), "onDragLeave", function() {
          _this._dragCount--;
          if (_this._dragCount === 0) {
            _this.exitCurrentMode();
          }
        });
        _this._blockSelectEvents = false;
        _this._clipboard = null;
        _this._handler = null;
        _this._dragCount = 0;
        _this._editorKey = props.editorKey || generateRandomKey();
        _this._placeholderAccessibilityID = "placeholder-" + _this._editorKey;
        _this._latestEditorState = props.editorState;
        _this._latestCommittedEditorState = props.editorState;
        _this._onBeforeInput = _this._buildHandler("onBeforeInput");
        _this._onBlur = _this._buildHandler("onBlur");
        _this._onCharacterData = _this._buildHandler("onCharacterData");
        _this._onCompositionEnd = _this._buildHandler("onCompositionEnd");
        _this._onCompositionStart = _this._buildHandler("onCompositionStart");
        _this._onCopy = _this._buildHandler("onCopy");
        _this._onCut = _this._buildHandler("onCut");
        _this._onDragEnd = _this._buildHandler("onDragEnd");
        _this._onDragOver = _this._buildHandler("onDragOver");
        _this._onDragStart = _this._buildHandler("onDragStart");
        _this._onDrop = _this._buildHandler("onDrop");
        _this._onInput = _this._buildHandler("onInput");
        _this._onFocus = _this._buildHandler("onFocus");
        _this._onKeyDown = _this._buildHandler("onKeyDown");
        _this._onKeyPress = _this._buildHandler("onKeyPress");
        _this._onKeyUp = _this._buildHandler("onKeyUp");
        _this._onMouseDown = _this._buildHandler("onMouseDown");
        _this._onMouseUp = _this._buildHandler("onMouseUp");
        _this._onPaste = _this._buildHandler("onPaste");
        _this._onSelect = _this._buildHandler("onSelect");
        _this.getEditorKey = function() {
          return _this._editorKey;
        };
        if (true) {
          ["onDownArrow", "onEscape", "onLeftArrow", "onRightArrow", "onTab", "onUpArrow"].forEach(function(propName) {
            if (props.hasOwnProperty(propName)) {
              console.warn("Supplying an `".concat(propName, "` prop to `DraftEditor` has ") + "been deprecated. If your handler needs access to the keyboard event, supply a custom `keyBindingFn` prop that falls back to the default one (eg. https://is.gd/wHKQ3W).");
            }
          });
        }
        _this.state = {
          contentsKey: 0
        };
        return _this;
      }
      var _proto2 = DraftEditor2.prototype;
      _proto2._buildHandler = function _buildHandler(eventName) {
        var _this2 = this;
        return function(e) {
          if (!_this2.props.readOnly) {
            var method = _this2._handler && _this2._handler[eventName];
            if (method) {
              if (flushControlled) {
                flushControlled(function() {
                  return method(_this2, e);
                });
              } else {
                method(_this2, e);
              }
            }
          }
        };
      };
      _proto2._showPlaceholder = function _showPlaceholder() {
        return !!this.props.placeholder && !this.props.editorState.isInCompositionMode() && !this.props.editorState.getCurrentContent().hasText();
      };
      _proto2._renderPlaceholder = function _renderPlaceholder() {
        if (this._showPlaceholder()) {
          var placeHolderProps = {
            text: nullthrows(this.props.placeholder),
            editorState: this.props.editorState,
            textAlignment: this.props.textAlignment,
            accessibilityID: this._placeholderAccessibilityID
          };
          return React.createElement(DraftEditorPlaceholder, placeHolderProps);
        }
        return null;
      };
      _proto2._renderARIADescribedBy = function _renderARIADescribedBy() {
        var describedBy = this.props.ariaDescribedBy || "";
        var placeholderID = this._showPlaceholder() ? this._placeholderAccessibilityID : "";
        return describedBy.replace("{{editor_id_placeholder}}", placeholderID) || void 0;
      };
      _proto2.render = function render() {
        var _this$props2 = this.props, blockRenderMap = _this$props2.blockRenderMap, blockRendererFn = _this$props2.blockRendererFn, blockStyleFn = _this$props2.blockStyleFn, customStyleFn = _this$props2.customStyleFn, customStyleMap = _this$props2.customStyleMap, editorState = _this$props2.editorState, preventScroll = _this$props2.preventScroll, readOnly = _this$props2.readOnly, textAlignment = _this$props2.textAlignment, textDirectionality = _this$props2.textDirectionality;
        var rootClass = cx({
          "DraftEditor/root": true,
          "DraftEditor/alignLeft": textAlignment === "left",
          "DraftEditor/alignRight": textAlignment === "right",
          "DraftEditor/alignCenter": textAlignment === "center"
        });
        var contentStyle = {
          outline: "none",
          // fix parent-draggable Safari bug. #1326
          userSelect: "text",
          WebkitUserSelect: "text",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word"
        };
        var ariaRole = this.props.role || "textbox";
        var ariaExpanded = ariaRole === "combobox" ? !!this.props.ariaExpanded : null;
        var editorContentsProps = {
          blockRenderMap,
          blockRendererFn,
          blockStyleFn,
          customStyleMap: _objectSpread({}, DefaultDraftInlineStyle, customStyleMap),
          customStyleFn,
          editorKey: this._editorKey,
          editorState,
          preventScroll,
          textDirectionality
        };
        return React.createElement("div", {
          className: rootClass
        }, this._renderPlaceholder(), React.createElement("div", {
          className: cx("DraftEditor/editorContainer"),
          ref: this._handleEditorContainerRef
        }, React.createElement("div", {
          "aria-activedescendant": readOnly ? null : this.props.ariaActiveDescendantID,
          "aria-autocomplete": readOnly ? null : this.props.ariaAutoComplete,
          "aria-controls": readOnly ? null : this.props.ariaControls,
          "aria-describedby": this._renderARIADescribedBy(),
          "aria-expanded": readOnly ? null : ariaExpanded,
          "aria-label": this.props.ariaLabel,
          "aria-labelledby": this.props.ariaLabelledBy,
          "aria-multiline": this.props.ariaMultiline,
          "aria-owns": readOnly ? null : this.props.ariaOwneeID,
          autoCapitalize: this.props.autoCapitalize,
          autoComplete: this.props.autoComplete,
          autoCorrect: this.props.autoCorrect,
          className: cx({
            // Chrome's built-in translation feature mutates the DOM in ways
            // that Draft doesn't expect (ex: adding <font> tags inside
            // DraftEditorLeaf spans) and causes problems. We add notranslate
            // here which makes its autotranslation skip over this subtree.
            notranslate: !readOnly,
            "public/DraftEditor/content": true
          }),
          contentEditable: !readOnly,
          "data-testid": this.props.webDriverTestID,
          onBeforeInput: this._onBeforeInput,
          onBlur: this._onBlur,
          onCompositionEnd: this._onCompositionEnd,
          onCompositionStart: this._onCompositionStart,
          onCopy: this._onCopy,
          onCut: this._onCut,
          onDragEnd: this._onDragEnd,
          onDragEnter: this.onDragEnter,
          onDragLeave: this.onDragLeave,
          onDragOver: this._onDragOver,
          onDragStart: this._onDragStart,
          onDrop: this._onDrop,
          onFocus: this._onFocus,
          onInput: this._onInput,
          onKeyDown: this._onKeyDown,
          onKeyPress: this._onKeyPress,
          onKeyUp: this._onKeyUp,
          onMouseUp: this._onMouseUp,
          onPaste: this._onPaste,
          onSelect: this._onSelect,
          ref: this.props.editorRef,
          role: readOnly ? null : ariaRole,
          spellCheck: allowSpellCheck && this.props.spellCheck,
          style: contentStyle,
          suppressContentEditableWarning: true,
          tabIndex: this.props.tabIndex
        }, React.createElement(UpdateDraftEditorFlags, {
          editor: this,
          editorState
        }), React.createElement(DraftEditorContents, _extends({}, editorContentsProps, {
          key: "contents" + this.state.contentsKey
        })))));
      };
      _proto2.componentDidMount = function componentDidMount() {
        this._blockSelectEvents = false;
        if (!didInitODS && gkx("draft_ods_enabled")) {
          didInitODS = true;
          DraftEffects.initODS();
        }
        this.setMode("edit");
        if (isIE) {
          if (!this.editor) {
            global.execCommand("AutoUrlDetect", false, false);
          } else {
            this.editor.ownerDocument.execCommand("AutoUrlDetect", false, false);
          }
        }
      };
      _proto2.componentDidUpdate = function componentDidUpdate() {
        this._blockSelectEvents = false;
        this._latestEditorState = this.props.editorState;
        this._latestCommittedEditorState = this.props.editorState;
      };
      return DraftEditor2;
    }(React.Component);
    _defineProperty(DraftEditor, "defaultProps", {
      ariaDescribedBy: "{{editor_id_placeholder}}",
      blockRenderMap: DefaultDraftBlockRenderMap,
      blockRendererFn: function blockRendererFn() {
        return null;
      },
      blockStyleFn: function blockStyleFn() {
        return "";
      },
      keyBindingFn: getDefaultKeyBinding,
      readOnly: false,
      spellCheck: false,
      stripPastedStyles: false
    });
    module.exports = DraftEditor;
  }
});

// node_modules/draft-js/lib/RawDraftContentState.js
var require_RawDraftContentState = __commonJS({
  "node_modules/draft-js/lib/RawDraftContentState.js"() {
    "use strict";
  }
});

// node_modules/draft-js/lib/DraftStringKey.js
var require_DraftStringKey = __commonJS({
  "node_modules/draft-js/lib/DraftStringKey.js"(exports, module) {
    "use strict";
    var DraftStringKey = {
      stringify: function stringify(key) {
        return "_" + String(key);
      },
      unstringify: function unstringify(key) {
        return key.slice(1);
      }
    };
    module.exports = DraftStringKey;
  }
});

// node_modules/draft-js/lib/encodeEntityRanges.js
var require_encodeEntityRanges = __commonJS({
  "node_modules/draft-js/lib/encodeEntityRanges.js"(exports, module) {
    "use strict";
    var DraftStringKey = require_DraftStringKey();
    var UnicodeUtils = require_UnicodeUtils();
    var strlen = UnicodeUtils.strlen;
    function encodeEntityRanges(block, storageMap) {
      var encoded = [];
      block.findEntityRanges(function(character) {
        return !!character.getEntity();
      }, function(start, end) {
        var text = block.getText();
        var key = block.getEntityAt(start);
        encoded.push({
          offset: strlen(text.slice(0, start)),
          length: strlen(text.slice(start, end)),
          // Encode the key as a number for range storage.
          key: Number(storageMap[DraftStringKey.stringify(key)])
        });
      });
      return encoded;
    }
    module.exports = encodeEntityRanges;
  }
});

// node_modules/draft-js/lib/encodeInlineStyleRanges.js
var require_encodeInlineStyleRanges = __commonJS({
  "node_modules/draft-js/lib/encodeInlineStyleRanges.js"(exports, module) {
    "use strict";
    var UnicodeUtils = require_UnicodeUtils();
    var findRangesImmutable = require_findRangesImmutable();
    var areEqual = function areEqual2(a, b) {
      return a === b;
    };
    var isTruthy = function isTruthy2(a) {
      return !!a;
    };
    var EMPTY_ARRAY = [];
    function getEncodedInlinesForType(block, styleList, styleToEncode) {
      var ranges = [];
      var filteredInlines = styleList.map(function(style) {
        return style.has(styleToEncode);
      }).toList();
      findRangesImmutable(
        filteredInlines,
        areEqual,
        // We only want to keep ranges with nonzero style values.
        isTruthy,
        function(start, end) {
          var text = block.getText();
          ranges.push({
            offset: UnicodeUtils.strlen(text.slice(0, start)),
            length: UnicodeUtils.strlen(text.slice(start, end)),
            style: styleToEncode
          });
        }
      );
      return ranges;
    }
    function encodeInlineStyleRanges(block) {
      var styleList = block.getCharacterList().map(function(c) {
        return c.getStyle();
      }).toList();
      var ranges = styleList.flatten().toSet().map(function(style) {
        return getEncodedInlinesForType(block, styleList, style);
      });
      return Array.prototype.concat.apply(EMPTY_ARRAY, ranges.toJS());
    }
    module.exports = encodeInlineStyleRanges;
  }
});

// node_modules/draft-js/lib/convertFromDraftStateToRaw.js
var require_convertFromDraftStateToRaw = __commonJS({
  "node_modules/draft-js/lib/convertFromDraftStateToRaw.js"(exports, module) {
    "use strict";
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var ContentBlock = require_ContentBlock();
    var ContentBlockNode = require_ContentBlockNode();
    var DraftStringKey = require_DraftStringKey();
    var encodeEntityRanges = require_encodeEntityRanges();
    var encodeInlineStyleRanges = require_encodeInlineStyleRanges();
    var invariant = require_invariant();
    var createRawBlock = function createRawBlock2(block, entityStorageMap) {
      return {
        key: block.getKey(),
        text: block.getText(),
        type: block.getType(),
        depth: block.getDepth(),
        inlineStyleRanges: encodeInlineStyleRanges(block),
        entityRanges: encodeEntityRanges(block, entityStorageMap),
        data: block.getData().toObject()
      };
    };
    var insertRawBlock = function insertRawBlock2(block, entityMap, rawBlocks, blockCacheRef) {
      if (block instanceof ContentBlock) {
        rawBlocks.push(createRawBlock(block, entityMap));
        return;
      }
      !(block instanceof ContentBlockNode) ? true ? invariant(false, "block is not a BlockNode") : invariant(false) : void 0;
      var parentKey = block.getParentKey();
      var rawBlock = blockCacheRef[block.getKey()] = _objectSpread({}, createRawBlock(block, entityMap), {
        children: []
      });
      if (parentKey) {
        blockCacheRef[parentKey].children.push(rawBlock);
        return;
      }
      rawBlocks.push(rawBlock);
    };
    var encodeRawBlocks = function encodeRawBlocks2(contentState, rawState) {
      var entityMap = rawState.entityMap;
      var rawBlocks = [];
      var blockCacheRef = {};
      var entityCacheRef = {};
      var entityStorageKey = 0;
      contentState.getBlockMap().forEach(function(block) {
        block.findEntityRanges(function(character) {
          return character.getEntity() !== null;
        }, function(start) {
          var entityKey = block.getEntityAt(start);
          var stringifiedEntityKey = DraftStringKey.stringify(entityKey);
          if (entityCacheRef[stringifiedEntityKey]) {
            return;
          }
          entityCacheRef[stringifiedEntityKey] = entityKey;
          entityMap[stringifiedEntityKey] = "".concat(entityStorageKey);
          entityStorageKey++;
        });
        insertRawBlock(block, entityMap, rawBlocks, blockCacheRef);
      });
      return {
        blocks: rawBlocks,
        entityMap
      };
    };
    var encodeRawEntityMap = function encodeRawEntityMap2(contentState, rawState) {
      var blocks = rawState.blocks, entityMap = rawState.entityMap;
      var rawEntityMap = {};
      Object.keys(entityMap).forEach(function(key, index) {
        var entity = contentState.getEntity(DraftStringKey.unstringify(key));
        rawEntityMap[index] = {
          type: entity.getType(),
          mutability: entity.getMutability(),
          data: entity.getData()
        };
      });
      return {
        blocks,
        entityMap: rawEntityMap
      };
    };
    var convertFromDraftStateToRaw = function convertFromDraftStateToRaw2(contentState) {
      var rawDraftContentState = {
        entityMap: {},
        blocks: []
      };
      rawDraftContentState = encodeRawBlocks(contentState, rawDraftContentState);
      rawDraftContentState = encodeRawEntityMap(contentState, rawDraftContentState);
      return rawDraftContentState;
    };
    module.exports = convertFromDraftStateToRaw;
  }
});

// node_modules/draft-js/lib/DraftTreeAdapter.js
var require_DraftTreeAdapter = __commonJS({
  "node_modules/draft-js/lib/DraftTreeAdapter.js"(exports, module) {
    "use strict";
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var generateRandomKey = require_generateRandomKey();
    var invariant = require_invariant();
    var traverseInDepthOrder = function traverseInDepthOrder2(blocks, fn) {
      var stack = [].concat(blocks).reverse();
      while (stack.length) {
        var _block = stack.pop();
        fn(_block);
        var children = _block.children;
        !Array.isArray(children) ? true ? invariant(false, "Invalid tree raw block") : invariant(false) : void 0;
        stack = stack.concat([].concat(children.reverse()));
      }
    };
    var isListBlock = function isListBlock2(block) {
      if (!(block && block.type)) {
        return false;
      }
      var type = block.type;
      return type === "unordered-list-item" || type === "ordered-list-item";
    };
    var addDepthToChildren = function addDepthToChildren2(block) {
      if (Array.isArray(block.children)) {
        block.children = block.children.map(function(child) {
          return child.type === block.type ? _objectSpread({}, child, {
            depth: (block.depth || 0) + 1
          }) : child;
        });
      }
    };
    var DraftTreeAdapter = {
      /**
       * Converts from a tree raw state back to draft raw state
       */
      fromRawTreeStateToRawState: function fromRawTreeStateToRawState(draftTreeState) {
        var blocks = draftTreeState.blocks;
        var transformedBlocks = [];
        !Array.isArray(blocks) ? true ? invariant(false, "Invalid raw state") : invariant(false) : void 0;
        if (!Array.isArray(blocks) || !blocks.length) {
          return draftTreeState;
        }
        traverseInDepthOrder(blocks, function(block) {
          var newBlock = _objectSpread({}, block);
          if (isListBlock(block)) {
            newBlock.depth = newBlock.depth || 0;
            addDepthToChildren(block);
            if (block.children != null && block.children.length > 0) {
              return;
            }
          }
          delete newBlock.children;
          transformedBlocks.push(newBlock);
        });
        draftTreeState.blocks = transformedBlocks;
        return _objectSpread({}, draftTreeState, {
          blocks: transformedBlocks
        });
      },
      /**
       * Converts from draft raw state to tree draft state
       */
      fromRawStateToRawTreeState: function fromRawStateToRawTreeState(draftState) {
        var transformedBlocks = [];
        var parentStack = [];
        draftState.blocks.forEach(function(block) {
          var isList = isListBlock(block);
          var depth = block.depth || 0;
          var treeBlock = _objectSpread({}, block, {
            children: []
          });
          if (!isList) {
            transformedBlocks.push(treeBlock);
            return;
          }
          var lastParent = parentStack[0];
          if (lastParent == null && depth === 0) {
            transformedBlocks.push(treeBlock);
          } else if (lastParent == null || lastParent.depth < depth - 1) {
            var newParent = {
              key: generateRandomKey(),
              text: "",
              depth: depth - 1,
              type: block.type,
              children: [],
              entityRanges: [],
              inlineStyleRanges: []
            };
            parentStack.unshift(newParent);
            if (depth === 1) {
              transformedBlocks.push(newParent);
            } else if (lastParent != null) {
              lastParent.children.push(newParent);
            }
            newParent.children.push(treeBlock);
          } else if (lastParent.depth === depth - 1) {
            lastParent.children.push(treeBlock);
          } else {
            while (lastParent != null && lastParent.depth >= depth) {
              parentStack.shift();
              lastParent = parentStack[0];
            }
            if (depth > 0) {
              lastParent.children.push(treeBlock);
            } else {
              transformedBlocks.push(treeBlock);
            }
          }
        });
        return _objectSpread({}, draftState, {
          blocks: transformedBlocks
        });
      }
    };
    module.exports = DraftTreeAdapter;
  }
});

// node_modules/draft-js/lib/DraftTreeInvariants.js
var require_DraftTreeInvariants = __commonJS({
  "node_modules/draft-js/lib/DraftTreeInvariants.js"(exports, module) {
    "use strict";
    var warning = require_warning();
    var DraftTreeInvariants = {
      /**
       * Check if the block is valid
       */
      isValidBlock: function isValidBlock(block, blockMap) {
        var key = block.getKey();
        var parentKey = block.getParentKey();
        if (parentKey != null) {
          var parent = blockMap.get(parentKey);
          if (!parent.getChildKeys().includes(key)) {
            true ? warning(true, "Tree is missing parent -> child pointer on %s", key) : void 0;
            return false;
          }
        }
        var children = block.getChildKeys().map(function(k) {
          return blockMap.get(k);
        });
        if (!children.every(function(c) {
          return c.getParentKey() === key;
        })) {
          true ? warning(true, "Tree is missing child -> parent pointer on %s", key) : void 0;
          return false;
        }
        var prevSiblingKey = block.getPrevSiblingKey();
        if (prevSiblingKey != null) {
          var prevSibling = blockMap.get(prevSiblingKey);
          if (prevSibling.getNextSiblingKey() !== key) {
            true ? warning(true, "Tree is missing nextSibling pointer on %s's prevSibling", key) : void 0;
            return false;
          }
        }
        var nextSiblingKey = block.getNextSiblingKey();
        if (nextSiblingKey != null) {
          var nextSibling = blockMap.get(nextSiblingKey);
          if (nextSibling.getPrevSiblingKey() !== key) {
            true ? warning(true, "Tree is missing prevSibling pointer on %s's nextSibling", key) : void 0;
            return false;
          }
        }
        if (nextSiblingKey !== null && prevSiblingKey !== null) {
          if (prevSiblingKey === nextSiblingKey) {
            true ? warning(true, "Tree has a two-node cycle at %s", key) : void 0;
            return false;
          }
        }
        if (block.text != "") {
          if (block.getChildKeys().size > 0) {
            true ? warning(true, "Leaf node %s has children", key) : void 0;
            return false;
          }
        }
        return true;
      },
      /**
       * Checks that this is a connected tree on all the blocks
       * starting from the first block, traversing nextSibling and child pointers
       * should be a tree (preorder traversal - parent, then children)
       * num of connected node === number of blocks
       */
      isConnectedTree: function isConnectedTree(blockMap) {
        var eligibleFirstNodes = blockMap.toArray().filter(function(block) {
          return block.getParentKey() == null && block.getPrevSiblingKey() == null;
        });
        if (eligibleFirstNodes.length !== 1) {
          true ? warning(true, "Tree is not connected. More or less than one first node") : void 0;
          return false;
        }
        var firstNode = eligibleFirstNodes.shift();
        var nodesSeen = 0;
        var currentKey = firstNode.getKey();
        var visitedStack = [];
        while (currentKey != null) {
          var currentNode = blockMap.get(currentKey);
          var childKeys = currentNode.getChildKeys();
          var nextSiblingKey = currentNode.getNextSiblingKey();
          if (childKeys.size > 0) {
            if (nextSiblingKey != null) {
              visitedStack.unshift(nextSiblingKey);
            }
            var children = childKeys.map(function(k) {
              return blockMap.get(k);
            });
            var _firstNode = children.find(function(block) {
              return block.getPrevSiblingKey() == null;
            });
            if (_firstNode == null) {
              true ? warning(true, "%s has no first child", currentKey) : void 0;
              return false;
            }
            currentKey = _firstNode.getKey();
          } else {
            if (currentNode.getNextSiblingKey() != null) {
              currentKey = currentNode.getNextSiblingKey();
            } else {
              currentKey = visitedStack.shift();
            }
          }
          nodesSeen++;
        }
        if (nodesSeen !== blockMap.size) {
          true ? warning(true, "Tree is not connected. %s nodes were seen instead of %s", nodesSeen, blockMap.size) : void 0;
          return false;
        }
        return true;
      },
      /**
       * Checks that the block map is a connected tree with valid blocks
       */
      isValidTree: function isValidTree(blockMap) {
        var _this = this;
        var blocks = blockMap.toArray();
        if (!blocks.every(function(block) {
          return _this.isValidBlock(block, blockMap);
        })) {
          return false;
        }
        return this.isConnectedTree(blockMap);
      }
    };
    module.exports = DraftTreeInvariants;
  }
});

// node_modules/draft-js/lib/createCharacterList.js
var require_createCharacterList = __commonJS({
  "node_modules/draft-js/lib/createCharacterList.js"(exports, module) {
    "use strict";
    var CharacterMetadata = require_CharacterMetadata();
    var Immutable = require_immutable();
    var List = Immutable.List;
    function createCharacterList(inlineStyles, entities) {
      var characterArray = inlineStyles.map(function(style, ii) {
        var entity = entities[ii];
        return CharacterMetadata.create({
          style,
          entity
        });
      });
      return List(characterArray);
    }
    module.exports = createCharacterList;
  }
});

// node_modules/draft-js/lib/decodeEntityRanges.js
var require_decodeEntityRanges = __commonJS({
  "node_modules/draft-js/lib/decodeEntityRanges.js"(exports, module) {
    "use strict";
    var UnicodeUtils = require_UnicodeUtils();
    var substr = UnicodeUtils.substr;
    function decodeEntityRanges(text, ranges) {
      var entities = Array(text.length).fill(null);
      if (ranges) {
        ranges.forEach(function(range) {
          var start = substr(text, 0, range.offset).length;
          var end = start + substr(text, range.offset, range.length).length;
          for (var ii = start; ii < end; ii++) {
            entities[ii] = range.key;
          }
        });
      }
      return entities;
    }
    module.exports = decodeEntityRanges;
  }
});

// node_modules/draft-js/lib/decodeInlineStyleRanges.js
var require_decodeInlineStyleRanges = __commonJS({
  "node_modules/draft-js/lib/decodeInlineStyleRanges.js"(exports, module) {
    "use strict";
    var UnicodeUtils = require_UnicodeUtils();
    var _require = require_immutable();
    var OrderedSet = _require.OrderedSet;
    var substr = UnicodeUtils.substr;
    var EMPTY_SET = OrderedSet();
    function decodeInlineStyleRanges(text, ranges) {
      var styles = Array(text.length).fill(EMPTY_SET);
      if (ranges) {
        ranges.forEach(function(range) {
          var cursor = substr(text, 0, range.offset).length;
          var end = cursor + substr(text, range.offset, range.length).length;
          while (cursor < end) {
            styles[cursor] = styles[cursor].add(range.style);
            cursor++;
          }
        });
      }
      return styles;
    }
    module.exports = decodeInlineStyleRanges;
  }
});

// node_modules/draft-js/lib/convertFromRawToDraftState.js
var require_convertFromRawToDraftState = __commonJS({
  "node_modules/draft-js/lib/convertFromRawToDraftState.js"(exports, module) {
    "use strict";
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var ContentBlock = require_ContentBlock();
    var ContentBlockNode = require_ContentBlockNode();
    var ContentState = require_ContentState();
    var DraftEntity = require_DraftEntity();
    var DraftTreeAdapter = require_DraftTreeAdapter();
    var DraftTreeInvariants = require_DraftTreeInvariants();
    var SelectionState = require_SelectionState();
    var createCharacterList = require_createCharacterList();
    var decodeEntityRanges = require_decodeEntityRanges();
    var decodeInlineStyleRanges = require_decodeInlineStyleRanges();
    var generateRandomKey = require_generateRandomKey();
    var gkx = require_gkx();
    var Immutable = require_immutable();
    var invariant = require_invariant();
    var experimentalTreeDataSupport = gkx("draft_tree_data_support");
    var List = Immutable.List;
    var Map = Immutable.Map;
    var OrderedMap = Immutable.OrderedMap;
    var decodeBlockNodeConfig = function decodeBlockNodeConfig2(block, entityMap) {
      var key = block.key, type = block.type, data = block.data, text = block.text, depth = block.depth;
      var blockNodeConfig = {
        text,
        depth: depth || 0,
        type: type || "unstyled",
        key: key || generateRandomKey(),
        data: Map(data),
        characterList: decodeCharacterList(block, entityMap)
      };
      return blockNodeConfig;
    };
    var decodeCharacterList = function decodeCharacterList2(block, entityMap) {
      var text = block.text, rawEntityRanges = block.entityRanges, rawInlineStyleRanges = block.inlineStyleRanges;
      var entityRanges = rawEntityRanges || [];
      var inlineStyleRanges = rawInlineStyleRanges || [];
      return createCharacterList(decodeInlineStyleRanges(text, inlineStyleRanges), decodeEntityRanges(text, entityRanges.filter(function(range) {
        return entityMap.hasOwnProperty(range.key);
      }).map(function(range) {
        return _objectSpread({}, range, {
          key: entityMap[range.key]
        });
      })));
    };
    var addKeyIfMissing = function addKeyIfMissing2(block) {
      return _objectSpread({}, block, {
        key: block.key || generateRandomKey()
      });
    };
    var updateNodeStack = function updateNodeStack2(stack, nodes, parentRef) {
      var nodesWithParentRef = nodes.map(function(block) {
        return _objectSpread({}, block, {
          parentRef
        });
      });
      return stack.concat(nodesWithParentRef.reverse());
    };
    var decodeContentBlockNodes = function decodeContentBlockNodes2(blocks, entityMap) {
      return blocks.map(addKeyIfMissing).reduce(function(blockMap, block, index) {
        !Array.isArray(block.children) ? true ? invariant(false, "invalid RawDraftContentBlock can not be converted to ContentBlockNode") : invariant(false) : void 0;
        var children = block.children.map(addKeyIfMissing);
        var contentBlockNode = new ContentBlockNode(_objectSpread({}, decodeBlockNodeConfig(block, entityMap), {
          prevSibling: index === 0 ? null : blocks[index - 1].key,
          nextSibling: index === blocks.length - 1 ? null : blocks[index + 1].key,
          children: List(children.map(function(child) {
            return child.key;
          }))
        }));
        blockMap = blockMap.set(contentBlockNode.getKey(), contentBlockNode);
        var stack = updateNodeStack([], children, contentBlockNode);
        while (stack.length > 0) {
          var node = stack.pop();
          var parentRef = node.parentRef;
          var siblings = parentRef.getChildKeys();
          var _index = siblings.indexOf(node.key);
          var isValidBlock = Array.isArray(node.children);
          if (!isValidBlock) {
            !isValidBlock ? true ? invariant(false, "invalid RawDraftContentBlock can not be converted to ContentBlockNode") : invariant(false) : void 0;
            break;
          }
          var _children = node.children.map(addKeyIfMissing);
          var _contentBlockNode = new ContentBlockNode(_objectSpread({}, decodeBlockNodeConfig(node, entityMap), {
            parent: parentRef.getKey(),
            children: List(_children.map(function(child) {
              return child.key;
            })),
            prevSibling: _index === 0 ? null : siblings.get(_index - 1),
            nextSibling: _index === siblings.size - 1 ? null : siblings.get(_index + 1)
          }));
          blockMap = blockMap.set(_contentBlockNode.getKey(), _contentBlockNode);
          stack = updateNodeStack(stack, _children, _contentBlockNode);
        }
        return blockMap;
      }, OrderedMap());
    };
    var decodeContentBlocks = function decodeContentBlocks2(blocks, entityMap) {
      return OrderedMap(blocks.map(function(block) {
        var contentBlock = new ContentBlock(decodeBlockNodeConfig(block, entityMap));
        return [contentBlock.getKey(), contentBlock];
      }));
    };
    var decodeRawBlocks = function decodeRawBlocks2(rawState, entityMap) {
      var isTreeRawBlock = rawState.blocks.find(function(block) {
        return Array.isArray(block.children) && block.children.length > 0;
      });
      var rawBlocks = experimentalTreeDataSupport && !isTreeRawBlock ? DraftTreeAdapter.fromRawStateToRawTreeState(rawState).blocks : rawState.blocks;
      if (!experimentalTreeDataSupport) {
        return decodeContentBlocks(isTreeRawBlock ? DraftTreeAdapter.fromRawTreeStateToRawState(rawState).blocks : rawBlocks, entityMap);
      }
      var blockMap = decodeContentBlockNodes(rawBlocks, entityMap);
      if (true) {
        !DraftTreeInvariants.isValidTree(blockMap) ? true ? invariant(false, "Should be a valid tree") : invariant(false) : void 0;
      }
      return blockMap;
    };
    var decodeRawEntityMap = function decodeRawEntityMap2(rawState) {
      var rawEntityMap = rawState.entityMap;
      var entityMap = {};
      Object.keys(rawEntityMap).forEach(function(rawEntityKey) {
        var _rawEntityMap$rawEnti = rawEntityMap[rawEntityKey], type = _rawEntityMap$rawEnti.type, mutability = _rawEntityMap$rawEnti.mutability, data = _rawEntityMap$rawEnti.data;
        entityMap[rawEntityKey] = DraftEntity.__create(type, mutability, data || {});
      });
      return entityMap;
    };
    var convertFromRawToDraftState = function convertFromRawToDraftState2(rawState) {
      !Array.isArray(rawState.blocks) ? true ? invariant(false, "invalid RawDraftContentState") : invariant(false) : void 0;
      var entityMap = decodeRawEntityMap(rawState);
      var blockMap = decodeRawBlocks(rawState, entityMap);
      var selectionState = blockMap.isEmpty() ? new SelectionState() : SelectionState.createEmpty(blockMap.first().getKey());
      return new ContentState({
        blockMap,
        entityMap,
        selectionBefore: selectionState,
        selectionAfter: selectionState
      });
    };
    module.exports = convertFromRawToDraftState;
  }
});

// node_modules/draft-js/lib/getRangeBoundingClientRect.js
var require_getRangeBoundingClientRect = __commonJS({
  "node_modules/draft-js/lib/getRangeBoundingClientRect.js"(exports, module) {
    "use strict";
    var getRangeClientRects = require_getRangeClientRects();
    function getRangeBoundingClientRect(range) {
      var rects = getRangeClientRects(range);
      var top = 0;
      var right = 0;
      var bottom = 0;
      var left = 0;
      if (rects.length) {
        if (rects.length > 1 && rects[0].width === 0) {
          var _rects$ = rects[1];
          top = _rects$.top;
          right = _rects$.right;
          bottom = _rects$.bottom;
          left = _rects$.left;
        } else {
          var _rects$2 = rects[0];
          top = _rects$2.top;
          right = _rects$2.right;
          bottom = _rects$2.bottom;
          left = _rects$2.left;
        }
        for (var ii = 1; ii < rects.length; ii++) {
          var rect = rects[ii];
          if (rect.height !== 0 && rect.width !== 0) {
            top = Math.min(top, rect.top);
            right = Math.max(right, rect.right);
            bottom = Math.max(bottom, rect.bottom);
            left = Math.min(left, rect.left);
          }
        }
      }
      return {
        top,
        right,
        bottom,
        left,
        width: right - left,
        height: bottom - top
      };
    }
    module.exports = getRangeBoundingClientRect;
  }
});

// node_modules/draft-js/lib/getVisibleSelectionRect.js
var require_getVisibleSelectionRect = __commonJS({
  "node_modules/draft-js/lib/getVisibleSelectionRect.js"(exports, module) {
    "use strict";
    var getRangeBoundingClientRect = require_getRangeBoundingClientRect();
    function getVisibleSelectionRect(global2) {
      var selection = global2.getSelection();
      if (!selection.rangeCount) {
        return null;
      }
      var range = selection.getRangeAt(0);
      var boundingRect = getRangeBoundingClientRect(range);
      var top = boundingRect.top, right = boundingRect.right, bottom = boundingRect.bottom, left = boundingRect.left;
      if (top === 0 && right === 0 && bottom === 0 && left === 0) {
        return null;
      }
      return boundingRect;
    }
    module.exports = getVisibleSelectionRect;
  }
});

// node_modules/draft-js/lib/Draft.js
var require_Draft = __commonJS({
  "node_modules/draft-js/lib/Draft.js"(exports, module) {
    var AtomicBlockUtils = require_AtomicBlockUtils();
    var BlockMapBuilder = require_BlockMapBuilder();
    var CharacterMetadata = require_CharacterMetadata();
    var CompositeDraftDecorator = require_CompositeDraftDecorator();
    var ContentBlock = require_ContentBlock();
    var ContentState = require_ContentState();
    var DefaultDraftBlockRenderMap = require_DefaultDraftBlockRenderMap();
    var DefaultDraftInlineStyle = require_DefaultDraftInlineStyle();
    var DraftEditor = require_DraftEditor_react();
    var DraftEditorBlock = require_DraftEditorBlock_react();
    var DraftEntity = require_DraftEntity();
    var DraftModifier = require_DraftModifier();
    var DraftEntityInstance = require_DraftEntityInstance();
    var EditorState = require_EditorState();
    var KeyBindingUtil = require_KeyBindingUtil();
    var RawDraftContentState = require_RawDraftContentState();
    var RichTextEditorUtil = require_RichTextEditorUtil();
    var SelectionState = require_SelectionState();
    var convertFromDraftStateToRaw = require_convertFromDraftStateToRaw();
    var convertFromRawToDraftState = require_convertFromRawToDraftState();
    var generateRandomKey = require_generateRandomKey();
    var getDefaultKeyBinding = require_getDefaultKeyBinding();
    var getVisibleSelectionRect = require_getVisibleSelectionRect();
    var convertFromHTML = require_convertFromHTMLToContentBlocks();
    var DraftPublic = {
      Editor: DraftEditor,
      EditorBlock: DraftEditorBlock,
      EditorState,
      CompositeDecorator: CompositeDraftDecorator,
      Entity: DraftEntity,
      EntityInstance: DraftEntityInstance,
      BlockMapBuilder,
      CharacterMetadata,
      ContentBlock,
      ContentState,
      RawDraftContentState,
      SelectionState,
      AtomicBlockUtils,
      KeyBindingUtil,
      Modifier: DraftModifier,
      RichUtils: RichTextEditorUtil,
      DefaultDraftBlockRenderMap,
      DefaultDraftInlineStyle,
      convertFromHTML,
      convertFromRaw: convertFromRawToDraftState,
      convertToRaw: convertFromDraftStateToRaw,
      genKey: generateRandomKey,
      getDefaultKeyBinding,
      getVisibleSelectionRect
    };
    module.exports = DraftPublic;
  }
});
export default require_Draft();
//# sourceMappingURL=draft-js.js.map
