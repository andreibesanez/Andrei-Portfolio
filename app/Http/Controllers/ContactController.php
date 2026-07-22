<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'subject' => ['required', 'string', 'max:255', 'regex:/^[^\r\n]*$/'],
            'message' => 'required|string|min:10|max:5000',
        ]);

        try {
            Mail::to(config('portfolio.personal.email'))->send(new ContactMail($validated));
            return back()->with('success', 'Your message has been sent successfully! I will get back to you soon.');
        } catch (\Exception $e) {
            Log::error('Contact mail failed: ' . $e->getMessage());
            return back()
                ->with('error', 'Sorry, your message could not be sent. Please try again later or contact me directly via email.')
                ->withInput();
        }
    }
}
