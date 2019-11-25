
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: $('#totalAmount').val()
          }
        }]
      });
    },
    onApprove: function(data, actions) {
			
      return actions.order.capture().then(function(details) {
				console.log(details);
				if(details.status == "COMPLETED")
				{
					$.ajax({
						url:"sendMail.php",
						method:"POST",
						data:{
							
							name:$('#name').val(),
							email:$('#email').val(),
							phone:$('#mobile').val(),

						},
						dataType:"json",
						success:function(data){
							console.log(data);
							if(data.isErr == 0){
								window.location.replace("payment_success.php");
							}
							
						},
						error:function(err){
							console.log(err);
						}
						
					});
				}
				else
				{
					alert('please try again!')
				}
					
      });
    }
  }).render('#paypal-button-container');