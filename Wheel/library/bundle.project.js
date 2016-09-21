require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Config":[function(require,module,exports){
"use strict";
cc._RFpush(module, '14503Ztv4ZIQ7m7RhW0MXWg', 'Config');
// Script/Config.js

var Config = Config || {};
Config.gearInfo = ['2x', '6x', '2x', '4x', '5x', '4x', '8x', '4x', '3x', '5x', '3x', '10x', '6x', '2x', '2x', '3x', '10x', '8x'];

module.exports = Config;

cc._RFpop();
},{}],"HelloWorld":[function(require,module,exports){
"use strict";
cc._RFpush(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld');
// Script/HelloWorld.js

cc.Class({
    'extends': cc.Component,

    properties: {
        label: {
            'default': null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.label.string = this.text;
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();
},{}],"Wheel2":[function(require,module,exports){
"use strict";
cc._RFpush(module, '43655YKkbBBgZnejEy9xj3Y', 'Wheel2');
// Script/Wheel2.js

cc.Class({
    "extends": cc.Component,

    properties: {
        spinBtn: {
            "default": null, // The default value will be used only when the component attachin                    // to a node for the first time
            type: cc.Button, // optional, default is typeof default
            visible: true, // optional, default is true
            displayName: 'SpinBtn' },
        // optional
        wheelSp: {
            "default": null,
            type: cc.Sprite
        },
        maxSpeed: {
            "default": 3,
            type: cc.Float,
            max: 10,
            min: 2
        },
        duration: {
            "default": 3,
            type: cc.Float,
            max: 5,
            min: 1
        },
        acc: {
            "default": 0.1,
            type: cc.Float,
            max: 1,
            min: 0.01
        },
        targetID: {
            "default": 0,
            type: cc.Integer,
            max: 17,
            min: 0
        },
        effectAudio: {
            "default": null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.log("....onload");
        this.wheelState = 0;
        this.curSpeed = 0;
        this.spinTime = 0; //减速前旋转时间
        this.gearNum = 18; //齿轮数量
        this.defaultAngle = 360 / 18 / 2; //默认角度
        this.gearAngle = 360 / this.gearNum; //每个齿轮的角度
        this.effectFlag = 0; //用于音效播放控制
        this.finalAngle = 360 - this.targetID * this.gearAngle + this.defaultAngle; //最终结果指定的角度
        this.wheelSp.node.rotation = this.defaultAngle;

        this.spinBtn.node.on(cc.Node.EventType.TOUCH_END, (function (event) {
            cc.log("begin spin");
            if (this.wheelState != 0) {
                return;
            }
            this.decAngle = 2 * 360; // 减速旋转两圈
            this.wheelState = 1;
            this.curSpeed = 0;
            this.spinTime = 0;
        }).bind(this));
    },

    start: function start() {
        cc.log('....start');
    },
    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (this.wheelState == 0) {
            return;
        }
        cc.log('......state=%d', this.wheelState);

        this.effectFlag += this.curSpeed;
        if (this.effectFlag >= this.gearAngle) {
            cc.audioEngine.playEffect(this.effectAudio, false);
            this.effectFlag = 0;
        }
        if (this.wheelState == 1) {
            cc.log('....开始旋转,speed:' + this.curSpeed);
            this.spinTime += dt;
            this.wheelSp.node.rotation = this.wheelSp.node.rotation + this.curSpeed;
            if (this.curSpeed <= this.maxSpeed) {
                this.curSpeed += this.acc;
            } else {
                if (this.spinTime < this.duration) {
                    return;
                }
                cc.log('....开始减速');
                //设置目标角度
                this.wheelSp.node.rotation = this.defaultAngle;
                this.wheelState = 2;
            }
        } else if (this.wheelState == 2) {
            cc.log('......减速');

            var curRo = this.wheelSp.node.rotation;
            var spd = (this.finalAngle - curRo) * 0.02;
            var finRo = this.finalAngle - curRo;
            if (spd > this.maxSpeed) {
                spd = this.maxSpeed;
            }
            curRo += spd;
            this.wheelSp.node.rotation = curRo;
            if (spd <= 0.1) {
                this.wheelSp.node.rotation = this.finalAngle;
                this.wheelState = 0;
            }
            // this.curSpeed = this.maxSpeed*(this.decAngle/(2*360)) + 0.3;
            // this.decAngle -= this.curSpeed;
            // this.wheelSp.node.rotation = this.wheelSp.node.rotation + this.curSpeed;

            // if(this.curSpeed <= 0.01 || this.decAngle<=0)
            // { 
            //     cc.log('....停止');
            //     this.wheelState = 0;
            //     this.wheelSp.node.rotation = this.finalAngle;
            //     cc.log('....rotation:'+ this.wheelSp.node.rotation);
            // }
        }
    }
});

cc._RFpop();
},{}],"Wheel":[function(require,module,exports){
"use strict";
cc._RFpush(module, '5261c81JlpM0JY8b6TQZadt', 'Wheel');
// Script/Wheel.js

cc.Class({
    "extends": cc.Component,

    properties: {
        spinBtn: {
            "default": null, // The default value will be used only when the component attachin                    // to a node for the first time
            type: cc.Button, // optional, default is typeof default
            visible: true, // optional, default is true
            displayName: 'SpinBtn' },
        // optional
        wheelSp: {
            "default": null,
            type: cc.Sprite
        },
        maxSpeed: {
            "default": 3,
            type: cc.Float,
            max: 10,
            min: 2
        },
        duration: {
            "default": 3,
            type: cc.Float,
            max: 5,
            min: 1,
            tooltip: "减速前旋转时间"
        },
        acc: {
            "default": 0.1,
            type: cc.Float,
            max: 0.2,
            min: 0.01,
            tooltip: "加速度"
        },
        targetID: {
            "default": 0,
            type: cc.Integer,
            max: 17,
            min: 0,
            tooltip: "指定结束时的齿轮"
        },
        springback: {
            "default": true,
            tooltip: "旋转结束是否回弹"
        },
        effectAudio: {
            "default": null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.log("....onload");
        this.wheelState = 0;
        this.curSpeed = 0;
        this.spinTime = 0; //减速前旋转时间
        this.gearNum = 18;
        this.defaultAngle = 360 / 18 / 2; //修正默认角度
        this.gearAngle = 360 / this.gearNum; //每个齿轮的角度
        this.wheelSp.node.rotation = this.defaultAngle;
        this.finalAngle = 0; //最终结果指定的角度
        this.effectFlag = 0; //用于音效播放

        if (!cc.sys.isBrowser) {
            cc.loader.loadRes('Sound/game_turntable', function (err, res) {
                if (err) {
                    cc.log('...err:' + err);
                }
            });
        }
        this.spinBtn.node.on(cc.Node.EventType.TOUCH_END, (function (event) {
            cc.log("begin spin");
            if (this.wheelState !== 0) {
                return;
            }
            this.decAngle = 2 * 360; // 减速旋转两圈
            this.wheelState = 1;
            this.curSpeed = 0;
            this.spinTime = 0;
            // var act = cc.rotateTo(10, 360*10);
            // this.wheelSp.node.runAction(act.easing(cc.easeSineInOut()));
        }).bind(this));
    },

    start: function start() {
        // cc.log('....start');
    },

    caculateFinalAngle: function caculateFinalAngle(targetID) {
        this.finalAngle = 360 - this.targetID * this.gearAngle + this.defaultAngle;
        if (this.springback) {
            this.finalAngle += this.gearAngle;
        }
    },
    editBoxDidBegin: function editBoxDidBegin(edit) {},
    editBoxDidChanged: function editBoxDidChanged(text) {},
    editBoxDidEndEditing: function editBoxDidEndEditing(edit) {
        var res = parseInt(edit.string);
        if (isNaN(res)) {
            if (cc.sys.isBrowser) {
                alert('please input a number!');
            } else cc.log(".....invalid input");
            this.targetID = Math.round(Math.random() * (this.gearNum - 1));
            return;
        }
        this.targetID = res;
    },
    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (this.wheelState === 0) {
            return;
        }
        // cc.log('......update');
        // cc.log('......state=%d',this.wheelState);

        this.effectFlag += this.curSpeed;
        if (!cc.sys.isBrowser && this.effectFlag >= this.gearAngle) {
            if (this.audioID) {}
            // cc.audioEngine.pauseEffect(this.audioID);

            // this.audioID = cc.audioEngine.playEffect(this.effectAudio,false);
            this.audioID = cc.audioEngine.playEffect(cc.url.raw('resources/Sound/game_turntable.mp3'));
            this.effectFlag = 0;
        }
        if (this.wheelState == 1) {
            // cc.log('....加速,speed:' + this.curSpeed);
            this.spinTime += dt;
            this.wheelSp.node.rotation = this.wheelSp.node.rotation + this.curSpeed;
            if (this.curSpeed <= this.maxSpeed) {
                this.curSpeed += this.acc;
            } else {
                if (this.spinTime < this.duration) {
                    return;
                }
                // cc.log('....开始减速');
                //设置目标角度
                this.finalAngle = 360 - this.targetID * this.gearAngle + this.defaultAngle;
                this.maxSpeed = this.curSpeed;
                if (this.springback) {
                    this.finalAngle += this.gearAngle;
                }
                this.wheelSp.node.rotation = this.finalAngle;
                this.wheelState = 2;
            }
        } else if (this.wheelState == 2) {
            // cc.log('......减速');
            var curRo = this.wheelSp.node.rotation; //应该等于finalAngle
            var hadRo = curRo - this.finalAngle;
            this.curSpeed = this.maxSpeed * ((this.decAngle - hadRo) / this.decAngle) + 0.2;
            this.wheelSp.node.rotation = curRo + this.curSpeed;

            if (this.decAngle - hadRo <= 0) {
                // cc.log('....停止');
                this.wheelState = 0;
                this.wheelSp.node.rotation = this.finalAngle;
                if (this.springback) {
                    //倒转一个齿轮
                    var act = new cc.rotateBy(0.5, -this.gearAngle);
                    var seq = cc.sequence(new cc.delayTime(0.3), act, cc.callFunc(this.showRes, this));
                    this.wheelSp.node.runAction(seq);
                } else {
                    this.showRes();
                }
            }
        }
    },
    showRes: function showRes() {
        var Config = require("Config");
        if (cc.sys.isBrowser) {
            alert('You have got ' + Config.gearInfo[this.targetID]);
        } else cc.log(Config.gearInfo[this.targetID]);
    }
});

cc._RFpop();
},{"Config":"Config"}]},{},["Config","HelloWorld","Wheel2","Wheel"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9Db2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL1NjcmlwdC9Db25maWcuanMiLCJhc3NldHMvU2NyaXB0L0hlbGxvV29ybGQuanMiLCJhc3NldHMvU2NyaXB0L1doZWVsMi5qcyIsImFzc2V0cy9TY3JpcHQvV2hlZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzE0NTAzWnR2NFpJUTdtN1JoVzBNWFdnJywgJ0NvbmZpZycpO1xuLy8gU2NyaXB0L0NvbmZpZy5qc1xuXG52YXIgQ29uZmlnID0gQ29uZmlnIHx8IHt9O1xuQ29uZmlnLmdlYXJJbmZvID0gWycyeCcsICc2eCcsICcyeCcsICc0eCcsICc1eCcsICc0eCcsICc4eCcsICc0eCcsICczeCcsICc1eCcsICczeCcsICcxMHgnLCAnNngnLCAnMngnLCAnMngnLCAnM3gnLCAnMTB4JywgJzh4J107XG5cbm1vZHVsZS5leHBvcnRzID0gQ29uZmlnO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMjgwYzNyc1pKSktuWjlScWJBTFZ3dEsnLCAnSGVsbG9Xb3JsZCcpO1xuLy8gU2NyaXB0L0hlbGxvV29ybGQuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgLy8gZGVmYXVsdHMsIHNldCB2aXN1YWxseSB3aGVuIGF0dGFjaGluZyB0aGlzIHNjcmlwdCB0byB0aGUgQ2FudmFzXG4gICAgICAgIHRleHQ6ICdIZWxsbywgV29ybGQhJ1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSB0aGlzLnRleHQ7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7fVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc0MzY1NVlLa2JCQmdabmVqRXk5eGozWScsICdXaGVlbDInKTtcbi8vIFNjcmlwdC9XaGVlbDIuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNwaW5CdG46IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLCAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW4gICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvbiwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgICAgIHZpc2libGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnU3BpbkJ0bicgfSxcbiAgICAgICAgLy8gb3B0aW9uYWxcbiAgICAgICAgd2hlZWxTcDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfSxcbiAgICAgICAgbWF4U3BlZWQ6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiAzLFxuICAgICAgICAgICAgdHlwZTogY2MuRmxvYXQsXG4gICAgICAgICAgICBtYXg6IDEwLFxuICAgICAgICAgICAgbWluOiAyXG4gICAgICAgIH0sXG4gICAgICAgIGR1cmF0aW9uOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogMyxcbiAgICAgICAgICAgIHR5cGU6IGNjLkZsb2F0LFxuICAgICAgICAgICAgbWF4OiA1LFxuICAgICAgICAgICAgbWluOiAxXG4gICAgICAgIH0sXG4gICAgICAgIGFjYzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IDAuMSxcbiAgICAgICAgICAgIHR5cGU6IGNjLkZsb2F0LFxuICAgICAgICAgICAgbWF4OiAxLFxuICAgICAgICAgICAgbWluOiAwLjAxXG4gICAgICAgIH0sXG4gICAgICAgIHRhcmdldElEOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogMCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXG4gICAgICAgICAgICBtYXg6IDE3LFxuICAgICAgICAgICAgbWluOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGVmZmVjdEF1ZGlvOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIGNjLmxvZyhcIi4uLi5vbmxvYWRcIik7XG4gICAgICAgIHRoaXMud2hlZWxTdGF0ZSA9IDA7XG4gICAgICAgIHRoaXMuY3VyU3BlZWQgPSAwO1xuICAgICAgICB0aGlzLnNwaW5UaW1lID0gMDsgLy/lh4/pgJ/liY3ml4vovazml7bpl7RcbiAgICAgICAgdGhpcy5nZWFyTnVtID0gMTg7IC8v6b2/6L2u5pWw6YePXG4gICAgICAgIHRoaXMuZGVmYXVsdEFuZ2xlID0gMzYwIC8gMTggLyAyOyAvL+m7mOiupOinkuW6plxuICAgICAgICB0aGlzLmdlYXJBbmdsZSA9IDM2MCAvIHRoaXMuZ2Vhck51bTsgLy/mr4/kuKrpvb/ova7nmoTop5LluqZcbiAgICAgICAgdGhpcy5lZmZlY3RGbGFnID0gMDsgLy/nlKjkuo7pn7PmlYjmkq3mlL7mjqfliLZcbiAgICAgICAgdGhpcy5maW5hbEFuZ2xlID0gMzYwIC0gdGhpcy50YXJnZXRJRCAqIHRoaXMuZ2VhckFuZ2xlICsgdGhpcy5kZWZhdWx0QW5nbGU7IC8v5pyA57uI57uT5p6c5oyH5a6a55qE6KeS5bqmXG4gICAgICAgIHRoaXMud2hlZWxTcC5ub2RlLnJvdGF0aW9uID0gdGhpcy5kZWZhdWx0QW5nbGU7XG5cbiAgICAgICAgdGhpcy5zcGluQnRuLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCAoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBjYy5sb2coXCJiZWdpbiBzcGluXCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMud2hlZWxTdGF0ZSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZWNBbmdsZSA9IDIgKiAzNjA7IC8vIOWHj+mAn+aXi+i9rOS4pOWciFxuICAgICAgICAgICAgdGhpcy53aGVlbFN0YXRlID0gMTtcbiAgICAgICAgICAgIHRoaXMuY3VyU3BlZWQgPSAwO1xuICAgICAgICAgICAgdGhpcy5zcGluVGltZSA9IDA7XG4gICAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgIH0sXG5cbiAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIGNjLmxvZygnLi4uLnN0YXJ0Jyk7XG4gICAgfSxcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLndoZWVsU3RhdGUgPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNjLmxvZygnLi4uLi4uc3RhdGU9JWQnLCB0aGlzLndoZWVsU3RhdGUpO1xuXG4gICAgICAgIHRoaXMuZWZmZWN0RmxhZyArPSB0aGlzLmN1clNwZWVkO1xuICAgICAgICBpZiAodGhpcy5lZmZlY3RGbGFnID49IHRoaXMuZ2VhckFuZ2xlKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuZWZmZWN0QXVkaW8sIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuZWZmZWN0RmxhZyA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMud2hlZWxTdGF0ZSA9PSAxKSB7XG4gICAgICAgICAgICBjYy5sb2coJy4uLi7lvIDlp4vml4vovawsc3BlZWQ6JyArIHRoaXMuY3VyU3BlZWQpO1xuICAgICAgICAgICAgdGhpcy5zcGluVGltZSArPSBkdDtcbiAgICAgICAgICAgIHRoaXMud2hlZWxTcC5ub2RlLnJvdGF0aW9uID0gdGhpcy53aGVlbFNwLm5vZGUucm90YXRpb24gKyB0aGlzLmN1clNwZWVkO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VyU3BlZWQgPD0gdGhpcy5tYXhTcGVlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VyU3BlZWQgKz0gdGhpcy5hY2M7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwaW5UaW1lIDwgdGhpcy5kdXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNjLmxvZygnLi4uLuW8gOWni+WHj+mAnycpO1xuICAgICAgICAgICAgICAgIC8v6K6+572u55uu5qCH6KeS5bqmXG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbFNwLm5vZGUucm90YXRpb24gPSB0aGlzLmRlZmF1bHRBbmdsZTtcbiAgICAgICAgICAgICAgICB0aGlzLndoZWVsU3RhdGUgPSAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMud2hlZWxTdGF0ZSA9PSAyKSB7XG4gICAgICAgICAgICBjYy5sb2coJy4uLi4uLuWHj+mAnycpO1xuXG4gICAgICAgICAgICB2YXIgY3VyUm8gPSB0aGlzLndoZWVsU3Aubm9kZS5yb3RhdGlvbjtcbiAgICAgICAgICAgIHZhciBzcGQgPSAodGhpcy5maW5hbEFuZ2xlIC0gY3VyUm8pICogMC4wMjtcbiAgICAgICAgICAgIHZhciBmaW5SbyA9IHRoaXMuZmluYWxBbmdsZSAtIGN1clJvO1xuICAgICAgICAgICAgaWYgKHNwZCA+IHRoaXMubWF4U3BlZWQpIHtcbiAgICAgICAgICAgICAgICBzcGQgPSB0aGlzLm1heFNwZWVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VyUm8gKz0gc3BkO1xuICAgICAgICAgICAgdGhpcy53aGVlbFNwLm5vZGUucm90YXRpb24gPSBjdXJSbztcbiAgICAgICAgICAgIGlmIChzcGQgPD0gMC4xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbFNwLm5vZGUucm90YXRpb24gPSB0aGlzLmZpbmFsQW5nbGU7XG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbFN0YXRlID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRoaXMuY3VyU3BlZWQgPSB0aGlzLm1heFNwZWVkKih0aGlzLmRlY0FuZ2xlLygyKjM2MCkpICsgMC4zO1xuICAgICAgICAgICAgLy8gdGhpcy5kZWNBbmdsZSAtPSB0aGlzLmN1clNwZWVkO1xuICAgICAgICAgICAgLy8gdGhpcy53aGVlbFNwLm5vZGUucm90YXRpb24gPSB0aGlzLndoZWVsU3Aubm9kZS5yb3RhdGlvbiArIHRoaXMuY3VyU3BlZWQ7XG5cbiAgICAgICAgICAgIC8vIGlmKHRoaXMuY3VyU3BlZWQgPD0gMC4wMSB8fCB0aGlzLmRlY0FuZ2xlPD0wKVxuICAgICAgICAgICAgLy8geyBcbiAgICAgICAgICAgIC8vICAgICBjYy5sb2coJy4uLi7lgZzmraInKTtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLndoZWVsU3RhdGUgPSAwO1xuICAgICAgICAgICAgLy8gICAgIHRoaXMud2hlZWxTcC5ub2RlLnJvdGF0aW9uID0gdGhpcy5maW5hbEFuZ2xlO1xuICAgICAgICAgICAgLy8gICAgIGNjLmxvZygnLi4uLnJvdGF0aW9uOicrIHRoaXMud2hlZWxTcC5ub2RlLnJvdGF0aW9uKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNTI2MWM4MUpscE0wSlk4YjZUUVphZHQnLCAnV2hlZWwnKTtcbi8vIFNjcmlwdC9XaGVlbC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc3BpbkJ0bjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbiAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdTcGluQnRuJyB9LFxuICAgICAgICAvLyBvcHRpb25hbFxuICAgICAgICB3aGVlbFNwOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxuICAgICAgICB9LFxuICAgICAgICBtYXhTcGVlZDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IDMsXG4gICAgICAgICAgICB0eXBlOiBjYy5GbG9hdCxcbiAgICAgICAgICAgIG1heDogMTAsXG4gICAgICAgICAgICBtaW46IDJcbiAgICAgICAgfSxcbiAgICAgICAgZHVyYXRpb246IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiAzLFxuICAgICAgICAgICAgdHlwZTogY2MuRmxvYXQsXG4gICAgICAgICAgICBtYXg6IDUsXG4gICAgICAgICAgICBtaW46IDEsXG4gICAgICAgICAgICB0b29sdGlwOiBcIuWHj+mAn+WJjeaXi+i9rOaXtumXtFwiXG4gICAgICAgIH0sXG4gICAgICAgIGFjYzoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IDAuMSxcbiAgICAgICAgICAgIHR5cGU6IGNjLkZsb2F0LFxuICAgICAgICAgICAgbWF4OiAwLjIsXG4gICAgICAgICAgICBtaW46IDAuMDEsXG4gICAgICAgICAgICB0b29sdGlwOiBcIuWKoOmAn+W6plwiXG4gICAgICAgIH0sXG4gICAgICAgIHRhcmdldElEOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogMCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkludGVnZXIsXG4gICAgICAgICAgICBtYXg6IDE3LFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgdG9vbHRpcDogXCLmjIflrprnu5PmnZ/ml7bnmoTpvb/ova5cIlxuICAgICAgICB9LFxuICAgICAgICBzcHJpbmdiYWNrOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2x0aXA6IFwi5peL6L2s57uT5p2f5piv5ZCm5Zue5by5XCJcbiAgICAgICAgfSxcbiAgICAgICAgZWZmZWN0QXVkaW86IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgY2MubG9nKFwiLi4uLm9ubG9hZFwiKTtcbiAgICAgICAgdGhpcy53aGVlbFN0YXRlID0gMDtcbiAgICAgICAgdGhpcy5jdXJTcGVlZCA9IDA7XG4gICAgICAgIHRoaXMuc3BpblRpbWUgPSAwOyAvL+WHj+mAn+WJjeaXi+i9rOaXtumXtFxuICAgICAgICB0aGlzLmdlYXJOdW0gPSAxODtcbiAgICAgICAgdGhpcy5kZWZhdWx0QW5nbGUgPSAzNjAgLyAxOCAvIDI7IC8v5L+u5q2j6buY6K6k6KeS5bqmXG4gICAgICAgIHRoaXMuZ2VhckFuZ2xlID0gMzYwIC8gdGhpcy5nZWFyTnVtOyAvL+avj+S4qum9v+i9rueahOinkuW6plxuICAgICAgICB0aGlzLndoZWVsU3Aubm9kZS5yb3RhdGlvbiA9IHRoaXMuZGVmYXVsdEFuZ2xlO1xuICAgICAgICB0aGlzLmZpbmFsQW5nbGUgPSAwOyAvL+acgOe7iOe7k+aenOaMh+WumueahOinkuW6plxuICAgICAgICB0aGlzLmVmZmVjdEZsYWcgPSAwOyAvL+eUqOS6jumfs+aViOaSreaUvlxuXG4gICAgICAgIGlmICghY2Muc3lzLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoJ1NvdW5kL2dhbWVfdHVybnRhYmxlJywgZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJy4uLmVycjonICsgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNwaW5CdG4ubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGNjLmxvZyhcImJlZ2luIHNwaW5cIik7XG4gICAgICAgICAgICBpZiAodGhpcy53aGVlbFN0YXRlICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5kZWNBbmdsZSA9IDIgKiAzNjA7IC8vIOWHj+mAn+aXi+i9rOS4pOWciFxuICAgICAgICAgICAgdGhpcy53aGVlbFN0YXRlID0gMTtcbiAgICAgICAgICAgIHRoaXMuY3VyU3BlZWQgPSAwO1xuICAgICAgICAgICAgdGhpcy5zcGluVGltZSA9IDA7XG4gICAgICAgICAgICAvLyB2YXIgYWN0ID0gY2Mucm90YXRlVG8oMTAsIDM2MCoxMCk7XG4gICAgICAgICAgICAvLyB0aGlzLndoZWVsU3Aubm9kZS5ydW5BY3Rpb24oYWN0LmVhc2luZyhjYy5lYXNlU2luZUluT3V0KCkpKTtcbiAgICAgICAgfSkuYmluZCh0aGlzKSk7XG4gICAgfSxcblxuICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgLy8gY2MubG9nKCcuLi4uc3RhcnQnKTtcbiAgICB9LFxuXG4gICAgY2FjdWxhdGVGaW5hbEFuZ2xlOiBmdW5jdGlvbiBjYWN1bGF0ZUZpbmFsQW5nbGUodGFyZ2V0SUQpIHtcbiAgICAgICAgdGhpcy5maW5hbEFuZ2xlID0gMzYwIC0gdGhpcy50YXJnZXRJRCAqIHRoaXMuZ2VhckFuZ2xlICsgdGhpcy5kZWZhdWx0QW5nbGU7XG4gICAgICAgIGlmICh0aGlzLnNwcmluZ2JhY2spIHtcbiAgICAgICAgICAgIHRoaXMuZmluYWxBbmdsZSArPSB0aGlzLmdlYXJBbmdsZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZWRpdEJveERpZEJlZ2luOiBmdW5jdGlvbiBlZGl0Qm94RGlkQmVnaW4oZWRpdCkge30sXG4gICAgZWRpdEJveERpZENoYW5nZWQ6IGZ1bmN0aW9uIGVkaXRCb3hEaWRDaGFuZ2VkKHRleHQpIHt9LFxuICAgIGVkaXRCb3hEaWRFbmRFZGl0aW5nOiBmdW5jdGlvbiBlZGl0Qm94RGlkRW5kRWRpdGluZyhlZGl0KSB7XG4gICAgICAgIHZhciByZXMgPSBwYXJzZUludChlZGl0LnN0cmluZyk7XG4gICAgICAgIGlmIChpc05hTihyZXMpKSB7XG4gICAgICAgICAgICBpZiAoY2Muc3lzLmlzQnJvd3Nlcikge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdwbGVhc2UgaW5wdXQgYSBudW1iZXIhJyk7XG4gICAgICAgICAgICB9IGVsc2UgY2MubG9nKFwiLi4uLi5pbnZhbGlkIGlucHV0XCIpO1xuICAgICAgICAgICAgdGhpcy50YXJnZXRJRCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqICh0aGlzLmdlYXJOdW0gLSAxKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YXJnZXRJRCA9IHJlcztcbiAgICB9LFxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMud2hlZWxTdGF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNjLmxvZygnLi4uLi4udXBkYXRlJyk7XG4gICAgICAgIC8vIGNjLmxvZygnLi4uLi4uc3RhdGU9JWQnLHRoaXMud2hlZWxTdGF0ZSk7XG5cbiAgICAgICAgdGhpcy5lZmZlY3RGbGFnICs9IHRoaXMuY3VyU3BlZWQ7XG4gICAgICAgIGlmICghY2Muc3lzLmlzQnJvd3NlciAmJiB0aGlzLmVmZmVjdEZsYWcgPj0gdGhpcy5nZWFyQW5nbGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1ZGlvSUQpIHt9XG4gICAgICAgICAgICAvLyBjYy5hdWRpb0VuZ2luZS5wYXVzZUVmZmVjdCh0aGlzLmF1ZGlvSUQpO1xuXG4gICAgICAgICAgICAvLyB0aGlzLmF1ZGlvSUQgPSBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuZWZmZWN0QXVkaW8sZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5hdWRpb0lEID0gY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdChjYy51cmwucmF3KCdyZXNvdXJjZXMvU291bmQvZ2FtZV90dXJudGFibGUubXAzJykpO1xuICAgICAgICAgICAgdGhpcy5lZmZlY3RGbGFnID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy53aGVlbFN0YXRlID09IDEpIHtcbiAgICAgICAgICAgIC8vIGNjLmxvZygnLi4uLuWKoOmAnyxzcGVlZDonICsgdGhpcy5jdXJTcGVlZCk7XG4gICAgICAgICAgICB0aGlzLnNwaW5UaW1lICs9IGR0O1xuICAgICAgICAgICAgdGhpcy53aGVlbFNwLm5vZGUucm90YXRpb24gPSB0aGlzLndoZWVsU3Aubm9kZS5yb3RhdGlvbiArIHRoaXMuY3VyU3BlZWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJTcGVlZCA8PSB0aGlzLm1heFNwZWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJTcGVlZCArPSB0aGlzLmFjYztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3BpblRpbWUgPCB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY2MubG9nKCcuLi4u5byA5aeL5YeP6YCfJyk7XG4gICAgICAgICAgICAgICAgLy/orr7nva7nm67moIfop5LluqZcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmFsQW5nbGUgPSAzNjAgLSB0aGlzLnRhcmdldElEICogdGhpcy5nZWFyQW5nbGUgKyB0aGlzLmRlZmF1bHRBbmdsZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1heFNwZWVkID0gdGhpcy5jdXJTcGVlZDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zcHJpbmdiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmluYWxBbmdsZSArPSB0aGlzLmdlYXJBbmdsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbFNwLm5vZGUucm90YXRpb24gPSB0aGlzLmZpbmFsQW5nbGU7XG4gICAgICAgICAgICAgICAgdGhpcy53aGVlbFN0YXRlID0gMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLndoZWVsU3RhdGUgPT0gMikge1xuICAgICAgICAgICAgLy8gY2MubG9nKCcuLi4uLi7lh4/pgJ8nKTtcbiAgICAgICAgICAgIHZhciBjdXJSbyA9IHRoaXMud2hlZWxTcC5ub2RlLnJvdGF0aW9uOyAvL+W6lOivpeetieS6jmZpbmFsQW5nbGVcbiAgICAgICAgICAgIHZhciBoYWRSbyA9IGN1clJvIC0gdGhpcy5maW5hbEFuZ2xlO1xuICAgICAgICAgICAgdGhpcy5jdXJTcGVlZCA9IHRoaXMubWF4U3BlZWQgKiAoKHRoaXMuZGVjQW5nbGUgLSBoYWRSbykgLyB0aGlzLmRlY0FuZ2xlKSArIDAuMjtcbiAgICAgICAgICAgIHRoaXMud2hlZWxTcC5ub2RlLnJvdGF0aW9uID0gY3VyUm8gKyB0aGlzLmN1clNwZWVkO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kZWNBbmdsZSAtIGhhZFJvIDw9IDApIHtcbiAgICAgICAgICAgICAgICAvLyBjYy5sb2coJy4uLi7lgZzmraInKTtcbiAgICAgICAgICAgICAgICB0aGlzLndoZWVsU3RhdGUgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMud2hlZWxTcC5ub2RlLnJvdGF0aW9uID0gdGhpcy5maW5hbEFuZ2xlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNwcmluZ2JhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgLy/lgJLovazkuIDkuKrpvb/ova5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdCA9IG5ldyBjYy5yb3RhdGVCeSgwLjUsIC10aGlzLmdlYXJBbmdsZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXEgPSBjYy5zZXF1ZW5jZShuZXcgY2MuZGVsYXlUaW1lKDAuMyksIGFjdCwgY2MuY2FsbEZ1bmModGhpcy5zaG93UmVzLCB0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2hlZWxTcC5ub2RlLnJ1bkFjdGlvbihzZXEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2hvd1JlczogZnVuY3Rpb24gc2hvd1JlcygpIHtcbiAgICAgICAgdmFyIENvbmZpZyA9IHJlcXVpcmUoXCJDb25maWdcIik7XG4gICAgICAgIGlmIChjYy5zeXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgICBhbGVydCgnWW91IGhhdmUgZ290ICcgKyBDb25maWcuZ2VhckluZm9bdGhpcy50YXJnZXRJRF0pO1xuICAgICAgICB9IGVsc2UgY2MubG9nKENvbmZpZy5nZWFySW5mb1t0aGlzLnRhcmdldElEXSk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyJdfQ==
