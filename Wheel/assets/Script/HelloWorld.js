cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        cocosSp:{
            default:null,
            type:cc.Sprite
        }
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;

        // 动态创建
        var node = new cc.Node('nodenew');
        var sp = node.addComponent(cc.Sprite);
        sp.spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/start0.png'));
        node.parent = this.node;
        // 销毁
        // this.node.getChildByName('nodenew').destroy();
        
    },

    // called every frame
    update: function (dt) {

    },

    onPlayBtn:function(event)
    {
        cc.log('.....event:'+ event);
        var ani = this.cocosSp.getComponent(cc.Animation);
        ani.play('testAniClip');
    },
    
    onRotate180:function()
    {
        cc.log('.....HelloWorld.js ani callback');
        var label = this.node.getChildByName('showLabel');
        label.getComponent(cc.Animation).play('labelClip');
    }
});
