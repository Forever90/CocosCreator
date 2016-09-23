
var Item = cc.Class({
    name:'Item',
    properties:{
        id:0,
        itemName:'',
        itemPrice:0,
        iconSF:cc.SpriteFrame  //icon 图标
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        items:{
            default:[],
            type:Item
        },
        itemPrefab:cc.Prefab
    },

    // use this for initialization
    onLoad: function () {
       this._timeCount= 0;
       this._curIndex = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this._curIndex >= this.items.length)
        {
            this.active = false;
            return;
        }
        this._timeCount += dt;
        if(this._timeCount > 1)
        {
            this._timeCount = 0;
            var item = cc.instantiate(this.itemPrefab);
            var data = this.items[this._curIndex];
            item.getComponent('ItemPrefab').init({
                id:data.id,
                itemName:data.itemName,
                itemPrice:data.itemPrice,
                iconSF:data.iconSF
            });
             var l = this.getComponent(cc.Layout);
            l.node.addChild(item);
            this._curIndex ++;
        }
         //根据数据动态生成物品
        for(var i=0; i<this.items.length; ++i)
        {
            
        }
    },
});
