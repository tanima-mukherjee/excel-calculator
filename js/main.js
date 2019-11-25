	/** 
	* select length select box
*/
function onSelectLength(){

	if( $('#length').val() >= 1 && $('#width').val() >= 1){
		$('#linearFootage1').attr("disabled", false);
		$('#linearFootage1Error').html("");
	}
	else{
		$('#linearFootage1').attr("disabled", true);
		$('#linearFootage1Error').html("Select length and width to enable L+W+L");
	}

	if($('#length').val() >= 1){
		$('#width').attr("disabled", false);

		if($('#width').val() >= 1){
			calLinearVal();
			let length = $('#length').val();
			let width = $('#width').val();
			let totalSquareFoot = 0;
			totalSquareFoot = length * width;
			if($('#height').val() >= 1){
		  		$('#heightErr').html('');
				if(totalSquareFoot >= 1 && totalSquareFoot <= 10000){
					$('#sqftErr').html('');
				}
				else{
					$('#sqftErr').html('Input value between 1 - 10000 or select length and width above.');
				}
			}
			else{
				$('#heightErr').html('Select height for Measurement');
			}
			$('#totalSquareft').val(totalSquareFoot);
			if($('#height').val() >= 1){
				calAmountByDecking();
			}
			
		}
		
	}
	else{
		$('#width').attr("disabled", true);
	}
}

/** 
	* select width select box
*/
function onSelectWidth(){

	if( $('#length').val() >= 1 && $('#width').val() >= 1){
		$('#linearFootage1').attr("disabled", false);
		$('#linearFootage1Error').html("");
		let length = $('#length').val();
		let width = $('#width').val();
		let totalSquareFoot = 0;
		totalSquareFoot = length * width;
		calLinearVal();
		if($('#height').val() >= 1){
	  		$('#heightErr').html('');
			if(totalSquareFoot >= 1 && totalSquareFoot <= 10000){
				$('#sqftErr').html('');
			}
			else{
				$('#sqftErr').html('Input value between 1 - 10000 or select length and width above.');
			}
		}
		else{
			$('#heightErr').html('Select height for Measurement');
		}

		$('#totalSquareft').val(totalSquareFoot);
		if($('#height').val() >= 1){
			calAmountByDecking();
		}
	}
	else{
		$('#linearFootage1').attr("disabled", true);
		$('#linearFootage1Error').html("Select length and width to enable L+W+L");
		return false;
	}

	

}

/** 
	* select height select box
*/
function onSelectHeight(){
	if($('#height').val() >= 1){
		$('#heightErr').html('');
		if($('#totalSquareft').val() >= 1 && $('#totalSquareft').val() <= 10000){
			calAmountByDecking();
			$('#sqftErr').html('');
		}
		else{
			$('#sqftErr').html('Input value between 1 - 10000 or select length and width above.');
			return false;
		}
	}
	else{
		$('#heightErr').html('Select height for Measurement');
		return false;
	}
	
}

/** 
	* on change sq ft input box
*/
$('#totalSquareft').on('keyup', function() {
	let isValidInput = checkInputType(this.value);
	if(isValidInput){
	  	if($('#height').val() >= 1){
	  		$('#heightErr').html('');
			if($('#totalSquareft').val() >= 1 && $('#totalSquareft').val() <= 10000){
				calAmountByDecking();
				$('#sqftErr').html('');
			}
			else{
				$('#sqftErr').html('Input value between 1 - 10000 or select length and width above.');
				return false;
			}
		}
		else{
			$('#heightErr').html('Select height for Measurement');
			return false;
		}
	}
	else{
		$('#sqftErr').html('Input integer value only');
		return false;
	}
});

/** 
	* on change deck material
*/
$("#deckingMaterial").on('change', function() {
	let text = $( "#deckingMaterial option:selected" ).text();
	dackMaterialImgChange(this.value,text);
	if($('#height').val() >= 1){
		$('#heightErr').html('');
		if($('#totalSquareft').val() >= 1 && $('#totalSquareft').val() <= 10000){
			calAmountByDecking();
			$('#sqftErr').html('');
		}
		else{
			$('#sqftErr').html('Input value between 1 - 10000 or select length and width above.');
			return false;
		}
	}
	else{
		$('#heightErr').html('Select height for Measurement');
		return false;
	}
});


