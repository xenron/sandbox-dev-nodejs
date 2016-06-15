$ = require("jquery")
days = require("../../build/js/sample.js")
complimentTemplate = require("../../build/templates/compliment.js")
helloTemplate = require("../../build/templates/hello.js")
daysTemplate = require("../../build/templates/days.js")

$ ->
  $("#hello").html helloTemplate(name: "Dave")
  $("#compliment").html complimentTemplate(compliment: "You're great!")
  $("#days").html daysTemplate(days: days())
