<!DOCTYPE html>
<html>
<head>
    <title>New Contact Message</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; }
        .header { background-color: #2563eb; color: white; padding: 15px; border-radius: 8px 8px 0 0; margin:-20px -20px 20px -20px; text-align: center; }
        .field { margin-bottom: 15px; }
        .field-label { font-weight: bold; color: #475569; font-size: 14px; }
        .field-value { margin-top: 5px; padding: 12px; background-color: #f8fafc; border-radius: 6px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="margin: 0;">New Message from Portfolio</h2>
        </div>
        
        <p>You have received a new message from your portfolio contact form.</p>

        <div class="field">
            <div class="field-label">Name:</div>
            <div class="field-value">{{ $data['name'] }}</div>
        </div>

        <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value">{{ $data['email'] }}</div>
        </div>

        <div class="field">
            <div class="field-label">Subject:</div>
            <div class="field-value">{{ $data['subject'] }}</div>
        </div>

        <div class="field">
            <div class="field-label">Message:</div>
            <div class="field-value" style="white-space: pre-wrap;">{{ $data['message'] }}</div>
        </div>
        
        <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 30px;">
            This email was sent from your portfolio website.
        </p>
    </div>
</body>
</html>
