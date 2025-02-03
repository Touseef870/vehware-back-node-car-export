export default function inquirySellerTemp(data) {

    const { productData, inquireData } = data
    return (
        `
    <!DOCTYPE html>
<html>
<head>
    <style>
        .email-container {
            max-width: 500px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: #f8f9fa;
            padding: 24px;
            text-align: center;
            border-bottom: 3px solid #e9ecef;
        }
        .title {
            color: #2d3436;
            margin: 0;
            font-size: 1.5rem;
        }
        .content {
            padding: 24px;
        }
        .detail-item {
            margin-bottom: 16px;
            padding: 12px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        .detail-item strong {
            color: #6c757d;
            display: block;
            margin-bottom: 4px;
            font-size: 0.9rem;
        }
        .remarks {
            background: #fff9db;
            border-left: 4px solid #ffe066;
            padding: 12px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            padding: 16px;
            background: #f8f9fa;
            color: #6c757d;
            font-size: 0.85rem;
        }
        a {
            color: #1971c2;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h2 class="title">🚗 New Car Inquiry Received</h2>
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
        
        <div class="content">
            
            
            <div class="detail-item">
                <strong>👤 Customer Name</strong>
                ${inquireData.name}
            </div>

            <div class="detail-item">
                <strong>📧 Email</strong>
                <a href="mailto:${inquireData.email}">${inquireData.email}</a>
            </div>

            <div class="detail-item">
                <strong>📍 Location</strong>
                ${inquireData.city}, ${inquireData.country}
            </div>

            <div class="detail-item">
                <strong>📱 Contact Number</strong>
                ${inquireData.phoneNumber}
            </div>

            <div class="remarks">
                <strong>💬 Customer Remarks</strong>
                <p>${inquireData.remarks}</p>
            </div>
        </div>

        <div class="footer">
            <p>🌐 http://globaltradingcars.com</p>
        </div>
    </div>
</body>
</html>
    `
    )
}