/** 
	* on change lianear radio button 
*/
$("input[name='linearFootage']").on('click', function() {
	calLinearVal();
})

/** 
	* on change linear footage input
*/
$('#linearMeasureInput').on('keyup', function() {
	let isValidInput = checkInputType(this.value);
	if(isValidInput){
		$('#linearErr').html('');
		if(this.value >= 1 && this.value <= 100){
			$('#linearErr').html('');
			if($('#height').val() >= 1){
				$('#heightErr').html('');
				if($('#totalSquareft').val() >= 1 && $('#totalSquareft').val() <= 10000){
					calAmountByDecking();
					$('#sqftErr').html('');
				}
				else{
					$('#sqftErr').html('Input value between 1 - 10000 or select length and width above.');
					return false;
				}
			}
			else{
				$('#heightErr').html('Select height for Measurement');
				return false;
			}
		}
		else{
			$('#linearErr').html('Enter value between 1 - 100');
			return false;
		}
	}
	else{
		$('#linearErr').html('Input integer value only');
		return false;
	}
	
});

/** 
	* on change railing material radio
*/
$("#railingStyle").on('change', function() {
	let text = $( "#railingStyle option:selected" ).text();
	railingMaterialImgChange(this.value, text);
	if($('#height').val() >= 1){
		$('#heightErr').html('');
		if($('#totalSquareft').val() >= 1 && $('#totalSquareft').val() <= 10000){
			calAmountByDecking();
			$('#sqftErr').html('');
		}
		else{
			$('#sqftErr').html('Input value between 1 - 10000 or select length and width above.');
			return false;
		}
	}
	else{
		$('#heightErr').html('Select height for Measurement');
		return false;
	}
});

/** 
	* on check steps add check box
*/
function onToggleSteps(){
	if($('#isAddSteps').is(":checked")){

        $("#numberOfSteps").attr('disabled', false);
	}
    else{
        $("#numberOfSteps").attr('disabled', true);
        if($("#numberOfSteps").val() >= 1){
        	$("#numberOfSteps").val(0);
        	calAmountByDecking();
        }
    }
}

/** 
	* on change number of steps
*/
$('#numberOfSteps').on('change', function(){
	if($('#height').val() >= 1){
		$('#heightErr').html('');
		if($('#totalSquareft').val() >= 1 && $('#totalSquareft').val() <= 10000){
			calAmountByDecking();
			$('#sqftErr').html('');
		}
		else{
			$('#sqftErr').html('Input value between 1 - 10000 or select length and width above.');
			return false;
		}
	}
	else{
		$('#heightErr').html('Select height for Measurement');
		return false;
	}
})

/** 
	* on change number of steps
*/
function onTogglePermit(){
	if($('#height').val() >= 1){
		$('#heightErr').html('');
		if($('#totalSquareft').val() >= 1 && $('#totalSquareft').val() <= 10000){
			calAmountByDecking();
			$('#sqftErr').html('');
		}
		else{
			$('#sqftErr').html('Input value between 1 - 10000 or select length and width above.');
			return false;
		}
	}
	else{
		$('#heightErr').html('Select height for Measurement');
		return false;
	}
}


function calLinearVal(){
	let leanerToggleValue = $("input[name='linearFootage']:checked").val();
	if(leanerToggleValue == 'autolinearFootage'){
		$('#linearMeasureInput').attr("disabled", true);
		let length = $('#length').val();
		let width = $('#width').val();
		let autolinearFootageTotal = parseInt(length, 10) + parseInt(width, 10) + parseInt(length, 10);
		$('#linearMeasureInput').val(autolinearFootageTotal)
		if(autolinearFootageTotal >= 1 && autolinearFootageTotal <= 100){
			calAmountByDecking();
			$('#linearErr').html('');
		}
		else{
			$('#linearErr').html('Enter value between 1 - 100');
			return false;
		}
	}
	else{
		$('#linearMeasureInput').attr("disabled", false);
	}
}

