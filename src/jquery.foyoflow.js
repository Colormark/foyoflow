/*! 
* foyoflow v0.1.2
*
* Copyright 2018, Colormark https://github.com/Colormark/foyoflow
* Released under the GNU General Public License v3.0 license 
*
* Date: 2018-03-21 20:14:29
*/

;(function($) {

	var Foyoflow = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
        	'step': '<span class="foyoflow-step"></span>',
            'line': '<span class="foyoflow-line"></span>',
            'direction': 'row',
        },
        this.options = $.extend({}, this.defaults, opt);
    };

    Foyoflow.prototype = {
        init: function() {

        	var ele = this.$element;
        	ele.addClass("foyoflow-container");

            if(this.options["direction"]=="column"){
                ele.addClass("foyoflow-direction-column");
            }else{
                ele.addClass("foyoflow-direction-row");
            }

        	ele.html("");

        	var roadmaps = this.options["roadmaps"];

        	for (var i = 0; i < roadmaps.length; i++) {
        		var step_conf = roadmaps[i];
        		var step = $(this.options["step"]);
        		step.attr("foyo_roadmap_id", step_conf["roadmap_id"]);

        		var label = $('<span class="foyoflow-step-label">'+step_conf["label"]+'</span>');
        		if(i%2==0){
        			label.addClass("foyoflow-step-label-odd");
        		}
        		step.append(label);

        		if(typeof step_conf["flag"] !== "undefined"){
        			var flag_conf = step_conf["flag"];
        			var flag = $(`<span class="foyoflow-flag">
        				<font class="foyoflow-flag-label" style="color:${flag_conf["color"]}">${flag_conf["label"]}</font>
        				<svg version="1.1" class="foyoflow-flag-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 200 147" style="enable-background:new 0 0 200 147;fill:${flag_conf["color"]}" xml:space="preserve">
							<path d="M190.5,42.5c-9.2,1.5-24.3,1.9-34.3-17C145.4,5.1,128.1,4.5,118,6.3c-4.9,0.9-8.6,5-8.6,9v50.7c2.9,1.1,6-0.1,6.8-0.2
    c0.2-0.1,0.4-0.1,0.6-0.1c6.4-1.4,13.3-2.1,30.1,6c21.1,10.1,39.7-8.5,46.8-21.5c0.5-0.9,2.2-5.2,2.2-9.3
    C193.5,41.9,190.5,42.5,190.5,42.5z"/>
                            <path d="M102.1,9.5h-4.1c-1.1,0-2.1,0.9-2.1,2.1v132.4c0,1.1,0.9,2.1,2.1,2.1h4.1c1.1,0,2.1-0.9,2.1-2.1V11.5
    C104.1,10.4,103.2,9.5,102.1,9.5z"/>
						</svg>
        				</span>`);
        			step.append(flag);
        		}

                step.data("stepData", step_conf);

        		ele.append(step);

        		if(typeof this.options["onStepClick"] === "function"){
        			var onStepClick = this.options["onStepClick"];
        			step.on("click", function(){
        				onStepClick($(this));
        			});
        		}
        		

        		if(typeof step_conf["status"] !== "undefined"){

        			var step_prev = step.prev(".foyoflow-line");

        			if(step_conf["status"]=="done"){
        				step.addClass("foyoflow-step-done");
        				step_prev.addClass("foyoflow-line-done");
        			}
        			if(step_conf["status"]=="waiting"){
        				step.addClass("foyoflow-step-waiting");
        			}
        			if(step_conf["status"]=="processing"){
        				step.addClass("foyoflow-step-processing");
        				step_prev.addClass("foyoflow-line-done");
        			}
        		}

        		if(roadmaps.length-i>1){
        			var line = $(this.options["line"]);
        			if(typeof this.options["lineWidth"] !== "undefined" && !isNaN(this.options["lineWidth"])){
        				
                        if(this.options["direction"]=="column"){
                            line.css("minHeight",this.options["lineWidth"]);
                        }else{
                            line.css("maxWidth",this.options["lineWidth"]);
                        }
                        
        			}
        			ele.append(line);
        		}

        	}

        }
    }

    $.fn.foyoflow = function(options) {
        var foyoflow = new Foyoflow(this, options);
        return foyoflow.init();
    }


})(jQuery);