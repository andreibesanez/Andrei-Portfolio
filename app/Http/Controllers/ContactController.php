<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // Send email (adjust this to the email address you want to receive messages at)
        Mail::to(env('MAIL_FROM_ADDRESS', 'your-email@gmail.com'))->send(new ContactMail($validated));

        return back()->with('success', 'Your message has been sent successfully! I will get back to you soon.');
    }
}
