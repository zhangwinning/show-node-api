[35m[4m[1m# Assert[22m[24m[39m

[90m<!--introduced_in=v0.1.21-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 2 - Stable[0m[23m[39m

[0mThe [33massert[39m module provides a set of assertion functions for verifying[0m
[0minvariants.[0m

[32m[1m## Strict assertion mode[22m[39m

[90m<!-- YAML[39m
[90madded: v9.9.0[39m
[90mchanges:[39m
[90m  - version: v13.9.0[39m
[90m    description: Changed "strict mode" to "strict assertion mode" and "legacy[39m
[90m                 mode" to "legacy assertion mode" to avoid confusion with the[39m
[90m                 more usual meaining of "strict mode".[39m
[90m  - version: v9.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17615[39m
[90m    description: Added error diffs to the strict assertion mode.[39m
[90m  - version: v9.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17002[39m
[90m    description: Added strict assertion mode to the assert module.[39m
[90m-->[39m
[90m[39m
[90m[39m[0mIn strict assertion mode, non-strict methods behave like their corresponding[0m
[0mstrict methods. For example, [34m[33massert.deepEqual()[39m[34m ([34m[4m#assert_assert_deepequal_actual_expected_message[24m[39m[34m)[39m will behave like[0m
[0m[34m[33massert.deepStrictEqual()[39m[34m ([34m[4m#assert_assert_deepstrictequal_actual_expected_message[24m[39m[34m)[39m.[0m

[0mIn strict assertion mode, error messages for objects display a diff. In legacy[0m
[0massertion mode, error messages for objects display the objects, often truncated.[0m

[0mTo use strict assertion mode:[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[32m.[39m[37mstrict[39m[90m;[39m

[0mExample error diff:[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[32m.[39m[37mstrict[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mdeepEqual[39m[90m([39m[33m[[39m[33m[[39m[33m[[39m[34m1[39m[32m,[39m [34m2[39m[32m,[39m [34m3[39m[33m][39m[33m][39m[32m,[39m [34m4[39m[32m,[39m [34m5[39m[33m][39m[32m,[39m [33m[[39m[33m[[39m[33m[[39m[34m1[39m[32m,[39m [34m2[39m[32m,[39m [92m'3'[39m[33m][39m[33m][39m[32m,[39m [34m4[39m[32m,[39m [34m5[39m[33m][39m[90m)[39m[90m;[39m
    [90m// AssertionError: Expected inputs to be strictly deep-equal:[39m
    [90m// + actual - expected ... Lines skipped[39m
    [90m//[39m
    [90m//   [[39m
    [90m//     [[39m
    [90m// ...[39m
    [90m//       2,[39m
    [90m// +     3[39m
    [90m// -     '3'[39m
    [90m//     ],[39m
    [90m// ...[39m
    [90m//     5[39m
    [90m//   ][39m

[0mTo deactivate the colors, use the [33mNO_COLOR[39m or [33mNODE_DISABLE_COLORS[39m[0m
[0menvironment variables. This will also deactivate the colors in the REPL. For[0m
[0mmore on color support in terminal environments, read the tty[0m
[0m[34mgetColorDepth() ([34m[4mtty.html#tty_writestream_getcolordepth_env[24m[39m[34m)[39m documentation.[0m

[32m[1m## Legacy assertion mode[22m[39m

[0mLegacy assertion mode uses the [34mAbstract Equality Comparison ([34m[4mhttps://tc39.github.io/ecma262/#sec-abstract-equality-comparison[24m[39m[34m)[39m in:[0m

    * [0m[34m[33massert.deepEqual()[39m[34m ([34m[4m#assert_assert_deepequal_actual_expected_message[24m[39m[34m)[39m[0m
    * [0m[34m[33massert.equal()[39m[34m ([34m[4m#assert_assert_equal_actual_expected_message[24m[39m[34m)[39m[0m
    * [0m[34m[33massert.notDeepEqual()[39m[34m ([34m[4m#assert_assert_notdeepequal_actual_expected_message[24m[39m[34m)[39m[0m
    * [0m[34m[33massert.notEqual()[39m[34m ([34m[4m#assert_assert_notequal_actual_expected_message[24m[39m[34m)[39m[0m

[0mTo use legacy assertion mode:[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[90m;[39m

[0mWhenever possible, use the [34mstrict assertion mode ([34m[4m#assert_strict_assertion_mode[24m[39m[34m)[39m instead. Otherwise, the[0m
[0m[34mAbstract Equality Comparison ([34m[4mhttps://tc39.github.io/ecma262/#sec-abstract-equality-comparison[24m[39m[34m)[39m may cause surprising results. This is[0m
[0mespecially true for [34m[33massert.deepEqual()[39m[34m ([34m[4m#assert_assert_deepequal_actual_expected_message[24m[39m[34m)[39m, where the comparison rules are[0m
[0mlax:[0m

    [90m// WARNING: This does not throw an AssertionError![39m
    [37massert[39m[32m.[39m[37mdeepEqual[39m[90m([39m/a/gi[32m,[39m [31mnew[39m [37mDate[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m

[32m[1m## Class: assert.AssertionError[22m[39m

    * [0mExtends: {errors.Error}[0m

[0mIndicates the failure of an assertion. All errors thrown by the [33massert[39m module[0m
[0mwill be instances of the [33mAssertionError[39m class.[0m

[32m[1m### [33mnew assert.AssertionError(options)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33moptions[39m {Object}
        * [0m[0m[33mmessage[39m {string} If provided, the error message is set to this value.[0m[0m[0m
      [0m
        * [0m[0m[33mactual[39m {any} The [33mactual[39m property on the error instance.[0m[0m[0m
      [0m
        * [0m[0m[33mexpected[39m {any} The [33mexpected[39m property on the error instance.[0m[0m[0m
      [0m
        * [0m[0m[33moperator[39m {string} The [33moperator[39m property on the error instance.[0m[0m[0m
      [0m
        * [0m[0m[33mstackStartFn[39m {Function} If provided, the generated stack trace omits[0m[0m[0m
      [0m      [0m[0mframes before this function.[0m[0m[0m

[0mA subclass of [33mError[39m that indicates the failure of an assertion.[0m

[0mAll instances contain the built-in [33mError[39m properties ([33mmessage[39m and [33mname[39m)[0m
[0mand:[0m

    * [0m[33mactual[39m {any} Set to the [33mactual[39m argument for methods such as[0m
      [0m[34m[33massert.strictEqual()[39m[34m ([34m[4m#assert_assert_strictequal_actual_expected_message[24m[39m[34m)[39m.[0m
    * [0m[33mexpected[39m {any} Set to the [33mexpected[39m value for methods such as[0m
      [0m[34m[33massert.strictEqual()[39m[34m ([34m[4m#assert_assert_strictequal_actual_expected_message[24m[39m[34m)[39m.[0m
    * [0m[33mgeneratedMessage[39m {boolean} Indicates if the message was auto-generated[0m
      [0m([33mtrue[39m) or not.[0m
    * [0m[33mcode[39m {string} Value is always [33mERR_ASSERTION[39m to show that the error is an[0m
      [0massertion error.[0m
    * [0m[33moperator[39m {string} Set to the passed in operator value.[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[90m;[39m
    
    [90m// Generate an AssertionError to compare the error message later:[39m
    [94mconst[39m [33m{[39m [37mmessage[39m [33m}[39m [93m=[39m [31mnew[39m [37massert[39m[32m.[39m[37mAssertionError[39m[90m([39m[33m{[39m
      [37mactual[39m[93m:[39m [34m1[39m[32m,[39m
      [37mexpected[39m[93m:[39m [34m2[39m[32m,[39m
      [37moperator[39m[93m:[39m [92m'strictEqual'[39m
    [33m}[39m[90m)[39m[90m;[39m
    
    [90m// Verify error output:[39m
    [36mtry[39m [33m{[39m
      [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[34m1[39m[32m,[39m [34m2[39m[90m)[39m[90m;[39m
    [33m}[39m [36mcatch[39m [90m([39m[37merr[39m[90m)[39m [33m{[39m
      [37massert[39m[90m([39m[37merr[39m [94minstanceof[39m [37massert[39m[32m.[39m[37mAssertionError[39m[90m)[39m[90m;[39m
      [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37merr[39m[32m.[39m[37mmessage[39m[32m,[39m [37mmessage[39m[90m)[39m[90m;[39m
      [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37merr[39m[32m.[39m[37mname[39m[32m,[39m [92m'AssertionError'[39m[90m)[39m[90m;[39m
      [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37merr[39m[32m.[39m[37mactual[39m[32m,[39m [34m1[39m[90m)[39m[90m;[39m
      [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37merr[39m[32m.[39m[37mexpected[39m[32m,[39m [34m2[39m[90m)[39m[90m;[39m
      [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37merr[39m[32m.[39m[37mcode[39m[32m,[39m [92m'ERR_ASSERTION'[39m[90m)[39m[90m;[39m
      [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37merr[39m[32m.[39m[37moperator[39m[32m,[39m [92m'strictEqual'[39m[90m)[39m[90m;[39m
      [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37merr[39m[32m.[39m[37mgeneratedMessage[39m[32m,[39m [91mtrue[39m[90m)[39m[90m;[39m
    [33m}[39m

[32m[1m## [33massert(value[, message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.5.9[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any} The input that is checked for being truthy.[0m
    * [0m[33mmessage[39m {string|Error}[0m

[0mAn alias of [34m[33massert.ok()[39m[34m ([34m[4m#assert_assert_ok_value_message[24m[39m[34m)[39m.[0m

[32m[1m## [33massert.deepEqual(actual, expected[, message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30766[39m
[90m    description: NaN is now treated as being identical in case both sides are[39m
[90m                 NaN.[39m
[90m  - version: v12.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/25008[39m
[90m    description: The type tags are now properly compared and there are a couple[39m
[90m                 minor comparison adjustments to make the check less surprising.[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15001[39m
[90m    description: The `Error` names and messages are now properly compared[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12142[39m
[90m    description: The `Set` and `Map` content is also compared[39m
[90m  - version: v6.4.0, v4.7.1[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8002[39m
[90m    description: Typed array slices are handled correctly now.[39m
[90m  - version: v6.1.0, v4.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6432[39m
[90m    description: Objects with circular references can be used as inputs now.[39m
[90m  - version: v5.10.1, v4.4.3[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5910[39m
[90m    description: Handle non-`Uint8Array` typed arrays correctly.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mactual[39m {any}[0m
    * [0m[33mexpected[39m {any}[0m
    * [0m[33mmessage[39m {string|Error}[0m

[0m[1mStrict assertion mode[22m[0m

[0mAn alias of [34m[33massert.deepStrictEqual()[39m[34m ([34m[4m#assert_assert_deepstrictequal_actual_expected_message[24m[39m[34m)[39m.[0m

[0m[1mLegacy assertion mode[22m[0m

[90m[3m    [0mStability: 0 - Deprecated: Use [34m[33massert.deepStrictEqual()[39m[90m[34m ([34m[4m#assert_assert_deepstrictequal_actual_expected_message[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

[0mTests for deep equality between the [33mactual[39m and [33mexpected[39m parameters. Consider[0m
[0musing [34m[33massert.deepStrictEqual()[39m[34m ([34m[4m#assert_assert_deepstrictequal_actual_expected_message[24m[39m[34m)[39m instead. [34m[33massert.deepEqual()[39m[34m ([34m[4m#assert_assert_deepequal_actual_expected_message[24m[39m[34m)[39m can have[0m
[0msurprising results.[0m

[0m[3mDeep equality[23m means that the enumerable "own" properties of child objects[0m
[0mare also recursively evaluated by the following rules.[0m

[32m[1m### Comparison details[22m[39m

    * [0mPrimitive values are compared with the [34mAbstract Equality Comparison ([34m[4mhttps://tc39.github.io/ecma262/#sec-abstract-equality-comparison[24m[39m[34m)[39m[0m
      [0m( [33m==[39m ) with the exception of [33mNaN[39m. It is treated as being identical in case[0m
      [0mboth sides are [33mNaN[39m.[0m
    * [0m[34mType tags ([34m[4mhttps://tc39.github.io/ecma262/#sec-object.prototype.tostring[24m[39m[34m)[39m of objects should be the same.[0m
    * [0mOnly [34menumerable "own" properties ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties[24m[39m[34m)[39m are considered.[0m
    * [0m[34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m names and messages are always compared, even if these are not[0m
      [0menumerable properties.[0m
    * [0m[34mObject wrappers ([34m[4mhttps://developer.mozilla.org/en-US/docs/Glossary/Primitive#Primitive_wrapper_objects_in_JavaScript[24m[39m[34m)[39m are compared both as objects and unwrapped values.[0m
    * [0m[33mObject[39m properties are compared unordered.[0m
    * [0m[34m[33mMap[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map[24m[39m[34m)[39m keys and [34m[33mSet[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set[24m[39m[34m)[39m items are compared unordered.[0m
    * [0mRecursion stops when both sides differ or both sides encounter a circular[0m
      [0mreference.[0m
    * [0mImplementation does not test the [34m[33m[[Prototype]][39m[34m ([34m[4mhttps://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots[24m[39m[34m)[39m of[0m
      [0mobjects.[0m
    * [0m[34m[33mSymbol[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol[24m[39m[34m)[39m properties are not compared.[0m
    * [0m[34m[33mWeakMap[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap[24m[39m[34m)[39m and [34m[33mWeakSet[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet[24m[39m[34m)[39m comparison does not rely on their values.[0m

[0mThe following example does not throw an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m because the[0m
[0mprimitives are considered equal by the [34mAbstract Equality Comparison ([34m[4mhttps://tc39.github.io/ecma262/#sec-abstract-equality-comparison[24m[39m[34m)[39m[0m
[0m( [33m==[39m ).[0m

    [90m// WARNING: This does not throw an AssertionError![39m
    [37massert[39m[32m.[39m[37mdeepEqual[39m[90m([39m[92m'+00000000'[39m[32m,[39m [91mfalse[39m[90m)[39m[90m;[39m

[0m"Deep" equality means that the enumerable "own" properties of child objects[0m
[0mare evaluated also:[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mobj1[39m [93m=[39m [33m{[39m
      [37ma[39m[93m:[39m [33m{[39m
        [37mb[39m[93m:[39m [34m1[39m
      [33m}[39m
    [33m}[39m[90m;[39m
    [94mconst[39m [37mobj2[39m [93m=[39m [33m{[39m
      [37ma[39m[93m:[39m [33m{[39m
        [37mb[39m[93m:[39m [34m2[39m
      [33m}[39m
    [33m}[39m[90m;[39m
    [94mconst[39m [37mobj3[39m [93m=[39m [33m{[39m
      [37ma[39m[93m:[39m [33m{[39m
        [37mb[39m[93m:[39m [34m1[39m
      [33m}[39m
    [33m}[39m[90m;[39m
    [94mconst[39m [37mobj4[39m [93m=[39m [37mObject[39m[32m.[39m[37mcreate[39m[90m([39m[37mobj1[39m[90m)[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mdeepEqual[39m[90m([39m[37mobj1[39m[32m,[39m [37mobj1[39m[90m)[39m[90m;[39m
    [90m// OK[39m
    
    [90m// Values of b are different:[39m
    [37massert[39m[32m.[39m[37mdeepEqual[39m[90m([39m[37mobj1[39m[32m,[39m [37mobj2[39m[90m)[39m[90m;[39m
    [90m// AssertionError: { a: { b: 1 } } deepEqual { a: { b: 2 } }[39m
    
    [37massert[39m[32m.[39m[37mdeepEqual[39m[90m([39m[37mobj1[39m[32m,[39m [37mobj3[39m[90m)[39m[90m;[39m
    [90m// OK[39m
    
    [90m// Prototypes are ignored:[39m
    [37massert[39m[32m.[39m[37mdeepEqual[39m[90m([39m[37mobj1[39m[32m,[39m [37mobj4[39m[90m)[39m[90m;[39m
    [90m// AssertionError: { a: { b: 1 } } deepEqual {}[39m

[0mIf the values are not equal, an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m is thrown with a [33mmessage[39m[0m
[0mproperty set equal to the value of the [33mmessage[39m parameter. If the [33mmessage[39m[0m
[0mparameter is undefined, a default error message is assigned. If the [33mmessage[39m[0m
[0mparameter is an instance of an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m then it will be thrown instead of the[0m
[0m[34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m.[0m

[32m[1m## [33massert.deepStrictEqual(actual, expected[, message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v1.2.0[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15169[39m
[90m    description: Enumerable symbol properties are now compared.[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15036[39m
[90m    description: The `NaN` is now compared using the[39m
[90m              [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero)[39m
[90m              comparison.[39m
[90m  - version: v8.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15001[39m
[90m    description: The `Error` names and messages are now properly compared[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12142[39m
[90m    description: The `Set` and `Map` content is also compared[39m
[90m  - version: v6.4.0, v4.7.1[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8002[39m
[90m    description: Typed array slices are handled correctly now.[39m
[90m  - version: v6.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6432[39m
[90m    description: Objects with circular references can be used as inputs now.[39m
[90m  - version: v5.10.1, v4.4.3[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5910[39m
[90m    description: Handle non-`Uint8Array` typed arrays correctly.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mactual[39m {any}[0m
    * [0m[33mexpected[39m {any}[0m
    * [0m[33mmessage[39m {string|Error}[0m

[0mTests for deep equality between the [33mactual[39m and [33mexpected[39m parameters.[0m
[0m"Deep" equality means that the enumerable "own" properties of child objects[0m
[0mare recursively evaluated also by the following rules.[0m

[32m[1m### Comparison details[22m[39m

    * [0mPrimitive values are compared using the [34mSameValue Comparison ([34m[4mhttps://tc39.github.io/ecma262/#sec-samevalue[24m[39m[34m)[39m, used by[0m
      [0m[34m[33mObject.is()[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is[24m[39m[34m)[39m.[0m
    * [0m[34mType tags ([34m[4mhttps://tc39.github.io/ecma262/#sec-object.prototype.tostring[24m[39m[34m)[39m of objects should be the same.[0m
    * [0m[34m[33m[[Prototype]][39m[34m ([34m[4mhttps://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots[24m[39m[34m)[39m of objects are compared using[0m
      [0mthe [34mStrict Equality Comparison ([34m[4mhttps://tc39.github.io/ecma262/#sec-strict-equality-comparison[24m[39m[34m)[39m.[0m
    * [0mOnly [34menumerable "own" properties ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties[24m[39m[34m)[39m are considered.[0m
    * [0m[34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m names and messages are always compared, even if these are not[0m
      [0menumerable properties.[0m
    * [0mEnumerable own [34m[33mSymbol[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol[24m[39m[34m)[39m properties are compared as well.[0m
    * [0m[34mObject wrappers ([34m[4mhttps://developer.mozilla.org/en-US/docs/Glossary/Primitive#Primitive_wrapper_objects_in_JavaScript[24m[39m[34m)[39m are compared both as objects and unwrapped values.[0m
    * [0m[33mObject[39m properties are compared unordered.[0m
    * [0m[34m[33mMap[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map[24m[39m[34m)[39m keys and [34m[33mSet[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set[24m[39m[34m)[39m items are compared unordered.[0m
    * [0mRecursion stops when both sides differ or both sides encounter a circular[0m
      [0mreference.[0m
    * [0m[34m[33mWeakMap[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap[24m[39m[34m)[39m and [34m[33mWeakSet[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet[24m[39m[34m)[39m comparison does not rely on their values. See[0m
      [0mbelow for further details.[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[32m.[39m[37mstrict[39m[90m;[39m
    
    [90m// This fails because 1 !== '1'.[39m
    [37massert[39m[32m.[39m[37mdeepStrictEqual[39m[90m([39m[33m{[39m [37ma[39m[93m:[39m [34m1[39m [33m}[39m[32m,[39m [33m{[39m [37ma[39m[93m:[39m [92m'1'[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// AssertionError: Expected inputs to be strictly deep-equal:[39m
    [90m// + actual - expected[39m
    [90m//[39m
    [90m//   {[39m
    [90m// +   a: 1[39m
    [90m// -   a: '1'[39m
    [90m//   }[39m
    
    [90m// The following objects don't have own properties[39m
    [94mconst[39m [37mdate[39m [93m=[39m [31mnew[39m [37mDate[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37mobject[39m [93m=[39m [33m{[39m[33m}[39m[90m;[39m
    [94mconst[39m [37mfakeDate[39m [93m=[39m [33m{[39m[33m}[39m[90m;[39m
    [37mObject[39m[32m.[39m[37msetPrototypeOf[39m[90m([39m[37mfakeDate[39m[32m,[39m [37mDate[39m[32m.[39m[37mprototype[39m[90m)[39m[90m;[39m
    
    [90m// Different [[Prototype]]:[39m
    [37massert[39m[32m.[39m[37mdeepStrictEqual[39m[90m([39m[37mobject[39m[32m,[39m [37mfakeDate[39m[90m)[39m[90m;[39m
    [90m// AssertionError: Expected inputs to be strictly deep-equal:[39m
    [90m// + actual - expected[39m
    [90m//[39m
    [90m// + {}[39m
    [90m// - Date {}[39m
    
    [90m// Different type tags:[39m
    [37massert[39m[32m.[39m[37mdeepStrictEqual[39m[90m([39m[37mdate[39m[32m,[39m [37mfakeDate[39m[90m)[39m[90m;[39m
    [90m// AssertionError: Expected inputs to be strictly deep-equal:[39m
    [90m// + actual - expected[39m
    [90m//[39m
    [90m// + 2018-04-26T00:49:08.604Z[39m
    [90m// - Date {}[39m
    
    [37massert[39m[32m.[39m[37mdeepStrictEqual[39m[90m([39m[37mNaN[39m[32m,[39m [37mNaN[39m[90m)[39m[90m;[39m
    [90m// OK, because of the SameValue comparison[39m
    
    [90m// Different unwrapped numbers:[39m
    [37massert[39m[32m.[39m[37mdeepStrictEqual[39m[90m([39m[31mnew[39m [37mNumber[39m[90m([39m[34m1[39m[90m)[39m[32m,[39m [31mnew[39m [37mNumber[39m[90m([39m[34m2[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// AssertionError: Expected inputs to be strictly deep-equal:[39m
    [90m// + actual - expected[39m
    [90m//[39m
    [90m// + [Number: 1][39m
    [90m// - [Number: 2][39m
    
    [37massert[39m[32m.[39m[37mdeepStrictEqual[39m[90m([39m[31mnew[39m [37mString[39m[90m([39m[92m'foo'[39m[90m)[39m[32m,[39m [37mObject[39m[90m([39m[92m'foo'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// OK because the object and the string are identical when unwrapped.[39m
    
    [37massert[39m[32m.[39m[37mdeepStrictEqual[39m[90m([39m[93m-[39m[34m0[39m[32m,[39m [93m-[39m[34m0[39m[90m)[39m[90m;[39m
    [90m// OK[39m
    
    [90m// Different zeros using the SameValue Comparison:[39m
    [37massert[39m[32m.[39m[37mdeepStrictEqual[39m[90m([39m[34m0[39m[32m,[39m [93m-[39m[34m0[39m[90m)[39m[90m;[39m
    [90m// AssertionError: Expected inputs to be strictly deep-equal:[39m
    [90m// + actual - expected[39m
    [90m//[39m
    [90m// + 0[39m
    [90m// - -0[39m
    
    [94mconst[39m [37msymbol1[39m [93m=[39m [37mSymbol[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37msymbol2[39m [93m=[39m [37mSymbol[39m[90m([39m[90m)[39m[90m;[39m
    [37massert[39m[32m.[39m[37mdeepStrictEqual[39m[90m([39m[33m{[39m [33m[[39m[37msymbol1[39m[33m][39m[93m:[39m [34m1[39m [33m}[39m[32m,[39m [33m{[39m [33m[[39m[37msymbol1[39m[33m][39m[93m:[39m [34m1[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// OK, because it is the same symbol on both objects.[39m
    
    [37massert[39m[32m.[39m[37mdeepStrictEqual[39m[90m([39m[33m{[39m [33m[[39m[37msymbol1[39m[33m][39m[93m:[39m [34m1[39m [33m}[39m[32m,[39m [33m{[39m [33m[[39m[37msymbol2[39m[33m][39m[93m:[39m [34m1[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: Inputs identical but not reference equal:[39m
    [90m//[39m
    [90m// {[39m
    [90m//   [Symbol()]: 1[39m
    [90m// }[39m
    
    [94mconst[39m [37mweakMap1[39m [93m=[39m [31mnew[39m [37mWeakMap[39m[90m([39m[90m)[39m[90m;[39m
    [94mconst[39m [37mweakMap2[39m [93m=[39m [31mnew[39m [37mWeakMap[39m[90m([39m[33m[[39m[33m[[39m[33m{[39m[33m}[39m[32m,[39m [33m{[39m[33m}[39m[33m][39m[33m][39m[90m)[39m[90m;[39m
    [94mconst[39m [37mweakMap3[39m [93m=[39m [31mnew[39m [37mWeakMap[39m[90m([39m[90m)[39m[90m;[39m
    [37mweakMap3[39m[32m.[39m[37munequal[39m [93m=[39m [91mtrue[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mdeepStrictEqual[39m[90m([39m[37mweakMap1[39m[32m,[39m [37mweakMap2[39m[90m)[39m[90m;[39m
    [90m// OK, because it is impossible to compare the entries[39m
    
    [90m// Fails because weakMap3 has a property that weakMap1 does not contain:[39m
    [37massert[39m[32m.[39m[37mdeepStrictEqual[39m[90m([39m[37mweakMap1[39m[32m,[39m [37mweakMap3[39m[90m)[39m[90m;[39m
    [90m// AssertionError: Expected inputs to be strictly deep-equal:[39m
    [90m// + actual - expected[39m
    [90m//[39m
    [90m//   WeakMap {[39m
    [90m// +   [items unknown][39m
    [90m// -   [items unknown],[39m
    [90m// -   unequal: true[39m
    [90m//   }[39m

[0mIf the values are not equal, an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m is thrown with a [33mmessage[39m[0m
[0mproperty set equal to the value of the [33mmessage[39m parameter. If the [33mmessage[39m[0m
[0mparameter is undefined, a default error message is assigned. If the [33mmessage[39m[0m
[0mparameter is an instance of an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m then it will be thrown instead of the[0m
[0m[33mAssertionError[39m.[0m

[32m[1m## [33massert.doesNotMatch(string, regexp[, message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstring[39m {string}[0m
    * [0m[33mregexp[39m {RegExp}[0m
    * [0m[33mmessage[39m {string|Error}[0m

[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0mExpects the [33mstring[39m input not to match the regular expression.[0m

[0mThis feature is currently experimental and the name might change or it might be[0m
[0mcompletely removed again.[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[32m.[39m[37mstrict[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mdoesNotMatch[39m[90m([39m[92m'I will fail'[39m[32m,[39m /fail/[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: The input was expected to not match the ...[39m
    
    [37massert[39m[32m.[39m[37mdoesNotMatch[39m[90m([39m[34m123[39m[32m,[39m /pass/[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: The "string" argument must be of type string.[39m
    
    [37massert[39m[32m.[39m[37mdoesNotMatch[39m[90m([39m[92m'I will pass'[39m[32m,[39m /different/[90m)[39m[90m;[39m
    [90m// OK[39m

[0mIf the values do match, or if the [33mstring[39m argument is of another type than[0m
[0m[33mstring[39m, an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m is thrown with a [33mmessage[39m property set equal[0m
[0mto the value of the [33mmessage[39m parameter. If the [33mmessage[39m parameter is[0m
[0mundefined, a default error message is assigned. If the [33mmessage[39m parameter is an[0m
[0minstance of an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m then it will be thrown instead of the[0m
[0m[34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m.[0m

[32m[1m## [33massert.doesNotReject(asyncFn[, error][, message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33masyncFn[39m {Function|Promise}[0m
    * [0m[33merror[39m {RegExp|Function}[0m
    * [0m[33mmessage[39m {string}[0m

[0mAwaits the [33masyncFn[39m promise or, if [33masyncFn[39m is a function, immediately[0m
[0mcalls the function and awaits the returned promise to complete. It will then[0m
[0mcheck that the promise is not rejected.[0m

[0mIf [33masyncFn[39m is a function and it throws an error synchronously,[0m
[0m[33massert.doesNotReject()[39m will return a rejected [33mPromise[39m with that error. If[0m
[0mthe function does not return a promise, [33massert.doesNotReject()[39m will return a[0m
[0mrejected [33mPromise[39m with an [34m[33mERR_INVALID_RETURN_VALUE[39m[34m ([34m[4merrors.html#errors_err_invalid_return_value[24m[39m[34m)[39m error. In both cases[0m
[0mthe error handler is skipped.[0m

[0mUsing [33massert.doesNotReject()[39m is actually not useful because there is little[0m
[0mbenefit in catching a rejection and then rejecting it again. Instead, consider[0m
[0madding a comment next to the specific code path that should not reject and keep[0m
[0merror messages as expressive as possible.[0m

[0mIf specified, [33merror[39m can be a [34m[33mClass[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes[24m[39m[34m)[39m, [34m[33mRegExp[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions[24m[39m[34m)[39m or a validation[0m
[0mfunction. See [34m[33massert.throws()[39m[34m ([34m[4m#assert_assert_throws_fn_error_message[24m[39m[34m)[39m for more details.[0m

[0mBesides the async nature to await the completion behaves identically to[0m
[0m[34m[33massert.doesNotThrow()[39m[34m ([34m[4m#assert_assert_doesnotthrow_fn_error_message[24m[39m[34m)[39m.[0m

[90m<!-- eslint-disable no-restricted-syntax -->[39m
[90m[39m    [90m([39m[37masync[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mawait[39m [37massert[39m[32m.[39m[37mdoesNotReject[39m[90m([39m
        [37masync[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
          [94mthrow[39m [31mnew[39m [37mTypeError[39m[90m([39m[92m'Wrong value'[39m[90m)[39m[90m;[39m
        [33m}[39m[32m,[39m
        [37mSyntaxError[39m
      [90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

[90m<!-- eslint-disable no-restricted-syntax -->[39m
[90m[39m    [37massert[39m[32m.[39m[37mdoesNotReject[39m[90m([39m[37mPromise[39m[32m.[39m[37mreject[39m[90m([39m[31mnew[39m [37mTypeError[39m[90m([39m[92m'Wrong value'[39m[90m)[39m[90m)[39m[90m)[39m
      [32m.[39m[37mthen[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [90m// ...[39m
      [33m}[39m[90m)[39m[90m;[39m

[32m[1m## [33massert.doesNotThrow(fn[, error][, message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: v5.11.0, v4.4.5[39m
[90m    pr-url: https://github.com/nodejs/node/pull/2407[39m
[90m    description: The `message` parameter is respected now.[39m
[90m  - version: v4.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3276[39m
[90m    description: The `error` parameter can now be an arrow function.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfn[39m {Function}[0m
    * [0m[33merror[39m {RegExp|Function}[0m
    * [0m[33mmessage[39m {string}[0m

[0mAsserts that the function [33mfn[39m does not throw an error.[0m

[0mUsing [33massert.doesNotThrow()[39m is actually not useful because there[0m
[0mis no benefit in catching an error and then rethrowing it. Instead, consider[0m
[0madding a comment next to the specific code path that should not throw and keep[0m
[0merror messages as expressive as possible.[0m

[0mWhen [33massert.doesNotThrow()[39m is called, it will immediately call the [33mfn[39m[0m
[0mfunction.[0m

[0mIf an error is thrown and it is the same type as that specified by the [33merror[39m[0m
[0mparameter, then an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m is thrown. If the error is of a[0m
[0mdifferent type, or if the [33merror[39m parameter is undefined, the error is[0m
[0mpropagated back to the caller.[0m

[0mIf specified, [33merror[39m can be a [34m[33mClass[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes[24m[39m[34m)[39m, [34m[33mRegExp[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions[24m[39m[34m)[39m or a validation[0m
[0mfunction. See [34m[33massert.throws()[39m[34m ([34m[4m#assert_assert_throws_fn_error_message[24m[39m[34m)[39m for more details.[0m

[0mThe following, for instance, will throw the [34m[33mTypeError[39m[34m ([34m[4merrors.html#errors_class_typeerror[24m[39m[34m)[39m because there is no[0m
[0mmatching error type in the assertion:[0m

[90m<!-- eslint-disable no-restricted-syntax -->[39m
[90m[39m    [37massert[39m[32m.[39m[37mdoesNotThrow[39m[90m([39m
      [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [94mthrow[39m [31mnew[39m [37mTypeError[39m[90m([39m[92m'Wrong value'[39m[90m)[39m[90m;[39m
      [33m}[39m[32m,[39m
      [37mSyntaxError[39m
    [90m)[39m[90m;[39m

[0mHowever, the following will result in an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m with the message[0m
[0m'Got unwanted exception...':[0m

[90m<!-- eslint-disable no-restricted-syntax -->[39m
[90m[39m    [37massert[39m[32m.[39m[37mdoesNotThrow[39m[90m([39m
      [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [94mthrow[39m [31mnew[39m [37mTypeError[39m[90m([39m[92m'Wrong value'[39m[90m)[39m[90m;[39m
      [33m}[39m[32m,[39m
      [37mTypeError[39m
    [90m)[39m[90m;[39m

[0mIf an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m is thrown and a value is provided for the [33mmessage[39m[0m
[0mparameter, the value of [33mmessage[39m will be appended to the [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m[0m
[0mmessage:[0m

[90m<!-- eslint-disable no-restricted-syntax -->[39m
[90m[39m    [37massert[39m[32m.[39m[37mdoesNotThrow[39m[90m([39m
      [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [94mthrow[39m [31mnew[39m [37mTypeError[39m[90m([39m[92m'Wrong value'[39m[90m)[39m[90m;[39m
      [33m}[39m[32m,[39m
      /Wrong value/[32m,[39m
      [92m'Whoops'[39m
    [90m)[39m[90m;[39m
    [90m// Throws: AssertionError: Got unwanted exception: Whoops[39m

[32m[1m## [33massert.equal(actual, expected[, message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30766[39m
[90m    description: NaN is now treated as being identical in case both sides are[39m
[90m                 NaN.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mactual[39m {any}[0m
    * [0m[33mexpected[39m {any}[0m
    * [0m[33mmessage[39m {string|Error}[0m

[0m[1mStrict assertion mode[22m[0m

[0mAn alias of [34m[33massert.strictEqual()[39m[34m ([34m[4m#assert_assert_strictequal_actual_expected_message[24m[39m[34m)[39m.[0m

[0m[1mLegacy assertion mode[22m[0m

[90m[3m    [0mStability: 0 - Deprecated: Use [34m[33massert.strictEqual()[39m[90m[34m ([34m[4m#assert_assert_strictequal_actual_expected_message[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

[0mTests shallow, coercive equality between the [33mactual[39m and [33mexpected[39m parameters[0m
[0musing the [34mAbstract Equality Comparison ([34m[4mhttps://tc39.github.io/ecma262/#sec-abstract-equality-comparison[24m[39m[34m)[39m ( [33m==[39m ). [33mNaN[39m is special handled[0m
[0mand treated as being identical in case both sides are [33mNaN[39m.[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mequal[39m[90m([39m[34m1[39m[32m,[39m [34m1[39m[90m)[39m[90m;[39m
    [90m// OK, 1 == 1[39m
    [37massert[39m[32m.[39m[37mequal[39m[90m([39m[34m1[39m[32m,[39m [92m'1'[39m[90m)[39m[90m;[39m
    [90m// OK, 1 == '1'[39m
    [37massert[39m[32m.[39m[37mequal[39m[90m([39m[37mNaN[39m[32m,[39m [37mNaN[39m[90m)[39m[90m;[39m
    [90m// OK[39m
    
    [37massert[39m[32m.[39m[37mequal[39m[90m([39m[34m1[39m[32m,[39m [34m2[39m[90m)[39m[90m;[39m
    [90m// AssertionError: 1 == 2[39m
    [37massert[39m[32m.[39m[37mequal[39m[90m([39m[33m{[39m [37ma[39m[93m:[39m [33m{[39m [37mb[39m[93m:[39m [34m1[39m [33m}[39m [33m}[39m[32m,[39m [33m{[39m [37ma[39m[93m:[39m [33m{[39m [37mb[39m[93m:[39m [34m1[39m [33m}[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// AssertionError: { a: { b: 1 } } == { a: { b: 1 } }[39m

[0mIf the values are not equal, an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m is thrown with a [33mmessage[39m[0m
[0mproperty set equal to the value of the [33mmessage[39m parameter. If the [33mmessage[39m[0m
[0mparameter is undefined, a default error message is assigned. If the [33mmessage[39m[0m
[0mparameter is an instance of an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m then it will be thrown instead of the[0m
[0m[33mAssertionError[39m.[0m

[32m[1m## [33massert.fail([message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mmessage[39m {string|Error} [1mDefault:[22m [33m'Failed'[39m[0m

[0mThrows an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m with the provided error message or a default[0m
[0merror message. If the [33mmessage[39m parameter is an instance of an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m then[0m
[0mit will be thrown instead of the [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m.[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[32m.[39m[37mstrict[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mfail[39m[90m([39m[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: Failed[39m
    
    [37massert[39m[32m.[39m[37mfail[39m[90m([39m[92m'boom'[39m[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: boom[39m
    
    [37massert[39m[32m.[39m[37mfail[39m[90m([39m[31mnew[39m [37mTypeError[39m[90m([39m[92m'need array'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// TypeError: need array[39m

[0mUsing [33massert.fail()[39m with more than two arguments is possible but deprecated.[0m
[0mSee below for further details.[0m

[32m[1m## [33massert.fail(actual, expected[, message[, operator[, stackStartFn]]])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18418[39m
[90m    description: Calling `assert.fail()` with more than one argument is[39m
[90m                 deprecated and emits a warning.[39m
[90m-->[39m
[90m[39m
[90m[39m[90m[3m    [0mStability: 0 - Deprecated: Use [33massert.fail([message])[39m[90m or other assert[0m[23m[39m
[90m[3m    [0mfunctions instead.[0m[23m[39m

    * [0m[33mactual[39m {any}[0m
    * [0m[33mexpected[39m {any}[0m
    * [0m[33mmessage[39m {string|Error}[0m
    * [0m[33moperator[39m {string} [1mDefault:[22m [33m'!='[39m[0m
    * [0m[33mstackStartFn[39m {Function} [1mDefault:[22m [33massert.fail[39m[0m

[0mIf [33mmessage[39m is falsy, the error message is set as the values of [33mactual[39m and[0m
[0m[33mexpected[39m separated by the provided [33moperator[39m. If just the two [33mactual[39m and[0m
[0m[33mexpected[39m arguments are provided, [33moperator[39m will default to [33m'!='[39m. If[0m
[0m[33mmessage[39m is provided as third argument it will be used as the error message and[0m
[0mthe other arguments will be stored as properties on the thrown object. If[0m
[0m[33mstackStartFn[39m is provided, all stack frames above that function will be[0m
[0mremoved from stacktrace (see [34m[33mError.captureStackTrace[39m[34m ([34m[4merrors.html#errors_error_capturestacktrace_targetobject_constructoropt[24m[39m[34m)[39m). If no arguments are[0m
[0mgiven, the default message [33mFailed[39m will be used.[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[32m.[39m[37mstrict[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mfail[39m[90m([39m[92m'a'[39m[32m,[39m [92m'b'[39m[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: 'a' != 'b'[39m
    
    [37massert[39m[32m.[39m[37mfail[39m[90m([39m[34m1[39m[32m,[39m [34m2[39m[32m,[39m [90mundefined[39m[32m,[39m [92m'>'[39m[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: 1 > 2[39m
    
    [37massert[39m[32m.[39m[37mfail[39m[90m([39m[34m1[39m[32m,[39m [34m2[39m[32m,[39m [92m'fail'[39m[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: fail[39m
    
    [37massert[39m[32m.[39m[37mfail[39m[90m([39m[34m1[39m[32m,[39m [34m2[39m[32m,[39m [92m'whoops'[39m[32m,[39m [92m'>'[39m[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: whoops[39m
    
    [37massert[39m[32m.[39m[37mfail[39m[90m([39m[34m1[39m[32m,[39m [34m2[39m[32m,[39m [31mnew[39m [37mTypeError[39m[90m([39m[92m'need array'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// TypeError: need array[39m

[0mIn the last three cases [33mactual[39m, [33mexpected[39m, and [33moperator[39m have no[0m
[0minfluence on the error message.[0m

[0mExample use of [33mstackStartFn[39m for truncating the exception's stacktrace:[0m

    [94mfunction[39m [37msuppressFrame[39m[90m([39m[90m)[39m [33m{[39m
      [37massert[39m[32m.[39m[37mfail[39m[90m([39m[92m'a'[39m[32m,[39m [92m'b'[39m[32m,[39m [90mundefined[39m[32m,[39m [92m'!=='[39m[32m,[39m [37msuppressFrame[39m[90m)[39m[90m;[39m
    [33m}[39m
    [37msuppressFrame[39m[90m([39m[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: 'a' !== 'b'[39m
    [90m//     at repl:1:1[39m
    [90m//     at ContextifyScript.Script.runInThisContext (vm.js:44:33)[39m
    [90m//     ...[39m

[32m[1m## [33massert.ifError(value)[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.97[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18247[39m
[90m    description: Instead of throwing the original error it is now wrapped into[39m
[90m                 an [`AssertionError`][] that contains the full stack trace.[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18247[39m
[90m    description: Value may now only be `undefined` or `null`. Before all falsy[39m
[90m                 values were handled the same as `null` and did not throw.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m

[0mThrows [33mvalue[39m if [33mvalue[39m is not [33mundefined[39m or [33mnull[39m. This is useful when[0m
[0mtesting the [33merror[39m argument in callbacks. The stack trace contains all frames[0m
[0mfrom the error passed to [33mifError()[39m including the potential new frames for[0m
[0m[33mifError()[39m itself.[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[32m.[39m[37mstrict[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mifError[39m[90m([39m[90mnull[39m[90m)[39m[90m;[39m
    [90m// OK[39m
    [37massert[39m[32m.[39m[37mifError[39m[90m([39m[34m0[39m[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: 0[39m
    [37massert[39m[32m.[39m[37mifError[39m[90m([39m[92m'error'[39m[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: 'error'[39m
    [37massert[39m[32m.[39m[37mifError[39m[90m([39m[31mnew[39m [37mError[39m[90m([39m[90m)[39m[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: Error[39m
    
    [90m// Create some random error frames.[39m
    [94mlet[39m [37merr[39m[90m;[39m
    [90m([39m[94mfunction[39m [37merrorFrame[39m[90m([39m[90m)[39m [33m{[39m
      [37merr[39m [93m=[39m [31mnew[39m [37mError[39m[90m([39m[92m'test error'[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m
    
    [90m([39m[94mfunction[39m [37mifErrorFrame[39m[90m([39m[90m)[39m [33m{[39m
      [37massert[39m[32m.[39m[37mifError[39m[90m([39m[37merr[39m[90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: test error[39m
    [90m//     at ifErrorFrame[39m
    [90m//     at errorFrame[39m

[32m[1m## [33massert.match(string, regexp[, message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v13.6.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mstring[39m {string}[0m
    * [0m[33mregexp[39m {RegExp}[0m
    * [0m[33mmessage[39m {string|Error}[0m

[90m[3m    [0mStability: 1 - Experimental[0m[23m[39m

[0mExpects the [33mstring[39m input to match the regular expression.[0m

[0mThis feature is currently experimental and the name might change or it might be[0m
[0mcompletely removed again.[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[32m.[39m[37mstrict[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mmatch[39m[90m([39m[92m'I will fail'[39m[32m,[39m /pass/[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: The input did not match the regular ...[39m
    
    [37massert[39m[32m.[39m[37mmatch[39m[90m([39m[34m123[39m[32m,[39m /pass/[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: The "string" argument must be of type string.[39m
    
    [37massert[39m[32m.[39m[37mmatch[39m[90m([39m[92m'I will pass'[39m[32m,[39m /pass/[90m)[39m[90m;[39m
    [90m// OK[39m

[0mIf the values do not match, or if the [33mstring[39m argument is of another type than[0m
[0m[33mstring[39m, an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m is thrown with a [33mmessage[39m property set equal[0m
[0mto the value of the [33mmessage[39m parameter. If the [33mmessage[39m parameter is[0m
[0mundefined, a default error message is assigned. If the [33mmessage[39m parameter is an[0m
[0minstance of an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m then it will be thrown instead of the[0m
[0m[34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m.[0m

[32m[1m## [33massert.notDeepEqual(actual, expected[, message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30766[39m
[90m    description: NaN is now treated as being identical in case both sides are[39m
[90m                 NaN.[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15001[39m
[90m    description: The `Error` names and messages are now properly compared[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12142[39m
[90m    description: The `Set` and `Map` content is also compared[39m
[90m  - version: v6.4.0, v4.7.1[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8002[39m
[90m    description: Typed array slices are handled correctly now.[39m
[90m  - version: v6.1.0, v4.5.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6432[39m
[90m    description: Objects with circular references can be used as inputs now.[39m
[90m  - version: v5.10.1, v4.4.3[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5910[39m
[90m    description: Handle non-`Uint8Array` typed arrays correctly.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mactual[39m {any}[0m
    * [0m[33mexpected[39m {any}[0m
    * [0m[33mmessage[39m {string|Error}[0m

[0m[1mStrict assertion mode[22m[0m

[0mAn alias of [34m[33massert.notDeepStrictEqual()[39m[34m ([34m[4m#assert_assert_notdeepstrictequal_actual_expected_message[24m[39m[34m)[39m.[0m

[0m[1mLegacy assertion mode[22m[0m

[90m[3m    [0mStability: 0 - Deprecated: Use [34m[33massert.notDeepStrictEqual()[39m[90m[34m ([34m[4m#assert_assert_notdeepstrictequal_actual_expected_message[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

[0mTests for any deep inequality. Opposite of [34m[33massert.deepEqual()[39m[34m ([34m[4m#assert_assert_deepequal_actual_expected_message[24m[39m[34m)[39m.[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[90m;[39m
    
    [94mconst[39m [37mobj1[39m [93m=[39m [33m{[39m
      [37ma[39m[93m:[39m [33m{[39m
        [37mb[39m[93m:[39m [34m1[39m
      [33m}[39m
    [33m}[39m[90m;[39m
    [94mconst[39m [37mobj2[39m [93m=[39m [33m{[39m
      [37ma[39m[93m:[39m [33m{[39m
        [37mb[39m[93m:[39m [34m2[39m
      [33m}[39m
    [33m}[39m[90m;[39m
    [94mconst[39m [37mobj3[39m [93m=[39m [33m{[39m
      [37ma[39m[93m:[39m [33m{[39m
        [37mb[39m[93m:[39m [34m1[39m
      [33m}[39m
    [33m}[39m[90m;[39m
    [94mconst[39m [37mobj4[39m [93m=[39m [37mObject[39m[32m.[39m[37mcreate[39m[90m([39m[37mobj1[39m[90m)[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mnotDeepEqual[39m[90m([39m[37mobj1[39m[32m,[39m [37mobj1[39m[90m)[39m[90m;[39m
    [90m// AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }[39m
    
    [37massert[39m[32m.[39m[37mnotDeepEqual[39m[90m([39m[37mobj1[39m[32m,[39m [37mobj2[39m[90m)[39m[90m;[39m
    [90m// OK[39m
    
    [37massert[39m[32m.[39m[37mnotDeepEqual[39m[90m([39m[37mobj1[39m[32m,[39m [37mobj3[39m[90m)[39m[90m;[39m
    [90m// AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }[39m
    
    [37massert[39m[32m.[39m[37mnotDeepEqual[39m[90m([39m[37mobj1[39m[32m,[39m [37mobj4[39m[90m)[39m[90m;[39m
    [90m// OK[39m

[0mIf the values are deeply equal, an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m is thrown with a[0m
[0m[33mmessage[39m property set equal to the value of the [33mmessage[39m parameter. If the[0m
[0m[33mmessage[39m parameter is undefined, a default error message is assigned. If the[0m
[0m[33mmessage[39m parameter is an instance of an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m then it will be thrown[0m
[0minstead of the [33mAssertionError[39m.[0m

[32m[1m## [33massert.notDeepStrictEqual(actual, expected[, message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v1.2.0[39m
[90mchanges:[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15398[39m
[90m    description: The `-0` and `+0` are not considered equal anymore.[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15036[39m
[90m    description: The `NaN` is now compared using the[39m
[90m              [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero)[39m
[90m              comparison.[39m
[90m  - version: v9.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/15001[39m
[90m    description: The `Error` names and messages are now properly compared[39m
[90m  - version: v8.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/12142[39m
[90m    description: The `Set` and `Map` content is also compared[39m
[90m  - version: v6.4.0, v4.7.1[39m
[90m    pr-url: https://github.com/nodejs/node/pull/8002[39m
[90m    description: Typed array slices are handled correctly now.[39m
[90m  - version: v6.1.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/6432[39m
[90m    description: Objects with circular references can be used as inputs now.[39m
[90m  - version: v5.10.1, v4.4.3[39m
[90m    pr-url: https://github.com/nodejs/node/pull/5910[39m
[90m    description: Handle non-`Uint8Array` typed arrays correctly.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mactual[39m {any}[0m
    * [0m[33mexpected[39m {any}[0m
    * [0m[33mmessage[39m {string|Error}[0m

[0mTests for deep strict inequality. Opposite of [34m[33massert.deepStrictEqual()[39m[34m ([34m[4m#assert_assert_deepstrictequal_actual_expected_message[24m[39m[34m)[39m.[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[32m.[39m[37mstrict[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mnotDeepStrictEqual[39m[90m([39m[33m{[39m [37ma[39m[93m:[39m [34m1[39m [33m}[39m[32m,[39m [33m{[39m [37ma[39m[93m:[39m [92m'1'[39m [33m}[39m[90m)[39m[90m;[39m
    [90m// OK[39m

[0mIf the values are deeply and strictly equal, an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m is thrown[0m
[0mwith a [33mmessage[39m property set equal to the value of the [33mmessage[39m parameter. If[0m
[0mthe [33mmessage[39m parameter is undefined, a default error message is assigned. If[0m
[0mthe [33mmessage[39m parameter is an instance of an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m then it will be thrown[0m
[0minstead of the [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m.[0m

[32m[1m## [33massert.notEqual(actual, expected[, message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: REPLACEME[39m
[90m    pr-url: https://github.com/nodejs/node/pull/30766[39m
[90m    description: NaN is now treated as being identical in case both sides are[39m
[90m                 NaN.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mactual[39m {any}[0m
    * [0m[33mexpected[39m {any}[0m
    * [0m[33mmessage[39m {string|Error}[0m

[0m[1mStrict assertion mode[22m[0m

[0mAn alias of [34m[33massert.notStrictEqual()[39m[34m ([34m[4m#assert_assert_notstrictequal_actual_expected_message[24m[39m[34m)[39m.[0m

[0m[1mLegacy assertion mode[22m[0m

[90m[3m    [0mStability: 0 - Deprecated: Use [34m[33massert.notStrictEqual()[39m[90m[34m ([34m[4m#assert_assert_notstrictequal_actual_expected_message[24m[39m[90m[34m)[39m[90m instead.[0m[23m[39m

[0mTests shallow, coercive inequality with the [34mAbstract Equality Comparison ([34m[4mhttps://tc39.github.io/ecma262/#sec-abstract-equality-comparison[24m[39m[34m)[39m[0m
[0m([33m!=[39m ). [33mNaN[39m is special handled and treated as being identical in case both[0m
[0msides are [33mNaN[39m.[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mnotEqual[39m[90m([39m[34m1[39m[32m,[39m [34m2[39m[90m)[39m[90m;[39m
    [90m// OK[39m
    
    [37massert[39m[32m.[39m[37mnotEqual[39m[90m([39m[34m1[39m[32m,[39m [34m1[39m[90m)[39m[90m;[39m
    [90m// AssertionError: 1 != 1[39m
    
    [37massert[39m[32m.[39m[37mnotEqual[39m[90m([39m[34m1[39m[32m,[39m [92m'1'[39m[90m)[39m[90m;[39m
    [90m// AssertionError: 1 != '1'[39m

[0mIf the values are equal, an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m is thrown with a [33mmessage[39m[0m
[0mproperty set equal to the value of the [33mmessage[39m parameter. If the [33mmessage[39m[0m
[0mparameter is undefined, a default error message is assigned. If the [33mmessage[39m[0m
[0mparameter is an instance of an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m then it will be thrown instead of the[0m
[0m[33mAssertionError[39m.[0m

[32m[1m## [33massert.notStrictEqual(actual, expected[, message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17003[39m
[90m    description: Used comparison changed from Strict Equality to `Object.is()`[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mactual[39m {any}[0m
    * [0m[33mexpected[39m {any}[0m
    * [0m[33mmessage[39m {string|Error}[0m

[0mTests strict inequality between the [33mactual[39m and [33mexpected[39m parameters as[0m
[0mdetermined by the [34mSameValue Comparison ([34m[4mhttps://tc39.github.io/ecma262/#sec-samevalue[24m[39m[34m)[39m.[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[32m.[39m[37mstrict[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mnotStrictEqual[39m[90m([39m[34m1[39m[32m,[39m [34m2[39m[90m)[39m[90m;[39m
    [90m// OK[39m
    
    [37massert[39m[32m.[39m[37mnotStrictEqual[39m[90m([39m[34m1[39m[32m,[39m [34m1[39m[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: Expected "actual" to be strictly unequal to:[39m
    [90m//[39m
    [90m// 1[39m
    
    [37massert[39m[32m.[39m[37mnotStrictEqual[39m[90m([39m[34m1[39m[32m,[39m [92m'1'[39m[90m)[39m[90m;[39m
    [90m// OK[39m

[0mIf the values are strictly equal, an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m is thrown with a[0m
[0m[33mmessage[39m property set equal to the value of the [33mmessage[39m parameter. If the[0m
[0m[33mmessage[39m parameter is undefined, a default error message is assigned. If the[0m
[0m[33mmessage[39m parameter is an instance of an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m then it will be thrown[0m
[0minstead of the [33mAssertionError[39m.[0m

[32m[1m## [33massert.ok(value[, message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/18319[39m
[90m    description: The `assert.ok()` (no arguments) will now use a predefined[39m
[90m                 error message.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mvalue[39m {any}[0m
    * [0m[33mmessage[39m {string|Error}[0m

[0mTests if [33mvalue[39m is truthy. It is equivalent to[0m
[0m[33massert.equal(!!value, true, message)[39m.[0m

[0mIf [33mvalue[39m is not truthy, an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m is thrown with a [33mmessage[39m[0m
[0mproperty set equal to the value of the [33mmessage[39m parameter. If the [33mmessage[39m[0m
[0mparameter is [33mundefined[39m, a default error message is assigned. If the [33mmessage[39m[0m
[0mparameter is an instance of an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m then it will be thrown instead of the[0m
[0m[33mAssertionError[39m.[0m
[0mIf no arguments are passed in at all [33mmessage[39m will be set to the string:[0m
[0m[33m'No value argument passed to `assert.ok()`'[39m.[0m

[0mBe aware that in the [33mrepl[39m the error message will be different to the one[0m
[0mthrown in a file! See below for further details.[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[32m.[39m[37mstrict[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mok[39m[90m([39m[91mtrue[39m[90m)[39m[90m;[39m
    [90m// OK[39m
    [37massert[39m[32m.[39m[37mok[39m[90m([39m[34m1[39m[90m)[39m[90m;[39m
    [90m// OK[39m
    
    [37massert[39m[32m.[39m[37mok[39m[90m([39m[90m)[39m[90m;[39m
    [90m// AssertionError: No value argument passed to `assert.ok()`[39m
    
    [37massert[39m[32m.[39m[37mok[39m[90m([39m[91mfalse[39m[32m,[39m [92m'it\'s false'[39m[90m)[39m[90m;[39m
    [90m// AssertionError: it's false[39m
    
    [90m// In the repl:[39m
    [37massert[39m[32m.[39m[37mok[39m[90m([39m[94mtypeof[39m [34m123[39m [93m===[39m [92m'string'[39m[90m)[39m[90m;[39m
    [90m// AssertionError: false == true[39m
    
    [90m// In a file (e.g. test.js):[39m
    [37massert[39m[32m.[39m[37mok[39m[90m([39m[94mtypeof[39m [34m123[39m [93m===[39m [92m'string'[39m[90m)[39m[90m;[39m
    [90m// AssertionError: The expression evaluated to a falsy value:[39m
    [90m//[39m
    [90m//   assert.ok(typeof 123 === 'string')[39m
    
    [37massert[39m[32m.[39m[37mok[39m[90m([39m[91mfalse[39m[90m)[39m[90m;[39m
    [90m// AssertionError: The expression evaluated to a falsy value:[39m
    [90m//[39m
    [90m//   assert.ok(false)[39m
    
    [37massert[39m[32m.[39m[37mok[39m[90m([39m[34m0[39m[90m)[39m[90m;[39m
    [90m// AssertionError: The expression evaluated to a falsy value:[39m
    [90m//[39m
    [90m//   assert.ok(0)[39m
    
    [90m// Using `assert()` works the same:[39m
    [37massert[39m[90m([39m[34m0[39m[90m)[39m[90m;[39m
    [90m// AssertionError: The expression evaluated to a falsy value:[39m
    [90m//[39m
    [90m//   assert(0)[39m

[32m[1m## [33massert.rejects(asyncFn[, error][, message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v10.0.0[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33masyncFn[39m {Function|Promise}[0m
    * [0m[33merror[39m {RegExp|Function|Object|Error}[0m
    * [0m[33mmessage[39m {string}[0m

[0mAwaits the [33masyncFn[39m promise or, if [33masyncFn[39m is a function, immediately[0m
[0mcalls the function and awaits the returned promise to complete. It will then[0m
[0mcheck that the promise is rejected.[0m

[0mIf [33masyncFn[39m is a function and it throws an error synchronously,[0m
[0m[33massert.rejects()[39m will return a rejected [33mPromise[39m with that error. If the[0m
[0mfunction does not return a promise, [33massert.rejects()[39m will return a rejected[0m
[0m[33mPromise[39m with an [34m[33mERR_INVALID_RETURN_VALUE[39m[34m ([34m[4merrors.html#errors_err_invalid_return_value[24m[39m[34m)[39m error. In both cases the error[0m
[0mhandler is skipped.[0m

[0mBesides the async nature to await the completion behaves identically to[0m
[0m[34m[33massert.throws()[39m[34m ([34m[4m#assert_assert_throws_fn_error_message[24m[39m[34m)[39m.[0m

[0mIf specified, [33merror[39m can be a [34m[33mClass[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes[24m[39m[34m)[39m, [34m[33mRegExp[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions[24m[39m[34m)[39m, a validation function,[0m
[0man object where each property will be tested for, or an instance of error where[0m
[0meach property will be tested for including the non-enumerable [33mmessage[39m and[0m
[0m[33mname[39m properties.[0m

[0mIf specified, [33mmessage[39m will be the message provided by the [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m[0m
[0mif the [33masyncFn[39m fails to reject.[0m

    [90m([39m[37masync[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mawait[39m [37massert[39m[32m.[39m[37mrejects[39m[90m([39m
        [37masync[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
          [94mthrow[39m [31mnew[39m [37mTypeError[39m[90m([39m[92m'Wrong value'[39m[90m)[39m[90m;[39m
        [33m}[39m[32m,[39m
        [33m{[39m
          [37mname[39m[93m:[39m [92m'TypeError'[39m[32m,[39m
          [37mmessage[39m[93m:[39m [92m'Wrong value'[39m
        [33m}[39m
      [90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

    [90m([39m[37masync[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [37mawait[39m [37massert[39m[32m.[39m[37mrejects[39m[90m([39m
        [37masync[39m [90m([39m[90m)[39m [93m=>[39m [33m{[39m
          [94mthrow[39m [31mnew[39m [37mTypeError[39m[90m([39m[92m'Wrong value'[39m[90m)[39m[90m;[39m
        [33m}[39m[32m,[39m
        [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
          [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37merr[39m[32m.[39m[37mname[39m[32m,[39m [92m'TypeError'[39m[90m)[39m[90m;[39m
          [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37merr[39m[32m.[39m[37mmessage[39m[32m,[39m [92m'Wrong value'[39m[90m)[39m[90m;[39m
          [31mreturn[39m [91mtrue[39m[90m;[39m
        [33m}[39m
      [90m)[39m[90m;[39m
    [33m}[39m[90m)[39m[90m([39m[90m)[39m[90m;[39m

    [37massert[39m[32m.[39m[37mrejects[39m[90m([39m
      [37mPromise[39m[32m.[39m[37mreject[39m[90m([39m[31mnew[39m [37mError[39m[90m([39m[92m'Wrong value'[39m[90m)[39m[90m)[39m[32m,[39m
      [37mError[39m
    [90m)[39m[32m.[39m[37mthen[39m[90m([39m[90m([39m[90m)[39m [93m=>[39m [33m{[39m
      [90m// ...[39m
    [33m}[39m[90m)[39m[90m;[39m

[0m[33merror[39m cannot be a string. If a string is provided as the second[0m
[0margument, then [33merror[39m is assumed to be omitted and the string will be used for[0m
[0m[33mmessage[39m instead. This can lead to easy-to-miss mistakes. Please read the[0m
[0mexample in [34m[33massert.throws()[39m[34m ([34m[4m#assert_assert_throws_fn_error_message[24m[39m[34m)[39m carefully if using a string as the second[0m
[0margument gets considered.[0m

[32m[1m## [33massert.strictEqual(actual, expected[, message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: v10.0.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17003[39m
[90m    description: Used comparison changed from Strict Equality to `Object.is()`[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mactual[39m {any}[0m
    * [0m[33mexpected[39m {any}[0m
    * [0m[33mmessage[39m {string|Error}[0m

[0mTests strict equality between the [33mactual[39m and [33mexpected[39m parameters as[0m
[0mdetermined by the [34mSameValue Comparison ([34m[4mhttps://tc39.github.io/ecma262/#sec-samevalue[24m[39m[34m)[39m.[0m

    [94mconst[39m [37massert[39m [93m=[39m [37mrequire[39m[90m([39m[92m'api/source/assert'[39m[90m)[39m[32m.[39m[37mstrict[39m[90m;[39m
    
    [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[34m1[39m[32m,[39m [34m2[39m[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: Expected inputs to be strictly equal:[39m
    [90m//[39m
    [90m// 1 !== 2[39m
    
    [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[34m1[39m[32m,[39m [34m1[39m[90m)[39m[90m;[39m
    [90m// OK[39m
    
    [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[92m'Hello foobar'[39m[32m,[39m [92m'Hello World!'[39m[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: Expected inputs to be strictly equal:[39m
    [90m// + actual - expected[39m
    [90m//[39m
    [90m// + 'Hello foobar'[39m
    [90m// - 'Hello World!'[39m
    [90m//          ^[39m
    
    [94mconst[39m [37mapples[39m [93m=[39m [34m1[39m[90m;[39m
    [94mconst[39m [37moranges[39m [93m=[39m [34m2[39m[90m;[39m
    [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[37mapples[39m[32m,[39m [37moranges[39m[32m,[39m `apples ${[37mapples[39m} !== oranges ${[37moranges[39m}`[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: apples 1 !== oranges 2[39m
    
    [37massert[39m[32m.[39m[37mstrictEqual[39m[90m([39m[34m1[39m[32m,[39m [92m'1'[39m[32m,[39m [31mnew[39m [37mTypeError[39m[90m([39m[92m'Inputs are not identical'[39m[90m)[39m[90m)[39m[90m;[39m
    [90m// TypeError: Inputs are not identical[39m

[0mIf the values are not strictly equal, an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m is thrown with a[0m
[0m[33mmessage[39m property set equal to the value of the [33mmessage[39m parameter. If the[0m
[0m[33mmessage[39m parameter is undefined, a default error message is assigned. If the[0m
[0m[33mmessage[39m parameter is an instance of an [34m[33mError[39m[34m ([34m[4merrors.html#errors_class_error[24m[39m[34m)[39m then it will be thrown[0m
[0minstead of the [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m.[0m

[32m[1m## [33massert.throws(fn[, error][, message])[39m[32m[22m[39m

[90m<!-- YAML[39m
[90madded: v0.1.21[39m
[90mchanges:[39m
[90m  - version: v10.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/20485[39m
[90m    description: The `error` parameter can be an object containing regular[39m
[90m                 expressions now.[39m
[90m  - version: v9.9.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/17584[39m
[90m    description: The `error` parameter can now be an object as well.[39m
[90m  - version: v4.2.0[39m
[90m    pr-url: https://github.com/nodejs/node/pull/3276[39m
[90m    description: The `error` parameter can now be an arrow function.[39m
[90m-->[39m
[90m[39m
[90m[39m    * [0m[33mfn[39m {Function}[0m
    * [0m[33merror[39m {RegExp|Function|Object|Error}[0m
    * [0m[33mmessage[39m {string}[0m

[0mExpects the function [33mfn[39m to throw an error.[0m

[0mIf specified, [33merror[39m can be a [34m[33mClass[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes[24m[39m[34m)[39m, [34m[33mRegExp[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions[24m[39m[34m)[39m, a validation function,[0m
[0ma validation object where each property will be tested for strict deep equality,[0m
[0mor an instance of error where each property will be tested for strict deep[0m
[0mequality including the non-enumerable [33mmessage[39m and [33mname[39m properties. When[0m
[0musing an object, it is also possible to use a regular expression, when[0m
[0mvalidating against a string property. See below for examples.[0m

[0mIf specified, [33mmessage[39m will be appended to the message provided by the[0m
[0m[33mAssertionError[39m if the [33mfn[39m call fails to throw or in case the error validation[0m
[0mfails.[0m

[0mCustom validation object/error instance:[0m

    [94mconst[39m [37merr[39m [93m=[39m [31mnew[39m [37mTypeError[39m[90m([39m[92m'Wrong value'[39m[90m)[39m[90m;[39m
    [37merr[39m[32m.[39m[37mcode[39m [93m=[39m [34m404[39m[90m;[39m
    [37merr[39m[32m.[39m[37mfoo[39m [93m=[39m [92m'bar'[39m[90m;[39m
    [37merr[39m[32m.[39m[37minfo[39m [93m=[39m [33m{[39m
      [37mnested[39m[93m:[39m [91mtrue[39m[32m,[39m
      [37mbaz[39m[93m:[39m [92m'text'[39m
    [33m}[39m[90m;[39m
    [37merr[39m[32m.[39m[37mreg[39m [93m=[39m /abc/i[90m;[39m
    
    [37massert[39m[32m.[39m[37mthrows[39m[90m([39m
      [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [94mthrow[39m [37merr[39m[90m;[39m
      [33m}[39m[32m,[39m
      [33m{[39m
        [37mname[39m[93m:[39m [92m'TypeError'[39m[32m,[39m
        [37mmessage[39m[93m:[39m [92m'Wrong value'[39m[32m,[39m
        [37minfo[39m[93m:[39m [33m{[39m
          [37mnested[39m[93m:[39m [91mtrue[39m[32m,[39m
          [37mbaz[39m[93m:[39m [92m'text'[39m
        [33m}[39m
        [90m// Only properties on the validation object will be tested for.[39m
        [90m// Using nested objects requires all properties to be present. Otherwise[39m
        [90m// the validation is going to fail.[39m
      [33m}[39m
    [90m)[39m[90m;[39m
    
    [90m// Using regular expressions to validate error properties:[39m
    [37massert[39m[32m.[39m[37mthrows[39m[90m([39m
      [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [94mthrow[39m [37merr[39m[90m;[39m
      [33m}[39m[32m,[39m
      [33m{[39m
        [90m// The `name` and `message` properties are strings and using regular[39m
        [90m// expressions on those will match against the string. If they fail, an[39m
        [90m// error is thrown.[39m
        [37mname[39m[93m:[39m /^TypeError$/[32m,[39m
        [37mmessage[39m[93m:[39m /Wrong/[32m,[39m
        [37mfoo[39m[93m:[39m [92m'bar'[39m[32m,[39m
        [37minfo[39m[93m:[39m [33m{[39m
          [37mnested[39m[93m:[39m [91mtrue[39m[32m,[39m
          [90m// It is not possible to use regular expressions for nested properties![39m
          [37mbaz[39m[93m:[39m [92m'text'[39m
        [33m}[39m[32m,[39m
        [90m// The `reg` property contains a regular expression and only if the[39m
        [90m// validation object contains an identical regular expression, it is going[39m
        [90m// to pass.[39m
        [37mreg[39m[93m:[39m /abc/i
      [33m}[39m
    [90m)[39m[90m;[39m
    
    [90m// Fails due to the different `message` and `name` properties:[39m
    [37massert[39m[32m.[39m[37mthrows[39m[90m([39m
      [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [94mconst[39m [37motherErr[39m [93m=[39m [31mnew[39m [37mError[39m[90m([39m[92m'Not found'[39m[90m)[39m[90m;[39m
        [90m// Copy all enumerable properties from `err` to `otherErr`.[39m
        [94mfor[39m [90m([39m[94mconst[39m [33m[[39m[37mkey[39m[32m,[39m [37mvalue[39m[33m][39m [37mof[39m [37mObject[39m[32m.[39m[37mentries[39m[90m([39m[37merr[39m[90m)[39m[90m)[39m [33m{[39m
          [37motherErr[39m[33m[[39m[37mkey[39m[33m][39m [93m=[39m [37mvalue[39m[90m;[39m
        [33m}[39m
        [94mthrow[39m [37motherErr[39m[90m;[39m
      [33m}[39m[32m,[39m
      [90m// The error's `message` and `name` properties will also be checked when using[39m
      [90m// an error as validation object.[39m
      [37merr[39m
    [90m)[39m[90m;[39m

[0mValidate instanceof using constructor:[0m

    [37massert[39m[32m.[39m[37mthrows[39m[90m([39m
      [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [94mthrow[39m [31mnew[39m [37mError[39m[90m([39m[92m'Wrong value'[39m[90m)[39m[90m;[39m
      [33m}[39m[32m,[39m
      [37mError[39m
    [90m)[39m[90m;[39m

[0mValidate error message using [34m[33mRegExp[39m[34m ([34m[4mhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions[24m[39m[34m)[39m:[0m

[0mUsing a regular expression runs [33m.toString[39m on the error object, and will[0m
[0mtherefore also include the error name.[0m

    [37massert[39m[32m.[39m[37mthrows[39m[90m([39m
      [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [94mthrow[39m [31mnew[39m [37mError[39m[90m([39m[92m'Wrong value'[39m[90m)[39m[90m;[39m
      [33m}[39m[32m,[39m
      /^Error: Wrong value$/
    [90m)[39m[90m;[39m

[0mCustom error validation:[0m

[0mThe function must return [33mtrue[39m to indicate all internal validations passed.[0m
[0mIt will otherwise fail with an [34m[33mAssertionError[39m[34m ([34m[4m#assert_class_assert_assertionerror[24m[39m[34m)[39m.[0m

    [37massert[39m[32m.[39m[37mthrows[39m[90m([39m
      [90m([39m[90m)[39m [93m=>[39m [33m{[39m
        [94mthrow[39m [31mnew[39m [37mError[39m[90m([39m[92m'Wrong value'[39m[90m)[39m[90m;[39m
      [33m}[39m[32m,[39m
      [90m([39m[37merr[39m[90m)[39m [93m=>[39m [33m{[39m
        [37massert[39m[90m([39m[37merr[39m [94minstanceof[39m [37mError[39m[90m)[39m[90m;[39m
        [37massert[39m[90m([39m/value/[32m.[39m[37mtest[39m[90m([39m[37merr[39m[90m)[39m[90m)[39m[90m;[39m
        [90m// Avoid returning anything from validation functions besides `true`.[39m
        [90m// Otherwise, it's not clear what part of the validation failed. Instead,[39m
        [90m// throw an error about the specific validation that failed (as done in this[39m
        [90m// example) and add as much helpful debugging information to that error as[39m
        [90m// possible.[39m
        [31mreturn[39m [91mtrue[39m[90m;[39m
      [33m}[39m[32m,[39m
      [92m'unexpected error'[39m
    [90m)[39m[90m;[39m

[0m[33merror[39m cannot be a string. If a string is provided as the second[0m
[0margument, then [33merror[39m is assumed to be omitted and the string will be used for[0m
[0m[33mmessage[39m instead. This can lead to easy-to-miss mistakes. Using the same[0m
[0mmessage as the thrown error message is going to result in an[0m
[0m[33mERR_AMBIGUOUS_ARGUMENT[39m error. Please read the example below carefully if using[0m
[0ma string as the second argument gets considered:[0m

[90m<!-- eslint-disable no-restricted-syntax -->[39m
[90m[39m    [94mfunction[39m [37mthrowingFirst[39m[90m([39m[90m)[39m [33m{[39m
      [94mthrow[39m [31mnew[39m [37mError[39m[90m([39m[92m'First'[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [94mfunction[39m [37mthrowingSecond[39m[90m([39m[90m)[39m [33m{[39m
      [94mthrow[39m [31mnew[39m [37mError[39m[90m([39m[92m'Second'[39m[90m)[39m[90m;[39m
    [33m}[39m
    
    [94mfunction[39m [37mnotThrowing[39m[90m([39m[90m)[39m [33m{[39m[33m}[39m
    
    [90m// The second argument is a string and the input function threw an Error.[39m
    [90m// The first case will not throw as it does not match for the error message[39m
    [90m// thrown by the input function![39m
    [37massert[39m[32m.[39m[37mthrows[39m[90m([39m[37mthrowingFirst[39m[32m,[39m [92m'Second'[39m[90m)[39m[90m;[39m
    [90m// In the next example the message has no benefit over the message from the[39m
    [90m// error and since it is not clear if the user intended to actually match[39m
    [90m// against the error message, Node.js throws an `ERR_AMBIGUOUS_ARGUMENT` error.[39m
    [37massert[39m[32m.[39m[37mthrows[39m[90m([39m[37mthrowingSecond[39m[32m,[39m [92m'Second'[39m[90m)[39m[90m;[39m
    [90m// TypeError [ERR_AMBIGUOUS_ARGUMENT][39m
    
    [90m// The string is only used (as message) in case the function does not throw:[39m
    [37massert[39m[32m.[39m[37mthrows[39m[90m([39m[37mnotThrowing[39m[32m,[39m [92m'Second'[39m[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION]: Missing expected exception: Second[39m
    
    [90m// If it was intended to match for the error message do this instead:[39m
    [90m// It does not throw because the error messages match.[39m
    [37massert[39m[32m.[39m[37mthrows[39m[90m([39m[37mthrowingSecond[39m[32m,[39m /Second$/[90m)[39m[90m;[39m
    
    [90m// If the error message does not match, an AssertionError is thrown.[39m
    [37massert[39m[32m.[39m[37mthrows[39m[90m([39m[37mthrowingFirst[39m[32m,[39m /Second$/[90m)[39m[90m;[39m
    [90m// AssertionError [ERR_ASSERTION][39m

[0mDue to the confusing error-prone notation, avoid a string as the second[0m
[0margument.[0m

