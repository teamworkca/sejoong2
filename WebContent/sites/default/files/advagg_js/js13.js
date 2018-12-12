/* Source and licensing information for the line(s) below can be found at http://SEJOONG.edu.vn/sites/all/modules/contrib/ctools/js/modal.js. */
(function($){Drupal.CTools=Drupal.CTools||{};Drupal.CTools.Modal=Drupal.CTools.Modal||{};Drupal.CTools.Modal.show=function(choice){var opts={};if(choice&&typeof choice=='string'&&Drupal.settings[choice]){$.extend(true,opts,Drupal.settings[choice])}else if(choice)$.extend(true,opts,choice);var defaults={modalTheme:'CToolsModalDialog',throbberTheme:'CToolsModalThrobber',animation:'show',animationSpeed:'fast',modalSize:{type:'scale',width:.8,height:.8,addWidth:0,addHeight:0,contentRight:25,contentBottom:45},modalOptions:{opacity:.55,background:'#fff'},modalClass:'default'},settings={};$.extend(true,settings,defaults,Drupal.settings.CToolsModal,opts);if(Drupal.CTools.Modal.currentSettings&&Drupal.CTools.Modal.currentSettings!=settings){Drupal.CTools.Modal.modal.remove();Drupal.CTools.Modal.modal=null};Drupal.CTools.Modal.currentSettings=settings;var resize=function(e){var context=e?document:Drupal.CTools.Modal.modal;if(Drupal.CTools.Modal.currentSettings.modalSize.type=='scale'){var width=$(window).width()*Drupal.CTools.Modal.currentSettings.modalSize.width,height=$(window).height()*Drupal.CTools.Modal.currentSettings.modalSize.height}else{var width=Drupal.CTools.Modal.currentSettings.modalSize.width,height=Drupal.CTools.Modal.currentSettings.modalSize.height};$('div.ctools-modal-content',context).css({width:width+Drupal.CTools.Modal.currentSettings.modalSize.addWidth+'px',height:height+Drupal.CTools.Modal.currentSettings.modalSize.addHeight+'px'});$('div.ctools-modal-content .modal-content',context).css({width:(width-Drupal.CTools.Modal.currentSettings.modalSize.contentRight)+'px',height:(height-Drupal.CTools.Modal.currentSettings.modalSize.contentBottom)+'px'})};if(!Drupal.CTools.Modal.modal){Drupal.CTools.Modal.modal=$(Drupal.theme(settings.modalTheme));if(settings.modalSize.type=='scale')$(window).bind('resize',resize)};resize();$('span.modal-title',Drupal.CTools.Modal.modal).html(Drupal.CTools.Modal.currentSettings.loadingText);Drupal.CTools.Modal.modalContent(Drupal.CTools.Modal.modal,settings.modalOptions,settings.animation,settings.animationSpeed,settings.modalClass);$('#modalContent .modal-content').html(Drupal.theme(settings.throbberTheme)).addClass('ctools-modal-loading');$('#modalContent .modal-content').delegate('input.form-autocomplete','keyup',function(){$('#autocomplete').css('top',$(this).position().top+$(this).outerHeight()+$(this).offsetParent().filter('#modal-content').scrollTop())})};Drupal.CTools.Modal.dismiss=function(){if(Drupal.CTools.Modal.modal)Drupal.CTools.Modal.unmodalContent(Drupal.CTools.Modal.modal)};Drupal.theme.prototype.CToolsModalDialog=function(){var html='';html+='<div id="ctools-modal">';html+='  <div class="ctools-modal-content">';html+='    <div class="modal-header">';html+='      <a class="close" href="#">';html+=Drupal.CTools.Modal.currentSettings.closeText+Drupal.CTools.Modal.currentSettings.closeImage;html+='      </a>';html+='      <span id="modal-title" class="modal-title">&nbsp;</span>';html+='    </div>';html+='    <div id="modal-content" class="modal-content">';html+='    </div>';html+='  </div>';html+='</div>';return html};Drupal.theme.prototype.CToolsModalThrobber=function(){var html='';html+='<div id="modal-throbber">';html+='  <div class="modal-throbber-wrapper">';html+=Drupal.CTools.Modal.currentSettings.throbber;html+='  </div>';html+='</div>';return html};Drupal.CTools.Modal.getSettings=function(object){var match=$(object).attr('class').match(/ctools-modal-(\S+)/);if(match)return match[1]};Drupal.CTools.Modal.clickAjaxCacheLink=function(){Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));return Drupal.CTools.AJAX.clickAJAXCacheLink.apply(this)};Drupal.CTools.Modal.clickAjaxLink=function(){Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));return false};Drupal.CTools.Modal.submitAjaxForm=function(e){var $form=$(this),url=$form.attr('action');setTimeout(function(){Drupal.CTools.AJAX.ajaxSubmit($form,url)},1);return false};Drupal.behaviors.ZZCToolsModal={attach:function(context){$('area.ctools-use-modal, a.ctools-use-modal',context).once('ctools-use-modal',function(){var $this=$(this);$this.click(Drupal.CTools.Modal.clickAjaxLink);var element_settings={};if($this.attr('href')){element_settings.url=$this.attr('href');element_settings.event='click';element_settings.progress={type:'throbber'}};var base=$this.attr('href');Drupal.ajax[base]=new Drupal.ajax(base,this,element_settings)});$('input.ctools-use-modal, button.ctools-use-modal',context).once('ctools-use-modal',function(){var $this=$(this);$this.click(Drupal.CTools.Modal.clickAjaxLink);var button=this,element_settings={};element_settings.url=Drupal.CTools.Modal.findURL(this);if(element_settings.url=='')element_settings.url=$(this).closest('form').attr('action');element_settings.event='click';element_settings.setClick=true;var base=$this.attr('id');Drupal.ajax[base]=new Drupal.ajax(base,this,element_settings);$('.'+$(button).attr('id')+'-url').change(function(){Drupal.ajax[base].options.url=Drupal.CTools.Modal.findURL(button)})});$('#modal-content form',context).once('ctools-use-modal',function(){var $this=$(this),element_settings={};element_settings.url=$this.attr('action');element_settings.event='submit';element_settings.progress={type:'throbber'};var base=$this.attr('id');Drupal.ajax[base]=new Drupal.ajax(base,this,element_settings);Drupal.ajax[base].form=$this;$('input[type=submit], button',this).click(function(event){Drupal.ajax[base].element=this;this.form.clk=this;if(Drupal.autocompleteSubmit&&!Drupal.autocompleteSubmit())return false;if(jQuery.fn.jquery.substr(0,3)==='1.4'&&typeof event.bubbles==="undefined"){$(this.form).trigger('submit');return false}})});$('.ctools-close-modal',context).once('ctools-close-modal').click(function(){Drupal.CTools.Modal.dismiss();return false})}};Drupal.CTools.Modal.modal_display=function(ajax,response,status){if($('#modalContent').length==0)Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(ajax.element));$('#modal-title').html(response.title);$('#modal-content').html(response.output).scrollTop(0);var settings=response.settings||ajax.settings||Drupal.settings;Drupal.attachBehaviors($('#modalContent'),settings);if($('#modal-content').hasClass('ctools-modal-loading')){$('#modal-content').removeClass('ctools-modal-loading')}else $('#modal-content :focusable:first').focus()};Drupal.CTools.Modal.modal_dismiss=function(command){Drupal.CTools.Modal.dismiss();$('link.ctools-temporary-css').remove()};Drupal.CTools.Modal.modal_loading=function(command){Drupal.CTools.Modal.modal_display({output:Drupal.theme(Drupal.CTools.Modal.currentSettings.throbberTheme),title:Drupal.CTools.Modal.currentSettings.loadingText})};Drupal.CTools.Modal.findURL=function(item){var url='',url_class='.'+$(item).attr('id')+'-url';$(url_class).each(function(){var $this=$(this);if(url&&$this.val())url+='/';url+=$this.val()});return url};Drupal.CTools.Modal.modalContent=function(content,css,animation,speed,modalClass){if(!animation){animation='show'}else if(animation!='fadeIn'&&animation!='slideDown')animation='show';if(!speed)speed='fast';css=jQuery.extend({position:'absolute',left:'0px',margin:'0px',background:'#000',opacity:'.55'},css);css.filter='alpha(opacity='+(100*css.opacity)+')';content.hide();if($('#modalBackdrop').length)$('#modalBackdrop').remove();if($('#modalContent').length)$('#modalContent').remove();if(self.pageYOffset){var wt=self.pageYOffset}else if(document.documentElement&&document.documentElement.scrollTop){var wt=document.documentElement.scrollTop}else if(document.body)var wt=document.body.scrollTop;var docHeight=$(document).height()+50,docWidth=$(document).width(),winHeight=$(window).height(),winWidth=$(window).width();if(docHeight<winHeight)docHeight=winHeight;$('body').append('<div id="modalBackdrop" class="backdrop-'+modalClass+'" style="z-index: 1000; display: none;"></div><div id="modalContent" class="modal-'+modalClass+'" style="z-index: 1001; position: absolute;">'+$(content).html()+'</div>');var getTabbableElements=function(){var tabbableElements=$('#modalContent :tabbable'),radioButtons=tabbableElements.filter('input[type="radio"]');if(radioButtons.length>0){var anySelected={};radioButtons.each(function(){var name=this.name;if(typeof anySelected[name]==='undefined')anySelected[name]=radioButtons.filter('input[name="'+name+'"]:checked').length!==0});var found={};tabbableElements=tabbableElements.filter(function(){var keep=true;if(this.type=='radio')if(anySelected[this.name]){keep=this.checked}else{if(found[this.name])keep=false;found[this.name]=true};return keep})};return tabbableElements.get()};modalEventHandler=function(event){target=null;if(event){target=event.target}else{event=window.event;target=event.srcElement};var parents=$(target).parents().get();for(var i=0;i<parents.length;++i){var position=$(parents[i]).css('position');if(position=='absolute'||position=='fixed')return true};if($(target).is('#modalContent, body')||$(target).filter('*:visible').parents('#modalContent').length){return true}else getTabbableElements()[0].focus();event.preventDefault()};$('body').bind('focus',modalEventHandler);$('body').bind('keypress',modalEventHandler);modalTabTrapHandler=function(evt){if(evt.which!=9)return true;var tabbableElements=getTabbableElements(),firstTabbableElement=tabbableElements[0],lastTabbableElement=tabbableElements[tabbableElements.length-1],singleTabbableElement=firstTabbableElement==lastTabbableElement,node=evt.target;if(node==firstTabbableElement&&evt.shiftKey){if(!singleTabbableElement)lastTabbableElement.focus();return false}else if(node==lastTabbableElement&&!evt.shiftKey){if(!singleTabbableElement)firstTabbableElement.focus();return false}else if($.inArray(node,tabbableElements)==-1){var parents=$(node).parents().get();for(var i=0;i<parents.length;++i){var position=$(parents[i]).css('position');if(position=='absolute'||position=='fixed')return true};if(evt.shiftKey){lastTabbableElement.focus()}else firstTabbableElement.focus()}};$('body').bind('keydown',modalTabTrapHandler);var modalContent=$('#modalContent').css('top','-1000px'),$modalHeader=modalContent.find('.modal-header'),mdcTop=wt+(winHeight/2)-(modalContent.outerHeight()/2),mdcLeft=(winWidth/2)-(modalContent.outerWidth()/2);$('#modalBackdrop').css(css).css('top',0).css('height',docHeight+'px').css('width',docWidth+'px').show();modalContent.css({top:mdcTop+'px',left:mdcLeft+'px'}).hide()[animation](speed);modalContentClose=function(){close();return false};$('.close',$modalHeader).bind('click',modalContentClose);modalEventEscapeCloseHandler=function(event){if(event.keyCode==27){close();return false}};$(document).bind('keydown',modalEventEscapeCloseHandler);var oldFocus=document.activeElement;$('.close',$modalHeader).focus()
function close(){$(window).unbind('resize',modalContentResize);$('body').unbind('focus',modalEventHandler);$('body').unbind('keypress',modalEventHandler);$('body').unbind('keydown',modalTabTrapHandler);$('.close',$modalHeader).unbind('click',modalContentClose);$('body').unbind('keypress',modalEventEscapeCloseHandler);$(document).trigger('CToolsDetachBehaviors',$('#modalContent'));if(animation=='fadeIn')animation='fadeOut';if(animation=='slideDown')animation='slideUp';if(animation=='show')animation='hide';modalContent.hide()[animation](speed);$('#modalContent').remove();$('#modalBackdrop').remove();$(oldFocus).focus()};modalContentResize=function(){$('#modalBackdrop').css('height','').css('width','');if(self.pageYOffset){var wt=self.pageYOffset}else if(document.documentElement&&document.documentElement.scrollTop){var wt=document.documentElement.scrollTop}else if(document.body)var wt=document.body.scrollTop;var docHeight=$(document).height(),docWidth=$(document).width(),winHeight=$(window).height(),winWidth=$(window).width();if(docHeight<winHeight)docHeight=winHeight;var modalContent=$('#modalContent'),mdcTop=wt+(winHeight/2)-(modalContent.outerHeight()/2),mdcLeft=(winWidth/2)-(modalContent.outerWidth()/2);$('#modalBackdrop').css('height',docHeight+'px').css('width',docWidth+'px').show();modalContent.css('top',mdcTop+'px').css('left',mdcLeft+'px').show()};$(window).bind('resize',modalContentResize)};Drupal.CTools.Modal.unmodalContent=function(content,animation,speed){if(!animation){var animation='show'}else if((animation!='fadeOut')&&(animation!='slideUp'))animation='show';if(!speed)var speed='fast';$(window).unbind('resize',modalContentResize);$('body').unbind('focus',modalEventHandler);$('body').unbind('keypress',modalEventHandler);$('body').unbind('keydown',modalTabTrapHandler);var $modalContent=$('#modalContent'),$modalHeader=$modalContent.find('.modal-header');$('.close',$modalHeader).unbind('click',modalContentClose);$('body').unbind('keypress',modalEventEscapeCloseHandler);$(document).trigger('CToolsDetachBehaviors',$modalContent);content.each(function(){if(animation=='fade'){$('#modalContent').fadeOut(speed,function(){$('#modalBackdrop').fadeOut(speed,function(){$(this).remove()});$(this).remove()})}else if(animation=='slide'){$('#modalContent').slideUp(speed,function(){$('#modalBackdrop').slideUp(speed,function(){$(this).remove()});$(this).remove()})}else{$('#modalContent').remove();$('#modalBackdrop').remove()}})};$(function(){Drupal.ajax.prototype.commands.modal_display=Drupal.CTools.Modal.modal_display;Drupal.ajax.prototype.commands.modal_dismiss=Drupal.CTools.Modal.modal_dismiss})})(jQuery);;
/* Source and licensing information for the above line(s) can be found at http://SEJOONG.edu.vn/sites/all/modules/contrib/ctools/js/modal.js. */
;/*})'"*/
/* Source and licensing information for the line(s) below can be found at http://SEJOONG.edu.vn/sites/all/modules/custom/liva_active_menu/liva_active_menu.js. */
jQuery(document).ready(function($){if(Drupal.settings.liva_menu_active.path){$base_path=Drupal.settings.basePath;if(isArray(Drupal.settings.liva_menu_active.path)=='Array'){for(var i in Drupal.settings.liva_menu_active.path){$path=Drupal.settings.liva_menu_active.path[i];$paths=$path.split(" ");if($paths.length>1){$href=$paths.pop();$id=$paths.join(" ");$selector=$id+" a[href='"+$href+"']";$($selector).addClass('active');$($selector).parents("li").addClass('active-trail')}else{$selector="a[href='"+Drupal.settings.liva_menu_active.path[i]+"']";$($selector).addClass('active');$($selector).parents("li").addClass('active-trail')}}}else{$path=Drupal.settings.liva_menu_active.path;$paths=$path.split(" ");if($paths.length>1){$href=$paths.pop();$id=$paths.join(" ");$selector=$id+" a[href='"+$href+"']";$($selector).addClass('active');$($selector).parents("li").addClass('active-trail')}else{$selector="a[href='"+Drupal.settings.liva_menu_active.path+"']";$($selector).addClass('active');$($selector).parents("li").addClass('active-trail')}}}})
function isArray(obj){if(obj.constructor.toString().indexOf("Array")!=-1){return"Array"}else if(obj.constructor.toString().indexOf("String")!=-1){return"String"}else return"Object"}
function activehover($element){jQuery($element).next('ul').addClass('activehover');jQuery($element).next('ul').css({visibility:'visible',display:'block'})};
/* Source and licensing information for the above line(s) can be found at http://SEJOONG.edu.vn/sites/all/modules/custom/liva_active_menu/liva_active_menu.js. */
;/*})'"*/
/* Source and licensing information for the line(s) below can be found at http://SEJOONG.edu.vn/sites/all/modules/contrib/google_analytics/googleanalytics.js. */
(function($){Drupal.googleanalytics={};$(document).ready(function(){$(document.body).bind("mousedown keyup touchstart",function(event){$(event.target).closest("a,area").each(function(){if(Drupal.googleanalytics.isInternal(this.href)){if($(this).is('.colorbox')&&(Drupal.settings.googleanalytics.trackColorbox));else if(Drupal.settings.googleanalytics.trackDownload&&Drupal.googleanalytics.isDownload(this.href)){ga("send",{hitType:"event",eventCategory:"Downloads",eventAction:Drupal.googleanalytics.getDownloadExtension(this.href).toUpperCase(),eventLabel:Drupal.googleanalytics.getPageUrl(this.href),transport:"beacon"})}else if(Drupal.googleanalytics.isInternalSpecial(this.href))ga("send",{hitType:"pageview",page:Drupal.googleanalytics.getPageUrl(this.href),transport:"beacon"})}else if(Drupal.settings.googleanalytics.trackMailto&&$(this).is("a[href^='mailto:'],area[href^='mailto:']")){ga("send",{hitType:"event",eventCategory:"Mails",eventAction:"Click",eventLabel:this.href.substring(7),transport:"beacon"})}else if(Drupal.settings.googleanalytics.trackOutbound&&this.href.match(/^\w+:\/\//i))if(Drupal.settings.googleanalytics.trackDomainMode!==2||(Drupal.settings.googleanalytics.trackDomainMode===2&&!Drupal.googleanalytics.isCrossDomain(this.hostname,Drupal.settings.googleanalytics.trackCrossDomains)))ga("send",{hitType:"event",eventCategory:"Outbound links",eventAction:"Click",eventLabel:this.href,transport:"beacon"})})});if(Drupal.settings.googleanalytics.trackUrlFragments)window.onhashchange=function(){ga("send",{hitType:"pageview",page:location.pathname+location.search+location.hash})};if(Drupal.settings.googleanalytics.trackColorbox)$(document).bind("cbox_complete",function(){var href=$.colorbox.element().attr("href");if(href)ga("send",{hitType:"pageview",page:Drupal.googleanalytics.getPageUrl(href)})})});Drupal.googleanalytics.isCrossDomain=function(hostname,crossDomains){if(!crossDomains){return false}else return $.inArray(hostname,crossDomains)>-1?true:false};Drupal.googleanalytics.isDownload=function(url){var isDownload=new RegExp("\\.("+Drupal.settings.googleanalytics.trackDownloadExtensions+")([\?#].*)?$","i");return isDownload.test(url)};Drupal.googleanalytics.isInternal=function(url){var isInternal=new RegExp("^(https?):\/\/"+window.location.host,"i");return isInternal.test(url)};Drupal.googleanalytics.isInternalSpecial=function(url){var isInternalSpecial=new RegExp("(\/go\/.*)$","i");return isInternalSpecial.test(url)};Drupal.googleanalytics.getPageUrl=function(url){var extractInternalUrl=new RegExp("^(https?):\/\/"+window.location.host,"i");return url.replace(extractInternalUrl,'')};Drupal.googleanalytics.getDownloadExtension=function(url){var extractDownloadextension=new RegExp("\\.("+Drupal.settings.googleanalytics.trackDownloadExtensions+")([\?#].*)?$","i"),extension=extractDownloadextension.exec(url);return(extension===null)?'':extension[1]}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at http://SEJOONG.edu.vn/sites/all/modules/contrib/google_analytics/googleanalytics.js. */
;/*})'"*/
