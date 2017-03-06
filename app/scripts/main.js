//console.log('\'Allo \'Allo!');

// initialize fullPage




 $(document).ready(function(){
 	$('#fullpage').fullpage({

//Navigation

resposiveWidth:640,
css3: true,
anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'lastPage'],
navigation: true,
navigationPosition: 'right',
navigationTooltips: ['Home', 'About', 'Portfolio','Expertise','Contact'],
//verticalCentered: true,

onLeave: function(index, nextIndex, direction){

if (index == 1) {
   $('.s2').addClass('animated bounceInRight');
   $('.s3').addClass('animated fadeInLeft');
}
if (index == 2) {
   $('#firstCard').removeClass('animated bounceInRight');
}
if (index == 3) {
   $('#firstCard').addClass('animated bounceInLeft');
}
//crear un igual a los otros 
if (index == 4) {
   $('#firstCard').addClass('animated bounceInLeft');
}

}


});
 });








// CODE FOR FIRSTPAGE -Typewrite



var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement('style');
        css.type = 'text/css';
        css.innerHTML = '.typewrite > .wrap { border-right: 0.07em solid white';
        document.body.appendChild(css);
    };




// Code for D3 Requirement 


    var dataset = [
        { name: 'HTML', percent: 99.9 },
        { name: 'CSS', percent: 95 },
        { name: 'PHP', percent: 70 },
        { name: 'Javascript', percent: 70 },
        { name: 'Adobe CC', percent: 90 },
        { name: 'Maya', percent: 65 }
    ];

    var pie=d3.layout.pie()
            .value(function(d){return d.percent})
            .sort(null)
            .padAngle(.03);

    var w=300,h=300;

    var outerRadius=w/2;
    var innerRadius=100;

    var color = d3.scale.category10();

    var arc=d3.svg.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

    var svg=d3.select('#chart')
            .append('svg')
            .attr({
                width:w,
                height:h,
                class:'shadow'
            }).append('g')
            .attr({
                transform:'translate('+w/2+','+h/2+')'
            });
    var path=svg.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr({
                d:arc,
                fill:function(d,i){
                    return color(d.data.name);
                }
            });

    path.transition()
            .duration(1000)
            .attrTween('d', function(d) {
                var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                return function(t) {
                    return arc(interpolate(t));
                };
            });


    var restOfTheData=function(){
        var text=svg.selectAll('text')
                .data(pie(dataset))
                .enter()
                .append('text')
                .transition()
                .duration(200)
                .attr('transform', function (d) {
                    return 'translate(' + arc.centroid(d) + ')';
                })
                .attr('dy', '.4em')
                .attr('text-anchor', 'middle')
                .text(function(d){
                    return d.data.percent+'%';
                })
                .style({
                    fill:'#fff',
                    'font-size':'10px'
                });

        var legendRectSize=20;
        var legendSpacing=7;
        var legendHeight=legendRectSize+legendSpacing;


        var legend=svg.selectAll('.legend')
                .data(color.domain())
                .enter()
                .append('g')
                .attr({
                    class:'legend',
                    transform:function(d,i){
                        //Just a calculation for x & y position
                        return 'translate(-35,' + ((i*legendHeight)-65) + ')';
                    }
                });
        legend.append('rect')
                .attr({
                    width:legendRectSize,
                    height:legendRectSize,
                    rx:20,
                    ry:20
                })
                .style({
                    fill:color,
                    stroke:color
                });

        legend.append('text')
                .attr({
                    x:30,
                    y:15
                })
                .text(function(d){
                    return d;
                }).style({
                    fill:'#929DAF',
                    'font-size':'14px'
                });
    };

    setTimeout(restOfTheData,1000);


//CODE FOR CONTACT
   