export default function inquiryAgentTemp(data) {

    const { productData } = data

    return (
        `
        <!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="text-align: center; padding: 15px; background-color: #f3f4f6; border-radius: 10px;">
        <h2 style="color: #065f46;">✅ Thank You for Your Purchase!</h2>
        <p>We appreciate your business</p>
    </div>

    <!-- Product Card -->
    <div style="margin: 25px 0; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px;">
        <img src=${productData.images[0].url} 
             alt=${productData.name} 
             style="width: 100%; height: 200px; object-fit: contain; border-radius: 5px; margin-bottom: 15px;">
        
        <h3 style="color: #1e40af; margin: 0 0 10px 0;"> ${productData.name} </h3>
        
        <div style="color: #4b5563;">
            <p style="margin: 5px 0;"><strong>Model:</strong>${productData.modelCode} </p>
            <p style="margin: 5px 0;"><strong>Year:</strong> ${productData.year} </p>
        </div>
    </div>

    <!-- Message -->
    <div style="background-color: #f0fdfa; padding: 15px; border-radius: 8px;">
        <p style="margin: 0;">🙏 Thank you for choosing us! Your order is being processed and we'll contact you shortly for delivery details.</p>
    </div>
 
    <!-- Footer -->
    <div style="text-align: center; margin-top: 25px; color: #6b7280; font-size: 0.9em;">
        <p>Best Regards,<br>
        📞 ${productData.sellerEmail} </p>
    </div>

</body>
</html>
    `
    )
}


