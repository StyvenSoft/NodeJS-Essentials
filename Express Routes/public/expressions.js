function deactivateMachine() {
    machineIsOn = false;
    currentRequest = '';
    $('.expression-form').css('display', 'none');
    $('#expression-information .tabs li').removeClass('active');
    $('#expressions-information .tabs').html('');
    $('#server-machine').attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/server-machine-inactive.svg');
    $('#lightbulb').attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/lightbulb-inactive.svg');
    $('#beaker').attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/beaker-inactive.svg');
    $('#code-number').text('');
    $('#code-description').text('');
    clearExpressionText();
    clearExpressionsText();
  }
  
  function activateExpressions() {
    $('#expression-information').removeClass('inactive');
    $('#expressions-information').removeClass('inactive');
  }
  
  function deactivateExpressions() {
    $('#expression-information').addClass('inactive');
    $('#expressions-information').addClass('inactive');
  }
  
  function selectExpressionMode(mode) {
    if(!machineIsOn) {
      return;
    }
  
    currentRequest = mode;
    $('.expression-form').css('display', 'block');
    $('#expression-information .tabs li').removeClass('active');
    $('#id-field').prop('readonly', false).removeClass('disabled').val('');
    $('#name-field').prop('readonly', false).removeClass('disabled').val('');
    if (mode === 'GET') {
      $('#emoji-field').prop('disabled', false).removeClass('disabled').val('');
      $('#get-expression').addClass('active');
      $('#name-field').prop('readonly', true).addClass('disabled');
      $('#emoji-field').prop('disabled', true).addClass('disabled');
    } else if (mode === 'CREATE') {
      $('#emoji-field').prop('disabled', false).removeClass('disabled').val('😀');
      $('#create-expression').addClass('active');
      $('#id-field').prop('readonly', true).addClass('disabled');
    } else if (mode === 'UPDATE') {
      $('#emoji-field').prop('disabled', false).removeClass('disabled').val('😀');
      $('#update-expression').addClass('active');
    } else if (mode === 'DELETE') {
      $('#emoji-field').prop('disabled', false).removeClass('disabled').val('');
      $('#delete-expression').addClass('active');
      $('#name-field').prop('readonly', true).addClass('disabled');
      $('#emoji-field').prop('disabled', true).addClass('disabled');
    }
  }
  
  function triggerExpressionRequest() {
    if (requestInProgress || !machineIsOn) {
      return;
    }
  
    requestInProgress = true;
    deactivateExpressions();
  
    const id = $('#id-field').val();
    const name = $('#name-field').val();
    const emoji = $('#emoji-field').val();
  
    $('#expression-route').attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/expression-route-pending.svg');
    $('#expressions-route').attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/expressions-route-active.svg');
    $('#code-number').text('');
    $('#code-description').text('');
    clearExpressionsText();
    setExpressionRequestText(id, name, emoji);
    const animationDelay = 428.5;
    animateMachine(animationDelay);
    setTimeout(() => makeExpressionRequest(id, name, emoji), animationDelay * 4);
  }
  
  function setExpressionRequestText(id, name, emoji) {
    switch (currentRequest) {
      case 'GET':
        $('#expression-text pre').eq(0).text('GET');
        $('#expression-text pre').eq(1).text(`/expressions/${id}`);
        $('#expression-text pre').eq(2).text('');
        $('#expression-text pre').eq(3).text('');
        break;
      case 'CREATE':
        $('#expression-text pre').eq(0).text('POST');
        $('#expression-text pre').eq(1).text(`/expressions`);
        $('#expression-text pre').eq(2).text(`?name=${name}`);
        $('#expression-text pre').eq(3).text(`&emoji=${emoji}`);
        break;
      case 'UPDATE':
        $('#expression-text pre').eq(0).text('PUT');
        $('#expression-text pre').eq(1).text(`/expressions/${id}`);
        $('#expression-text pre').eq(2).text(`?name=${name}`);
        $('#expression-text pre').eq(3).text(`&emoji=${emoji}`);
        break;
      case 'DELETE':
        $('#expression-text pre').eq(0).text('DELETE');
        $('#expression-text pre').eq(1).text(`/expressions/${id}`);
        $('#expression-text pre').eq(2).text('');
        $('#expression-text pre').eq(3).text('');
        break;
    }
  }
  
  function clearExpressionText() {
    $('#expression-text pre').eq(0).text('');
    $('#expression-text pre').eq(1).text('');
    $('#expression-text pre').eq(2).text('');
    $('#expression-text pre').eq(3).text('');
  }
  
  function clearExpressionsText() {
    $('#expressions-text pre').eq(0).text('');
    $('#expressions-text pre').eq(1).text('');
  }
  
  function makeExpressionRequest(id, name, emoji) {
    switch (currentRequest) {
      case 'GET':
        $.ajax(`/expressions/${id}`, {
          success: function(expression) {
            animateGoodExpressionRequest('200', 'OK', expression);
          },
          error: function() {
            animateBadExpressionRequest('404', 'Not Found');
          }
        });
        break;
      case 'CREATE':
        $.ajax(`/expressions?name=${name}&emoji=${emoji}`, {
          method: 'POST',
          success: function(expression) {
            animateGoodExpressionRequest('200', 'OK', expression);
          },
          error: function() {
            animateBadExpressionRequest('400', 'Bad Request');
          }
        });
        break;
      case 'UPDATE':
        $.ajax(`/expressions/${id}?name=${name}&emoji=${emoji}`, {
          method: 'PUT',
          success: function(expression) {
            animateGoodExpressionRequest('200', 'OK', expression);
          },
          error: function() {
            animateBadExpressionRequest('404', 'Not Found');
          }
        });
        break;
      case 'DELETE':
        $.ajax(`/expressions/${id}`, {
          method: 'DELETE',
          success: function() {
            animateGoodExpressionRequest('204', 'No Content');
          },
          error: function() {
            animateBadExpressionRequest('404', 'Not Found');
          }
        });
        break;
    }
  }
  
  function triggerExpressionsRequest() {
    if (requestInProgress || !machineIsOn) {
      return;
    }
  
    requestInProgress = true;
    deactivateExpressions();
  
    $('#expression-route').attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/expression-route-active.svg');
    $('#expressions-route').attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/expressions-route-pending.svg');
    $('#code-number').text('');
    $('#code-description').text('');
    clearExpressionText();
    setExpressionsRequestText();
    const animationDelay = 428.5;
    animateMachine(animationDelay);
    setTimeout(() => makeExpressionsRequest(), animationDelay * 4);
  }
  
  function setExpressionsRequestText() {
    $('#expressions-text pre').eq(0).text('GET');
    $('#expressions-text pre').eq(1).text('/expressions');
  }
  
  function makeExpressionsRequest() {
    $.ajax('/expressions/', {
      success: function(expressions) {
        console.log(expressions)
        animateGoodExpressionsRequest('200', 'OK', expressions);
      },
      error: function() {
        animateBadExpressionsRequest('404', 'Not Found');
      }
    });
  }
  
  function animateMachine(animationDelay) {
    $('#beaker').attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/beaker-pending.svg');
    $('#lightbulb').attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/lightbulb-pending.svg');
    $('#sliders')
        .queue(function(next) { $(this).attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/sliders-active-1.svg'); next(); })
        .delay(animationDelay)
        .queue(function(next) { $(this).attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/sliders-active-2.svg'); next(); })
        .delay(animationDelay)
        .queue(function(next) { $(this).attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/sliders-active-1.svg'); next(); })
        .delay(animationDelay)
        .queue(function(next) { $(this).attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/sliders-active-2.svg'); next(); })
        .delay(animationDelay)
        .queue(function(next) { $(this).attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/sliders-inactive.svg'); next(); });
    $('#buttons')
        .queue(function(next) { $(this).attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/buttons-active-1.svg'); next(); })
        .delay(animationDelay)
        .queue(function(next) { $(this).attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/buttons-active-2.svg'); next(); })
        .delay(animationDelay)
        .queue(function(next) { $(this).attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/buttons-active-1.svg'); next(); })
        .delay(animationDelay)
        .queue(function(next) { $(this).attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/buttons-active-2.svg'); next(); })
        .delay(animationDelay)
        .queue(function(next) { $(this).attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/buttons-inactive.svg'); next(); });
  }
  
  function animateGoodExpressionRequest(statusCode, statusDescription, response) {
    animateGoodRequest(statusCode, statusDescription);
    $('#expression-route').attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/expression-route-green.svg');
    if (currentRequest === 'DELETE') {
      $('#id-field').val('');
    } else {
      $('#id-field').val(response.id);
      $('#name-field').val(response.name);
      $('#emoji-field').val(response.emoji);
    }
  }
  
  function animateGoodExpressionsRequest(statusCode, statusDescription, response) {
    animateGoodRequest(statusCode, statusDescription);
    $('#expressions-route').attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/expressions-route-green.svg');
    const expressions = response;
    const $expressionTabs = $('#expressions-information .tabs').html('');
    for (var i = 0; i < expressions.length; i++) {
      $expressionTabs.append(`<li><p>${expressions[i].emoji}</p><p class="id">${expressions[i].id}</p></li>`);
    }
  }
  
  function animateGoodRequest(statusCode, statusDescription) {
    $('#lightbulb').attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/lightbulb-green.svg');
    $('#status-code').removeClass('bad-status').addClass('good-status');
    $('#code-number').text(statusCode);
    $('#code-description').text(statusDescription);
    activateExpressions();
    requestInProgress = false;
  }
  
  function animateBadExpressionRequest(statusCode, statusDescription) {
    animateBadRequest(statusCode, statusDescription);
    $('#expression-route').attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/expression-route-red.svg');
  }
  
  function animateBadExpressionsRequest(statusCode, statusDescription) {
    animateBadRequest(statusCode, statusDescription);
    $('#expressions-route').attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/expressions-route-red.svg');
  }
  
  function animateBadRequest(statusCode, statusDescription) {
    $('#lightbulb').attr('src', 'https://s3.amazonaws.com/codecademy-content/courses/learn-express-routes/lightbulb-red.svg');
    $('#status-code').removeClass('good-status').addClass('bad-status');
    $('#code-number').text(statusCode);
    $('#code-description').text(statusDescription);
    activateExpressions();
    requestInProgress = false;
  }