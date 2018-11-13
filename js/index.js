;(function($,window,document){
  "use strict";
  let defaults = {
    height:3,    //高度
    defaultValue:0,    //默认值
    numbs:2,    //生成重复次数
    type:'num'    //类型 字母和数字
  }
  let initTitle = ['A','B','C','V']
  // 初始化 区
  let zm = ['A1','A2','A3','A4','A5','A6','A7','A8','B1','B2','B3','B4','C1','C2','C3','C4','C5','C6','C7','C8','C9','V'];
  // 初始化 排
  let row = [];
  for (var i = 0; i < initTitle.length; i++) {
    for(var j = 1;j <= 15;j++){
      let str = '';
      if(j < 10){
        str = initTitle[i] + '0'+ j
      }else{
        str = initTitle[i] + j
      }
      row.push(str)
    }
  }

  // 初始化 座位号
  let nums = [];
  for (var i = 1; i <= 85; i++) {
    let str = ''
    if(i < 10){
      str = '00' + i;
    }else{
      str = '0' + i
    }
    nums.push(str)
  }


  function rollNum(obj,options){
    this.obj = obj;
    this.options = $.extend(defaults,options)
    this.init = function(){
      this.initHtml(obj,defaults)
    }
  }

  function findStr(obj,options){
    this.obj = obj;
    this.options = $.extend(defaults,options)
    this.result = function(){
      let result = this.options.result;
      let index,
          finIndex
      if(options.type == 'zm'){
        // 查找位置
        index = zm.indexOf(result);
        // 最终转到的位置
        finIndex = (Number(this.options.numbs) - 1) * zm.length + Number(index);

      }else if(options.type == 'row'){
        // 查找位置
        index = row.indexOf(result);
        // 最终转到的位置
        finIndex = (Number(this.options.numbs) - 1) * row.length + Number(index);
      }else{

        index = nums.indexOf(result);
        finIndex = (Number(this.options.numbs) - 1) * nums.length + Number(index);
      }

      let topPx = Number(finIndex) * -1 * Number(options.height)

      $(obj).children().animate({
        'top': topPx + 'rem'
      },2000)

    }
  }

  rollNum.prototype = {
    initHtml:function(obj,options){
       let html = '<ul class="tool-ul">';
       if(options.type == 'zm'){
         for (var j = 0; j < options.numbs; j++) {
           for (var i = 0; i < zm.length; i++) {
             html += '<li style="height:'+options.height+'rem">'+zm[i]+'</li>'
           }
         }
       }else if(options.type == 'row'){
         for (var j = 0; j < options.numbs; j++) {
           for (var i = 0; i < row.length; i++) {
             html += '<li style="height:'+options.height+'rem">'+row[i]+'</li>'
           }
         }
       }else{
         for (var j = 0; j < options.numbs; j++) {
           for (var i = 0; i < nums.length; i++) {
             html += '<li style="height:'+options.height+'rem">'+nums[i]+'</li>'
           }
         }
       }
       html += '</ul>';

       $(obj).append(html);
    }

  }



  $.fn.rollNum = function(options){
      var $that = this;
      var rollNumObj = new rollNum($that, options);
      rollNumObj.init();
  };

  $.fn.findNum = function(options){
      var $that = this;
      var rollNumObj = new findStr($that, options);
      rollNumObj.result();
  };

})(jQuery, window, document);
