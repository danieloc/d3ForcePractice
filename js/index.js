+ function(d3) {

  var runFunc = function(el) {

    var circleWidth = 30;

    //This is the SCSS colours that I can choose from.

    var palette = {
      "lightgray": "#819090",
      "gray": "#708284",
      "mediumgray": "#536870",
      "darkgray": "#475B62",
      "darkblue": "#0A2933",
      "darkerblue": "#042029",
      "paleryellow": "#FCF4DC",
      "paleyellow": "#EAE3CB",
      "yellow": "#A57706",
      "orange": "#BD3613",
      "red": "#D11C24",
      "pink": "#C61C6F",
      "purple": "#595AB7",
      "blue": "#2176C7",
      "green": "#259286",
      "white": "#fefefe",
      "yellowgreen": "#738A05"
    }

    //This is the data that will be returned from the store

    var nodes = [{
      name: "Daniel"
    }, {
      name: "Football",
      target: [0],
      subDocs: [{
        name: "Football"
      }, {
        name: "Training",
        target: [0]
      }, {
        name: "Coaching",
        target: [0]
      }, {
        name: "Health Programming",
        target: [0]
      }, {
        name: "Physiotherapy",
        target: [0]
      }]
    }, {
      name: "FYP",
      target: [0],
      subDocs: [{
        name: "FYP"
      }, {
        name: "D3",
        target: [0]
      }, {
        name: "REACT",
        target: [0]
      }, {
        name: "FLUX",
        target: [0]
      }, {
        name: "MongoDB",
        target: [0]
      }]
    }, {
      name: "College",
      target: [0],
      subDocs: [{
        name: "College"
      }, {
        name: "Group work",
        target: [0]
      }, {
        name: "Meeting",
        target: [0]
      }, {
        name: "CSIS",
        target: [0]
      }, {
        name: "CS4023",
        target: [0]
      }]
    }, {
      name: "Socialising",
      target: [0],
      subDocs: [{
        name: "Socialising"
      }, {
        name: "Football",
        target: [0]
      }, {
        name: "Drinking",
        target: [0]
      }, {
        name: "Gym",
        target: [0]
      }, {
        name: "Soccar",
        target: [0]
      }]
    }, {
      name: "Friends",
      target: [0],
      subDocs: [{
        name: "Friends"
      }, {
        name: "Kev",
        target: [0]
      }, {
        name: "Ailish",
        target: [0]
      }, {
        name: "Sean",
        target: [0]
      }, {
        name: "Darragh",
        target: [0]
      }]
    }];

    var isInner = false;

    //Nodes2 is used as the data that is being displayed.

    var nodes2 = nodes.valueOf();
    calculateEverything(nodes, nodes2, isInner);

    function calculateEverything(nodes, nodes2, isInner) {
      var links = [];
      console.log('Going to Calculate everything!!');
      var w = screen.width,
          h = screen.height;


      //For every dataset,
      for (var i = 0; i < nodes2.length; i++) {
        //If the datahas a "target" value
        if (nodes2[i].target !== undefined) {
          //Push it onto the links
          for (var x = 0; x < nodes2[i].target.length; x++) {
            links.push({
              source: nodes2[i],
              target: nodes2[nodes2[i].target[x]]
            })
          }
        }
      }

      //Append the svg image to the d3 element.
      var myChart = d3.select(el)
          .append('svg')
          .attr('width', w)
          .attr('height', h)

      //Apply d3 force
      var force = d3.layout.force()
          .nodes(nodes2)
          .links([])
          .gravity(0.08)
          .charge(-2000)
          .size([w, h]);


      //Add visable lines to the data links
      var link = myChart.selectAll('line')
          .data(links).enter().append('line')
          .attr('stroke', palette.white);

      var node = myChart.selectAll('circle')
          .data(nodes2).enter()
          .append('g')
          .call(force.drag)
          .on('dblclick', function () {
            var nodeName = d3.select(this).text();
            if ( isInner === false) {
              var nodeFound = false;
              for (i = 0; i <= nodes2.length && nodeFound === false; i++) {
                if (nodes2[i].name === nodeName) {
                  nodeFound = true;
                  nodes2 = nodes2[i].subDocs.valueOf();
                  myChart.remove();
                  while (links.length > 0) {
                    links.pop();
                  }
                  d3.select('svg').remove();
                  isInner = true;
                  calculateEverything(nodes, nodes2, isInner);
                }
              }
            }
            else {
              if (nodeName === nodes2[0].name) {
                nodes2 = nodes.valueOf();
                myChart.remove();
                while (links.length > 0) {
                  links.pop();
                }
                d3.select('svg').remove();
                isInner = false;
                calculateEverything(nodes, nodes2, isInner);
              }
            }

          })
          .on("mouseover", function (d, i) {
            if (i > 0) {
              //CIRCLE
              d3.select(this).selectAll("circle")
                  .transition()
                  .duration(250)
                  .attr("r", circleWidth + 3)
            }
          })

          //MOUSEOUT
          .on("mouseout", function (d, i) {
            if (i > 0) {
              //CIRCLE
              d3.select(this).selectAll("circle")
                  .transition()
                  .duration(250)
                  .attr("r", circleWidth)

            }
          });
      force.linkDistance(w / 2);


      node.append('circle')
          .attr('r', circleWidth)
          .attr('stroke', function (d, i) {
            if (i > 0) {
              return palette.pink
            } else {
              return "transparent"
            }
          })
          .attr('stroke-width', 2)
          .attr('fill', function (d, i) {
            if (i > 0) {
              return palette.white
            } else {
              return "transparent"
            }
          })

      node.append('text')
          .text(function (d) {
            return d.name
          })
          .attr('font-family', 'Roboto Slab')
          .attr('fill', function (d, i) {
            if (i > 0) {
              return palette.mediumgray
            } else {
              return palette.white
            }
          })
          .attr('x', function (d, i) {
            if (i > 0) {
              return circleWidth + 20
            } else {
              return circleWidth - 15
            }
          })
          .attr('y', function (d, i) {
            if (i > 0) {
              return circleWidth
            } else {
              return 8
            }
          })
          .attr('text-anchor', function (d, i) {
            if (i > 0) {
              return 'beginning'
            } else {
              return 'end'
            }
          })
          .attr('font-size', function (d, i) {
            if (i > 0) {
              return '2em'
            } else {
              return '3.4em'
            }
          })

      force.on('tick', function (e) {
        nodes2[0].x = w / 2;
        nodes2[0].y = h / 2;
        node.attr('transform', function (d, i) {
          return 'translate(' + d.x + ', ' + d.y + ')';
        })

        link
            .attr('x1', function (d) {
              return d.source.x
            })
            .attr('y1', function (d) {
              return d.source.y
            })
            .attr('x2', function (d) {
              return d.target.x
            })
            .attr('y2', function (d) {
              return d.target.y
            })
      })

      force.start();
    }

  }('#demo');
}(window.d3);