/** 
	* on change deck material img
*/
function dackMaterialImgChange(val, text){
	
	switch(val){
		case '22':
			$('#deckImg').attr("src", "images/PressureTreated.jpeg");
			$('#deckNameVal').html(text+' ($'+val+')');
			break;
		case '36':
			$('#deckImg').attr("src", "images/trexDecking.jpeg");
			$('#deckNameVal').html(text+' ($'+val+')');
			break;
		case '38':
			$('#deckImg').attr("src", "images/timbertech.jpg");
			$('#deckNameVal').html(text+' ($'+val+')');
			break;
		case '40':
			$('#deckImg').attr("src", "images/azekDecking.jpg");
			$('#deckNameVal').html(text+' ($'+val+')');
			break;
	}
}

/** 
	* on change deck railing img
*/
function railingMaterialImgChange(val, text){
	console.log(text);
	switch(val){
		case '30':
			$('#railingImg').attr("src", "images/PressureTreatedRailing.jpg");
			$('#railingNameVal').html(text+' ($'+val+')');
			break;
		case '40':
			$('#railingImg').attr("src", "images/pvcWhiteRailing.jpg");
			$('#railingNameVal').html(text+' ($'+val+')');
			break;
		case '60':
			$('#railingImg').attr("src", "images/trexRailing.jpg");
			$('#railingNameVal').html(text+' ($'+val+')');
			break;
		case '80':
			$('#railingImg').attr("src", "images/azekRailing.jpg");
			$('#railingNameVal').html(text+' ($'+val+')');
			break;
	}
}

function onToggleIsRailing(){
	if($('#height').val() >= 1){
		$('#heightErr').html('');
		if($('#totalSquareft').val() >= 1 && $('#totalSquareft').val() <= 10000){
			calAmountByDecking();
			$('#sqftErr').html('');
		}
		else{
			$('#sqftErr').html('Input value between 1 - 10000 or select length and width above.');
			return false;
		}
	}
	else{
		$('#heightErr').html('Select height for Measurement');
		return false;
	}
}

/** 
	* chacking the toggle radio button
*/
function toggleExample(){
	let exampleType = $('input[name=example]:checked').val();
	// console.log(exampleType);
	switch(exampleType){
		case 'example1':
			calUsingExample(12, 16, 2, 22, 30, 36, 1, false);
			
			break;
		case 'example2':
			calUsingExample(20, 20, 4, 40, 80, 46, 1, true);
			
			break;
		case 'example3':
			calUsingExample(16, 20, 3, 36, 60, 46, 2, true);
			break;
	}
}

/** 
	* Setup for three example
*/
function calUsingExample(r_length, r_width, r_height, r_deckingMaterial, r_railingStyle, r_linearFootage, r_numberOfSteps, r_isPermit){
	let length = r_length;
	let width = r_width;
	let height = r_height;
	let deckingMaterial = r_deckingMaterial;
	let railingStyle = r_railingStyle;
	let linearFootage = r_linearFootage;
	let numberOfSteps = r_numberOfSteps;
	let isPermit = r_isPermit;
	
	$('#length').val(length);
	$('#width').val(width);
	$('#width').attr('disabled', false);
	$('#height').val(height);
	$('#totalSquareft').val(length * width);
	$('#deckingMaterial').val(deckingMaterial);
	$('#railingStyle').val(railingStyle);
	$('#linearMeasureInput').val(linearFootage);
	$('#isAddSteps').attr('checked', true);
	$('#numberOfSteps').attr('disabled', false);
	$('#linearFootage1').attr('disabled', false);
	$('#numberOfSteps').val(numberOfSteps);
	$('#isPermit').prop('checked', isPermit);	
	
	
	calAmountByDecking();
}

