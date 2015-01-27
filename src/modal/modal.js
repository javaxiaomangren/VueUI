/*
    Copyright (c) 2015 bravf(bravfing@126.com)
*/

VueUI.component('vue-modal', {
    template :
        '<div class="modal vue-modal" v-show="toggle">' +
            '<div class="vue-modal-content"><content></content></div>' +
            '<div class="modal-backdrop fade in"></div>' +
            '<div class="modal-dialog" v-style="width:width+\'px\'">' +
                '<div class="modal-content">' +
                    '<div class="modal-header">' +
                        '<button type="button" class="close" v-on="click:toggle=false"><span aria-hidden="true">×</span></button>' +
                        '<h4 class="modal-title">{{title}}</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                        '{{{content}}}' +
                    '</div>' +
                    '<div class="modal-footer" v-show="isShowCancelBtn || isShowOkBtn">' +
                        '<button type="button" class="btn btn-default" v-on="click:cancelBtnClick" v-show="isShowCancelBtn">{{cancelBtnText}}</button>' +
                        '<button type="button" class="btn btn-primary" v-on="click:okBtnClick" v-show="isShowOkBtn">{{okBtnText}}</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>'
    ,
    data : function (){
        return {
            config : {},

            title : '', //标题
            content : '', //内容
            toggle : false, //是否显示
            width : 500, //宽度

            // 按钮相关
            isShowCancelBtn : false,
            cancelBtnText : '取消',
            cancelBtnCallback : VueUI.emptyFunc,

            isShowOkBtn : false,
            okBtnText : '确认',
            okBtnCallback : VueUI.emptyFunc,
        }
    },
    watch : {
        content : function (){
            this.$compile(this.$el.querySelector('.modal-body'))
        },
        title : function (){
            this.title = this.title || document.title
        }
    },
    methods : {
        cancelBtnClick : function (){
            this.toggle = false
            this.cancelBtnCallback()
        },
        okBtnClick : function (){
            this.toggle = false
            this.okBtnCallback()
        }
    },
    compiled : function (){
        this.title = this.title || document.title
        this.$$el = $(this.$el)
        this.$$el.find('.modal-body').append(this.$$el.find('.vue-modal-content').show())
    }
})

new function (){
    var str =
    '<div id="VueUIAlertConfirm">' +
        '<vue-modal vue-id="VueUIAlert" v-with="config:VueUIAlertConf"></vue-modal>' +
        '<vue-modal vue-id="VueUIConfirm" v-with="config:VueUIConfirmConf"></vue-modal>' +
    '</div>'
    $('body').append(str)

    new Vue({
        el : '#VueUIAlertConfirm',
        data : {
            VueUIAlertConf : {
                isShowOkBtn : true
            },
            VueUIConfirmConf : {
                isShowOkBtn : true,
                isShowCancelBtn : true
            }
        }
    })

    var alertVU = VueUI.getComponent('VueUIAlert')
    var confirmVU = VueUI.getComponent('VueUIConfirm')

    VueUI.alert = function (conf){
        if ($.type(conf) == 'string'){
            alertVU.content = conf
            alertVU.title = document.title
            alertVU.okBtnCallback = VueUI.emptyFunc
        }
        else {
            alertVU.title = conf.title
            alertVU.content = conf.content || ''
            alertVU.okBtnCallback = conf.okCallback || VueUI.emptyFunc
        }
        alertVU.toggle = true
    }

    VueUI.confirm = function (conf){
        confirmVU.title = conf.title
        confirmVU.content = conf.content || '',
        confirmVU.okBtnCallback = conf.okCallback || VueUI.emptyFunc
        confirmVU.cancelBtnCallback = conf.cancelCallback || VueUI.emptyFunc
        confirmVU.toggle = true
    }
}()