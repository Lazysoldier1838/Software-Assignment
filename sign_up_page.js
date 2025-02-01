import wixData from 'wix-data';
import wixLocation from 'wix-location';

$w('#button2').onClick((event) =>{
    const name = $w('#input7').value; // ID of name input field
    const email = $w('#input3').value; // ID of email input field
    const address = $w('#input8').value; // ID of address input field
    const phonenumber = $w('#input9').value; // ID of phone number input field
    const username = $w('#input4').value; // ID of username input field
    const password = $w('#input5').value; // ID of password input field
    const confirmPassword = $w('#input6').value; // ID of re-enter password input field

    // Validate that password matches confirmPassword
    if (password !== confirmPassword) {
        $w('#text131').text = "Passwords do not match. Please try again."; // Error message element
        $w('#text131').show();
        const revertOptions = {
        duration: 3000, // Time before reverting to the original message in milliseconds
        originalMessage: "Once done, please click the sign up button" // The original message to revert to
        };

        // Use setTimeout to revert the message
        setTimeout(() => {
            $w('#text131').text = revertOptions.originalMessage;
        }, revertOptions.duration);
            return;
    }

    // Save data to the database
    wixData.insert('Customers', {
        title: name,           // Store email under 'customer_email'
        customer_email: email,         // Store email under 'customer_email'
        customer_address: address,      // Store address under 'customer_address'
        customer_phone: phonenumber,     // Store  under 'customer_phone'
        customer_password: password,  // Store password under 'customer_password'
        customer_username: username   // Store username under 'customer_username'
    })
    .then(() => {
        console.log("User registered successfully");
        $w('#text131').hide(); // Hide any error messages

        // Navigate to the login page
        wixLocation.to('/login'); // Adjust the slug if your login page has a different name
    })
    .catch((err) => {
        console.error(err);
        $w('#text131').text = "An error occurred while registering. Please try again.";
        $w('#text131').show();
    });
})