/** 
	* calculate total amount 
*/
function calAmountByDecking(){

	let totalSquareFt = $('#totalSquareft').val();
	let height = $('#height').val();
	let deckMaterialval = $("#deckingMaterial").val();
	let railingStyleVal = 0;
	let linearFootageInput = $('#linearMeasureInput').val()
	let numberOfSteps = $('#numberOfSteps').val();

	if($('#isRailing').is(":checked")){
		railingStyleVal = $("#railingStyle").val();
		$('#railingStyle').attr("disabled", false);
		$('#railingShowBtn').attr("disabled", false);
		
	}
    else{
		railingStyleVal = 0;
		$('#railingStyle').attr("disabled", true);
		$('#railingShowBtn').attr("disabled", true);
    }

	let deckMaterialCalculationTotal = totalSquareFt * (1 + height / 100)* deckMaterialval;
	$('#deckMaterialTotalShow').html('$'+parseInt(deckMaterialCalculationTotal));
	let totalAmount = deckMaterialCalculationTotal;


	let realingCost = railingStyleVal * linearFootageInput;
	$('#railingMaterialTotalShow').html('$'+parseInt(realingCost))
	totalAmount = totalAmount + realingCost;


	let stepsCost = height * numberOfSteps * (4 * deckMaterialval + 2 * railingStyleVal);
	$('#stepsTotalShow').html('$'+parseInt(stepsCost))
	totalAmount = totalAmount + stepsCost

	let permitCost = 0;
	if($('#isPermit').is(":checked")){
		permitCost = 1 * totalSquareFt;
		$('#permitTotalShow').html('$'+parseInt(permitCost))
	}
    else{
    	permitCost = 0;
    	$('#permitTotalShow').html('$'+parseInt(permitCost))
    }
    totalAmount = totalAmount + permitCost;

	let fivepercentage = totalAmount * 5 / 100;
	let actualValue = totalAmount - fivepercentage;

	let tenpercentage = actualValue * 10 / 100;
	let twentyepercentage = actualValue * 20 / 100;
	let thirthpercentage = actualValue * 30 / 100;
	let fourtyercentage = actualValue * 40 / 100;

	$('#tenPercent').html('$'+parseInt(tenpercentage));
	$('#twentyPercent').html('$'+parseInt(twentyepercentage));
	// $('#thirtyPercent').html('$'+Number(thirthpercentage).toLocaleString('en'));
	$('#thirtyPercent').html('$'+parseInt(thirthpercentage));
	$('#fourtyPercent').html('$'+parseInt(fourtyercentage));

	if(tenpercentage > 0){
		$('#paySection').fadeIn();
		$('#showTenParcentVal').html('$'+parseInt(tenpercentage));
	}
	else{
		$('#paySection').hide();
	}
	
	
	$('#showTotalAmount').html('<strike>$'+parseInt(totalAmount)+'</strike>');
	$('#showpercentagevalue').html('-$'+parseInt(fivepercentage));
	$('#showActualValue').html('$'+parseInt(actualValue));
	$('#totalAmount').val(tenpercentage);
}

/** 
	* check input type integer
*/
function checkInputType(val){
	return /^\d*$/.test(val);
}

/** 
	* user info validation
*/
function payNow(){
	let name = $('#name').val();
	let mobile = $('#phone').val();
	let address = $('#placeInput').val();
	let zip =  $('#zip').val();

	if(name == ''){
		$('#nameErr').html('Enter name please.');
	}
	else{
		$('#nameErr').html('');
	}

	if(mobile == ''){
		$('#mobileErr').html('Enter mobile no please.');
	}
	else{
		$('#mobileErr').html('');
	}

	if(address == ''){
		$('#addressErr').html('Enter address please.');
	}
	else{
		$('#addressErr').html('');
	}

	if(zip == ''){
		$('#zipErr').html('Enter ZIP code please.');
	}
	else{
		$('#zipErr').html('');
	}

	if(name != '' && mobile != '' && address != '' && zip != ''){
		$('#stripe-button').attr('disabled', false);
	}
	else{
		$('#stripe-button').attr('disabled', true);
		return false;
	}

}

/** 
	* check $99 one hour on hand
*/
function onToggleonehrDeck(){
	if($('#oneHourCheck').is(":checked")){
		$('#paySecHeadingText').html('Pay $99 for your 1 hour deck consultation with design');
		$('#smallpaySecHeadingText').html('');
		$('#totalAmount').val(99);
		$('#showTenParcentVal').html('$99');
		$('#paySection').fadeIn();
		$('#calDiv').fadeOut();
		$('#calDisableWrapperID').fadeIn();
	}
	else{
		$('#paySecHeadingText').html('Pay 10% of the amount to place the order.');
		$('#smallpaySecHeadingText').html('10% of the total amount.');
		$('#totalAmount').val(0);
		$('#showTenParcentVal').html('$0');
		$('#paySection').fadeOut();
		$('#calDiv').fadeIn();
		$('#calDisableWrapperID').fadeOut();
		toggleExample();
	}
}