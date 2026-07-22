<x-layout>
    <div class="max-w-7xl mx-auto pb-24">
        <!-- Contact Hero Section -->
        <section class="pt-20 pb-16 px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-12 relative" data-aos="fade-up">
            <div class="absolute right-20 top-20 opacity-20 pointer-events-none">
                <div class="grid grid-cols-4 gap-3">
                    @for($i=0; $i<16; $i++)
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                    @endfor
                </div>
            </div>

            <div class="flex-1 space-y-6 z-10">
                <div class="flex items-center gap-3">
                    <span class="text-blue-600 dark:text-blue-500 font-semibold text-sm tracking-wide transition-colors">Get In Touch</span>
                    <div class="h-px w-12 bg-blue-200 dark:bg-blue-800 transition-colors"></div>
                </div>
                
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
                    Let's Connect
                </h1>
                
                <h2 class="text-xl font-semibold text-blue-600 dark:text-blue-400 mt-2 max-w-md transition-colors">
                    I'm open to new opportunities and exciting projects.
                </h2>
                
                <p class="text-slate-500 dark:text-slate-400 text-base max-w-md leading-relaxed mt-4 transition-colors">
                    Have a project in mind or just want to say hi? Feel free to reach out! I'm always open to discussing new ideas, creative projects, or opportunities to be part of your vision.
                </p>
            </div>
            
            <div class="flex-1 relative flex justify-end">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-slate-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 transition-colors"></div>
                <img src="{{ asset('images/profile.png') }}" alt="Andrei Besañez" class="relative z-10 w-[90%] lg:w-96 h-auto object-contain">
            </div>
        </section>

        <div class="w-full h-px bg-slate-100 dark:bg-slate-800/50 mb-12 transition-colors"></div>

        <!-- Contact Form & Info -->
        <section class="px-6 md:px-12 lg:px-24 mb-8" data-aos="fade-up">
            <div class="flex flex-col lg:flex-row gap-6">
                <!-- Form Area -->
                <div class="flex-[1.2] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm transition-colors">
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-6 transition-colors">Send a Message</h3>
                    
                    @if(session('success'))
                    <div class="mb-6 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-lg text-sm flex items-center gap-2 border border-green-200 dark:border-green-800/50 transition-colors">
                        <i data-lucide="check-circle" class="w-5 h-5 shrink-0"></i>
                        {{ session('success') }}
                    </div>
                    @endif

                    @if(session('error'))
                    <div class="mb-6 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg text-sm flex items-center gap-2 border border-red-200 dark:border-red-800/50 transition-colors">
                        <i data-lucide="alert-circle" class="w-5 h-5 shrink-0"></i>
                        {{ session('error') }}
                    </div>
                    @endif

                    <form action="/contact" method="POST" class="space-y-4">
                        @csrf
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input type="text" name="name" value="{{ old('name') }}" placeholder="Name" @class([
                                    'w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 outline-none transition-all text-sm',
                                    'border-red-300 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500' => $errors->has('name'),
                                    'border-slate-200 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500' => !$errors->has('name'),
                                ])>
                                @error('name') <p class="text-red-500 dark:text-red-400 text-xs mt-1.5 ml-1">{{ $message }}</p> @enderror
                            </div>
                            <div>
                                <input type="email" name="email" value="{{ old('email') }}" placeholder="Email" @class([
                                    'w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 outline-none transition-all text-sm',
                                    'border-red-300 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500' => $errors->has('email'),
                                    'border-slate-200 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500' => !$errors->has('email'),
                                ])>
                                @error('email') <p class="text-red-500 dark:text-red-400 text-xs mt-1.5 ml-1">{{ $message }}</p> @enderror
                            </div>
                        </div>
                        <div>
                            <input type="text" name="subject" value="{{ old('subject') }}" placeholder="Subject" @class([
                                'w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 outline-none transition-all text-sm',
                                'border-red-300 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500' => $errors->has('subject'),
                                'border-slate-200 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500' => !$errors->has('subject'),
                            ])>
                            @error('subject') <p class="text-red-500 dark:text-red-400 text-xs mt-1.5 ml-1">{{ $message }}</p> @enderror
                        </div>
                        <div>
                            <textarea name="message" rows="5" placeholder="Message" @class([
                                'w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 outline-none transition-all resize-none text-sm',
                                'border-red-300 dark:border-red-500/50 focus:ring-red-500 focus:border-red-500' => $errors->has('message'),
                                'border-slate-200 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500' => !$errors->has('message'),
                            ])>{{ old('message') }}</textarea>
                            @error('message') <p class="text-red-500 dark:text-red-400 text-xs mt-1.5 ml-1">{{ $message }}</p> @enderror
                        </div>
                        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-lg transition-colors flex items-center justify-between px-6 shadow-sm shadow-blue-500/20">
                            <span>Send Message</span>
                            <i data-lucide="send" class="w-4 h-4"></i>
                        </button>
                    </form>
                </div>

                <!-- Info Area -->
                <div class="flex-1 flex flex-col gap-6">
                    <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex-1 transition-colors">
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-8 transition-colors">Contact Information</h3>
                        <div class="space-y-6">
                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0 mt-1 transition-colors">
                                    <i data-lucide="mail" class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <div class="text-xs font-bold text-slate-900 dark:text-white mb-0.5 transition-colors">Email</div>
                                    <div class="text-sm text-slate-500 dark:text-slate-400 transition-colors">{{ config('portfolio.personal.email') }}</div>
                                </div>
                            </div>
                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0 mt-1 transition-colors">
                                    <i data-lucide="phone" class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <div class="text-xs font-bold text-slate-900 dark:text-white mb-0.5 transition-colors">Phone</div>
                                    <div class="text-sm text-slate-500 dark:text-slate-400 transition-colors">{{ config('portfolio.personal.phone') }}</div>
                                </div>
                            </div>
                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0 mt-1 transition-colors">
                                    <i data-lucide="map-pin" class="w-5 h-5"></i>
                                </div>
                                <div>
                                    <div class="text-xs font-bold text-slate-900 dark:text-white mb-0.5 transition-colors">Location</div>
                                    <div class="text-sm text-slate-500 dark:text-slate-400 transition-colors">{{ config('portfolio.personal.location') }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm transition-colors">
                        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">Availability</h3>
                        <div class="flex items-center gap-2 mb-2">
                            <div class="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                            <span class="text-sm text-slate-600 dark:text-slate-300 transition-colors">{{ config('portfolio.personal.availability') }}</span>
                        </div>
                        <p class="text-xs text-slate-400 dark:text-slate-500 pl-4.5 ml-1 transition-colors">Typically replies within 24 hours</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Socials Grid -->
        <section class="px-6 md:px-12 lg:px-24 mb-6" data-aos="fade-up">
            <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col xl:flex-row items-center gap-8 transition-colors">
                <div class="xl:w-1/4 text-center xl:text-left">
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Let's Connect</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400 transition-colors">Find me on these platforms and let's build something amazing together.</p>
                </div>
                
                <div class="xl:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    <!-- GitHub -->
                    <a href="{{ config('portfolio.socials.github.url') }}" target="_blank" class="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-slate-900 dark:text-white group-hover:-translate-y-1 transition-all"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
                        <div class="text-center">
                            <div class="text-sm font-bold text-slate-900 dark:text-white transition-colors">GitHub</div>
                            <div class="text-xs text-slate-500 dark:text-slate-400 transition-colors">{{ config('portfolio.socials.github.username') }}</div>
                        </div>
                    </a>
                    <!-- Facebook -->
                    <a href="{{ config('portfolio.socials.facebook.url') }}" target="_blank" class="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-[#1877F2] group-hover:-translate-y-1 transition-all"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                        <div class="text-center">
                            <div class="text-sm font-bold text-slate-900 dark:text-white transition-colors">Facebook</div>
                            <div class="text-xs text-slate-500 dark:text-slate-400 transition-colors">{{ config('portfolio.socials.facebook.username') }}</div>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <!-- Map Section -->
        <section class="px-6 md:px-12 lg:px-24 mb-10" data-aos="fade-up">
            <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center transition-colors">
                <div class="md:w-1/3">
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">My Location</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed transition-colors">
                        Based in {{ config('portfolio.personal.location') }}.<br>
                        Open to local and remote collaborations worldwide.
                    </p>
                    <a href="https://www.google.com/maps?q={{ config('portfolio.personal.map_lat', 6.73682) }},{{ config('portfolio.personal.map_lng', 125.37791) }}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        View on Google Maps <i data-lucide="external-link" class="w-3 h-3"></i>
                    </a>
                </div>
                
                <div class="md:w-2/3 h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 relative overflow-hidden flex items-center justify-center w-full transition-colors">
                    <div id="map" class="absolute inset-0 w-full h-full"></div>
                    
                    <!-- MapLibre CSS & JS -->
                    <link href="https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.css" rel="stylesheet" />
                    <script src="https://unpkg.com/maplibre-gl@3.6.2/dist/maplibre-gl.js"></script>
                    
                    <script>
                        document.addEventListener('DOMContentLoaded', () => {
                            const lightStyle = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
                            const darkStyle = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
                            
                            // Check current theme
                            const isDark = document.documentElement.classList.contains('dark');
                            
                            // Initialize map
                            const map = new maplibregl.Map({
                                container: 'map',
                                style: isDark ? darkStyle : lightStyle,
                                center: [125.37791, 6.73682], // Purok 9-A, Aplaya coordinates [lng, lat]
                                zoom: 16, // Zoomed in to exact location
                                attributionControl: false
                            });
                            
                            // Add a marker for the location
                            const markerEl = document.createElement('div');
                            markerEl.innerHTML = `<div class="relative flex h-5 w-5 items-center justify-center">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-600 border-2 border-white dark:border-slate-900"></span>
                            </div>`;
                            
                            new maplibregl.Marker({ element: markerEl })
                                .setLngLat([125.37791, 6.73682])
                                .addTo(map);

                            // Listen for theme changes using MutationObserver
                            const observer = new MutationObserver((mutations) => {
                                mutations.forEach((mutation) => {
                                    if (mutation.attributeName === 'class') {
                                        const currentlyDark = document.documentElement.classList.contains('dark');
                                        map.setStyle(currentlyDark ? darkStyle : lightStyle);
                                    }
                                });
                            });
                            
                            observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
                        });
                    </script>
                </div>
            </div>
        </section>
        
        <!-- Bottom Banner -->
        <section class="px-6 md:px-12 lg:px-24" data-aos="fade-up">
            <div class="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm transition-colors">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm border border-blue-100 dark:border-slate-700 shrink-0 transition-colors">
                        <i data-lucide="send" class="w-5 h-5 text-blue-500 dark:text-blue-400 transition-colors"></i>
                    </div>
                    <div>
                        <h3 class="text-base font-bold text-slate-900 dark:text-white transition-colors">Have a project in mind?</h3>
                        <p class="text-slate-500 dark:text-slate-400 text-xs mt-0.5 transition-colors">I'd love to hear about it! Let's create something impactful together.</p>
                    </div>
                </div>
                
                <button type="button" onclick="document.querySelector('form').scrollIntoView({behavior:'smooth'})" class="shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm shadow-sm flex items-center gap-2">
                    Send Message <i data-lucide="send" class="w-4 h-4"></i>
                </button>
            </div>
        </section>

    </div>
</x-layout>

