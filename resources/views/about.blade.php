<x-layout>
    <div class="max-w-7xl mx-auto">
        <!-- About Hero Section -->
        <section class="pt-20 pb-16 px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center gap-12 relative" data-aos="fade-up">
            <div class="absolute right-20 top-20 opacity-20 pointer-events-none">
                <div class="grid grid-cols-4 gap-3">
                    @for($i=0; $i<16; $i++)
                    <div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                    @endfor
                </div>
            </div>

            <div class="flex-1 space-y-6 z-10">
                <div class="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium text-sm border border-blue-100 dark:border-blue-800 transition-colors">
                    Get to know me
                </div>
                
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight transition-colors">
                    About Me
                </h1>
                
                <div class="space-y-4 text-slate-600 dark:text-slate-400 text-base lg:text-lg leading-relaxed transition-colors">
                    <p>
                        {{ config('portfolio.personal.about.p1') }}
                    </p>
                    <p>
                        {{ config('portfolio.personal.about.p2') }}
                    </p>
                </div>
                
                <div class="pt-4 flex items-center gap-4">
                    <div class="flex items-center gap-2 text-slate-700 dark:text-slate-300 transition-colors">
                        <i data-lucide="map-pin" class="w-5 h-5 text-blue-500"></i> Based in {{ explode(',', config('portfolio.personal.location'))[1] ?? config('portfolio.personal.location') }}
                    </div>
                </div>
            </div>
            
            <div class="flex-1 relative flex justify-end">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-slate-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 transition-colors"></div>
                <img src="{{ asset('images/profile.png') }}" alt="Z Andrie Barraba" class="relative z-10 w-[90%] lg:w-96 h-auto object-contain">
            </div>
        </section>

        <div class="w-full h-px bg-slate-100 dark:bg-slate-800/50 mb-16 transition-colors"></div>

        <!-- 01 My Story -->
        <section class="px-6 md:px-12 lg:px-24 mb-24" data-aos="fade-up">
            <div class="flex flex-col lg:flex-row gap-16">
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-6">
                        <span class="text-blue-600 dark:text-blue-500 font-bold text-sm transition-colors">01</span>
                        <div class="h-px w-8 bg-blue-200 dark:bg-blue-800 transition-colors"></div>
                    </div>
                    <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-6 transition-colors">My Story</h2>
                    <div class="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed text-sm transition-colors">
                        <p>
                            {{ config('portfolio.personal.about.story_p1') }}
                        </p>
                        <p>
                            {{ config('portfolio.personal.about.story_p2') }}
                        </p>
                    </div>
                </div>
                <div class="flex-1">
                    <div class="space-y-3">
                        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-colors">
                            <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 transition-colors">
                                <i data-lucide="graduation-cap" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-slate-900 dark:text-white text-sm mb-0.5 transition-colors">Education</h3>
                                <p class="text-slate-500 dark:text-slate-400 text-xs transition-colors">{{ config('portfolio.personal.education.degree') }}</p>
                            </div>
                        </div>
                        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-colors">
                            <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 transition-colors">
                                <i data-lucide="map-pin" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-slate-900 dark:text-white text-sm mb-0.5 transition-colors">Location</h3>
                                <p class="text-slate-500 dark:text-slate-400 text-xs transition-colors">{{ config('portfolio.personal.location') }}</p>
                            </div>
                        </div>
                        <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-colors">
                            <div class="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 transition-colors">
                                <i data-lucide="clock" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-slate-900 dark:text-white text-sm mb-0.5 transition-colors">Availability</h3>
                                <p class="text-slate-500 dark:text-slate-400 text-xs transition-colors">{{ config('portfolio.personal.availability') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="w-full h-px bg-slate-100 dark:bg-slate-800/50 mb-16 transition-colors"></div>

        <!-- 02 What Drives Me -->
        <section class="px-6 md:px-12 lg:px-24 mb-24 flex flex-col lg:flex-row gap-12" data-aos="fade-up">
            <div class="w-48 shrink-0">
                <div class="flex items-center gap-3 mb-6">
                    <span class="text-blue-600 dark:text-blue-500 font-bold text-sm transition-colors">02</span>
                    <div class="h-px w-8 bg-blue-200 dark:bg-blue-800 transition-colors"></div>
                </div>
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white transition-colors">What Drives Me</h2>
            </div>
            
            <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
                    <div class="mx-auto w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4 transition-colors">
                        <i data-lucide="code-2" class="w-6 h-6"></i>
                    </div>
                    <h3 class="font-bold text-slate-900 dark:text-white text-sm mb-2 transition-colors">Clean Code</h3>
                    <p class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed transition-colors">I write clean, maintainable, and scalable code.</p>
                </div>
                <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
                    <div class="mx-auto w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4 transition-colors">
                        <i data-lucide="users" class="w-6 h-6"></i>
                    </div>
                    <h3 class="font-bold text-slate-900 dark:text-white text-sm mb-2 transition-colors">User Focused</h3>
                    <p class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed transition-colors">I design with users in mind to create great experiences.</p>
                </div>
                <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
                    <div class="mx-auto w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400 rounded-xl flex items-center justify-center mb-4 transition-colors">
                        <i data-lucide="rocket" class="w-6 h-6"></i>
                    </div>
                    <h3 class="font-bold text-slate-900 dark:text-white text-sm mb-2 transition-colors">Growth Mindset</h3>
                    <p class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed transition-colors">I'm always learning and open to new challenges.</p>
                </div>
                <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
                    <div class="mx-auto w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4 transition-colors">
                        <i data-lucide="target" class="w-6 h-6"></i>
                    </div>
                    <h3 class="font-bold text-slate-900 dark:text-white text-sm mb-2 transition-colors">Purposeful Work</h3>
                    <p class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed transition-colors">I build solutions that solve real problems.</p>
                </div>
            </div>
        </section>
        
        <div class="w-full h-px bg-slate-100 dark:bg-slate-800/50 mb-16 transition-colors"></div>

        <!-- 03 Education -->
        <section class="px-6 md:px-12 lg:px-24 mb-24 flex flex-col lg:flex-row gap-12" data-aos="fade-up">
            <div class="w-48 shrink-0">
                <div class="flex items-center gap-3 mb-6">
                    <span class="text-blue-600 dark:text-blue-500 font-bold text-sm transition-colors">03</span>
                    <div class="h-px w-8 bg-blue-200 dark:bg-blue-800 transition-colors"></div>
                </div>
                <h2 class="text-3xl font-bold text-slate-900 dark:text-white transition-colors">Education</h2>
            </div>
            
            <div class="flex-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm p-8 flex flex-col md:flex-row gap-8 transition-colors">
                <div class="flex gap-4 md:w-1/2">
                    <div class="w-14 h-14 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors shadow-sm">
                        @if(config('portfolio.personal.education.logo'))
                            <img src="{{ asset(config('portfolio.personal.education.logo')) }}" alt="{{ config('portfolio.personal.education.school') }} Logo" class="w-10 h-10 object-contain">
                        @else
                            <div class="w-full h-full flex items-center justify-center bg-green-600 dark:bg-green-500 text-white text-xs font-bold transition-colors">{{ config('portfolio.personal.education.school_initials') }}</div>
                        @endif
                    </div>
                    <div>
                        <h3 class="font-bold text-slate-900 dark:text-white text-sm mb-1 transition-colors">{{ config('portfolio.personal.education.degree') }}</h3>
                        <p class="text-slate-600 dark:text-slate-400 text-xs mb-3 transition-colors">{{ config('portfolio.personal.education.school') }}</p>
                        <div class="flex items-center gap-2 text-slate-500 dark:text-slate-500 text-xs transition-colors">
                            <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                            {{ config('portfolio.personal.education.year') }}
                        </div>
                    </div>
                </div>
                
                <div class="md:border-l border-slate-100 dark:border-slate-800 md:pl-8 space-y-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed md:w-1/2 transition-colors">
                    <p>{{ config('portfolio.personal.education.description_p1') }}</p>
                    <p>{{ config('portfolio.personal.education.description_p2') }}</p>
                </div>
            </div>
        </section>

        <div class="w-full h-px bg-slate-100 dark:bg-slate-800/50 mb-16 transition-colors"></div>

        <!-- 04 Call to action -->
        <section class="px-6 md:px-12 lg:px-24 mb-24" data-aos="fade-up">
            <div class="flex flex-col lg:flex-row items-center justify-between bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden transition-colors">
                <div class="absolute right-0 top-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-colors"></div>
                
                <div class="relative z-10 max-w-lg">
                    <div class="flex items-center gap-3 mb-4">
                        <span class="text-blue-600 dark:text-blue-500 font-bold text-sm transition-colors">04</span>
                        <div class="h-px w-8 bg-blue-200 dark:bg-blue-800 transition-colors"></div>
                    </div>
                    <h2 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">Let's Build Something Great</h2>
                    <p class="text-slate-500 dark:text-slate-400 text-sm md:text-base transition-colors">I'm always excited to work on new projects and collaborate with amazing people. Let's connect!</p>
                </div>
                
                <div class="relative z-10 mt-6 lg:mt-0">
                    <a href="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                        Get In Touch <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </a>
                </div>
            </div>
        </section>
        
        <div class="h-12 w-full"></div>
    </div>
</x-layout>

