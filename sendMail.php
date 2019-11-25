<?php
	require 'PHPMailer/class.phpmailer.php';
	include('stripe/init.php');

	$msg=array();

	$token = $_POST['token'];
	$email = $_POST['email'];
	$name = $_POST['name'];
	$mobile = $_POST['mobile'];
	$address = $_POST['address'];
	$zip = $_POST['zip'];
	$amount = $_POST['amount'];
	

	if(isset($_POST)){
		
		

		\Stripe\Stripe::setApiKey('sk_test_iShIfMtNznmxeIL3E9K0qwjG00uY41fZJ8');

    	$customer = \Stripe\Customer::create(array(
			'email' => $email,
			'card'  => $token
		));

		if($customer){
			$charge = \Stripe\Charge::create(array(
                'customer' => $customer->id,
                'amount'   => $amount*100,
                'currency' => 'USD'
         	));
         	if ($charge->status == "succeeded"){
         		$ownerMail = sendMail($email, $name, $mobile, $address, $zip, $amount, 1, $charge->receipt_url);
         		
         		if(!$ownerMail) {
					// echo "Mailer Error: " . $mail->ErrorInfo;
					$refund = \Stripe\Refund::create([
						'charge' => $charge->id,
						'amount' => $amount * 100,
					]);
					if($refund){
						$msg['err'] = 1;
         				$msg['msg'] = 'Could not send mail, Your amount will be refunded to you between 2 to 3 working days..';
					}
				} else {
					$usermail = sendMail($email, $name, $mobile, $address, $zip, $amount, 0, $charge->receipt_url);
					if(!$usermail) {
						$refund = \Stripe\Refund::create([
							'charge' => $charge->id,
							'amount' => $amount * 100,
						]);
						if($refund){
							$msg['err'] = 1;
	         				$msg['msg'] = 'Could not send mail, Your amount will be refunded to you between 2 to 3 working days..';
						}
					}
					else{
						$msg['err'] = 0;
     					$msg['msg'] = 'Order placed successfully.';
					}
				}

         		$msg['data'] = $charge;
         		$msg['err'] = 0;
     			$msg['msg'] = 'Charge success';
         	}
         	else{
         		$msg['err'] = 1;
         		$msg['msg'] = 'Could not create payment.';
         	}
		}
		else{
     		$msg['err'] = 1;
     		$msg['msg'] = 'Could not create payment.';
     	}	
		
		// $mail->Body = $body;

		// if(!$mail->Send()) {
		// 	echo "Mailer Error: " . $mail->ErrorInfo;
		// } else {
		//    	echo "Message has been sent";
		// }
	}
	else{
		$msg['err'] = 1;
 		$msg['msg'] = 'Oops something went wrong please try again.';
	}
	
	header('Content-type: application/json');
	echo json_encode($msg);
	exit();



	function sendMail($email, $name, $mobile, $address, $zip, $amount, $sendTo, $reciptUrl){
		$body = '';
		$mail = new PHPMailer(); // create a new object
		$mail->IsSMTP(); // enable SMTP
		$mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
		$mail->SMTPAuth = true; // authentication enabled
		$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
		$mail->Host = "smtp.gmail.com";
		$mail->Port = 465; // or 587
		$mail->IsHTML(true);
		$mail->Username = "testprojectmail2015@gmail.com";
		$mail->Password = "alokinogma@1";
		//send mail and recive mail details.
		$mail->SetFrom("testprojectmail2015@gmail.com", "deck123.com");
		
		// $mail->AddBCC("iamakashgolui140@gmail.com");
		$mail->Subject = "New deck Order placed";
		if($sendTo == 0){
			$mail->AddAddress($email);
			$body = '<!DOCTYPE HTML>
						<html class="no-js">
						<head>
						<meta charset="utf-8">
						<meta name="viewport" content="width=device-width">
						<title>t2-clips</title>
						</head>


						<body style="margin:0; padding:0; font-family: Arial; background:#f2efef;">
							<table width="600" cellspacing="0" cellpadding="0" border="0" align="center"  bgcolor="#FFFFFF">
								<tbody>			
								<tr>
									<td height="30"></td>
								</tr>
								<tr>
									<td valign="top" align="center" style="font-size: 22px; line-height: 70px; font-weight: 700; padding: 0 15px;">Order Placed successfully!</td>
								</tr>
								<tr>
									<td valign="top" height="60" style="font-size: 18px; line-height:40px; color: #666666; font-weight: 400; padding: 0 15px;">
										'.$name.', Please confirm the below details of your payment: 
									</td>
								</tr>
								<tr>
									<td style="padding: 0 15px;">
										<table width="100%" cellspacing="0" cellpadding="0" border="0">
											<tr>
												<td valign="top" width="150" style="font-size: 15px; font-weight: 600;" height="40">Amount :</td>
												<td valign="top" style="font-size: 18px; font-weight: 600;">$'.$amount.'</td>
											</tr>
											<tr>
												<td width="150" style="font-size: 15px; font-weight: 600;">Recipt :</td>
												<td style="font-size: 15px; line-height: 22px;">
													<a href="'.$reciptUrl.'">Click here to check your payment recipt</a>
												</td>
											</tr>

										</table>
									</td>
								</tr>
								<tr>
									<td height="30"></td>
								</tr>
								<tr>
									<td style="padding:0 15px; font-size:16px; line-height: 22px; font-weight: 600; color:#666666;">Cheers,<br> Deck.com</td>
								</tr>
								
								<tr>
									<td height="30"></td>
								</tr>
								 <tr>
									<td bgcolor="#363636" height="40" style="padding:0 10px; color:#888485; font-size:14px;">Copyright © 2019 <a href="#" style="color: #fff; text-decoration: none;">Deck.com</a></td>
								 </tr>
							</tbody>
							
							</table>

						 

						</body>
						</html>';
		}
		else{
			$mail->AddAddress('iamakashgolui140@gmail.com');
			$body = '<!DOCTYPE HTML>
						<html class="no-js">
						<head>
						<meta charset="utf-8">
						<meta name="viewport" content="width=device-width">
						<title>t2-clips</title>
						</head>


						<body style="margin:0; padding:0; font-family: Arial; background:#f2efef;">
							<table width="600" cellspacing="0" cellpadding="0" border="0" align="center"  bgcolor="#FFFFFF">
								<tbody>			
								<tr>
									<td height="30"></td>
								</tr>
								<tr>
									<td valign="top" align="center" style="font-size: 22px; line-height: 70px; font-weight: 700; padding: 0 15px;">A new order placed!</td>
								</tr>
								<tr>
									<td valign="top" height="60" style="font-size: 18px; line-height:40px; color: #666666; font-weight: 400; padding: 0 15px;">
										Please ckeck the user details details: 
									</td>
								</tr>
								<tr>
									<td style="padding: 0 15px;">
										<table width="100%" cellspacing="0" cellpadding="0" border="0">
											<tr>
												<td valign="top" width="150" style="font-size: 15px; font-weight: 600;" height="40">Name :</td>
												<td valign="top" style="font-size: 18px; font-weight: 600;">'.$name.'</td>
											</tr>
											<tr>
												<td valign="top" width="150" style="font-size: 15px; font-weight: 600;" height="40">Email :</td>
												<td valign="top" style="font-size: 18px; font-weight: 600;">'.$email.'</td>
											</tr>
											<tr>
												<td valign="top" width="150" style="font-size: 15px; font-weight: 600;" height="40">Mobile :</td>
												<td valign="top" style="font-size: 18px; font-weight: 600;">'.$mobile.'</td>
											</tr>
											<tr>
												<td valign="top" width="150" style="font-size: 15px; font-weight: 600;" height="40">Address :</td>
												<td valign="top" style="font-size: 18px; font-weight: 600;">'.$address.'</td>
											</tr>
											<tr>
												<td valign="top" width="150" style="font-size: 15px; font-weight: 600;" height="40">ZIP :</td>
												<td valign="top" style="font-size: 18px; font-weight: 600;">'.$zip.'</td>
											</tr>
											<tr>
												<td valign="top" width="150" style="font-size: 15px; font-weight: 600;" height="40">Amount :</td>
												<td valign="top" style="font-size: 18px; font-weight: 600;">$'.$amount.'</td>
											</tr>
											<tr>
												<td width="150" style="font-size: 15px; font-weight: 600;">Recipt :</td>
												<td style="font-size: 15px; line-height: 22px;">
													<a href="'.$reciptUrl.'">Click here to check payment recipt</a>
												</td>
											</tr>

										</table>
									</td>
								</tr>
								<tr>
									<td height="30"></td>
								</tr>
								<tr>
									<td style="padding:0 15px; font-size:16px; line-height: 22px; font-weight: 600; color:#666666;">Cheers,<br> Deck.com</td>
								</tr>
								
								<tr>
									<td height="30"></td>
								</tr>
								 <tr>
									<td bgcolor="#363636" height="40" style="padding:0 10px; color:#888485; font-size:14px;">Copyright © 2019 <a href="#" style="color: #fff; text-decoration: none;">Deck.com</a></td>
								 </tr>
							</tbody>
							
							</table>

						 

						</body>
						</html>';
		}
		

		
		$mail->Body = $body;

		if(!$mail->Send()) {
			echo "Mailer Error: " . $mail->ErrorInfo;
			return false;
		}
		else{
			return true;
		}
	}
?>