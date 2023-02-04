
$(function(){ 

// Pay Salary button Event Listener
  $("#pay-button").click(function(event){
    event.preventDefault();
    $("#request-status-loading").slideDown();

  // AJAX Call
    $.ajax({
      type: 'POST',
      url: '/get-required-fields',
      data: {
        'sender_currency': 'USD',
        'sender_country': 'US',
        'beneficiary_country': $("#user_country").val(),
        'payout_currency': $("#payout_currency").val(),
        'sender_entity_type': 'company',
        'beneficiary_entity_type': 'individual',
        'payout_amount': $("#transaction_amount").val()
      }, 
      success: function (data, status, xhr) {

        //Create Beneficiary Fields
        $("#payment-required-fields").append("<h2>Beneficiary Information</h2>");
        $.each(data.beneficiary_required_fields, function(propName, propVal) {
          var fieldName = propVal.name;
          var isRequired = propVal.is_required == true? "required" : "" ;
          var fieldDesc = propVal.description? propVal.description : "";
          $("#payment-required-fields").append("<label for='"+fieldName+"' class='form-label'>"+fieldName.replace("_", " ")+"</label>");
          if(propVal.is_required == true) $("#payment-required-fields").append("*");
          $("#payment-required-fields").append("<input type='text' id='beneficiary_"+fieldName+"' name='beneficiary_"+fieldName+"' class='form-control' placeholder='"+fieldDesc+"' "+isRequired+">");
        });

        //Create Sender Fields
        $("#payment-required-fields").append("<h2>Sender Information</h2>");
        $.each(data.sender_required_fields, function(propName, propVal) {
          var fieldName = propVal.name;
          var isRequired = propVal.is_required == true? "required" : "" ;
          var fieldDesc = propVal.description? propVal.description : "";
          $("#payment-required-fields").append("<label for='"+fieldName+"' class='form-label'>"+fieldName.replace("_", " ")+"</label>");
          if(propVal.is_required == true) $("#payment-required-fields").append("*");
          $("#payment-required-fields").append("<input type='text' id='sender_"+fieldName+"' name='sender_"+fieldName+"' class='form-control' placeholder='"+fieldDesc+"' "+isRequired+">");
        });

        //Create Transaction Fields
        $("#payment-required-fields").append("<h2>Transaction Details</h2>");
        $.each(data.payout_options, function(propName, propVal) {
          var fieldName = propVal.name;
          var isRequired = propVal.is_required == true? "required" : "" ;
          var fieldDesc = propVal.description? propVal.description : "";
          $("#payment-required-fields").append("<label for='"+fieldName+"' class='form-label'>"+fieldName.replace("_", " ")+"</label>");
          if(propVal.is_required == true) $("#payment-required-fields").append("*");
          $("#payment-required-fields").append("<input type='text' id='transaction_"+fieldName+"' name='transaction_"+fieldName+"' class='form-control' placeholder='"+fieldDesc+"' "+isRequired+">");
        });


        // Show Status
        $("#request-status-error").slideUp();
        $("#request-status-loading").slideUp();
        $("#pay-button").slideUp();
        $("#send-payment-button").slideDown();
      },
      error: function (jqXhr, textStatus, errorMessage) {
        // Show Error
        $("#request-status-loading").slideUp();
        $("#request-status-error").slideDown();
        $("#request-status-error").html(errorMessage);
        console.log('Error' + errorMessage);
      }
    });

  });


// Send button Event Listener
  $("#send-payment-button").click(function(event){
    event.preventDefault();

    $("#request-status-error").slideUp();
    $("#request-status-loading").slideDown();

    // AJAX Call
    $.ajax({
      type: 'POST',
      url: '/send-payment',
      data: {
        'payout_currency': $("#payout_currency").val(),
        'sender_country': 'US',
        'sender_address': $("#sender_address").val(),
        'beneficiary_country': $("#beneficiary_country").val(),
        'sender_entity_type': 'company',
        'beneficiary_address': $("#beneficiary_address").val(),
        'payout_amount': $("#transaction_amount").val(),
        'beneficiary_address': $("#beneficiary_address").val(),
        'beneficiary_city': $("#beneficiary_city").val(),
        'beneficiary_country': $("#beneficiary_country").val(),
        'beneficiary_first_name': $("#beneficiary_first_name").val(),
        'beneficiary_last_name': $("#beneficiary_last_name").val(),
        'beneficiary_state': $("#beneficiary_state").val(),
        'beneficiary_postcode': $("#beneficiary_postcode").val(),
        'beneficiary_account_number': $("#beneficiary_account_number").val(),
        'beneficiary_bic_swift': $("#beneficiary_bic_swift").val(),
        'transaction_description': $("#transaction_description").val(),
        'transaction_statement_descriptor': $("#transaction_statement_descriptor").val()
      }, 
      success: function (data, status, xhr) {
        // Show Status
        $("#request-status-error").slideUp();
        $("#request-status-loading").slideUp();
        // Show Success Status with the Payout ID
        $("#request-status-success").append("<br>"+"Payout ID:"+data.id);
        $("#request-status-success").slideDown();

      },
      error: function (jqXhr, textStatus, errorMessage) {
        // Show Error
        $("#request-status-loading").slideUp();
        $("#request-status-error").slideDown();
        console.log('Error' + errorMessage);
      }

    });

  });
});